'use server'

import { getServiceClient } from '@/app/lib/supabaseServer'
import { InsertProject, UpdateProject } from '@/app/types/database'
import { extractYouTubeId, getYouTubeThumbnail, validateYouTubeThumbnail } from '@/app/lib/youtubeUtils'
import { revalidatePath } from 'next/cache'

/**
 * Create a new project
 * @param projectData Project data
 * @returns Created project or error
 */
export async function createProject(projectData: InsertProject) {
  const supabase = getServiceClient()
  
  // Extract YouTube ID if URL is provided
  if (projectData.youtube_id && projectData.youtube_id.includes('http')) {
    const youtubeId = extractYouTubeId(projectData.youtube_id)
    if (youtubeId) {
      projectData.youtube_id = youtubeId
      
      // Auto-fetch thumbnail if none provided
      if (!projectData.thumbnail_url) {
        const thumbnailUrl = getYouTubeThumbnail(youtubeId)
        // Validate that the thumbnail exists before setting it
        const isValid = await validateYouTubeThumbnail(youtubeId)
        if (isValid) {
          projectData.thumbnail_url = thumbnailUrl
        }
      }
    }
  }
  
  // Set default sort index if not provided
  if (projectData.sort_index === undefined) {
    // Get the highest sort index and add 1
    const { data: projects, error: fetchError } = await supabase
      .from('projects')
      .select('sort_index')
      .order('sort_index', { ascending: false })
      .limit(1)
      
    if (fetchError) {
      console.error('Error fetching projects for sort index:', fetchError)
    } else if (projects && projects.length > 0) {
      projectData.sort_index = (projects[0] as { sort_index: number }).sort_index + 1
    } else {
      projectData.sort_index = 0
    }
  }
  
  const { data, error } = await supabase
    .from('projects')
    .insert(projectData)
    .select()
    .single()
    
  if (error) {
    console.error('Error creating project:', error)
    return { success: false, error: error.message }
  }
  
  revalidatePath('/admin')
  revalidatePath('/')
  
  return { success: true, data }
}

/**
 * Update an existing project
 * @param id Project ID
 * @param projectData Project data to update
 * @returns Updated project or error
 */
export async function updateProject(id: string, projectData: UpdateProject) {
  const supabase = getServiceClient()
  
  // Extract YouTube ID if URL is provided
  if (projectData.youtube_id && projectData.youtube_id.includes('http')) {
    const youtubeId = extractYouTubeId(projectData.youtube_id)
    if (youtubeId) {
      projectData.youtube_id = youtubeId
      
      // Auto-fetch thumbnail if none provided
      if (!projectData.thumbnail_url) {
        const thumbnailUrl = getYouTubeThumbnail(youtubeId)
        // Validate that the thumbnail exists before setting it
        const isValid = await validateYouTubeThumbnail(youtubeId)
        if (isValid) {
          projectData.thumbnail_url = thumbnailUrl
        }
      }
    }
  }
  
  const { data, error } = await supabase
    .from('projects')
    .update(projectData)
    .eq('id', id)
    .select()
    .single()
    
  if (error) {
    console.error('Error updating project:', error)
    return { success: false, error: error.message }
  }
  
  revalidatePath('/admin')
  revalidatePath('/')
  
  return { success: true, data }
}

/**
 * Delete a project
 * @param id Project ID
 * @returns Success or error
 */
export async function deleteProject(id: string) {
  const supabase = getServiceClient()
  
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id)
    
  if (error) {
    console.error('Error deleting project:', error)
    return { success: false, error: error.message }
  }
  
  revalidatePath('/admin')
  revalidatePath('/')
  
  return { success: true }
}

/**
 * Reorder projects
 * @param projectIds Array of project IDs in new order
 * @returns Success or error
 */
export async function reorderProjects(projectIds: string[]) {
  const supabase = getServiceClient()
  
  // Update sort_index for each project
  const updates = projectIds.map((id, index) => 
    supabase
      .from('projects')
      .update({ sort_index: index })
      .eq('id', id)
  )
  
  const results = await Promise.all(updates)
  
  // Check for any errors
  const errors = results.filter((result) => result.error)
  if (errors.length > 0) {
    console.error('Error reordering projects:', errors)
    return { success: false, error: 'Failed to reorder projects' }
  }
  
  revalidatePath('/admin')
  revalidatePath('/')
  
  return { success: true }
}

/**
 * Toggle project visibility
 * @param id Project ID
 * @param visibility New visibility status
 * @returns Updated project or error
 */
export async function toggleProjectVisibility(id: string, visibility: 'draft' | 'published' | 'unlisted') {
  const supabase = getServiceClient()
  
  const { data, error } = await supabase
    .from('projects')
    .update({ visibility })
    .eq('id', id)
    .select()
    .single()
    
  if (error) {
    console.error('Error toggling project visibility:', error)
    return { success: false, error: error.message }
  }
  
  revalidatePath('/admin')
  revalidatePath('/')
  
  return { success: true, data }
}
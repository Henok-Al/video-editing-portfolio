'use client'

import { useState } from 'react'
import { Project } from '@/app/types/database'
import { deleteProject, updateProject, toggleProjectVisibility, reorderProjects } from '@/app/actions/projects'
import { motion } from 'framer-motion'

interface ProjectListProps {
  projects: Project[]
  onProjectsUpdated: () => void
}

export default function ProjectList({ projects, onProjectsUpdated }: ProjectListProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Partial<Project>>({})
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleEdit = (project: Project) => {
    setEditingId(project.id)
    setEditForm({ ...project })
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditForm({})
  }

  const handleSaveEdit = async () => {
    if (!editingId) return

    setLoading(true)
    try {
      const result = await updateProject(editingId, editForm)
      if (result.success) {
        setMessage({ type: 'success', text: 'Project updated successfully!' })
        setEditingId(null)
        setEditForm({})
        onProjectsUpdated()
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to update project' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An unexpected error occurred' })
      console.error('Error updating project:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return

    setLoading(true)
    try {
      const result = await deleteProject(id)
      if (result.success) {
        setMessage({ type: 'success', text: 'Project deleted successfully!' })
        onProjectsUpdated()
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to delete project' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An unexpected error occurred' })
      console.error('Error deleting project:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleToggleVisibility = async (id: string, currentVisibility: string) => {
    const newVisibility = currentVisibility === 'published' ? 'draft' : 'published'
    
    setLoading(true)
    try {
      const result = await toggleProjectVisibility(id, newVisibility as 'draft' | 'published' | 'unlisted')
      if (result.success) {
        setMessage({ type: 'success', text: `Project ${newVisibility}!` })
        onProjectsUpdated()
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to update visibility' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An unexpected error occurred' })
      console.error('Error toggling visibility:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleReorder = async (projectId: string, direction: 'up' | 'down') => {
    const currentIndex = projects.findIndex(p => p.id === projectId)
    if (currentIndex === -1) return

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
    if (newIndex < 0 || newIndex >= projects.length) return

    // Create a new array with the projects in the new order
    const newProjects = [...projects]
    const [movedProject] = newProjects.splice(currentIndex, 1)
    newProjects.splice(newIndex, 0, movedProject)

    // Get the IDs in the new order
    const projectIds = newProjects.map(p => p.id)

    setLoading(true)
    try {
      const result = await reorderProjects(projectIds)
      if (result.success) {
        setMessage({ type: 'success', text: 'Projects reordered successfully!' })
        onProjectsUpdated()
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to reorder projects' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An unexpected error occurred' })
      console.error('Error reordering projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setEditForm(prev => ({ ...prev, [name]: value }))
  }

  const handleArrayChange = (field: keyof Project, value: string[]) => {
    setEditForm(prev => ({ ...prev, [field]: value }))
  }

  const addCategory = (field: 'categories' | 'tools') => {
    const inputValue = (document.getElementById(`${field}-input`) as HTMLInputElement)?.value || ''
    if (inputValue.trim() && !editForm[field]?.includes(inputValue.trim())) {
      handleArrayChange(field, [...(editForm[field] || []), inputValue.trim()])
      if (document.getElementById(`${field}-input`)) {
        (document.getElementById(`${field}-input`) as HTMLInputElement).value = ''
      }
    }
  }

  const removeCategory = (field: 'categories' | 'tools', item: string) => {
    handleArrayChange(field, (editForm[field] || []).filter(c => c !== item))
  }

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      {message && (
        <div className={`p-3 ${message.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
          {message.text}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="text-left p-4">Project</th>
              <th className="text-left p-4">Format</th>
              <th className="text-left p-4">Visibility</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <motion.tr 
                key={project.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="border-b border-gray-700 hover:bg-gray-750"
              >
                {editingId === project.id ? (
                  <td colSpan={4} className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <input
                          type="text"
                          name="title"
                          value={editForm.title || ''}
                          onChange={handleChange}
                          className="w-full bg-gray-700 border border-gray-600 rounded-md px-2 py-1 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">YouTube ID</label>
                        <input
                          type="text"
                          name="youtube_id"
                          value={editForm.youtube_id || ''}
                          onChange={handleChange}
                          className="w-full bg-gray-700 border border-gray-600 rounded-md px-2 py-1 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Thumbnail URL</label>
                        <input
                          type="text"
                          name="thumbnail_url"
                          value={editForm.thumbnail_url || ''}
                          onChange={handleChange}
                          className="w-full bg-gray-700 border border-gray-600 rounded-md px-2 py-1 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Format</label>
                        <select
                          name="format"
                          value={editForm.format || ''}
                          onChange={handleChange}
                          className="w-full bg-gray-700 border border-gray-600 rounded-md px-2 py-1 text-sm"
                        >
                          <option value="">Select format</option>
                          <option value="16:9">16:9</option>
                          <option value="9:16">9:16</option>
                          <option value="1:1">1:1</option>
                          <option value="4:3">4:3</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Duration (seconds)</label>
                        <input
                          type="number"
                          name="duration_seconds"
                          value={editForm.duration_seconds || 0}
                          onChange={handleChange}
                          className="w-full bg-gray-700 border border-gray-600 rounded-md px-2 py-1 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Visibility</label>
                        <select
                          name="visibility"
                          value={editForm.visibility || 'draft'}
                          onChange={handleChange}
                          className="w-full bg-gray-700 border border-gray-600 rounded-md px-2 py-1 text-sm"
                        >
                          <option value="draft">Draft</option>
                          <option value="published">Published</option>
                          <option value="unlisted">Unlisted</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                          name="description"
                          value={editForm.description || ''}
                          onChange={handleChange}
                          rows={2}
                          className="w-full bg-gray-700 border border-gray-600 rounded-md px-2 py-1 text-sm"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Categories</label>
                        <div className="flex">
                          <input
                            id="categories-input"
                            type="text"
                            placeholder="Add a category"
                            className="flex-1 bg-gray-700 border border-gray-600 rounded-l-md px-2 py-1 text-sm"
                          />
                          <button
                            type="button"
                            onClick={() => addCategory('categories')}
                            className="bg-emerald-600 hover:bg-emerald-700 px-2 py-1 rounded-r-md text-sm"
                          >
                            Add
                          </button>
                        </div>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {editForm.categories?.map((category) => (
                            <span 
                              key={category} 
                              className="bg-emerald-600 px-2 py-1 rounded-full text-xs flex items-center"
                            >
                              {category}
                              <button
                                type="button"
                                onClick={() => removeCategory('categories', category)}
                                className="ml-1 text-white hover:text-gray-200"
                              >
                                &times;
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Tools</label>
                        <div className="flex">
                          <input
                            id="tools-input"
                            type="text"
                            placeholder="Add a tool"
                            className="flex-1 bg-gray-700 border border-gray-600 rounded-l-md px-2 py-1 text-sm"
                          />
                          <button
                            type="button"
                            onClick={() => addCategory('tools')}
                            className="bg-emerald-600 hover:bg-emerald-700 px-2 py-1 rounded-r-md text-sm"
                          >
                            Add
                          </button>
                        </div>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {editForm.tools?.map((tool) => (
                            <span 
                              key={tool} 
                              className="bg-emerald-600 px-2 py-1 rounded-full text-xs flex items-center"
                            >
                              {tool}
                              <button
                                type="button"
                                onClick={() => removeCategory('tools', tool)}
                                className="ml-1 text-white hover:text-gray-200"
                              >
                                &times;
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <button
                        onClick={handleSaveEdit}
                        disabled={loading}
                        className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 px-3 py-1 rounded text-sm"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </td>
                ) : (
                  <>
                    <td className="p-4">
                      <div className="flex items-center">
                        <div className="bg-gray-700 w-16 h-16 rounded flex-shrink-0 mr-4">
                          {project.thumbnail_url ? (
                            <img 
                              src={project.thumbnail_url} 
                              alt={project.title} 
                              className="w-full h-full object-cover rounded"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">
                              No Image
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{project.title}</div>
                          <div className="text-sm text-gray-400 line-clamp-2">{project.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="bg-gray-700 px-2 py-1 rounded text-sm">
                        {project.format || 'N/A'}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-sm ${
                        project.visibility === 'published' ? 'bg-green-600' : 
                        project.visibility === 'draft' ? 'bg-yellow-600' : 'bg-gray-600'
                      }`}>
                        {project.visibility}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => handleEdit(project)}
                          className="bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleToggleVisibility(project.id, project.visibility)}
                          className={`px-2 py-1 rounded text-sm ${
                            project.visibility === 'published' ? 'bg-yellow-600 hover:bg-yellow-700' : 
                            'bg-green-600 hover:bg-green-700'
                          }`}
                        >
                          {project.visibility === 'published' ? 'Unpublish' : 'Publish'}
                        </button>
                        <button
                          onClick={() => handleDelete(project.id)}
                          className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-sm"
                        >
                          Delete
                        </button>
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleReorder(project.id, 'up')}
                            disabled={index === 0}
                            className="bg-gray-600 hover:bg-gray-700 disabled:opacity-50 px-2 py-1 rounded text-sm"
                          >
                            ↑
                          </button>
                          <button
                            onClick={() => handleReorder(project.id, 'down')}
                            disabled={index === projects.length - 1}
                            className="bg-gray-600 hover:bg-gray-700 disabled:opacity-50 px-2 py-1 rounded text-sm"
                          >
                            ↓
                          </button>
                        </div>
                      </div>
                    </td>
                  </>
                )}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {projects.length === 0 && (
        <div className="text-center p-8 text-gray-500">
          No projects found. Add your first project above.
        </div>
      )}
    </div>
  )
}
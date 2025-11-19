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

  const inputClasses = "w-full bg-black/30 border border-white/10 rounded-sm px-3 py-2 focus:outline-none focus:border-primary text-white placeholder-gray-500 text-sm"
  const labelClasses = "block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1"

  return (
    <div className="bg-white/5 border border-white/10 rounded-sm overflow-hidden backdrop-blur-sm">
      {message && (
        <div className={`p-4 border-b border-white/10 ${message.type === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
          {message.text}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-black/20 border-b border-white/10">
            <tr>
              <th className="text-left p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Project</th>
              <th className="text-left p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Format</th>
              <th className="text-left p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Visibility</th>
              <th className="text-left p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {projects.map((project, index) => (
              <motion.tr
                key={project.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white/5 hover:bg-white/10 transition-colors"
              >
                {editingId === project.id ? (
                  <td colSpan={4} className="p-6 bg-black/20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className={labelClasses}>Title</label>
                        <input
                          type="text"
                          name="title"
                          value={editForm.title || ''}
                          onChange={handleChange}
                          className={inputClasses}
                        />
                      </div>
                      <div>
                        <label className={labelClasses}>YouTube ID</label>
                        <input
                          type="text"
                          name="youtube_id"
                          value={editForm.youtube_id || ''}
                          onChange={handleChange}
                          className={inputClasses}
                        />
                      </div>
                      <div>
                        <label className={labelClasses}>Thumbnail URL</label>
                        <input
                          type="text"
                          name="thumbnail_url"
                          value={editForm.thumbnail_url || ''}
                          onChange={handleChange}
                          className={inputClasses}
                        />
                      </div>
                      <div>
                        <label className={labelClasses}>Format</label>
                        <select
                          name="format"
                          value={editForm.format || ''}
                          onChange={handleChange}
                          className={inputClasses}
                        >
                          <option value="" className="bg-gray-900">Select format</option>
                          <option value="16:9" className="bg-gray-900">16:9</option>
                          <option value="9:16" className="bg-gray-900">9:16</option>
                          <option value="1:1" className="bg-gray-900">1:1</option>
                          <option value="4:3" className="bg-gray-900">4:3</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelClasses}>Duration (seconds)</label>
                        <input
                          type="number"
                          name="duration_seconds"
                          value={editForm.duration_seconds || 0}
                          onChange={handleChange}
                          className={inputClasses}
                        />
                      </div>
                      <div>
                        <label className={labelClasses}>Visibility</label>
                        <select
                          name="visibility"
                          value={editForm.visibility || 'draft'}
                          onChange={handleChange}
                          className={inputClasses}
                        >
                          <option value="draft" className="bg-gray-900">Draft</option>
                          <option value="published" className="bg-gray-900">Published</option>
                          <option value="unlisted" className="bg-gray-900">Unlisted</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className={labelClasses}>Description</label>
                        <textarea
                          name="description"
                          value={editForm.description || ''}
                          onChange={handleChange}
                          rows={2}
                          className={inputClasses}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className={labelClasses}>Categories</label>
                        <div className="flex gap-2 mb-2">
                          <input
                            id="categories-input"
                            type="text"
                            placeholder="Add a category"
                            className={inputClasses}
                          />
                          <button
                            type="button"
                            onClick={() => addCategory('categories')}
                            className="bg-white/10 hover:bg-white/20 border border-white/10 px-4 rounded-sm text-xs uppercase tracking-wider text-white transition-colors"
                          >
                            Add
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {editForm.categories?.map((category) => (
                            <span
                              key={category}
                              className="bg-primary/10 border border-primary/20 text-primary px-2 py-1 rounded-sm text-xs flex items-center gap-2"
                            >
                              {category}
                              <button
                                type="button"
                                onClick={() => removeCategory('categories', category)}
                                className="text-primary hover:text-white"
                              >
                                &times;
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <label className={labelClasses}>Tools</label>
                        <div className="flex gap-2 mb-2">
                          <input
                            id="tools-input"
                            type="text"
                            placeholder="Add a tool"
                            className={inputClasses}
                          />
                          <button
                            type="button"
                            onClick={() => addCategory('tools')}
                            className="bg-white/10 hover:bg-white/20 border border-white/10 px-4 rounded-sm text-xs uppercase tracking-wider text-white transition-colors"
                          >
                            Add
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {editForm.tools?.map((tool) => (
                            <span
                              key={tool}
                              className="bg-white/5 border border-white/10 text-gray-300 px-2 py-1 rounded-sm text-xs flex items-center gap-2"
                            >
                              {tool}
                              <button
                                type="button"
                                onClick={() => removeCategory('tools', tool)}
                                className="text-gray-400 hover:text-white"
                              >
                                &times;
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 flex space-x-4 border-t border-white/10 pt-4">
                      <button
                        onClick={handleSaveEdit}
                        disabled={loading}
                        className="bg-white text-black hover:bg-gray-200 px-6 py-2 rounded-sm text-xs font-bold uppercase tracking-widest transition-colors"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="text-gray-400 hover:text-white px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </td>
                ) : (
                  <>
                    <td className="p-6">
                      <div className="flex items-center">
                        <div className="bg-black/30 w-24 h-16 rounded-sm flex-shrink-0 mr-6 overflow-hidden border border-white/10">
                          {project.thumbnail_url ? (
                            <img
                              src={project.thumbnail_url}
                              alt={project.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs uppercase tracking-wider">
                              No Image
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-white text-lg mb-1">{project.title}</div>
                          <div className="text-sm text-gray-500 line-clamp-1 font-light">{project.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <span className="bg-white/5 border border-white/10 text-gray-300 px-2 py-1 rounded-sm text-xs font-mono">
                        {project.format || 'N/A'}
                      </span>
                    </td>
                    <td className="p-6">
                      <span className={`px-2 py-1 rounded-sm text-xs uppercase tracking-wider font-bold ${project.visibility === 'published' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                        project.visibility === 'unlisted' ? 'bg-gray-500/10 text-gray-400 border border-gray-500/20' :
                          'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                        }`}>
                        {project.visibility}
                      </span>
                    </td>
                    <td className="p-6">
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => handleEdit(project)}
                          className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-3 py-1 rounded-sm text-xs uppercase tracking-wider transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleToggleVisibility(project.id, project.visibility)}
                          className={`px-3 py-1 rounded-sm text-xs uppercase tracking-wider transition-colors border ${project.visibility === 'published' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400 hover:bg-yellow-500/20' :
                            'bg-green-500/10 border-green-500/20 text-green-400 hover:bg-green-500/20'
                            }`}
                        >
                          {project.visibility === 'published' ? 'Unpublish' : 'Publish'}
                        </button>
                        <button
                          onClick={() => handleDelete(project.id)}
                          className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 px-3 py-1 rounded-sm text-xs uppercase tracking-wider transition-colors"
                        >
                          Delete
                        </button>
                        <div className="flex gap-1 ml-2">
                          <button
                            onClick={() => handleReorder(project.id, 'up')}
                            disabled={index === 0}
                            className="bg-white/5 hover:bg-white/10 disabled:opacity-30 border border-white/10 text-white px-2 py-1 rounded-sm text-xs transition-colors"
                          >
                            ↑
                          </button>
                          <button
                            onClick={() => handleReorder(project.id, 'down')}
                            disabled={index === projects.length - 1}
                            className="bg-white/5 hover:bg-white/10 disabled:opacity-30 border border-white/10 text-white px-2 py-1 rounded-sm text-xs transition-colors"
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
        <div className="text-center p-12 text-gray-500 font-light">
          No projects found. Add your first project above.
        </div>
      )}
    </div>
  )
}
'use client'

import { useState } from 'react'
import { InsertProject } from '@/app/types/database'
import { createProject } from '@/app/actions/projects'

interface AdminFormProps {
  onProjectAdded: () => void
}

export default function AdminForm({ onProjectAdded }: AdminFormProps) {
  const [formData, setFormData] = useState<Omit<InsertProject, 'id' | 'created_at' | 'updated_at'>>({
    title: '',
    youtube_id: '',
    thumbnail_url: '',
    description: '',
    categories: [],
    format: '',
    duration_seconds: 0,
    tools: [],
    role: '',
    visibility: 'draft',
    sort_index: 0
  })
  const [categoryInput, setCategoryInput] = useState('')
  const [toolInput, setToolInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleArrayChange = (field: keyof typeof formData, value: string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const addCategory = () => {
    if (categoryInput.trim() && !formData.categories?.includes(categoryInput.trim())) {
      handleArrayChange('categories', [...(formData.categories || []), categoryInput.trim()])
      setCategoryInput('')
    }
  }

  const removeCategory = (category: string) => {
    handleArrayChange('categories', (formData.categories || []).filter(c => c !== category))
  }

  const addTool = () => {
    if (toolInput.trim() && !formData.tools?.includes(toolInput.trim())) {
      handleArrayChange('tools', [...(formData.tools || []), toolInput.trim()])
      setToolInput('')
    }
  }

  const removeTool = (tool: string) => {
    handleArrayChange('tools', (formData.tools || []).filter(t => t !== tool))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const result = await createProject(formData)
      if (result.success) {
        setMessage({ type: 'success', text: 'Project created successfully!' })
        // Reset form
        setFormData({
          title: '',
          youtube_id: '',
          thumbnail_url: '',
          description: '',
          categories: [],
          format: '',
          duration_seconds: 0,
          tools: [],
          role: '',
          visibility: 'draft',
          sort_index: 0
        })
        onProjectAdded()
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to create project' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An unexpected error occurred' })
      console.error('Error creating project:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg p-6">
      {message && (
        <div className={`mb-4 p-3 rounded ${message.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">YouTube URL/ID</label>
          <input
            type="text"
            name="youtube_id"
            value={formData.youtube_id || ''}
            onChange={handleChange}
            placeholder="Paste unlisted YouTube URL"
            className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Thumbnail URL</label>
          <input
            type="text"
            name="thumbnail_url"
            value={formData.thumbnail_url || ''}
            onChange={handleChange}
            placeholder="Auto-fetched from YouTube if empty"
            className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Format</label>
          <select
            name="format"
            value={formData.format || ''}
            onChange={handleChange}
            className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">Select format</option>
            <option value="16:9">16:9</option>
            <option value="9:16">9:16</option>
            <option value="1:1">1:1</option>
            <option value="4:3">4:3</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Duration (seconds)</label>
          <input
            type="number"
            name="duration_seconds"
            value={formData.duration_seconds || 0}
            onChange={handleChange}
            min="0"
            className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Visibility</label>
          <select
            name="visibility"
            value={formData.visibility}
            onChange={handleChange}
            className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="unlisted">Unlisted</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description || ''}
            onChange={handleChange}
            rows={3}
            className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">Categories</label>
          <div className="flex">
            <input
              type="text"
              value={categoryInput}
              onChange={(e) => setCategoryInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCategory())}
              placeholder="Add a category"
              className="flex-1 bg-gray-700 border border-gray-600 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="button"
              onClick={addCategory}
              className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-r-md transition-colors"
            >
              Add
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.categories?.map((category) => (
              <span 
                key={category} 
                className="bg-emerald-600 px-3 py-1 rounded-full text-sm flex items-center"
              >
                {category}
                <button
                  type="button"
                  onClick={() => removeCategory(category)}
                  className="ml-2 text-white hover:text-gray-200"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">Tools</label>
          <div className="flex">
            <input
              type="text"
              value={toolInput}
              onChange={(e) => setToolInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTool())}
              placeholder="Add a tool"
              className="flex-1 bg-gray-700 border border-gray-600 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="button"
              onClick={addTool}
              className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-r-md transition-colors"
            >
              Add
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.tools?.map((tool) => (
              <span 
                key={tool} 
                className="bg-emerald-600 px-3 py-1 rounded-full text-sm flex items-center"
              >
                {tool}
                <button
                  type="button"
                  onClick={() => removeTool(tool)}
                  className="ml-2 text-white hover:text-gray-200"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <button
          type="submit"
          disabled={loading}
          className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 px-6 py-3 rounded-md transition-colors"
        >
          {loading ? 'Creating...' : 'Create Project'}
        </button>
      </div>
    </form>
  )
}
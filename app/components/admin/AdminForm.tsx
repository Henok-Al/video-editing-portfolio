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

  const inputClasses = "w-full bg-black/30 border border-white/10 rounded-sm px-4 py-3 focus:outline-none focus:border-primary text-white placeholder-gray-500 transition-colors"
  const labelClasses = "block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2"

  return (
    <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-sm p-8 backdrop-blur-sm">
      {message && (
        <div className={`mb-6 p-4 rounded-sm border ${message.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className={labelClasses}>Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className={inputClasses}
            placeholder="Project Title"
          />
        </div>

        <div>
          <label className={labelClasses}>YouTube URL/ID</label>
          <input
            type="text"
            name="youtube_id"
            value={formData.youtube_id || ''}
            onChange={handleChange}
            placeholder="Paste unlisted YouTube URL"
            className={inputClasses}
          />
        </div>

        <div>
          <label className={labelClasses}>Thumbnail URL</label>
          <input
            type="text"
            name="thumbnail_url"
            value={formData.thumbnail_url || ''}
            onChange={handleChange}
            placeholder="Auto-fetched from YouTube if empty"
            className={inputClasses}
          />
        </div>

        <div>
          <label className={labelClasses}>Format</label>
          <select
            name="format"
            value={formData.format || ''}
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
            value={formData.duration_seconds || 0}
            onChange={handleChange}
            min="0"
            className={inputClasses}
          />
        </div>

        <div>
          <label className={labelClasses}>Visibility</label>
          <select
            name="visibility"
            value={formData.visibility}
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
            value={formData.description || ''}
            onChange={handleChange}
            rows={3}
            className={inputClasses}
            placeholder="Project description..."
          />
        </div>

        <div className="md:col-span-2">
          <label className={labelClasses}>Categories</label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={categoryInput}
              onChange={(e) => setCategoryInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCategory())}
              placeholder="Add a category"
              className={inputClasses}
            />
            <button
              type="button"
              onClick={addCategory}
              className="bg-white/10 hover:bg-white/20 border border-white/10 px-6 rounded-sm transition-colors text-white uppercase tracking-wider text-sm"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.categories?.map((category) => (
              <span
                key={category}
                className="bg-primary/20 border border-primary/30 text-primary px-3 py-1 rounded-sm text-sm flex items-center gap-2"
              >
                {category}
                <button
                  type="button"
                  onClick={() => removeCategory(category)}
                  className="text-primary hover:text-white transition-colors"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <label className={labelClasses}>Tools</label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={toolInput}
              onChange={(e) => setToolInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTool())}
              placeholder="Add a tool"
              className={inputClasses}
            />
            <button
              type="button"
              onClick={addTool}
              className="bg-white/10 hover:bg-white/20 border border-white/10 px-6 rounded-sm transition-colors text-white uppercase tracking-wider text-sm"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.tools?.map((tool) => (
              <span
                key={tool}
                className="bg-white/5 border border-white/10 text-gray-300 px-3 py-1 rounded-sm text-sm flex items-center gap-2"
              >
                {tool}
                <button
                  type="button"
                  onClick={() => removeTool(tool)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-white/10">
        <button
          type="submit"
          disabled={loading}
          className="w-full md:w-auto bg-white text-black hover:bg-gray-200 disabled:opacity-50 px-8 py-3 rounded-sm transition-colors font-bold uppercase tracking-widest text-sm"
        >
          {loading ? 'Creating...' : 'Create Project'}
        </button>
      </div>
    </form>
  )
}
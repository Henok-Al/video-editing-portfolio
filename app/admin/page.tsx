'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { getClient } from '@/app/lib/supabaseServer'
import { Project } from '@/app/types/database'
import { User } from '@supabase/supabase-js'
import AdminForm from '@/app/components/admin/AdminForm'
import ProjectList from '@/app/components/admin/ProjectList'

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([])
  const [user, setUser] = useState<User | null>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [projectsLoading, setProjectsLoading] = useState(false)
  const router = useRouter()
  const supabase = getClient()

  const fetchProjects = useCallback(async () => {
    setProjectsLoading(true)
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('sort_index', { ascending: true })
      
    if (error) {
      console.error('Error fetching projects:', error)
    } else {
      setProjects(data || [])
    }
    setProjectsLoading(false)
  }, [supabase])

  useEffect(() => {
    const checkUser = async () => {
      setAuthLoading(true)
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
      } else {
        setUser(user)
        await fetchProjects()
      }
      setAuthLoading(false)
    }

    checkUser()
  }, [router, supabase, fetchProjects])

  const handleLogout = useCallback(async () => {
    await supabase.auth.signOut()
    router.push('/')
  }, [router, supabase])

  // Show loading state only during authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-300">Welcome, {user?.email}</span>
            <button 
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Add New Project</h2>
          <AdminForm onProjectAdded={fetchProjects} />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Manage Projects</h2>
          {projectsLoading ? (
            <div className="bg-gray-800 rounded-lg p-8 text-center">
              <div className="text-white">Loading projects...</div>
            </div>
          ) : (
            <ProjectList projects={projects} onProjectsUpdated={fetchProjects} />
          )}
        </div>
      </main>
    </div>
  )
}
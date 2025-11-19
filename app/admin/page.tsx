'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { getClient } from '@/app/lib/supabaseServer'
import { Project } from '@/app/types/database'
import { User } from '@supabase/supabase-js'
import AdminForm from '@/app/components/admin/AdminForm'
import ProjectList from '@/app/components/admin/ProjectList'
import { motion } from 'framer-motion'

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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-white flex flex-col items-center"
        >
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <div className="text-xl">Loading dashboard...</div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="bg-card-bg border-b border-card-border shadow-lg">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <motion.h1 
            className="text-2xl font-bold text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Admin Dashboard
          </motion.h1>
          <div className="flex items-center space-x-4">
            <motion.span 
              className="text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Welcome, {user?.email}
            </motion.span>
            <motion.button 
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md transition-colors flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </motion.button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-6 text-white">Add New Project</h2>
            <AdminForm onProjectAdded={fetchProjects} />
          </div>

          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Manage Projects</h2>
              <motion.button
                onClick={fetchProjects}
                className="bg-primary hover:bg-primary-dark px-4 py-2 rounded-md transition-colors flex items-center text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </motion.button>
            </div>
            
            {projectsLoading ? (
              <motion.div
                className="bg-card-bg rounded-lg p-8 text-center border border-card-border"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                  <div className="text-white">Loading projects...</div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ProjectList projects={projects} onProjectsUpdated={fetchProjects} />
              </motion.div>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  )
}
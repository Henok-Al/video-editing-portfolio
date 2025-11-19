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
          <div className="text-xl font-light tracking-widest uppercase">Loading dashboard...</div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.05)_0%,transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,rgba(6,182,212,0.03)_0%,transparent_40%)]" />
      </div>

      <header className="relative z-10 border-b border-white/5 bg-black/20 backdrop-blur-md sticky top-0">
        <div className="container mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Admin<span className="text-primary">Dashboard</span>
            </h1>
          </motion.div>

          <div className="flex items-center space-x-6">
            <motion.span
              className="text-gray-400 text-sm font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {user?.email}
            </motion.span>
            <motion.button
              onClick={handleLogout}
              className="text-white hover:text-red-400 transition-colors text-sm uppercase tracking-wider flex items-center gap-2 group"
              whileHover={{ x: 5 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Logout
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </motion.button>
          </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="mb-16">
            <div className="flex items-end justify-between mb-8 border-b border-white/10 pb-4">
              <h2 className="text-3xl font-light text-white">Add Project</h2>
              <p className="text-gray-500 text-sm">Create a new portfolio entry</p>
            </div>
            <AdminForm onProjectAdded={fetchProjects} />
          </div>

          <div>
            <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
              <div>
                <h2 className="text-3xl font-light text-white">Manage Projects</h2>
                <p className="text-gray-500 text-sm mt-1">Edit or remove existing work</p>
              </div>
              <motion.button
                onClick={fetchProjects}
                className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-2 rounded-sm transition-all flex items-center gap-2 text-sm uppercase tracking-wider"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${projectsLoading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </motion.button>
            </div>

            {projectsLoading ? (
              <motion.div
                className="bg-white/5 rounded-sm p-12 text-center border border-white/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                  <div className="text-gray-400 font-mono text-sm">Loading projects...</div>
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
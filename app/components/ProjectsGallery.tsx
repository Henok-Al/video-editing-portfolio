"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../types/database';
import ProjectModal from './ProjectModal';

const ProjectsGallery = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
        // Fallback to mock data
        const mockProjects: Project[] = [
          {
            id: "1",
            title: "Corporate Brand Story",
            thumbnail_url: "/placeholder-video-1.jpg",
            format: "16:9",
            categories: ["Commercial", "Corporate"],
            tools: ["Premiere Pro", "After Effects"],
            description: "A compelling narrative for a tech startup's brand identity",
            youtube_id: "dQw4w9WgXcQ",
            visibility: "published",
            sort_index: 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: "2",
            title: "Music Festival Highlights",
            thumbnail_url: "/placeholder-video-2.jpg",
            format: "16:9",
            categories: ["Event", "Music"],
            tools: ["Final Cut Pro", "DaVinci Resolve"],
            description: "Energetic recap of the annual music festival experience",
            youtube_id: "dQw4w9WgXcQ",
            visibility: "published",
            sort_index: 1,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: "3",
            title: "Travel Documentary",
            thumbnail_url: "/placeholder-video-3.jpg",
            format: "16:9",
            categories: ["Travel", "Documentary"],
            tools: ["Premiere Pro", "DaVinci Resolve"],
            description: "Exploring hidden gems across Southeast Asia",
            youtube_id: "dQw4w9WgXcQ",
            visibility: "published",
            sort_index: 2,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ] as Project[];
        setProjects(mockProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Featured Projects
            </motion.h2>
            <motion.p 
              className="text-gray-400 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Loading projects...
            </motion.p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((id) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: id * 0.1 }}
                className="bg-card-bg rounded-xl overflow-hidden shadow-xl h-80 animate-pulse border border-card-border"
              >
                <div className="bg-gray-700 w-full aspect-video"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-700 rounded mb-4"></div>
                  <div className="h-4 bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A curated selection of my latest video editing work spanning various genres and styles
          </p>
        </motion.div>

        <AnimatePresence>
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="initial"
            animate="animate"
            variants={{
              animate: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={{
                  initial: { opacity: 0, y: 30 },
                  animate: { 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      duration: 0.5,
                      ease: "easeOut"
                    }
                  }
                }}
                whileHover={{ 
                  y: -15,
                  scale: 1.03,
                  transition: { 
                    duration: 0.3,
                    ease: "easeInOut"
                  }
                }}
                className="bg-card-bg rounded-xl overflow-hidden shadow-xl cursor-pointer border border-card-border hover:border-primary transition-all duration-300 group"
                onClick={() => openModal(project)}
              >
                <div className="relative">
                  <div className="bg-gray-800 w-full aspect-video flex items-center justify-center">
                    {project.thumbnail_url ? (
                      <img 
                        src={project.thumbnail_url} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          // Fallback to placeholder if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder-video-default.jpg";
                        }}
                      />
                    ) : (
                      <div className="text-gray-500 flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <span>Video Thumbnail</span>
                      </div>
                    )}
                  </div>
                  <motion.div 
                    className="absolute top-4 right-4 bg-primary text-white text-xs font-medium px-2 py-1 rounded-full shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {project.format}
                  </motion.div>
                  <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                    {project.categories?.slice(0, 2).map((category, idx) => (
                      <motion.span 
                        key={idx} 
                        className="bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm"
                        whileHover={{ 
                          scale: 1.05,
                          backgroundColor: "rgba(16, 185, 129, 0.7)"
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {category}
                      </motion.span>
                    ))}
                  </div>
                </div>
                <div className="p-6">
                  <motion.h3 
                    className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300"
                    whileHover={{ x: 5 }}
                  >
                    {project.title}
                  </motion.h3>
                  <p className="text-gray-400 text-sm line-clamp-2 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tools?.slice(0, 3).map((tool, idx) => (
                      <motion.span 
                        key={idx} 
                        className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded"
                        whileHover={{ 
                          backgroundColor: "#10b981",
                          color: "#ffffff",
                          scale: 1.05
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {tool}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            isOpen={isModalOpen} 
            onClose={closeModal} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsGallery;
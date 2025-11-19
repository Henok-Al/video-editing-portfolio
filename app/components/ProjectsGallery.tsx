"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectModal from "./ProjectModal";
import { getProjects } from "@/app/actions/projects";

// Define the project type
type Project = {
  id: string | number;
  title: string;
  category: string;
  image: string;
  videoUrl: string;
  description: string;
  tools: string[];
};

const ProjectsGallery = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        // Map data to Project type
        const mappedProjects: Project[] = data.map((p: any) => ({
          id: p.id,
          title: p.title,
          category: p.categories?.[0] || "General",
          image: p.thumbnail_url || "https://placehold.co/600x400/1a1a1a/10b981?text=No+Image",
          videoUrl: p.youtube_id ? `https://www.youtube.com/watch?v=${p.youtube_id}` : "",
          description: p.description || "",
          tools: p.tools || []
        }));
        setProjects(mappedProjects);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = "auto";
  };

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const visibleProjects = projects.slice(0, visibleCount);

  return (
    <section className="py-32 bg-background" id="projects">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-4">
              Selected Work
            </h2>
            <p className="text-3xl md:text-5xl font-bold text-white leading-tight">
              Visual narratives.
            </p>
          </div>
          <div className="md:text-right">
            <p className="text-gray-400 text-lg">
              A curation of my best edits.
            </p>
          </div>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="aspect-video bg-card-bg/30 animate-pulse rounded-sm" />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {visibleProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                  className="group cursor-pointer"
                  onClick={() => openModal(project)}
                >
                  {/* Image Container */}
                  <div className="relative aspect-video overflow-hidden rounded-sm mb-6 bg-card-bg">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white ml-1" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-500 font-mono uppercase tracking-wider">
                        {project.category}
                      </p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-2 group-hover:translate-y-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {visibleCount < projects.length && (
              <div className="mt-16 text-center">
                <button
                  onClick={handleViewMore}
                  className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-sm text-white uppercase tracking-widest text-sm font-bold transition-colors"
                >
                  View More
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={closeModal} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsGallery;
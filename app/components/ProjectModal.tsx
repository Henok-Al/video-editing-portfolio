"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Define the project type matching ProjectsGallery
type Project = {
  id: string | number;
  title: string;
  category: string;
  image: string;
  videoUrl: string;
  description: string;
  tools: string[];
};

type ProjectModalProps = {
  project: Project;
  onClose: () => void;
};

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showIframe, setShowIframe] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handlePlay = () => {
    setIsPlaying(true);
    setShowIframe(true);
  };

  const handleStop = () => {
    setIsPlaying(false);
    setShowIframe(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-[#0a0a0a] border border-white/10 rounded-sm shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors duration-300"
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col lg:flex-row">
          {/* Media Section */}
          <div className="lg:w-2/3 bg-black relative min-h-[300px] lg:min-h-[500px]">
            {!showIframe ? (
              <div className="absolute inset-0">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

                <button
                  onClick={handlePlay}
                  className="absolute inset-0 flex items-center justify-center group"
                >
                  <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white ml-1" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </button>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-black">
                {/* Simplified video player for demo - just an iframe or video tag */}
                {project.videoUrl.includes('youtube') ? (
                  <iframe
                    ref={iframeRef}
                    src={project.videoUrl.replace('watch?v=', 'embed/')}
                    className="w-full h-full aspect-video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={project.title}
                  ></iframe>
                ) : (
                  <video
                    src={project.videoUrl}
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                  />
                )}

                <button
                  onClick={handleStop}
                  className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-sm text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-colors"
                >
                  Back to Cover
                </button>
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="lg:w-1/3 p-8 flex flex-col">
            <div className="mb-auto">
              <h2 className="text-3xl font-bold text-white mb-2 leading-tight">{project.title}</h2>
              <p className="text-primary font-mono text-sm uppercase tracking-wider mb-6">{project.category}</p>

              <p className="text-gray-400 leading-relaxed mb-8 font-light">
                {project.description}
              </p>

              <div className="mb-8">
                <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-4 border-b border-white/10 pb-2">Tools Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool, idx) => (
                    <span key={idx} className="text-gray-400 text-sm border border-white/10 px-3 py-1 rounded-sm">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10">
              <button className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors text-sm">
                View Full Project
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectModal;
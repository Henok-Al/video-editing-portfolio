"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../types/database';
import BeforeAfterSlider from './BeforeAfterSlider';

type ProjectModalProps = {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
};

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showIframe, setShowIframe] = useState(false);
  const [activeTab, setActiveTab] = useState<'video' | 'color'>('video');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handlePlay = () => {
    setIsPlaying(true);
    setShowIframe(true);
  };

  const handleStop = () => {
    setIsPlaying(false);
    setShowIframe(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Project content */}
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-2/3">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{project.title}</h2>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-emerald-600 text-white text-sm px-3 py-1 rounded-full">
                      {project.format || 'N/A'}
                    </span>
                    {project.categories?.map((category, idx) => (
                      <span key={idx} className="bg-gray-700 text-gray-300 text-sm px-3 py-1 rounded-full">
                        {category}
                      </span>
                    ))}
                  </div>
                  
                  <p className="text-gray-300 mb-6">{project.description || 'No description available.'}</p>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white mb-2">Tools Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tools?.map((tool, idx) => (
                        <span key={idx} className="bg-gray-800 text-gray-400 text-sm px-3 py-1 rounded">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Tabs for video and color grading */}
                  <div className="mb-4">
                    <div className="flex border-b border-gray-700">
                      <button
                        className={`py-2 px-4 font-medium text-sm ${activeTab === 'video' ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-gray-400'}`}
                        onClick={() => setActiveTab('video')}
                      >
                        Video
                      </button>
                      {/* Remove the color grading tab since we don't have before/after images in the database */}
                    </div>
                  </div>
                  
                  {/* Content based on active tab */}
                  {activeTab === 'video' && (
                    <div className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden">
                      {!showIframe ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <div className="bg-gray-700 w-full h-full flex items-center justify-center">
                            <div className="text-gray-500">Video Thumbnail</div>
                          </div>
                          <button
                            onClick={handlePlay}
                            className="absolute inset-0 flex items-center justify-center w-full h-full"
                          >
                            <div className="bg-emerald-600 rounded-full p-4 hover:bg-emerald-700 transition-colors">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                              </svg>
                            </div>
                          </button>
                        </div>
                      ) : (
                        <iframe
                          ref={iframeRef}
                          src={`https://www.youtube.com/embed/${project.youtube_id}?autoplay=1`}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title={project.title}
                        ></iframe>
                      )}
                      
                      {showIframe && (
                        <button
                          onClick={handleStop}
                          className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                          aria-label="Stop video"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                          </svg>
                        </button>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="md:w-1/3">
                  <div className="bg-gray-800 rounded-lg p-6 sticky top-6">
                    <h3 className="text-xl font-bold text-white mb-4">Project Details</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-gray-400 text-sm uppercase tracking-wide">Format</h4>
                        <p className="text-white">{project.format || 'N/A'}</p>
                      </div>
                      <div>
                        <h4 className="text-gray-400 text-sm uppercase tracking-wide">Categories</h4>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {project.categories?.map((category, idx) => (
                            <span key={idx} className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">
                              {category}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-gray-400 text-sm uppercase tracking-wide">Tools</h4>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {project.tools?.map((tool, idx) => (
                            <span key={idx} className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
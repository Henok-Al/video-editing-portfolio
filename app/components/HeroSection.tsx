"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Check if video is in viewport to load it
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVideoLoaded(true);
              if (videoRef.current) {
                videoRef.current.play().catch(e => console.log("Autoplay blocked:", e));
              }
            }
          });
        },
        { threshold: 0.1 }
      );

      if (videoRef.current) {
        observerRef.current.observe(videoRef.current);
      }
    }

    return () => {
      if (observerRef.current && videoRef.current) {
        observerRef.current.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background media - thumbnail first, then video */}
      <div className="absolute inset-0">
        {!isVideoLoaded ? (
          <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
            <div className="text-gray-600">Thumbnail Placeholder</div>
          </div>
        ) : (
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            poster="/placeholder-thumbnail.jpg"
          >
            <source src="/placeholder-reel.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
        >
          <span className="block">Creative Video</span>
          <span className="block mt-2 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Editing Portfolio
          </span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10"
        >
          Crafting compelling visual stories through precision editing and creative storytelling techniques
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button className="px-8 py-4 bg-emerald-600 text-white font-medium rounded-full hover:bg-emerald-700 transition-colors">
            View My Work
          </button>
          <button className="px-8 py-4 bg-transparent border-2 border-emerald-600 text-emerald-400 font-medium rounded-full hover:bg-emerald-900/30 transition-colors">
            Contact Me
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-400 mb-2">Scroll to explore</span>
          <div className="w-8 h-12 rounded-full border-2 border-emerald-500 flex justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="w-2 h-2 rounded-full bg-emerald-500"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
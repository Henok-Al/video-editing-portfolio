"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Lamp = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Hide lamp effect when scrolled down 100px
      setIsVisible(scrollPosition < 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-background">
      {/* Core gradient background with enhanced animations */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative h-full w-full"
          >
            {/* Main gradient container */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Radial gradients for lamp effect */}
              <div className="absolute inset-0 bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_0%,#00000000_20%,#10b98122_25%,#00000000_30%,#00000000_100%)]"></div>
              
              {/* Center glow with pulsing animation */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="h-96 w-96 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.15)_0%,rgba(0,0,0,0)_70%)]"></div>
              </motion.div>
              
              {/* Horizontal beam with sweeping animation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="h-[1px] w-full bg-[linear-gradient(90deg,transparent,#10b98144,transparent)]"
                  animate={{
                    x: [-200, 200, -200],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
              
              {/* Vertical beam with pulsing animation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="h-full w-[1px] bg-[linear-gradient(180deg,transparent,#10b98144,transparent)]"
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scaleY: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05)_0%,transparent_70%)]"></div>
            
            {/* Animated particles with enhanced movement */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 0, x: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  y: [-100, (i * 50) - 150],
                  x: [0, (i * 20) - 50],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
                className="absolute h-1 w-1 rounded-full bg-primary"
                style={{
                  left: `${10 + i * 8}%`,
                  top: `${20 + (i % 3) * 20}%`
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Content area - Perfectly centered with enhanced animations */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full text-center px-4 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          <span className="block">Creative Video</span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="block mt-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          >
            Editing Portfolio
          </motion.span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-6 text-lg text-gray-300 sm:text-xl md:text-2xl max-w-2xl"
        >
          Crafting compelling visual stories through precision editing and creative storytelling techniques
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <motion.button 
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 20px rgba(16, 185, 129, 0.5)"
            }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full bg-primary px-8 py-4 font-medium text-white transition-all hover:bg-primary-dark text-lg shadow-lg shadow-primary/20"
          >
            View My Work
          </motion.button>
          <motion.button 
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 20px rgba(6, 182, 212, 0.5)"
            }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full bg-transparent border-2 border-primary px-8 py-4 font-medium text-primary transition-all hover:bg-primary/10 text-lg"
          >
            Contact Me
          </motion.button>
        </motion.div>
      </div>
      
      {/* Enhanced Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center">
          <motion.span 
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-sm text-gray-400 mb-2"
          >
            Scroll to explore
          </motion.span>
          <div className="w-8 h-12 rounded-full border-2 border-primary flex justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="w-2 h-2 rounded-full bg-primary"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Lamp;
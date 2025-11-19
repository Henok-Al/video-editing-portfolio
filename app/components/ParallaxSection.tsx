"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';

const ParallaxSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-200, 200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y4 = useTransform(scrollYProgress, [0, 1], [200, -200]);

  // Mock projects data
  const projects = [
    { id: 1, title: "Corporate Brand Story", category: "Commercial" },
    { id: 2, title: "Music Festival Highlights", category: "Event" },
    { id: 3, title: "Travel Documentary", category: "Documentary" },
    { id: 4, title: "Product Launch Campaign", category: "Promotional" }
  ];

  return (
    <section ref={containerRef} className="py-20 bg-black overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Parallax Showcase
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Scroll to see projects with a parallax effect
          </p>
        </motion.div>

        <div className="relative h-[150vh]">
          {/* Background elements with parallax */}
          <motion.div 
            style={{ y: y1 }}
            className="absolute top-20 left-10 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl"
          />
          
          <motion.div 
            style={{ y: y2 }}
            className="absolute top-1/3 right-20 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl"
          />
          
          <motion.div 
            style={{ y: y3 }}
            className="absolute top-2/3 left-20 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl"
          />
          
          <motion.div 
            style={{ y: y4 }}
            className="absolute bottom-20 right-10 w-40 h-40 bg-rose-500/20 rounded-full blur-3xl"
          />

          {/* Projects with parallax effect */}
          <div className="relative space-y-20">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="flex justify-center"
              >
                <div className="group relative">
                  <div className="bg-gray-800 w-80 h-64 rounded-xl overflow-hidden shadow-2xl transform transition-all duration-500 group-hover:scale-105">
                    <div className="bg-gray-700 w-full h-full flex items-center justify-center">
                      <div className="text-gray-500">Project Thumbnail</div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                      <span className="text-emerald-400 text-sm font-medium">{project.category}</span>
                      <h3 className="text-white text-xl font-bold">{project.title}</h3>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParallaxSection;
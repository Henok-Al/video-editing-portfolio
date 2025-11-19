"use client";

import React from "react";
import { motion } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "Corporate Brand Story",
    description: "A compelling narrative for a tech startup's brand identity",
    category: "Commercial",
    thumbnail: "/placeholder-video-1.jpg"
  },
  {
    id: 2,
    title: "Music Festival Highlights",
    description: "Energetic recap of the annual music festival experience",
    category: "Event",
    thumbnail: "/placeholder-video-2.jpg"
  },
  {
    id: 3,
    title: "Travel Documentary",
    description: "Exploring hidden gems across Southeast Asia",
    category: "Documentary",
    thumbnail: "/placeholder-video-3.jpg"
  },
  {
    id: 4,
    title: "Product Launch Campaign",
    description: "Showcasing innovative features of the new gadget",
    category: "Promotional",
    thumbnail: "/placeholder-video-4.jpg"
  }
];

const PortfolioSection = () => {
  return (
    <section className="py-20 bg-gray-900">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-xl cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                <div className="bg-gray-700 w-full h-full flex items-center justify-center">
                  <div className="text-gray-500">Video Thumbnail</div>
                </div>
                <div className="absolute top-4 right-4 bg-emerald-600 text-white text-sm font-medium px-3 py-1 rounded-full">
                  {project.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400">{project.description}</p>
                <button className="mt-4 text-emerald-400 hover:text-emerald-300 font-medium flex items-center">
                  Watch Project
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-12"
        >
          <button className="border-2 border-emerald-600 text-emerald-400 hover:bg-emerald-600 hover:text-white font-medium py-3 px-8 rounded-full transition-all duration-300">
            View Full Portfolio
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioSection;
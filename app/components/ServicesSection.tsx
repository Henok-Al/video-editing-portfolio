"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  {
    id: "01",
    title: "Video Editing",
    description: "Crafting narrative flow and rhythm from raw footage. I specialize in pacing that keeps audiences engaged from the first frame to the last.",
  },
  {
    id: "02",
    title: "Color Grading",
    description: "Elevating mood and atmosphere through color. From corrective balancing to stylized looks that define the visual identity of your project.",
  },
  {
    id: "03",
    title: "Motion Graphics",
    description: "Adding dynamic visual layers to explain, enhance, and entertain. Seamless integration of text, shapes, and effects.",
  },
  {
    id: "04",
    title: "Sound Design",
    description: "Building immersive sonic landscapes. Professional mixing, foley, and sound effects that drive the emotional impact of the visual.",
  }
];

const ServicesSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-32 bg-background" id="services">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-4">
            Services
          </h2>
          <p className="text-3xl md:text-5xl font-bold text-white max-w-3xl leading-tight">
            Comprehensive post-production solutions tailored to your unique vision.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative border-t border-white/10 pt-8 transition-colors duration-500 hover:border-primary/50"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="text-primary/50 font-mono text-sm tracking-widest group-hover:text-primary transition-colors duration-300">
                  {service.id}
                </span>
                <motion.div
                  animate={{
                    rotate: hoveredIndex === index ? 45 : 0,
                    scale: hoveredIndex === index ? 1.1 : 1
                  }}
                  className="text-white/30 group-hover:text-primary transition-colors duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors duration-300">
                {service.title}
              </h3>

              <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
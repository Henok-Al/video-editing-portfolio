"use client";

import React from "react";
import { motion } from "framer-motion";

const services = [
  {
    title: "Video Editing",
    description: "Professional editing services for all types of content including commercials, documentaries, and social media videos.",
    icon: "✂️"
  },
  {
    title: "Color Grading",
    description: "Enhance the visual appeal of your videos with professional color correction and creative grading techniques.",
    icon: "🎨"
  },
  {
    title: "Motion Graphics",
    description: "Create engaging animations and visual effects to elevate your storytelling and brand identity.",
    icon: "✨"
  },
  {
    title: "Sound Design",
    description: "Professional audio editing, mixing, and sound effects to complement your visual content.",
    icon: "🎵"
  }
];

const ServicesSection = () => {
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
            My Services
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Comprehensive video production services tailored to your unique needs and vision
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                y: -15,
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              className="bg-card-bg rounded-xl p-6 shadow-xl border border-card-border hover:border-primary transition-all duration-300 group"
            >
              <motion.div 
                className="text-4xl mb-4 flex justify-center"
                whileHover={{ 
                  scale: 1.3, 
                  rotate: [0, 10, -10, 0],
                  transition: { duration: 0.5 }
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {service.icon}
              </motion.div>
              <motion.h3 
                className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300"
                whileHover={{ x: 5 }}
              >
                {service.title}
              </motion.h3>
              <motion.p 
                className="text-gray-400 mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {service.description}
              </motion.p>
              <motion.div
                className="mt-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <motion.button
                  className="text-primary hover:text-primary-dark font-medium flex items-center group"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn more
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
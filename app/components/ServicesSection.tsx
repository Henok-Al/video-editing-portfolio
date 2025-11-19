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
                y: -10,
                scale: 1.03,
                transition: { duration: 0.3 }
              }}
              className="bg-card-bg rounded-xl p-6 shadow-xl border border-card-border hover:border-primary transition-all duration-300"
            >
              <motion.div 
                className="text-4xl mb-4"
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {service.icon}
              </motion.div>
              <motion.h3 
                className="text-xl font-bold text-white mb-2"
                whileHover={{ color: "#10b981" }}
              >
                {service.title}
              </motion.h3>
              <motion.p 
                className="text-gray-400"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {service.description}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
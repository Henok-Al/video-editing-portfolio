"use client";

import React from "react";
import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section className="py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-start gap-20">
          {/* Minimalist Image Placeholder / Visual */}
          <motion.div
            className="lg:w-5/12 w-full sticky top-32"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="aspect-[3/4] bg-card-bg/30 rounded-sm overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-60" />

              {/* Abstract representation of video work */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full relative">
                  <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border border-white/10 rounded-full animate-[spin_10s_linear_infinite]" />
                  <div className="absolute top-1/3 left-1/3 w-1/3 h-1/3 border border-primary/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                </div>
                <span className="relative z-10 text-white/20 font-light tracking-[0.5em] text-sm uppercase -rotate-90">
                  Portrait
                </span>
              </div>

              {/* Corner accents */}
              <div className="absolute top-4 left-4 w-2 h-2 bg-white/50" />
              <div className="absolute bottom-4 right-4 w-2 h-2 bg-primary/50" />
            </div>
          </motion.div>

          {/* Content */}
          <div className="lg:w-7/12 w-full pt-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-8">
                About Me
              </h2>

              <h3 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-12">
                I transform raw footage into <span className="text-gray-500">compelling visual stories.</span>
              </h3>

              <div className="space-y-8 text-lg text-gray-400 font-light leading-relaxed max-w-2xl">
                <p>
                  With over 1 years of experience, I don't just cut video; I craft rhythm, emotion, and narrative flow. My approach is rooted in the belief that every frame matters.
                </p>
                <p>
                  Whether it's a high-energy commercial or a nuanced documentary, I bring a cinematic eye and technical precision to elevate your vision.
                </p>
              </div>

              {/* Minimalist Skills Grid */}
              <div className="mt-16 grid grid-cols-2 gap-y-8 gap-x-4">
                {[
                  "Color Grading",
                  "Sound Design",
                  "Motion Graphics",
                  "Visual Effects"
                ].map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-[1px] bg-gray-700 group-hover:bg-primary transition-colors duration-300" />
                    <span className="text-white font-medium tracking-wide">{skill}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="mt-20"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <button className="text-white border-b border-white/30 pb-1 hover:border-primary hover:text-primary transition-all duration-300 text-sm tracking-widest uppercase">
                  Download Resume
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
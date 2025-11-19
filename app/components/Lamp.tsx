"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Lamp = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition < 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  const title = "Henok Alemu";
  const subtitle = "Video Editor";

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background pt-20 pb-32">
      {/* Subtle, cinematic background */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.08)_0%,transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,rgba(6,182,212,0.05)_0%,transparent_40%)]" />
      </div>

      {/* Content area */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full text-center px-4 max-w-5xl mx-auto mt-10">

        {/* Main Title Staggered Reveal */}
        <motion.h1
          className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter text-white mb-4"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.05 } }
          }}
        >
          {title.split("").map((char, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              transition={{ duration: 0.8, ease: [0.6, 0.01, 0.05, 0.9] }}
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle with gradient and slow reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary uppercase">
            {subtitle}
          </h2>
          <motion.div
            className="absolute -bottom-2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 1.2, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Minimalist Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-12 text-lg text-gray-400 max-w-xl font-light leading-relaxed"
        >
          Crafting visual narratives that resonate.
          <br />
          Precision editing. Creative storytelling.
        </motion.p>

        {/* Minimalist Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="mt-16 flex flex-col sm:flex-row gap-8 items-center"
        >
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative px-6 py-3 text-white font-medium text-sm tracking-widest uppercase overflow-hidden"
          >
            <span className="relative z-10 group-hover:text-black transition-colors duration-500">View Work</span>
            <span className="absolute inset-0 border border-white/20 group-hover:border-transparent transition-colors duration-500" />
            <span className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </button>

          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-gray-400 hover:text-white text-sm tracking-widest uppercase transition-colors duration-300 flex items-center gap-2"
          >
            Contact Me
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-gray-500 to-transparent opacity-30" />
      </motion.div>
    </div>
  );
};

export default Lamp;
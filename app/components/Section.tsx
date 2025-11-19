"use client";

import React, { useRef } from "react";
import { motion, useInView, HTMLMotionProps } from "framer-motion";

interface SectionProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
}

const Section: React.FC<SectionProps> = ({ 
  children, 
  className = "", 
  delay = 0, 
  direction = "up",
  ...props 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const getInitialVariants = () => {
    switch (direction) {
      case "up":
        return { opacity: 0, y: 50 };
      case "left":
        return { opacity: 0, x: -50 };
      case "right":
        return { opacity: 0, x: 50 };
      case "none":
      default:
        return { opacity: 0 };
    }
  };

  const getAnimateVariants = () => {
    switch (direction) {
      case "up":
        return { opacity: 1, y: 0 };
      case "left":
      case "right":
        return { opacity: 1, x: 0 };
      case "none":
      default:
        return { opacity: 1 };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={getInitialVariants()}
      animate={isInView ? getAnimateVariants() : getInitialVariants()}
      transition={{ duration: 0.8, delay: delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Section;

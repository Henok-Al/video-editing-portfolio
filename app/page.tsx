"use client";

import React, { useEffect, useRef } from "react";
import Lamp from "./components/Lamp";
import ProjectsGallery from "./components/ProjectsGallery";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import Footer from "./components/Footer";

export default function Home() {
  const aboutRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("appear");
        }
      });
    }, observerOptions);

    // Observe all elements with animation classes
    const elements = document.querySelectorAll(".fade-in, .slide-in-left, .slide-in-right");
    elements.forEach(el => observer.observe(el));

    // Cleanup observer on unmount
    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <Lamp />
      
      <div ref={aboutRef} className="fade-in">
        <AboutSection />
      </div>
      
      <div ref={servicesRef} className="slide-in-left mt-8 md:mt-16">
        <ServicesSection />
      </div>
      
      <div ref={projectsRef} className="slide-in-right mt-8 md:mt-16">
        <ProjectsGallery />
      </div>
      
      <div className="mt-8 md:mt-16">
        <Footer />
      </div>
    </div>
  );
}
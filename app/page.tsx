"use client";

import React from "react";
import Navbar from "./components/Navbar";
import Lamp from "./components/Lamp";
import ProjectsGallery from "./components/ProjectsGallery";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import Footer from "./components/Footer";
import Section from "./components/Section";
import ContactSection from "./components/ContactSection";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <div id="home">
        <Lamp />
      </div>

      <div id="about">
        <Section direction="up" className="relative z-10">
          <AboutSection />
        </Section>
      </div>

      <div id="services">
        <Section direction="left" className="mt-8 md:mt-16 relative z-10">
          <ServicesSection />
        </Section>
      </div>

      <div id="projects">
        <Section direction="right" className="mt-8 md:mt-16 relative z-10">
          <ProjectsGallery />
        </Section>
      </div>

      <div id="contact">
        <Section direction="up" className="mt-8 md:mt-16 relative z-10">
          <ContactSection />
        </Section>
      </div>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
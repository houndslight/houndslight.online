"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";

export default function AboutPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/aboutme-bg-1759640580880.jpg')"
        }}
      />
      
      <Navigation />
      <CustomCursor />

      <div className="relative z-10 pt-32 pb-20 px-6 md:px-12">
        {/* Page Title - Japanese Character */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 
            className="text-6xl md:text-7xl font-light text-white/95 tracking-wider"
            style={{ fontFamily: "'Hiragino Mincho Pro', serif" }}
          >
            約
          </h1>
        </motion.div>

        {/* Content - Minimalist Layout */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-3xl mx-auto space-y-8"
          style={{ fontFamily: "'Hiragino Mincho Pro', serif" }}
        >
          <p className="text-white/90 text-base md:text-lg leading-loose font-light">
            Hi! I'm Zachary Tapocik, a UX Designer and Full-Stack Engineer passionate about creating products that are intuitive, performant, and delightful to use.
          </p>

          <p className="text-white/90 text-base md:text-lg leading-loose font-light">
            I specialize in designing human-centered experiences and bringing them to life with clean, scalable code. I've worked on a variety of projects — from collaborative music platforms and crypto dashboards to headless commerce and language-learning tools — focusing on problem-solving, usability, and measurable impact.
          </p>

          <p className="text-white/90 text-base md:text-lg leading-loose font-light">
            My workflow combines research, prototyping, and production-ready engineering, so I can take an idea from concept to launch. When I'm not building or designing, you can find me contributing to open-source projects or exploring new ways to streamline workflows and improve accessibility.
          </p>

          <p className="text-white/90 text-base md:text-lg leading-loose font-light pt-6">
            Check out my projects and code on GitHub
          </p>
        </motion.div>
      </div>
    </div>
  );
}
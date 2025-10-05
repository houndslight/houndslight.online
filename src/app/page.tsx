"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/homepage-bg-1759640793392.jpg')"
        }}
      />
      
      <Navigation />
      <CustomCursor />

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-between min-h-screen px-8 md:px-16 lg:px-24">
        {/* Left Side - Navigation Links */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex gap-8 md:gap-12 items-center"
          style={{ fontFamily: "'Hiragino Mincho Pro', serif" }}
        >
          <Link href="/work" className="group">
            <div className="text-white/90 hover:text-white transition-colors">
              <div className="text-2xl md:text-3xl font-light tracking-wide mb-1">Work</div>
              <div className="text-sm md:text-base font-light tracking-wider opacity-70">仕事</div>
            </div>
          </Link>
          
          <div className="text-white/40 text-3xl font-light">|</div>
          
          <Link href="/resume" className="group">
            <div className="text-white/90 hover:text-white transition-colors">
              <div className="text-2xl md:text-3xl font-light tracking-wide mb-1">Resume</div>
              <div className="text-sm md:text-base font-light tracking-wider opacity-70">履歴書</div>
            </div>
          </Link>
          
          <div className="text-white/40 text-3xl font-light">|</div>
          
          <Link href="/about" className="group">
            <div className="text-white/90 hover:text-white transition-colors">
              <div className="text-2xl md:text-3xl font-light tracking-wide mb-1">About</div>
              <div className="text-sm md:text-base font-light tracking-wider opacity-70">概要</div>
            </div>
          </Link>
        </motion.div>

        {/* Right Side - Name and Title */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-right"
          style={{ fontFamily: "'Hiragino Mincho Pro', serif" }}
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.7 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white mb-4 tracking-wide"
          >
            Zachary J. Tapocik
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="h-px bg-white/30 mb-4 ml-auto"
            style={{ width: "100%" }}
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.3 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl font-light text-white/90 tracking-wider"
          >
            UX Design | Full-Stack Engineer
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 relative">
      <Navigation />
      <CustomCursor />

      <div className="relative z-10 pt-32 pb-20 px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-light text-white/90 tracking-wide">
            履歴書
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto text-white"
        >
          <p className="text-xl text-center mb-12">Resume content coming soon...</p>
        </motion.div>
      </div>
    </div>
  );
}
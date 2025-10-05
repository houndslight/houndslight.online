"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";

const projects = [
  {
    title: "Waveform",
    subtitle: "Collaborative Music Platform (Independent MVP)",
    role: "Product design & frontend engineering (end-to-end)",
    timeframe: "4 months",
    problem:
      "Remote collaborators needed a simpler way to share stems, leave contextual feedback, and track versions during music production.",
    approach:
      "Conducted interviews with musicians, mapped collaboration flows, and iterated rapid prototypes. Ran usability tests and refined interactions.",
    solution:
      "Built a session UI with shared timelines, comment threads tied to timestamps, and a lightweight versioning panel. Implemented a React frontend with serverless functions for upload processing and preview generation.",
    deliverables:
      "Research notes, Figma prototypes, production React app, component library, onboarding flow.",
    tech: "Figma, React, TypeScript, Supabase, Vercel.",
  },
  {
    title: "CryptoHub",
    subtitle: "Cryptocurrency Dashboard & Analytics",
    role: "UX Design & Full-Stack Development",
    timeframe: "3 months",
    problem:
      "Crypto traders needed a unified dashboard to track multiple portfolios, market trends, and real-time price alerts.",
    approach:
      "Researched competitor products, conducted user interviews with active traders, and created interactive prototypes.",
    solution:
      "Built a responsive dashboard with real-time WebSocket connections, customizable widgets, and advanced charting capabilities.",
    deliverables:
      "User research documentation, interactive prototypes, production application, API integration.",
    tech: "Next.js, TypeScript, WebSocket, D3.js, TailwindCSS.",
  },
];

export default function WorkPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + newDirection;
      if (newIndex < 0) return projects.length - 1;
      if (newIndex >= projects.length) return 0;
      return newIndex;
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/workpage-bg-1759640578352.jpg')"
        }}
      />

      <Navigation />
      <CustomCursor />

      <div className="relative z-10 pt-32 pb-20 px-6 md:px-12" style={{ fontFamily: "'Hiragino Mincho Pro', serif" }}>
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-6xl md:text-7xl font-light text-white/95 tracking-wider">
            仕事
          </h1>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-4xl mx-auto mb-20"
        >
          <p className="text-white/90 text-base md:text-lg leading-loose font-light mb-6">
            I'm Zachary Tapocik — UX Designer & Full-Stack Engineer.
            <br />I design product experiences and ship production code.
          </p>
          <p className="text-white/80 text-base md:text-lg leading-loose font-light">
            Below are independent and client projects that show my process from problem to
            impact.
            <br />
            Click any project for details, artifacts, and code.
          </p>
        </motion.div>

        {/* Project Carousel */}
        <div className="max-w-4xl mx-auto relative">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="bg-white/5 backdrop-blur-sm rounded-lg p-8 md:p-12 text-white border border-white/10"
            >
              <h2 className="text-2xl md:text-3xl font-light mb-2">
                {projects[currentIndex].title}
              </h2>
              <p className="text-lg md:text-xl text-white/80 mb-8 font-light">
                {projects[currentIndex].subtitle}
              </p>

              <div className="space-y-5 text-sm md:text-base font-light leading-loose">
                <p>
                  <span className="text-white/60">Role:</span>{" "}
                  {projects[currentIndex].role}
                </p>
                <p>
                  <span className="text-white/60">Timeframe:</span>{" "}
                  {projects[currentIndex].timeframe}
                </p>
                <p>
                  <span className="text-white/60">Problem:</span>{" "}
                  {projects[currentIndex].problem}
                </p>
                <p>
                  <span className="text-white/60">Approach:</span>{" "}
                  {projects[currentIndex].approach}
                </p>
                <p>
                  <span className="text-white/60">Solution:</span>{" "}
                  {projects[currentIndex].solution}
                </p>
                <p>
                  <span className="text-white/60">What I delivered:</span>{" "}
                  {projects[currentIndex].deliverables}
                </p>
                <p>
                  <span className="text-white/60">Tech:</span>{" "}
                  {projects[currentIndex].tech}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-12 mt-16">
            <motion.button
              onClick={() => paginate(-1)}
              className="text-white/80 hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft size={40} strokeWidth={1} />
            </motion.button>

            <span className="text-white/90 text-xl font-light tracking-wider">
              {currentIndex + 1} / {projects.length}
            </span>

            <motion.button
              onClick={() => paginate(1)}
              className="text-white/80 hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight size={40} strokeWidth={1} />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
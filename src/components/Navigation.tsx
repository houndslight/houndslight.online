"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Twitter, Instagram, Music, Mail } from "lucide-react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { en: "Work", jp: "仕事", href: "/work" },
    { en: "Resume", jp: "履歴書", href: "/resume" },
    { en: "About", jp: "概要", href: "/about" },
  ];

  const socialLinks = [
    { icon: Twitter, href: "https://twitter.com" },
    { icon: Instagram, href: "https://instagram.com" },
    { icon: Music, href: "https://spotify.com" },
    { icon: Mail, href: "mailto:hello@example.com" },
  ];

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 p-6 md:p-8" style={{ fontFamily: "'Hiragino Mincho Pro', serif" }}>
        <div className="flex items-center justify-between">
          {/* Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-3 text-white hover:opacity-80 transition-opacity"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? <X size={28} strokeWidth={1} /> : <Menu size={28} strokeWidth={1} />}
            <span className="text-base font-light tracking-widest">ザカリー</span>
          </motion.button>

          {/* Center Navigation */}
          <nav className="hidden md:flex items-center gap-16 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white hover:opacity-70 transition-opacity"
              >
                <div className="text-center">
                  <div className="text-sm font-light tracking-widest">{item.en}</div>
                  <div className="text-xs opacity-60 mt-1 tracking-wide">{item.jp}</div>
                </div>
              </Link>
            ))}
          </nav>

          {/* Social Icons */}
          <div className="flex items-center gap-5">
            {socialLinks.map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:opacity-70 transition-opacity"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <social.icon size={20} strokeWidth={1.5} />
              </motion.a>
            ))}
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-40 flex items-center justify-center"
            style={{ fontFamily: "'Hiragino Mincho Pro', serif" }}
          >
            <nav className="flex flex-col items-center gap-12">
              {menuItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:opacity-70 transition-opacity"
                  >
                    <div className="text-center">
                      <div className="text-2xl font-light tracking-widest">{item.en}</div>
                      <div className="text-lg opacity-60 mt-2 tracking-wide">{item.jp}</div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
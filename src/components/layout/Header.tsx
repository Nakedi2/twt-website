"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  ChevronDown,
  Monitor,
  BrainCircuit,
  Megaphone,
  Code2,
  GraduationCap,
  Lightbulb,
} from "lucide-react";
import Link from "next/link";
import DarkModeToggle from "./DarkModeToggle";
import MobileMenu from "./MobileMenu";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const megaMenuSections = [
  {
    title: "Digital Solutions",
    links: [
      {
        label: "EdTech Platforms",
        href: "/services/edtech",
        description: "Custom learning management systems",
        icon: <Monitor className="h-5 w-5" />,
      },
      {
        label: "AI & Automation",
        href: "/services/ai",
        description: "Intelligent education tools",
        icon: <BrainCircuit className="h-5 w-5" />,
      },
    ],
  },
  {
    title: "Content & Marketing",
    links: [
      {
        label: "Digital Marketing",
        href: "/services/marketing",
        description: "Strategic brand campaigns",
        icon: <Megaphone className="h-5 w-5" />,
      },
      {
        label: "Software Development",
        href: "/services/dev",
        description: "Full-stack applications",
        icon: <Code2 className="h-5 w-5" />,
      },
    ],
  },
  {
    title: "Education",
    links: [
      {
        label: "E-Learning Content",
        href: "/services/elearning",
        description: "Interactive course material",
        icon: <GraduationCap className="h-5 w-5" />,
      },
      {
        label: "Innovation Consulting",
        href: "/services/consulting",
        description: "Digital transformation strategy",
        icon: <Lightbulb className="h-5 w-5" />,
      },
    ],
  },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const megaMenuTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMegaMenuEnter = useCallback(() => {
    if (megaMenuTimeout.current) {
      clearTimeout(megaMenuTimeout.current);
      megaMenuTimeout.current = null;
    }
    setIsMegaMenuOpen(true);
  }, []);

  const handleMegaMenuLeave = useCallback(() => {
    megaMenuTimeout.current = setTimeout(() => setIsMegaMenuOpen(false), 200);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 dark:bg-[#0A1628]/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-white/5 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <img
                src="/logo.jpg"
                alt="The Walking Textbooks"
                className="h-10 w-10 rounded-xl object-cover shadow-md group-hover:shadow-lg group-hover:shadow-[#6C3CE1]/20 transition-shadow"
              />
              <div className="hidden sm:block">
                <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight">
                  The Walking
                </p>
                <p className="text-sm font-bold text-[#6C3CE1] leading-tight">Textbooks</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                if (link.label === "Services") {
                  return (
                    <div
                      key={link.label}
                      onMouseEnter={handleMegaMenuEnter}
                      onMouseLeave={handleMegaMenuLeave}
                      className="relative"
                    >
                      <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
                        Services
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${
                            isMegaMenuOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              <DarkModeToggle className="hidden lg:flex" />
              <Link
                href="/contact"
                className="hidden lg:inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-[#0A1628] to-[#6C3CE1] text-white text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-[#6C3CE1]/25 transition-all duration-300"
              >
                Get Started
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Mega Menu */}
        <AnimatePresence>
          {isMegaMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              onMouseEnter={handleMegaMenuEnter}
              onMouseLeave={handleMegaMenuLeave}
              className="hidden lg:block absolute top-full left-0 right-0 bg-white/95 dark:bg-[#0D1B2E]/95 backdrop-blur-xl border-b border-gray-200/50 dark:border-white/5 shadow-xl"
            >
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-3 gap-8">
                  {megaMenuSections.map((section) => (
                    <div key={section.title}>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4 px-3">
                        {section.title}
                      </h3>
                      <div className="space-y-1">
                        {section.links.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            className="flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group"
                          >
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#6C3CE1]/10 dark:bg-[#6C3CE1]/20 text-[#6C3CE1] dark:text-[#00D4FF] group-hover:scale-110 transition-transform">
                              {item.icon}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {item.label}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {item.description}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navLinks={navLinks}
        megaMenuSections={megaMenuSections}
      />
    </>
  );
}

"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import DarkModeToggle from "./DarkModeToggle";

interface NavLink {
  label: string;
  href: string;
}

interface MegaMenuSection {
  title: string;
  links: { label: string; href: string; description: string; icon: React.ReactNode }[];
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLink[];
  megaMenuSections: MegaMenuSection[];
}

export default function MobileMenu({
  isOpen,
  onClose,
  navLinks,
  megaMenuSections,
}: MobileMenuProps) {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  const toggleAccordion = (label: string) => {
    setOpenAccordion((prev) => (prev === label ? null : label));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white dark:bg-[#0A1628] z-50 lg:hidden overflow-y-auto shadow-2xl"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-white/10">
              <span className="text-lg font-bold text-gray-900 dark:text-white">Menu</span>
              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                aria-label="Close menu"
              >
                <X className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>

            <nav className="p-6 space-y-1">
              {navLinks.map((link) => {
                if (link.label === "Services") {
                  return (
                    <div key={link.label}>
                      <button
                        onClick={() => toggleAccordion("Services")}
                        className="flex items-center justify-between w-full px-4 py-3 text-left text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl transition-colors"
                      >
                        <span className="font-medium">{link.label}</span>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${
                            openAccordion === "Services" ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {openAccordion === "Services" && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-4 pb-2 space-y-1">
                              {megaMenuSections.map((section) => (
                                <div key={section.title}>
                                  <p className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                                    {section.title}
                                  </p>
                                  {section.links.map((item) => (
                                    <Link
                                      key={item.label}
                                      href={item.href}
                                      onClick={onClose}
                                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 dark:text-gray-400 hover:text-[#6C3CE1] dark:hover:text-[#00D4FF] hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl transition-colors"
                                    >
                                      {item.icon}
                                      <span>{item.label}</span>
                                    </Link>
                                  ))}
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={onClose}
                    className="block px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl font-medium transition-colors"
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 dark:border-white/10 bg-white dark:bg-[#0A1628] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Toggle theme</span>
                <DarkModeToggle />
              </div>
              <Link
                href="/contact"
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-r from-[#0A1628] to-[#6C3CE1] text-white rounded-xl font-medium hover:shadow-lg hover:shadow-[#6C3CE1]/25 transition-all"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

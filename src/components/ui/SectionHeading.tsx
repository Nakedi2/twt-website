"use client";

import React from "react";
import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  gradient?: boolean;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  gradient = false,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  return (
    <div
      className={`mb-12 md:mb-16 ${align === "center" ? "text-center" : "text-left"} ${className}`}
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight ${
          gradient
            ? "bg-gradient-to-r from-[#0A1628] via-[#6C3CE1] to-[#00D4FF] dark:from-white dark:via-purple-200 dark:to-cyan-200 bg-clip-text text-transparent"
            : "text-gray-900 dark:text-white"
        }`}
      >
        {title}
      </motion.h2>

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#6C3CE1] to-[#00D4FF] ${
          align === "center" ? "mx-auto" : ""
        }`}
      />

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={`mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

"use client";

import React from "react";
import { motion } from "framer-motion";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
  height?: string;
}

interface CardIconProps {
  children: React.ReactNode;
  className?: string;
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
  as?: "h2" | "h3" | "h4";
}

interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

interface CardActionsProps {
  children: React.ReactNode;
  className?: string;
}

const paddingClasses = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

function Card({
  children,
  className = "",
  hover = true,
  padding = "md",
}: CardProps) {
  return (
    <motion.div
      whileHover={
        hover
          ? { y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }
          : {}
      }
      className={`
        relative rounded-2xl overflow-hidden
        bg-white/70 dark:bg-white/5
        backdrop-blur-xl
        border border-gray-200/60 dark:border-white/10
        shadow-sm dark:shadow-none
        transition-colors duration-300
        ${paddingClasses[padding]}
        ${className}
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#6C3CE1]/5 via-transparent to-[#00D4FF]/5 pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

function CardImage({ src, alt, className = "", height = "h-48" }: CardImageProps) {
  return (
    <div className={`relative ${height} -m-6 mb-6 overflow-hidden ${className}`}>
      <img src={src} alt={alt} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
    </div>
  );
}

function CardIcon({ children, className = "" }: CardIconProps) {
  return (
    <div
      className={`
        inline-flex items-center justify-center
        w-12 h-12 rounded-xl
        bg-gradient-to-br from-[#6C3CE1]/10 to-[#00D4FF]/10
        dark:from-[#6C3CE1]/20 dark:to-[#00D4FF]/20
        text-[#6C3CE1] dark:text-[#00D4FF]
        mb-4
        ${className}
      `}
    >
      {children}
    </div>
  );
}

function CardTitle({
  children,
  className = "",
  as: Tag = "h3",
}: CardTitleProps) {
  return (
    <Tag
      className={`text-lg font-semibold text-gray-900 dark:text-white mb-2 ${className}`}
    >
      {children}
    </Tag>
  );
}

function CardDescription({ children, className = "" }: CardDescriptionProps) {
  return (
    <p className={`text-gray-600 dark:text-gray-400 leading-relaxed ${className}`}>
      {children}
    </p>
  );
}

function CardActions({ children, className = "" }: CardActionsProps) {
  return (
    <div className={`flex items-center gap-3 mt-6 ${className}`}>{children}</div>
  );
}

export { Card, CardImage, CardIcon, CardTitle, CardDescription, CardActions };
export default Card;

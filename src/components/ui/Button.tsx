"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

type ButtonSize = "sm" | "md" | "lg";
type ButtonVariant = "primary" | "secondary" | "ghost" | "accent";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  children: React.ReactNode;
  fullWidth?: boolean;
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm gap-1.5",
  md: "px-6 py-2.5 text-sm gap-2",
  lg: "px-8 py-3.5 text-base gap-2.5",
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-[#0A1628] to-[#6C3CE1] text-white hover:shadow-lg hover:shadow-[#6C3CE1]/25",
  secondary:
    "border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5",
  ghost:
    "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5",
  accent:
    "bg-[#00D4FF] text-[#0A1628] hover:shadow-lg hover:shadow-[#00D4FF]/25 font-semibold",
};

export default function Button({
  variant = "primary",
  size = "md",
  href,
  loading = false,
  icon,
  iconPosition = "left",
  children,
  fullWidth = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses = `
    inline-flex items-center justify-center rounded-xl font-medium
    transition-all duration-300 ease-out
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6C3CE1] focus-visible:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${fullWidth ? "w-full" : ""}
    ${className}
  `;

  const content = (
    <>
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {!loading && icon && iconPosition === "left" && icon}
      <span>{children}</span>
      {!loading && icon && iconPosition === "right" && icon}
    </>
  );

  const motionProps = {
    whileHover: disabled || loading ? {} : { scale: 1.02 },
    whileTap: disabled || loading ? {} : { scale: 0.98 },
    transition: { type: "spring", stiffness: 400, damping: 25 },
  };

  if (href && !disabled && !loading) {
    return (
      <motion.div {...motionProps} className="inline-flex">
        <Link href={href} className={baseClasses}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      {...motionProps}
      className={baseClasses}
      disabled={disabled || loading}
      {...(props as any)}
    >
      {content}
    </motion.button>
  );
}

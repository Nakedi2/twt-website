import React from "react";

type BadgeVariant = "default" | "purple" | "cyan" | "green";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default:
    "bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300",
  purple:
    "bg-[#6C3CE1]/10 text-[#6C3CE1] dark:bg-[#6C3CE1]/20 dark:text-purple-300",
  cyan:
    "bg-[#00D4FF]/10 text-[#00b8d9] dark:bg-[#00D4FF]/20 dark:text-cyan-300",
  green:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300",
};

export default function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center
        px-3 py-0.5 rounded-full
        text-xs font-medium
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}

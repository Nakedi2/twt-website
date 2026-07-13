import React from "react";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "h4" | "p";
  from?: string;
  to?: string;
}

export default function GradientText({
  children,
  className = "",
  as: Tag = "span",
  from = "#0A1628",
  to = "#6C3CE1",
}: GradientTextProps) {
  return (
    <Tag
      className={`bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: `linear-gradient(to right, ${from}, ${to})`,
      }}
    >
      {children}
    </Tag>
  );
}

"use client";

import React from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function GlassCard({ children, className = "", ...props }: GlassCardProps) {
  return (
    <div
      className={`glass-panel p-5 sm:p-7 transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

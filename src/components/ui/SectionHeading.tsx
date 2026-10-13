"use client";

import React from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`text-center space-y-2 mb-8 ${className}`}>
      {eyebrow && (
        <span className="text-xs text-[var(--gold-dark)] font-semibold uppercase block">
          {eyebrow}
        </span>
      )}
      <h2 className="text-2xl sm:text-3xl font-bold text-[var(--ink)] font-vazir leading-relaxed">
        {title}
      </h2>
      {subtitle && (
        <p className="text-xs sm:text-sm text-[var(--ink-muted)] max-w-md mx-auto">
          {subtitle}
        </p>
      )}
      <div className="flex items-center justify-center gap-3 pt-1">
        <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent to-[var(--gold)]" />
        <svg className="w-4 h-4 text-[var(--gold)]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L15 12L12 22L9 12Z" />
          <circle cx="5" cy="12" r="1.5" />
          <circle cx="19" cy="12" r="1.5" />
        </svg>
        <div className="h-px w-12 sm:w-16 bg-gradient-to-l from-transparent to-[var(--gold)]" />
      </div>
    </div>
  );
}

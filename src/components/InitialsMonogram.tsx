"use client";

import { motion } from "motion/react";

interface InitialsMonogramProps {
  className?: string;
  size?: number | string;
}

export default function InitialsMonogram({
  className = "",
  size = "clamp(150px, 34vw, 280px)",
}: InitialsMonogramProps) {
  return (
    <motion.div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: typeof size === "number" ? `${size}px` : size }}
      initial={{ opacity: 0, scale: 0.88, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.span
        aria-hidden="true"
        className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgba(126,159,131,0.24),transparent_68%)] blur-xl"
        animate={{ opacity: [0.45, 0.8, 0.45], scale: [0.92, 1.04, 0.92] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.img
        src="/initials-removebg-preview.svg"
        alt="Bahara and Aminullah initials"
        className="relative z-10 h-full w-full object-contain drop-shadow-[0_8px_18px_rgba(95,125,100,0.2)]"
        animate={{ opacity: [0.88, 1, 0.88], scale: [0.98, 1, 0.98] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

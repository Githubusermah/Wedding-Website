"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { event } from "@/lib/event";
import { ArrowUp } from "@phosphor-icons/react";
import InitialsMonogram from "@/components/InitialsMonogram";

export default function FooterReplay() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-16 px-4 border-t border-[var(--line-subtle)] text-center space-y-8 max-w-2xl mx-auto">
      <div className="flex flex-col items-center justify-center space-y-4">
        {/* Prominent, Chic Animated Initials Monogram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 15 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative py-2 flex items-center justify-center"
        >
          {/* Soft ambient backlight behind monogram */}
          <div className="absolute inset-0 bg-radial from-[var(--gold-light)]/25 via-[var(--gold)]/5 to-transparent rounded-full blur-2xl opacity-80 pointer-events-none" />
          <InitialsMonogram size="clamp(140px, 28vw, 190px)" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-2"
        >
          <p className="font-nastaliq text-3xl sm:text-4xl text-[var(--ink)] font-bold mt-1 tracking-wide">
            {event.coupleDisplayName}
          </p>
          <p className="text-xs sm:text-sm text-[var(--ink-muted)] max-w-md mx-auto leading-relaxed">
            با سپاس از تشریف‌فرمایی و قدوم مبارک شما در این جشن فرخنده
          </p>
        </motion.div>
      </div>

      {/* Arvin Atelier Signature Branding */}
      <div className="pt-2 flex flex-col items-center justify-center gap-1 opacity-80 hover:opacity-100 transition-opacity">
        <div className="relative w-20 h-10">
          <Image
            src="/arvin-atelier-logo.jpg"
            alt="Arvin Atelier Logo"
            fill
            className="object-contain"
          />
        </div>
        <span className="text-[9px] text-[var(--ink-muted)] font-mono tracking-widest uppercase">
          DESIGNED BY ARVIN ATELIER
        </span>
      </div>

      <div className="pt-4 border-t border-[var(--line-subtle)] flex items-center justify-between text-xs text-[var(--ink-muted)]">
        <span>۱۴۰۵ هـ.ش</span>
        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-1 font-medium text-[var(--gold-dark)] hover:underline cursor-pointer"
        >
          <span>بازگشت به بالا</span>
          <ArrowUp size={14} />
        </button>
      </div>
    </footer>
  );
}

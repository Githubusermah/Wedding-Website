"use client";

import { motion } from "motion/react";
import InitialsMonogram from "@/components/InitialsMonogram";
import { event } from "@/lib/event";

export default function SaveTheDateHero() {
  return (
    <section className="relative min-h-[90vh] sm:min-h-screen w-full flex flex-col items-center justify-center pt-12 pb-16 px-4 text-center overflow-hidden">
      {/* Soft atmospheric background highlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-[var(--gold-pale)] blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto space-y-6 sm:space-y-8">
        {/* Prominent, Isolated Monogram Artwork directly on paper surface */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center"
        >
          <InitialsMonogram size="clamp(160px, 35vw, 290px)" />
        </motion.div>

        {/* Ceremonial Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-2"
        >
          <span className="text-xs sm:text-sm font-semibold text-[var(--gold-dark)] uppercase tracking-[0.25em] block">
            جشن پیوند فرخنده
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[var(--ink)] font-nastaliq tracking-tight">
            {event.coupleDisplayName}
          </h1>
        </motion.div>

        {/* English Names Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          dir="ltr"
          className="text-xs sm:text-sm text-[var(--ink-muted)] font-mono tracking-widest uppercase"
        >
          {event.groomNameEn} &amp; {event.brideNameEn}
        </motion.p>

        {/* Fine Gold Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="w-24 h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent mx-auto"
        />

        {/* Host Line & Date Details */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="space-y-2"
        >
          <p className="text-sm sm:text-base text-[var(--ink-muted)] font-medium">
            با خوشحالی دعوت می‌نمایند از
          </p>
          <p className="text-xl sm:text-2xl font-bold text-[var(--ink)]">
            {event.invitationDateFa}
          </p>
          <p dir="ltr" className="text-xs sm:text-sm text-[var(--ink-muted)] font-mono">
            {event.invitationDateGregorian}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion, Variants } from "motion/react";
import { event } from "@/lib/event";
import {
  generateGoogleCalendarUrl,
  generateIcsContent,
} from "@/lib/formatters";
import { Calendar, Clock, MapPin, Download, GoogleLogo, Sparkle } from "@phosphor-icons/react";
import InitialsMonogram from "@/components/InitialsMonogram";

export default function EventFacts() {
  const handleIcsDownload = () => {
    const csData = generateIcsContent();
    const blob = new Blob([csData], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${event.groomNameEn}-${event.brideNameEn}-Wedding.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Stagger variants for sequential entry
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section id="event-facts" className="py-12 px-4 max-w-4xl mx-auto scroll-mt-20">
      {/* Outer Card Container with Layered Luxury Paper Aesthetics */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="relative rounded-3xl bg-gradient-to-b from-[#fffdfa] via-[#faf5e8] to-[#f5ebd6] p-6 sm:p-10 md:p-12 border-2 border-[var(--gold)]/70 shadow-[0_16px_40px_rgba(70,45,22,0.12),0_2px_6px_rgba(184,134,63,0.25)] overflow-hidden"
      >
        {/* Dimensional Inner Gold Border Outline */}
        <div className="absolute inset-3 sm:inset-4 rounded-2xl border border-[var(--gold)]/40 pointer-events-none" />

        {/* Faint Persian Geometric Watermark Overlay */}
        <div className="absolute inset-0 opacity-[0.035] pointer-events-none bg-[radial-gradient(#7A1C28_1.5px,transparent_1.5px)] [background-size:24px_24px]" />

        {/* Top Centered Animated Monogram Emblem */}
        <motion.div variants={itemVariants} className="flex justify-center mb-8 relative z-10">
          <InitialsMonogram size={80} showGlow={true} />
        </motion.div>

        {/* Prominent Wedding Date Display (Single Source of Truth) */}
        <motion.div variants={itemVariants} className="text-center mb-10 relative z-10 space-y-2">
          <span className="text-xs font-bold text-[var(--gold-dark,#8a6329)] uppercase tracking-widest block">
            تاریخ برگزاری محفل
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--ruby)] font-serif tracking-tight">
            {event.invitationDateFa}
          </h2>
          <p className="text-sm sm:text-base font-semibold text-[var(--ink-muted)] dir-ltr font-mono">
            {event.invitationDateGregorian}
          </p>
        </motion.div>

        {/* Detailed Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-right relative z-10">
          {/* Item 1: Date & Calendar Icon */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col justify-between p-6 rounded-2xl bg-[var(--paper-white)]/90 border border-[var(--gold)]/30 shadow-sm hover:border-[var(--gold)] transition-colors"
          >
            <div>
              <div className="flex items-center gap-2 mb-3 text-[var(--ruby)] font-bold text-xs">
                <Calendar size={20} weight="duotone" />
                <span>روز خجسته</span>
              </div>
              <p className="font-bold text-[var(--ink)] text-lg leading-snug">
                {event.invitationDateFa}
              </p>
              <p className="text-xs text-[var(--ink-muted)] mt-2 dir-ltr text-right font-mono border-t border-[var(--line)]/50 pt-2">
                {event.invitationDateGregorian}
              </p>
            </div>
          </motion.div>

          {/* Item 2: Time & Hosts */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col justify-between p-6 rounded-2xl bg-[var(--paper-white)]/90 border border-[var(--gold)]/30 shadow-sm hover:border-[var(--gold)] transition-colors"
          >
            <div>
              <div className="flex items-center gap-2 mb-3 text-[var(--ruby)] font-bold text-xs">
                <Clock size={20} weight="duotone" />
                <span>زمان برنامه</span>
              </div>
              <p className="font-bold text-[var(--ink)] text-lg leading-snug">
                {event.startTimeFa} تا {event.endTimeFa}
              </p>
              <div className="mt-3 pt-2 border-t border-[var(--line)]/50 flex items-center gap-1 text-xs text-[var(--ruby)] font-bold">
                <Sparkle size={14} weight="fill" className="text-[var(--gold)] shrink-0" />
                <span>{event.familyLine}</span>
              </div>
            </div>
          </motion.div>

          {/* Item 3: Venue & City */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col justify-between p-6 rounded-2xl bg-[var(--paper-white)]/90 border border-[var(--gold)]/30 shadow-sm hover:border-[var(--gold)] transition-colors"
          >
            <div>
              <div className="flex items-center gap-2 mb-3 text-[var(--ruby)] font-bold text-xs">
                <MapPin size={20} weight="duotone" />
                <span>مکان و آدرس</span>
              </div>
              <p className="font-bold text-[var(--ink)] text-lg leading-snug">
                {event.venueName}
              </p>
              <p className="text-xs text-[var(--ink-muted)] mt-2 border-t border-[var(--line)]/50 pt-2 leading-relaxed">
                {event.venueAddressFa}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Ornamental Divider Line */}
        <motion.div variants={itemVariants} className="my-8 flex items-center justify-center gap-3 opacity-70">
          <div className="h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent flex-1" />
          <span className="text-[var(--gold)] text-sm">✦</span>
          <div className="h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent flex-1" />
        </motion.div>

        {/* Calendar Action Buttons */}
        <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 relative z-10">
          <a
            href={generateGoogleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[var(--paper-white)] hover:bg-[var(--ivory)] text-xs sm:text-sm font-bold text-[var(--ink)] border-2 border-[var(--gold)]/60 hover:border-[var(--gold)] shadow-sm hover:-translate-y-0.5 active:translate-y-0 transition-all focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
          >
            <GoogleLogo size={20} className="text-[#4285F4] group-hover:scale-110 transition-transform" />
            <span>افزودن به تقویم گوگل</span>
          </a>

          <button
            onClick={handleIcsDownload}
            className="group relative inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[var(--paper-white)] hover:bg-[var(--ivory)] text-xs sm:text-sm font-bold text-[var(--ink)] border-2 border-[var(--gold)]/60 hover:border-[var(--gold)] shadow-sm hover:-translate-y-0.5 active:translate-y-0 transition-all focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
          >
            <Download size={20} className="text-[var(--ruby)] group-hover:translate-y-0.5 transition-transform" />
            <span>دانلود تقویم (Apple / Outlook)</span>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion, Variants } from "motion/react";
import { event } from "@/lib/event";
import {
  generateGoogleCalendarUrl,
  generateIcsContent,
  toEasternArabicNumerals,
} from "@/lib/formatters";
import { Calendar, Clock, MapPin, Download, GoogleLogo, Sparkle } from "@phosphor-icons/react";

export default function EventFacts() {
  const [countdownStr, setCountdownStr] = useState<string>("");

  useEffect(() => {
    const target = new Date(event.startDateTimeISO).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setCountdownStr("محفل با موفقیت برگزار شد");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      setCountdownStr(
        `زمان باقی‌مانده تا آغاز محفل: ${toEasternArabicNumerals(days)} روز و ${toEasternArabicNumerals(hours)} ساعت و ${toEasternArabicNumerals(minutes)} دقیقه`
      );
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleIcsDownload = () => {
    const csData = generateIcsContent();
    const blob = new Blob([csData], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${event.groomName}-${event.brideName}-Wedding.ics`);
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
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="event-facts" className="py-12 px-4 max-w-4xl mx-auto scroll-mt-20">
      {/* Outer Card Container with Antique Gold Border & Watermark */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="relative rounded-2xl bg-[var(--paper-white)] p-6 sm:p-8 md:p-10 border-2 border-[var(--gold)]/60 shadow-[0_12px_36px_rgba(70,45,22,0.12),0_1px_3px_rgba(184,134,63,0.2)] overflow-hidden"
      >
        {/* Dimensional Inner Border Outline */}
        <div className="absolute inset-2.5 rounded-xl border border-[var(--gold)]/30 pointer-events-none" />

        {/* Faint Persian Floral/Geometric Watermark Overlay */}
        <div className="absolute inset-0 opacity-[0.035] pointer-events-none bg-[radial-gradient(#7A1C28_1.5px,transparent_1.5px)] [background-size:24px_24px]" />

        {/* Top Centered Breathing Gold Seal with Initial Monogram ف & س */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center mb-6"
        >
          <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#dfb971] via-[#b8863f] to-[#8a6329] p-0.5 shadow-md group">
            {/* Soft Glow Effect */}
            <motion.div
              animate={{
                scale: [1, 1.08, 1],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 rounded-full bg-[var(--gold)] blur-sm"
            />

            {/* Inner Seal Body */}
            <div className="relative w-full h-full rounded-full bg-[#faf5e8] border border-[var(--gold)]/60 flex items-center justify-center p-2 shadow-inner">
              <span className="font-nastaliq text-xl text-[var(--ruby)] tracking-wide font-bold">
                ف &amp; س
              </span>
            </div>
          </div>
        </motion.div>

        {/* Card Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-right relative z-10">
          {/* Information Group 1: Date */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col justify-between p-5 rounded-xl bg-[var(--ivory-deep)]/50 border border-[var(--line)] shadow-sm hover:border-[var(--gold)]/60 transition-colors"
          >
            <div>
              <div className="flex items-center gap-2 mb-2 text-[var(--ruby)] font-semibold text-xs">
                <Calendar size={18} weight="duotone" />
                <span>تاریخ محفل</span>
              </div>

              <p className="font-bold text-[var(--ink)] text-lg md:text-xl mt-1 leading-snug">
                {event.invitationDateFa}
              </p>

              <p className="text-xs text-[var(--ink-muted)] mt-1.5 dir-ltr text-right font-mono tracking-wide font-medium border-t border-[var(--line)]/50 pt-1.5">
                {event.invitationDateGregorian}
              </p>
            </div>
          </motion.div>

          {/* Information Group 2: Time & Family */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col justify-between p-5 rounded-xl bg-[var(--ivory-deep)]/50 border border-[var(--line)] shadow-sm hover:border-[var(--gold)]/60 transition-colors"
          >
            <div>
              <div className="flex items-center gap-2 mb-2 text-[var(--ruby)] font-semibold text-xs">
                <Clock size={18} weight="duotone" />
                <span>زمان برنامه</span>
              </div>

              <p className="font-bold text-[var(--ink)] text-lg md:text-xl mt-1 leading-snug">
                {event.startTimeFa} تا {event.endTimeFa}
              </p>

              <div className="mt-2 pt-1.5 border-t border-[var(--line)]/50 flex items-center gap-1 text-xs text-[var(--ruby)] font-semibold">
                <Sparkle size={14} weight="fill" className="text-[var(--gold)] shrink-0" />
                <span>{event.familyLine}</span>
              </div>
            </div>
          </motion.div>

          {/* Information Group 3: Venue */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col justify-between p-5 rounded-xl bg-[var(--ivory-deep)]/50 border border-[var(--line)] shadow-sm hover:border-[var(--gold)]/60 transition-colors"
          >
            <div>
              <div className="flex items-center gap-2 mb-2 text-[var(--ruby)] font-semibold text-xs">
                <MapPin size={18} weight="duotone" />
                <span>مکان و آدرس</span>
              </div>

              <p className="font-bold text-[var(--ink)] text-base md:text-lg mt-1 leading-snug">
                {event.venueName}
              </p>

              <p className="text-xs text-[var(--ink-muted)] mt-1.5 border-t border-[var(--line)]/50 pt-1.5 leading-relaxed">
                {event.venueAddressFa}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Ornamental Delicate Divider */}
        <motion.div variants={itemVariants} className="my-6 flex items-center justify-center gap-3 opacity-60">
          <div className="h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent flex-1" />
          <span className="text-[var(--gold)] text-xs font-serif">✦</span>
          <div className="h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent flex-1" />
        </motion.div>

        {/* Live Countdown / Completion Status Line */}
        {countdownStr && (
          <motion.div variants={itemVariants} className="text-center mb-6">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--ruby)]/10 text-[var(--ruby)] text-xs md:text-sm font-bold border border-[var(--ruby)]/20 shadow-sm">
              {countdownStr}
            </span>
          </motion.div>
        )}

        {/* Calendar Action CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <a
            href={generateGoogleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-[var(--paper-white)] hover:bg-[var(--ivory)] text-xs sm:text-sm font-bold text-[var(--ink)] border-2 border-[var(--gold)]/50 hover:border-[var(--gold)] shadow-sm hover:-translate-y-0.5 active:translate-y-0 transition-all focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
          >
            <GoogleLogo size={18} className="text-[#4285F4] group-hover:scale-110 transition-transform" />
            <span>افزودن به تقویم گوگل</span>
          </a>

          <button
            onClick={handleIcsDownload}
            className="group relative inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-[var(--paper-white)] hover:bg-[var(--ivory)] text-xs sm:text-sm font-bold text-[var(--ink)] border-2 border-[var(--gold)]/50 hover:border-[var(--gold)] shadow-sm hover:-translate-y-0.5 active:translate-y-0 transition-all focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
          >
            <Download size={18} className="text-[var(--ruby)] group-hover:translate-y-0.5 transition-transform" />
            <span>دانلود تقویم (Apple / Outlook)</span>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}

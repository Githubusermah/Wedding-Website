"use client";

import { motion, Variants } from "motion/react";
import { weddingConfig } from "../../config/wedding";
import {
  generateGoogleCalendarUrl,
  generateIcsContent,
} from "@/lib/formatters";
import { Calendar, Clock, MapPin, Sparkle } from "@phosphor-icons/react";
import { SectionHeading } from "./ui/SectionHeading";
import { GlassCard } from "./ui/GlassCard";

function TypewriterPoemLine({
  text,
  delay = 0,
  stagger = 0.12,
  className = "",
}: {
  text: string;
  delay?: number;
  stagger?: number;
  className?: string;
}) {
  const words = text.split(" ");

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { opacity: 0, filter: "blur(6px)", y: 8 },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className={`inline-flex flex-wrap items-center justify-center gap-[0.35em] ${className}`}
      dir="rtl"
    >
      {words.map((word, idx) => (
        <motion.span
          key={idx}
          variants={wordVariants}
          className="inline-block whitespace-nowrap"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}

export default function EventFacts() {
  const handleIcsDownload = () => {
    const csData = generateIcsContent();
    const blob = new Blob([csData], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${weddingConfig.brideEn}-${weddingConfig.groomEn}-Wedding.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const poemCouplets = [
    {
      m1: "اول به نام آن‌که عشق‌آفرین است",
      m2: "زیباترین معنای هستی در زمین است",
    },
    {
      m1: "با هم شروعی تازه را آغاز کردیم",
      m2: "تا اوج خوشبختی دو بال پرواز کردیم",
    },
  ];

  return (
    <section id="event-facts" className="py-14 px-4 max-w-4xl mx-auto scroll-mt-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 0.7, 0.2, 1] }}
        className="space-y-8"
      >
        <SectionHeading
          eyebrow="مشخصات محفل"
          title="زمان و مکان"
        />

        {/* 3 Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center pt-2">
          {/* Fact 1: Date */}
          <GlassCard className="flex flex-col items-center space-y-3">
            <Calendar size={28} className="text-[var(--gold-dark)]" />
            <h3 className="font-bold text-sm text-[var(--ink)] tracking-normal">تاریخ برگزاری</h3>
            <p className="font-bold text-base text-[var(--ink)]">{weddingConfig.weekdayFa}، {weddingConfig.solarHijriDateFa}</p>
            <div className="text-3xl font-bold text-[var(--wine)] my-1 border-y border-[var(--line-subtle)] py-1 w-20 mx-auto">
              {weddingConfig.solarHijriDayFa}
            </div>
            <p className="text-xs text-[var(--gold-dark)] font-semibold" dir="ltr">{weddingConfig.gregorianDateFa}</p>
          </GlassCard>

          {/* Fact 2: Time & Hosts */}
          <GlassCard className="flex flex-col items-center space-y-3">
            <Clock size={28} className="text-[var(--gold-dark)]" />
            <h3 className="font-bold text-sm text-[var(--ink)] tracking-normal">ساعت و میزبانان</h3>
            <p className="font-bold text-base text-[var(--ink)]">{weddingConfig.timeRangeFa}</p>
            <p className="text-xs text-[var(--ink-muted)] leading-relaxed mt-2">{weddingConfig.hostsFa}</p>
          </GlassCard>

          {/* Fact 3: Venue & Address */}
          <GlassCard className="flex flex-col items-center space-y-3">
            <MapPin size={28} className="text-[var(--gold-dark)]" />
            <h3 className="font-bold text-sm text-[var(--ink)] tracking-normal">مکان برگزاری</h3>
            <p className="font-bold text-base text-[var(--ink)]">{weddingConfig.venueNameFa}</p>
            <p className="text-xs text-[var(--ink-muted)] leading-relaxed">{weddingConfig.venueAddressFa}</p>
          </GlassCard>
        </div>

        {/* Wedding Poem Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative py-8 my-8 max-w-xl mx-auto glass-panel px-4 sm:px-8"
        >
          {/* Top Ornament */}
          <div className="flex items-center justify-center gap-2 mb-6 text-[var(--gold-dark)]">
            <span className="h-px w-14 bg-gradient-to-r from-transparent to-[var(--gold)]" />
            <Sparkle size={18} className="text-[var(--gold)] animate-pulse" />
            <span className="h-px w-14 bg-gradient-to-l from-transparent to-[var(--gold)]" />
          </div>

          {/* Poem Couplets */}
          <div className="space-y-6 text-center font-nastaliq text-lg sm:text-2xl md:text-3xl text-[var(--ink)] leading-loose">
            {poemCouplets.map((couplet, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 py-1"
              >
                <TypewriterPoemLine
                  text={couplet.m1}
                  delay={idx * 1.1}
                  stagger={0.04}
                  className="text-[var(--ink)] font-semibold"
                />
                <span className="hidden sm:inline text-[var(--gold-dark)] text-sm opacity-60">•</span>
                <TypewriterPoemLine
                  text={couplet.m2}
                  delay={idx * 1.1 + 0.5}
                  stagger={0.04}
                  className="text-[var(--gold-dark)] font-medium"
                />
              </div>
            ))}
          </div>

          {/* Bottom Ornament */}
          <div className="flex items-center justify-center gap-2 mt-6 text-[var(--gold-dark)]">
            <span className="h-px w-14 bg-gradient-to-r from-transparent to-[var(--gold)]" />
            <span className="text-sm text-[var(--gold-dark)]">❦</span>
            <span className="h-px w-14 bg-gradient-to-l from-transparent to-[var(--gold)]" />
          </div>
        </motion.div>

        {/* Calendar Pill Buttons */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm">
          <a
            href={generateGoogleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 rounded-full bg-[var(--wine)] text-white hover:bg-[#521028] font-semibold transition-colors flex items-center gap-2 shadow-xs"
          >
            <Calendar size={16} />
            <span>افزودن به تقویم گوگل</span>
          </a>

          <button
            onClick={handleIcsDownload}
            className="px-6 py-2.5 rounded-full border border-[var(--gold)] text-[var(--gold-dark)] hover:bg-[var(--gold)]/10 font-semibold transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Calendar size={16} />
            <span>دانلود فایل تقویم (.ics)</span>
          </button>
        </div>
      </motion.div>
    </section>
  );
}

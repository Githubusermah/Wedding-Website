"use client";

import { motion, Variants } from "motion/react";
import { event } from "@/lib/event";
import {
  generateGoogleCalendarUrl,
  generateIcsContent,
} from "@/lib/formatters";
import { Calendar, Clock, MapPin, Sparkle } from "@phosphor-icons/react";

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
    link.setAttribute("download", `${event.groomNameEn}-${event.brideNameEn}-Wedding.ics`);
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
    <section id="event-facts" className="py-14 px-4 max-w-3xl mx-auto scroll-mt-20 text-center">
      <motion.div
        initial={{ opacity: 0, x: 72, y: 10 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-8"
      >
        <motion.div
          initial={{ opacity: 0, x: 28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, delay: 0.12, ease: "easeOut" }}
        >
          <span className="text-xs font-semibold text-[var(--gold-dark)] tracking-widest uppercase block">
            مشخصات محفل
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--ink)] mt-1 font-serif">
            زمان و مکان
          </h2>
          <div className="w-12 h-px bg-[var(--gold-muted)] mx-auto mt-3" />
        </motion.div>

        {/* 3 Column Information Listing directly on paper */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center pt-2">
          {/* Fact 1: Date */}
          <motion.div
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, delay: 0.12, ease: "easeOut" }}
            className="space-y-2 flex flex-col items-center"
          >
            <Calendar size={24} className="text-[var(--gold-dark)]" />
            <h3 className="font-bold text-sm text-[var(--ink)] uppercase tracking-wider">تاریخ برگزاری</h3>
            <p className="font-bold text-base text-[var(--ink)]">{event.invitationDateFa}</p>
            <p className="text-xs text-[var(--ink-muted)] font-mono dir-ltr">{event.invitationDateGregorian}</p>
          </motion.div>

          {/* Fact 2: Time & Hosts */}
          <motion.div
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, delay: 0.24, ease: "easeOut" }}
            className="space-y-2 flex flex-col items-center"
          >
            <Clock size={24} className="text-[var(--gold-dark)]" />
            <h3 className="font-bold text-sm text-[var(--ink)] uppercase tracking-wider">ساعت و میزبانان</h3>
            <p className="font-bold text-base text-[var(--ink)]">{event.startTimeFa} تا {event.endTimeFa}</p>
            <p className="text-xs text-[var(--ink-muted)]">{event.familyLine}</p>
          </motion.div>

          {/* Fact 3: Venue & City */}
          <motion.div
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, delay: 0.36, ease: "easeOut" }}
            className="space-y-2 flex flex-col items-center"
          >
            <MapPin size={24} className="text-[var(--gold-dark)]" />
            <h3 className="font-bold text-sm text-[var(--ink)] uppercase tracking-wider">مکان برگزاری</h3>
            <p className="font-bold text-base text-[var(--ink)]">{event.venueName}</p>
            <p className="text-xs text-[var(--ink-muted)]">{event.venueAddressFa}</p>
          </motion.div>
        </div>

        {/* Chic Dari Wedding Poem Section under "زمان و مکان" */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative py-8 my-8 max-w-xl mx-auto border-y border-[var(--gold-muted)]/30 bg-gradient-to-b from-transparent via-[var(--gold-pale)]/20 to-transparent rounded-2xl px-4 sm:px-8"
        >
          {/* Elegant Top Ornaments */}
          <div className="flex items-center justify-center gap-2 mb-6 text-[var(--gold-dark)]">
            <span className="h-px w-14 bg-gradient-to-r from-transparent to-[var(--gold)]" />
            <Sparkle size={18} className="text-[var(--gold)] animate-pulse" />
            <span className="h-px w-14 bg-gradient-to-l from-transparent to-[var(--gold)]" />
          </div>

          {/* Calligraphic Poem Couplets written live */}
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

          {/* Elegant Bottom Ornament */}
          <div className="flex items-center justify-center gap-2 mt-6 text-[var(--gold-dark)]">
            <span className="h-px w-14 bg-gradient-to-r from-transparent to-[var(--gold)]" />
            <span className="text-sm text-[var(--gold-dark)] font-serif">❦</span>
            <span className="h-px w-14 bg-gradient-to-l from-transparent to-[var(--gold)]" />
          </div>
        </motion.div>

        {/* Quiet gold action links */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm">
          <a
            href={generateGoogleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[var(--gold-dark)] hover:underline flex items-center gap-1.5 transition-colors"
          >
            <span>افزودن به تقویم گوگل</span>
          </a>

          <span className="text-[var(--line)]">•</span>

          <button
            onClick={handleIcsDownload}
            className="font-medium text-[var(--gold-dark)] hover:underline flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>دانلود فایل تقویم (Apple / Outlook)</span>
          </button>
        </div>
      </motion.div>
    </section>
  );
}

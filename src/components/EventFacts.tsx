"use client";

import { motion } from "motion/react";
import { event } from "@/lib/event";
import {
  generateGoogleCalendarUrl,
  generateIcsContent,
} from "@/lib/formatters";
import { Calendar, Clock, MapPin } from "@phosphor-icons/react";

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

  return (
    <section id="event-facts" className="py-14 px-4 max-w-3xl mx-auto scroll-mt-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        <div>
          <span className="text-xs font-semibold text-[var(--gold-dark)] tracking-widest uppercase block">
            مشخصات محفل
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--ink)] mt-1 font-serif">
            زمان و مکان
          </h2>
          <div className="w-12 h-px bg-[var(--gold-muted)] mx-auto mt-3" />
        </div>

        {/* 3 Column Information Listing directly on paper */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center pt-2">
          {/* Fact 1: Date */}
          <div className="space-y-2 flex flex-col items-center">
            <Calendar size={24} className="text-[var(--gold-dark)]" />
            <h3 className="font-bold text-sm text-[var(--ink)] uppercase tracking-wider">تاریخ برگزاری</h3>
            <p className="font-bold text-base text-[var(--ink)]">{event.invitationDateFa}</p>
            <p className="text-xs text-[var(--ink-muted)] font-mono dir-ltr">{event.invitationDateGregorian}</p>
          </div>

          {/* Fact 2: Time & Hosts */}
          <div className="space-y-2 flex flex-col items-center">
            <Clock size={24} className="text-[var(--gold-dark)]" />
            <h3 className="font-bold text-sm text-[var(--ink)] uppercase tracking-wider">ساعت و میزبانان</h3>
            <p className="font-bold text-base text-[var(--ink)]">{event.startTimeFa} تا {event.endTimeFa}</p>
            <p className="text-xs text-[var(--ink-muted)]">{event.familyLine}</p>
          </div>

          {/* Fact 3: Venue & City */}
          <div className="space-y-2 flex flex-col items-center">
            <MapPin size={24} className="text-[var(--gold-dark)]" />
            <h3 className="font-bold text-sm text-[var(--ink)] uppercase tracking-wider">مکان برگزاری</h3>
            <p className="font-bold text-base text-[var(--ink)]">{event.venueName}</p>
            <p className="text-xs text-[var(--ink-muted)]">{event.venueAddressFa}</p>
          </div>
        </div>

        {/* Quiet gold action links */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm">
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

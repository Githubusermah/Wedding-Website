"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { event } from "@/lib/event";
import {
  generateGoogleCalendarUrl,
  generateIcsContent,
  toEasternArabicNumerals,
} from "@/lib/formatters";
import { Calendar, Clock, MapPin, Download, GoogleLogo } from "@phosphor-icons/react";

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
        `تا آغاز محفل: ${toEasternArabicNumerals(days)} روز و ${toEasternArabicNumerals(hours)} ساعت و ${toEasternArabicNumerals(minutes)} دقیقه`
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

  return (
    <section id="event-facts" className="py-10 px-4 max-w-4xl mx-auto scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="paper-card p-6 md:p-10 relative overflow-hidden"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-right">
          {/* Fact 1: Date */}
          <div className="flex items-start gap-4 p-4 paper-card-inset">
            <div className="p-3 rounded-xl bg-[var(--paper-white)] text-[var(--ruby)] border border-[var(--line)] shrink-0">
              <Calendar size={24} weight="duotone" />
            </div>
            <div>
              <span className="text-xs text-[var(--ink-muted)] block">تاریخ محفل</span>
              <p className="font-semibold text-[var(--ink)] text-base md:text-lg mt-0.5">
                {event.invitationDateFa}
              </p>
              <span className="text-xs text-[var(--ink-muted)] block dir-ltr text-right mt-1 font-mono">
                {event.invitationDateGregorian}
              </span>
            </div>
          </div>

          {/* Fact 2: Time */}
          <div className="flex items-start gap-4 p-4 paper-card-inset">
            <div className="p-3 rounded-xl bg-[var(--paper-white)] text-[var(--ruby)] border border-[var(--line)] shrink-0">
              <Clock size={24} weight="duotone" />
            </div>
            <div>
              <span className="text-xs text-[var(--ink-muted)] block">زمان برنامه</span>
              <p className="font-semibold text-[var(--ink)] text-base md:text-lg mt-0.5">
                {event.startTimeFa} تا {event.endTimeFa}
              </p>
              <span className="text-xs text-[var(--ruby)] block mt-1">
                {event.familyLine}
              </span>
            </div>
          </div>

          {/* Fact 3: Venue */}
          <div className="flex items-start gap-4 p-4 paper-card-inset">
            <div className="p-3 rounded-xl bg-[var(--paper-white)] text-[var(--ruby)] border border-[var(--line)] shrink-0">
              <MapPin size={24} weight="duotone" />
            </div>
            <div>
              <span className="text-xs text-[var(--ink-muted)] block">مکان و آدرس</span>
              <p className="font-semibold text-[var(--ink)] text-base md:text-lg mt-0.5">
                {event.venueName}
              </p>
              <p className="text-xs text-[var(--ink-muted)] mt-0.5">
                {event.venueAddressFa}
              </p>
            </div>
          </div>
        </div>

        {/* Live Countdown Text Line */}
        {countdownStr && (
          <div className="mt-6 pt-4 border-t border-[var(--line)] text-center">
            <p className="text-xs md:text-sm text-[var(--ruby-deep)] font-medium">
              {countdownStr}
            </p>
          </div>
        )}

        {/* Calendar Add CTAs */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href={generateGoogleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--paper-white)] hover:bg-[var(--ivory-deep)] text-xs md:text-sm font-medium border border-[var(--line)] transition-colors"
          >
            <GoogleLogo size={16} className="text-[#4285F4]" />
            <span>افزودن به تقویم گوگل</span>
          </a>

          <button
            onClick={handleIcsDownload}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--paper-white)] hover:bg-[var(--ivory-deep)] text-xs md:text-sm font-medium border border-[var(--line)] transition-colors"
          >
            <Download size={16} className="text-[var(--ruby)]" />
            <span>دانلود تقویم (Apple / Outlook)</span>
          </button>
        </div>
      </motion.div>
    </section>
  );
}

"use client";

import { motion } from "motion/react";
import TextileBorder from "./TextileBorder";
import { event } from "@/lib/event";
import { ArrowDown, MapPin, CheckCircle } from "@phosphor-icons/react";

export default function InvitationHero() {
  const scrollToRsvp = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const rsvpElement = document.getElementById("rsvp");
    if (rsvpElement) {
      rsvpElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToFacts = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const factsElement = document.getElementById("event-facts");
    if (factsElement) {
      factsElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[85vh] flex flex-col justify-between items-center text-center px-4 py-10 md:py-16 max-w-5xl mx-auto overflow-hidden">
      <TextileBorder />

      {/* Top Monogram Seal */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 my-2"
      >
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-[var(--gold)] bg-[var(--paper-white)] shadow-sm flex items-center justify-center text-[var(--ruby)] font-nastaliq text-xl md:text-2xl">
          <span>ف</span>
          <span className="text-[var(--gold)] text-xs mx-0.5">&</span>
          <span>س</span>
        </div>
      </motion.div>

      {/* Main Invitation Lockup */}
      <div className="relative z-10 my-auto py-6 space-y-6 max-w-2xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[var(--ink-muted)] text-sm md:text-base font-medium"
        >
          به نام پیونددهندهٔ دل‌ها
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="font-nastaliq text-[var(--ruby)] text-[clamp(3.1rem,7vw,6.5rem)] leading-tight py-2"
        >
          {event.brideName} <span className="text-[var(--gold)] text-[0.6em] mx-2">و</span> {event.groomName}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-[var(--ink)] text-base md:text-lg font-medium leading-relaxed"
        >
          با دلِ شاد، شما را به جشن آغاز زندگی مشترک‌شان دعوت می‌کنند
        </motion.p>

        {/* Date, Time & Venue Summary */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="pt-2 text-[var(--ruby-deep)] font-semibold text-base md:text-xl space-y-1"
        >
          <p>{event.invitationDateFa} · از ساعت {event.startTimeFa}</p>
          <p className="text-[var(--ink-muted)] text-sm md:text-base font-normal">
            {event.venueName}، {event.cityFa}
          </p>
        </motion.div>

        {/* Hero Actions */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md mx-auto"
        >
          <a
            href="#rsvp"
            onClick={scrollToRsvp}
            className="w-full sm:w-auto min-w-[160px] px-6 py-3.5 rounded-xl bg-[var(--ruby)] hover:bg-[var(--ruby-deep)] text-[var(--paper-white)] font-semibold text-base shadow-md transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle size={18} weight="bold" />
            <span>تأیید حضور</span>
          </a>

          <a
            href={event.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto min-w-[160px] px-6 py-3.5 rounded-xl bg-[var(--paper-white)] hover:bg-[var(--ivory-deep)] text-[var(--ink)] font-semibold text-base border border-[var(--gold)] shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <MapPin size={18} className="text-[var(--gold)]" />
            <span>دیدن مسیر</span>
          </a>
        </motion.div>
      </div>

      {/* Down link to facts */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="relative z-10 pt-4"
      >
        <a
          href="#event-facts"
          onClick={scrollToFacts}
          className="inline-flex items-center gap-1.5 text-xs md:text-sm text-[var(--ink-muted)] hover:text-[var(--ruby)] transition-colors"
        >
          <span>جزئیات محفل</span>
          <ArrowDown size={14} className="animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
}

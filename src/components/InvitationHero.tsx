"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { event } from "@/lib/event";
import { ArrowDown, MapPin, CheckCircle, Sparkle } from "@phosphor-icons/react";
import Image from "next/image";

// ---- Floating gold dust / petals background -------------------------------
type Particle = {
  id: number;
  size: number;
  left: number;
  driftX: number;
  duration: number;
  delay: number;
};

const PARTICLE_COUNT = 18;

function createParticles(): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    size: 4 + Math.random() * 6,
    left: Math.random() * 100,
    driftX: Math.random() * 100 - 50,
    duration: 12 + Math.random() * 10,
    delay: Math.random() * 10,
  }));
}

export default function InvitationHero() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(createParticles());
  }, []);

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
    <section className="relative min-h-[92vh] flex flex-col justify-between items-center text-center px-4 py-8 md:py-14 max-w-5xl mx-auto overflow-hidden">
      {/* Viewport Corner Brackets */}
      <div className="hidden sm:block absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-[var(--gold)]/60 pointer-events-none" />
      <div className="hidden sm:block absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 border-[var(--gold)]/60 pointer-events-none" />
      <div className="hidden sm:block absolute bottom-4 left-4 w-10 h-10 border-b-2 border-l-2 border-[var(--gold)]/60 pointer-events-none" />
      <div className="hidden sm:block absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 border-[var(--gold)]/60 pointer-events-none" />

      {/* Floating Gold Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-gradient-to-br from-amber-200 via-[var(--gold)] to-amber-600 opacity-40 animate-pulse"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.left}%`,
              top: `${(p.id * 5) % 100}%`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Main Watercolour Save The Date Frame Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative z-10 w-full max-w-3xl my-auto p-6 md:p-10 rounded-3xl bg-[var(--paper-white)]/90 border border-[var(--gold)]/40 shadow-2xl backdrop-blur-md overflow-hidden"
      >
        {/* Outer Gold Card Inner Border */}
        <div className="absolute inset-3 border border-[var(--gold)]/30 rounded-2xl pointer-events-none" />

        {/* Header Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="space-y-1 mb-3"
        >
          <span className="inline-block text-[0.65rem] md:text-xs tracking-[0.3em] text-[var(--gold)] font-bold uppercase">
            A MOMENT TO REMEMBER · به نام پیونددهندهٔ دل‌ها
          </span>
        </motion.div>

        {/* Decorative Save The Date Title Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center justify-center gap-3 my-2"
        >
          <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[var(--gold)]" />
          <h2 className="text-xl md:text-3xl font-serif text-[var(--ink)] tracking-wider uppercase font-semibold">
            SAVE <span className="text-[var(--gold)] italic lowercase font-serif px-1">the</span> DATE
          </h2>
          <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[var(--gold)]" />
        </motion.div>

        <p className="text-xs md:text-sm text-[var(--ink-muted)] tracking-widest font-medium uppercase mt-1">
          FOR THE WEDDING OF
        </p>

        {/* Bride & Groom Names Display */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="my-4 py-2 flex flex-wrap items-center justify-center gap-3 text-[var(--ruby)]"
        >
          <span className="font-serif text-3xl md:text-5xl font-semibold tracking-wide">
            {event.groomName}
          </span>
          <span className="font-serif text-2xl md:text-4xl text-[var(--gold)] italic font-normal">
            &amp;
          </span>
          <span className="font-serif text-3xl md:text-5xl font-semibold tracking-wide">
            {event.brideName}
          </span>
        </motion.div>

        {/* Dari Nastaliq Names Accent */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-nastaliq text-2xl md:text-4xl text-[var(--ruby-deep)] my-1"
        >
          {event.coupleDisplayName}
        </motion.div>

        {/* Venue Illustration Section (City Star Wedding Hotel) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="relative max-w-lg mx-auto my-6 px-4 py-2 group"
        >
          {/* Radial Halo Lighting */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-200/30 via-yellow-100/50 to-amber-200/30 blur-2xl rounded-full pointer-events-none transform group-hover:scale-105 transition-transform duration-700" />

          {/* Venue Image */}
          <div className="relative z-10 p-3 rounded-2xl bg-white/60 border border-[var(--gold)]/30 shadow-md inline-block">
            <Image
              src="/images/wedding-venue.png"
              alt="City Star Wedding Hotel Venue Illustration"
              width={520}
              height={280}
              priority
              className="rounded-xl max-h-[260px] md:max-h-[320px] w-auto h-auto object-contain mx-auto drop-shadow-md transform transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>

          {/* Venue Title Caption */}
          <div className="relative z-10 mt-3 space-y-0.5">
            <p className="text-xs md:text-sm font-serif tracking-[0.25em] text-[var(--gold)] font-bold uppercase">
              CITY STAR WEDDING HOTEL
            </p>
            <p className="text-xs text-[var(--ink-muted)] font-medium">
              {event.venueName}
            </p>
          </div>
          <div className="w-28 h-[1px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent mx-auto mt-2" />
        </motion.div>

        {/* Date Display */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="space-y-1 my-4"
        >
          <div className="flex items-center justify-center gap-2 text-[var(--gold)] text-sm">
            <span>✦</span>
            <span className="font-serif text-lg md:text-2xl text-[var(--ink)] font-semibold tracking-wider">
              {event.invitationDateGregorian}
            </span>
            <span>✦</span>
          </div>
          <p className="text-sm md:text-base font-semibold text-[var(--ruby)] dir-rtl">
            {event.invitationDateFa} · از ساعت {event.startTimeFa}
          </p>
        </motion.div>

        {/* Hero Actions */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
        >
          <a
            href="#rsvp"
            onClick={scrollToRsvp}
            className="w-full sm:w-auto min-w-[170px] px-6 py-3 rounded-xl bg-[var(--ruby)] hover:bg-[var(--ruby-deep)] text-[var(--paper-white)] font-semibold text-sm shadow-lg transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
          >
            <CheckCircle size={18} weight="bold" />
            <span>تأیید حضور (RSVP)</span>
          </a>

          <a
            href="#venue-section"
            className="w-full sm:w-auto min-w-[170px] px-6 py-3 rounded-xl bg-[var(--paper-white)] hover:bg-[var(--ivory-deep)] text-[var(--ink)] font-semibold text-sm border border-[var(--gold)] shadow-md transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
          >
            <MapPin size={18} className="text-[var(--gold)]" />
            <span>نقشه و عکس‌های هتل</span>
          </a>
        </motion.div>
      </motion.div>

      {/* Down indicator link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="relative z-10 pt-4"
      >
        <a
          href="#event-facts"
          onClick={scrollToFacts}
          className="inline-flex items-center gap-1.5 text-xs text-[var(--ink-muted)] hover:text-[var(--ruby)] transition-colors"
        >
          <span>مشاهده برنامه و جزئیات</span>
          <ArrowDown size={14} className="animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
}

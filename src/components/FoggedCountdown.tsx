"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { event } from "@/lib/event";
import { toEasternArabicNumerals } from "@/lib/formatters";
import { Sparkle, CheckCircle } from "@phosphor-icons/react";

export default function FoggedCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isEventCompleted, setIsEventCompleted] = useState(false);

  // Live countdown targeting Asia/Kabul timezone 2026-10-13T18:00:00+04:30
  useEffect(() => {
    const target = new Date(event.startDateTimeISO).getTime();

    const updateTime = () => {
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setIsEventCompleted(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setIsEventCompleted(false);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-12 px-4 max-w-4xl mx-auto scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="paper-card p-6 md:p-8 text-center relative overflow-hidden shadow-xl border-2 border-[var(--gold)]/50 bg-gradient-to-b from-[var(--paper-white)] via-[#fffdf6] to-[var(--ivory-deep)]/40"
      >
        {/* Subtle Ornamental Gold Corner Accents */}
        <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[var(--gold)] opacity-70 pointer-events-none" />
        <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[var(--gold)] opacity-70 pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[var(--gold)] opacity-70 pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[var(--gold)] opacity-70 pointer-events-none" />

        {/* Header Badges */}
        <div className="flex items-center justify-center gap-2 mb-2 text-[var(--gold)]">
          <Sparkle size={18} weight="fill" />
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--gold-dark,#8a6329)]">
            شمارش معکوس
          </span>
          <Sparkle size={18} weight="fill" />
        </div>

        <h3 className="text-2xl md:text-3xl font-bold text-[var(--ruby)] mb-6 font-serif">
          زمان باقی‌مانده تا آغاز محفل
        </h3>

        {/* Countdown Box */}
        {isEventCompleted ? (
          <div className="z-0 text-center py-8 space-y-3">
            <div className="w-14 h-14 rounded-full bg-[var(--ruby)] text-[var(--paper-white)] mx-auto flex items-center justify-center shadow-md">
              <CheckCircle size={32} weight="fill" />
            </div>
            <h4 className="text-2xl md:text-3xl font-bold text-[var(--ruby)]">
              محفل با موفقیت برگزار شد
            </h4>
            <p className="text-xs md:text-sm text-[var(--ink-muted)]">
              با سپاس فراوان از همراهی و تشریف‌فرمایی شما
            </p>
          </div>
        ) : (
          <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-5 my-2">
            {/* Days Card */}
            <div className="p-4 rounded-2xl bg-[var(--paper-white)] border border-[var(--gold)]/40 shadow-sm flex flex-col items-center justify-center min-h-[110px] relative overflow-hidden">
              <span className="text-3xl md:text-5xl font-extrabold text-[var(--ruby)] font-mono tracking-tight">
                {toEasternArabicNumerals(timeLeft.days)}
              </span>
              <span className="text-xs md:text-sm font-bold text-[var(--ink-muted)] mt-2">
                روز / Days
              </span>
            </div>

            {/* Hours Card */}
            <div className="p-4 rounded-2xl bg-[var(--paper-white)] border border-[var(--gold)]/40 shadow-sm flex flex-col items-center justify-center min-h-[110px] relative overflow-hidden">
              <span className="text-3xl md:text-5xl font-extrabold text-[var(--gold-dark,#8a6329)] font-mono tracking-tight">
                {toEasternArabicNumerals(timeLeft.hours)}
              </span>
              <span className="text-xs md:text-sm font-bold text-[var(--ink-muted)] mt-2">
                ساعت / Hours
              </span>
            </div>

            {/* Minutes Card */}
            <div className="p-4 rounded-2xl bg-[var(--paper-white)] border border-[var(--gold)]/40 shadow-sm flex flex-col items-center justify-center min-h-[110px] relative overflow-hidden">
              <span className="text-3xl md:text-5xl font-extrabold text-[var(--ruby)] font-mono tracking-tight">
                {toEasternArabicNumerals(timeLeft.minutes)}
              </span>
              <span className="text-xs md:text-sm font-bold text-[var(--ink-muted)] mt-2">
                دقیقه / Mins
              </span>
            </div>

            {/* Seconds Card with Vertical Mechanical Ticker Animation */}
            <div className="p-4 rounded-2xl bg-[var(--paper-white)] border border-[var(--gold)]/40 shadow-sm flex flex-col items-center justify-center min-h-[110px] relative overflow-hidden">
              <div className="h-10 md:h-14 overflow-hidden relative w-full flex items-center justify-center">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={timeLeft.seconds}
                    initial={{ y: "80%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-80%", opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute text-3xl md:text-5xl font-extrabold text-[var(--gold-dark,#8a6329)] font-mono tracking-tight"
                  >
                    {toEasternArabicNumerals(timeLeft.seconds)}
                  </motion.span>
                </AnimatePresence>
              </div>
              <span className="text-xs md:text-sm font-bold text-[var(--ink-muted)] mt-2">
                ثانیه / Secs
              </span>
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
}

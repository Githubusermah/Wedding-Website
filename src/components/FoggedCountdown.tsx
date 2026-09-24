"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { event } from "@/lib/event";
import { toEasternArabicNumerals } from "@/lib/formatters";
import { Sparkle, Heart, CalendarBlank } from "@phosphor-icons/react";

export default function FoggedCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isEventCompleted, setIsEventCompleted] = useState(false);

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
    <section className="py-12 px-4 max-w-3xl mx-auto text-center">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--gold-pale)]/50 border border-[var(--gold-muted)]/30 text-[var(--gold-dark)] text-xs font-semibold tracking-widest uppercase">
          <CalendarBlank size={14} className="text-[var(--gold)]" />
          <span>شمارش معکوس</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-[var(--ink)] font-serif">
          زمان باقی‌مانده تا آغاز محفل
        </h2>

        <div className="w-16 h-px bg-[var(--gold-muted)] mx-auto my-4" />

        {isEventCompleted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="py-8 px-6 space-y-4 rounded-2xl bg-gradient-to-b from-[var(--gold-pale)]/30 via-[#FDF8EB] to-transparent border border-[var(--gold-muted)]/40 shadow-sm"
          >
            <div className="flex items-center justify-center gap-2 text-[var(--oxblood,#7a1c28)]">
              <Sparkle size={20} className="animate-pulse" />
              <Heart size={22} weight="fill" className="text-[var(--oxblood,#7a1c28)]" />
              <Sparkle size={20} className="animate-pulse" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-[var(--ink)] font-serif tracking-tight">
              امروز روز خجستهٔ محفل است!
            </h3>

            <p className="text-base sm:text-lg text-[var(--gold-dark)] font-medium leading-relaxed max-w-xl mx-auto">
              محفل با شکوه پیوند {event.coupleDisplayName} امروز در {event.venueName} برگزار می‌گردد.
            </p>

            <p className="text-xs text-[var(--ink-muted)] pt-2 font-mono">
              مقدم تمام مهمانان و عزیزان گرامی گلباران باد
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-4 gap-2 sm:gap-8 pt-4 pb-2 items-center justify-center">
            {/* Days */}
            <div className="flex flex-col items-center">
              <span className="text-3xl sm:text-5xl font-serif text-[var(--ink)] font-bold tracking-tight">
                {toEasternArabicNumerals(timeLeft.days)}
              </span>
              <span className="text-xs text-[var(--gold-dark)] mt-2 font-medium">
                روز / Days
              </span>
            </div>

            {/* Hours */}
            <div className="flex flex-col items-center">
              <span className="text-3xl sm:text-5xl font-serif text-[var(--ink)] font-bold tracking-tight">
                {toEasternArabicNumerals(timeLeft.hours)}
              </span>
              <span className="text-xs text-[var(--gold-dark)] mt-2 font-medium">
                ساعت / Hours
              </span>
            </div>

            {/* Minutes */}
            <div className="flex flex-col items-center">
              <span className="text-3xl sm:text-5xl font-serif text-[var(--ink)] font-bold tracking-tight">
                {toEasternArabicNumerals(timeLeft.minutes)}
              </span>
              <span className="text-xs text-[var(--gold-dark)] mt-2 font-medium">
                دقیقه / Mins
              </span>
            </div>

            {/* Seconds */}
            <div className="flex flex-col items-center">
              <div className="h-10 sm:h-14 overflow-hidden relative w-full flex items-center justify-center">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={timeLeft.seconds}
                    initial={{ y: "70%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-70%", opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute text-3xl sm:text-5xl font-serif text-[var(--gold-dark)] font-bold tracking-tight"
                  >
                    {toEasternArabicNumerals(timeLeft.seconds)}
                  </motion.span>
                </AnimatePresence>
              </div>
              <span className="text-xs text-[var(--gold-dark)] mt-2 font-medium">
                ثانیه / Secs
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { event } from "@/lib/event";
import { toEasternArabicNumerals } from "@/lib/formatters";

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
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--ink)]">
          زمان باقی‌مانده تا آغاز محفل
        </h2>

        <div className="w-16 h-px bg-[var(--gold-muted)] mx-auto my-4" />

        {isEventCompleted ? (
          <div className="py-6 space-y-2">
            <h3 className="text-xl font-bold text-[var(--gold-dark)]">
              محفل با موفقیت برگزار شد
            </h3>
            <p className="text-xs text-[var(--ink-muted)]">
              با سپاس فراوان از همراهی و تشریف‌فرمایی شما
            </p>
          </div>
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

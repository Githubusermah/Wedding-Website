"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { event } from "@/lib/event";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

type CountdownMode = "countdown" | "today" | "after";

function calculateTimeLeft(difference: number): TimeLeft {
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((difference % (1000 * 60)) / 1000),
  };
}

function formatNumber(value: number) {
  return String(value).padStart(2, "0");
}

export default function FoggedCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [mode, setMode] = useState<CountdownMode>("countdown");

  useEffect(() => {
    const target = new Date(event.startDateTimeISO).getTime();
    const end = new Date(event.endDateTimeISO).getTime();
    const testParam = new URLSearchParams(window.location.search).get("testDate");
    const parsedTestTime = testParam ? Date.parse(testParam) : NaN;
    const testTime = Number.isNaN(parsedTestTime) ? null : parsedTestTime;

    const updateTime = () => {
      const now = testTime ?? Date.now();
      const difference = target - now;

      if (now >= end) {
        setMode("after");
        setTimeLeft(null);
      } else if (now >= target) {
        setMode("today");
        setTimeLeft(null);
      } else {
        setMode("countdown");
        setTimeLeft(calculateTimeLeft(difference));
      }
    };

    const initialTimer = setTimeout(updateTime, 0);
    const timer = setInterval(updateTime, 1000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(timer);
    };
  }, []);

  return (
    <section
      id="countdown"
      className="relative py-16 px-4 bg-[var(--paper-white)] text-[var(--gold)] flex flex-col items-center justify-center border-y border-[var(--gold)]/10 overflow-hidden"
    >
      <div className="w-full max-w-4xl relative z-10 flex flex-col items-center text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--ink)] font-[family-name:var(--font-noto-naskh)]">
          {mode === "countdown" ? "شمارش معکوس" : "جشن عروسی بهاره و امین‌الله"}
        </h2>
        <div className="w-16 h-px bg-[var(--gold-muted)] mx-auto my-5" />

        <AnimatePresence mode="wait">
          {mode === "today" && (
            <motion.div
              key="today"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="py-6 space-y-3 text-center"
              dir="rtl"
            >
              <div className="text-4xl text-[var(--gold-dark)]" aria-hidden="true">❦</div>
              <h3 className="text-2xl sm:text-4xl font-bold text-[var(--gold-dark)] font-[family-name:var(--font-noto-naskh)]">
                امروز، روز بزرگ زندگی مشترک ماست
              </h3>
              <p className="text-base sm:text-lg text-[var(--ink-muted)] font-[family-name:var(--font-noto-naskh)]">
                به جشن عروسی بهاره و امین‌الله خوش آمدید
              </p>
              <p className="text-xs sm:text-sm tracking-[0.2em] uppercase text-[var(--gold-dark)]/75">
                Today is the big day
              </p>
            </motion.div>
          )}

          {mode === "after" && (
            <motion.div
              key="after"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="py-6 space-y-3 text-center"
              dir="rtl"
            >
              <h3 className="text-xl sm:text-3xl font-bold text-[var(--gold-dark)] font-[family-name:var(--font-noto-naskh)]">
                از همراهی گرم‌تان در جشن عروسی ما سپاسگزاریم
              </h3>
              <p className="text-sm sm:text-base text-[var(--ink-muted)] font-[family-name:var(--font-noto-naskh)]">
                حضور شما، شادی این روز بزرگ را دوچندان کرد
              </p>
            </motion.div>
          )}

          {mode === "countdown" && (
            <motion.div
              key="countdown"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full flex flex-col items-center"
            >
              <p className="text-xs sm:text-sm text-[var(--ink-muted)] font-[family-name:var(--font-noto-naskh)] mb-6" dir="rtl">
                تا جمعه، ۲۴ میزان ۱۴۰۵ و آغاز جشن بزرگ ما
              </p>

              {timeLeft ? (
                <div
                  className="flex w-full max-w-3xl flex-nowrap items-baseline justify-between gap-0 whitespace-nowrap overflow-visible px-0.5 sm:justify-center sm:gap-4"
                  dir="rtl"
                  aria-label="شمارش معکوس تا آغاز جشن عروسی"
                >
                  {[
                    { label: "روز", value: timeLeft.days },
                    { label: "ساعت", value: timeLeft.hours },
                    { label: "دقیقه", value: timeLeft.minutes },
                  ].map((item, index) => (
                    <span key={item.label} className="inline-flex min-w-0 items-baseline gap-0.5 sm:gap-2">
                      <span className="text-xl sm:text-4xl md:text-5xl font-light font-serif tracking-tight text-[var(--ink)]">
                        {formatNumber(item.value)}
                      </span>
                      <span className="text-[9px] sm:text-sm text-[var(--gold-dark)] font-[family-name:var(--font-noto-naskh)]">
                        {item.label}
                      </span>
                      {index < 2 && <span className="mx-0.5 sm:mx-1 text-base sm:text-3xl text-[var(--gold-muted)]/70">:</span>}
                    </span>
                  ))}

                  <span className="inline-flex min-w-0 items-baseline gap-0.5 sm:gap-2">
                    <span className="relative inline-flex h-8 w-8 sm:h-14 sm:w-14 items-center justify-center overflow-hidden">
                      <AnimatePresence mode="popLayout" initial={false}>
                        <motion.span
                          key={timeLeft.seconds}
                          initial={{ y: "110%", opacity: 0 }}
                          animate={{ y: "0%", opacity: 1 }}
                          exit={{ y: "-110%", opacity: 0 }}
                          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute text-xl sm:text-4xl md:text-5xl font-medium font-serif tracking-tight text-[#5f7d64]"
                        >
                          {formatNumber(timeLeft.seconds)}
                        </motion.span>
                      </AnimatePresence>
                    </span>
                    <span className="text-[9px] sm:text-sm text-[#5f7d64] font-[family-name:var(--font-noto-naskh)]">
                      ثانیه
                    </span>
                  </span>
                </div>
              ) : (
                <div className="min-h-32" aria-hidden="true" />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

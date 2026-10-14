"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { weddingConfig } from "../../config/wedding";
import { SectionHeading } from "./ui/SectionHeading";
import { GlassCard } from "./ui/GlassCard";
import { toEasternArabicNumerals } from "@/lib/formatters";

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

function formatNumberFa(value: number): string {
  const pad = String(value).padStart(2, "0");
  return toEasternArabicNumerals(pad);
}

export default function FoggedCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [mode, setMode] = useState<CountdownMode>("countdown");

  useEffect(() => {
    const target = new Date(weddingConfig.countdownTargetISO).getTime();
    const end = new Date(weddingConfig.endDateTimeISO).getTime();
    const testParam = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("testDate") : null;
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
      className="relative py-14 px-4 bg-transparent flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="w-full max-w-3xl relative z-10 flex flex-col items-center text-center">
        <SectionHeading
          title={mode === "countdown" ? "شمارش معکوس" : "جشن عروسی بهاره و امین‌الله"}
        />

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
              <h3 className="text-2xl sm:text-4xl font-bold text-[var(--ink)] font-vazir">
                امروز، روز بزرگ زندگی مشترک ماست
              </h3>
              <p className="text-base sm:text-lg text-[var(--ink-muted)] font-vazir">
                به جشن عروسی بهاره و امین‌الله خوش آمدید
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
              <h3 className="text-xl sm:text-3xl font-bold text-[var(--ink)] font-vazir">
                از همراهی گرم‌تان در جشن عروسی ما سپاسگزاریم
              </h3>
              <p className="text-sm sm:text-base text-[var(--ink-muted)] font-vazir">
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
              <p className="text-xs sm:text-sm text-[var(--ink-muted)] font-vazir mb-6" dir="rtl">
                تا {weddingConfig.weekdayFa}، {weddingConfig.solarHijriDateFa} و آغاز جشن بزرگ ما
              </p>

              {timeLeft ? (
                <GlassCard className="w-full max-w-2xl py-6 px-3 sm:px-6">
                  <div
                    className="grid grid-cols-4 gap-2 sm:gap-4 items-center text-center"
                    dir="rtl"
                    aria-label="شمارش معکوس تا آغاز جشن عروسی"
                  >
                    {[
                      { label: "روز", value: timeLeft.days },
                      { label: "ساعت", value: timeLeft.hours },
                      { label: "دقیقه", value: timeLeft.minutes },
                      { label: "ثانیه", value: timeLeft.seconds },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex flex-col items-center justify-center p-2 rounded-lg bg-white/40 border border-[var(--line-subtle)]"
                      >
                        <div className="relative h-10 sm:h-14 flex items-center justify-center overflow-hidden w-full">
                          <AnimatePresence mode="popLayout" initial={false}>
                            <motion.span
                              key={item.value}
                              initial={{ y: "100%", opacity: 0 }}
                              animate={{ y: "0%", opacity: 1 }}
                              exit={{ y: "-100%", opacity: 0 }}
                              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                              className="text-2xl sm:text-4xl md:text-5xl font-bold font-vazir text-[var(--wine)] tracking-normal"
                            >
                              {formatNumberFa(item.value)}
                            </motion.span>
                          </AnimatePresence>
                        </div>
                        <span className="text-[10px] sm:text-xs text-[var(--gold-dark)] font-semibold mt-1">
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </GlassCard>
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

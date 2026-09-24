"use client";

import React, { useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "motion/react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

type EventState = "BEFORE_EVENT" | "EVENT_DAY" | "AFTER_EVENT";

const KABUL_TARGET_ISO = "2026-10-16T00:00:00+04:30";
const KABUL_DAY_AFTER_ISO = "2026-10-17T00:00:00+04:30";

const targetTime = new Date(KABUL_TARGET_ISO).getTime();
const afterTime = new Date(KABUL_DAY_AFTER_ISO).getTime();

const emptySubscribe = () => () => {};

function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

function useCurrentTime() {
  return useSyncExternalStore(
    (callback) => {
      const timer = setInterval(callback, 1000);
      return () => clearInterval(timer);
    },
    () => Date.now(),
    () => 0
  );
}

function useTestTime() {
  return useSyncExternalStore(
    emptySubscribe,
    () => {
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        const testParam = params.get("testDate");
        if (testParam) {
          const parsed = Date.parse(testParam);
          if (!isNaN(parsed)) return parsed;
        }
      }
      return null;
    },
    () => null
  );
}

export default function FoggedCountdown() {
  const isMounted = useIsMounted();
  const currentTime = useCurrentTime();
  const testTime = useTestTime();

  const effectiveNow = testTime !== null ? testTime : currentTime;

  let eventState: EventState = "BEFORE_EVENT";
  if (effectiveNow >= afterTime) {
    eventState = "AFTER_EVENT";
  } else if (effectiveNow >= targetTime) {
    eventState = "EVENT_DAY";
  }

  const calculateTimeLeft = (): TimeLeft => {
    const difference = targetTime - effectiveNow;
    if (difference <= 0 || isNaN(difference)) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return {
      days: isNaN(days) ? 0 : Math.max(0, days),
      hours: isNaN(hours) ? 0 : Math.max(0, hours),
      minutes: isNaN(minutes) ? 0 : Math.max(0, minutes),
      seconds: isNaN(seconds) ? 0 : Math.max(0, seconds),
    };
  };

  const timeLeft = calculateTimeLeft();

  if (!isMounted) {
    return (
      <section
        id="countdown"
        className="relative py-20 px-4 bg-[var(--paper-white)] text-[var(--gold)] flex flex-col items-center justify-center border-y border-[var(--gold)]/10 overflow-hidden"
      >
        <div className="w-full max-w-4xl min-h-[160px]" />
      </section>
    );
  }

  return (
    <section
      id="countdown"
      className="relative py-20 px-4 bg-[var(--paper-white)] text-[var(--gold)] flex flex-col items-center justify-center border-y border-[var(--gold)]/10 overflow-hidden"
    >
      <div className="w-full max-w-4xl relative z-10 flex flex-col items-center text-center">
        <AnimatePresence mode="wait">
          {eventState === "EVENT_DAY" && (
            <motion.div
              key="event-day"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center justify-center w-full py-6 px-4"
            >
              {/* Floating golden sparkle effects behind celebration card */}
              <div className="absolute inset-0 pointer-events-none flex justify-center items-center opacity-60">
                <motion.div
                  animate={{
                    scale: [0.95, 1.05, 0.95],
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-72 h-72 rounded-full bg-[var(--gold)]/10 blur-3xl"
                />
              </div>

              {/* Shimmering Header Accent */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "80px" }}
                transition={{ duration: 1, delay: 0.2 }}
                className="h-[1px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent mb-6"
              />

              {/* Big Dari Headline */}
              <h2
                dir="rtl"
                className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide text-[var(--gold)] mb-4 leading-relaxed font-[family-name:var(--font-noto-naskh)] drop-shadow-sm"
              >
                امروز روز عروسی ماست
              </h2>

              {/* Dari Subline */}
              <p
                dir="rtl"
                className="text-lg sm:text-xl md:text-2xl text-[var(--gold)]/90 mb-8 font-[family-name:var(--font-noto-naskh)] tracking-wide"
              >
                به مراسم عروسی ما خوش آمدید
              </p>

              {/* Divider ornament */}
              <div className="flex items-center justify-center gap-3 my-2 opacity-80">
                <span className="w-12 h-[1px] bg-[var(--gold)]/40" />
                <span className="text-[var(--gold)] text-xs font-serif">♦</span>
                <span className="w-12 h-[1px] bg-[var(--gold)]/40" />
              </div>

              {/* English Lines */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-6 flex flex-col items-center space-y-2"
              >
                <p className="text-sm sm:text-base tracking-[0.25em] uppercase font-light text-[var(--gold)]/90">
                  Today is the day
                </p>
                <p className="text-xs sm:text-sm tracking-[0.15em] font-serif text-[var(--gold)]/75 italic">
                  Taj Continental Wedding Hall, Kabul
                </p>
              </motion.div>

              {/* Shimmering Bottom Accent */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "80px" }}
                transition={{ duration: 1, delay: 0.2 }}
                className="h-[1px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent mt-8"
              />
            </motion.div>
          )}

          {eventState === "AFTER_EVENT" && (
            <motion.div
              key="after-event"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center justify-center w-full py-8 px-4 text-center"
            >
              <h2
                dir="rtl"
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--gold)] mb-4 font-[family-name:var(--font-noto-naskh)]"
              >
                از حضور گرم‌تان در مراسم عروسی ما سپاسگزاریم
              </h2>
              <p className="text-sm sm:text-base md:text-lg tracking-[0.2em] uppercase font-light text-[var(--gold)]/80 mt-2">
                Thank you for celebrating with us
              </p>
            </motion.div>
          )}

          {eventState === "BEFORE_EVENT" && (
            <motion.div
              key="before-event"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full flex flex-col items-center"
            >
              <h3 className="text-xs sm:text-sm tracking-[0.3em] uppercase text-[var(--gold)]/80 mb-8 font-light">
                Counting Down To The Big Day
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-3xl">
                {[
                  { label: "Days", value: timeLeft.days, labelFa: "روز" },
                  { label: "Hours", value: timeLeft.hours, labelFa: "ساعت" },
                  { label: "Minutes", value: timeLeft.minutes, labelFa: "دقیقه" },
                  { label: "Seconds", value: timeLeft.seconds, labelFa: "ثانیه" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col items-center justify-center p-4 sm:p-6 rounded-lg bg-[var(--ivory)]/40 border border-[var(--gold)]/20 shadow-sm backdrop-blur-[2px]"
                  >
                    <span className="text-3xl sm:text-4xl md:text-5xl font-light font-serif tracking-tight text-[var(--gold)]">
                      {String(item.value).padStart(2, "0")}
                    </span>
                    <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[var(--gold)]/70 mt-2">
                      {item.label}
                    </span>
                    <span
                      dir="rtl"
                      className="text-[10px] sm:text-xs text-[var(--gold)]/60 font-[family-name:var(--font-noto-naskh)] mt-0.5"
                    >
                      {item.labelFa}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

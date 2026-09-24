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

let cachedTime = typeof window !== "undefined" ? Date.now() : 0;
const timeListeners = new Set<() => void>();
let timeInterval: ReturnType<typeof setInterval> | null = null;

function subscribeTime(callback: () => void) {
  timeListeners.add(callback);
  if (!timeInterval) {
    cachedTime = Date.now();
    timeInterval = setInterval(() => {
      cachedTime = Date.now();
      timeListeners.forEach((cb) => cb());
    }, 1000);
  }
  return () => {
    timeListeners.delete(callback);
    if (timeListeners.size === 0 && timeInterval) {
      clearInterval(timeInterval);
      timeInterval = null;
    }
  };
}

function getTimeSnapshot() {
  return cachedTime;
}

function getServerTimeSnapshot() {
  return 0;
}

function useCurrentTime() {
  return useSyncExternalStore(subscribeTime, getTimeSnapshot, getServerTimeSnapshot);
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

function AnimatedNumber({ value }: { value: number }) {
  const formatted = String(value).padStart(2, "0");
  return (
    <div className="relative overflow-hidden h-[1.1em] inline-flex items-center justify-center">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={formatted}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="inline-block"
        >
          {formatted}
        </motion.span>
      </AnimatePresence>
    </div>
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
        className="relative py-10 sm:py-14 px-4 text-[var(--gold-dark)] flex flex-col items-center justify-center overflow-hidden"
      >
        <div className="w-full max-w-4xl min-h-[80px]" />
      </section>
    );
  }

  return (
    <section
      id="countdown"
      className="relative py-8 sm:py-12 px-4 text-[var(--gold-dark)] flex flex-col items-center justify-center overflow-hidden select-none"
    >
      <div className="w-full max-w-4xl relative z-10 flex flex-col items-center text-center">
        <AnimatePresence mode="wait">
          {eventState === "EVENT_DAY" && (
            <motion.div
              key="event-day"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center justify-center w-full py-4 px-4"
            >
              <h2
                dir="rtl"
                className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide text-[var(--gold-dark)] mb-2 font-noto-naskh"
              >
                امروز روز عروسی ماست - خوش آمدید
              </h2>
              <p className="text-xs sm:text-sm tracking-[0.25em] uppercase font-light text-[var(--gold-dark)]/80">
                Today is the day
              </p>
            </motion.div>
          )}

          {eventState === "AFTER_EVENT" && (
            <motion.div
              key="after-event"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center justify-center w-full py-4 px-4 text-center"
            >
              <h2
                dir="rtl"
                className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--gold-dark)] mb-2 font-noto-naskh"
              >
                از حضور گرم‌تان در مراسم عروسی ما سپاسگزاریم
              </h2>
              <p className="text-xs sm:text-sm tracking-[0.2em] uppercase font-light text-[var(--gold-dark)]/80">
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
              className="w-full flex flex-col items-center justify-center"
            >
              {/* One-Line Sleek Borderless Countdown */}
              <div
                dir="ltr"
                className="flex flex-row items-center justify-center gap-3 sm:gap-6 md:gap-10 w-full max-w-3xl mx-auto py-2"
              >
                {[
                  { label: "DAYS", value: timeLeft.days, labelFa: "روز" },
                  { label: "HOURS", value: timeLeft.hours, labelFa: "ساعت" },
                  { label: "MINS", value: timeLeft.minutes, labelFa: "دقیقه" },
                  { label: "SECS", value: timeLeft.seconds, labelFa: "ثانیه" },
                ].map((item, index) => (
                  <React.Fragment key={item.label}>
                    {index > 0 && (
                      <span className="text-lg sm:text-2xl md:text-3xl font-serif text-[var(--gold-dark)]/30 font-light select-none pb-4">
                        :
                      </span>
                    )}
                    <div className="flex flex-col items-center justify-center min-w-[50px] sm:min-w-[75px]">
                      <div className="text-3xl sm:text-5xl md:text-6xl font-cinzel font-semibold tracking-tight text-[var(--gold-dark)]">
                        <AnimatedNumber value={item.value} />
                      </div>
                      <div className="flex items-center gap-1 mt-1 text-[10px] sm:text-xs tracking-[0.18em] uppercase text-[var(--gold-dark)]/70 font-medium">
                        <span>{item.label}</span>
                        <span className="text-[9px] sm:text-[10px] text-[var(--gold-dark)]/50 font-noto-naskh">
                          ({item.labelFa})
                        </span>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

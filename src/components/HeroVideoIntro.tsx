"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

interface HeroVideoIntroProps {
  onDismiss?: () => void;
}

// If the video hasn't been able to play within this long (broken URL, dead
// CDN edge, offline, etc.) we skip the intro entirely rather than leave a
// full-screen black overlay blocking the rest of the site forever.
const MAX_WAIT_MS = 8000;

const STALL_TIMEOUT_MS = 4500;

export default function HeroVideoIntro({ onDismiss }: HeroVideoIntroProps) {
  const [hasStarted, setHasStarted] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const watchdogRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastProgressRef = useRef(0);

  const dismiss = useCallback(() => {
    requestAnimationFrame(() => {
      setIsDismissed(true);
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }
      onDismiss?.();
    });
  }, [onDismiss]);

  // Ensure page is pinned to the top on load & when history scroll restoration is handled
  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }
  }, []);

  // Lock document body scrolling while the intro is active
  useEffect(() => {
    if (!isDismissed) {
      const originalBodyOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);

      return () => {
        document.body.style.overflow = originalBodyOverflow;
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      };
    }
  }, [isDismissed]);

  // Safety net: if the video never becomes playable (404, offline, stalled
  // connection) don't hold the whole site hostage behind a black screen.
  useEffect(() => {
    if (isDismissed) return;
    watchdogRef.current = setTimeout(() => {
      if (!hasStarted) dismiss();
    }, MAX_WAIT_MS);
    return () => {
      if (watchdogRef.current) clearTimeout(watchdogRef.current);
    };
  }, [isDismissed, hasStarted, dismiss]);

  // A video can enter `playing` and then stop emitting progress without
  // firing `error` or `ended` on iOS. Give it a short grace period, then
  // reveal the invitation instead of leaving the overlay permanently stuck.
  useEffect(() => {
    if (!hasStarted || isDismissed) return;

    lastProgressRef.current = Date.now();
    const interval = window.setInterval(() => {
      const video = videoRef.current;
      if (!video || video.ended || video.paused) return;
      if (Date.now() - lastProgressRef.current >= STALL_TIMEOUT_MS) {
        dismiss();
      }
    }, 1000);

    return () => window.clearInterval(interval);
  }, [hasStarted, isDismissed, dismiss]);

  const handleVideoError = () => {
    console.log("Envelope intro video failed to load — skipping intro.");
    dismiss();
  };

  const handleScreenClick = () => {
    if (hasStarted) return;
    setHasStarted(true);
    if (watchdogRef.current) clearTimeout(watchdogRef.current);
    lastProgressRef.current = Date.now();

    videoRef.current?.play().catch((err) => {
      console.log("Video play error:", err);
      // Playback itself failed after the user gesture — don't get stuck.
      dismiss();
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleScreenClick();
    }
  };

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        onClick={handleScreenClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label="باز کردن کارت عروسی"
        className="fixed inset-0 z-50 w-full h-[100dvh] bg-[var(--ivory,#f7f4ee)] cursor-pointer overflow-hidden select-none focus:outline-none flex items-center justify-center"
      >
        {/* 1. Explicit High-Quality Frame Poster Background Image */}
        {!hasStarted && (
          <div className="absolute inset-0 w-full h-full z-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/media/envelope-poster.jpg"
              alt="کارت دعوت عروسی"
              className="w-full h-full object-cover object-center"
            />
          </div>
        )}

        {/* 2. Video Element with mandatory iOS WebKit attributes */}
        <video
          ref={videoRef}
          src="/media/envelope-opening.mp4"
          poster="/media/envelope-poster.jpg"
          muted
          playsInline
          {...({ "webkit-playsinline": "true" } as React.VideoHTMLAttributes<HTMLVideoElement>)}
          preload="metadata"
          onTimeUpdate={() => {
            lastProgressRef.current = Date.now();
          }}
          onError={handleVideoError}
          onEnded={dismiss}
          className={`relative z-10 w-full h-full object-cover object-center transition-opacity duration-300 ${
            hasStarted ? "opacity-100" : "opacity-90"
          }`}
        />
      </motion.div>
    </AnimatePresence>
  );
}

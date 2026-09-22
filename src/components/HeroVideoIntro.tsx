"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

interface HeroVideoIntroProps {
  onDismiss?: () => void;
  onStart?: () => void;
}

export default function HeroVideoIntro({ onDismiss, onStart }: HeroVideoIntroProps) {
  const [hasStarted, setHasStarted] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

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

  const handleVideoError = () => {
    console.log("Envelope intro video failed to load — keeping intro open.");
  };

  const handleScreenClick = () => {
    if (hasStarted) return;
    setHasStarted(true);
    onStart?.();

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
        className="fixed inset-0 z-50 w-full h-[100dvh] bg-[#ece6d8] cursor-pointer overflow-hidden select-none focus:outline-none flex items-center justify-center"
      >
        {/* 1. Explicit High-Quality Frame Poster Background Image */}
        {!hasStarted && (
          <div className="absolute inset-0 w-full h-full z-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/variation2vid-poster.jpg"
              alt="کارت دعوت عروسی"
              className="w-full h-full object-cover object-center"
            />
          </div>
        )}

        {/* 2. Video Element with mandatory iOS WebKit attributes */}
        <video
          ref={videoRef}
          src="/variation2vid.mp4"
          poster="/variation2vid-poster.jpg"
          muted
          playsInline
          {...({ "webkit-playsinline": "true" } as React.VideoHTMLAttributes<HTMLVideoElement>)}
          preload="metadata"
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

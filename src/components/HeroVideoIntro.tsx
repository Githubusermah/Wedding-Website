"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface HeroVideoIntroProps {
  onDismiss?: () => void;
  onUserGesture?: () => void;
}

export default function HeroVideoIntro({ onDismiss, onUserGesture }: HeroVideoIntroProps) {
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Ensure scroll is locked to top when intro video is active
  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }
  }, []);

  // Lock document and body scrolling while opening video state is active
  useEffect(() => {
    if (!isDismissed) {
      const originalDocOverflow = document.documentElement.style.overflow;
      const originalBodyOverflow = document.body.style.overflow;
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      if (typeof window !== "undefined") {
        window.scrollTo(0, 0);
      }

      return () => {
        document.documentElement.style.overflow = originalDocOverflow;
        document.body.style.overflow = originalBodyOverflow;
        if (typeof window !== "undefined") {
          window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        }
      };
    }
  }, [isDismissed]);

  const handleScreenClick = () => {
    if (hasStarted) return;
    setHasStarted(true);

    if (onUserGesture) {
      onUserGesture();
    }

    if (videoRef.current) {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.log("Video play error:", err);
          setIsPlaying(true);
        });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleScreenClick();
    }
  };

  const handleEnded = () => {
    setIsDismissed(true);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
    if (onDismiss) {
      onDismiss();
    }
  };

  const handleError = () => {
    console.log("Video playback error encountered, dismissing overlay");
    handleEnded();
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
        onTouchMove={(e) => e.preventDefault()}
        role="button"
        tabIndex={0}
        aria-label="باز کردن کارت عروسی"
        className="fixed inset-0 z-50 w-full h-[100dvh] min-h-screen bg-[var(--ivory)] cursor-pointer overflow-hidden select-none focus:outline-none flex items-center justify-center"
      >
        {/* Frozen initial frame poster image fallback displayed until video actually starts playing */}
        {!isPlaying && (
          <img
            src="/media/envelope-poster.jpg"
            alt="Hero Envelope Initial Frame"
            className="absolute inset-0 w-full h-full object-cover object-center z-10 pointer-events-none transition-opacity duration-300"
          />
        )}

        <video
          ref={videoRef}
          src="/media/envelope-opening.mp4"
          poster="/media/envelope-poster.jpg"
          playsInline
          muted
          preload="auto"
          onPlay={() => setIsPlaying(true)}
          onPlaying={() => setIsPlaying(true)}
          onEnded={handleEnded}
          onError={handleError}
          className="w-full h-full object-cover object-center"
        />

        {/* Floating invitation hint prior to interaction */}
        {!hasStarted && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none"
          >
            <div className="px-5 py-2.5 rounded-full bg-[var(--paper-white)]/90 backdrop-blur-md border border-[var(--gold)]/40 shadow-md text-[var(--ink)] text-xs sm:text-sm font-medium flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--gold)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--gold-dark)]"></span>
              </span>
              <span>جهت باز کردن دعوت‌نامه لمس کنید</span>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

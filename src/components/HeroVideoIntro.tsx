"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface HeroVideoIntroProps {
  onDismiss?: () => void;
  onUserGesture?: () => void;
}

export default function HeroVideoIntro({ onDismiss, onUserGesture }: HeroVideoIntroProps) {
  const [hasStarted, setHasStarted] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Lock document and body scrolling while opening video state is active
  useEffect(() => {
    if (!isDismissed) {
      const originalDocOverflow = document.documentElement.style.overflow;
      const originalBodyOverflow = document.body.style.overflow;
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";

      return () => {
        document.documentElement.style.overflow = originalDocOverflow;
        document.body.style.overflow = originalBodyOverflow;
      };
    }
  }, [isDismissed]);

  // Frame seek strategy: seek to ~frame 3/4 (approx 0.1s at 30fps) on loaded metadata to avoid pure black first frame
  const handleLoadedMetadata = () => {
    if (videoRef.current && !hasStarted) {
      try {
        videoRef.current.currentTime = 0.12;
      } catch {
        // Ignore seek error if browser restricts pre-play seek
      }
    }
  };

  const handleScreenClick = () => {
    if (hasStarted) return;
    setHasStarted(true);

    if (onUserGesture) {
      onUserGesture();
    }

    if (videoRef.current) {
      videoRef.current
        .play()
        .catch((err) => {
          console.log("Video play error:", err);
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
    if (onDismiss) {
      onDismiss();
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
        className="fixed inset-0 z-50 w-full h-[100dvh] bg-black cursor-pointer overflow-hidden select-none focus:outline-none"
      >
        <video
          ref={videoRef}
          src="/media/envelope-opening.mp4"
          playsInline
          preload="auto"
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
          className="w-full h-full object-cover object-center"
        />
      </motion.div>
    </AnimatePresence>
  );
}

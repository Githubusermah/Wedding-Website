"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, X } from "@phosphor-icons/react";
import { event } from "@/lib/event";

interface HeroVideoIntroProps {
  onDismiss?: () => void;
}

export default function HeroVideoIntro({ onDismiss }: HeroVideoIntroProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handlePlayToggle = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    if (onDismiss) onDismiss();
  };

  return (
    <AnimatePresence>
      {!isDismissed && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#18120e]/95 backdrop-blur-md p-4 sm:p-6"
        >
          <div className="relative w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl border border-[var(--gold)]/40 bg-[#241d17]">
            {/* Top Bar with dismiss button */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-3">
              <button
                onClick={handleDismiss}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#241d17]/80 hover:bg-[#7a1c28] text-[#f6f0e2] text-xs font-medium border border-[var(--gold)]/30 transition-colors"
                aria-label="گذشتن و ورود به دعوت‌نامه"
              >
                <span>ورود به کارت دعوت</span>
                <X size={14} />
              </button>
            </div>

            {/* Video Container */}
            <div
              onClick={handlePlayToggle}
              className="relative aspect-video w-full cursor-pointer group flex items-center justify-center bg-black"
            >
              <video
                ref={videoRef}
                src="/Unveiling-Elegance_2.webm"
                playsInline
                onEnded={handleDismiss}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                className="w-full h-full object-cover"
              />

              {/* Overlay play button if paused */}
              {!isPlaying && (
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-3 text-center p-4">
                  <div className="w-16 h-16 rounded-full bg-[var(--ruby)] text-[#f6f0e2] flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-transform border border-[var(--gold)]">
                    <Play size={28} weight="fill" className="mr-0.5" />
                  </div>
                  <p className="text-[#f6f0e2] font-semibold text-sm sm:text-base">
                    برای پخش ویدیوی رونمایی کلیک کنید
                  </p>
                  <span className="text-[var(--gold)] text-xs">
                    جشن پیوند {event.coupleDisplayName}
                  </span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

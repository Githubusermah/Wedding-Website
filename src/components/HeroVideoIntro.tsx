"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, PlayCircle, X } from "@phosphor-icons/react";

interface HeroVideoIntroProps {
  onDismiss?: () => void;
}

export default function HeroVideoIntro({ onDismiss }: HeroVideoIntroProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleScreenClick = () => {
    if (!videoRef.current) return;
    if (!isPlaying) {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Video play error:", err));
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleDismiss = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsDismissed(true);
    if (onDismiss) onDismiss();
  };

  return (
    <AnimatePresence>
      {!isDismissed && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          onClick={handleScreenClick}
          className="fixed inset-0 z-50 w-full h-[100dvh] bg-stone-950 cursor-pointer overflow-hidden select-none flex items-center justify-center"
        >
          {/* Main Video Element with Poster Image */}
          <video
            ref={videoRef}
            src="/Unveiling-Elegance_2.webm"
            poster="/images/save-the-date-card.png"
            playsInline
            preload="auto"
            onEnded={() => handleDismiss()}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            className="w-full h-full object-cover md:object-contain"
          />

          {/* Tap to Play Overlay when not playing */}
          <AnimatePresence>
            {!isPlaying && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center p-6 text-center text-white"
              >
                <div className="relative group flex flex-col items-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[var(--gold)]/90 text-stone-900 flex items-center justify-center shadow-2xl transform transition-transform group-hover:scale-105 animate-pulse">
                    <Play size={40} weight="fill" className="mr-[-4px]" />
                  </div>
                  <p className="mt-5 text-lg md:text-xl font-bold tracking-wide drop-shadow-md text-amber-100">
                    برای پخش فیلم لمس کنید
                  </p>
                  <p className="text-xs md:text-sm text-stone-300 mt-1 font-medium">
                    Tap anywhere to play video
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Top Skip / Close Button */}
          <button
            onClick={handleDismiss}
            type="button"
            className="absolute top-4 left-4 z-10 px-4 py-2 rounded-full bg-black/60 hover:bg-black/80 text-white text-xs md:text-sm backdrop-blur-md border border-white/20 transition-all flex items-center gap-1.5 shadow-lg"
          >
            <span>ورود به کارت دعوت</span>
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

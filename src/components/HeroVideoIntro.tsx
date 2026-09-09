"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

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
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          onClick={handleScreenClick}
          className="fixed inset-0 z-50 w-full h-[100dvh] bg-black cursor-pointer overflow-hidden select-none"
        >
          <video
            ref={videoRef}
            src="/Unveiling-Elegance_2.webm"
            playsInline
            preload="auto"
            onEnded={handleDismiss}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            className="w-full h-full object-cover"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

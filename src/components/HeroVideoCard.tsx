"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CaretDown, SpeakerHigh, SpeakerX } from "@phosphor-icons/react";

interface HeroVideoCardProps {
  onVideoEnd?: () => void;
  onRequestMusicPrompt?: () => void;
}

export default function HeroVideoCard({
  onVideoEnd,
  onRequestMusicPrompt,
}: HeroVideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [isDimmed, setIsDimmed] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  // Lock scrolling when video is playing or before completion
  useEffect(() => {
    if (!hasEnded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [hasEnded]);

  // Set initial video frame frozen
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.35; // Speed up video slightly per request
    }
  }, []);

  const playCrackSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      // Sharp crack transient
      const bufferSize = ctx.sampleRate * 0.18;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        const decay = Math.exp(-i / (ctx.sampleRate * 0.025));
        data[i] = (Math.random() * 2 - 1) * decay;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "highpass";
      filter.frequency.setValueAtTime(800, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(1.0, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
    } catch (e) {
      console.warn("Audio Context error:", e);
    }
  };

  const handleCardClick = () => {
    if (isPlaying || hasEnded) return;

    playCrackSound();
    setIsPlaying(true);
    setIsDimmed(true);

    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.playbackRate = 1.35;
      videoRef.current.play().catch((err) => console.log("Play failed:", err));
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setIsDimmed(false);
    setHasEnded(true);

    if (onVideoEnd) onVideoEnd();
    if (onRequestMusicPrompt) onRequestMusicPrompt();
  };

  const scrollToContent = () => {
    const nextSection = document.getElementById("poetry-section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full h-[100dvh] flex items-center justify-center overflow-hidden bg-[#070a08] select-none">
      {/* Background Dimming Overlay */}
      <AnimatePresence>
        {isDimmed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 bg-black/90 z-20 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Top & Bottom Letterbox Bars */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: isPlaying ? "8vh" : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="absolute top-0 left-0 right-0 bg-black z-30 pointer-events-none"
      />
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: isPlaying ? "8vh" : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 right-0 bg-black z-30 pointer-events-none"
      />

      {/* Main Full-Screen Video Container */}
      <div
        onClick={handleCardClick}
        className={`relative w-full h-full flex items-center justify-center cursor-pointer transition-transform duration-700 ${
          !isPlaying && !hasEnded ? "hover:scale-[1.01] active:scale-[0.99]" : ""
        }`}
      >
        <video
          ref={videoRef}
          src="/Unveiling Elegance.mp4"
          playsInline
          muted
          preload="auto"
          onEnded={handleEnded}
          className={`w-full h-full object-cover transition-all duration-700 ${
            isPlaying ? "scale-105 z-20" : "scale-100"
          }`}
        />

        {/* Ambient Seal Glow on closed video card state */}
        {!isPlaying && !hasEnded && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              initial={{ opacity: 0.4, scale: 0.95 }}
              animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.95, 1.05, 0.95] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-r from-[#d4af37]/30 via-[#f3e5ab]/20 to-[#986d1a]/30 blur-2xl pointer-events-none"
            />
          </div>
        )}
      </div>

      {/* Scroll Cue Chevron after video ends */}
      <AnimatePresence>
        {hasEnded && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center cursor-pointer"
            onClick={scrollToContent}
          >
            <span className="text-xs tracking-widest text-[#d4af37] mb-2 font-medium">
              ورود به دعوت‌نامه
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="w-10 h-10 rounded-full border border-[#d4af37]/40 bg-[#0d1210]/80 backdrop-blur-md flex items-center justify-center text-[#d4af37] shadow-lg shadow-[#d4af37]/20 hover:border-[#d4af37]"
            >
              <CaretDown size={20} weight="bold" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

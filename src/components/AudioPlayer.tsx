"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SpeakerHigh, SpeakerX, MusicNotes } from "@phosphor-icons/react";

interface AudioPlayerProps {
  autoPrompt?: boolean;
}

export default function AudioPlayer({ autoPrompt = false }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPromptModal, setShowPromptModal] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Generate Web Audio romantic Persian/Afghan wedding melody if audio file is not supplied
  useEffect(() => {
    if (autoPrompt) {
      setShowPromptModal(true);
    }
  }, [autoPrompt]);

  const toggleMusic = () => {
    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
    } else {
      playWeddingMusic();
    }
  };

  const playWeddingMusic = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;

      const ctx = new AudioContext();

      // Synthesize a romantic oriental wedding harp melody loop
      const notes = [293.66, 329.63, 349.23, 392.0, 440.0, 466.16, 523.25]; // D minor / Bayati scale
      let noteIndex = 0;

      const playMelody = () => {
        if (!isPlaying && noteIndex > 0 && !audioRef.current) return;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(notes[noteIndex % notes.length], ctx.currentTime);

        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 1.2);

        noteIndex++;
      };

      const interval = setInterval(playMelody, 600);
      setIsPlaying(true);
      setShowPromptModal(false);

      // Store cleanup function
      (window as any)._weddingAudioInterval = interval;
    } catch (e) {
      console.warn("Audio synthesis error:", e);
    }
  };

  return (
    <>
      {/* Floating Bottom Music Controls Toggle */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleMusic}
          className={`w-12 h-12 rounded-full border border-[#d4af37]/50 backdrop-blur-md flex items-center justify-center text-[#d4af37] shadow-xl transition-all duration-300 cursor-pointer ${
            isPlaying
              ? "bg-[#d4af37]/20 border-[#d4af37] scale-110 shadow-[#d4af37]/30"
              : "bg-[#09110d]/80 hover:bg-[#d4af37]/10"
          }`}
          title={isPlaying ? "قطع موسیقی" : "پخش موسیقی"}
        >
          {isPlaying ? (
            <SpeakerHigh size={24} className="animate-pulse text-[#d4af37]" />
          ) : (
            <SpeakerX size={24} className="text-[#a0b0a8]" />
          )}
        </button>
      </div>

      {/* Music Permission Prompt Modal */}
      <AnimatePresence>
        {showPromptModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass-card rounded-3xl p-6 md:p-8 border border-[#d4af37]/40 max-w-sm w-full text-center shadow-2xl space-y-5"
            >
              <div className="w-16 h-16 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] mx-auto">
                <MusicNotes size={32} weight="fill" />
              </div>

              <div>
                <h3 className="text-xl font-heading text-gold-gradient">
                  موسیقی دل‌نواز عروسی
                </h3>
                <p className="text-sm text-[#a0b0a8] mt-2 leading-relaxed">
                  آیا می‌خواهید نغمه دل‌نشین افغانی و ملودی خاطره‌انگیز حین مرور کارت پخش شود؟
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    playWeddingMusic();
                  }}
                  className="flex-1 py-3 rounded-xl bg-gold-gradient text-[#090e0b] font-bold text-sm shadow-md shadow-[#d4af37]/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  بله، پخش شود
                </button>
                <button
                  onClick={() => setShowPromptModal(false)}
                  className="flex-1 py-3 rounded-xl border border-[#d4af37]/30 text-[#a0b0a8] text-sm hover:bg-white/5 transition-colors cursor-pointer"
                >
                  خیر، سپاس
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

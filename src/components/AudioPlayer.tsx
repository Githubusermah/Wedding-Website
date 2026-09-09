"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SpeakerHigh, SpeakerX, MusicNotes, Play } from "@phosphor-icons/react";

interface AudioPlayerProps {
  autoPrompt?: boolean;
}

export default function AudioPlayer({ autoPrompt = false }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPromptModal, setShowPromptModal] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (autoPrompt) {
      const timer = setTimeout(() => {
        setShowPromptModal(true);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [autoPrompt]);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Audio play error:", err));
    }
  };

  const handleConfirmPlay = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Audio autoplay blocked:", err));
    }
    setShowPromptModal(false);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/music/aryana-ahesta-bero.opus"
        loop
        preload="auto"
      />

      {/* Floating Music Controller Button */}
      <div className="fixed bottom-20 md:bottom-6 left-6 z-40">
        <button
          onClick={toggleMusic}
          className={`relative group flex items-center gap-3 px-4 py-2.5 rounded-full border shadow-md backdrop-blur-md transition-all cursor-pointer ${
            isPlaying
              ? "bg-[var(--ruby)] border-[var(--gold)] text-[var(--paper-white)] shadow-md"
              : "bg-[var(--paper-white)] border-[var(--line)] text-[var(--ink)] hover:bg-[var(--ivory-deep)]"
          }`}
          title={isPlaying ? "توقف موسیقی" : "پخش آهنگ آهسته برو"}
        >
          <MusicNotes size={20} weight="fill" className={isPlaying ? "text-[var(--gold)]" : "text-[var(--ruby)]"} />

          <span className="text-xs font-semibold hidden sm:inline-block">
            {isPlaying ? "آهسته برو - آریانا سعید" : "پخش موسیقی"}
          </span>

          <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs">
            {isPlaying ? <SpeakerHigh size={16} weight="fill" /> : <SpeakerX size={16} weight="bold" />}
          </div>
        </button>
      </div>

      {/* Music Permission Modal */}
      <AnimatePresence>
        {showPromptModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#1a2a20]/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="paper-card p-6 md:p-8 max-w-sm w-full text-center shadow-2xl space-y-5"
            >
              <div className="w-14 h-14 rounded-full bg-[var(--ruby)]/10 text-[var(--ruby)] border border-[var(--gold)]/30 flex items-center justify-center mx-auto shadow-sm">
                <MusicNotes size={28} weight="fill" />
              </div>

              <div>
                <span className="inline-block text-xs font-bold text-[var(--gold)] uppercase bg-[var(--ivory-deep)] px-3 py-1 rounded-full mb-2">
                  موسیقی اصیل افغانی
                </span>
                <h3 className="text-xl font-bold text-[var(--ruby)]">
                  پخش آهنگ «آهسته برو»
                </h3>
                <p className="text-xs md:text-sm text-[var(--ink-muted)] mt-2 leading-relaxed">
                  آیا می‌خواهید آهنگ خاطره‌انگیز «آهسته برو» حین مرور کارت عروسی پخش شود؟
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleConfirmPlay}
                  className="flex-1 py-3 rounded-xl bg-[var(--ruby)] text-[var(--paper-white)] font-bold text-sm shadow-md hover:bg-[var(--ruby-deep)] transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Play size={18} weight="fill" />
                  بله، پخش شود
                </button>
                <button
                  onClick={() => setShowPromptModal(false)}
                  className="flex-1 py-3 rounded-xl border border-[var(--line)] text-[var(--ink)] text-sm hover:bg-[var(--ivory-deep)] transition-colors cursor-pointer"
                >
                  خیر، بدون صدا
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SpeakerHigh, SpeakerX, MusicNotes, Play, Pause } from "@phosphor-icons/react";

interface AudioPlayerProps {
  autoPrompt?: boolean;
}

export default function AudioPlayer({ autoPrompt = false }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPromptModal, setShowPromptModal] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (autoPrompt) {
      setShowPromptModal(true);
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
      {/* HTML5 Audio element for background music */}
      <audio
        ref={audioRef}
        src="/music/aryana-ahesta-bero.opus"
        loop
        preload="auto"
      />

      {/* Floating Music Controller Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleMusic}
          className={`relative group flex items-center gap-3 px-4 py-3 rounded-full border shadow-xl backdrop-blur-md transition-all duration-300 cursor-pointer ${
            isPlaying
              ? "bg-[#8b1e2d] border-[#c5a059] text-white shadow-[#8b1e2d]/30 scale-105"
              : "bg-white/90 border-[#5b7e53]/30 text-[#5b7e53] hover:bg-[#eef4ed]"
          }`}
          title={isPlaying ? "توقف موسیقی" : "پخش آهنگ آهسته برو"}
        >
          {/* Animated Equalizer Bars when Playing */}
          {isPlaying ? (
            <div className="flex items-end gap-1 h-5 w-5 justify-center">
              <span className="w-1 bg-[#c5a059] rounded-full animate-[bounce_1s_infinite_100ms] h-full" />
              <span className="w-1 bg-[#ffffff] rounded-full animate-[bounce_1s_infinite_300ms] h-3/4" />
              <span className="w-1 bg-[#c5a059] rounded-full animate-[bounce_1s_infinite_200ms] h-1/2" />
            </div>
          ) : (
            <MusicNotes size={22} weight="fill" className="text-[#5b7e53]" />
          )}

          <span className="text-xs font-semibold hidden sm:inline-block">
            {isPlaying ? "آهسته برو - آریانا سعید" : "پخش موسیقی محفل"}
          </span>

          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs transition-colors ${
              isPlaying ? "bg-white/20 text-white" : "bg-[#5b7e53]/10 text-[#5b7e53]"
            }`}
          >
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
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass-card rounded-3xl p-6 md:p-8 border border-[#c5a059]/40 max-w-sm w-full text-center shadow-2xl space-y-5 bg-white/95"
            >
              <div className="w-16 h-16 rounded-full bg-[#fdf0f2] border border-[#8b1e2d]/30 flex items-center justify-center text-[#8b1e2d] mx-auto shadow-md">
                <MusicNotes size={32} weight="fill" />
              </div>

              <div>
                <span className="inline-block text-xs font-bold text-[#5b7e53] uppercase bg-[#eef4ed] px-3 py-1 rounded-full border border-[#5b7e53]/20 mb-2">
                  موسیقی اصیل افغانی
                </span>
                <h3 className="text-xl font-heading text-[#8b1e2d]">
                  پخش آهنگ «آهسته برو»
                </h3>
                <p className="text-xs md:text-sm text-[#4a5850] mt-2 leading-relaxed">
                  آیا می‌خواهید آهنگ خاطره‌انگیز «آهسته برو» با صدای هنرمند محبوب آریانا سعید حین مرور کارت عروسی پخش شود؟
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleConfirmPlay}
                  className="flex-1 py-3 rounded-xl bg-deep-red-gradient text-white font-bold text-sm shadow-md shadow-[#8b1e2d]/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Play size={18} weight="fill" />
                  بله، پخش شود
                </button>
                <button
                  onClick={() => setShowPromptModal(false)}
                  className="flex-1 py-3 rounded-xl border border-[#5b7e53]/30 text-[#4a5850] text-sm hover:bg-[#eef4ed] transition-colors cursor-pointer"
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

"use client";

import { useState, useRef, useImperativeHandle, forwardRef } from "react";
import { SpeakerHigh, SpeakerX, MusicNotes } from "@phosphor-icons/react";

export interface AudioPlayerHandle {
  playAudio: () => void;
}

const AudioPlayer = forwardRef<AudioPlayerHandle>((_, ref) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useImperativeHandle(ref, () => ({
    playAudio: () => {
      if (!audioRef.current) return;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Audio autoplay blocked by browser policy:", err));
    },
  }));

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

  return (
    <>
      <audio
        ref={audioRef}
        src="/media/benshin-tamashayat-konam.mp3"
        loop
        preload="auto"
      />

      {/* Discreet, minimalist music toggle */}
      <div className="fixed bottom-20 md:bottom-6 left-6 z-40">
        <button
          onClick={toggleMusic}
          aria-pressed={isPlaying}
          aria-label={isPlaying ? "توقف پخش موسیقی" : "پخش موسیقی بنشین تماشایت کنم"}
          className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--paper-white)]/90 backdrop-blur-md border border-[var(--line)] shadow-xs hover:border-[var(--gold)] text-[var(--ink)] text-xs transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
        >
          <MusicNotes size={16} className="text-[var(--gold-dark)]" />
          <span className="font-medium hidden sm:inline-block">
            {isPlaying ? "بنشین تماشایت کنم — آرمان گرشاسبی" : "پخش موسیقی"}
          </span>
          <div className="w-5 h-5 rounded-full flex items-center justify-center text-[var(--ink-muted)]">
            {isPlaying ? <SpeakerHigh size={14} /> : <SpeakerX size={14} />}
          </div>
        </button>
      </div>
    </>
  );
});

AudioPlayer.displayName = "AudioPlayer";

export default AudioPlayer;

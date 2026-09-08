"use client";

import { useState } from "react";
import HeroVideoCard from "@/components/HeroVideoCard";
import PoetrySection from "@/components/PoetrySection";
import FogCountdown from "@/components/FogCountdown";
import CalendarCard from "@/components/CalendarCard";
import VenueSection from "@/components/VenueSection";
import GallerySection from "@/components/GallerySection";
import RsvpForm from "@/components/RsvpForm";
import AudioPlayer from "@/components/AudioPlayer";
import FooterReplay from "@/components/FooterReplay";

export default function Home() {
  const [askForMusic, setAskForMusic] = useState(false);
  const [replayKey, setReplayKey] = useState(0);

  const handleVideoEnd = () => {
    setAskForMusic(true);
  };

  const handleReplay = () => {
    setAskForMusic(false);
    setReplayKey((prev) => prev + 1);
  };

  return (
    <main className="min-h-screen bg-[#090e0b] text-[#f5f2eb] relative overflow-x-hidden selection:bg-[#d4af37] selection:text-[#090e0b]">
      {/* 1. Closed Hero Card Video */}
      <HeroVideoCard
        key={replayKey}
        onVideoEnd={handleVideoEnd}
        onRequestMusicPrompt={() => setAskForMusic(true)}
      />

      {/* Main Page Content (Revealed after video) */}
      <div className="relative z-10 space-y-8 md:space-y-16">
        {/* 2. Dari Wedding Poetry & Groom/Bride Story */}
        <PoetrySection />

        {/* 3. Interactive Fog Wipe Countdown Timer */}
        <FogCountdown />

        {/* 4. Dari Calendar UI Component */}
        <CalendarCard />

        {/* 5. Venue Information & Google Maps Location */}
        <VenueSection />

        {/* 6. Photo Gallery Showcase */}
        <GallerySection />

        {/* 7. Interactive RSVP Form */}
        <RsvpForm />

        {/* 8. Replay & Back to Top Footer */}
        <FooterReplay onReplay={handleReplay} />
      </div>

      {/* Floating Audio Controller & Music Prompt */}
      <AudioPlayer autoPrompt={askForMusic} />
    </main>
  );
}

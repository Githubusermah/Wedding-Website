"use client";

import { useState } from "react";
import HeroVideoCard from "@/components/HeroVideoCard";
import PoetrySection from "@/components/PoetrySection";
import FogCountdown from "@/components/FogCountdown";
import CalendarCard from "@/components/CalendarCard";
import ScheduleTimeline from "@/components/ScheduleTimeline";
import GuestGuide from "@/components/GuestGuide";
import WishesWall from "@/components/WishesWall";
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
<main className="min-h-screen relative overflow-x-hidden">
      {/* 1. Closed Hero Card Video */}
      <HeroVideoCard
        key={replayKey}
        onVideoEnd={handleVideoEnd}
        onRequestMusicPrompt={() => setAskForMusic(true)}
      />

      {/* Main Page Content */}
      <div className="relative z-10 space-y-12 md:space-y-20 pb-12">
        {/* 2. Dari Wedding Poetry & Names */}
        <PoetrySection />

        {/* 3. Interactive Fog Wipe Countdown Timer */}
        <FogCountdown />

        {/* 4. Real Interactive Dari Calendar Section */}
        <CalendarCard />

        {/* 5. Schedule & Program Timeline */}
        <ScheduleTimeline />

        {/* 6. Guest Information Guide & Etiquette */}
        <GuestGuide />

        {/* 7. Interactive Wishes Wall */}
        <WishesWall />

        {/* 8. Venue Information, Photos & Google Maps */}
        <VenueSection />

        {/* 9. Photo Gallery Showcase */}
        <GallerySection />

        {/* 10. Interactive RSVP Form */}
        <RsvpForm />

        {/* 11. Replay & Back to Top Footer */}
        <FooterReplay onReplay={handleReplay} />
      </div>

      {/* Floating Audio Controller with Aryana Sayeed BG Music */}
      <AudioPlayer autoPrompt={askForMusic} />
    </main>
  );
}

"use client";

import { useState, useRef } from "react";
import HeroVideoIntro from "@/components/HeroVideoIntro";
import SaveTheDateHero from "@/components/SaveTheDateHero";
import FoggedCountdown from "@/components/FoggedCountdown";
import EventFacts from "@/components/EventFacts";
import RsvpForm from "@/components/RsvpForm";
import ScheduleTimeline from "@/components/ScheduleTimeline";
import GuestGuide from "@/components/GuestGuide";
import VenueSection from "@/components/VenueSection";
import WishesWall from "@/components/WishesWall";
import FooterReplay from "@/components/FooterReplay";
import MobileActionBar from "@/components/MobileActionBar";
import AudioPlayer, { AudioPlayerHandle } from "@/components/AudioPlayer";

export default function Home() {
  const [isVideoDismissed, setIsVideoDismissed] = useState(false);
  const audioPlayerRef = useRef<AudioPlayerHandle | null>(null);

  const handleUserGesture = () => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.playAudio();
    }
  };

  const handleVideoDismiss = () => {
    setIsVideoDismissed(true);
  };

  return (
    <main className="min-h-screen relative pb-20 md:pb-0">
      {/* 1. Full-screen Video Intro Overlay (State A) */}
      {!isVideoDismissed && (
        <HeroVideoIntro
          onUserGesture={handleUserGesture}
          onDismiss={handleVideoDismiss}
        />
      )}

      {/* 2. Main Invitation Content (State B revealed when video ends) */}
      <SaveTheDateHero />
      <FoggedCountdown />
      <EventFacts />
      <RsvpForm />
      <ScheduleTimeline />
      <GuestGuide />
      <VenueSection />
      <WishesWall />
      <FooterReplay />
      <MobileActionBar />

      {/* Background Audio Player */}
      <AudioPlayer ref={audioPlayerRef} />
    </main>
  );
}

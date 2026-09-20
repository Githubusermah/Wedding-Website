"use client";

import { useState, useEffect, useRef } from "react";
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
  const audioPlayerRef = useRef<AudioPlayerHandle>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }
  }, []);

  const handleVideoDismiss = () => {
    audioPlayerRef.current?.playAudio();
    setIsVideoDismissed(true);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  };

  const handleVideoStart = () => {
    audioPlayerRef.current?.prepareAudio();
  };

  return (
    <main className="min-h-screen relative pb-20 md:pb-0">
      {/* 1. Full-screen Video Intro Overlay (State A) */}
      {!isVideoDismissed && (
        <HeroVideoIntro
          onDismiss={handleVideoDismiss}
          onStart={handleVideoStart}
        />
      )}

      {/* 2. Main Invitation Content (State B revealed when video ends) */}
      <SaveTheDateHero isStarted={isVideoDismissed} />
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

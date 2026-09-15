"use client";

import { useState, useRef, useEffect } from "react";
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }
  }, []);

  const handleVideoDismiss = () => {
    setIsVideoDismissed(true);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  };

  return (
    <main className="min-h-screen relative pb-20 md:pb-0">
      {/* 1. Full-screen Video Intro View (State A) */}
      {!isVideoDismissed ? (
        <HeroVideoIntro
          onUserGesture={handleUserGesture}
          onDismiss={handleVideoDismiss}
        />
      ) : (
        /* 2. Main Invitation Content View (State B revealed after video ends) */
        <>
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
        </>
      )}

      {/* Background Audio Player persists across states */}
      <AudioPlayer ref={audioPlayerRef} />
    </main>
  );
}

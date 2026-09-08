"use client";

import { useState } from "react";
import HeroVideoIntro from "@/components/HeroVideoIntro";
import InvitationHero from "@/components/InvitationHero";
import EventFacts from "@/components/EventFacts";
import RsvpForm from "@/components/RsvpForm";
import ScheduleTimeline from "@/components/ScheduleTimeline";
import GuestGuide from "@/components/GuestGuide";
import VenueSection from "@/components/VenueSection";
import WishesWall from "@/components/WishesWall";
import FooterReplay from "@/components/FooterReplay";
import MobileActionBar from "@/components/MobileActionBar";
import AudioPlayer from "@/components/AudioPlayer";

export default function Home() {
  const [askForMusic, setAskForMusic] = useState(false);

  const handleVideoDismiss = () => {
    setAskForMusic(true);
  };

  return (
    <main className="min-h-screen relative pb-16 md:pb-0">
      {/* 1. Full-screen Video Intro Overlay (disappears when ended or skipped) */}
      <HeroVideoIntro onDismiss={handleVideoDismiss} />

      {/* 2. Primary Invitation Hero Section */}
      <InvitationHero />

      {/* 3. Quick Event Facts Card */}
      <EventFacts />

      {/* 4. Primary RSVP Form */}
      <RsvpForm />

      {/* 5. Itinerary / Program */}
      <ScheduleTimeline />

      {/* 6. Guest Guidance */}
      <GuestGuide />

      {/* 7. Venue Section */}
      <VenueSection />

      {/* 8. Guestbook */}
      <WishesWall />

      {/* 9. Minimal Dari Footer */}
      <FooterReplay />

      {/* 10. Sticky Mobile Action Bar */}
      <MobileActionBar />

      {/* Background Audio Player */}
      <AudioPlayer autoPrompt={askForMusic} />
    </main>
  );
}

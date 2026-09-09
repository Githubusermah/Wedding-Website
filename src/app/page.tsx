"use client";

import { useState } from "react";
import HeroVideoIntro from "@/components/HeroVideoIntro";
import SaveTheDateHero from "@/components/SaveTheDateHero";
import FoggedCountdown from "@/components/FoggedCountdown";
import AnniversaryCalendar from "@/components/AnniversaryCalendar";
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
  const [isVideoDismissed, setIsVideoDismissed] = useState(false);

  const handleVideoDismiss = () => {
    setIsVideoDismissed(true);
    setAskForMusic(true);
  };

  return (
    <main className="min-h-screen relative pb-16 md:pb-0">
      {/* 1. Full-screen Video Intro Overlay */}
      <HeroVideoIntro onDismiss={handleVideoDismiss} />

      {/* 2. Standalone React Client Component Save-The-Date Hero (Triggers when video is dismissed so animations run from start) */}
      {isVideoDismissed && <SaveTheDateHero />}

      {/* 3. Interactive Scratch-off Fogged Countdown Component */}
      <FoggedCountdown />

      {/* 4. Ceremonial Anniversary Calendar Component */}
      <AnniversaryCalendar />

      {/* 5. Quick Event Facts Card */}
      <EventFacts />

      {/* 6. Primary RSVP Form */}
      <RsvpForm />

      {/* 7. Itinerary / Program */}
      <ScheduleTimeline />

      {/* 8. Guest Guidance */}
      <GuestGuide />

      {/* 9. Venue Section */}
      <VenueSection />

      {/* 10. Guestbook */}
      <WishesWall />

      {/* 11. Minimal Dari Footer */}
      <FooterReplay />

      {/* 12. Sticky Mobile Action Bar */}
      <MobileActionBar />

      {/* Background Audio Player */}
      <AudioPlayer autoPrompt={askForMusic} />
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";
import { weddingConfig } from "../../config/wedding";
import { CheckCircle, MapPin } from "@phosphor-icons/react";

export default function MobileActionBar() {
  const [hideBar, setHideBar] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Hide bar in top hero zone and when RSVP section is visible
      if (window.scrollY < window.innerHeight * 0.7) {
        setHideBar(true);
        return;
      }

      const rsvpEl = document.getElementById("rsvp");
      if (rsvpEl) {
        const rect = rsvpEl.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          setHideBar(true);
          return;
        }
      }

      setHideBar(false);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (hideBar) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-white/70 backdrop-blur-md border-t border-[rgba(160,112,50,0.45)] pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-lg">
      <div className="flex items-center gap-3 max-w-sm mx-auto">
        <a
          href="#rsvp"
          className="flex-1 py-2.5 px-4 rounded-full bg-[var(--wine)] text-[#fff6e0] text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm hover:bg-[#521028] transition-colors"
        >
          <CheckCircle size={16} />
          <span>تأیید حضور</span>
        </a>

        <a
          href={weddingConfig.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="py-2.5 px-4 rounded-full bg-white/60 text-[var(--ink)] text-xs font-semibold border border-[var(--line)] flex items-center justify-center gap-1.5 hover:bg-white/80 transition-colors"
        >
          <MapPin size={16} className="text-[var(--gold-dark)]" />
          <span>مسیر مپ</span>
        </a>
      </div>
    </div>
  );
}

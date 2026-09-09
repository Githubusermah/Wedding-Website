"use client";

import { useEffect, useState } from "react";
import { event } from "@/lib/event";
import { CheckCircle, MapPin } from "@phosphor-icons/react";

export default function MobileActionBar() {
  const [hideBar, setHideBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const rsvpEl = document.getElementById("rsvp");
      if (!rsvpEl) return;
      const rect = rsvpEl.getBoundingClientRect();
      if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        setHideBar(true);
      } else {
        setHideBar(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (hideBar) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-[var(--paper-white)]/95 backdrop-blur-md border-t border-[var(--line)] shadow-lg pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
      <div className="flex items-center gap-2 max-w-md mx-auto">
        <a
          href="#rsvp"
          className="flex-1 py-3 px-4 rounded-xl bg-[var(--ruby)] text-[var(--paper-white)] text-sm font-semibold flex items-center justify-center gap-1.5 shadow-sm"
        >
          <CheckCircle size={18} weight="bold" />
          <span>تأیید حضور</span>
        </a>

        <a
          href={event.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="py-3 px-4 rounded-xl bg-[var(--paper-white)] text-[var(--ink)] text-sm font-semibold border border-[var(--line)] flex items-center justify-center gap-1.5"
        >
          <MapPin size={18} className="text-[var(--gold)]" />
          <span>مسیر</span>
        </a>
      </div>
    </div>
  );
}

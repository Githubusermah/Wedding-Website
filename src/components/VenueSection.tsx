"use client";

import { motion } from "motion/react";
import { event } from "@/lib/event";
import { MapPin, NavigationArrow, Buildings } from "@phosphor-icons/react";

export default function VenueSection() {
  return (
    <section className="py-12 px-4 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="paper-card p-6 md:p-10 relative overflow-hidden"
      >
        <div className="text-center mb-8">
          <span className="text-xs text-[var(--gold)] font-semibold tracking-wider uppercase">
            محل برگزاری
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--ruby)] mt-1">
            مکان محفل
          </h2>
          <p className="text-sm text-[var(--ink-muted)] mt-2">
            {event.venueName}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-right">
          {/* Address & Info */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-lg bg-[var(--ruby)]/10 text-[var(--ruby)] shrink-0">
                <Buildings size={22} />
              </div>
              <div>
                <h3 className="font-bold text-base text-[var(--ink)]">نام تالار</h3>
                <p className="text-sm text-[var(--ink-muted)] mt-0.5">{event.venueName}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-lg bg-[var(--gold)]/15 text-[var(--gold)] shrink-0">
                <MapPin size={22} />
              </div>
              <div>
                <h3 className="font-bold text-base text-[var(--ink)]">آدرس کامل</h3>
                <p className="text-sm text-[var(--ink-muted)] mt-0.5 leading-relaxed">{event.venueAddressFa}</p>
              </div>
            </div>

            <div className="pt-4">
              <a
                href={event.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-[var(--ruby)] hover:bg-[var(--ruby-deep)] text-[var(--paper-white)] font-semibold text-sm shadow-sm transition-colors"
              >
                <NavigationArrow size={18} weight="bold" />
                <span>باز کردن مسیر در گوگل مپ</span>
              </a>
            </div>
          </div>

          {/* Abstract Map Graphic */}
          <div className="paper-card-inset p-6 flex flex-col items-center justify-center text-center space-y-3 min-h-[200px] border border-[var(--line)]">
            <div className="w-12 h-12 rounded-full bg-[var(--ruby)] text-[var(--paper-white)] flex items-center justify-center shadow-md">
              <MapPin size={28} weight="fill" />
            </div>
            <h4 className="font-bold text-base text-[var(--ink)]">
              {event.venueShortName}
            </h4>
            <p className="text-xs text-[var(--ink-muted)] max-w-xs">
              {event.cityFa} · چهارراهی زنبق
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

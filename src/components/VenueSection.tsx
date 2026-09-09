"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { event } from "@/lib/event";
import { MapPin, NavigationArrow, Buildings } from "@phosphor-icons/react";

export default function VenueSection() {
  const hotelPhotos = [
    {
      src: "/venue/hotel-exterior.jpg",
      title: "نمای هتل تاج کانتیننتال",
      desc: "ساختمان مجلل هتل تاج کانتیننتال",
    },
    {
      src: "/venue/hotel-lobby.jpg",
      title: "ورودی تشریفاتی هتل",
      desc: "ورودی باشکوه و فضای استقبال",
    },
    {
      src: "/venue/diamond-hall.jpg",
      title: "سالن اصلی برگزاری جشن",
      desc: "تالار مجلل برگزاری محفل پیوند",
    },
  ];

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

        {/* Hotel Image Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {hotelPhotos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-xl overflow-hidden border border-[var(--line)] shadow-sm bg-[var(--ivory-deep)] flex flex-col"
            >
              <div className="relative h-40 w-full overflow-hidden">
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-3 text-right">
                <h4 className="font-bold text-xs md:text-sm text-[var(--ink)]">
                  {photo.title}
                </h4>
                <p className="text-[11px] text-[var(--ink-muted)] mt-0.5">
                  {photo.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-right">
          {/* Address & Info */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-lg bg-[var(--ruby)]/10 text-[var(--ruby)] shrink-0">
                <Buildings size={22} />
              </div>
              <div>
                <h3 className="font-bold text-base text-[var(--ink)]">نام تالار و هتل</h3>
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

            <div className="pt-2">
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

          {/* Location Summary Card */}
          <div className="paper-card-inset p-6 flex flex-col items-center justify-center text-center space-y-3 min-h-[160px] border border-[var(--line)]">
            <div className="w-12 h-12 rounded-full bg-[var(--ruby)] text-[var(--paper-white)] flex items-center justify-center shadow-md">
              <MapPin size={28} weight="fill" />
            </div>
            <h4 className="font-bold text-base text-[var(--ink)]">
              {event.venueShortName}
            </h4>
            <p className="text-xs text-[var(--ink-muted)] max-w-xs">
              {event.cityFa} · {event.venueAddressFa}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { event } from "@/lib/event";
import { MapPin, NavigationArrow, Buildings, X, MagnifyingGlassPlus } from "@phosphor-icons/react";

export default function VenueSection() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const hotelPhotos = [
    {
      src: "/venue/taj-exterior-night.jpg",
      title: "نمای هتل تاج کانتیننتال",
      desc: "ساختمان مجلل هتل تاج کانتیننتال در شب",
      featured: true,
    },
    {
      src: "/venue/taj-exterior-day.jpg",
      title: "ورودی تشریفاتی هتل",
      desc: "ورودی باشکوه و فضای استقبال هتل",
      featured: false,
    },
    {
      src: "/venue/taj-main-hall.jpg",
      title: "سالن اصلی برگزاری جشن",
      desc: "تالار مجلل برگزاری محفل پیوند",
      featured: false,
    },
  ];

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImageIndex(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section id="venue" className="py-12 px-4 max-w-4xl mx-auto scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="paper-card p-6 md:p-10 relative overflow-hidden shadow-xl border-[var(--line)]"
      >
        <div className="text-center mb-8">
          <span className="text-xs text-[var(--gold)] font-semibold tracking-widest uppercase">
            محل برگزاری
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--ruby)] mt-1">
            مکان محفل
          </h2>
          <p className="text-sm text-[var(--ink-muted)] mt-2 font-semibold">
            {event.venueName}
          </p>
        </div>

        {/* Hotel Image Gallery (1 Featured Large + 2 Supporting) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {hotelPhotos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedImageIndex(index)}
              className={`group relative rounded-xl overflow-hidden border border-[var(--line)] shadow-sm bg-[var(--ivory-deep)] flex flex-col cursor-pointer transition-all duration-300 hover:shadow-md hover:border-[var(--gold)] ${
                photo.featured ? "md:col-span-2 md:row-span-2" : "md:col-span-1"
              }`}
            >
              <div
                className={`relative w-full overflow-hidden ${
                  photo.featured ? "h-64 md:h-80" : "h-40 md:h-36"
                }`}
              >
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-[var(--paper-white)]/90 text-[var(--ruby)] flex items-center justify-center shadow-lg">
                    <MagnifyingGlassPlus size={22} weight="bold" />
                  </div>
                </div>
              </div>

              <div className="p-3 text-right bg-[var(--paper-white)]">
                <h3 className="font-bold text-xs md:text-sm text-[var(--ink)]">
                  {photo.title}
                </h3>
                <p className="text-[11px] text-[var(--ink-muted)] mt-0.5">
                  {photo.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImageIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImageIndex(null)}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-3xl w-full bg-[var(--paper-white)] rounded-2xl overflow-hidden shadow-2xl border border-[var(--gold)]"
              >
                <button
                  onClick={() => setSelectedImageIndex(null)}
                  className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                >
                  <X size={20} weight="bold" />
                </button>

                <div className="relative h-72 sm:h-96 md:h-[450px] w-full">
                  <Image
                    src={hotelPhotos[selectedImageIndex].src}
                    alt={hotelPhotos[selectedImageIndex].title}
                    fill
                    className="object-contain bg-black/90"
                  />
                </div>

                <div className="p-4 text-right bg-[var(--paper-white)]">
                  <h3 className="font-bold text-base md:text-lg text-[var(--ruby)]">
                    {hotelPhotos[selectedImageIndex].title}
                  </h3>
                  <p className="text-xs md:text-sm text-[var(--ink-muted)] mt-1">
                    {hotelPhotos[selectedImageIndex].desc}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Address Details & Embedded Visible Google Map */}
        <div className="space-y-6 text-right">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Info Cards */}
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-[var(--ivory-deep)]/50 border border-[var(--line)]">
                <div className="p-2.5 rounded-lg bg-[var(--ruby)]/10 text-[var(--ruby)] shrink-0 mt-0.5">
                  <Buildings size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-sm md:text-base text-[var(--ink)]">نام تالار و هتل</h3>
                  <p className="text-xs md:text-sm text-[var(--ink-muted)] mt-1">{event.venueName}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-[var(--ivory-deep)]/50 border border-[var(--line)]">
                <div className="p-2.5 rounded-lg bg-[var(--gold)]/15 text-[var(--gold)] shrink-0 mt-0.5">
                  <MapPin size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-sm md:text-base text-[var(--ink)]">آدرس کامل</h3>
                  <p className="text-xs md:text-sm text-[var(--ink-muted)] mt-1 leading-relaxed">{event.venueAddressFa}</p>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={event.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-[var(--ruby)] hover:bg-[var(--ruby-deep)] text-[var(--paper-white)] font-semibold text-xs md:text-sm shadow-md transition-colors w-full justify-center sm:w-auto"
                >
                  <NavigationArrow size={18} weight="bold" />
                  <span>باز کردن مسیر در گوگل مپ</span>
                </a>
              </div>
            </div>

            {/* Embedded Responsive Map Frame */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-[var(--gold)]/50 shadow-md h-64 md:h-72 w-full bg-[var(--ivory-deep)]">
              <iframe
                title="Taj Continental Hotel Map Location"
                src="https://maps.google.com/maps?q=Taj+Continental+Hotel+Kabul+Afghanistan&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full filter contrast-[1.03] opacity-95 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

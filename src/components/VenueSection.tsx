"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { event } from "@/lib/event";
import { MapPin, NavigationArrow, Buildings, Image as ImageIcon, MagnifyingGlassPlus, X, Phone, CalendarCheck } from "@phosphor-icons/react";
import Image from "next/image";

interface VenuePhoto {
  id: string;
  src: string;
  alt: string;
  title: string;
  badge: string;
  description: string;
}

const VENUE_PHOTOS: VenuePhoto[] = [
  {
    id: "main-art",
    src: "/images/wedding-venue.png",
    alt: "City Star Wedding Hotel Artwork",
    title: "هتل عروسی ستی استار (City Star Wedding Hotel)",
    badge: "تصویر اصلی هتل",
    description: "نمای فاخر و اختصاصی تالار عروسی ستی استار در چهارراهی زنبق کابل"
  },
  {
    id: "card-art",
    src: "/images/save-the-date-card.png",
    alt: "کارت دعوت رسمی سحر و فرهاد",
    title: "طرح کارت دعوت رسمی سحر و فرهاد",
    badge: "کارت دعوت",
    description: "کارت یادبود رسمی محفل عروسی با طراحی آبرنگی و حاشیه‌های طلاکاری‌شده"
  }
];

export default function VenueSection() {
  const [selectedPhoto, setSelectedPhoto] = useState<VenuePhoto | null>(null);

  return (
    <section id="venue-section" className="py-12 px-4 max-w-5xl mx-auto space-y-8">
      {/* Venue Header & Map Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="paper-card p-6 md:p-10 relative overflow-hidden"
      >
        <div className="text-center mb-8">
          <span className="text-xs text-[var(--gold)] font-bold tracking-widest uppercase">
            CITY STAR WEDDING HOTEL · محل برگزاری
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--ruby)] mt-1">
            مکان محفل و نقشهٔ گوگل مپ
          </h2>
          <p className="text-sm text-[var(--ink-muted)] mt-2 max-w-xl mx-auto">
            {event.venueName} — پذیرای حضور گرم و صمیمی شما در شکوهمندترین شب زندگی‌مان
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-right">
          {/* Address & Venue Details Column */}
          <div className="lg:col-span-5 space-y-5">
            <div className="p-4 rounded-2xl bg-[var(--ivory-deep)]/60 border border-[var(--line)] space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-[var(--ruby)] text-[var(--paper-white)] shrink-0 shadow-sm">
                  <Buildings size={22} weight="bold" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[var(--ink)]">نام رسمی تالار</h3>
                  <p className="text-sm text-[var(--ruby-deep)] font-semibold mt-0.5">{event.venueName}</p>
                  <p className="text-xs text-[var(--gold)] font-serif tracking-wider">City Star Wedding Hotel</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-[var(--gold)]/20 text-[var(--gold)] shrink-0 shadow-sm">
                  <MapPin size={22} weight="bold" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[var(--ink)]">آدرس دقیق</h3>
                  <p className="text-sm text-[var(--ink-muted)] mt-0.5 leading-relaxed">{event.venueAddressFa}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-800/10 text-emerald-800 shrink-0 shadow-sm">
                  <CalendarCheck size={22} weight="bold" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[var(--ink)]">زمان پذیرایی</h3>
                  <p className="text-sm text-[var(--ink-muted)] mt-0.5">{event.invitationDateFa} · از ساعت {event.startTimeFa}</p>
                </div>
              </div>
            </div>

            <div>
              <a
                href={event.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[var(--ruby)] hover:bg-[var(--ruby-deep)] text-[var(--paper-white)] font-semibold text-sm shadow-md transition-all transform hover:-translate-y-0.5"
              >
                <NavigationArrow size={20} weight="bold" />
                <span>مسیریابی مستقیم در نرم‌افزار Google Maps</span>
              </a>
            </div>
          </div>

          {/* Embedded Google Map */}
          <div className="lg:col-span-7 h-full min-h-[320px] md:min-h-[380px] rounded-2xl overflow-hidden border border-[var(--gold)]/40 shadow-md relative bg-[var(--ivory-deep)]">
            <iframe
              title="City Star Wedding Hotel Map Location"
              src={event.mapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "340px" }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full rounded-2xl"
            />
            {/* Direct Link Tag overlay on map */}
            <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[var(--gold)]/30 text-xs font-semibold text-[var(--ruby-deep)] shadow-sm flex items-center gap-1.5">
              <MapPin size={14} className="text-[var(--gold)]" />
              <span>هتل کابل استار — تالار ستی استار</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* High-Quality Venue Photo Gallery */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="paper-card p-6 md:p-8"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-[var(--line)]">
          <div>
            <div className="flex items-center gap-2 text-[var(--gold)]">
              <ImageIcon size={20} weight="bold" />
              <span className="text-xs font-bold tracking-wider uppercase">CITY STAR VENUE GALLERY</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-[var(--ruby)] mt-1">
              تصاویر تالار و هتل عروسی ستی استار
            </h3>
          </div>
          <p className="text-xs text-[var(--ink-muted)]">
            برای بزرگ‌نمایی روی تصاویر کلیک کنید
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {VENUE_PHOTOS.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="group relative rounded-2xl overflow-hidden bg-[var(--paper-white)] border border-[var(--gold)]/30 shadow-md cursor-pointer transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="relative h-64 md:h-72 w-full overflow-hidden bg-stone-100 flex items-center justify-center p-3">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain group-hover:scale-105 transition-transform duration-500 p-2"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[var(--gold)] text-stone-900 flex items-center justify-center shadow-lg">
                    <MagnifyingGlassPlus size={24} weight="bold" />
                  </div>
                </div>

                {/* Badge */}
                <div className="absolute top-3 right-3 bg-[var(--ruby)] text-[var(--paper-white)] text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                  {photo.badge}
                </div>
              </div>

              {/* Card Footer Caption */}
              <div className="p-4 bg-[var(--paper-white)] border-t border-[var(--line)]">
                <h4 className="font-bold text-sm text-[var(--ink)] group-hover:text-[var(--ruby)] transition-colors">
                  {photo.title}
                </h4>
                <p className="text-xs text-[var(--ink-muted)] mt-1">
                  {photo.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-md p-4 flex items-center justify-center cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full bg-[var(--paper-white)] rounded-3xl overflow-hidden shadow-2xl border border-[var(--gold)]/40 p-4 md:p-6"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 left-4 z-20 w-10 h-10 rounded-full bg-stone-900/80 text-white flex items-center justify-center hover:bg-stone-900 transition-colors shadow-lg"
              >
                <X size={20} weight="bold" />
              </button>

              <div className="relative w-full h-[60vh] min-h-[300px] rounded-2xl overflow-hidden bg-stone-100 flex items-center justify-center p-2">
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.alt}
                  fill
                  sizes="100vw"
                  className="object-contain p-2"
                />
              </div>

              <div className="mt-4 text-center space-y-1">
                <h3 className="font-bold text-lg text-[var(--ruby)]">
                  {selectedPhoto.title}
                </h3>
                <p className="text-xs text-[var(--ink-muted)]">
                  {selectedPhoto.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

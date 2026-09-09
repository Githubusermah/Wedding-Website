"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { event } from "@/lib/event";
import { MapPin, NavigationArrow, Buildings, X, CaretLeft, CaretRight, MagnifyingGlassPlus } from "@phosphor-icons/react";

export default function VenueSection() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % event.photos.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + event.photos.length) % event.photos.length);
    }
  };

  return (
    <section id="venue" className="py-12 px-4 max-w-4xl mx-auto scroll-mt-20">
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
            تالار و هتل تاج کانتیننتال
          </h2>
          <p className="text-sm text-[var(--ink-muted)] mt-2">
            میزبان لحظه‌های ماندگار در باشکوه‌ترین تالار کابل
          </p>
        </div>

        {/* Taj Continental Photo Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {event.photos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => openLightbox(index)}
              className="group relative rounded-xl overflow-hidden border border-[var(--line)] shadow-sm bg-[var(--ivory-deep)] flex flex-col cursor-pointer transition-all hover:shadow-md hover:border-[var(--gold)]"
            >
              <div className="relative h-44 w-full overflow-hidden">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="p-2 rounded-full bg-white/80 text-[var(--ruby)]">
                    <MagnifyingGlassPlus size={20} weight="bold" />
                  </div>
                </div>
              </div>
              <div className="p-2.5 text-right">
                <p className="text-xs font-semibold text-[var(--ink)] line-clamp-1">
                  {photo.alt}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Venue Address & Embedded Map Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch text-right">
          {/* Info Side */}
          <div className="space-y-4 flex flex-col justify-between">
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
                  <h3 className="font-bold text-base text-[var(--ink)]">آدرس دقیق</h3>
                  <p className="text-sm text-[var(--ink-muted)] mt-0.5 leading-relaxed">{event.venueAddressFa}</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={event.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-[var(--ruby)] hover:bg-[var(--ruby-deep)] text-[var(--paper-white)] font-semibold text-sm shadow-md transition-colors"
              >
                <NavigationArrow size={18} weight="bold" />
                <span>مسیریابی در گوگل مپ (Google Maps)</span>
              </a>
            </div>
          </div>

          {/* Interactive/Visual Map Embedded Card */}
          <div className="relative min-h-[220px] rounded-2xl overflow-hidden border border-[var(--gold)]/40 shadow-sm bg-[#e5e3df] flex flex-col items-center justify-center p-2 text-center group">
            {/* Embedded Google Maps iFrame with Taj Continental Location */}
            <iframe
              title="Google Map Taj Continental Hotel"
              src="https://maps.google.com/maps?q=Taj+Continental+Hotel+Kabul+Afghanistan&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full min-h-[220px] rounded-xl border-0 grayscale group-hover:grayscale-0 transition-all duration-500"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImageIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
              className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 dir-rtl"
            >
              <div className="relative max-w-3xl w-full max-h-[85vh] flex flex-col items-center">
                {/* Close Button */}
                <button
                  onClick={closeLightbox}
                  className="absolute -top-10 right-0 text-white hover:text-[var(--gold-light)] p-2 transition-colors"
                  aria-label="بستن"
                >
                  <X size={28} weight="bold" />
                </button>

                {/* Main Lightbox Image */}
                <div className="relative w-full h-[60vh] max-h-[500px] rounded-2xl overflow-hidden">
                  <Image
                    src={event.photos[selectedImageIndex].src}
                    alt={event.photos[selectedImageIndex].alt}
                    fill
                    sizes="100vw"
                    className="object-contain"
                  />
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-black/80 transition-all"
                  aria-label="قبلی"
                >
                  <CaretLeft size={24} weight="bold" />
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-black/80 transition-all"
                  aria-label="بعدی"
                >
                  <CaretRight size={24} weight="bold" />
                </button>

                {/* Caption */}
                <p className="mt-3 text-sm text-[#faf5e8] font-medium text-center">
                  {event.photos[selectedImageIndex].alt}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

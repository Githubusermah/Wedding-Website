"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { event } from "@/lib/event";
import { NavigationArrow, MapPin, Sparkle } from "@phosphor-icons/react";

export default function VenueSection() {
  const venueImages = [
    {
      src: "/venue/weddingvenue1.png",
      alt: "نمای تالار تاج کانتیننتال ۱",
      caption: "تالار مجلل و ورودی اصلی",
      delay: 0.1,
    },
    {
      src: "/venue/weddingvenue2.png",
      alt: "نمای تالار تاج کانتیننتال ۲",
      caption: "جلوه تاج کانتیننتال کابل",
      delay: 0.2,
      isPrimary: true,
    },
    {
      src: "/venue/weddingvenue3.png",
      alt: "نمای تالار تاج کانتیننتال ۳",
      caption: "فضای تشریفات و پذیرایی",
      delay: 0.3,
    },
  ];

  return (
    <section id="venue" className="relative py-20 px-4 max-w-5xl mx-auto scroll-mt-20 text-center overflow-hidden">
      {/* Fine Paper & Gold Ambient Backlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-gradient-to-tr from-[var(--gold-pale)] via-[#FDF8EB] to-transparent rounded-full blur-3xl opacity-60 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 space-y-12"
      >
        {/* Section Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--gold-pale)]/50 border border-[var(--gold-muted)]/30 text-[var(--gold-dark)] text-xs font-semibold tracking-widest uppercase">
            <Sparkle size={14} className="text-[var(--gold)] animate-pulse" />
            <span>محل برگزاری</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--ink)] font-serif tracking-tight mt-2">
            تاج کانتیننتال
          </h2>

          <p className="text-sm sm:text-base text-[var(--gold-dark)] font-mono tracking-widest uppercase font-semibold">
            {event.venueNameEn}
          </p>

          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent mx-auto mt-4" />
        </div>

        {/* Venue Image Cards - Enhanced for mobile visibility & scroll unblur animation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 items-center justify-center my-6 px-2">
          {venueImages.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.85, filter: "blur(12px)", y: 30 }}
              whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: img.delay, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.04 }}
              className={`relative flex flex-col items-center group ${
                img.isPrimary ? "md:-translate-y-4" : ""
              }`}
            >
              <div
                className={`relative w-full ${
                  img.isPrimary
                    ? "h-[280px] sm:h-[320px] md:h-[300px]"
                    : "h-[240px] sm:h-[280px] md:h-[250px]"
                } p-4 rounded-2xl bg-gradient-to-b from-[#FFFDF7] to-[#F9F4E8] border border-[var(--gold-muted)]/40 shadow-[0_10px_30px_rgba(197,160,89,0.12)] group-hover:border-[var(--gold)] transition-all duration-500`}
              >
                {/* Subtle Corner Accents */}
                <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[var(--gold-dark)]/40 rounded-tr-sm" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[var(--gold-dark)]/40 rounded-bl-sm" />

                <div className="relative w-full h-full">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-contain filter drop-shadow-[0_8px_20px_rgba(197,160,89,0.25)] transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </div>

              <span className="mt-3 text-xs font-semibold text-[var(--ink-muted)] group-hover:text-[var(--gold-dark)] transition-colors font-serif">
                {img.caption}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Address Details & Interactive Navigation Button */}
        <div className="space-y-4 max-w-lg mx-auto pt-4">
          <div className="flex items-center justify-center gap-2 text-sm sm:text-base text-[var(--ink)] font-medium">
            <MapPin size={20} className="text-[var(--gold-dark)] shrink-0" />
            <span>{event.venueAddressFa}</span>
          </div>

          <div>
            <a
              href={event.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-[var(--gold)] via-[var(--gold-dark)] to-[var(--gold)] text-white text-sm font-bold shadow-md hover:shadow-lg hover:brightness-110 active:scale-95 transition-all duration-300"
            >
              <NavigationArrow size={18} className="animate-bounce" />
              <span>مسیریابی هوشمند در گوگل مپ</span>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

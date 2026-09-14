"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { event } from "@/lib/event";
import { NavigationArrow, MapPin } from "@phosphor-icons/react";

export default function VenueSection() {
  return (
    <section id="venue" className="py-16 px-4 max-w-4xl mx-auto scroll-mt-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="space-y-10"
      >
        {/* Section Header */}
        <div>
          <span className="text-xs text-[var(--gold-dark)] font-semibold tracking-widest uppercase block">
            محل برگزاری
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--ink)] mt-1 font-serif">
            قصر ستاره شهر
          </h2>
          <p className="text-xs text-[var(--ink-muted)] dir-ltr font-mono mt-1">
            {event.venueNameEn}
          </p>
          <div className="w-12 h-px bg-[var(--gold-muted)] mx-auto mt-3" />
        </div>

        {/* 3 Transparent PNG Venue Illustrations arranged directly on paper */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 items-center justify-center my-8">
          {/* Illustration 1 */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative flex justify-center items-center"
          >
            <div className="relative w-full max-w-[280px] h-[200px] sm:h-[240px]">
              <Image
                src="/venue/weddingvenue1.png"
                alt="تصویر شماره ۱ تالار قصر ستاره شهر"
                fill
                className="object-contain filter drop-shadow-[0_4px_12px_rgba(197,160,89,0.15)]"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </motion.div>

          {/* Illustration 2 (Centerpiece) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex justify-center items-center md:-translate-y-4"
          >
            <div className="relative w-full max-w-[320px] h-[220px] sm:h-[260px]">
              <Image
                src="/venue/weddingvenue2.png"
                alt="تصویر شماره ۲ تالار قصر ستاره شهر"
                fill
                className="object-contain filter drop-shadow-[0_4px_16px_rgba(197,160,89,0.2)]"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </motion.div>

          {/* Illustration 3 */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative flex justify-center items-center"
          >
            <div className="relative w-full max-w-[240px] h-[200px] sm:h-[240px]">
              <Image
                src="/venue/weddingvenue3.png"
                alt="تصویر شماره ۳ تالار قصر ستاره شهر"
                fill
                className="object-contain filter drop-shadow-[0_4px_12px_rgba(197,160,89,0.15)]"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </motion.div>
        </div>

        {/* Quiet Address Details & Google Maps Link */}
        <div className="space-y-3 max-w-md mx-auto pt-2">
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-[var(--ink-muted)]">
            <MapPin size={18} className="text-[var(--gold-dark)] shrink-0" />
            <span>{event.venueAddressFa}</span>
          </div>

          <div className="pt-2">
            <a
              href={event.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold text-xs sm:text-sm text-[var(--gold-dark)] hover:underline transition-colors"
            >
              <NavigationArrow size={16} />
              <span>مسیریابی در گوگل مپ</span>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

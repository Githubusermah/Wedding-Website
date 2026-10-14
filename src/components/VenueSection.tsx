"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { weddingConfig } from "../../config/wedding";
import { NavigationArrow, MapPin, Globe, Phone } from "@phosphor-icons/react";
import { SectionHeading } from "./ui/SectionHeading";

export default function VenueSection() {
  return (
    <section id="venue" className="relative py-20 px-4 max-w-5xl mx-auto scroll-mt-20 text-center overflow-hidden">
      {/* Corner Flowers - Top Right */}
      <div className="absolute top-0 right-0 w-32 sm:w-48 opacity-25 pointer-events-none z-0 transform translate-x-4 -translate-y-2">
        <Image
          src="/hero/corner-flowers.webp"
          alt=""
          aria-hidden="true"
          width={200}
          height={355}
          className="w-full h-auto object-contain"
        />
      </div>
      {/* Corner Flowers - Top Left Mirrored */}
      <div className="absolute top-0 left-0 w-32 sm:w-48 opacity-25 pointer-events-none z-0 transform -translate-x-4 -translate-y-2 -scale-x-100">
        <Image
          src="/hero/corner-flowers.webp"
          alt=""
          aria-hidden="true"
          width={200}
          height={355}
          className="w-full h-auto object-contain"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 space-y-8"
      >
        <SectionHeading
          eyebrow="محل برگزاری"
          title={weddingConfig.venueNameFa}
          subtitle={weddingConfig.venueNameEn}
        />

        {/* Singular Venue Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)", y: 20 }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-3xl mx-auto rounded-2xl overflow-hidden glass-panel my-6 group p-4"
        >
          {/* Soft Radial Rose/Gold Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-radial from-[var(--gold-light)]/30 via-[var(--ivory)]/10 to-transparent rounded-full blur-2xl opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none" />

          <div className="relative w-full h-[260px] sm:h-[380px] md:h-[440px] flex items-center justify-center p-4">
            <Image
              src="/tajcontinental-removebg-preview.png"
              alt="Taj Continental Wedding Hall"
              fill
              className="object-contain transition-transform duration-700 group-hover:scale-102"
              sizes="(max-width: 768px) 100vw, 800px"
              priority
            />
          </div>
        </motion.div>

        {/* Address Details & Navigation Button */}
        <div className="space-y-4 max-w-lg mx-auto pt-2">
          <div className="flex flex-col items-center justify-center gap-2 text-sm sm:text-base text-[var(--ink)] font-medium">
            <div className="flex items-center gap-2">
              <MapPin size={20} className="text-[var(--gold-dark)] shrink-0" />
              <span>{weddingConfig.venueAddressFa}</span>
            </div>
            <div className="text-xs text-[var(--ink-muted)] dir-ltr font-sans">
              {weddingConfig.venueAddressEn}
            </div>
            <div className="flex items-center justify-center gap-4 pt-1 text-xs sm:text-sm text-[var(--gold-dark)] font-semibold">
              <a href={weddingConfig.phoneHref} className="inline-flex items-center gap-1 hover:underline" dir="ltr">
                <Phone size={16} />
                <span>{weddingConfig.phoneDisplay}</span>
              </a>
              <span>•</span>
              <a href={weddingConfig.venueWebsite} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:underline" dir="ltr">
                <Globe size={16} />
                <span>tajcontinental.com</span>
              </a>
            </div>
          </div>

          <div>
            <a
              href={weddingConfig.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[var(--wine)] via-[var(--gold-dark)] to-[var(--wine)] text-[#fff6e0] text-sm font-bold shadow-md hover:shadow-lg hover:brightness-110 active:scale-95 transition-all duration-300"
            >
              <NavigationArrow size={18} className="animate-bounce" />
              <span>مسیریابی هوشمند در گوگل مپ</span>
            </a>
          </div>
        </div>

        {/* Google Maps Embed */}
        <div className="mt-8 rounded-2xl overflow-hidden border border-[var(--line)] shadow-md max-w-3xl mx-auto h-[320px] sm:h-[400px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3292.015243162703!2d69.14389027632757!3d34.54049879237691!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38d16f31f90b8ef1%3A0x6fb8658ed150d903!2sTaj%20Continental%20Hotel!5e0!3m2!1sen!2s!4v1740939515982!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Taj Continental Wedding Hall Map"
          />
        </div>
      </motion.div>
    </section>
  );
}

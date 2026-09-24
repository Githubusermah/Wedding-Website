"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { event } from "@/lib/event";
import { NavigationArrow, MapPin, Sparkle, Globe, Phone } from "@phosphor-icons/react";

export default function VenueSection() {
  return (
    <section id="venue" className="relative py-20 px-4 max-w-5xl mx-auto scroll-mt-20 text-center overflow-hidden">
      {/* Subtle Botanical Leaves - Top Right & Top Left */}
      <div className="absolute top-0 right-0 w-32 sm:w-48 md:w-64 opacity-25 pointer-events-none z-0 transform translate-x-6 -translate-y-4 rotate-12">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/leaves.webp" alt="" aria-hidden="true" className="w-full h-auto object-contain" />
      </div>
      <div className="absolute top-0 left-0 w-32 sm:w-48 md:w-64 opacity-25 pointer-events-none z-0 transform -translate-x-6 -translate-y-4 -scale-x-100 -rotate-12">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/leaves.webp" alt="" aria-hidden="true" className="w-full h-auto object-contain" />
      </div>
      {/* Fine Paper & Pistachio Green Ambient Backlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-gradient-to-tr from-[var(--gold-pale)] via-[#F4F8F5] to-transparent rounded-full blur-3xl opacity-60 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 space-y-10"
      >
        {/* Section Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--gold-pale)]/50 border border-[var(--gold-muted)]/30 text-[var(--gold-dark)] text-xs font-semibold tracking-widest uppercase">
            <Sparkle size={14} className="text-[var(--gold)] animate-pulse" />
            <span>محل برگزاری</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--ink)] font-serif tracking-tight mt-2">
            {event.venueName}
          </h2>

          <p className="text-sm sm:text-base text-[var(--gold-dark)] font-mono tracking-widest uppercase font-semibold">
            {event.venueNameEn}
          </p>

          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent mx-auto mt-4" />
        </div>

        {/* Singular Venue Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)", y: 20 }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg border border-[var(--line-subtle)] my-6 group"
        >
          {/* Soft Radial Backglow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-radial from-[var(--gold-light)]/20 via-[var(--gold)]/5 to-transparent rounded-full blur-2xl opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none" />

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

        {/* Address Details & Interactive Navigation Button */}
        <div className="space-y-4 max-w-lg mx-auto pt-2">
          <div className="flex flex-col items-center justify-center gap-2 text-sm sm:text-base text-[var(--ink)] font-medium">
            <div className="flex items-center gap-2">
              <MapPin size={20} className="text-[var(--gold-dark)] shrink-0" />
              <span>{event.venueAddressFa}</span>
            </div>
            <div className="text-xs text-[var(--ink-muted)] dir-ltr font-sans">
              {event.venueAddressEn}
            </div>
            <div className="flex items-center justify-center gap-4 pt-1 text-xs sm:text-sm text-[var(--gold-dark)] font-semibold">
              <a href={event.contactPhoneHref} className="inline-flex items-center gap-1 hover:underline" dir="ltr">
                <Phone size={16} />
                <span>{event.contactPhoneDisplay}</span>
              </a>
              <span>•</span>
              <a href={`https://${event.venueWebsite}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:underline" dir="ltr">
                <Globe size={16} />
                <span>{event.venueWebsite}</span>
              </a>
            </div>
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

        {/* Google Maps Embed */}
        <div className="mt-8 rounded-2xl overflow-hidden border border-[var(--line-subtle)] shadow-md max-w-3xl mx-auto h-[320px] sm:h-[400px]">
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

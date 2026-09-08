"use client";

import { motion } from "motion/react";
import { MapPin, NavigationArrow, Buildings, Compass } from "@phosphor-icons/react";

export default function VenueSection() {
  const mapSearchUrl = "https://www.google.com/maps/search/?api=1&query=Qasr-e+Sham-e+Paris+Kabul+Afghanistan";

  return (
    <section className="py-20 px-4 max-w-5xl mx-auto" id="venue-section">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <span className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold tracking-widest text-[#d4af37] uppercase bg-[#d4af37]/10 px-4 py-1.5 rounded-full border border-[#d4af37]/30">
          <Buildings size={16} weight="bold" />
          مکان برگزاری محفل
        </span>
        <h2 className="text-3xl md:text-5xl font-heading text-gold-gradient mt-4">
          قصر شام پاریس - کابل
        </h2>
        <p className="text-[#a0b0a8] text-sm md:text-base mt-2 max-w-xl mx-auto">
          میزبان مقدم گرم شما در مجلل‌ترین تالار کابل هستیم
        </p>
      </motion.div>

      {/* Venue Showcase Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
        {/* Venue Information Panel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="md:col-span-5 glass-card rounded-3xl p-8 border border-[#d4af37]/30 flex flex-col justify-between space-y-6"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] mb-6">
              <MapPin size={28} weight="fill" />
            </div>

            <h3 className="text-2xl font-heading text-[#f5f2eb]">
              تالار الماس، قصر شام پاریس
            </h3>
            <p className="text-sm text-[#a0b0a8] mt-3 leading-relaxed">
              افغانستان، کابل، سرک عمومی شهر نو، روبروی پارک، قصر شام پاریس
            </p>

            <div className="mt-6 pt-6 border-t border-[#d4af37]/20 space-y-3 text-xs md:text-sm text-[#c8d6cf]">
              <div className="flex items-center justify-between">
                <span className="text-[#a0b0a8]">ورودی تالار:</span>
                <span className="font-semibold text-[#f5f2eb]">دروازه شماره ۱ (ویژه مهمانان)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#a0b0a8]">پارکنیگ اختصاصی:</span>
                <span className="font-semibold text-emerald-400">موجود و رایگان</span>
              </div>
            </div>
          </div>

          <a
            href={mapSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gold-gradient text-[#090e0b] font-semibold text-sm shadow-lg shadow-[#d4af37]/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer mt-4"
          >
            <NavigationArrow size={20} weight="bold" />
            مسیریابی هوشمند روی گوگل مپ
          </a>
        </motion.div>

        {/* Embedded Interactive Map */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="md:col-span-7 glass-card rounded-3xl border border-[#d4af37]/30 overflow-hidden min-h-[340px] relative shadow-2xl"
        >
          <iframe
            title="Google Maps Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105212.18341620353!2d69.1100000!3d34.5300000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38d1694c3c1e0001%3A0x1000000000000000!2sKabul%2C%20Afghanistan!5e0!3m2!1sen!2s!4v1680000000000!5m2!1sen!2s"
            className="w-full h-full min-h-[350px] border-0 filter saturate-[0.8] contrast-[1.1] opacity-85 hover:opacity-100 transition-opacity"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </section>
  );
}

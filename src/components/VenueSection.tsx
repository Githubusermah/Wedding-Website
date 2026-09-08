"use client";

import { motion } from "motion/react";
import { MapPin, NavigationArrow, Buildings, CheckCircle, Car, Sparkle } from "@phosphor-icons/react";

export default function VenueSection() {
  const mapSearchUrl = "https://www.google.com/maps/search/?api=1&query=Kabul+Star+Hotel+Kabul+Afghanistan";

  const venuePhotos = [
    {
      url: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80",
      title: "تالار الماس - دکوراسیون ویژه",
    },
    {
      url: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=800&q=80",
      title: "نمای ورودی هتل کابل استار",
    },
    {
      url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
      title: "گل‌آرایی و جایگاه عروس و داماد",
    },
  ];

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto" id="venue-section">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <span className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold tracking-widest text-[#8b1e2d] uppercase bg-[#fdf0f2] px-4 py-1.5 rounded-full border border-[#8b1e2d]/20 shadow-xs">
          <Buildings size={16} weight="bold" />
          مکان برگزاری محفل
        </span>
        <h2 className="text-3xl md:text-5xl font-heading text-deep-red-gradient mt-3">
          هتل ۵ ستاره کابل استار - تالار الماس
        </h2>
        <p className="text-[#4a5850] text-sm md:text-base mt-2 max-w-xl mx-auto">
          میزبان مقدم گرم شما در مجلل‌ترین و باشکوه‌ترین تالار تشریفاتی شهر کابل هستیم
        </p>
      </motion.div>

      {/* Venue Showcase Pictures */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {venuePhotos.map((photo, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.15, duration: 0.6 }}
            className="group relative h-64 rounded-3xl overflow-hidden border border-[#c5a059]/30 shadow-md hover:shadow-xl transition-all duration-500"
          >
            <img
              src={photo.url}
              alt={photo.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-70 transition-opacity" />
            <div className="absolute bottom-4 right-4 left-4 text-right">
              <span className="text-xs text-white font-medium bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/30 inline-flex items-center gap-1.5">
                <Sparkle size={14} weight="fill" className="text-[#c5a059]" />
                {photo.title}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Venue Information Panel & Map */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
        {/* Venue Information Panel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="md:col-span-5 glass-card-ruby rounded-3xl p-8 border border-[#8b1e2d]/30 flex flex-col justify-between space-y-6 shadow-lg"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#8b1e2d] text-white flex items-center justify-center mb-6 shadow-md">
              <MapPin size={28} weight="fill" />
            </div>

            <h3 className="text-2xl font-heading text-[#8b1e2d]">
              کابل استار هتل - تالار الماس
            </h3>
            <p className="text-sm text-[#38453d] mt-3 leading-relaxed font-medium">
              افغانستان، کابل، شهرنو، سرک دوم، هتل ۵ ستاره کابل استار - طبقه دوم، تالار الماس
            </p>

            <div className="mt-6 pt-6 border-t border-[#8b1e2d]/20 space-y-3 text-xs md:text-sm text-[#2c3831]">
              <div className="flex items-center justify-between">
                <span className="text-stone-500 font-medium">ورودی تالار:</span>
                <span className="font-bold text-[#8b1e2d]">دروازه اصلی تشریفات</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-500 font-medium">پارکنیگ اختصاصی:</span>
                <span className="font-bold text-[#5b7e53] flex items-center gap-1">
                  <Car size={16} weight="bold" /> سرپوشیده و رایگان
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-500 font-medium">پرسونل و تشریفات:</span>
                <span className="font-bold text-[#2c3831] flex items-center gap-1">
                  <CheckCircle size={16} weight="fill" className="text-[#5b7e53]" /> پذیرایی استاندارد ۵ ستاره
                </span>
              </div>
            </div>
          </div>

          <a
            href={mapSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-deep-red-gradient text-white font-semibold text-sm shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer mt-4"
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
          className="md:col-span-7 glass-card rounded-3xl border border-[#c5a059]/30 overflow-hidden min-h-[340px] relative shadow-lg"
        >
          <iframe
            title="Google Maps Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105212.18341620353!2d69.1100000!3d34.5300000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38d1694c3c1e0001%3A0x1000000000000000!2sKabul%2C%20Afghanistan!5e0!3m2!1sen!2s!4v1680000000000!5m2!1sen!2s"
            className="w-full h-full min-h-[350px] border-0 filter saturate-[0.9] contrast-[1.05] hover:saturate-100 transition-all"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </section>
  );
}

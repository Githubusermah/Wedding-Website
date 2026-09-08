"use client";

import { motion } from "motion/react";
import { Calendar, MapPin, Clock, BookmarkSimple, Export } from "@phosphor-icons/react";

export default function CalendarCard() {
  const downloadICS = () => {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Khadija and Samir Wedding//FA",
      "CALSCALE:GREGORIAN",
      "METHOD:REQUEST",
      "BEGIN:VEVENT",
      "SUMMARY:جشن عروسی خدیجه و سمیر | Khadija & Samir Wedding",
      "DESCRIPTION:با افتخار شما را به جشن پیوند آسمانی خدیجه و سمیر دعوت می‌نماییم.",
      "LOCATION:قصر شام پاریس، کابل، افغانستان",
      "DTSTART:20251013T133000Z",
      "DTEND:20251013T173000Z",
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", "wedding-khadija-samir.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="py-16 px-4 max-w-4xl mx-auto" id="calendar-section">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass-card rounded-3xl p-8 md:p-12 border border-[#d4af37]/35 shadow-2xl relative overflow-hidden"
      >
        {/* Background Decorative Floral Accents */}
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-[#10b981]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Main Date Display Tile */}
          <div className="md:col-span-5 flex flex-col items-center justify-center bg-gradient-to-br from-[#12221a] to-[#0a1410] p-8 rounded-2xl border border-[#d4af37]/40 text-center shadow-lg">
            <span className="text-xs md:text-sm font-semibold text-[#d4af37] tracking-widest uppercase mb-1">
              روز ماندگار
            </span>
            <span className="text-2xl md:text-3xl font-heading text-[#f5f2eb] mt-1">
              پنجشنبه
            </span>
            <span className="text-6xl md:text-7xl font-bold font-heading text-gold-gradient my-2">
              ۱۳
            </span>
            <span className="text-xl md:text-2xl font-heading text-[#d4af37]">
              میزان ۱۴۰۳
            </span>
            <span className="text-xs text-[#a0b0a8] mt-2 font-mono">
              (13 October 2025)
            </span>
          </div>

          {/* Details & Action Controls */}
          <div className="md:col-span-7 flex flex-col justify-center space-y-6 text-right">
            <div>
              <span className="inline-flex items-center gap-2 text-xs text-[#10b981] font-semibold bg-[#10b981]/10 px-3 py-1 rounded-full border border-[#10b981]/30 mb-3">
                <Calendar size={14} weight="bold" />
                تقویم رسمی مراسم
              </span>
              <h3 className="text-2xl md:text-3xl font-heading text-[#f5f2eb]">
                زمان‌بندی و برنامه محفل
              </h3>
            </div>

            <div className="space-y-4 text-sm md:text-base text-[#c8d6cf]">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] mt-0.5">
                  <Clock size={20} weight="duotone" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#f5f2eb]">ساعت برگزاری</h4>
                  <p className="text-[#a0b0a8] text-xs md:text-sm mt-0.5">
                    شروع محفل از ساعت ۶:۰۰ شام الی ۱۰:۳۰ شب
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] mt-0.5">
                  <MapPin size={20} weight="duotone" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#f5f2eb]">مکان محفل</h4>
                  <p className="text-[#a0b0a8] text-xs md:text-sm mt-0.5">
                    کابل، افغانستان - قصر شام پاریس (تالار الماس)
                  </p>
                </div>
              </div>
            </div>

            {/* Add to Calendar Button */}
            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={downloadICS}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gold-gradient text-[#090e0b] font-semibold text-sm shadow-lg shadow-[#d4af37]/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <BookmarkSimple size={18} weight="bold" />
                ذخیره در تقویم موبایل (.ics)
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

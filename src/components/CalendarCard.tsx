"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Calendar as CalendarIcon,
  MapPin,
  Clock,
  BookmarkSimple,
  CaretRight,
  CaretLeft,
  Sparkle,
  Star,
  Export,
  Heart,
} from "@phosphor-icons/react";

export default function CalendarCard() {
  // Current month view state: October 2025 / میزان ۱۴۰۴
  const [selectedDay, setSelectedDay] = useState<number>(13);
  const [currentMonthIndex, setCurrentMonthIndex] = useState<number>(1); // 1 = October / میزان

  const months = [
    { name: "سنبله / سپتامبر", daysInMonth: 30, startDayOfWeek: 1 }, // Sep
    { name: "میزان ۱۴۰۴ / اکتبر ۲۰۲۵", daysInMonth: 31, startDayOfWeek: 3 }, // Oct (Wedding Month)
    { name: "عقرب / نوامبر", daysInMonth: 30, startDayOfWeek: 6 }, // Nov
  ];

  const daysOfWeek = ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه"];

  const currentMonth = months[currentMonthIndex];

  const handlePrevMonth = () => {
    setCurrentMonthIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNextMonth = () => {
    setCurrentMonthIndex((prev) => (prev < months.length - 1 ? prev + 1 : prev));
  };

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

  const googleCalendarUrl =
    "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" +
    encodeURIComponent("جشن عروسی خدیجه و سمیر") +
    "&dates=20251013T133000Z/20251013T173000Z&details=" +
    encodeURIComponent("با افتخار شما را به جشن پیوند آسمانی خدیجه و سمیر دعوت می‌نماییم.") +
    "&location=" +
    encodeURIComponent("قصر شام پاریس، کابل، افغانستان");

  // Convert numbers to Dari digits
  const toDariDigits = (num: number) => {
    const dariDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return String(num).replace(/\d/g, (d) => dariDigits[parseInt(d)]);
  };

  return (
    <section className="py-16 px-4 max-w-5xl mx-auto" id="calendar-section">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass-card rounded-3xl p-6 md:p-10 border border-[#c5a059]/40 shadow-2xl relative overflow-hidden bg-white/95"
      >
        {/* Decorative corner flourishes */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#8b1e2d]/10 to-transparent rounded-bl-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#5b7e53]/10 to-transparent rounded-tr-full pointer-events-none" />

        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold tracking-widest text-[#5b7e53] uppercase bg-[#eef4ed] px-4 py-1.5 rounded-full border border-[#5b7e53]/20 shadow-sm">
            <CalendarIcon size={16} weight="bold" />
            تقویم رسمی و تعاملی محفل
          </span>
          <h2 className="text-3xl md:text-5xl font-heading text-deep-red-gradient mt-3">
            تاریخ ماندگار پیوند
          </h2>
          <p className="text-[#4a5850] text-sm md:text-base mt-1">
            روزهای ماه را لمس کنید؛ روز دوشنبه ۱۳ میزان روز بزرگ ماست 🌸
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Real Month Calendar Grid */}
          <div className="lg:col-span-7 bg-[#faf8f3] rounded-2xl p-5 md:p-6 border border-[#c5a059]/30 shadow-inner">
            {/* Month Header Navigation */}
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#c5a059]/20">
              <button
                onClick={handlePrevMonth}
                disabled={currentMonthIndex === 0}
                className="p-2 rounded-xl bg-white border border-[#5b7e53]/20 text-[#5b7e53] hover:bg-[#eef4ed] disabled:opacity-40 cursor-pointer"
              >
                <CaretRight size={20} weight="bold" />
              </button>

              <div className="text-center">
                <h3 className="text-xl md:text-2xl font-heading text-[#8b1e2d]">
                  {currentMonth.name}
                </h3>
                <span className="text-xs text-[#5b7e53] font-medium">
                  {currentMonthIndex === 1 ? "ماه برگزاری محفل عروسی" : "ماه عادی"}
                </span>
              </div>

              <button
                onClick={handleNextMonth}
                disabled={currentMonthIndex === months.length - 1}
                className="p-2 rounded-xl bg-white border border-[#5b7e53]/20 text-[#5b7e53] hover:bg-[#eef4ed] disabled:opacity-40 cursor-pointer"
              >
                <CaretLeft size={20} weight="bold" />
              </button>
            </div>

            {/* Weekday Headers */}
            <div className="grid grid-cols-7 gap-1 md:gap-2 text-center text-xs font-bold text-[#8b1e2d] mb-3">
              {daysOfWeek.map((day, idx) => (
                <div key={idx} className="py-1">
                  {day}
                </div>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1 md:gap-2 text-center">
              {/* Empty placeholder cells for month start alignment */}
              {Array.from({ length: currentMonth.startDayOfWeek }).map((_, idx) => (
                <div key={`empty-${idx}`} className="h-10 md:h-12 rounded-xl" />
              ))}

              {/* Month Day Buttons */}
              {Array.from({ length: currentMonth.daysInMonth }).map((_, idx) => {
                const dayNum = idx + 1;
                const isWeddingDay = currentMonthIndex === 1 && dayNum === 13;
                const isSelected = selectedDay === dayNum && currentMonthIndex === 1;

                return (
                  <button
                    key={dayNum}
                    onClick={() => {
                      if (currentMonthIndex === 1) setSelectedDay(dayNum);
                    }}
                    className={`relative h-10 md:h-12 rounded-xl font-bold text-sm md:text-base flex flex-col items-center justify-center transition-all cursor-pointer ${
                      isWeddingDay
                        ? "bg-deep-red-gradient text-white shadow-lg shadow-[#8b1e2d]/30 scale-105 border-2 border-[#c5a059] ring-2 ring-[#8b1e2d]/20"
                        : isSelected
                        ? "bg-[#5b7e53] text-white shadow-md"
                        : "bg-white text-[#2c3831] border border-[#c5a059]/20 hover:border-[#8b1e2d]/40 hover:bg-[#fdf0f2]"
                    }`}
                  >
                    <span>{toDariDigits(dayNum)}</span>
                    {isWeddingDay && (
                      <span className="absolute -top-1.5 -right-1 bg-[#c5a059] text-white p-0.5 rounded-full shadow-xs">
                        <Heart size={10} weight="fill" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend Footer */}
            <div className="mt-5 pt-3 border-t border-[#c5a059]/20 flex items-center justify-center gap-6 text-xs text-[#4a5850]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#8b1e2d] border border-[#c5a059]" />
                <span className="font-semibold text-[#8b1e2d]">روز محفل (۱۳ میزان)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-white border border-[#c5a059]" />
                <span>روزهای معمولی</span>
              </div>
            </div>
          </div>

          {/* Selected Event Details Panel */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full bg-gradient-to-br from-[#fdf0f2] via-white to-[#eef4ed] p-6 rounded-2xl border border-[#c5a059]/30 shadow-md">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#8b1e2d] uppercase bg-white px-3 py-1 rounded-full border border-[#8b1e2d]/20 w-fit mb-4">
                <Sparkle size={14} weight="fill" />
                {selectedDay === 13 && currentMonthIndex === 1
                  ? "روز اختصاصی جشن عروسی"
                  : `جزئیات تاریخ ${toDariDigits(selectedDay)} ${currentMonth.name.split("/")[0]}`}
              </div>

              {selectedDay === 13 && currentMonthIndex === 1 ? (
                <div className="space-y-4">
                  <div className="text-right">
                    <span className="text-3xl font-heading text-[#8b1e2d]">
                      دوشنبه، ۱۳ میزان ۱۴۰۴
                    </span>
                    <p className="text-xs text-[#5b7e53] font-semibold mt-1">
                      (13 October 2025)
                    </p>
                  </div>

                  <div className="bg-white/90 p-4 rounded-xl border border-[#c5a059]/30 space-y-3 text-xs md:text-sm text-[#2c3831]">
                    <div className="flex items-start gap-2.5">
                      <div className="p-1.5 rounded-lg bg-[#fdf0f2] text-[#8b1e2d] mt-0.5">
                        <Clock size={18} weight="bold" />
                      </div>
                      <div>
                        <span className="font-bold text-[#8b1e2d]">زمان برگزاری:</span>
                        <p className="text-[#4a5850]">از ساعت ۶:۰۰ شام الی ۱۰:۳۰ شب</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <div className="p-1.5 rounded-lg bg-[#eef4ed] text-[#5b7e53] mt-0.5">
                        <MapPin size={18} weight="bold" />
                      </div>
                      <div>
                        <span className="font-bold text-[#5b7e53]">مکان محفل:</span>
                        <p className="text-[#4a5850]">کابل، قصر شام پاریس (تالار الماس)</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-6 text-center text-[#4a5850]">
                  <p className="text-sm">
                    روز {toDariDigits(selectedDay)} {currentMonth.name.split("/")[0]} انتخاب شده است.
                  </p>
                  <p className="text-xs text-[#8b1e2d] mt-2 font-semibold">
                    برای مشاهده جزئیات عروسی، روز ۱۳ میزان را کلیک کنید!
                  </p>
                </div>
              )}
            </div>

            {/* Quick Export Actions */}
            <div className="mt-6 pt-4 border-t border-[#c5a059]/20 space-y-2.5">
              <button
                onClick={downloadICS}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-deep-red-gradient text-white font-bold text-xs md:text-sm shadow-md shadow-[#8b1e2d]/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <BookmarkSimple size={18} weight="bold" />
                ذخیره در تقویم موبایل (.ics)
              </button>

              <a
                href={googleCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-[#5b7e53]/30 text-[#5b7e53] font-bold text-xs hover:bg-[#eef4ed] transition-colors cursor-pointer"
              >
                <Export size={16} weight="bold" />
                افزودن مستقیم به Google Calendar
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

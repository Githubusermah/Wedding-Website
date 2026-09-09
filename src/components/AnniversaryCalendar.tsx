"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { event } from "@/lib/event";
import { toEasternArabicNumerals } from "@/lib/formatters";
import { Calendar as CalendarIcon, Heart, Star } from "@phosphor-icons/react";

export default function AnniversaryCalendar() {
  const [selectedDay, setSelectedDay] = useState<number>(13);
  const weddingDay = 13;

  // October 2025 calendar days grid (Oct 1 2025 = Wednesday)
  // Days of week: شنبه (Sat), یکشنبه (Sun), دوشنبه (Mon), سه‌شنبه (Tue), چهارشنبه (Wed), پنج‌شنبه (Thu), جمعه (Fri)
  const daysOfWeekFa = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

  // Grid padding for October 2025 (Starts on Wednesday = index 4)
  const emptyPrefixSlots = 4;
  const daysInMonth = 31;

  return (
    <section className="py-10 px-4 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="paper-card p-6 md:p-8 relative overflow-hidden"
      >
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--gold)]/15 text-[var(--gold-dark,#8a6329)] text-xs font-bold mb-2">
            <CalendarIcon size={16} weight="fill" />
            <span>تقویم اختصاصی جشن پیوند</span>
          </div>

          <h3 className="text-2xl md:text-3xl font-bold text-[var(--ruby)]">
            میزان ۱۴۰۴ / اکتبر ۲۰۲۵
          </h3>
          <p className="text-xs md:text-sm text-[var(--ink-muted)] mt-1">
            روز ماندگار پیوند {event.coupleDisplayName}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Calendar Grid View (7 cols) */}
          <div className="md:col-span-7 paper-card-inset p-4 md:p-5">
            <div className="grid grid-cols-7 gap-1 md:gap-2 text-center mb-2">
              {daysOfWeekFa.map((day, idx) => (
                <div
                  key={idx}
                  className="text-xs font-bold text-[var(--gold-dark,#8a6329)] py-1"
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1 md:gap-2 text-center dir-rtl">
              {/* Empty leading slots */}
              {Array.from({ length: emptyPrefixSlots }).map((_, idx) => (
                <div key={`empty-${idx}`} className="h-9 md:h-10 opacity-0" />
              ))}

              {/* Month Days */}
              {Array.from({ length: daysInMonth }).map((_, idx) => {
                const dayNum = idx + 1;
                const isWeddingDay = dayNum === weddingDay;
                const isSelected = dayNum === selectedDay;

                return (
                  <button
                    key={dayNum}
                    onClick={() => setSelectedDay(dayNum)}
                    className={`relative h-9 md:h-10 rounded-xl font-semibold text-xs md:text-sm flex flex-col items-center justify-center transition-all ${
                      isWeddingDay
                        ? "bg-[var(--ruby)] text-[var(--paper-white)] shadow-md ring-2 ring-[var(--gold)] font-bold scale-105"
                        : isSelected
                        ? "bg-[var(--gold)]/30 text-[var(--ink)] font-bold border border-[var(--gold)]"
                        : "hover:bg-[var(--ivory)] text-[var(--ink)]"
                    }`}
                  >
                    <span>{toEasternArabicNumerals(dayNum)}</span>
                    {isWeddingDay && (
                      <Heart
                        size={10}
                        weight="fill"
                        className="text-[var(--gold-light)] animate-bounce -mt-0.5"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Day Info Badge (5 cols) */}
          <div className="md:col-span-5 flex flex-col justify-center space-y-4 text-right">
            <div className="p-5 rounded-2xl bg-[var(--paper-white)] border border-[var(--line)] shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[var(--gold-dark,#8a6329)] font-bold uppercase tracking-wider">
                  تاریخ انتخاب‌شده
                </span>
                {selectedDay === weddingDay && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-[var(--ruby)]/10 text-[var(--ruby)]">
                    <Star size={12} weight="fill" />
                    <span>روز اصلی محفل</span>
                  </span>
                )}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedDay}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2"
                >
                  <div className="text-3xl font-black text-[var(--ruby)]">
                    {toEasternArabicNumerals(selectedDay)} میزان
                  </div>

                  <p className="text-sm font-semibold text-[var(--ink)]">
                    {selectedDay === weddingDay
                      ? "دوشنبه، ۱۳ میزان ۱۴۰۴ (13 October 2025)"
                      : `${selectedDay} میزان ۱۴۰۴`}
                  </p>

                  <p className="text-xs text-[var(--ink-muted)] leading-relaxed">
                    {selectedDay === weddingDay
                      ? `ساعت آغاز محفل: ${event.startTimeFa} در ${event.venueName}. منتظر قدم‌های پرمهرتان هستیم.`
                      : "روزهای پیش‌رو تا جشن پیوند فرهاد و سحر"}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Quick highlight box */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-[var(--ruby)] to-[var(--ruby-deep)] text-[var(--paper-white)] text-center space-y-1 shadow-md">
              <div className="text-xs font-medium text-[var(--gold-light)]">
                یادبود پیوند
              </div>
              <div className="text-sm font-bold">
                {event.coupleDisplayName}
              </div>
              <div className="text-[11px] text-[var(--paper-white)]/80">
                {event.hashtag}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

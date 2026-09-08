"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import {
  CheckCircle,
  XCircle,
  User,
  Users,
  Phone,
  ChatText,
  PaperPlaneRight,
  Sparkle,
} from "@phosphor-icons/react";

interface RSVPData {
  fullName: string;
  phone: string;
  guestCount: string;
  attending: "yes" | "no";
  wishes: string;
}

export default function RsvpForm() {
  const [formData, setFormData] = useState<RSVPData>({
    fullName: "",
    phone: "",
    guestCount: "1",
    attending: "yes",
    wishes: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      // Save to localStorage
      try {
        const existing = JSON.parse(localStorage.getItem("wedding_rsvps") || "[]");
        existing.push({ ...formData, timestamp: new Date().toISOString() });
        localStorage.setItem("wedding_rsvps", JSON.stringify(existing));
      } catch (err) {
        console.warn("LocalStorage save error:", err);
      }

      setIsSubmitting(false);
      setSubmitted(true);

      // Trigger Celebration Confetti
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#d4af37", "#10b981", "#ffffff", "#f3e5ab"],
      });
    }, 600);
  };

  return (
    <section className="py-20 px-4 max-w-3xl mx-auto" id="rsvp-section">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass-card rounded-3xl p-8 md:p-12 border border-[#d4af37]/35 shadow-2xl relative"
      >
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold tracking-widest text-[#d4af37] uppercase bg-[#d4af37]/10 px-4 py-1.5 rounded-full border border-[#d4af37]/30">
            <Sparkle size={16} weight="fill" className="text-[#d4af37]" />
            اعلام حضور در محفل
          </span>
          <h2 className="text-3xl md:text-5xl font-heading text-gold-gradient mt-4">
            تأیید حضور و پیام تبریک
          </h2>
          <p className="text-[#a0b0a8] text-sm md:text-base mt-2">
            لطفاً جهت برنامه‌ریزی بهتر، حضور گرم‌تان را تا تاریخ ۵ میزان اطلاع دهید
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              onSubmit={handleSubmit}
              className="space-y-6 text-right"
            >
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-[#e8f0eb] mb-2">
                  نام و نام خانوادگی <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="مثلاً: محمد همت"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-[#080e0a]/90 border border-[#d4af37]/30 rounded-xl px-4 py-3.5 pr-11 text-sm text-[#f5f2eb] placeholder-[#687870] focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all"
                  />
                  <User size={20} className="absolute top-1/2 -translate-y-1/2 right-3.5 text-[#d4af37]" />
                </div>
              </div>

              {/* Phone / Contact */}
              <div>
                <label className="block text-sm font-medium text-[#e8f0eb] mb-2">
                  شماره تماس / واتساپ <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    placeholder="۰۷۹۹ ۱۲۳ ۴۵۶"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#080e0a]/90 border border-[#d4af37]/30 rounded-xl px-4 py-3.5 pr-11 text-sm text-[#f5f2eb] placeholder-[#687870] focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all dir-ltr text-right"
                  />
                  <Phone size={20} className="absolute top-1/2 -translate-y-1/2 right-3.5 text-[#d4af37]" />
                </div>
              </div>

              {/* Attendance Toggle */}
              <div>
                <label className="block text-sm font-medium text-[#e8f0eb] mb-2">
                  وضعیت حضور شما
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, attending: "yes" })}
                    className={`py-3 px-4 rounded-xl border flex items-center justify-center gap-2 text-sm font-semibold transition-all cursor-pointer ${
                      formData.attending === "yes"
                        ? "bg-[#10b981]/20 border-[#10b981] text-emerald-300 shadow-md shadow-[#10b981]/10"
                        : "bg-[#080e0a]/60 border-[#d4af37]/20 text-[#a0b0a8] hover:border-[#d4af37]/40"
                    }`}
                  >
                    <CheckCircle size={18} weight="bold" />
                    با کمال میل شرکت می‌کنم
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, attending: "no" })}
                    className={`py-3 px-4 rounded-xl border flex items-center justify-center gap-2 text-sm font-semibold transition-all cursor-pointer ${
                      formData.attending === "no"
                        ? "bg-rose-950/40 border-rose-500/80 text-rose-300 shadow-md shadow-rose-950/20"
                        : "bg-[#080e0a]/60 border-[#d4af37]/20 text-[#a0b0a8] hover:border-[#d4af37]/40"
                    }`}
                  >
                    <XCircle size={18} weight="bold" />
                    متأسفانه امکان حضور ندارم
                  </button>
                </div>
              </div>

              {/* Guest Count */}
              {formData.attending === "yes" && (
                <div>
                  <label className="block text-sm font-medium text-[#e8f0eb] mb-2">
                    تعداد همراهان (شامل خودتان)
                  </label>
                  <div className="relative">
                    <select
                      value={formData.guestCount}
                      onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                      className="w-full bg-[#080e0a]/90 border border-[#d4af37]/30 rounded-xl px-4 py-3.5 pr-11 text-sm text-[#f5f2eb] focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all cursor-pointer"
                    >
                      <option value="1">۱ نفر (تنها)</option>
                      <option value="2">۲ نفر (همراه با همسر)</option>
                      <option value="3">۳ نفر (خانوادگی)</option>
                      <option value="4">۴ نفر یا بیشتر</option>
                    </select>
                    <Users size={20} className="absolute top-1/2 -translate-y-1/2 right-3.5 text-[#d4af37]" />
                  </div>
                </div>
              )}

              {/* Special Wishes */}
              <div>
                <label className="block text-sm font-medium text-[#e8f0eb] mb-2">
                  پیام تبریک برای خدیجه و سمیر (اختیاری)
                </label>
                <div className="relative">
                  <textarea
                    rows={3}
                    placeholder="آرزوی شادمانی و خوشبختی برای شما..."
                    value={formData.wishes}
                    onChange={(e) => setFormData({ ...formData, wishes: e.target.value })}
                    className="w-full bg-[#080e0a]/90 border border-[#d4af37]/30 rounded-xl px-4 py-3 pr-11 text-sm text-[#f5f2eb] placeholder-[#687870] focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all"
                  />
                  <ChatText size={20} className="absolute top-4 right-3.5 text-[#d4af37]" />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-gold-gradient text-[#090e0b] font-bold text-base shadow-xl shadow-[#d4af37]/25 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2 mt-4"
              >
                {isSubmitting ? (
                  <span>در حال ثبت...</span>
                ) : (
                  <>
                    <PaperPlaneRight size={20} weight="bold" />
                    ارسال نهایی فرم حضور
                  </>
                )}
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10 space-y-6"
            >
              <div className="w-20 h-20 rounded-full bg-[#10b981]/20 border border-[#10b981]/50 text-[#10b981] flex items-center justify-center mx-auto shadow-xl shadow-[#10b981]/20">
                <CheckCircle size={48} weight="fill" />
              </div>

              <h3 className="text-3xl font-heading text-gold-gradient">
                پاسخ شما با موفقیت ثبت گردید!
              </h3>

              <p className="text-[#a0b0a8] text-base max-w-md mx-auto leading-relaxed">
                از اعلام حضور شما صمیمانه سپاسگزاریم. منتظر دیدار گرم شما در جشن پیوند خدیجه و سمیر هستیم.
              </p>

              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    fullName: "",
                    phone: "",
                    guestCount: "1",
                    attending: "yes",
                    wishes: "",
                  });
                }}
                className="px-6 py-2.5 rounded-xl border border-[#d4af37]/40 text-[#d4af37] text-sm hover:bg-[#d4af37]/10 transition-colors cursor-pointer"
              >
                ویرایش یا ارسال مجدد فرم
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

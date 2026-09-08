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
        colors: ["#8b1e2d", "#5b7e53", "#c5a059", "#faf5eb"],
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
        className="glass-card rounded-3xl p-8 md:p-12 border border-[#c5a059]/40 shadow-xl relative overflow-hidden"
      >
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold tracking-widest text-[#8b1e2d] uppercase bg-[#fdf0f2] px-4 py-1.5 rounded-full border border-[#8b1e2d]/20 shadow-xs">
            <Sparkle size={16} weight="fill" className="text-[#8b1e2d]" />
            اعلام حضور در محفل
          </span>
          <h2 className="text-3xl md:text-5xl font-heading text-deep-red-gradient mt-3">
            تأیید حضور و کارت دعوتیه
          </h2>
          <p className="text-[#4a5850] text-sm md:text-base mt-2">
            لطفاً جهت برنامه‌ریزی بهتر و تکریم حضور شما، فرم زیر را تکمیل فرمایید
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
                <label className="block text-sm font-semibold text-[#2c3831] mb-2">
                  نام و نام خانوادگی <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="مثلاً: محمد همت"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-white/90 border border-stone-300 rounded-xl px-4 py-3.5 pr-11 text-sm text-[#2c3831] placeholder-stone-400 focus:outline-none focus:border-[#8b1e2d] focus:ring-2 focus:ring-[#8b1e2d]/20 transition-all shadow-xs"
                  />
                  <User size={20} className="absolute top-1/2 -translate-y-1/2 right-3.5 text-[#8b1e2d]" />
                </div>
              </div>

              {/* Phone / Contact */}
              <div>
                <label className="block text-sm font-semibold text-[#2c3831] mb-2">
                  شماره تماس / واتساپ <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    placeholder="۰۷۹۹ ۱۲۳ ۴۵۶"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white/90 border border-stone-300 rounded-xl px-4 py-3.5 pr-11 text-sm text-[#2c3831] placeholder-stone-400 focus:outline-none focus:border-[#8b1e2d] focus:ring-2 focus:ring-[#8b1e2d]/20 transition-all shadow-xs"
                  />
                  <Phone size={20} className="absolute top-1/2 -translate-y-1/2 right-3.5 text-[#8b1e2d]" />
                </div>
              </div>

              {/* Attendance Toggle */}
              <div>
                <label className="block text-sm font-semibold text-[#2c3831] mb-2">
                  وضعیت حضور شما
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, attending: "yes" })}
                    className={`py-3.5 px-4 rounded-xl border flex items-center justify-center gap-2 text-sm font-bold transition-all cursor-pointer ${
                      formData.attending === "yes"
                        ? "bg-[#5b7e53] text-white border-[#5b7e53] shadow-md"
                        : "bg-white border-stone-300 text-stone-600 hover:border-[#5b7e53]"
                    }`}
                  >
                    <CheckCircle size={20} weight="bold" />
                    با کمال میل شرکت می‌کنم
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, attending: "no" })}
                    className={`py-3.5 px-4 rounded-xl border flex items-center justify-center gap-2 text-sm font-bold transition-all cursor-pointer ${
                      formData.attending === "no"
                        ? "bg-[#8b1e2d] text-white border-[#8b1e2d] shadow-md"
                        : "bg-white border-stone-300 text-stone-600 hover:border-[#8b1e2d]"
                    }`}
                  >
                    <XCircle size={20} weight="bold" />
                    متأسفانه امکان حضور ندارم
                  </button>
                </div>
              </div>

              {/* Guest Count */}
              {formData.attending === "yes" && (
                <div>
                  <label className="block text-sm font-semibold text-[#2c3831] mb-2">
                    تعداد همراهان (شامل خودتان)
                  </label>
                  <div className="relative">
                    <select
                      value={formData.guestCount}
                      onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                      className="w-full bg-white/90 border border-stone-300 rounded-xl px-4 py-3.5 pr-11 text-sm text-[#2c3831] focus:outline-none focus:border-[#8b1e2d] focus:ring-2 focus:ring-[#8b1e2d]/20 transition-all cursor-pointer shadow-xs"
                    >
                      <option value="1">۱ نفر (تنها)</option>
                      <option value="2">۲ نفر (همراه با همسر)</option>
                      <option value="3">۳ نفر (خانوادگی)</option>
                      <option value="4">۴ نفر یا بیشتر</option>
                    </select>
                    <Users size={20} className="absolute top-1/2 -translate-y-1/2 right-3.5 text-[#8b1e2d]" />
                  </div>
                </div>
              )}

              {/* Special Wishes */}
              <div>
                <label className="block text-sm font-semibold text-[#2c3831] mb-2">
                  پیام تبریک برای فرهاد و سحر (اختیاری)
                </label>
                <div className="relative">
                  <textarea
                    rows={3}
                    placeholder="آرزوی شادمانی و خوشبختی برای شما..."
                    value={formData.wishes}
                    onChange={(e) => setFormData({ ...formData, wishes: e.target.value })}
                    className="w-full bg-white/90 border border-stone-300 rounded-xl px-4 py-3 pr-11 text-sm text-[#2c3831] placeholder-stone-400 focus:outline-none focus:border-[#8b1e2d] focus:ring-2 focus:ring-[#8b1e2d]/20 transition-all shadow-xs resize-none"
                  />
                  <ChatText size={20} className="absolute top-4 right-3.5 text-[#8b1e2d]" />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-deep-red-gradient text-white font-bold text-base shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2 mt-4"
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
              <div className="w-20 h-20 rounded-full bg-[#5b7e53] text-white flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle size={48} weight="fill" />
              </div>

              <h3 className="text-3xl font-heading text-deep-red-gradient">
                پاسخ شما با موفقیت ثبت گردید!
              </h3>

              <p className="text-[#38453d] text-base max-w-md mx-auto leading-relaxed font-medium">
                از اعلام حضور شما صمیمانه سپاسگزاریم. منتظر دیدار گرم شما در جشن پیوند فرهاد و سحر هستیم.
              </p>

              <button
                type="button"
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
                className="px-6 py-2.5 rounded-xl border border-[#8b1e2d] text-[#8b1e2d] text-sm font-semibold hover:bg-[#8b1e2d] hover:text-white transition-all cursor-pointer"
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

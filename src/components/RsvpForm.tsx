"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import confetti from "canvas-confetti";
import {
  CheckCircle,
  XCircle,
  User,
  Phone,
  Users,
  ChatText,
  PencilSimple,
  Sparkle,
  Heart,
  X,
  EnvelopeOpen,
} from "@phosphor-icons/react";
import { event } from "@/lib/event";
import InitialsMonogram from "@/components/InitialsMonogram";

interface FormData {
  fullName: string;
  phone: string;
  attending: "yes" | "no" | "";
  companionCount: number;
  message: string;
}

export default function RsvpForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "",
    attending: "",
    companionCount: 1,
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showMessageField, setShowMessageField] = useState(false);

  // Lock background scroll when popup modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const fireGoldConfetti = () => {
    try {
      const count = 180;
      const defaults = {
        origin: { y: 0.6 },
        colors: ["#B8863F", "#D4AF37", "#7A1C28", "#ECE1CB", "#FFFDF8"],
      };

      const fire = (particleRatio: number, opts: confetti.Options) => {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio),
        });
      };

      fire(0.25, { spread: 26, startVelocity: 55 });
      fire(0.2, { spread: 60 });
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
      fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
      fire(0.1, { spread: 120, startVelocity: 45 });
    } catch {
      // Fallback gracefully
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = "لطفاً نام و نام خانوادگی خود را بنویسید.";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "لطفاً شماره تماس یا واتساپ خود را وارد کنید.";
    }
    if (!formData.attending) {
      newErrors.attending = "لطفاً وضعیت حضور خود را مشخص کنید.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      if (formData.attending === "yes") {
        fireGoldConfetti();
      }
    }, 700);
  };

  return (
    <section id="rsvp" className="py-12 px-4 max-w-2xl mx-auto scroll-mt-20 text-center">
      {/* RSVP Banner Card with Prominent Trigger Button */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="paper-card p-8 md:p-10 relative shadow-xl border-2 border-[var(--gold)]/50 bg-gradient-to-b from-[#fffdf8] via-[#faf5e8] to-[#f1e8d4]/60 overflow-hidden"
      >
        <div className="flex justify-center mb-4">
          <InitialsMonogram size={72} showGlow={true} />
        </div>

        <span className="text-xs text-[var(--gold-dark,#8a6329)] font-bold tracking-widest uppercase block">
          R.S.V.P
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--ruby)] mt-1 font-serif">
          تأیید حضور در محفل
        </h2>
        <p className="text-xs md:text-sm text-[var(--ink-muted)] mt-2 max-w-md mx-auto leading-relaxed">
          لطفاً جهت هماهنگی بهتر پذیرایی و جایگاه مهمانان گرامی، حضور خود را اطلاع دهید.
        </p>

        <div className="mt-6">
          <button
            onClick={() => setIsOpen(true)}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-[var(--ruby)] hover:bg-[var(--ruby-deep)] text-[var(--paper-white)] font-bold text-base md:text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer focus:outline-none focus:ring-4 focus:ring-[var(--gold)]/50"
          >
            <EnvelopeOpen size={22} weight="fill" />
            <span>تأیید حضور</span>
          </button>
        </div>
      </motion.div>

      {/* Modal Popup Envelope / Invitation Dialog */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-md"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-lg bg-gradient-to-b from-[#fffdfa] via-[#faf5e8] to-[#f4e9d5] rounded-3xl p-6 sm:p-8 border-2 border-[var(--gold)] shadow-2xl z-10 text-right my-auto overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 left-4 z-20 w-9 h-9 rounded-full bg-[var(--ruby)]/10 text-[var(--ruby)] hover:bg-[var(--ruby)] hover:text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
                aria-label="بستن"
              >
                <X size={20} weight="bold" />
              </button>

              {/* Top Monogram Seal */}
              <div className="flex justify-center mb-4">
                <InitialsMonogram size={64} showGlow={false} />
              </div>

              <div className="text-center mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-[var(--ruby)] font-serif">
                  تأیید حضور در محفل پیوند
                </h3>
                <p className="text-xs text-[var(--ink-muted)] mt-1 font-semibold">
                  {event.coupleDisplayName}
                </p>
              </div>

              <div aria-live="polite">
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    formData.attending === "yes" ? (
                      /* ACCEPTED ATTENDANCE SUCCESS SCREEN */
                      <motion.div
                        key="accepted-screen"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="p-6 rounded-2xl bg-[var(--paper-white)] border-2 border-[var(--gold)] text-center space-y-4 shadow-md relative"
                      >
                        <div className="flex justify-center mb-2">
                          <InitialsMonogram size={72} showGlow={true} />
                        </div>

                        <div>
                          <h4 className="text-lg sm:text-xl font-bold text-[var(--ruby)] flex items-center justify-center gap-1.5">
                            <Sparkle size={18} weight="fill" className="text-[var(--gold)]" />
                            <span>پاسخ شما با خوشی ثبت شد</span>
                            <Sparkle size={18} weight="fill" className="text-[var(--gold)]" />
                          </h4>

                          <p className="text-sm font-bold text-[var(--ink)] mt-2">
                            گرامی {formData.fullName}،
                          </p>

                          <p className="text-xs sm:text-sm text-[var(--ink-muted)] leading-relaxed mt-2">
                            از حضور گرم شما در این جشن فرخنده سپاسگزاریم.
                            <br />
                            دیدار شما باعث شادی و افتخار ماست.
                          </p>

                          <div className="mt-3 inline-block px-4 py-1.5 rounded-full bg-[var(--gold)]/15 text-[var(--gold-dark,#8a6329)] text-xs font-bold border border-[var(--gold)]/30">
                            تعداد همراهان ثبت‌شده: {formData.companionCount} نفر
                          </div>
                        </div>

                        {/* Arvin Atelier Logo Signature */}
                        <div className="pt-4 border-t border-[var(--line)]/60 flex flex-col items-center gap-1.5">
                          <div className="relative w-20 h-10 opacity-85">
                            <Image
                              src="/arvin-atelier-logo.jpg"
                              alt="Arvin Atelier Logo"
                              fill
                              className="object-contain"
                            />
                          </div>
                          <span className="text-[9px] text-[var(--ink-muted)] tracking-wider uppercase">
                            DESIGNED BY ARVIN ATELIER
                          </span>

                          <button
                            onClick={() => setIsSubmitted(false)}
                            className="inline-flex items-center gap-1 mt-2 text-xs font-semibold text-[var(--ruby)] hover:underline cursor-pointer"
                          >
                            <PencilSimple size={14} />
                            <span>ویرایش پاسخ</span>
                          </button>
                        </div>
                      </motion.div>
                    ) : (
                      /* DECLINED ATTENDANCE RESPECTFUL SCREEN */
                      <motion.div
                        key="declined-screen"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="p-6 rounded-2xl bg-[var(--paper-white)] border border-[var(--line)] text-center space-y-4 shadow-sm"
                      >
                        <div className="w-14 h-14 rounded-full bg-[var(--gold)]/15 text-[var(--gold-dark,#8a6329)] mx-auto flex items-center justify-center border border-[var(--gold)]/30">
                          <Heart size={28} weight="fill" />
                        </div>

                        <div>
                          <h4 className="text-base sm:text-lg font-bold text-[var(--ink)]">
                            با سپاس و احترام، {formData.fullName}
                          </h4>

                          <p className="text-xs sm:text-sm text-[var(--ink-muted)] leading-relaxed mt-2">
                            از اینکه به ما اطلاع دادید سپاسگزاریم.
                            <br />
                            برای شما شادی و سلامتی آرزو داریم و از یاد شما در این روز خجسته خوشحالیم.
                          </p>
                        </div>

                        {/* Arvin Atelier Logo Signature */}
                        <div className="pt-4 border-t border-[var(--line)]/60 flex flex-col items-center gap-1.5">
                          <div className="relative w-20 h-10 opacity-75">
                            <Image
                              src="/arvin-atelier-logo.jpg"
                              alt="Arvin Atelier Logo"
                              fill
                              className="object-contain"
                            />
                          </div>
                          <span className="text-[9px] text-[var(--ink-muted)] tracking-wider uppercase">
                            DESIGNED BY ARVIN ATELIER
                          </span>

                          <button
                            onClick={() => setIsSubmitted(false)}
                            className="inline-flex items-center gap-1 mt-2 text-xs font-semibold text-[var(--ruby)] hover:underline cursor-pointer"
                          >
                            <PencilSimple size={14} />
                            <span>ویرایش پاسخ</span>
                          </button>
                        </div>
                      </motion.div>
                    )
                  ) : (
                    /* RSVP INPUT FORM */
                    <form onSubmit={handleSubmit} noValidate className="space-y-4 text-right">
                      {/* Full Name */}
                      <div>
                        <label htmlFor="fullName" className="block text-xs font-bold text-[var(--ink)] mb-1">
                          نام و نام خانوادگی <span className="text-[var(--ruby)]">*</span>
                        </label>
                        <div className="relative">
                          <input
                            id="fullName"
                            type="text"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            placeholder="مثال: احمد شکیب"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--line)] bg-[var(--paper-white)] text-[var(--ink)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--gold)] transition-shadow"
                          />
                          <User size={16} className="absolute left-3 top-3 text-[var(--ink-muted)]" />
                        </div>
                        {errors.fullName && (
                          <p className="text-[11px] text-[var(--ruby)] mt-1 font-medium flex items-center gap-1">
                            <XCircle size={13} />
                            <span>{errors.fullName}</span>
                          </p>
                        )}
                      </div>

                      {/* Phone / WhatsApp */}
                      <div>
                        <label htmlFor="phone" className="block text-xs font-bold text-[var(--ink)] mb-1">
                          شماره تماس یا واتساپ <span className="text-[var(--ruby)]">*</span>
                        </label>
                        <div className="relative">
                          <input
                            id="phone"
                            type="tel"
                            dir="ltr"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="۰۷۹۹ ۱۲۳ ۴۵۶"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--line)] bg-[var(--paper-white)] text-[var(--ink)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--gold)] transition-shadow text-left"
                          />
                          <Phone size={16} className="absolute right-3 top-3 text-[var(--ink-muted)]" />
                        </div>
                        {errors.phone && (
                          <p className="text-[11px] text-[var(--ruby)] mt-1 font-medium flex items-center gap-1">
                            <XCircle size={13} />
                            <span>{errors.phone}</span>
                          </p>
                        )}
                      </div>

                      {/* Attendance Radio Group */}
                      <fieldset className="border border-[var(--line)] rounded-xl p-3 bg-[var(--paper-white)]/60">
                        <legend className="text-xs font-bold text-[var(--ink)] px-1.5">
                          آیا در محفل حضور می‌یابید؟ <span className="text-[var(--ruby)]">*</span>
                        </legend>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                          <label
                            className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer transition-colors ${
                              formData.attending === "yes"
                                ? "border-[var(--ruby)] bg-[var(--paper-white)] text-[var(--ruby-deep)] font-bold shadow-sm"
                                : "border-[var(--line)] bg-[var(--paper-white)] text-[var(--ink)]"
                            }`}
                          >
                            <input
                              type="radio"
                              name="attending"
                              value="yes"
                              checked={formData.attending === "yes"}
                              onChange={() => setFormData({ ...formData, attending: "yes" })}
                              className="w-4 h-4 accent-[var(--ruby)]"
                            />
                            <span className="text-xs">با خوشی شرکت می‌کنم</span>
                          </label>

                          <label
                            className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer transition-colors ${
                              formData.attending === "no"
                                ? "border-[var(--ruby)] bg-[var(--paper-white)] text-[var(--ruby-deep)] font-bold shadow-sm"
                                : "border-[var(--line)] bg-[var(--paper-white)] text-[var(--ink)]"
                            }`}
                          >
                            <input
                              type="radio"
                              name="attending"
                              value="no"
                              checked={formData.attending === "no"}
                              onChange={() => setFormData({ ...formData, attending: "no" })}
                              className="w-4 h-4 accent-[var(--ruby)]"
                            />
                            <span className="text-xs">متأسفانه نمی‌توانم حضور یابم</span>
                          </label>
                        </div>

                        {errors.attending && (
                          <p className="text-[11px] text-[var(--ruby)] mt-1.5 font-medium flex items-center gap-1">
                            <XCircle size={13} />
                            <span>{errors.attending}</span>
                          </p>
                        )}
                      </fieldset>

                      {/* Companion Count */}
                      {formData.attending === "yes" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="space-y-1"
                        >
                          <label htmlFor="companionCount" className="block text-xs font-bold text-[var(--ink)]">
                            تعداد همراهان، همراه با خودتان
                          </label>
                          <div className="relative">
                            <select
                              id="companionCount"
                              value={formData.companionCount}
                              onChange={(e) => setFormData({ ...formData, companionCount: Number(e.target.value) })}
                              className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--line)] bg-[var(--paper-white)] text-[var(--ink)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--gold)] transition-shadow"
                            >
                              {[1, 2, 3, 4, 5, 6].map((num) => (
                                <option key={num} value={num}>
                                  {num} نفر
                                </option>
                              ))}
                            </select>
                            <Users size={16} className="absolute left-3 top-3 text-[var(--ink-muted)] pointer-events-none" />
                          </div>
                        </motion.div>
                      )}

                      {/* Optional Message */}
                      <div>
                        {!showMessageField ? (
                          <button
                            type="button"
                            onClick={() => setShowMessageField(true)}
                            className="text-xs font-semibold text-[var(--gold-dark,#8a6329)] hover:text-[var(--ruby)] transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <ChatText size={15} />
                            <span>پیام تبریک می‌نویسم (اختیاری)</span>
                          </button>
                        ) : (
                          <div>
                            <label htmlFor="message" className="block text-xs font-bold text-[var(--ink)] mb-1">
                              پیام تبریک (اختیاری)
                            </label>
                            <textarea
                              id="message"
                              rows={2}
                              value={formData.message}
                              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                              placeholder={`آرزوی خوشبختی و شادکامی برای ${event.coupleDisplayName} عزیز...`}
                              className="w-full px-3.5 py-2 rounded-xl border border-[var(--line)] bg-[var(--paper-white)] text-[var(--ink)] text-xs focus:outline-none focus:ring-2 focus:ring-[var(--gold)] transition-shadow"
                            />
                          </div>
                        )}
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 px-5 rounded-xl bg-[var(--ruby)] hover:bg-[var(--ruby-deep)] text-[var(--paper-white)] font-bold text-sm shadow-md transition-all disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer mt-2"
                      >
                        {isSubmitting ? (
                          <span>در حال ثبت پاسخ…</span>
                        ) : (
                          <>
                            <CheckCircle size={18} />
                            <span>ثبت نهایی پاسخ</span>
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

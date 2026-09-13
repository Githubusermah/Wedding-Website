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
      const count = 150;
      const defaults = {
        origin: { y: 0.6 },
        colors: ["#C5A059", "#D8BD8A", "#9A7736", "#FAF8F5", "#EFE9DD"],
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
    }, 600);
  };

  return (
    <section id="rsvp" className="py-14 px-4 max-w-2xl mx-auto scroll-mt-20 text-center">
      {/* RSVP Section on shared paper */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="space-y-4"
      >
        <span className="text-xs text-[var(--gold-dark)] font-semibold tracking-widest uppercase block">
          R.S.V.P
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--ink)] font-serif">
          تأیید حضور در محفل
        </h2>
        <p className="text-xs sm:text-sm text-[var(--ink-muted)] max-w-md mx-auto leading-relaxed">
          لطفاً جهت هماهنگی بهتر پذیرایی و جایگاه مهمانان گرامی، حضور خود را اطلاع دهید.
        </p>

        <div className="pt-4">
          <button
            onClick={() => setIsOpen(true)}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[var(--gold)] hover:bg-[var(--gold-dark)] text-[var(--paper-white)] font-bold text-sm shadow-xs transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
          >
            <EnvelopeOpen size={18} />
            <span>پاسخ به دعوتنامه</span>
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
              className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            />

            {/* Modal Dialog Surface */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-md bg-[var(--paper-white)] rounded-2xl p-6 sm:p-8 border border-[var(--line)] shadow-xl z-10 text-right my-auto overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 left-4 z-20 text-[var(--ink-muted)] hover:text-[var(--ink)] p-1 transition-colors focus:outline-none"
                aria-label="بستن"
              >
                <X size={20} />
              </button>

              <div className="flex justify-center mb-3">
                <InitialsMonogram size={56} />
              </div>

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-[var(--ink)] font-serif">
                  تأیید حضور در محفل پیوند
                </h3>
                <p className="text-xs text-[var(--ink-muted)] mt-1">
                  {event.coupleDisplayName}
                </p>
              </div>

              <div aria-live="polite">
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    formData.attending === "yes" ? (
                      /* ACCEPTED ATTENDANCE SCREEN */
                      <motion.div
                        key="accepted-screen"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center space-y-4 py-2"
                      >
                        <h4 className="text-lg font-bold text-[var(--gold-dark)]">
                          پاسخ شما با خوشی ثبت شد
                        </h4>

                        <p className="text-sm font-semibold text-[var(--ink)]">
                          گرامی {formData.fullName}،
                        </p>

                        <p className="text-xs sm:text-sm text-[var(--ink-muted)] leading-relaxed">
                          از حضور گرم شما در این جشن فرخنده سپاسگزاریم.
                          <br />
                          دیدار شما باعث شادی و افتخار ماست.
                        </p>

                        <p className="text-xs text-[var(--gold-dark)] font-medium">
                          تعداد همراهان ثبت‌شده: {formData.companionCount} نفر
                        </p>

                        <div className="pt-4 border-t border-[var(--line-subtle)] flex flex-col items-center gap-1.5">
                          <div className="relative w-20 h-10 opacity-80">
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
                            className="inline-flex items-center gap-1 mt-2 text-xs text-[var(--gold-dark)] hover:underline cursor-pointer"
                          >
                            <PencilSimple size={14} />
                            <span>ویرایش پاسخ</span>
                          </button>
                        </div>
                      </motion.div>
                    ) : (
                      /* DECLINED ATTENDANCE SCREEN */
                      <motion.div
                        key="declined-screen"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center space-y-4 py-2"
                      >
                        <div className="w-10 h-10 rounded-full bg-[var(--gold-pale)] text-[var(--gold-dark)] mx-auto flex items-center justify-center">
                          <Heart size={20} />
                        </div>

                        <h4 className="text-base font-bold text-[var(--ink)]">
                          با سپاس و احترام، {formData.fullName}
                        </h4>

                        <p className="text-xs sm:text-sm text-[var(--ink-muted)] leading-relaxed">
                          از اینکه به ما اطلاع دادید سپاسگزاریم.
                          <br />
                          برای شما شادی و سلامتی آرزو داریم.
                        </p>

                        <div className="pt-4 border-t border-[var(--line-subtle)] flex flex-col items-center gap-1.5">
                          <div className="relative w-20 h-10 opacity-70">
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
                            className="inline-flex items-center gap-1 mt-2 text-xs text-[var(--gold-dark)] hover:underline cursor-pointer"
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
                        <label htmlFor="fullName" className="block text-xs font-semibold text-[var(--ink)] mb-1">
                          نام و نام خانوادگی <span className="text-[var(--gold-dark)]">*</span>
                        </label>
                        <div className="relative">
                          <input
                            id="fullName"
                            type="text"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            placeholder="مثال: احمد شکیب"
                            className="w-full px-3 py-2 bg-transparent border-b border-[var(--line)] text-[var(--ink)] text-sm focus:outline-none focus:border-[var(--gold)] transition-colors"
                          />
                          <User size={16} className="absolute left-1 top-2.5 text-[var(--ink-muted)]" />
                        </div>
                        {errors.fullName && (
                          <p className="text-[11px] text-[var(--gold-dark)] mt-1 font-medium flex items-center gap-1">
                            <XCircle size={13} />
                            <span>{errors.fullName}</span>
                          </p>
                        )}
                      </div>

                      {/* Phone / WhatsApp */}
                      <div>
                        <label htmlFor="phone" className="block text-xs font-semibold text-[var(--ink)] mb-1">
                          شماره تماس یا واتساپ <span className="text-[var(--gold-dark)]">*</span>
                        </label>
                        <div className="relative">
                          <input
                            id="phone"
                            type="tel"
                            dir="ltr"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="۰۷۹۹ ۱۲۳ ۴۵۶"
                            className="w-full px-3 py-2 bg-transparent border-b border-[var(--line)] text-[var(--ink)] text-sm focus:outline-none focus:border-[var(--gold)] transition-colors text-left"
                          />
                          <Phone size={16} className="absolute right-1 top-2.5 text-[var(--ink-muted)]" />
                        </div>
                        {errors.phone && (
                          <p className="text-[11px] text-[var(--gold-dark)] mt-1 font-medium flex items-center gap-1">
                            <XCircle size={13} />
                            <span>{errors.phone}</span>
                          </p>
                        )}
                      </div>

                      {/* Attendance Radio Group */}
                      <fieldset className="py-2">
                        <legend className="text-xs font-semibold text-[var(--ink)] mb-2">
                          آیا در محفل حضور می‌یابید؟ <span className="text-[var(--gold-dark)]">*</span>
                        </legend>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <label
                            className={`flex items-center gap-2 p-2 rounded-lg border transition-colors cursor-pointer ${
                              formData.attending === "yes"
                                ? "border-[var(--gold)] bg-[var(--gold-pale)] text-[var(--ink)] font-semibold"
                                : "border-[var(--line-subtle)] text-[var(--ink-muted)]"
                            }`}
                          >
                            <input
                              type="radio"
                              name="attending"
                              value="yes"
                              checked={formData.attending === "yes"}
                              onChange={() => setFormData({ ...formData, attending: "yes" })}
                              className="w-4 h-4 accent-[var(--gold)]"
                            />
                            <span className="text-xs">با خوشی شرکت می‌کنم</span>
                          </label>

                          <label
                            className={`flex items-center gap-2 p-2 rounded-lg border transition-colors cursor-pointer ${
                              formData.attending === "no"
                                ? "border-[var(--gold)] bg-[var(--gold-pale)] text-[var(--ink)] font-semibold"
                                : "border-[var(--line-subtle)] text-[var(--ink-muted)]"
                            }`}
                          >
                            <input
                              type="radio"
                              name="attending"
                              value="no"
                              checked={formData.attending === "no"}
                              onChange={() => setFormData({ ...formData, attending: "no" })}
                              className="w-4 h-4 accent-[var(--gold)]"
                            />
                            <span className="text-xs">متأسفانه نمی‌توانم حضور یابم</span>
                          </label>
                        </div>

                        {errors.attending && (
                          <p className="text-[11px] text-[var(--gold-dark)] mt-1.5 font-medium flex items-center gap-1">
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
                          <label htmlFor="companionCount" className="block text-xs font-semibold text-[var(--ink)]">
                            تعداد همراهان، همراه با خودتان
                          </label>
                          <div className="relative">
                            <select
                              id="companionCount"
                              value={formData.companionCount}
                              onChange={(e) => setFormData({ ...formData, companionCount: Number(e.target.value) })}
                              className="w-full px-3 py-2 bg-transparent border-b border-[var(--line)] text-[var(--ink)] text-sm focus:outline-none focus:border-[var(--gold)] transition-colors cursor-pointer"
                            >
                              {[1, 2, 3, 4, 5, 6].map((num) => (
                                <option key={num} value={num}>
                                  {num} نفر
                                </option>
                              ))}
                            </select>
                            <Users size={16} className="absolute left-1 top-2.5 text-[var(--ink-muted)] pointer-events-none" />
                          </div>
                        </motion.div>
                      )}

                      {/* Optional Message */}
                      <div>
                        {!showMessageField ? (
                          <button
                            type="button"
                            onClick={() => setShowMessageField(true)}
                            className="text-xs text-[var(--gold-dark)] hover:underline flex items-center gap-1 cursor-pointer pt-1"
                          >
                            <ChatText size={14} />
                            <span>پیام تبریک می‌نویسم (اختیاری)</span>
                          </button>
                        ) : (
                          <div className="pt-1">
                            <label htmlFor="message" className="block text-xs font-semibold text-[var(--ink)] mb-1">
                              پیام تبریک (اختیاری)
                            </label>
                            <textarea
                              id="message"
                              rows={2}
                              value={formData.message}
                              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                              placeholder={`آرزوی خوشبختی و شادکامی برای ${event.coupleDisplayName} عزیز...`}
                              className="w-full px-3 py-2 bg-transparent border-b border-[var(--line)] text-[var(--ink)] text-xs focus:outline-none focus:border-[var(--gold)] transition-colors"
                            />
                          </div>
                        )}
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-2.5 px-4 rounded-full bg-[var(--gold)] hover:bg-[var(--gold-dark)] text-[var(--paper-white)] font-bold text-sm shadow-xs transition-colors disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer mt-4"
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

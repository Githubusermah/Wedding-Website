"use client";

import { useState } from "react";
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
} from "@phosphor-icons/react";

interface FormData {
  fullName: string;
  phone: string;
  attending: "yes" | "no" | "";
  companionCount: number;
  message: string;
}

export default function RsvpForm() {
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

  const fireGoldConfetti = () => {
    try {
      const count = 180;
      const defaults = {
        origin: { y: 0.65 },
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
      // Fallback gracefully if canvas-confetti is unsupported
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
    }, 800);
  };

  return (
    <section id="rsvp" className="py-12 px-4 max-w-2xl mx-auto scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="paper-card p-6 md:p-10 relative shadow-xl border-[var(--line)] overflow-hidden"
      >
        <div className="text-center mb-8">
          <span className="text-xs text-[var(--gold)] font-semibold tracking-widest uppercase">
            RSVP
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--ruby)] mt-1">
            تأیید حضور
          </h2>
          <p className="text-sm text-[var(--ink-muted)] mt-2">
            لطفاً برای هماهنگی بهتر محفل، پاسخ خود را ثبت کنید.
          </p>
        </div>

        <div aria-live="polite">
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              formData.attending === "yes" ? (
                /* ACCEPTED ATTENDANCE SUCCESS SCREEN */
                <motion.div
                  key="accepted-screen"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="p-6 md:p-8 rounded-2xl bg-gradient-to-b from-[var(--paper-white)] via-[#fffdf6] to-[#faf4e6] border-2 border-[var(--gold)] text-center space-y-5 shadow-lg relative overflow-hidden"
                >
                  {/* Gold/Ruby Wax Seal Badge */}
                  <div className="relative w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#dfb971] via-[#b8863f] to-[#7a1c28] p-1 shadow-md flex items-center justify-center">
                    <div className="w-full h-full rounded-full bg-[var(--paper-white)] flex flex-col items-center justify-center border border-[var(--gold)]">
                      <span className="font-nastaliq text-xl text-[var(--ruby)] font-bold">
                        ف &amp; س
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-[var(--ruby)] flex items-center justify-center gap-2">
                      <Sparkle size={20} weight="fill" className="text-[var(--gold)]" />
                      <span>پاسخ شما با خوشی ثبت شد</span>
                      <Sparkle size={20} weight="fill" className="text-[var(--gold)]" />
                    </h3>

                    <p className="text-base font-semibold text-[var(--ink)] mt-2">
                      گرامی {formData.fullName}،
                    </p>

                    <p className="text-xs md:text-sm text-[var(--ink-muted)] leading-relaxed mt-2 max-w-lg mx-auto">
                      از حضور گرم شما در این جشن فرخنده سپاسگزاریم.
                      <br />
                      دیدار شما باعث شادی و افتخار ماست.
                    </p>

                    <div className="mt-3 inline-block px-4 py-1.5 rounded-full bg-[var(--gold)]/15 text-[var(--gold-dark,#8a6329)] text-xs font-bold border border-[var(--gold)]/30">
                      تعداد همراهان ثبت‌شده: {formData.companionCount} نفر
                    </div>
                  </div>

                  {/* Arvin Atelier Logo Signature */}
                  <div className="pt-4 border-t border-[var(--line)]/60 flex flex-col items-center gap-2">
                    <div className="relative w-24 h-12 opacity-85 hover:opacity-100 transition-opacity">
                      <Image
                        src="/arvin-atelier-logo.jpg"
                        alt="Arvin Atelier Logo"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="text-[10px] text-[var(--ink-muted)] tracking-wider uppercase">
                      DESIGNED BY ARVIN ATELIER
                    </span>

                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="inline-flex items-center gap-1.5 mt-2 text-xs font-semibold text-[var(--ruby)] hover:text-[var(--ruby-deep)] transition-colors"
                    >
                      <PencilSimple size={15} />
                      <span>ویرایش پاسخ</span>
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* DECLINED ATTENDANCE RESPECTFUL SCREEN */
                <motion.div
                  key="declined-screen"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="p-6 md:p-8 rounded-2xl bg-[var(--paper-white)] border border-[var(--line)] text-center space-y-5 shadow-sm relative"
                >
                  <div className="w-16 h-16 rounded-full bg-[var(--gold)]/15 text-[var(--gold-dark,#8a6329)] mx-auto flex items-center justify-center border border-[var(--gold)]/30">
                    <Heart size={30} weight="fill" />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-[var(--ink)]">
                      با سپاس و احترام، {formData.fullName}
                    </h3>

                    <p className="text-xs md:text-sm text-[var(--ink-muted)] leading-relaxed mt-2 max-w-lg mx-auto">
                      از اینکه به ما اطلاع دادید سپاسگزاریم.
                      <br />
                      برای شما شادی و سلامتی آرزو داریم و از یاد شما در این روز خجسته خوشحالیم.
                    </p>
                  </div>

                  {/* Arvin Atelier Logo Signature */}
                  <div className="pt-4 border-t border-[var(--line)]/60 flex flex-col items-center gap-2">
                    <div className="relative w-24 h-12 opacity-75 hover:opacity-100 transition-opacity">
                      <Image
                        src="/arvin-atelier-logo.jpg"
                        alt="Arvin Atelier Logo"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="text-[10px] text-[var(--ink-muted)] tracking-wider uppercase">
                      DESIGNED BY ARVIN ATELIER
                    </span>

                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="inline-flex items-center gap-1.5 mt-2 text-xs font-semibold text-[var(--ruby)] hover:text-[var(--ruby-deep)] transition-colors"
                    >
                      <PencilSimple size={15} />
                      <span>ویرایش پاسخ</span>
                    </button>
                  </div>
                </motion.div>
              )
            ) : (
              /* RSVP INPUT FORM */
              <form onSubmit={handleSubmit} noValidate className="space-y-6 text-right">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-semibold text-[var(--ink)] mb-1.5">
                    نام و نام خانوادگی <span className="text-[var(--ruby)]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="مثال: احمد شکیب"
                      className="w-full px-4 py-3 rounded-xl border border-[var(--line)] bg-[var(--paper-white)] text-[var(--ink)] text-base focus:outline-none focus:ring-2 focus:ring-[var(--gold)] transition-shadow"
                    />
                    <User size={18} className="absolute left-3.5 top-3.5 text-[var(--ink-muted)]" />
                  </div>
                  {errors.fullName && (
                    <p className="text-xs text-[var(--ruby)] mt-1.5 font-medium flex items-center gap-1">
                      <XCircle size={14} />
                      <span>{errors.fullName}</span>
                    </p>
                  )}
                </div>

                {/* Phone / WhatsApp */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-[var(--ink)] mb-1.5">
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
                      className="w-full px-4 py-3 rounded-xl border border-[var(--line)] bg-[var(--paper-white)] text-[var(--ink)] text-base focus:outline-none focus:ring-2 focus:ring-[var(--gold)] transition-shadow text-left"
                    />
                    <Phone size={18} className="absolute right-3.5 top-3.5 text-[var(--ink-muted)]" />
                  </div>
                  {errors.phone && (
                    <p className="text-xs text-[var(--ruby)] mt-1.5 font-medium flex items-center gap-1">
                      <XCircle size={14} />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>

                {/* Attendance Radio Group */}
                <fieldset className="border border-[var(--line)] rounded-xl p-4 bg-[var(--ivory-deep)]/40">
                  <legend className="text-sm font-semibold text-[var(--ink)] px-2">
                    آیا در محفل حضور می‌یابید؟ <span className="text-[var(--ruby)]">*</span>
                  </legend>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                    <label
                      className={`flex items-center gap-3 p-3.5 rounded-lg border cursor-pointer transition-colors ${
                        formData.attending === "yes"
                          ? "border-[var(--ruby)] bg-[var(--paper-white)] text-[var(--ruby-deep)] font-semibold shadow-sm"
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
                      <span className="text-sm">با خوشی شرکت می‌کنم</span>
                    </label>

                    <label
                      className={`flex items-center gap-3 p-3.5 rounded-lg border cursor-pointer transition-colors ${
                        formData.attending === "no"
                          ? "border-[var(--ruby)] bg-[var(--paper-white)] text-[var(--ruby-deep)] font-semibold shadow-sm"
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
                      <span className="text-sm">متأسفانه نمی‌توانم حضور یابم</span>
                    </label>
                  </div>

                  {errors.attending && (
                    <p className="text-xs text-[var(--ruby)] mt-2 font-medium flex items-center gap-1">
                      <XCircle size={14} />
                      <span>{errors.attending}</span>
                    </p>
                  )}
                </fieldset>

                {/* Conditional Companion Count */}
                {formData.attending === "yes" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-1.5"
                  >
                    <label htmlFor="companionCount" className="block text-sm font-semibold text-[var(--ink)]">
                      تعداد همراهان، همراه با خودتان
                    </label>
                    <div className="relative">
                      <select
                        id="companionCount"
                        value={formData.companionCount}
                        onChange={(e) => setFormData({ ...formData, companionCount: Number(e.target.value) })}
                        className="w-full px-4 py-3 rounded-xl border border-[var(--line)] bg-[var(--paper-white)] text-[var(--ink)] text-base focus:outline-none focus:ring-2 focus:ring-[var(--gold)] transition-shadow"
                      >
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <option key={num} value={num}>
                            {num} نفر
                          </option>
                        ))}
                      </select>
                      <Users size={18} className="absolute left-3.5 top-3.5 text-[var(--ink-muted)] pointer-events-none" />
                    </div>
                  </motion.div>
                )}

                {/* Collapsible Optional Message */}
                <div>
                  {!showMessageField ? (
                    <button
                      type="button"
                      onClick={() => setShowMessageField(true)}
                      className="text-xs font-semibold text-[var(--gold)] hover:text-[var(--ruby)] transition-colors flex items-center gap-1"
                    >
                      <ChatText size={16} />
                      <span>پیام تبریک می‌نویسم (اختیاری)</span>
                    </button>
                  ) : (
                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-[var(--ink)] mb-1.5">
                        پیام تبریک (اختیاری)
                      </label>
                      <textarea
                        id="message"
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="آرزوی خوشبختی و شادکامی برای فرهاد و سحر عزیز..."
                        className="w-full px-4 py-3 rounded-xl border border-[var(--line)] bg-[var(--paper-white)] text-[var(--ink)] text-base focus:outline-none focus:ring-2 focus:ring-[var(--gold)] transition-shadow"
                      />
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-[var(--ruby)] hover:bg-[var(--ruby-deep)] text-[var(--paper-white)] font-semibold text-base shadow-md transition-all disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>در حال ثبت پاسخ…</span>
                  ) : (
                    <>
                      <CheckCircle size={20} />
                      <span>ثبت پاسخ</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}

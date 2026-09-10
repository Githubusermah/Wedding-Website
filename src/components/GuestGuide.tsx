"use client";

import { motion } from "motion/react";
import { event } from "@/lib/event";
import { Car, TShirt, Camera, PhoneCall, Sparkle } from "@phosphor-icons/react";

export default function GuestGuide() {
  const guideTopics = [
    {
      id: "parking",
      title: "رسیدن و پارکینگ",
      icon: <Car size={22} className="text-[var(--ruby)]" />,
      content:
        "هتل قصر ستاره شهر کابل دارای پارکینگ اختصاصی سرپوشیده و امن برای تمام مهمانان گرامی می‌باشد. پرسونل راهنما در ورودی هتل جهت هدایت خودروها مستقر خواهند بود.",
    },
    {
      id: "dresscode",
      title: "پوشش پیشنهادی",
      icon: <TShirt size={22} className="text-[var(--gold-dark,#8a6329)]" />,
      content: event.dressCodeFa,
    },
    {
      id: "photography",
      title: "عکاسی و حریم خصوصی",
      icon: <Camera size={22} className="text-[var(--ruby)]" />,
      content:
        "لطفاً هنگام ثبت خاطرات و عکاسی، آسایش و حریم خصوصی سایر مهمانان محترم و خانواده‌ها را در نظر بگیرید.",
    },
  ];

  return (
    <section className="py-12 px-4 max-w-3xl mx-auto scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="paper-card p-6 sm:p-10 relative shadow-xl border-2 border-[var(--gold)]/50 bg-gradient-to-b from-[#fffdfa] via-[#faf5e8] to-[#f4e9d5]/70 overflow-hidden"
      >
        {/* Subtle Watermark Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#7A1C28_1.5px,transparent_1.5px)] [background-size:24px_24px]" />

        <div className="text-center mb-8 relative z-10">
          <div className="flex items-center justify-center gap-1.5 text-[var(--gold-dark,#8a6329)] mb-1">
            <Sparkle size={16} weight="fill" />
            <span className="text-xs font-bold uppercase tracking-widest">
              اطلاعات ضروری
            </span>
            <Sparkle size={16} weight="fill" />
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-[var(--ruby)] font-serif">
            راهنمای مهمانان
          </h2>
          <p className="text-xs md:text-sm text-[var(--ink-muted)] mt-1.5">
            توصیه‌ها و نکات مهم برای حضور آسوده شما
          </p>
        </div>

        {/* Accordion List with Luxury Editorial Styling */}
        <div className="space-y-4 text-right relative z-10">
          {guideTopics.map((topic) => (
            <details
              key={topic.id}
              className="group bg-[var(--paper-white)] p-5 rounded-2xl border border-[var(--gold)]/40 shadow-sm transition-all duration-300 [&_summary::-webkit-details-marker]:hidden hover:border-[var(--gold)] open:shadow-md open:border-[var(--gold)]"
            >
              <summary className="flex items-center justify-between cursor-pointer font-bold text-base text-[var(--ink)] select-none min-h-[44px]">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-[var(--ivory-deep)]/80 border border-[var(--gold)]/30 shrink-0">
                    {topic.icon}
                  </div>
                  <span className="text-base sm:text-lg">{topic.title}</span>
                </div>
                <span className="w-8 h-8 rounded-full bg-[var(--ivory)] text-[var(--gold-dark,#8a6329)] flex items-center justify-center text-xs transition-transform group-open:rotate-180 font-bold border border-[var(--gold)]/30">
                  ▼
                </span>
              </summary>
              <div className="mt-4 pt-4 border-t border-[var(--line)] text-xs sm:text-sm text-[var(--ink-muted)] leading-relaxed">
                <p>{topic.content}</p>
              </div>
            </details>
          ))}
        </div>

        {/* Contact Hotline */}
        <div className="mt-10 pt-6 border-t border-[var(--line)] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right relative z-10">
          <div>
            <span className="text-xs text-[var(--ink-muted)] block font-medium">
              سوال یا نیاز به راهنمایی دارید؟
            </span>
            <p className="text-sm font-bold text-[var(--ink)] mt-0.5">
              تیم تشریفات محفل در خدمت شماست
            </p>
          </div>

          <a
            href={event.contactPhoneHref}
            dir="ltr"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-[var(--ruby)] hover:bg-[var(--ruby-deep)] text-[var(--paper-white)] text-sm font-bold shadow-md hover:shadow-lg transition-all"
          >
            <PhoneCall size={18} weight="bold" />
            <span>{event.contactPhoneDisplay}</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}

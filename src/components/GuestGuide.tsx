"use client";

import { motion } from "motion/react";
import { event } from "@/lib/event";
import { Car, TShirt, Camera, PhoneCall } from "@phosphor-icons/react";

export default function GuestGuide() {
  const guideTopics = [
    {
      id: "parking",
      title: "رسیدن و پارکینگ",
      icon: <Car size={20} className="text-[var(--ruby)]" />,
      content:
        "هتل کابل استار دارای پارکینگ اختصاصی سرپوشیده و امن برای تمام مهمانان گرامی می‌باشد. پرسونل راهنما در ورودی هتل جهت هدایت خودروها مستقر خواهند بود.",
    },
    {
      id: "dresscode",
      title: "پوشش پیشنهادی",
      icon: <TShirt size={20} className="text-[var(--gold)]" />,
      content: event.dressCodeFa,
    },
    {
      id: "photography",
      title: "عکاسی و حریم خصوصی",
      icon: <Camera size={20} className="text-[var(--ruby)]" />,
      content:
        "لطفاً هنگام ثبت خاطرات و عکاسی، آسایش و حریم خصوصی سایر مهمانان محترم و خانواده‌ها را در نظر بگیرید.",
    },
  ];

  return (
    <section className="py-12 px-4 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="paper-card p-6 md:p-8"
      >
        <div className="text-center mb-8">
          <span className="text-xs text-[var(--gold)] font-semibold tracking-wider uppercase">
            اطلاعات ضروری
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--ruby)] mt-1">
            راهنمای مهمانان
          </h2>
        </div>

        <div className="space-y-4 text-right">
          {guideTopics.map((topic) => (
            <details
              key={topic.id}
              className="group paper-card-inset p-4 rounded-xl [&_summary::-webkit-details-marker]:hidden border border-[var(--line)]"
            >
              <summary className="flex items-center justify-between cursor-pointer font-semibold text-base text-[var(--ink)] select-none min-h-[44px]">
                <div className="flex items-center gap-3">
                  {topic.icon}
                  <span>{topic.title}</span>
                </div>
                <span className="text-[var(--gold)] transition-transform group-open:rotate-180 text-sm">
                  ▼
                </span>
              </summary>
              <p className="mt-3 pt-3 border-t border-[var(--line)] text-sm text-[var(--ink-muted)] leading-relaxed">
                {topic.content}
              </p>
            </details>
          ))}
        </div>

        {/* Contact Hotline */}
        <div className="mt-8 pt-6 border-t border-[var(--line)] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
          <div>
            <span className="text-xs text-[var(--ink-muted)] block">سوال یا نیاز به راهنمایی دارید؟</span>
            <p className="text-sm font-bold text-[var(--ink)] mt-0.5">تیم تشریفات محفل در خدمت شماست</p>
          </div>

          <a
            href={event.contactPhoneHref}
            dir="ltr"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--ruby)] hover:bg-[var(--ruby-deep)] text-[var(--paper-white)] text-sm font-semibold shadow-sm transition-colors"
          >
            <PhoneCall size={18} />
            <span>{event.contactPhoneDisplay}</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}

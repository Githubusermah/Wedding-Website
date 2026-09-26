"use client";

import { motion } from "motion/react";
import { event } from "@/lib/event";
import { Car, TShirt, Camera, PhoneCall } from "@phosphor-icons/react";

export default function GuestGuide() {
  const guideTopics = [
    {
      id: "parking",
      title: "رسیدن و پارکینگ",
      icon: <Car size={20} className="text-[var(--gold-dark)]" />,
      content:
        "تالار عروسی تاج کانتیننتال دارای پارکینگ اختصاصی سرپوشیده و امن برای تمام مهمانان گرامی می‌باشد. پرسونل راهنما در ورودی تالار جهت هدایت خودروها مستقر خواهند بود.",
    },
    {
      id: "dresscode",
      title: "پوشش پیشنهادی",
      icon: <TShirt size={20} className="text-[var(--gold-dark)]" />,
      content: event.dressCodeFa,
    },
    {
      id: "photography",
      title: "عکاسی و حریم خصوصی",
      icon: <Camera size={20} className="text-[var(--gold-dark)]" />,
      content:
        "لطفاً هنگام ثبت خاطرات و عکاسی، آسایش و حریم خصوصی سایر مهمانان محترم و خانواده‌ها را در نظر بگیرید.",
    },
  ];

  return (
    <section className="py-14 px-4 max-w-2xl mx-auto scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        <div className="text-center">
          <span className="text-xs font-semibold text-[var(--gold-dark)] tracking-widest uppercase block">
            اطلاعات ضروری
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--ink)] font-serif mt-1">
            راهنمای مهمانان
          </h2>
          <div className="w-12 h-px bg-[var(--gold-muted)] mx-auto mt-3" />
        </div>

        {/* Clean Accordion List with native details disclosure on transparent paper */}
        <div className="space-y-4 text-right">
          {guideTopics.map((topic) => (
            <details
              key={topic.id}
              className="group border-b border-[var(--line-subtle)] pb-4 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex items-center justify-between cursor-pointer font-bold text-base text-[var(--ink)] select-none py-1">
                <div className="flex items-center gap-2.5">
                  {topic.icon}
                  <span>{topic.title}</span>
                </div>
                <span className="text-xs text-[var(--gold-dark)] transition-transform group-open:rotate-180">
                  ▼
                </span>
              </summary>
              <div className="mt-2 text-xs sm:text-sm text-[var(--ink-muted)] leading-relaxed pr-7">
                <p>{topic.content}</p>
              </div>
            </details>
          ))}
        </div>

        {/* Contact Hotline */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-right text-xs">
          <span className="text-[var(--ink-muted)]">سوالی دارید؟ از اینجا تماس بگیرید.</span>

          <a
            href={event.contactPhoneHref}
            dir="ltr"
            className="inline-flex items-center gap-2 text-[var(--gold-dark)] font-semibold hover:underline"
          >
            <PhoneCall size={16} />
            <span>{event.contactPhoneDisplay}</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}

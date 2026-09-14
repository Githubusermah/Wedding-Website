"use client";

import { motion } from "motion/react";
import { Door, Sparkle, Heart, ForkKnife, Cake } from "@phosphor-icons/react";

export default function ScheduleTimeline() {
  const scheduleEvents = [
    {
      time: "۰۶:۰۰ شام",
      title: "ورود و استقبال از مهمانان گرامی",
      description: "پذیرایی اولیه با چای، نوشیدنی‌های گرم و شیرینی سنتی",
      icon: <Door size={18} className="text-[var(--gold-dark)]" />,
    },
    {
      time: "۰۷:۰۰ شب",
      title: "تلاوت کلام‌الله مجید و آغاز محفل",
      description: "خوش‌آمدگویی و طنین آیات متبرکه قرآن کریم",
      icon: <Sparkle size={18} className="text-[var(--gold-dark)]" />,
    },
    {
      time: "۰۸:۰۰ شب",
      title: "آیین شرعی عقد نکاح و نکاح‌خط",
      description: "لحظهٔ مقدس ثبت پیوند زناشویی با حضور بزرگواران و شهود",
      icon: <Heart size={18} className="text-[var(--gold-dark)]" />,
    },
    {
      time: "۰۹:۰۰ شب",
      title: "صرف شام فاخر و پذیرایی",
      description: "بوفهٔ کامل غذاهای اصیل افغانی و دسرها",
      icon: <ForkKnife size={18} className="text-[var(--gold-dark)]" />,
    },
    {
      time: "۱۰:۰۰ شب",
      title: "برش کیک و شادمانی پایان محفل",
      description: "عکس‌های یادگاری، بریدن کیک و بدرود مهمانان عزیز",
      icon: <Cake size={18} className="text-[var(--gold-dark)]" />,
    },
  ];

  return (
    <section className="py-14 px-4 max-w-2xl mx-auto scroll-mt-20 text-center">
      <div className="mb-10">
        <span className="text-xs text-[var(--gold-dark)] font-semibold tracking-widest uppercase block">
          برنامه محفل
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--ink)] mt-1 font-serif">
          محفل در یک نگاه
        </h2>
        <div className="w-12 h-px bg-[var(--gold-muted)] mx-auto mt-3" />
      </div>

      {/* Clean Typographic Timeline on Paper */}
      <div className="relative text-right max-w-md mx-auto space-y-8 pr-6 border-r border-[var(--line-subtle)]">
        {scheduleEvents.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="relative"
          >
            {/* Fine gold point marker */}
            <div className="absolute -right-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-[var(--gold-muted)]" />

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[var(--gold-dark)] dir-ltr justify-end">
                <span>{item.time}</span>
                {item.icon}
              </div>

              <h3 className="text-base font-bold text-[var(--ink)]">
                {item.title}
              </h3>

              <p className="text-xs text-[var(--ink-muted)] leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

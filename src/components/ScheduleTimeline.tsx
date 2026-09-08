"use client";

import { motion } from "motion/react";
import { Door, Sparkle, Heart, ForkKnife, Cake } from "@phosphor-icons/react";

export default function ScheduleTimeline() {
  const scheduleEvents = [
    {
      time: "۰۶:۰۰ شام",
      title: "ورود و استقبال از مهمانان گرامی",
      description: "پذیرایی اولیه با چای، نوشیدنی‌های گرم و شیرینی سنتی",
      icon: <Door size={20} className="text-[var(--ruby)]" />,
      featured: false,
    },
    {
      time: "۰۷:۰۰ شب",
      title: "تلاوت کلام‌الله مجید و آغاز محفل",
      description: "خوش‌آمدگویی و طنین آیات متبرکه قرآن کریم",
      icon: <Sparkle size={20} className="text-[var(--gold)]" />,
      featured: false,
    },
    {
      time: "۰۸:۰۰ شب",
      title: "آیین شرعی عقد نکاح و نکاح‌خط",
      description: "لحظهٔ مقدس ثبت پیوند زناشویی با حضور بزرگواران و شهود",
      icon: <Heart size={20} className="text-[var(--ruby)]" />,
      featured: true,
    },
    {
      time: "۰۹:۰۰ شب",
      title: "صرف شام فاخر و پذیرایی",
      description: "بوفهٔ کامل غذاهای اصیل افغانی و دسرها",
      icon: <ForkKnife size={20} className="text-[var(--gold)]" />,
      featured: false,
    },
    {
      time: "۱۰:۰۰ شب",
      title: "برش کیک و شادمانی پایان محفل",
      description: "عکس‌های یادگاری، بریدن کیک و بدرود مهمانان عزیز",
      icon: <Cake size={20} className="text-[var(--ruby)]" />,
      featured: false,
    },
  ];

  return (
    <section className="py-12 px-4 max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <span className="text-xs text-[var(--gold)] font-semibold tracking-wider uppercase">
          برنامه محفل
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--ruby)] mt-1">
          محفل در یک نگاه
        </h2>
      </div>

      <div className="relative border-r-2 border-[var(--gold)]/40 pr-6 mr-4 space-y-8 text-right">
        {scheduleEvents.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative"
          >
            {/* Thread Dot */}
            <div
              className={`absolute -right-[31px] top-1.5 w-4 h-4 rounded-full border-2 border-[var(--paper-white)] shadow-sm ${
                item.featured
                  ? "bg-[var(--ruby)] ring-4 ring-[var(--ruby)]/20"
                  : "bg-[var(--gold)]"
              }`}
            />

            {/* Row Content */}
            <div
              className={`p-4 md:p-5 transition-all ${
                item.featured
                  ? "paper-card border-[var(--ruby)]/40 shadow-md bg-[var(--paper-white)]"
                  : "bg-transparent"
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs md:text-sm font-bold text-[var(--ruby)] font-mono">
                  {item.time}
                </span>

                {item.featured && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[var(--ruby)] text-[var(--paper-white)]">
                    لحظهٔ ویژه
                  </span>
                )}
              </div>

              <h3 className="text-base md:text-lg font-bold text-[var(--ink)] flex items-center gap-2">
                {item.title}
              </h3>

              <p className="text-xs md:text-sm text-[var(--ink-muted)] mt-1 leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

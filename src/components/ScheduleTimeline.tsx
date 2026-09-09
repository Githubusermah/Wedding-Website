"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Door, Sparkle, Heart, ForkKnife, Cake, Flower } from "@phosphor-icons/react";

export default function ScheduleTimeline() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 50%"],
  });

  // Scale flower from bud (0.6) to full bloom (1.3) and rotate as scroll progresses
  const flowerScale = useTransform(scrollYProgress, [0, 1], [0.7, 1.35]);
  const flowerRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const flowerTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const flowerOpacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0.3, 1, 1, 0.8]);

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
        <p className="text-xs text-[var(--ink-muted)] mt-1">
          شکوفایی لحظه‌به‌لحظهٔ خاطرات بزم پیوند
        </p>
      </div>

      <div ref={containerRef} className="relative border-r-2 border-[var(--gold)]/30 pr-6 mr-4 space-y-8 text-right min-h-[480px]">
        {/* Animated Traveling Blossom Flower Marker */}
        <motion.div
          style={{
            top: flowerTop,
            scale: flowerScale,
            rotate: flowerRotate,
            opacity: flowerOpacity,
          }}
          className="absolute -right-[15px] z-20 w-7 h-7 rounded-full bg-[var(--paper-white)] border border-[var(--gold)] shadow-md flex items-center justify-center -translate-y-1/2 pointer-events-none"
        >
          <Flower size={16} weight="fill" className="text-[var(--ruby)]" />
        </motion.div>

        {scheduleEvents.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative group"
          >
            {/* Step Dot Indicator */}
            <div
              className={`absolute -right-[31px] top-2.5 w-4 h-4 rounded-full border-2 border-[var(--paper-white)] shadow-sm transition-all duration-300 group-hover:scale-125 ${
                item.featured
                  ? "bg-[var(--ruby)] ring-4 ring-[var(--ruby)]/25"
                  : "bg-[var(--gold)]"
              }`}
            />

            {/* Row Content Card */}
            <div
              className={`p-4 md:p-5 rounded-2xl transition-all duration-300 ${
                item.featured
                  ? "paper-card border-[var(--ruby)]/40 shadow-md bg-[var(--paper-white)] ring-1 ring-[var(--ruby)]/10"
                  : "bg-[var(--paper-white)]/60 hover:bg-[var(--paper-white)] border border-[var(--line)] shadow-sm"
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-xs md:text-sm font-bold text-[var(--ruby)] font-mono flex items-center gap-1.5">
                  {item.icon}
                  <span>{item.time}</span>
                </span>

                {item.featured && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[var(--ruby)] text-[var(--paper-white)] shadow-xs animate-pulse">
                    لحظهٔ ویژه
                  </span>
                )}
              </div>

              <h3 className="text-base md:text-lg font-bold text-[var(--ink)]">
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

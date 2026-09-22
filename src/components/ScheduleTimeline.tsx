"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { Door, Sparkle, Heart, ForkKnife, Cake } from "@phosphor-icons/react";

export default function ScheduleTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll tracking for the golden blossom motion along the timeline
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });

  // Map scroll progress to percentage height down the timeline border
  const blossomY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const blossomRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

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
    <section id="schedule" className="relative py-16 px-4 max-w-xl mx-auto scroll-mt-20 text-center">
      {/* Decorative Chandelier Asset */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex justify-center -mt-6 mb-4 pointer-events-none"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/chandelier.png"
          alt=""
          aria-hidden="true"
          className="w-24 sm:w-32 h-auto object-contain drop-shadow-[0_4px_12px_rgba(95,125,100,0.15)]"
        />
      </motion.div>
      <div className="mb-10">
        <span className="text-xs text-[var(--gold-dark)] font-semibold tracking-widest uppercase block">
          برنامه محفل
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--ink)] mt-1 font-serif">
          محفل در یک نگاه
        </h2>
        <div className="w-12 h-px bg-[var(--gold-muted)] mx-auto mt-3" />
      </div>

      {/* Clean Typographic Timeline on Paper with Animated Golden Blossom */}
      <div
        ref={containerRef}
        className="relative text-right max-w-md mx-auto space-y-8 pr-8 border-r-2 border-[var(--gold-pale)]"
      >
        {/* Scroll-Linked Pink Flower Blossom scrolling down the timeline line */}
        <motion.div
          style={{ top: blossomY, rotate: blossomRotate }}
          className="absolute -right-[19px] -translate-y-1/2 z-20 pointer-events-none filter drop-shadow-[0_4px_12px_rgba(220,130,160,0.35)]"
        >
          <Image
            src="/blossom.svg"
            alt="Pink Flower Blossom"
            width={38}
            height={38}
            className="w-9 h-9 object-contain"
            priority
          />
        </motion.div>

        {scheduleEvents.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="relative"
          >
            {/* Fine gold point marker */}
            <div className="absolute -right-[37px] top-1.5 w-3 h-3 rounded-full bg-[var(--paper-white)] border-2 border-[var(--gold)] shadow-sm" />

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[var(--gold-dark)] dir-ltr justify-end">
                <span>{item.time}</span>
                {item.icon}
              </div>

              <h3 className="text-base font-bold text-[var(--ink)] font-serif">
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

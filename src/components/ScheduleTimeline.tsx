"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "motion/react";
import { Door, Sparkle, Heart, ForkKnife, Cake } from "@phosphor-icons/react";

export default function ScheduleTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Track scroll progress through the timeline section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 70%", "end 80%"],
  });

  // Smooth scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    restDelta: 0.001,
  });

  const progressValue = shouldReduceMotion ? scrollYProgress : smoothProgress;

  // Flower Y position percentage along the line
  const flowerY = useTransform(progressValue, [0, 1], ["0%", "100%"]);
  // Line fill progress
  const lineHeight = useTransform(progressValue, [0, 1], ["0%", "100%"]);
  // Blossom scale and opening rotation
  const flowerScale = useTransform(progressValue, [0, 0.3, 1], [0.85, 1.1, 1.35]);
  const flowerGlow = useTransform(progressValue, [0.8, 1], [0, 1]);

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
    <section ref={sectionRef} className="py-14 px-4 max-w-3xl mx-auto scroll-mt-20">
      <div className="text-center mb-12">
        <span className="text-xs text-[var(--gold-dark,#8a6329)] font-bold tracking-widest uppercase">
          برنامه محفل
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--ruby)] mt-1 font-serif">
          محفل در یک نگاه
        </h2>
        <p className="text-xs md:text-sm text-[var(--ink-muted)] mt-1.5">
          زمان‌بندی برنامه‌های جشن پیوند
        </p>
      </div>

      {/* Timeline Outer Container */}
      <div className="relative dir-rtl pr-8 md:pr-12">
        {/* Background Vertical Line */}
        <div className="absolute top-0 right-3.5 md:right-5 bottom-0 w-1 bg-[var(--gold)]/25 rounded-full" />

        {/* Dynamic Scroll-Filled Line */}
        <motion.div
          style={{ height: lineHeight }}
          className="absolute top-0 right-3.5 md:right-5 w-1 bg-gradient-to-b from-[var(--gold)] via-[var(--ruby)] to-[var(--ruby-deep)] rounded-full origin-top shadow-[0_0_8px_rgba(184,134,63,0.5)]"
        />

        {/* Flower Bud at the top of the line */}
        <div className="absolute -top-3 right-1.5 md:right-3 z-20 flex items-center justify-center">
          <div className="w-5 h-5 rounded-full bg-[var(--paper-white)] border-2 border-[var(--ruby)] flex items-center justify-center shadow-sm">
            <div className="w-2 h-2 rounded-full bg-[var(--ruby)]" />
          </div>
        </div>

        {/* Travelling Realistic Deep-Red Blossom Flower moving down as user scrolls */}
        <motion.div
          style={{
            top: flowerY,
            scale: flowerScale,
          }}
          className="absolute right-[2px] md:right-[8px] -translate-y-1/2 z-30 pointer-events-none"
        >
          <div className="relative flex items-center justify-center w-9 h-9 md:w-11 md:h-11">
            {/* Soft background glow when fully bloomed */}
            <motion.div
              style={{ opacity: flowerGlow }}
              className="absolute inset-0 rounded-full bg-[var(--ruby)]/30 blur-md scale-125"
            />

            {/* Realistic Deep Red Floral Blossom SVG */}
            <svg
              viewBox="0 0 100 100"
              className="w-9 h-9 md:w-11 md:h-11 drop-shadow-[0_4px_8px_rgba(122,28,40,0.45)]"
            >
              <defs>
                <radialGradient id="deepRedGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#A82335" />
                  <stop offset="70%" stopColor="#7A1C28" />
                  <stop offset="100%" stopColor="#4A0E17" />
                </radialGradient>
                <radialGradient id="centerGoldGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFF2B2" />
                  <stop offset="50%" stopColor="#E9C96A" />
                  <stop offset="100%" stopColor="#B8863F" />
                </radialGradient>
              </defs>

              {/* Outer Layer of Rich Velvet Petals */}
              <g>
                {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                  <path
                    key={`outer-${i}`}
                    d="M 50 50 C 35 15, 65 15, 50 50"
                    fill="url(#deepRedGrad)"
                    stroke="#D4AF37"
                    strokeWidth="0.8"
                    transform={`rotate(${angle} 50 50)`}
                  />
                ))}
              </g>

              {/* Inner Staggered Layer of Petals */}
              <g>
                {[30, 90, 150, 210, 270, 330].map((angle, i) => (
                  <path
                    key={`inner-${i}`}
                    d="M 50 50 C 40 25, 60 25, 50 50"
                    fill="url(#deepRedGrad)"
                    stroke="#E9C96A"
                    strokeWidth="0.6"
                    transform={`rotate(${angle} 50 50)`}
                  />
                ))}
              </g>

              {/* Golden Center Stamens */}
              <circle cx="50" cy="50" r="10" fill="url(#centerGoldGrad)" />
              <circle cx="50" cy="50" r="5" fill="#5C101B" />
            </svg>
          </div>
        </motion.div>

        {/* Timeline Items */}
        <div className="space-y-8 md:space-y-10">
          {scheduleEvents.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="relative"
            >
              {/* Timeline Point Marker */}
              <div className="absolute -right-[27px] md:-right-[35px] top-3 z-10 flex items-center justify-center">
                <div
                  className={`w-4 h-4 md:w-5 md:h-5 rounded-full border-2 border-[var(--paper-white)] shadow-md flex items-center justify-center ${
                    item.featured
                      ? "bg-[var(--ruby)] ring-4 ring-[var(--ruby)]/20"
                      : "bg-[var(--gold)]"
                  }`}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--paper-white)]" />
                </div>
              </div>

              {/* Editorial Event Card */}
              <div
                className={`p-5 md:p-6 rounded-2xl border transition-all duration-300 ${
                  item.featured
                    ? "bg-gradient-to-br from-[#fffdf9] via-[var(--paper-white)] to-[#faf4e6] border-[var(--gold)] shadow-md"
                    : "bg-[var(--paper-white)] border-[var(--line)] shadow-sm hover:border-[var(--gold)]/60"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs md:text-sm font-bold text-[var(--ruby)] font-mono flex items-center gap-1.5">
                    {item.icon}
                    <span>{item.time}</span>
                  </span>

                  {item.featured && (
                    <span className="px-3 py-0.5 rounded-full text-[10px] md:text-xs font-bold bg-[var(--ruby)] text-[var(--paper-white)] shadow-sm">
                      لحظهٔ ویژه
                    </span>
                  )}
                </div>

                <h3 className="text-base md:text-lg font-bold text-[var(--ink)]">
                  {item.title}
                </h3>

                <p className="text-xs md:text-sm text-[var(--ink-muted)] mt-1.5 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Final Celebration Marker */}
        <motion.div
          style={{ opacity: flowerGlow }}
          className="mt-8 pt-4 text-center pr-0 flex flex-col items-center justify-center gap-1 text-[var(--gold-dark,#8a6329)]"
        >
          <Sparkle size={20} weight="fill" className="animate-spin text-[var(--gold)]" />
          <span className="text-xs font-bold tracking-wider">آغاز خاطره‌ای جاودان</span>
        </motion.div>
      </div>
    </section>
  );
}

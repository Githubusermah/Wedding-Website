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
  const flowerScale = useTransform(progressValue, [0, 0.3, 1], [0.85, 1.1, 1.3]);
  const petalOpen = useTransform(progressValue, [0, 1], [0, 1]);
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
        <span className="text-xs text-[var(--gold)] font-semibold tracking-widest uppercase">
          برنامه محفل
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--ruby)] mt-1">
          محفل در یک نگاه
        </h2>
        <p className="text-xs md:text-sm text-[var(--ink-muted)] mt-1.5">
          زمان‌بندی برنامه‌های جشن پیوند
        </p>
      </div>

      {/* Timeline Outer Container */}
      <div className="relative dir-rtl pr-8 md:pr-12">
        {/* Background Vertical Gold Line */}
        <div className="absolute top-0 right-3.5 md:right-5 bottom-0 w-1 bg-[var(--gold)]/25 rounded-full" />

        {/* Dynamic Scroll-Filled Gold Line */}
        <motion.div
          style={{ height: lineHeight }}
          className="absolute top-0 right-3.5 md:right-5 w-1 bg-gradient-to-b from-[var(--gold)] via-[var(--ruby)] to-[var(--gold)] rounded-full origin-top shadow-[0_0_8px_rgba(184,134,63,0.6)]"
        />

        {/* Flower Bud at the top of the line */}
        <div className="absolute -top-3 right-1.5 md:right-3 z-20 flex items-center justify-center">
          <div className="w-5 h-5 rounded-full bg-[var(--paper-white)] border-2 border-[var(--gold)] flex items-center justify-center shadow-sm">
            <div className="w-2 h-2 rounded-full bg-[var(--sage)]" />
          </div>
        </div>

        {/* Travelling Blossom Flower moving down as user scrolls */}
        <motion.div
          style={{
            top: flowerY,
            scale: flowerScale,
          }}
          className="absolute right-[2px] md:right-[8px] -translate-y-1/2 z-30 pointer-events-none"
        >
          <div className="relative flex items-center justify-center w-8 h-8 md:w-10 md:h-10">
            {/* Soft background glow when fully bloomed */}
            <motion.div
              style={{ opacity: flowerGlow }}
              className="absolute inset-0 rounded-full bg-[var(--gold)]/30 blur-sm scale-125"
            />

            {/* Blossom SVG Flower */}
            <svg
              viewBox="0 0 40 40"
              className="w-8 h-8 md:w-10 md:h-10 drop-shadow-[0_2px_6px_rgba(122,28,40,0.35)]"
            >
              {/* Outer Petals */}
              <g className="origin-center">
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                  <motion.path
                    key={i}
                    d="M 20 20 C 14 10 26 10 20 20"
                    fill="var(--ruby)"
                    stroke="var(--gold-light, #E9C96A)"
                    strokeWidth="0.8"
                    style={{
                      transformOrigin: "20px 20px",
                      transform: `rotate(${angle}deg) scale(${1 + (i % 2 === 0 ? 0.2 : 0)})`,
                    }}
                  />
                ))}
              </g>

              {/* Inner Petals / Unfolding Layer */}
              <g className="origin-center">
                {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle, i) => (
                  <motion.circle
                    key={i}
                    cx={20 + 7 * Math.cos((angle * Math.PI) / 180)}
                    cy={20 + 7 * Math.sin((angle * Math.PI) / 180)}
                    r="3.5"
                    fill="#D4AF37"
                    opacity="0.9"
                  />
                ))}
              </g>

              {/* Center Stamens */}
              <circle cx="20" cy="20" r="5" fill="var(--paper-white)" stroke="var(--gold)" strokeWidth="1.2" />
              <circle cx="20" cy="20" r="2.5" fill="var(--ruby)" />
            </svg>
          </div>
        </motion.div>

        {/* Timeline Items */}
        <div className="space-y-10 md:space-y-12">
          {scheduleEvents.map((item, index) => {
            // Target progress threshold for this item (0.0 to 1.0)
            const itemThreshold = index / (scheduleEvents.length - 1);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="relative"
              >
                {/* Timeline Point Marker */}
                <div className="absolute -right-[27px] md:-right-[35px] top-2.5 z-10 flex items-center justify-center">
                  <motion.div
                    className={`w-4 h-4 md:w-5 md:h-5 rounded-full border-2 border-[var(--paper-white)] shadow-md transition-colors duration-300 flex items-center justify-center ${
                      item.featured
                        ? "bg-[var(--ruby)] ring-4 ring-[var(--ruby)]/20"
                        : "bg-[var(--gold)]"
                    }`}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--paper-white)]" />
                  </motion.div>
                </div>

                {/* Event Card Content */}
                <div
                  className={`p-5 md:p-6 rounded-2xl border transition-all duration-300 ${
                    item.featured
                      ? "paper-card border-[var(--ruby)]/50 shadow-lg bg-gradient-to-br from-[var(--paper-white)] via-[var(--paper-white)] to-[var(--ivory)]"
                      : "paper-card-inset hover:border-[var(--gold)]/50"
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
            );
          })}
        </div>

        {/* Final Celebration Marker at the bottom */}
        <motion.div
          style={{ opacity: flowerGlow }}
          className="mt-8 pt-4 text-center pr-0 flex flex-col items-center justify-center gap-1 text-[var(--gold)]"
        >
          <Sparkle size={20} weight="fill" className="animate-spin" />
          <span className="text-xs font-bold tracking-wider">آغاز خاطره‌ای جاودان</span>
        </motion.div>
      </div>
    </section>
  );
}

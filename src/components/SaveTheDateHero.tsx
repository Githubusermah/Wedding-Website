"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, Variants } from "motion/react";
import { event } from "@/lib/event";

interface Petal {
  id: number;
  size: number;
  left: number;
  driftX: number;
  duration: number;
  delay: number;
}

function TypewriterText({
  text,
  delay = 0,
  stagger = 0.045,
  className = "",
  dir,
}: {
  text: string;
  delay?: number;
  stagger?: number;
  className?: string;
  dir?: "ltr" | "rtl";
}) {
  const letters = Array.from(text);

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 6, filter: "blur(3px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.18, ease: "easeOut" },
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`inline-flex flex-wrap items-center justify-center ${className}`}
      dir={dir}
    >
      {letters.map((char, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          className="inline-block whitespace-pre"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

export default function SaveTheDateHero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [petals, setPetals] = useState<Petal[]>([]);

  // Generate petals on mount
  useEffect(() => {
    const generatedPetals: Petal[] = [];
    const petalCount = 16;
    for (let i = 0; i < petalCount; i++) {
      generatedPetals.push({
        id: i,
        size: 5 + Math.random() * 7,
        left: Math.random() * 100,
        driftX: Math.random() * 120 - 60,
        duration: 14 + Math.random() * 12,
        delay: Math.random() * 14,
      });
    }
    setPetals(generatedPetals);
  }, []);

  // Sky canvas animation (twinkling stars & shooting stars)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    interface Star {
      x: number;
      y: number;
      r: number;
      phase: number;
      speed: number;
    }

    interface ShootingStar {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      trail: Array<{ x: number; y: number }>;
    }

    let stars: Star[] = [];
    let shootingStars: ShootingStar[] = [];

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      const count = Math.floor((width * height) / 9000);
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height * 0.8,
          r: Math.random() * 1.3 + 0.3,
          phase: Math.random() * Math.PI * 2,
          speed: 0.01 + Math.random() * 0.02,
        });
      }
    };

    window.addEventListener("resize", handleResize);
    initStars();

    const spawnShootingStar = () => {
      const startX = Math.random() * width * 0.7 + width * 0.15;
      const startY = Math.random() * height * 0.25;
      const angle = Math.PI / 4 + (Math.random() * 0.3 - 0.15);
      const speed = 9 + Math.random() * 5;
      shootingStars.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 40 + Math.random() * 20,
        trail: [],
      });
    };

    let frame = 0;
    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // Render static ambient stars
      stars.forEach((s) => {
        s.phase += s.speed;
        const alpha = 0.35 + 0.5 * Math.abs(Math.sin(s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(197, 160, 89, ${alpha * 0.7})`;
        ctx.fill();
      });

      // Spawn shooting stars periodically
      if (frame % 70 === 0 && Math.random() < 0.8) {
        spawnShootingStar();
      }

      // Render shooting stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const st = shootingStars[i];
        st.x += st.vx;
        st.y += st.vy;
        st.life++;
        st.trail.push({ x: st.x, y: st.y });
        if (st.trail.length > 14) st.trail.shift();

        for (let j = 0; j < st.trail.length - 1; j++) {
          const t = j / st.trail.length;
          ctx.beginPath();
          ctx.moveTo(st.trail[j].x, st.trail[j].y);
          ctx.lineTo(st.trail[j + 1].x, st.trail[j + 1].y);
          ctx.strokeStyle = `rgba(216, 189, 138, ${t * 0.8})`;
          ctx.lineWidth = t * 2.2;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(st.x, st.y, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 250, 235, 0.95)";
        ctx.fill();

        if (st.life >= st.maxLife) {
          shootingStars.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="heroSection relative min-h-[100dvh] w-full flex flex-col items-center justify-center py-6 px-4 text-center overflow-hidden z-10">
      {/* Background Sky Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-90"
      />

      {/* Drifting Gold Dust Petals */}
      {petals.map((p) => (
        <div
          key={p.id}
          className="petal"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.left}vw`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            ["--drift-x" as string]: `${p.driftX}px`,
          }}
        />
      ))}

      {/* Hero Content Container (Enforced LTR so English headline reads Left-to-Right) */}
      <div
        dir="ltr"
        className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center space-y-2"
      >
        {/* 1. Eyebrow Line */}
        <div className="eyebrow-wrap">
          <TypewriterText
            text="A MOMENT TO REMEMBER"
            delay={0.2}
            stagger={0.035}
            className="eyebrow"
            dir="ltr"
          />
        </div>

        {/* 2. Main Headline: SAVE the DATE (Enforced LTR flex row so SAVE is left, DATE is right) */}
        <div className="headline flex items-baseline justify-center gap-2 sm:gap-3 my-1" dir="ltr">
          <TypewriterText
            text="SAVE"
            delay={0.8}
            stagger={0.07}
            className="word-save font-playfair text-3xl sm:text-5xl md:text-6xl font-semibold tracking-wider text-[var(--ink)]"
            dir="ltr"
          />

          <motion.span
            initial={{ opacity: 0, scale: 0.6, y: 10, rotate: -6 }}
            whileInView={{ opacity: 1, scale: 1, y: 0, rotate: -3 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
            className="the-script font-tangerine text-4xl sm:text-6xl md:text-7xl text-[var(--gold-dark)] leading-none px-1 relative top-1"
          >
            the
          </motion.span>

          <TypewriterText
            text="DATE"
            delay={1.5}
            stagger={0.07}
            className="word-date font-playfair text-3xl sm:text-5xl md:text-6xl font-semibold tracking-wider text-[var(--ink)]"
            dir="ltr"
          />
        </div>

        {/* 3. Subtitle */}
        <div className="mt-1">
          <TypewriterText
            text="FOR THE WEDDING OF"
            delay={1.9}
            stagger={0.035}
            className="subtitle font-playfair text-xs sm:text-sm tracking-[0.28em] text-[var(--ink-muted)] font-medium"
            dir="ltr"
          />
        </div>

        {/* 4. Couple Names */}
        <div className="names flex items-center justify-center gap-3 sm:gap-4 my-2" dir="ltr">
          <TypewriterText
            text={event.groomNameEn.toUpperCase()}
            delay={2.4}
            stagger={0.06}
            className="groom-name font-playfair text-base sm:text-xl md:text-2xl tracking-[0.14em] text-[var(--ink)] font-semibold"
            dir="ltr"
          />

          <motion.span
            initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -6 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 2.8, ease: "backOut" }}
            className="amp font-tangerine text-4xl sm:text-5xl md:text-6xl text-[var(--oxblood,#7a1c28)] leading-none"
          >
            &amp;
          </motion.span>

          <TypewriterText
            text={event.brideNameEn.toUpperCase()}
            delay={3.0}
            stagger={0.06}
            className="bride-name font-playfair text-base sm:text-xl md:text-2xl tracking-[0.14em] text-[var(--ink)] font-semibold"
            dir="ltr"
          />
        </div>

        {/* 5. Palace Watercolor Illustration with Animated Unblur and Crescent Circle Reveal */}
        <div className="illustration-wrap relative flex justify-center items-center my-3 w-full max-w-2xl mx-auto">
          {/* Ambient Glow Halo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 3.5 }}
            className="halo absolute inset-0 -m-6 z-0 rounded-full bg-[radial-gradient(circle_at_50%_45%,rgba(233,201,106,0.38)_0%,rgba(233,201,106,0.08)_50%,transparent_70%)] blur-xl pointer-events-none"
          />

          {/* Unblurring & Circle Clip Revealing Venue Photo */}
          <motion.div
            initial={{
              opacity: 0,
              filter: "blur(20px) brightness(1.2) saturate(0.4)",
              clipPath: "circle(6% at 50% 50%)",
              scale: 0.92,
            }}
            whileInView={{
              opacity: 1,
              filter: "blur(0px) brightness(1) saturate(1)",
              clipPath: "circle(80% at 50% 50%)",
              scale: 1,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 2.2,
              delay: 3.6,
              ease: "easeOut",
            }}
            className="relative z-10 w-full"
          >
            <Image
              src="/venue/herosectionweddingvenue.png"
              alt="Palace illustration of City Star Wedding Hall"
              width={720}
              height={520}
              priority
              className="venue-img w-full h-auto max-w-[720px] max-h-[52vh] object-contain mx-auto drop-shadow-[0_12px_28px_rgba(197,160,89,0.3)]"
            />
          </motion.div>

          {/* Sparkle Points */}
          <div className="sparkle-pt sp1"></div>
          <div className="sparkle-pt sp2"></div>
          <div className="sparkle-pt sp3"></div>
          <div className="sparkle-pt sp4"></div>
          <div className="sparkle-pt sp5"></div>
        </div>

        {/* 6. Venue Caption + Expanding Rule */}
        <div className="venue-caption-wrap flex flex-col items-center justify-center space-y-1 mt-1">
          <TypewriterText
            text={event.venueNameEn.toUpperCase()}
            delay={5.2}
            stagger={0.035}
            className="venue-caption font-playfair text-xs sm:text-sm tracking-[0.28em] text-[var(--gold-dark)] font-bold uppercase"
            dir="ltr"
          />

          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: "55%", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, delay: 6.0, ease: "easeOut" }}
            className="h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent mt-2"
          />
        </div>

        {/* 7. Divider Star */}
        <motion.div
          initial={{ opacity: 0, scale: 0.4, rotate: -45 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 6.3 }}
          className="divider flex items-center justify-center gap-3 text-[var(--gold)] my-2"
        >
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-[var(--gold)]" />
          <span className="text-sm">&#10022;</span>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-[var(--gold)]" />
        </motion.div>

        {/* 8. Gregorian Date Line */}
        <div>
          <TypewriterText
            text={event.invitationDateGregorian}
            delay={6.5}
            stagger={0.04}
            className="date-line font-playfair text-lg sm:text-2xl text-[var(--ink)] tracking-wider font-medium"
            dir="ltr"
          />
        </div>

        {/* 9. Dari Date Line */}
        <div className="pt-1">
          <TypewriterText
            text={event.invitationDateFa}
            delay={7.2}
            stagger={0.05}
            className="dari-date font-noto-naskh text-sm sm:text-lg text-[var(--ink-muted)] font-medium"
            dir="rtl"
          />
        </div>
      </div>

      {/* Four Viewport Corner Brackets */}
      <div className="site-corner sc-tl" />
      <div className="site-corner sc-tr" />
      <div className="site-corner sc-bl" />
      <div className="site-corner sc-br" />

      {/* Scoped CSS for Keyframes and Timings */}
      <style jsx global>{`
        :root {
          --ivory: #faf5e8;
          --ivory-deep: #f1e8d4;
          --ink: #241d17;
          --ink-soft: #6b5f4f;
          --gold: #b8863f;
          --gold-light: #e9c96a;
          --gold-dark: #8a6329;
          --oxblood: #7a1c28;
        }

        /* Viewport Corner Brackets */
        .site-corner {
          position: fixed;
          width: 56px;
          height: 56px;
          border: 1.5px solid var(--gold);
          z-index: 25;
          opacity: 0;
          pointer-events: none;
          animation: siteCornerIn 1.2s ease-out 0.4s forwards;
        }
        .site-corner.sc-tl {
          top: 16px;
          left: 16px;
          border-right: none;
          border-bottom: none;
        }
        .site-corner.sc-tr {
          top: 16px;
          right: 16px;
          border-left: none;
          border-bottom: none;
        }
        .site-corner.sc-bl {
          bottom: 16px;
          left: 16px;
          border-right: none;
          border-top: none;
        }
        .site-corner.sc-br {
          bottom: 16px;
          right: 16px;
          border-left: none;
          border-top: none;
        }
        @keyframes siteCornerIn {
          to {
            opacity: 0.85;
          }
        }

        /* Drifting Petals */
        .petal {
          position: fixed;
          top: -5%;
          z-index: 1;
          border-radius: 50% 0 50% 50%;
          background: linear-gradient(135deg, var(--gold-light), var(--gold));
          opacity: 0.55;
          pointer-events: none;
          animation-name: drift;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @keyframes drift {
          0% {
            transform: translateY(-10vh) translateX(0) rotate(0deg);
            opacity: 0;
          }
          8% {
            opacity: 0.6;
          }
          92% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(110vh) translateX(var(--drift-x, 40px)) rotate(340deg);
            opacity: 0;
          }
        }

        /* Sparkle Points */
        .sparkle-pt {
          position: absolute;
          z-index: 20;
          width: 6px;
          height: 6px;
          background: var(--gold-light);
          border-radius: 50%;
          box-shadow: 0 0 6px 2px rgba(233, 201, 106, 0.7);
          opacity: 0;
          animation: sparkleTwinkle 3s ease-in-out infinite;
        }
        @keyframes sparkleTwinkle {
          0%,
          100% {
            opacity: 0;
            transform: scale(0.5);
          }
          50% {
            opacity: 1;
            transform: scale(1.3);
          }
        }
        .sp1 {
          top: 8%;
          left: 49%;
          animation-delay: 4.8s;
        }
        .sp2 {
          top: 22%;
          left: 27%;
          animation-delay: 5.2s;
        }
        .sp3 {
          top: 22%;
          left: 71%;
          animation-delay: 5.6s;
        }
        .sp4 {
          top: 40%;
          left: 14%;
          animation-delay: 6.0s;
        }
        .sp5 {
          top: 40%;
          left: 85%;
          animation-delay: 6.4s;
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
          }
          .site-corner {
            opacity: 1 !important;
          }
        }
      `}</style>
    </section>
  );
}

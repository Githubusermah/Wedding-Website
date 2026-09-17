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

interface SaveTheDateHeroProps {
  isStarted?: boolean;
}

const PETAL_COUNT = 10; // was 16 — fewer concurrent CSS animations on low-power devices

function isArabicOrPersian(str: string) {
  return /[\u0600-\u06FF]/.test(str);
}

/** Safe accessor so a missing/undefined event field can never crash the render. */
function safeText(value: unknown, fallback = ""): string {
  return typeof value === "string" && value.length > 0 ? value : fallback;
}

function TypewriterText({
  text,
  delay = 0,
  stagger = 0.08,
  className = "",
  dir,
  isStarted = true,
}: {
  text: string;
  delay?: number;
  stagger?: number;
  className?: string;
  dir?: "ltr" | "rtl";
  isStarted?: boolean;
}) {
  if (!text) return null;

  const isPersian = isArabicOrPersian(text);
  const words = text.split(" ");

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 8, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.35, ease: "easeOut" },
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      animate={isStarted ? "visible" : "hidden"}
      className={`inline-flex flex-wrap items-center justify-center gap-[0.35em] ${className}`}
      dir={dir || (isPersian ? "rtl" : "ltr")}
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          variants={wordVariants}
          className="inline-block whitespace-nowrap"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

export default function SaveTheDateHero({ isStarted = true }: SaveTheDateHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [petals, setPetals] = useState<Petal[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Defensive reads — a missing field in event.ts can no longer throw during render.
  const groomName = safeText(event?.groomNameEn).toUpperCase();
  const brideName = safeText(event?.brideNameEn).toUpperCase();
  const venueName = safeText(event?.venueNameEn).toUpperCase();
  const dateGregorian = safeText(event?.invitationDateGregorian);
  const dateFa = safeText(event?.invitationDateFa);

  // Initialize and handle reduced motion / petal generation on client mount
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setReducedMotion(true);
    } else {
      setPetals(
        Array.from({ length: PETAL_COUNT }, (_, i) => ({
          id: i,
          size: 5 + Math.random() * 7,
          left: Math.random() * 100,
          driftX: Math.random() * 120 - 60,
          duration: 14 + Math.random() * 12,
          delay: Math.random() * 14,
        }))
      );
    }

    const handler = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
      if (e.matches) {
        setPetals([]);
      } else {
        setPetals(
          Array.from({ length: PETAL_COUNT }, (_, i) => ({
            id: i,
            size: 5 + Math.random() * 7,
            left: Math.random() * 100,
            driftX: Math.random() * 120 - 60,
            duration: 14 + Math.random() * 12,
            delay: Math.random() * 14,
          }))
        );
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Sky canvas animation (twinkling stars & shooting stars)
  useEffect(() => {
    if (reducedMotion) return; // don't even start the rAF loop
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
    const shootingStars: ShootingStar[] = [];

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      // Cap star count so very large/high-DPR mobile viewports don't spawn
      // an unbounded number of particles.
      const count = Math.min(180, Math.floor((width * height) / 9000));
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

      stars.forEach((s) => {
        s.phase += s.speed;
        const alpha = 0.35 + 0.5 * Math.abs(Math.sin(s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(115, 150, 124, ${alpha * 0.7})`;
        ctx.fill();
      });

      if (frame % 70 === 0 && Math.random() < 0.8) {
        spawnShootingStar();
      }

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
          ctx.strokeStyle = `rgba(157, 184, 163, ${t * 0.8})`;
          ctx.lineWidth = t * 2.2;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(st.x, st.y, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(245, 252, 247, 0.95)";
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
  }, [reducedMotion]);

  return (
    <section className="heroSection relative min-h-[100dvh] w-full flex flex-col items-center justify-center py-6 px-4 text-center overflow-hidden z-10">
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-90"
      />

      {petals.map((p) => (
        <div
          key={p.id}
          aria-hidden="true"
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

      <div
        dir="ltr"
        className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center space-y-2"
      >
        {/* 1. Eyebrow Line */}
        <div className="eyebrow-wrap">
          <TypewriterText
            text="A MOMENT TO REMEMBER"
            delay={0.1}
            stagger={0.06}
            isStarted={isStarted}
            className="eyebrow font-cinzel text-xs sm:text-sm tracking-[0.3em] font-bold text-[var(--gold-dark)] uppercase"
            dir="ltr"
          />
        </div>

        {/* 2. Main Headline: SAVE the DATE */}
        <div className="headline flex items-baseline justify-center gap-2 sm:gap-3 my-1" dir="ltr">
          <TypewriterText
            text="SAVE"
            delay={0.4}
            stagger={0.08}
            isStarted={isStarted}
            className="word-save font-cinzel text-3xl sm:text-5xl md:text-6xl font-bold tracking-widest text-[var(--ink)]"
            dir="ltr"
          />

          <motion.span
            initial={{
              opacity: 0,
              scale: 0.7,
              clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
              y: 4,
              rotate: -4,
            }}
            animate={
              isStarted
                ? {
                    opacity: 1,
                    scale: 1,
                    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                    y: 0,
                    rotate: -2,
                  }
                : { opacity: 0, scale: 0.7 }
            }
            transition={{ duration: 0.9, delay: 0.7, ease: "easeInOut" }}
            className="the-script font-alex-brush text-3xl sm:text-5xl md:text-6xl text-[var(--gold-dark)] relative -top-1 px-1 sm:px-2 inline-block leading-none select-none"
          >
            the
          </motion.span>

          <TypewriterText
            text="DATE"
            delay={1.1}
            stagger={0.08}
            isStarted={isStarted}
            className="word-date font-cinzel text-3xl sm:text-5xl md:text-6xl font-bold tracking-widest text-[var(--ink)]"
            dir="ltr"
          />
        </div>

        {/* 3. Subtitle */}
        <div className="mt-1">
          <TypewriterText
            text="FOR THE WEDDING OF"
            delay={1.4}
            stagger={0.06}
            isStarted={isStarted}
            className="subtitle font-cinzel text-xs sm:text-sm tracking-[0.28em] text-[var(--ink-muted)] font-semibold"
            dir="ltr"
          />
        </div>

        {/* 4. Couple Names */}
        <div className="names flex items-center justify-center gap-3 sm:gap-4 my-2" dir="ltr">
          <TypewriterText
            text={groomName}
            delay={1.7}
            stagger={0.08}
            isStarted={isStarted}
            className="groom-name font-cinzel text-base sm:text-xl md:text-2xl tracking-[0.16em] text-[var(--ink)] font-bold"
            dir="ltr"
          />

          <motion.span
            initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
            animate={isStarted ? { opacity: 1, scale: 1, rotate: -4 } : { opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.6, delay: 2.0, ease: "backOut" }}
            className="amp font-alex-brush text-3xl sm:text-4xl md:text-5xl text-[var(--oxblood,#7a1c28)] leading-none"
          >
            &amp;
          </motion.span>

          <TypewriterText
            text={brideName}
            delay={2.2}
            stagger={0.08}
            isStarted={isStarted}
            className="bride-name font-cinzel text-base sm:text-xl md:text-2xl tracking-[0.16em] text-[var(--ink)] font-bold"
            dir="ltr"
          />
        </div>

        {/* 5. Palace Illustration — simplified reveal.
            NOTE: the previous version animated `filter: blur()` and
            `clip-path: circle()` on this image AT THE SAME TIME. That
            combination is a known cause of the WebKit compositor giving up
            on iOS Safari (renders as a blank/frozen page), while desktop
            Chromium tolerates it fine — which matches "works on my laptop,
            fails on iPhone" exactly. Now only one GPU-heavy property
            (clip-path) animates; the blur/brightness/saturate stack is gone
            in favor of a plain opacity+scale fade. */}
        <div className="illustration-wrap relative flex justify-center items-center my-3 w-full max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isStarted ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 1.5, delay: 2.4 }}
            aria-hidden="true"
            className="halo absolute inset-0 -m-6 z-0 rounded-full bg-[radial-gradient(circle_at_50%_45%,rgba(157,184,163,0.38)_0%,rgba(115,150,124,0.08)_50%,transparent_70%)] blur-xl pointer-events-none"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 10 }}
            animate={
              isStarted
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 0, scale: 0.92, y: 10 }
            }
            transition={{
              duration: 1.2,
              delay: 2.5,
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
              sizes="(max-width: 768px) 90vw, 720px"
              className="venue-img w-full h-auto max-w-[720px] max-h-[52vh] object-contain mx-auto drop-shadow-[0_12px_28px_rgba(197,160,89,0.3)]"
            />
          </motion.div>

          <div className="sparkle-pt sp1" aria-hidden="true" />
          <div className="sparkle-pt sp2" aria-hidden="true" />
          <div className="sparkle-pt sp3" aria-hidden="true" />
          <div className="sparkle-pt sp4" aria-hidden="true" />
          <div className="sparkle-pt sp5" aria-hidden="true" />
        </div>

        {/* 6. Venue Caption + Expanding Rule */}
        <div className="venue-caption-wrap flex flex-col items-center justify-center space-y-1 mt-1">
          <TypewriterText
            text={venueName}
            delay={3.8}
            stagger={0.06}
            isStarted={isStarted}
            className="venue-caption font-cinzel text-xs sm:text-sm tracking-[0.28em] text-[var(--gold-dark)] font-bold uppercase"
            dir="ltr"
          />

          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={isStarted ? { width: "55%", opacity: 1 } : { width: 0, opacity: 0 }}
            transition={{ duration: 1.0, delay: 4.2, ease: "easeOut" }}
            className="h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent mt-2"
          />
        </div>

        {/* 7. Divider Star */}
        <motion.div
          initial={{ opacity: 0, scale: 0.4, rotate: -45 }}
          animate={isStarted ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.4 }}
          transition={{ duration: 0.6, delay: 4.3 }}
          aria-hidden="true"
          className="divider flex items-center justify-center gap-3 text-[var(--gold)] my-2"
        >
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-[var(--gold)]" />
          <span className="text-sm">&#10022;</span>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-[var(--gold)]" />
        </motion.div>

        {/* 8. Gregorian Date Line */}
        <div>
          <TypewriterText
            text={dateGregorian}
            delay={4.5}
            stagger={0.06}
            isStarted={isStarted}
            className="date-line font-cinzel text-lg sm:text-2xl text-[var(--ink)] tracking-wider font-semibold"
            dir="ltr"
          />
        </div>

        {/* 9. Dari Date Line */}
        <div className="pt-1">
          <TypewriterText
            text={dateFa}
            delay={4.8}
            stagger={0.08}
            isStarted={isStarted}
            className="dari-date font-noto-naskh text-sm sm:text-lg text-[var(--ink-muted)] font-medium"
            dir="rtl"
          />
        </div>
      </div>

      <div className="site-corner sc-tl" aria-hidden="true" />
      <div className="site-corner sc-tr" aria-hidden="true" />
      <div className="site-corner sc-bl" aria-hidden="true" />
      <div className="site-corner sc-br" aria-hidden="true" />

      <style jsx global>{`
        :root {
          --ivory: #F5F7F4;
          --ivory-deep: #E8EFE8;
          --ink: #2C2621;
          --ink-soft: #5D665E;
          --gold: #73967C;
          --gold-light: #9DBA9F;
          --gold-dark: #4A6E53;
          --oxblood: #4A6E53;
        }

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
          will-change: transform;
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

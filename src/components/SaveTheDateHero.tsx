"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
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

const PETAL_COUNT = 10;

function isArabicOrPersian(str: string) {
  return /[\u0600-\u06FF]/.test(str);
}

/** Safe accessor so a missing/undefined event field can never crash the render. */
function safeText(value: unknown, fallback = ""): string {
  return typeof value === "string" && value.length > 0 ? value : fallback;
}

function toTitleCase(str: string): string {
  if (!str) return "";
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * RealtimeWriteText component:
 * Animates text character-by-character (for English) or word-by-word (for Persian/Arabic)
 * to give an authentic real-time ink writing/typewriter effect when video ends.
 */
function RealtimeWriteText({
  text,
  delay = 0,
  charSpeed = 45,
  className = "",
  dir,
  isStarted = true,
  showCursor = true,
}: {
  text: string;
  delay?: number; // in seconds
  charSpeed?: number; // ms per character
  className?: string;
  dir?: "ltr" | "rtl";
  isStarted?: boolean;
  showCursor?: boolean;
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (!isStarted || !text) {
      setDisplayedText("");
      setIsTyping(false);
      return;
    }

    const isPersian = isArabicOrPersian(text);
    let interval: NodeJS.Timeout;

    const timer = setTimeout(() => {
      setIsTyping(true);

      if (isPersian) {
        // Persian/Arabic: reveal word-by-word to preserve OpenType ligatures & glyph shaping
        const words = text.split(" ");
        let wordIndex = 0;

        interval = setInterval(() => {
          wordIndex++;
          setDisplayedText(words.slice(0, wordIndex).join(" "));
          if (wordIndex >= words.length) {
            clearInterval(interval);
            setIsTyping(false);
          }
        }, charSpeed * 2.5);
      } else {
        // English: character-by-character real time typewriter writing
        let charIndex = 0;

        interval = setInterval(() => {
          charIndex++;
          setDisplayedText(text.slice(0, charIndex));
          if (charIndex >= text.length) {
            clearInterval(interval);
            setIsTyping(false);
          }
        }, charSpeed);
      }
    }, delay * 1000);

    return () => {
      clearTimeout(timer);
      if (interval) clearInterval(interval);
    };
  }, [text, delay, charSpeed, isStarted]);
  /* eslint-enable react-hooks/set-state-in-effect */

  if (!text) return null;

  const isPersian = isArabicOrPersian(text);

  return (
    <span
      className={`inline-flex items-baseline justify-center transition-opacity duration-300 ${
        displayedText ? "opacity-100" : "opacity-0"
      } ${className}`}
      dir={dir || (isPersian ? "rtl" : "ltr")}
    >
      <span>{displayedText}</span>
      {showCursor && isTyping && (
        <span className="inline-block w-[2px] h-[0.75em] bg-[var(--gold)] animate-pulse ml-0.5 align-baseline self-center" />
      )}
    </span>
  );
}

export default function SaveTheDateHero({ isStarted = true }: SaveTheDateHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [petals, setPetals] = useState<Petal[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Defensive reads
  const groomNameRaw = safeText(event?.groomNameEn, "FARHAD");
  const brideNameRaw = safeText(event?.brideNameEn, "ADEEBA");
  const groomName = toTitleCase(groomNameRaw);
  const brideName = toTitleCase(brideNameRaw);

  const venueName = safeText(event?.venueNameEn, "Sulaiman Wedding Hall").toUpperCase();
  const dateGregorian = safeText(event?.invitationDateGregorian, "13 October 2026");
  const dateFa = safeText(event?.invitationDateFa, "دوشنبه، ۱۳ میزان ۱۴۰۵");

  // Initialize petals and handle reduced motion
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches || !isStarted) {
      setReducedMotion(true);
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

    const handler = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
      if (e.matches || !isStarted) {
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
  }, [isStarted]);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Sky canvas animation
  useEffect(() => {
    if (!isStarted || reducedMotion) return;
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
        ctx.fillStyle = `rgba(95, 125, 100, ${alpha * 0.7})`;
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
          ctx.strokeStyle = `rgba(126, 159, 131, ${t * 0.8})`;
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
  }, [isStarted, reducedMotion]);

  return (
    <section className="heroSection relative min-h-[100dvh] w-full flex flex-col items-center justify-center py-6 sm:py-10 px-4 text-center overflow-hidden z-10">
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
        className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center space-y-2 sm:space-y-3"
      >
        {/* 1. Eyebrow Line */}
        <div className="eyebrow-wrap my-0.5">
          <RealtimeWriteText
            text="A MOMENT TO REMEMBER"
            delay={0.1}
            charSpeed={35}
            isStarted={isStarted}
            className="eyebrow font-cinzel text-xs sm:text-sm tracking-[0.22em] sm:tracking-[0.32em] font-bold text-[var(--gold-dark)] uppercase"
            dir="ltr"
          />
        </div>

        {/* 2. Main Headline: SAVE the DATE */}
        <div className="headline flex items-baseline justify-center gap-2 sm:gap-3.5 my-1" dir="ltr">
          <RealtimeWriteText
            text="SAVE"
            delay={0.6}
            charSpeed={60}
            isStarted={isStarted}
            className="word-save font-cinzel text-4xl sm:text-6xl md:text-7xl font-bold tracking-widest text-[var(--ink)]"
            dir="ltr"
          />

          <motion.span
            initial={{ opacity: 0, scale: 0.6, y: 4, rotate: -6 }}
            animate={
              isStarted
                ? { opacity: 1, scale: 1, y: 0, rotate: -2 }
                : { opacity: 0, scale: 0.6 }
            }
            transition={{ duration: 0.7, delay: 1.1, ease: "easeOut" }}
            className="the-script font-alex-brush text-4xl sm:text-6xl md:text-7xl text-[var(--gold-dark)] relative -top-1 px-1 sm:px-2 inline-block leading-none select-none"
          >
            the
          </motion.span>

          <RealtimeWriteText
            text="DATE"
            delay={1.4}
            charSpeed={60}
            isStarted={isStarted}
            className="word-date font-cinzel text-4xl sm:text-6xl md:text-7xl font-bold tracking-widest text-[var(--ink)]"
            dir="ltr"
          />
        </div>

        {/* 3. Subtitle */}
        <div className="my-0.5">
          <RealtimeWriteText
            text="FOR THE WEDDING OF"
            delay={1.9}
            charSpeed={35}
            isStarted={isStarted}
            className="subtitle font-cinzel text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] text-[var(--ink-muted)] font-semibold"
            dir="ltr"
          />
        </div>

        {/* 4. Couple Names (Upgraded to Cormorant Garamond for supreme legibility & luxury look) */}
        <div className="names flex flex-wrap items-center justify-center gap-2 sm:gap-5 my-1 sm:my-3" dir="ltr">
          <RealtimeWriteText
            text={groomName}
            delay={2.4}
            charSpeed={50}
            isStarted={isStarted}
            className="groom-name font-cormorant font-bold italic text-3xl sm:text-5xl md:text-6xl tracking-wide text-[var(--ink)] drop-shadow-xs"
            dir="ltr"
          />

          <motion.span
            initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
            animate={isStarted ? { opacity: 1, scale: 1, rotate: -4 } : { opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5, delay: 2.9, ease: "backOut" }}
            className="amp font-cormorant font-normal italic text-3xl sm:text-5xl md:text-6xl text-[var(--gold-dark)] px-1 leading-none select-none"
          >
            &amp;
          </motion.span>

          <RealtimeWriteText
            text={brideName}
            delay={3.2}
            charSpeed={50}
            isStarted={isStarted}
            className="bride-name font-cormorant font-bold italic text-3xl sm:text-5xl md:text-6xl tracking-wide text-[var(--ink)] drop-shadow-xs"
            dir="ltr"
          />
        </div>

        {/* 5. Palace Illustration */}
        <div className="illustration-wrap relative flex justify-center items-center my-2 sm:my-4 w-full max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isStarted ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 1.4, delay: 3.7 }}
            aria-hidden="true"
            className="halo absolute inset-0 -m-6 z-0 rounded-full bg-[radial-gradient(circle_at_50%_45%,rgba(126,159,131,0.25)_0%,rgba(95,125,100,0.08)_50%,transparent_70%)] blur-xl pointer-events-none"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={
              isStarted
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 0, scale: 0.92, y: 12 }
            }
            transition={{
              duration: 1.2,
              delay: 3.8,
              ease: "easeOut",
            }}
            className="relative z-10 w-full"
          >
            <Image
              src="/venue/variation1weddinghero.png"
              alt="Illustration of Sulaiman Wedding Hall"
              width={720}
              height={520}
              sizes="(max-width: 768px) 90vw, 720px"
              className="venue-img w-full h-auto max-w-[720px] max-h-[35vh] sm:max-h-[50vh] object-contain mx-auto drop-shadow-[0_12px_28px_rgba(95,125,100,0.22)]"
            />
          </motion.div>

          <div className="sparkle-pt sp1" aria-hidden="true" />
          <div className="sparkle-pt sp2" aria-hidden="true" />
          <div className="sparkle-pt sp3" aria-hidden="true" />
          <div className="sparkle-pt sp4" aria-hidden="true" />
          <div className="sparkle-pt sp5" aria-hidden="true" />
        </div>

        {/* 6. Venue Caption */}
        <div className="venue-caption-wrap flex flex-col items-center justify-center space-y-0.5 -mt-2 sm:mt-1">
          <RealtimeWriteText
            text={venueName}
            delay={4.4}
            charSpeed={40}
            isStarted={isStarted}
            className="venue-caption font-cinzel text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] text-[var(--gold-dark)] font-bold uppercase"
            dir="ltr"
          />
        </div>

        {/* 7. Divider Star */}
        <motion.div
          initial={{ opacity: 0, scale: 0.4, rotate: -45 }}
          animate={isStarted ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.4 }}
          transition={{ duration: 0.5, delay: 5.0 }}
          aria-hidden="true"
          className="divider flex items-center justify-center gap-2 text-[var(--gold)] my-1 sm:my-2 text-xs sm:text-sm"
        >
          <span>✦</span>
        </motion.div>

        {/* 8. Gregorian Date Line */}
        <div>
          <RealtimeWriteText
            text={dateGregorian}
            delay={5.3}
            charSpeed={45}
            isStarted={isStarted}
            className="date-line font-cinzel text-base sm:text-2xl text-[var(--ink)] tracking-wider font-semibold"
            dir="ltr"
          />
        </div>

        {/* 9. Dari Date Line */}
        <div className="pt-0.5">
          <RealtimeWriteText
            text={dateFa}
            delay={5.9}
            charSpeed={50}
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
          --ivory: #FFFFFF;
          --ivory-deep: #F7F9F7;
          --ink: #202922;
          --ink-soft: #566459;
          --gold: #5F7D64;
          --gold-light: #7E9F83;
          --gold-dark: #3F5844;
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
          box-shadow: 0 0 6px 2px rgba(126, 159, 131, 0.7);
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

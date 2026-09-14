"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { event } from "@/lib/event";

interface Petal {
  id: number;
  size: number;
  left: number;
  driftX: number;
  duration: number;
  delay: number;
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

      {/* Hero Content Container (Unboxed, direct flex layout) */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center space-y-1 sm:space-y-2">
        {/* Eyebrow Line */}
        <div className="eyebrow-wrap">
          <span className="eyebrow">A MOMENT TO REMEMBER</span>
        </div>

        {/* Headline: SAVE the DATE */}
        <div className="headline">
          <span className="word save">
            <span>SAVE</span>
          </span>
          <span className="the-script">the</span>
          <span className="word date">
            <span>DATE</span>
          </span>
        </div>

        {/* Subtitle */}
        <p className="subtitle">FOR THE WEDDING OF</p>

        {/* Couple Names */}
        <div className="names">
          <span className="name groom">{event.groomNameEn}</span>
          <span className="amp">&amp;</span>
          <span className="name bride">{event.brideNameEn}</span>
        </div>

        {/* Palace Watercolor Illustration + Crescent-Arc Frame */}
        <div className="illustration-wrap">
          <div className="halo"></div>
          <Image
            src="/venue/herosectionweddingvenue.png"
            alt="Palace illustration of Taj Continental framed by crescent arcs"
            width={720}
            height={520}
            priority
            className="venue-img"
          />
          {/* Sparkle Points */}
          <div className="sparkle-pt sp1"></div>
          <div className="sparkle-pt sp2"></div>
          <div className="sparkle-pt sp3"></div>
          <div className="sparkle-pt sp4"></div>
          <div className="sparkle-pt sp5"></div>
        </div>

        {/* Venue Caption + Rule */}
        <div className="venue-caption-wrap">
          <span className="venue-caption">{event.venueNameEn}</span>
        </div>
        <div className="venue-caption-rule"></div>

        {/* Divider */}
        <div className="divider">
          <span>&#10022;</span>
        </div>

        {/* Dates */}
        <p className="date-line">{event.invitationDateGregorian}</p>
        <p className="dari-date">{event.invitationDateFa}</p>
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

        /* Eyebrow Line */
        .eyebrow-wrap {
          overflow: hidden;
          white-space: nowrap;
          width: 0;
          margin: 0 auto 0.4rem;
          animation: typeReveal 1.1s steps(24, end) 0.6s forwards;
        }
        @keyframes typeReveal {
          to {
            width: 100%;
          }
        }

        .eyebrow {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: clamp(0.68rem, 1.6vw, 0.85rem);
          letter-spacing: 0.32em;
          color: var(--gold-dark);
          font-weight: 600;
          white-space: nowrap;
        }

        /* Headline Block */
        .headline {
          position: relative;
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-bottom: 0.1rem;
        }

        .word {
          display: inline-block;
          overflow: hidden;
        }

        .word span {
          display: inline-block;
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: clamp(2.2rem, 7vw, 3.2rem);
          letter-spacing: 0.06em;
          color: var(--ink);
          transform: translateY(115%);
          animation: riseUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }

        .word.save span {
          animation-delay: 1.5s;
        }
        .word.date span {
          animation-delay: 2.05s;
        }

        @keyframes riseUp {
          to {
            transform: translateY(0);
          }
        }

        .the-script {
          font-family: var(--font-tangerine), 'Tangerine', cursive;
          font-size: clamp(3rem, 9.5vw, 4.6rem);
          color: var(--gold-dark);
          line-height: 1;
          display: inline-block;
          opacity: 0;
          transform: translateY(10px) rotate(-3deg);
          animation: scriptIn 1s ease-out 1.9s forwards;
          position: relative;
          top: 0.35rem;
        }
        @keyframes scriptIn {
          to {
            opacity: 1;
            transform: translateY(0) rotate(-3deg);
          }
        }

        /* Subtitle */
        .subtitle {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: clamp(0.72rem, 1.7vw, 0.88rem);
          letter-spacing: 0.28em;
          color: var(--ink-muted);
          font-weight: 500;
          margin: 0.5rem 0 0.5rem;
          opacity: 0;
          animation: fadeUp 0.9s ease-out 2.6s forwards;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Couple Names */
        .names {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 0.4rem;
        }

        .name {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: clamp(1rem, 2.4vw, 1.25rem);
          letter-spacing: 0.14em;
          color: var(--ink);
          opacity: 0;
          animation: fadeUp 0.9s ease-out 3.0s forwards;
        }
        .name.bride {
          animation-delay: 3.25s;
        }

        .amp {
          font-family: var(--font-tangerine), 'Tangerine', cursive;
          font-size: clamp(2.8rem, 7vw, 3.8rem);
          color: var(--oxblood);
          line-height: 0.6;
          opacity: 0;
          transform: scale(0.7) rotate(-6deg);
          animation: ampPop 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 3.55s forwards;
        }
        @keyframes ampPop {
          to {
            opacity: 1;
            transform: scale(1) rotate(-6deg);
          }
        }

        /* Palace Illustration + Crescent-Arc Frame */
        .illustration-wrap {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0.4rem auto 0.2rem;
          width: 100%;
          opacity: 0;
          animation: fadeUp 0.8s ease-out 3.9s forwards;
        }

        .halo {
          position: absolute;
          inset: -8%;
          z-index: 0;
          background: radial-gradient(
            circle at 50% 42%,
            rgba(233, 201, 106, 0.35) 0%,
            rgba(233, 201, 106, 0.08) 45%,
            transparent 70%
          );
          filter: blur(8px);
          opacity: 0;
          animation: haloIn 2s ease-out 4.2s forwards, haloPulse 5s ease-in-out 6.2s infinite;
        }
        @keyframes haloIn {
          to {
            opacity: 1;
          }
        }
        @keyframes haloPulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.75;
          }
          50% {
            transform: scale(1.08);
            opacity: 1;
          }
        }

        .venue-img {
          position: relative;
          z-index: 1;
          display: block;
          width: 100%;
          height: auto;
          max-width: min(90vw, 720px);
          max-height: 56vh;
          object-fit: contain;
          margin: 0 auto;
          filter: blur(16px) saturate(0.5) brightness(1.1);
          clip-path: circle(4% at 50% 46%);
          animation: venueReveal 2.6s cubic-bezier(0.22, 0.9, 0.3, 1) 4.3s forwards,
            venueDevelop 2.2s ease-out 4.3s forwards,
            venueFloat 7s ease-in-out 6.9s infinite;
        }
        @keyframes venueReveal {
          to {
            clip-path: circle(75% at 50% 46%);
          }
        }
        @keyframes venueDevelop {
          to {
            filter: blur(0px) saturate(1) brightness(1);
          }
        }
        @keyframes venueFloat {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-7px);
          }
        }

        /* Sparkle Points */
        .sparkle-pt {
          position: absolute;
          z-index: 2;
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
          animation-delay: 6.8s;
        }
        .sp2 {
          top: 22%;
          left: 27%;
          animation-delay: 7.2s;
        }
        .sp3 {
          top: 22%;
          left: 71%;
          animation-delay: 7.6s;
        }
        .sp4 {
          top: 40%;
          left: 14%;
          animation-delay: 8.0s;
        }
        .sp5 {
          top: 40%;
          left: 85%;
          animation-delay: 8.4s;
        }

        /* Venue Caption + Rule */
        .venue-caption-wrap {
          position: relative;
          z-index: 2;
          overflow: hidden;
          white-space: nowrap;
          width: 0;
          margin: 0.1rem auto 0;
          animation: captionReveal 1.1s steps(22, end) 6.9s forwards;
        }
        @keyframes captionReveal {
          to {
            width: 100%;
          }
        }

        .venue-caption {
          display: inline-block;
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: clamp(0.72rem, 1.8vw, 0.88rem);
          letter-spacing: 0.28em;
          color: var(--gold-dark);
          font-weight: 600;
          white-space: nowrap;
          padding: 0 0.15rem;
          text-transform: uppercase;
        }

        .venue-caption-rule {
          width: 0;
          height: 1px;
          margin: 0.25rem auto 0;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
          animation: ruleGrow 0.8s ease-out 8.0s forwards;
        }
        @keyframes ruleGrow {
          to {
            width: 55%;
          }
        }

        /* Footer Details */
        .divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.7rem;
          color: var(--gold);
          margin: 0.5rem 0 0.4rem;
          opacity: 0;
          animation: fadeUp 0.8s ease-out 8.3s forwards;
        }
        .divider::before,
        .divider::after {
          content: "";
          height: 1px;
          width: 38px;
          background: linear-gradient(90deg, transparent, currentColor);
        }
        .divider::after {
          background: linear-gradient(270deg, transparent, currentColor);
        }
        .divider span {
          font-size: 0.9rem;
          transform: translateY(-1px);
        }

        .date-line {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: clamp(1.3rem, 4.2vw, 1.75rem);
          letter-spacing: 0.04em;
          color: var(--ink);
          margin-bottom: 0.25rem;
          opacity: 0;
          animation: fadeUp 0.8s ease-out 8.55s forwards;
        }

        .dari-date {
          font-family: var(--font-noto-naskh), 'Noto Naskh Arabic', serif;
          direction: rtl;
          font-size: clamp(0.95rem, 2.6vw, 1.1rem);
          color: var(--ink-muted);
          opacity: 0;
          animation: fadeUp 0.8s ease-out 8.8s forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
          }
          .word span,
          .the-script,
          .subtitle,
          .name,
          .amp,
          .illustration-wrap,
          .halo,
          .venue-img,
          .sparkle-pt,
          .venue-caption-wrap,
          .venue-caption-rule,
          .divider,
          .date-line,
          .dari-date,
          .site-corner {
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
          }
          .venue-img {
            clip-path: none !important;
          }
          .eyebrow-wrap,
          .venue-caption-wrap {
            width: 100% !important;
          }
          .venue-caption-rule {
            width: 55% !important;
          }
        }
      `}</style>
    </section>
  );
}

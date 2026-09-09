"use client";

import { useEffect, useRef } from "react";
import { ArrowDown, MapPin, CheckCircle } from "@phosphor-icons/react";
import { event } from "@/lib/event";

interface InvitationHeroProps {
  isVideoDismissed?: boolean;
}

export default function InvitationHero({ isVideoDismissed = false }: InvitationHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);

  const scrollToRsvp = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const rsvpElement = document.getElementById("rsvp");
    if (rsvpElement) {
      rsvpElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToFacts = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const factsElement = document.getElementById("event-facts");
    if (factsElement) {
      factsElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (!isVideoDismissed) return;

    // 1. Drifting Petals inside Hero
    const heroEl = heroRef.current;
    if (!heroEl) return;

    const petals: HTMLDivElement[] = [];
    const petalCount = 16;

    for (let i = 0; i < petalCount; i++) {
      const p = document.createElement("div");
      p.className = "hero-petal";
      const size = 5 + Math.random() * 7;
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.left = `${Math.random() * 100}%`;
      p.style.setProperty("--drift-x", `${Math.random() * 120 - 60}px`);
      p.style.animationDuration = `${14 + Math.random() * 12}s`;
      p.style.animationDelay = `${Math.random() * 14}s`;
      heroEl.appendChild(p);
      petals.push(p);
    }

    // 2. Starry Sky Canvas Particle Loop
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrameId: number;
    let w = (canvas.width = heroEl.clientWidth);
    let h = (canvas.height = heroEl.clientHeight);

    const handleResize = () => {
      if (!canvas || !heroEl) return;
      w = canvas.width = heroEl.clientWidth;
      h = canvas.height = heroEl.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    type Star = {
      x: number;
      y: number;
      r: number;
      phase: number;
      speed: number;
    };

    type ShootingStar = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      trail: Array<{ x: number; y: number }>;
    };

    let stars: Star[] = [];
    let shootingStars: ShootingStar[] = [];

    const initStars = () => {
      stars = [];
      const count = Math.floor((w * h) / 8000);
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h * 0.85,
          r: Math.random() * 1.3 + 0.3,
          phase: Math.random() * Math.PI * 2,
          speed: 0.01 + Math.random() * 0.02,
        });
      }
    };

    initStars();

    const spawnShootingStar = () => {
      const startX = Math.random() * w * 0.7 + w * 0.15;
      const startY = Math.random() * h * 0.3;
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
    const tick = () => {
      frame++;
      ctx.clearRect(0, 0, w, h);

      for (const s of stars) {
        s.phase += s.speed;
        const alpha = 0.35 + 0.5 * Math.abs(Math.sin(s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(184,134,63,${alpha * 0.75})`;
        ctx.fill();
      }

      if (frame % 70 === 0 && Math.random() < 0.8) {
        spawnShootingStar();
      }

      shootingStars.forEach((st) => {
        st.x += st.vx;
        st.y += st.vy;
        st.life++;
        st.trail.push({ x: st.x, y: st.y });
        if (st.trail.length > 14) st.trail.shift();

        for (let i = 0; i < st.trail.length - 1; i++) {
          const t = i / st.trail.length;
          ctx.beginPath();
          ctx.moveTo(st.trail[i].x, st.trail[i].y);
          ctx.lineTo(st.trail[i + 1].x, st.trail[i + 1].y);
          ctx.strokeStyle = `rgba(233,201,106,${t * 0.8})`;
          ctx.lineWidth = t * 2.2;
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(st.x, st.y, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,250,235,0.95)";
        ctx.fill();
      });

      shootingStars = shootingStars.filter((st) => st.life < st.maxLife);
      animFrameId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", handleResize);
      petals.forEach((p) => p.remove());
    };
  }, []);

  return (
    <section
      id="hero-section"
      ref={heroRef}
      className={`hero-theme-wrapper relative min-h-screen w-full flex items-center justify-center overflow-hidden dir-ltr text-center px-4 py-8 md:py-12 ${
        isVideoDismissed ? "is-active" : ""
      }`}
    >
      <canvas ref={canvasRef} className="hero-sky-canvas" />

      <div className="hero-stage">
        <div className="hero-card">
          <div className="eyebrow-wrap">
            <span className="eyebrow">A MOMENT TO REMEMBER</span>
          </div>

          <div className="headline flex-row" dir="ltr">
            <span className="word save">
              <span>SAVE</span>
            </span>
            <span className="the-script">the</span>
            <span className="word date">
              <span>DATE</span>
            </span>
          </div>

          <p className="subtitle">FOR THE WEDDING OF</p>

          <div className="names">
            <span className="name groom">FARHAD</span>
            <span className="amp">&amp;</span>
            <span className="name bride">SAHAR</span>
          </div>

          <div className="illustration-wrap">
            <div className="halo"></div>
            <img
              className="venue-img"
              src="/wedding-venue.png"
              alt="Illustration of the wedding venue, City Star Wedding Hotel"
            />
            <div className="sparkle-pt sp1"></div>
            <div className="sparkle-pt sp2"></div>
            <div className="sparkle-pt sp3"></div>
            <div className="sparkle-pt sp4"></div>
            <div className="sparkle-pt sp5"></div>
          </div>

          <div className="venue-caption-wrap">
            <span className="venue-caption">TAJ CONTINENTAL HOTEL</span>
          </div>
          <div className="venue-caption-rule"></div>

          <div className="divider">
            <span>&#10022;</span>
          </div>

          <p className="date-line">October 13, 2026</p>
          <p className="dari-date" dir="rtl">
            {event.invitationDateFa}
          </p>

          {/* Action Links */}
          <div className="hero-action-buttons flex flex-col sm:flex-row items-center justify-center gap-3 mt-6 mb-2 dir-rtl">
            <a
              href="#rsvp"
              onClick={scrollToRsvp}
              className="w-full sm:w-auto min-w-[150px] px-5 py-2.5 rounded-xl bg-[#7a1c28] hover:bg-[#4f1119] text-[#faf5e8] font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle size={18} weight="bold" />
              <span>تأیید حضور</span>
            </a>

            <a
              href={event.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto min-w-[150px] px-5 py-2.5 rounded-xl bg-[#faf5e8] hover:bg-[#f1e8d4] text-[#241d17] font-semibold text-sm border border-[#b8863f] shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <MapPin size={18} className="text-[#b8863f]" />
              <span>دیدن مسیر</span>
            </a>
          </div>

          <div className="mt-3">
            <a
              href="#event-facts"
              onClick={scrollToFacts}
              className="inline-flex items-center gap-1.5 text-xs text-[#6b5f4f] hover:text-[#7a1c28] transition-colors dir-rtl"
            >
              <span>جزئیات محفل</span>
              <ArrowDown size={14} className="animate-bounce" />
            </a>
          </div>
        </div>
      </div>

      {/* Decorative Corner Brackets */}
      <div className="site-corner sc-tl"></div>
      <div className="site-corner sc-tr"></div>
      <div className="site-corner sc-bl"></div>
      <div className="site-corner sc-br"></div>

      <style jsx>{`
        .hero-theme-wrapper {
          opacity: ${isVideoDismissed ? 1 : 0};
          transition: opacity 0.5s ease-in-out;
        }

        .hero-theme-wrapper {
          --ivory: #faf5e8;
          --ivory-deep: #f1e8d4;
          --ink: #241d17;
          --ink-soft: #6b5f4f;
          --gold: #b8863f;
          --gold-light: #e9c96a;
          --gold-dark: #8a6329;
          --oxblood: #7a1c28;

          background: radial-gradient(
            ellipse at 50% -10%,
            #fffdf6 0%,
            var(--ivory) 45%,
            var(--ivory-deep) 100%
          );
          font-family: 'Cormorant Garamond', serif;
          color: var(--ink);
        }

        .hero-sky-canvas {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }

        .hero-stage {
          position: relative;
          z-index: 2;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-card {
          position: relative;
          width: min(560px, 92vw);
          text-align: center;
          padding: 1.6rem 1.5rem 1.2rem;
          opacity: 0;
        }

        .hero-theme-wrapper.is-active .hero-card {
          animation: cardIn 1.4s ease-out 0.2s forwards;
        }

        .hero-theme-wrapper:not(.is-active) * {
          animation: none !important;
        }

        @keyframes cardIn {
          from {
            opacity: 0;
            transform: translateY(18px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        :global(.hero-petal) {
          position: absolute;
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
            transform: translateY(110vh) translateX(var(--drift-x, 40px))
              rotate(340deg);
            opacity: 0;
          }
        }

        .site-corner {
          position: absolute;
          width: 48px;
          height: 48px;
          border: 1.5px solid var(--gold);
          z-index: 5;
          opacity: 0;
          pointer-events: none;
          animation: siteCornerIn 1.2s ease-out 0.4s forwards;
        }
        @media (min-width: 640px) {
          .site-corner {
            width: 56px;
            height: 56px;
          }
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

        .eyebrow-wrap {
          overflow: hidden;
          white-space: nowrap;
          width: 0;
          margin: 0 auto 0.5rem;
          animation: typeReveal 1.1s steps(24, end) 0.6s forwards;
        }
        @keyframes typeReveal {
          to {
            width: 100%;
          }
        }

        .eyebrow {
          font-family: 'Playfair Display', serif;
          font-size: clamp(0.65rem, 1.6vw, 0.8rem);
          letter-spacing: 0.32em;
          color: var(--gold-dark);
          font-weight: 600;
          white-space: nowrap;
        }

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
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 7vw, 2.9rem);
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
          font-family: 'Tangerine', cursive;
          font-size: clamp(2.8rem, 9.5vw, 4.4rem);
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

        .subtitle {
          font-family: 'Playfair Display', serif;
          font-size: clamp(0.72rem, 1.7vw, 0.85rem);
          letter-spacing: 0.28em;
          color: var(--ink-soft);
          font-weight: 500;
          margin: 0.6rem 0 0.6rem;
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

        .names {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 0.6rem;
        }

        .name {
          font-family: 'Playfair Display', serif;
          font-size: clamp(0.95rem, 2.4vw, 1.15rem);
          letter-spacing: 0.14em;
          color: var(--ink);
          opacity: 0;
          animation: fadeUp 0.9s ease-out 3s forwards;
        }
        .name.bride {
          animation-delay: 3.25s;
        }

        .amp {
          font-family: 'Tangerine', cursive;
          font-size: clamp(2.6rem, 7vw, 3.6rem);
          color: var(--oxblood);
          line-height: 0.6;
          opacity: 0;
          transform: scale(0.7) rotate(-6deg);
          animation: ampPop 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 3.55s
            forwards;
        }
        @keyframes ampPop {
          to {
            opacity: 1;
            transform: scale(1) rotate(-6deg);
          }
        }

        .illustration-wrap {
          position: relative;
          display: inline-block;
          margin: 0.1rem auto 0.15rem;
          opacity: 0;
          animation: fadeUp 0.8s ease-out 3.9s forwards;
        }

        .halo {
          position: absolute;
          inset: -10%;
          z-index: 0;
          background: radial-gradient(
            circle at 50% 42%,
            rgba(233, 201, 106, 0.35) 0%,
            rgba(233, 201, 106, 0.08) 45%,
            transparent 70%
          );
          filter: blur(6px);
          opacity: 0;
          animation: haloIn 2s ease-out 4.2s forwards,
            haloPulse 5s ease-in-out 6.2s infinite;
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
          width: auto;
          height: auto;
          max-width: min(94vw, 500px);
          max-height: 52vh;
          margin: 0 auto;
          filter: blur(16px) saturate(0.5) brightness(1.1);
          clip-path: circle(4% at 50% 46%);
          animation: venueReveal 2.6s cubic-bezier(0.22, 0.9, 0.3, 1) 4.3s
              forwards,
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

        .sparkle-pt {
          position: absolute;
          z-index: 2;
          width: 5px;
          height: 5px;
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
            transform: scale(1.2);
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
          animation-delay: 8s;
        }
        .sp5 {
          top: 40%;
          left: 85%;
          animation-delay: 8.4s;
        }

        .venue-caption-wrap {
          position: relative;
          z-index: 2;
          overflow: hidden;
          white-space: nowrap;
          width: 0;
          margin: 0.05rem auto 0;
          animation: captionReveal 1.1s steps(22, end) 6.9s forwards;
        }
        @keyframes captionReveal {
          to {
            width: 100%;
          }
        }

        .venue-caption {
          display: inline-block;
          font-family: 'Playfair Display', serif;
          font-size: clamp(0.68rem, 1.7vw, 0.8rem);
          letter-spacing: 0.26em;
          color: var(--gold-dark);
          font-weight: 600;
          white-space: nowrap;
          padding: 0 0.15rem;
        }

        .venue-caption-rule {
          width: 0;
          height: 1px;
          margin: 0.2rem auto 0;
          background: linear-gradient(
            90deg,
            transparent,
            var(--gold),
            transparent
          );
          animation: ruleGrow 0.8s ease-out 8s forwards;
        }
        @keyframes ruleGrow {
          to {
            width: 55%;
          }
        }

        .divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.7rem;
          color: var(--gold);
          margin: 0.45rem 0 0.4rem;
          opacity: 0;
          animation: fadeUp 0.8s ease-out 8.3s forwards;
        }
        .divider::before,
        .divider::after {
          content: '';
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
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.3rem, 4.2vw, 1.7rem);
          letter-spacing: 0.04em;
          color: var(--ink);
          margin-bottom: 0.35rem;
          opacity: 0;
          animation: fadeUp 0.8s ease-out 8.55s forwards;
        }

        .dari-date {
          font-family: 'Noto Naskh Arabic', 'Vazirmatn', serif;
          direction: rtl;
          font-size: clamp(0.9rem, 2.6vw, 1.05rem);
          color: var(--ink-soft);
          opacity: 0;
          animation: fadeUp 0.8s ease-out 8.8s forwards;
        }

        .hero-action-buttons {
          opacity: 0;
          animation: fadeUp 0.8s ease-out 9s forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          :global(#hero-section *) {
            animation: none !important;
          }
          .hero-card,
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
          .hero-action-buttons,
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

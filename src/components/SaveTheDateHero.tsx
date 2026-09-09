"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./SaveTheDateHero.module.css";
import { event } from "@/lib/event";

export default function SaveTheDateHero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Petals creation
    const createdPetals: HTMLDivElement[] = [];
    const petalCount = 16;
    for (let i = 0; i < petalCount; i++) {
      const p = document.createElement("div");
      p.className = styles.petal;
      const size = 5 + Math.random() * 7;
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.left = `${Math.random() * 100}vw`;
      p.style.setProperty("--drift-x", `${Math.random() * 120 - 60}px`);
      p.style.animationDuration = `${14 + Math.random() * 12}s`;
      p.style.animationDelay = `${Math.random() * 14}s`;
      container.appendChild(p);
      createdPetals.push(p);
    }

    // 2. Night sky canvas logic
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let stars: Array<{
      x: number;
      y: number;
      r: number;
      phase: number;
      speed: number;
    }> = [];
    let shootingStars: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      trail: Array<{ x: number; y: number }>;
    }> = [];

    function resize() {
      if (!canvas || !canvas.parentElement) return;
      w = canvas.width = canvas.parentElement.clientWidth;
      h = canvas.height = canvas.parentElement.clientHeight;
    }

    function initStars() {
      stars = [];
      const count = Math.floor((w * h) / 9000);
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h * 0.75,
          r: Math.random() * 1.3 + 0.3,
          phase: Math.random() * Math.PI * 2,
          speed: 0.01 + Math.random() * 0.02,
        });
      }
    }

    resize();
    initStars();

    const handleResize = () => {
      resize();
      initStars();
    };

    window.addEventListener("resize", handleResize);

    function spawnShootingStar() {
      const startX = Math.random() * w * 0.7 + w * 0.15;
      const startY = Math.random() * h * 0.25;
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
    }

    let frame = 0;
    let rafId: number;

    function tick() {
      frame++;
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      for (const s of stars) {
        s.phase += s.speed;
        const alpha = 0.35 + 0.5 * Math.abs(Math.sin(s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(184,134,63,${alpha * 0.7})`;
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
      rafId = requestAnimationFrame(tick);
    }

    tick();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      createdPetals.forEach((p) => p.remove());
    };
  }, []);

  return (
    <section ref={containerRef} className={styles.heroSection}>
      <canvas ref={canvasRef} className={styles.sky} />

      <div className={styles.stage}>
        <div className={styles.card}>
          <div className={styles.eyebrowWrap}>
            <span className={styles.eyebrow}>A MOMENT TO REMEMBER</span>
          </div>

          <div className={styles.headline}>
            <span className={`${styles.word} ${styles.wordSave}`}>
              <span>SAVE</span>
            </span>
            <span className={styles.theScript}>the</span>
            <span className={`${styles.word} ${styles.wordDate}`}>
              <span>DATE</span>
            </span>
          </div>

          <p className={styles.subtitle}>FOR THE WEDDING OF</p>

          <div className={styles.names}>
            <span className={styles.name}>FARHAD</span>
            <span className={styles.amp}>&amp;</span>
            <span className={`${styles.name} ${styles.nameBride}`}>SAHAR</span>
          </div>

          <div className={styles.illustrationWrap}>
            <div className={styles.halo}></div>
            <Image
              src="/venue-illustration.png"
              alt="Illustration of the wedding venue, Taj Continental Hotel, framed by two crescent arcs"
              width={364}
              height={317}
              className={styles.venueImg}
              priority
            />
            <div className={`${styles.sparklePt} ${styles.sp1}`}></div>
            <div className={`${styles.sparklePt} ${styles.sp2}`}></div>
            <div className={`${styles.sparklePt} ${styles.sp3}`}></div>
            <div className={`${styles.sparklePt} ${styles.sp4}`}></div>
            <div className={`${styles.sparklePt} ${styles.sp5}`}></div>
          </div>

          <div className={styles.venueCaptionWrap}>
            <span className={styles.venueCaption}>TAJ CONTINENTAL HOTEL</span>
          </div>
          <div className={styles.venueCaptionRule}></div>

          <div className={styles.divider}>
            <span>&#10022;</span>
          </div>

          <p className={styles.dateLine}>{event.invitationDateGregorian}</p>
          <p className={styles.dariDate}>{event.invitationDateFa}</p>
        </div>
      </div>

      <div className={`${styles.siteCorner} ${styles.scTl}`}></div>
      <div className={`${styles.siteCorner} ${styles.scTr}`}></div>
      <div className={`${styles.siteCorner} ${styles.scBl}`}></div>
      <div className={`${styles.siteCorner} ${styles.scBr}`}></div>
    </section>
  );
}

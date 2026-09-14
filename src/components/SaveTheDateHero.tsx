"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import InitialsMonogram from "@/components/InitialsMonogram";
import { event } from "@/lib/event";

export default function SaveTheDateHero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Shooting stars background canvas effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    // Static ambient stars
    const stars: Array<{ x: number; y: number; radius: number; opacity: number; speed: number }> = [];
    for (let i = 0; i < 45; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.7 + 0.3,
        speed: Math.random() * 0.02 + 0.005,
      });
    }

    // Shooting stars meteors
    interface ShootingStar {
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      opacity: number;
      active: boolean;
    }
    const shootingStars: ShootingStar[] = [];

    const createShootingStar = () => {
      if (shootingStars.length < 3 && Math.random() < 0.03) {
        shootingStars.push({
          x: Math.random() * width * 0.8,
          y: Math.random() * height * 0.4,
          length: Math.random() * 80 + 40,
          speed: Math.random() * 8 + 6,
          angle: Math.PI / 4 + (Math.random() * 0.2 - 0.1),
          opacity: 1,
          active: true,
        });
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle ambient twinkling stars
      stars.forEach((star) => {
        star.opacity += Math.sin(Date.now() * star.speed) * 0.01;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${Math.abs(Math.sin(star.opacity)) * 0.6 + 0.2})`;
        ctx.fill();
      });

      // Spawn & Draw Shooting Stars
      createShootingStar();
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const star = shootingStars[i];
        if (!star.active) continue;

        const endX = star.x + Math.cos(star.angle) * star.length;
        const endY = star.y + Math.sin(star.angle) * star.length;

        const gradient = ctx.createLinearGradient(star.x, star.y, endX, endY);
        gradient.addColorStop(0, `rgba(212, 175, 55, ${star.opacity})`);
        gradient.addColorStop(1, "rgba(212, 175, 55, 0)");

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;
        star.opacity -= 0.015;

        if (star.opacity <= 0 || star.x > width || star.y > height) {
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
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center pt-8 pb-16 px-4 text-center overflow-hidden">
      {/* Background Shooting Stars Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80"
      />

      {/* Atmospheric Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] rounded-full bg-gradient-radial from-[var(--gold-pale)] via-amber-100/30 to-transparent blur-3xl pointer-events-none z-0" />

      {/* Main Container */}
      <div className="relative z-10 max-w-3xl mx-auto space-y-6 sm:space-y-8 flex flex-col items-center">

        {/* Animated Handwriting "Save The Date" Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="space-y-2"
        >
          {/* Persian Animated Handwriting SVG / Typography */}
          <div className="relative inline-block px-6 py-2">
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
              viewBox="0 0 300 80"
              fill="none"
            >
              <motion.path
                d="M 10,40 Q 150,-10 290,40 Q 150,90 10,40"
                stroke="var(--gold)"
                strokeWidth="1.2"
                strokeDasharray="6 6"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
              />
            </svg>
            <motion.h2
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="text-2xl sm:text-4xl font-extrabold text-[var(--gold-dark)] font-naskh tracking-widest"
            >
              ذخیره تاریخ
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={{ opacity: 1, letterSpacing: "0.3em" }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="text-xs sm:text-sm text-[var(--ink-muted)] font-serif uppercase"
          >
            S A V E &nbsp; T H E &nbsp; D A T E
          </motion.p>
        </motion.div>

        {/* Monogram Artwork */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center my-2"
        >
          <InitialsMonogram size="clamp(150px, 30vw, 240px)" />
        </motion.div>

        {/* Couple Names */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="space-y-1"
        >
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[var(--ink)] font-nastaliq tracking-tight drop-shadow-sm">
            {event.coupleDisplayName}
          </h1>
          <p dir="ltr" className="text-xs sm:text-sm text-[var(--gold-dark)] font-mono tracking-widest uppercase pt-1">
            {event.groomNameEn} &amp; {event.brideNameEn}
          </p>
        </motion.div>

        {/* Unblur Photo Reveal Frame (Save The Date Card & Venue Photo) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: "blur(15px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.4, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-md mx-auto p-3 sm:p-4 rounded-2xl bg-gradient-to-b from-amber-50/80 via-white/90 to-amber-100/60 border border-[var(--gold)]/30 shadow-2xl backdrop-blur-md group"
        >
          {/* Gold Decorative Corner Borders */}
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[var(--gold)]" />
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[var(--gold)]" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[var(--gold)]" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[var(--gold)]" />

          {/* Photo Container */}
          <div className="relative overflow-hidden rounded-xl aspect-[4/3] border border-[var(--gold)]/20 shadow-inner">
            <Image
              src="/save-the-date-card.png"
              alt="Save The Date Card"
              fill
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              priority
            />
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

            {/* Overlay Venue Badge */}
            <div className="absolute bottom-3 right-3 left-3 flex justify-between items-end text-white text-right">
              <div>
                <p className="text-xs text-amber-200/90 font-mono font-medium dir-rtl">محل برگزاری</p>
                <p className="text-sm sm:text-base font-bold font-naskh text-white drop-shadow">
                  قصر ستاره شهر
                </p>
              </div>
              <span className="text-[10px] sm:text-xs font-mono bg-black/40 backdrop-blur-md border border-white/20 text-amber-200 px-2 py-1 rounded-full">
                City Star Hotel
              </span>
            </div>
          </div>
        </motion.div>

        {/* Animated Text for Date & Location Details */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1 }}
          className="space-y-3 pt-2"
        >
          {/* Animated Date Line */}
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-amber-50/60 border border-[var(--gold)]/30 backdrop-blur-sm shadow-xs">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.3 }}
              className="text-sm sm:text-lg font-bold text-[var(--ink)] font-naskh"
            >
              {event.invitationDateFa}
            </motion.span>
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.4 }}
              dir="ltr"
              className="text-xs sm:text-sm text-[var(--gold-dark)] font-mono font-medium"
            >
              {event.invitationDateGregorian}
            </motion.span>
          </div>

          {/* Animated Venue Name Line */}
          <motion.div
            initial={{ opacity: 0, filter: "blur(8px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 1.5 }}
            className="flex flex-col items-center gap-0.5"
          >
            <p className="text-base sm:text-xl font-bold text-[var(--ink)] font-naskh">
              {event.venueName}
            </p>
            <p className="text-xs sm:text-sm text-[var(--ink-muted)] font-serif">
              {event.venueNameEn} &bull; کابل، افغانستان
            </p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

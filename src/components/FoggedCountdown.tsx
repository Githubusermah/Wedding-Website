"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { event } from "@/lib/event";
import { toEasternArabicNumerals } from "@/lib/formatters";
import { Sparkle, Eraser, Clock, HandGrabbing } from "@phosphor-icons/react";

export default function FoggedCountdown() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [fogClearedPercent, setFogClearedPercent] = useState(0);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPassed: false,
  });

  // Calculate live time left
  useEffect(() => {
    const target = new Date(event.startDateTimeISO).getTime();

    const updateTime = () => {
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: true });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPassed: false });
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fog Canvas Setup & Scratch Logic
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let isDrawing = false;

    const drawFog = () => {
      if (!ctx || !canvas) return;
      const w = canvas.width;
      const h = canvas.height;

      ctx.save();
      ctx.globalCompositeOperation = "source-over";

      // Frosted fog gradient with elegant champagne gold undertones
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, "rgba(238, 228, 208, 0.94)");
      grad.addColorStop(0.5, "rgba(248, 243, 230, 0.97)");
      grad.addColorStop(1, "rgba(220, 204, 178, 0.94)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Frost texture particles
      ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
      for (let i = 0; i < 450; i++) {
        ctx.beginPath();
        ctx.arc(
          Math.random() * w,
          Math.random() * h,
          Math.random() * 2.2,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }

      // Instruction overlay on fog
      ctx.font = "bold 15px 'Vazirmatn', sans-serif";
      ctx.fillStyle = "rgba(122, 28, 40, 0.85)";
      ctx.textAlign = "center";
      ctx.fillText("✨ روی صفحه بکشید تا شمارش معکوس پیدا شود ✨", w / 2, h / 2 - 12);

      ctx.font = "500 12px sans-serif";
      ctx.fillStyle = "rgba(138, 99, 41, 0.85)";
      ctx.fillText("Wipe the fog to reveal live countdown", w / 2, h / 2 + 14);

      ctx.restore();
    };

    const resizeCanvas = () => {
      if (!canvas || !container) return;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      drawFog();
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const getPos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      let clientX = 0;
      let clientY = 0;

      if ("touches" in e) {
        if (e.touches.length > 0) {
          clientX = e.touches[0].clientX;
          clientY = e.touches[0].clientY;
        }
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    };

    const wipeAt = (x: number, y: number) => {
      if (!ctx) return;
      ctx.save();
      // Soft radial blur wipe
      const rad = ctx.createRadialGradient(x, y, 10, x, y, 32);
      rad.addColorStop(0, "rgba(0,0,0,1)");
      rad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = rad;
      ctx.beginPath();
      ctx.arc(x, y, 32, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const checkCleared = () => {
      if (!ctx || !canvas) return;
      const w = canvas.width;
      const h = canvas.height;
      if (w === 0 || h === 0) return;

      const imgData = ctx.getImageData(0, 0, w, h);
      const pixels = imgData.data;
      let transparent = 0;
      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] === 0) transparent++;
      }
      const percent = Math.floor((transparent / (pixels.length / 4)) * 100);
      setFogClearedPercent(percent);
    };

    const handleStart = (e: MouseEvent | TouchEvent) => {
      isDrawing = true;
      const { x, y } = getPos(e);
      wipeAt(x, y);
    };

    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing) return;
      const { x, y } = getPos(e);
      wipeAt(x, y);
      checkCleared();
    };

    const handleEnd = () => {
      isDrawing = false;
      checkCleared();
    };

    canvas.addEventListener("mousedown", handleStart);
    canvas.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleEnd);

    canvas.addEventListener("touchstart", handleStart, { passive: true });
    canvas.addEventListener("touchmove", handleMove, { passive: true });
    window.addEventListener("touchend", handleEnd);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousedown", handleStart);
      canvas.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleEnd);

      canvas.removeEventListener("touchstart", handleStart);
      canvas.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, []);

  const clearAllFog = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setFogClearedPercent(100);
  };

  return (
    <section className="py-10 px-4 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="paper-card p-6 md:p-8 text-center relative overflow-hidden"
      >
        <div className="flex items-center justify-center gap-2 mb-2 text-[var(--gold)]">
          <Sparkle size={20} weight="fill" />
          <span className="text-xs font-bold uppercase tracking-widest">
            شمارش معکوس جادویی
          </span>
          <Sparkle size={20} weight="fill" />
        </div>

        <h3 className="text-xl md:text-2xl font-bold text-[var(--ruby)] mb-1">
          شمارش معکوس روز بزرگ
        </h3>
        <p className="text-xs md:text-sm text-[var(--ink-muted)] mb-6">
          با لمس یا کشیدن ماوس روی شیشهٔ مه‌آلود، زمان باقی‌مانده را آشکار کنید
        </p>

        {/* Outer Interactive Container */}
        <div
          ref={containerRef}
          className="relative min-h-[220px] rounded-2xl overflow-hidden border-2 border-[var(--gold)]/40 shadow-inner bg-gradient-to-br from-[#faf5e8] via-[#fffdf6] to-[#f1e8d4] flex items-center justify-center p-4 select-none cursor-pointer"
        >
          {/* Revealed Content Behind Fog */}
          {timeLeft.isPassed ? (
            <div className="text-center py-6 px-4">
              <span className="text-2xl md:text-3xl font-bold text-[var(--ruby)] block mb-2">
                محفل با موفقیت برگزار شد 🎉
              </span>
              <p className="text-sm text-[var(--ink-muted)]">
                با سپاس فراوان از همگام بودن و شادمانی در پیوند فرهاد و سحر
              </p>
            </div>
          ) : (
            <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 z-0">
              <div className="p-4 rounded-xl bg-[var(--paper-white)]/90 border border-[var(--line)] shadow-sm flex flex-col items-center">
                <span className="text-2xl md:text-4xl font-extrabold text-[var(--ruby)] font-mono">
                  {toEasternArabicNumerals(timeLeft.days)}
                </span>
                <span className="text-xs md:text-sm font-semibold text-[var(--ink-muted)] mt-1">
                  روز / Days
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[var(--paper-white)]/90 border border-[var(--line)] shadow-sm flex flex-col items-center">
                <span className="text-2xl md:text-4xl font-extrabold text-[var(--gold-dark,#8a6329)] font-mono">
                  {toEasternArabicNumerals(timeLeft.hours)}
                </span>
                <span className="text-xs md:text-sm font-semibold text-[var(--ink-muted)] mt-1">
                  ساعت / Hours
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[var(--paper-white)]/90 border border-[var(--line)] shadow-sm flex flex-col items-center">
                <span className="text-2xl md:text-4xl font-extrabold text-[var(--ruby)] font-mono">
                  {toEasternArabicNumerals(timeLeft.minutes)}
                </span>
                <span className="text-xs md:text-sm font-semibold text-[var(--ink-muted)] mt-1">
                  دقیقه / Mins
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[var(--paper-white)]/90 border border-[var(--line)] shadow-sm flex flex-col items-center">
                <span className="text-2xl md:text-4xl font-extrabold text-[var(--gold-dark,#8a6329)] font-mono animate-pulse">
                  {toEasternArabicNumerals(timeLeft.seconds)}
                </span>
                <span className="text-xs md:text-sm font-semibold text-[var(--ink-muted)] mt-1">
                  ثانیه / Secs
                </span>
              </div>
            </div>
          )}

          {/* Fog Canvas Overlay */}
          <canvas
            ref={canvasRef}
            className={`absolute inset-0 z-10 transition-opacity duration-500 ${
              fogClearedPercent > 85 ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
          />
        </div>

        {/* Buttons / Instructions & Progress */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[var(--ink-muted)]">
            <Clock size={16} className="text-[var(--ruby)]" />
            <span>تاریخ محفل: {event.invitationDateFa}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[var(--gold-dark,#8a6329)] font-medium flex items-center gap-1">
              <HandGrabbing size={16} />
              <span>پاک‌سازی مه: {fogClearedPercent}%</span>
            </span>

            {fogClearedPercent < 90 && (
              <button
                onClick={clearAllFog}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--ruby)] hover:bg-[var(--ruby-deep)] text-[var(--paper-white)] font-semibold transition-colors"
              >
                <Eraser size={16} />
                <span>نمایش کامل</span>
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

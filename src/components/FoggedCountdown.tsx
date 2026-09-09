"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { event } from "@/lib/event";
import { toEasternArabicNumerals } from "@/lib/formatters";
import { Sparkle, Eraser, Clock, HandTap, CheckCircle } from "@phosphor-icons/react";

export default function FoggedCountdown() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [fogClearedPercent, setFogClearedPercent] = useState(0);
  const [isFullyRevealed, setIsFullyRevealed] = useState(false);
  const [showGoldShimmer, setShowGoldShimmer] = useState(false);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isEventCompleted, setIsEventCompleted] = useState(false);

  // Live countdown targeting Asia/Kabul timezone 2026-10-13T18:00:00+04:30
  useEffect(() => {
    const target = new Date(event.startDateTimeISO).getTime();

    const updateTime = () => {
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setIsEventCompleted(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setIsEventCompleted(false);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Canvas Scratch/Wipe Fog Logic
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let isDrawing = false;

    const resizeCanvas = () => {
      if (!canvas || !container) return;
      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      canvas.width = rect.width;
      canvas.height = rect.height;
      drawFog();
    };

    const drawFog = () => {
      if (!ctx || !canvas) return;
      const w = canvas.width;
      const h = canvas.height;
      if (w === 0 || h === 0) return;

      ctx.save();
      ctx.globalCompositeOperation = "source-over";

      // Frosted fog background with gold/ivory hue
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, "rgba(238, 228, 208, 0.95)");
      grad.addColorStop(0.5, "rgba(248, 243, 231, 0.96)");
      grad.addColorStop(1, "rgba(218, 202, 175, 0.95)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Frost texture dots
      ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
      for (let i = 0; i < 500; i++) {
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

      // Decorative instructional text rendered onto fog
      ctx.font = "bold 15px sans-serif";
      ctx.fillStyle = "rgba(122, 28, 40, 0.8)";
      ctx.textAlign = "center";
      ctx.fillText("✨ برای آشکار کردن زمان، صفحه را لمس کنید و بکشید ✨", w / 2, h / 2 - 12);

      ctx.font = "12px sans-serif";
      ctx.fillStyle = "rgba(138, 99, 41, 0.85)";
      ctx.fillText("Touch or drag across to reveal countdown", w / 2, h / 2 + 16);

      ctx.restore();
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const getPos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      let clientX = 0;
      let clientY = 0;

      if ("touches" in e) {
        if (e.touches && e.touches.length > 0) {
          clientX = e.touches[0].clientX;
          clientY = e.touches[0].clientY;
        }
      } else {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      }

      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    };

    const wipeAt = (x: number, y: number) => {
      if (!ctx) return;
      ctx.save();
      ctx.globalCompositeOperation = "destination-out";

      const rad = ctx.createRadialGradient(x, y, 4, x, y, 36);
      rad.addColorStop(0, "rgba(0,0,0,1)");
      rad.addColorStop(0.7, "rgba(0,0,0,0.85)");
      rad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = rad;

      ctx.beginPath();
      ctx.arc(x, y, 36, 0, Math.PI * 2);
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
        if (pixels[i] < 30) transparent++;
      }
      const percent = Math.floor((transparent / (pixels.length / 4)) * 100);
      setFogClearedPercent(percent);

      if (percent > 75 && !isFullyRevealed) {
        setIsFullyRevealed(true);
        setShowGoldShimmer(true);
        setTimeout(() => setShowGoldShimmer(false), 2000);
      }
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
  }, [isFullyRevealed]);

  const clearAllFog = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setFogClearedPercent(100);
    setIsFullyRevealed(true);
    setShowGoldShimmer(true);
    setTimeout(() => setShowGoldShimmer(false), 2000);
  };

  return (
    <section className="py-12 px-4 max-w-4xl mx-auto scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="paper-card p-6 md:p-8 text-center relative overflow-hidden shadow-lg border-[var(--line)]"
      >
        {/* Header Badges */}
        <div className="flex items-center justify-center gap-2 mb-2 text-[var(--gold)]">
          <Sparkle size={20} weight="fill" />
          <span className="text-xs font-bold uppercase tracking-widest">
            شمارش معکوس جادویی
          </span>
          <Sparkle size={20} weight="fill" />
        </div>

        <h3 className="text-2xl md:text-3xl font-bold text-[var(--ruby)] mb-1">
          شمارش معکوس روز بزرگ
        </h3>

        <p className="text-xs md:text-sm text-[var(--ink-muted)] mb-5 flex items-center justify-center gap-1.5">
          <HandTap size={18} className="text-[var(--gold)]" />
          <span>برای آشکار کردن زمان، صفحه را لمس کنید و بکشید</span>
        </p>

        {/* Scratch-off Container */}
        <div
          ref={containerRef}
          className={`relative min-h-[230px] rounded-2xl overflow-hidden border-2 transition-colors duration-500 shadow-inner bg-gradient-to-br from-[#faf5e8] via-[#fffdf6] to-[#f1e8d4] flex items-center justify-center p-4 md:p-6 select-none ${
            isFullyRevealed ? "border-[var(--gold)]" : "border-[var(--gold)]/40"
          }`}
        >
          {/* Gold Shimmer Overlay on Reveal */}
          <AnimatePresence>
            {showGoldShimmer && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-r from-transparent via-[rgba(233,201,106,0.35)] to-transparent animate-pulse"
              />
            )}
          </AnimatePresence>

          {/* Revealed Content Behind Fog */}
          {isEventCompleted ? (
            <div className="z-0 text-center py-6 space-y-2">
              <div className="w-12 h-12 rounded-full bg-[var(--ruby)] text-[var(--paper-white)] mx-auto flex items-center justify-center shadow-md">
                <CheckCircle size={28} weight="fill" />
              </div>
              <h4 className="text-xl md:text-2xl font-bold text-[var(--ruby)]">
                محفل با موفقیت برگزار شد
              </h4>
              <p className="text-xs md:text-sm text-[var(--ink-muted)]">
                با سپاس فراوان از همراهی و تشریف‌فرمایی شما
              </p>
            </div>
          ) : (
            <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 z-0">
              <div className="p-4 rounded-xl bg-[var(--paper-white)]/95 border border-[var(--line)] shadow-sm flex flex-col items-center">
                <span className="text-3xl md:text-5xl font-black text-[var(--ruby)] font-mono">
                  {toEasternArabicNumerals(timeLeft.days)}
                </span>
                <span className="text-xs md:text-sm font-semibold text-[var(--ink-muted)] mt-1">
                  روز / Days
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[var(--paper-white)]/95 border border-[var(--line)] shadow-sm flex flex-col items-center">
                <span className="text-3xl md:text-5xl font-black text-[var(--gold-dark,#8a6329)] font-mono">
                  {toEasternArabicNumerals(timeLeft.hours)}
                </span>
                <span className="text-xs md:text-sm font-semibold text-[var(--ink-muted)] mt-1">
                  ساعت / Hours
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[var(--paper-white)]/95 border border-[var(--line)] shadow-sm flex flex-col items-center">
                <span className="text-3xl md:text-5xl font-black text-[var(--ruby)] font-mono">
                  {toEasternArabicNumerals(timeLeft.minutes)}
                </span>
                <span className="text-xs md:text-sm font-semibold text-[var(--ink-muted)] mt-1">
                  دقیقه / Mins
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[var(--paper-white)]/95 border border-[var(--line)] shadow-sm flex flex-col items-center">
                <span className="text-3xl md:text-5xl font-black text-[var(--gold-dark,#8a6329)] font-mono animate-pulse">
                  {toEasternArabicNumerals(timeLeft.seconds)}
                </span>
                <span className="text-xs md:text-sm font-semibold text-[var(--ink-muted)] mt-1">
                  ثانیه / Secs
                </span>
              </div>
            </div>
          )}

          {/* Canvas Fog Overlay */}
          <canvas
            ref={canvasRef}
            className={`absolute inset-0 z-10 transition-opacity duration-700 cursor-pointer ${
              isFullyRevealed ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
          />
        </div>

        {/* Footer controls & progress indicator */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-[var(--ink-muted)] font-medium">
            <Clock size={16} className="text-[var(--gold)]" />
            <span>تاریخ محفل: {event.invitationDateFa}</span>
          </div>

          <div className="flex items-center gap-3">
            {!isFullyRevealed && (
              <span className="text-[11px] text-[var(--ink-muted)] font-semibold">
                میزان شفافیت: {fogClearedPercent}%
              </span>
            )}

            {!isFullyRevealed && (
              <button
                onClick={clearAllFog}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--ruby)] hover:bg-[var(--ruby-deep)] text-[var(--paper-white)] font-semibold transition-colors shadow-sm"
              >
                <Eraser size={16} />
                <span>پاک کردن تمام مه</span>
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

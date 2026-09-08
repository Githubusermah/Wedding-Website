"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Sparkle, Hand, Eraser, Heart, FlowerTulip } from "@phosphor-icons/react";

export default function FogCountdown() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [percentCleared, setPercentCleared] = useState(0);
  const [hasRevealed, setHasRevealed] = useState(false);
  const [swipeCount, setSwipeCount] = useState(0);

  // Target date: 13 October 2025 (۱۳ میزان ۱۴۰۴)
  const targetDate = new Date("2025-10-13T18:00:00+04:30").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  // Setup fog canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      // Draw frosted glass fog effect (light pistachio champagne frosted fog)
      ctx.globalCompositeOperation = "source-over";
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, "rgba(235, 242, 236, 0.96)");
      gradient.addColorStop(0.5, "rgba(245, 238, 230, 0.98)");
      gradient.addColorStop(1, "rgba(230, 240, 232, 0.95)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add gentle dew water droplets texture
      for (let i = 0; i < 350; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 2.5 + 1;
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.6 + 0.3})`;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Add elegant Dari text instruction directly on fog
      ctx.fillStyle = "#8b1e2d";
      ctx.font = "bold 17px var(--font-vazirmatn), sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("🌿 با اندکی لمس، بخار روی شیشه را پاک کنید 🌸", canvas.width / 2, canvas.height / 2);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  const wipeFog = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || hasRevealed) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // Generous erase radius (52px) so wiping a little clears the fog easily
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 52, 0, Math.PI * 2);
    ctx.fill();

    setSwipeCount((prev) => {
      const next = prev + 1;
      // Auto-clear completely after ~6 swipe ticks or when ~8% cleared
      if (next > 6) {
        setHasRevealed(true);
      }
      return next;
    });

    checkClearedPercentage(ctx, canvas);
  };

  const checkClearedPercentage = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    try {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let pixelsCleared = 0;
      for (let i = 3; i < imgData.data.length; i += 32) {
        if (imgData.data[i] === 0) pixelsCleared++;
      }
      const totalSampled = imgData.data.length / 32;
      const ratio = (pixelsCleared / totalSampled) * 100;
      setPercentCleared(ratio);

      // Low threshold so wiping a little reveals all fog completely
      if (ratio > 8) {
        setHasRevealed(true);
      }
    } catch (e) {
      // Fallback reveal
      setHasRevealed(true);
    }
  };

  const clearAllFog = () => {
    setHasRevealed(true);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDrawing(true);
    wipeFog(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    wipeFog(e.clientX, e.clientY);
  };

  const handleMouseUp = () => setIsDrawing(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDrawing(true);
    if (e.touches[0]) wipeFog(e.touches[0].clientX, e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDrawing) return;
    if (e.touches[0]) wipeFog(e.touches[0].clientX, e.touches[0].clientY);
  };

  // Convert numbers to Dari / Afghan numerals
  const toDariDigits = (num: number) => {
    const formatted = String(num).padStart(2, "0");
    const dariDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return formatted.replace(/\d/g, (d) => dariDigits[parseInt(d)]);
  };

  return (
    <section className="py-16 px-4 relative max-w-5xl mx-auto text-center" id="countdown-section">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-8"
      >
        <span className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold tracking-widest text-[#8b1e2d] uppercase bg-[#fdf0f2] px-4 py-1.5 rounded-full border border-[#8b1e2d]/25 shadow-sm">
          <Sparkle size={16} weight="fill" className="text-[#8b1e2d]" />
          شمارش معکوس تا لحظه وصال
        </span>
        <h2 className="text-3xl md:text-5xl font-heading text-deep-red-gradient mt-4">
          زمان باقی‌مانده تا جشن بزرگ عروسی
        </h2>
        <p className="text-[#4a5850] text-sm md:text-base mt-2 max-w-xl mx-auto">
          با یک لمس کوچک روی بخار، روز و ساعت محفل را مشاهده کنید
        </p>
      </motion.div>

      {/* Main Countdown Canvas Card */}
      <div
        ref={containerRef}
        className="relative w-full min-h-[250px] md:min-h-[290px] rounded-3xl glass-card border border-[#c5a059]/40 shadow-2xl overflow-hidden flex flex-col items-center justify-center p-6 md:p-10 select-none cursor-grab active:cursor-grabbing bg-gradient-to-br from-[#faf8f3] via-[#eef4ed] to-[#fdf0f2]"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        {/* Background Decorative Botanical Leaves & Floral Pattern underneath */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#5b7e53_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Revealed Countdown Content (Deep Red & Pistachio Theme) */}
        <div className="grid grid-cols-4 gap-3 md:gap-6 w-full max-w-3xl z-10 my-auto">
          {/* Days */}
          <div className="flex flex-col items-center justify-center bg-white/90 p-4 md:p-6 rounded-2xl border border-[#8b1e2d]/20 shadow-md">
            <span className="text-3xl md:text-6xl font-bold font-heading text-[#8b1e2d]">
              {toDariDigits(timeLeft.days)}
            </span>
            <span className="text-xs md:text-sm text-[#5b7e53] mt-2 font-bold">
              روز
            </span>
          </div>

          {/* Hours */}
          <div className="flex flex-col items-center justify-center bg-white/90 p-4 md:p-6 rounded-2xl border border-[#8b1e2d]/20 shadow-md">
            <span className="text-3xl md:text-6xl font-bold font-heading text-[#8b1e2d]">
              {toDariDigits(timeLeft.hours)}
            </span>
            <span className="text-xs md:text-sm text-[#5b7e53] mt-2 font-bold">
              ساعت
            </span>
          </div>

          {/* Minutes */}
          <div className="flex flex-col items-center justify-center bg-white/90 p-4 md:p-6 rounded-2xl border border-[#8b1e2d]/20 shadow-md">
            <span className="text-3xl md:text-6xl font-bold font-heading text-[#8b1e2d]">
              {toDariDigits(timeLeft.minutes)}
            </span>
            <span className="text-xs md:text-sm text-[#5b7e53] mt-2 font-bold">
              دقیقه
            </span>
          </div>

          {/* Seconds */}
          <div className="flex flex-col items-center justify-center bg-white/90 p-4 md:p-6 rounded-2xl border border-[#5b7e53]/30 shadow-md">
            <span className="text-3xl md:text-6xl font-bold font-heading text-[#5b7e53] animate-pulse">
              {toDariDigits(timeLeft.seconds)}
            </span>
            <span className="text-xs md:text-sm text-[#8b1e2d] mt-2 font-bold">
              ثانیه
            </span>
          </div>
        </div>

        {/* Date subtitle banner under timer */}
        <div className="z-10 mt-6 pt-4 border-t border-[#c5a059]/25 w-full flex items-center justify-between text-xs md:text-sm text-[#4a5850]">
          <span className="font-semibold text-[#8b1e2d]">تاریخ جشن: ۱۳ میزان ۱۴۰۴</span>
          <span className="text-[#5b7e53] font-medium">ساعت ۶:۰۰ شام</span>
        </div>

        {/* Fog Canvas Layer */}
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full transition-opacity duration-700 z-20 ${
            hasRevealed ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        />

        {/* Swipe Visual Prompt Overlay */}
        {!hasRevealed && (
          <div className="absolute z-30 pointer-events-none flex items-center gap-3 bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-full border border-[#8b1e2d]/30 shadow-lg top-1/2 -translate-y-1/2">
            <Hand size={24} className="text-[#8b1e2d] animate-bounce" />
            <span className="text-xs md:text-sm text-[#8b1e2d] font-bold">
              دست بکشید تا بخار پاک شود
            </span>
          </div>
        )}
      </div>

      {/* Manual Quick Action to Clear Fog */}
      {!hasRevealed && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={clearAllFog}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#5b7e53]/30 text-xs font-semibold text-[#5b7e53] hover:bg-[#eef4ed] shadow-sm transition-all cursor-pointer"
          >
            <Eraser size={16} />
            پاک‌سازی سریع تمام بخار
          </button>
        </div>
      )}
    </section>
  );
}

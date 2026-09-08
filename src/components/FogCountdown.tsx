"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Sparkle, Hand } from "@phosphor-icons/react";

export default function FogCountdown() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [percentCleared, setPercentCleared] = useState(0);
  const [hasRevealed, setHasRevealed] = useState(false);

  // Target date: 13 October (۱۳ میزان)
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

      // Draw frosted fog effect
      ctx.globalCompositeOperation = "source-over";
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, "rgba(200, 220, 210, 0.88)");
      gradient.addColorStop(0.5, "rgba(180, 205, 195, 0.94)");
      gradient.addColorStop(1, "rgba(160, 190, 180, 0.90)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add noise / droplets texture
      for (let i = 0; i < 400; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 2 + 1;
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.4 + 0.2})`;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Add text guidance on fog layer
      ctx.fillStyle = "rgba(20, 40, 30, 0.65)";
      ctx.font = "600 16px var(--font-vazirmatn), sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("✨ با دست رویش بکشید تا تاریخ آشکار شود ✨", canvas.width / 2, canvas.height / 2);
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

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 36, 0, Math.PI * 2);
    ctx.fill();

    // Calculate percentage cleared occasionally
    checkClearedPercentage(ctx, canvas);
  };

  const checkClearedPercentage = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    if (Math.random() > 0.2) return; // throttle checking
    try {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let pixelsCleared = 0;
      for (let i = 3; i < imgData.data.length; i += 16) {
        if (imgData.data[i] === 0) pixelsCleared++;
      }
      const totalSampled = imgData.data.length / 16;
      const ratio = (pixelsCleared / totalSampled) * 100;
      setPercentCleared(ratio);

      if (ratio > 35) {
        setHasRevealed(true);
      }
    } catch (e) {
      // CORS or context fallback
    }
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

  // Convert numbers to Afghan / Dari numerals
  const toDariDigits = (num: number) => {
    const formatted = String(num).padStart(2, "0");
    const dariDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return formatted.replace(/\d/g, (d) => dariDigits[parseInt(d)]);
  };

  return (
    <section className="py-20 px-4 relative max-w-5xl mx-auto text-center" id="countdown-section">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-8"
      >
        <span className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold tracking-widest text-[#d4af37] uppercase bg-[#d4af37]/10 px-4 py-1.5 rounded-full border border-[#d4af37]/30">
          <Sparkle size={16} weight="fill" className="text-[#d4af37]" />
          شمارش معکوس تا لحظه وصال
        </span>
        <h2 className="text-3xl md:text-5xl font-heading text-gold-gradient mt-4">
          زمان باقی‌مانده تا جشن عروسی
        </h2>
        <p className="text-[#a0b0a8] text-sm md:text-base mt-2 max-w-xl mx-auto">
          برای دیدن تاریخ شادمانی، بخارِ روی شیشه را پاک کنید
        </p>
      </motion.div>

      {/* Countdown & Fog Interactive Container */}
      <div
        ref={containerRef}
        className="relative w-full min-h-[220px] md:min-h-[260px] rounded-3xl glass-card border border-[#d4af37]/30 shadow-2xl overflow-hidden flex items-center justify-center p-6 md:p-10 select-none cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        {/* Revealed Countdown Content (Underneath canvas) */}
        <div className="grid grid-cols-4 gap-3 md:gap-8 w-full max-w-3xl z-10">
          <div className="flex flex-col items-center justify-center bg-[#09110d]/90 p-4 md:p-6 rounded-2xl border border-[#d4af37]/25 shadow-inner">
            <span className="text-3xl md:text-6xl font-bold font-heading text-gold-gradient">
              {toDariDigits(timeLeft.days)}
            </span>
            <span className="text-xs md:text-base text-[#a0b0a8] mt-2 font-medium">
              روز
            </span>
          </div>

          <div className="flex flex-col items-center justify-center bg-[#09110d]/90 p-4 md:p-6 rounded-2xl border border-[#d4af37]/25 shadow-inner">
            <span className="text-3xl md:text-6xl font-bold font-heading text-gold-gradient">
              {toDariDigits(timeLeft.hours)}
            </span>
            <span className="text-xs md:text-base text-[#a0b0a8] mt-2 font-medium">
              ساعت
            </span>
          </div>

          <div className="flex flex-col items-center justify-center bg-[#09110d]/90 p-4 md:p-6 rounded-2xl border border-[#d4af37]/25 shadow-inner">
            <span className="text-3xl md:text-6xl font-bold font-heading text-gold-gradient">
              {toDariDigits(timeLeft.minutes)}
            </span>
            <span className="text-xs md:text-base text-[#a0b0a8] mt-2 font-medium">
              دقیقه
            </span>
          </div>

          <div className="flex flex-col items-center justify-center bg-[#09110d]/90 p-4 md:p-6 rounded-2xl border border-[#d4af37]/25 shadow-inner">
            <span className="text-3xl md:text-6xl font-bold font-heading text-gold-gradient text-emerald-400">
              {toDariDigits(timeLeft.seconds)}
            </span>
            <span className="text-xs md:text-base text-[#a0b0a8] mt-2 font-medium">
              ثانیه
            </span>
          </div>
        </div>

        {/* Fog Canvas Layer */}
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 z-20 ${
            hasRevealed ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        />

        {/* Swipe Visual Prompt Overlay */}
        {!hasRevealed && percentCleared < 15 && (
          <div className="absolute z-30 pointer-events-none flex flex-col items-center justify-center gap-2 bg-[#0d1511]/70 backdrop-blur-md px-6 py-3 rounded-2xl border border-[#d4af37]/40 shadow-xl">
            <Hand size={32} className="text-[#d4af37] animate-bounce" />
            <span className="text-xs md:text-sm text-[#e8f0eb] font-semibold">
              انگشت خود را روی بخار بکشید
            </span>
          </div>
        )}
      </div>
    </section>
  );
}

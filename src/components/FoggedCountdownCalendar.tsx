"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Sparkle, Eraser, CalendarCheck, Clock } from "@phosphor-icons/react";

export default function FoggedCountdownCalendar() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [clearedPercent, setClearingPercent] = useState(0);
  const [isFullyRevealed, setIsFullyRevealed] = useState(false);

  // Target date: October 13, 2025 or 2026 (based on event ISO)
  const targetDate = new Date("2025-10-13T18:00:00+04:30").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Live countdown timer
  useEffect(() => {
    const updateCountdown = () => {
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

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  // Canvas Fogged/Frost Scratch Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = container.clientHeight);

    const handleResize = () => {
      if (!canvas || !container) return;
      width = canvas.width = container.clientWidth;
      height = canvas.height = container.clientHeight;
      drawFog();
    };

    const drawFog = () => {
      ctx.globalCompositeOperation = "source-over";
      // Frosted glass background
      ctx.fillStyle = "rgba(241, 232, 212, 0.95)";
      ctx.fillRect(0, 0, width, height);

      // Frost pattern texture
      ctx.fillStyle = "rgba(255, 253, 246, 0.7)";
      for (let i = 0; i < 40; i++) {
        ctx.beginPath();
        ctx.arc(
          Math.random() * width,
          Math.random() * height,
          20 + Math.random() * 40,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }

      // Add text instruction on the fog
      ctx.font = "bold 16px Vazirmatn, sans-serif";
      ctx.fillStyle = "#8a6329";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("✨ برای دیدن روزشمار، اینجا را پاک کنید ✨", width / 2, height / 2);
    };

    drawFog();
    window.addEventListener("resize", handleResize);

    // Scratch logic
    let isDrawing = false;

    const getPos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    };

    const scratch = (x: number, y: number) => {
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 35, 0, Math.PI * 2);
      ctx.fill();
      checkClearPercentage();
    };

    const checkClearPercentage = () => {
      const imgData = ctx.getImageData(0, 0, width, height);
      let cleared = 0;
      for (let i = 3; i < imgData.data.length; i += 16) {
        if (imgData.data[i] === 0) cleared++;
      }
      const totalPixels = imgData.data.length / 16;
      const percentage = Math.round((cleared / totalPixels) * 100);
      setClearingPercent(percentage);
      if (percentage > 45) {
        setIsFullyRevealed(true);
      }
    };

    const startDraw = (e: MouseEvent | TouchEvent) => {
      isDrawing = true;
      const pos = getPos(e);
      scratch(pos.x, pos.y);
    };

    const moveDraw = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing) return;
      const pos = getPos(e);
      scratch(pos.x, pos.y);
    };

    const stopDraw = () => {
      isDrawing = false;
    };

    canvas.addEventListener("mousedown", startDraw);
    canvas.addEventListener("mousemove", moveDraw);
    window.addEventListener("mouseup", stopDraw);

    canvas.addEventListener("touchstart", startDraw, { passive: true });
    canvas.addEventListener("touchmove", moveDraw, { passive: true });
    window.addEventListener("touchend", stopDraw);

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousedown", startDraw);
      canvas.removeEventListener("mousemove", moveDraw);
      window.removeEventListener("mouseup", stopDraw);
      canvas.removeEventListener("touchstart", startDraw);
      canvas.removeEventListener("touchmove", moveDraw);
      window.removeEventListener("touchend", stopDraw);
    };
  }, []);

  // Calendar days grid for October 2025 (October 13 is a Monday / دوشنبه)
  // October 2025 starts on Wednesday (Oct 1). Days: 31 days.
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <section className="py-12 px-4 max-w-4xl mx-auto" dir="rtl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">

        {/* 1. Frosted Scratch Countdown Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="paper-card p-6 relative flex flex-col justify-between overflow-hidden border border-[var(--line)] shadow-md"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-1.5 text-xs text-[var(--gold)] font-bold tracking-wider uppercase">
                <Clock size={18} className="text-[var(--gold)]" />
                روزشمار معکوس تا محفل
              </span>
              {!isFullyRevealed && (
                <span className="inline-flex items-center gap-1 text-[11px] text-[var(--ruby)] font-medium bg-[var(--ruby)]/10 px-2.5 py-1 rounded-full">
                  <Eraser size={14} />
                  روی شیشه بکشید
                </span>
              )}
            </div>

            <h3 className="text-xl font-bold text-[var(--ink)] mb-2">
              زمان باقی‌مانده تا پیوند
            </h3>
            <p className="text-xs text-[var(--ink-muted)] mb-4">
              دوشنبه، ۱۳ میزان ۱۴۰۴ - ساعت ۶:۰۰ شام
            </p>
          </div>

          {/* Canvas Scratch Container & Underlying Countdown */}
          <div
            ref={containerRef}
            className="relative w-full min-h-[170px] rounded-2xl overflow-hidden bg-gradient-to-br from-[#faf5e8] to-[#f1e8d4] border border-[#e9c96a]/50 p-4 flex items-center justify-center shadow-inner"
          >
            {/* Underlying Countdown Grid */}
            <div className="grid grid-cols-4 gap-2 text-center w-full select-none">
              <div className="bg-[#7a1c28] text-[#faf5e8] rounded-xl p-2.5 flex flex-col items-center justify-center shadow-sm">
                <span className="text-2xl font-extrabold font-mono">
                  {timeLeft.days}
                </span>
                <span className="text-[11px] mt-1 opacity-90">روز</span>
              </div>

              <div className="bg-[#b8863f] text-[#faf5e8] rounded-xl p-2.5 flex flex-col items-center justify-center shadow-sm">
                <span className="text-2xl font-extrabold font-mono">
                  {timeLeft.hours}
                </span>
                <span className="text-[11px] mt-1 opacity-90">ساعت</span>
              </div>

              <div className="bg-[#241d17] text-[#faf5e8] rounded-xl p-2.5 flex flex-col items-center justify-center shadow-sm">
                <span className="text-2xl font-extrabold font-mono">
                  {timeLeft.minutes}
                </span>
                <span className="text-[11px] mt-1 opacity-90">دقیقه</span>
              </div>

              <div className="bg-[#4a6b40] text-[#faf5e8] rounded-xl p-2.5 flex flex-col items-center justify-center shadow-sm">
                <span className="text-2xl font-extrabold font-mono">
                  {timeLeft.seconds}
                </span>
                <span className="text-[11px] mt-1 opacity-90">ثانیه</span>
              </div>
            </div>

            {/* Fog Scratch-Off Overlay Canvas */}
            <canvas
              ref={canvasRef}
              className={`absolute inset-0 z-10 cursor-pointer transition-opacity duration-700 ${
                isFullyRevealed ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            />
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-[var(--ink-muted)]">
            <span className="flex items-center gap-1">
              <Sparkle size={14} className="text-[var(--gold)]" />
              لحظه‌شماری برای دیدار شما
            </span>
            {clearedPercent > 0 && !isFullyRevealed && (
              <span className="text-[11px] font-mono text-[var(--gold-dark)]">
                {clearedPercent}% نمایان شد
              </span>
            )}
          </div>
        </motion.div>

        {/* 2. Anniversary Event Calendar Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="paper-card p-6 relative flex flex-col justify-between border border-[var(--line)] shadow-md"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-1.5 text-xs text-[var(--ruby)] font-bold tracking-wider uppercase">
                <CalendarCheck size={18} className="text-[var(--ruby)]" />
                تقویم اختصاصی محفل
              </span>
              <span className="text-xs font-semibold text-[var(--gold-dark)]">
                اکتبر ۲۰۲۵ / میزان ۱۴۰۴
              </span>
            </div>

            <h3 className="text-xl font-bold text-[var(--ink)] mb-2">
              تقویم روز ماندگار
            </h3>
            <p className="text-xs text-[var(--ink-muted)] mb-4">
              تاریخ ۱۳ اکتبر به‌عنوان روز پیوند فرهاد و سحر نشان‌گذاری شده است.
            </p>
          </div>

          {/* Calendar Grid */}
          <div className="bg-[#faf5e8] rounded-2xl p-4 border border-[#e9c96a]/40 shadow-inner">
            {/* Weekdays header */}
            <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-bold text-[var(--ink-muted)] mb-2 border-b border-[#e9c96a]/30 pb-2">
              <span>ش</span>
              <span>۱ش</span>
              <span>۲ش</span>
              <span>۳ش</span>
              <span>۴ش</span>
              <span>۵ش</span>
              <span>ج</span>
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {/* Empty padding for month start */}
              <span className="p-1.5 text-transparent">0</span>
              <span className="p-1.5 text-transparent">0</span>
              <span className="p-1.5 text-transparent">0</span>
              <span className="p-1.5 text-transparent">0</span>

              {daysInMonth.map((day) => {
                const isWeddingDay = day === 13;
                return (
                  <div
                    key={day}
                    className={`p-1.5 rounded-lg flex items-center justify-center font-medium transition-all ${
                      isWeddingDay
                        ? "bg-[#7a1c28] text-[#faf5e8] font-extrabold shadow-md scale-110 ring-2 ring-[#e9c96a] relative z-10 animate-pulse"
                        : "text-[var(--ink)] hover:bg-[#f1e8d4]"
                    }`}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-[var(--ruby)] font-medium">
            <span>✨ دوشنبه ۱۳ اکتبر - روز عروسی</span>
            <span className="text-[11px] text-[var(--ink-muted)]">
              تالار هتل تاج کانتیننتال
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

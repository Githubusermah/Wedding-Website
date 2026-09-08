"use client";

import { motion } from "motion/react";
import { ArrowUp, Heart, Sparkle } from "@phosphor-icons/react";

interface FooterReplayProps {
  onReplay?: () => void;
}

export default function FooterReplay({ onReplay }: FooterReplayProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (onReplay) {
      setTimeout(() => {
        onReplay();
      }, 600);
    }
  };

  return (
    <footer className="py-16 px-4 bg-[#050806] border-t border-[#d4af37]/20 text-center relative overflow-hidden">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-center gap-2 text-2xl font-heading text-gold-gradient">
          <span>خدیجه</span>
          <Heart size={20} weight="fill" className="text-[#d4af37]" />
          <span>سمیر</span>
        </div>

        <p className="text-xs md:text-sm text-[#a0b0a8] max-w-md mx-auto leading-relaxed font-poetry text-lg">
          «عشق در لغت‌نامه دلم تنها با نام شما معنا می‌گیرد»
          <br />
          منتظر حضور گرم شما در جشن پیوند آسمانی‌مان هستیم.
        </p>

        {/* Scroll Back to Top & Replay Video Button */}
        <div>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#12221a] to-[#0a1410] border border-[#d4af37]/50 text-[#d4af37] font-semibold text-xs md:text-sm shadow-xl shadow-[#d4af37]/10 hover:border-[#d4af37] hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer group"
          >
            <ArrowUp size={18} weight="bold" className="group-hover:-translate-y-1 transition-transform" />
            <span>بازگشت به بالا و مشاهده مجدد ویدیو</span>
          </button>
        </div>

        <div className="pt-8 border-t border-white/5 text-[11px] text-[#55665e]">
          طراحی شده با عشق جهت جشن پیوند خدیجه و سمیر © ۱۴۰۳
        </div>
      </div>
    </footer>
  );
}

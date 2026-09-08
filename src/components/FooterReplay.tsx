"use client";

import { motion } from "motion/react";
import { ArrowUp, Heart, FlowerTulip } from "@phosphor-icons/react";

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
    <footer className="py-16 px-4 bg-[#f4efe6] border-t border-[#c5a059]/30 text-center relative overflow-hidden">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-center gap-3 text-3xl font-heading text-deep-red-gradient">
          <span>فرهاد</span>
          <Heart size={24} weight="fill" className="text-[#8b1e2d] animate-pulse" />
          <span>سحر</span>
        </div>

        <p className="text-sm md:text-base text-[#4a5850] max-w-md mx-auto leading-relaxed font-serif text-lg font-medium">
          «عشق در لغت‌نامه دلم تنها با نام شما معنا می‌گیرد»
          <br />
          منتظر حضور گرم و صمیمی شما در جشن پیوند آسمانی‌مان هستیم.
        </p>

        {/* Scroll Back to Top & Replay Video Button */}
        <div>
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white border border-[#c5a059] text-[#8b1e2d] font-bold text-xs md:text-sm shadow-md hover:bg-[#8b1e2d] hover:text-white hover:border-[#8b1e2d] hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer group"
          >
            <ArrowUp size={18} weight="bold" className="group-hover:-translate-y-1 transition-transform" />
            <span>بازگشت به بالا و مشاهده مجدد</span>
          </button>
        </div>

        <div className="pt-8 border-t border-stone-300 text-xs text-[#687870] font-medium flex items-center justify-center gap-2">
          <FlowerTulip size={16} weight="fill" className="text-[#5b7e53]" />
          <span>طراحی شده جهت جشن پیوند فرهاد و سحر © ۱۴۰۴ / ۲۰۲۵</span>
        </div>
      </div>
    </footer>
  );
}

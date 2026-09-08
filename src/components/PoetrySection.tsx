"use client";

import { motion } from "motion/react";
import { Heart, Sparkle } from "@phosphor-icons/react";

export default function PoetrySection() {
  return (
    <section className="py-20 px-4 relative max-w-4xl mx-auto text-center" id="poetry-section">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass-card rounded-3xl p-8 md:p-14 border border-[#d4af37]/30 shadow-2xl relative"
      >
        {/* Calligraphic Top Emblem */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-[#10b981]/10 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] shadow-lg">
            <Heart size={30} weight="fill" className="text-[#d4af37]" />
          </div>
        </div>

        <span className="text-xs md:text-sm font-semibold tracking-widest text-[#d4af37] uppercase bg-[#d4af37]/10 px-4 py-1.5 rounded-full border border-[#d4af37]/30">
          به نام پیونددهنده قلب‌ها
        </span>

        {/* Groom & Bride Names */}
        <div className="my-8 space-y-2">
          <h1 className="text-4xl md:text-6xl font-heading text-gold-gradient tracking-wide">
            خدیجه <span className="text-[#a0b0a8] font-sans font-light text-2xl md:text-4xl mx-2">&</span> سمیر
          </h1>
          <p className="text-[#a0b0a8] text-sm md:text-base font-medium">
            شما را به آیین آغاز زندگی مشترک‌مان فرا می‌خوانند
          </p>
        </div>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center gap-3 my-8 opacity-80">
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
          <Sparkle size={18} weight="fill" className="text-[#d4af37]" />
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
        </div>

        {/* Classical Dari Poetry Verses */}
        <div className="space-y-6 font-poetry text-xl md:text-3xl text-[#f3efe6] leading-relaxed max-w-2xl mx-auto">
          <p className="hover:text-[#d4af37] transition-colors duration-300">
            «در نمازم خم ابروی تو با یاد آمد
            <br />
            حالتی رفت که محراب به فریاد آمد»
          </p>

          <p className="text-lg md:text-2xl text-[#d4af37] pt-2 italic">
            خداوند مهربان را سپاس که دستان ما را در مسیر دلدادگی گره زد
            <br />
            و با حضور گرم شما، این شادمانی جاودانه می‌شود.
          </p>
        </div>

        {/* Bottom Ornament */}
        <div className="mt-10 pt-6 border-t border-[#d4af37]/20 flex justify-center items-center gap-2 text-xs md:text-sm text-[#a0b0a8]">
          <span>با کمال افتخار و ادب</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
          <span>خانواده‌های محترم رضایی و همت</span>
        </div>
      </motion.div>
    </section>
  );
}

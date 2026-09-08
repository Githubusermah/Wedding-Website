"use client";

import { motion } from "motion/react";
import { Heart, Sparkle, FlowerTulip } from "@phosphor-icons/react";

export default function PoetrySection() {
  return (
    <section className="py-16 px-4 relative max-w-4xl mx-auto text-center" id="poetry-section">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass-card rounded-3xl p-8 md:p-14 border border-[#c5a059]/40 shadow-xl relative overflow-hidden"
      >
        {/* Subtle Botanical BG Accent */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#5b7e53]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#8b1e2d]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Calligraphic Top Emblem */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#8b1e2d] to-[#b32b3f] text-white flex items-center justify-center shadow-lg border-2 border-[#c5a059]">
            <Heart size={32} weight="fill" />
          </div>
        </div>

        <span className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold tracking-widest text-[#8b1e2d] uppercase bg-[#fdf0f2] px-4 py-1.5 rounded-full border border-[#8b1e2d]/20 shadow-xs">
          <FlowerTulip size={16} weight="fill" className="text-[#5b7e53]" />
          به نام پیونددهنده قلب‌ها
        </span>

        {/* Groom & Bride Names */}
        <div className="my-8 space-y-3">
          <h1 className="text-4xl md:text-6xl font-heading text-deep-red-gradient tracking-wide">
            فرهاد <span className="text-[#c5a059] font-sans font-light text-2xl md:text-4xl mx-3">&</span> سحر
          </h1>
          <p className="text-[#4a5850] text-sm md:text-base font-medium">
            شما را به آیین آغاز زندگی مشترک و پیوند آسمانی‌شان فرا می‌خوانند
          </p>
        </div>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center gap-3 my-8 opacity-80">
          <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-[#c5a059] to-transparent" />
          <Sparkle size={20} weight="fill" className="text-[#8b1e2d]" />
          <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-[#c5a059] to-transparent" />
        </div>

        {/* Classical Dari Poetry Verses */}
        <div className="space-y-6 font-serif text-2xl md:text-4xl text-[#2c3831] leading-relaxed max-w-2xl mx-auto font-bold">
          <p className="text-[#8b1e2d] drop-shadow-2xs">
            «در نمازم خم ابروی تو با یاد آمد
            <br />
            حالتی رفت که محراب به فریاد آمد»
          </p>

          <p className="text-base md:text-xl text-[#5b7e53] font-sans font-normal pt-2 leading-loose">
            خداوند مهربان را سپاس که دستان ما را در مسیر دلدادگی گره زد؛
            <br />
            با حضور گرم و صمیمی شما عزیزان، این شادمانی جاودانه خواهد شد.
          </p>
        </div>

        {/* Bottom Ornament */}
        <div className="mt-10 pt-6 border-t border-[#c5a059]/30 flex justify-center items-center gap-2 text-xs md:text-sm text-[#4a5850] font-medium">
          <span>با کمال افتخار و ادب</span>
          <span className="w-2 h-2 rounded-full bg-[#8b1e2d]" />
          <span>خانواده‌های محترم رضایی و همت</span>
        </div>
      </motion.div>
    </section>
  );
}

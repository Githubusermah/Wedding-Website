"use client";

import Image from "next/image";
import { event } from "@/lib/event";
import { ArrowUp } from "@phosphor-icons/react";
import InitialsMonogram from "@/components/InitialsMonogram";

export default function FooterReplay() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 px-4 border-t border-[var(--line)] bg-[var(--ivory-deep)]/40 text-center space-y-6 max-w-4xl mx-auto rounded-t-2xl">
      <div className="flex flex-col items-center justify-center space-y-3">
        <InitialsMonogram size={64} showGlow={true} />
        <p className="font-nastaliq text-3xl text-[var(--ruby)] font-bold mt-2">
          {event.coupleDisplayName}
        </p>
        <p className="text-xs md:text-sm text-[var(--ink-muted)] max-w-md mx-auto leading-relaxed">
          با سپاس از تشریف‌فرمایی و قدوم مبارک شما در این جشن فرخنده
        </p>
      </div>

      {/* Arvin Atelier Signature Branding */}
      <div className="pt-2 flex flex-col items-center justify-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity">
        <div className="relative w-24 h-12">
          <Image
            src="/arvin-atelier-logo.jpg"
            alt="Arvin Atelier Logo"
            fill
            className="object-contain"
          />
        </div>
        <span className="text-[10px] text-[var(--ink-muted)] font-mono tracking-widest uppercase">
          DESIGNED BY ARVIN ATELIER
        </span>
      </div>

      <div className="pt-4 border-t border-[var(--line)]/50 flex items-center justify-between text-xs text-[var(--ink-muted)] max-w-md mx-auto">
        <span>۱۴۰۵ هـ.ش</span>
        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-1 font-semibold text-[var(--ruby)] hover:text-[var(--ruby-deep)] transition-colors cursor-pointer"
        >
          <span>بازگشت به بالا</span>
          <ArrowUp size={14} />
        </button>
      </div>
    </footer>
  );
}

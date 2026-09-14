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
    <footer className="py-14 px-4 border-t border-[var(--line-subtle)] text-center space-y-6 max-w-2xl mx-auto">
      <div className="flex flex-col items-center justify-center space-y-3">
        <InitialsMonogram size={56} />
        <p className="font-nastaliq text-2xl text-[var(--ink)] font-bold mt-1">
          {event.coupleDisplayName}
        </p>
        <p className="text-xs text-[var(--ink-muted)] max-w-md mx-auto leading-relaxed">
          با سپاس از تشریف‌فرمایی و قدوم مبارک شما در این جشن فرخنده
        </p>
      </div>

      {/* Arvin Atelier Signature Branding */}
      <div className="pt-2 flex flex-col items-center justify-center gap-1 opacity-80 hover:opacity-100 transition-opacity">
        <div className="relative w-20 h-10">
          <Image
            src="/arvin-atelier-logo.jpg"
            alt="Arvin Atelier Logo"
            fill
            className="object-contain"
          />
        </div>
        <span className="text-[9px] text-[var(--ink-muted)] font-mono tracking-widest uppercase">
          DESIGNED BY ARVIN ATELIER
        </span>
      </div>

      <div className="pt-4 border-t border-[var(--line-subtle)] flex items-center justify-between text-xs text-[var(--ink-muted)]">
        <span>۱۴۰۵ هـ.ش</span>
        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-1 font-medium text-[var(--gold-dark)] hover:underline cursor-pointer"
        >
          <span>بازگشت به بالا</span>
          <ArrowUp size={14} />
        </button>
      </div>
    </footer>
  );
}

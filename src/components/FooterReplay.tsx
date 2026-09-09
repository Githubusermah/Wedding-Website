"use client";

import { event } from "@/lib/event";
import Image from "next/image";
import { ArrowUp } from "@phosphor-icons/react";

export default function FooterReplay() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-10 px-4 border-t border-[var(--line)] bg-[var(--ivory-deep)]/40 text-center space-y-4 max-w-4xl mx-auto rounded-t-2xl">
      <div className="flex flex-col items-center justify-center space-y-2">
        <p className="font-nastaliq text-2xl text-[var(--ruby)]">
          {event.coupleDisplayName}
        </p>
        <p className="text-xs text-[var(--ink-muted)]">
          با سپاس از تشریف‌فرمایی و قدوم مبارک شما در این جشن فرخنده
        </p>
      </div>

      {/* Arvin Atelier Signature Footer Badge */}
      <div className="py-3 px-4 max-w-xs mx-auto rounded-xl bg-[var(--paper-white)]/80 border border-[var(--gold)]/30 flex items-center justify-center gap-3 shadow-xs">
        <Image
          src="/arvin-atelier-logo.jpg"
          alt="Arvin Atelier Logo"
          width={36}
          height={36}
          className="rounded-full border border-[var(--gold)] shrink-0"
        />
        <div className="text-right">
          <p className="text-[11px] font-bold text-[var(--ruby)] leading-tight">
            ARVIN ATELIER
          </p>
          <p className="text-[10px] text-[var(--ink-muted)]">
            طراحی و اجرای تشریفات دیجیتال
          </p>
        </div>
      </div>

      <div className="pt-2 flex items-center justify-between text-xs text-[var(--ink-muted)] max-w-md mx-auto">
        <span>۱۴۰۵ هـ.ش</span>
        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-1 font-semibold text-[var(--ruby)] hover:text-[var(--ruby-deep)] transition-colors"
        >
          <span>بازگشت به بالا</span>
          <ArrowUp size={14} />
        </button>
      </div>
    </footer>
  );
}

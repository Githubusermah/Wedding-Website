"use client";

import { event } from "@/lib/event";
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

      <div className="pt-2 flex items-center justify-between text-xs text-[var(--ink-muted)] max-w-md mx-auto">
        <span>۱۴۰۴ هـ.ش</span>
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

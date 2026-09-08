"use client";

export default function TextileBorder() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Top Right Corner Rosette Stitch */}
      <svg
        className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 text-[var(--ruby)] opacity-20"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      >
        <circle cx="100" cy="0" r="80" strokeDasharray="3 3" />
        <circle cx="100" cy="0" r="60" />
        <circle cx="100" cy="0" r="40" strokeDasharray="2 2" />
        <path d="M100 0 L30 70 M100 0 L50 86 M100 0 L70 95" />
        <path d="M70 20 C60 30, 40 30, 30 20 C20 40, 20 60, 30 70" />
      </svg>

      {/* Top Left Corner Rosette Stitch */}
      <svg
        className="absolute top-0 left-0 w-32 h-32 md:w-48 md:h-48 text-[var(--ruby)] opacity-20 transform -scale-x-100"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      >
        <circle cx="100" cy="0" r="80" strokeDasharray="3 3" />
        <circle cx="100" cy="0" r="60" />
        <circle cx="100" cy="0" r="40" strokeDasharray="2 2" />
        <path d="M100 0 L30 70 M100 0 L50 86 M100 0 L70 95" />
      </svg>

      {/* Subtle Frame Hairline */}
      <div className="absolute inset-3 md:inset-6 border border-[var(--line)] rounded-[var(--radius-paper)] pointer-events-none" />
    </div>
  );
}

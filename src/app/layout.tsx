@import "tailwindcss";

@layer base {
  :root {
    --font-vazir: var(--font-vazirmatn), sans-serif;
    --font-amiri-serif: var(--font-amiri), serif;
    --font-lalezar-heading: var(--font-lalezar), display;
    --font-naskh: var(--font-noto-naskh), serif;

    /* ---- Theme: candlelit velvet — warm black, antique gold, oxblood, jade ---- */
    --color-ink-bg: #120f0c;          /* warm near-black, not pure black */
    --color-ink-bg-deep: #0a0806;     /* deepest panel/footer tone */
    --color-ivory: #f3ead6;           /* warm ivory body text */
    --color-ivory-soft: #cfc4ad;      /* secondary/muted text on dark */

    --color-pistachio: #6e9c5f;       /* jade, brightened to read on dark */
    --color-pistachio-dark: #4a6b40;
    --color-pistachio-light: #1c2618; /* dark jade panel tint */

    --color-deep-red: #b23a48;        /* oxblood, brightened for dark bg */
    --color-deep-red-dark: #7a1c28;
    --color-deep-red-light: #2a1315;  /* dark ruby panel tint */

    --color-gold: #d4af37;            /* antique gold */
    --color-gold-dark: #a9822b;
    --color-gold-light: #2b230f;      /* dark gold panel tint */
  }
}

* {
  outline-color: var(--color-gold);
}

body {
  font-family: var(--font-vazir);
  background-color: var(--color-ink-bg);
  color: var(--color-ivory);

  /* Faint radial warmth, like candlelight falling across the page —
     not a spotlight, barely perceptible. */
  background-image:
    radial-gradient(ellipse at 50% 0%, rgba(212, 175, 55, 0.06) 0%, transparent 55%),
    radial-gradient(ellipse at 50% 100%, rgba(122, 28, 40, 0.05) 0%, transparent 55%);
  background-attachment: fixed;
}

/* Never apply letter-spacing to Persian/Arabic text: it breaks glyph joining. */
.font-poetry {
  font-family: var(--font-amiri-serif);
  line-height: 2;
  color: var(--color-ivory-soft);
}

.font-heading {
  font-family: var(--font-lalezar-heading);
  letter-spacing: 0;
}

.font-naskh {
  font-family: var(--font-naskh);
  line-height: 1.9;
}

/* ---- Gold-foil text: reserve for the couple's names / one hero line, not every heading ---- */
.text-gold-gradient {
  background: linear-gradient(160deg, #a9822b 0%, #e9c96a 45%, #a9822b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.text-deep-red-gradient {
  background: linear-gradient(160deg, #8f2130 0%, #b23a48 50%, #7a1c28 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.text-pistachio-gradient {
  background: linear-gradient(160deg, #587e4d 0%, #6e9c5f 50%, #4a6b40 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.bg-gold-gradient {
  background: linear-gradient(160deg, #e9c96a 0%, #d4af37 50%, #a9822b 100%);
}
.bg-deep-red-gradient {
  background: linear-gradient(160deg, #c14456 0%, #b23a48 50%, #7a1c28 100%);
}
.bg-pistachio-gradient {
  background: linear-gradient(160deg, #7fae6d 0%, #6e9c5f 50%, #4a6b40 100%);
}

/* ---- Ivory glass card: light stationery floating on the dark velvet backdrop ---- */
.glass-card {
  position: relative;
  background: rgba(243, 234, 214, 0.96);
  color: var(--color-ink-bg);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(212, 175, 55, 0.55);
  border-radius: 6px;
  box-shadow: 0 20px 45px -18px rgba(0, 0, 0, 0.6),
              0 1px 0 rgba(255, 255, 255, 0.4) inset;
}

/* Hairline inner rule — engraved-invitation feel instead of a plain card edge */
.glass-card::before {
  content: "";
  position: absolute;
  inset: 6px;
  border: 1px solid rgba(169, 130, 43, 0.35);
  border-radius: 3px;
  pointer-events: none;
}

.glass-card-pistachio {
  background: rgba(238, 244, 237, 0.96);
  border-color: rgba(74, 107, 64, 0.5);
}
.glass-card-pistachio::before {
  border-color: rgba(74, 107, 64, 0.3);
}

.glass-card-ruby {
  background: rgba(250, 240, 240, 0.96);
  border-color: rgba(122, 28, 40, 0.5);
}
.glass-card-ruby::before {
  border-color: rgba(122, 28, 40, 0.3);
}

.glass-card-hover {
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.glass-card-hover:hover {
  transform: translateY(-3px);
  box-shadow: 0 26px 50px -18px rgba(0, 0, 0, 0.65),
              0 1px 0 rgba(255, 255, 255, 0.5) inset;
}

/* Small ornamental divider — for genuine section breaks, not decoration everywhere */
.ornament-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  color: var(--color-gold);
}
.ornament-divider::before,
.ornament-divider::after {
  content: "";
  height: 1px;
  width: 48px;
  background: linear-gradient(90deg, transparent, currentColor);
}
.ornament-divider::after {
  background: linear-gradient(270deg, transparent, currentColor);
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: var(--color-ink-bg-deep);
}
::-webkit-scrollbar-thumb {
  background: var(--color-gold);
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: var(--color-deep-red);
}

::selection {
  background: var(--color-gold);
  color: var(--color-ink-bg);
}

/* ---- Motion: one deliberate float for the fog/countdown moment, nothing scattered ---- */
@keyframes floatSlow {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
}
.animate-float {
  animation: floatSlow 6s ease-in-out infinite;
}

@keyframes pulseGlow {
  0%, 100% { opacity: 0.55; transform: scale(1); }
  50% { opacity: 0.85; transform: scale(1.03); }
}
.animate-pulse-glow {
  animation: pulseGlow 5s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .animate-float,
  .animate-pulse-glow,
  .glass-card-hover {
    animation: none;
    transition: none;
  }
}

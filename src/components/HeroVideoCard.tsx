@import "tailwindcss";

@layer base {
  :root {
    --font-vazir: var(--font-vazirmatn), sans-serif;
    --font-amiri-serif: var(--font-amiri), serif;
    --font-lalezar-heading: var(--font-lalezar), display;
    --font-naskh: var(--font-noto-naskh), serif;

    /* ---- Theme: ivory invitation card — warm paper, oxblood, jade, antique brass ---- */
    --color-cream-bg: #f6f0e2;        /* warm ivory paper, not stark white */
    --color-cream-bg-deep: #efe6d2;   /* deeper panel/footer tone */
    --color-ink: #241d17;             /* warm near-black body text */
    --color-ink-soft: #4a4038;        /* secondary text */

    --color-pistachio: #4a6b40;       /* deep jade */
    --color-pistachio-dark: #2c4025;
    --color-pistachio-light: #e6ede1;

    --color-deep-red: #7a1c28;        /* oxblood/garnet */
    --color-deep-red-dark: #4f1119;
    --color-deep-red-light: #f6e9e9;

    --color-gold: #b8863f;            /* antique brass */
    --color-gold-dark: #8a6329;
    --color-gold-light: #f2e8d3;
  }
}

* {
  outline-color: var(--color-gold-dark);
}

body {
  font-family: var(--font-vazir);
  background-color: var(--color-cream-bg);
  color: var(--color-ink);

  /* Faint warmth, barely perceptible — not a flat fill */
  background-image:
    radial-gradient(circle at 20% 15%, rgba(184, 134, 63, 0.06) 0%, transparent 45%),
    radial-gradient(circle at 80% 80%, rgba(74, 107, 64, 0.05) 0%, transparent 45%);
  background-attachment: fixed;
}

/* Never apply letter-spacing to Persian/Arabic text: it breaks glyph joining. */
.font-poetry {
  font-family: var(--font-amiri-serif);
  line-height: 2;
  color: var(--color-ink-soft);
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
  background: linear-gradient(160deg, #8a6329 0%, #c99b4e 45%, #8a6329 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.text-deep-red-gradient {
  background: linear-gradient(160deg, #8f2130 0%, #7a1c28 50%, #4f1119 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.text-pistachio-gradient {
  background: linear-gradient(160deg, #587e4d 0%, #4a6b40 50%, #2c4025 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.bg-gold-gradient { background: linear-gradient(160deg, #c99b4e 0%, #b8863f 50%, #8a6329 100%); }
.bg-deep-red-gradient { background: linear-gradient(160deg, #8f2130 0%, #7a1c28 50%, #4f1119 100%); }
.bg-pistachio-gradient { background: linear-gradient(160deg, #587e4d 0%, #4a6b40 50%, #2c4025 100%); }

/* ---- Invitation card: paper + hairline foil rule, not frosted glass ---- */
.glass-card {
  position: relative;
  background: rgba(253, 250, 243, 0.92);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(184, 134, 63, 0.4);
  border-radius: 6px;
  box-shadow: 0 14px 32px -16px rgba(74, 42, 20, 0.15),
              0 1px 0 rgba(255, 255, 255, 0.6) inset;
}
.glass-card::before {
  content: "";
  position: absolute;
  inset: 6px;
  border: 1px solid rgba(184, 134, 63, 0.25);
  border-radius: 3px;
  pointer-events: none;
}

.glass-card-pistachio {
  background: rgba(238, 244, 237, 0.94);
  border-color: rgba(74, 107, 64, 0.35);
}
.glass-card-pistachio::before { border-color: rgba(74, 107, 64, 0.25); }

.glass-card-ruby {
  background: rgba(250, 240, 240, 0.94);
  border-color: rgba(122, 28, 40, 0.3);
}
.glass-card-ruby::before { border-color: rgba(122, 28, 40, 0.25); }

.glass-card-hover {
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.glass-card-hover:hover {
  transform: translateY(-3px);
  border-color: rgba(184, 134, 63, 0.65);
  box-shadow: 0 20px 38px -16px rgba(122, 28, 40, 0.18),
              0 1px 0 rgba(255, 255, 255, 0.7) inset;
}

/* Small ornamental divider — for genuine section breaks */
.ornament-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  color: var(--color-gold-dark);
}
.ornament-divider::before,
.ornament-divider::after {
  content: "";
  height: 1px;
  width: 48px;
  background: linear-gradient(90deg, transparent, currentColor);
}
.ornament-divider::after { background: linear-gradient(270deg, transparent, currentColor); }

::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: var(--color-cream-bg-deep); }
::-webkit-scrollbar-thumb { background: var(--color-gold); border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: var(--color-deep-red); }

::selection {
  background: var(--color-gold-light);
  color: var(--color-deep-red-dark);
}

@keyframes floatSlow {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
}
.animate-float { animation: floatSlow 6s ease-in-out infinite; }

@keyframes pulseGlow {
  0%, 100% { opacity: 0.55; transform: scale(1); }
  50% { opacity: 0.85; transform: scale(1.03); }
}
.animate-pulse-glow { animation: pulseGlow 5s ease-in-out infinite; }

@media (prefers-reduced-motion: reduce) {
  .animate-float,
  .animate-pulse-glow,
  .glass-card-hover {
    animation: none;
    transition: none;
  }
}

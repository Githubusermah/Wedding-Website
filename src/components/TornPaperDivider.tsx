"use client";

import React from "react";

interface TornPaperDividerProps {
  variant?: "top" | "bottom" | "both";
  flipHorizontal?: boolean;
  className?: string;
  fillColor?: string;
}

export default function TornPaperDivider({
  variant = "top",
  flipHorizontal = false,
  className = "",
  fillColor = "var(--paper-white)",
}: TornPaperDividerProps) {
  // Bespoke organic hand-torn torn paper edge path
  const tornPath =
    "M0,0 Q30,12 60,4 Q90,16 120,6 Q150,18 180,8 Q210,14 240,5 Q270,16 300,7 Q330,15 360,3 Q390,12 420,8 Q450,18 480,5 Q510,14 540,8 Q570,16 600,4 Q630,15 660,7 Q690,18 720,5 Q750,12 780,8 Q810,16 840,4 Q870,15 900,6 Q930,18 960,8 Q990,14 1020,5 Q1050,16 1080,7 Q1110,15 1140,4 Q1170,12 1200,0 L1200,32 L0,32 Z";

  return (
    <div
      className={`w-full overflow-hidden leading-none pointer-events-none select-none z-10 ${className}`}
      style={{
        transform: `${variant === "bottom" ? "rotate(180deg)" : ""} ${
          flipHorizontal ? "scaleX(-1)" : ""
        }`,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 32"
        preserveAspectRatio="none"
        className="w-full h-6 sm:h-8 md:h-10 block"
        style={{ filter: "drop-shadow(0px 3px 4px rgba(44, 38, 33, 0.06))" }}
      >
        {/* Subtle deckled torn paper fiber background accent */}
        <path
          d={tornPath}
          fill="var(--ivory-deep)"
          transform="translate(0, 3)"
          opacity="0.5"
        />
        {/* Main torn paper layer */}
        <path d={tornPath} fill={fillColor} />
      </svg>
    </div>
  );
}

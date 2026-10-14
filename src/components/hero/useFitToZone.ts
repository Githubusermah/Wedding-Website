"use client";

import { useLayoutEffect, useRef } from "react";

export function useFitToZone<Z extends HTMLElement = HTMLDivElement, I extends HTMLElement = HTMLDivElement>() {
  const zoneRef = useRef<Z | null>(null);
  const innerRef = useRef<I | null>(null);

  useLayoutEffect(() => {
    const fit = () => {
      const z = zoneRef.current;
      const e = innerRef.current;
      if (!z || !e) return;

      const cs = getComputedStyle(z);
      const aw =
        z.clientWidth -
        parseFloat(cs.paddingLeft || "0") -
        parseFloat(cs.paddingRight || "0");
      const ah =
        z.clientHeight -
        parseFloat(cs.paddingTop || "0") -
        parseFloat(cs.paddingBottom || "0");

      e.style.transform = "none";
      e.style.margin = "0";

      const scale = Math.max(
        0.2,
        Math.min(1.45, aw / e.offsetWidth, ah / e.offsetHeight)
      );

      e.style.transform = `scale(${scale})`;
      e.style.margin = `${-(e.offsetHeight * (1 - scale)) / 2}px ${
        -(e.offsetWidth * (1 - scale)) / 2
      }px`;
    };

    fit();
    window.addEventListener("resize", fit);

    const ro =
      typeof window !== "undefined" && window.ResizeObserver
        ? new ResizeObserver(fit)
        : null;

    if (ro && innerRef.current) {
      ro.observe(innerRef.current);
    }

    if (typeof document !== "undefined" && document.fonts && document.fonts.ready) {
      document.fonts.ready.then(fit);
    }

    return () => {
      window.removeEventListener("resize", fit);
      if (ro) ro.disconnect();
    };
  }, []);

  return { zoneRef, innerRef };
}

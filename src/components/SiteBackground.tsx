"use client";

import React from "react";

export default function SiteBackground() {
  return (
    <div
      className="site-bg-root"
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
        contain: "strict",
        background:
          "radial-gradient(ellipse at 50% 35%, #fff6f8 0, #fde4ea 40%, #f6c3d0 80%, #eeaabd 100%)",
      }}
    >
      <div className="L paper" />
      <div className="L star" />
      <div className="L fib" />
      <div className="L grain" />
      <div className="L light" />
      <div className="L fleck" />
      <div className="L fleck b" />
      <div className="L vig" />
      <div className="blob b1" />
      <div className="blob b2" />
      <div className="blob b3" />
      <div className="blob b4" />
    </div>
  );
}

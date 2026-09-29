"use client";

import { useEffect, useRef, useState } from "react";

// Depth colour stops: [scroll progress 0-1, hex colour]
const STOPS: [number, string][] = [
  [0, "#1a7f94"],
  [0.2, "#125f76"],
  [0.45, "#093c52"],
  [0.7, "#052437"],
  [1, "#020608"],
];

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function colourAt(progress: number) {
  const p = Math.min(1, Math.max(0, progress));
  let lo = STOPS[0];
  let hi = STOPS[STOPS.length - 1];
  for (let i = 0; i < STOPS.length - 1; i++) {
    if (p >= STOPS[i][0] && p <= STOPS[i + 1][0]) {
      lo = STOPS[i];
      hi = STOPS[i + 1];
      break;
    }
  }
  const range = hi[0] - lo[0] || 1;
  const t = (p - lo[0]) / range;
  const [r1, g1, b1] = hexToRgb(lo[1]);
  const [r2, g2, b2] = hexToRgb(hi[1]);
  const r = Math.round(lerp(r1, r2, t));
  const g = Math.round(lerp(g1, g2, t));
  const b = Math.round(lerp(b1, b2, t));
  return `rgb(${r}, ${g}, ${b})`;
}

export default function DepthBackground() {
  const [bg, setBg] = useState(STOPS[0][1]);
  const ticking = useRef(false);

  useEffect(() => {
    function onScroll() {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        const progress = max > 0 ? window.scrollY / max : 0;
        setBg(colourAt(progress));
        ticking.current = false;
      });
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 transition-colors duration-300 ease-out"
      style={{ background: bg }}
    />
  );
}

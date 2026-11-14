"use client";

import { useEffect, useRef, useState } from "react";

// Scroll position shown as a dive depth gauge: the top of the page is the
// surface and the bottom is MAX_DEPTH metres down.
const MAX_DEPTH = 100;
const TICKS = 21;

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    function onScroll() {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
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

  const depth = Math.round(progress * MAX_DEPTH);

  return (
    <div
      aria-hidden
      className="font-mono-tech pointer-events-none fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 text-white/85 mix-blend-difference md:flex"
    >
      <span className="text-[10px] uppercase tracking-[0.2em] text-white/50">Depth</span>

      <div className="flex items-baseline gap-1">
        <span className="text-lg font-bold tabular-nums leading-none">
          {String(depth).padStart(3, "0")}
        </span>
        <span className="text-[10px]">m</span>
      </div>

      {/* gauge: tick scale with a marker that sinks as you scroll */}
      <div className="relative h-40 w-6">
        <div className="absolute inset-y-0 right-0 flex flex-col justify-between">
          {Array.from({ length: TICKS }, (_, i) => (
            <span
              key={i}
              className={`block h-px bg-white ${i % 5 === 0 ? "w-3 opacity-70" : "w-1.5 opacity-30"}`}
            />
          ))}
        </div>
        <div
          className="absolute right-0 flex -translate-y-1/2 items-center gap-1 transition-[top] duration-150 ease-out"
          style={{ top: `${progress * 100}%` }}
        >
          <span className="block h-0 w-0 border-y-[4px] border-l-[6px] border-y-transparent border-l-white" />
          <span className="block h-0.5 w-5 bg-white" />
        </div>
      </div>

      <span className="text-[10px] tabular-nums text-white/50">{MAX_DEPTH} m</span>
    </div>
  );
}

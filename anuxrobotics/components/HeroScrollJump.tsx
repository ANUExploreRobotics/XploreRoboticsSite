"use client";

import { useEffect } from "react";

export default function HeroScrollJump({ targetId }: { targetId: string }) {
  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const tolerance = 4;

    const getTargetTop = () =>
      target.getBoundingClientRect().top + window.scrollY;

    const jumpTo = (top: number) => {
      window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
    };

    // Returns true if it handled (snapped) the scroll — caller should preventDefault.
    const trySnap = (dir: 1 | -1) => {
      const y = window.scrollY;
      const top = getTargetTop();

      if (dir === 1) {
        // scrolling down: snap forward if we're anywhere in the gap (including at 0)
        if (y < top - tolerance) {
          jumpTo(top);
          return true;
        }
      } else {
        // scrolling up: snap back if we're anywhere in the gap (including right at top)
        if (y > tolerance && y <= top + tolerance) {
          jumpTo(0);
          return true;
        }
      }
      return false;
    };

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      const dir = e.deltaY > 0 ? 1 : -1;
      if (trySnap(dir)) e.preventDefault();
    };

    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      const delta = touchStartY - e.touches[0].clientY;
      if (Math.abs(delta) < 10) return;
      const dir = delta > 0 ? 1 : -1;
      if (trySnap(dir)) e.preventDefault();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " "].includes(e.key)) {
        if (trySnap(1)) e.preventDefault();
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        if (trySnap(-1)) e.preventDefault();
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [targetId]);

  return null;
}
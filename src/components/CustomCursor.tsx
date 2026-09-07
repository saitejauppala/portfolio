"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

type CursorState = "default" | "link" | "view";

/**
 * Custom cursor for fine pointers: a small dot, a lagging ring, and a
 * soft glow. Grows over links/buttons and shows "View" over elements
 * marked with data-cursor="view". Fully disabled on touch devices and
 * when the user prefers reduced motion.
 */
export default function CustomCursor() {
  const reduced = useReducedMotion();
  const [enabled] = useState(() => {
    if (typeof window === "undefined") return false;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    return window.matchMedia("(pointer: fine)").matches;
  });
  const [state, setState] = useState<CursorState>("default");
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 320, damping: 28, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 320, damping: 28, mass: 0.6 });
  const glowX = useSpring(x, { stiffness: 90, damping: 24, mass: 1 });
  const glowY = useSpring(y, { stiffness: 90, damping: 24, mass: 1 });

  useEffect(() => {
    if (!enabled || reduced) return;
    document.documentElement.classList.add("has-custom-cursor");

    function onMove(e: PointerEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    }

    function onOver(e: PointerEvent) {
      const target = e.target as Element | null;
      const view = target?.closest?.('[data-cursor="view"]');
      const interactive = target?.closest?.("a, button, [role='button'], input, textarea, select, [data-cursor]");
      if (view) setState("view");
      else if (interactive) setState("link");
      else setState("default");
    }

    function onLeave() {
      setVisible(false);
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, reduced, x, y]);

  if (!enabled || reduced) return null;

  const ringScale = state === "view" ? 2.6 : state === "link" ? 1.7 : 1;
  const ringColor = state === "view" ? "rgba(255,255,255,0.9)" : state === "link" ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.35)";

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full bg-white"
        style={{ x, y, translateX: "-50%", translateY: "-50%", opacity: visible ? 1 : 0 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] flex h-10 w-10 items-center justify-center rounded-full border"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
          scale: ringScale,
          borderColor: ringColor,
          boxShadow: `0 0 24px -4px ${ringColor}`,
          transition: "scale 0.25s ease, border-color 0.25s ease",
        }}
      >
        {state === "view" ? (
          <span className="text-[10px] font-semibold uppercase tracking-widest text-white">
            View
          </span>
        ) : null}
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[99] h-40 w-40 rounded-full"
        style={{
          x: glowX,
          y: glowY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 0.35 : 0,
          background:
            "radial-gradient(circle, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 45%, transparent 70%)",
          scale: state === "view" ? 1.4 : 1,
          transition: "scale 0.3s ease",
        }}
      />
    </>
  );
}
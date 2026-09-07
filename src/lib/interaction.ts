"use client";

/**
 * Shared, mutable interaction state (pointer + scroll).
 *
 * A single set of listeners updates this store so every 3D scene and
 * parallax layer reads from the same smoothed source, avoiding
 * duplicate listeners and React re-renders (values are read directly
 * inside requestAnimationFrame loops).
 */

export const interaction = {
  /** Normalized pointer position, -0.5..0.5 (0 = center). */
  px: 0,
  py: 0,
  /** Raw pointer position in pixels. */
  mx: 0,
  my: 0,
  /** Vertical scroll progress, 0..1 across the whole page. */
  scroll: 0,
  /** Whether the device has a fine pointer (mouse/trackpad). */
  finePointer: false,
  initialized: false,
};

function onPointerMove(e: PointerEvent) {
  interaction.mx = e.clientX;
  interaction.my = e.clientY;
  interaction.px = e.clientX / window.innerWidth - 0.5;
  interaction.py = e.clientY / window.innerHeight - 0.5;
}

function onScroll() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  interaction.scroll = max > 0 ? window.scrollY / max : 0;
}

export function initInteraction() {
  if (interaction.initialized) return;
  interaction.initialized = true;
  interaction.finePointer =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: fine)").matches;

  if (typeof window === "undefined") return;

  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}
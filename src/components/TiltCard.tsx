"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";

/**
 * Perspective tilt card with spring physics and a glare highlight that
 * follows the cursor. Disabled when the user prefers reduced motion.
 */
export default function TiltCard({
  children,
  className = "",
  maxTilt = 8,
}: {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  const springX = useSpring(rotateX, { stiffness: 200, damping: 20, mass: 0.5 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 20, mass: 0.5 });

  const transform = useMotionTemplate`perspective(950px) rotateX(${springX}deg) rotateY(${springY}deg) scale3d(1.012, 1.012, 1.012)`;
  const glare = useMotionTemplate`radial-gradient(460px circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.1), transparent 55%)`;

  function handleMove(event: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || reduced) return;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    rotateX.set((py - 0.5) * -maxTilt);
    rotateY.set((px - 0.5) * maxTilt);
    glareX.set(px * 100);
    glareY.set(py * 100);
  }

  function handleLeave() {
    rotateX.set(0);
    rotateY.set(0);
    glareX.set(50);
    glareY.set(50);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={reduced ? undefined : handleMove}
      onPointerLeave={reduced ? undefined : handleLeave}
      className={`group relative will-change-transform ${className}`}
      style={{
        transform: reduced ? undefined : transform,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
      <motion.div
        aria-hidden
        className="tilt-glare"
        style={{ background: reduced ? undefined : glare }}
      />
    </motion.div>
  );
}
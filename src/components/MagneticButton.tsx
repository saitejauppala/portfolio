"use client";

import type { ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

/**
 * Magnetic button: the whole control gravitates toward the cursor with
 * spring physics while the label shifts a little further. Renders as an
 * <a> when `href` is provided, otherwise a <button>.
 */
export default function MagneticButton({
  children,
  className = "",
  href,
  onClick,
  target,
  rel,
  ariaLabel,
  type = "button",
  strength = 0.3,
}: {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
  ariaLabel?: string;
  type?: "button" | "submit";
  strength?: number;
}) {
  const reduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 16, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 220, damping: 16, mass: 0.5 });

  // Inner content drifts further than the button body.
  const innerX = useTransform(springX, (v) => v * 0.45);
  const innerY = useTransform(springY, (v) => v * 0.45);
  const rotate = useTransform(springX, [-60, 60], [-2.2, 2.2]);

  function handleMove(event: React.MouseEvent) {
    if (reduced) return;
    const el = event.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  const motionProps = {
    onPointerMove: reduced ? undefined : handleMove,
    onPointerLeave: reduced ? undefined : handleLeave,
  };

  const content = (
    <motion.span
      className="inline-flex items-center gap-2"
      style={reduced ? undefined : { x: innerX, y: innerY, rotate }}
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        onClick={onClick}
        className={`inline-block ${className}`}
        style={reduced ? undefined : { x: springX, y: springY }}
        {...motionProps}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      aria-label={ariaLabel}
      onClick={onClick}
      className={`inline-block ${className}`}
      style={reduced ? undefined : { x: springX, y: springY }}
      {...motionProps}
    >
      {content}
    </motion.button>
  );
}
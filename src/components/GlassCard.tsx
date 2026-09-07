"use client";

import type { ReactNode } from "react";
import TiltCard from "@/components/TiltCard";

/**
 * Premium glass card: blurred translucent surface, inner highlight,
 * optional cursor-following glow, tilt, and holographic scanlines.
 */
export default function GlassCard({
  children,
  className = "",
  tilt = true,
  scanlines = false,
  holo = false,
  maxTilt = 8,
  dataCursor,
}: {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
  scanlines?: boolean;
  holo?: boolean;
  maxTilt?: number;
  dataCursor?: "view";
}) {
  const card = (
    <div
      data-cursor={dataCursor}
      className={`glass h-full rounded-2xl ${scanlines ? "scanlines" : ""} ${
        holo ? "holo-glow" : ""
      } ${className}`}
    >
      {children}
    </div>
  );

  if (!tilt) return card;
  return (
    <TiltCard className="h-full rounded-2xl" maxTilt={maxTilt}>
      {card}
    </TiltCard>
  );
}
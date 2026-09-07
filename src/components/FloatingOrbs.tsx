"use client";

/**
 * Floating decorative 3D shapes. Pure DOM/CSS (cheap, no extra WebGL
 * contexts) with gentle float + glow, rendered in monochrome white on
 * the black theme. Positions are passed in as static config so
 * rendering is fully deterministic (SSR-safe).
 */

export type OrbConfig = {
  top: string;
  left: string;
  size: number;
  kind: "ring" | "cube" | "dot" | "torus";
  duration: number;
  delay: number;
  rotate: number;
  opacity?: number;
};

function Orb({ orb }: { orb: OrbConfig }) {
  const style: React.CSSProperties = {
    top: orb.top,
    left: orb.left,
    width: orb.size,
    height: orb.size,
    opacity: orb.opacity ?? 0.7,
    ["--float-duration" as string]: `${orb.duration}s`,
    ["--float-delay" as string]: `${orb.delay}s`,
    ["--rot" as string]: `${orb.rotate}deg`,
  };

  return (
    <div className="pointer-events-none absolute animate-float" style={style} aria-hidden>
      {orb.kind === "ring" ? (
        <div className="h-full w-full rounded-full border border-white/25 shadow-[0_0_40px_-8px_rgba(255,255,255,0.35)]" />
      ) : orb.kind === "torus" ? (
        <div
          className="h-full w-full rounded-full border-2 border-dashed border-white/20"
          style={{ transform: `rotateX(65deg) rotateZ(${orb.rotate}deg)` }}
        />
      ) : orb.kind === "cube" ? (
        <div
          className="h-full w-full rounded-[18%] border border-white/20 bg-white/10 shadow-[0_0_44px_-8px_rgba(255,255,255,0.3)]"
          style={{ transform: `rotate(${orb.rotate}deg) rotateX(24deg)` }}
        />
      ) : (
        <div
          className="h-full w-full rounded-full shadow-[0_0_44px_-8px_rgba(255,255,255,0.35)]"
          style={{
            background:
              "radial-gradient(circle at 32% 30%, rgba(255,255,255,0.95), rgba(255,255,255,0.28) 45%, transparent 72%)",
          }}
        />
      )}
    </div>
  );
}

export default function FloatingOrbs({ orbs }: { orbs: OrbConfig[] }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {orbs.map((orb, i) => (
        <Orb key={i} orb={orb} />
      ))}
    </div>
  );
}

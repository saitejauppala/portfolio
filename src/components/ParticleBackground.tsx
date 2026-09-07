"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { interaction } from "@/lib/interaction";

const MAX_CLOUD = 550;

// Pre-generated at module load so rendering stays pure.
const CLOUD_POSITIONS = (() => {
  const arr = new Float32Array(MAX_CLOUD * 3);
  for (let i = 0; i < MAX_CLOUD; i++) {
    // Wide, shallow cloud stretched horizontally to fill the viewport.
    arr[i * 3] = (Math.random() - 0.5) * 26;
    arr[i * 3 + 1] = (Math.random() - 0.5) * 14;
    arr[i * 3 + 2] = -2 - Math.random() * 8;
  }
  return arr;
})();

function Cloud({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(
    () => CLOUD_POSITIONS.slice(0, Math.min(count, MAX_CLOUD) * 3),
    [count]
  );

  useFrame((state, delta) => {
    const pts = ref.current;
    if (!pts) return;
    // Slow drift plus subtle reaction to pointer and scroll.
    pts.rotation.y = THREE.MathUtils.damp(pts.rotation.y, interaction.px * 0.1 + state.clock.elapsedTime * 0.008, 2, delta);
    pts.rotation.x = THREE.MathUtils.damp(pts.rotation.x, interaction.py * 0.06 + interaction.scroll * 0.35, 2, delta);
    pts.position.y = -interaction.py * 0.4 + interaction.scroll * -1.5;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#ffffff"
        transparent
        opacity={0.3}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function ParticleBackground() {
  const [count] = useState(() => {
    if (typeof window === "undefined") return 400;
    if (window.innerWidth < 768) return 200;
    if (window.innerWidth < 1280) return 350;
    return 550;
  });
  const [enabled] = useState(() => {
    if (typeof window === "undefined") return true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    return true;
  });

  if (!enabled) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
        style={{ background: "transparent" }}
      >
        <Cloud count={count} />
      </Canvas>
    </div>
  );
}
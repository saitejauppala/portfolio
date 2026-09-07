"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { interaction } from "@/lib/interaction";

/* ------------------------------------------------------------------ */
/* Core: liquid-metal distorting icosahedron                           */
/* ------------------------------------------------------------------ */

function DistortCore() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    // Gentle idle breathing + pointer-driven sway on the whole object.
    ref.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 0.9) * 0.02);
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.55, 5]} />
      <MeshDistortMaterial
        color="#0a0a0a"
        emissive="#e4e4e7"
        emissiveIntensity={0.07}
        metalness={0.85}
        roughness={0.25}
        distort={0.34}
        speed={1.6}
      />
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/* Morphing wireframe shells (crossfade over time)                     */
/* ------------------------------------------------------------------ */

const SHELLS = [
  { radius: 2.15, speed: 0.1, kind: "sphere" },
  { radius: 2.35, speed: 0.08, kind: "icosa" },
  { radius: 2.55, speed: 0.12, kind: "torus" },
] as const;

function Shell({ radius, speed, kind, phase }: { radius: number; speed: number; kind: string; phase: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      ref.current.rotation.x = t * speed + phase;
      ref.current.rotation.y = t * speed * 1.3 - phase * 2;
    }
    if (mat.current) {
      // Slow crossfade so the shell "morphs" between shapes.
      mat.current.opacity = 0.06 + 0.14 * (0.5 + 0.5 * Math.sin(t * 0.45 + phase));
    }
  });

  return (
    <mesh ref={ref}>
      {kind === "sphere" ? <sphereGeometry args={[radius, 28, 20]} /> : null}
      {kind === "icosa" ? <icosahedronGeometry args={[radius, 1]} /> : null}
      {kind === "torus" ? <torusGeometry args={[radius, 0.012, 8, 96]} /> : null}
      <meshBasicMaterial ref={mat} wireframe color="#ffffff" transparent opacity={0.12} />
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/* Rings                                                                */
/* ------------------------------------------------------------------ */

function Rings() {
  const a = useRef<THREE.Mesh>(null);
  const b = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (a.current) {
      a.current.rotation.x = 1.35 + Math.sin(t * 0.3) * 0.12;
      a.current.rotation.z = t * 0.18;
    }
    if (b.current) {
      b.current.rotation.x = 1.75 - Math.sin(t * 0.25) * 0.14;
      b.current.rotation.z = -t * 0.22;
    }
  });

  return (
    <>
      <mesh ref={a}>
        <torusGeometry args={[2.9, 0.02, 8, 128]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.28} />
      </mesh>
      <mesh ref={b}>
        <torusGeometry args={[3.4, 0.014, 8, 128]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.15} />
      </mesh>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Reconstruction: particles scatter in, then form a shell             */
/* ------------------------------------------------------------------ */

const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);

const MAX_PARTICLES = 900;

// Pre-generated at module load (impure work kept out of render).
const PARTICLE_DATA = (() => {
  const positions = new Float32Array(MAX_PARTICLES * 3);
  const targets = new Float32Array(MAX_PARTICLES * 3);
  const delays = new Float32Array(MAX_PARTICLES);
  for (let i = 0; i < MAX_PARTICLES; i++) {
    // Scattered start: shell of radius 5..9
    const sr = 5 + Math.random() * 4;
    const st = Math.random() * Math.PI * 2;
    const sp = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = sr * Math.sin(sp) * Math.cos(st);
    positions[i * 3 + 1] = sr * Math.sin(sp) * Math.sin(st);
    positions[i * 3 + 2] = sr * Math.cos(sp);
    // Target: surface of the core's shell with jitter
    const tr = 1.7 + Math.random() * 0.85;
    const tt = Math.random() * Math.PI * 2;
    const tp = Math.acos(2 * Math.random() - 1);
    targets[i * 3] = tr * Math.sin(tp) * Math.cos(tt);
    targets[i * 3 + 1] = tr * Math.sin(tp) * Math.sin(tt);
    targets[i * 3 + 2] = tr * Math.cos(tp);
    delays[i] = Math.random() * 0.9;
  }
  return { positions, targets, delays };
})();

const OUTER_FIELD_POSITIONS = (() => {
  const arr = new Float32Array(MAX_PARTICLES * 3);
  for (let i = 0; i < MAX_PARTICLES; i++) {
    const r = 5.5 + Math.random() * 9;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    arr[i * 3 + 2] = r * Math.cos(phi);
  }
  return arr;
})();

function ReconstructingParticles({ count }: { count: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const n = Math.min(count, MAX_PARTICLES);
  const { positions, targets, delays } = useMemo(
    () => ({
      positions: PARTICLE_DATA.positions.slice(0, n * 3),
      targets: PARTICLE_DATA.targets.slice(0, n * 3),
      delays: PARTICLE_DATA.delays.slice(0, n),
    }),
    [n]
  );

  const progress = useRef(-1.2); // negative = pre-roll so formation starts at mount

  useFrame((state, delta) => {
    progress.current += delta;
    const p = progress.current;
    const pts = pointsRef.current;
    if (!pts) return;
    const attr = pts.geometry.attributes.position as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    for (let i = 0; i < count; i++) {
      // Ease per-particle progress: forms 0 -> 1 over ~2.2s with stagger
      const local = (p - delays[i]) / 2.2;
      const k = easeOutCubic(THREE.MathUtils.clamp(local, 0, 1));
      arr[i * 3] = positions[i * 3] + (targets[i * 3] - positions[i * 3]) * k;
      arr[i * 3 + 1] = positions[i * 3 + 1] + (targets[i * 3 + 1] - positions[i * 3 + 1]) * k;
      arr[i * 3 + 2] = positions[i * 3 + 2] + (targets[i * 3 + 2] - positions[i * 3 + 2]) * k;
    }
    attr.needsUpdate = true;
    // Once formed, breathe subtly
    if (p > 2.6) {
      pts.rotation.y += delta * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        color="#ffffff"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ------------------------------------------------------------------ */
/* Outer starfield                                                     */
/* ------------------------------------------------------------------ */

function OuterField({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(
    () => OUTER_FIELD_POSITIONS.slice(0, Math.min(count, MAX_PARTICLES) * 3),
    [count]
  );

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#ffffff"
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ------------------------------------------------------------------ */
/* Main group: pointer + scroll reaction                               */
/* ------------------------------------------------------------------ */

function HeroRig() {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    // Smoothly follow the pointer; slow idle rotation when untouched.
    const targetX = -interaction.py * 0.28;
    const targetY = interaction.px * 0.4 + state.clock.elapsedTime * 0.08;
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, targetX, 3.2, delta);
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, targetY, 3.2, delta);
    // Drift toward the camera as the user scrolls.
    const z = THREE.MathUtils.damp(g.position.z, interaction.scroll * 0.9, 3, delta);
    g.position.z = z;
  });

  return (
    <group ref={group}>
      <Float speed={1.6} rotationIntensity={0.25} floatIntensity={0.6} floatingRange={[-0.1, 0.12]}>
        <DistortCore />
        <Rings />
      </Float>
      <Shell radius={SHELLS[0].radius} speed={SHELLS[0].speed} kind={SHELLS[0].kind} phase={0} />
      <Shell radius={SHELLS[1].radius} speed={SHELLS[1].speed} kind={SHELLS[1].kind} phase={2.1} />
      <Shell radius={SHELLS[2].radius} speed={SHELLS[2].speed} kind={SHELLS[2].kind} phase={4.2} />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Canvas wrapper                                                      */
/* ------------------------------------------------------------------ */

export default function Hero3D() {
  const [count] = useState(() =>
    typeof window !== "undefined" && window.innerWidth < 768 ? 450 : 900
  );

  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
      aria-hidden
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[6, 4, 6]} intensity={30} color="#ffffff" />
      <pointLight position={[-6, -3, 4]} intensity={26} color="#ffffff" />
      <pointLight position={[0, 5, -4]} intensity={14} color="#ffffff" />
      <HeroRig />
      <ReconstructingParticles count={count} />
      <OuterField count={count} />
    </Canvas>
  );
}
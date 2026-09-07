"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { profile } from "@/data/portfolio";
import {
  ArrowRightIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from "@/components/icons";
import MagneticButton from "@/components/MagneticButton";
import FloatingOrbs, { type OrbConfig } from "@/components/FloatingOrbs";

const Hero3D = dynamic(() => import("@/components/Hero3D"), { ssr: false });

const heroOrbs: OrbConfig[] = [
  { top: "12%", left: "8%", size: 26, kind: "ring", duration: 8, delay: 0, rotate: 20, opacity: 0.5 },
  { top: "20%", left: "86%", size: 34, kind: "cube", duration: 11, delay: 1.2, rotate: 24, opacity: 0.4 },
  { top: "64%", left: "90%", size: 18, kind: "dot", duration: 7, delay: 0.6, rotate: 0, opacity: 0.7 },
  { top: "72%", left: "4%", size: 22, kind: "torus", duration: 12, delay: 2, rotate: 30, opacity: 0.35 },
  { top: "44%", left: "2%", size: 14, kind: "dot", duration: 9, delay: 0.9, rotate: 0, opacity: 0.6 },
];

const nameChars = profile.name.split("");

const charVariants: Variants = {
  hidden: { opacity: 0, y: 60, rotateX: 70, scale: 0.85 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  // Scroll-driven parallax: content drifts up slower than the page while
  // the 3D background recedes.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 150]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 90]);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* 3D background layer */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ y: bgY }}
      >
        <div className="absolute inset-0">
          <Hero3D />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-black" />
      </motion.div>

      {/* Floating decorative orbs */}
      <FloatingOrbs orbs={heroOrbs} />

      {/* Cyber perspective grid floor */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-72 origin-top overflow-hidden"
        style={{ opacity: gridOpacity }}
      >
        <div className="cyber-grid h-[300%] w-full" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="mx-auto w-full max-w-5xl px-6 py-24 sm:py-32"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.p
          className="text-sm font-semibold uppercase tracking-widest text-white/50"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Hello, I&apos;m
        </motion.p>

        {/* 3D typography: character-level reveal with depth */}
        <h1
          className="mt-4 text-5xl font-bold tracking-tight sm:text-7xl"
          style={{ perspective: 800 }}
        >
          <motion.span
            className="inline-block text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.9),0_0_2px_rgba(0,0,0,0.6)]"
            initial={reduced ? false : "hidden"}
            animate="visible"
            transition={{ staggerChildren: 0.045, delayChildren: 0.25 }}
            aria-label={profile.name}
          >
            {nameChars.map((char, i) => (
              <motion.span
                key={i}
                aria-hidden
                className="inline-block will-change-transform"
                variants={reduced ? undefined : charVariants}
                whileHover={reduced ? undefined : { y: -6, scale: 1.08 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.span>
        </h1>

        <motion.p
          className="mt-5 text-xl font-medium text-white/90 sm:text-2xl"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          {profile.role}
        </motion.p>

        <motion.p
          className="mt-6 max-w-2xl leading-relaxed text-white/75"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.95 }}
        >
          {profile.summary}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center gap-4"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
        >
          <MagneticButton
            href="#projects"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black shadow-[0_0_30px_-8px_rgba(255,255,255,0.45)] transition-colors hover:bg-neutral-200"
          >
            View My Work
            <ArrowRightIcon className="h-4 w-4" />
          </MagneticButton>
          <MagneticButton
            href="#contact"
            className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/80 hover:bg-white/5"
          >
            Get in Touch
          </MagneticButton>
        </motion.div>

        <motion.div
          className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/75"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.25 }}
        >
          <span className="inline-flex items-center gap-2">
            <MapPinIcon className="h-4 w-4 text-white/60" />
            {profile.location}
          </span>
          <a
            href={profile.phoneHref}
            className="inline-flex items-center gap-2 transition-colors hover:text-white"
          >
            <PhoneIcon className="h-4 w-4 text-white/60" />
            {profile.phoneDisplay}
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 transition-colors hover:text-white"
          >
            <MailIcon className="h-4 w-4 text-white/60" />
            {profile.email}
          </a>
          <span className="inline-flex items-center gap-2">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-white"
            >
              <GithubIcon className="h-4 w-4 text-white/60" />
              GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-white"
            >
              <LinkedinIcon className="h-4 w-4 text-white/60" />
              LinkedIn
            </a>
          </span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 sm:block"
        style={{ opacity: contentOpacity }}
      >
        <span className="flex h-10 w-6 items-start justify-center rounded-full border border-white/25 p-1.5">
          <span className="scroll-wheel h-2 w-1 rounded-full bg-white/90" />
        </span>
      </motion.a>
    </section>
  );
}
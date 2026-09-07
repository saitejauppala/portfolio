"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import GlassCard from "@/components/GlassCard";

const LINES = [
  {
    cmd: "whoami",
    out: "Sai Teja Uppala — Cybersecurity & Software Developer",
    href: "#home",
  },
  {
    cmd: "skills",
    out: "Java · Python · AWS · MySQL · Network Security · Linux · DSA",
    href: "#skills",
  },
  {
    cmd: "projects",
    out: "Face Recognition System · Urban Company Service Platform",
    href: "#projects",
  },
  {
    cmd: "education",
    out: "Diploma in Computer Engineering · 88% · June 2025",
    href: "#education",
  },
  {
    cmd: "contact",
    out: "saitejauppala07@gmail.com · Vijayawada, India",
    href: "#contact",
  },
];

const TYPE_MS = 34;
const PAUSE_MS = 900;

/**
 * Floating glass terminal that types through commands, printing outputs
 * and looping. Completed command lines are clickable and jump to the
 * matching portfolio section.
 */
export default function Terminal() {
  const reduced = useReducedMotion();
  const [lineIndex, setLineIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [showingOutput, setShowingOutput] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (reduced) return; // static rendering below

    timers.current.forEach(clearTimeout);
    timers.current = [];

    const line = LINES[lineIndex];

    if (!showingOutput) {
      if (typed.length < line.cmd.length) {
        const t = window.setTimeout(() => {
          setTyped(line.cmd.slice(0, typed.length + 1));
        }, TYPE_MS);
        timers.current.push(t);
      } else {
        const t = window.setTimeout(() => setShowingOutput(true), 420);
        timers.current.push(t);
      }
    } else {
      const t = window.setTimeout(() => {
        const next = (lineIndex + 1) % LINES.length;
        setLineIndex(next);
        setTyped("");
        setShowingOutput(false);
      }, PAUSE_MS);
      timers.current.push(t);
    }

    return () => timers.current.forEach(clearTimeout);
  }, [lineIndex, typed, showingOutput, reduced]);

  if (reduced) {
    // Reduced motion: show the full session statically.
    return (
      <GlassCard tilt scanlines holo className="overflow-hidden font-mono text-sm">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-white/30" />
          <span className="h-3 w-3 rounded-full bg-white/30" />
          <span className="h-3 w-3 rounded-full bg-white/30" />
          <span className="ml-3 text-xs text-white/50">saiteja@portfolio: ~</span>
        </div>
        <div className="min-h-[300px] space-y-1 px-4 py-4 sm:min-h-[330px]">
          {LINES.map((line, i) => (
            <div key={i} className="space-y-1">
              <a href={line.href} className="block w-fit text-white transition-colors hover:text-white/60">
                <span className="text-white">$</span> {line.cmd}
              </a>
              <p className="text-white/70">{line.out}</p>
            </div>
          ))}
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard tilt scanlines holo className="overflow-hidden font-mono text-sm">
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-white/30" />
        <span className="h-3 w-3 rounded-full bg-white/30" />
        <span className="h-3 w-3 rounded-full bg-white/30" />
        <span className="ml-3 text-xs text-white/50">saiteja@portfolio: ~</span>
      </div>

      <div className="min-h-[300px] space-y-1 px-4 py-4 sm:min-h-[330px]">
        {LINES.slice(0, lineIndex).map((line, i) => (
          <div key={i} className="space-y-1">              <a
                href={line.href}
                className="block w-fit transition-colors hover:text-white/60"
              >
                <span className="text-white">$</span>{" "}
                <span className="text-white">{line.cmd}</span>
              </a>
              <p className="text-white/70">{line.out}</p>
          </div>
        ))}

        {/* Current line being typed */}
        <div className="space-y-1">
          <p className="text-white">
            <span className="text-white">$</span>{" "}
            {typed}
            <span className="terminal-cursor ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-white" />
          </p>
          {showingOutput ? (
            <p className="text-white/70">{LINES[lineIndex].out}</p>
          ) : null}
        </div>

        <p className="pt-3 text-xs text-white/40">
          tip: completed commands jump to that section
        </p>
      </div>
    </GlassCard>
  );
}
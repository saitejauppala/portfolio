"use client";

import { Children, type ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 42, rotateX: 10, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
};

/**
 * Depth-based section reveal: children emerge from the page with a
 * slight 3D rotation, staggered. Honors prefers-reduced-motion.
 */
export default function ViewFade({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className="relative mx-auto max-w-5xl px-6"
      initial={reduced ? false : "hidden"}
      whileInView={reduced ? undefined : "visible"}
      viewport={{ once: true, margin: "-64px" }}
      variants={reduced ? undefined : containerVariants}
      style={{ perspective: 1100 }}
    >
      {Children.map(children, (child) => (
        <motion.div
          variants={reduced ? undefined : childVariants}
          style={reduced ? undefined : { transformStyle: "preserve-3d" }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
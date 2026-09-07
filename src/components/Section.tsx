import type { ReactNode } from "react";
import ViewFade from "./ViewFade";
import GlobalStyles from "./GlobalStyles";



export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-20 py-20 sm:py-24 ${className}`}>
      <GlobalStyles />
      <ViewFade>{children}</ViewFade>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-12">
      <p className="text-sm font-semibold uppercase tracking-widest text-white/50">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 max-w-2xl leading-relaxed text-white/70">{description}</p>
      ) : null}
    </div>
  );
}
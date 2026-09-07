import { skills } from "@/data/portfolio";
import { Section, SectionHeading } from "@/components/Section";
import GlassCard from "@/components/GlassCard";
import FloatingOrbs, { type OrbConfig } from "@/components/FloatingOrbs";

const orbs: OrbConfig[] = [
  { top: "4%", left: "6%", size: 24, kind: "dot", duration: 9, delay: 0.2, rotate: 0, opacity: 0.5 },
  { top: "38%", left: "93%", size: 28, kind: "ring", duration: 11, delay: 1.4, rotate: 25, opacity: 0.4 },
  { top: "82%", left: "10%", size: 18, kind: "cube", duration: 10, delay: 2.2, rotate: 40, opacity: 0.3 },
];

export default function Skills() {
  return (
    <Section id="skills">
      <div className="relative">
        <FloatingOrbs orbs={orbs} />
        <SectionHeading
          eyebrow="Skills"
          title="Technical Skills"
          description="Technologies and concepts I work with across development, security, and the cloud."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group) => (
            <GlassCard key={group.category} className="p-5">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-white">
                {group.category}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/85 transition-all duration-300 hover:-translate-y-1 hover:border-white/70 hover:bg-white/20 hover:text-white hover:shadow-[0_6px_18px_-6px_rgba(255,255,255,0.45)]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </GlassCard>
          ))}
        </div>
      </div>
    </Section>
  );
}
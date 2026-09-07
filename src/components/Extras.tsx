import { achievements, hackathons } from "@/data/portfolio";
import { Section, SectionHeading } from "@/components/Section";
import { CheckCircleIcon, TrophyIcon } from "@/components/icons";
import GlassCard from "@/components/GlassCard";

export default function Extras() {
  return (
    <Section id="extras">
      <SectionHeading eyebrow="More" title="Hackathons & Achievements" />
      <div className="grid gap-6 lg:grid-cols-2">
        <GlassCard className="p-6">
          <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-white">
            <TrophyIcon className="h-5 w-5 text-white/70" />
            Hackathons
          </h3>
          <ul className="mt-4 space-y-2">
            {hackathons.map((hackathon) => (
              <li key={hackathon.name} className="text-sm text-white/85">
                • {hackathon.name}
              </li>
            ))}
          </ul>
        </GlassCard>
        <GlassCard className="p-6">
          <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-white">
            <CheckCircleIcon className="h-5 w-5 text-white/70" />
            Achievements
          </h3>
          <ul className="mt-4 space-y-3">
            {achievements.map((achievement) => (
              <li key={achievement} className="flex items-start gap-2 text-sm text-white/85">
                <CheckCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-white/60" />
                {achievement}
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>
    </Section>
  );
}
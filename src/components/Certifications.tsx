import { certifications } from "@/data/portfolio";
import { Section, SectionHeading } from "@/components/Section";
import { TrophyIcon } from "@/components/icons";
import GlassCard from "@/components/GlassCard";

export default function Certifications() {
  return (
    <Section id="certifications">
      <SectionHeading
        eyebrow="Certifications"
        title="Certifications & Internships"
        description="Industry-recognized programs and simulations I've completed."
      />
      <ul className="space-y-3">
        {certifications.map((cert) => (
          <li key={cert.title}>
            <GlassCard scanlines className="p-5">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-white/15 p-2.5 text-white">
                  <TrophyIcon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-white">{cert.title}</h3>
                  {cert.issuer ? (
                    <p className="mt-0.5 text-sm text-white/70">{cert.issuer}</p>
                  ) : null}
                </div>
                {cert.year ? (
                  <span className="shrink-0 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-xs font-semibold text-white">
                    {cert.year}
                  </span>
                ) : null}
              </div>
            </GlassCard>
          </li>
        ))}
      </ul>
    </Section>
  );
}
import { education } from "@/data/portfolio";
import { Section, SectionHeading } from "@/components/Section";
import { AcademicCapIcon } from "@/components/icons";
import GlassCard from "@/components/GlassCard";

export default function Education() {
  return (
    <Section id="education">
      <SectionHeading
        eyebrow="Education"
        title="Education"
        description="Academic background in computer engineering."
      />
      <GlassCard className="p-6">
        <div className="flex items-start gap-5">
          <div className="rounded-lg bg-white/15 p-3 text-white shadow-[0_0_24px_-6px_rgba(255,255,255,0.35)]">
            <AcademicCapIcon className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{education.degree}</h3>
            <p className="mt-1 text-sm text-white/70">{education.year}</p>
            <p className="mt-3 text-sm text-white/85">
              Percentage:{" "}
              <span className="font-semibold text-white">{education.percentage}</span>
            </p>
          </div>
        </div>
      </GlassCard>
    </Section>
  );
}
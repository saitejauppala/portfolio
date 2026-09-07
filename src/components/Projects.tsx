import { projects } from "@/data/portfolio";
import { Section, SectionHeading } from "@/components/Section";
import { ArrowRightIcon } from "@/components/icons";
import GlassCard from "@/components/GlassCard";

export default function Projects() {
  return (
    <Section id="projects">
      <SectionHeading
        eyebrow="Projects"
        title="Things I've Built"
        description="Hands-on projects in software development and computer vision. Hover a card to inspect it."
      />
      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((project) => (
          <GlassCard
            key={project.title}
            className="group flex flex-col p-6"
            maxTilt={9}
            dataCursor="view"
          >
            {/* Depth layer: category ribbon */}
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-lg font-semibold text-white transition-colors">
                {project.title}
              </h3>
              <span className="shrink-0 rounded-full border border-white/15 bg-white/15 px-3 py-1 text-xs font-medium text-white/70">
                {project.tags[0]}
              </span>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-white/70">
              {project.description}
            </p>

            <ul className="mt-4 flex-1 space-y-2">
              {project.points.map((point) => (
                <li key={point} className="flex items-start gap-2 text-sm text-white/85">
                  <ArrowRightIcon className="mt-0.5 h-4 w-4 shrink-0 text-white/60" />
                  {point}
                </li>
              ))}
            </ul>

            {/* Technology badges rise slightly on hover */}
            <div className="mt-6 flex flex-wrap gap-2" style={{ transformStyle: "preserve-3d" }}>
              {project.tags.map((tag, i) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-white/25 group-hover:text-white group-hover:shadow-[0_8px_20px_-8px_rgba(255,255,255,0.6)]"
                  style={{ transform: `translateZ(${i * 6}px)` }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>
    </Section>
  );
}
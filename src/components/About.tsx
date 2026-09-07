import { profile } from "@/data/portfolio";
import { Section, SectionHeading } from "@/components/Section";
import {
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  ShieldCheckIcon,
} from "@/components/icons";
import GlassCard from "@/components/GlassCard";
import FloatingOrbs, { type OrbConfig } from "@/components/FloatingOrbs";

const highlights = [
  {
    icon: ShieldCheckIcon,
    label: "Focus",
    value: "Cybersecurity, Cloud & Software Engineering",
  },
  {
    icon: MapPinIcon,
    label: "Location",
    value: profile.location,
  },
  {
    icon: MailIcon,
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    icon: PhoneIcon,
    label: "Phone",
    value: profile.phoneDisplay,
    href: profile.phoneHref,
  },
];

const orbs: OrbConfig[] = [
  { top: "6%", left: "88%", size: 30, kind: "ring", duration: 10, delay: 0.4, rotate: 15, opacity: 0.4 },
  { top: "70%", left: "4%", size: 20, kind: "cube", duration: 12, delay: 1.6, rotate: 30, opacity: 0.35 },
];

export default function About() {
  return (
    <Section id="about">
      <div className="relative">
        <FloatingOrbs orbs={orbs} />
        <SectionHeading
          eyebrow="About"
          title="Aspiring Cybersecurity & Software Developer"
          description={profile.summary}
        />

        {/* Holographic identity card */}
        <GlassCard scanlines holo className="p-6 sm:p-8">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <div
              className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-white/25 bg-gradient-to-br from-white/15 to-white/5 text-2xl font-bold text-white shadow-[0_0_40px_-10px_rgba(255,255,255,0.4)]"
              aria-hidden
            >
              {profile.name
                .split(" ")
                .map((w) => w[0])
                .join("")
                .slice(0, 2)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/50">
                Identity // Developer
              </p>
              <h3 className="mt-1 text-xl font-semibold text-white sm:text-2xl">
                {profile.name}
              </h3>
              <p className="mt-1 text-sm text-white/75">
                {profile.role} · {profile.location}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Java", "Python", "AWS", "Network Security", "Linux"].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white/85"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </GlassCard>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {highlights.map((item) => (
            <GlassCard key={item.label} className="p-5">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-white/10 p-2.5 text-white">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-white/55">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="mt-1 block text-sm font-medium text-white/90 transition-colors hover:text-white"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="mt-1 text-sm font-medium text-white/90">{item.value}</p>
                  )}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </Section>
  );
}
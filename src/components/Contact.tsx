import { profile } from "@/data/portfolio";
import { Section, SectionHeading } from "@/components/Section";
import {
  ArrowUpIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from "@/components/icons";
import GlassCard from "@/components/GlassCard";
import MagneticButton from "@/components/MagneticButton";
import Terminal from "@/components/Terminal";
import FloatingOrbs, { type OrbConfig } from "@/components/FloatingOrbs";

const contactItems = [
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
  {
    icon: MapPinIcon,
    label: "Location",
    value: profile.location,
  },
];

const orbs: OrbConfig[] = [
  { top: "10%", left: "90%", size: 26, kind: "ring", duration: 9, delay: 0.8, rotate: 20, opacity: 0.4 },
  { top: "60%", left: "2%", size: 20, kind: "dot", duration: 8, delay: 1.8, rotate: 0, opacity: 0.5 },
];

export default function Contact() {
  return (
    <>
      <Section id="contact">
        <div className="relative">
          <FloatingOrbs orbs={orbs} />
          <SectionHeading
            eyebrow="Contact"
            title="Let's Connect"
            description="I'm actively seeking internship opportunities in Cybersecurity, Cloud Computing, and Software Engineering. Feel free to reach out!"
          />

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Contact cards */}
            <div>
              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {contactItems.map((item) => (
                  <GlassCard key={item.label} className="p-5 text-center">
                    <div className="mx-auto w-fit rounded-lg bg-white/10 p-2.5 text-white">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-white/55">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="mt-1 block break-words text-sm font-medium text-white/90 transition-colors hover:text-white"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="mt-1 text-sm font-medium text-white/90">{item.value}</p>
                    )}
                  </GlassCard>
                ))}
              </div>

              {/* Availability + socials */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/15 px-4 py-2 text-xs font-medium text-white">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
                  Open to internships
                </span>
              </div>
              <div className="mt-6 flex justify-center gap-4">
                <MagneticButton
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/25 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-white/70 hover:text-white"
                >
                  <GithubIcon className="h-4 w-4" />
                  GitHub
                </MagneticButton>
                <MagneticButton
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/25 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-white/70 hover:text-white"
                >
                  <LinkedinIcon className="h-4 w-4" />
                  LinkedIn
                </MagneticButton>
              </div>
            </div>

            {/* Floating 3D terminal */}
            <Terminal />
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="relative overflow-hidden border-t border-white/10">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-24 opacity-40"
          aria-hidden
        >
          <div className="cyber-grid h-[400%] w-full" />
        </div>
        <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="text-sm font-semibold text-white">{profile.name}</p>
            <p className="mt-1 text-sm text-white/60">
              © {new Date().getFullYear()} {profile.name}. All rights reserved.
            </p>
          </div>
          <p className="text-sm text-white/60">
            Built with <span className="text-white">Next.js</span>,{" "}
            <span className="text-white">Three.js</span> &{" "}
            <span className="text-white">Tailwind CSS</span>
          </p>
          <MagneticButton
            href="#home"
            ariaLabel="Back to top"
            className="rounded-full border border-white/25 p-3 text-white transition-colors hover:border-white/70 hover:text-white"
          >
            <ArrowUpIcon className="h-4 w-4" />
          </MagneticButton>
        </div>
      </footer>
    </>
  );
}
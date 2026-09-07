"use client";

import { useEffect, useState } from "react";
import { navLinks, profile } from "@/data/portfolio";
import { MenuIcon, XIcon } from "@/components/icons";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    function onScroll() {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? (window.scrollY / h) * 100 : 0;
      setProgress(p);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in view.
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur-xl">
      {/* Scroll progress bar with glow */}
      <div
        className="fixed left-0 top-0 h-[2px] bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)] transition-none"
        style={{ width: `${progress}%`, opacity: progress > 0 ? 1 : 0 }}
        aria-hidden
      />
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <a
          href="#home"
          className="text-lg font-bold tracking-tight text-white transition-colors hover:text-white/80"
          onClick={() => setOpen(false)}
        >
          {profile.firstName.split(" ")[0]}
          <span className="text-white/40">.</span>
          {profile.firstName.split(" ")[1]}
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  active === link.href
                    ? "text-white"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="rounded-md p-2 text-white/85 hover:bg-white/10 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-white/10 bg-black/95 backdrop-blur-xl md:hidden">
          <ul className="mx-auto max-w-5xl space-y-1 px-6 py-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`block rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-white/10 hover:text-white ${
                    active === link.href ? "text-white" : "text-white/85"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
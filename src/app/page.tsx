"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Certifications from "@/components/Certifications";
import Extras from "@/components/Extras";
import Contact from "@/components/Contact";
import CustomCursor from "@/components/CustomCursor";
import { initInteraction } from "@/lib/interaction";

const ParticleBackground = dynamic(() => import("@/components/ParticleBackground"), {
  ssr: false,
});

export default function Home() {
  useEffect(() => {
    initInteraction();
  }, []);

  return (
    <>
      <CustomCursor />
      <ParticleBackground />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Certifications />
        <Extras />
        <Contact />
      </main>
    </>
  );
}
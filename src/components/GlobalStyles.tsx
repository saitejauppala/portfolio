"use client";

import { useEffect } from "react";

export default function GlobalStyles() {
  useEffect(() => {
    if (document.getElementById("global-styles")) return;
    const style = document.createElement("style");
    style.id = "global-styles";
    style.textContent = `
      .animate-in {
        animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both;
      }
      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(24px); }
        to   { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);
    return () => {
      const el = document.getElementById("global-styles");
      if (el) el.remove();
    };
  }, []);
  return null;
}

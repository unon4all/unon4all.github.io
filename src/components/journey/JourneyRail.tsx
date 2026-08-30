"use client";

import { motion, useScroll } from "framer-motion";
import { useState, useEffect } from "react";

const STAGES = [
  { id: "boot", label: "Boot" },
  { id: "era", label: "Evolution" },
  { id: "panda-letter", label: "Panda Letter" },
  { id: "scanify", label: "Scanify" },
  { id: "canvas", label: "More Work" },
  { id: "fold", label: "Skills" },
  { id: "outro", label: "Contact" },
];

export function JourneyRail() {
  const { scrollYProgress } = useScroll();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const els = STAGES.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => !!el
    );
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = els.indexOf(entry.target as HTMLElement);
            if (idx !== -1) setActive(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Top progress bar — always visible, works on all breakpoints */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-hairline/60">
        <motion.div
          className="h-full origin-left bg-dynPrimary"
          style={{ scaleX: scrollYProgress }}
        />
      </div>

      {/* Right-side stage rail — desktop only */}
      <nav className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-4">
        {STAGES.map((stage, i) => (
          <a
            key={stage.id}
            href={`#${stage.id}`}
            className="group flex items-center gap-3 justify-end"
          >
            <span
              className={`font-mono text-[10px] uppercase tracking-wider transition-opacity duration-300 ${
                active === i ? "opacity-100 text-onCanvas" : "opacity-0 group-hover:opacity-60 text-onCanvasSoft"
              }`}
            >
              {stage.label}
            </span>
            <span
              className={`block rounded-full transition-all duration-300 ${
                active === i
                  ? "w-2.5 h-2.5 bg-dynPrimary"
                  : "w-1.5 h-1.5 bg-onCanvasFaint group-hover:bg-onCanvasSoft"
              }`}
            />
          </a>
        ))}
      </nav>
    </>
  );
}

"use client";

import { motion, type MotionValue } from "framer-motion";
import { PinnedScene } from "@/components/journey/PinnedScene";
import { useScrollTransform, lerp } from "@/lib/scroll-transform";
import { projects } from "@/content/projects";
import { ArrowUpRight } from "lucide-react";

const secondary = projects.filter((p) => !p.featured);

function Tile({
  progress,
  band,
  project,
}: {
  progress: MotionValue<number>;
  band: [number, number];
  project: (typeof secondary)[number];
}) {
  const [start, end] = band;
  const opacity = useScrollTransform(progress, (v) => lerp(v, [start, end], [0, 1]));
  const y = useScrollTransform(progress, (v) => lerp(v, [start, end], [24, 0]));

  return (
    <motion.a
      href={project.links?.[0]?.href ?? "#"}
      target="_blank"
      rel="noopener noreferrer"
      style={{ opacity, y }}
      className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 flex flex-col gap-2 hover:border-dynPrimary/50 transition-colors"
    >
      <div className="flex items-start justify-between gap-2">
        <h4 className="font-display text-base font-medium text-onCanvas">{project.name}</h4>
        <ArrowUpRight size={14} className="text-onCanvasFaint shrink-0 mt-1" />
      </div>
      <p className="text-onCanvasSoft text-xs leading-relaxed">{project.tagline}</p>
      <div className="flex flex-wrap gap-1.5 mt-1">
        {project.stack.slice(0, 3).map((t) => (
          <span key={t} className="font-mono text-[9px] px-1.5 py-0.5 rounded border border-white/10 text-onCanvasFaint">
            {t}
          </span>
        ))}
      </div>
    </motion.a>
  );
}

export function TabletCanvas() {
  return (
    <div id="canvas">
      <PinnedScene heightVh={220} className="flex flex-col items-center justify-center gap-8 px-6">
        {(progress) => (
          <>
            <p className="font-mono text-[11px] uppercase tracking-widest text-onCanvasFaint">
              The canvas expands
            </p>
            <div style={{ perspective: "2000px" }} className="w-full max-w-2xl">
              <div
                style={{
                  transform: "rotateX(6deg) rotateY(-2deg)",
                  transformStyle: "preserve-3d",
                  boxShadow: `
                    0 50px 90px -30px rgba(0,0,0,0.6),
                    0 16px 30px -12px rgba(0,0,0,0.45),
                    0 0 60px -10px rgba(109, 91, 255, 0.3),
                    inset 0 1px 0 rgba(255,255,255,0.12),
                    inset 0 0 0 1px rgba(255,255,255,0.06)
                  `,
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.01) 35%, rgba(0,0,0,0.3))",
                }}
                className="relative aspect-[4/3] sm:aspect-[16/10] rounded-[1.6rem] p-5 sm:p-8"
              >
                <div className="grid sm:grid-cols-3 gap-3 h-full relative z-0">
                  {secondary.map((project, i) => (
                    <Tile
                      key={project.slug}
                      progress={progress}
                      band={[0.15 + i * 0.18, 0.15 + i * 0.18 + 0.35]}
                      project={project}
                    />
                  ))}
                </div>
                <div
                  className="absolute inset-0 pointer-events-none rounded-[1.6rem] z-10"
                  style={{
                    background:
                      "linear-gradient(118deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.02) 15%, transparent 35%, transparent 75%, rgba(255,255,255,0.03) 100%)",
                  }}
                />
              </div>
            </div>
          </>
        )}
      </PinnedScene>
    </div>
  );
}

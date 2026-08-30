"use client";

import { motion, type MotionValue } from "framer-motion";
import { PinnedScene } from "@/components/journey/PinnedScene";
import { useScrollTransform, lerp } from "@/lib/scroll-transform";
import { skillGroups, achievements } from "@/content/profile";

function FoldPanel({ progress }: { progress: MotionValue<number> }) {
  const rotateY = useScrollTransform(progress, (v) => lerp(v, [0.1, 0.55], [-150, 0]));
  const panelOpacity = useScrollTransform(progress, (v) => lerp(v, [0.15, 0.4], [0, 1]));
  const contentOpacity = useScrollTransform(progress, (v) => lerp(v, [0.5, 0.65], [0, 1]));
  const contentOpacity2 = useScrollTransform(progress, (v) => lerp(v, [0.6, 0.75], [0, 1]));

  return (
    <div
      className="relative w-full max-w-2xl h-[480px] sm:h-[420px]"
      style={{ perspective: "1600px" }}
    >
      {/* left panel (fixed) — skills */}
      <div
        className="absolute left-0 top-0 w-1/2 h-full rounded-l-2xl p-4 sm:p-7 overflow-y-auto"
        style={{
          transformOrigin: "right center",
          boxShadow: `
            -8px 20px 50px -20px rgba(0,0,0,0.6),
            inset 1px 0 0 rgba(255,255,255,0.06),
            inset 0 1px 0 rgba(255,255,255,0.1)
          `,
          background:
            "linear-gradient(100deg, rgba(255,255,255,0.05), rgba(0,0,0,0.25) 90%), var(--canvas-raised)",
        }}
      >
        <motion.div style={{ opacity: contentOpacity }}>
          <p className="font-mono text-[10px] uppercase tracking-widest text-dynPrimary mb-4">
            Stack
          </p>
          <div className="space-y-3 sm:space-y-4">
            {skillGroups.map((group) => (
              <div key={group.label}>
                <p className="font-mono text-[9px] uppercase tracking-wide text-onCanvasFaint mb-1.5">
                  {group.label}
                </p>
                <div className="flex flex-wrap gap-1">
                  {group.items.slice(0, 3).map((item) => (
                    <span
                      key={item}
                      className="font-mono text-[9px] px-1.5 py-0.5 rounded border border-hairline text-onCanvasSoft"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* hinge crease */}
      <motion.div
        style={{
          opacity: panelOpacity,
          background:
            "linear-gradient(90deg, transparent, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0.5) 55%, transparent)",
        }}
        className="absolute left-1/2 top-0 bottom-0 w-3 -translate-x-1/2 z-10"
      />
      <motion.div
        style={{ opacity: panelOpacity }}
        className="absolute left-1/2 top-0 bottom-0 w-px bg-dynPrimary/50 -translate-x-1/2 z-10"
      />

      {/* right panel (rotating) — achievements */}
      <motion.div
        style={{
          rotateY,
          opacity: panelOpacity,
          transformOrigin: "left center",
          transformStyle: "preserve-3d",
          boxShadow: `
            8px 20px 50px -20px rgba(0,0,0,0.6),
            inset -1px 0 0 rgba(255,255,255,0.06),
            inset 0 1px 0 rgba(255,255,255,0.1)
          `,
          background:
            "linear-gradient(260deg, rgba(255,255,255,0.05), rgba(0,0,0,0.25) 90%), var(--canvas-raised)",
        }}
        className="absolute right-0 top-0 w-1/2 h-full rounded-r-2xl p-4 sm:p-7 overflow-y-auto"
      >
        <motion.div style={{ opacity: contentOpacity2 }}>
          <p className="font-mono text-[10px] uppercase tracking-widest text-dynSecondary mb-4">
            Record
          </p>
          <div className="space-y-3">
            {achievements.map((a, i) => (
              <div key={a.title}>
                <p className="font-mono text-[10px] text-dynPrimary mb-0.5">0{i + 1}</p>
                <p className="text-onCanvas text-[11px] sm:text-xs font-medium leading-snug">
                  {a.title}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function Foldable() {
  return (
    <div id="fold">
      <PinnedScene heightVh={260} className="flex flex-col items-center justify-center gap-8 px-6">
        {(progress) => (
          <>
            <p className="font-mono text-[11px] uppercase tracking-widest text-onCanvasFaint">
              Unfolding
            </p>
            <FoldPanel progress={progress} />
          </>
        )}
      </PinnedScene>
    </div>
  );
}

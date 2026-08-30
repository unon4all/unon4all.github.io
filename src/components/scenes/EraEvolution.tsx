"use client";

import { motion, type MotionValue } from "framer-motion";
import { PinnedScene } from "@/components/journey/PinnedScene";
import { useScrollTransform, lerp } from "@/lib/scroll-transform";

const HEADLINES = [
  { at: 0.12, text: "It started with buttons." },
  { at: 0.42, text: "Then came the touchscreen." },
  { at: 0.72, text: "Then, Android." },
];

function DeviceMorph({ progress }: { progress: MotionValue<number> }) {
  const width = useScrollTransform(progress, (v) => lerp(v, [0.05, 0.75], [168, 236]));
  const height = useScrollTransform(progress, (v) => lerp(v, [0.05, 0.75], [300, 470]));
  const radius = useScrollTransform(progress, (v) => lerp(v, [0.05, 0.75], [8, 42]));
  const innerRadius = useScrollTransform(progress, (v) => Math.max(lerp(v, [0.05, 0.75], [8, 42]) - 6, 2));
  const screenInset = useScrollTransform(progress, (v) => lerp(v, [0.05, 0.75], [16, 7]));
  const screenBottomInset = useScrollTransform(progress, (v) => lerp(v, [0.05, 0.75], [96, 7]));

  const keypadOpacity = useScrollTransform(progress, (v) => lerp(v, [0.28, 0.42], [1, 0]));
  const keypadScale = useScrollTransform(progress, (v) => lerp(v, [0.28, 0.45], [1, 0.9]));
  const appGridOpacity = useScrollTransform(progress, (v) => lerp(v, [0.55, 0.72], [0, 1]));
  const appGridY = useScrollTransform(progress, (v) => lerp(v, [0.55, 0.72], [16, 0]));

  const glowOpacity = useScrollTransform(progress, (v) => lerp(v, [0.5, 0.75], [0, 1]));
  const swatchScale = useScrollTransform(progress, (v) => lerp(v, [0.72, 0.88], [0, 1]));
  const swatchOpacity = useScrollTransform(progress, (v) => lerp(v, [0.72, 0.85], [0, 1]));

  return (
    <div className="relative flex items-center justify-center" style={{ perspective: "1400px" }}>
      <motion.div
        style={{
          width,
          height,
          borderRadius: radius,
          transform: "rotateY(-10deg) rotateX(5deg)",
          transformStyle: "preserve-3d",
          boxShadow: `
            0 40px 70px -25px rgba(0,0,0,0.65),
            0 14px 26px -10px rgba(0,0,0,0.5),
            0 0 50px -8px rgba(109, 91, 255, 0.35),
            inset 0 1px 0 rgba(255,255,255,0.14),
            inset 0 0 0 1px rgba(255,255,255,0.07)
          `,
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.015) 35%, rgba(0,0,0,0.35))",
        }}
        className="relative flex items-center justify-center"
      >
        {/* screen */}
        <motion.div
          style={{
            position: "absolute",
            top: screenInset,
            left: screenInset,
            right: screenInset,
            bottom: screenBottomInset,
            borderRadius: innerRadius,
          }}
          className="bg-black/40 overflow-hidden"
        >
          <motion.div
            className="absolute inset-0"
            style={{
              opacity: glowOpacity,
              background:
                "radial-gradient(circle at 50% 30%, var(--dyn-glow), transparent 70%)",
            }}
          />
          {/* glass reflection sheen */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background:
                "linear-gradient(118deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.03) 18%, transparent 38%, transparent 70%, rgba(255,255,255,0.04) 100%)",
            }}
          />

          {/* modern app grid */}
          <motion.div
            style={{ opacity: appGridOpacity, y: appGridY }}
            className="absolute inset-0 grid grid-cols-3 gap-2.5 p-4 content-start pt-8"
          >
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-xl"
                style={{
                  background: [
                    "var(--dyn-primary)",
                    "var(--dyn-secondary)",
                    "var(--dyn-tertiary)",
                  ][i % 3],
                  opacity: 0.85,
                }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* physical keypad (early era) */}
        <motion.div
          style={{ opacity: keypadOpacity, scale: keypadScale }}
          className="absolute left-2.5 right-2.5 bottom-2.5 h-[84px] rounded-md bg-canvas grid grid-cols-3 gap-1 p-1.5"
        >
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="rounded-sm bg-onCanvasFaint/25" />
          ))}
        </motion.div>
      </motion.div>

      {/* Material You swatch burst */}
      <motion.div
        style={{ scale: swatchScale, opacity: swatchOpacity }}
        className="absolute -right-4 sm:-right-10 top-8 flex flex-col gap-2"
      >
        {["var(--dyn-primary)", "var(--dyn-secondary)", "var(--dyn-tertiary)"].map(
          (c, i) => (
            <span
              key={i}
              className="block w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-white/10"
              style={{ background: c }}
            />
          )
        )}
      </motion.div>
    </div>
  );
}

function HeadlineItem({
  progress,
  at,
  next,
  text,
}: {
  progress: MotionValue<number>;
  at: number;
  next: number;
  text: string;
}) {
  const fadeInEnd = at + 0.08;
  const fadeOutStart = next - 0.08;
  const opacity = useScrollTransform(progress, (v) =>
    lerp(v, [at, fadeInEnd, fadeOutStart, next], [0, 1, 1, 0])
  );
  return (
    <motion.h2
      style={{ opacity }}
      className="absolute font-display text-2xl sm:text-4xl font-semibold text-onCanvas"
    >
      {text}
    </motion.h2>
  );
}

function Headline({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="relative h-16 flex items-center justify-center px-6 text-center">
      {HEADLINES.map((h, i) => (
        <HeadlineItem
          key={h.text}
          progress={progress}
          at={h.at}
          next={HEADLINES[i + 1]?.at ?? 1}
          text={h.text}
        />
      ))}
    </div>
  );
}

export function EraEvolution() {
  return (
    <div id="era">
      <PinnedScene heightVh={340} className="flex flex-col items-center justify-center gap-10">
        {(progress) => (
          <>
            <Headline progress={progress} />
            <DeviceMorph progress={progress} />
            <p className="font-mono text-[11px] text-onCanvasFaint uppercase tracking-widest">
              1999 → 2008 → Now
            </p>
          </>
        )}
      </PinnedScene>
    </div>
  );
}

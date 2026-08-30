"use client";

import { motion, type MotionValue } from "framer-motion";
import type { ReactNode } from "react";
import { PinnedScene } from "@/components/journey/PinnedScene";
import { PhoneShell } from "@/components/journey/PhoneShell";
import { useScrollTransform, lerp } from "@/lib/scroll-transform";

export type DeviceScreen = {
  label: string;
  content: ReactNode;
};

function ScreenSlide({
  progress,
  band,
  children,
}: {
  progress: MotionValue<number>;
  band: [number, number];
  children: ReactNode;
}) {
  const [start, end] = band;
  const span = end - start;
  const fade = Math.min(span * 0.25, 0.04);
  const opacity = useScrollTransform(progress, (v) =>
    lerp(v, [start, start + fade, end - fade, end], [0, 1, 1, 0])
  );
  const y = useScrollTransform(progress, (v) =>
    lerp(v, [start, start + fade], [10, 0])
  );

  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0">
      {children}
    </motion.div>
  );
}

export function InsideDevice({
  id,
  eyebrow,
  screens,
  screenBg,
  glowColor,
}: {
  id: string;
  eyebrow: string;
  screens: DeviceScreen[];
  screenBg: string;
  glowColor?: string;
}) {
  const n = screens.length;
  const spanStart = 0.06;
  const spanEnd = 0.94;
  const bandWidth = (spanEnd - spanStart) / n;

  return (
    <div id={id}>
      <PinnedScene heightVh={240} className="flex flex-col items-center justify-center gap-8">
        {(progress) => (
          <>
            <p className="font-mono text-[11px] uppercase tracking-widest text-onCanvasFaint">
              {eyebrow}
            </p>
            <PhoneShell width={230} height={460} glowColor={glowColor}>
              <div className={`relative w-full h-full ${screenBg}`}>
                {screens.map((screen, i) => {
                  const start = spanStart + i * bandWidth;
                  const end = start + bandWidth;
                  return (
                    <ScreenSlide key={screen.label} progress={progress} band={[start, end]}>
                      {screen.content}
                    </ScreenSlide>
                  );
                })}
              </div>
            </PhoneShell>
            <ScreenLabels progress={progress} screens={screens} spanStart={spanStart} bandWidth={bandWidth} />
          </>
        )}
      </PinnedScene>
    </div>
  );
}

function ScreenLabels({
  progress,
  screens,
  spanStart,
  bandWidth,
}: {
  progress: MotionValue<number>;
  screens: DeviceScreen[];
  spanStart: number;
  bandWidth: number;
}) {
  return (
    <div className="flex gap-2">
      {screens.map((screen, i) => {
        const start = spanStart + i * bandWidth;
        const end = start + bandWidth;
        return (
          <Dot key={screen.label} progress={progress} band={[start, end]} />
        );
      })}
    </div>
  );
}

function Dot({ progress, band }: { progress: MotionValue<number>; band: [number, number] }) {
  const [start, end] = band;
  const mid = (start + end) / 2;
  const scale = useScrollTransform(progress, (v) =>
    lerp(v, [start, mid, end], [1, 1.6, 1])
  );
  const opacity = useScrollTransform(progress, (v) =>
    lerp(v, [start, mid, end], [0.3, 1, 0.3])
  );
  return (
    <motion.span
      style={{ scale, opacity }}
      className="block w-1.5 h-1.5 rounded-full bg-onCanvasSoft"
    />
  );
}

"use client";

import { useRef, type ReactNode } from "react";
import { useScroll, type MotionValue } from "framer-motion";

export function PinnedScene({
  heightVh = 300,
  mobileHeightVh,
  children,
  className = "",
}: {
  heightVh?: number;
  /** Shorter scroll distance on small viewports — less scroll fatigue and less
   * exposure to mobile browsers' address-bar-driven viewport resize jank with
   * position:sticky. Defaults to ~70% of heightVh. */
  mobileHeightVh?: number;
  children: (progress: MotionValue<number>) => ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const mobile = mobileHeightVh ?? Math.round(heightVh * 0.7);

  return (
    <div
      ref={ref}
      className="relative h-[var(--h-mobile)] sm:h-[var(--h-desktop)]"
      style={{ ["--h-mobile" as string]: `${mobile}svh`, ["--h-desktop" as string]: `${heightVh}svh` }}
    >
      <div
        className={`sticky top-0 h-[100svh] overflow-hidden ${className}`}
        style={{ contain: "layout paint" }}
      >
        {children(scrollYProgress)}
      </div>
    </div>
  );
}

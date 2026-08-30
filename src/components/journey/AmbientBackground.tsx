"use client";

import { motion, useScroll } from "framer-motion";
import { useScrollTransform, lerp, lerpColor } from "@/lib/scroll-transform";

// Approximate fractional boundaries of each scene along total document scroll.
const STOPS = [0, 0.07, 0.27, 0.44, 0.6, 0.74, 0.9, 1];

const GLOW_COLORS = [
  "#1a1a22", // boot — neutral dark
  "#1a1a22", // early era — desaturated
  "#241a3d", // android era burst — violet
  "#1c2438", // inside panda letter — cools slightly
  "#0f1c2e", // inside scanify — cool technical blue
  "#221c3a", // tablet canvas — violet-grey
  "#1d1930", // foldable — deep indigo
  "#0d0c12", // outro approach — dims before the light outro
];

export function AmbientBackground() {
  const { scrollYProgress } = useScroll();

  const glowOpacity = useScrollTransform(scrollYProgress, (v) =>
    lerp(v, [0, 0.07, 0.9, 0.97], [0.5, 0.85, 0.85, 0])
  );
  const glowBackground = useScrollTransform(scrollYProgress, (v) => {
    const c = lerpColor(v, STOPS, GLOW_COLORS);
    return `radial-gradient(ellipse 80% 60% at 50% 0%, ${c}, transparent 70%)`;
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ backgroundColor: "var(--canvas)" }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background: glowBackground,
          opacity: glowOpacity,
          willChange: "opacity",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </motion.div>
  );
}

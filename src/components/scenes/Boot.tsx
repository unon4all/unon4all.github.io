"use client";

import { motion } from "framer-motion";
import { site } from "@/content/site";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.16, delayChildren: 0.3 },
  },
};

const rise = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export function Boot() {
  return (
    <section
      id="boot"
      className="relative h-[100svh] flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      {/* Device frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative w-[220px] h-[380px] sm:w-[240px] sm:h-[420px] rounded-[2.2rem] border border-hairline bg-canvas-raised/60 shadow-[0_0_80px_-20px_rgba(110,90,255,0.35)] flex items-center justify-center mb-10"
      >
        {/* boot glow */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          className="absolute inset-3 rounded-[1.7rem] overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,var(--dyn-glow)_0%,transparent_65%)] opacity-70" />
        </motion.div>

        {/* boot dot */}
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.4, 1] }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="absolute w-2 h-2 rounded-full bg-dynPrimary"
        />

        {/* boot text inside screen */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10 text-center px-4"
        >
          <motion.p
            variants={rise}
            className="font-mono text-[9px] tracking-widest text-dynSecondary/80 uppercase mb-3"
          >
            [boot] initializing developer.apk
          </motion.p>
          <motion.h1
            variants={rise}
            className="font-display text-2xl sm:text-3xl font-semibold text-onCanvas leading-tight"
          >
            {site.name}
          </motion.h1>
          <motion.p
            variants={rise}
            className="font-mono text-[11px] text-onCanvasSoft mt-2 tracking-wide"
          >
            Android Developer
          </motion.p>
        </motion.div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.7 }}
        className="text-onCanvasSoft text-sm sm:text-base max-w-xs text-center leading-relaxed"
      >
        A journey through the evolution of mobile —<br />and the developer who grew up inside it.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.2 }}
        className="absolute bottom-10 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest text-onCanvasFaint">
          Scroll
        </span>
        <motion.svg
          width="14"
          height="20"
          viewBox="0 0 14 20"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M1 1 L7 8 L13 1 M1 12 L7 19 L13 12"
            stroke="currentColor"
            strokeWidth="1.4"
            fill="none"
            className="text-onCanvasFaint"
          />
        </motion.svg>
      </motion.div>
    </section>
  );
}

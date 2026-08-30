import { useMotionValue, useMotionValueEvent, type MotionValue } from "framer-motion";

/**
 * KNOWN ISSUE (as of framer-motion@13.1.1 + React 19.2.8 + Next.js 16.3.3):
 * useTransform()'s derived output MotionValue is computed correctly (confirmed via
 * onChange listeners) but is never actually written to the DOM by the consuming
 * motion component — style stays frozen at its initial value. A raw MotionValue
 * returned directly from useScroll()/useMotionValue() does not have this problem.
 *
 * This hook works around it: it creates a genuine MotionValue (safe to pass to
 * motion.* style props) and keeps it in sync with `source` manually via
 * useMotionValueEvent, instead of going through useTransform's broken pipeline.
 *
 * If a future framer-motion/React/Next update fixes the root cause, this can be
 * replaced with plain useTransform again.
 */
export function useScrollTransform<T>(
  source: MotionValue<number>,
  map: (v: number) => T
): MotionValue<T> {
  const output = useMotionValue<T>(map(source.get()));
  useMotionValueEvent(source, "change", (v) => {
    output.set(map(v));
  });
  return output;
}

/** Piecewise-linear numeric interpolation, clamped to the range endpoints. */
export function lerp(v: number, inputRange: number[], outputRange: number[]): number {
  const n = inputRange.length;
  if (v <= inputRange[0]) return outputRange[0];
  if (v >= inputRange[n - 1]) return outputRange[n - 1];
  for (let i = 0; i < n - 1; i++) {
    const a = inputRange[i];
    const b = inputRange[i + 1];
    if (v >= a && v <= b) {
      const t = b === a ? 0 : (v - a) / (b - a);
      return outputRange[i] + t * (outputRange[i + 1] - outputRange[i]);
    }
  }
  return outputRange[n - 1];
}

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

function rgbToHex(r: number, g: number, b: number): string {
  const c = (n: number) => Math.round(Math.max(0, Math.min(255, n))).toString(16).padStart(2, "0");
  return `#${c(r)}${c(g)}${c(b)}`;
}

/** Piecewise-linear hex-color interpolation, clamped to the range endpoints. */
export function lerpColor(v: number, inputRange: number[], colorRange: string[]): string {
  const n = inputRange.length;
  if (v <= inputRange[0]) return colorRange[0];
  if (v >= inputRange[n - 1]) return colorRange[n - 1];
  for (let i = 0; i < n - 1; i++) {
    const a = inputRange[i];
    const b = inputRange[i + 1];
    if (v >= a && v <= b) {
      const t = b === a ? 0 : (v - a) / (b - a);
      const [r1, g1, b1] = hexToRgb(colorRange[i]);
      const [r2, g2, b2] = hexToRgb(colorRange[i + 1]);
      return rgbToHex(r1 + t * (r2 - r1), g1 + t * (g2 - g1), b1 + t * (b2 - b1));
    }
  }
  return colorRange[n - 1];
}

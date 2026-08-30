import type { ReactNode, CSSProperties } from "react";

export function PhoneShell({
  width,
  height,
  glowColor = "rgba(109, 91, 255, 0.35)",
  children,
  style,
}: {
  width: number;
  height: number;
  glowColor?: string;
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div style={{ perspective: "1400px" }}>
      <div
        style={{
          width,
          height,
          transform: "rotateY(-10deg) rotateX(5deg)",
          transformStyle: "preserve-3d",
          boxShadow: `
            0 40px 70px -25px rgba(0,0,0,0.65),
            0 14px 26px -10px rgba(0,0,0,0.5),
            0 0 50px -8px ${glowColor},
            inset 0 1px 0 rgba(255,255,255,0.14),
            inset 0 0 0 1px rgba(255,255,255,0.07)
          `,
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.015) 35%, rgba(0,0,0,0.35))",
          ...style,
        }}
        className="relative rounded-[2.4rem] p-2.5"
      >
        {/* camera punch-hole */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-black/60 border border-white/10 z-20" />

        {/* side buttons */}
        <div className="absolute -left-[2px] top-24 w-[3px] h-8 rounded-l bg-gradient-to-b from-white/15 to-white/5" />
        <div className="absolute -left-[2px] top-36 w-[3px] h-12 rounded-l bg-gradient-to-b from-white/15 to-white/5" />
        <div className="absolute -right-[2px] top-28 w-[3px] h-14 rounded-r bg-gradient-to-b from-white/15 to-white/5" />

        {/* screen */}
        <div className="relative w-full h-full rounded-[1.9rem] overflow-hidden">
          {children}
          {/* glass reflection sheen */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background:
                "linear-gradient(118deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.04) 18%, transparent 38%, transparent 70%, rgba(255,255,255,0.05) 100%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

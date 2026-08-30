import { InsideDevice, type DeviceScreen } from "@/components/journey/InsideDevice";
import { ProjectNarrative } from "@/components/journey/ProjectNarrative";
import { projects } from "@/content/projects";

const project = projects.find((p) => p.slug === "scanify")!;

const screens: DeviceScreen[] = [
  {
    label: "Splash",
    content: (
      <div className="w-full h-full flex flex-col items-center justify-center gap-3" style={{ background: "var(--sc-bg)" }}>
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{ background: "var(--sc-accent)" }}
        >
          <span className="text-white font-display text-xl">S</span>
        </div>
        <p className="font-mono text-xs tracking-widest" style={{ color: "var(--sc-ink)" }}>
          SCANIFY
        </p>
      </div>
    ),
  },
  {
    label: "Upscale",
    content: (
      <div className="w-full h-full p-4 pt-8" style={{ background: "var(--sc-bg)" }}>
        <p className="font-mono text-[10px] uppercase tracking-widest mb-3" style={{ color: "var(--sc-accent)" }}>
          Enhance
        </p>
        <div className="relative h-48 rounded-lg overflow-hidden border" style={{ borderColor: "color-mix(in srgb, var(--sc-accent) 20%, transparent)" }}>
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, #1a2636, #26374d)", filter: "blur(3px)" }}
          />
          <div
            className="absolute inset-y-0 right-0 w-1/2"
            style={{ background: "linear-gradient(135deg, #1e3a5c, #2f5a8f)" }}
          />
          <div className="absolute inset-y-0 left-1/2 w-px" style={{ background: "var(--sc-accent)" }} />
          <span className="absolute bottom-2 left-2 font-mono text-[8px]" style={{ color: "color-mix(in srgb, var(--sc-ink) 67%, transparent)" }}>
            LOW-RES
          </span>
          <span className="absolute bottom-2 right-2 font-mono text-[8px]" style={{ color: "var(--sc-ink)" }}>
            ENHANCED
          </span>
        </div>
      </div>
    ),
  },
  {
    label: "Pipeline",
    content: (
      <div className="w-full h-full p-4 pt-8 flex flex-col items-center justify-center" style={{ background: "var(--sc-bg)" }}>
        <p className="font-mono text-[10px] uppercase tracking-widest mb-6" style={{ color: "var(--sc-accent)" }}>
          Processing
        </p>
        <div className="flex items-center gap-3">
          {["Client", "API", "Model"].map((n, i) => (
            <div key={n} className="flex items-center gap-3">
              <div className="flex flex-col items-center gap-1.5">
                <span
                  className="w-8 h-8 rounded-full border flex items-center justify-center"
                  style={{ borderColor: "var(--sc-accent)" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--sc-accent)" }} />
                </span>
                <span className="font-mono text-[7px]" style={{ color: "color-mix(in srgb, var(--sc-ink) 67%, transparent)" }}>
                  {n}
                </span>
              </div>
              {i < 2 && <span className="w-4 h-px" style={{ background: "color-mix(in srgb, var(--sc-accent) 33%, transparent)" }} />}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    label: "Results",
    content: (
      <div className="w-full h-full p-4 pt-8 flex flex-col items-center justify-center" style={{ background: "var(--sc-bg)" }}>
        <p className="font-mono text-[10px] uppercase tracking-widest mb-2" style={{ color: "var(--sc-accent)" }}>
          Usability score
        </p>
        <p className="font-display text-4xl font-semibold" style={{ color: "var(--sc-ink)" }}>
          81.3
        </p>
        <p className="font-mono text-[9px] mt-1" style={{ color: "var(--sc-accent)" }}>
          top 10% of mobile apps
        </p>
      </div>
    ),
  },
];

export function ScanifyScene() {
  return (
    <>
      <InsideDevice
        id="scanify"
        eyebrow="Inside Scanify"
        screens={screens}
        screenBg=""
        glowColor="rgba(79, 163, 255, 0.4)"
      />
      <ProjectNarrative project={project} />
    </>
  );
}

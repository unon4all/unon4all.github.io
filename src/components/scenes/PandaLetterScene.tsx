import { InsideDevice, type DeviceScreen } from "@/components/journey/InsideDevice";
import { ProjectNarrative } from "@/components/journey/ProjectNarrative";
import { projects } from "@/content/projects";

const project = projects.find((p) => p.slug === "panda-letter")!;

const screens: DeviceScreen[] = [
  {
    label: "Splash",
    content: (
      <div className="w-full h-full flex flex-col items-center justify-center gap-3" style={{ background: "var(--pl-paper)" }}>
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{ background: "var(--pl-accent)" }}
        >
          <span className="text-white font-display text-xl">P</span>
        </div>
        <p className="font-display text-sm" style={{ color: "var(--pl-ink)" }}>
          Panda Letter
        </p>
      </div>
    ),
  },
  {
    label: "Letters",
    content: (
      <div className="w-full h-full p-4 pt-8 flex flex-col gap-2.5" style={{ background: "var(--pl-paper)" }}>
        <p className="font-display text-[15px] mb-1" style={{ color: "var(--pl-ink)" }}>
          Letters
        </p>
        {["To you, on our anniversary", "A note before the trip", "Just because"].map((t, i) => (
          <div
            key={i}
            className="rounded-xl p-3 border"
            style={{ borderColor: "color-mix(in srgb, var(--pl-accent) 20%, transparent)", background: "#ffffff88" }}
          >
            <p className="text-[11px] font-medium" style={{ color: "var(--pl-ink)" }}>
              {t}
            </p>
            <div className="mt-1.5 h-1.5 w-2/3 rounded-full" style={{ background: "color-mix(in srgb, var(--pl-accent) 13%, transparent)" }} />
          </div>
        ))}
      </div>
    ),
  },
  {
    label: "Timeline",
    content: (
      <div className="w-full h-full p-4 pt-8" style={{ background: "var(--pl-paper)" }}>
        <p className="font-display text-[15px] mb-3" style={{ color: "var(--pl-ink)" }}>
          Memories
        </p>
        <div className="relative pl-4 space-y-4">
          <div
            className="absolute left-[5px] top-1 bottom-1 w-px"
            style={{ background: "color-mix(in srgb, var(--pl-accent) 27%, transparent)" }}
          />
          {[1, 2, 3].map((i) => (
            <div key={i} className="relative">
              <span
                className="absolute -left-4 top-1 w-2.5 h-2.5 rounded-full"
                style={{ background: "var(--pl-accent)" }}
              />
              <div
                className="h-12 rounded-lg"
                style={{ background: "#ffffff88", border: "1px solid color-mix(in srgb, var(--pl-accent) 13%, transparent)" }}
              />
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    label: "Growing Together",
    content: (
      <div className="w-full h-full p-4 pt-8" style={{ background: "var(--pl-paper)" }}>
        <p className="font-display text-[15px] mb-3" style={{ color: "var(--pl-ink)" }}>
          Growing Together
        </p>
        <div className="rounded-xl p-3 mb-3" style={{ background: "#ffffff88", border: "1px solid color-mix(in srgb, var(--pl-accent) 13%, transparent)" }}>
          <p className="text-[11px] font-medium mb-2" style={{ color: "var(--pl-ink)" }}>
            Cook together weekly
          </p>
          <p className="text-[9px] font-mono" style={{ color: "var(--pl-accent)" }}>
            completed 23 of last 30 days
          </p>
        </div>
        <div className="flex gap-1.5">
          {["done", "done", "skip", "later", "done"].map((s, i) => (
            <span
              key={i}
              className="w-4 h-4 rounded-full"
              style={{
                background:
                  s === "done" ? "var(--pl-accent)" : s === "skip" ? "color-mix(in srgb, var(--pl-accent) 33%, transparent)" : "color-mix(in srgb, var(--pl-accent) 13%, transparent)",
              }}
            />
          ))}
        </div>
      </div>
    ),
  },
];

export function PandaLetterScene() {
  return (
    <>
      <InsideDevice
        id="panda-letter"
        eyebrow="Inside Panda Letter"
        screens={screens}
        screenBg=""
        glowColor="rgba(168, 85, 122, 0.4)"
      />
      <ProjectNarrative project={project} />
    </>
  );
}

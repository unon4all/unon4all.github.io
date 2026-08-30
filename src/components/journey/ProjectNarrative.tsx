import type { Project } from "@/content/projects";
import { Reveal } from "@/components/ui/Reveal";

export function ProjectNarrative({ project }: { project: Project }) {
  return (
    <section className="max-w-3xl mx-auto px-6 sm:px-8 py-24">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-widest text-dynPrimary mb-3">
          {project.status}
        </p>
        <h2 className="font-display text-3xl sm:text-5xl font-semibold text-onCanvas mb-4">
          {project.name}
        </h2>
        <p className="text-onCanvasSoft text-lg leading-relaxed max-w-xl mb-10">
          {project.tagline}
        </p>
      </Reveal>

      <Reveal delay={0.05} className="mb-10">
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="font-mono text-[12px] px-2.5 py-1 rounded-md border border-hairline text-onCanvasSoft"
            >
              {tech}
            </span>
          ))}
        </div>
      </Reveal>

      <div className="space-y-8 mb-10">
        <Reveal>
          <h3 className="font-mono text-xs uppercase tracking-wide text-onCanvasFaint mb-2.5">
            Problem
          </h3>
          <p className="text-onCanvasSoft leading-relaxed">{project.problem}</p>
        </Reveal>

        <Reveal delay={0.05}>
          <h3 className="font-mono text-xs uppercase tracking-wide text-onCanvasFaint mb-2.5">
            Approach
          </h3>
          <ul className="space-y-3">
            {project.approach.map((point, i) => (
              <li key={i} className="text-onCanvasSoft leading-relaxed flex gap-3">
                <span className="text-dynPrimary font-mono text-xs mt-1.5 shrink-0">→</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <h3 className="font-mono text-xs uppercase tracking-wide text-onCanvasFaint mb-2.5">
            Outcome
          </h3>
          <p className="text-onCanvasSoft leading-relaxed">{project.outcome}</p>
        </Reveal>
      </div>

      {project.metrics && project.metrics.length > 0 && (
        <Reveal delay={0.12} className="grid sm:grid-cols-2 gap-3">
          {project.metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-lg border border-hairline bg-canvas-raised/60 px-4 py-3"
            >
              <p className="font-mono text-[11px] uppercase tracking-wide text-dynSecondary mb-1">
                {m.label}
              </p>
              <p className="text-onCanvas text-sm font-medium leading-snug">{m.value}</p>
            </div>
          ))}
        </Reveal>
      )}
    </section>
  );
}

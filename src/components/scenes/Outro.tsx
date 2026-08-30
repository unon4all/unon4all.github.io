import { site } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { Mail, Phone, ArrowUpRight } from "lucide-react";

export function Outro() {
  return (
    <section
      id="outro"
      className="relative py-28 px-6 sm:px-8"
      style={{ background: "var(--outro-paper)", color: "var(--outro-ink)" }}
    >
      <div className="max-w-xl mx-auto text-center">
        <Reveal>
          <p
            className="font-mono text-xs uppercase tracking-widest mb-4"
            style={{ color: "var(--outro-accent)" }}
          >
            The journey continues
          </p>
          <h2 className="font-display text-3xl sm:text-5xl font-semibold mb-5">
            Let&rsquo;s build something.
          </h2>
          <p className="opacity-70 leading-relaxed mb-10">
            Open to Mobile App Developer roles and interesting Android projects.
            I&rsquo;ll get back to you within a day or two.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-mono text-sm text-white transition-opacity hover:opacity-90"
            style={{ background: "var(--outro-ink)" }}
          >
            <Mail size={15} />
            {site.email}
          </a>
          {site.phone && (
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-mono text-sm border"
              style={{ borderColor: "var(--outro-ink)33" }}
            >
              <Phone size={15} />
              {site.phone}
            </a>
          )}
        </Reveal>

        <Reveal delay={0.14} className="flex flex-wrap justify-center gap-x-8 gap-y-3 font-mono text-sm mb-16">
          <a href={site.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 opacity-70 hover:opacity-100 transition-opacity">
            GitHub <ArrowUpRight size={13} />
          </a>
          <a href={site.links.leetcode} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 opacity-70 hover:opacity-100 transition-opacity">
            LeetCode <ArrowUpRight size={13} />
          </a>
          <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 opacity-70 hover:opacity-100 transition-opacity">
            LinkedIn <ArrowUpRight size={13} />
          </a>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="font-mono text-[11px] opacity-40">
            © {new Date().getFullYear()} {site.name} — built as a journey, not just a page.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

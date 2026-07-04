import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { GlassCard } from "@/components/ui/GlassCard";
import { Pill } from "@/components/ui/Pill";
import { meta as greenCertificate } from "@/content/projects/green-certificate";

export const metadata: Metadata = {
  title: "Projects",
  description: "Case studies from real data platforms — problem, architecture, and outcome.",
};

const projects = [greenCertificate];

export default function ProjectsPage() {
  return (
    <div>
      <PageHero
        eyebrow="Projects"
        title="Projects"
        lede="Case studies from real data platforms — problem, architecture, and outcome."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-20">
        {projects.map((p) => (
          <GlassCard key={p.slug} href={`/projects/${p.slug}`} className="flex flex-col gap-4">
            <Pill dotColor="var(--color-success)">{p.status}</Pill>
            <div>
              <div className="text-heading-md text-text-primary">{p.title}</div>
              <p className="text-body-sm text-text-secondary mt-2">{p.summary}</p>
            </div>
            <div className="flex flex-wrap gap-2 mt-auto pt-2">
              {p.stack.slice(0, 4).map((s) => (
                <span key={s} className="text-caption text-text-muted normal-case tracking-normal border border-[var(--glass-border)] rounded-chip px-2.5 py-1">
                  {s}
                </span>
              ))}
            </div>
          </GlassCard>
        ))}

        <div className="flex flex-col gap-4 p-6 rounded-card border border-dashed border-[var(--glass-border)] text-text-muted">
          <span className="text-caption normal-case tracking-normal">In progress</span>
          <div className="text-heading-md">Next case study — coming soon</div>
          <p className="text-body-sm">Another platform, another write-up. Check back soon.</p>
        </div>
      </div>
    </div>
  );
}

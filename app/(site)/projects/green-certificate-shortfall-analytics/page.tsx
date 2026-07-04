import type { Metadata } from "next";
import { Terminal } from "lucide-react";
import { StatTile } from "@/components/ui/StatTile";
import { ProjectToc } from "@/components/project/ProjectToc";
import { PipelineDiagram } from "@/components/project/PipelineDiagram";
import { UmlDiagram } from "@/components/project/UmlDiagram";
import { BarChart } from "@/components/project/BarChart";
import { TopEntitiesList } from "@/components/project/TopEntitiesList";
import { ChallengeSolution } from "@/components/project/ChallengeSolution";
import { ImpactBand } from "@/components/project/ImpactBand";
import { Lessons } from "@/components/project/Lessons";
import { LinksBand } from "@/components/project/LinksBand";
import { AIAssistant } from "@/components/project/AIAssistant";
import {
  meta,
  stats,
  businessProblem,
  scope,
  functionalRequirements,
  nonFunctionalRequirements,
  dashboard,
  challenges,
  impact,
  lessons,
  links,
} from "@/content/projects/green-certificate";

export const metadata: Metadata = {
  title: meta.title,
  description: meta.summary,
};

const TOC_ITEMS = [
  { id: "overview", n: 1, label: "Overview" },
  { id: "business-problem", n: 2, label: "Business Problem" },
  { id: "architecture", n: 3, label: "Architecture" },
  { id: "data-pipeline", n: 4, label: "Data Pipeline" },
  { id: "stack", n: 5, label: "Technology Stack" },
  { id: "dashboard", n: 6, label: "Dashboard" },
  { id: "challenges", n: 7, label: "Challenges & Solutions" },
  { id: "impact", n: 8, label: "Business Impact" },
  { id: "lessons", n: 9, label: "Lessons Learned" },
  { id: "links", n: 10, label: "Links" },
];

function SectionHeading({ n, title }: { n: number; title: string }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--glass-border)] text-caption text-text-muted normal-case tracking-normal">
        {n}
      </span>
      <h2 className="text-heading-md text-text-primary">{title}</h2>
    </div>
  );
}

export default function GreenCertificatePage() {
  return (
    <div className="pb-24">
      <div className="text-body-sm text-text-muted pt-8 pb-4">
        <a href="/projects" className="hover:text-text-primary transition-colors">Projects</a>
        <span className="mx-2">/</span>
        <span className="text-text-secondary">{meta.title}</span>
      </div>

      {/* Overview / hero */}
      <section id="overview" className="pt-6 pb-16">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <div className="text-caption text-signal-text mb-4">{meta.eyebrow}</div>
            <h1 className="text-heading-lg text-text-primary max-w-[820px]">{meta.title}</h1>
            <p className="text-body-lg text-text-secondary mt-4 max-w-[720px]">{meta.summary}</p>
          </div>
          <a
            href={links.github}
            target="_blank"
            rel="noopener"
            className="flex items-center gap-2 rounded-button border border-[var(--glass-border)] px-5 py-2.5 text-body-sm font-semibold text-text-primary hover:border-signal/40 transition-colors shrink-0"
          >
            <Terminal size={16} /> GitHub
          </a>
        </div>

        <div className="flex flex-wrap gap-2 mt-6">
          {meta.stack.map((s) => (
            <span key={s} className="text-body-sm text-text-secondary border border-[var(--glass-border)] rounded-chip px-3 py-1.5">
              {s}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
          {stats.map((s) => (
            <StatTile key={s.label} {...s} />
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-12">
        <div className="min-w-0">
          <ProjectToc items={TOC_ITEMS} />

          {/* Business Problem */}
          <section id="business-problem" className="py-16 border-t border-[var(--glass-border)] scroll-mt-24">
            <SectionHeading n={2} title="Business Problem" />
            <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-8 mb-10">
              <div>
                <p className="text-body-md text-text-secondary leading-relaxed">{businessProblem}</p>
                <a
                  href="https://cer.gov.au/markets/reports-and-data/certificate-shortfall-register"
                  target="_blank"
                  rel="noopener"
                  className="inline-block mt-4 text-body-sm font-semibold text-signal-text hover:underline underline-offset-4"
                >
                  Learn more about the REC market →
                </a>
              </div>
              <div className="glass p-2 self-start">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/certificate-market.webp"
                  alt="Diagram of the Renewable Energy Certificate market showing supply (small-scale and large-scale generators) flowing through the REC Registry to demand (liable entities and government purchases)"
                  width={1400}
                  height={815}
                  loading="lazy"
                  className="rounded-[12px] w-full h-auto"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="glass p-5">
                <h3 className="text-heading-sm text-text-primary mb-3">Project Scope</h3>
                <div className="text-caption text-success normal-case tracking-normal mb-2">In scope</div>
                <ul className="flex flex-col gap-1.5 text-body-sm text-text-secondary mb-4">
                  {scope.inScope.map((s) => (
                    <li key={s}>· {s}</li>
                  ))}
                </ul>
                <div className="text-caption text-text-muted normal-case tracking-normal mb-2">Out of scope</div>
                <ul className="flex flex-col gap-1.5 text-body-sm text-text-muted">
                  {scope.outOfScope.map((s) => (
                    <li key={s}>· {s}</li>
                  ))}
                </ul>
              </div>

              <div className="glass p-5">
                <h3 className="text-heading-sm text-text-primary mb-3">Functional Requirements</h3>
                <ul className="flex flex-col gap-2.5 text-body-sm text-text-secondary">
                  {functionalRequirements.map((r) => (
                    <li key={r.id}>
                      <span className="font-semibold text-text-primary">{r.id}</span> {r.text}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass p-5">
                <h3 className="text-heading-sm text-text-primary mb-3">Non-Functional Requirements</h3>
                <ul className="flex flex-col gap-2.5 text-body-sm text-text-secondary">
                  {nonFunctionalRequirements.map((r) => (
                    <li key={r.id}>
                      <span className="font-semibold text-text-primary">{r.id}</span> {r.text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Architecture */}
          <section id="architecture" className="py-16 border-t border-[var(--glass-border)] scroll-mt-24">
            <SectionHeading n={3} title="Architecture" />
            <p className="text-body-md text-text-secondary max-w-[760px] mb-8">
              Conceptual pipeline for turning the CER&apos;s published registers into governed, queryable analytics — this
              project implements the source ingestion and dashboard layers using the real register data; the
              orchestration/AI layers illustrate the intended target design.
            </p>
            <PipelineDiagram />
          </section>

          {/* Data Pipeline (incl. Data Model) */}
          <section id="data-pipeline" className="py-16 border-t border-[var(--glass-border)] scroll-mt-24">
            <SectionHeading n={4} title="Data Pipeline" />
            <p className="text-body-md text-text-secondary max-w-[760px] mb-8">
              UML class diagram of the dimensional model, derived from the two source registers&apos; actual published
              columns. Shared dimensions (<code className="text-mono-md">liable_entity</code>,{" "}
              <code className="text-mono-md">assessment_year</code>) link both fact classes.
            </p>
            <UmlDiagram />
          </section>

          {/* Technology Stack */}
          <section id="stack" className="py-16 border-t border-[var(--glass-border)] scroll-mt-24">
            <SectionHeading n={5} title="Technology Stack" />
            <div className="flex flex-wrap gap-2.5">
              {["Azure Data Factory", "Databricks", "Delta Lake", "Power BI", "Azure AD", "MCP", "Python"].map((s) => (
                <span key={s} className="rounded-chip border border-[var(--glass-border)] bg-[var(--glass-fill)] px-3.5 py-2 text-body-sm text-text-secondary">
                  {s}
                </span>
              ))}
            </div>
          </section>

          {/* Dashboard */}
          <section id="dashboard" className="py-16 border-t border-[var(--glass-border)] scroll-mt-24">
            <SectionHeading n={6} title="Dashboard" />
            <p className="text-body-md text-text-secondary max-w-[760px] mb-8">
              Live figures computed directly from the CER&apos;s published LGC and STC shortfall registers (downloaded 2026-07-03).
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="glass p-5">
                <h3 className="text-heading-sm text-text-primary">Remaining LGC Shortfall by Assessment Year</h3>
                <p className="text-body-sm text-text-muted mt-1 mb-4">Certificates still outstanding, by the year they were assessed.</p>
                <BarChart years={dashboard.lgcYears} values={dashboard.lgcValues} color="var(--color-series-1)" />
              </div>
              <div className="glass p-5">
                <h3 className="text-heading-sm text-text-primary">STC Shortfall by Assessment Year</h3>
                <p className="text-body-sm text-text-muted mt-1 mb-4">Small-scale Technology Certificate shortfall since scheme start (2011).</p>
                <BarChart years={dashboard.stcYears} values={dashboard.stcValues} color="var(--color-series-2)" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="glass p-5">
                <h3 className="text-heading-sm text-text-primary mb-4">Top Liable Entities — Cumulative LGC Shortfall</h3>
                <TopEntitiesList data={dashboard.topLgc} color="var(--color-series-1)" />
              </div>
              <div className="glass p-5">
                <h3 className="text-heading-sm text-text-primary mb-4">Top Liable Entities — Cumulative STC Shortfall</h3>
                <TopEntitiesList data={dashboard.topStc} color="var(--color-series-2)" />
              </div>
            </div>

            <a
              href="https://cer.gov.au/markets/reports-and-data/certificate-shortfall-register"
              target="_blank"
              rel="noopener"
              className="text-body-sm font-semibold text-signal-text hover:underline underline-offset-4"
            >
              View source register →
            </a>
          </section>

          {/* Challenges & Solutions */}
          <section id="challenges" className="py-16 border-t border-[var(--glass-border)] scroll-mt-24">
            <SectionHeading n={7} title="Challenges & Solutions" />
            <ChallengeSolution pairs={challenges} />
          </section>

          {/* Business Impact */}
          <section id="impact" className="py-16 border-t border-[var(--glass-border)] scroll-mt-24">
            <SectionHeading n={8} title="Business Impact" />
            <ImpactBand stats={impact.stats} narrative={impact.narrative} />
          </section>

          {/* Lessons Learned */}
          <section id="lessons" className="py-16 border-t border-[var(--glass-border)] scroll-mt-24">
            <SectionHeading n={9} title="Lessons Learned" />
            <Lessons items={lessons} />
          </section>

          {/* Links */}
          <section id="links" className="py-16 border-t border-[var(--glass-border)] scroll-mt-24">
            <SectionHeading n={10} title="Links" />
            <LinksBand github={links.github} />
          </section>

          {/* AI Assistant (optional module) */}
          <section id="ai-assistant" className="py-16 border-t border-[var(--glass-border)] scroll-mt-24">
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-heading-md text-text-primary">AI Assistant</h2>
            </div>
            <p className="text-body-md text-text-secondary max-w-[760px] mb-8">
              Ask a question about the register data below — answered instantly by a rule-based engine running entirely
              in your browser against the real CER figures (no external AI call, so no API key or server involved).
            </p>
            <AIAssistant />
          </section>
        </div>
      </div>
    </div>
  );
}

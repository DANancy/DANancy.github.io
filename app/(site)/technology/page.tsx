import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { GlassCard } from "@/components/ui/GlassCard";
import { techCategories } from "@/content/technology";

export const metadata: Metadata = {
  title: "Technology",
  description: "10+ years building enterprise data platforms — the tools I reach for, and how they fit together.",
};

const seeItInProduction = [
  {
    title: "Green Certificate Shortfall Analytics",
    desc: "Azure Data Factory, Databricks, Medallion Architecture, Power BI, AI Assistant",
    href: "/projects/green-certificate-shortfall-analytics",
  },
];

export default function TechnologyPage() {
  return (
    <div>
      <PageHero
        eyebrow="Technology"
        title="Technology"
        lede="10+ years building enterprise data platforms — the tools I reach for, and how they fit together."
      />

      <div className="flex flex-col gap-12 pb-16">
        {techCategories.map((cat) => (
          <section key={cat.title} id={cat.anchor} className="scroll-mt-24">
            <h2 className="text-heading-sm text-text-primary mb-4">{cat.title}</h2>
            {cat.note && <p className="text-body-sm text-text-secondary italic mb-4 max-w-[600px]">{cat.note}</p>}
            <div className="flex flex-wrap gap-2.5">
              {cat.items.map((item) => (
                <span
                  key={item}
                  className="rounded-chip border border-[var(--glass-border)] bg-[var(--glass-fill)] px-3.5 py-2 text-body-sm text-text-secondary hover:border-signal/40 hover:text-text-primary transition-colors"
                >
                  {item}
                </span>
              ))}
            </div>
          </section>
        ))}

        <section>
          <h2 className="text-heading-sm text-text-primary mb-4">Where this shows up</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {seeItInProduction.map((p) => (
              <GlassCard key={p.href} href={p.href}>
                <div className="text-heading-sm text-text-primary">{p.title}</div>
                <div className="text-body-sm text-text-muted mt-2">{p.desc}</div>
              </GlassCard>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

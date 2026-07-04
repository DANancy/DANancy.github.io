import type { Metadata } from "next";
import { interests, values, coreSkills, certifications, community } from "@/content/about";

export const metadata: Metadata = {
  title: "About",
  description: "Technology is only one part of my life — pottery, travel, food, coffee, reading, and the community I build with.",
};

export default function AboutPage() {
  return (
    <div className="pb-24">
      <section className="pt-16 pb-14 max-w-[720px]">
        <h1 className="text-display-lg text-text-primary">
          Technology is only <span className="italic text-clay">one part</span> of my life.
        </h1>
        <p className="text-body-lg text-text-secondary mt-5">
          I&apos;m a Senior Data Engineer by trade, but I&apos;d rather you remember me as a curious person who happens
          to be good at data platforms. Here&apos;s the rest of it.
        </p>
      </section>

      <section className="py-10 border-t border-[var(--glass-border)]">
        <h2 className="text-heading-md text-text-primary mb-6">Beyond the terminal</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {interests.map((i) => (
            <div key={i.id} id={i.id} className="glass p-5 scroll-mt-24">
              <div className="text-3xl mb-3">{i.icon}</div>
              <div className="text-heading-sm text-text-primary">{i.title}</div>
              <p className="text-body-sm text-text-secondary mt-2">{i.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-10 border-t border-[var(--glass-border)]">
        <div className="flex flex-wrap gap-3">
          {values.map((v) => (
            <span key={v} className="text-body-sm text-text-secondary border border-clay/30 bg-clay/10 rounded-full px-4 py-1.5">
              {v}
            </span>
          ))}
        </div>
      </section>

      <section className="py-10 border-t border-[var(--glass-border)] grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-heading-md text-text-primary mb-4">Craft &amp; Skills</h2>
          <ul className="flex flex-col gap-2 text-body-md text-text-secondary">
            {coreSkills.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-heading-md text-text-primary mb-4">Certifications &amp; Achievements</h2>
          <ul className="flex flex-col gap-2 text-body-md text-text-secondary">
            {certifications.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </section>

      <section id="community" className="py-10 border-t border-[var(--glass-border)] scroll-mt-24">
        <h2 className="text-heading-md text-text-primary mb-6">Community &amp; Teaching</h2>
        <div className="flex flex-col gap-5">
          {community.map((c) => (
            <div key={c.role} className="flex gap-4">
              <span className="text-caption text-signal-text normal-case tracking-normal w-14 shrink-0 pt-0.5">{c.year}</span>
              <span className="h-2 w-2 rounded-full bg-signal mt-1.5 shrink-0" />
              <div>
                <div className="text-body-md font-semibold text-text-primary">{c.role}</div>
                <p className="text-body-sm text-text-secondary mt-1">{c.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

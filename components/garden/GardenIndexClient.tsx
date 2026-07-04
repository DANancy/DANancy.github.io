"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { notes, topicLabels, Topic } from "@/content/garden";
import { MaturityBadge } from "@/components/garden/MaturityBadge";
import { Pill } from "@/components/ui/Pill";

const ALL_TOPICS = Object.keys(topicLabels) as Topic[];

export function GardenIndexClient() {
  const params = useSearchParams();
  const initialTopic = params.get("topic") as Topic | null;
  const [active, setActive] = useState<Topic[]>(initialTopic ? [initialTopic] : []);

  const filtered = useMemo(
    () => (active.length === 0 ? notes : notes.filter((n) => active.includes(n.topic))),
    [active]
  );

  const recentlyTended = useMemo(
    () => [...notes].sort((a, b) => (a.updated < b.updated ? 1 : -1)).slice(0, 5),
    []
  );

  function toggle(topic: Topic) {
    setActive((prev) => (prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]));
  }

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-12">
        {ALL_TOPICS.map((t) => (
          <button key={t} onClick={() => toggle(t)}>
            <Pill active={active.includes(t)}>{topicLabels[t]}</Pill>
          </button>
        ))}
      </div>

      {active.length === 0 && (
        <section className="mb-14">
          <h2 className="text-heading-sm text-text-primary mb-4">Recently tended</h2>
          <div className="flex flex-wrap gap-3">
            {recentlyTended.map((n) => (
              <Link
                key={n.slug}
                href={`/garden/${n.slug}`}
                className="flex items-center gap-3 rounded-full border border-[var(--glass-border)] bg-[var(--glass-fill)] px-4 py-2 hover:border-signal/40 transition-colors"
              >
                <MaturityBadge maturity={n.maturity} />
                <span className="text-body-sm text-text-secondary">{n.title}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {filtered.map((n) => (
          <Link
            key={n.slug}
            href={`/garden/${n.slug}`}
            className="glass p-5 transition-all duration-[var(--duration-base)] hover:-translate-y-1 hover:glass-elevated hover:border-signal/30"
          >
            <div className="flex items-center justify-between mb-3">
              <MaturityBadge maturity={n.maturity} />
              <span className="text-caption text-text-muted normal-case tracking-normal">{n.updated}</span>
            </div>
            <div className="text-heading-sm text-text-primary">{n.title}</div>
            <p className="text-body-sm text-text-secondary mt-2">{n.excerpt}</p>
            <div className="mt-4">
              <Pill>{topicLabels[n.topic]}</Pill>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

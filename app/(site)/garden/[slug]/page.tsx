import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { notes, getNote, topicLabels } from "@/content/garden";
import { MaturityBadge } from "@/components/garden/MaturityBadge";
import { Pill } from "@/components/ui/Pill";
import { BacklinksMini } from "@/components/garden/BacklinksMini";

export function generateStaticParams() {
  return notes.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) return {};
  return { title: note.title, description: note.excerpt };
}

export default async function GardenNotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) return notFound();

  return (
    <div className="pb-24 max-w-[680px] mx-auto">
      <div className="text-body-sm text-text-muted pt-8 pb-6">
        <a href="/garden" className="hover:text-text-primary transition-colors">Garden</a>
        <span className="mx-2">/</span>
        <span className="text-text-secondary">{note.title}</span>
      </div>

      <h1 className="text-display-lg text-text-primary">{note.title}</h1>

      <div className="flex items-center gap-4 mt-5">
        <MaturityBadge maturity={note.maturity} />
        <Pill>{topicLabels[note.topic]}</Pill>
        <span className="text-caption text-text-muted normal-case tracking-normal">Updated {note.updated}</span>
      </div>

      <div className="mt-10 flex flex-col gap-5">
        {note.body.map((para, i) => (
          <p key={i} className="text-body-lg text-text-secondary leading-relaxed">
            {para}
          </p>
        ))}
      </div>

      <BacklinksMini slugs={note.related} />
    </div>
  );
}

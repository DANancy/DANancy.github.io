import Link from "next/link";
import { notes } from "@/content/garden";

export function BacklinksMini({ slugs }: { slugs: string[] }) {
  const related = slugs.map((s) => notes.find((n) => n.slug === s)).filter(Boolean) as typeof notes;
  if (related.length === 0) return null;

  return (
    <div className="glass p-6 mt-12">
      <div className="text-caption text-text-muted mb-5">Related notes</div>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-4">
        <span className="h-2.5 w-2.5 rounded-full bg-signal shrink-0" />
        {related.map((n, i) => (
          <span key={n.slug} className="flex items-center gap-2">
            <span className="h-px w-6 bg-[var(--glass-border)]" />
            <Link
              href={`/garden/${n.slug}`}
              className="text-body-sm text-text-secondary hover:text-signal-text border border-[var(--glass-border)] rounded-full px-3 py-1.5 transition-colors"
            >
              {n.title}
            </Link>
          </span>
        ))}
      </div>
    </div>
  );
}

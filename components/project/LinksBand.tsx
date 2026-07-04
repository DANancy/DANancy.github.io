import { Terminal, ExternalLink } from "lucide-react";

export function LinksBand({ github, demo, notes }: { github?: string; demo?: string; notes?: { slug: string; title: string }[] }) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {github && (
        <a
          href={github}
          target="_blank"
          rel="noopener"
          className="flex items-center gap-2 rounded-button border border-[var(--glass-border)] px-5 py-2.5 text-body-sm font-semibold text-text-primary hover:border-signal/40 transition-colors"
        >
          <Terminal size={16} /> <span className="text-mono-md">{github.replace("https://", "")}</span>
        </a>
      )}
      {demo && (
        <a
          href={demo}
          target="_blank"
          rel="noopener"
          className="flex items-center gap-2 rounded-button bg-signal px-5 py-2.5 text-body-sm font-semibold text-void hover:brightness-110 transition"
        >
          <ExternalLink size={16} /> Live Demo
        </a>
      )}
      {notes && notes.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-body-sm text-text-muted">Notes from building this:</span>
          {notes.map((n) => (
            <a
              key={n.slug}
              href={`/garden/${n.slug}`}
              className="text-body-sm text-signal-text hover:underline underline-offset-4"
            >
              {n.title}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

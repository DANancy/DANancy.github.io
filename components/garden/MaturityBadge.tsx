import { Maturity } from "@/content/garden";

const MATURITY: Record<Maturity, { emoji: string; label: string }> = {
  seedling: { emoji: "🌱", label: "Seedling" },
  growing: { emoji: "🌿", label: "Growing" },
  evergreen: { emoji: "🌳", label: "Evergreen" },
};

export function MaturityBadge({ maturity }: { maturity: Maturity }) {
  const m = MATURITY[maturity];
  return (
    <span className="inline-flex items-center gap-1.5 text-caption text-text-secondary normal-case tracking-normal">
      <span>{m.emoji}</span>
      {m.label}
    </span>
  );
}

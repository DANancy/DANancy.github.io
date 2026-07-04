import { fmtCompact } from "@/lib/format";

interface TopEntitiesListProps {
  data: [string, number][];
  color: string;
}

export function TopEntitiesList({ data, color }: TopEntitiesListProps) {
  const max = Math.max(...data.map((d) => d[1]));
  return (
    <ul className="flex flex-col gap-3">
      {data.map(([name, value], i) => (
        <li key={name} className="flex items-center gap-3">
          <span className="text-caption text-text-muted w-5 shrink-0">{i + 1}</span>
          <span className="flex-1 min-w-0">
            <span className="text-body-sm text-text-secondary block truncate">{name}</span>
            <span className="block h-1.5 rounded-full bg-[var(--glass-fill)] mt-1.5 overflow-hidden">
              <span
                className="block h-full rounded-full"
                style={{ width: `${(value / max) * 100}%`, backgroundColor: color }}
              />
            </span>
          </span>
          <span className="text-body-sm font-semibold shrink-0" style={{ color }}>
            {fmtCompact(value)}
          </span>
        </li>
      ))}
    </ul>
  );
}

interface StatTileProps {
  label: string;
  value: string;
  sub?: string;
  color?: string;
}

export function StatTile({ label, value, sub, color = "var(--color-series-1)" }: StatTileProps) {
  return (
    <div className="glass p-5">
      <div className="text-caption text-text-muted">{label}</div>
      <div className="text-heading-lg mt-2" style={{ color }}>
        {value}
      </div>
      {sub && <div className="text-body-sm text-text-muted mt-1">{sub}</div>}
    </div>
  );
}

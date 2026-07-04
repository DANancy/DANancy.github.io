import { StatTile } from "@/components/ui/StatTile";

interface ImpactStat {
  label: string;
  value: string;
  sub?: string;
  color?: string;
}

export function ImpactBand({ stats, narrative }: { stats: ImpactStat[]; narrative: string }) {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {stats.map((s) => (
          <StatTile key={s.label} {...s} />
        ))}
      </div>
      <p className="text-body-md text-text-secondary max-w-[760px] leading-relaxed">{narrative}</p>
    </div>
  );
}

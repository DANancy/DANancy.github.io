interface Pair {
  challenge: string;
  solution: string;
}

export function ChallengeSolution({ pairs }: { pairs: Pair[] }) {
  return (
    <div className="flex flex-col gap-5">
      {pairs.map((p, i) => (
        <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass p-5 border-l-4" style={{ borderLeftColor: "var(--color-warning)" }}>
            <div className="text-caption text-warning mb-2">Challenge</div>
            <p className="text-body-sm text-text-secondary">{p.challenge}</p>
          </div>
          <div className="glass p-5 border-l-4" style={{ borderLeftColor: "var(--color-success)" }}>
            <div className="text-caption text-success mb-2">Solution</div>
            <p className="text-body-sm text-text-secondary">{p.solution}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

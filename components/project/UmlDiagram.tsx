const C = {
  surface: "var(--color-surface)",
  border: "var(--glass-border)",
  textPrimary: "var(--color-text-primary)",
  textSecondary: "var(--color-text-secondary)",
  textMuted: "var(--color-text-muted)",
  seriesBlue: "var(--color-series-1)",
  seriesAqua: "var(--color-series-2)",
};

export function UmlDiagram() {
  return (
    <div className="glass p-6">
      <svg viewBox="0 0 900 470" className="w-full h-auto" role="img" aria-label="UML class diagram of the shortfall data model">
        <g fill="none" stroke={C.border} strokeWidth={1.4}>
          <path d="M270,95 L420,95 L420,135 L580,135" />
          <path d="M270,95 L440,95 L440,355 L580,355" />
          <path d="M270,365 L460,365 L460,135 L580,135" />
          <path d="M270,365 L500,365 L500,355 L580,355" />
        </g>
        <g fontSize={10.5} fill={C.textMuted} fontFamily="system-ui, sans-serif">
          <text x={278} y={90}>1</text>
          <text x={278} y={360}>1</text>
          <text x={572} y={130} textAnchor="end">0..*</text>
          <text x={572} y={350} textAnchor="end">0..*</text>
        </g>

        {/* dim_liable_entity */}
        <g>
          <rect x={20} y={60} width={250} height={70} rx={6} fill={C.surface} stroke={C.border} />
          <rect x={20} y={60} width={250} height={30} rx={6} fill={C.textMuted} opacity={0.15} />
          <line x1={20} y1={90} x2={270} y2={90} stroke={C.border} />
          <text x={34} y={80} fontSize={12.5} fontWeight={700} fill={C.textPrimary} fontFamily="system-ui, sans-serif">«dimension» dim_liable_entity</text>
          <text x={34} y={110} fontSize={12} fontWeight={700} fill={C.textPrimary} fontFamily="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace">+ liable_entity : string {"{PK}"}</text>
        </g>

        {/* dim_assessment_year */}
        <g>
          <rect x={20} y={330} width={250} height={70} rx={6} fill={C.surface} stroke={C.border} />
          <rect x={20} y={330} width={250} height={30} rx={6} fill={C.textMuted} opacity={0.15} />
          <line x1={20} y1={360} x2={270} y2={360} stroke={C.border} />
          <text x={34} y={350} fontSize={12.5} fontWeight={700} fill={C.textPrimary} fontFamily="system-ui, sans-serif">«dimension» dim_assessment_year</text>
          <text x={34} y={380} fontSize={12} fontWeight={700} fill={C.textPrimary} fontFamily="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace">+ assessment_year : int {"{PK}"}</text>
        </g>

        {/* fact_lgc_shortfall */}
        <g>
          <rect x={580} y={10} width={300} height={250} rx={6} fill={C.surface} stroke={C.border} />
          <rect x={580} y={10} width={300} height={30} rx={6} fill={C.seriesBlue} opacity={0.15} />
          <line x1={580} y1={40} x2={880} y2={40} stroke={C.border} />
          <text x={594} y={30} fontSize={12.5} fontWeight={700} fill={C.seriesBlue} fontFamily="system-ui, sans-serif">«fact» fact_lgc_shortfall</text>
          <g fontSize={12} fontFamily="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace">
            <text x={594} y={58} fontWeight={700} fill={C.textPrimary}>+ liable_entity : string {"{FK}"}</text>
            <text x={594} y={80} fontWeight={700} fill={C.textPrimary}>+ assessment_year : int {"{FK}"}</text>
            <text x={594} y={102} fill={C.textSecondary}>lgc_liability : int</text>
            <text x={594} y={124} fill={C.textSecondary}>lgcs_accepted_for_surrender : int</text>
            <text x={594} y={146} fill={C.textSecondary}>remaining_lgc_shortfall : int</text>
            <text x={594} y={168} fill={C.textSecondary}>shortfall_pct_of_liability : decimal</text>
            <text x={594} y={190} fill={C.textSecondary}>shortfall_charge_issued : bool</text>
            <text x={594} y={212} fill={C.textSecondary}>value_of_shortfall_charge : decimal</text>
            <text x={594} y={234} fill={C.textSecondary}>shortfall_status : string</text>
          </g>
        </g>

        {/* fact_stc_shortfall */}
        <g>
          <rect x={580} y={290} width={300} height={140} rx={6} fill={C.surface} stroke={C.border} />
          <rect x={580} y={290} width={300} height={30} rx={6} fill={C.seriesAqua} opacity={0.15} />
          <line x1={580} y1={320} x2={880} y2={320} stroke={C.border} />
          <text x={594} y={310} fontSize={12.5} fontWeight={700} fill={C.seriesAqua} fontFamily="system-ui, sans-serif">«fact» fact_stc_shortfall</text>
          <g fontSize={12} fontFamily="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace">
            <text x={594} y={338} fontWeight={700} fill={C.textPrimary}>+ liable_entity : string {"{FK}"}</text>
            <text x={594} y={360} fontWeight={700} fill={C.textPrimary}>+ assessment_year : int {"{FK}"}</text>
            <text x={594} y={382} fill={C.textSecondary}>stc_shortfall : int</text>
            <text x={594} y={404} fill={C.textSecondary}>value_of_shortfall_charge : decimal</text>
          </g>
        </g>
      </svg>
      <div className="text-body-sm text-text-muted mt-4">
        Sources: LGC and STC certificate shortfall registers (CER). {"{PK}"} = dimension key, {"{FK}"} = foreign key into the dimension.
      </div>
    </div>
  );
}

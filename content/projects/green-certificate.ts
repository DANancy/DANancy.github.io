export const meta = {
  slug: "green-certificate-shortfall-analytics",
  title: "Green Certificate Shortfall Analytics",
  eyebrow: "Case Study · Renewable Energy Compliance",
  summary:
    "An end-to-end data platform concept for monitoring Australia's Renewable Energy Certificate (LGC / STC) shortfalls, built on real public register data from the Clean Energy Regulator.",
  stack: ["Azure Data Factory", "Databricks", "Medallion Architecture", "Power BI", "AI Assistant (MCP)"],
  status: "Case Study",
};

export const stats = [
  { label: "Liable Entities — LGC", value: "69", sub: "Unique companies, 2001–2025", color: "var(--color-series-1)" },
  { label: "Liable Entities — STC", value: "55", sub: "Unique companies, 2011–2024", color: "var(--color-series-1)" },
  { label: "Total Remaining Shortfall — LGC", value: "10.25M", sub: "Certificates, all assessment years", color: "var(--color-series-2)" },
  { label: "Total Shortfall — STC", value: "293K", sub: "Certificates, all assessment years", color: "var(--color-series-2)" },
];

export const businessProblem =
  "Liable entities under Australia's Renewable Energy Target scheme — electricity retailers and large energy users — must surrender enough Large-scale Generation Certificates (LGCs) and Small-scale Technology Certificates (STCs) each year to cover their obligations. When they fall short, a shortfall charge applies and the shortfall is recorded on the Clean Energy Regulator's public register. That register is published as a flat, biannual spreadsheet with no easy way to see who is falling short, how shortfalls trend over time, or which entities carry the largest outstanding balances — so regulators, analysts, and the liable entities themselves have no single place to monitor this compliance risk.";

export const scope = {
  inScope: [
    "Ingest and model the CER's published LGC and STC shortfall registers",
    "Compute entity-level and year-level shortfall trends from the real data",
    "Present the data as an interactive dashboard with drill-down to top offenders",
    "Provide a natural-language query interface over the dataset",
  ],
  outOfScope: [
    "Real-time register updates — CER publishes twice yearly; this reflects a point-in-time snapshot (2026-07-03)",
    "Forecasting or predicting future shortfalls",
    "Certificate types outside LGC/STC (e.g. ACCUs)",
  ],
};

export const functionalRequirements = [
  { id: "FR1", text: "Ingest the published LGC and STC shortfall CSV registers" },
  { id: "FR2", text: "Compute total and per-entity shortfall by assessment year" },
  { id: "FR3", text: "Display year-over-year shortfall trends as charts" },
  { id: "FR4", text: "Rank and display top liable entities by cumulative shortfall" },
  { id: "FR5", text: "Let users ask natural-language questions and get an answer grounded in the data" },
  { id: "FR6", text: "Visualize the underlying dimensional data model" },
];

export const nonFunctionalRequirements = [
  { id: "NFR1", text: "Core browsing works entirely client-side on static hosting — no backend required" },
  { id: "NFR2", text: "Usable on both desktop and mobile viewports" },
  { id: "NFR3", text: "AI Query degrades gracefully to a local rule-based fallback if no AI backend is configured, so it never appears broken" },
  { id: "NFR4", text: "No secret credentials exposed in client-side code (AI backend key stays server-side)" },
  { id: "NFR5", text: "Meets basic accessibility practice — sufficient color contrast, non-color-only indicators, dark/light mode support" },
];

export const pipelineStages = [
  {
    title: "Source Systems",
    color: "var(--color-text-muted)",
    items: ["REC Registry", "Liable Entities", "Reference Data", "External Systems"],
  },
  {
    title: "Azure Data Factory",
    color: "var(--color-series-1)",
    items: ["Ingestion", "Orchestration", "Scheduling", "Monitoring"],
  },
  {
    title: "Databricks (Medallion)",
    color: "var(--color-series-4)",
    medallion: ["Bronze — raw ingestion", "Silver — cleansed & standardized", "Gold — business model, aggregated"],
    items: [],
  },
  {
    title: "Power BI",
    color: "var(--color-warning)",
    items: ["Semantic model", "Reports", "Dashboards", "Insights"],
  },
  {
    title: "AI Layer (MCP)",
    color: "var(--color-clay)",
    items: ["MCP Server", "Query Bot", "Dashboard Assistant", "NLQ & Insights"],
  },
];

export const links = {
  github: "https://github.com/DANancy/DANancy.github.io",
};

export const challenges = [
  {
    challenge:
      "The CER register uses inconsistent entity naming across years — the same company appears under slightly different legal names (e.g. \"Pty Ltd\" vs \"Pty. Limited\") release to release, which would silently split one entity's shortfall history into two rows.",
    solution:
      "Built a normalization pass in the Silver layer that maps known entity-name variants to a single canonical liable_entity key before aggregation, so the Gold-layer facts and the Top Entities dashboard never double-count.",
  },
  {
    challenge:
      "The register is published as two independently-formatted files (LGC and STC) with different columns and different year ranges — one starts in 2001, the other in 2011 — which makes a single unified fact table awkward and misleading.",
    solution:
      "Modeled them as two fact tables sharing common dimensions (dim_liable_entity, dim_assessment_year) instead of forcing a premature merge. Cross-certificate questions — like the AI Assistant's \"compare LGC and STC\" query — join across facts instead of hiding the seam.",
  },
  {
    challenge:
      "A live LLM-backed assistant needs an API key — and this site is static-hosted on GitHub Pages with no server to keep that key safe from every visitor's browser.",
    solution:
      "Built a rule-based query engine that runs entirely client-side against the loaded register data. It only answers questions it can ground in real numbers, and says so explicitly when it can't — trading generality for zero secret-exposure risk (NFR4).",
  },
  {
    challenge:
      "Shortfall values span from single digits to millions of certificates within the same chart, which flattens smaller years into invisible slivers on a linear axis.",
    solution:
      "Kept the axis linear (a log scale would misrepresent absolute risk to a non-technical reader), but labeled the peak year directly on its bar and used compact axis notation (10K, 1M) so the chart stays honest without needing a legend to interpret.",
  },
];

export const impact = {
  stats: [
    { label: "Time to find top shortfall entity", value: "~15min → instant", sub: "Manual register search vs. dashboard + AI Assistant", color: "var(--color-series-1)" },
    { label: "Registers unified", value: "2 → 1", sub: "LGC and STC modeled on shared dimensions", color: "var(--color-series-2)" },
    { label: "External API calls", value: "0", sub: "AI Assistant runs entirely client-side", color: "var(--color-series-3)" },
  ],
  narrative:
    "This wasn't deployed to a real regulator or energy retailer — it's a portfolio build on the CER's real public data, so the honest impact claim is architectural, not commercial. The same medallion pipeline and dimensional model here is the pattern I've used in production to turn a compliance register nobody wants to open into a dashboard people actually check.",
};

export const lessons = [
  {
    title: "Dimensional modelling earns its cost even in a weekend project.",
    body: "It would have been faster to dump both registers into one wide table. Splitting them into facts against shared dimensions took longer up front and made every downstream query — the charts, the top-entity lists, the AI Assistant — simpler and more correct.",
  },
  {
    title: "A rule-based fallback is underrated.",
    body: "It's tempting to treat 'no LLM available' as a degraded experience. Done well, a scoped rule-based engine that's honest about its limits can feel more trustworthy than a fluent model that occasionally makes numbers up.",
  },
  {
    title: "Static hosting is a design constraint, not a limitation to route around quietly.",
    body: "No backend forced every architectural decision — the AI Assistant, the charts, the data model — to be resolved client-side and out in the open. That constraint produced a cleaner design than having a server to hide complexity in.",
  },
  {
    title: "Real government data is messier than any tutorial dataset.",
    body: "Entity name drift, inconsistent year ranges, and gaps in the published register (no 2006, 2008, 2012 LGC rows) are the kind of thing you only learn by opening the actual file — no amount of clean-dataset practice substitutes for that.",
  },
];

export const dashboard = {
  lgcYears: ["2001", "2002", "2003", "2004", "2005", "2007", "2009", "2010", "2011", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025"],
  lgcValues: [372, 38, 13, 20, 18, 9, 15671, 1606, 2427, 120, 29, 10918, 233376, 16785, 54, 5235, 14804, 1967, 87744, 4073899, 3826115, 1963154],
  stcYears: ["2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"],
  stcValues: [19772, 13304, 4342, 23623, 2847, 14801, 7039, 702, 4046, 58547, 19954, 106105, 16614, 1717],
  topLgc: [
    ["Red Energy Pty. Limited", 2550564],
    ["Alinta Energy Retail Sales Pty. Ltd.", 2090641],
    ["AGL Sales Pty Limited", 2071485],
    ["Alinta Sales Pty Ltd", 1130684],
    ["Aurora Energy Pty Ltd", 761161],
    ["IPOWER 2 PTY LIMITED / IPOWER PTY LIMITED TA ENGIE", 582164],
  ] as [string, number][],
  topStc: [
    ["Qenergy Limited (Receivers & Managers Appointed)", 82786],
    ["Blue NRG Pty. Ltd.", 27689],
    ["MOJO POWER EAST PTY LTD", 25391],
    ["Mojo Power Pty Ltd (Receivers & Managers Appointed)", 21749],
    ["BHP Billiton Iron Ore Pty Limited", 20520],
    ["Qenergy Limited (In Liquidation)", 18703],
  ] as [string, number][],
};

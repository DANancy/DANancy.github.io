export type Maturity = "seedling" | "growing" | "evergreen";
export type Topic =
  | "ai"
  | "system-design"
  | "azure"
  | "databricks"
  | "power-bi"
  | "architecture"
  | "career"
  | "books";

export interface GardenNote {
  slug: string;
  title: string;
  topic: Topic;
  maturity: Maturity;
  updated: string;
  excerpt: string;
  body: string[];
  related: string[];
}

export const topicLabels: Record<Topic, string> = {
  ai: "AI",
  "system-design": "System Design",
  azure: "Azure",
  databricks: "Databricks",
  "power-bi": "Power BI",
  architecture: "Architecture",
  career: "Career",
  books: "Books",
};

export const notes: GardenNote[] = [
  {
    slug: "rag-still-needs-good-data-modelling",
    title: "RAG Still Needs Good Data Modelling",
    topic: "ai",
    maturity: "growing",
    updated: "2026-06-18",
    excerpt: "Retrieval-augmented generation doesn't remove the need for a clean schema — it just moves where the schema pain shows up.",
    body: [
      "It's tempting to treat RAG as a way to skip data modelling entirely: dump documents into a vector store, embed everything, and let similarity search do the rest. That works for a demo. It falls apart the moment two documents contradict each other, or a chunk loses the context that made it meaningful.",
      "In practice, the teams getting good results are the ones who still model their domain first — entities, relationships, freshness, source-of-truth — and then decide which parts of that model get embedded, which get filtered with metadata, and which get answered by a direct query instead of a similarity search at all.",
      "GraphRAG makes this explicit: the graph *is* the data model, and retrieval walks it instead of guessing from vector distance alone. That's a more honest admission of what was always true — retrieval quality is a data engineering problem wearing an AI costume.",
    ],
    related: ["mcp-in-production-notes"],
  },
  {
    slug: "medallion-architecture-explained-simply",
    title: "Medallion Architecture, Explained Simply",
    topic: "architecture",
    maturity: "evergreen",
    updated: "2026-05-02",
    excerpt: "Bronze, Silver, Gold isn't a Databricks marketing term — it's just naming a discipline most good pipelines already had.",
    body: [
      "Bronze is raw, as-landed, untouched. If the source system's data is wrong, bronze is wrong too — and that's fine, because bronze's job is to be a faithful, replayable copy of what actually arrived.",
      "Silver is where the arguments happen: type casting, deduplication, conforming dimensions, handling late-arriving data. This is the layer that decides what 'clean' means for your business, and it's usually where most of the engineering effort actually goes.",
      "Gold is the layer with an opinion. It's shaped for a specific consumer — a dashboard, a reverse ETL sync, an ML feature store — and it's allowed to look different for different consumers, because by gold, 'general purpose' has stopped being a virtue.",
    ],
    related: ["databricks-job-clusters-vs-all-purpose"],
  },
  {
    slug: "databricks-job-clusters-vs-all-purpose",
    title: "Databricks Job Clusters vs All-Purpose",
    topic: "databricks",
    maturity: "seedling",
    updated: "2026-06-30",
    excerpt: "The cost difference is bigger than most teams realize until the first surprising invoice.",
    body: [
      "All-purpose clusters are for people, sitting idle between queries, priced accordingly. Job clusters spin up for a specific run and tear down when it finishes — cheaper per DBU and, more importantly, isolated from whatever someone else is doing in a shared notebook.",
      "The default mistake: prototyping on an all-purpose cluster, shipping to production on the same cluster because it's already there, and finding out at month-end that idle compute was the majority of the bill.",
    ],
    related: ["medallion-architecture-explained-simply"],
  },
  {
    slug: "what-i-look-for-in-a-system-design-interview",
    title: "What I Look For in a System Design Interview",
    topic: "system-design",
    maturity: "growing",
    updated: "2026-04-11",
    excerpt: "Less about the diagram, more about which constraints the candidate asks about before drawing anything.",
    body: [
      "The strongest signal isn't the final architecture — most reasonable designs converge eventually. It's whether the candidate asks about read/write ratios, consistency requirements, and failure modes before committing to a shape.",
      "A candidate who says 'it depends' and then explains what it depends on is doing better system design than one who confidently draws a polished diagram from the first minute.",
    ],
    related: [],
  },
  {
    slug: "you-found-this",
    title: "You Found This",
    topic: "career",
    maturity: "evergreen",
    updated: "2026-07-03",
    excerpt: "A short, personal note for the people curious enough to explore every corner of the homepage graph.",
    body: [
      "If you're reading this, you clicked every facet and every interest on the homepage — all seventeen of them. That's not nothing. Most visitors read a headline and bounce; you went looking for the edges of the map.",
      "So, off the record: this whole site started as an argument with myself about what a personal site should be. Every version I tried looked like a resume wearing a nicer font. The graph on the homepage exists because I wanted the first five seconds to feel like curiosity, not a pitch.",
      "Thanks for playing all the way through. If you want to talk shop — data platforms, AI tooling, or just a good coffee recommendation in Melbourne — the contact page is real, and I read everything that comes through it.",
    ],
    related: ["rag-still-needs-good-data-modelling"],
  },
  {
    slug: "reading-designing-data-intensive-applications",
    title: "Reading: Designing Data-Intensive Applications",
    topic: "books",
    maturity: "evergreen",
    updated: "2026-07-01",
    excerpt: "Still the book I recommend first — re-reading it years later surfaces things I only understand now because I've hit them in production.",
    body: [
      "Kleppmann's book holds up because it teaches the underlying tradeoffs — replication, partitioning, consistency — rather than a specific tool's API surface. Tools churn every 18 months; the tradeoffs don't.",
      "On this re-read, the chapters on batch vs stream processing land completely differently now that I've actually operated both in production. First time through, it was theory. This time, every page has a war story attached.",
    ],
    related: ["rag-still-needs-good-data-modelling"],
  },
];

export function getNote(slug: string) {
  return notes.find((n) => n.slug === slug);
}

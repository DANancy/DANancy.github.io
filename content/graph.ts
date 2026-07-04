export type NodeType = "core" | "facet" | "life" | "hidden";

export interface GraphNodeData {
  id: string;
  type: NodeType;
  label: string;
  description: string;
  href: string;
  icon?: string; // lucide icon name (facet) or emoji (life/hidden)
}

export const nodes: GraphNodeData[] = [
  {
    id: "core",
    type: "core",
    label: "Yangyang Cai",
    description:
      "I'm Yangyang — a Senior Data Engineer in Melbourne. I've spent 10+ years building enterprise data platforms, and these days I spend just as much energy teaching engineers to make AI practical. This site is my world — explore it, or head straight to the work.",
    href: "/technology",
    icon: "YC",
  },
  {
    id: "facet-data-engineer",
    type: "facet",
    label: "Data Engineer",
    description: "Builds enterprise data platforms on Azure, Databricks and AWS — lakehouse architecture, end to end.",
    href: "/technology",
    icon: "Database",
  },
  {
    id: "facet-ai-engineer",
    type: "facet",
    label: "AI-Powered Engineer",
    description: "Pairs 10+ years of engineering judgment with Claude, Copilot and Cursor — AI as amplifier, not autopilot.",
    href: "/technology#ai",
    icon: "Sparkles",
  },
  {
    id: "facet-community-builder",
    type: "facet",
    label: "Community Builder",
    description: "Organizes and teaches at data & AI meetups and workshops across Melbourne.",
    href: "/about#community",
    icon: "Users",
  },
  {
    id: "facet-ai-educator",
    type: "facet",
    label: "AI Educator",
    description: "Teaches practical AI to working engineers — bootcamps, workshops, and the Make AI Practical community.",
    href: "/garden?topic=ai",
    icon: "GraduationCap",
  },
  {
    id: "facet-builder",
    type: "facet",
    label: "Builder",
    description: "Always has something mid-flight. This site is one of them.",
    href: "/projects",
    icon: "Hammer",
  },
  {
    id: "facet-lifelong-learner",
    type: "facet",
    label: "Lifelong Learner",
    description: "Learns in public — the Knowledge Garden is the receipts.",
    href: "/garden",
    icon: "BookOpen",
  },
  {
    id: "facet-technology-explorer",
    type: "facet",
    label: "Technology Explorer",
    description: "Tries the new thing early. Keeps what actually works.",
    href: "/technology#modern",
    icon: "Compass",
  },

  // Life nodes
  { id: "life-pottery", type: "life", label: "Pottery", description: "Wheel-throwing on weekends — patience training disguised as a hobby.", href: "/about#pottery", icon: "🏺" },
  { id: "life-travel", type: "life", label: "Travelling", description: "Planning the next trip before the last one's photos are sorted.", href: "/about#travel", icon: "✈️" },
  { id: "life-food", type: "life", label: "Food", description: "Will drive across Melbourne on a rumor of good noodles.", href: "/about#food", icon: "🍜" },
  { id: "life-coffee", type: "life", label: "Coffee", description: "Melbourne coffee snob, unapologetically.", href: "/about#coffee", icon: "☕" },
  { id: "life-reading", type: "life", label: "Reading", description: "Currently re-reading Kleppmann — see “Currently”.", href: "/garden?topic=books", icon: "📚" },
  { id: "life-people", type: "life", label: "Meeting People", description: "Meetups, mentoring, and conversations with interesting strangers.", href: "/about#people", icon: "🤝" },
  { id: "life-rpg", type: "life", label: "RPG Games", description: "RPGs with 100-hour save files. BG3, again.", href: "/about#rpg", icon: "🎮" },
  { id: "life-fighting-games", type: "life", label: "Fighting Games", description: "Fighting games — frame data is just another data model.", href: "/about#fighting-games", icon: "🥊" },
  { id: "life-anime", type: "life", label: "Fantasy & Cultivation Anime", description: "Cultivation arcs are just career growth with better visuals.", href: "/about#anime", icon: "⚔️" },
  { id: "life-ideas", type: "life", label: "Exploring New Ideas", description: "New ideas are the best souvenir.", href: "/about#ideas", icon: "🌏" },

  // Hidden 18th node — appears only at 17/17 discovered (§6.8), excluded from the discovery count
  {
    id: "hidden-comet",
    type: "hidden",
    label: "?",
    description: "You explored everything. This is for you.",
    href: "/garden/you-found-this",
    icon: "☄️",
  },
];

// [sourceId, targetId]
export const edges: [string, string][] = [
  ["core", "facet-data-engineer"],
  ["core", "facet-ai-engineer"],
  ["core", "facet-community-builder"],
  ["core", "facet-ai-educator"],
  ["core", "facet-builder"],
  ["core", "facet-lifelong-learner"],
  ["core", "facet-technology-explorer"],

  ["facet-builder", "life-pottery"],
  ["facet-technology-explorer", "life-travel"],
  ["facet-community-builder", "life-food"],
  ["facet-community-builder", "life-coffee"],
  ["facet-lifelong-learner", "life-reading"],
  ["facet-community-builder", "life-people"],
  ["facet-technology-explorer", "life-rpg"],
  ["facet-technology-explorer", "life-fighting-games"],
  ["facet-lifelong-learner", "life-anime"],
  ["facet-ai-engineer", "life-ideas"],
];

export const TOTAL_DISCOVERABLE = nodes.filter((n) => n.type !== "core" && n.type !== "hidden").length; // 17

import { renderOgCard } from "@/lib/og";

export const dynamic = "force-static";

export function GET() {
  return renderOgCard({
    eyebrow: "MAKE AI PRACTICAL",
    title: "Yangyang Cai",
    subtitle: "Senior Data Engineer & practical AI builder in Melbourne — renewable energy, Databricks, workshops and community.",
  });
}

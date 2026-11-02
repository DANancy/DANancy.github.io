import { renderOgCard } from "@/lib/og";

export const dynamic = "force-static";

export function GET() {
  return renderOgCard({
    eyebrow: "DATA ENGINEERING CASE STUDY",
    title: "Green Certificate Shortfall Analytics",
    subtitle: "End-to-end analysis of Australian LGC and STC shortfalls with public data — by Yangyang Cai.",
  });
}

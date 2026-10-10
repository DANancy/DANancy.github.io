import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Yangyang Cai — Data Lover",
    short_name: "Yangyang Cai",
    description: "Senior Data Engineer and practical AI builder in Melbourne.",
    start_url: "/",
    display: "standalone",
    background_color: "#f4f6f3",
    theme_color: "#276f52",
    icons: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}

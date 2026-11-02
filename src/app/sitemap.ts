import { execFileSync } from "node:child_process";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const origin = "https://yangyangcai.me";
const sections = ["about", "work", "business", "community", "fun", "links"];

// Last commit date touching the given paths; omitted when git history is unavailable.
function lastModified(...paths: string[]): string | undefined {
  try {
    return execFileSync("git", ["log", "-1", "--format=%cI", "--", ...paths], { encoding: "utf8" }).trim() || undefined;
  } catch {
    return undefined;
  }
}

const portfolioModified = lastModified("src/components/desktop", "src/data", "src/app/page.tsx", "src/app/[section]", "src/app/zh-hans");
const projectModified = lastModified("src/app/projects", "src/content/legacy");

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    {
      url: `${origin}/`,
      lastModified: portfolioModified,
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages: { en: `${origin}/`, "zh-Hans": `${origin}/zh-hans/` } },
    },
    {
      url: `${origin}/zh-hans/`,
      lastModified: portfolioModified,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: { languages: { en: `${origin}/`, "zh-Hans": `${origin}/zh-hans/` } },
    },
    {
      url: `${origin}/projects/green-certificate-shortfall-analytics/`,
      lastModified: projectModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  for (const section of sections) {
    const languages = {
      en: `${origin}/${section}/`,
      "zh-Hans": `${origin}/zh-hans/${section}/`,
    };
    entries.push(
      { url: languages.en, lastModified: portfolioModified, changeFrequency: "monthly", priority: 0.8, alternates: { languages } },
      { url: languages["zh-Hans"], lastModified: portfolioModified, changeFrequency: "monthly", priority: 0.7, alternates: { languages } },
    );
  }

  return entries;
}

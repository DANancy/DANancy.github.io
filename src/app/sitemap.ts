import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const origin = "https://yangyangcai.me";
const sections = ["about", "work", "community", "fun", "links", "contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-09-12T00:00:00+10:00");
  const entries: MetadataRoute.Sitemap = [
    {
      url: `${origin}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages: { en: `${origin}/`, "zh-Hans": `${origin}/zh-hans/` } },
    },
    {
      url: `${origin}/zh-hans/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: { languages: { en: `${origin}/`, "zh-Hans": `${origin}/zh-hans/` } },
    },
    {
      url: `${origin}/projects/green-certificate-shortfall-analytics/`,
      lastModified,
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
      { url: languages.en, lastModified, changeFrequency: "monthly", priority: 0.8, alternates: { languages } },
      { url: languages["zh-Hans"], lastModified, changeFrequency: "monthly", priority: 0.7, alternates: { languages } },
    );
  }

  return entries;
}

import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const origin = "https://yangyangcai.me";
const sections = ["about", "work", "business", "community", "fun", "links"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    {
      url: `${origin}/`,
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages: { en: `${origin}/`, "zh-Hans": `${origin}/zh-hans/` } },
    },
    {
      url: `${origin}/zh-hans/`,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: { languages: { en: `${origin}/`, "zh-Hans": `${origin}/zh-hans/` } },
    },
    {
      url: `${origin}/projects/green-certificate-shortfall-analytics/`,
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
      { url: languages.en, changeFrequency: "monthly", priority: 0.8, alternates: { languages } },
      { url: languages["zh-Hans"], changeFrequency: "monthly", priority: 0.7, alternates: { languages } },
    );
  }

  return entries;
}

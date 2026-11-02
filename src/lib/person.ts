// Shared schema.org Person entity. Only facts already stated on the site belong here.
export const personJsonLd = {
  "@type": "Person",
  "@id": "https://yangyangcai.me/#person",
  name: "Yangyang Cai",
  alternateName: ["Nancy Cai", "蔡阳阳"],
  url: "https://yangyangcai.me/",
  image: "https://yangyangcai.me/og/default.png",
  jobTitle: "Senior Data Engineer",
  description:
    "Melbourne Senior Data Engineer with 10+ years in data engineering, data platforms and analytics, working in renewable energy and teaching practical AI.",
  homeLocation: { "@type": "Place", name: "Melbourne, Victoria, Australia" },
  worksFor: { "@type": "Organization", name: "SmartestEnergy Australia" },
  award: [
    "Best of 2024, Shell Energy",
    "Monthly Awesomeness, Shell Energy (May 2023)",
    "FY21 Top Learners, AGL",
  ],
  knowsAbout: [
    "Data engineering",
    "Databricks",
    "PySpark",
    "SQL",
    "Azure Data Factory",
    "Azure Synapse",
    "Power BI",
    "Medallion architecture",
    "Renewable energy data",
    "Practical artificial intelligence",
    "Knowledge agents",
    "Data platform architecture",
  ],
  sameAs: [
    "https://www.linkedin.com/in/yangyangcai",
    "https://github.com/DANancy",
  ],
  memberOf: { "@type": "Organization", name: "Make AI Practical", url: "https://www.makeaipractical.com.au/" },
};

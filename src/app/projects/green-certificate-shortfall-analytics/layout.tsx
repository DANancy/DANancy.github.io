import type { Metadata } from "next";

const projectJsonLd = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "@id": "https://yangyangcai.me/projects/green-certificate-shortfall-analytics/#project",
  url: "https://yangyangcai.me/projects/green-certificate-shortfall-analytics/",
  name: "Australian Green Certificate Shortfall Analytics",
  description:
    "An end-to-end data engineering portfolio project exploring Australian LGC and STC certificate shortfalls with public data, analytics and visualisation.",
  inLanguage: "en-AU",
  dateModified: "2026-09-12",
  author: { "@id": "https://yangyangcai.me/#person", "@type": "Person", name: "Yangyang Cai" },
  about: [
    { "@type": "Thing", name: "Australian renewable energy certificates" },
    { "@type": "Thing", name: "Data engineering" },
    { "@type": "Thing", name: "Large-scale generation certificates" },
    { "@type": "Thing", name: "Small-scale technology certificates" },
  ],
  image: "https://yangyangcai.me/assets/certificate-market.webp",
};

export const metadata: Metadata = {
  title: "Australian Green Certificate Shortfall Analytics",
  description:
    "An end-to-end data engineering portfolio project by Yangyang Cai exploring Australian LGC and STC certificate shortfalls with public data, analytics and visualisation.",
  keywords: [
    "Australian renewable energy certificate data",
    "LGC shortfall analytics",
    "STC shortfall analytics",
    "data engineering portfolio",
    "Yangyang Cai",
  ],
  alternates: { canonical: "/projects/green-certificate-shortfall-analytics/" },
  openGraph: {
    type: "article",
    url: "/projects/green-certificate-shortfall-analytics/",
    title: "Australian Green Certificate Shortfall Analytics | Yangyang Cai",
    description: "A practical, end-to-end renewable-energy data engineering case study using Australian certificate data.",
    images: [{ url: "/assets/certificate-market.webp", width: 1200, height: 630, alt: "Green certificate analytics project" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Australian Green Certificate Shortfall Analytics",
    description: "An end-to-end renewable-energy data engineering case study by Yangyang Cai.",
    images: ["/assets/certificate-market.webp"],
  },
};

export default function ProjectLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(projectJsonLd).replace(/</g,"\\u003c")}} />
    {children}
  </>;
}

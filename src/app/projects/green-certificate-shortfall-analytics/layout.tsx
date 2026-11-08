import type { Metadata } from "next";
import { greenCertificateOgImage } from "@/lib/og";

const projectJsonLd = {
  "@context": "https://schema.org",
  "@graph": [{
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
  }, {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://yangyangcai.me/" },
      { "@type": "ListItem", position: 2, name: "Business", item: "https://yangyangcai.me/business/" },
      { "@type": "ListItem", position: 3, name: "Australian Green Certificate Shortfall Analytics", item: "https://yangyangcai.me/projects/green-certificate-shortfall-analytics/" },
    ],
  }],
};

export const metadata: Metadata = {
  title: "Australian Green Certificate Shortfall Analytics",
  description:
    "Yangyang Cai's end-to-end data engineering case study of Australian LGC and STC certificate shortfalls, using public data, analytics and visualisation.",
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
    images: [greenCertificateOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Australian Green Certificate Shortfall Analytics",
    description: "An end-to-end renewable-energy data engineering case study by Yangyang Cai.",
    images: [greenCertificateOgImage.url],
  },
};

export default function ProjectLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(projectJsonLd).replace(/</g,"\\u003c")}} />
    {children}
  </>;
}

import { DesktopPortfolio } from "@/components/desktop/DesktopPortfolio";
import "@/components/desktop/desktop.css";

const profileJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": "https://yangyangcai.me/#profile",
  url: "https://yangyangcai.me/",
  name: "Yangyang Cai — Data Lover",
  inLanguage: "en-AU",
  mainEntity: {
    "@type": "Person",
    "@id": "https://yangyangcai.me/#person",
    name: "Yangyang Cai",
    alternateName: "Nancy Cai",
    url: "https://yangyangcai.me/",
    jobTitle: "Senior Data Engineer",
    description:
      "Melbourne Senior Data Engineer working across renewable energy, data platforms, Databricks and practical AI.",
    homeLocation: { "@type": "Place", name: "Melbourne, Victoria, Australia" },
    knowsAbout: [
      "Data engineering",
      "Databricks",
      "PySpark",
      "SQL",
      "Azure Data Factory",
      "Renewable energy data",
      "Practical artificial intelligence",
      "Data platform architecture",
    ],
    sameAs: [
      "https://www.linkedin.com/in/yangyangcai",
      "https://github.com/DANancy",
      "https://www.makeaipractical.com.au/",
    ],
  },
};

export const metadata = {
  alternates:{canonical:"/",languages:{en:"/","zh-Hans":"/zh-hans/","x-default":"/"}},
  openGraph:{
    title:"Yangyang Cai | Data Lover",
    url:"/",
    images:[{url:"/assets/community-event.webp",width:1200,height:630,alt:"Yangyang Cai — data, AI and community"}],
  },
};

export default function HomePage(){
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(profileJsonLd).replace(/</g,"\\u003c")}} />
    <DesktopPortfolio initialSection="overview"/>
  </>;
}

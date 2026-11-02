import { DesktopPortfolio } from "@/components/desktop/DesktopPortfolio";
import "@/components/desktop/desktop.css";
import { personJsonLd } from "@/lib/person";
import { defaultOgImage } from "@/lib/og";

const profileJsonLd = {
  "@context": "https://schema.org",
  "@graph": [{
    "@type": "WebSite",
    "@id": "https://yangyangcai.me/#website",
    url: "https://yangyangcai.me/",
    name: "Yangyang Cai",
    inLanguage: ["en-AU", "zh-Hans"],
    publisher: { "@id": "https://yangyangcai.me/#person" },
  }, {
    "@type": "ProfilePage",
    "@id": "https://yangyangcai.me/#profile",
    url: "https://yangyangcai.me/",
    name: "Yangyang Cai — Senior Data Engineer and Practical AI Builder",
    inLanguage: "en-AU",
    isPartOf: { "@id": "https://yangyangcai.me/#website" },
    mainEntity: { "@id": "https://yangyangcai.me/#person" },
  }, personJsonLd],
};

export const metadata = {
  alternates:{canonical:"/",languages:{en:"/","zh-Hans":"/zh-hans/","x-default":"/"}},
  openGraph:{
    title:"Yangyang Cai | Senior Data Engineer & Practical AI Builder",
    url:"/",
    images:[defaultOgImage],
  },
  twitter:{card:"summary_large_image",title:"Yangyang Cai | Senior Data Engineer & Practical AI Builder",description:"Melbourne Senior Data Engineer working across renewable energy, cloud data platforms, Databricks and practical AI.",images:[defaultOgImage.url]},
};

export default function HomePage(){
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(profileJsonLd).replace(/</g,"\\u003c")}} />
    <DesktopPortfolio initialSection="overview"/>
  </>;
}

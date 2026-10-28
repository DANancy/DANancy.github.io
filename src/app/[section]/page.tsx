import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DesktopPortfolio } from "@/components/desktop/DesktopPortfolio";
import type { DesktopSection } from "@/data/desktop";
import "@/components/desktop/desktop.css";

const sections = {
  about:{title:"About Yangyang Cai",description:"Meet Yangyang Cai, a Melbourne Senior Data Engineer and practical AI builder working across renewable energy, data platforms, education, and community."},
  work:{title:"Data Engineering & Cloud Data Platform Work",description:"Explore Yangyang Cai's data engineering work across renewable energy, Azure, AWS, Databricks, data pipelines, and modern cloud data platforms."},
  business:{title:"Practical AI Workshops, Mentoring & Business",description:"Explore Yangyang Cai's practical AI workshops, AI data engineering training, mentoring, and collaborative business projects in Melbourne."},
  community:{title:"Practical AI Community & Knowledge Sharing",description:"Discover Yangyang Cai's Make AI Practical community work, hands-on AI workshops, mentoring, podcasts, and knowledge sharing in Melbourne."},
  fun:{title:"Just for Fun",description:"Books, animation, pottery, games, and events that keep Yangyang Cai curious beyond data and AI."},
  links:{title:"Contact, Friends & Links",description:"Contact Yangyang Cai and explore creative work by friends, communities, projects, and useful related links."},
} as const;

type SectionSlug=keyof typeof sections;

export const dynamicParams=false;

export function generateStaticParams(){
  return Object.keys(sections).map(section=>({section}));
}

export async function generateMetadata({params}:{params:Promise<{section:string}>}):Promise<Metadata>{
  const {section}=await params;
  if(!(section in sections))return {};
  const page=sections[section as SectionSlug];
  return {
    title:page.title,
    description:page.description,
    alternates:{canonical:`/${section}/`,languages:{en:`/${section}/`,"zh-Hans":`/zh-hans/${section}/`,"x-default":`/${section}/`}},
    openGraph:{title:`${page.title} | Yangyang Cai`,description:page.description,url:`/${section}/`,type:"website",locale:"en_AU",images:[{url:"/assets/community-event.webp",width:1200,height:630,alt:"Yangyang Cai — data engineering, practical AI and community"}]},
    twitter:{card:"summary_large_image",title:`${page.title} | Yangyang Cai`,description:page.description,images:["/assets/community-event.webp"]},
  };
}

export default async function SectionPage({params}:{params:Promise<{section:string}>}){
  const {section}=await params;
  if(!(section in sections))notFound();
  const page=sections[section as SectionSlug];
  const graph: Record<string, unknown>[]=[
    {"@type":"WebPage","@id":`https://yangyangcai.me/${section}/#webpage`,url:`https://yangyangcai.me/${section}/`,name:page.title,description:page.description,inLanguage:"en-AU",isPartOf:{"@id":"https://yangyangcai.me/#website"},about:{"@id":"https://yangyangcai.me/#person"}},
    {"@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:"https://yangyangcai.me/"},{"@type":"ListItem",position:2,name:page.title,item:`https://yangyangcai.me/${section}/`}]},
  ];
  if(section==="business") graph.push({"@type":"FAQPage",mainEntity:[
    {"@type":"Question",name:"Who are the practical AI workshops for?",acceptedAnswer:{"@type":"Answer",text:"Professionals and curious learners who want to turn everyday information or an idea into a useful working solution through guided, hands-on practice."}},
    {"@type":"Question",name:"What do participants build?",acceptedAnswer:{"@type":"Answer",text:"Workshop outcomes vary by session. Existing workshops have focused on practical AI workflows and personal knowledge agents that participants can continue using afterwards."}},
    {"@type":"Question",name:"What does the AI-Data Engineering Bootcamp cover?",acceptedAnswer:{"@type":"Answer",text:"The 12-session bootcamp uses a public dataset to explore the end-to-end data engineering lifecycle, dependable delivery, Databricks AI, Power BI MCP, and practical AI support."}},
  ]});
  const jsonLd={
    "@context":"https://schema.org",
    "@graph":graph,
  };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd).replace(/</g,"\\u003c")}}/><DesktopPortfolio initialSection={section as Exclude<DesktopSection,"overview">}/></>;
}

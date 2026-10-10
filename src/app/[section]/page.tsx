import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DesktopPortfolio } from "@/components/desktop/DesktopPortfolio";
import type { DesktopSection } from "@/data/desktop";
import "@/components/desktop/desktop.css";

const sections = {
  about:{title:"About",description:"Meet Yangyang Cai, a Melbourne Senior Data Engineer and Data Magician working across renewable energy, practical AI, and useful digital products."},
  work:{title:"Work",description:"Explore Yangyang Cai's data engineering, AI, mentoring, ecommerce, and collaborative technology projects."},
  ventures:{title:"Business & Ventures",description:"Explore Yangyang Cai's independent mentoring, AI data engineering training, and practical AI services alongside collaborative ecommerce and AI retail ventures."},
  community:{title:"Community",description:"Discover Yangyang Cai's Make AI Practical community work, hands-on AI workshops, mentoring, and knowledge sharing."},
  fun:{title:"Just for Fun",description:"Books, animation, pottery, games, and events that keep Yangyang Cai curious beyond data and AI."},
  links:{title:"Contact, Friends & Links",description:"Contact Yangyang Cai and explore creative work by friends, communities, projects, and useful related links."},
  contact:{title:"Contact",description:"Connect with Yangyang Cai on LinkedIn, GitHub, or by email for thoughtful conversations and collaboration."},
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
    openGraph:{title:`${page.title} | Yangyang Cai`,description:page.description,url:`/${section}/`,type:"website",images:[{url:"/assets/community-event.webp",width:1200,height:630,alt:"Yangyang Cai — data, AI and community"}]},
  };
}

export default async function SectionPage({params}:{params:Promise<{section:string}>}){
  const {section}=await params;
  if(!(section in sections))notFound();
  return <DesktopPortfolio initialSection={section as Exclude<DesktopSection,"overview">}/>;
}

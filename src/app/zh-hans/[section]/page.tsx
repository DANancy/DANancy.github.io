import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { DesktopPortfolio } from '@/components/desktop/DesktopPortfolio'
import type { DesktopSection } from '@/data/desktop'
import '@/components/desktop/desktop.css'

const sections={
  about:{title:'关于我',description:'了解蔡阳阳在可再生能源、数据工程与实用 AI 领域的经历。'},
  work:{title:'作品',description:'探索蔡阳阳的数据工程、AI、导师辅导、电商与协作技术项目。'},
  business:{title:'独立业务与合作创业',description:'了解蔡阳阳独立开展的导师辅导、AI 数据工程训练营与实用 AI 服务，以及与伙伴共同建设的商业项目。'},
  community:{title:'社区',description:'了解蔡阳阳参与 Make AI Practical、AI 工作坊、导师辅导与知识分享的经历。'},
  fun:{title:'兴趣时光',description:'书籍、动画、陶艺、游戏与活动，共同构成蔡阳阳的快乐天地。'},
  links:{title:'联系、朋友与链接',description:'联系蔡阳阳，并探索朋友们的创作，以及相关社区、项目和实用链接。'},
} as const

type SectionSlug=keyof typeof sections

export const dynamicParams=false

export function generateStaticParams(){
  return Object.keys(sections).map(section=>({section}))
}

export async function generateMetadata({params}:{params:Promise<{section:string}>}):Promise<Metadata>{
  const {section}=await params
  if(!(section in sections))return {}
  const page=sections[section as SectionSlug]
  return {
    title:page.title,
    description:page.description,
    alternates:{
      canonical:'/zh-hans/'+section+'/',
      languages:{en:'/'+section+'/', 'zh-Hans':'/zh-hans/'+section+'/', 'x-default':'/'+section+'/'},
    },
    openGraph:{title:page.title+' | 蔡阳阳',description:page.description,url:'/zh-hans/'+section+'/',type:'website',images:[{url:'/assets/community-event.webp',width:1200,height:630,alt:'蔡阳阳：数据、AI 与社区'}]},
    twitter:{card:'summary_large_image',title:page.title+' | 蔡阳阳',description:page.description,images:['/assets/community-event.webp']},
    other:{'content-language':'zh-CN'},
  }
}

export default async function ChineseSectionPage({params}:{params:Promise<{section:string}>}){
  const {section}=await params
  if(!(section in sections))notFound()
  const page=sections[section as SectionSlug]
  const graph:Record<string,unknown>[]=[
    {'@type':'WebPage','@id':'https://yangyangcai.me/zh-hans/'+section+'/#webpage',url:'https://yangyangcai.me/zh-hans/'+section+'/',name:page.title,description:page.description,inLanguage:'zh-Hans',isPartOf:{'@id':'https://yangyangcai.me/#website'},about:{'@id':'https://yangyangcai.me/#person'}},
    {'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'首页',item:'https://yangyangcai.me/zh-hans/'},{'@type':'ListItem',position:2,name:page.title,item:'https://yangyangcai.me/zh-hans/'+section+'/'}]},
  ]
  if(section==='business')graph.push({'@type':'FAQPage',mainEntity:[
    {'@type':'Question',name:'实用 AI 工作坊适合谁？',acceptedAnswer:{'@type':'Answer',text:'适合希望通过引导式实践，把日常信息或想法转化为可用解决方案的职场人士与学习者。'}},
    {'@type':'Question',name:'参与者会构建什么？',acceptedAnswer:{'@type':'Answer',text:'成果会因活动主题而异。现有工作坊主要围绕实用 AI 工作流与个人知识智能体，并强调活动结束后仍能继续使用。'}},
    {'@type':'Question',name:'AI 数据工程训练营涵盖哪些内容？',acceptedAnswer:{'@type':'Answer',text:'这套 12 节训练营使用公开数据集，探索端到端数据工程生命周期、可靠交付、Databricks AI、Power BI MCP 与实用 AI 支持。'}},
  ]})
  const jsonLd={
    '@context':'https://schema.org',
    '@graph':graph,
  }
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd).replace(/</g,'\\u003c')}}/><DesktopPortfolio initialSection={section as Exclude<DesktopSection,'overview'>}/></>
}

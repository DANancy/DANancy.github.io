import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { DesktopPortfolio } from '@/components/desktop/DesktopPortfolio'
import type { DesktopSection } from '@/data/desktop'
import '@/components/desktop/desktop.css'

const sections={
  about:{title:'关于我',description:'了解蔡阳阳在可再生能源、数据工程与实用 AI 领域的经历。'},
  work:{title:'作品',description:'探索蔡阳阳的数据工程、AI、导师辅导、电商与协作技术项目。'},
  community:{title:'社区',description:'了解蔡阳阳参与 Make AI Practical、AI 工作坊、导师辅导与知识分享的经历。'},
  fun:{title:'兴趣时光',description:'书籍、动画、陶艺、游戏与活动，共同构成蔡阳阳的快乐天地。'},
  links:{title:'朋友与链接',description:'探索朋友们的创作，以及与蔡阳阳工作相关的社区、项目和实用链接。'},
  contact:{title:'联系我',description:'通过 LinkedIn、GitHub 或电子邮件联系蔡阳阳。'},
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
      languages:{en:'/'+section+'/', 'zh-Hans':'/zh-hans/'+section+'/'},
    },
    openGraph:{title:page.title+' | 蔡阳阳',description:page.description,url:'/zh-hans/'+section+'/',type:'website'},
  }
}

export default async function ChineseSectionPage({params}:{params:Promise<{section:string}>}){
  const {section}=await params
  if(!(section in sections))notFound()
  return <DesktopPortfolio initialSection={section as Exclude<DesktopSection,'overview'>}/>
}

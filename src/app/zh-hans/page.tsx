import type { Metadata } from 'next'
import { DesktopPortfolio } from '@/components/desktop/DesktopPortfolio'
import '@/components/desktop/desktop.css'

export const metadata:Metadata={
  title:'蔡阳阳 | 让 AI 真正实用',
  description:'探索蔡阳阳在数据工程、实用 AI、社区共建与创意项目方面的作品。',
  alternates:{
    canonical:'/zh-hans/',
    languages:{en:'/', 'zh-Hans':'/zh-hans/', 'x-default':'/'},
  },
  openGraph:{title:'蔡阳阳 | 数据、AI 与社区',url:'/zh-hans/',images:[{url:'/assets/community-event.webp',width:1200,height:630,alt:'蔡阳阳：数据、AI 与社区'}]},
  twitter:{card:'summary_large_image',title:'蔡阳阳 | 高级数据工程师与实用 AI 实践者',description:'了解蔡阳阳在可再生能源、云数据平台、Databricks 与实用 AI 方面的工作。',images:['/assets/community-event.webp']},
  other:{'content-language':'zh-CN'},
}

export default function ChineseHomePage(){
  return <DesktopPortfolio initialSection='overview'/>
}

import type { Metadata } from 'next'
import { DesktopPortfolio } from '@/components/desktop/DesktopPortfolio'
import '@/components/desktop/desktop.css'

export const metadata:Metadata={
  title:'蔡阳阳 | 让 AI 真正实用',
  description:'探索蔡阳阳在数据工程、实用 AI、社区共建与创意项目方面的作品。',
  alternates:{
    canonical:'/zh-hans/',
    languages:{en:'/', 'zh-Hans':'/zh-hans/'},
  },
  openGraph:{title:'蔡阳阳 | 数据、AI 与社区',url:'/zh-hans/'},
}

export default function ChineseHomePage(){
  return <DesktopPortfolio initialSection='overview'/>
}

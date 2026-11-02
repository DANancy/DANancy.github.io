import type { Metadata } from 'next'
import { DesktopPortfolio } from '@/components/desktop/DesktopPortfolio'
import '@/components/desktop/desktop.css'
import { personJsonLd } from '@/lib/person'
import { defaultOgImage } from '@/lib/og'

export const metadata:Metadata={
  title:{absolute:'蔡阳阳 | 让 AI 真正实用'},
  description:'探索蔡阳阳在数据工程、实用 AI、社区共建与创意项目方面的作品。',
  alternates:{
    canonical:'/zh-hans/',
    languages:{en:'/', 'zh-Hans':'/zh-hans/', 'x-default':'/'},
  },
  openGraph:{title:'蔡阳阳 | 数据、AI 与社区',url:'/zh-hans/',type:'profile',locale:'zh_CN',images:[defaultOgImage]},
  twitter:{card:'summary_large_image',title:'蔡阳阳 | 高级数据工程师与实用 AI 实践者',description:'了解蔡阳阳在可再生能源、云数据平台、Databricks 与实用 AI 方面的工作。',images:[defaultOgImage.url]},
}

const profileJsonLd={
  '@context':'https://schema.org',
  '@graph':[{
    '@type':'ProfilePage',
    '@id':'https://yangyangcai.me/zh-hans/#profile',
    url:'https://yangyangcai.me/zh-hans/',
    name:'蔡阳阳 | 高级数据工程师与实用 AI 实践者',
    inLanguage:'zh-Hans',
    isPartOf:{'@id':'https://yangyangcai.me/#website'},
    mainEntity:{'@id':'https://yangyangcai.me/#person'},
  },personJsonLd],
}

export default function ChineseHomePage(){
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(profileJsonLd).replace(/</g,'\\u003c')}}/>
    <DesktopPortfolio initialSection='overview'/>
  </>
}

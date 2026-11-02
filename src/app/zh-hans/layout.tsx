import type { Metadata } from 'next'

export const metadata:Metadata={
  title:{template:'%s | 蔡阳阳',default:'蔡阳阳 | 让 AI 真正实用'},
  openGraph:{locale:'zh_CN',alternateLocale:['en_AU']},
}

export default function ChineseLayout({children}:{children:React.ReactNode}){
  return <div lang="zh-Hans">{children}</div>;
}

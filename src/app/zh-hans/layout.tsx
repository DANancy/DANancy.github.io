import Script from "next/script";

export default function ChineseLayout({children}:{children:React.ReactNode}){
  return <><Script id="set-chinese-document-language" strategy="beforeInteractive">{`document.documentElement.lang="zh-CN";`}</Script>{children}</>;
}

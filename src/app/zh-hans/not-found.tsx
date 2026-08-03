import Link from "next/link";
import "@/components/desktop/desktop.css";

export default function ChineseNotFound(){
  return <main className="desktop-shell grid place-items-center"><section className="desktop-window max-w-2xl text-center"><header className="window-bar"><div className="traffic"><i/><i/><i/></div><b>not_found.log</b><span/></header><div className="window-page"><p className="page-pill">404</p><h1 className="not-found-title mt-6 text-5xl">这个窗口不见了。</h1><p className="page-lead mx-auto">返回首页，选择另一个文件。</p><Link className="solid-button mt-8" href="/zh-hans/">打开首页</Link></div></section></main>;
}

import { DesktopPortfolio } from "@/components/desktop/DesktopPortfolio";
import "@/components/desktop/desktop.css";

export const metadata = {
  alternates:{canonical:"/"},
  openGraph:{title:"Yangyang Cai | Data, AI and community",url:"/"},
};

export default function HomePage(){
  return <DesktopPortfolio initialSection="overview"/>;
}

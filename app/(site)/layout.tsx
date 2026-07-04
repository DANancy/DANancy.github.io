import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main className="flex-1 mx-auto w-full max-w-[1440px] px-6">{children}</main>
      <Footer />
    </>
  );
}

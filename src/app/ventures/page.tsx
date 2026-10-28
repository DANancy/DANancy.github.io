import type { Metadata } from "next";
import { CanonicalRedirect } from "@/components/CanonicalRedirect";

export const metadata: Metadata = {
  title: "Business",
  alternates: { canonical: "/business/" },
  robots: { index: false, follow: true },
};

export default function VenturesCompatibilityPage() {
  return <CanonicalRedirect href="/business/" label="Continue to Business" />;
}

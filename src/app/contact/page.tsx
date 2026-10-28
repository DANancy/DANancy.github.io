import type { Metadata } from "next";
import { CanonicalRedirect } from "@/components/CanonicalRedirect";

export const metadata: Metadata = {
  title: "Contact Yangyang Cai",
  description: "Connect with Yangyang Cai through LinkedIn, GitHub, or email.",
  alternates: { canonical: "/links/" },
  robots: { index: false, follow: true },
};

export default function ContactCompatibilityPage() {
  return <CanonicalRedirect href="/links/" label="Continue to Contact, Friends & Links" />;
}

import type { Metadata } from "next";
import { Fraunces, Fredoka, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "600"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jbMono = JetBrains_Mono({
  variable: "--font-jbmono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yangyangcai.me"),
  title: {
    default: "Yangyang Cai | Senior Data Engineer & Practical AI Builder in Melbourne",
    template: "%s | Yangyang Cai",
  },
  description:
    "Yangyang Cai is a Melbourne Senior Data Engineer working across renewable energy, Databricks, data platforms and practical AI. Explore her projects, workshops and community work.",
  applicationName: "Yangyang Cai Portfolio",
  authors: [{ name: "Yangyang Cai", url: "https://yangyangcai.me" }],
  creator: "Yangyang Cai",
  publisher: "Yangyang Cai",
  category: "technology",
  keywords: [
    "Yangyang Cai",
    "Nancy Cai",
    "Senior Data Engineer Melbourne",
    "Data Engineering",
    "Databricks",
    "Renewable Energy Data",
    "Practical AI",
    "Make AI Practical",
  ],
  alternates: {
    canonical: "/",
    languages: { en: "/", "zh-Hans": "/zh-hans/", "x-default": "/" },
  },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: "Yangyang Cai",
    title: "Yangyang Cai | Senior Data Engineer & Practical AI Builder",
    description:
      "Melbourne Senior Data Engineer working across renewable energy, data platforms, Databricks and practical AI.",
    locale: "en_AU",
    alternateLocale: ["zh_CN"],
    images: [{ url: "/assets/community-event.webp", width: 1200, height: 630, alt: "Yangyang Cai — data, AI and community" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yangyang Cai | Senior Data Engineer & Practical AI Builder",
    description: "Data engineering, renewable energy, Databricks and practical AI in Melbourne.",
    images: ["/assets/community-event.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${fredoka.variable} ${inter.variable} ${jbMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-void text-text-primary">{children}<GoogleAnalytics/></body>
    </html>
  );
}

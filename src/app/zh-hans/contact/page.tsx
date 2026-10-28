import type { Metadata } from "next";
import { CanonicalRedirect } from "@/components/CanonicalRedirect";

export const metadata: Metadata = {
  title: "联系蔡阳阳",
  description: "通过 LinkedIn、GitHub 或电子邮件联系蔡阳阳。",
  alternates: { canonical: "/zh-hans/links/" },
  robots: { index: false, follow: true },
  other: { "content-language": "zh-CN" },
};

export default function ChineseContactCompatibilityPage() {
  return <CanonicalRedirect href="/zh-hans/links/" label="前往联系、朋友与链接" />;
}

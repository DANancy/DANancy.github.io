import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { GlassCard } from "@/components/ui/GlassCard";
import { Terminal, Briefcase, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch — email, LinkedIn, or GitHub.",
};

const channels = [
  { label: "Email", value: "hello@yangyangcai.me", href: "mailto:hello@yangyangcai.me", icon: Mail },
  { label: "LinkedIn", value: "linkedin.com/in/yangyangcai", href: "https://www.linkedin.com/in/yangyangcai", icon: Briefcase },
  { label: "GitHub", value: "github.com/DANancy", href: "https://github.com/DANancy", icon: Terminal },
];

export default function ContactPage() {
  return (
    <div className="pb-24">
      <PageHero
        eyebrow="Contact"
        title="Let's talk"
        lede="Happy to hear about interesting problems, data platform questions, or a good coffee recommendation."
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {channels.map((c) => (
          <GlassCard key={c.label} href={c.href} className="flex flex-col items-start gap-4">
            <c.icon size={22} className="text-signal-text" />
            <div>
              <div className="text-heading-sm text-text-primary">{c.label}</div>
              <div className="text-body-sm text-text-muted mt-1 break-all">{c.value}</div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

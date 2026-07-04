import Link from "next/link";
import { Terminal, Briefcase, Mail } from "lucide-react";
import { currently } from "@/content/currently";

export function Footer() {
  return (
    <footer className="border-t border-[var(--glass-border)] mt-24">
      <div className="mx-auto max-w-[1440px] px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="text-display-md text-text-primary">Yangyang Cai</div>
          <p className="text-body-sm text-text-secondary mt-3 max-w-[28ch]">
            Make AI practical. Senior Data Engineer in Melbourne, building platforms and
            sharing what I learn.
          </p>
        </div>

        <div>
          <div className="text-caption text-text-muted mb-4">Sitemap</div>
          <ul className="flex flex-col gap-2 text-body-sm text-text-secondary">
            <li><Link href="/technology" className="hover:text-text-primary transition-colors">Technology</Link></li>
            <li><Link href="/projects" className="hover:text-text-primary transition-colors">Projects</Link></li>
            <li><Link href="/garden" className="hover:text-text-primary transition-colors">Garden</Link></li>
            <li><Link href="/about" className="hover:text-text-primary transition-colors">About</Link></li>
            <li><Link href="/contact" className="hover:text-text-primary transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-caption text-text-muted mb-4">Elsewhere</div>
          <ul className="flex flex-col gap-3 text-body-sm text-text-secondary">
            <li>
              <a href="https://github.com" className="flex items-center gap-2 hover:text-text-primary transition-colors">
                <Terminal size={16} /> GitHub
              </a>
            </li>
            <li>
              <a href="https://linkedin.com" className="flex items-center gap-2 hover:text-text-primary transition-colors">
                <Briefcase size={16} /> LinkedIn
              </a>
            </li>
            <li>
              <a href="mailto:hello@yangyangcai.me" className="flex items-center gap-2 hover:text-text-primary transition-colors">
                <Mail size={16} /> Email
              </a>
            </li>
          </ul>
        </div>

        <div>
          <div className="text-caption text-text-muted mb-4">Currently</div>
          <ul className="flex flex-col gap-2 text-body-sm text-text-secondary">
            <li><span className="text-text-muted">Reading — </span>{currently.reading}</li>
            <li><span className="text-text-muted">Playing — </span>{currently.playing}</li>
            <li><span className="text-text-muted">Building — </span>{currently.building}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--glass-border)]">
        <div className="mx-auto max-w-[1440px] px-6 py-6 text-caption text-text-muted normal-case tracking-normal font-normal">
          © 2026 Yangyang Cai · Built with Next.js, deployed on GitHub Pages
        </div>
      </div>
    </footer>
  );
}

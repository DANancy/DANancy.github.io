"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  n: number;
  label: string;
}

export function ProjectToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );
    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  return (
    <>
      {/* Mobile/tablet: collapsible disclosure */}
      <details className="lg:hidden glass p-4 mb-8">
        <summary className="text-body-sm font-semibold text-text-primary cursor-pointer">On this page</summary>
        <ul className="flex flex-col gap-2 mt-3">
          {items.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className="text-body-sm text-text-secondary hover:text-text-primary">
                {item.n}. {item.label}
              </a>
            </li>
          ))}
        </ul>
      </details>

      {/* Desktop: sticky right rail */}
      <nav className="hidden lg:block sticky top-24 self-start">
        <div className="text-caption text-text-muted mb-3">On this page</div>
        <ul className="flex flex-col gap-2 border-l border-[var(--glass-border)] pl-4">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={cn(
                  "block text-body-sm transition-colors",
                  active === item.id ? "text-signal-text font-semibold" : "text-text-muted hover:text-text-secondary"
                )}
              >
                {item.n}. {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

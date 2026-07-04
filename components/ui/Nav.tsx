"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "/technology", label: "Technology" },
  { href: "/projects", label: "Projects" },
  { href: "/garden", label: "Garden" },
  { href: "/about", label: "About" },
];

export function Nav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--glass-border)] bg-void/70 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="flex h-9 w-9 items-center justify-center rounded-full glass text-display-md text-signal-text italic">
            YC
          </span>
          <span className="hidden sm:inline text-body-sm text-text-secondary group-hover:text-text-primary transition-colors">
            Universe
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 relative">
          {LINKS.map((link) => {
            const active = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-body-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
              >
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-2 -bottom-[1px] h-[2px] rounded-full bg-signal"
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
                <span className={active ? "text-text-primary" : undefined}>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/contact"
            className="rounded-button bg-signal px-5 py-2.5 text-body-sm font-semibold text-void hover:brightness-110 transition"
          >
            Contact
          </Link>
        </div>

        <button
          className="md:hidden flex h-10 w-10 items-center justify-center rounded-full glass"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden fixed inset-x-0 top-[72px] bottom-0 bg-void/95 backdrop-blur-xl flex flex-col p-8 gap-6"
          >
            {[...LINKS, { href: "/contact", label: "Contact" }].map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.3 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-display-md"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

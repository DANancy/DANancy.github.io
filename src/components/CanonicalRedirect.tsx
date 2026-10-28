"use client";

import Link from "next/link";
import { useEffect } from "react";

export function CanonicalRedirect({ href, label }: { href: string; label: string }) {
  useEffect(() => {
    window.location.replace(href);
  }, [href]);

  return (
    <main style={{ minHeight: "70vh", display: "grid", placeItems: "center", padding: "2rem", textAlign: "center" }}>
      <div>
        <p>This page has moved.</p>
        <Link href={href}>{label}</Link>
      </div>
    </main>
  );
}

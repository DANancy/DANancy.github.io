"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Starfield } from "@/components/graph/Starfield";

export default function NotFound() {
  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-void flex items-center justify-center">
      <Starfield />

      <motion.span
        aria-hidden="true"
        className="absolute h-9 w-9 rounded-full"
        style={{
          left: "50%",
          top: "38%",
          transform: "translate(-50%, -50%)",
          background: "var(--color-clay-soft, rgba(224,137,91,0.12))",
          border: "1px solid var(--color-clay)",
        }}
        animate={{ y: [0, -10, 0], x: [0, 6, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 text-center max-w-[520px] px-6 pt-24">
        <h1 className="text-display-md text-text-primary">This node drifted off the map.</h1>
        <p className="text-body-md text-text-secondary mt-4">
          Whatever you were looking for isn&apos;t here — but the universe is.
        </p>
        <div className="flex items-center justify-center gap-4 mt-8">
          <Link
            href="/"
            className="rounded-button bg-signal px-6 py-3 text-body-md font-semibold text-void hover:brightness-110 transition"
          >
            Return to the universe →
          </Link>
          <Link
            href="/projects"
            className="text-body-md font-semibold text-signal-text hover:underline underline-offset-4"
          >
            Browse projects
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GraphCanvas } from "@/components/graph/GraphCanvas";
import { Starfield } from "@/components/graph/Starfield";
import { BootLog } from "@/components/graph/BootLog";
import { isVisited, setVisited } from "@/lib/discovery";
import { TOTAL_DISCOVERABLE } from "@/content/graph";

type Phase = "skeleton" | "boot" | "universe";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("skeleton");
  const [ready, setReady] = useState(false);
  const [discoveredCount, setDiscoveredCount] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isVisited() || reduced) {
      setPhase("universe");
    } else {
      setPhase("boot");
    }
  }, []);

  useEffect(() => {
    if (phase !== "universe") return;
    const timer = setTimeout(() => setReady(true), 12000);
    return () => clearTimeout(timer);
  }, [phase]);

  function finishBoot() {
    setVisited();
    setPhase("universe");
  }

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-void">
      <a
        href="#skip-target"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:glass focus:px-4 focus:py-2 focus:text-body-sm"
      >
        Skip graph, go to site
      </a>
      <h1 className="sr-only">Yangyang Cai — Senior Data Engineer, Melbourne</h1>

      {/* Pre-hydration skeleton: pure CSS core glow, no motion */}
      {phase === "skeleton" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="h-24 w-24 rounded-full opacity-90"
            style={{ backgroundImage: "var(--gradient-bridge)", boxShadow: "0 0 50px 6px rgba(155,107,255,0.35)" }}
          />
        </div>
      )}

      {phase === "boot" && <BootLog onDone={finishBoot} />}

      {phase === "universe" && (
        <>
          <Starfield />
          <div className="absolute inset-0">
            <GraphCanvas
              onDiscoveredChange={(count) => {
                setDiscoveredCount(count);
                if (count >= 2) setReady(true);
              }}
            />
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
            <Link
              href="/technology"
              id="skip-target"
              className="glass flex items-center gap-2 px-6 py-3 text-body-sm font-semibold text-text-primary hover:glass-elevated transition-all"
            >
              {ready ? (
                <>
                  Enter Site <span aria-hidden="true">→</span>
                </>
              ) : (
                <>
                  Explore <span aria-hidden="true" className="animate-bounce">↓</span>
                  {discoveredCount > 0 && (
                    <span className="sm:hidden text-mono-md text-text-muted">
                      · {discoveredCount}/{TOTAL_DISCOVERABLE}
                    </span>
                  )}
                </>
              )}
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

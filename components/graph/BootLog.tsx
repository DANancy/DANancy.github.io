"use client";

import { useEffect, useRef, useState } from "react";

const LINES = [
  { text: "$ run yangyang.universe", tail: 0 },
  { text: "ingesting 10+ years of experience ......... ok", tail: 2 },
  { text: "transforming: bronze → silver → gold ...... ok", tail: 2 },
  { text: "modelling identity: 7 facets, 10 interests  ok", tail: 2 },
  { text: "spawning 17 nodes ......................... done", tail: 4 },
  { text: "deploying universe ▓▓▓▓▓▓▓▓▓▓ 100%", tail: 0, final: true },
];

// The design spec's stated "~24ms/char" and "~1.4s total" are mutually
// inconsistent for this copy (~250 chars works out to ~6.7s at 24ms/char).
// Tuned down to hit the intended snappy, skippable loading-screen feel.
const CHAR_MS = 8;
const LINE_PAUSE_MS = 80;

export function BootLog({ onDone }: { onDone: () => void }) {
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [dissolving, setDissolving] = useState(false);
  const doneRef = useRef(false);

  useEffect(() => {
    if (lineIdx >= LINES.length) {
      if (!doneRef.current) {
        doneRef.current = true;
        setDissolving(true);
        const t = setTimeout(onDone, 200);
        return () => clearTimeout(t);
      }
      return;
    }
    const line = LINES[lineIdx].text;
    if (charIdx < line.length) {
      const t = setTimeout(() => setCharIdx((c) => c + 1), CHAR_MS);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setLineIdx((i) => i + 1);
      setCharIdx(0);
    }, LINE_PAUSE_MS);
    return () => clearTimeout(t);
  }, [lineIdx, charIdx, onDone]);

  function skip() {
    if (doneRef.current) return;
    doneRef.current = true;
    onDone();
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-void flex items-center justify-center px-6 cursor-pointer"
      style={{ opacity: dissolving ? 0 : 1, transition: "opacity 200ms" }}
      onClick={skip}
      onKeyDown={skip}
      tabIndex={0}
      role="button"
      aria-label="Skip intro"
    >
      <pre className="text-mono-md text-text-secondary whitespace-pre-wrap max-w-[560px] w-full">
        {LINES.slice(0, lineIdx).map((l, i) => (
          <div key={i} className={l.final ? "text-signal-text" : undefined}>
            {l.tail > 0 ? (
              <>
                {l.text.slice(0, -l.tail)}
                <span className="text-success">{l.text.slice(-l.tail)}</span>
              </>
            ) : (
              l.text
            )}
          </div>
        ))}
        {lineIdx < LINES.length && (
          <div className={LINES[lineIdx].final ? "text-signal-text" : undefined}>
            {LINES[lineIdx].text.slice(0, charIdx)}
            <span className="animate-pulse">▍</span>
          </div>
        )}
      </pre>
    </div>
  );
}

"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Compass, Menu, RotateCcw } from "lucide-react";
import type { WorldLandmark } from "@/content/world";
import { ContentPanel } from "./ContentPanel";
import { SimplePortfolio } from "./SimplePortfolio";
import { WorldScene } from "./WorldScene";

type Mode = "intro" | "explore" | "simple";
export function MagicalWorld() {
  const [mode, setMode] = useState<Mode>("intro");
  const [selected, setSelected] = useState<WorldLandmark | null>(null);
  useEffect(() => { if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setMode("simple"); }, []);
  const closePanel = useCallback(() => setSelected(null), []);
  if (mode === "simple") return <SimplePortfolio onExplore={() => setMode("explore")} />;
  return <main className="magical-world" id="main-content">
    <a className="world-skip-link" href="#world-controls">Skip to controls</a>
    <WorldScene onSelect={setSelected} />
    <header className="world-header"><Link href="/" className="world-brand"><span>YC</span><b>Fly Through My World</b></Link><button onClick={() => setMode("simple")} className="world-secondary-button"><Menu size={16}/> Simple portfolio</button></header>
    <aside className="world-hud" id="world-controls"><p><Compass size={15}/> Explore the island</p><span><kbd>WASD</kbd> / arrows to fly · <kbd>E</kbd> interact</span><button onClick={() => window.location.reload()} aria-label="Reset world"><RotateCcw size={14}/> Reset</button></aside>
    {mode === "intro" && <section className="world-intro" aria-labelledby="intro-title"><button className="intro-skip" onClick={() => setMode("explore")}>Skip intro</button><div className="intro-sprite" aria-hidden><i/><i/><i/></div><p className="world-eyebrow">Yangyang Cai</p><h1 id="intro-title">Fly Through My World</h1><p className="intro-subtitle">Data · AI · Energy · Creativity</p><p>AI-Powered Data Engineer<br/>Board Member at Make AI Practical</p><div><button className="world-primary-button" onClick={() => setMode("explore")}>Start exploring</button><button className="world-secondary-button" onClick={() => setMode("simple")}>View simple portfolio</button></div></section>}
    {selected && <ContentPanel landmark={selected} onClose={closePanel} />}
  </main>;
}

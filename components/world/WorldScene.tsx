"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { worldLandmarks, zones, type WorldLandmark } from "@/content/world";

type Point = { x: number; y: number };
const START = { x: 12, y: 69 };

export function WorldScene({ onSelect }: { onSelect: (landmark: WorldLandmark) => void }) {
  const [position, setPosition] = useState<Point>(START);
  const keys = useRef(new Set<string>());
  const [nearby, setNearby] = useState<WorldLandmark | null>(null);
  const [facing, setFacing] = useState(1);

  useEffect(() => {
    const down = (event: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(event.key)) event.preventDefault();
      keys.current.add(event.key.toLowerCase());
      if (event.key.toLowerCase() === "e" && nearby) onSelect(nearby);
    };
    const up = (event: KeyboardEvent) => keys.current.delete(event.key.toLowerCase());
    window.addEventListener("keydown", down); window.addEventListener("keyup", up);
    let frame = 0; let previous = performance.now();
    const tick = (now: number) => {
      const dt = Math.min((now - previous) / 1000, .04); previous = now;
      let dx = 0, dy = 0;
      if (keys.current.has("a") || keys.current.has("arrowleft")) dx--;
      if (keys.current.has("d") || keys.current.has("arrowright")) dx++;
      if (keys.current.has("w") || keys.current.has("arrowup") || keys.current.has(" ")) dy--;
      if (keys.current.has("s") || keys.current.has("arrowdown") || keys.current.has("shift")) dy++;
      if (dx || dy) {
        const length = Math.hypot(dx, dy); dx /= length; dy /= length;
        if (dx) setFacing(dx > 0 ? 1 : -1);
        setPosition(p => ({ x: Math.max(5, Math.min(95, p.x + dx * 20 * dt)), y: Math.max(17, Math.min(82, p.y + dy * 20 * dt)) }));
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("keydown", down); window.removeEventListener("keyup", up); };
  }, [nearby, onSelect]);

  useEffect(() => {
    const closest = worldLandmarks.map(l => ({ l, d: Math.hypot(l.x - position.x, l.y - position.y) })).sort((a,b) => a.d-b.d)[0];
    setNearby(closest.d < 9 ? closest.l : null);
  }, [position]);
  const nudge = useCallback((dx: number, dy: number) => setPosition(p => ({ x: Math.max(5, Math.min(95, p.x + dx)), y: Math.max(17, Math.min(82, p.y + dy)) })), []);

  return <div className="world-viewport" aria-label="Interactive magical portfolio world">
    <div className="world-sky" aria-hidden><i /><i /><i /><i /><i /></div>
    <div className="floating-island">
      <div className="island-top" />
      <div className="zone zone-forest"><b>{zones.forest.title}</b><small>{zones.forest.subtitle}</small><div className="trees" aria-hidden>♠ ♠ ♠</div></div>
      <div className="zone zone-ruins"><b>{zones.ruins.title}</b><small>{zones.ruins.subtitle}</small><div className="ruin-columns" aria-hidden>▥ ◫ ▥</div></div>
      <div className="zone zone-village"><b>{zones.village.title}</b><small>{zones.village.subtitle}</small><div className="village-roofs" aria-hidden>⌂ ⌂ ⌂</div></div>
      <div className="light-path path-one" /><div className="light-path path-two" />
      {worldLandmarks.map(landmark => <button key={landmark.id} className={`world-landmark ${nearby?.id === landmark.id ? "is-near" : ""}`} style={{ left: `${landmark.x}%`, top: `${landmark.y}%` }} onClick={() => onSelect(landmark)} aria-label={`Explore ${landmark.title}`}><span>{landmark.symbol}</span><b>{landmark.title}</b></button>)}
      <div className={`knowledge-sprite ${nearby ? "is-near" : ""}`} style={{ left: `${position.x}%`, top: `${position.y}%`, transform: `translate(-50%,-50%) scaleX(${facing})` }} aria-label="Flying knowledge sprite"><i className="wing left"/><i className="sprite-core"/><i className="wing right"/><i className="sprite-trail"/></div>
    </div>
    {nearby && <button className="interaction-prompt" onClick={() => onSelect(nearby)}><kbd>E</kbd> Explore {nearby.title}</button>}
    <div className="mobile-flight-controls" aria-label="Flight controls"><button onClick={() => nudge(0,-5)} aria-label="Fly up">↑</button><button onClick={() => nudge(-5,0)} aria-label="Fly left">←</button><button onClick={() => nudge(0,5)} aria-label="Fly down">↓</button><button onClick={() => nudge(5,0)} aria-label="Fly right">→</button></div>
  </div>;
}

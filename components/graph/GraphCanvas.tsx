"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Database,
  Sparkles,
  Users,
  GraduationCap,
  Hammer,
  BookOpen,
  Compass,
  ArrowRight,
} from "lucide-react";
import { computeGraphLayout, CANVAS_W, CANVAS_H, nodeRadius, LaidOutNode } from "@/lib/graphLayout";
import { edges, nodes as allNodes, TOTAL_DISCOVERABLE } from "@/content/graph";
import {
  getDiscovered,
  saveDiscovered,
  isComplete,
  setComplete as persistComplete,
  clearAll,
} from "@/lib/discovery";

const FACET_ICONS: Record<string, typeof Database> = {
  "facet-data-engineer": Database,
  "facet-ai-engineer": Sparkles,
  "facet-community-builder": Users,
  "facet-ai-educator": GraduationCap,
  "facet-builder": Hammer,
  "facet-lifelong-learner": BookOpen,
  "facet-technology-explorer": Compass,
};

const FACET_TOTAL = allNodes.filter((n) => n.type === "facet").length;
const LIFE_TOTAL = allNodes.filter((n) => n.type === "life").length;

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const listener = () => setReduced(mq.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);
  return reduced;
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

interface Toast {
  id: number;
  text: string;
}

export function GraphCanvas({ onDiscoveredChange }: { onDiscoveredChange?: (count: number) => void }) {
  const layout = useMemo(() => computeGraphLayout(), []);
  const core = useMemo(() => layout.find((n) => n.type === "core")!, [layout]);
  const reducedMotion = useReducedMotion();

  const [selected, setSelected] = useState<LaidOutNode | null>(null);
  const [discovered, setDiscovered] = useState<Set<string>>(new Set());
  const [complete, setCompleteState] = useState(false);
  const [entrancePhase, setEntrancePhase] = useState<"burst" | "idle">("idle");
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [showContinue, setShowContinue] = useState(false);
  const [justCompleted, setJustCompleted] = useState(false);
  const [confirmingNewGame, setConfirmingNewGame] = useState(false);
  const toastIdRef = useRef(0);

  const [view, setView] = useState({ x: 0, y: 0, scale: 1 });
  const dragState = useRef<{ dragging: boolean; startX: number; startY: number; viewX: number; viewY: number }>({
    dragging: false,
    startX: 0,
    startY: 0,
    viewX: 0,
    viewY: 0,
  });
  const [pointerCanvas, setPointerCanvas] = useState<{ x: number; y: number } | null>(null);
  const rafPending = useRef(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  // Initial load: restore state, decide entrance choreography, show Continue banner.
  useEffect(() => {
    const stored = getDiscovered();
    setDiscovered(stored);
    setCompleteState(isComplete() || stored.size >= TOTAL_DISCOVERABLE);
    onDiscoveredChange?.(stored.size);

    if (reducedMotion) {
      setEntrancePhase("idle");
    } else {
      setEntrancePhase("burst");
      const t = setTimeout(() => setEntrancePhase("idle"), 1600);
      if (stored.size > 0) {
        setShowContinue(true);
        const t2 = setTimeout(() => setShowContinue(false), 6000);
        return () => {
          clearTimeout(t);
          clearTimeout(t2);
        };
      }
      return () => clearTimeout(t);
    }
    if (stored.size > 0) {
      setShowContinue(true);
      const t2 = setTimeout(() => setShowContinue(false), 6000);
      return () => clearTimeout(t2);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  const pushToast = useCallback((text: string) => {
    toastIdRef.current += 1;
    setToasts((prev) => [...prev, { id: toastIdRef.current, text }]);
  }, []);

  // Toast queue: show one at a time, auto-dismiss.
  useEffect(() => {
    if (toasts.length === 0) return;
    const t = setTimeout(() => {
      setToasts((prev) => prev.slice(1));
    }, 2400);
    return () => clearTimeout(t);
  }, [toasts]);

  // Note: side effects (setState on other components, localStorage writes, toasts)
  // must not live inside the setDiscovered updater — React can invoke updaters
  // during another component's render, which triggers "setState while rendering
  // a different component" errors. This reads `discovered` from the closure
  // instead (safe: only ever called from click/keydown event handlers).
  const markDiscovered = useCallback(
    (id: string) => {
      if (discovered.has(id)) return;

      const prevFacets = allNodes.filter((n) => n.type === "facet" && discovered.has(n.id)).length;
      const prevLife = allNodes.filter((n) => n.type === "life" && discovered.has(n.id)).length;
      const prevSize = discovered.size;

      const next = new Set(discovered);
      next.add(id);
      saveDiscovered(next);
      setDiscovered(next);
      onDiscoveredChange?.(next.size);

      const nextFacets = allNodes.filter((n) => n.type === "facet" && next.has(n.id)).length;
      const nextLife = allNodes.filter((n) => n.type === "life" && next.has(n.id)).length;

      if (prevSize === 0) pushToast("✦ Discovery started");
      if (nextFacets === FACET_TOTAL && prevFacets < FACET_TOTAL) pushToast("✦ Region discovered: The Work");
      if (nextLife === LIFE_TOTAL && prevLife < LIFE_TOTAL) pushToast("✦ Region discovered: The Life");
      if (next.size >= TOTAL_DISCOVERABLE && prevSize < TOTAL_DISCOVERABLE) {
        pushToast("◆ Universe complete — something new appeared at the edge");
        persistComplete();
        setCompleteState(true);
        setJustCompleted(true);
        setTimeout(() => setJustCompleted(false), 600);
      }
    },
    [discovered, onDiscoveredChange, pushToast]
  );

  function startNewGame() {
    clearAll();
    setConfirmingNewGame(false);
    window.location.reload();
  }

  const onPointerDown = (e: React.PointerEvent) => {
    dragState.current = {
      dragging: true,
      startX: e.clientX,
      startY: e.clientY,
      viewX: view.x,
      viewY: view.y,
    };
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragState.current.dragging) {
      const dx = e.clientX - dragState.current.startX;
      const dy = e.clientY - dragState.current.startY;
      setView((v) => ({
        ...v,
        x: clamp(dragState.current.viewX + dx, -260, 260),
        y: clamp(dragState.current.viewY + dy, -200, 200),
      }));
    }

    if (e.pointerType === "mouse" && !reducedMotion && !rafPending.current) {
      rafPending.current = true;
      const rect = wrapperRef.current?.getBoundingClientRect();
      requestAnimationFrame(() => {
        rafPending.current = false;
        if (!rect) return;
        setPointerCanvas({
          x: ((e.clientX - rect.left) / rect.width) * CANVAS_W,
          y: ((e.clientY - rect.top) / rect.height) * CANVAS_H,
        });
      });
    }
  };
  const onPointerUp = () => {
    dragState.current.dragging = false;
  };
  const onPointerLeave = () => {
    dragState.current.dragging = false;
    setPointerCanvas(null);
  };
  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setView((v) => ({ ...v, scale: clamp(v.scale - e.deltaY * 0.001, 0.7, 1.6) }));
  };

  const byId = useMemo(() => new Map(layout.map((n) => [n.id, n])), [layout]);
  const visibleLayout = useMemo(
    () => layout.filter((n) => n.type !== "hidden" || complete),
    [layout, complete]
  );

  return (
    <div className="relative w-full h-full select-none">
      {/* Screen-reader / no-JS fallback: real links to every destination */}
      <nav aria-label="Site sections" className="sr-only">
        <ul>
          {layout
            .filter((n) => n.type !== "core" && n.type !== "hidden")
            .map((n) => (
              <li key={n.id}>
                <a href={n.href}>{n.label}</a>
              </li>
            ))}
        </ul>
      </nav>

      {/* Milestone toasts */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none" aria-live="polite">
        <AnimatePresence>
          {toasts[0] && (
            <motion.div
              key={toasts[0].id}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="glass px-4 py-2 text-caption text-text-primary normal-case tracking-normal whitespace-nowrap"
            >
              {toasts[0].text}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Discovery counter (desktop) */}
      {discovered.size > 0 && !selected && (
        <div className="hidden sm:block absolute bottom-24 left-1/2 -translate-x-1/2 z-10 text-mono-md text-text-muted">
          {discovered.size} / {TOTAL_DISCOVERABLE} discovered
        </div>
      )}

      <div
        ref={wrapperRef}
        className="w-full h-full touch-none cursor-grab active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerLeave}
        onWheel={onWheel}
        aria-hidden="true"
      >
        <div
          className="w-full h-full"
          style={{
            transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})`,
            transition: dragState.current.dragging ? "none" : "transform 200ms var(--ease-standard, ease)",
          }}
        >
          <svg
            viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
            className="absolute inset-0 w-full h-full pointer-events-none"
          >
            {edges.map(([sourceId, targetId], i) => {
              const s = byId.get(sourceId);
              const t = byId.get(targetId);
              if (!s || !t) return null;
              const isActiveEdge =
                selected && (selected.id === sourceId || selected.id === targetId);
              return (
                <line
                  key={i}
                  x1={s.x}
                  y1={s.y}
                  x2={t.x}
                  y2={t.y}
                  stroke={isActiveEdge ? "var(--color-signal)" : "var(--glass-border)"}
                  strokeOpacity={isActiveEdge ? 0.5 : 1}
                  strokeWidth={1}
                />
              );
            })}
          </svg>

          {visibleLayout.map((n) => (
            <GraphNode
              key={n.id}
              node={n}
              core={core}
              selected={selected?.id === n.id}
              isDiscovered={discovered.has(n.id)}
              reducedMotion={reducedMotion}
              entrancePhase={entrancePhase}
              justCompleted={justCompleted && n.type === "core"}
              pointerCanvas={pointerCanvas}
              onActivate={() => {
                setSelected(n);
                markDiscovered(n.id);
              }}
            />
          ))}

          {/* Core name label + Continue/New Game */}
          <div
            className="absolute flex flex-col items-center gap-2 pointer-events-none"
            style={{
              left: `${(core.x / CANVAS_W) * 100}%`,
              top: `${(core.y / CANVAS_H) * 100}%`,
              transform: `translate(-50%, ${nodeRadius("core") + 14}px)`,
            }}
          >
            <span className="text-heading-md text-text-primary whitespace-nowrap">Yangyang Cai</span>
            <AnimatePresence>
              {showContinue && !confirmingNewGame && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-4 pointer-events-auto mt-1"
                >
                  <button
                    onClick={() => setShowContinue(false)}
                    className="text-body-sm text-text-secondary hover:text-text-primary transition-colors"
                  >
                    Continue — {discovered.size}/{TOTAL_DISCOVERABLE} discovered
                  </button>
                  <button
                    onClick={() => setConfirmingNewGame(true)}
                    className="text-body-sm text-text-muted hover:text-text-primary transition-colors"
                  >
                    New Game
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
            {confirmingNewGame && (
              <div className="glass p-4 pointer-events-auto flex flex-col items-center gap-3">
                <span className="text-body-sm text-text-secondary">Clear all progress and start over?</span>
                <div className="flex gap-3">
                  <button
                    onClick={startNewGame}
                    className="text-body-sm font-semibold text-danger hover:underline"
                  >
                    Yes, restart
                  </button>
                  <button
                    onClick={() => setConfirmingNewGame(false)}
                    className="text-body-sm text-text-muted hover:text-text-primary"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            key="scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/40 z-10"
            onClick={() => setSelected(null)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selected && (
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 bottom-8 -translate-x-1/2 w-[min(90vw,380px)] glass glass-elevated p-6 z-20"
          >
            <button
              className="absolute top-3 right-4 text-text-muted hover:text-text-primary text-xl leading-none"
              onClick={() => setSelected(null)}
              aria-label="Close"
            >
              ×
            </button>
            <div className="text-heading-sm text-text-primary pr-6">{selected.label}</div>
            <p className="text-body-sm text-text-secondary mt-2">{selected.description}</p>
            <a
              href={selected.href}
              className="inline-flex items-center gap-1.5 mt-4 text-body-sm font-semibold text-signal-text hover:gap-2.5 transition-all"
            >
              Explore <ArrowRight size={15} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function GraphNode({
  node,
  core,
  selected,
  isDiscovered,
  reducedMotion,
  entrancePhase,
  justCompleted,
  pointerCanvas,
  onActivate,
}: {
  node: LaidOutNode;
  core: LaidOutNode;
  selected: boolean;
  isDiscovered: boolean;
  reducedMotion: boolean;
  entrancePhase: "burst" | "idle";
  justCompleted: boolean;
  pointerCanvas: { x: number; y: number } | null;
  onActivate: () => void;
}) {
  const radius = nodeRadius(node.type);
  const leftPct = (node.x / CANVAS_W) * 100;
  const topPct = (node.y / CANVAS_H) * 100;
  const coreLeftPct = (core.x / CANVAS_W) * 100;
  const coreTopPct = (core.y / CANVAS_H) * 100;
  const Icon = node.type === "facet" ? FACET_ICONS[node.id] : undefined;

  const floatDelay = useMemo(() => (node.id.charCodeAt(node.id.length - 1) % 10) * 0.4, [node.id]);
  const floatDuration = useMemo(() => 8 + (node.id.length % 5) * 1.2, [node.id]);
  const burstDelay = useMemo(() => (node.id.length % 7) * 0.03, [node.id]);

  // Cursor gravity: weak repulsion from nearby pointer, clamped to 12px.
  let gravityX = 0;
  let gravityY = 0;
  if (pointerCanvas && node.type !== "core") {
    const dx = node.x - pointerCanvas.x;
    const dy = node.y - pointerCanvas.y;
    const dist = Math.hypot(dx, dy) || 1;
    const radiusOfEffect = 120;
    if (dist < radiusOfEffect) {
      const strength = ((radiusOfEffect - dist) / radiusOfEffect) * 12;
      gravityX = (dx / dist) * strength;
      gravityY = (dy / dist) * strength;
    }
  }

  const isCore = node.type === "core";
  const isHidden = node.type === "hidden";

  return (
    <motion.button
      type="button"
      onClick={onActivate}
      aria-label={`${node.label}${!isCore ? " — expand" : ""}`}
      className="group absolute flex items-center justify-center rounded-full pointer-events-auto focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
      style={{ width: radius * 2, height: radius * 2 }}
      initial={
        reducedMotion || isHidden
          ? { left: `${leftPct}%`, top: `${topPct}%`, opacity: isHidden ? 0 : 1, scale: 1, x: 0, y: 0 }
          : { left: `${coreLeftPct}%`, top: `${coreTopPct}%`, opacity: 0, scale: 0.2, x: 0, y: 0 }
      }
      animate={{
        left: `${leftPct}%`,
        top: `${topPct}%`,
        opacity: 1,
        scale: 1,
        x: gravityX,
        y: entrancePhase === "idle" && !reducedMotion && !isCore ? [gravityY, gravityY - 6, gravityY] : gravityY,
      }}
      transition={
        entrancePhase === "burst" && !reducedMotion
          ? { left: { type: "spring", stiffness: 90, damping: 14, delay: 0.4 + burstDelay }, top: { type: "spring", stiffness: 90, damping: 14, delay: 0.4 + burstDelay }, opacity: { duration: 0.3, delay: 0.4 + burstDelay }, scale: { type: "spring", stiffness: 120, damping: 12, delay: 0.4 + burstDelay } }
          : isHidden
          ? { opacity: { duration: 0.6 }, left: { duration: 0 }, top: { duration: 0 } }
          : {
              left: { duration: 0.2, ease: "easeOut" },
              top: { duration: 0.2, ease: "easeOut" },
              x: { duration: 0.2, ease: "easeOut" },
              y: { duration: floatDuration, delay: floatDelay, repeat: Infinity, ease: "easeInOut" },
            }
      }
      whileHover={{ scale: 1.12 }}
      whileFocus={{ scale: 1.12 }}
    >
      <span
        className="absolute inset-0 rounded-full"
        style={
          isCore
            ? {
                backgroundImage: "var(--gradient-bridge)",
                opacity: 0.9,
                boxShadow: justCompleted
                  ? "0 0 80px 16px rgba(224,137,91,0.55)"
                  : "0 0 50px 6px rgba(155,107,255,0.35)",
                transition: "box-shadow 0.6s ease",
              }
            : isHidden
            ? {
                background: "var(--color-clay-soft, rgba(224,137,91,0.12))",
                border: "1px solid var(--color-clay)",
                boxShadow: "0 0 24px 4px rgba(224,137,91,0.3)",
              }
            : node.type === "facet"
            ? {
                background: "var(--color-signal-soft, rgba(110,107,255,0.12))",
                border: `1px solid var(--color-signal)`,
                opacity: isDiscovered ? 1 : 0.85,
              }
            : {
                background: "var(--color-clay-soft, rgba(224,137,91,0.12))",
                border: `1px solid var(--color-clay)`,
                opacity: isDiscovered ? 1 : 0.75,
              }
        }
      />
      <span className="relative z-10 flex flex-col items-center gap-0.5">
        {isCore && <span className="text-display-md italic text-text-primary">YC</span>}
        {node.type === "facet" && Icon && <Icon size={20} className="text-signal-text" />}
        {(node.type === "life" || isHidden) && <span style={{ fontSize: radius * 0.9 }}>{node.icon}</span>}
      </span>

      {!isCore && (
        <span
          className="absolute top-full mt-3 w-max max-w-[200px] opacity-0 group-hover:opacity-100 group-focus:opacity-100 pointer-events-none transition-opacity duration-150 glass px-3 py-2"
          aria-hidden="true"
        >
          <span className="block text-body-sm font-semibold text-text-primary">{node.label}</span>
          <span className="block text-caption text-text-muted normal-case tracking-normal mt-0.5">
            {node.description}
          </span>
        </span>
      )}
    </motion.button>
  );
}

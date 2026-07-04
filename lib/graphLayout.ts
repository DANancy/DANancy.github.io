import { forceSimulation, forceLink, forceManyBody, forceCollide, SimulationNodeDatum } from "d3-force";
import { nodes, edges, GraphNodeData } from "@/content/graph";

export interface LaidOutNode extends GraphNodeData {
  x: number;
  y: number;
}

export const CANVAS_W = 1000;
export const CANVAS_H = 700;
const CENTER_X = CANVAS_W / 2;
const CENTER_Y = CANVAS_H / 2 - 20;

export function nodeRadius(type: GraphNodeData["type"]) {
  if (type === "core") return 48;
  if (type === "facet") return 28;
  if (type === "hidden") return 22;
  return 18;
}

interface SimNode extends SimulationNodeDatum {
  id: string;
  type: GraphNodeData["type"];
}

export function computeGraphLayout(): LaidOutNode[] {
  const simNodes: SimNode[] = nodes.map((n, i) => {
    if (n.type === "core") {
      return { id: n.id, type: n.type, x: CENTER_X, y: CENTER_Y, fx: CENTER_X, fy: CENTER_Y };
    }
    if (n.type === "facet") {
      const facetIndex = nodes.filter((x) => x.type === "facet").findIndex((x) => x.id === n.id);
      const facetCount = nodes.filter((x) => x.type === "facet").length;
      const angle = (facetIndex / facetCount) * Math.PI * 2 - Math.PI / 2;
      return {
        id: n.id,
        type: n.type,
        x: CENTER_X + Math.cos(angle) * 210,
        y: CENTER_Y + Math.sin(angle) * 210,
      };
    }
    // hidden comet node: fixed position at the outer rim, top area — not part of the
    // force graph (no edges), so pin it with fx/fy like the core node.
    if (n.type === "hidden") {
      const angle = -Math.PI / 2 + 0.5;
      const hx = CENTER_X + Math.cos(angle) * 400;
      const hy = CENTER_Y + Math.sin(angle) * 400;
      return { id: n.id, type: n.type, x: hx, y: hy, fx: hx, fy: hy };
    }
    // life nodes: scatter roughly around the outside
    const angle = (i / nodes.length) * Math.PI * 2 + 0.4;
    return {
      id: n.id,
      type: n.type,
      x: CENTER_X + Math.cos(angle) * 320,
      y: CENTER_Y + Math.sin(angle) * 320,
    };
  });

  const simLinks = edges.map(([source, target]) => ({ source, target }));

  const simulation = forceSimulation(simNodes)
    .force(
      "link",
      forceLink(simLinks)
        .id((d) => (d as SimNode).id)
        .distance((l) => {
          const source = l.source as unknown as SimNode;
          return source.type === "core" ? 210 : 105;
        })
        .strength(0.85)
    )
    .force("charge", forceManyBody().strength(-140))
    .force(
      "collide",
      forceCollide<SimNode>().radius((d) => nodeRadius(d.type) + 16)
    )
    .stop();

  for (let i = 0; i < 300; i++) simulation.tick();

  const byId = new Map(simNodes.map((n) => [n.id, n]));

  return nodes.map((n) => {
    const sim = byId.get(n.id)!;
    return { ...n, x: sim.x ?? CENTER_X, y: sim.y ?? CENTER_Y };
  });
}

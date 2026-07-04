"use client";

import { useState } from "react";
import { fmtCompact } from "@/lib/format";

interface BarChartProps {
  years: string[];
  values: number[];
  color: string;
}

const W = 640;
const H = 220;
const PAD_L = 34;
const PAD_B = 26;
const PAD_T = 14;
const PAD_R = 6;

export function BarChart({ years, values, color }: BarChartProps) {
  const [hover, setHover] = useState<number | null>(null);
  const innerW = W - PAD_L - PAD_R;
  const innerH = H - PAD_T - PAD_B;
  const max = Math.max(...values);
  const n = values.length;
  const gap = 4;
  const barW = (innerW - gap * (n - 1)) / n;
  const maxIdx = values.indexOf(max);

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
        {[0, 1, 2, 3, 4].map((i) => {
          const y = PAD_T + innerH - (innerH * i) / 4;
          return (
            <g key={i}>
              <line x1={PAD_L} x2={W - PAD_R} y1={y} y2={y} stroke="var(--glass-border)" strokeWidth={1} />
              <text x={PAD_L - 6} y={y + 3} textAnchor="end" className="fill-text-muted" fontSize={9}>
                {fmtCompact(Math.round((max * i) / 4))}
              </text>
            </g>
          );
        })}
        <line x1={PAD_L} x2={W - PAD_R} y1={PAD_T + innerH} y2={PAD_T + innerH} stroke="var(--glass-highlight)" strokeWidth={1} />

        {values.map((v, i) => {
          const barH = max > 0 ? (v / max) * innerH : 0;
          const x = PAD_L + i * (barW + gap);
          const y = PAD_T + innerH - barH;
          const showLabel = n <= 15 || i % 2 === 0 || i === n - 1;
          return (
            <g
              key={i}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover((h) => (h === i ? null : h))}
            >
              <rect
                x={x}
                y={y}
                width={barW}
                height={Math.max(barH, 1)}
                rx={Math.min(3, barW / 2)}
                fill={color}
                opacity={hover === null || hover === i ? 1 : 0.45}
                style={{ transition: "opacity 150ms" }}
              />
              <rect x={x} y={PAD_T} width={barW} height={innerH} fill="transparent" />
              {showLabel && (
                <text x={x + barW / 2} y={H - 6} textAnchor="middle" className="fill-text-muted" fontSize={9}>
                  {years[i].slice(2)}
                </text>
              )}
              {i === maxIdx && (
                <text x={x + barW / 2} y={y - 5} textAnchor="middle" fill={color} fontSize={10} fontWeight={700}>
                  {fmtCompact(v)}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      {hover !== null && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full glass px-3 py-1.5 text-body-sm pointer-events-none whitespace-nowrap">
          {years[hover]}: {values[hover].toLocaleString()} certificates
        </div>
      )}
    </div>
  );
}

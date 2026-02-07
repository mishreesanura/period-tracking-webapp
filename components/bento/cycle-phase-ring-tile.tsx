"use client";

import { Circle } from "lucide-react";
import type { SymptomFrequency } from "@/lib/insights-types";

interface CyclePhaseRingTileProps {
  symptoms: SymptomFrequency[];
}

const phases = [
  { name: "Period", key: "period", color: "#FDA4AF", accent: "#F43F5E" },
  {
    name: "Follicular",
    key: "follicular",
    color: "#A7F3D0",
    accent: "#10B981",
  },
  { name: "Ovulation", key: "ovulation", color: "#FDE68A", accent: "#F59E0B" },
  { name: "Luteal", key: "luteal", color: "#DDD6FE", accent: "#8B5CF6" },
];

export function CyclePhaseRingTile({ symptoms }: CyclePhaseRingTileProps) {
  const phaseLoad: Record<string, number> = {};
  phases.forEach((p) => {
    let total = 0;
    let count = 0;
    symptoms.forEach((s) => {
      if (s.byPhase[p.key] !== undefined) {
        total += s.byPhase[p.key];
        count++;
      }
    });
    phaseLoad[p.key] = count > 0 ? Math.round(total / count) : 0;
  });

  const maxLoad = Math.max(...Object.values(phaseLoad), 1);

  const totalSegments = phases.length;
  const gapDeg = 8;
  const totalGap = gapDeg * totalSegments;
  const availableDeg = 360 - totalGap;
  const segmentDeg = availableDeg / totalSegments;

  const polarToCartesian = (
    cx: number,
    cy: number,
    r: number,
    angleDeg: number,
  ) => {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };

  const describeArc = (
    cx: number,
    cy: number,
    r: number,
    startAngle: number,
    endAngle: number,
  ) => {
    const start = polarToCartesian(cx, cy, r, endAngle);
    const end = polarToCartesian(cx, cy, r, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
  };

  const avgLoad = Math.round(
    Object.values(phaseLoad).reduce((a, b) => a + b, 0) / phases.length,
  );

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2 flex-shrink-0">
        <div className="bg-amber-100 p-1.5 rounded-lg">
          <Circle className="h-4 w-4 text-amber-500" />
        </div>
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          Phase Map
        </span>
      </div>

      {/* Ring — centered, auto-sized */}
      <div className="flex-1 flex flex-col items-center justify-center min-h-0">
        <svg viewBox="0 0 120 120" className="w-[100px] h-[100px]">
          {phases.map((phase, i) => {
            const startAngle = i * (segmentDeg + gapDeg);
            const endAngle = startAngle + segmentDeg;
            const load = phaseLoad[phase.key] || 0;

            return (
              <g key={phase.key}>
                <path
                  d={describeArc(60, 60, 50, startAngle, endAngle)}
                  fill="none"
                  stroke={phase.color}
                  strokeWidth="14"
                  strokeLinecap="round"
                  opacity={0.4}
                />
                <path
                  d={describeArc(60, 60, 50, startAngle, endAngle)}
                  fill="none"
                  stroke={phase.accent}
                  strokeWidth="14"
                  strokeLinecap="round"
                  opacity={0.8}
                  strokeDasharray={`${(load / 100) * segmentDeg * 1.1} 999`}
                />
              </g>
            );
          })}
          <text
            x="60"
            y="57"
            textAnchor="middle"
            className="fill-slate-700 text-sm font-bold"
          >
            {avgLoad}%
          </text>
          <text
            x="60"
            y="70"
            textAnchor="middle"
            className="fill-slate-400 text-[8px]"
          >
            avg load
          </text>
        </svg>

        {/* Inline compact legend */}
        <div className="flex gap-2 mt-2 flex-shrink-0">
          {phases.map((p) => (
            <div key={p.key} className="flex items-center gap-1">
              <div
                className="w-2 h-2 rounded-sm"
                style={{ backgroundColor: p.accent }}
              />
              <span className="text-[9px] text-slate-400">{p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

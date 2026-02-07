"use client";

import { ShieldCheck } from "lucide-react";
import type { PCOSAwareness } from "@/lib/insights-types";
import { getSimilarityBandLabel } from "@/lib/insights-utils";

interface PatternAwarenessTileProps {
  awareness: PCOSAwareness;
  onOpenModal?: () => void;
}

export function PatternAwarenessTile({
  awareness,
  onOpenModal,
}: PatternAwarenessTileProps) {
  const bandColors = {
    low: {
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      ring: "stroke-emerald-400",
    },
    moderate: {
      bg: "bg-amber-50",
      text: "text-amber-600",
      ring: "stroke-amber-400",
    },
    higher: {
      bg: "bg-rose-50",
      text: "text-rose-600",
      ring: "stroke-rose-400",
    },
  };

  const config = bandColors[awareness.similarityBand];

  const avgConfidence =
    awareness.patterns.length > 0
      ? Math.round(
          (awareness.patterns.reduce((acc, p) => acc + p.confidence, 0) /
            awareness.patterns.length) *
            100,
        )
      : 0;

  return (
    <div
      className="h-full flex flex-col cursor-pointer group"
      onClick={onOpenModal}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-3 flex-shrink-0">
        <div className="bg-purple-100 p-1.5 rounded-lg">
          <ShieldCheck className="h-4 w-4 text-purple-500" />
        </div>
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Pattern Awareness
        </span>
      </div>

      {/* Content row */}
      <div className="flex-1 flex items-center gap-4 min-h-0">
        {/* Confidence ring */}
        <div className="flex-shrink-0">
          <svg width="64" height="64" viewBox="0 0 64 64">
            <circle
              cx="32"
              cy="32"
              r="26"
              fill="none"
              stroke="#f1f5f9"
              strokeWidth="5"
            />
            <circle
              cx="32"
              cy="32"
              r="26"
              fill="none"
              className={config.ring}
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={`${(avgConfidence / 100) * 163.4} 163.4`}
              transform="rotate(-90 32 32)"
            />
            <text
              x="32"
              y="35"
              textAnchor="middle"
              className="fill-slate-700 text-xs font-bold"
            >
              {avgConfidence}%
            </text>
          </svg>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <span
            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${config.bg} ${config.text}`}
          >
            {getSimilarityBandLabel(awareness.similarityBand)}
          </span>
          <p className="text-[11px] text-slate-500 mt-2 leading-relaxed line-clamp-2">
            {awareness.patterns.length} pattern
            {awareness.patterns.length !== 1 ? "s" : ""} across{" "}
            {awareness.cyclesTracked} cycles
          </p>
        </div>
      </div>
    </div>
  );
}

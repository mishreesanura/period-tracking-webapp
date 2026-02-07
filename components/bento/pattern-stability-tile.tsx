"use client";

import { Activity } from "lucide-react";

interface PatternStabilityTileProps {
  variability: number;
  cycleLengths: number[];
}

export function PatternStabilityTile({
  variability,
  cycleLengths,
}: PatternStabilityTileProps) {
  const isStable = variability <= 3;
  const max = Math.max(...cycleLengths);
  const min = Math.min(...cycleLengths);
  const range = max - min || 1;

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-2 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="bg-purple-100 p-1.5 rounded-lg">
            <Activity className="h-4 w-4 text-purple-500" />
          </div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Stability
          </span>
        </div>
        <span
          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
            isStable
              ? "bg-emerald-50 text-emerald-600"
              : "bg-amber-50 text-amber-600"
          }`}
        >
          {isStable ? "Stable" : "Variation"}
        </span>
      </div>

      {/* Sparkline */}
      <div className="flex-1 flex items-end gap-[3px] min-h-0">
        {cycleLengths.map((len, i) => {
          const height = ((len - min) / range) * 60 + 20;
          const isLast = i === cycleLengths.length - 1;
          return (
            <div
              key={i}
              className="flex-1 relative group"
              style={{ height: "100%" }}
            >
              <div
                className={`absolute bottom-0 w-full rounded-t-md transition-all duration-300 ${
                  isLast
                    ? "bg-gradient-to-t from-purple-400 to-purple-300"
                    : "bg-purple-100 group-hover:bg-purple-200"
                }`}
                style={{ height: `${height}%` }}
              />
              <div
                className="absolute left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ bottom: `${height}%` }}
              >
                <div className="bg-slate-800 text-white text-[10px] px-1.5 py-0.5 rounded -translate-y-2 whitespace-nowrap">
                  {len}d
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <p className="text-[11px] text-slate-400 mt-2 flex-shrink-0">
        ±{variability.toFixed(1)}d over {cycleLengths.length} cycles
      </p>
    </div>
  );
}

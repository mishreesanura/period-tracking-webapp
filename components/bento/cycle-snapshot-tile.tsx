"use client";

import { Heart, TrendingUp } from "lucide-react";

interface CycleSnapshotTileProps {
  cycleLength: number;
  regularity: number;
  wellnessScore: number;
}

export function CycleSnapshotTile({
  cycleLength,
  regularity,
  wellnessScore,
}: CycleSnapshotTileProps) {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3 flex-shrink-0">
        <div className="bg-rose-100 p-1.5 rounded-lg">
          <Heart className="h-4 w-4 text-rose-500" />
        </div>
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Cycle Snapshot
        </span>
      </div>

      {/* Hero metric */}
      <div className="flex-1 flex flex-col justify-center min-h-0">
        <div className="flex items-baseline gap-1.5">
          <span className="text-4xl font-bold text-slate-800 tracking-tight">
            {cycleLength}
          </span>
          <span className="text-base text-slate-400 font-medium">days</span>
        </div>
        <p className="text-[11px] text-slate-400 mt-0.5">
          Average cycle length
        </p>

        {/* Secondary metrics */}
        <div className="flex gap-5 mt-4">
          <div>
            <div className="flex items-center gap-1">
              <span className="text-lg font-bold text-purple-600">
                {regularity}%
              </span>
              <TrendingUp className="h-3 w-3 text-emerald-500" />
            </div>
            <p className="text-[11px] text-slate-400">Regularity</p>
          </div>
          <div className="border-l border-slate-100 pl-5">
            <div className="flex items-baseline gap-0.5">
              <span className="text-lg font-bold text-rose-500">
                {wellnessScore}
              </span>
              <span className="text-xs text-slate-400">/10</span>
            </div>
            <p className="text-[11px] text-slate-400">Wellness</p>
          </div>
        </div>
      </div>

      {/* Confidence bar */}
      <div className="mt-auto pt-2 flex-shrink-0">
        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-rose-300 via-purple-300 to-emerald-300"
            style={{ width: `${regularity}%` }}
          />
        </div>
      </div>
    </div>
  );
}

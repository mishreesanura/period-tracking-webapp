"use client";

import { Brain } from "lucide-react";
import type { MoodTrend } from "@/lib/insights-types";

interface MoodCorrelationTileProps {
  moodTrends: MoodTrend[];
}

export function MoodCorrelationTile({ moodTrends }: MoodCorrelationTileProps) {
  const moodColors: Record<string, string> = {
    "Low mood": "bg-purple-400",
    Anxiety: "bg-rose-400",
    Calm: "bg-emerald-400",
    Happy: "bg-amber-300",
    Irritable: "bg-orange-400",
  };

  // Take max 4 moods to prevent overflow
  const topMoods = moodTrends.slice(0, 4);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3 flex-shrink-0">
        <div className="bg-purple-100 p-1.5 rounded-lg">
          <Brain className="h-4 w-4 text-purple-500" />
        </div>
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Mood & Stress
        </span>
      </div>

      {/* Simplified mood rows: single bar, stress = opacity */}
      <div className="flex-1 flex flex-col justify-center gap-3 min-h-0">
        {topMoods.map((trend) => {
          const dotColor = moodColors[trend.mood] || "bg-slate-300";
          const stressPercent = Math.round(trend.stressCorrelation * 100);

          return (
            <div key={`${trend.mood}-${trend.cyclePhase}`}>
              <div className="flex items-center justify-between mb-0.5">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2.5 h-2.5 rounded-full ${dotColor} flex-shrink-0`}
                  />
                  <span className="text-[11px] font-semibold text-slate-700">
                    {trend.mood}
                  </span>
                </div>
                <span className="text-[11px] font-bold text-slate-600">
                  {trend.frequency}%
                </span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${dotColor}`}
                  style={{
                    width: `${trend.frequency}%`,
                    opacity: 0.4 + trend.stressCorrelation * 0.6,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Minimal legend */}
      <p className="text-[10px] text-slate-400 mt-auto pt-1 flex-shrink-0">
        Bar intensity = stress correlation
      </p>
    </div>
  );
}

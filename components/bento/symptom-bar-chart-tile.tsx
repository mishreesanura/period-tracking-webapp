"use client";

import { BarChart3 } from "lucide-react";
import type { SymptomFrequency } from "@/lib/insights-types";

interface SymptomBarChartTileProps {
  symptoms: SymptomFrequency[];
}

const phaseColors: Record<string, string> = {
  period: "bg-rose-300",
  luteal: "bg-purple-300",
  follicular: "bg-emerald-200",
  pms: "bg-amber-300",
  ovulation: "bg-amber-200",
};

export function SymptomBarChartTile({ symptoms }: SymptomBarChartTileProps) {
  // Top 4 only
  const top4 = symptoms.slice(0, 4);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3 flex-shrink-0">
        <div className="bg-rose-100 p-1.5 rounded-lg">
          <BarChart3 className="h-4 w-4 text-rose-500" />
        </div>
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Symptom Frequency
        </span>
      </div>

      {/* Horizontal bar chart */}
      <div className="flex-1 flex flex-col justify-center gap-3 min-h-0">
        {top4.map((symptom) => {
          const topPhase = Object.entries(symptom.byPhase).sort(
            ([, a], [, b]) => b - a,
          )[0];
          const barColor = topPhase
            ? phaseColors[topPhase[0]] || "bg-slate-200"
            : "bg-slate-200";

          return (
            <div key={symptom.symptom}>
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-[11px] font-medium text-slate-600 truncate">
                  {symptom.symptom}
                </span>
                <span className="text-[11px] font-bold text-slate-700 ml-2 flex-shrink-0">
                  {symptom.frequency}%{symptom.trend === "increasing" && " ↑"}
                  {symptom.trend === "decreasing" && " ↓"}
                </span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${barColor}`}
                  style={{ width: `${symptom.frequency}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

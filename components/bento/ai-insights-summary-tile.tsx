"use client";

import { Sparkles } from "lucide-react";
import type { AIInsight } from "@/lib/insights-types";

interface AIInsightsSummaryTileProps {
  insights: AIInsight[];
}

export function AIInsightsSummaryTile({
  insights,
}: AIInsightsSummaryTileProps) {
  // Max 3
  const topInsights = insights.slice(0, 3);

  const severityDot: Record<string, string> = {
    low: "bg-emerald-400",
    medium: "bg-amber-400",
    high: "bg-rose-400",
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3 flex-shrink-0">
        <div className="bg-gradient-to-br from-rose-100 to-purple-100 p-1.5 rounded-lg">
          <Sparkles className="h-4 w-4 text-purple-500" />
        </div>
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          AI Insights
        </span>
      </div>

      {/* Insight bullets — title only */}
      <div className="flex-1 flex flex-col justify-center gap-3 min-h-0">
        {topInsights.length > 0 ? (
          topInsights.map((insight) => (
            <div key={insight.id} className="flex items-start gap-2.5">
              <div className="mt-1 flex-shrink-0">
                <div
                  className={`w-2 h-2 rounded-full ${severityDot[insight.severity]}`}
                />
              </div>
              <p className="text-[13px] font-semibold text-slate-700 leading-snug line-clamp-2">
                {insight.title}
              </p>
            </div>
          ))
        ) : (
          <p className="text-xs text-slate-400 text-center">
            No patterns detected yet.
          </p>
        )}
      </div>

      {/* Disclaimer — single line */}
      <p className="text-[10px] text-slate-400 mt-auto pt-2 flex-shrink-0">
        Based on last 5 cycles — not a diagnosis.
      </p>
    </div>
  );
}

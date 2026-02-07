"use client";

import { CheckCircle2, Smile } from "lucide-react";
import type { RiskZone } from "@/lib/insights-types";

interface OverallStatusTileProps {
  zone: RiskZone;
  patternsCount: number;
}

export function OverallStatusTile({
  zone,
  patternsCount,
}: OverallStatusTileProps) {
  const config = {
    stable: {
      bg: "bg-gradient-to-br from-emerald-50 via-emerald-50/50 to-white",
      emoji: "💚",
      title: "Looking great",
      subtitle: "Your patterns are stable and consistent",
      iconColor: "text-emerald-500",
      accentColor: "bg-emerald-400",
    },
    monitor: {
      bg: "bg-gradient-to-br from-lavender-50 via-purple-50/50 to-white",
      emoji: "💜",
      title: "Worth monitoring",
      subtitle: "A few patterns to keep an eye on",
      iconColor: "text-purple-500",
      accentColor: "bg-purple-400",
    },
    consider: {
      bg: "bg-gradient-to-br from-amber-50 via-amber-50/50 to-white",
      emoji: "🧡",
      title: "Consider a check-up",
      subtitle: "Some patterns may benefit from professional input",
      iconColor: "text-amber-500",
      accentColor: "bg-amber-400",
    },
  };

  const c = config[zone];

  return (
    <div className={`h-full flex flex-col ${c.bg} rounded-2xl`}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-2 flex-shrink-0">
        <div className="bg-white/60 p-1.5 rounded-lg">
          {zone === "stable" ? (
            <CheckCircle2 className={`h-4 w-4 ${c.iconColor}`} />
          ) : (
            <Smile className={`h-4 w-4 ${c.iconColor}`} />
          )}
        </div>
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          Status
        </span>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center min-h-0">
        <span className="text-3xl mb-1.5">{c.emoji}</span>
        <h3 className="text-base font-bold text-slate-800 leading-snug">
          {c.title}
        </h3>
        <p className="text-[11px] text-slate-500 mt-1 leading-relaxed line-clamp-2">
          {c.subtitle}
        </p>
      </div>
    </div>
  );
}

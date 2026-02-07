"use client";

import { AlertCircle, ChevronRight } from "lucide-react";

interface AlertHighlightTileProps {
  title: string;
  description: string;
  severity: "low" | "medium" | "high";
  onOpenDrawer?: () => void;
}

export function AlertHighlightTile({
  title,
  description,
  severity,
  onOpenDrawer,
}: AlertHighlightTileProps) {
  const severityConfig = {
    low: {
      bg: "bg-gradient-to-br from-emerald-50 to-emerald-50/30",
      border: "border-emerald-100",
      icon: "text-emerald-500",
      badge: "bg-emerald-100 text-emerald-700",
      dot: "bg-emerald-400",
    },
    medium: {
      bg: "bg-gradient-to-br from-amber-50 to-amber-50/30",
      border: "border-amber-100",
      icon: "text-amber-500",
      badge: "bg-amber-100 text-amber-700",
      dot: "bg-amber-400",
    },
    high: {
      bg: "bg-gradient-to-br from-rose-50 to-rose-50/30",
      border: "border-rose-100",
      icon: "text-rose-500",
      badge: "bg-rose-100 text-rose-700",
      dot: "bg-rose-400",
    },
  };

  const config = severityConfig[severity];

  return (
    <div
      className={`h-full flex flex-col ${config.bg} rounded-2xl cursor-pointer group`}
      onClick={onOpenDrawer}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-2 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${config.dot} animate-pulse`} />
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Key Pattern
          </span>
        </div>
        <AlertCircle className={`h-4 w-4 ${config.icon}`} />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center min-h-0">
        <h3 className="text-sm font-bold text-slate-800 leading-snug mb-1.5 line-clamp-2">
          {title}
        </h3>
        <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>

      {/* CTA */}
      <div className="flex items-center gap-1 text-[11px] font-medium text-purple-600 mt-auto pt-2 flex-shrink-0 group-hover:gap-2 transition-all">
        <span>Details</span>
        <ChevronRight className="h-3 w-3" />
      </div>
    </div>
  );
}

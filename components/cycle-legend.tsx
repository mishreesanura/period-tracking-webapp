"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface CycleLegendProps {
  className?: string;
}

export function CycleLegende({ className }: CycleLegendProps) {
  const phases = [
    {
      label: "Period",
      color: "bg-rose-200 shadow-sm border border-rose-200",
      textColor: "text-rose-700",
      description: "Menstruation",
    },
    {
      label: "Spotting",
      color: "bg-orange-100 shadow-sm border border-orange-100",
      textColor: "text-orange-700",
      description: "Light",
    },
    {
      label: "Ovulation",
      color: "bg-amber-100 shadow-sm border border-amber-100",
      textColor: "text-amber-700",
      description: "Fertile",
    },
    {
      label: "Safe Days",
      color: "bg-emerald-50 shadow-sm border border-emerald-100",
      textColor: "text-emerald-700",
      description: "Low chance",
    },
    {
      label: "PMS",
      color: "bg-purple-100 shadow-sm border border-purple-100",
      textColor: "text-purple-700",
      description: "Pre-period",
    },
    {
      label: "Predicted",
      color: "border border-dashed border-slate-300 bg-slate-50",
      textColor: "text-slate-500",
      description: "Expected",
    },
  ];

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider text-[11px]">
          Cycle Key
        </h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {phases.map((phase) => (
          <div
            key={phase.label}
            className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-slate-50/50 transition-colors"
          >
            <div
              className={`w-3 h-3 md:w-4 md:h-4 rounded-full flex-shrink-0 ${phase.color}`}
              aria-label={phase.label}
            />
            <div className="flex flex-col">
              <span
                className={`text-xs md:text-sm font-medium ${phase.textColor}`}
              >
                {phase.label}
              </span>
              <span className="text-[10px] md:text-[11px] text-slate-400 leading-tight">
                {phase.description}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

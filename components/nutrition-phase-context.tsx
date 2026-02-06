'use client'

import type { NutritionCyclePhase } from '@/lib/nutrition-types'
import { getPhaseNutritionInfo, getPhaseAccentColor, getPhaseAccentText } from '@/lib/nutrition-utils'

interface NutritionPhaseContextProps {
  phase: NutritionCyclePhase
}

export function NutritionPhaseContext({ phase }: NutritionPhaseContextProps) {
  const info = getPhaseNutritionInfo(phase)

  return (
    <div className={`rounded-lg border p-5 ${getPhaseAccentColor(phase)}`}>
      <h2 className={`text-sm font-semibold uppercase tracking-wide mb-2 ${getPhaseAccentText(phase)}`}>
        {info.label}
      </h2>
      <p className="text-foreground text-base leading-relaxed mb-4">
        {info.uiCopy}
      </p>

      <div className="flex flex-wrap gap-2 mb-3">
        {info.commonNeeds.map((need) => (
          <span
            key={need}
            className="text-xs px-2.5 py-1 rounded-full bg-background/60 text-foreground border border-border/50"
          >
            {need}
          </span>
        ))}
      </div>

      <div>
        <p className="text-xs text-muted-foreground mb-2 font-medium">
          Foods that often feel good:
        </p>
        <div className="flex flex-wrap gap-1.5">
          {info.suggestedFoodCategories.map((cat) => (
            <span
              key={cat}
              className="text-xs px-2 py-0.5 rounded text-muted-foreground bg-background/40"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

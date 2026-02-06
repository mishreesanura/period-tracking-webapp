'use client'

import { useState } from 'react'
import { Clock, ChevronDown, ChevronUp, Heart } from 'lucide-react'
import type { FoodSuggestion } from '@/lib/nutrition-types'
import { getMoodBenefitColor, getMoodBenefitLabel } from '@/lib/nutrition-utils'

interface NutritionFoodCardProps {
  food: FoodSuggestion
}

export function NutritionFoodCard({ food }: NutritionFoodCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [saved, setSaved] = useState(false)

  return (
    <div className="rounded-lg border border-border bg-card p-5 transition-all hover:border-border/80">
      {/* Header row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1">
          <h3 className="text-base font-semibold text-foreground mb-1">
            {food.name}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {food.description}
          </p>
        </div>
        <button
          onClick={() => setSaved(!saved)}
          className="shrink-0 p-2 rounded-lg hover:bg-muted transition-colors"
          aria-label={saved ? 'Remove from saved' : 'Save for later'}
        >
          <Heart
            className={`h-4 w-4 transition-colors ${saved ? 'fill-rose-400 text-rose-400' : 'text-muted-foreground'}`}
          />
        </button>
      </div>

      {/* Tags row */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
          <Clock className="h-3 w-3" />
          {food.timeEstimate}
        </span>
        <span
          className={`text-xs px-2.5 py-1 rounded-full border ${getMoodBenefitColor(food.moodBenefit)}`}
        >
          {getMoodBenefitLabel(food.moodBenefit)}
        </span>
      </div>

      {/* Cycle-friendly note */}
      <p className="text-xs text-muted-foreground italic mb-3">
        {food.cycleFriendlyNote}
      </p>

      {/* Expandable stress context */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        How this may support you
        {expanded ? (
          <ChevronUp className="h-3 w-3" />
        ) : (
          <ChevronDown className="h-3 w-3" />
        )}
      </button>

      {expanded && (
        <div className="mt-3 p-3 rounded-md bg-muted/50 border border-border">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {food.stressContext}
          </p>
        </div>
      )}
    </div>
  )
}

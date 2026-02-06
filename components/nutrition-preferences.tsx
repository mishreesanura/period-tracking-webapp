'use client'

import type { DietaryPreference, CookingEffort } from '@/lib/nutrition-types'
import { getDietaryLabel, getEffortLabel } from '@/lib/nutrition-utils'

interface NutritionPreferencesProps {
  dietary: DietaryPreference
  effort: CookingEffort
  onDietaryChange: (value: DietaryPreference) => void
  onEffortChange: (value: CookingEffort) => void
}

const dietaryOptions: DietaryPreference[] = ['no-preference', 'veg', 'egg', 'non-veg']
const effortOptions: CookingEffort[] = ['no-cook', 'quick', 'comfort-cooking']

export function NutritionPreferences({
  dietary,
  effort,
  onDietaryChange,
  onEffortChange,
}: NutritionPreferencesProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-5 space-y-5">
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-1">
          Preferences
        </h3>
        <p className="text-xs text-muted-foreground mb-4">
          All optional. Change anytime. We never assume.
        </p>
      </div>

      {/* Dietary preference */}
      <div>
        <label className="text-xs font-medium text-muted-foreground mb-2 block">
          Dietary preference
        </label>
        <div className="flex flex-wrap gap-2">
          {dietaryOptions.map((option) => (
            <button
              key={option}
              onClick={() => onDietaryChange(option)}
              className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                dietary === option
                  ? 'bg-foreground text-background border-foreground'
                  : 'bg-card text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground'
              }`}
            >
              {getDietaryLabel(option)}
            </button>
          ))}
        </div>
      </div>

      {/* Cooking effort */}
      <div>
        <label className="text-xs font-medium text-muted-foreground mb-2 block">
          How much energy for cooking?
        </label>
        <div className="flex flex-wrap gap-2">
          {effortOptions.map((option) => (
            <button
              key={option}
              onClick={() => onEffortChange(option)}
              className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                effort === option
                  ? 'bg-foreground text-background border-foreground'
                  : 'bg-card text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground'
              }`}
            >
              {getEffortLabel(option)}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

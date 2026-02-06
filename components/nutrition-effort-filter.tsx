'use client'

import type { CookingEffort } from '@/lib/nutrition-types'
import { getEffortLabel } from '@/lib/nutrition-utils'

interface NutritionEffortFilterProps {
  active: CookingEffort | 'all'
  onChange: (value: CookingEffort | 'all') => void
}

const options: (CookingEffort | 'all')[] = ['all', 'no-cook', 'quick', 'comfort-cooking']

export function NutritionEffortFilter({ active, onChange }: NutritionEffortFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
            active === option
              ? 'bg-foreground text-background border-foreground'
              : 'bg-card text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground'
          }`}
        >
          {option === 'all' ? 'All' : getEffortLabel(option)}
        </button>
      ))}
    </div>
  )
}

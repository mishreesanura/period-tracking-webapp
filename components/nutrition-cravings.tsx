'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import type { NutritionCyclePhase } from '@/lib/nutrition-types'
import { getCravingsForPhase } from '@/lib/nutrition-utils'

interface NutritionCravingsProps {
  phase: NutritionCyclePhase
}

export function NutritionCravings({ phase }: NutritionCravingsProps) {
  const [openId, setOpenId] = useState<string | null>(null)
  const cravings = getCravingsForPhase(phase)

  if (cravings.length === 0) return null

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <h2 className="text-base font-semibold text-foreground mb-1">
        Why am I craving this?
      </h2>
      <p className="text-xs text-muted-foreground mb-4">
        Entirely optional. Just here if you want to understand your body better.
      </p>

      <div className="space-y-2">
        {cravings.map((craving) => {
          const isOpen = openId === craving.id

          return (
            <div key={craving.id} className="rounded-md border border-border overflow-hidden">
              <button
                onClick={() => setOpenId(isOpen ? null : craving.id)}
                className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-muted/50 transition-colors"
              >
                <span className="text-sm font-medium text-foreground">
                  {craving.craving}
                </span>
                {isOpen ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                )}
              </button>
              {isOpen && (
                <div className="px-4 pb-3">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {craving.explanation}
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

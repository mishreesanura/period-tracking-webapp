'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { ChevronLeft, Settings } from 'lucide-react'
import { calculateCyclePhase } from '@/lib/cycle-utils'
import type { NutritionCyclePhase, DietaryPreference, CookingEffort } from '@/lib/nutrition-types'
import { mapCyclePhaseToNutrition, getFoodSuggestionsForPhase } from '@/lib/nutrition-utils'
import { NutritionPhaseContext } from '@/components/nutrition-phase-context'
import { NutritionFoodCard } from '@/components/nutrition-food-card'
import { NutritionCravings } from '@/components/nutrition-cravings'
import { NutritionPreferences } from '@/components/nutrition-preferences'
import { NutritionEffortFilter } from '@/components/nutrition-effort-filter'

export default function NutritionPage() {
  const [currentPhase, setCurrentPhase] = useState<NutritionCyclePhase>('follicular')
  const [showSettings, setShowSettings] = useState(false)
  const [dietary, setDietary] = useState<DietaryPreference>('no-preference')
  const [effort, setEffort] = useState<CookingEffort | 'all'>('all')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cycleStartDate')
      if (saved) {
        const cycleStart = new Date(saved)
        const today = new Date()
        const cycleData = calculateCyclePhase(today, cycleStart)
        setCurrentPhase(mapCyclePhaseToNutrition(cycleData.phase))
      }

      const savedDietary = localStorage.getItem('nutritionDietary')
      if (savedDietary) setDietary(savedDietary as DietaryPreference)

      const savedEffort = localStorage.getItem('nutritionEffort')
      if (savedEffort) setEffort(savedEffort as CookingEffort | 'all')
    }
  }, [])

  const handleDietaryChange = (value: DietaryPreference) => {
    setDietary(value)
    if (typeof window !== 'undefined') {
      localStorage.setItem('nutritionDietary', value)
    }
  }

  const handleEffortChange = (value: CookingEffort | 'all') => {
    setEffort(value)
    if (typeof window !== 'undefined') {
      localStorage.setItem('nutritionEffort', value)
    }
  }

  const suggestions = useMemo(() => {
    return getFoodSuggestionsForPhase(
      currentPhase,
      dietary,
      effort === 'all' ? undefined : effort,
    )
  }, [currentPhase, dietary, effort])

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Link>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline text-sm font-medium">Settings</span>
          </button>
        </div>

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Food & Mood
          </h1>
          <p className="text-muted-foreground text-pretty">
            {'Your body is asking for support \u2014 let\u2019s listen. Food as care, not discipline.'}
          </p>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="mb-8">
            <NutritionPreferences
              dietary={dietary}
              effort={effort === 'all' ? 'no-cook' : effort}
              onDietaryChange={handleDietaryChange}
              onEffortChange={(value) => handleEffortChange(value)}
            />
          </div>
        )}

        {/* Phase Context */}
        <div className="mb-8">
          <NutritionPhaseContext phase={currentPhase} />
        </div>

        {/* Effort filter */}
        <div className="mb-6">
          <p className="text-xs font-medium text-muted-foreground mb-2">
            Filter by energy level
          </p>
          <NutritionEffortFilter active={effort} onChange={handleEffortChange} />
        </div>

        {/* Food suggestions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-1">
            Suggestions for you
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Based on your current phase. All optional, all valid.
          </p>

          {suggestions.length > 0 ? (
            <div className="space-y-4">
              {suggestions.map((food) => (
                <NutritionFoodCard key={food.id} food={food} />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-border bg-muted/30 p-6 text-center">
              <p className="text-sm text-muted-foreground">
                No suggestions match your current filters. Try adjusting your preferences or effort level.
              </p>
            </div>
          )}
        </div>

        {/* Cravings explained */}
        <div className="mb-8">
          <NutritionCravings phase={currentPhase} />
        </div>

        {/* Phase navigation */}
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
            Explore other phases
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(['menstrual', 'follicular', 'ovulation', 'luteal'] as NutritionCyclePhase[]).map(
              (phase) => (
                <button
                  key={phase}
                  onClick={() => setCurrentPhase(phase)}
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium border transition-colors ${
                    currentPhase === phase
                      ? 'bg-foreground text-background border-foreground'
                      : 'bg-card text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground'
                  }`}
                >
                  {phase.charAt(0).toUpperCase() + phase.slice(1)}
                </button>
              ),
            )}
          </div>
        </div>

        {/* Info section */}
        <div className="rounded-lg border border-border bg-muted/30 p-6">
          <h2 className="font-semibold text-foreground mb-3">
            How this works
          </h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-3">
              <span className="text-foreground font-bold">{'\u2192'}</span>
              <span>Suggestions change based on your cycle phase, not a diet plan</span>
            </li>
            <li className="flex gap-3">
              <span className="text-foreground font-bold">{'\u2192'}</span>
              <span>Cravings are explained, never corrected</span>
            </li>
            <li className="flex gap-3">
              <span className="text-foreground font-bold">{'\u2192'}</span>
              <span>Low-effort options are always available because some days are hard</span>
            </li>
            <li className="flex gap-3">
              <span className="text-foreground font-bold">{'\u2192'}</span>
              <span>No calorie counting, no macros, no judgment. Enough is enough.</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  )
}

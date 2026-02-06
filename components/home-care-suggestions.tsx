'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { CareSuggestion } from '@/lib/care-types'
import {
  getTimeOfDay,
  getCyclePhaseSuggestions,
} from '@/lib/care-utils'
import { CareSuggestionCard } from '@/components/care-suggestion-card'

export function HomeCareSuggestions() {
  const [suggestions, setSuggestions] = useState<CareSuggestion[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get time of day and generate suggestions
    const timeOfDay = getTimeOfDay()
    const cycleSuggestions = getCyclePhaseSuggestions(
      'unknown',
      timeOfDay,
    )

    // Limit to 3-5 suggestions for the home page
    setSuggestions(cycleSuggestions.slice(0, 4))
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return null
  }

  return (
    <section className="mb-16">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-[24px] font-semibold text-neutral-black mb-1">
            Today's care suggestions
          </h2>
          <p className="text-[14px] text-neutral-black/60">
            Gentle ideas that might help.
          </p>
        </div>
        <Link
          href="/care"
          className="text-[14px] font-medium text-brand-pink hover:underline flex items-center gap-1"
        >
          View all
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Vertical notification list */}
      <div className="flex flex-col gap-3">
        {suggestions.map((suggestion) => (
            <CareSuggestionCard
              key={suggestion.id}
              suggestion={suggestion}
              variant="notification"
            />
        ))}
      </div>
    </section>
  )
}

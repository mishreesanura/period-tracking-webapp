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
          <h2 className="text-2xl font-bold text-foreground mb-1">
            Today's care suggestions
          </h2>
          <p className="text-sm text-muted-foreground">
            Gentle ideas that might help.
          </p>
        </div>
        <Link
          href="/care"
          className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
        >
          View all
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Horizontal scroll container */}
      <div className="overflow-x-auto pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="flex gap-4 min-w-min">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="w-80 flex-shrink-0"
            >
              <CareSuggestionCard
                suggestion={suggestion}
                compact={true}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

'use client'

import { useState } from 'react'
import { ChevronUp, ChevronDown, AlertCircle, CheckCircle2 } from 'lucide-react'
import type { Movement } from '@/lib/movement-types'

interface MovementDetailProps {
  movement: Movement
}

const movementTypeLabel: Record<string, string> = {
  yoga: 'Yoga',
  gym: 'Gym',
  home: 'Home',
}

const focusAreaLabel: Record<string, string> = {
  'full-body': 'Full Body',
  upper: 'Upper Body',
  lower: 'Lower Body',
  core: 'Core',
  back: 'Back',
  stretching: 'Stretching',
  breathing: 'Breathing',
}

export function MovementDetail({ movement }: MovementDetailProps) {
  const [expandedExercise, setExpandedExercise] = useState<number | null>(null)
  const [notFeelingIt, setNotFeelingIt] = useState(false)

  if (notFeelingIt) {
    return (
      <section className="space-y-6" aria-label="Alternative movement options">
        <div className="rounded-lg border border-border bg-muted/30 p-6" role="status">
          <h2 className="text-lg font-semibold text-foreground mb-2">
            That's completely okay
          </h2>
          <p className="text-muted-foreground mb-6">
            Your body knows what it needs. Here are some gentle alternatives:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Try a 5-minute stretch</p>
                <p className="text-sm text-muted-foreground">Easy, gentle movement if you want to move at all</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Just breathe</p>
                <p className="text-sm text-muted-foreground">Calm your nervous system with breathing exercises</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Rest today</p>
                <p className="text-sm text-muted-foreground">Skip movement entirely—rest is productive</p>
              </div>
            </li>
          </ul>
        </div>

        <button
          onClick={() => setNotFeelingIt(false)}
          className="w-full px-4 py-3 text-sm font-medium text-primary bg-muted rounded-lg hover:bg-muted/80 transition-colors"
          aria-label={`Go back to ${movement.name}`}
        >
          Back to {movement.name}
        </button>
      </section>
    )
  }

  return (
    <div className="space-y-6">
      {/* Intro Section */}
      <section className="rounded-lg border border-border bg-muted/30 p-6" aria-labelledby="why-this">
        <h2 id="why-this" className="text-lg font-semibold text-foreground mb-2">
          Why this today?
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          {movement.whyToday}
        </p>
      </section>

      {/* Movement Info */}
      <section aria-label="Movement details">
        <h2 className="sr-only">Movement Information</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-lg border border-border p-4">
            <p className="text-xs font-semibold text-muted-foreground mb-1">
              Type
            </p>
            <p className="text-lg font-semibold text-foreground">
              {movementTypeLabel[movement.type]}
            </p>
          </div>
          <div className="rounded-lg border border-border p-4">
            <p className="text-xs font-semibold text-muted-foreground mb-1">
              Duration
            </p>
            <p className="text-lg font-semibold text-foreground">
              {movement.duration} min
            </p>
          </div>
          <div className="rounded-lg border border-border p-4">
            <p className="text-xs font-semibold text-muted-foreground mb-1">
              Intensity
            </p>
            <p className="text-lg font-semibold text-foreground capitalize">
              {movement.intensity}
            </p>
          </div>
          <div className="rounded-lg border border-border p-4">
            <p className="text-xs font-semibold text-muted-foreground mb-1">
              Focus
            </p>
            <p className="text-lg font-semibold text-foreground">
              {focusAreaLabel[movement.focusArea]}
            </p>
          </div>
        </div>
      </section>

      {/* Description */}
      <section>
        <h2 className="font-semibold text-foreground mb-3 text-lg">About this movement</h2>
        <p className="text-muted-foreground leading-relaxed">{movement.description}</p>
      </section>

      {/* Exercises */}
      <section aria-labelledby="exercises-heading">
        <h2 id="exercises-heading" className="font-semibold text-foreground mb-4 text-lg">Exercises</h2>
        <div className="space-y-2">
          {movement.exercises.map((exercise, idx) => (
            <button
              key={idx}
              onClick={() =>
                setExpandedExercise(expandedExercise === idx ? null : idx)
              }
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              aria-expanded={expandedExercise === idx}
              aria-controls={`exercise-${idx}`}
            >
              <span className="font-medium text-foreground">{exercise}</span>
              {expandedExercise === idx ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground flex-shrink-0" aria-hidden="true" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" aria-hidden="true" />
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Safety Notes */}
      {movement.safetyNotes.length > 0 && (
        <section className="rounded-lg border border-border bg-muted/30 p-4" aria-labelledby="safety-heading">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h3 id="safety-heading" className="font-semibold text-foreground mb-2">Safety notes</h3>
              <ul className="space-y-2">
                {movement.safetyNotes.map((note, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex gap-2">
                    <span aria-hidden="true" className="flex-shrink-0">•</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Not Feeling It */}
      <div className="border-t border-border pt-8">
        <button
          onClick={() => setNotFeelingIt(true)}
          className="w-full px-4 py-3 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Not feeling it today?
        </button>
      </div>
    </div>
  )
}

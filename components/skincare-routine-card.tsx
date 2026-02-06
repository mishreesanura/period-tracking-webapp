'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { SkincareRoutine } from '@/lib/skincare-types'
import { getFocusTagLabel } from '@/lib/skincare-utils'

interface SkincareRoutineCardProps {
  routine: SkincareRoutine
}

export function SkincareRoutineCard({ routine }: SkincareRoutineCardProps) {
  const [expanded, setExpanded] = useState(false)

  const timingLabel = routine.timing === 'am' ? 'AM Routine' : 'PM Routine'

  return (
    <div className="rounded-lg border border-border bg-card transition-all hover:shadow-sm">
      {/* Card Header - always visible */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-5 sm:p-6"
        aria-expanded={expanded}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
                {timingLabel}
              </span>
              {routine.focusTags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-full bg-muted/60 text-muted-foreground"
                >
                  {getFocusTagLabel(tag)}
                </span>
              ))}
            </div>

            <h3 className="text-lg font-semibold text-foreground mb-1">
              {timingLabel} {'\u2013'} {routine.title}
            </h3>

            <p className="text-sm text-muted-foreground">
              {routine.steps.map((s) => s.name).join(' \u2192 ')}
            </p>

            <p className="text-xs text-muted-foreground mt-2 italic">
              {routine.contextMessage}
            </p>
          </div>

          <ChevronDown
            className={`h-5 w-5 text-muted-foreground flex-shrink-0 mt-1 transition-transform ${
              expanded ? 'rotate-180' : ''
            }`}
          />
        </div>
      </button>

      {/* Expanded Detail View */}
      {expanded && (
        <div className="border-t border-border px-5 sm:px-6 py-5">
          <div className="space-y-4">
            {routine.steps.map((step, index) => (
              <div key={step.name} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
                    {index + 1}
                  </div>
                  {index < routine.steps.length - 1 && (
                    <div className="mt-1 h-full w-px bg-border" />
                  )}
                </div>

                <div className="flex-1 pb-2">
                  <h4 className="text-sm font-semibold text-foreground mb-1">
                    {step.name}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                  {step.productType && (
                    <p className="text-xs text-muted-foreground mt-1.5 italic">
                      Type: {step.productType}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

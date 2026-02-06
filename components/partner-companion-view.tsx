'use client'

import { useState } from 'react'
import { Heart, Clock, Shield as ShieldIcon, Users, HandHelping, Info } from 'lucide-react'
import type { CyclePhase } from '@/lib/cycle-utils'
import { calculateCyclePhase } from '@/lib/cycle-utils'
import {
  getPartnerCycleContext,
  getPartnerMoodContext,
  getPartnerSupportSuggestions,
  getMoodTagLabel,
  getMoodTagColor,
  getSuggestionCategoryLabel,
} from '@/lib/partner-utils'
import type { PartnerConfig } from '@/lib/partner-types'
import type { PartnerSupportSuggestion } from '@/lib/partner-types'

interface PartnerCompanionViewProps {
  config: PartnerConfig
}

function getCategoryIcon(category: PartnerSupportSuggestion['category']) {
  switch (category) {
    case 'patience':
      return <Clock className="h-4 w-4" />
    case 'comfort':
      return <Heart className="h-4 w-4" />
    case 'space':
      return <ShieldIcon className="h-4 w-4" />
    case 'connection':
      return <Users className="h-4 w-4" />
    case 'practical':
      return <HandHelping className="h-4 w-4" />
  }
}

export function PartnerCompanionView({ config }: PartnerCompanionViewProps) {
  const [expandedSuggestion, setExpandedSuggestion] = useState<string | null>(null)

  // Get abstracted cycle context
  const cycleStartDate = new Date()
  cycleStartDate.setDate(cycleStartDate.getDate() - 18)
  const cycleData = calculateCyclePhase(new Date(), cycleStartDate)
  const phase: CyclePhase = cycleData.phase

  const cycleContext = getPartnerCycleContext(phase)
  const moodContext = getPartnerMoodContext(phase)
  const supportSuggestions = getPartnerSupportSuggestions(phase)

  const showCyclePhase = config.sharingScopes.includes('cycle-phase')
  const showMood = config.sharingScopes.includes('energy-mood')
  const showSupport = config.sharingScopes.includes('support-suggestions')

  if (config.hideToday) {
    return (
      <div className="rounded-lg border border-border bg-muted/30 p-8 text-center">
        <ShieldIcon className="h-8 w-8 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">Sharing is paused</h3>
        <p className="text-sm text-muted-foreground text-pretty max-w-md mx-auto">
          Your partner has chosen to pause sharing for now. This is completely normal and healthy. Being supportive means respecting this.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Companion View Header */}
      <div className="rounded-lg border border-border bg-muted/30 p-5">
        <div className="flex items-center gap-2 mb-2">
          <Info className="h-4 w-4 text-muted-foreground" />
          <p className="text-xs text-muted-foreground font-medium">Companion View</p>
        </div>
        <p className="text-sm text-muted-foreground text-pretty">
          This is a preview of what {config.partnerName || 'your partner'} would see. Information is abstracted and never includes private health data.
        </p>
      </div>

      {/* Cycle Phase Awareness */}
      {showCyclePhase && (
        <div className="rounded-lg border border-border bg-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-3">Current Phase</h3>
          <p className="text-lg font-bold text-foreground mb-2">{cycleContext.phaseLabel}</p>
          <p className="text-sm text-muted-foreground text-pretty">{cycleContext.phaseDescription}</p>
        </div>
      )}

      {/* Energy & Mood Context */}
      {showMood && (
        <div className="rounded-lg border border-border bg-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-3">How They May Be Feeling</h3>
          <div className="flex flex-wrap gap-2">
            {moodContext.tags.map((tag) => (
              <span
                key={tag}
                className={`text-xs font-medium px-3 py-1.5 rounded-full border ${getMoodTagColor(tag)}`}
              >
                {getMoodTagLabel(tag)}
              </span>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            These are general indicators, not a diagnosis. Everyone experiences their cycle differently.
          </p>
        </div>
      )}

      {/* Support Suggestions */}
      {showSupport && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground">How You Can Help</h3>
          {supportSuggestions.map((suggestion) => (
            <button
              key={suggestion.id}
              onClick={() =>
                setExpandedSuggestion(expandedSuggestion === suggestion.id ? null : suggestion.id)
              }
              className="w-full text-left rounded-lg border border-border bg-card p-4 hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted flex-shrink-0 mt-0.5 text-muted-foreground">
                  {getCategoryIcon(suggestion.category)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-muted-foreground">
                      {getSuggestionCategoryLabel(suggestion.category)}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-foreground text-pretty">
                    {suggestion.message}
                  </p>
                  {expandedSuggestion === suggestion.id && (
                    <p className="text-xs text-muted-foreground mt-2 text-pretty">
                      {suggestion.context}
                    </p>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* No scopes enabled */}
      {!showCyclePhase && !showMood && !showSupport && (
        <div className="rounded-lg border border-border bg-muted/30 p-8 text-center">
          <p className="text-sm text-muted-foreground">
            No sharing scopes are currently enabled. Enable at least one option in partner settings.
          </p>
        </div>
      )}
    </div>
  )
}

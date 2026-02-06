'use client'

import { useState } from 'react'
import { ThumbsUp, ThumbsDown, ChevronDown } from 'lucide-react'
import type { CareSuggestion, CareFeedback } from '@/lib/care-types'
import { getCategoryColor, getCategoryLabel } from '@/lib/care-utils'

interface CareSuggestionCardProps {
  suggestion: CareSuggestion
  onFeedback?: (feedback: CareFeedback) => void
  compact?: boolean
}

export function CareSuggestionCard({
  suggestion,
  onFeedback,
  compact = false,
}: CareSuggestionCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [feedback, setFeedback] = useState<boolean | null>(null)
  const [feedbackReason, setFeedbackReason] = useState<
    'not-relevant' | 'too-basic' | 'dont-want-category' | null
  >(null)

  const categoryColor = getCategoryColor(suggestion.category)
  const categoryLabel = getCategoryLabel(suggestion.category)

  const handleFeedback = (helpful: boolean) => {
    setFeedback(helpful)
    if (helpful) {
      onFeedback?.({
        suggestionId: suggestion.id,
        helpful: true,
      })
    }
  }

  const handleNegativeFeedback = (
    reason: 'not-relevant' | 'too-basic' | 'dont-want-category',
  ) => {
    setFeedbackReason(reason)
    onFeedback?.({
      suggestionId: suggestion.id,
      helpful: false,
      reason,
    })
    setFeedback(false)
  }

  if (feedback === false && feedbackReason) {
    return (
      <div
        className={`rounded-lg border border-border bg-muted/30 p-4 ${
          compact ? 'text-sm' : ''
        }`}
      >
        <p className="text-muted-foreground mb-2">
          Thanks for letting us know.
        </p>
        <button
          onClick={() => {
            setFeedback(null)
            setFeedbackReason(null)
          }}
          className="text-xs text-primary hover:underline"
        >
          Show suggestion
        </button>
      </div>
    )
  }

  return (
    <div
      className={`rounded-lg border border-border bg-card p-4 sm:p-6 transition-all hover:shadow-sm ${
        compact ? 'text-sm' : ''
      }`}
    >
      {/* Category badge */}
      <div className="mb-3 inline-block">
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-medium ${categoryColor}`}
        >
          {categoryLabel}
        </span>
      </div>

      {/* Empathy line */}
      <p className="text-muted-foreground text-sm mb-3 italic">
        {suggestion.empathy}
      </p>

      {/* Main suggestion */}
      <p className={`text-foreground font-medium mb-4 ${
        compact ? '' : 'text-lg'
      }`}>
        {suggestion.suggestion}
      </p>

      {/* Expandable reason */}
      <div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors mb-3"
        >
          <span>Why this?</span>
          <ChevronDown
            className={`h-3 w-3 transition-transform ${
              expanded ? 'rotate-180' : ''
            }`}
          />
        </button>

        {expanded && (
          <p className="text-xs text-muted-foreground mb-4 pl-2 border-l border-border">
            {suggestion.reason}
          </p>
        )}
      </div>

      {/* Feedback buttons */}
      {feedback === null && (
        <div className="flex items-center gap-2 pt-2">
          <button
            onClick={() => handleFeedback(true)}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            title="This suggestion is helpful"
          >
            <ThumbsUp className="h-4 w-4" />
            <span className="hidden sm:inline">Helpful</span>
          </button>
          <button
            onClick={() => handleFeedback(false)}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors"
            title="Not for me"
          >
            <ThumbsDown className="h-4 w-4" />
            <span className="hidden sm:inline">Not for me</span>
          </button>
        </div>
      )}

      {/* Negative feedback reason selection */}
      {feedback === false && !feedbackReason && (
        <div className="border-t border-border pt-3 mt-3 space-y-2">
          <p className="text-xs text-muted-foreground font-medium">
            Help us improve:
          </p>
          <div className="space-y-2">
            <button
              onClick={() => handleNegativeFeedback('not-relevant')}
              className="block w-full text-left text-xs px-3 py-2 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            >
              Not relevant to me
            </button>
            <button
              onClick={() => handleNegativeFeedback('too-basic')}
              className="block w-full text-left text-xs px-3 py-2 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            >
              Too basic
            </button>
            <button
              onClick={() =>
                handleNegativeFeedback('dont-want-category')
              }
              className="block w-full text-left text-xs px-3 py-2 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            >
              Don't want this type
            </button>
          </div>
        </div>
      )}

      {/* Positive feedback confirmation */}
      {feedback === true && (
        <div className="border-t border-border pt-3 mt-3">
          <p className="text-xs text-muted-foreground">
            We'll remember that.
          </p>
        </div>
      )}
    </div>
  )
}

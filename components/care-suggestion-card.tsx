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
        className={`rounded-lg border border-neutral-200 bg-neutral-50 p-4 ${
          compact ? 'text-[14px]' : ''
        }`}
      >
        <p className="text-neutral-black/60 mb-2">
          Thanks for letting us know.
        </p>
        <button
          onClick={() => {
            setFeedback(null)
            setFeedbackReason(null)
          }}
          className="text-[12px] text-brand-pink hover:underline"
        >
          Show suggestion
        </button>
      </div>
    )
  }

  return (
    <div
      className={`rounded-lg border border-neutral-200 bg-neutral-white p-4 sm:p-6 transition-all hover:shadow-sm ${
        compact ? 'text-[14px]' : ''
      }`}
    >
      {/* Category badge */}
      <div className="mb-3 inline-block">
        <span
          className={`px-2.5 py-1 rounded-full text-[12px] font-medium ${categoryColor}`}
        >
          {categoryLabel}
        </span>
      </div>

      {/* Empathy line */}
      <p className="text-neutral-black/60 text-[14px] mb-3 italic">
        {suggestion.empathy}
      </p>

      {/* Main suggestion */}
      <p className={`text-neutral-black font-medium mb-4 ${
        compact ? '' : 'text-[18px]'
      }`}>
        {suggestion.suggestion}
      </p>

      {/* Expandable reason */}
      <div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-[12px] text-neutral-black/60 hover:text-neutral-black transition-colors mb-3"
        >
          <span>Why this?</span>
          <ChevronDown
            className={`h-3 w-3 transition-transform ${
              expanded ? 'rotate-180' : ''
            }`}
          />
        </button>

        {expanded && (
          <p className="text-[12px] text-neutral-black/60 mb-4 pl-2 border-l border-neutral-200">
            {suggestion.reason}
          </p>
        )}
      </div>

      {/* Feedback buttons */}
      {feedback === null && (
        <div className="flex items-center gap-2 pt-2">
          <button
            onClick={() => handleFeedback(true)}
            className="flex items-center gap-1 text-[12px] text-neutral-black/60 hover:text-neutral-black transition-colors"
            title="This suggestion is helpful"
          >
            <ThumbsUp className="h-4 w-4" />
            <span className="hidden sm:inline">Helpful</span>
          </button>
          <button
            onClick={() => handleFeedback(false)}
            className="flex items-center gap-1 text-[12px] text-neutral-black/60 hover:text-status-error transition-colors"
            title="Not for me"
          >
            <ThumbsDown className="h-4 w-4" />
            <span className="hidden sm:inline">Not for me</span>
          </button>
        </div>
      )}

      {/* Negative feedback reason selection */}
      {feedback === false && !feedbackReason && (
        <div className="border-t border-neutral-200 pt-3 mt-3 space-y-2">
          <p className="text-[12px] text-neutral-black/60 font-medium">
            Help us improve:
          </p>
          <div className="space-y-2">
            <button
              onClick={() => handleNegativeFeedback('not-relevant')}
              className="block w-full text-left text-[12px] px-3 py-2 rounded hover:bg-neutral-50 transition-colors text-neutral-black/60 hover:text-neutral-black"
            >
              Not relevant to me
            </button>
            <button
              onClick={() => handleNegativeFeedback('too-basic')}
              className="block w-full text-left text-[12px] px-3 py-2 rounded hover:bg-neutral-50 transition-colors text-neutral-black/60 hover:text-neutral-black"
            >
              Too basic
            </button>
            <button
              onClick={() =>
                handleNegativeFeedback('dont-want-category')
              }
              className="block w-full text-left text-[12px] px-3 py-2 rounded hover:bg-neutral-50 transition-colors text-neutral-black/60 hover:text-neutral-black"
            >
              Don't want this type
            </button>
          </div>
        </div>
      )}

      {/* Positive feedback confirmation */}
      {feedback === true && (
        <div className="border-t border-neutral-200 pt-3 mt-3">
          <p className="text-[12px] text-neutral-black/60">
            We'll remember that.
          </p>
        </div>
      )}
    </div>
  )
}

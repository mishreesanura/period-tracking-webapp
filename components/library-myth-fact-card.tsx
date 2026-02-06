'use client'

import { useState } from 'react'
import { Bookmark, BookmarkCheck, ThumbsUp, ChevronDown, X, Check } from 'lucide-react'
import type { MythFact } from '@/lib/library-types'

interface LibraryMythFactCardProps {
  mythFact: MythFact
}

export function LibraryMythFactCard({ mythFact }: LibraryMythFactCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [saved, setSaved] = useState(false)
  const [helpful, setHelpful] = useState(false)

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden transition-all hover:shadow-sm">
      {/* Myth section */}
      <div className="p-5 sm:p-6 bg-rose-50/50">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex-shrink-0 h-5 w-5 rounded-full bg-rose-100 flex items-center justify-center">
            <X className="h-3 w-3 text-rose-600" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-rose-600 mb-1">Myth</p>
            <p className="text-foreground font-medium leading-relaxed">{mythFact.myth}</p>
          </div>
        </div>
      </div>

      {/* Fact section */}
      <div className="p-5 sm:p-6 bg-emerald-50/50">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex-shrink-0 h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center">
            <Check className="h-3 w-3 text-emerald-600" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600 mb-1">Fact</p>
            <p className="text-foreground leading-relaxed">{mythFact.fact}</p>
          </div>
        </div>
      </div>

      {/* Why this myth exists + actions */}
      <div className="p-5 sm:p-6">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors mb-3"
        >
          <span>Why this myth exists</span>
          <ChevronDown className={`h-3 w-3 transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </button>

        {expanded && (
          <p className="text-sm text-muted-foreground mb-4 pl-3 border-l-2 border-border leading-relaxed">
            {mythFact.whyMythExists}
          </p>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2 border-t border-border">
          <button
            onClick={() => setHelpful(!helpful)}
            className={`flex items-center gap-1.5 text-xs transition-colors ${
              helpful ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <ThumbsUp className={`h-3.5 w-3.5 ${helpful ? 'fill-current' : ''}`} />
            <span>{helpful ? 'Helpful' : 'That was helpful'}</span>
          </button>

          <button
            onClick={() => setSaved(!saved)}
            className={`flex items-center gap-1.5 text-xs transition-colors ${
              saved ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {saved ? (
              <BookmarkCheck className="h-3.5 w-3.5 fill-current" />
            ) : (
              <Bookmark className="h-3.5 w-3.5" />
            )}
            <span>{saved ? 'Saved' : 'Save for later'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

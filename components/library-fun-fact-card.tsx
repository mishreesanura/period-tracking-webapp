'use client'

import { useState } from 'react'
import { Bookmark, BookmarkCheck, ThumbsUp } from 'lucide-react'
import type { FunFact } from '@/lib/library-types'
import { getCategoryColor, getCategoryLabel } from '@/lib/library-utils'

interface LibraryFunFactCardProps {
  fact: FunFact
}

export function LibraryFunFactCard({ fact }: LibraryFunFactCardProps) {
  const [saved, setSaved] = useState(false)
  const [helpful, setHelpful] = useState(false)
  const colors = getCategoryColor(fact.category)

  return (
    <div className="rounded-lg border border-border bg-card p-5 sm:p-6 transition-all hover:shadow-sm">
      {/* Category badge */}
      <div className="mb-4 inline-block">
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}>
          {getCategoryLabel(fact.category)}
        </span>
      </div>

      {/* Header */}
      <p className="text-sm font-medium text-muted-foreground mb-2">Did you know?</p>

      {/* Fact text */}
      <p className="text-foreground text-base leading-relaxed mb-5">{fact.text}</p>

      {/* Source */}
      {fact.source && (
        <p className="text-xs text-muted-foreground mb-4 italic">{fact.source}</p>
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
  )
}

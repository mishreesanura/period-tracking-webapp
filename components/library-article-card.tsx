'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Clock, ArrowRight, Bookmark, BookmarkCheck } from 'lucide-react'
import type { Article } from '@/lib/library-types'
import { getCategoryColor, getCategoryLabel } from '@/lib/library-utils'

interface LibraryArticleCardProps {
  article: Article
}

export function LibraryArticleCard({ article }: LibraryArticleCardProps) {
  const [saved, setSaved] = useState(false)
  const colors = getCategoryColor(article.category)

  return (
    <div className="group rounded-lg border border-border bg-card p-5 sm:p-6 transition-all hover:shadow-sm hover:border-primary/30">
      {/* Top row: category + save */}
      <div className="flex items-center justify-between mb-3">
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}>
          {getCategoryLabel(article.category)}
        </span>
        <button
          onClick={(e) => {
            e.preventDefault()
            setSaved(!saved)
          }}
          className={`flex-shrink-0 p-1.5 rounded-md transition-colors ${
            saved ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
          }`}
          aria-label={saved ? 'Remove from saved' : 'Save for later'}
        >
          {saved ? (
            <BookmarkCheck className="h-4 w-4 fill-current" />
          ) : (
            <Bookmark className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-foreground mb-1 text-pretty">{article.title}</h3>
      <p className="text-sm text-muted-foreground mb-4 text-pretty">{article.subtitle}</p>

      {/* Pull quote preview */}
      {article.pullQuote && (
        <p className="text-sm text-muted-foreground italic mb-4 pl-3 border-l-2 border-border line-clamp-2">
          {article.pullQuote}
        </p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          <span>{article.readTimeMinutes} min read</span>
        </div>
        <Link
          href={`/learn/${article.slug}`}
          className="flex items-center gap-1.5 text-sm font-medium text-primary hover:gap-2.5 transition-all"
        >
          Read more
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  )
}

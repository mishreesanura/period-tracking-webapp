'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, Clock, Bookmark, BookmarkCheck, ThumbsUp } from 'lucide-react'
import type { Article } from '@/lib/library-types'
import { getCategoryColor, getCategoryLabel } from '@/lib/library-utils'

interface LibraryArticleViewProps {
  article: Article
}

export function LibraryArticleView({ article }: LibraryArticleViewProps) {
  const [saved, setSaved] = useState(false)
  const [helpful, setHelpful] = useState(false)
  const colors = getCategoryColor(article.category)

  return (
    <article className="mx-auto max-w-2xl">
      {/* Back navigation */}
      <Link
        href="/learn"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to Library
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}>
            {getCategoryLabel(article.category)}
          </span>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            <span>{article.readTimeMinutes} min read</span>
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 text-balance">
          {article.title}
        </h1>
        <p className="text-lg text-muted-foreground text-pretty">{article.subtitle}</p>
      </div>

      {/* Pull quote */}
      {article.pullQuote && (
        <blockquote className="mb-8 pl-4 sm:pl-6 border-l-4 border-primary/20 py-2">
          <p className="text-lg italic text-foreground/80 leading-relaxed text-pretty">
            {article.pullQuote}
          </p>
        </blockquote>
      )}

      {/* Sections */}
      <div className="space-y-6 mb-10">
        {article.sections.map((section, index) => (
          <div key={index}>
            {section.heading && (
              <h2 className="text-xl font-semibold text-foreground mb-2">{section.heading}</h2>
            )}
            <p className="text-foreground/85 leading-relaxed">{section.body}</p>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 py-4 border-t border-b border-border mb-8">
        <button
          onClick={() => setHelpful(!helpful)}
          className={`flex items-center gap-2 text-sm transition-colors ${
            helpful ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <ThumbsUp className={`h-4 w-4 ${helpful ? 'fill-current' : ''}`} />
          <span>{helpful ? 'You found this helpful' : 'That was helpful'}</span>
        </button>

        <button
          onClick={() => setSaved(!saved)}
          className={`flex items-center gap-2 text-sm transition-colors ${
            saved ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {saved ? (
            <BookmarkCheck className="h-4 w-4 fill-current" />
          ) : (
            <Bookmark className="h-4 w-4" />
          )}
          <span>{saved ? 'Saved' : 'Save for later'}</span>
        </button>
      </div>

      {/* Disclaimer */}
      <div className="rounded-lg bg-muted/40 border border-border p-4 mb-8">
        <p className="text-xs text-muted-foreground leading-relaxed">
          This content is for educational purposes and is not a substitute for medical advice. If pain is severe or affecting daily life, a healthcare professional can help.
        </p>
      </div>

      {/* Back to library */}
      <Link
        href="/learn"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to Library
      </Link>
    </article>
  )
}

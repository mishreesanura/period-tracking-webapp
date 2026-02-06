'use client'

import { useState } from 'react'
import { ChevronLeft, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  getPartnerEducationArticles,
  getEducationCategoryLabel,
  getEducationCategoryColor,
} from '@/lib/partner-utils'
import type { PartnerEducationArticle } from '@/lib/partner-types'

export function PartnerEducation() {
  const [selectedArticle, setSelectedArticle] = useState<PartnerEducationArticle | null>(null)
  const articles = getPartnerEducationArticles()

  if (selectedArticle) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => setSelectedArticle(null)}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to articles
        </button>

        <div>
          <span className={`inline-block text-xs font-medium px-2.5 py-0.5 rounded-full border mb-3 ${getEducationCategoryColor(selectedArticle.category)}`}>
            {getEducationCategoryLabel(selectedArticle.category)}
          </span>
          <h2 className="text-2xl font-bold text-foreground mb-2 text-balance">
            {selectedArticle.title}
          </h2>
          <p className="text-sm text-muted-foreground mb-6">{selectedArticle.summary}</p>
        </div>

        <div className="space-y-4">
          {selectedArticle.content.map((paragraph, i) => (
            <p key={i} className="text-sm text-foreground leading-relaxed text-pretty">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="rounded-lg border border-border bg-muted/30 p-4 mt-8">
          <p className="text-xs text-muted-foreground text-pretty">
            This content is educational, not medical advice. Every person experiences their cycle differently. The goal is understanding, not expertise.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="h-5 w-5 text-foreground" />
          <h2 className="text-xl font-bold text-foreground">Partner Learn</h2>
        </div>
        <p className="text-sm text-muted-foreground text-pretty">
          Simple, honest articles to help you understand and support your partner better. No medical jargon, no blame.
        </p>
      </div>

      <div className="space-y-3">
        {articles.map((article) => (
          <button
            key={article.id}
            onClick={() => setSelectedArticle(article)}
            className="w-full text-left rounded-lg border border-border bg-card p-5 hover:bg-muted/30 transition-colors"
          >
            <span className={`inline-block text-xs font-medium px-2.5 py-0.5 rounded-full border mb-3 ${getEducationCategoryColor(article.category)}`}>
              {getEducationCategoryLabel(article.category)}
            </span>
            <h3 className="text-sm font-semibold text-foreground mb-1 text-balance">
              {article.title}
            </h3>
            <p className="text-xs text-muted-foreground text-pretty">
              {article.summary}
            </p>
          </button>
        ))}
      </div>

      {/* Tone note */}
      <div className="rounded-lg border border-border bg-muted/30 p-4">
        <p className="text-xs text-muted-foreground text-pretty">
          Mood changes are not personal -- they are physiological and emotional shifts. These articles are here to build understanding, not assign blame.
        </p>
      </div>
    </div>
  )
}

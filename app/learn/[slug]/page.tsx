'use client'

import { use } from 'react'
import { notFound } from 'next/navigation'
import { getArticleBySlug } from '@/lib/library-utils'
import { LibraryArticleView } from '@/components/library-article-view'

export default function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const article = getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <LibraryArticleView article={article} />
      </div>
    </main>
  )
}

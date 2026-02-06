'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, Lightbulb } from 'lucide-react'
import type { LibraryCategory } from '@/lib/library-types'
import {
  getAllFunFacts,
  getAllMythFacts,
  getAllArticles,
  filterByCategory,
  filterByCycleRelevance,
  searchLibrary,
  mapCyclePhaseToRelevance,
  allCategories,
  getSuggestedFunFacts,
} from '@/lib/library-utils'
import { calculateCyclePhase } from '@/lib/cycle-utils'
import { LibraryCategoryTabs } from '@/components/library-category-tabs'
import { LibrarySearch } from '@/components/library-search'
import { LibraryFunFactCard } from '@/components/library-fun-fact-card'
import { LibraryMythFactCard } from '@/components/library-myth-fact-card'
import { LibraryArticleCard } from '@/components/library-article-card'

type ViewTab = 'discover' | 'fun-facts' | 'myths' | 'articles'

export default function LearnPage() {
  const [viewTab, setViewTab] = useState<ViewTab>('discover')
  const [activeCategory, setActiveCategory] = useState<LibraryCategory | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [cycleRelevance, setCycleRelevance] = useState<ReturnType<typeof mapCyclePhaseToRelevance>>('all')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cycleStartDate')
      if (saved) {
        const cycleStart = new Date(saved)
        const cycleData = calculateCyclePhase(new Date(), cycleStart)
        setCycleRelevance(mapCyclePhaseToRelevance(cycleData.phase))
      }
    }
  }, [])

  const allFunFacts = getAllFunFacts()
  const allMyths = getAllMythFacts()
  const allArticles = getAllArticles()

  // Search results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null
    return searchLibrary(searchQuery)
  }, [searchQuery])

  // Filtered content
  const filteredFunFacts = useMemo(() => {
    let items = allFunFacts
    if (activeCategory !== 'all') items = filterByCategory(items, activeCategory)
    return items
  }, [allFunFacts, activeCategory])

  const filteredMyths = useMemo(() => {
    let items = allMyths
    if (activeCategory !== 'all') items = filterByCategory(items, activeCategory)
    return items
  }, [allMyths, activeCategory])

  const filteredArticles = useMemo(() => {
    let items = allArticles
    if (activeCategory !== 'all') items = filterByCategory(items, activeCategory)
    return items
  }, [allArticles, activeCategory])

  // Suggested content for discover tab
  const suggestedFacts = useMemo(() => getSuggestedFunFacts(cycleRelevance, 3), [cycleRelevance])
  const suggestedArticles = useMemo(
    () => filterByCycleRelevance(allArticles, cycleRelevance).slice(0, 3),
    [allArticles, cycleRelevance],
  )
  const suggestedMyths = useMemo(
    () => filterByCycleRelevance(allMyths, cycleRelevance).slice(0, 2),
    [allMyths, cycleRelevance],
  )

  const viewTabs: { key: ViewTab; label: string }[] = [
    { key: 'discover', label: 'Discover' },
    { key: 'fun-facts', label: 'Fun Facts' },
    { key: 'myths', label: 'Myths vs Facts' },
    { key: 'articles', label: 'Articles' },
  ]

  const isSearching = !!searchQuery.trim()

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Learn
          </h1>
          <p className="text-muted-foreground text-pretty">
            Friendly, shame-free menstrual health education. Explore at your own pace, no pressure.
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <LibrarySearch query={searchQuery} onQueryChange={setSearchQuery} />
        </div>

        {/* Search results mode */}
        {isSearching && searchResults && (
          <div className="space-y-8 mb-12">
            {searchResults.funFacts.length === 0 &&
              searchResults.mythFacts.length === 0 &&
              searchResults.articles.length === 0 && (
                <div className="rounded-lg border border-border bg-muted/30 p-8 text-center">
                  <p className="text-muted-foreground">
                    {'No results found for "'}{searchQuery}{'". Try a different term.'}
                  </p>
                </div>
              )}

            {searchResults.funFacts.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-4">Fun Facts</h2>
                <div className="space-y-4">
                  {searchResults.funFacts.map((fact) => (
                    <LibraryFunFactCard key={fact.id} fact={fact} />
                  ))}
                </div>
              </div>
            )}

            {searchResults.mythFacts.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-4">Myths vs Facts</h2>
                <div className="space-y-4">
                  {searchResults.mythFacts.map((mf) => (
                    <LibraryMythFactCard key={mf.id} mythFact={mf} />
                  ))}
                </div>
              </div>
            )}

            {searchResults.articles.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-4">Articles</h2>
                <div className="space-y-4">
                  {searchResults.articles.map((article) => (
                    <LibraryArticleCard key={article.id} article={article} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Normal browsing mode */}
        {!isSearching && (
          <>
            {/* View tabs */}
            <div className="flex gap-1 mb-6 p-1 rounded-lg bg-muted/50 border border-border">
              {viewTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => {
                    setViewTab(tab.key)
                    setActiveCategory('all')
                  }}
                  className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewTab === tab.key
                      ? 'bg-card text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* DISCOVER TAB */}
            {viewTab === 'discover' && (
              <div className="space-y-10">
                {/* Phase-aware spotlight */}
                <div className="rounded-lg border border-border bg-muted/20 p-5 sm:p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="flex-shrink-0 p-2 rounded-lg bg-amber-50">
                      <Lightbulb className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-foreground mb-0.5">Picked for you</h2>
                      <p className="text-sm text-muted-foreground">
                        Based on where you are in your cycle right now.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {suggestedFacts.map((fact) => (
                      <LibraryFunFactCard key={fact.id} fact={fact} />
                    ))}
                  </div>
                </div>

                {/* Myth-busting section */}
                {suggestedMyths.length > 0 && (
                  <div>
                    <h2 className="text-lg font-semibold text-foreground mb-1">Worth knowing</h2>
                    <p className="text-sm text-muted-foreground mb-4">
                      Common myths, gently corrected.
                    </p>
                    <div className="space-y-4">
                      {suggestedMyths.map((mf) => (
                        <LibraryMythFactCard key={mf.id} mythFact={mf} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Suggested reads */}
                {suggestedArticles.length > 0 && (
                  <div>
                    <h2 className="text-lg font-semibold text-foreground mb-1">If you are curious</h2>
                    <p className="text-sm text-muted-foreground mb-4">
                      Short reads that explain what is going on in your body.
                    </p>
                    <div className="space-y-4">
                      {suggestedArticles.map((article) => (
                        <LibraryArticleCard key={article.id} article={article} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* FUN FACTS TAB */}
            {viewTab === 'fun-facts' && (
              <div>
                <div className="mb-6">
                  <LibraryCategoryTabs
                    categories={allCategories}
                    activeCategory={activeCategory}
                    onSelect={setActiveCategory}
                  />
                </div>
                {filteredFunFacts.length > 0 ? (
                  <div className="space-y-4">
                    {filteredFunFacts.map((fact) => (
                      <LibraryFunFactCard key={fact.id} fact={fact} />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-lg border border-border bg-muted/30 p-8 text-center">
                    <p className="text-muted-foreground">No fun facts in this category yet.</p>
                  </div>
                )}
              </div>
            )}

            {/* MYTHS VS FACTS TAB */}
            {viewTab === 'myths' && (
              <div>
                <div className="mb-6">
                  <LibraryCategoryTabs
                    categories={allCategories}
                    activeCategory={activeCategory}
                    onSelect={setActiveCategory}
                  />
                </div>
                {filteredMyths.length > 0 ? (
                  <div className="space-y-4">
                    {filteredMyths.map((mf) => (
                      <LibraryMythFactCard key={mf.id} mythFact={mf} />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-lg border border-border bg-muted/30 p-8 text-center">
                    <p className="text-muted-foreground">No myth cards in this category yet.</p>
                  </div>
                )}
              </div>
            )}

            {/* ARTICLES TAB */}
            {viewTab === 'articles' && (
              <div>
                <div className="mb-6">
                  <LibraryCategoryTabs
                    categories={allCategories}
                    activeCategory={activeCategory}
                    onSelect={setActiveCategory}
                  />
                </div>
                {filteredArticles.length > 0 ? (
                  <div className="space-y-4">
                    {filteredArticles.map((article) => (
                      <LibraryArticleCard key={article.id} article={article} />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-lg border border-border bg-muted/30 p-8 text-center">
                    <p className="text-muted-foreground">No articles in this category yet.</p>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* Disclaimer */}
        <div className="mt-12 rounded-lg bg-muted/30 border border-border p-5">
          <p className="text-xs text-muted-foreground leading-relaxed">
            This content is for educational purposes and is not a substitute for medical advice. If pain is severe or affecting daily life, a healthcare professional can help.
          </p>
        </div>
      </div>
    </main>
  )
}

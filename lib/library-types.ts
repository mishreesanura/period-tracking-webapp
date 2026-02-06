export type LibraryCategory =
  | 'period-basics'
  | 'cycle-phases'
  | 'pms-mood-emotions'
  | 'skin-hair'
  | 'exercise-energy'
  | 'food-cravings'
  | 'myths-facts'
  | 'fun-facts'

export type ContentType = 'fun-fact' | 'myth-fact' | 'article'

export type CycleRelevance = 'period' | 'follicular' | 'ovulation' | 'luteal' | 'all'

export interface FunFact {
  id: string
  category: LibraryCategory
  text: string
  source?: string
  cycleRelevance: CycleRelevance[]
  tags: string[]
}

export interface MythFact {
  id: string
  category: LibraryCategory
  myth: string
  fact: string
  whyMythExists: string
  cycleRelevance: CycleRelevance[]
  tags: string[]
}

export interface Article {
  id: string
  slug: string
  category: LibraryCategory
  title: string
  subtitle: string
  readTimeMinutes: number
  sections: ArticleSection[]
  pullQuote?: string
  cycleRelevance: CycleRelevance[]
  tags: string[]
}

export interface ArticleSection {
  heading?: string
  body: string
}

export interface LibrarySavedItem {
  contentId: string
  contentType: ContentType
  savedAt: Date
}

export interface LibraryReaction {
  contentId: string
  contentType: ContentType
  helpful: boolean
}

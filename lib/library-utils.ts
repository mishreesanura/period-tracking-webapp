import type { LibraryCategory, CycleRelevance, FunFact, MythFact, Article } from './library-types'
import { funFacts, mythFacts, articles } from './library-content'

// ─────────────────────────────────────────────
// CATEGORY DISPLAY
// ─────────────────────────────────────────────
export function getCategoryLabel(category: LibraryCategory): string {
  const labels: Record<LibraryCategory, string> = {
    'period-basics': 'Period Basics',
    'cycle-phases': 'Cycle Phases',
    'pms-mood-emotions': 'PMS, Mood & Emotions',
    'skin-hair': 'Skin & Hair',
    'exercise-energy': 'Exercise & Energy',
    'food-cravings': 'Food & Cravings',
    'myths-facts': 'Myths vs Facts',
    'fun-facts': 'Fun Facts',
  }
  return labels[category]
}

export function getCategoryColor(category: LibraryCategory): { bg: string; text: string; border: string } {
  const colors: Record<LibraryCategory, { bg: string; text: string; border: string }> = {
    'period-basics': { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' },
    'cycle-phases': { bg: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-200' },
    'pms-mood-emotions': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
    'skin-hair': { bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-200' },
    'exercise-energy': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
    'food-cravings': { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
    'myths-facts': { bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-200' },
    'fun-facts': { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200' },
  }
  return colors[category]
}

export function getCategoryIcon(category: LibraryCategory): string {
  const icons: Record<LibraryCategory, string> = {
    'period-basics': 'circle',
    'cycle-phases': 'refresh',
    'pms-mood-emotions': 'heart',
    'skin-hair': 'sparkles',
    'exercise-energy': 'zap',
    'food-cravings': 'coffee',
    'myths-facts': 'search',
    'fun-facts': 'lightbulb',
  }
  return icons[category]
}

// ─────────────────────────────────────────────
// CYCLE-PHASE MAPPING
// ─────────────────────────────────────────────
export function mapCyclePhaseToRelevance(phase: string): CycleRelevance {
  const mapping: Record<string, CycleRelevance> = {
    period: 'period',
    spotting: 'period',
    follicular: 'follicular',
    ovulation: 'ovulation',
    luteal: 'luteal',
    pms: 'luteal',
    'no-data': 'all',
  }
  return mapping[phase] || 'all'
}

// ─────────────────────────────────────────────
// CONTENT RETRIEVAL
// ─────────────────────────────────────────────
export function getAllFunFacts(): FunFact[] {
  return funFacts
}

export function getAllMythFacts(): MythFact[] {
  return mythFacts
}

export function getAllArticles(): Article[] {
  return articles
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}

// ─────────────────────────────────────────────
// FILTERING
// ─────────────────────────────────────────────
export function filterByCategory<T extends { category: LibraryCategory }>(
  items: T[],
  category: LibraryCategory,
): T[] {
  return items.filter((item) => item.category === category)
}

export function filterByCycleRelevance<T extends { cycleRelevance: CycleRelevance[] }>(
  items: T[],
  relevance: CycleRelevance,
): T[] {
  return items.filter(
    (item) => item.cycleRelevance.includes(relevance) || item.cycleRelevance.includes('all'),
  )
}

// ─────────────────────────────────────────────
// CYCLE-AWARE SURFACING
// ─────────────────────────────────────────────
export function getSuggestedFunFacts(cyclePhase: CycleRelevance, count: number = 3): FunFact[] {
  const relevant = filterByCycleRelevance(funFacts, cyclePhase)
  return shuffleArray(relevant).slice(0, count)
}

export function getSuggestedMythFacts(cyclePhase: CycleRelevance, count: number = 2): MythFact[] {
  const relevant = filterByCycleRelevance(mythFacts, cyclePhase)
  return shuffleArray(relevant).slice(0, count)
}

export function getSuggestedArticles(cyclePhase: CycleRelevance, count: number = 3): Article[] {
  const relevant = filterByCycleRelevance(articles, cyclePhase)
  return shuffleArray(relevant).slice(0, count)
}

// ─────────────────────────────────────────────
// SEARCH
// ─────────────────────────────────────────────
export function searchLibrary(query: string): {
  funFacts: FunFact[]
  mythFacts: MythFact[]
  articles: Article[]
} {
  const q = query.toLowerCase().trim()
  if (!q) return { funFacts: [], mythFacts: [], articles: [] }

  return {
    funFacts: funFacts.filter(
      (ff) => ff.text.toLowerCase().includes(q) || ff.tags.some((t) => t.includes(q)),
    ),
    mythFacts: mythFacts.filter(
      (mf) =>
        mf.myth.toLowerCase().includes(q) ||
        mf.fact.toLowerCase().includes(q) ||
        mf.tags.some((t) => t.includes(q)),
    ),
    articles: articles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.subtitle.toLowerCase().includes(q) ||
        a.tags.some((t) => t.includes(q)),
    ),
  }
}

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export const allCategories: LibraryCategory[] = [
  'period-basics',
  'cycle-phases',
  'pms-mood-emotions',
  'skin-hair',
  'exercise-energy',
  'food-cravings',
  'myths-facts',
  'fun-facts',
]

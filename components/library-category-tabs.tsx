'use client'

import type { LibraryCategory } from '@/lib/library-types'
import { getCategoryLabel, getCategoryColor } from '@/lib/library-utils'

interface LibraryCategoryTabsProps {
  categories: LibraryCategory[]
  activeCategory: LibraryCategory | 'all'
  onSelect: (category: LibraryCategory | 'all') => void
}

export function LibraryCategoryTabs({ categories, activeCategory, onSelect }: LibraryCategoryTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect('all')}
        className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
          activeCategory === 'all'
            ? 'bg-foreground text-background border-foreground'
            : 'bg-card text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground'
        }`}
      >
        All
      </button>
      {categories.map((category) => {
        const colors = getCategoryColor(category)
        const isActive = activeCategory === category
        return (
          <button
            key={category}
            onClick={() => onSelect(category)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              isActive
                ? `${colors.bg} ${colors.text} ${colors.border}`
                : 'bg-card text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground'
            }`}
          >
            {getCategoryLabel(category)}
          </button>
        )
      })}
    </div>
  )
}

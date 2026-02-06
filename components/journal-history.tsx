'use client'

import React from 'react'
import { Archive } from 'lucide-react'
import type { JournalEntry } from '@/lib/journal-types'
import { MoodTag } from './mood-tag'
import { formatTime } from '@/lib/journal-utils'

interface JournalHistoryProps {
  entries: JournalEntry[]
  onSelectEntry: (entry: JournalEntry) => void
}

export function JournalHistory({ entries, onSelectEntry }: JournalHistoryProps) {
  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <Archive className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No entries yet</h3>
        <p className="text-muted-foreground">
          Your journal entries will appear here. Start by writing something.
        </p>
      </div>
    )
  }

  // Group entries by date
  const groupedEntries = entries.reduce(
    (acc, entry) => {
      const dateKey = entry.createdAt.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })

      if (!acc[dateKey]) {
        acc[dateKey] = []
      }
      acc[dateKey].push(entry)
      return acc
    },
    {} as Record<string, JournalEntry[]>,
  )

  return (
    <div className="space-y-6">
      {Object.entries(groupedEntries).map(([date, dateEntries]) => (
        <div key={date}>
          <h3 className="text-sm font-semibold text-muted-foreground mb-3 sticky top-0">
            {date}
          </h3>

          <div className="space-y-3">
            {dateEntries.map((entry) => (
              <button
                key={entry.id}
                onClick={() => onSelectEntry(entry)}
                className="w-full text-left p-4 rounded-lg border border-border bg-card hover:bg-muted hover:border-primary/50 transition-all active:scale-95"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground mb-2">
                      {entry.createdAt.toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true,
                      })}
                    </p>
                    <p className="text-sm text-foreground line-clamp-2">
                      {entry.content}
                    </p>
                  </div>
                </div>

                {entry.moodCategory && (
                  <div className="mt-3">
                    <MoodTag
                      category={entry.moodCategory}
                      intensity={entry.moodIntensity}
                      editable={false}
                    />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

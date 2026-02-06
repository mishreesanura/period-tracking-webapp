'use client'

import React, { useState, useEffect } from 'react'
import { JournalChat } from '@/components/journal-chat'
import { JournalHistory } from '@/components/journal-history'
import type { JournalEntry } from '@/lib/journal-types'

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [view, setView] = useState<'chat' | 'history'>('chat')
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null)
  const [isFirstTime, setIsFirstTime] = useState(true)

  // Load entries from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('journal-entries')
    if (stored) {
      try {
        const parsed = JSON.parse(stored).map((entry: any) => ({
          ...entry,
          createdAt: new Date(entry.createdAt),
        }))
        setEntries(parsed)
        setIsFirstTime(false)
      } catch (error) {
        console.error('Failed to load journal entries:', error)
      }
    }
  }, [])

  // Save entries to localStorage
  useEffect(() => {
    localStorage.setItem('journal-entries', JSON.stringify(entries))
  }, [entries])

  const handleAddEntry = (
    content: string,
    moodCategory: any,
    moodIntensity: any,
  ) => {
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      content,
      createdAt: new Date(),
      moodCategory,
      moodIntensity,
    }

    setEntries((prev) => [newEntry, ...prev])
  }

  if (selectedEntry) {
    return (
      <main className="min-h-screen bg-background">
        <div className="w-full max-w-6xl mx-auto h-screen flex flex-col">
          <div className="border-b border-border p-4 sm:p-6">
            <button
              onClick={() => setSelectedEntry(null)}
              className="text-sm text-primary hover:underline mb-4"
            >
              ← Back to journal
            </button>
            <div>
              <p className="text-xs text-muted-foreground mb-2">
                {selectedEntry.createdAt.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true,
                })}
              </p>
              <p className="text-foreground text-pretty">{selectedEntry.content}</p>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="w-full max-w-6xl mx-auto h-screen flex flex-col">
        {/* View Toggle */}
        <div className="border-b border-border p-4 sm:p-6 flex gap-2">
          <button
            onClick={() => setView('chat')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              view === 'chat'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Write
          </button>
          <button
            onClick={() => setView('history')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              view === 'history'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            History ({entries.length})
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {view === 'chat' ? (
            <JournalChat isFirstTime={isFirstTime} />
          ) : (
            <div className="h-full overflow-y-auto p-4 sm:p-6">
              <JournalHistory entries={entries} onSelectEntry={setSelectedEntry} />
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

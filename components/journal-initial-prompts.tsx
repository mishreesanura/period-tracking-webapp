'use client';

import React from 'react'
import { INITIAL_PROMPTS } from '@/lib/journal-types'

interface InitialPromptsProps {
  onPromptSelect: (prompt: string) => void
}

export function JournalInitialPrompts({ onPromptSelect }: InitialPromptsProps) {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <p className="text-muted-foreground text-sm mb-6">
          Choose a starting point, or just start typing below.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {INITIAL_PROMPTS.map((prompt) => (
          <button
            key={prompt.text}
            onClick={() => onPromptSelect(prompt.text)}
            className="text-left px-4 py-3 rounded-lg border border-border bg-card hover:bg-muted hover:border-primary/50 transition-all active:scale-95"
          >
            <div className="font-medium text-sm text-foreground">{prompt.text}</div>
          </button>
        ))}
      </div>
    </div>
  )
}

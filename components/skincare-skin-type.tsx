'use client'

import { useState, useEffect } from 'react'
import type { SkinType } from '@/lib/skincare-types'

const skinTypes: { value: SkinType; label: string; description: string }[] = [
  { value: 'dry', label: 'Dry', description: 'Often feels tight or flaky' },
  { value: 'oily', label: 'Oily', description: 'Tends to feel shiny or greasy' },
  { value: 'combination', label: 'Combination', description: 'Oily in some areas, dry in others' },
  { value: 'sensitive', label: 'Sensitive', description: 'Reacts easily to products or weather' },
  { value: 'unsure', label: 'Not sure', description: 'That is completely okay' },
]

export function SkincareSkinType() {
  const [selected, setSelected] = useState<SkinType | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('skinType')
      if (saved) {
        setSelected(saved as SkinType)
      }
    }
  }, [])

  const handleSelect = (type: SkinType) => {
    setSelected(type)
    if (typeof window !== 'undefined') {
      localStorage.setItem('skinType', type)
    }
  }

  return (
    <div className="rounded-lg border border-border bg-card p-5 sm:p-6">
      <h3 className="text-base font-semibold text-foreground mb-1">
        Your skin type
      </h3>
      <p className="text-xs text-muted-foreground mb-4">
        Optional. Helps personalize your routines slightly.
      </p>

      <div className="space-y-2">
        {skinTypes.map((type) => (
          <button
            key={type.value}
            onClick={() => handleSelect(type.value)}
            className={`w-full text-left rounded-lg border p-3 transition-colors ${
              selected === type.value
                ? 'border-foreground bg-muted/50'
                : 'border-border hover:border-foreground/30 hover:bg-muted/30'
            }`}
          >
            <p className={`text-sm font-medium ${
              selected === type.value ? 'text-foreground' : 'text-foreground'
            }`}>
              {type.label}
            </p>
            <p className="text-xs text-muted-foreground">
              {type.description}
            </p>
          </button>
        ))}
      </div>

      {selected && (
        <button
          onClick={() => {
            setSelected(null)
            if (typeof window !== 'undefined') {
              localStorage.removeItem('skinType')
            }
          }}
          className="mt-3 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          Clear selection
        </button>
      )}
    </div>
  )
}

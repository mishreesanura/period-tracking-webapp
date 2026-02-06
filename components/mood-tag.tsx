'use client'

import React, { useState } from 'react'
import { X } from 'lucide-react'
import type { MoodCategory, MoodIntensity } from '@/lib/journal-types'
import { MOOD_CATEGORIES } from '@/lib/journal-types'

interface MoodTagProps {
  category: MoodCategory
  intensity: MoodIntensity
  onUpdate?: (category: MoodCategory, intensity: MoodIntensity) => void
  onRemove?: () => void
  editable?: boolean
}

export function MoodTag({
  category,
  intensity,
  onUpdate,
  onRemove,
  editable = false,
}: MoodTagProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [tempCategory, setTempCategory] = useState(category)
  const [tempIntensity, setTempIntensity] = useState(intensity)

  const handleSave = () => {
    onUpdate?.(tempCategory, tempIntensity)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setTempCategory(category)
    setTempIntensity(intensity)
    setIsEditing(false)
  }

  if (isEditing && editable) {
    return (
      <div className="inline-flex items-center gap-2 bg-muted px-3 py-2 rounded-full border border-border">
        <select
          value={tempCategory}
          onChange={(e) => setTempCategory(e.target.value as MoodCategory)}
          className="text-xs font-medium bg-transparent border-none focus:outline-none cursor-pointer"
        >
          {Object.entries(MOOD_CATEGORIES).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>

        <select
          value={tempIntensity}
          onChange={(e) => setTempIntensity(e.target.value as MoodIntensity)}
          className="text-xs font-medium bg-transparent border-none focus:outline-none cursor-pointer"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <div className="flex gap-1">
          <button
            onClick={handleSave}
            className="text-xs font-bold text-primary hover:underline px-2"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="text-xs text-muted-foreground hover:text-foreground px-2"
          >
            Cancel
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="inline-flex items-center gap-2 bg-muted px-3 py-2 rounded-full border border-border hover:border-primary/50 transition-colors cursor-pointer group">
      <span className="text-xs font-medium">
        Logged as: {MOOD_CATEGORIES[category]} ({intensity})
      </span>

      {editable && (
        <>
          <button
            onClick={() => setIsEditing(true)}
            className="text-xs text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
          >
            Edit
          </button>
          <button
            onClick={onRemove}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Remove mood tag"
          >
            <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
          </button>
        </>
      )}
    </div>
  )
}

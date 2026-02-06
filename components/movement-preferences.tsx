'use client'

import { useState, useEffect } from 'react'
import type { MovementPreferences } from '@/lib/movement-types'

interface MovementPreferencesProps {
  onSave?: (preferences: MovementPreferences) => void
  isModal?: boolean
  onClose?: () => void
}

export function MovementPreferencesSettings({
  onSave,
  isModal = false,
  onClose,
}: MovementPreferencesProps) {
  const [preferences, setPreferences] = useState<MovementPreferences>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('movementPreferences')
      return saved ? JSON.parse(saved) : {
        fitnessLevel: 'beginner',
        movementTypes: ['yoga', 'home'],
        goesToGym: false,
      }
    }
    return {
      fitnessLevel: 'beginner',
      movementTypes: ['yoga', 'home'],
      goesToGym: false,
    }
  })

  const handleSave = () => {
    localStorage.setItem('movementPreferences', JSON.stringify(preferences))
    onSave?.(preferences)
  }

  const toggleMovementType = (type: 'yoga' | 'gym' | 'home') => {
    setPreferences((prev) => {
      const types = prev.movementTypes.includes(type)
        ? prev.movementTypes.filter((t) => t !== type)
        : [...prev.movementTypes, type]
      return { ...prev, movementTypes: types }
    })
  }

  return (
    <div className={isModal ? '' : 'space-y-6'}>
      {!isModal && (
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Movement Preferences
          </h2>
          <p className="text-muted-foreground">
            Customize how we suggest movements for you. You can change these anytime.
          </p>
        </div>
      )}

      {/* Fitness Level */}
      <div>
        <label className="block font-semibold text-foreground mb-3">
          What's your fitness level?
        </label>
        <div className="space-y-2">
          {['beginner', 'intermediate', 'advanced'].map((level) => (
            <button
              key={level}
              onClick={() =>
                setPreferences((prev) => ({
                  ...prev,
                  fitnessLevel: level as any,
                }))
              }
              className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
                preferences.fitnessLevel === level
                  ? 'border-primary bg-primary/5 text-foreground'
                  : 'border-border hover:border-primary/30 text-muted-foreground'
              }`}
            >
              <p className="font-medium capitalize">{level}</p>
              <p className="text-xs mt-1">
                {level === 'beginner' && 'Getting started with movement'}
                {level === 'intermediate' && 'Comfortable with regular movement'}
                {level === 'advanced' && 'Experienced with structured workouts'}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Gym Access */}
      <div>
        <label className="block font-semibold text-foreground mb-3">
          Do you go to the gym?
        </label>
        <div className="space-y-2">
          {[
            { value: true, label: 'Yes, I have gym access' },
            { value: false, label: 'No, I prefer home or yoga' },
          ].map((option) => (
            <button
              key={String(option.value)}
              onClick={() =>
                setPreferences((prev) => ({
                  ...prev,
                  goesToGym: option.value,
                }))
              }
              className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
                preferences.goesToGym === option.value
                  ? 'border-primary bg-primary/5 text-foreground'
                  : 'border-border hover:border-primary/30 text-muted-foreground'
              }`}
            >
              <p className="font-medium">{option.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Movement Types */}
      <div>
        <label className="block font-semibold text-foreground mb-3">
          What types of movement do you enjoy?
        </label>
        <div className="space-y-2">
          {[
            { id: 'yoga', label: 'Yoga', description: 'Flexibility and mindfulness' },
            { id: 'home', label: 'Home workouts', description: 'Bodyweight and resistance' },
            { id: 'gym', label: 'Gym', description: 'Structured workouts with equipment' },
          ].map((type) => (
            <button
              key={type.id}
              onClick={() => toggleMovementType(type.id as any)}
              className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
                preferences.movementTypes.includes(type.id as any)
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/30'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">{type.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {type.description}
                  </p>
                </div>
                <div
                  className={`h-5 w-5 rounded border flex items-center justify-center flex-shrink-0 ${
                    preferences.movementTypes.includes(type.id as any)
                      ? 'border-primary bg-primary'
                      : 'border-border'
                  }`}
                >
                  {preferences.movementTypes.includes(type.id as any) && (
                    <span className="text-xs font-bold text-primary-foreground">✓</span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="w-full px-4 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
      >
        Save Preferences
      </button>

      {onClose && (
        <button
          onClick={onClose}
          className="w-full px-4 py-3 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors font-medium"
        >
          Close
        </button>
      )}
    </div>
  )
}

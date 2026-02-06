import type { CyclePhase } from './cycle-utils'

export type ReminderFrequency = 'none' | 'few' | 'moderate' | 'frequent'

export interface HydrationPreferences {
  reminderFrequency: ReminderFrequency
  timeWindowStart: number // hour 0-23
  timeWindowEnd: number // hour 0-23
  snoozeMinutes: number
  countWarmDrinks: boolean
  enabled: boolean
}

export interface HydrationEntry {
  id: string
  timestamp: Date
  amount: 'half' | 'full' // half glass or full glass
  temperature?: 'cold' | 'warm'
  notes?: string
}

export interface HydrationDay {
  date: Date
  entries: HydrationEntry[]
  glassCount: number
}

export interface HydrationReminder {
  id: string
  timestamp: Date
  type: 'passive' | 'contextual' | 'post-workout'
  message: string
  cyclePhase: CyclePhase
  dismissed: boolean
}

// ────────────────────────────────────────────
// Notification Types
// ────────────────────────────────────────────

export type ToneMode = 'cute-soft' | 'fun-quirky' | 'affirmations' | 'calm-minimal' | 'silent'

export type NotificationCategory = 'care-reminder' | 'emotional-check-in' | 'cycle-aware' | 'comfort-suggestion'

export type TimeOfDay = 'morning' | 'afternoon' | 'night'

export type MoodState = 'low' | 'irritable' | 'neutral' | 'high'

export type NotificationCyclePhase = 'menstrual' | 'follicular' | 'ovulation' | 'luteal'

/** A single notification that has been surfaced to the user */
export interface AppNotification {
  id: string
  category: NotificationCategory
  title: string
  body: string
  timeOfDay: TimeOfDay
  createdAt: Date
  read: boolean
  /** The feature route the notification links to, e.g. "/hydration" */
  href: string
  /** Label shown on the destination link */
  hrefLabel: string
}

/** User-controlled notification preferences (persisted to localStorage) */
export interface NotificationPreferences {
  toneMode: ToneMode
  maxPerDay: number // 1-5
  quietHoursStart: number // 0-23
  quietHoursEnd: number // 0-23
  pausedForToday: boolean
  pausedDate: string | null // ISO date string to auto-reset
}

export const DEFAULT_NOTIFICATION_PREFERENCES: NotificationPreferences = {
  toneMode: 'cute-soft',
  maxPerDay: 3,
  quietHoursStart: 22,
  quietHoursEnd: 7,
  pausedForToday: false,
  pausedDate: null,
}

/** Internal context fed into the notification engine -- never surfaced in UI */
export interface NotificationContext {
  cyclePhase: NotificationCyclePhase
  moodState: MoodState
  timeOfDay: TimeOfDay
  toneMode: ToneMode
}

// Labels
export const TONE_MODE_LABELS: Record<ToneMode, string> = {
  'cute-soft': 'Cute & Soft',
  'fun-quirky': 'Fun & Quirky',
  affirmations: 'Affirmations',
  'calm-minimal': 'Calm & Minimal',
  silent: 'Silent Mode',
}

export const TONE_MODE_DESCRIPTIONS: Record<ToneMode, string> = {
  'cute-soft': 'Warm, gentle messages like a caring friend.',
  'fun-quirky': 'Light-hearted, playful little nudges.',
  affirmations: 'Encouraging, affirming words of support.',
  'calm-minimal': 'Short, neutral, to-the-point messages.',
  silent: 'Only critical notifications. Everything else is muted.',
}

export const CATEGORY_LABELS: Record<NotificationCategory, string> = {
  'care-reminder': 'Care Reminders',
  'emotional-check-in': 'Emotional Check-ins',
  'cycle-aware': 'Cycle-Aware Messages',
  'comfort-suggestion': 'Comfort Suggestions',
}

export const CATEGORY_DESCRIPTIONS: Record<NotificationCategory, string> = {
  'care-reminder': 'Hydration, skincare, rest, and movement nudges.',
  'emotional-check-in': 'Gentle emotional validation and support.',
  'cycle-aware': 'Phase-based emotional normalisation.',
  'comfort-suggestion': 'Music, breathing, and rest ideas.',
}

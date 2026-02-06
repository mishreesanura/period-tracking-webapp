import type {
  ToneMode,
  NotificationCategory,
  TimeOfDay,
  MoodState,
  NotificationCyclePhase,
  NotificationContext,
  AppNotification,
  NotificationPreferences,
  DEFAULT_NOTIFICATION_PREFERENCES,
} from './notification-types'

// ────────────────────────────────────────────
// Template bank
// ────────────────────────────────────────────
// Each template is keyed by [category][toneMode] and returns strings.
// Engine picks randomly from the matching pool.

interface Template {
  body: string
  href: string
  hrefLabel: string
}

const TEMPLATES: Record<NotificationCategory, Record<ToneMode, Template[]>> = {
  'care-reminder': {
    'cute-soft': [
      { body: 'Tiny reminder to sip some water \u2014 your body deserves it.', href: '/hydration', hrefLabel: 'Log water' },
      { body: 'A little stretch might feel nice right now.', href: '/movement', hrefLabel: 'Movement ideas' },
      { body: 'Your skin might like a little attention today.', href: '/skincare', hrefLabel: 'Skincare routine' },
      { body: 'Have you had a glass of water recently? No pressure.', href: '/hydration', hrefLabel: 'Log water' },
    ],
    'fun-quirky': [
      { body: 'Your water bottle misses you.', href: '/hydration', hrefLabel: 'Log water' },
      { body: 'Plot twist: a stretch break sounds pretty good right now.', href: '/movement', hrefLabel: 'Movement ideas' },
      { body: 'Your face called \u2014 it wants some love.', href: '/skincare', hrefLabel: 'Skincare routine' },
    ],
    affirmations: [
      { body: 'Taking care of yourself is an act of courage. A sip of water counts.', href: '/hydration', hrefLabel: 'Log water' },
      { body: 'You deserve to move in ways that feel good.', href: '/movement', hrefLabel: 'Movement ideas' },
      { body: 'Your body is doing so much for you. A gentle routine might feel grounding.', href: '/skincare', hrefLabel: 'Skincare routine' },
    ],
    'calm-minimal': [
      { body: 'Water reminder.', href: '/hydration', hrefLabel: 'Log water' },
      { body: 'Movement suggestion available.', href: '/movement', hrefLabel: 'Movement ideas' },
      { body: 'Skincare routine ready.', href: '/skincare', hrefLabel: 'Skincare routine' },
    ],
    silent: [],
  },
  'emotional-check-in': {
    'cute-soft': [
      { body: "You\u2019re allowed to take today slowly. You\u2019re doing enough.", href: '/journal', hrefLabel: 'Open journal' },
      { body: "It\u2019s okay to not be okay right now.", href: '/journal', hrefLabel: 'Open journal' },
      { body: 'Checking in softly \u2014 how are you feeling?', href: '/journal', hrefLabel: 'Open journal' },
    ],
    'fun-quirky': [
      { body: "Hey, your feelings are valid \u2014 even the weird ones.", href: '/journal', hrefLabel: 'Open journal' },
      { body: "Emotions: messy, confusing, totally normal.", href: '/journal', hrefLabel: 'Open journal' },
    ],
    affirmations: [
      { body: 'Your feelings matter. Every single one.', href: '/journal', hrefLabel: 'Open journal' },
      { body: "You don\u2019t have to be strong today. Rest is okay.", href: '/journal', hrefLabel: 'Open journal' },
      { body: 'You are worthy of the kindness you give others.', href: '/journal', hrefLabel: 'Open journal' },
    ],
    'calm-minimal': [
      { body: 'Emotional check-in available.', href: '/journal', hrefLabel: 'Open journal' },
      { body: 'Journal when ready.', href: '/journal', hrefLabel: 'Open journal' },
    ],
    silent: [],
  },
  'cycle-aware': {
    'cute-soft': [
      { body: 'Extra feelings today? Totally normal. Be gentle with yourself.', href: '/calendar', hrefLabel: 'View cycle' },
      { body: 'Your body is doing a lot right now. Rest if you can.', href: '/care', hrefLabel: 'Care ideas' },
      { body: 'This phase can feel heavy. You\u2019re not alone in that.', href: '/calendar', hrefLabel: 'View cycle' },
    ],
    'fun-quirky': [
      { body: 'Hormones doing their thing. Perfectly on schedule.', href: '/calendar', hrefLabel: 'View cycle' },
      { body: 'Your body has its own timeline. Respect the process.', href: '/care', hrefLabel: 'Care ideas' },
    ],
    affirmations: [
      { body: 'Every phase of your cycle is worthy of respect.', href: '/calendar', hrefLabel: 'View cycle' },
      { body: 'Your body knows what it\u2019s doing. Trust the rhythm.', href: '/care', hrefLabel: 'Care ideas' },
    ],
    'calm-minimal': [
      { body: 'Cycle update available.', href: '/calendar', hrefLabel: 'View cycle' },
      { body: 'Phase-specific care suggestions ready.', href: '/care', hrefLabel: 'Care ideas' },
    ],
    silent: [],
  },
  'comfort-suggestion': {
    'cute-soft': [
      { body: 'If the world feels loud, soft sounds might help right now.', href: '/sounds', hrefLabel: 'Listen' },
      { body: 'A warm drink and slow breathing can change everything.', href: '/care', hrefLabel: 'Care ideas' },
      { body: 'Maybe some gentle music would feel nice.', href: '/sounds', hrefLabel: 'Listen' },
    ],
    'fun-quirky': [
      { body: 'Sound bath, anyone? No bathtub required.', href: '/sounds', hrefLabel: 'Listen' },
      { body: 'Your ears deserve something cosy right now.', href: '/sounds', hrefLabel: 'Listen' },
    ],
    affirmations: [
      { body: 'You are allowed to pause. Comfort is not laziness.', href: '/sounds', hrefLabel: 'Listen' },
      { body: 'Rest is productive. Stillness is healing.', href: '/care', hrefLabel: 'Care ideas' },
    ],
    'calm-minimal': [
      { body: 'Comfort sounds available.', href: '/sounds', hrefLabel: 'Listen' },
      { body: 'Rest suggestion ready.', href: '/care', hrefLabel: 'Care ideas' },
    ],
    silent: [],
  },
}

// ────────────────────────────────────────────
// Time of day helper
// ────────────────────────────────────────────
export function getCurrentTimeOfDay(): TimeOfDay {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 12) return 'morning'
  if (hour >= 12 && hour < 18) return 'afternoon'
  return 'night'
}

// ────────────────────────────────────────────
// Mood inference (simplified -- from journal mood)
// ────────────────────────────────────────────
export function inferMoodState(journalMood?: string): MoodState {
  if (!journalMood) return 'neutral'
  const mapping: Record<string, MoodState> = {
    sad: 'low',
    anxious: 'low',
    angry: 'irritable',
    numb: 'low',
    calm: 'neutral',
    neutral: 'neutral',
    happy: 'high',
    energetic: 'high',
  }
  return mapping[journalMood] ?? 'neutral'
}

// ────────────────────────────────────────────
// Map cycle-utils phases to notification phases
// ────────────────────────────────────────────
export function mapToNotificationPhase(phase: string): NotificationCyclePhase {
  const mapping: Record<string, NotificationCyclePhase> = {
    period: 'menstrual',
    spotting: 'menstrual',
    follicular: 'follicular',
    ovulation: 'ovulation',
    luteal: 'luteal',
    pms: 'luteal',
    'no-data': 'follicular',
  }
  return mapping[phase] ?? 'follicular'
}

// ────────────────────────────────────────────
// Category selection by mood + time + phase
// ────────────────────────────────────────────
function selectCategories(ctx: NotificationContext): NotificationCategory[] {
  const { moodState, timeOfDay, cyclePhase } = ctx

  // Mood overrides everything
  if (moodState === 'low') {
    return timeOfDay === 'night'
      ? ['emotional-check-in']
      : ['emotional-check-in', 'comfort-suggestion']
  }
  if (moodState === 'irritable') {
    return ['care-reminder'] // short, neutral
  }

  // Phase-sensitive defaults
  if (cyclePhase === 'menstrual' || cyclePhase === 'luteal') {
    if (timeOfDay === 'morning') return ['cycle-aware', 'care-reminder']
    if (timeOfDay === 'afternoon') return ['care-reminder', 'comfort-suggestion']
    return ['emotional-check-in', 'comfort-suggestion']
  }

  // Neutral / high mood
  if (timeOfDay === 'morning') return ['care-reminder', 'cycle-aware']
  if (timeOfDay === 'afternoon') return ['care-reminder', 'comfort-suggestion']
  return ['emotional-check-in', 'comfort-suggestion']
}

// ────────────────────────────────────────────
// Tone resolution (mood can override tone)
// ────────────────────────────────────────────
function resolveTone(ctx: NotificationContext): ToneMode {
  const { moodState, toneMode } = ctx

  // Safety: distressed states force calmer tones
  if (moodState === 'low') {
    if (toneMode === 'fun-quirky') return 'affirmations'
    return toneMode
  }
  if (moodState === 'irritable') {
    return 'calm-minimal'
  }

  return toneMode
}

// ────────────────────────────────────────────
// Generate a single notification
// ────────────────────────────────────────────
export function generateNotification(ctx: NotificationContext): AppNotification | null {
  if (ctx.toneMode === 'silent') return null

  const resolvedTone = resolveTone(ctx)
  if (resolvedTone === 'silent') return null

  const categories = selectCategories(ctx)
  const category = categories[Math.floor(Math.random() * categories.length)]

  const pool = TEMPLATES[category][resolvedTone]
  if (!pool || pool.length === 0) return null

  const template = pool[Math.floor(Math.random() * pool.length)]

  const titleMap: Record<NotificationCategory, string> = {
    'care-reminder': 'Gentle Reminder',
    'emotional-check-in': 'Checking In',
    'cycle-aware': 'Cycle Note',
    'comfort-suggestion': 'Comfort',
  }

  return {
    id: `notif-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    category,
    title: titleMap[category],
    body: template.body,
    timeOfDay: ctx.timeOfDay,
    createdAt: new Date(),
    read: false,
    href: template.href,
    hrefLabel: template.hrefLabel,
  }
}

// ────────────────────────────────────────────
// Notification history helpers
// ────────────────────────────────────────────
const STORAGE_KEY = 'app_notifications'
const PREFS_KEY = 'notification_preferences'
const DISMISSED_COUNT_KEY = 'notification_dismissed_count'

export function loadNotifications(): AppNotification[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return parsed.map((n: AppNotification) => ({
      ...n,
      createdAt: new Date(n.createdAt),
    }))
  } catch {
    return []
  }
}

export function saveNotifications(notifications: AppNotification[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications))
}

export function loadPreferences(): NotificationPreferences {
  if (typeof window === 'undefined') {
    return {
      toneMode: 'cute-soft',
      maxPerDay: 3,
      quietHoursStart: 22,
      quietHoursEnd: 7,
      pausedForToday: false,
      pausedDate: null,
    }
  }
  try {
    const raw = localStorage.getItem(PREFS_KEY)
    if (!raw) return {
      toneMode: 'cute-soft',
      maxPerDay: 3,
      quietHoursStart: 22,
      quietHoursEnd: 7,
      pausedForToday: false,
      pausedDate: null,
    }
    return JSON.parse(raw)
  } catch {
    return {
      toneMode: 'cute-soft',
      maxPerDay: 3,
      quietHoursStart: 22,
      quietHoursEnd: 7,
      pausedForToday: false,
      pausedDate: null,
    }
  }
}

export function savePreferences(prefs: NotificationPreferences) {
  if (typeof window === 'undefined') return
  localStorage.setItem(PREFS_KEY, JSON.stringify(prefs))
}

export function getTodayNotificationCount(notifications: AppNotification[]): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return notifications.filter((n) => {
    const d = new Date(n.createdAt)
    d.setHours(0, 0, 0, 0)
    return d.getTime() === today.getTime()
  }).length
}

export function getUnreadCount(notifications: AppNotification[]): number {
  return notifications.filter((n) => !n.read).length
}

export function isInQuietHours(prefs: NotificationPreferences): boolean {
  const hour = new Date().getHours()
  const { quietHoursStart, quietHoursEnd } = prefs

  if (quietHoursStart <= quietHoursEnd) {
    return hour >= quietHoursStart && hour < quietHoursEnd
  }
  // Wraps midnight, e.g. 22:00 -> 07:00
  return hour >= quietHoursStart || hour < quietHoursEnd
}

export function isPausedForToday(prefs: NotificationPreferences): boolean {
  if (!prefs.pausedForToday) return false
  if (!prefs.pausedDate) return false
  const today = new Date().toISOString().slice(0, 10)
  if (prefs.pausedDate !== today) return false // auto-reset
  return true
}

/** Track consecutive dismissals for auto-frequency reduction */
export function getDismissedCount(): number {
  if (typeof window === 'undefined') return 0
  return parseInt(localStorage.getItem(DISMISSED_COUNT_KEY) || '0', 10)
}

export function incrementDismissedCount() {
  if (typeof window === 'undefined') return
  const current = getDismissedCount()
  localStorage.setItem(DISMISSED_COUNT_KEY, String(current + 1))
}

export function resetDismissedCount() {
  if (typeof window === 'undefined') return
  localStorage.setItem(DISMISSED_COUNT_KEY, '0')
}

/** If user has dismissed 3+ in a row, silently reduce effective max */
export function getEffectiveMaxPerDay(prefs: NotificationPreferences): number {
  const dismissed = getDismissedCount()
  if (dismissed >= 3) {
    return Math.max(1, prefs.maxPerDay - 1)
  }
  return prefs.maxPerDay
}

// ────────────────────────────────────────────
// Category icon / color helpers (for UI)
// ────────────────────────────────────────────
export function getCategoryColor(category: NotificationCategory): string {
  const map: Record<NotificationCategory, string> = {
    'care-reminder': 'bg-sky-100 text-sky-700',
    'emotional-check-in': 'bg-rose-100 text-rose-700',
    'cycle-aware': 'bg-amber-100 text-amber-700',
    'comfort-suggestion': 'bg-indigo-100 text-indigo-700',
  }
  return map[category]
}

export function getTimeLabel(timeOfDay: TimeOfDay): string {
  const map: Record<TimeOfDay, string> = {
    morning: 'Morning',
    afternoon: 'Afternoon',
    night: 'Evening',
  }
  return map[timeOfDay]
}

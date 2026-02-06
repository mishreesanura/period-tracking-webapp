import type { CyclePhase } from './cycle-utils'
import type { HydrationPreferences, ReminderFrequency } from './hydration-types'

export const defaultPreferences: HydrationPreferences = {
  reminderFrequency: 'moderate',
  timeWindowStart: 9,
  timeWindowEnd: 21,
  snoozeMinutes: 30,
  countWarmDrinks: false,
  enabled: true,
}

export function getReminderFrequencyLabel(frequency: ReminderFrequency): string {
  const labels: Record<ReminderFrequency, string> = {
    none: 'No reminders',
    few: 'Few (2–3 per day)',
    moderate: 'Moderate (4–5 per day)',
    frequent: 'Frequent (6–7 per day)',
  }
  return labels[frequency]
}

export function getRemindersPerDay(frequency: ReminderFrequency): number {
  const counts: Record<ReminderFrequency, number> = {
    none: 0,
    few: 2,
    moderate: 4,
    frequent: 6,
  }
  return counts[frequency]
}

export function getHydrationMessage(cyclePhase: CyclePhase, context?: string): string {
  // Cycle-aware messaging
  if (cyclePhase === 'period') {
    const messages = [
      'Warm water can feel soothing during cramps.',
      'Staying hydrated may ease discomfort today.',
      'A gentle sip of water might help.',
    ]
    return messages[Math.floor(Math.random() * messages.length)]
  }

  if (cyclePhase === 'pms') {
    const messages = [
      'Hydration may help with bloating and fatigue.',
      'A sip of water could support you right now.',
      'Staying hydrated can help ease tension.',
    ]
    return messages[Math.floor(Math.random() * messages.length)]
  }

  // Context-specific messages
  if (context === 'post-workout') {
    return 'Hydrating after movement helps your body recover.'
  }

  if (context === 'fatigue') {
    return 'Dehydration can worsen fatigue — water might help.'
  }

  if (context === 'headache') {
    return 'A glass of water might ease that headache.'
  }

  // Default gentle messages
  const defaultMessages = [
    'A sip of water can help you reset.',
    'Your body might appreciate some water right now.',
    'A small sip of water might feel nice right now.',
    'Hydration supports how you feel today.',
  ]

  return defaultMessages[Math.floor(Math.random() * defaultMessages.length)]
}

export function getProgressPercentage(glassCount: number): number {
  // Soft target: 8 glasses per day (non-pressuring)
  return Math.min((glassCount / 8) * 100, 100)
}

export function getProgressMessage(glassCount: number): string {
  if (glassCount === 0) return 'Start whenever feels right.'
  if (glassCount < 3) return 'You\'re beginning well.'
  if (glassCount < 5) return 'You\'re doing okay today.'
  if (glassCount < 8) return 'You\'re staying hydrated.'
  return 'You\'re doing great today.'
}

export function calculateGlassesFromAmount(amount: 'half' | 'full'): number {
  return amount === 'full' ? 1 : 0.5
}

export function formatGlassCount(count: number): string {
  if (count === 0.5) return '½ glass'
  if (count === 1) return '1 glass'
  if (count % 1 === 0) return `${Math.floor(count)} glasses`
  const decimal = count - Math.floor(count)
  const wholeGlasses = Math.floor(count)
  return decimal === 0.5 ? `${wholeGlasses}½ glasses` : `${count} glasses`
}

export function getContextualReminder(
  cyclePhase: CyclePhase,
  hasWorkoutToday: boolean,
  journalMood?: string
): { message: string; type: 'contextual' } | null {
  if (hasWorkoutToday) {
    return {
      message: 'Great workout! Hydrating now helps your body recover.',
      type: 'contextual',
    }
  }

  if (journalMood?.includes('fatigue') || journalMood?.includes('tired')) {
    return {
      message: 'Dehydration can worsen fatigue — water might help.',
      type: 'contextual',
    }
  }

  if (journalMood?.includes('headache') || journalMood?.includes('head')) {
    return {
      message: 'A glass of water might ease that headache.',
      type: 'contextual',
    }
  }

  if (cyclePhase === 'period' || cyclePhase === 'pms') {
    return {
      message:
        cyclePhase === 'period'
          ? 'Warm water can feel soothing during cramps.'
          : 'Hydration may help with bloating and fatigue.',
      type: 'contextual',
    }
  }

  return null
}

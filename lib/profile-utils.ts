import type {
  UserProfile,
  ProfileSection,
  ProfileSectionMeta,
  RoutineType,
  StressLevel,
  PMSSymptom,
  EmotionalPattern,
  DietaryPreference,
} from './profile-types'

// ---------------------------------------------------------------
// Section metadata – drives both onboarding & profile page
// ---------------------------------------------------------------

export const PROFILE_SECTIONS: ProfileSectionMeta[] = [
  {
    id: 'basics',
    title: 'About you',
    description: 'A name and age help us understand natural cycle patterns.',
    whyWeAsk: 'Age helps us tailor insights to your stage of life. Your name is just so we can greet you warmly.',
    optional: false,
  },
  {
    id: 'body',
    title: 'Body metrics',
    description: 'This helps us tailor movement and care suggestions. You can skip this entirely.',
    whyWeAsk: 'Height and weight are used only internally to scale exercise intensity and nutrition guidance. We never display body scores or judgments.',
    optional: true,
  },
  {
    id: 'lifestyle',
    title: 'Daily routine',
    description: 'Daily routine can affect stress and cycles.',
    whyWeAsk: 'Work stress and physical load influence cycle regularity, mood, and energy. This helps us give more relevant suggestions.',
    optional: true,
  },
  {
    id: 'cycle',
    title: 'Cycle background',
    description: 'Share only what you are comfortable with.',
    whyWeAsk: 'Knowing your typical cycle length and symptoms helps us predict phases more accurately and suggest better care.',
    optional: true,
  },
  {
    id: 'emotional',
    title: 'Emotional context',
    description: 'This shapes journaling prompts, notification tone, and care suggestions.',
    whyWeAsk: 'Understanding your emotional patterns lets us adjust the app\u2019s tone and suggest support that actually fits how you feel.',
    optional: true,
  },
  {
    id: 'dietary',
    title: 'Food preferences',
    description: 'So we only suggest foods you actually eat.',
    whyWeAsk: 'Dietary preferences help us filter nutrition suggestions so they are relevant and respectful of your choices.',
    optional: true,
  },
]

// ---------------------------------------------------------------
// Display label maps
// ---------------------------------------------------------------

export const ROUTINE_LABELS: Record<RoutineType, string> = {
  'mostly-sitting': 'Mostly sitting (desk work, studying)',
  'standing-moving': 'Standing / moving often',
  'physically-demanding': 'Physically demanding',
  'shift-work': 'Shift work / night shifts',
  'irregular': 'Irregular schedule',
}

export const STRESS_LABELS: Record<StressLevel, string> = {
  low: 'Low',
  moderate: 'Moderate',
  high: 'High',
}

export const PMS_SYMPTOM_LABELS: Record<PMSSymptom, string> = {
  bloating: 'Bloating',
  cramps: 'Cramps',
  headaches: 'Headaches',
  fatigue: 'Fatigue',
  'breast-tenderness': 'Breast tenderness',
  'mood-swings': 'Mood swings',
  irritability: 'Irritability',
  'food-cravings': 'Food cravings',
  'trouble-sleeping': 'Trouble sleeping',
  'back-pain': 'Back pain',
}

export const EMOTIONAL_PATTERN_LABELS: Record<EmotionalPattern, string> = {
  'high-stress-often': 'I experience high stress often',
  'anxious-around-period': 'I feel anxious around my period',
  'significant-mood-changes': 'My mood changes significantly across my cycle',
}

export const DIETARY_LABELS: Record<DietaryPreference, string> = {
  vegetarian: 'Vegetarian',
  vegan: 'Vegan',
  'gluten-free': 'Gluten-free',
  'dairy-free': 'Dairy-free',
  'no-preference': 'No specific preference',
}

// ---------------------------------------------------------------
// Profile completeness (no percentage, no guilt)
// ---------------------------------------------------------------

export function getCompletedSections(profile: UserProfile): ProfileSection[] {
  const completed: ProfileSection[] = []

  if (profile.name || profile.age) completed.push('basics')
  if (profile.preferNotToSayBody || profile.heightCm || profile.weightKg) completed.push('body')
  if (profile.routineType || profile.stressLevel) completed.push('lifestyle')
  if (profile.averageCycleLength || profile.periodPainLevel !== undefined || (profile.pmsSymptoms && profile.pmsSymptoms.length > 0)) completed.push('cycle')
  if (profile.emotionalPatterns && profile.emotionalPatterns.length > 0) completed.push('emotional')
  if (profile.dietaryPreferences && profile.dietaryPreferences.length > 0) completed.push('dietary')

  return completed
}

export function getIncompleteSections(profile: UserProfile): ProfileSection[] {
  const completed = getCompletedSections(profile)
  return PROFILE_SECTIONS.map(s => s.id).filter(id => !completed.includes(id))
}

export function getProfileGreeting(profile: UserProfile): string {
  if (profile.name) return `Hi, ${profile.name}`
  return 'Welcome back'
}

// ---------------------------------------------------------------
// Internal-only BMI (never surfaced aggressively)
// ---------------------------------------------------------------

export function calculateBMI(heightCm?: number, weightKg?: number): number | null {
  if (!heightCm || !weightKg || heightCm <= 0 || weightKg <= 0) return null
  const heightM = heightCm / 100
  return Math.round((weightKg / (heightM * heightM)) * 10) / 10
}

/** Neutral, internal classification. NEVER shown as red/green scores. */
export function getBMICategory(bmi: number | null): string {
  if (bmi === null) return 'unknown'
  if (bmi < 18.5) return 'below-typical'
  if (bmi < 25) return 'typical'
  if (bmi < 30) return 'above-typical'
  return 'well-above-typical'
}

// ---------------------------------------------------------------
// localStorage helpers
// ---------------------------------------------------------------

const PROFILE_KEY = 'my-cycle-user-profile'

export function loadProfile(): UserProfile {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(PROFILE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function saveProfile(profile: UserProfile): void {
  if (typeof window === 'undefined') return
  const updated = { ...profile, updatedAt: new Date().toISOString() }
  if (!updated.createdAt) updated.createdAt = new Date().toISOString()
  updated.profileCompletedSections = getCompletedSections(updated)
  localStorage.setItem(PROFILE_KEY, JSON.stringify(updated))
}

export function clearProfile(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(PROFILE_KEY)
}

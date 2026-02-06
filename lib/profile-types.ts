// ---------------------------------------------------------------
// Profile Types – the "data spine" of the app.
// Every field is optional. Nothing is forced.
// ---------------------------------------------------------------

export type RoutineType =
  | 'mostly-sitting'
  | 'standing-moving'
  | 'physically-demanding'
  | 'shift-work'
  | 'irregular'

export type StressLevel = 'low' | 'moderate' | 'high'

export type PainLevel = 0 | 1 | 2 | 3 | 4 | 5  // 0 = none, 5 = severe

export type PMSSymptom =
  | 'bloating'
  | 'cramps'
  | 'headaches'
  | 'fatigue'
  | 'breast-tenderness'
  | 'mood-swings'
  | 'irritability'
  | 'food-cravings'
  | 'trouble-sleeping'
  | 'back-pain'

export type EmotionalPattern =
  | 'high-stress-often'
  | 'anxious-around-period'
  | 'significant-mood-changes'

export type DietaryPreference =
  | 'vegetarian'
  | 'vegan'
  | 'gluten-free'
  | 'dairy-free'
  | 'no-preference'

/** The complete user profile. Every field is optional. */
export interface UserProfile {
  // ── Step 1: Basics ──
  name?: string
  age?: number

  // ── Step 2: Body (optional) ──
  heightCm?: number
  weightKg?: number
  preferNotToSayBody?: boolean

  // ── Step 3: Lifestyle ──
  routineType?: RoutineType
  stressLevel?: StressLevel

  // ── Step 4: Cycle background ──
  averageCycleLength?: number
  periodPainLevel?: PainLevel
  pmsSymptoms?: PMSSymptom[]

  // ── Step 5: Emotional context ──
  emotionalPatterns?: EmotionalPattern[]

  // ── Step 6: Dietary ──
  dietaryPreferences?: DietaryPreference[]

  // ── Meta ──
  onboardingCompleted?: boolean
  profileCompletedSections?: ProfileSection[]
  createdAt?: string
  updatedAt?: string
}

export type ProfileSection =
  | 'basics'
  | 'body'
  | 'lifestyle'
  | 'cycle'
  | 'emotional'
  | 'dietary'

export interface ProfileSectionMeta {
  id: ProfileSection
  title: string
  description: string
  whyWeAsk: string
  optional: boolean
}

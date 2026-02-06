export type NutritionCyclePhase = 'menstrual' | 'follicular' | 'ovulation' | 'luteal'

export type DietaryPreference = 'veg' | 'non-veg' | 'egg' | 'no-preference'

export type CookingEffort = 'no-cook' | 'quick' | 'comfort-cooking'

export type MoodBenefit = 'calming' | 'grounding' | 'energizing' | 'comforting' | 'uplifting'

export type SymptomTag = 'fatigue' | 'bloating' | 'cramps' | 'stress' | 'low-mood'

export interface FoodSuggestion {
  id: string
  name: string
  description: string
  timeEstimate: '10 min' | '15 min' | '20 min' | '30 min' | 'No cook'
  moodBenefit: MoodBenefit
  cyclePhases: NutritionCyclePhase[]
  dietaryTags: DietaryPreference[]
  effort: CookingEffort
  symptomSupport: SymptomTag[]
  stressContext: string
  cycleFriendlyNote: string
}

export interface CravingExplanation {
  id: string
  craving: string
  explanation: string
  cyclePhases: NutritionCyclePhase[]
}

export interface PhaseNutritionInfo {
  phase: NutritionCyclePhase
  label: string
  commonNeeds: string[]
  uiCopy: string
  suggestedFoodCategories: string[]
}

export interface NutritionPreferences {
  dietaryPreference: DietaryPreference
  cookingEffort: CookingEffort
}

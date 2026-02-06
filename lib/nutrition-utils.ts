import type {
  NutritionCyclePhase,
  DietaryPreference,
  CookingEffort,
  MoodBenefit,
  FoodSuggestion,
  CravingExplanation,
  PhaseNutritionInfo,
} from './nutrition-types'
import type { CyclePhase } from './cycle-utils'
import { phaseNutritionInfo, foodSuggestions, cravingExplanations } from './nutrition-content'

// ── Phase mapping ──

export function mapCyclePhaseToNutrition(phase: CyclePhase): NutritionCyclePhase {
  switch (phase) {
    case 'period':
    case 'spotting':
      return 'menstrual'
    case 'follicular':
      return 'follicular'
    case 'ovulation':
      return 'ovulation'
    case 'luteal':
    case 'pms':
      return 'luteal'
    default:
      return 'follicular'
  }
}

// ── Phase info ──

export function getPhaseNutritionInfo(phase: NutritionCyclePhase): PhaseNutritionInfo {
  return phaseNutritionInfo[phase]
}

// ── Food filtering ──

export function getFoodSuggestionsForPhase(
  phase: NutritionCyclePhase,
  dietary?: DietaryPreference,
  effort?: CookingEffort,
): FoodSuggestion[] {
  let results = foodSuggestions.filter((f) => f.cyclePhases.includes(phase))

  if (dietary && dietary !== 'no-preference') {
    results = results.filter(
      (f) => f.dietaryTags.includes(dietary) || f.dietaryTags.includes('no-preference'),
    )
  }

  if (effort) {
    results = results.filter((f) => f.effort === effort)
  }

  return results
}

export function getAllFoodSuggestions(): FoodSuggestion[] {
  return foodSuggestions
}

// ── Craving explanations ──

export function getCravingsForPhase(phase: NutritionCyclePhase): CravingExplanation[] {
  return cravingExplanations.filter((c) => c.cyclePhases.includes(phase))
}

// ── Display helpers ──

export function getMoodBenefitColor(mood: MoodBenefit): string {
  const colorMap: Record<MoodBenefit, string> = {
    calming: 'bg-sky-50 text-sky-800 border-sky-200',
    grounding: 'bg-amber-50 text-amber-800 border-amber-200',
    energizing: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    comforting: 'bg-rose-50 text-rose-800 border-rose-200',
    uplifting: 'bg-orange-50 text-orange-800 border-orange-200',
  }
  return colorMap[mood]
}

export function getMoodBenefitLabel(mood: MoodBenefit): string {
  const labelMap: Record<MoodBenefit, string> = {
    calming: 'Calming',
    grounding: 'Grounding',
    energizing: 'Energizing',
    comforting: 'Comforting',
    uplifting: 'Uplifting',
  }
  return labelMap[mood]
}

export function getEffortLabel(effort: CookingEffort): string {
  const labelMap: Record<CookingEffort, string> = {
    'no-cook': 'No cook',
    quick: 'Quick',
    'comfort-cooking': 'Comfort cooking',
  }
  return labelMap[effort]
}

export function getDietaryLabel(dietary: DietaryPreference): string {
  const labelMap: Record<DietaryPreference, string> = {
    veg: 'Vegetarian',
    'non-veg': 'Non-vegetarian',
    egg: 'Egg-based',
    'no-preference': 'No preference',
  }
  return labelMap[dietary]
}

export function getPhaseAccentColor(phase: NutritionCyclePhase): string {
  const colorMap: Record<NutritionCyclePhase, string> = {
    menstrual: 'border-rose-200 bg-rose-50',
    follicular: 'border-emerald-200 bg-emerald-50',
    ovulation: 'border-amber-200 bg-amber-50',
    luteal: 'border-violet-200 bg-violet-50',
  }
  return colorMap[phase]
}

export function getPhaseAccentText(phase: NutritionCyclePhase): string {
  const colorMap: Record<NutritionCyclePhase, string> = {
    menstrual: 'text-rose-700',
    follicular: 'text-emerald-700',
    ovulation: 'text-amber-700',
    luteal: 'text-violet-700',
  }
  return colorMap[phase]
}

import type { CyclePhase } from './cycle-utils'
import type { Movement, MovementCard, MovementPreferences, MovementType } from './movement-types'

export const movementLibrary: Movement[] = [
  // MENSTRUAL PHASE
  {
    id: 'gentle-yoga-menstrual',
    name: 'Gentle Restorative Yoga',
    type: 'yoga',
    duration: 15,
    intensity: 'low',
    focusArea: 'stretching',
    description: 'Supported poses to ease discomfort and promote rest.',
    whyToday: 'Gentle movement or rest may feel best today.',
    exercises: ['Child\'s pose', 'Reclined butterfly', 'Legs up the wall', 'Savasana'],
    safetyNotes: ['Avoid inversions', 'Avoid intense core pressure', 'Listen to your body'],
    suitablePhases: ['period'],
  },
  {
    id: 'breathing-menstrual',
    name: 'Breathing & Grounding',
    type: 'yoga',
    duration: 10,
    intensity: 'low',
    focusArea: 'breathing',
    description: 'Calm breathing exercises to soothe and center yourself.',
    whyToday: 'Gentle movement or rest may feel best today.',
    exercises: ['Box breathing', '4-7-8 breathing', 'Body scan meditation'],
    safetyNotes: ['Take your time', 'No pressure to complete'],
    suitablePhases: ['period'],
  },
  {
    id: 'stretching-menstrual',
    name: 'Gentle Stretching',
    type: 'home',
    duration: 12,
    intensity: 'low',
    focusArea: 'full-body',
    description: 'Easy stretches to ease tension without strain.',
    whyToday: 'Gentle movement or rest may feel best today.',
    exercises: ['Neck rolls', 'Shoulder stretches', 'Hip openers', 'Hamstring stretches'],
    safetyNotes: ['Move slowly', 'No bouncing', 'Stop if uncomfortable'],
    suitablePhases: ['period'],
  },

  // FOLLICULAR PHASE
  {
    id: 'light-yoga-follicular',
    name: 'Flow Yoga',
    type: 'yoga',
    duration: 20,
    intensity: 'low',
    focusArea: 'full-body',
    description: 'Gentle flowing movements as energy slowly returns.',
    whyToday: 'Energy may slowly return — explore movement you enjoy.',
    exercises: ['Sun salutations', 'Cat-cow flows', 'Warrior poses', 'Downward dog'],
    safetyNotes: ['Move at your own pace', 'Inversions are okay'],
    suitablePhases: ['follicular', 'spotting'],
  },
  {
    id: 'walk-follicular',
    name: 'Mindful Walking',
    type: 'home',
    duration: 25,
    intensity: 'low',
    focusArea: 'full-body',
    description: 'A peaceful walk outdoors or around your space.',
    whyToday: 'Energy may slowly return — explore movement you enjoy.',
    exercises: ['Outdoor walk', 'Nature observation', 'Mindful pacing'],
    safetyNotes: ['Go at your pace', 'No pressure for distance'],
    suitablePhases: ['follicular', 'spotting'],
  },
  {
    id: 'light-strength-follicular',
    name: 'Light Strength (Bodyweight)',
    type: 'home',
    duration: 20,
    intensity: 'moderate',
    focusArea: 'full-body',
    description: 'Gentle bodyweight exercises as energy builds.',
    whyToday: 'Energy may slowly return — explore movement you enjoy.',
    exercises: ['Modified push-ups', 'Squats', 'Lunges', 'Plank (short holds)'],
    safetyNotes: ['Build gradually', 'Rest between sets', 'Listen to your body'],
    suitablePhases: ['follicular'],
  },

  // OVULATION PHASE
  {
    id: 'strength-training-ovulation',
    name: 'Strength Training',
    type: 'gym',
    duration: 30,
    intensity: 'moderate',
    focusArea: 'full-body',
    description: 'Build on your natural strength with compound movements.',
    whyToday: 'You may feel stronger and more confident today.',
    exercises: ['Squats', 'Deadlifts', 'Bench press', 'Rows'],
    safetyNotes: ['Use proper form', 'Progress gradually', 'Rest adequately'],
    suitablePhases: ['ovulation'],
  },
  {
    id: 'dance-ovulation',
    name: 'Dance Workout',
    type: 'home',
    duration: 25,
    intensity: 'moderate',
    focusArea: 'full-body',
    description: 'Fun, energizing movement to music.',
    whyToday: 'You may feel stronger and more confident today.',
    exercises: ['Free movement', 'Follow-along routines', 'Dance to your favorite songs'],
    safetyNotes: ['Have fun with it', 'Move at your pace'],
    suitablePhases: ['ovulation'],
  },
  {
    id: 'upper-strength-ovulation',
    name: 'Upper Body Strength',
    type: 'gym',
    duration: 25,
    intensity: 'moderate',
    focusArea: 'upper',
    description: 'Focus on arms, shoulders, and chest.',
    whyToday: 'You may feel stronger and more confident today.',
    exercises: ['Push-ups', 'Shoulder presses', 'Bicep curls', 'Tricep work'],
    safetyNotes: ['Control your movements', 'Proper rest between sets'],
    suitablePhases: ['ovulation'],
  },

  // LUTEAL / PMS PHASE
  {
    id: 'pilates-luteal',
    name: 'Pilates',
    type: 'home',
    duration: 20,
    intensity: 'moderate',
    focusArea: 'core',
    description: 'Gentle core strength without high intensity.',
    whyToday: 'Slower movement may help reduce stress and tension.',
    exercises: ['Hundreds', 'Roll-ups', 'Single leg circles', 'Spine stretch'],
    safetyNotes: ['Focus on form', 'Controlled movements'],
    suitablePhases: ['luteal', 'pms'],
  },
  {
    id: 'low-impact-cardio-luteal',
    name: 'Low-Impact Cardio',
    type: 'home',
    duration: 20,
    intensity: 'low',
    focusArea: 'full-body',
    description: 'Gentle cardio without high impact.',
    whyToday: 'Slower movement may help reduce stress and tension.',
    exercises: ['Elliptical (if available)', 'Swimming', 'Cycling', 'Rowing machine'],
    safetyNotes: ['Keep heart rate moderate', 'No extreme intensity'],
    suitablePhases: ['luteal', 'pms'],
  },
  {
    id: 'walking-luteal',
    name: 'Peaceful Walking',
    type: 'home',
    duration: 30,
    intensity: 'low',
    focusArea: 'full-body',
    description: 'Calm walking to ease stress and bloating.',
    whyToday: 'Slower movement may help reduce stress and tension.',
    exercises: ['Walking outdoors', 'Walking meditation', 'Exploring nature'],
    safetyNotes: ['Go at leisure pace', 'Enjoy the surroundings'],
    suitablePhases: ['luteal', 'pms'],
  },
  {
    id: 'restorative-yoga-luteal',
    name: 'Restorative Yoga',
    type: 'yoga',
    duration: 20,
    intensity: 'low',
    focusArea: 'stretching',
    description: 'Supported poses for relaxation and tension relief.',
    whyToday: 'Slower movement may help reduce stress and tension.',
    exercises: ['Supported forward fold', 'Reclined spinal twist', 'Legs up wall', 'Savasana'],
    safetyNotes: ['Use props for comfort', 'Hold poses longer'],
    suitablePhases: ['luteal', 'pms'],
  },
]

export function getSuggestedMovements(
  cyclePhase: CyclePhase,
  preferences: Partial<MovementPreferences> = {}
): Movement[] {
  const movements = movementLibrary.filter((m) => m.suitablePhases.includes(cyclePhase))

  // Filter by preferences
  if (preferences.movementTypes && preferences.movementTypes.length > 0) {
    return movements.filter((m) => preferences.movementTypes?.includes(m.type))
  }

  return movements
}

export function getMovementDescription(cyclePhase: CyclePhase): string {
  const descriptions: Record<CyclePhase, string> = {
    period: 'Gentle movement or rest may feel best today.',
    spotting: 'Energy may slowly return — explore movement you enjoy.',
    follicular: 'Energy may slowly return — explore movement you enjoy.',
    ovulation: 'You may feel stronger and more confident today.',
    luteal: 'Slower movement may help reduce stress and tension.',
    pms: 'Slower movement may help reduce stress and tension.',
    'no-data': 'Listen to what your body needs today.',
  }
  return descriptions[cyclePhase]
}

export function getMovementTypeIcon(type: MovementType): string {
  const icons: Record<MovementType, string> = {
    yoga: '🧘',
    gym: '💪',
    home: '🏠',
  }
  return icons[type]
}

export function formatDuration(minutes: number): string {
  return `${minutes} min`
}

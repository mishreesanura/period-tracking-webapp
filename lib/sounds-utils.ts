import type {
  SoundsCyclePhase,
  SoundMood,
  SoundPreference,
  TimeOfDay,
  Playlist,
} from './sounds-types'
import type { CyclePhase } from './cycle-utils'

export function mapCyclePhaseToSounds(phase: CyclePhase): SoundsCyclePhase {
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

export function getTimeOfDay(): TimeOfDay {
  const hour = new Date().getHours()
  if (hour < 17) return 'morning'
  if (hour < 21) return 'evening'
  return 'night'
}

export function getPhaseUICopy(phase: SoundsCyclePhase): string {
  const copyMap: Record<SoundsCyclePhase, string> = {
    menstrual: 'Gentle sounds for rest and comfort.',
    follicular: 'Light sounds to ease you into the day.',
    ovulation: 'Feel-good sounds to match your energy.',
    luteal: 'Sounds to help you slow down and breathe.',
  }
  return copyMap[phase]
}

export function getMoodLabel(mood: SoundMood): string {
  const labels: Record<SoundMood, string> = {
    comforting: 'Comforting',
    calm: 'Calm',
    overwhelmed: 'Overwhelmed',
    sleepy: 'Sleepy',
    focus: 'Focus',
  }
  return labels[mood]
}

export function getMoodDescription(mood: SoundMood): string {
  const descriptions: Record<SoundMood, string> = {
    comforting: 'Warm, held, safe',
    calm: 'Still, peaceful, quiet',
    overwhelmed: 'Grounding, centering',
    sleepy: 'Drifting, soft, slow',
    focus: 'Clear, gentle attention',
  }
  return descriptions[mood]
}

export function getSoundTypeLabel(type: SoundPreference): string {
  const labels: Record<SoundPreference, string> = {
    instrumental: 'Instrumental',
    vocals: 'Soft Vocals',
    nature: 'Nature',
    ambient: 'Ambient',
  }
  return labels[type]
}

export function getPhaseAccentColor(phase: SoundsCyclePhase): string {
  const colorMap: Record<SoundsCyclePhase, string> = {
    menstrual: 'border-rose-200 bg-rose-50 dark:border-rose-800 dark:bg-rose-950/30',
    follicular: 'border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30',
    ovulation: 'border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30',
    luteal: 'border-violet-200 bg-violet-50 dark:border-violet-800 dark:bg-violet-950/30',
  }
  return colorMap[phase]
}

export function getPhaseAccentText(phase: SoundsCyclePhase): string {
  const colorMap: Record<SoundsCyclePhase, string> = {
    menstrual: 'text-rose-700 dark:text-rose-300',
    follicular: 'text-emerald-700 dark:text-emerald-300',
    ovulation: 'text-amber-700 dark:text-amber-300',
    luteal: 'text-violet-700 dark:text-violet-300',
  }
  return colorMap[phase]
}

export function getMoodTagColor(mood: SoundMood): string {
  const colorMap: Record<SoundMood, string> = {
    comforting: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
    calm: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
    overwhelmed: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
    sleepy: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
    focus: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  }
  return colorMap[mood]
}

// All playlists data
const allPlaylists: Playlist[] = [
  // Menstrual phase playlists
  {
    id: 'menstrual-piano-comfort',
    title: 'Soft Piano for Rest',
    description: 'Slow, minimal piano pieces to cradle you through quiet moments.',
    durationMinutes: 20,
    moodTag: 'comforting',
    cyclePhase: 'menstrual',
    soundType: 'instrumental',
    tracks: [
      { id: 'mp1', title: 'Quiet Morning Light', durationSeconds: 240 },
      { id: 'mp2', title: 'Held Gently', durationSeconds: 300 },
      { id: 'mp3', title: 'Drifting Inward', durationSeconds: 260 },
      { id: 'mp4', title: 'Slow Breathing', durationSeconds: 400 },
    ],
  },
  {
    id: 'menstrual-rain-ambient',
    title: 'Rain and Stillness',
    description: 'Soft rainfall layered with deep ambient tones for deep rest.',
    durationMinutes: 45,
    moodTag: 'sleepy',
    cyclePhase: 'menstrual',
    soundType: 'nature',
    tracks: [
      { id: 'mr1', title: 'First Drops', durationSeconds: 600 },
      { id: 'mr2', title: 'Steady Rain', durationSeconds: 900 },
      { id: 'mr3', title: 'Distant Thunder', durationSeconds: 600 },
      { id: 'mr4', title: 'Fading to Silence', durationSeconds: 600 },
    ],
  },
  {
    id: 'menstrual-lofi-rest',
    title: 'Slow Lo-fi Drift',
    description: 'Warm, slow lo-fi beats that ask nothing of you.',
    durationMinutes: 20,
    moodTag: 'calm',
    cyclePhase: 'menstrual',
    soundType: 'ambient',
    tracks: [
      { id: 'ml1', title: 'Blanket of Sound', durationSeconds: 300 },
      { id: 'ml2', title: 'Warm Static', durationSeconds: 300 },
      { id: 'ml3', title: 'Tape Hiss Lullaby', durationSeconds: 300 },
      { id: 'ml4', title: 'End of the Day', durationSeconds: 300 },
    ],
  },

  // Follicular phase playlists
  {
    id: 'follicular-acoustic-morning',
    title: 'Morning Acoustic',
    description: 'Light acoustic guitar melodies to greet the day gently.',
    durationMinutes: 20,
    moodTag: 'calm',
    cyclePhase: 'follicular',
    soundType: 'instrumental',
    tracks: [
      { id: 'fa1', title: 'Sunlit Strings', durationSeconds: 280 },
      { id: 'fa2', title: 'Open Window', durationSeconds: 260 },
      { id: 'fa3', title: 'Meadow Walk', durationSeconds: 320 },
      { id: 'fa4', title: 'Easy Pace', durationSeconds: 340 },
    ],
  },
  {
    id: 'follicular-indie-soft',
    title: 'Soft Indie Mornings',
    description: 'Gentle indie vocals with warm instrumentation.',
    durationMinutes: 20,
    moodTag: 'comforting',
    cyclePhase: 'follicular',
    soundType: 'vocals',
    tracks: [
      { id: 'fi1', title: 'Paper Sky', durationSeconds: 240 },
      { id: 'fi2', title: 'Quiet Company', durationSeconds: 300 },
      { id: 'fi3', title: 'Slow Bloom', durationSeconds: 280 },
      { id: 'fi4', title: 'Hopeful Morning', durationSeconds: 380 },
    ],
  },
  {
    id: 'follicular-nature-focus',
    title: 'Forest Focus',
    description: 'Bird songs and gentle streams for quiet concentration.',
    durationMinutes: 45,
    moodTag: 'focus',
    cyclePhase: 'follicular',
    soundType: 'nature',
    tracks: [
      { id: 'fn1', title: 'Morning Birds', durationSeconds: 600 },
      { id: 'fn2', title: 'Brook Murmur', durationSeconds: 900 },
      { id: 'fn3', title: 'Leaf Rustle', durationSeconds: 600 },
      { id: 'fn4', title: 'Clearing', durationSeconds: 600 },
    ],
  },

  // Ovulation phase playlists
  {
    id: 'ovulation-chill-upbeat',
    title: 'Gentle Uplift',
    description: 'Calm but upbeat instrumental pieces that feel like a warm day.',
    durationMinutes: 20,
    moodTag: 'calm',
    cyclePhase: 'ovulation',
    soundType: 'instrumental',
    tracks: [
      { id: 'ou1', title: 'Golden Hour', durationSeconds: 240 },
      { id: 'ou2', title: 'Easy Motion', durationSeconds: 300 },
      { id: 'ou3', title: 'Bright Air', durationSeconds: 260 },
      { id: 'ou4', title: 'Soft Groove', durationSeconds: 400 },
    ],
  },
  {
    id: 'ovulation-soft-pop',
    title: 'Soft Feel-Good',
    description: 'Gentle pop-inspired vocals that bring warmth without intensity.',
    durationMinutes: 20,
    moodTag: 'comforting',
    cyclePhase: 'ovulation',
    soundType: 'vocals',
    tracks: [
      { id: 'op1', title: 'Summer Window', durationSeconds: 240 },
      { id: 'op2', title: 'Easy Smile', durationSeconds: 280 },
      { id: 'op3', title: 'Dancing Alone', durationSeconds: 300 },
      { id: 'op4', title: 'Simple Joy', durationSeconds: 380 },
    ],
  },
  {
    id: 'ovulation-ambient-energy',
    title: 'Warm Ambient Flow',
    description: 'Uplifting ambient textures that feel light and spacious.',
    durationMinutes: 10,
    moodTag: 'focus',
    cyclePhase: 'ovulation',
    soundType: 'ambient',
    tracks: [
      { id: 'oa1', title: 'Open Space', durationSeconds: 300 },
      { id: 'oa2', title: 'Sunbeam', durationSeconds: 300 },
    ],
  },

  // Luteal / PMS phase playlists
  {
    id: 'luteal-brown-noise',
    title: 'Brown Noise Cocoon',
    description: 'Deep, steady brown noise for grounding and sensory calm.',
    durationMinutes: 45,
    moodTag: 'overwhelmed',
    cyclePhase: 'luteal',
    soundType: 'ambient',
    tracks: [
      { id: 'lb1', title: 'Deep Ground', durationSeconds: 900 },
      { id: 'lb2', title: 'Low Hum', durationSeconds: 900 },
      { id: 'lb3', title: 'Steady Waves', durationSeconds: 900 },
    ],
  },
  {
    id: 'luteal-deep-ambient',
    title: 'Deep Ambient Rest',
    description: 'Slow, layered ambient textures for winding down.',
    durationMinutes: 20,
    moodTag: 'sleepy',
    cyclePhase: 'luteal',
    soundType: 'ambient',
    tracks: [
      { id: 'la1', title: 'Heavy Clouds', durationSeconds: 400 },
      { id: 'la2', title: 'Slow Descent', durationSeconds: 400 },
      { id: 'la3', title: 'Still Water', durationSeconds: 400 },
    ],
  },
  {
    id: 'luteal-slow-vocals',
    title: 'Slow and Held',
    description: 'Slow, tender vocal pieces that hold space gently.',
    durationMinutes: 20,
    moodTag: 'comforting',
    cyclePhase: 'luteal',
    soundType: 'vocals',
    tracks: [
      { id: 'lv1', title: 'Cradle Song', durationSeconds: 300 },
      { id: 'lv2', title: 'Safe Here', durationSeconds: 300 },
      { id: 'lv3', title: 'Letting Go', durationSeconds: 300 },
      { id: 'lv4', title: 'Night Prayer', durationSeconds: 300 },
    ],
  },
  {
    id: 'luteal-grounding-freq',
    title: 'Grounding Frequencies',
    description: 'Low frequency tones and binaural-style layers for deep calm.',
    durationMinutes: 10,
    moodTag: 'overwhelmed',
    cyclePhase: 'luteal',
    soundType: 'ambient',
    tracks: [
      { id: 'lg1', title: 'Root Tone', durationSeconds: 300 },
      { id: 'lg2', title: 'Earthbound', durationSeconds: 300 },
    ],
  },
]

export function getPlaylistsForPhase(phase: SoundsCyclePhase): Playlist[] {
  return allPlaylists.filter((p) => p.cyclePhase === phase)
}

export function getPlaylistsForMood(mood: SoundMood): Playlist[] {
  return allPlaylists.filter((p) => p.moodTag === mood)
}

export function getFilteredPlaylists(
  phase: SoundsCyclePhase,
  moodOverride: SoundMood | null,
  preferredTypes: SoundPreference[],
): Playlist[] {
  let playlists: Playlist[]

  if (moodOverride) {
    // Mood override: show all playlists matching the mood across all phases
    playlists = getPlaylistsForMood(moodOverride)
  } else {
    // Default: show playlists for the current phase
    playlists = getPlaylistsForPhase(phase)
  }

  // Filter by preferred sound types if any are selected
  if (preferredTypes.length > 0) {
    const filtered = playlists.filter((p) => preferredTypes.includes(p.soundType))
    // If filtering removes everything, return unfiltered
    if (filtered.length > 0) return filtered
  }

  return playlists
}

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export function formatMinutes(minutes: number): string {
  if (minutes < 60) return `${minutes} min`
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  if (mins === 0) return `${hours} hr`
  return `${hours} hr ${mins} min`
}

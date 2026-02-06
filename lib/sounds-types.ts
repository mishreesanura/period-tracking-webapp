export type SoundsCyclePhase = 'menstrual' | 'follicular' | 'ovulation' | 'luteal'

export type SoundMood = 'comforting' | 'calm' | 'overwhelmed' | 'sleepy' | 'focus'

export type SoundPreference = 'instrumental' | 'vocals' | 'nature' | 'ambient'

export type TimeOfDay = 'morning' | 'evening' | 'night'

export interface Playlist {
  id: string
  title: string
  description: string
  durationMinutes: number
  moodTag: SoundMood
  cyclePhase: SoundsCyclePhase
  soundType: SoundPreference
  tracks: Track[]
}

export interface Track {
  id: string
  title: string
  durationSeconds: number
}

export interface PlayerState {
  isPlaying: boolean
  currentPlaylist: Playlist | null
  currentTrackIndex: number
  volume: number
  timerMinutes: number | null
  timerRemaining: number | null
  elapsed: number
}

export interface UserSoundPreferences {
  preferredTypes: SoundPreference[]
}

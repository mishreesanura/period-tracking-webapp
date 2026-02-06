'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, Settings } from 'lucide-react'
import { calculateCyclePhase } from '@/lib/cycle-utils'
import { mapCyclePhaseToSounds, getFilteredPlaylists } from '@/lib/sounds-utils'
import type { SoundsCyclePhase, SoundMood, SoundPreference, Playlist } from '@/lib/sounds-types'
import { SoundsPhaseHeader } from '@/components/sounds-phase-header'
import { SoundsMoodSelector } from '@/components/sounds-mood-selector'
import { SoundsPlaylistCard } from '@/components/sounds-playlist-card'
import { SoundsPlayer } from '@/components/sounds-player'
import { SoundsPreferences } from '@/components/sounds-preferences'

export default function SoundsPage() {
  const [currentPhase, setCurrentPhase] = useState<SoundsCyclePhase>('follicular')
  const [moodOverride, setMoodOverride] = useState<SoundMood | null>(null)
  const [preferredTypes, setPreferredTypes] = useState<SoundPreference[]>([])
  const [showSettings, setShowSettings] = useState(false)
  const [activePlaylist, setActivePlaylist] = useState<Playlist | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cycleStartDate')
      if (saved) {
        const cycleStart = new Date(saved)
        const today = new Date()
        const cycleData = calculateCyclePhase(today, cycleStart)
        setCurrentPhase(mapCyclePhaseToSounds(cycleData.phase))
      }

      const savedPrefs = localStorage.getItem('soundPreferences')
      if (savedPrefs) {
        try {
          const parsed = JSON.parse(savedPrefs)
          if (Array.isArray(parsed.preferredTypes)) {
            setPreferredTypes(parsed.preferredTypes)
          }
        } catch {
          // ignore
        }
      }
    }
  }, [])

  const handleTogglePreference = (type: SoundPreference) => {
    setPreferredTypes((prev) => {
      const next = prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
      if (typeof window !== 'undefined') {
        localStorage.setItem('soundPreferences', JSON.stringify({ preferredTypes: next }))
      }
      return next
    })
  }

  const playlists = getFilteredPlaylists(currentPhase, moodOverride, preferredTypes)

  const handlePlayPlaylist = (playlist: Playlist) => {
    setActivePlaylist(playlist)
    setIsPlaying(true)
  }

  const handlePause = () => {
    setIsPlaying(false)
  }

  const handlePlay = () => {
    setIsPlaying(true)
  }

  const handleStop = () => {
    setIsPlaying(false)
    setActivePlaylist(null)
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Link>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline text-sm font-medium">Settings</span>
          </button>
        </div>

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Sounds
          </h1>
          <p className="text-muted-foreground text-pretty">
            {"Here\u2019s a sound that might hold you gently right now. Everything here is optional."}
          </p>
        </div>

        {/* Settings */}
        {showSettings && (
          <div className="mb-8">
            <SoundsPreferences
              preferred={preferredTypes}
              onToggle={handleTogglePreference}
              onClose={() => setShowSettings(false)}
            />
          </div>
        )}

        {/* Phase context */}
        {!moodOverride && (
          <div className="mb-6">
            <SoundsPhaseHeader phase={currentPhase} />
          </div>
        )}

        {/* Mood override selector */}
        <div className="mb-8">
          <SoundsMoodSelector activeMood={moodOverride} onSelect={setMoodOverride} />
        </div>

        {/* Player (sticky at top when active) */}
        {activePlaylist && (
          <div className="mb-8 sticky top-20 z-40">
            <SoundsPlayer
              playlist={activePlaylist}
              isPlaying={isPlaying}
              onPlay={handlePlay}
              onPause={handlePause}
              onStop={handleStop}
            />
          </div>
        )}

        {/* Playlists */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-1">
            {moodOverride ? `Sounds for when you feel ${moodOverride}` : 'Suggested for you'}
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Tap to play. Single tap starts playback.
          </p>
          <div className="space-y-3">
            {playlists.length > 0 ? (
              playlists.map((playlist) => (
                <SoundsPlaylistCard
                  key={playlist.id}
                  playlist={playlist}
                  isActive={activePlaylist?.id === playlist.id}
                  isPlaying={activePlaylist?.id === playlist.id && isPlaying}
                  onPlay={handlePlayPlaylist}
                  onPause={handlePause}
                />
              ))
            ) : (
              <div className="rounded-lg border border-border bg-muted/30 p-8 text-center">
                <p className="text-muted-foreground text-sm">
                  No playlists match your current preferences. Try adjusting your sound type settings.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Phase Navigation */}
        {!moodOverride && (
          <div className="mb-8">
            <h2 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
              Explore other phases
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['menstrual', 'follicular', 'ovulation', 'luteal'] as SoundsCyclePhase[]).map(
                (phase) => (
                  <button
                    key={phase}
                    onClick={() => setCurrentPhase(phase)}
                    className={`px-3 py-2.5 rounded-lg text-sm font-medium border transition-colors ${
                      currentPhase === phase
                        ? 'bg-foreground text-background border-foreground'
                        : 'bg-card text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground'
                    }`}
                  >
                    {phase.charAt(0).toUpperCase() + phase.slice(1)}
                  </button>
                ),
              )}
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="rounded-lg border border-border bg-muted/30 p-6">
          <h2 className="font-semibold text-foreground mb-3">
            How this works
          </h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-3">
              <span className="text-foreground font-bold">{'\u2192'}</span>
              <span>Sounds are suggested based on your cycle phase and how you feel</span>
            </li>
            <li className="flex gap-3">
              <span className="text-foreground font-bold">{'\u2192'}</span>
              <span>Use the mood selector to override cycle suggestions for this session</span>
            </li>
            <li className="flex gap-3">
              <span className="text-foreground font-bold">{'\u2192'}</span>
              <span>Set a timer to let sounds fade naturally</span>
            </li>
            <li className="flex gap-3">
              <span className="text-foreground font-bold">{'\u2192'}</span>
              <span>Silence is always an option. No pressure, ever.</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  )
}

'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Play, Pause, Square, Volume2, VolumeX, Timer, X } from 'lucide-react'
import type { Playlist } from '@/lib/sounds-types'
import { formatDuration } from '@/lib/sounds-utils'

interface SoundsPlayerProps {
  playlist: Playlist
  isPlaying: boolean
  onPlay: () => void
  onPause: () => void
  onStop: () => void
}

const TIMER_OPTIONS = [10, 20, 30, 45, 60]

export function SoundsPlayer({
  playlist,
  isPlaying,
  onPlay,
  onPause,
  onStop,
}: SoundsPlayerProps) {
  const [volume, setVolume] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [timerMinutes, setTimerMinutes] = useState<number | null>(null)
  const [timerRemaining, setTimerRemaining] = useState<number | null>(null)
  const [showTimerPicker, setShowTimerPicker] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const timerIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const totalDuration = playlist.tracks.reduce((sum, t) => sum + t.durationSeconds, 0)

  // Stable stop callback
  const handleStop = useCallback(() => {
    onStop()
  }, [onStop])

  // Elapsed time simulation
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setElapsed((prev) => {
          if (prev >= totalDuration) {
            if (intervalRef.current) clearInterval(intervalRef.current)
            return totalDuration
          }
          return prev + 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPlaying, totalDuration])

  // Timer countdown
  useEffect(() => {
    if (isPlaying && timerRemaining !== null && timerRemaining > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimerRemaining((prev) => {
          if (prev === null || prev <= 1) {
            if (timerIntervalRef.current) clearInterval(timerIntervalRef.current)
            handleStop()
            return null
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current)
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current)
    }
  }, [isPlaying, timerRemaining, handleStop])

  // Reset elapsed when playlist changes
  useEffect(() => {
    setElapsed(0)
    setTimerMinutes(null)
    setTimerRemaining(null)
  }, [playlist.id])

  const handleSetTimer = (minutes: number) => {
    setTimerMinutes(minutes)
    setTimerRemaining(minutes * 60)
    setShowTimerPicker(false)
  }

  const handleClearTimer = () => {
    setTimerMinutes(null)
    setTimerRemaining(null)
  }

  const progress = totalDuration > 0 ? (elapsed / totalDuration) * 100 : 0

  // Determine current track
  let accum = 0
  let currentTrackIndex = 0
  for (let i = 0; i < playlist.tracks.length; i++) {
    accum += playlist.tracks[i].durationSeconds
    if (elapsed < accum) {
      currentTrackIndex = i
      break
    }
    if (i === playlist.tracks.length - 1) {
      currentTrackIndex = i
    }
  }

  const currentTrack = playlist.tracks[currentTrackIndex]

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      {/* Progress bar */}
      <div className="h-1 bg-muted">
        <div
          className="h-full bg-foreground/40 transition-all duration-1000 ease-linear"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>

      <div className="p-5">
        {/* Track info */}
        <div className="mb-4">
          <p className="text-xs text-muted-foreground mb-1">{playlist.title}</p>
          <p className="text-sm font-medium text-foreground">{currentTrack.title}</p>
        </div>

        {/* Time display */}
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
          <span>{formatDuration(elapsed)}</span>
          <span>{formatDuration(totalDuration)}</span>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          {/* Left: Volume */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                setVolume(Number.parseFloat(e.target.value))
                if (isMuted) setIsMuted(false)
              }}
              className="w-16 h-1 accent-foreground"
              aria-label="Volume"
            />
          </div>

          {/* Center: Play/Pause + Stop */}
          <div className="flex items-center gap-2">
            <button
              onClick={onStop}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Stop"
            >
              <Square className="h-4 w-4" />
            </button>
            <button
              onClick={isPlaying ? onPause : onPlay}
              className="p-3 rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
            </button>
          </div>

          {/* Right: Timer */}
          <div className="relative">
            {timerRemaining !== null ? (
              <div className="flex items-center gap-1">
                <span className="text-xs text-muted-foreground font-medium">
                  {formatDuration(timerRemaining)}
                </span>
                <button
                  onClick={handleClearTimer}
                  className="p-1 rounded text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Clear timer"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowTimerPicker(!showTimerPicker)}
                className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label="Set timer"
              >
                <Timer className="h-4 w-4" />
              </button>
            )}

            {/* Timer picker dropdown */}
            {showTimerPicker && (
              <div className="absolute right-0 bottom-full mb-2 bg-card border border-border rounded-lg shadow-lg p-2 z-10 min-w-[120px]">
                <p className="text-[11px] text-muted-foreground px-2 py-1 mb-1">Sleep timer</p>
                {TIMER_OPTIONS.map((mins) => (
                  <button
                    key={mins}
                    onClick={() => handleSetTimer(mins)}
                    className="w-full text-left px-3 py-1.5 text-sm text-foreground hover:bg-muted rounded transition-colors"
                  >
                    {mins} min
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

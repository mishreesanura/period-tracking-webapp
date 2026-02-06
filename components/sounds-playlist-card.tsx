'use client'

import { Play, Pause, Clock } from 'lucide-react'
import type { Playlist } from '@/lib/sounds-types'
import { getMoodLabel, getMoodTagColor, getSoundTypeLabel, formatMinutes } from '@/lib/sounds-utils'

interface SoundsPlaylistCardProps {
  playlist: Playlist
  isActive: boolean
  isPlaying: boolean
  onPlay: (playlist: Playlist) => void
  onPause: () => void
}

export function SoundsPlaylistCard({
  playlist,
  isActive,
  isPlaying,
  onPlay,
  onPause,
}: SoundsPlaylistCardProps) {
  const handleClick = () => {
    if (isActive && isPlaying) {
      onPause()
    } else {
      onPlay(playlist)
    }
  }

  return (
    <button
      onClick={handleClick}
      className={`w-full text-left rounded-lg border p-5 transition-all ${
        isActive
          ? 'border-foreground/30 bg-muted/60 shadow-sm'
          : 'border-border bg-card hover:border-foreground/20 hover:shadow-sm'
      }`}
      aria-label={`${isActive && isPlaying ? 'Pause' : 'Play'} ${playlist.title}`}
    >
      <div className="flex items-start gap-4">
        {/* Play/Pause indicator */}
        <div
          className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
            isActive
              ? 'bg-foreground text-background'
              : 'bg-muted text-muted-foreground'
          }`}
        >
          {isActive && isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4 ml-0.5" />
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground text-sm mb-1 truncate">
            {playlist.title}
          </h3>
          <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
            {playlist.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium ${getMoodTagColor(playlist.moodTag)}`}>
              {getMoodLabel(playlist.moodTag)}
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-muted text-muted-foreground">
              {getSoundTypeLabel(playlist.soundType)}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
              <Clock className="h-3 w-3" />
              {formatMinutes(playlist.durationMinutes)}
            </span>
          </div>
        </div>
      </div>
    </button>
  )
}

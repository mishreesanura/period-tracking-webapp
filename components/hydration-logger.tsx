'use client'

import { useState, useEffect } from 'react'
import { Droplet } from 'lucide-react'
import { calculateGlassesFromAmount, formatGlassCount, getProgressPercentage, getProgressMessage } from '@/lib/hydration-utils'
import type { HydrationEntry } from '@/lib/hydration-types'

interface HydrationLoggerProps {
  todayEntries: HydrationEntry[]
  onLogWater: (amount: 'half' | 'full') => void
}

export function HydrationLogger({
  todayEntries,
  onLogWater,
}: HydrationLoggerProps) {
  const [glassCount, setGlassCount] = useState(0)

  useEffect(() => {
    const count = todayEntries.reduce((sum, entry) => {
      return sum + calculateGlassesFromAmount(entry.amount)
    }, 0)
    setGlassCount(count)
  }, [todayEntries])

  const progressPercent = getProgressPercentage(glassCount)
  const message = getProgressMessage(glassCount)

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Droplet className="h-5 w-5 text-blue-500" />
        <h2 className="font-semibold text-neutral-900">Hydration Today</h2>
      </div>

      {/* Progress Animation (Filling Glass) */}
      <div className="mb-8 flex flex-col items-center">
        <div className="relative w-40 h-48">
          <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-xl overflow-visible">
            <defs>
              <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#60A5FA" /> {/* blue-400 */}
                <stop offset="100%" stopColor="#2563EB" /> {/* blue-600 */}
              </linearGradient>
              <mask id="glassMask">
                <path d="M20,10 L30,100 Q30,110 40,110 L60,110 Q70,110 70,100 L80,10 Z" fill="white" />
              </mask>
            </defs>

            {/* Glass Background */}
            <path 
              d="M20,10 L30,100 Q30,110 40,110 L60,110 Q70,110 70,100 L80,10 Z" 
              className="fill-blue-50/50" 
            />

            {/* Water Fill */}
            <rect
              x="0"
              y={110 - (Math.min(glassCount / 8, 1) * 100)}
              width="100"
              height="110"
              fill="url(#waterGradient)"
              mask="url(#glassMask)"
              className="transition-[y] duration-1000 ease-out"
            />
            
            {/* Glass Outline */}
            <path 
              d="M20,10 L30,100 Q30,110 40,110 L60,110 Q70,110 70,100 L80,10" 
              className="fill-none stroke-white/50 stroke-[3]"
              strokeLinecap="round"
            />
             <path 
              d="M20,10 L30,100 Q30,110 40,110 L60,110 Q70,110 70,100 L80,10" 
              className="fill-none stroke-blue-200 stroke-[2]"
              strokeLinecap="round"
            />
             
             {/* Rim reflection */}
             <path d="M22,12 L78,12" className="stroke-white/40 stroke-1" />

          </svg>

          {/* Text Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-2">
            <span className="text-4xl font-bold text-blue-900/80 drop-shadow-sm">
              {glassCount}
            </span>
             <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800/60 mt-1">
               Glasses
             </span>
             <span className="text-[10px] text-blue-500/80 mt-1 font-medium bg-white/50 px-2 py-0.5 rounded-full">
                {Math.round(progressPercent)}% of goal
             </span>
          </div>
        </div>

        {/* Message */}
        <p className="text-sm font-medium text-blue-600/80 mt-2">{message}</p>
      </div>

      {/* Log Buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => onLogWater('half')}
          className="flex-1 px-4 py-3 rounded-lg border-2 border-blue-100 text-blue-600 font-medium hover:bg-blue-50 hover:border-blue-200 transition-colors"
        >
          + ½ glass
        </button>
        <button
          onClick={() => onLogWater('full')}
          className="flex-1 px-4 py-3 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 shadow-sm shadow-blue-200 transition-all hover:shadow-md"
        >
          + 1 glass
        </button>
      </div>

      {/* Entries List */}
      {todayEntries.length > 0 && (
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-xs font-semibold text-muted-foreground mb-3">
            TODAY'S ENTRIES
          </p>
          <div className="space-y-2">
            {todayEntries.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center justify-between px-3 py-2 rounded-lg bg-muted/30 text-sm"
              >
                <span className="text-foreground">
                  {entry.amount === 'full' ? '1 glass' : '½ glass'}
                </span>
                <span className="text-xs text-muted-foreground">
                  {new Date(entry.timestamp).toLocaleTimeString([], {
                    hour: 'numeric',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

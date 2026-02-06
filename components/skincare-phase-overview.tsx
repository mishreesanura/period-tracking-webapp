'use client'

import type { SkincareCyclePhase } from '@/lib/skincare-types'
import { getSkinPhaseInfo, getPhaseAccentColor, getPhaseAccentText } from '@/lib/skincare-utils'

interface SkincarePhaseOverviewProps {
  phase: SkincareCyclePhase
}

export function SkincarePhaseOverview({ phase }: SkincarePhaseOverviewProps) {
  const info = getSkinPhaseInfo(phase)
  const accentColor = getPhaseAccentColor(phase)
  const accentText = getPhaseAccentText(phase)

  return (
    <div className={`rounded-lg border p-6 ${accentColor}`}>
      <div className="mb-4">
        <p className={`text-xs font-medium uppercase tracking-wide mb-1 ${accentText}`}>
          {info.label}
        </p>
        <p className="text-foreground text-lg font-medium text-pretty leading-relaxed">
          {info.uiCopy}
        </p>
      </div>

      <div className="mb-4">
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-2">
          What you might notice
        </p>
        <div className="flex flex-wrap gap-2">
          {info.commonSkinState.map((state) => (
            <span
              key={state}
              className="text-xs px-2.5 py-1 rounded-full bg-card/80 text-foreground border border-border"
            >
              {state}
            </span>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-2">
          Routine focus
        </p>
        <ul className="space-y-1">
          {info.routineFocus.map((focus) => (
            <li
              key={focus}
              className="text-sm text-muted-foreground flex items-start gap-2"
            >
              <span className={`mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0 ${accentText} bg-current`} />
              {focus}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

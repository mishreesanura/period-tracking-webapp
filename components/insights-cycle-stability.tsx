'use client'

import { Card } from '@/components/ui/card'
import { AlertCircle, TrendingUp, TrendingDown } from 'lucide-react'

interface CycleStabilityProps {
  cycleLength: number
  variability: number
  missedCycles: number
  delayedCycles: number
}

export function InsightsCycleStability({
  cycleLength,
  variability,
  missedCycles,
  delayedCycles,
}: CycleStabilityProps) {
  const getTrend = () => {
    if (variability > 4) return { icon: TrendingUp, text: 'More variation', color: 'text-yellow-600' }
    return { icon: TrendingDown, text: 'Stable', color: 'text-green-600' }
  }

  const trend = getTrend()
  const TrendIcon = trend.icon

  const hasIssues = missedCycles > 0 || delayedCycles > 0

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Cycle Stability</h3>
          <p className="text-sm text-muted-foreground">How consistent your cycle has been</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted/40 rounded-lg p-4">
            <div className="text-3xl font-bold text-foreground">{cycleLength}</div>
            <div className="text-xs text-muted-foreground mt-1">Average cycle length (days)</div>
          </div>

          <div className="bg-muted/40 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <TrendIcon className={`h-5 w-5 ${trend.color}`} />
              <div>
                <div className="text-sm font-medium text-foreground">±{variability.toFixed(1)}</div>
                <div className="text-xs text-muted-foreground">days variation</div>
              </div>
            </div>
          </div>
        </div>

        {hasIssues && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-yellow-900">Pattern changes detected</p>
              <p className="text-xs text-yellow-800 mt-1">
                {missedCycles > 0 && `${missedCycles} missed cycle(s). `}
                {delayedCycles > 0 && `${delayedCycles} delayed cycle(s).`}
              </p>
            </div>
          </div>
        )}

        <p className="text-sm text-muted-foreground leading-relaxed">
          {variability < 2
            ? 'Your cycle length has been very consistent over the past 4 cycles.'
            : variability < 4
              ? `Your cycle length has varied more than usual over the past 4 cycles (±${variability.toFixed(1)} days).`
              : 'Your cycle is showing more variation than typical. This can be normal, but worth monitoring.'}
        </p>
      </div>
    </Card>
  )
}

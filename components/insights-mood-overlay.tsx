'use client'

import { Card } from '@/components/ui/card'
import type { MoodTrend } from '@/lib/insights-types'

interface MoodStressOverlayProps {
  moodTrends: MoodTrend[]
}

export function InsightsMoodOverlay({ moodTrends }: MoodStressOverlayProps) {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Mood & Stress Connection</h3>
          <p className="text-sm text-muted-foreground">
            How emotional patterns correlate with your cycle and stress levels
          </p>
        </div>

        <div className="space-y-4">
          {moodTrends.map((trend) => (
            <div key={`${trend.mood}-${trend.cyclePhase}`} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{trend.mood}</p>
                  <p className="text-xs text-muted-foreground">{trend.cyclePhase}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-foreground">{trend.frequency}%</div>
                  <div className="text-xs text-muted-foreground">of cycle</div>
                </div>
              </div>

              <div className="flex gap-1">
                {/* Frequency indicator */}
                <div className="flex-1">
                  <div className="text-xs text-muted-foreground mb-1">Frequency</div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-400 rounded-full"
                      style={{ width: `${trend.frequency}%` }}
                    />
                  </div>
                </div>

                {/* Stress correlation */}
                <div className="flex-1">
                  <div className="text-xs text-muted-foreground mb-1">Stress link</div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-400 rounded-full"
                      style={{ width: `${trend.stressCorrelation * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-900 leading-relaxed">
            <strong>What this means:</strong> Lower moods often appear before your period, especially during
            high-stress weeks. This is a normal hormonal response, not a personal failing.
          </p>
        </div>
      </div>
    </Card>
  )
}

'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Lightbulb } from 'lucide-react'
import type { AIInsight } from '@/lib/insights-types'

interface AIInsightCardProps {
  insight: AIInsight
}

export function InsightsAIInsightCard({ insight }: AIInsightCardProps) {
  const severityColor = {
    low: 'bg-blue-100 text-blue-800',
    medium: 'bg-amber-100 text-amber-800',
    high: 'bg-red-100 text-red-800',
  }

  return (
    <Card className="p-6 border-l-4 border-l-purple-500">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <Lightbulb className="h-5 w-5 text-purple-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h4 className="font-semibold text-foreground">{insight.title}</h4>
              <Badge className={`mt-2 ${severityColor[insight.severity]}`}>
                {insight.cyclesAffected} {insight.cyclesAffected === 1 ? 'cycle' : 'cycles'} affected
              </Badge>
            </div>
          </div>
        </div>

        <div className="space-y-3 ml-8">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">What we noticed</p>
            <p className="text-sm text-foreground mt-1">{insight.whatNoticed}</p>
          </div>

          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">How often</p>
            <p className="text-sm text-foreground mt-1">{insight.frequency}</p>
          </div>

          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">What it could mean</p>
            <p className="text-sm text-foreground mt-1">{insight.whatItCouldBe}</p>
          </div>

          {insight.whatYouCanDo && (
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">What you can do</p>
              <p className="text-sm text-foreground mt-1">{insight.whatYouCanDo}</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}

import {
  generateMockPatternData,
  generateAIInsights,
  assessRiskSignals,
  assessPCOSPatterns,
} from '@/lib/insights-utils'
import { InsightsCycleStability } from '@/components/insights-cycle-stability'
import { InsightsSymptomFrequency } from '@/components/insights-symptom-frequency'
import { InsightsMoodOverlay } from '@/components/insights-mood-overlay'
import { InsightsAIInsightCard } from '@/components/insights-ai-insight-card'
import { InsightsRiskSignals } from '@/components/insights-risk-signals'
import { InsightsPCOSModule } from '@/components/insights-pcos-module'
import { InsightsDoctorExport } from '@/components/insights-doctor-export'

export const metadata = {
  title: 'Health Insights | My Cycle',
  description: 'Pattern awareness, AI insights, and condition-awareness for your cycle health.',
}

export default function InsightsPage() {
  // Generate mock data - in production, this would come from user data
  const patternData = generateMockPatternData()
  const aiInsights = generateAIInsights(patternData)
  const riskSignal = assessRiskSignals(patternData)
  const pcosAwareness = assessPCOSPatterns(patternData, 5) // 5 cycles tracked

  return (
    <main className="min-h-screen bg-background pt-6 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">Health Insights</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Understanding your patterns. What your body is telling you over time.
          </p>
        </div>

        {/* Navigation info */}
        <div className="mb-8 p-4 bg-muted/30 rounded-lg border border-border">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold">How this works:</span> This dashboard analyzes your cycle, symptoms, and
            mood patterns to help you understand what's happening with your body. No judgment. No diagnosis. Just
            helpful observations.
          </p>
        </div>

        {/* Layer 1: Pattern Visualization */}
        <div className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground">What's Happening</h2>
            <p className="text-muted-foreground mt-1">Pure observation of your patterns</p>
          </div>

          <div className="grid gap-6">
            <InsightsCycleStability
              cycleLength={patternData.cycleLength}
              variability={patternData.cycleVariability}
              missedCycles={patternData.missedCycles}
              delayedCycles={patternData.delayedCycles}
            />

            <InsightsSymptomFrequency symptoms={patternData.symptoms} />

            <InsightsMoodOverlay moodTrends={patternData.moodTrends} />
          </div>
        </div>

        {/* Layer 2: AI Insights */}
        <div className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground">What It Might Mean</h2>
            <p className="text-muted-foreground mt-1">AI-assisted interpretation of your patterns</p>
          </div>

          <div className="grid gap-4">
            {aiInsights.length > 0 ? (
              aiInsights.map((insight) => <InsightsAIInsightCard key={insight.id} insight={insight} />)
            ) : (
              <div className="p-6 text-center text-muted-foreground">No significant patterns detected yet.</div>
            )}
          </div>
        </div>

        {/* Layer 3: Risk & Anomaly Signals */}
        <div className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground">What to Keep an Eye On</h2>
            <p className="text-muted-foreground mt-1">Gentle signals about your patterns</p>
          </div>

          <InsightsRiskSignals signal={riskSignal} />
        </div>

        {/* Layer 4: PCOS Condition-Awareness */}
        {pcosAwareness.activated && (
          <div className="mb-12">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground">Condition-Specific Insights</h2>
              <p className="text-muted-foreground mt-1">Pattern awareness related to specific conditions</p>
            </div>

            <InsightsPCOSModule awareness={pcosAwareness} />
          </div>
        )}

        {/* Doctor Support */}
        <div className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground">Doctor-Supportive Tools</h2>
            <p className="text-muted-foreground mt-1">Making your doctor visits more productive</p>
          </div>

          <InsightsDoctorExport
            cycleLength={patternData.cycleLength}
            cyclesTracked={5}
            patterns={riskSignal.patterns}
          />
        </div>

        {/* Control & Ethics */}
        <div className="grid gap-6 mb-8">
          <div className="p-6 bg-muted/30 rounded-lg border border-border">
            <h3 className="font-semibold text-foreground mb-3">You're in Control</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li className="flex gap-2">
                <span className="text-primary">→</span>
                <span>You can enable or disable any insights at any time</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">→</span>
                <span>You can disable condition-awareness modules if you prefer</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">→</span>
                <span>All your data stays on your device—nothing is shared</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">→</span>
                <span>You can delete all insights anytime you want</span>
              </li>
            </ul>
          </div>

          <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-3">Important Disclaimer</h3>
            <p className="text-sm text-blue-800 leading-relaxed">
              This tool provides observations and pattern recognition to support your health conversations with your
              doctor. It is <strong>not</strong> medical diagnosis. These observations should inform discussions with
              healthcare providers, not replace professional medical evaluation. Only a doctor can diagnose conditions.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

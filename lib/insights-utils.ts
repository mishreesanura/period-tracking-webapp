import {
  PatternData,
  SymptomFrequency,
  AIInsight,
  RiskSignal,
  RiskZone,
  PCOSAwareness,
  SimilarityBand,
} from './insights-types'

// Mock data generator for demonstration
export function generateMockPatternData(): PatternData {
  return {
    cycleLength: 28,
    cycleVariability: 2.5,
    missedCycles: 0,
    delayedCycles: 1,
    symptoms: [
      {
        symptom: 'Cramps',
        frequency: 85,
        byPhase: { period: 95, luteal: 20, follicular: 5 },
        trend: 'stable',
      },
      {
        symptom: 'Acne',
        frequency: 65,
        byPhase: { luteal: 90, period: 40, follicular: 15 },
        trend: 'increasing',
      },
      {
        symptom: 'Fatigue',
        frequency: 70,
        byPhase: { period: 90, pms: 75, luteal: 50 },
        trend: 'stable',
      },
      {
        symptom: 'Mood swings',
        frequency: 60,
        byPhase: { pms: 85, luteal: 70, period: 30 },
        trend: 'increasing',
      },
      {
        symptom: 'Bloating',
        frequency: 55,
        byPhase: { pms: 80, luteal: 45, period: 20 },
        trend: 'stable',
      },
    ],
    moodTrends: [
      { mood: 'Low mood', cyclePhase: 'luteal', frequency: 70, stressCorrelation: 0.65 },
      { mood: 'Anxiety', cyclePhase: 'pms', frequency: 60, stressCorrelation: 0.55 },
      { mood: 'Calm', cyclePhase: 'follicular', frequency: 80, stressCorrelation: 0.2 },
    ],
  }
}

export function generateAIInsights(patterns: PatternData): AIInsight[] {
  const insights: AIInsight[] = []

  // Fatigue + Mood insight
  insights.push({
    id: 'insight-1',
    title: 'Fatigue & Mood Connection',
    whatNoticed:
      'Over the last 5 cycles, fatigue and mood dips have appeared together before your period.',
    frequency: 'In 4 out of 5 cycles',
    whatItCouldBe:
      'This pattern is common during hormonal shifts, especially when stress is high. Your body is working hard during this phase.',
    whatYouCanDo:
      'Consider extra rest, gentle movement, and stress management during your luteal phase.',
    severity: 'medium',
    cyclesAffected: 4,
  })

  // Acne trend insight
  if (patterns.symptoms.some((s) => s.symptom === 'Acne' && s.trend === 'increasing')) {
    insights.push({
      id: 'insight-2',
      title: 'Increasing Acne Pattern',
      whatNoticed: 'Your acne has been more persistent in recent cycles, particularly in the luteal phase.',
      frequency: 'Noticeable in the last 3 cycles',
      whatItCouldBe:
        'Acne often correlates with hormonal fluctuations. Changes in skincare routine, stress, or sleep can amplify this.',
      whatYouCanDo: 'Maintain consistent skincare, track what helps, and consider phase-aware products.',
      severity: 'low',
      cyclesAffected: 3,
    })
  }

  // Stress-mood correlation
  const anxietyTrend = patterns.moodTrends.find((m) => m.mood === 'Anxiety')
  if (anxietyTrend && anxietyTrend.stressCorrelation > 0.5) {
    insights.push({
      id: 'insight-3',
      title: 'Stress & PMS Connection',
      whatNoticed: 'During high-stress weeks, your PMS symptoms tend to intensify.',
      frequency: 'Seen in recent months',
      whatItCouldBe:
        'Stress amplifies hormonal sensitivity. When cortisol is high, it can make PMS more noticeable.',
      whatYouCanDo: 'Stress management during your luteal phase can help. Try relaxation, movement, or time in nature.',
      severity: 'medium',
      cyclesAffected: 2,
    })
  }

  return insights
}

export function assessRiskSignals(patterns: PatternData): RiskSignal {
  let zone: RiskZone = 'stable'
  const patterns_list: string[] = []

  // Assess cycle stability
  if (patterns.cycleVariability > 4) {
    zone = 'monitor'
    patterns_list.push('Cycle length varies more than usual')
  }

  if (patterns.missedCycles > 0) {
    zone = 'consider'
    patterns_list.push('Irregular or missed cycles detected')
  }

  if (patterns.delayedCycles > 2) {
    zone = 'monitor'
    patterns_list.push('Multiple delayed cycles in recent history')
  }

  // Assess symptom severity
  const severeSymptoms = patterns.symptoms.filter((s) => s.frequency > 80)
  if (severeSymptoms.length > 2) {
    zone = zone === 'stable' ? 'monitor' : 'consider'
    patterns_list.push(`Multiple persistent symptoms: ${severeSymptoms.map((s) => s.symptom).join(', ')}`)
  }

  const description =
    zone === 'stable'
      ? 'Your patterns appear stable. Nothing unusual detected over the past months.'
      : zone === 'monitor'
        ? 'Some of your patterns fall into the "worth monitoring" range. Keep tracking to understand what might be causing changes.'
        : 'Persistent anomalies detected. These patterns deserve professional attention. Consider speaking with your doctor.'

  return {
    zone,
    patterns: patterns_list,
    description,
  }
}

export function assessPCOSPatterns(patterns: PatternData, cyclesTracked: number): PCOSAwareness {
  const pcosPatterns = []
  let similarityScore = 0

  // Check for cycle irregularity
  if (patterns.cycleVariability > 3 || patterns.missedCycles > 0) {
    pcosPatterns.push({
      category: 'Cycle Patterns',
      patterns: ['Irregular or longer cycles', 'Cycle length variation'],
      duration: 'Across multiple months',
      confidence: 0.7,
    })
    similarityScore += 30
  }

  // Check for acne/hair issues
  const acneSymptom = patterns.symptoms.find((s) => s.symptom === 'Acne')
  if (acneSymptom && acneSymptom.frequency > 60) {
    pcosPatterns.push({
      category: 'Skin & Hair',
      patterns: ['Persistent acne', 'Concentration in luteal phase'],
      duration: '3-6 months',
      confidence: 0.65,
    })
    similarityScore += 25
  }

  // Check for mood instability
  const moodInstability = patterns.moodTrends.filter((m) => m.frequency > 60).length > 1
  if (moodInstability) {
    pcosPatterns.push({
      category: 'Emotional Patterns',
      patterns: ['Mood swings', 'Heightened emotional sensitivity'],
      duration: 'Throughout cycle',
      confidence: 0.6,
    })
    similarityScore += 20
  }

  // Check for fatigue
  const fatigueSymptom = patterns.symptoms.find((s) => s.symptom === 'Fatigue')
  if (fatigueSymptom && fatigueSymptom.frequency > 65) {
    pcosPatterns.push({
      category: 'Energy Levels',
      patterns: ['Persistent fatigue', 'Worse during luteal phase'],
      duration: 'Ongoing',
      confidence: 0.55,
    })
    similarityScore += 15
  }

  let similarityBand: SimilarityBand = 'low'
  if (similarityScore > 70) similarityBand = 'higher'
  else if (similarityScore > 40) similarityBand = 'moderate'

  const shouldActivate = cyclesTracked >= 3 && similarityScore > 40

  return {
    activated: shouldActivate,
    optedIn: false,
    cyclesTracked,
    patterns: pcosPatterns,
    similarityBand,
    explanation: `We notice some patterns commonly discussed during PCOS evaluations: ${pcosPatterns.map((p) => p.category).join(', ')}.`,
    nextSteps: [
      'Continue tracking your patterns',
      'Read about PCOS myths vs. facts',
      'Prepare questions for your doctor',
      'Export this summary to share with your healthcare provider',
    ],
  }
}

export function getRiskZoneColor(zone: RiskZone): string {
  const colors = {
    stable: 'bg-green-100 text-green-800 border-green-300',
    monitor: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    consider: 'bg-orange-100 text-orange-800 border-orange-300',
  }
  return colors[zone]
}

export function getRiskZoneIcon(zone: RiskZone): string {
  const icons = {
    stable: '🟢',
    monitor: '🟡',
    consider: '🟠',
  }
  return icons[zone]
}

export function getSimilarityBandLabel(band: SimilarityBand): string {
  const labels = {
    low: 'No strong patterns',
    moderate: 'Some patterns observed',
    higher: 'Multiple patterns present',
  }
  return labels[band]
}

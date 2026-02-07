import {
  generateMockPatternData,
  generateAIInsights,
  assessRiskSignals,
  assessPCOSPatterns,
} from "@/lib/insights-utils";
import { CycleSnapshotTile } from "@/components/bento/cycle-snapshot-tile";
import { PatternStabilityTile } from "@/components/bento/pattern-stability-tile";
import { AlertHighlightTile } from "@/components/bento/alert-highlight-tile";
import { SymptomBarChartTile } from "@/components/bento/symptom-bar-chart-tile";
import { MoodCorrelationTile } from "@/components/bento/mood-correlation-tile";
import { CyclePhaseRingTile } from "@/components/bento/cycle-phase-ring-tile";
import { AIInsightsSummaryTile } from "@/components/bento/ai-insights-summary-tile";
import { PatternAwarenessTile } from "@/components/bento/pattern-awareness-tile";
import { OverallStatusTile } from "@/components/bento/overall-status-tile";
import { Sparkles, Download } from "lucide-react";

export const metadata = {
  title: "Health Insights | My Cycle",
  description:
    "Pattern awareness, AI insights, and condition-awareness for your cycle health.",
};

export default function InsightsPage() {
  const patternData = generateMockPatternData();
  const aiInsights = generateAIInsights(patternData);
  const riskSignal = assessRiskSignals(patternData);
  const pcosAwareness = assessPCOSPatterns(patternData, 5);

  // Mock sparkline data (last 6 cycles)
  const recentCycleLengths = [27, 29, 28, 30, 27, 28];

  // Derive alert from top AI insight
  const topAlert = aiInsights[0];

  return (
    <main className="h-screen bg-gradient-to-br from-slate-50 via-rose-50/20 to-purple-50/20 p-5 overflow-hidden">
      <div className="mx-auto max-w-[1400px] h-full flex flex-col">
        {/* ─── Header bar ─── */}
        <div className="flex items-center justify-between mb-5 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-100">
              <Sparkles className="h-5 w-5 text-rose-500" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">
                Cycle Insights
              </h1>
              <p className="text-[11px] text-slate-400">
                Feb 2026 · Last 6 cycles
              </p>
            </div>
          </div>
          <button className="flex items-center gap-2 text-xs font-medium text-slate-500 bg-white px-4 py-2 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <Download className="h-3.5 w-3.5" />
            Export
          </button>
        </div>

        {/* ─── Bento Grid: 12 columns × 3 fixed rows ─── */}
        <div className="flex-1 grid grid-cols-12 grid-rows-[260px_260px_260px] gap-6 min-h-0">
          {/* ═══ TOP ROW ═══ */}

          {/* T1: Cycle Snapshot — hero tile */}
          <div className="col-span-5 bg-white rounded-2xl p-4 shadow-sm border border-slate-100/80 overflow-hidden">
            <CycleSnapshotTile
              cycleLength={patternData.cycleLength}
              regularity={92}
              wellnessScore={8.5}
            />
          </div>

          {/* T2: Pattern Stability */}
          <div className="col-span-5 bg-white rounded-2xl p-4 shadow-sm border border-slate-100/80 overflow-hidden">
            <PatternStabilityTile
              variability={patternData.cycleVariability}
              cycleLengths={recentCycleLengths}
            />
          </div>

          {/* T3: Key Alert */}
          <div className="col-span-2 bg-white rounded-2xl p-4 shadow-sm border border-slate-100/80 overflow-hidden">
            {topAlert ? (
              <AlertHighlightTile
                title={topAlert.title}
                description={topAlert.whatNoticed}
                severity={topAlert.severity}
              />
            ) : (
              <AlertHighlightTile
                title="All clear"
                description="No significant patterns flagged right now."
                severity="low"
              />
            )}
          </div>

          {/* ═══ MIDDLE ROW ═══ */}

          {/* M1: Symptom Frequency Bar Chart */}
          <div className="col-span-5 bg-white rounded-2xl p-4 shadow-sm border border-slate-100/80 overflow-hidden">
            <SymptomBarChartTile symptoms={patternData.symptoms} />
          </div>

          {/* M2: Mood & Stress Correlation */}
          <div className="col-span-5 bg-white rounded-2xl p-4 shadow-sm border border-slate-100/80 overflow-hidden">
            <MoodCorrelationTile moodTrends={patternData.moodTrends} />
          </div>

          {/* M3: Cycle Phase Ring Map */}
          <div className="col-span-2 bg-white rounded-2xl p-4 shadow-sm border border-slate-100/80 overflow-hidden">
            <CyclePhaseRingTile symptoms={patternData.symptoms} />
          </div>

          {/* ═══ BOTTOM ROW ═══ */}

          {/* B1: AI Insights Summary */}
          <div className="col-span-5 bg-gradient-to-br from-white to-purple-50/30 rounded-2xl p-4 shadow-sm border border-purple-100/50 overflow-hidden">
            <AIInsightsSummaryTile insights={aiInsights} />
          </div>

          {/* B2: Pattern Awareness — PCOS/PMS */}
          <div className="col-span-5 bg-white rounded-2xl p-4 shadow-sm border border-slate-100/80 overflow-hidden">
            <PatternAwarenessTile awareness={pcosAwareness} />
          </div>

          {/* B3: Overall Status */}
          <div className="col-span-2 bg-white rounded-2xl p-4 shadow-sm border border-slate-100/80 overflow-hidden">
            <OverallStatusTile
              zone={riskSignal.zone}
              patternsCount={riskSignal.patterns.length}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

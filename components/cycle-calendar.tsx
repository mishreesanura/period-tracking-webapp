"use client";

import React, { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CycleLegende } from "./cycle-legend";
import { MonthlyCalendarView } from "./monthly-calendar-view";
import { WeeklyCalendarView } from "./weekly-calendar-view";
import { DailyDetailPanel, type DailyLogData } from "./daily-detail-panel";
import { calculateCyclePhase, type CycleData } from "@/lib/cycle-utils";
import { formatDateKey } from "@/lib/utils";

type CalendarView = "monthly" | "weekly";

interface CycleDayData {
  date: Date;
  phase: CycleData["phase"];
  isPredicted: boolean;
  hasFlowLogged: boolean;
  hasSymptoms: boolean;
  hasNote: boolean;
  flowLevel?: "light" | "medium" | "heavy" | null;
  symptoms?: string[];
  mood?: string | null;
  notes?: string;
}

export function CycleCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [view, setView] = useState<CalendarView>("monthly");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [cycleStartDate] = useState(new Date("2024-12-15"));
  const [cycleLengthDays] = useState(28);
  const [periodDurationDays] = useState(5);
  const [userLogs, setUserLogs] = useState<Map<string, DailyLogData>>(
    new Map(),
  );

  const handleSaveLog = (data: DailyLogData) => {
    if (!selectedDate) return;
    const dateStr = formatDateKey(selectedDate);
    setUserLogs((prev) => {
      const newLogs = new Map(prev);
      newLogs.set(dateStr, data);
      return newLogs;
    });
  };

  const calendarData = useMemo(() => {
    const data: Map<string, CycleDayData> = new Map();
    const startOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1,
    );
    const endOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0,
    );

    // We need to generate data for a bit more than just the month to cover weekly view transitions
    // Taking 1 week before and 1 week after to be safe (simplified here to just month for now,
    // but the views usually request their own range.
    // Ideally, calendarData should be generated based on the view's needs,
    // or we generate a larger range here.)
    // For now, let's stick to the current month logic but expanding the loop might be safer
    // if the view asks for days outside this month.
    // However, the views receive `calendarData` which is a Map.
    // Let's generate for the whole displayed grid range effectively.

    // Actually, let's just generate for the current month +/- some buffer
    // Or better, since `WeeklyView` and `MonthlyView` compute their own dates,
    // lets ensure we populate the Map for any date likely to be requested.

    // Quick fix: loop from 15 days before start to 15 days after end of month
    const rangeStart = new Date(startOfMonth);
    rangeStart.setDate(rangeStart.getDate() - 15);
    const rangeEnd = new Date(endOfMonth);
    rangeEnd.setDate(rangeEnd.getDate() + 15);

    for (
      let d = new Date(rangeStart);
      d <= rangeEnd;
      d.setDate(d.getDate() + 1)
    ) {
      const date = new Date(d);
      const dateStr = formatDateKey(date);

      const log = userLogs.get(dateStr);
      let cycleData = calculateCyclePhase(
        date,
        cycleStartDate,
        cycleLengthDays,
        periodDurationDays,
      );

      // Override with user log if available
      if (log?.isPeriod) {
        cycleData = { ...cycleData, phase: "period", isPredicted: false };
      }

      data.set(dateStr, {
        date,
        phase: cycleData.phase,
        isPredicted: cycleData.isPredicted,
        hasFlowLogged: !!log?.flowLevel,
        hasSymptoms: (log?.symptoms?.length ?? 0) > 0,
        hasNote: !!log?.notes,
        flowLevel: log?.flowLevel,
        symptoms: log?.symptoms,
        mood: log?.mood,
        notes: log?.notes,
      });
    }

    return data;
  }, [
    currentMonth,
    cycleStartDate,
    cycleLengthDays,
    periodDurationDays,
    userLogs,
  ]);

  const today = new Date();
  const daysDiff = Math.ceil(
    (new Date(
      cycleStartDate.getFullYear(),
      cycleStartDate.getMonth(),
      cycleStartDate.getDate() + cycleLengthDays,
    ).getTime() -
      today.getTime()) /
      (1000 * 60 * 60 * 24),
  );

  const getContextMessage = () => {
    if (daysDiff <= 0) return "Period expected now";
    if (daysDiff === 1) return "Period expected tomorrow";
    if (daysDiff <= 3) return `Period expected in ${daysDiff} days`;
    if (daysDiff <= 7)
      return `Ovulation window starts in about ${daysDiff - 7} days`;
    return "Cycle tracking active";
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-8 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
            My Cycle
          </h1>
          <p className="text-slate-500 mt-1">{getContextMessage()}</p>
        </div>

        {/* View Toggle - Segmented Control */}
        <div className="bg-slate-100/80 p-1 rounded-full inline-flex items-center shadow-sm backdrop-blur-sm">
          <button
            onClick={() => setView("monthly")}
            className={`
              px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-out
              ${
                view === "monthly"
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
              }
            `}
          >
            Monthly
          </button>
          <button
            onClick={() => setView("weekly")}
            className={`
              px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-out
              ${
                view === "weekly"
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
              }
            `}
          >
            Weekly
          </button>
        </div>
      </div>

      {/* Main Calendar Card */}
      <Card className="border-0 shadow-lg shadow-slate-200/50 rounded-3xl overflow-hidden bg-white/80 backdrop-blur-xl">
        <div className="p-6 md:p-8">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-8 px-2">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-rose-50 hover:text-rose-600 rounded-full w-10 h-10 transition-colors"
              onClick={() =>
                setCurrentMonth(
                  new Date(
                    currentMonth.getFullYear(),
                    currentMonth.getMonth() - 1,
                  ),
                )
              }
              aria-label="Previous month"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <h2 className="text-2xl font-bold text-slate-700 min-w-48 text-center tracking-wide">
              {currentMonth.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </h2>

            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-rose-50 hover:text-rose-600 rounded-full w-10 h-10 transition-colors"
              onClick={() =>
                setCurrentMonth(
                  new Date(
                    currentMonth.getFullYear(),
                    currentMonth.getMonth() + 1,
                  ),
                )
              }
              aria-label="Next month"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          <div className="min-h-[400px]">
            {view === "monthly" ? (
              <MonthlyCalendarView
                currentMonth={currentMonth}
                calendarData={calendarData}
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
                today={today}
              />
            ) : (
              <WeeklyCalendarView
                currentMonth={currentMonth}
                calendarData={calendarData}
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
                today={today}
              />
            )}
          </div>
        </div>
      </Card>

      {/* Legend - Moved to bottom and distinct */}
      <div className="bg-white/60 rounded-2xl p-6 backdrop-blur-sm border border-slate-100">
        <CycleLegende />
      </div>

      {/* Daily Detail Panel */}
      {selectedDate && (
        <DailyDetailPanel
          date={selectedDate}
          onClose={() => setSelectedDate(null)}
          onSave={handleSaveLog}
          initialData={userLogs.get(formatDateKey(selectedDate))}
        />
      )}
    </div>
  );
}

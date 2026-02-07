"use client";

import React, { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CycleLegende } from "./cycle-legend";
import { MonthlyCalendarView } from "./monthly-calendar-view";
import { WeeklyCalendarView } from "./weekly-calendar-view";
import { DailyDetailPanel } from "./daily-detail-panel";
import { calculateCyclePhase, type CycleData } from "@/lib/cycle-utils";

type CalendarView = "monthly" | "weekly";

interface CycleDayData {
  date: Date;
  phase: CycleData["phase"];
  isPredicted: boolean;
  hasFlowLogged: boolean;
  hasSymptoms: boolean;
  hasNote: boolean;
  flowLevel?: "light" | "medium" | "heavy";
  symptoms?: string[];
  mood?: string;
  notes?: string;
}

export function CycleCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [view, setView] = useState<CalendarView>("monthly");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [cycleStartDate] = useState(new Date("2024-12-15"));
  const [cycleLengthDays] = useState(28);
  const [periodDurationDays] = useState(5);

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

    for (let i = startOfMonth.getDate(); i <= endOfMonth.getDate(); i++) {
      const date = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        i,
      );
      const dateStr = date.toISOString().split("T")[0];

      const cycleData = calculateCyclePhase(
        date,
        cycleStartDate,
        cycleLengthDays,
        periodDurationDays,
      );

      data.set(dateStr, {
        date,
        phase: cycleData.phase,
        isPredicted: cycleData.isPredicted,
        hasFlowLogged: false,
        hasSymptoms: false,
        hasNote: false,
      });
    }

    return data;
  }, [currentMonth, cycleStartDate, cycleLengthDays, periodDurationDays]);

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
        />
      )}
    </div>
  );
}

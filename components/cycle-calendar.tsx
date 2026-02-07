"use client";

import React, { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CycleLegende } from "./cycle-legend";
import { MonthlyCalendarView } from "./monthly-calendar-view";
import { WeeklyCalendarView } from "./weekly-calendar-view";
import { DailyDetailPanel, type DailyLogData } from "./daily-detail-panel";
import { CyclePhaseOverview } from "./cycle-phase-overview";
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

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1),
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1),
    );
  };

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

  return (
    <div className="flex flex-col h-full w-full p-4 overflow-hidden gap-4">
      {/* Header Countdown Section */}
      <section className="flex-none animate-in fade-in slide-in-from-top-2 duration-500">
         <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="md:pl-10 transition-all flex-none"> {/* Added padding to prevent overlap with SidebarTrigger */}
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Cycle Tracking</h1>
              <p className="text-sm text-slate-500 hidden sm:block">
                Monitor your rhythm and health.
              </p>
            </div>
            
            <div className="w-full lg:w-auto">
               <CyclePhaseOverview 
                  cycleStartDate={cycleStartDate} 
                  cycleLengthDays={cycleLengthDays}
                  periodDurationDays={periodDurationDays}
               />
            </div>
         </div>
      </section>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-0">
        {/* Main Calendar Area */}
        <div className={`${selectedDate ? 'lg:col-span-8' : 'lg:col-span-12'} flex flex-col h-full min-h-0 transition-all duration-500 ease-in-out`}>
          <Card className="flex-1 flex flex-col shadow-sm border-slate-100 bg-white/50 backdrop-blur-xl rounded-[24px] overflow-hidden">
            <div className="p-4 flex flex-col h-full">
              {/* Calendar Header Controls */}
              <div className="flex-none flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
                
                <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-full border border-slate-100">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={prevMonth}
                    className="h-7 w-7 rounded-full hover:bg-white hover:text-rose-500 hover:shadow-sm transition-all"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-bold text-slate-700 min-w-[120px] text-center">
                    {currentMonth.toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={nextMonth}
                    className="h-7 w-7 rounded-full hover:bg-white hover:text-rose-500 hover:shadow-sm transition-all"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                   <div className="flex bg-slate-100 p-0.5 rounded-lg scale-90 origin-right sm:scale-100">
                      <button
                        onClick={() => setView("monthly")}
                        className={`px-3 py-1.5 rounded-md text-[11px] font-semibold transition-all ${view === 'monthly' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                      >
                         Month
                      </button>
                      <button
                        onClick={() => setView("weekly")}
                        className={`px-3 py-1.5 rounded-md text-[11px] font-semibold transition-all ${view === 'weekly' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                      >
                         Week
                      </button>
                   </div>
                   <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => {
                        const now = new Date();
                        setCurrentMonth(now);
                        setSelectedDate(now);
                      }}
                      className="text-[11px] h-8 px-3 border-slate-200 text-slate-600 hover:text-rose-600 hover:border-rose-200"
                   >
                      Today
                   </Button>
                </div>
              </div>

              {/* View Rendering - Scrollable Area */}
              <div className="flex-1 overflow-y-auto min-h-0 pr-1 -mr-1">
                {view === "monthly" ? (
                  <MonthlyCalendarView
                    currentMonth={currentMonth}
                    calendarData={calendarData}
                    selectedDate={selectedDate}
                    onDateSelect={setSelectedDate}
                    today={new Date()}
                  />
                ) : (
                  <WeeklyCalendarView
                    currentMonth={currentMonth}
                    calendarData={calendarData}
                    selectedDate={selectedDate}
                    onDateSelect={setSelectedDate}
                    today={new Date()}
                  />
                )}
                
                {/* Legend at bottom of scrollable area */}
                <div className="mt-4 pt-4 border-t border-slate-50/50">
                  <CycleLegende />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Side Panel (Daily Details) */}
        {selectedDate && (
          <div className="lg:col-span-4 flex flex-col h-full min-h-0 animate-in fade-in slide-in-from-right-4 duration-300">
               <div className="flex-1 overflow-y-auto rounded-[24px] border border-slate-100 bg-white shadow-lg">
                  <DailyDetailPanel
                    date={selectedDate}
                    data={userLogs.get(formatDateKey(selectedDate))}
                    onSave={handleSaveLog}
                    onClose={() => setSelectedDate(null)}
                  />
               </div>
          </div>
        )}
      </div>
    </div>
  );
}

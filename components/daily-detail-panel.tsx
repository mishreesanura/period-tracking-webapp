"use client";

import React, { useState } from "react";
import { Droplets, Smile, FileText, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { calculateCyclePhase, getPhaseLabel } from "@/lib/cycle-utils";

export interface DailyLogData {
  isPeriod: boolean;
  flowLevel: "light" | "medium" | "heavy" | null;
  symptoms: string[];
  mood: string | null;
  notes: string;
}

interface DailyDetailPanelProps {
  date: Date;
  onClose: () => void;
  onSave: (data: DailyLogData) => void;
  initialData?: DailyLogData;
}

export function DailyDetailPanel({
  date,
  onClose,
  onSave,
  initialData,
}: DailyDetailPanelProps) {
  const [isPeriodDay, setIsPeriodDay] = useState<boolean>(
    initialData?.isPeriod ?? false,
  );
  const [flowLevel, setFlowLevel] = useState<
    "light" | "medium" | "heavy" | null
  >(initialData?.flowLevel ?? null);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(
    initialData?.symptoms ?? [],
  );
  const [mood, setMood] = useState<string | null>(initialData?.mood ?? null);
  const [notes, setNotes] = useState(initialData?.notes ?? "");

  const cycleStartDate = new Date("2024-12-15");
  const cycleData = calculateCyclePhase(date, cycleStartDate, 28, 5);
  const phaseLabel = getPhaseLabel(cycleData.phase);

  const symptoms = [
    "Cramps",
    "Headache",
    "Fatigue",
    "Bloating",
    "Mood swings",
    "Acne",
    "Tender breasts",
    "Nausea",
  ];

  const moods = ["Happy", "Sad", "Anxious", "Calm", "Energetic", "Tired"];

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom],
    );
  };

  const dateFormatted = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  // When setting period day to false, clear flow
  const handlePeriodToggle = (value: boolean) => {
    setIsPeriodDay(value);
    if (!value) setFlowLevel(null);
    else if (!flowLevel) setFlowLevel("medium"); // Default to medium if turning on
  };

  return (
    <Dialog open={true} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[420px] bg-white border-none shadow-2xl rounded-3xl p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-2">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl font-bold text-slate-800">
                {dateFormatted}
              </DialogTitle>
              <p className="text-sm font-medium text-slate-400 mt-1 flex items-center gap-2">
                {`${cycleData.isPredicted ? "Predicted" : "Confirmed"}: ${phaseLabel}`}
              </p>
            </div>
            {/* Close button removed */}
          </div>
        </DialogHeader>

        <div className="px-6 pb-6 space-y-6 max-h-[75vh] overflow-y-auto custom-scrollbar">
          {/* Main Toggle: Log Period */}
          <div className="bg-rose-50/50 rounded-2xl p-4 border border-rose-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${isPeriodDay ? "bg-rose-600 text-white shadow-lg shadow-rose-200" : "bg-white text-rose-300 border border-rose-100"}`}
                >
                  <Droplets className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-700">Period</h3>
                  <p className="text-xs text-slate-400">
                    Log today as a period day
                  </p>
                </div>
              </div>
              <button
                onClick={() => handlePeriodToggle(!isPeriodDay)}
                className={`relative w-12 h-7 rounded-full transition-all duration-300 ${isPeriodDay ? "bg-rose-600" : "bg-slate-200"}`}
              >
                <div
                  className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-sm transition-all duration-300 ${isPeriodDay ? "translate-x-5" : "translate-x-0"}`}
                />
              </button>
            </div>

            {/* Flow Level Selection - Only visible if Period is checked */}
            <div
              className={`overflow-hidden transition-all duration-300 ${isPeriodDay ? "max-h-20 opacity-100" : "max-h-0 opacity-0"}`}
            >
              <div className="flex gap-2 pt-2 border-t border-rose-100/50 mt-2">
                {(["light", "medium", "heavy"] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => setFlowLevel(level)}
                    className={`
                        flex-1 py-2 px-2 rounded-xl text-xs font-semibold uppercase tracking-wide
                        transition-all duration-200 border
                        ${
                          flowLevel === level
                            ? "bg-white border-rose-200 text-rose-600 shadow-sm ring-1 ring-rose-100"
                            : "bg-transparent border-transparent text-slate-400 hover:bg-white/50 hover:text-rose-400"
                        }
                        `}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Symptoms */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-3 h-3" /> Symptoms
            </h3>
            <div className="flex flex-wrap gap-2">
              {symptoms.map((symptom) => (
                <button
                  key={symptom}
                  onClick={() => toggleSymptom(symptom)}
                  className={`
                    py-2 px-3.5 rounded-full text-xs font-medium 
                    transition-all duration-200 border
                    ${
                      selectedSymptoms.includes(symptom)
                        ? "bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-200"
                        : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                    }
                  `}
                >
                  {symptom}
                </button>
              ))}
            </div>
          </div>

          {/* Mood */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Smile className="w-3 h-3" /> How are you feeling?
            </h3>
            <div className="flex flex-wrap gap-2">
              {moods.map((moodOption) => (
                <button
                  key={moodOption}
                  onClick={() =>
                    setMood(mood === moodOption ? null : moodOption)
                  }
                  className={`
                    py-2 px-3.5 rounded-full text-xs font-medium 
                    transition-all duration-200 border
                    ${
                      mood === moodOption
                        ? "bg-amber-100 border-amber-200 text-amber-800"
                        : "bg-white border-slate-200 text-slate-600 hover:border-amber-200 hover:bg-amber-50"
                    }
                  `}
                >
                  {moodOption}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-3 h-3" /> Notes
            </h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional notes..."
              className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-rose-100 focus:border-rose-200 transition-all resize-none shadow-sm"
              rows={3}
            />
          </div>

          {/* Save Button */}
          <div className="pt-2">
            <Button
              onClick={() => {
                onSave({
                  isPeriod: isPeriodDay,
                  flowLevel,
                  symptoms: selectedSymptoms,
                  mood,
                  notes,
                });
                onClose();
              }}
              className="w-full bg-rose-700 text-white hover:bg-rose-800 rounded-xl py-6 shadow-xl shadow-rose-200 transition-all font-semibold tracking-wide text-sm"
            >
              Save Entry
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

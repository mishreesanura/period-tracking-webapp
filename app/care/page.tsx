"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { CareSuggestion, CareFeedback } from "@/lib/care-types";
import {
  getTimeOfDay,
  getCyclePhaseSuggestions,
  getDefaultSuggestions,
} from "@/lib/care-utils";
import { CareSuggestionCard } from "@/components/care-suggestion-card";

export default function CarePage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [suggestions, setSuggestions] = useState<CareSuggestion[]>([]);
  const [feedbackHistory, setFeedbackHistory] = useState<CareFeedback[]>([]);

  useEffect(() => {
    // For now, use default suggestions based on current time
    // This will be replaced with logic that considers cycle phase
    const timeOfDay = getTimeOfDay();
    const cyclePhaseSuggestions = getCyclePhaseSuggestions(
      "unknown",
      timeOfDay,
    );

    setSuggestions(cyclePhaseSuggestions);
  }, [selectedDate]);

  const handleFeedback = (feedback: CareFeedback) => {
    setFeedbackHistory((prev) => [...prev, feedback]);
  };

  const previousDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  const nextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    setSelectedDate(newDate);
  };

  const isToday = selectedDate.toDateString() === new Date().toDateString();

  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 pt-12 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-2">
            Care Suggestions
          </h1>
          <p className="text-slate-500">Gentle ideas to support you today.</p>
        </div>

        {/* Date navigation */}
        <div className="mb-8 flex items-center justify-between bg-card border border-border rounded-lg p-4">
          <button
            onClick={previousDay}
            className="p-2 hover:bg-muted rounded-md transition-colors"
            aria-label="Previous day"
          >
            <ChevronLeft className="h-5 w-5 text-foreground" />
          </button>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              {isToday ? "Today's suggestions" : "Suggestions for"}
            </p>
            <p className="text-lg font-semibold text-foreground">
              {dateFormatter.format(selectedDate)}
            </p>
          </div>

          <button
            onClick={nextDay}
            disabled={selectedDate.toDateString() === new Date().toDateString()}
            className="p-2 hover:bg-muted rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next day"
          >
            <ChevronRight className="h-5 w-5 text-foreground" />
          </button>
        </div>

        {/* Suggestions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {suggestions.length > 0 ? (
            suggestions.map((suggestion) => (
              <CareSuggestionCard
                key={suggestion.id}
                suggestion={suggestion}
                onFeedback={handleFeedback}
              />
            ))
          ) : (
            <div className="col-span-full rounded-lg border border-border bg-muted/30 p-8 text-center">
              <p className="text-muted-foreground">
                No suggestions for this day yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

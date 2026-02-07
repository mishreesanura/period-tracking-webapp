"use client";

import { useState } from "react";
import { ThumbsUp, ThumbsDown, ChevronDown } from "lucide-react";
import type { CareSuggestion, CareFeedback } from "@/lib/care-types";
import { getCategoryColor, getCategoryLabel } from "@/lib/care-utils";

interface CareSuggestionCardProps {
  suggestion: CareSuggestion;
  onFeedback?: (feedback: CareFeedback) => void;
  compact?: boolean;
  variant?: "card" | "notification";
}

export function CareSuggestionCard({
  suggestion,
  onFeedback,
  compact = false,
  variant = "card",
}: CareSuggestionCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [feedback, setFeedback] = useState<boolean | null>(null);
  const [feedbackReason, setFeedbackReason] = useState<
    "not-relevant" | "too-basic" | "dont-want-category" | null
  >(null);

  const categoryLabel = getCategoryLabel(suggestion.category);

  // Map categories to feature feature themes (Pink, Blue, Violet) -> Updates to Pink/Purple/Pastel
  const getThemeColors = (category: string) => {
    switch (category) {
      case "nutrition": // Soft Pink
        return {
          bg: "bg-pink-50",
          text: "text-pink-600",
          dot: "bg-pink-400",
          badge: "bg-pink-100/50 text-pink-700",
        };
      case "physical-care": // Soft Rose
        return {
          bg: "bg-rose-50",
          text: "text-rose-600",
          dot: "bg-rose-400",
          badge: "bg-rose-100/50 text-rose-700",
        };
      case "rest": // Soft Violet
        return {
          bg: "bg-violet-50",
          text: "text-violet-600",
          dot: "bg-violet-400",
          badge: "bg-violet-100/50 text-violet-700",
        };
      case "emotional-care": // Soft Purple
      case "mental-checkin":
        return {
          bg: "bg-purple-50",
          text: "text-purple-600",
          dot: "bg-purple-400",
          badge: "bg-purple-100/50 text-purple-700",
        };
      default:
        return {
          bg: "bg-fuchsia-50",
          text: "text-fuchsia-600",
          dot: "bg-fuchsia-400",
          badge: "bg-fuchsia-100/50 text-fuchsia-700",
        };
    }
  };

  const theme = getThemeColors(suggestion.category);

  const handleFeedback = (helpful: boolean) => {
    setFeedback(helpful);
    if (onFeedback) {
      onFeedback({
        suggestionId: suggestion.id,
        helpful: helpful,
      });
    }
  };

  const handleNegativeFeedback = (
    reason: "not-relevant" | "too-basic" | "dont-want-category",
  ) => {
    setFeedbackReason(reason);
    if (onFeedback) {
      onFeedback({
        suggestionId: suggestion.id,
        helpful: false,
        reason,
      });
    }
  };

  // --- NOTIFICATION VARIANT ---
  if (variant === "notification") {
    if (feedback === false && feedbackReason) return null; // Hide completely if dismissed

    return (
      <div className="group relative flex items-center justify-between p-4 rounded-2xl border border-neutral-100 bg-white transition-all hover:bg-neutral-50/80 hover:shadow-sm">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          {/* Badge Dot */}
          <div
            className={`flex-shrink-0 w-1.5 h-10 rounded-full ${theme.dot}`}
          />

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1">
              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${theme.badge}`}
              >
                {categoryLabel}
              </span>
            </div>
            <p className="text-[14px] font-medium text-neutral-900 truncate">
              {suggestion.suggestion}
            </p>
            <p className="text-[12px] text-neutral-500 truncate pr-4">
              {suggestion.empathy}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 pl-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {feedback === true ? (
            <span
              className={`text-xs font-medium px-2 py-1 rounded-full ${theme.badge}`}
            >
              Saved
            </span>
          ) : (
            <>
              <button
                onClick={() => handleFeedback(true)}
                className="p-2 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-green-600 transition-colors"
                title="Helpful"
              >
                <ThumbsUp className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleFeedback(false)}
                className="p-2 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-red-500 transition-colors"
                title="Not for me"
              >
                <ChevronDown className="h-4 w-4 rotate-45" />
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  // --- CARD VARIANT (Default) ---
  if (feedback === false && feedbackReason) {
    return (
      <div
        className={`rounded-lg border border-neutral-200 bg-neutral-50 p-4 ${
          compact ? "text-[14px]" : ""
        }`}
      >
        <p className="text-neutral-black/60 mb-2">
          Thanks for letting us know.
        </p>
        <button
          onClick={() => {
            setFeedback(null);
            setFeedbackReason(null);
          }}
          className={`text-[12px] hover:underline ${theme.text}`}
        >
          Show suggestion
        </button>
      </div>
    );
  }

  return (
    <div
      className={`rounded-lg border border-neutral-200 bg-neutral-white p-4 sm:p-6 transition-all hover:shadow-sm ${
        compact ? "text-[14px]" : ""
      }`}
    >
      {/* Category badge */}
      <div className="mb-3 inline-block">
        <span
          className={`px-2.5 py-1 rounded-full text-[12px] font-medium ${theme.badge}`}
        >
          {categoryLabel}
        </span>
      </div>

      {/* Empathy line */}
      <p className="text-neutral-black/60 text-[14px] mb-3 italic">
        {suggestion.empathy}
      </p>

      {/* Main suggestion */}
      <p
        className={`text-neutral-black font-medium mb-4 ${
          compact ? "" : "text-[18px]"
        }`}
      >
        {suggestion.suggestion}
      </p>

      {/* Expandable reason */}
      <div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-[12px] text-neutral-black/60 hover:text-neutral-black transition-colors mb-3"
        >
          <span>Why this?</span>
          <ChevronDown
            className={`h-3 w-3 transition-transform ${
              expanded ? "rotate-180" : ""
            }`}
          />
        </button>

        {expanded && (
          <p className="text-[12px] text-neutral-black/60 mb-4 pl-2 border-l border-neutral-200">
            {suggestion.reason}
          </p>
        )}
      </div>

      {/* Feedback buttons */}
      {feedback === null && (
        <div className="flex items-center gap-2 pt-2">
          <button
            onClick={() => handleFeedback(true)}
            className="flex items-center gap-1 text-[12px] text-neutral-black/60 hover:text-neutral-black transition-colors"
            title="This suggestion is helpful"
          >
            <ThumbsUp className="h-4 w-4" />
            <span className="hidden sm:inline">Helpful</span>
          </button>
          <button
            onClick={() => handleFeedback(false)}
            className="flex items-center gap-1 text-[12px] text-neutral-black/60 hover:text-status-error transition-colors"
            title="Not for me"
          >
            <ThumbsDown className="h-4 w-4" />
            <span className="hidden sm:inline">Not for me</span>
          </button>
        </div>
      )}

      {/* Negative feedback reason selection */}
      {feedback === false && !feedbackReason && (
        <div className="border-t border-neutral-200 pt-3 mt-3 space-y-2">
          <p className="text-[12px] text-neutral-black/60 font-medium">
            Help us improve:
          </p>
          <div className="space-y-2">
            <button
              onClick={() => handleNegativeFeedback("not-relevant")}
              className="block w-full text-left text-[12px] px-3 py-2 rounded hover:bg-neutral-50 transition-colors text-neutral-black/60 hover:text-neutral-black"
            >
              Not relevant to me
            </button>
            <button
              onClick={() => handleNegativeFeedback("too-basic")}
              className="block w-full text-left text-[12px] px-3 py-2 rounded hover:bg-neutral-50 transition-colors text-neutral-black/60 hover:text-neutral-black"
            >
              Too basic
            </button>
            <button
              onClick={() => handleNegativeFeedback("dont-want-category")}
              className="block w-full text-left text-[12px] px-3 py-2 rounded hover:bg-neutral-50 transition-colors text-neutral-black/60 hover:text-neutral-black"
            >
              Don't want this type
            </button>
          </div>
        </div>
      )}

      {/* Positive feedback confirmation */}
      {feedback === true && (
        <div className="border-t border-neutral-200 pt-3 mt-3">
          <p className="text-[12px] text-neutral-black/60">
            We'll remember that.
          </p>
        </div>
      )}
    </div>
  );
}

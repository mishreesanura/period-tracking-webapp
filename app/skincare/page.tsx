"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Settings,
  Sun,
  Moon,
  Droplets,
  Sparkles,
  ShieldCheck,
  Info,
} from "lucide-react";
import { calculateCyclePhase } from "@/lib/cycle-utils";
import {
  mapCyclePhaseToSkincare,
  getPhaseRoutines,
  getSkinPhaseInfo,
} from "@/lib/skincare-utils";
import type { SkincareCyclePhase, RoutineTiming } from "@/lib/skincare-types";
import { SkincareSkinType } from "@/components/skincare-skin-type";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

const phases: { id: SkincareCyclePhase; label: string }[] = [
  { id: "menstrual", label: "Menstrual" },
  { id: "follicular", label: "Follicular" },
  { id: "ovulation", label: "Ovulation" },
  { id: "luteal", label: "Luteal" },
];

export default function SkincarePage() {
  const [currentPhase, setCurrentPhase] =
    useState<SkincareCyclePhase>("follicular");
  const [timeMode, setTimeMode] = useState<RoutineTiming>("am");
  const [showSettings, setShowSettings] = useState(false);
  const [skinFeeling, setSkinFeeling] = useState<string | null>(null);
  const [showWhy, setShowWhy] = useState(false);

  // Initialize phase
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("cycleStartDate");
      if (saved) {
        const cycleStart = new Date(saved);
        const today = new Date();
        const cycleData = calculateCyclePhase(today, cycleStart);
        setCurrentPhase(mapCyclePhaseToSkincare(cycleData.phase));
      }
    }

    // Auto-set time mode based on hour
    const hour = new Date().getHours();
    setTimeMode(hour >= 18 || hour < 5 ? "pm" : "am");
  }, []);

  const routines = getPhaseRoutines(currentPhase);
  const activeRoutine = routines.find((r) => r.timing === timeMode);
  const phaseInfo = getSkinPhaseInfo(currentPhase);

  // Dynamic gradients based on phase
  const phaseGradients: Record<SkincareCyclePhase, string> = {
    menstrual: "from-rose-50 via-rose-50/50 to-white",
    follicular: "from-emerald-50 via-teal-50/50 to-white",
    ovulation: "from-amber-50 via-yellow-50/50 to-white",
    luteal: "from-violet-50 via-purple-50/50 to-white",
  };

  const phaseAccent: Record<SkincareCyclePhase, string> = {
    menstrual: "text-rose-600 bg-rose-100/50 border-rose-200",
    follicular: "text-emerald-600 bg-emerald-100/50 border-emerald-200",
    ovulation: "text-amber-600 bg-amber-100/50 border-amber-200",
    luteal: "text-violet-600 bg-violet-100/50 border-violet-200",
  };

  return (
    <main
      className={cn(
        "min-h-screen transition-colors duration-700 bg-gradient-to-br",
        phaseGradients[currentPhase],
      )}
    >
      {/* 1️⃣ Phase Hero Section (Emotional Entry Point) */}
      <div className="relative pt-8 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Nav Bar */}
        <div className="flex items-center justify-between mb-8 max-w-6xl mx-auto relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors bg-white/50 backdrop-blur-sm px-3 py-1.5 rounded-full"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Link>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/50 backdrop-blur-sm text-slate-500 hover:text-slate-800 transition-colors border border-transparent hover:border-slate-100"
          >
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline text-xs font-medium uppercase tracking-wide">
              My Skin
            </span>
          </button>
        </div>

        <div className="max-w-2xl mx-auto text-center relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 backdrop-blur-md border border-white/50 shadow-sm mb-6">
            <Sparkles
              className={cn(
                "h-3.5 w-3.5",
                phaseAccent[currentPhase].split(" ")[0],
              )}
            />
            <span
              className={cn(
                "text-xs font-bold uppercase tracking-wider",
                phaseAccent[currentPhase].split(" ")[0],
              )}
            >
              {phaseInfo.label}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-4 leading-tight">
            {currentPhase === "ovulation"
              ? "Glow & radiate."
              : currentPhase === "menstrual"
                ? "Rest & reset."
                : currentPhase === "follicular"
                  ? "Fresh start."
                  : "Protect & soothe."}
          </h1>

          <p className="text-lg text-slate-600 max-w-lg mx-auto leading-relaxed">
            {phaseInfo.uiCopy}
          </p>
        </div>

        {/* Ambient background blob */}
        <div
          className={cn(
            "absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-30 select-none pointer-events-none -z-0 transition-colors duration-1000",
            currentPhase === "menstrual"
              ? "bg-rose-200"
              : currentPhase === "follicular"
                ? "bg-emerald-200"
                : currentPhase === "ovulation"
                  ? "bg-amber-200"
                  : "bg-violet-200",
          )}
        />
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 pb-24 relative z-10">
        {/* 5️⃣ Phase Explorer (Timeline) */}
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-xl mx-auto relative px-4">
            {/* Connecting line */}
            <div className="absolute top-[14px] left-8 right-8 h-0.5 bg-slate-100 -z-10" />

            {phases.map((p) => {
              const isActive = currentPhase === p.id;
              // Dynamic colors for active states to match phase themes
              const activeRingColor =
                p.id === "menstrual"
                  ? "ring-rose-200"
                  : p.id === "follicular"
                    ? "ring-emerald-200"
                    : p.id === "ovulation"
                      ? "ring-amber-200"
                      : "ring-violet-200";

              const activeBgColor =
                p.id === "menstrual"
                  ? "bg-rose-500"
                  : p.id === "follicular"
                    ? "bg-emerald-500"
                    : p.id === "ovulation"
                      ? "bg-amber-500"
                      : "bg-violet-500";

              return (
                <button
                  key={p.id}
                  onClick={() => setCurrentPhase(p.id)}
                  className="group flex flex-col items-center gap-3 focus:outline-none relative z-10"
                >
                  <div
                    className={cn(
                      "w-4 h-4 rounded-full transition-all duration-500 border-2",
                      isActive
                        ? cn("scale-125 border-white shadow-lg", activeBgColor)
                        : "bg-white border-slate-200 group-hover:border-slate-300",
                    )}
                  />

                  <span
                    className={cn(
                      "text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 px-2 py-1 rounded-full",
                      isActive
                        ? "text-slate-800 bg-white/50 backdrop-blur-sm"
                        : "text-slate-400 group-hover:text-slate-600",
                    )}
                  >
                    {p.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2️⃣ Skin State Selector (Interactive) */}
        <div className="mb-10 text-center">
          <p className="text-sm text-slate-400 mb-4 font-medium uppercase tracking-wide">
            How does your skin feel right now?
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { id: "calm", label: "Calm" },
              { id: "breakout", label: "Breakout" },
              { id: "dry", label: "Dry" },
              { id: "oily", label: "Oily" },
              { id: "sensitive", label: "Sensitive" },
            ].map((state) => (
              <button
                key={state.id}
                onClick={() =>
                  setSkinFeeling(state.id === skinFeeling ? null : state.id)
                }
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border",
                  skinFeeling === state.id
                    ? "bg-slate-800 text-white border-slate-800 shadow-lg scale-105"
                    : "bg-white/40 border-slate-200/50 text-slate-600 hover:bg-white hover:border-slate-200 hover:shadow-sm",
                )}
              >
                {state.label}
              </button>
            ))}
          </div>
        </div>

        {/* 4️⃣ AM / PM Mode Switch */}
        <div className="flex justify-center mb-8">
          <div className="bg-slate-100/80 p-1 rounded-full flex relative shadow-inner">
            <div
              className={cn(
                "absolute inset-y-1 w-1/2 bg-white rounded-full shadow-sm transition-all duration-300 ease-spring",
                timeMode === "pm"
                  ? "translate-x-full left-[-4px]"
                  : "translate-x-0",
              )}
            />
            <button
              onClick={() => setTimeMode("am")}
              className={cn(
                "relative z-10 flex items-center gap-2 px-6 py-2 rounded-full text-sm font-bold transition-colors duration-300 w-28 justify-center",
                timeMode === "am" ? "text-slate-800" : "text-slate-400",
              )}
            >
              <Sun className="h-4 w-4" />
              AM
            </button>
            <button
              onClick={() => setTimeMode("pm")}
              className={cn(
                "relative z-10 flex items-center gap-2 px-6 py-2 rounded-full text-sm font-bold transition-colors duration-300 w-28 justify-center",
                timeMode === "pm" ? "text-slate-800" : "text-slate-400",
              )}
            >
              <Moon className="h-4 w-4" />
              PM
            </button>
          </div>
        </div>

        {/* 3️⃣ Routine as a Visual Flow */}
        <div className="relative isolate">
          {!activeRoutine ? (
            <div className="text-center py-12 text-slate-400">
              No routine found.
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center mb-8 animate-in fade-in duration-500">
                <h3 className="text-xl font-semibold text-slate-800 flex items-center justify-center gap-2">
                  {timeMode === "am" ? "Morning Ritual" : "Evening Unwind"}
                </h3>
                <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
                  {activeRoutine.contextMessage}
                  {skinFeeling === "breakout" && " — prioritized for healing"}
                  {skinFeeling === "dry" && " — extra hydration focus"}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-0 relative">
                {/* Connecting Line (Desktop) */}
                <div className="hidden md:block absolute top-6 left-12 right-12 h-0.5 bg-gradient-to-r from-slate-200 via-slate-200 to-slate-200/0 -z-10" />

                {activeRoutine.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "group relative bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-white shadow-sm hover:shadow-md transition-all duration-300 cursor-default md:mx-2",
                      "hover:-translate-y-1 hover:bg-white",
                      // Subtle highlight based on skin feeling
                      skinFeeling === "breakout" &&
                        step.name.includes("Cleanse") &&
                        "ring-2 ring-emerald-100 bg-emerald-50/50",
                      skinFeeling === "dry" &&
                        step.name.includes("Moisturize") &&
                        "ring-2 ring-blue-100 bg-blue-50/50",
                    )}
                  >
                    {/* Step Number Badge */}
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-3 transition-colors",
                        phaseAccent[currentPhase],
                        "group-hover:scale-110",
                      )}
                    >
                      {idx + 1}
                    </div>

                    <h4 className="font-bold text-slate-800 text-sm mb-1">
                      {step.name}
                    </h4>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                      {step.productType}
                    </p>
                    <p className="text-sm text-slate-500 leading-relaxed text-pretty">
                      {step.description}
                    </p>
                  </div>
                ))}

                {/* Dynamic Step Added Based on User Choice */}
                {skinFeeling && skinFeeling !== "calm" && (
                  <div className="group relative bg-slate-800/5 backdrop-blur-sm rounded-2xl p-5 border border-slate-200 border-dashed shadow-none md:mx-2 animate-in fade-in zoom-in-50 duration-500">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-3 transition-colors bg-slate-800 text-white">
                      +
                    </div>
                    <h4 className="font-bold text-slate-800 text-sm mb-1">
                      {skinFeeling === "dry"
                        ? "Hydration Boost"
                        : skinFeeling === "breakout"
                          ? "Spot Treat"
                          : skinFeeling === "oily"
                            ? "Blot / Tone"
                            : skinFeeling === "sensitive"
                              ? "Cooling Mist"
                              : ""}
                    </h4>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                      Recommended Step
                    </p>
                    <p className="text-sm text-slate-600 leading-relaxed text-pretty">
                      {skinFeeling === "dry"
                        ? "Add a hyaluronic acid serum or facial oil before moisturizing."
                        : skinFeeling === "breakout"
                          ? "Apply a hydrocolloid patch or salicylic acid to active spots."
                          : skinFeeling === "oily"
                            ? "Use a clay mask or niacinamide serum to balance sebum."
                            : skinFeeling === "sensitive"
                              ? "Mist with thermal water or apply soothing aloe vera."
                              : ""}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* 6️⃣ Why This Works (Collapsible) */}
        <div className="mt-16 border-t border-slate-100 pt-8 text-center">
          <button
            onClick={() => setShowWhy(!showWhy)}
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-600 transition-colors"
          >
            <Info className="h-4 w-4" />
            <span>Why this routine works for {phaseInfo.label}</span>
          </button>

          {showWhy && (
            <div className="mt-6 bg-white/50 rounded-2xl p-6 text-left max-w-2xl mx-auto border border-white shadow-sm animate-in fade-in slide-in-from-top-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-slate-800 text-sm mb-2 flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-sky-500" />
                    Current Skin State
                  </h5>
                  <ul className="space-y-1">
                    {phaseInfo.commonSkinState.map((s) => (
                      <li key={s} className="text-sm text-slate-500">
                        • {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-slate-800 text-sm mb-2 flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-emerald-500" />
                    Focus Ingredients
                  </h5>
                  <ul className="space-y-1">
                    {phaseInfo.routineFocus.map((f) => (
                      <li key={f} className="text-sm text-slate-500">
                        • {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showSettings && (
        <div
          className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowSettings(false)}
        >
          <div
            className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-800">Settings</h2>
              <button
                onClick={() => setShowSettings(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                Close
              </button>
            </div>
            <SkincareSkinType />
          </div>
        </div>
      )}
    </main>
  );
}

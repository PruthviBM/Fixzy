import React from 'react';
import {
  Zap,
  Sliders,
  AlertOctagon,
  RotateCcw,
  Sparkles,
  ArrowRight,
  TrendingDown,
  Info,
  Layers,
  Flame,
  MousePointerClick,
  Clock,
  AlertTriangle,
  Undo2,
  LogOut,
  Ban,
  Edit3,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import {
  SIGNAL_METADATA,
  calculateFrictionScore,
  getSeverityInfo,
} from '../../services/frictionEngine';

export default function BreakpointEngine() {
  const {
    weights,
    updateWeight,
    resetWeights,
    journeySteps,
    setSelectedStepId,
    setCurrentView,
    isFixApplied,
  } = useApp();

  // Find the top breakpoint step dynamically
  const sortedSteps = [...journeySteps].sort((a, b) => b.frictionScore - a.frictionScore);
  const criticalStep = sortedSteps[0];
  const severity = getSeverityInfo(criticalStep.frictionScore);

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-white">Breakpoint Engine</h1>
            <span className="rounded-full bg-sky-500/20 px-2.5 py-0.5 text-xs font-bold text-sky-300 border border-sky-500/30">
              Core Intelligence
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Algorithmic signal synthesis engine calculating normalized friction scores and isolating experience failures.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetWeights}
            className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/80 px-3.5 py-2 text-xs font-medium text-slate-300 hover:bg-slate-700 transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5 text-slate-400" />
            <span>Reset Weights</span>
          </button>
        </div>
      </div>

      {/* Primary Feature: Critical Breakpoint Display Card */}
      <div className="rounded-2xl border border-rose-500/50 bg-gradient-to-br from-rose-950/40 via-slate-900/80 to-slate-900/60 p-6 backdrop-blur-xl shadow-2xl glow-rose">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Left info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-rose-500/30 text-rose-300">
                <AlertOctagon className="h-4 w-4" />
              </span>
              <span className="text-xs font-extrabold uppercase tracking-widest text-rose-400">
                PRIMARY CRITICAL BREAKPOINT
              </span>
            </div>

            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              {criticalStep.name}{' '}
              <span className="text-sm font-normal text-slate-400">({criticalStep.pageUrl})</span>
            </h2>

            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              Fixzy’s Breakpoint Engine analyzed 8 behavioral telemetry signals and flagged{' '}
              <strong className="text-white">{criticalStep.name}</strong> as the highest-friction
              chokepoint across the entire digital journey.
            </p>

            {/* Main Signals Tags */}
            <div className="pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Dominant Behavioral Signals Detected:
              </span>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-lg bg-rose-500/20 border border-rose-500/40 px-2.5 py-1 text-xs font-semibold text-rose-300">
                  🔥 High Form Errors (512 events)
                </span>
                <span className="rounded-lg bg-orange-500/20 border border-orange-500/40 px-2.5 py-1 text-xs font-semibold text-orange-300">
                  🖱️ Repeated Clicks (932 events)
                </span>
                <span className="rounded-lg bg-amber-500/20 border border-amber-500/40 px-2.5 py-1 text-xs font-semibold text-amber-300">
                  ⏱️ Long Hesitation (8.4s avg dwell)
                </span>
                <span className="rounded-lg bg-purple-500/20 border border-purple-500/40 px-2.5 py-1 text-xs font-semibold text-purple-300">
                  ↩️ Backtracking (741 reversals)
                </span>
              </div>
            </div>
          </div>

          {/* Right metrics pill */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 bg-slate-900/90 border border-rose-500/30 p-5 rounded-2xl shrink-0">
            <div className="text-center px-4">
              <span className="text-xs text-slate-400 block">Friction Score</span>
              <div className="text-3xl font-black text-rose-400 mt-0.5">
                {criticalStep.frictionScore}
                <span className="text-xs text-slate-500 font-normal"> / 100</span>
              </div>
              <span className="text-[10px] text-rose-300 font-semibold uppercase">
                {severity.tier} Tier
              </span>
            </div>

            <div className="h-12 w-px bg-slate-800 hidden sm:block" />

            <div className="text-center px-4">
              <span className="text-xs text-slate-400 block">Drop-off Rate</span>
              <div className="text-3xl font-black text-white mt-0.5">
                {criticalStep.dropOffRate}%
              </div>
              <span className="text-[10px] text-rose-400 font-semibold">
                Severe Abandonment
              </span>
            </div>

            <div className="h-12 w-px bg-slate-800 hidden sm:block" />

            <div className="text-center px-4">
              <span className="text-xs text-slate-400 block">Users Affected</span>
              <div className="text-3xl font-black text-white mt-0.5">
                3,241
              </div>
              <span className="text-[10px] text-slate-400">in selected period</span>
            </div>
          </div>
        </div>

        {/* Action button */}
        <div className="mt-6 pt-4 border-t border-rose-500/30 flex items-center justify-between">
          <span className="text-xs text-slate-300">
            {isFixApplied
              ? '✅ A test fix is currently simulated, lowering friction from 87 to 43.'
              : 'Detailed interaction replay and AI root cause diagnosis available.'}
          </span>
          <button
            onClick={() => {
              setSelectedStepId('checkout');
              setCurrentView('details');
            }}
            className="flex items-center gap-2 rounded-xl bg-rose-500 hover:bg-rose-400 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-rose-500/20 transition-all active:scale-[0.98]"
          >
            <span>Inspect Breakpoint Details & Replay</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Algorithm Formula & Interactive Weight Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formula Explanation Card (1 col) */}
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-500/20 text-sky-400">
              <Sliders className="h-4 w-4" />
            </span>
            <h3 className="text-base font-bold text-white">Scoring Algorithm</h3>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            The friction score is dynamically computed by normalizing a weighted sum of raw user signals:
          </p>

          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-[11px] text-sky-300 space-y-1">
            <div className="text-slate-400">// Dynamic Scoring Equation</div>
            <div className="text-white font-bold">
              Friction = Normalise( ∑ (signal_i × weight_i) )
            </div>
            <div className="text-slate-500 text-[10px] pt-2">
              where weights represent behavioral cognitive distress factors (0.1x to 3.0x).
            </div>
          </div>

          <div className="mt-4 space-y-2 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-rose-500" />
              <span>Form errors & rage clicks carry highest weight</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              <span>Hesitation is weighted per second of idle dwell</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-purple-500" />
              <span>Backtracking penalizes navigation reversal</span>
            </div>
          </div>
        </div>

        {/* Interactive Signal Weights Sandbox (2 cols) */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white">Interactive Signal Weight Sandbox</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Adjust the sensitivity multipliers to see how the friction scores recalculate live.
              </p>
            </div>
            <button
              onClick={resetWeights}
              className="text-xs text-sky-400 hover:text-sky-300 font-semibold"
            >
              Reset to Defaults
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(SIGNAL_METADATA).map(([key, meta]) => {
              const currentVal = weights[key] ?? 1.0;
              return (
                <div key={key} className="p-3.5 rounded-xl border border-slate-800 bg-slate-800/40">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-slate-200">{meta.label}</span>
                    <span className="text-xs font-mono font-bold text-sky-400">
                      {currentVal.toFixed(1)}x
                    </span>
                  </div>

                  <p className="text-[10px] text-slate-400 truncate mb-2">{meta.desc}</p>

                  <input
                    type="range"
                    min="0.2"
                    max="3.0"
                    step="0.1"
                    value={currentVal}
                    onChange={(e) => updateWeight(key, e.target.value)}
                    className="w-full accent-sky-400 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-slate-500 mt-1">
                    <span>0.2x (Low impact)</span>
                    <span>3.0x (Severe)</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

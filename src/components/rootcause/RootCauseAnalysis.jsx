import React from 'react';
import {
  Crosshair,
  AlertTriangle,
  Flame,
  Clock,
  Undo2,
  MousePointerClick,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function RootCauseAnalysis() {
  const { setCurrentView, isFixApplied, applyFix } = useApp();

  const signalsBreakdown = [
    {
      label: 'Form Errors',
      percentage: 42,
      events: '512 validation errors',
      color: '#f43f5e',
      desc: 'Validation feedback only appears after clicking submit; users enter invalid zip or card digits.',
    },
    {
      label: 'Hesitation',
      percentage: 28,
      events: '8.4s avg dwell time',
      color: '#f59e0b',
      desc: 'Users pause on billing address toggle trying to understand whether shipping address is duplicated.',
    },
    {
      label: 'Repeated Clicks',
      percentage: 18,
      events: '932 frustrated clicks',
      color: '#f97316',
      desc: 'Users repeatedly smash the disabled "Place Order" button with no visual feedback as to why it is blocked.',
    },
    {
      label: 'Backtracking',
      percentage: 12,
      events: '741 return reversals',
      color: '#a855f7',
      desc: 'Users hit browser back button to Cart to check if promo discounts carried through to checkout.',
    },
  ];

  const fieldBreakdown = [
    { field: 'Postal / Zip Code Input', errorShare: 42, color: '#f43f5e', fix: 'Add auto-lookup & regex helper' },
    { field: 'Card Number Formatting', errorShare: 28, color: '#f97316', fix: 'Add live 4-digit spacing format' },
    { field: 'Expiration Date (MM/YY)', errorShare: 18, color: '#f59e0b', fix: 'Auto-insert forward slash' },
    { field: 'CVV Security Code', errorShare: 12, color: '#a855f7', fix: 'Add visual CVV tooltip card back' },
  ];

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-white">Root Cause Analysis</h1>
            <span className="rounded-full bg-rose-500/20 px-2.5 py-0.5 text-xs font-bold text-rose-300 border border-rose-500/40">
              Breakpoint Decomposition
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Visual breakdown of behavioral drivers explaining exactly why the Checkout step broke.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentView('insights')}
            className="flex items-center gap-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 px-4 py-2 text-xs font-bold text-white shadow transition-all active:scale-[0.98]"
          >
            <span>View Recommended Fixes</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Primary Root Cause Callout Card */}
      <div className="rounded-2xl border border-rose-500/50 bg-gradient-to-r from-rose-950/40 via-slate-900/80 to-slate-900/60 p-6 backdrop-blur-xl shadow-xl glow-rose">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/40">
            <Crosshair className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-rose-400">
              SYNTHESIZED ROOT CAUSE
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1 leading-snug">
              “Users are struggling with the payment form because validation feedback is unclear and appears too late.”
            </h2>
            <p className="text-xs text-slate-300 mt-2 max-w-3xl leading-relaxed">
              Instead of receiving real-time inline guidance while typing, errors are suppressed until users attempt to submit the order. When the submission fails silently or displays an off-screen alert, users rage-click the disabled CTA, hesitate, and ultimately abandon the purchase.
            </p>
          </div>
        </div>
      </div>

      {/* 4 Contributing Factor Visual Breakdown Bars */}
      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-xl">
        <h3 className="text-base font-bold text-white mb-1">
          Behavioral Signal Weight Breakdown
        </h3>
        <p className="text-xs text-slate-400 mb-6">
          Relative contribution percentage of each behavioral anomaly to the Checkout breakpoint.
        </p>

        <div className="space-y-6">
          {signalsBreakdown.map((sig) => (
            <div key={sig.label} className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">{sig.label}</span>
                  <span className="text-slate-400">({sig.events})</span>
                </div>
                <span className="font-mono text-base font-extrabold text-white">
                  {sig.percentage}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-3.5 w-full rounded-full bg-slate-800 overflow-hidden p-0.5">
                <div
                  className="h-full rounded-full transition-all duration-700 shadow-sm"
                  style={{
                    width: `${sig.percentage}%`,
                    backgroundColor: sig.color,
                  }}
                />
              </div>

              <p className="text-xs text-slate-400">{sig.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Granular Field-by-Field Breakdown */}
      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-xl">
        <h3 className="text-base font-bold text-white mb-1">
          Error Distribution by Form Field
        </h3>
        <p className="text-xs text-slate-400 mb-5">
          Breakdown of which specific checkout inputs generated validation rejections.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {fieldBreakdown.map((field) => (
            <div
              key={field.field}
              className="p-4 rounded-xl border border-slate-800 bg-slate-850/50 flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-semibold text-slate-200 block">{field.field}</span>
                <div className="text-2xl font-black text-rose-400 mt-2">
                  {field.errorShare}% <span className="text-xs font-normal text-slate-500">of errors</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-sky-300 font-medium">
                💡 Fix: {field.fix}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

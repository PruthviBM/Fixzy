import React, { useState } from 'react';
import {
  GitCommitHorizontal,
  ArrowDown,
  ArrowRight,
  Users,
  Clock,
  Zap,
  TrendingDown,
  AlertTriangle,
  ChevronRight,
  Sparkles,
  MousePointer,
  Flame,
  X,
  Play,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getSeverityInfo } from '../../services/frictionEngine';

export default function UserJourneys() {
  const {
    journeySteps,
    selectedStepId,
    setSelectedStepId,
    setCurrentView,
    isFixApplied,
    applyFix,
    selectedProject,
  } = useApp();

  const [activeInspectorId, setActiveInspectorId] = useState(selectedStepId || 'checkout');

  const inspectedStep =
    journeySteps.find((s) => s.id === activeInspectorId) || journeySteps[3];

  const severity = getSeverityInfo(inspectedStep.frictionScore);

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-white">User Journey Analysis</h1>
            <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-xs font-semibold text-slate-300">
              {selectedProject.name}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            End-to-end funnel progression mapping friction intensity, drop-offs, and critical bottlenecks.
          </p>
        </div>

        {/* Severity Legend */}
        <div className="flex flex-wrap items-center gap-2.5 bg-slate-900/80 border border-slate-800 p-2 rounded-xl text-[11px]">
          <span className="text-slate-400 font-medium mr-1">Severity Scale:</span>
          <span className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> 0–30 Low
          </span>
          <span className="flex items-center gap-1 text-yellow-400 bg-yellow-500/10 px-2 py-0.5 rounded-md border border-yellow-500/20">
            <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" /> 31–60 Moderate
          </span>
          <span className="flex items-center gap-1 text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" /> 61–80 High
          </span>
          <span className="flex items-center gap-1 text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-md border border-rose-500/20">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-400" /> 81–100 Critical
          </span>
        </div>
      </div>

      {/* Interactive Horizontal Funnel Visualization */}
      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-xl">
        <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Funnel Flow: Click any step to open deep-dive metrics
          </span>
          <span className="text-xs text-sky-400 font-medium">
            Total Sessions: {journeySteps[0]?.users.toLocaleString()}
          </span>
        </div>

        {/* Steps container */}
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-2.5 pt-2">
          {journeySteps.map((step, idx) => {
            const stepSeverity = getSeverityInfo(step.frictionScore);
            const isSelected = activeInspectorId === step.id;
            const dropUsers =
              idx < journeySteps.length - 1
                ? step.users - (journeySteps[idx + 1]?.users || 0)
                : 0;

            return (
              <div key={step.id} className="relative flex flex-col">
                {/* Step Card */}
                <div
                  onClick={() => {
                    setActiveInspectorId(step.id);
                    setSelectedStepId(step.id);
                  }}
                  className={`group relative flex-1 flex flex-col justify-between p-3 sm:p-3.5 rounded-xl border transition-all cursor-pointer select-none ${
                    isSelected
                      ? 'border-sky-500 bg-slate-800/90 shadow-xl ring-2 ring-sky-500/30'
                      : step.isCriticalBreakpoint
                      ? 'border-rose-500/60 bg-rose-500/10 hover:border-rose-400 glow-rose'
                      : 'border-slate-800 bg-slate-900/80 hover:border-slate-700 hover:bg-slate-850'
                  }`}
                >
                  {/* Top: Step Index & Severity Badge */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-semibold text-slate-400">
                      0{idx + 1}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${stepSeverity.badgeBg}`}
                    >
                      {stepSeverity.tier}
                    </span>
                  </div>

                  {/* Title & Page */}
                  <div>
                    <h4 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                      {step.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">{step.pageUrl}</p>
                  </div>

                  {/* Friction & Drop-off Stats */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 flex items-center gap-1">
                        <Zap className="h-3 w-3 text-slate-400" />
                        Friction
                      </span>
                      <span className={`font-extrabold ${stepSeverity.color}`}>
                        {step.frictionScore} <span className="text-[10px] font-normal text-slate-500">/ 100</span>
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 flex items-center gap-1">
                        <TrendingDown className="h-3 w-3 text-slate-400" />
                        Drop-off
                      </span>
                      <span
                        className={`font-bold ${
                          step.dropOffRate >= 20 ? 'text-rose-400' : 'text-slate-300'
                        }`}
                      >
                        {step.dropOffRate}%
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>Users:</span>
                      <span className="font-mono text-slate-200">{step.users.toLocaleString()}</span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>Avg Time:</span>
                      <span className="text-slate-200">{step.avgTime}</span>
                    </div>
                  </div>

                  {/* Critical Breakpoint Tag */}
                  {step.isCriticalBreakpoint && (
                    <div className="mt-3 rounded-lg bg-rose-500/20 border border-rose-500/40 p-1.5 text-center text-[10px] font-extrabold text-rose-300 animate-pulse">
                      CRITICAL BREAKPOINT
                    </div>
                  )}

                  {/* Active Selected Indicator Pill */}
                  {isSelected && (
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-sky-500 px-2 py-0.5 text-[9px] font-bold text-white shadow">
                      SELECTED
                    </div>
                  )}
                </div>

                {/* Drop-off connector between cards on desktop */}
                {idx < journeySteps.length - 1 && (
                  <div className="hidden lg:flex items-center justify-center my-2 text-[10px] text-rose-400 font-semibold">
                    <span>↓ -{dropUsers.toLocaleString()} ({step.dropOffRate}%)</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Step Inspector Panel */}
      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/70 p-6 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${severity.borderColor} ${severity.bgColor}`}
            >
              <Zap className={`h-6 w-6 ${severity.color}`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">{inspectedStep.name} Step Inspector</h3>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${severity.badgeBg}`}>
                  {severity.tier} Friction ({inspectedStep.frictionScore}/100)
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Route: <code className="text-sky-400 font-mono">{inspectedStep.pageUrl}</code> • Primary issue:{' '}
                <span className="text-slate-200 font-medium">{inspectedStep.topFrictionPoint}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setSelectedStepId(inspectedStep.id);
                setCurrentView('details');
              }}
              className="flex items-center gap-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 px-4 py-2 text-xs font-bold text-white shadow transition-all active:scale-[0.98]"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              <span>Inspect Breakpoint & Replay</span>
            </button>
          </div>
        </div>

        {/* 3 Metric Cards for this step */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="rounded-xl border border-slate-800 bg-slate-800/40 p-4">
            <span className="text-xs text-slate-400">Total Entering Users</span>
            <div className="text-xl font-extrabold text-white mt-1">
              {inspectedStep.users.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Avg Time on Page: <span className="text-slate-200 font-semibold">{inspectedStep.avgTime}</span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-800/40 p-4">
            <span className="text-xs text-slate-400">Step Drop-off Rate</span>
            <div
              className={`text-xl font-extrabold mt-1 ${
                inspectedStep.dropOffRate >= 20 ? 'text-rose-400' : 'text-slate-200'
              }`}
            >
              {inspectedStep.dropOffRate}%
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Lost sessions:{' '}
              <span className="text-rose-300 font-semibold">
                {Math.round((inspectedStep.users * inspectedStep.dropOffRate) / 100).toLocaleString()}
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-800/40 p-4">
            <span className="text-xs text-slate-400">Calculated Friction Score</span>
            <div className={`text-xl font-extrabold mt-1 ${severity.color}`}>
              {inspectedStep.frictionScore} / 100
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Severity: <span className="font-semibold text-slate-200">{severity.label}</span>
            </div>
          </div>
        </div>

        {/* Granular Behavioral Signals Breakdown for this step */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Interaction Signals for {inspectedStep.name}
          </h4>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60">
              <span className="text-slate-400 block">Rage Clicks</span>
              <span className="text-base font-bold text-rose-400 mt-0.5 block">
                {inspectedStep.signals?.rageClicks || 0}
              </span>
              <span className="text-[10px] text-slate-500">rapid repeated taps</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60">
              <span className="text-slate-400 block">Repeated Clicks</span>
              <span className="text-base font-bold text-orange-400 mt-0.5 block">
                {inspectedStep.signals?.repeatedClicks || 0}
              </span>
              <span className="text-[10px] text-slate-500">frustrated retries</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60">
              <span className="text-slate-400 block">Long Hesitation</span>
              <span className="text-base font-bold text-amber-400 mt-0.5 block">
                {inspectedStep.signals?.hesitation || 0}s
              </span>
              <span className="text-[10px] text-slate-500">idle pause dwell</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60">
              <span className="text-slate-400 block">Form Errors</span>
              <span className="text-base font-bold text-red-400 mt-0.5 block">
                {inspectedStep.signals?.formErrors || 0}
              </span>
              <span className="text-[10px] text-slate-500">validation blocks</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import {
  Compass,
  ArrowRight,
  ChevronDown,
  CheckCircle2,
  XCircle,
  Sparkles,
  Zap,
  ShieldCheck,
  PlayCircle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function ProductPhilosophy() {
  const { setCurrentView, setTourStep } = useApp();

  const workflowStages = [
    {
      step: '01',
      title: 'OBSERVE',
      subtitle: 'Passive Telemetry Ingestion',
      desc: 'Fixzy quietly records micro-interactions: rapid clicking, mouse dwell, backtracking, field corrections, and scroll velocity.',
      color: 'border-slate-700 bg-slate-800/60 text-slate-300',
    },
    {
      step: '02',
      title: 'DETECT',
      subtitle: 'Multi-Signal Behavioral Synthesis',
      desc: 'Instead of treating each click in isolation, Fixzy synthesizes multiple behavioral signals to distinguish genuine intent from frustration.',
      color: 'border-sky-500/40 bg-sky-950/30 text-sky-300',
    },
    {
      step: '03',
      title: 'LOCATE BREAKPOINT',
      subtitle: 'Isolate The Fatal Step',
      desc: 'Pinpoints the exact URL and journey step where the digital experience collapses and users abandon.',
      color: 'border-rose-500/50 bg-rose-950/40 text-rose-300 font-bold glow-rose',
    },
    {
      step: '04',
      title: 'EXPLAIN WHY',
      subtitle: 'Cognitive Root Cause Analysis',
      desc: 'Uses AI and heuristics to diagnose the root issue—whether it is cognitive overload, missing feedback, or layout confusion.',
      color: 'border-indigo-500/40 bg-indigo-950/30 text-indigo-300',
    },
    {
      step: '05',
      title: 'RECOMMEND FIX',
      subtitle: 'Actionable Prioritized Prescriptions',
      desc: 'Provides ranked, concrete engineering and design interventions with estimated ROI and drop-off reduction.',
      color: 'border-amber-500/40 bg-amber-950/30 text-amber-300',
    },
    {
      step: '06',
      title: 'MEASURE IMPACT',
      subtitle: 'Before vs After Empirical Proof',
      desc: 'Monitors the cohort post-deployment to mathematically verify whether friction dropped and conversions rose.',
      color: 'border-emerald-500/50 bg-emerald-950/40 text-emerald-300 font-bold glow-emerald',
    },
  ];

  const comparisonMatrix = [
    {
      capability: 'Identifies where users leave the funnel',
      traditionalAnalytics: true,
      sessionReplay: true,
      fixzy: true,
    },
    {
      capability: 'Detects rage clicks and heatmaps',
      traditionalAnalytics: false,
      sessionReplay: true,
      fixzy: true,
    },
    {
      capability: 'Synthesizes 8+ signals into a unified Friction Score',
      traditionalAnalytics: false,
      sessionReplay: false,
      fixzy: true,
    },
    {
      capability: 'Automatically identifies the single critical Breakpoint',
      traditionalAnalytics: false,
      sessionReplay: false,
      fixzy: true,
    },
    {
      capability: 'Explains cognitive root cause with LLM diagnosis',
      traditionalAnalytics: false,
      sessionReplay: false,
      fixzy: true,
    },
    {
      capability: 'Prescribes ranked actionable fixes with estimated impact',
      traditionalAnalytics: false,
      sessionReplay: false,
      fixzy: true,
    },
    {
      capability: 'Measures Before vs After to verify if the fix worked',
      traditionalAnalytics: false,
      sessionReplay: false,
      fixzy: true,
    },
  ];

  return (
    <div className="space-y-8 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-white">Product Differentiation</h1>
            <span className="rounded-full bg-sky-500/20 px-2.5 py-0.5 text-xs font-bold text-sky-300 border border-sky-500/30">
              Core Philosophy
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Why Fixzy is fundamentally different from traditional web analytics and session replays.
          </p>
        </div>

        <button
          onClick={() => {
            setTourStep(1);
            setCurrentView('overview');
          }}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-4 py-2 text-xs font-bold text-white shadow transition-all active:scale-[0.98]"
        >
          <Sparkles className="h-4 w-4" />
          <span>Start Pitch Walkthrough</span>
        </button>
      </div>

      {/* Core Differentiation Statement Card */}
      <div className="rounded-2xl border border-sky-500/40 bg-gradient-to-r from-sky-950/40 via-slate-900/90 to-slate-900/70 p-7 text-center backdrop-blur-xl shadow-xl">
        <span className="text-xs font-bold uppercase tracking-widest text-sky-400">
          The Fixzy Value Proposition
        </span>
        <blockquote className="text-2xl sm:text-3xl font-extrabold text-white mt-3 leading-snug max-w-4xl mx-auto">
          “Fixzy converts multiple behavioral signals into a prioritized breakpoint, explains the likely cause, recommends an action, and measures the result after the fix.”
        </blockquote>
        <p className="text-xs text-slate-300 mt-3 max-w-2xl mx-auto leading-relaxed">
          We don’t claim to be the first tool to record mouse clicks or generate heatmaps. Our breakthrough is transforming noisy behavioral telemetries into an actionable, closed-loop engineering remediation cycle.
        </p>
      </div>

      {/* 6-Stage Sequential Workflow */}
      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-xl">
        <h3 className="text-base font-bold text-white mb-1">
          The 6-Stage UX Intelligence Pipeline
        </h3>
        <p className="text-xs text-slate-400 mb-6">
          How Fixzy bridges the gap between raw telemetry and verified business outcomes.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {workflowStages.map((stage) => (
            <div
              key={stage.step}
              className={`p-5 rounded-2xl border transition-all ${stage.color}`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-black text-slate-400">{stage.step}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-black/40">
                  {stage.title}
                </span>
              </div>
              <h4 className="text-base font-bold text-white mb-1">{stage.subtitle}</h4>
              <p className="text-xs text-slate-300/90 leading-relaxed">{stage.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison Matrix Table */}
      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-xl">
        <h3 className="text-base font-bold text-white mb-1">Capability Matrix</h3>
        <p className="text-xs text-slate-400 mb-6">
          Comparing traditional funnel analytics, legacy session recording, and Fixzy UX Intelligence.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-800 text-slate-400 uppercase font-bold text-[10px]">
              <tr>
                <th className="py-3 px-4">Capability</th>
                <th className="py-3 px-4 text-center">Traditional Funnels (GA4/Mixpanel)</th>
                <th className="py-3 px-4 text-center">Session Replay (Hotjar/FullStory)</th>
                <th className="py-3 px-4 text-center bg-sky-500/10 text-sky-300 font-extrabold rounded-t-lg">
                  Fixzy UX Intelligence
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {comparisonMatrix.map((row) => (
                <tr key={row.capability} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">{row.capability}</td>
                  <td className="py-3 px-4 text-center">
                    {row.traditionalAnalytics ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 mx-auto" />
                    ) : (
                      <XCircle className="h-4 w-4 text-slate-600 mx-auto" />
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {row.sessionReplay ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 mx-auto" />
                    ) : (
                      <XCircle className="h-4 w-4 text-slate-600 mx-auto" />
                    )}
                  </td>
                  <td className="py-3 px-4 text-center bg-sky-500/10">
                    <CheckCircle2 className="h-4 w-4 text-sky-400 mx-auto fill-sky-400/20" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

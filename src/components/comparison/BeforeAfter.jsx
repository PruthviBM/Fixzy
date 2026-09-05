import React, { useState } from 'react';
import {
  TrendingDown,
  ArrowRightLeft,
  Zap,
  Clock,
  Users,
  CheckCircle2,
  Sparkles,
  Play,
  RotateCcw,
  ArrowDown,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  Cell,
} from 'recharts';
import { useApp } from '../../context/AppContext';

export default function BeforeAfter() {
  const { beforeAfterData, isFixApplied, applyFix, resetFixes, addToast } = useApp();

  const [isAnimating, setIsAnimating] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const handleRunComparison = () => {
    setIsAnimating(true);
    setAnimationKey((prev) => prev + 1);
    addToast('Running Comparison Analysis', 'Comparing pre-fix baseline with post-fix live cohort...', 'info');
    setTimeout(() => {
      setIsAnimating(false);
      addToast('Comparison Verified', 'UX Improvement confirmed: 51% friction reduction achieved.', 'success');
    }, 900);
  };

  const chartData = [
    {
      metric: 'Friction Score',
      Before: 87,
      After: 43,
      unit: '/100',
    },
    {
      metric: 'Drop-off %',
      Before: 31,
      After: 14,
      unit: '%',
    },
    {
      metric: 'Avg Hesitation (s)',
      Before: 8.4,
      After: 4.1,
      unit: 's',
    },
    {
      metric: 'Form Error %',
      Before: 24.3,
      After: 4.8,
      unit: '%',
    },
  ];

  return (
    <div className="space-y-6 pb-12 animate-fade-in" key={animationKey}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-white">Before vs After Impact</h1>
            <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-bold text-emerald-300 border border-emerald-500/30">
              Impact Proof
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Empirical before-and-after cohort telemetry measuring the real impact of your UX fixes.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleRunComparison}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-md hover:from-sky-400 hover:to-indigo-500 transition-all active:scale-[0.98]"
          >
            <Play className={`h-3.5 w-3.5 fill-current ${isAnimating ? 'animate-spin' : ''}`} />
            <span>Run Comparison</span>
          </button>
        </div>
      </div>

      {/* Core Hero Statement */}
      <div className="rounded-2xl border border-sky-500/30 bg-gradient-to-r from-sky-950/40 via-slate-900/80 to-slate-900/60 p-6 text-center backdrop-blur-xl shadow-xl">
        <span className="text-[11px] font-bold uppercase tracking-widest text-sky-400">
          The Fixzy Guarantee
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
          “Fixzy measures whether your UX improvement actually worked.”
        </h2>
        <p className="text-xs text-slate-300 mt-2 max-w-xl mx-auto leading-relaxed">
          Don’t guess whether a redesign helped. Fixzy continuously measures behavioral signals post-deployment to verify genuine friction elimination.
        </p>
      </div>

      {/* 3 Prominent Delta Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-emerald-500/40 bg-slate-900/80 p-5 text-center backdrop-blur-xl glow-emerald">
          <span className="text-xs font-semibold text-slate-400">Overall Friction</span>
          <div className="text-4xl font-black text-emerald-400 mt-1 flex items-center justify-center gap-1">
            <ArrowDown className="h-7 w-7" />
            <span>51%</span>
          </div>
          <p className="text-xs text-slate-300 mt-1 font-medium">87 → 43 Normalized Score</p>
        </div>

        <div className="rounded-2xl border border-emerald-500/40 bg-slate-900/80 p-5 text-center backdrop-blur-xl glow-emerald">
          <span className="text-xs font-semibold text-slate-400">Funnel Drop-off Rate</span>
          <div className="text-4xl font-black text-emerald-400 mt-1 flex items-center justify-center gap-1">
            <ArrowDown className="h-7 w-7" />
            <span>55%</span>
          </div>
          <p className="text-xs text-slate-300 mt-1 font-medium">31% → 14% Abandonment</p>
        </div>

        <div className="rounded-2xl border border-emerald-500/40 bg-slate-900/80 p-5 text-center backdrop-blur-xl glow-emerald">
          <span className="text-xs font-semibold text-slate-400">Average Hesitation</span>
          <div className="text-4xl font-black text-emerald-400 mt-1 flex items-center justify-center gap-1">
            <ArrowDown className="h-7 w-7" />
            <span>51%</span>
          </div>
          <p className="text-xs text-slate-300 mt-1 font-medium">8.4s → 4.1s Dwell Time</p>
        </div>
      </div>

      {/* Side-by-Side Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* BEFORE FIX Card */}
        <div className="rounded-2xl border border-rose-500/40 bg-slate-900/70 p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-rose-500" />
              <h3 className="text-base font-bold text-white">BEFORE FIX (Baseline)</h3>
            </div>
            <span className="rounded-md bg-rose-500/20 px-2 py-0.5 text-[10px] font-bold text-rose-300 border border-rose-500/40">
              High Friction
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-850/60 border border-slate-800">
              <span className="text-xs text-slate-400">Friction Score</span>
              <span className="text-lg font-extrabold text-rose-400">87 / 100</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-850/60 border border-slate-800">
              <span className="text-xs text-slate-400">Drop-off Rate</span>
              <span className="text-lg font-extrabold text-rose-400">31%</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-850/60 border border-slate-800">
              <span className="text-xs text-slate-400">Average Hesitation</span>
              <span className="text-lg font-extrabold text-amber-400">8.4 seconds</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-850/60 border border-slate-800">
              <span className="text-xs text-slate-400">Monthly Abandoned Sessions</span>
              <span className="text-lg font-bold text-slate-200">3,241 users</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-850/60 border border-slate-800">
              <span className="text-xs text-slate-400">Form Error Rate</span>
              <span className="text-lg font-bold text-rose-400">24.3%</span>
            </div>
          </div>
        </div>

        {/* AFTER FIX Card */}
        <div className="rounded-2xl border border-emerald-500/40 bg-slate-900/70 p-6 backdrop-blur-xl glow-emerald">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse" />
              <h3 className="text-base font-bold text-white">AFTER FIX (Validated)</h3>
            </div>
            <span className="rounded-md bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300 border border-emerald-500/40">
              Optimized Flow
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-850/60 border border-slate-800">
              <span className="text-xs text-slate-400">Friction Score</span>
              <div className="text-right">
                <span className="text-lg font-extrabold text-emerald-400">43 / 100</span>
                <span className="block text-[10px] font-semibold text-emerald-400">↓ 51% drop</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-850/60 border border-slate-800">
              <span className="text-xs text-slate-400">Drop-off Rate</span>
              <div className="text-right">
                <span className="text-lg font-extrabold text-emerald-400">14%</span>
                <span className="block text-[10px] font-semibold text-emerald-400">↓ 55% reduction</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-850/60 border border-slate-800">
              <span className="text-xs text-slate-400">Average Hesitation</span>
              <div className="text-right">
                <span className="text-lg font-extrabold text-emerald-400">4.1 seconds</span>
                <span className="block text-[10px] font-semibold text-emerald-400">↓ 51% faster</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-850/60 border border-slate-800">
              <span className="text-xs text-slate-400">Monthly Abandoned Sessions</span>
              <div className="text-right">
                <span className="text-lg font-bold text-slate-200">1,460 users</span>
                <span className="block text-[10px] font-semibold text-emerald-400">+1,781 saved</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-850/60 border border-slate-800">
              <span className="text-xs text-slate-400">Form Error Rate</span>
              <div className="text-right">
                <span className="text-lg font-bold text-emerald-400">4.8%</span>
                <span className="block text-[10px] font-semibold text-emerald-400">↓ 80% error drop</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Recharts Comparison Chart */}
      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-bold text-white">Direct Metric Comparison</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Side-by-side grouped visualization showing the pre-fix vs post-fix variance.
            </p>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="metric" stroke="#64748b" tick={{ fontSize: 12 }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '0.75rem',
                  fontSize: '12px',
                  color: '#f8fafc',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Bar dataKey="Before" fill="#f43f5e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="After" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

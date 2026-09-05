import React, { useState } from 'react';
import {
  Zap,
  Users,
  TrendingDown,
  AlertOctagon,
  Clock,
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  ChevronRight,
  PlayCircle,
  Activity,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Globe,
  ClipboardPaste,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { useApp } from '../../context/AppContext';

export default function OverviewDashboard() {
  const {
    kpis,
    trendData,
    selectedRange,
    setSelectedRange,
    setCurrentView,
    setSelectedStepId,
    isFixApplied,
    resetFixes,
    applyFix,
    selectedProject,
    customSite,
    analyzeCustomSite,
    isScanningUrl,
    setIsUrlModalOpen,
  } = useApp();

  const [quickUrl, setQuickUrl] = useState('');

  const handleQuickAnalyze = (e) => {
    e.preventDefault();
    if (!quickUrl) return;
    analyzeCustomSite(quickUrl, '');
  };

  // Signal breakdown for charts
  const signalsData = [
    { name: 'Form Errors', value: 42, color: '#f43f5e', count: '512 events' },
    { name: 'Hesitation', value: 28, color: '#f59e0b', count: '8.4s avg' },
    { name: 'Repeated Clicks', value: 18, color: '#f97316', count: '932 events' },
    { name: 'Backtracking', value: 12, color: '#a855f7', count: '741 events' },
  ];

  const kpiCards = [
    {
      id: 'friction',
      title: 'Overall Friction Score',
      value: `${kpis.frictionScore} / 100`,
      trend: isFixApplied ? '-51% post-fix' : '+4.2% vs last period',
      trendType: isFixApplied ? 'positive' : 'negative',
      icon: Zap,
      badge: kpis.frictionScore >= 60 ? 'Critical' : 'Moderate',
      badgeColor:
        kpis.frictionScore >= 60
          ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
          : 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      color: 'from-rose-500/20 to-orange-500/5 text-rose-400',
    },
    {
      id: 'sessions',
      title: 'Sessions Tracked',
      value: kpis.sessions,
      trend: '+12.5% volume',
      trendType: 'positive',
      icon: Users,
      badge: 'Live',
      badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
      color: 'from-sky-500/20 to-blue-500/5 text-sky-400',
    },
    {
      id: 'dropoff',
      title: 'Drop-off Rate',
      value: kpis.dropOffRate,
      trend: isFixApplied ? '-55% improvement' : '+2.1% benchmark delta',
      trendType: isFixApplied ? 'positive' : 'negative',
      icon: TrendingDown,
      badge: isFixApplied ? 'Recovered' : 'High Risk',
      badgeColor: isFixApplied
        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
        : 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      color: 'from-purple-500/20 to-pink-500/5 text-purple-400',
    },
    {
      id: 'breakpoints',
      title: 'Critical Breakpoints',
      value: kpis.criticalBreakpoints,
      trend: isFixApplied ? '3 resolved' : '1 urgent bottleneck',
      trendType: isFixApplied ? 'positive' : 'negative',
      icon: AlertOctagon,
      badge: isFixApplied ? '1 Remaining' : 'Immediate Action',
      badgeColor: isFixApplied
        ? 'bg-sky-500/20 text-sky-300 border-sky-500/30'
        : 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      color: 'from-amber-500/20 to-yellow-500/5 text-amber-400',
    },
    {
      id: 'time',
      title: 'Average Journey Time',
      value: kpis.avgJourneyTime,
      trend: '-14s vs cycle',
      trendType: 'positive',
      icon: Clock,
      badge: 'Hesitation: 24%',
      badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      color: 'from-emerald-500/20 to-teal-500/5 text-emerald-400',
    },
  ];

  return (
    <div className="space-y-5 pb-12 animate-fade-in">
      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Experience Overview</h1>
            <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-xs font-semibold text-slate-300 truncate max-w-xs">
              {selectedProject.domain}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time behavioral telemetry, breakpoint detection, and experience health.
          </p>
        </div>

        {/* Quick action bar */}
        <div className="flex flex-wrap items-center gap-2">
          {isFixApplied ? (
            <button
              onClick={resetFixes}
              className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-700 transition-colors"
            >
              <RotateCcw className="h-3 w-3 text-slate-400" />
              <span>Revert Test Fix</span>
            </button>
          ) : (
            <button
              onClick={() => applyFix('fix-1')}
              className="flex items-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/20 transition-all"
            >
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              <span>Simulate Fix (-51%)</span>
            </button>
          )}

          <button
            onClick={() => setCurrentView('live-demo')}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-md hover:from-sky-400 hover:to-indigo-500 transition-all active:scale-[0.98]"
          >
            <PlayCircle className="h-3.5 w-3.5" />
            <span>Run Live Demo</span>
          </button>
        </div>
      </div>

      {/* Quick Website Input Bar (Allows pasting link before explanation) */}
      <div className="rounded-2xl border border-sky-500/30 bg-slate-900/80 p-3.5 sm:p-4 backdrop-blur-xl">
        <form onSubmit={handleQuickAnalyze} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          <div className="flex items-center gap-2 text-xs text-sky-400 font-semibold shrink-0">
            <Globe className="h-4 w-4 text-sky-400" />
            <span>Analyze Website:</span>
          </div>

          <div className="relative flex-1">
            <input
              type="text"
              value={quickUrl}
              onChange={(e) => setQuickUrl(e.target.value)}
              placeholder="Paste website link (e.g., https://mystore.com/checkout) to analyze friction..."
              className="w-full rounded-xl border border-slate-700 bg-slate-950 pl-3 pr-20 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:border-sky-500 focus:outline-none font-mono"
            />
            <button
              type="button"
              onClick={async () => {
                try {
                  const text = await navigator.clipboard.readText();
                  if (text) setQuickUrl(text.trim());
                } catch {}
              }}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-1 rounded-lg bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300 hover:bg-slate-700 transition-colors"
            >
              <ClipboardPaste className="h-3 w-3 text-sky-400" />
              <span>Paste</span>
            </button>
          </div>

          <button
            type="submit"
            disabled={isScanningUrl || !quickUrl}
            className="flex items-center justify-center gap-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 px-4 py-1.5 text-xs font-bold text-white shadow transition-all disabled:opacity-50"
          >
            <span>{isScanningUrl ? 'Scanning...' : 'Analyze Site'}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </form>
      </div>

      {/* KPI Cards Grid (Laptop Responsive: 2 cols on mobile, 3 on tablet/small laptop, 5 on desktop) */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4">
        {kpiCards.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.id}
              className="relative rounded-2xl border border-slate-800/80 bg-slate-900/60 p-3.5 sm:p-4 backdrop-blur-xl shadow-sm hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br ${kpi.color} border border-white/5`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <span
                  className={`rounded-md border px-1.5 py-0.5 text-[9px] font-bold truncate max-w-[90px] ${kpi.badgeColor}`}
                >
                  {kpi.badge}
                </span>
              </div>

              <div className="mt-3">
                <span className="text-[11px] font-medium text-slate-400 block truncate">{kpi.title}</span>
                <div className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">{kpi.value}</div>
              </div>

              <div className="mt-2.5 flex items-center gap-1 text-[10px] font-semibold">
                {kpi.trendType === 'positive' ? (
                  <ArrowDownRight className="h-3 w-3 text-emerald-400" />
                ) : (
                  <ArrowUpRight className="h-3 w-3 text-rose-400" />
                )}
                <span
                  className={`truncate ${kpi.trendType === 'positive' ? 'text-emerald-400' : 'text-rose-400'}`}
                >
                  {kpi.trend}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Critical Breakpoint Spotlight Banner */}
      <div
        onClick={() => {
          setSelectedStepId('checkout');
          setCurrentView('details');
        }}
        className="group relative flex flex-col md:flex-row items-start md:items-center justify-between gap-3 p-4 sm:p-5 rounded-2xl border border-rose-500/40 bg-gradient-to-r from-rose-950/30 via-slate-900/80 to-slate-900/60 shadow-xl cursor-pointer hover:border-rose-500/70 transition-all glow-rose"
      >
        <div className="flex items-start sm:items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-rose-500/30 px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-rose-300 border border-rose-500/40">
                CRITICAL BREAKPOINT DETECTED
              </span>
              <span className="text-[11px] text-slate-400 truncate max-w-xs">
                {customSite.isCustom ? customSite.url : '/checkout/payment'}
              </span>
            </div>
            <h3 className="text-base font-bold text-white mt-0.5">
              Checkout → Payment Form (Friction: {isFixApplied ? '43' : '87'}/100)
            </h3>
            <p className="text-[11px] text-slate-300 mt-0.5 max-w-2xl leading-relaxed">
              31% drop-off rate affecting 3,241 users. Signals show form validation errors, repeated clicks, and 8.4s hesitation.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
          <div className="text-right hidden sm:block">
            <div className="text-[10px] text-slate-400">Revenue at Risk</div>
            <div className="text-sm font-bold text-rose-300">$48,200 / mo</div>
          </div>
          <button className="flex items-center gap-1 rounded-xl bg-rose-500 hover:bg-rose-400 px-3 py-1.5 text-xs font-bold text-white shadow transition-all group-hover:translate-x-1">
            <span>Analyze</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Main Friction & Drop-off Trend Chart (2 cols) */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 sm:p-5 backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">Friction Score vs Conversion Trend</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Correlation between behavioral friction and journey completion ({selectedRange})
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1 text-rose-400 font-medium">
                <span className="h-2 w-2 rounded-full bg-rose-500" />
                <span>Friction</span>
              </div>
              <div className="flex items-center gap-1 text-sky-400 font-medium">
                <span className="h-2 w-2 rounded-full bg-sky-400" />
                <span>Conversion %</span>
              </div>
            </div>
          </div>

          <div className="h-60 sm:h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="frictionGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="convGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="day" stroke="#64748b" tick={{ fontSize: 10 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 10 }} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '0.75rem',
                    fontSize: '11px',
                    color: '#f8fafc',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="friction"
                  name="Friction Score"
                  stroke="#f43f5e"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#frictionGrad)"
                />
                <Area
                  type="monotone"
                  dataKey="conversion"
                  name="Conversion %"
                  stroke="#38bdf8"
                  strokeWidth={1.5}
                  fillOpacity={1}
                  fill="url(#convGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Signals Distribution Breakdown (1 col) */}
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 sm:p-5 backdrop-blur-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm sm:text-base font-bold text-white">Friction Signal Drivers</h3>
              <span
                className="text-xs text-sky-400 font-semibold cursor-pointer hover:underline"
                onClick={() => setCurrentView('breakpoints')}
              >
                Engine
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mb-4">
              Breakdown of interaction signals triggering the breakpoint.
            </p>

            {/* Visual Bars */}
            <div className="space-y-3">
              {signalsData.map((sig) => (
                <div key={sig.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-300 text-[11px]">{sig.name}</span>
                    <span className="text-slate-400 font-mono text-[11px]">
                      {sig.value}% ({sig.count})
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${sig.value}%`, backgroundColor: sig.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/80 mt-4">
            <button
              onClick={() => setCurrentView('root-cause')}
              className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/60 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-800 transition-colors"
            >
              <Activity className="h-3.5 w-3.5 text-sky-400" />
              <span>Open Root Cause Breakdown</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import {
  Zap,
  ArrowRight,
  PlayCircle,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Search,
  BrainCircuit,
  TrendingUp,
  ShieldCheck,
  ChevronRight,
  Layers,
  Activity,
  Globe,
  ClipboardPaste,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function LandingPage() {
  const { setCurrentView, setTourStep, analyzeCustomSite, setIsUrlModalOpen } = useApp();
  const [heroUrl, setHeroUrl] = useState('');

  const miniSteps = [
    { name: 'Landing', friction: 12, dropOff: '2%', status: 'low' },
    { name: 'Product', friction: 24, dropOff: '5%', status: 'low' },
    { name: 'Cart', friction: 41, dropOff: '9%', status: 'moderate' },
    {
      name: 'Checkout',
      friction: 87,
      dropOff: '31%',
      status: 'critical',
      highlight: true,
      alert: 'CRITICAL BREAKPOINT',
    },
    { name: 'Payment', friction: 63, dropOff: '17%', status: 'high' },
  ];

  const features = [
    {
      number: '01',
      title: 'DETECT',
      subtitle: 'Surface hidden frustration signals',
      desc: 'Detect rage clicks, repeated clicks, hesitations, form validation errors, and backtracking before users abandon.',
      icon: Flame,
      color: 'from-rose-500/20 to-orange-500/10 text-rose-400 border-rose-500/30',
    },
    {
      number: '02',
      title: 'EXPLAIN',
      subtitle: 'Diagnose the cognitive root cause',
      desc: 'Understand exactly why users struggle. Fixzy correlates behavioral signals with form ergonomics and visual friction.',
      icon: BrainCircuit,
      color: 'from-indigo-500/20 to-sky-500/10 text-indigo-400 border-indigo-500/30',
    },
    {
      number: '03',
      title: 'FIX & PROVE',
      subtitle: 'Measure before vs after impact',
      desc: 'Receive AI-ranked fixes, deploy test variations, and verify that friction dropped and conversion recovered.',
      icon: TrendingUp,
      color: 'from-emerald-500/20 to-teal-500/10 text-emerald-400 border-emerald-500/30',
    },
  ];

  const handleHeroAnalyze = (e) => {
    e.preventDefault();
    if (!heroUrl) return;
    analyzeCustomSite(heroUrl, '');
    setCurrentView('overview');
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 selection:bg-sky-500 selection:text-white bg-grid-pattern">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#0B0F19]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between py-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 shadow-md shadow-sky-500/25">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <div>
              <span className="text-lg font-extrabold tracking-tight text-white">Fixzy</span>
              <span className="block text-[9px] uppercase font-bold tracking-wider text-sky-400">
                UX Intelligence
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setTourStep(1);
                setCurrentView('overview');
              }}
              className="hidden sm:flex items-center gap-1.5 rounded-xl border border-sky-500/40 bg-sky-500/10 px-3 py-1.5 text-xs font-semibold text-sky-300 hover:bg-sky-500/20 transition-all"
            >
              <Sparkles className="h-3.5 w-3.5 text-sky-400" />
              <span>Pitch Walkthrough</span>
            </button>

            <button
              onClick={() => setCurrentView('overview')}
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-4 py-1.5 text-xs font-bold text-white shadow-md shadow-sky-500/20 hover:from-sky-400 hover:to-indigo-500 transition-all active:scale-[0.98]"
            >
              <span>Launch Dashboard</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 px-4 sm:px-6 max-w-7xl mx-auto text-center">
        {/* Glow effect */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3.5 py-1 text-xs font-semibold text-sky-300 mb-5 animate-fade-in">
          <Sparkles className="h-3.5 w-3.5 text-sky-400" />
          <span>Next-Generation UX Friction Intelligence</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
          Find the Friction. <br />
          <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-rose-400 bg-clip-text text-transparent">
            Fix the Experience.
          </span>
        </h1>

        <p className="mt-4 text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Fixzy turns hidden user frustration into measurable insights, helping product and engineering teams find exactly where digital journeys break.
        </p>

        {/* Custom Website Link Input Bar in Hero */}
        <div className="mt-6 max-w-xl mx-auto">
          <form
            onSubmit={handleHeroAnalyze}
            className="flex flex-col sm:flex-row items-stretch gap-2 p-1.5 rounded-2xl border border-sky-500/40 bg-slate-900/90 shadow-2xl backdrop-blur-xl"
          >
            <div className="relative flex-1">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-sky-400 pointer-events-none" />
              <input
                type="text"
                value={heroUrl}
                onChange={(e) => setHeroUrl(e.target.value)}
                placeholder="Paste website or journey link (e.g. https://mystore.com/checkout)"
                className="w-full rounded-xl bg-transparent pl-9 pr-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none font-mono"
              />
            </div>
            <button
              type="submit"
              className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-5 py-2 text-xs font-bold text-white shadow hover:from-sky-400 hover:to-indigo-500 transition-all active:scale-[0.98] shrink-0"
            >
              <span>Analyze Friction</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </form>
          <div className="mt-2 text-[11px] text-slate-400">
            Paste any link to detect breakpoints and get AI root cause explanation
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setCurrentView('overview')}
            className="flex items-center gap-1.5 rounded-xl bg-sky-500 px-5 py-2.5 text-xs font-bold text-white shadow-xl hover:bg-sky-400 transition-all active:scale-[0.98]"
          >
            <span>Launch Dashboard</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>

          <button
            onClick={() => setCurrentView('live-demo')}
            className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900/80 px-5 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-800 hover:border-slate-600 transition-all"
          >
            <PlayCircle className="h-3.5 w-3.5 text-sky-400" />
            <span>Run Live Demo</span>
          </button>
        </div>

        {/* Hero Visual: Interactive Miniature Journey */}
        <div className="mt-10 max-w-4xl mx-auto">
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/80 p-4 sm:p-6 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="text-left">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Live Funnel Telemetry Preview
                </span>
                <h4 className="text-xs sm:text-sm font-semibold text-white">
                  Acme Global E-Commerce — Active Session Stream
                </h4>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
                <span className="text-xs font-semibold text-rose-400">1 Critical Breakpoint</span>
              </div>
            </div>

            {/* Steps row */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
              {miniSteps.map((step, idx) => (
                <div
                  key={step.name}
                  onClick={() => {
                    if (step.highlight) setCurrentView('details');
                    else setCurrentView('journeys');
                  }}
                  className={`group relative flex flex-col justify-between p-3.5 rounded-xl border transition-all cursor-pointer ${
                    step.highlight
                      ? 'border-rose-500/60 bg-rose-500/10 shadow-lg shadow-rose-500/20 scale-[1.02] glow-rose ring-1 ring-rose-500/40'
                      : 'border-slate-800 bg-slate-800/40 hover:border-slate-700 hover:bg-slate-800/70'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] mb-1.5 font-mono text-slate-400">
                    <span>0{idx + 1}</span>
                    {step.highlight && (
                      <span className="rounded bg-rose-500/30 px-1 py-0.2 text-[8px] font-bold text-rose-300">
                        BREAKPOINT
                      </span>
                    )}
                  </div>

                  <div className="text-left">
                    <h5
                      className={`text-xs sm:text-sm font-bold ${
                        step.highlight ? 'text-rose-200' : 'text-white'
                      }`}
                    >
                      {step.name}
                    </h5>

                    <div className="mt-2 flex items-baseline justify-between text-xs">
                      <span className="text-[10px] text-slate-400">Friction:</span>
                      <span
                        className={`text-xs sm:text-sm font-extrabold ${
                          step.highlight
                            ? 'text-rose-400'
                            : step.friction > 40
                            ? 'text-amber-400'
                            : 'text-emerald-400'
                        }`}
                      >
                        {step.friction} / 100
                      </span>
                    </div>

                    <div className="mt-0.5 flex items-baseline justify-between text-xs">
                      <span className="text-[10px] text-slate-400">Drop-off:</span>
                      <span
                        className={`text-xs font-semibold ${
                          step.highlight ? 'text-rose-400' : 'text-slate-300'
                        }`}
                      >
                        {step.dropOff}
                      </span>
                    </div>
                  </div>

                  {step.highlight && (
                    <div className="mt-2 pt-1.5 border-t border-rose-500/30 text-[10px] text-rose-300 font-semibold flex items-center justify-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      <span>Inspect Breakpoint</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> 0-30 Low
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400" /> 31-60 Mod
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-400" /> 81-100 Critical
                </span>
              </div>
              <button
                onClick={() => setCurrentView('journeys')}
                className="text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1 transition-colors"
              >
                <span>View Full Funnel</span>
                <ChevronRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto border-t border-slate-800/80">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
            How Fixzy Works
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            The Three Pillars of Friction Intelligence
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="relative rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6 backdrop-blur-lg hover:border-slate-700 transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl border bg-gradient-to-br ${feat.color}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-500">{feat.number}</span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs font-semibold text-sky-400 mt-0.5">{feat.subtitle}</p>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Product Statement & Philosophy */}
      <section className="py-16 px-4 sm:px-6 max-w-5xl mx-auto text-center border-t border-slate-800/80">
        <div className="rounded-3xl border border-sky-500/20 bg-gradient-to-b from-sky-950/30 to-slate-900/60 p-6 sm:p-10 backdrop-blur-xl">
          <span className="text-xs font-bold uppercase tracking-widest text-sky-400">
            Fixzy Core Philosophy
          </span>

          <blockquote className="mt-4 text-lg sm:text-2xl font-extrabold text-white leading-relaxed">
            “Most analytics tell you <span className="text-slate-400">what users did</span>.<br />
            Fixzy tells you <span className="text-rose-400">where the experience broke</span>,{' '}
            <span className="text-amber-400">why it happened</span>, and{' '}
            <span className="text-emerald-400">what to fix next</span>.”
          </blockquote>

          {/* Linear flow diagram */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-[11px] font-semibold">
            {['OBSERVE', 'DETECT', 'LOCATE BREAKPOINT', 'EXPLAIN WHY', 'RECOMMEND FIX', 'MEASURE IMPACT'].map(
              (item, i) => (
                <React.Fragment key={item}>
                  <span
                    className={`px-2.5 py-1 rounded-lg border ${
                      i === 2
                        ? 'border-rose-500/50 bg-rose-500/20 text-rose-300 font-bold'
                        : i === 5
                        ? 'border-emerald-500/50 bg-emerald-500/20 text-emerald-300 font-bold'
                        : 'border-slate-700 bg-slate-800 text-slate-300'
                    }`}
                  >
                    {item}
                  </span>
                  {i < 5 && <ChevronRight className="h-3 w-3 text-slate-600" />}
                </React.Fragment>
              )
            )}
          </div>

          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              onClick={() => setCurrentView('overview')}
              className="rounded-xl bg-sky-500 px-5 py-2.5 text-xs font-bold text-white shadow hover:bg-sky-400 transition-all"
            >
              Open Fixzy Dashboard
            </button>
            <button
              onClick={() => setCurrentView('philosophy')}
              className="rounded-xl border border-slate-700 px-5 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-all"
            >
              Product Differentiation
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 border-t border-slate-800/80 text-center text-xs text-slate-500">
        <p>© 2026 Fixzy UX Intelligence. “Find the Friction. Fix the Experience.”</p>
      </footer>
    </div>
  );
}

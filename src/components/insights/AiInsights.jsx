import React, { useState } from 'react';
import {
  Sparkles,
  BrainCircuit,
  AlertTriangle,
  CheckCircle2,
  TrendingDown,
  RotateCw,
  Zap,
  ArrowRight,
  ShieldCheck,
  Check,
  Flame,
  Clock,
  Layers,
  Globe,
  ClipboardPaste,
  Edit3,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AiInsights() {
  const {
    aiInsights,
    recommendedFixes,
    isFixApplied,
    appliedFixesList,
    applyFix,
    resetFixes,
    setCurrentView,
    addToast,
    customSite,
    analyzeCustomSite,
    isScanningUrl,
    setIsUrlModalOpen,
  } = useApp();

  const [isRegenerating, setIsRegenerating] = useState(false);
  const [inlineUrl, setInlineUrl] = useState(customSite.url || '');
  const [inlineName, setInlineName] = useState(customSite.name || '');
  const [showUrlEditor, setShowUrlEditor] = useState(!customSite.isCustom);

  const handleRegenerate = () => {
    setIsRegenerating(true);
    addToast('Analyzing Telemetry', `Synthesizing session traces for ${customSite.name}...`, 'info');
    setTimeout(() => {
      setIsRegenerating(false);
      addToast('Analysis Complete', `AI Insights refreshed for ${customSite.name} with 94% statistical confidence.`, 'success');
    }, 1200);
  };

  const handlePasteInline = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setInlineUrl(text.trim());
    } catch {}
  };

  const handleAnalyzeInline = (e) => {
    e.preventDefault();
    if (!inlineUrl) return;
    analyzeCustomSite(inlineUrl, inlineName);
    setShowUrlEditor(false);
  };

  return (
    <div className="space-y-5 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              AI Diagnostic Insights
            </h1>
            <span className="flex items-center gap-1 rounded-full bg-indigo-500/20 px-2.5 py-0.5 text-xs font-bold text-indigo-300 border border-indigo-500/30">
              <Sparkles className="h-3 w-3" />
              <span>Cognitive Reasoner</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Generative causal inference explaining why users struggle and recommending high-impact interventions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowUrlEditor(!showUrlEditor)}
            className="flex items-center gap-1.5 rounded-xl border border-sky-500/40 bg-sky-500/10 px-3 py-1.5 text-xs font-semibold text-sky-300 hover:bg-sky-500/20 transition-all"
          >
            <Globe className="h-3.5 w-3.5" />
            <span>{showUrlEditor ? 'Hide URL Box' : 'Paste Different Website'}</span>
          </button>

          <button
            onClick={handleRegenerate}
            disabled={isRegenerating || isScanningUrl}
            className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-750 transition-all disabled:opacity-50"
          >
            <RotateCw className={`h-3 w-3 ${isRegenerating ? 'animate-spin text-sky-400' : ''}`} />
            <span>{isRegenerating ? 'Analyzing...' : 'Regenerate'}</span>
          </button>
        </div>
      </div>

      {/* Website Link / Name Input Banner (Before Giving the Explanation) */}
      <div className="rounded-2xl border border-sky-500/40 bg-gradient-to-r from-sky-950/40 via-slate-900/80 to-slate-900/60 p-4 sm:p-5 backdrop-blur-xl shadow-lg glow-blue">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/20 text-sky-400 border border-sky-500/30 shrink-0">
              <Globe className="h-4 w-4" />
            </span>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400">
                Target Website Under Analysis
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <h3 className="text-sm sm:text-base font-bold text-white truncate max-w-sm sm:max-w-md">
                  {customSite.name}
                </h3>
                <code className="text-xs text-sky-300 font-mono bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800 truncate max-w-xs">
                  {customSite.url}
                </code>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowUrlEditor(true)}
            className="self-start md:self-center flex items-center gap-1 text-xs text-sky-400 hover:text-sky-300 font-semibold"
          >
            <Edit3 className="h-3.5 w-3.5" />
            <span>Paste / Change Link</span>
          </button>
        </div>

        {/* Expandable Inline URL & Name Form */}
        {showUrlEditor && (
          <form onSubmit={handleAnalyzeInline} className="mt-4 pt-3 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
              <div className="md:col-span-7">
                <label className="text-[11px] font-medium text-slate-300 block mb-1">
                  Paste Website Link or Journey URL:
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={inlineUrl}
                    onChange={(e) => setInlineUrl(e.target.value)}
                    placeholder="e.g. https://mybrandstore.com/checkout or saas.io/onboarding"
                    required
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 pl-3 pr-20 py-2 text-xs text-slate-200 placeholder-slate-500 focus:border-sky-500 focus:outline-none font-mono"
                  />
                  <button
                    type="button"
                    onClick={handlePasteInline}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-1 rounded-lg bg-slate-800 px-2 py-1 text-[10px] font-medium text-slate-300 hover:bg-slate-700 transition-colors"
                  >
                    <ClipboardPaste className="h-3 w-3 text-sky-400" />
                    <span>Paste</span>
                  </button>
                </div>
              </div>

              <div className="md:col-span-3">
                <label className="text-[11px] font-medium text-slate-300 block mb-1">
                  Website / Brand Name:
                </label>
                <input
                  type="text"
                  value={inlineName}
                  onChange={(e) => setInlineName(e.target.value)}
                  placeholder="e.g. Brand Store"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div className="md:col-span-2 flex items-end">
                <button
                  type="submit"
                  disabled={isScanningUrl}
                  className="w-full py-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-xs font-bold text-white shadow transition-all active:scale-[0.98]"
                >
                  {isScanningUrl ? 'Scanning...' : 'Analyze Site'}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>

      {/* Main AI Diagnostic Card */}
      <div className="rounded-2xl border border-indigo-500/40 bg-gradient-to-br from-indigo-950/30 via-slate-900/80 to-slate-900/70 p-5 sm:p-6 backdrop-blur-xl shadow-xl">
        {isRegenerating || isScanningUrl ? (
          <div className="py-10 flex flex-col items-center justify-center space-y-3 text-center">
            <BrainCircuit className="h-10 w-10 text-indigo-400 animate-pulse" />
            <span className="text-sm font-semibold text-slate-200">
              Synthesizing behavioral traces for {customSite.name} ({customSite.url})...
            </span>
            <div className="h-1.5 w-48 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 animate-[pulse_1s_ease-in-out_infinite]" />
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Top row: Cause, Impact, Confidence */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/80">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 block mb-1">
                  LIKELY CAUSE
                </span>
                <p className="text-xs sm:text-sm font-bold text-white">{aiInsights.likelyCause}</p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/80">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
                  BUSINESS IMPACT
                </span>
                <p className="text-xs sm:text-sm font-bold text-white">{aiInsights.impact}</p>
              </div>

              <div className="p-3.5 rounded-xl border border-indigo-500/30 bg-indigo-950/40">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300">
                    MODEL CONFIDENCE
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold text-indigo-300">
                    {aiInsights.confidence}%
                  </span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden mt-1.5">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-sky-400 rounded-full"
                    style={{ width: `${aiInsights.confidence}%` }}
                  />
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Based on 3,241 recorded user sessions
                </span>
              </div>
            </div>

            {/* AI Narrative Diagnosis Statement */}
            <div className="p-4 sm:p-5 rounded-xl border border-slate-800/80 bg-slate-950/60">
              <div className="flex items-center gap-2 mb-2">
                <BrainCircuit className="h-4 w-4 text-indigo-400" />
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Diagnostic Synthesis for {customSite.name}
                </span>
              </div>
              <blockquote className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                “{aiInsights.summary}”
              </blockquote>
            </div>

            {/* Cognitive Friction Breakdown Factors */}
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                Cognitive Friction Dimensions
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {aiInsights.cognitiveFrictionBreakdown.map((item) => (
                  <div key={item.factor} className="p-3 rounded-xl border border-slate-800 bg-slate-850/50">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-white truncate mr-2">{item.factor}</span>
                      <span
                        className={`text-xs font-bold font-mono shrink-0 ${
                          item.score >= 80
                            ? 'text-rose-400'
                            : item.score >= 60
                            ? 'text-amber-400'
                            : 'text-sky-400'
                        }`}
                      >
                        {item.score}/100
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden mb-1.5">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${item.score}%`,
                          backgroundColor:
                            item.score >= 80 ? '#f43f5e' : item.score >= 60 ? '#f59e0b' : '#38bdf8',
                        }}
                      />
                    </div>
                    <p className="text-[10px] text-slate-400 leading-snug">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Recommended Fixes Section */}
      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/70 p-5 sm:p-6 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white">Actionable Recommended Fixes</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Prioritized interventions estimated to reduce friction by up to 51% for {customSite.name}.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {isFixApplied ? (
              <button
                onClick={resetFixes}
                className="text-xs text-slate-400 hover:text-slate-200 underline font-medium"
              >
                Reset Simulation
              </button>
            ) : null}
            <button
              onClick={() => setCurrentView('before-after')}
              className="text-xs text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1"
            >
              <span>View Before vs After</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Fix Cards List */}
        <div className="space-y-3">
          {recommendedFixes.map((fix, idx) => {
            const isApplied = isFixApplied || appliedFixesList.includes(fix.id);

            return (
              <div
                key={fix.id}
                className={`p-4 rounded-xl border transition-all ${
                  isApplied
                    ? 'border-emerald-500/50 bg-emerald-950/15 shadow-md'
                    : 'border-slate-800 bg-slate-850/40 hover:border-slate-700 hover:bg-slate-850/70'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                  {/* Left: Details */}
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="font-mono text-xs font-bold text-slate-500">#{idx + 1}</span>
                      <span
                        className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded border ${fix.priorityColor}`}
                      >
                        {fix.priority}
                      </span>
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded border ${fix.impactBadge}`}
                      >
                        Expected Impact: {fix.expectedImpact}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        Effort: <strong className="text-slate-300">{fix.effort}</strong>
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white">{fix.title}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      <strong className="text-slate-400 font-semibold">Reason: </strong>
                      {fix.reason}
                    </p>
                    <p className="text-[10px] text-sky-300 font-mono bg-slate-950/60 p-2 rounded-lg border border-slate-800/80 truncate">
                      💡 Implementation: {fix.actionSnippet}
                    </p>
                  </div>

                  {/* Right: Simulated Impact & Action button */}
                  <div className="flex sm:flex-col items-end justify-between sm:justify-center gap-2 shrink-0 border-t sm:border-t-0 sm:border-l border-slate-800 pt-2 sm:pt-0 sm:pl-4">
                    <div className="text-left sm:text-right text-xs">
                      <span className="text-slate-400 block text-[10px]">Estimated Uplift</span>
                      <span className="font-bold text-emerald-400 text-xs">
                        {fix.expectedDropOffReduction} Drop-off ({fix.expectedFrictionDrop})
                      </span>
                    </div>

                    <button
                      onClick={() => applyFix(fix.id)}
                      disabled={isApplied}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        isApplied
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-default'
                          : 'bg-sky-500 hover:bg-sky-400 text-white shadow-md active:scale-[0.98]'
                      }`}
                    >
                      {isApplied ? (
                        <>
                          <Check className="h-3.5 w-3.5" />
                          <span>Applied to Test</span>
                        </>
                      ) : (
                        <>
                          <Zap className="h-3.5 w-3.5" />
                          <span>Apply Fix to Test</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

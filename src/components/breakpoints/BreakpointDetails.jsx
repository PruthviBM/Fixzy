import React, { useState, useEffect, useRef } from 'react';
import {
  AlertTriangle,
  Play,
  Pause,
  RotateCcw,
  Clock,
  Users,
  Zap,
  Flame,
  Smartphone,
  Monitor,
  Tablet,
  ArrowRight,
  Sparkles,
  ChevronRight,
  AlertOctagon,
  MousePointer,
  CornerDownRight,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { REPLAY_TIMELINE } from '../../data/mockData';
import { getSeverityInfo } from '../../services/frictionEngine';

export default function BreakpointDetails() {
  const {
    breakpointDetails,
    setCurrentView,
    isFixApplied,
    applyFix,
    selectedStep,
  } = useApp();

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const timerRef = useRef(null);

  const displayScore = isFixApplied ? 43 : 87;
  const severity = getSeverityInfo(displayScore);

  // Auto-advance timeline during replay
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev < REPLAY_TIMELINE.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, 2400 / playbackSpeed);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isPlaying, playbackSpeed]);

  const activeStep = REPLAY_TIMELINE[currentStepIndex];

  const handleTogglePlay = () => {
    if (currentStepIndex >= REPLAY_TIMELINE.length - 1) {
      setCurrentStepIndex(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleResetReplay = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentView('breakpoints')}
              className="text-xs text-sky-400 hover:text-sky-300 font-semibold"
            >
              ← Breakpoints
            </button>
            <span className="text-slate-600">/</span>
            <span className="text-xs text-slate-400">Deep Dive Analysis</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white mt-1">
            Breakpoint: Checkout → Payment Details
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Path: <code className="font-mono text-sky-400">{breakpointDetails.pageUrl}</code> • High
            Abandonment Chokepoint
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentView('insights')}
            className="flex items-center gap-1.5 rounded-xl border border-sky-500/40 bg-sky-500/10 px-4 py-2 text-xs font-bold text-sky-300 hover:bg-sky-500/20 transition-all"
          >
            <Sparkles className="h-4 w-4 text-sky-400" />
            <span>Generate AI Insights</span>
          </button>
        </div>
      </div>

      {/* 4 Core Hero Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-rose-500/40 bg-slate-900/80 p-5 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Friction Score</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${severity.badgeBg}`}>
              {severity.tier}
            </span>
          </div>
          <div className={`text-3xl font-extrabold mt-2 ${severity.color}`}>
            {displayScore} <span className="text-sm font-normal text-slate-500">/ 100</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            {isFixApplied ? 'Reduced by 51% post-fix' : 'Top 1% worst across all pages'}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Users Affected</span>
            <Users className="h-4 w-4 text-sky-400" />
          </div>
          <div className="text-3xl font-extrabold text-white mt-2">
            {breakpointDetails.usersAffected.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">31% funnel abandonment rate</div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Average Hesitation</span>
            <Clock className="h-4 w-4 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-amber-400 mt-2">
            {breakpointDetails.avgHesitation}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Benchmark: &lt; 2.5 seconds</div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Drop-off Probability</span>
            <AlertTriangle className="h-4 w-4 text-rose-400" />
          </div>
          <div className="text-3xl font-extrabold text-rose-400 mt-2">
            {breakpointDetails.dropOffProbability}
          </div>
          <div className="text-[11px] text-rose-300/80 mt-1">High confidence prediction</div>
        </div>
      </div>

      {/* Interactive Session Replayer & Animated Timeline */}
      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/70 p-6 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-500 animate-pulse" />
              <h3 className="text-lg font-bold text-white">Interaction Replay & Behavioral Timeline</h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Reconstruct the exact sequence of user actions leading to frustration and drop-off.
            </p>
          </div>

          {/* Player controls */}
          <div className="flex items-center gap-2 bg-slate-950/80 border border-slate-800 p-1.5 rounded-xl">
            <button
              onClick={handleTogglePlay}
              className="flex items-center gap-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 px-3.5 py-1.5 text-xs font-bold text-white transition-all shadow"
            >
              {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 fill-current" />}
              <span>{isPlaying ? 'Pause' : 'Replay Journey'}</span>
            </button>

            <button
              onClick={handleResetReplay}
              className="rounded-lg p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
              title="Reset Replay"
            >
              <RotateCcw className="h-4 w-4" />
            </button>

            <div className="h-4 w-px bg-slate-800 mx-1" />

            <div className="flex items-center gap-1 text-xs">
              {[1, 2, 4].map((spd) => (
                <button
                  key={spd}
                  onClick={() => setPlaybackSpeed(spd)}
                  className={`px-2 py-1 rounded-md text-[11px] font-semibold ${
                    playbackSpeed === spd
                      ? 'bg-slate-800 text-sky-400'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 2 Column Replay Layout: Timeline steps (Left) + Visual Simulated Viewport (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Interactive Timeline steps list (5 cols) */}
          <div className="lg:col-span-5 space-y-2.5 max-h-[480px] overflow-y-auto pr-2">
            {REPLAY_TIMELINE.map((item, idx) => {
              const isActive = currentStepIndex === idx;
              return (
                <div
                  key={item.step}
                  onClick={() => {
                    setIsPlaying(false);
                    setCurrentStepIndex(idx);
                  }}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    isActive
                      ? 'border-sky-500 bg-sky-950/30 shadow-md ring-1 ring-sky-500/40'
                      : 'border-slate-800/80 bg-slate-800/40 hover:bg-slate-800/70 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[10px] text-slate-400">
                      [{item.time}] Step {item.step}/8
                    </span>
                    <span
                      className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        item.status === 'rage'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                          : item.status === 'error'
                          ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                          : item.status === 'hesitation'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : item.status === 'backtrack'
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                          : item.status === 'exit'
                          ? 'bg-rose-500 text-white font-extrabold'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {item.action}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-slate-200 mt-1">{item.action}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{item.detail}</p>
                </div>
              );
            })}
          </div>

          {/* Right: Simulated Interactive Browser Viewport (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-950 p-4 relative overflow-hidden min-h-[440px]">
            {/* Browser top chrome */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <div className="rounded-lg bg-slate-900 px-3 py-1 text-[11px] font-mono text-slate-300 border border-slate-800 max-w-xs truncate">
                https://shop.acmeglobal.com/checkout/payment
              </div>
              <div className="text-[10px] text-sky-400 font-mono">
                {activeStep.time}
              </div>
            </div>

            {/* Simulated Checkout Form Body with Cursor & Visual Feedback */}
            <div className="relative my-4 flex-1 rounded-lg bg-slate-900/90 border border-slate-800 p-5 space-y-4">
              {/* Active step banner */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-sky-400 animate-ping" />
                  Live Replay: {activeStep.action}
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  Target: {activeStep.selector}
                </span>
              </div>

              {/* Simulated Form Fields */}
              <div className="space-y-3 opacity-90">
                <div>
                  <label className="text-[11px] font-medium text-slate-400 block mb-1">
                    Cardholder Name
                  </label>
                  <div className="rounded-lg bg-slate-950 border border-slate-800 px-3 py-1.5 text-xs text-slate-300">
                    Alex Morgan
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-medium text-slate-400 block mb-1">
                      Card Number
                    </label>
                    <div className="rounded-lg bg-slate-950 border border-slate-800 px-3 py-1.5 text-xs font-mono text-slate-300">
                      •••• •••• •••• 4242
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-medium text-slate-400 block mb-1">
                      Postal / Zip Code
                    </label>
                    <div
                      className={`rounded-lg px-3 py-1.5 text-xs font-mono transition-all ${
                        activeStep.status === 'error' || activeStep.status === 're-edit'
                          ? 'bg-rose-950/60 border-2 border-rose-500 text-rose-300 shadow-md ring-2 ring-rose-500/30'
                          : 'bg-slate-950 border border-slate-800 text-slate-300'
                      }`}
                    >
                      {activeStep.status === 'error' || activeStep.status === 're-edit'
                        ? '94103-INVALID'
                        : '94103'}
                    </div>
                  </div>
                </div>

                {/* Simulated Validation Error Banner (Shows when step 4/5) */}
                {(activeStep.status === 'error' || activeStep.status === 're-edit') && (
                  <div className="rounded-lg bg-rose-500/20 border border-rose-500/60 p-2.5 text-xs text-rose-300 flex items-center gap-2 animate-bounce">
                    <AlertOctagon className="h-4 w-4 shrink-0 text-rose-400" />
                    <span>Error: Postal code does not match billing region.</span>
                  </div>
                )}

                {/* Place Order Button */}
                <div className="pt-2">
                  <div
                    className={`w-full py-2.5 rounded-xl text-center text-xs font-bold transition-all relative ${
                      activeStep.status === 'rage'
                        ? 'bg-rose-600 text-white ring-4 ring-rose-500/50 scale-[1.02]'
                        : 'bg-sky-500 text-white'
                    }`}
                  >
                    <span>Complete Purchase ($199.00)</span>
                    {activeStep.status === 'rage' && (
                      <span className="absolute -top-3 right-4 rounded-full bg-rose-500 text-white text-[9px] px-2 py-0.5 font-extrabold shadow animate-ping">
                        4x RAGE CLICKS!
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Dynamic Animated Cursor */}
              <div
                className="absolute pointer-events-none transition-all duration-500 z-30 flex items-center gap-1"
                style={{
                  left: `${activeStep.cursor.x}%`,
                  top: `${activeStep.cursor.y}%`,
                }}
              >
                <MousePointer className="h-5 w-5 text-sky-400 fill-sky-400 drop-shadow-[0_2px_8px_rgba(56,189,248,0.8)]" />
                <span className="rounded bg-sky-950/90 border border-sky-500/40 text-[9px] text-sky-300 px-1.5 py-0.5 font-mono shadow">
                  User
                </span>
              </div>
            </div>

            {/* Bottom Stepper progress scrub */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Step {currentStepIndex + 1} of 8: {activeStep.action}</span>
              <div className="flex gap-1">
                {REPLAY_TIMELINE.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setIsPlaying(false);
                      setCurrentStepIndex(i);
                    }}
                    className={`h-1.5 rounded-full transition-all ${
                      i === currentStepIndex
                        ? 'w-6 bg-sky-400'
                        : i < currentStepIndex
                        ? 'w-2 bg-emerald-500'
                        : 'w-2 bg-slate-800'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

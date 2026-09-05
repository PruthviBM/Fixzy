import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  Flame,
  ArrowRight,
  Activity,
  Terminal,
  Zap,
  Radio,
  Eye,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { LIVE_DEMO_SCENARIO } from '../../data/mockData';

export default function LiveDemo() {
  const { setCurrentView, addToast } = useApp();

  const [currentEventIndex, setCurrentEventIndex] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);
  const [simulationComplete, setSimulationComplete] = useState(false);
  const intervalRef = useRef(null);
  const terminalEndRef = useRef(null);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentEventIndex]);

  // Simulation timer
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setCurrentEventIndex((prev) => {
          if (prev < LIVE_DEMO_SCENARIO.length - 1) {
            return prev + 1;
          } else {
            setIsRunning(false);
            setSimulationComplete(true);
            addToast('Breakpoint Detected', 'Checkout flagged with 91/100 friction score.', 'error');
            return prev;
          }
        });
      }, 1600);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const handleStartSimulation = () => {
    setCurrentEventIndex(0);
    setIsRunning(true);
    setSimulationComplete(false);
    addToast('Simulation Started', 'Simulating live user session progression...', 'info');
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentEventIndex(-1);
    setSimulationComplete(false);
  };

  const visibleEvents =
    currentEventIndex >= 0 ? LIVE_DEMO_SCENARIO.slice(0, currentEventIndex + 1) : [];

  const currentStep =
    currentEventIndex >= 0 ? LIVE_DEMO_SCENARIO[currentEventIndex] : null;

  const liveFriction = currentStep ? currentStep.cumulativeFriction : 0;
  const eventCount = visibleEvents.length;
  const breakpointProb = currentStep
    ? currentStep.cumulativeFriction >= 80
      ? '96%'
      : currentStep.cumulativeFriction >= 50
      ? '68%'
      : '12%'
    : '0%';
  const dropOffProb = currentStep ? currentStep.dropOffRisk : '0%';

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-white">Live Session Simulation</h1>
            <span className="flex items-center gap-1.5 rounded-full bg-rose-500/20 px-2.5 py-0.5 text-xs font-bold text-rose-300 border border-rose-500/40">
              <Radio className="h-3 w-3 text-rose-400 animate-pulse" />
              <span>Hackathon Presentation Mode</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Simulate a user session in real-time. Watch Fixzy capture behavioral friction signals as they unfold.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {!isRunning && !simulationComplete && (
            <button
              onClick={handleStartSimulation}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-sky-500/20 hover:from-sky-400 hover:to-indigo-500 transition-all active:scale-[0.98]"
            >
              <Play className="h-4 w-4 fill-current" />
              <span>Start Simulation</span>
            </button>
          )}

          {(isRunning || simulationComplete) && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700 transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset Demo</span>
            </button>
          )}
        </div>
      </div>

      {/* 4 Real-Time Telemetry Gauges */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 backdrop-blur-xl">
          <span className="text-xs font-semibold text-slate-400 block">Captured Events</span>
          <div className="text-3xl font-extrabold text-white mt-1">
            {eventCount}{' '}
            <span className="text-xs font-normal text-slate-500">/ {LIVE_DEMO_SCENARIO.length}</span>
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">Live telemetry buffer</span>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 backdrop-blur-xl">
          <span className="text-xs font-semibold text-slate-400 block">Live Friction Score</span>
          <div
            className={`text-3xl font-black mt-1 transition-colors duration-300 ${
              liveFriction >= 80
                ? 'text-rose-400'
                : liveFriction >= 40
                ? 'text-amber-400'
                : 'text-emerald-400'
            }`}
          >
            {liveFriction}{' '}
            <span className="text-xs font-normal text-slate-500">/ 100</span>
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">Real-time normalized</span>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 backdrop-blur-xl">
          <span className="text-xs font-semibold text-slate-400 block">Breakpoint Probability</span>
          <div className="text-3xl font-extrabold text-amber-400 mt-1">{breakpointProb}</div>
          <span className="text-[10px] text-slate-400 mt-1 block">Failure likelihood</span>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 backdrop-blur-xl">
          <span className="text-xs font-semibold text-slate-400 block">Drop-off Probability</span>
          <div className="text-3xl font-extrabold text-rose-400 mt-1">{dropOffProb}</div>
          <span className="text-[10px] text-slate-400 mt-1 block">Abandonment risk</span>
        </div>
      </div>

      {/* Real-Time User Journey Funnel Tracker */}
      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 backdrop-blur-xl">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
          Simulated User Funnel Position
        </span>
        <div className="flex flex-wrap items-center justify-between gap-2">
          {['Landing', 'Product', 'Cart', 'Checkout', 'Abandonment'].map((step, idx) => {
            const isReached =
              currentStep &&
              ((step === 'Landing' && currentEventIndex >= 0) ||
                (step === 'Product' && currentEventIndex >= 2) ||
                (step === 'Cart' && currentEventIndex >= 3) ||
                (step === 'Checkout' && currentEventIndex >= 4) ||
                (step === 'Abandonment' && currentEventIndex >= 8));

            const isCurrent =
              currentStep &&
              ((step === 'Landing' && currentEventIndex < 2) ||
                (step === 'Product' && currentEventIndex === 2) ||
                (step === 'Cart' && currentEventIndex === 3) ||
                (step === 'Checkout' && currentEventIndex >= 4 && currentEventIndex < 8) ||
                (step === 'Abandonment' && currentEventIndex >= 8));

            return (
              <div
                key={step}
                className={`flex-1 min-w-[120px] p-3 rounded-xl border text-center transition-all ${
                  isCurrent
                    ? step === 'Abandonment'
                      ? 'border-rose-500 bg-rose-500/20 text-white font-bold ring-2 ring-rose-500/40 glow-rose'
                      : 'border-sky-500 bg-sky-500/20 text-white font-bold ring-2 ring-sky-500/30'
                    : isReached
                    ? 'border-slate-700 bg-slate-800 text-slate-300'
                    : 'border-slate-800/60 bg-slate-900/40 text-slate-600'
                }`}
              >
                <div className="text-[10px] font-mono text-slate-400">Step 0{idx + 1}</div>
                <div className="text-xs font-semibold mt-0.5">{step}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Terminal Output Log */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 shadow-2xl font-mono text-xs overflow-hidden">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-slate-400">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-sky-400" />
            <span className="font-semibold text-slate-200">Fixzy Behavioral Telemetry Stream</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px]">
            <span
              className={`h-2 w-2 rounded-full ${
                isRunning ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'
              }`}
            />
            <span>{isRunning ? 'STREAMING ACTIVE' : simulationComplete ? 'SESSION TERMINATED' : 'READY'}</span>
          </div>
        </div>

        <div className="py-4 space-y-2.5 min-h-[260px] max-h-[340px] overflow-y-auto pr-2">
          {visibleEvents.length === 0 && (
            <div className="text-slate-600 italic py-10 text-center">
              Click “Start Simulation” above to stream real-time user events.
            </div>
          )}

          {visibleEvents.map((evt) => (
            <div
              key={evt.id}
              className={`flex items-start gap-3 p-2.5 rounded-lg transition-all animate-slide-up ${
                evt.type === 'critical'
                  ? 'bg-rose-950/40 border border-rose-500/40 text-rose-200'
                  : evt.type === 'warning'
                  ? 'bg-amber-950/30 border border-amber-500/30 text-amber-200'
                  : 'bg-slate-900/60 border border-slate-800/80 text-slate-300'
              }`}
            >
              <span className="text-[10px] font-mono text-slate-500 shrink-0 mt-0.5">
                [{evt.time}]
              </span>

              {evt.type === 'critical' && (
                <AlertOctagon className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
              )}
              {evt.type === 'warning' && (
                <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
              )}
              {evt.type === 'info' && (
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              )}

              <div className="flex-1">
                <span className="font-bold mr-2">[{evt.badge}]</span>
                <span>{evt.message}</span>
              </div>

              <span className="text-[10px] text-slate-400 font-mono shrink-0">
                Friction: {evt.cumulativeFriction}
              </span>
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>
      </div>

      {/* Completion Banner with "View Root Cause" CTA */}
      {simulationComplete && (
        <div className="rounded-2xl border border-rose-500/60 bg-gradient-to-r from-rose-950/50 via-slate-900/90 to-slate-900/70 p-6 backdrop-blur-xl shadow-2xl animate-fade-in glow-rose">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse">
                <Flame className="h-6 w-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                  BREAKPOINT DETECTED
                </span>
                <h3 className="text-xl font-bold text-white">
                  Checkout (Friction Score: 91 / 100)
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Fixzy detected a critical UX breakpoint where 31% of users abandon the digital journey.
                </p>
              </div>
            </div>

            <button
              onClick={() => setCurrentView('root-cause')}
              className="flex items-center gap-2 rounded-xl bg-rose-500 hover:bg-rose-400 px-5 py-2.5 text-xs font-bold text-white shadow-lg transition-all active:scale-[0.98]"
            >
              <span>View Root Cause</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

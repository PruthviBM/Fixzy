import React from 'react';
import {
  Sparkles,
  ChevronRight,
  ChevronLeft,
  X,
  Play,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const TOUR_STEPS = [
  {
    step: 1,
    view: 'overview',
    title: '1. Fixzy Dashboard Overview',
    subtitle: 'Welcome to the UX Intelligence Command Center',
    instruction:
      'Start your pitch here. Point out the high-level health of digital funnels, active sessions, and multi-journey monitoring.',
    speechPill: '“Fixzy turns hidden user frustration into measurable intelligence.”',
  },
  {
    step: 2,
    view: 'overview',
    title: '2. The Friction Score KPI (67/100)',
    subtitle: 'A single, unified metric for user struggle',
    instruction:
      'Highlight the 67/100 Overall Friction Score. Explain how it combines rage clicks, hesitations, errors, and drop-offs.',
    speechPill: '“Traditional analytics tell you WHAT users did. Fixzy scores WHERE the experience hurts.”',
  },
  {
    step: 3,
    view: 'journeys',
    title: '3. User Journey Funnel Analysis',
    subtitle: 'Visualize each step of the digital experience',
    instruction:
      'We automatically transitioned to User Journeys. Walk across Landing → Product → Cart → Checkout → Payment.',
    speechPill: '“Notice the progressive friction buildup across the funnel.”',
  },
  {
    step: 4,
    view: 'journeys',
    title: '4. Critical Breakpoint Identification',
    subtitle: 'Checkout is flagged as Critical (87/100)',
    instruction:
      'Point to the Checkout step in red. 31% drop-off rate and 3,241 affected sessions at this single bottleneck.',
    speechPill: '“Here is where the journey breaks: Checkout has an 87 Friction Score with 31% abandonment.”',
  },
  {
    step: 5,
    view: 'breakpoints',
    title: '5. Breakpoint Engine',
    subtitle: 'Algorithmic multi-signal behavioral analysis',
    instruction:
      'We navigated to Breakpoints. Showcase the mathematical scoring formula and adjustable signal weights.',
    speechPill: '“Fixzy synthesizes 8 distinct behavioral signals into a normalized friction index.”',
  },
  {
    step: 6,
    view: 'details',
    title: '6. Behavioral Signals & Replay',
    subtitle: 'Watch the user struggle in real time',
    instruction:
      'Click “Replay Journey” to watch the animated session timeline showing cursor pauses, rage clicks, and validation errors.',
    speechPill: '“We can replay the exact sequence: idle hesitation, rage clicks on submit, and form rejection.”',
  },
  {
    step: 7,
    view: 'insights',
    title: '7. AI Root Cause Diagnostics',
    subtitle: '92% Confidence generative explanation',
    instruction:
      'Explain that Fixzy does not stop at detection; it explains WHY the breakpoint occurred with cognitive friction breakdown.',
    speechPill: '“Fixzy diagnoses: Complex payment form & late validation feedback creates cognitive friction.”',
  },
  {
    step: 8,
    view: 'insights',
    title: '8. Actionable Recommended Fixes',
    subtitle: 'Ranked by priority, impact, and effort',
    instruction:
      'Scroll down to the Recommended Fixes section. Show “Add real-time inline validation” and “Reduce unnecessary form fields”.',
    speechPill: '“Fixzy prescribes exact engineering and design interventions with estimated ROI.”',
  },
  {
    step: 9,
    view: 'insights',
    title: '9. Apply Simulated Fix to Test',
    subtitle: 'Simulate the impact of your fix in one click',
    instruction:
      'Click the “Apply Fix to Test” button below or on any recommendation card to instantly recalculate all metrics.',
    speechPill: '“Let’s deploy the recommended fix to our simulation sandbox.”',
    actionButton: true,
  },
  {
    step: 10,
    view: 'before-after',
    title: '10. Before vs After Impact Verification',
    subtitle: 'Proving the fix actually worked',
    instruction:
      'Show the side-by-side comparison: Friction dropped from 87 → 43 (-51%), Drop-off dropped from 31% → 14% (-55%).',
    speechPill: '“Friction drops by 51%, drop-off cuts in half, and we save 1,781 customer sessions every month.”',
  },
  {
    step: 11,
    view: 'philosophy',
    title: '11. Hackathon Pitch Finale',
    subtitle: 'The Core Fixzy Philosophy & Value Proposition',
    instruction:
      'Conclude with the closing statement: Observe → Detect → Locate Breakpoint → Explain Why → Recommend Fix → Measure Impact.',
    speechPill:
      '“Fixzy doesn’t just show you that users are leaving. It shows you where they struggle, why they leave, what to fix, and whether the fix worked!”',
  },
];

export default function HackathonTour() {
  const { tourStep, setTourStep, setCurrentView, isFixApplied, applyFix } = useApp();

  if (tourStep === 0) return null;

  const current = TOUR_STEPS[tourStep - 1] || TOUR_STEPS[0];

  const handleNext = () => {
    if (tourStep < TOUR_STEPS.length) {
      const nextStep = tourStep + 1;
      setTourStep(nextStep);
      setCurrentView(TOUR_STEPS[nextStep - 1].view);
    } else {
      setTourStep(0);
    }
  };

  const handlePrev = () => {
    if (tourStep > 1) {
      const prevStep = tourStep - 1;
      setTourStep(prevStep);
      setCurrentView(TOUR_STEPS[prevStep - 1].view);
    }
  };

  const handleClose = () => {
    setTourStep(0);
  };

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-3xl animate-slide-up">
      <div className="rounded-2xl border border-sky-500/40 bg-slate-900/95 p-5 shadow-2xl backdrop-blur-xl glow-blue">
        {/* Header bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-500/20 text-sky-400 border border-sky-500/30">
              <Sparkles className="h-4 w-4" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">
                  Hackathon Presentation Mode
                </span>
                <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-medium text-slate-300">
                  Step {tourStep} of {TOUR_STEPS.length}
                </span>
              </div>
              <h3 className="text-base font-bold text-white">{current.title}</h3>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors"
            title="Exit Demo Tour"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content body */}
        <div className="space-y-3">
          <p className="text-sm text-slate-300 leading-relaxed">{current.instruction}</p>

          {/* Presenter Talking Point Pill */}
          <div className="flex items-start gap-2 rounded-xl bg-sky-950/40 border border-sky-800/40 p-3 text-xs text-sky-200">
            <Lightbulb className="h-4 w-4 shrink-0 text-sky-400 mt-0.5" />
            <div>
              <span className="font-semibold text-sky-300 block mb-0.5">Pitch Line:</span>
              <p className="italic text-sky-100">{current.speechPill}</p>
            </div>
          </div>

          {/* Step Action Button if step 9 */}
          {current.actionButton && !isFixApplied && (
            <div className="pt-1">
              <button
                onClick={() => applyFix('fix-1')}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg hover:from-emerald-500 hover:to-teal-500 transition-all active:scale-[0.99]"
              >
                <CheckCircle2 className="h-4 w-4" />
                Click Here: Apply Fix to Test (Recalculate Metrics)
              </button>
            </div>
          )}
          {current.actionButton && isFixApplied && (
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 p-2.5 rounded-lg">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>Fix Applied! Checkout friction dropped from 87 to 43. Proceed to Next Step!</span>
            </div>
          )}
        </div>

        {/* Navigation buttons & progress dots */}
        <div className="mt-4 flex items-center justify-between border-t border-slate-800 pt-3">
          <div className="flex items-center gap-1.5">
            {TOUR_STEPS.map((s) => (
              <button
                key={s.step}
                onClick={() => {
                  setTourStep(s.step);
                  setCurrentView(s.view);
                }}
                className={`h-2 rounded-full transition-all ${
                  s.step === tourStep
                    ? 'w-6 bg-sky-400'
                    : s.step < tourStep
                    ? 'w-2 bg-emerald-500'
                    : 'w-2 bg-slate-700 hover:bg-slate-600'
                }`}
                title={`Jump to step ${s.step}: ${s.title}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={tourStep <= 1}
              className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              Back
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-1 rounded-lg bg-sky-500 px-3.5 py-1.5 text-xs font-semibold text-white shadow hover:bg-sky-400 transition-all active:scale-[0.98]"
            >
              {tourStep === TOUR_STEPS.length ? 'Finish Tour' : 'Next Step'}
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

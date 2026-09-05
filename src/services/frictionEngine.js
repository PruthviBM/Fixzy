/**
 * Fixzy Breakpoint & Friction Scoring Engine
 *
 * Implements normalized behavioral friction scoring:
 * Friction Score = ∑ (signal_value * signal_weight) normalized to [0, 100]
 */

export const DEFAULT_WEIGHTS = {
  rageClicks: 1.8,
  repeatedClicks: 1.2,
  hesitation: 1.4,
  formErrors: 2.2,
  backtracking: 1.5,
  abandonment: 2.0,
  deadClicks: 0.9,
  repeatedFieldEdits: 1.6,
};

export const SIGNAL_METADATA = {
  rageClicks: {
    label: 'Rage Clicks',
    desc: '≥3 rapid clicks on the same element within 500ms',
    unit: 'clicks',
    icon: 'Flame',
    color: '#f43f5e',
  },
  repeatedClicks: {
    label: 'Repeated Clicks',
    desc: 'Frustrated attempts to trigger an un-responsive action',
    unit: 'clicks',
    icon: 'MousePointerClick',
    color: '#f97316',
  },
  hesitation: {
    label: 'Long Hesitation',
    desc: 'Unusual dwell time without user input or progression',
    unit: 'sec dwell',
    icon: 'Clock',
    color: '#f59e0b',
  },
  formErrors: {
    label: 'Form Errors',
    desc: 'Validation failures, submission rejections & blocked inputs',
    unit: 'errors',
    icon: 'AlertTriangle',
    color: '#ef4444',
  },
  backtracking: {
    label: 'Backtracking',
    desc: 'Reverse navigation to prior steps due to confusion or uncertainty',
    unit: 'reversals',
    icon: 'Undo2',
    color: '#a855f7',
  },
  abandonment: {
    label: 'Sudden Abandonment',
    desc: 'Unexpected session drop-off mid-interaction or tab close',
    unit: 'exits',
    icon: 'LogOut',
    color: '#ec4899',
  },
  deadClicks: {
    label: 'Dead Clicks',
    desc: 'Clicks on non-interactive elements mistakenly thought to be active',
    unit: 'dead clicks',
    icon: 'Ban',
    color: '#64748b',
  },
  repeatedFieldEdits: {
    label: 'Repeated Field Edits',
    desc: 'Clearing and retyping the same field 3 or more times',
    unit: 're-edits',
    icon: 'Edit3',
    color: '#3b82f6',
  },
};

/**
 * Calculates normalized friction score (0 to 100) from raw signals and weights
 */
export function calculateFrictionScore(signals, weights = DEFAULT_WEIGHTS) {
  if (!signals) return 0;

  // Raw weighted sum
  const weightedSum =
    (signals.rageClicks || 0) * (weights.rageClicks || DEFAULT_WEIGHTS.rageClicks) * 0.45 +
    (signals.repeatedClicks || 0) * (weights.repeatedClicks || DEFAULT_WEIGHTS.repeatedClicks) * 0.35 +
    (signals.hesitation || 0) * (weights.hesitation || DEFAULT_WEIGHTS.hesitation) * 1.8 +
    (signals.formErrors || 0) * (weights.formErrors || DEFAULT_WEIGHTS.formErrors) * 0.65 +
    (signals.backtracking || 0) * (weights.backtracking || DEFAULT_WEIGHTS.backtracking) * 0.5 +
    (signals.abandonment || 0) * (weights.abandonment || DEFAULT_WEIGHTS.abandonment) * 0.8 +
    (signals.deadClicks || 0) * (weights.deadClicks || DEFAULT_WEIGHTS.deadClicks) * 0.25 +
    (signals.repeatedFieldEdits || 0) * (weights.repeatedFieldEdits || DEFAULT_WEIGHTS.repeatedFieldEdits) * 0.5;

  // Dynamic baseline normalization
  const normalized = Math.min(100, Math.max(0, Math.round(weightedSum)));
  return normalized;
}

/**
 * Returns severity tier and color configuration
 */
export function getSeverityInfo(score) {
  if (score >= 81) {
    return {
      tier: 'Critical',
      label: 'Critical Breakpoint',
      color: 'text-rose-400',
      bgColor: 'bg-rose-500/10',
      borderColor: 'border-rose-500/30',
      badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
      dotColor: 'bg-rose-500',
      hex: '#f43f5e',
    };
  }
  if (score >= 61) {
    return {
      tier: 'High',
      label: 'High Friction',
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/30',
      badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      dotColor: 'bg-amber-500',
      hex: '#f97316',
    };
  }
  if (score >= 31) {
    return {
      tier: 'Moderate',
      label: 'Moderate Friction',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/30',
      badgeBg: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40',
      dotColor: 'bg-yellow-500',
      hex: '#f59e0b',
    };
  }
  return {
    tier: 'Low',
    label: 'Smooth Flow',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    dotColor: 'bg-emerald-500',
    hex: '#10b981',
  };
}

/**
 * Calculates percentage contribution of each signal to overall friction
 */
export function calculateSignalContributions(signals, weights = DEFAULT_WEIGHTS) {
  const contributions = [
    {
      id: 'formErrors',
      label: 'Form Validation Errors',
      value: (signals.formErrors || 0) * (weights.formErrors || 2.2),
      color: '#f43f5e',
    },
    {
      id: 'hesitation',
      label: 'Hesitation & Pauses',
      value: (signals.hesitation || 0) * (weights.hesitation || 1.4) * 3,
      color: '#f59e0b',
    },
    {
      id: 'repeatedClicks',
      label: 'Repeated / Rage Clicks',
      value: ((signals.rageClicks || 0) * 1.8 + (signals.repeatedClicks || 0) * 1.2),
      color: '#f97316',
    },
    {
      id: 'backtracking',
      label: 'Backtracking & Reversals',
      value: (signals.backtracking || 0) * (weights.backtracking || 1.5),
      color: '#a855f7',
    },
  ];

  const total = contributions.reduce((acc, c) => acc + c.value, 0) || 1;
  return contributions.map(c => ({
    ...c,
    percentage: Math.round((c.value / total) * 100),
  }));
}

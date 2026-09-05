import React, { createContext, useContext, useState, useMemo } from 'react';
import {
  PROJECTS,
  DATE_RANGES,
  KPIS_BY_RANGE,
  TREND_DATA_BY_RANGE,
  INITIAL_JOURNEY_STEPS,
  CRITICAL_BREAKPOINT_DETAILS,
  AI_INSIGHT_DATA,
  RECOMMENDED_FIXES_DATA,
  BEFORE_AFTER_DATA,
  FRICTION_EVENTS_LIST,
  LIVE_DEMO_SCENARIO,
} from '../data/mockData';
import { DEFAULT_WEIGHTS, calculateFrictionScore } from '../services/frictionEngine';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Navigation
  const [currentView, setCurrentView] = useState('overview'); // 'landing' | 'overview' | 'journeys' | 'breakpoints' | 'details' | 'events' | 'insights' | 'before-after' | 'live-demo' | 'root-cause' | 'philosophy'
  
  // Responsive Sidebar Collapse state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const toggleSidebar = () => setIsSidebarCollapsed((prev) => !prev);

  // Custom Website URL / Name Input State
  const [customSite, setCustomSite] = useState({
    url: 'https://shop.acmeglobal.com/checkout',
    name: 'Acme Store',
    path: '/checkout/payment',
    isCustom: false,
  });
  const [isUrlModalOpen, setIsUrlModalOpen] = useState(false);
  const [isScanningUrl, setIsScanningUrl] = useState(false);

  // Project & Date Range
  const [selectedProjectId, setSelectedProjectId] = useState('ecommerce');
  const [selectedRange, setSelectedRange] = useState('7d');
  
  // Breakpoint & Step Selection
  const [selectedStepId, setSelectedStepId] = useState('checkout');
  
  // Friction Engine Weights Sandbox
  const [weights, setWeights] = useState(DEFAULT_WEIGHTS);
  
  // Interactive "Apply Fix to Test" State
  const [isFixApplied, setIsFixApplied] = useState(false);
  const [appliedFixesList, setAppliedFixesList] = useState([]);

  // Toast System
  const [toasts, setToasts] = useState([]);

  // Search Filter
  const [searchQuery, setSearchQuery] = useState('');

  // Guided Hackathon Tour Stepper (0 = disabled, 1 to 11 = tour active)
  const [tourStep, setTourStep] = useState(0);

  const addToast = (title, message, type = 'info') => {
    const id = Date.now() + Math.random().toString(36).substr(2, 5);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const selectedProject = useMemo(() => {
    if (customSite.isCustom) {
      return {
        id: 'custom',
        name: customSite.name,
        domain: customSite.url.replace(/^https?:\/\//, '').split('/')[0],
        type: 'Custom Website Funnel',
        activeSessions: '24,850',
        healthStatus: 'Critical Friction',
      };
    }
    return PROJECTS.find((p) => p.id === selectedProjectId) || PROJECTS[0];
  }, [selectedProjectId, customSite]);

  // Dynamic Scan and Analyze Website Link/Name
  const analyzeCustomSite = (inputUrl, inputName) => {
    if (!inputUrl) return;
    setIsScanningUrl(true);
    let cleaned = inputUrl.trim();
    if (!/^https?:\/\//i.test(cleaned)) {
      cleaned = 'https://' + cleaned;
    }

    let domain = '';
    let pathname = '/checkout';
    try {
      const parsed = new URL(cleaned);
      domain = parsed.hostname;
      pathname = parsed.pathname && parsed.pathname !== '/' ? parsed.pathname : '/checkout';
    } catch {
      domain = cleaned.replace(/^https?:\/\//, '').split('/')[0];
    }

    const displayName =
      inputName && inputName.trim()
        ? inputName.trim()
        : domain.replace('www.', '').split('.')[0].toUpperCase() + ' Experience';

    setTimeout(() => {
      setCustomSite({
        url: cleaned,
        name: displayName,
        path: pathname,
        isCustom: true,
      });
      setIsScanningUrl(false);
      setIsUrlModalOpen(false);
      addToast(
        'Website Ingested & Analyzed',
        `Friction signals and AI root-cause model generated for ${displayName} (${cleaned}).`,
        'success'
      );
    }, 1200);
  };

  // Dynamic KPIs reflecting range and applied fix
  const kpis = useMemo(() => {
    const base = KPIS_BY_RANGE[selectedRange] || KPIS_BY_RANGE['7d'];
    if (isFixApplied) {
      return {
        ...base,
        frictionScore: 43,
        dropOffRate: '14.2%',
        criticalBreakpoints: 1,
        avgJourneyTime: '3m 05s',
      };
    }
    return base;
  }, [selectedRange, isFixApplied]);

  // Dynamic trend data
  const trendData = useMemo(() => {
    const base = TREND_DATA_BY_RANGE[selectedRange] || TREND_DATA_BY_RANGE['7d'];
    if (isFixApplied) {
      return base.map((item) => ({
        ...item,
        friction: Math.max(25, Math.round(item.friction * 0.62)),
        dropOff: Number((item.dropOff * 0.65).toFixed(1)),
        conversion: Math.min(92, Math.round(item.conversion * 1.22)),
      }));
    }
    return base;
  }, [selectedRange, isFixApplied]);

  // Dynamic Journey Steps (Checkout score drops from 87 to 43 if fix applied)
  const journeySteps = useMemo(() => {
    return INITIAL_JOURNEY_STEPS.map((step) => {
      const pageUrl = customSite.isCustom && step.id === 'checkout'
        ? customSite.path
        : step.pageUrl;

      if (step.id === 'checkout') {
        const checkoutScore = isFixApplied ? 43 : calculateFrictionScore(step.signals, weights);
        const dropOff = isFixApplied ? 14.0 : 31.0;
        return {
          ...step,
          pageUrl,
          frictionScore: checkoutScore,
          dropOffRate: dropOff,
          isCriticalBreakpoint: !isFixApplied,
        };
      }
      return {
        ...step,
        pageUrl,
        frictionScore: calculateFrictionScore(step.signals, weights),
      };
    });
  }, [isFixApplied, weights, customSite]);

  // Selected Step details
  const selectedStep = useMemo(() => {
    return journeySteps.find((s) => s.id === selectedStepId) || journeySteps[3];
  }, [journeySteps, selectedStepId]);

  // Dynamic Breakpoint Details tailored to custom site
  const breakpointDetails = useMemo(() => {
    return {
      ...CRITICAL_BREAKPOINT_DETAILS,
      pageUrl: customSite.isCustom ? customSite.path : CRITICAL_BREAKPOINT_DETAILS.pageUrl,
      title: customSite.isCustom
        ? `${customSite.name} → Critical Funnel Step (${customSite.path})`
        : CRITICAL_BREAKPOINT_DETAILS.title,
    };
  }, [customSite]);

  // Dynamic AI Insights tailored to custom site
  const aiInsights = useMemo(() => {
    if (customSite.isCustom) {
      return {
        ...AI_INSIGHT_DATA,
        likelyCause: `Complex input workflow and delayed validation feedback on ${customSite.name} (${customSite.path}).`,
        summary: `Users on ${customSite.name} (${customSite.url}) are spending significantly longer on ${customSite.path} and repeatedly correcting the same field before leaving. The combination of hesitation, repeated clicks and validation errors indicates that the page is creating severe cognitive friction.`,
      };
    }
    return AI_INSIGHT_DATA;
  }, [customSite]);

  // Apply fix handler
  const applyFix = (fixId) => {
    setIsFixApplied(true);
    if (!appliedFixesList.includes(fixId)) {
      setAppliedFixesList((prev) => [...prev, fixId]);
    }
    addToast(
      'Fix Deployed to Sandbox',
      'Real-time inline validation & form simplification enabled. Friction metrics updated!',
      'success'
    );
  };

  const resetFixes = () => {
    setIsFixApplied(false);
    setAppliedFixesList([]);
    addToast('Simulation Reset', 'Reverted back to baseline pre-fix metrics.', 'info');
  };

  const updateWeight = (signalKey, newWeight) => {
    setWeights((prev) => ({
      ...prev,
      [signalKey]: parseFloat(newWeight),
    }));
  };

  const resetWeights = () => {
    setWeights(DEFAULT_WEIGHTS);
    addToast('Weights Reset', 'Restored default behavioral signal weights.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        isSidebarCollapsed,
        toggleSidebar,
        setIsSidebarCollapsed,
        customSite,
        setCustomSite,
        isUrlModalOpen,
        setIsUrlModalOpen,
        isScanningUrl,
        analyzeCustomSite,
        selectedProjectId,
        setSelectedProjectId,
        selectedProject,
        selectedRange,
        setSelectedRange,
        selectedStepId,
        setSelectedStepId,
        selectedStep,
        journeySteps,
        weights,
        updateWeight,
        resetWeights,
        isFixApplied,
        appliedFixesList,
        applyFix,
        resetFixes,
        kpis,
        trendData,
        toasts,
        addToast,
        removeToast,
        searchQuery,
        setSearchQuery,
        tourStep,
        setTourStep,
        breakpointDetails,
        aiInsights,
        recommendedFixes: RECOMMENDED_FIXES_DATA,
        beforeAfterData: BEFORE_AFTER_DATA,
        frictionEvents: FRICTION_EVENTS_LIST,
        liveDemoScenario: LIVE_DEMO_SCENARIO,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

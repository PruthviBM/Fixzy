import React, { useState } from 'react';
import {
  Bell,
  Search,
  ChevronDown,
  Sparkles,
  Layers,
  Calendar,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  PanelLeftClose,
  PanelLeftOpen,
  Globe,
  Plus,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PROJECTS, DATE_RANGES } from '../../data/mockData';

export default function TopNav() {
  const {
    currentView,
    setCurrentView,
    selectedProjectId,
    setSelectedProjectId,
    selectedProject,
    selectedRange,
    setSelectedRange,
    searchQuery,
    setSearchQuery,
    tourStep,
    setTourStep,
    isFixApplied,
    resetFixes,
    addToast,
    isSidebarCollapsed,
    toggleSidebar,
    customSite,
    setIsUrlModalOpen,
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProjectMenu, setShowProjectMenu] = useState(false);

  const notifications = [
    {
      id: 1,
      type: 'critical',
      title: 'Critical Breakpoint Detected',
      desc: 'Checkout step friction surged to 87/100 (+14% in last 2 hours).',
      time: '12m ago',
    },
    {
      id: 2,
      type: 'warning',
      title: 'High Hesitation Detected',
      desc: 'Billing address input average dwell reached 8.4 seconds.',
      time: '34m ago',
    },
    {
      id: 3,
      type: 'info',
      title: 'Daily Digest Ready',
      desc: 'Weekly report: 3,241 sessions lost at Checkout drop-off.',
      time: '2h ago',
    },
  ];

  return (
    <header className="sticky top-0 z-40 flex h-14 w-full items-center justify-between border-b border-slate-800 bg-[#0B0F19]/90 px-4 sm:px-6 backdrop-blur-md">
      {/* Left: Sidebar Toggle, Project / Website Selector */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Toggle Sidebar Button */}
        <button
          onClick={toggleSidebar}
          className="p-1.5 rounded-lg border border-slate-800 bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          title={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar to free laptop screen'}
        >
          {isSidebarCollapsed ? (
            <PanelLeftOpen className="h-4 w-4" />
          ) : (
            <PanelLeftClose className="h-4 w-4" />
          )}
        </button>

        {/* Project Selector or Custom Site Pill */}
        <div className="relative">
          <button
            onClick={() => setShowProjectMenu(!showProjectMenu)}
            className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-1.5 text-xs font-medium text-slate-200 hover:border-slate-700 hover:bg-slate-800 transition-all"
          >
            <span className="flex h-4 w-4 items-center justify-center rounded bg-sky-500/20 text-sky-400">
              {customSite.isCustom ? <Globe className="h-3 w-3" /> : <Layers className="h-3 w-3" />}
            </span>
            <span className="max-w-[140px] sm:max-w-[180px] truncate font-semibold">
              {selectedProject.name}
            </span>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
          </button>

          {/* Project dropdown */}
          {showProjectMenu && (
            <div className="absolute left-0 mt-2 w-72 rounded-xl border border-slate-700/80 bg-slate-900 p-2 shadow-2xl backdrop-blur-xl z-50">
              <div className="flex items-center justify-between px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                <span>Select Target Site</span>
                <button
                  onClick={() => {
                    setShowProjectMenu(false);
                    setIsUrlModalOpen(true);
                  }}
                  className="text-sky-400 hover:underline flex items-center gap-1 font-bold"
                >
                  <Plus className="h-3 w-3" />
                  <span>Paste URL</span>
                </button>
              </div>

              {PROJECTS.map((proj) => (
                <button
                  key={proj.id}
                  onClick={() => {
                    setSelectedProjectId(proj.id);
                    setShowProjectMenu(false);
                    addToast('Project Switched', `Active workspace: ${proj.name}`, 'info');
                  }}
                  className={`w-full text-left flex items-center justify-between p-2 rounded-lg text-xs transition-colors ${
                    proj.id === selectedProjectId && !customSite.isCustom
                      ? 'bg-sky-500/15 text-sky-300 font-medium'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div>
                    <div className="font-semibold text-slate-200">{proj.name}</div>
                    <div className="text-[10px] text-slate-400">{proj.domain}</div>
                  </div>
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded-full ${
                      proj.healthStatus === 'Optimal'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : proj.healthStatus === 'Needs Attention'
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-rose-500/20 text-rose-300'
                    }`}
                  >
                    {proj.healthStatus}
                  </span>
                </button>
              ))}

              <div className="mt-2 pt-2 border-t border-slate-800">
                <button
                  onClick={() => {
                    setShowProjectMenu(false);
                    setIsUrlModalOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-1.5 p-2 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-300 hover:bg-sky-500/20 text-xs font-semibold transition-colors"
                >
                  <Globe className="h-3.5 w-3.5 text-sky-400" />
                  <span>Analyze Your Own Website / URL</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Quick Paste Website Link Button */}
        <button
          onClick={() => setIsUrlModalOpen(true)}
          className="flex items-center gap-1.5 rounded-xl border border-sky-500/40 bg-sky-500/10 px-2.5 py-1.5 text-xs font-semibold text-sky-300 hover:bg-sky-500/20 transition-colors"
          title="Paste custom website URL or name before explanation"
        >
          <Globe className="h-3.5 w-3.5 text-sky-400" />
          <span className="hidden md:inline">
            {customSite.isCustom ? 'Change Target URL' : 'Paste Website URL'}
          </span>
        </button>

        {/* Applied Fix indicator tag */}
        {isFixApplied ? (
          <div className="hidden lg:flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Fix Active (-51%)</span>
            <button
              onClick={resetFixes}
              className="ml-1 text-slate-400 hover:text-slate-200 p-0.5"
              title="Reset test simulation"
            >
              <RotateCcw className="h-3 w-3" />
            </button>
          </div>
        ) : null}
      </div>

      {/* Center: Search input */}
      <div className="hidden xl:flex items-center w-64 lg:w-72 relative">
        <Search className="absolute left-3 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter telemetry, events..."
          className="w-full rounded-xl border border-slate-800 bg-slate-900/60 pl-9 pr-8 py-1 text-xs text-slate-200 placeholder-slate-500 focus:border-sky-500 focus:outline-none"
        />
      </div>

      {/* Right: Date Range, Hackathon Mode, Notification, Profile */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Date Range Selector */}
        <div className="flex items-center rounded-xl border border-slate-800 bg-slate-900/80 p-0.5">
          {DATE_RANGES.map((range) => (
            <button
              key={range.id}
              onClick={() => setSelectedRange(range.id)}
              className={`rounded-lg px-2 py-0.5 text-[11px] font-medium transition-all ${
                selectedRange === range.id
                  ? 'bg-sky-500 text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {range.id}
            </button>
          ))}
        </div>

        {/* Pitch Demo Mode Launcher */}
        <button
          onClick={() => {
            setTourStep(1);
            setCurrentView('overview');
          }}
          className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-3 py-1.5 text-xs font-semibold text-white shadow-md hover:from-sky-400 hover:to-indigo-500 transition-all active:scale-[0.98]"
          title="Start 11-step hackathon pitch walkthrough"
        >
          <Sparkles className="h-3 w-3" />
          <span className="hidden sm:inline">Pitch Demo</span>
        </button>

        {/* Landing Page Switcher */}
        <button
          onClick={() => setCurrentView(currentView === 'landing' ? 'overview' : 'landing')}
          className="hidden md:flex items-center gap-1 rounded-xl border border-slate-800 bg-slate-900/80 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 transition-colors"
          title="Toggle Landing Page"
        >
          <span className="text-[11px]">{currentView === 'landing' ? 'Dashboard' : 'Landing'}</span>
          <ExternalLink className="h-3 w-3 text-slate-400" />
        </button>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative rounded-xl border border-slate-800 bg-slate-900/80 p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <Bell className="h-3.5 w-3.5" />
            <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-rose-500 ring-2 ring-slate-900" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 sm:w-80 rounded-xl border border-slate-700/80 bg-slate-900 p-3 shadow-2xl backdrop-blur-xl z-50 animate-fade-in">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-white">Live Friction Alerts</span>
                <span className="text-[10px] text-sky-400 font-semibold">3 Unread</span>
              </div>
              <div className="mt-2 space-y-2">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/50 hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                        <AlertTriangle className="h-3.5 w-3.5 text-rose-400" />
                        {n.title}
                      </span>
                      <span className="text-[10px] text-slate-400">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 mt-1">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User avatar */}
        <div className="flex items-center gap-1.5 pl-1.5 border-l border-slate-800">
          <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center text-[10px] font-bold text-white shadow-inner">
            FZ
          </div>
        </div>
      </div>
    </header>
  );
}

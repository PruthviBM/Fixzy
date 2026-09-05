import React from 'react';
import {
  LayoutDashboard,
  GitCommitHorizontal,
  Zap,
  Activity,
  Sparkles,
  ArrowRightLeft,
  PlayCircle,
  Crosshair,
  Compass,
  Home,
  CheckCircle2,
  AlertOctagon,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
  Globe,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Sidebar() {
  const {
    currentView,
    setCurrentView,
    isFixApplied,
    applyFix,
    resetFixes,
    isSidebarCollapsed,
    toggleSidebar,
    setIsUrlModalOpen,
  } = useApp();

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, badge: null },
    { id: 'journeys', label: 'User Journeys', icon: GitCommitHorizontal, badge: 'Flow' },
    { id: 'breakpoints', label: 'Breakpoints', icon: Zap, badge: 'Core' },
    { id: 'details', label: 'Breakpoint Details', icon: AlertOctagon, badge: '87' },
    { id: 'events', label: 'Friction Events', icon: Activity, badge: '12' },
    { id: 'insights', label: 'AI Insights', icon: Sparkles, badge: 'AI' },
    { id: 'before-after', label: 'Before vs After', icon: ArrowRightLeft, badge: '-51%' },
    { id: 'live-demo', label: 'Live Demo', icon: PlayCircle, badge: 'Live' },
    { id: 'root-cause', label: 'Root Cause', icon: Crosshair, badge: null },
    { id: 'philosophy', label: 'Product Philosophy', icon: Compass, badge: null },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 z-30 h-screen border-r border-slate-800 bg-[#0B0F19] flex flex-col justify-between transition-all duration-300 select-none ${
        isSidebarCollapsed ? 'w-16 p-2' : 'w-60 p-3.5'
      }`}
    >
      {/* Top: Logo & Collapse Toggle */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
          <div
            onClick={() => setCurrentView('landing')}
            className={`flex items-center gap-2.5 cursor-pointer group ${
              isSidebarCollapsed ? 'justify-center w-full' : ''
            }`}
            title="Fixzy - Find Friction. Fix Experience."
          >
            <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <Zap className="h-4 w-4 text-white" />
              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-[#0B0F19]" />
            </div>

            {!isSidebarCollapsed && (
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-extrabold tracking-tight text-white">Fixzy</span>
                  <span className="rounded bg-sky-500/20 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-sky-400">
                    PRO
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 truncate">UX Intelligence</p>
              </div>
            )}
          </div>

          {!isSidebarCollapsed && (
            <button
              onClick={toggleSidebar}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
              title="Collapse sidebar (maximize laptop space)"
            >
              <PanelLeftClose className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Collapsed expand button */}
        {isSidebarCollapsed && (
          <div className="pt-2 flex justify-center">
            <button
              onClick={toggleSidebar}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
              title="Expand sidebar"
            >
              <PanelLeftOpen className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Analyze Custom Website Link Button */}
        <div className="mt-3">
          <button
            onClick={() => setIsUrlModalOpen(true)}
            className={`w-full flex items-center rounded-xl border border-sky-500/40 bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 text-xs font-semibold transition-all ${
              isSidebarCollapsed
                ? 'justify-center p-2.5'
                : 'gap-2 px-3 py-2 justify-start'
            }`}
            title="Paste & Analyze Custom Website Link"
          >
            <Globe className="h-4 w-4 text-sky-400 shrink-0" />
            {!isSidebarCollapsed && <span className="truncate">Paste Website URL</span>}
          </button>
        </div>

        {/* Navigation list */}
        <div className="mt-4 space-y-1">
          {!isSidebarCollapsed && (
            <div className="px-2 pb-1.5 text-[9px] font-bold uppercase tracking-wider text-slate-500">
              Menu
            </div>
          )}

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`group relative flex w-full items-center rounded-xl text-xs font-medium transition-all ${
                  isSidebarCollapsed
                    ? 'justify-center p-2.5'
                    : 'justify-between px-3 py-1.5'
                } ${
                  isActive
                    ? 'bg-sky-500/15 text-sky-300 font-semibold shadow-inner'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                }`}
                title={item.label}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={`h-4 w-4 shrink-0 transition-colors ${
                      isActive ? 'text-sky-400' : 'text-slate-500 group-hover:text-slate-300'
                    }`}
                  />
                  {!isSidebarCollapsed && <span className="truncate">{item.label}</span>}
                </div>

                {!isSidebarCollapsed && item.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded font-semibold tracking-wide ${
                      isActive
                        ? 'bg-sky-500/30 text-sky-200'
                        : item.badge === 'Live'
                        ? 'bg-rose-500/20 text-rose-300 animate-pulse'
                        : item.badge === '-51%'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}

                {/* Left Active Glow Bar */}
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-1 rounded-r-full bg-sky-400" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom: Quick Simulation / Mini Controls */}
      <div className="space-y-2 pt-3 border-t border-slate-800/80">
        {!isSidebarCollapsed ? (
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-2.5">
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-300">
              <span>Fix Sandbox</span>
              <span
                className={`h-2 w-2 rounded-full ${
                  isFixApplied ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                }`}
              />
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">
              {isFixApplied ? 'Friction at 43/100 (-51%).' : 'Simulate applying inline fix.'}
            </p>

            <div className="mt-2">
              {isFixApplied ? (
                <button
                  onClick={resetFixes}
                  className="w-full text-center rounded-lg border border-slate-700 bg-slate-800 py-1 text-[10px] font-medium text-slate-300 hover:bg-slate-700 transition-colors"
                >
                  Reset Baseline
                </button>
              ) : (
                <button
                  onClick={() => applyFix('fix-1')}
                  className="w-full text-center rounded-lg bg-sky-500 hover:bg-sky-400 py-1 text-[10px] font-semibold text-white shadow-sm transition-colors"
                >
                  Apply Test Fix
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <button
              onClick={isFixApplied ? resetFixes : () => applyFix('fix-1')}
              className={`h-8 w-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                isFixApplied
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
              title={isFixApplied ? 'Test Fix Active (-51%)' : 'Apply Test Fix'}
            >
              {isFixApplied ? '43' : '87'}
            </button>
          </div>
        )}

        {/* View Landing Page Button */}
        <button
          onClick={() => setCurrentView('landing')}
          className={`flex w-full items-center rounded-xl text-xs font-medium text-slate-400 hover:bg-slate-900 hover:text-slate-200 transition-colors ${
            isSidebarCollapsed ? 'justify-center p-2' : 'justify-between px-3 py-1.5'
          }`}
          title="Landing Page"
        >
          <div className="flex items-center gap-2">
            <Home className="h-4 w-4 text-slate-500 shrink-0" />
            {!isSidebarCollapsed && <span>Landing Page</span>}
          </div>
          {!isSidebarCollapsed && <ArrowUpRight className="h-3 w-3 text-slate-500" />}
        </button>
      </div>
    </aside>
  );
}

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import TopNav from './components/common/TopNav';
import Sidebar from './components/common/Sidebar';
import Toast from './components/common/Toast';
import HackathonTour from './components/common/HackathonTour';
import AnalyzeWebsiteModal from './components/common/AnalyzeWebsiteModal';
import LandingPage from './components/landing/LandingPage';
import OverviewDashboard from './components/dashboard/OverviewDashboard';
import UserJourneys from './components/journeys/UserJourneys';
import BreakpointEngine from './components/breakpoints/BreakpointEngine';
import BreakpointDetails from './components/breakpoints/BreakpointDetails';
import FrictionEvents from './components/events/FrictionEvents';
import AiInsights from './components/insights/AiInsights';
import BeforeAfter from './components/comparison/BeforeAfter';
import LiveDemo from './components/demo/LiveDemo';
import RootCauseAnalysis from './components/rootcause/RootCauseAnalysis';
import ProductPhilosophy from './components/philosophy/ProductPhilosophy';

function MainLayout() {
  const { currentView, isSidebarCollapsed } = useApp();

  // If on landing page, display the standalone landing layout
  if (currentView === 'landing') {
    return (
      <div className="relative min-h-screen bg-[#0B0F19]">
        <LandingPage />
        <Toast />
        <HackathonTour />
        <AnalyzeWebsiteModal />
      </div>
    );
  }

  // Otherwise, render full responsive SaaS Dashboard layout
  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex overflow-x-hidden">
      {/* Collapsible Sidebar */}
      <Sidebar />

      {/* Main Content Area with dynamic margin based on sidebar state */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
          isSidebarCollapsed ? 'ml-16' : 'ml-60'
        }`}
      >
        {/* Sticky Compact Top Navigation */}
        <TopNav />

        {/* Dynamic Page Views with optimized laptop padding & max-width */}
        <main className="flex-1 p-4 sm:p-6 lg:p-7 max-w-[1520px] w-full mx-auto">
          {currentView === 'overview' && <OverviewDashboard />}
          {currentView === 'journeys' && <UserJourneys />}
          {currentView === 'breakpoints' && <BreakpointEngine />}
          {currentView === 'details' && <BreakpointDetails />}
          {currentView === 'events' && <FrictionEvents />}
          {currentView === 'insights' && <AiInsights />}
          {currentView === 'before-after' && <BeforeAfter />}
          {currentView === 'live-demo' && <LiveDemo />}
          {currentView === 'root-cause' && <RootCauseAnalysis />}
          {currentView === 'philosophy' && <ProductPhilosophy />}
        </main>
      </div>

      {/* Global Toast Container */}
      <Toast />

      {/* Global Hackathon Presentation Mode Stepper */}
      <HackathonTour />

      {/* Global Custom Website Link Analyzer Modal */}
      <AnalyzeWebsiteModal />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

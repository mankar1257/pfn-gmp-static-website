import React, { useState } from 'react';
import { DashboardProvider } from './store/DashboardContext';
import { Header } from './components/Header';
import { PartyFilterBar } from './components/Timeline';
import { AllianceBuilder } from './components/AllianceBuilder';
import { MapVisualization } from './components/MapVisualization';
import { AccessGate } from './components/AccessGate';
import { AdminLogin } from './components/AdminLogin';
import { AdminPanel } from './components/AdminPanel';
import { getAdminSession } from './auth/authStore';

type View = 'gate' | 'admin-login' | 'admin-panel';

export default function App() {
  const [view, setView] = useState<View>('gate');

  // If admin is already logged in and someone navigates to admin, skip login
  const handleAdminClick = () => {
    if (getAdminSession()) {
      setView('admin-panel');
    } else {
      setView('admin-login');
    }
  };

  if (view === 'admin-login') {
    return (
      <AdminLogin
        onBack={() => setView('gate')}
        onSuccess={() => setView('admin-panel')}
      />
    );
  }

  if (view === 'admin-panel') {
    return (
      <AdminPanel
        onLogout={() => {
          // Clear admin session and go back to gate
          setView('gate');
        }}
        onGoToDashboard={() => {
          // Keep admin session active → AccessGate will auto-authenticate
          setView('gate');
        }}
      />
    );
  }

  return (
    <AccessGate onAdminClick={handleAdminClick}>
      <DashboardProvider>
        <div className="h-screen bg-slate-100 text-slate-900 font-sans selection:bg-blue-100 flex flex-col overflow-hidden">
          {/* Sticky header with view mode + strategic assessment */}
          <Header />

          {/* Party filter strip */}
          <div className="px-5 py-2 bg-white border-b border-slate-200 shrink-0">
            <PartyFilterBar />
          </div>

          {/* Main content: fills remaining viewport height */}
          <div className="flex-1 flex flex-col xl:flex-row min-h-0 overflow-hidden">
            {/* Left sidebar — Alliance Builder + KPIs */}
            <aside className="xl:w-72 2xl:w-80 shrink-0 bg-slate-50 border-r border-slate-200 overflow-y-auto">
              <AllianceBuilder />
            </aside>

            {/* Center — Map (takes remaining space) */}
            <div className="flex-1 min-w-0 min-h-0 flex flex-col overflow-hidden">
              <MapVisualization />
            </div>
          </div>
        </div>
      </DashboardProvider>
    </AccessGate>
  );
}

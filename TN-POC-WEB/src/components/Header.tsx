import React from 'react';
import { useDashboard } from '../store/DashboardContext';
import type { ViewMode, HeatmapSubMode } from '../store/DashboardContext';
import { useRecommendation } from '../utils/useRecommendation';
// import { isV10Year } from '../data/realData'; // kept for reference, unused after year-tab removal
import { Search, Map, BarChart3, Activity, Shield } from 'lucide-react';

// Only 2026 — historical year tabs removed
// const YEARS = [2011, 2016, 2021, 2026];

const BASE_VIEW_MODES: { key: ViewMode; label: string; icon: React.ReactNode; desc: string }[] = [
  { key: 'party', label: 'Party', icon: <Map size={14} />, desc: 'Color by winning party' },
  { key: 'heatmap', label: 'Vote Share', icon: <BarChart3 size={14} />, desc: 'DMK bloc / INC share heatmap' },
  { key: 'margin', label: 'Margin', icon: <Activity size={14} />, desc: 'Win margin intensity' },
];

// TVK Impact & Crystal Gap views removed from UI (data preserved)
// const V10_VIEW_MODES = [...];

export const Header = () => {
  const {
    selectedYear,
    viewMode, setViewMode,
    heatmapSubMode, setHeatmapSubMode,
    searchQuery, setSearchQuery,
  } = useDashboard();

  const recommendation = useRecommendation();

  // Only base view modes (TVK Impact & Crystal Gap removed)
  const viewModes = BASE_VIEW_MODES;

  // Year switching removed — locked to 2026
  // const handleYearChange = ...

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      {/* Top bar — branding + classification */}
      <div className="px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-2 rounded-lg shadow-sm">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-800 leading-tight tracking-tight">
              Tamil Nadu Election Intelligence
            </h1>
            <p className="text-xs text-slate-400 font-medium">
              PFT Model v10 — 2026 Forecast
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search constituency..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-lg w-56 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all placeholder:text-slate-400"
            />
          </div>

          <div className="h-5 w-px bg-slate-200 hidden md:block" />

          {/* Classification badge */}
          <div className="text-right hidden sm:block">
            <div className="text-[11px] font-semibold text-slate-300 uppercase tracking-widest">Confidential</div>
            <div className="text-xs font-medium text-slate-500">Internal Use Only</div>
          </div>
        </div>
      </div>

      {/* Control bar — view mode only (year tabs removed) */}
      <div className="px-5 py-2 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-4 flex-wrap">
        {/* Year badge (fixed, not selectable) */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-1">Year</span>
          <span className="px-3 py-1.5 rounded-md text-sm font-semibold pill-active">2026</span>
          <span className="px-2 py-0.5 bg-amber-50 text-amber-700 text-[11px] font-semibold rounded-full border border-amber-200">
            Forecast
          </span>
        </div>

        {/* View mode & comparison */}
        <div className="flex items-center gap-3">
          {/* View mode toggles */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-1">View</span>
            <div className="flex items-center bg-white rounded-lg border border-slate-200 p-0.5 gap-0.5">
              {viewModes.map((mode) => (
                <button
                  key={mode.key}
                  onClick={() => setViewMode(mode.key)}
                  title={mode.desc}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    viewMode === mode.key
                      ? 'pill-active'
                      : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {mode.icon}
                  <span className="hidden sm:inline">{mode.label}</span>
                </button>
              ))}
            </div>

            {/* Heatmap sub-toggle: All Vote Share vs INC Only */}
            {viewMode === 'heatmap' && (
              <div className="flex items-center bg-white rounded-lg border border-blue-200 p-0.5 gap-0.5 ml-1">
                {([
                  { key: 'all' as HeatmapSubMode, label: 'All Parties' },
                  { key: 'inc' as HeatmapSubMode, label: 'INC Only' },
                ] as const).map((sub) => (
                  <button
                    key={sub.key}
                    onClick={() => setHeatmapSubMode(sub.key)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                      heatmapSubMode === sub.key
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-500 hover:text-blue-700 hover:bg-blue-50'
                    }`}
                  >
                    {sub.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Strategic Assessment — prominent banner */}
      <div className={`px-5 py-3.5 border-t-2 flex items-start gap-3 ${
        recommendation.type === 'positive' ? 'bg-emerald-50 border-emerald-200' :
        recommendation.type === 'caution' ? 'bg-amber-50 border-amber-200' :
        recommendation.type === 'negative' ? 'bg-red-50 border-red-200' :
        'bg-slate-50 border-slate-200'
      }`}>
        <span className="text-lg shrink-0 mt-0.5">
          {recommendation.type === 'positive' ? '✅' : recommendation.type === 'caution' ? '⚠️' : recommendation.type === 'negative' ? '🔴' : '📊'}
        </span>
        <div className="flex flex-col gap-0.5">
          <span className={`text-[11px] font-bold uppercase tracking-wider ${
            recommendation.type === 'positive' ? 'text-emerald-800' :
            recommendation.type === 'caution' ? 'text-amber-800' :
            recommendation.type === 'negative' ? 'text-red-800' :
            'text-slate-600'
          }`}>Strategic Assessment</span>
          <span className={`text-sm leading-relaxed font-medium ${
            recommendation.type === 'positive' ? 'text-emerald-700' :
            recommendation.type === 'caution' ? 'text-amber-700' :
            recommendation.type === 'negative' ? 'text-red-700' :
            'text-slate-500'
          }`}>{recommendation.text}</span>
        </div>
      </div>
    </header>
  );
};


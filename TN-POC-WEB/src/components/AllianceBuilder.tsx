import React, { useMemo } from 'react';
import { useDashboard } from '../store/DashboardContext';
import { getPartyColor } from '../utils/colors';
import { ALLIANCE_PARTIES, electionData, ConstituencyData, MAJORITY_MARK, TOTAL_CONSTITUENCIES, isV10Year, SCENARIO_META, MAJOR_PARTIES_2026 } from '../data/realData';
import type { AllianceScenario } from '../store/DashboardContext';
import { X, Users, TrendingUp, TrendingDown, Target, ChevronRight, AlertTriangle, CheckCircle, Crosshair, Shield } from 'lucide-react';

const V8_SCENARIO_PRESETS = [
  { key: 'A' as const, parties: ['DMK'], label: 'DMK Alliance', desc: 'INC joins DMK-led front', color: 'border-red-200 bg-red-50 text-red-700 hover:bg-red-100' },
  { key: 'B' as const, parties: ['ADMK'], label: 'ADMK Alliance', desc: 'INC joins ADMK-led front', color: 'border-green-200 bg-green-50 text-green-700 hover:bg-green-100' },
  { key: 'C' as const, parties: [], label: 'Third Front', desc: 'INC-led independent front', color: 'border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100' },
];

export const AllianceBuilder = () => {
  const { alliances, setAlliances, activeScenario, setActiveScenario, selectedYear } = useDashboard();

  const isV10 = isV10Year(selectedYear);
  const currentData = useMemo(() => electionData[selectedYear.toString()] || [], [selectedYear]);

  const getWinner = (c: ConstituencyData) => {
    if (activeScenario === 'D' && c.scenario_D) return c.scenario_D;
    if (activeScenario === 'E' && c.scenario_E) return c.scenario_E;
    if (activeScenario === 'A') return c.scenario_A;
    if (activeScenario === 'B') return c.scenario_B;
    if (activeScenario === 'C') return c.scenario_C;
    return c.actual_winner || c.scenario_C;
  };

  // Quick stats for current scenario
  const stats = useMemo(() => {
    const seats: Record<string, number> = {};
    currentData.forEach(c => {
      const w = getWinner(c);
      if (w) seats[w] = (seats[w] || 0) + 1;
    });
    const incSeats = seats['INC'] || 0;
    return { seats, incSeats, total: TOTAL_CONSTITUENCIES, majority: MAJORITY_MARK };
  }, [currentData, activeScenario]);

  // Extended KPI stats for sidebar (V10 only)
  const kpiStats = useMemo(() => {
    if (!isV10) return null;

    const getMargin = (c: ConstituencyData): number | null => {
      if (activeScenario === 'D' && c.scenario_D_margin !== undefined) return c.scenario_D_margin;
      if (activeScenario === 'E' && c.scenario_E_margin !== undefined) return c.scenario_E_margin;
      if (activeScenario === 'A') return c.scenario_A_margin;
      if (activeScenario === 'B') return c.scenario_B_margin;
      if (activeScenario === 'C') return c.scenario_C_margin;
      return c.actual_margin ?? c.scenario_C_margin;
    };

    const swingSeats = currentData.filter(c => {
      const margin = getMargin(c);
      return margin !== null && Math.abs(margin) < 0.10;
    }).length;

    const incAvgShare = currentData.length > 0
      ? currentData.reduce((sum, c) => sum + (c.inc_layer?.mean_share ?? 0), 0) / currentData.length
      : 0;

    const highConfidence = currentData.filter(c => c.scenario_A_confidence === 'high').length;

    const incSeatsWon = stats.seats['INC'] || 0;

    return { swingSeats, incAvgShare, highConfidence, incSeatsWon };
  }, [currentData, activeScenario, isV10, stats]);

  const toggleParty = (party: string) => {
    if (alliances.includes(party)) {
      setAlliances(alliances.filter(p => p !== party));
    } else {
      let newAlliances = [...alliances, party];
      if (party === 'DMK') newAlliances = newAlliances.filter(p => p !== 'ADMK');
      if (party === 'ADMK') newAlliances = newAlliances.filter(p => p !== 'DMK');
      setAlliances(newAlliances);
    }
  };

  // ── V10 (2026): Preset scenario cards + 4-party bar chart ──
  if (isV10) {
    const v10Scenarios: AllianceScenario[] = ['A', 'C', 'D', 'E'];

    // Compute DMK bloc and ADMK bloc totals (scenario-aware: INC shifts alliance)
    const incSeatsLocal = stats.seats['INC'] || 0;
    const incTvkSeats = stats.seats['INC+TVK'] || 0;
    const dmkAllySeats = (stats.seats['VCK'] || 0) + (stats.seats['CPM'] || 0) + (stats.seats['CPI'] || 0) + (stats.seats['MDMK'] || 0);
    const admkAllySeats = (stats.seats['BJP'] || 0) + (stats.seats['PMK'] || 0);
    // In Sc A: INC in DMK bloc. In Sc D: INC+INC+TVK in TVK bloc. In Sc E: INC in ADMK bloc. In Sc C: INC solo.
    const dmkBlocSeats = (stats.seats['DMK'] || 0) + dmkAllySeats + (activeScenario === 'A' ? incSeatsLocal : 0);
    const admkBlocSeats = (stats.seats['ADMK'] || 0) + admkAllySeats + (activeScenario === 'E' ? incSeatsLocal : 0);
    const totalIncSide = incSeatsLocal + incTvkSeats;

    return (
      <div className="flex flex-col gap-3 p-3 h-full">
        {/* V10 Scenario Cards */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
          <div className="flex items-center gap-2 mb-3">
            <Target size={13} className="text-slate-400" />
            <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">2026 Scenarios</h3>
          </div>
          <div className="space-y-1.5">
            {v10Scenarios.map(key => {
              const meta = SCENARIO_META[key];
              if (!meta) return null;
              return (
                <button
                  key={key}
                  onClick={() => setActiveScenario(key)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border text-xs font-medium transition-all ${
                    activeScenario === key
                      ? meta.color + ' shadow-sm'
                      : 'border-slate-100 bg-white text-slate-500 hover:border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="text-left">
                    <div className="font-semibold">Scenario {key} — {meta.label}</div>
                    <div className={`text-[10px] ${activeScenario === key ? 'opacity-70' : 'text-slate-400'}`}>
                      {meta.desc}
                    </div>
                  </div>
                  {activeScenario === key && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white/60">Active</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Seat Projection — INC first (focal party) */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <Users size={13} className="text-slate-400" />
            <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Seat Projection</h3>
          </div>

          <div className="space-y-2">
            {/* INC — focal party, shown first with highlight */}
            {(() => {
              const incSeats = stats.seats['INC'] || 0;
              const pct = (incSeats / TOTAL_CONSTITUENCIES) * 100;
              return (
                <div className="flex items-center gap-2 bg-blue-50 rounded-lg px-2 py-1.5 border border-blue-100">
                  <div className="w-12 text-[11px] font-extrabold" style={{ color: getPartyColor('INC') }}>INC</div>
                  <div className="flex-1 h-5 bg-blue-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%`, backgroundColor: getPartyColor('INC') }}
                    />
                  </div>
                  <div className="w-8 text-right text-xs font-extrabold text-blue-700 tabular-nums">{incSeats}</div>
                </div>
              );
            })()}
            {/* INC+TVK — only shown in Scenario D when these seats exist */}
            {(stats.seats['INC+TVK'] || 0) > 0 && (() => {
              const seats = stats.seats['INC+TVK'] || 0;
              const pct = (seats / TOTAL_CONSTITUENCIES) * 100;
              return (
                <div className="flex items-center gap-2 bg-violet-50 rounded-lg px-2 py-1.5 border border-violet-100">
                  <div className="w-12 text-[10px] font-extrabold" style={{ color: getPartyColor('INC+TVK') }}>INC+TVK</div>
                  <div className="flex-1 h-5 bg-violet-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%`, backgroundColor: getPartyColor('INC+TVK') }}
                    />
                  </div>
                  <div className="w-8 text-right text-xs font-extrabold text-violet-700 tabular-nums">{seats}</div>
                </div>
              );
            })()}
            {/* Major parties */}
            {MAJOR_PARTIES_2026.map(party => {
              const seats = stats.seats[party] || 0;
              const pct = (seats / TOTAL_CONSTITUENCIES) * 100;
              return (
                <div key={party} className="flex items-center gap-2">
                  <div className="w-12 text-[11px] font-bold" style={{ color: getPartyColor(party) }}>{party}</div>
                  <div className="flex-1 h-5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%`, backgroundColor: getPartyColor(party) }}
                    />
                  </div>
                  <div className="w-8 text-right text-xs font-bold text-slate-700 tabular-nums">{seats}</div>
                </div>
              );
            })}
            {/* Others row */}
            {(() => {
              const majorSeats = MAJOR_PARTIES_2026.reduce((s, p) => s + (stats.seats[p] || 0), 0) + (stats.seats['INC'] || 0) + (stats.seats['INC+TVK'] || 0);
              const otherSeats = TOTAL_CONSTITUENCIES - majorSeats;
              const pct = (otherSeats / TOTAL_CONSTITUENCIES) * 100;
              return (
                <div className="flex items-center gap-2">
                  <div className="w-12 text-[11px] font-bold text-slate-400">Others</div>
                  <div className="flex-1 h-5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-slate-400 transition-all duration-500" style={{ width: `${pct}%` }} />
                  </div>
                  <div className="w-8 text-right text-xs font-bold text-slate-500 tabular-nums">{otherSeats}</div>
                </div>
              );
            })()}
          </div>
        </div>

        {/* Alliance Blocs Summary — scenario-aware labels */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 animate-fade-in">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={13} className="text-blue-500" />
            <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Alliance Blocs</h3>
          </div>
          {/* INC Position Indicator */}
          <div className="mb-2 px-2 py-1 bg-blue-50 rounded border border-blue-100 text-[10px] text-blue-600 font-medium text-center">
            INC ({totalIncSide} seats{incTvkSeats > 0 ? ` — ${incSeatsLocal} INC + ${incTvkSeats} INC+TVK` : ''}) → {activeScenario === 'A' ? 'in DMK+ Bloc' : activeScenario === 'D' ? 'in INC+TVK Bloc' : activeScenario === 'E' ? 'in ADMK+ Bloc' : 'Independent'}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className={`text-center p-2 rounded-lg border ${activeScenario === 'A' ? 'bg-red-100 border-red-300 ring-1 ring-red-200' : 'bg-red-50 border-red-100'}`}>
              <div className="text-lg font-bold text-red-700 tabular-nums">{dmkBlocSeats}</div>
              <div className="text-[9px] text-red-500 font-medium">{activeScenario === 'A' ? 'DMK+INC Bloc' : 'DMK+ Bloc'}</div>
            </div>
            <div className={`text-center p-2 rounded-lg border ${activeScenario === 'E' ? 'bg-green-100 border-green-300 ring-1 ring-green-200' : 'bg-green-50 border-green-100'}`}>
              <div className="text-lg font-bold text-green-700 tabular-nums">{admkBlocSeats}</div>
              <div className="text-[9px] text-green-500 font-medium">{activeScenario === 'E' ? 'ADMK+INC Bloc' : 'ADMK+ Bloc'}</div>
            </div>
          </div>
          {/* Third bloc row for Scenario D (INC+TVK) */}
          {activeScenario === 'D' && (
            <div className="mt-2">
              <div className="text-center p-2 bg-violet-100 rounded-lg border border-violet-300 ring-1 ring-violet-200">
                <div className="text-lg font-bold text-violet-700 tabular-nums">{totalIncSide + (stats.seats['TVK'] || 0)}</div>
                <div className="text-[9px] text-violet-500 font-medium">INC+TVK Bloc</div>
              </div>
            </div>
          )}
          <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
            <span>Majority: {MAJORITY_MARK}</span>
            <span className={`${dmkBlocSeats >= MAJORITY_MARK || admkBlocSeats >= MAJORITY_MARK ? 'font-bold text-emerald-600' : ''}`}>
              {dmkBlocSeats >= MAJORITY_MARK ? 'DMK+ has majority' : admkBlocSeats >= MAJORITY_MARK ? 'ADMK+ has majority' : 'No bloc has majority'}
            </span>
          </div>
        </div>

        {/* Key Metrics */}
        {kpiStats && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 animate-fade-in">
            <div className="flex items-center gap-2 mb-2.5">
              <Shield size={13} className="text-slate-400" />
              <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Key Metrics</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[9px] text-blue-500 font-semibold uppercase tracking-wider">INC</span>
                  {kpiStats.incSeatsWon === 0 ? <AlertTriangle size={11} className="text-red-400" /> : <TrendingUp size={11} className="text-blue-500" />}
                </div>
                <div className="text-lg font-bold text-blue-700 tabular-nums leading-tight">{kpiStats.incSeatsWon}</div>
                <div className="text-[9px] text-blue-400 font-medium">Avg. {(kpiStats.incAvgShare * 100).toFixed(1)}% share</div>
              </div>
              <div className="p-2 bg-amber-50 rounded-lg border border-amber-100">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[9px] text-amber-500 font-semibold uppercase tracking-wider">Swing</span>
                  <AlertTriangle size={11} className="text-amber-500" />
                </div>
                <div className="text-lg font-bold text-amber-700 tabular-nums leading-tight">{kpiStats.swingSeats}</div>
                <div className="text-[9px] text-amber-400 font-medium">Margin &lt; 10%</div>
              </div>
              <div className="col-span-2 p-2 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider">High Confidence</span>
                  <div className="text-sm font-bold text-slate-700 tabular-nums">{kpiStats.highConfidence} <span className="text-[10px] text-slate-400 font-normal">of {TOTAL_CONSTITUENCIES}</span></div>
                </div>
                <CheckCircle size={14} className="text-emerald-400" />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ── V8 (Historical years): Original alliance builder ──
  const applyPreset = (parties: string[]) => {
    setAlliances(parties);
  };

  return (
    <div className="flex flex-col gap-3 p-3 h-full">
      {/* Scenario Quick Select */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
        <div className="flex items-center gap-2 mb-3">
          <Target size={13} className="text-slate-400" />
          <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Scenario</h3>
        </div>
        <div className="space-y-1.5">
          {V8_SCENARIO_PRESETS.map(preset => (
            <button
              key={preset.key}
              onClick={() => applyPreset(preset.parties)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border text-xs font-medium transition-all ${
                activeScenario === preset.key
                  ? preset.color + ' shadow-sm'
                  : 'border-slate-100 bg-white text-slate-500 hover:border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="text-left">
                <div className="font-semibold">{preset.label}</div>
                <div className={`text-[10px] ${activeScenario === preset.key ? 'opacity-70' : 'text-slate-400'}`}>
                  {preset.desc}
                </div>
              </div>
              {activeScenario === preset.key && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white/60">Active</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Alliance Builder */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Users size={13} className="text-slate-400" />
            <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Alliance Builder</h3>
          </div>
          {alliances.length > 0 && (
            <button
              onClick={() => setAlliances([])}
              className="text-[10px] text-slate-400 hover:text-red-500 transition-colors font-medium"
            >
              Reset
            </button>
          )}
        </div>

        {/* INC anchor */}
        <div className="flex items-center gap-2 mb-3 pb-3 border-b border-slate-100">
          <div className="w-6 h-6 rounded-md flex items-center justify-center text-[9px] font-bold text-white"
            style={{ backgroundColor: getPartyColor('INC') }}>
            INC
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-700">INC (Anchor)</div>
            <div className="text-[10px] text-slate-400">{stats.incSeats} projected seats</div>
          </div>
        </div>

        {/* Party grid */}
        <div className="grid grid-cols-2 gap-1.5 flex-1">
          {ALLIANCE_PARTIES.map(party => {
            const isSelected = alliances.includes(party);
            const seats = stats.seats[party] || 0;
            return (
              <button
                key={party}
                onClick={() => toggleParty(party)}
                className={`flex items-center gap-2 px-2.5 py-2 rounded-lg border text-left transition-all ${
                  isSelected
                    ? 'border-transparent shadow-sm'
                    : 'border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50'
                }`}
                style={isSelected ? { backgroundColor: getPartyColor(party) + '15', borderColor: getPartyColor(party) + '40' } : {}}
              >
                <div className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: getPartyColor(party) }} />
                <div className="min-w-0 flex-1">
                  <div className={`text-[11px] font-semibold truncate ${isSelected ? 'text-slate-800' : 'text-slate-600'}`}>
                    {party}
                  </div>
                  <div className="text-[9px] text-slate-400 tabular-nums">{seats} seats</div>
                </div>
                {isSelected && (
                  <X size={10} className="text-slate-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Summary Card */}
      {activeScenario !== 'NONE' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 animate-fade-in">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={13} className="text-blue-500" />
            <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Summary</h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-center p-2 bg-blue-50 rounded-lg">
              <div className="text-lg font-bold text-blue-700 tabular-nums">{stats.incSeats}</div>
              <div className="text-[9px] text-blue-500 font-medium">INC Seats</div>
            </div>
            <div className="text-center p-2 bg-slate-50 rounded-lg">
              <div className="text-lg font-bold text-slate-700 tabular-nums">{stats.majority}</div>
              <div className="text-[9px] text-slate-400 font-medium">Majority Mark</div>
            </div>
          </div>
          <div className="mt-2 text-center">
            <button className="text-[10px] text-blue-600 hover:text-blue-800 font-medium flex items-center gap-0.5 mx-auto transition-colors">
              View detailed analysis <ChevronRight size={10} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


import React, { useMemo } from 'react';
import { useDashboard } from '../store/DashboardContext';
import { electionData, ConstituencyData, MAJORITY_MARK, TOTAL_CONSTITUENCIES, isV10Year } from '../data/realData';
import { getPartyColor, getMarginLabel, getConfidenceColor, getConfidenceBg } from '../utils/colors';
import { useRecommendation } from '../utils/useRecommendation';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Search } from 'lucide-react';

export const AnalyticsPanel = () => {
  const { selectedYear, activeScenario, searchQuery, setSelectedConstituency, setHoveredConstituency } = useDashboard();

  const currentData = useMemo(() => electionData[selectedYear.toString()] || [], [selectedYear]);
  const baselineData = useMemo(() => {
    if (selectedYear === 2026) return electionData["2021"] || [];
    return currentData;
  }, [selectedYear, currentData]);

  const isV10 = isV10Year(selectedYear);

  const getSimulatedWinner = (c: ConstituencyData) => {
    if (activeScenario === 'D' && c.scenario_D) return c.scenario_D;
    if (activeScenario === 'E' && c.scenario_E) return c.scenario_E;
    if (activeScenario === 'A') return c.scenario_A;
    if (activeScenario === 'B') return c.scenario_B;
    if (activeScenario === 'C') return c.scenario_C;
    return c.actual_winner || c.scenario_C;
  };

  const getSimulatedMargin = (c: ConstituencyData) => {
    if (activeScenario === 'D' && c.scenario_D_margin !== undefined) return c.scenario_D_margin;
    if (activeScenario === 'E' && c.scenario_E_margin !== undefined) return c.scenario_E_margin;
    if (activeScenario === 'A') return c.scenario_A_margin;
    if (activeScenario === 'B') return c.scenario_B_margin;
    if (activeScenario === 'C') return c.scenario_C_margin;
    return c.actual_margin ?? c.scenario_C_margin;
  };

  const stats = useMemo(() => {
    const baselineSeats: Record<string, number> = {};
    const simulatedSeats: Record<string, number> = {};

    baselineData.forEach(c => {
      const w = c.actual_winner || c.scenario_A;
      if (w) baselineSeats[w] = (baselineSeats[w] || 0) + 1;
    });

    currentData.forEach(c => {
      const winner = getSimulatedWinner(c);
      if (winner) simulatedSeats[winner] = (simulatedSeats[winner] || 0) + 1;
    });

    const allParties = new Set([...Object.keys(baselineSeats), ...Object.keys(simulatedSeats)]);
    const chartData = [...allParties].map(party => ({
      name: party,
      seats: simulatedSeats[party] || 0,
      baseline: baselineSeats[party] || 0,
      diff: (simulatedSeats[party] || 0) - (baselineSeats[party] || 0)
    })).sort((a, b) => b.seats - a.seats);

    const incSeats = simulatedSeats['INC'] || 0;
    const incBaseline = baselineSeats['INC'] || 0;
    const incDiff = incSeats - incBaseline;

    const swingSeats = currentData.filter(c => {
      const margin = getSimulatedMargin(c);
      return margin !== null && Math.abs(margin) < 0.10;
    }).length;

    const incStrongholds = currentData.filter(c => c.inc_layer.rho >= 0.5).length;
    const avgConfidence = currentData.reduce((sum, c) => sum + c.constituency_rho, 0) / currentData.length;
    const topParty = chartData[0];

    const pieData = chartData.filter(d => d.seats > 0).map(d => ({
      name: d.name,
      value: d.seats,
      fill: getPartyColor(d.name)
    }));

    // V10 bloc stats
    const dmkBlocSeats = (simulatedSeats['DMK'] || 0) + (simulatedSeats['INC'] || 0) + (simulatedSeats['VCK'] || 0) + (simulatedSeats['CPM'] || 0) + (simulatedSeats['CPI'] || 0);
    const admkBlocSeats = (simulatedSeats['ADMK'] || 0) + (simulatedSeats['BJP'] || 0) + (simulatedSeats['PMK'] || 0);
    const tvkSeats = simulatedSeats['TVK'] || 0;
    const highConfidence = currentData.filter(c => c.scenario_A_confidence === 'high').length;

    // INC vote share stats (scenario-independent — inc_layer is from base model)
    const incAvgShare = currentData.length > 0
      ? currentData.reduce((sum, c) => sum + (c.inc_layer?.mean_share ?? 0), 0) / currentData.length
      : 0;
    const incSeatsWon = simulatedSeats['INC'] || 0;

    return { chartData, incSeats, incBaseline, incDiff, swingSeats, incStrongholds, avgConfidence, topParty, pieData, simulatedSeats, baselineSeats, dmkBlocSeats, admkBlocSeats, tvkSeats, highConfidence, incAvgShare, incSeatsWon };
  }, [baselineData, currentData, activeScenario]);

  // Recommendation — now computed via shared hook (keeps the hidden banner in sync)
  const recommendation = useRecommendation();

  // Filtered swing constituencies
  const swingConstituencies = useMemo(() => {
    return currentData
      .map(c => ({ ...c, margin: getSimulatedMargin(c), winner: getSimulatedWinner(c) }))
      .filter(c => c.margin !== null)
      .filter(c => !searchQuery || c.constituency.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => Math.abs(a.margin!) - Math.abs(b.margin!));
  }, [currentData, activeScenario, searchQuery]);

  return (
    <div className="space-y-4 animate-fade-in">
      {/* KPI Strip */}
      {isV10 ? (
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
          <KPICard
            label="DMK Bloc"
            value={stats.dmkBlocSeats}
            color="text-red-600"
            sub={<span className="text-slate-400">DMK + allies</span>}
            icon={stats.dmkBlocSeats >= MAJORITY_MARK ? <CheckCircle size={14} className="text-emerald-500" /> : <AlertTriangle size={14} className="text-amber-500" />}
          />
          <KPICard
            label="ADMK Bloc"
            value={stats.admkBlocSeats}
            color="text-green-600"
            sub={<span className="text-slate-400">ADMK + allies</span>}
            icon={stats.admkBlocSeats >= MAJORITY_MARK ? <CheckCircle size={14} className="text-emerald-500" /> : <AlertTriangle size={14} className="text-amber-500" />}
          />
          <KPICard
            label="TVK Seats"
            value={stats.tvkSeats}
            color="text-violet-600"
            sub={<span className="text-slate-400">New entrant</span>}
          />
          <KPICard
            label="INC"
            value={stats.incSeatsWon}
            color="text-blue-600"
            sub={<span className="text-blue-400">Avg. {(stats.incAvgShare * 100).toFixed(1)}% share</span>}
            icon={stats.incSeatsWon === 0 ? <AlertTriangle size={14} className="text-red-400" /> : <TrendingUp size={14} className="text-blue-500" />}
          />
          <KPICard
            label="Swing Seats"
            value={stats.swingSeats}
            color="text-amber-600"
            sub={<span className="text-slate-400">Margin &lt; 10%</span>}
            icon={<AlertTriangle size={14} className="text-amber-500" />}
          />
          <KPICard
            label="High Confidence"
            value={stats.highConfidence}
            color="text-slate-700"
            sub={<span className="text-slate-400">of {TOTAL_CONSTITUENCIES}</span>}
            icon={<CheckCircle size={14} className="text-emerald-400" />}
          />
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          <KPICard
            label="INC Seats"
            value={stats.incSeats}
            color="text-blue-600"
            sub={
              <span className={`tabular-nums ${stats.incDiff >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                {stats.incDiff >= 0 ? '▲' : '▼'} {Math.abs(stats.incDiff)} vs {stats.incBaseline}
              </span>
            }
            icon={stats.incDiff >= 0 ? <TrendingUp size={14} className="text-emerald-500" /> : <TrendingDown size={14} className="text-red-500" />}
          />
          <KPICard
            label="Total / Majority"
            value={TOTAL_CONSTITUENCIES}
            color="text-slate-700"
            sub={<span className="text-slate-400">Majority: {MAJORITY_MARK}</span>}
          />
          <KPICard
            label="Swing Seats"
            value={stats.swingSeats}
            color="text-amber-600"
            sub={<span className="text-slate-400">Margin &lt; 10%</span>}
            icon={<AlertTriangle size={14} className="text-amber-500" />}
          />
          <KPICard
            label="INC Strongholds"
            value={stats.incStrongholds}
            color="text-indigo-600"
            sub={<span className="text-slate-400">ρ ≥ 0.50</span>}
          />
          <KPICard
            label="Model Confidence"
            value={`${(stats.avgConfidence * 100).toFixed(0)}%`}
            color="text-slate-700"
            sub={<span className="text-slate-400">Average ρ</span>}
            icon={<CheckCircle size={14} className="text-slate-400" />}
          />
        </div>
      )}

      {/* Strategic Assessment Banner — MOVED TO HEADER (hidden here, code preserved) */}
      <div style={{ display: 'none' }} className={`rounded-xl border p-3.5 flex items-start gap-3 ${
        recommendation.type === 'positive' ? 'bg-emerald-50 border-emerald-200' :
        recommendation.type === 'caution' ? 'bg-amber-50 border-amber-200' :
        recommendation.type === 'negative' ? 'bg-red-50 border-red-200' :
        'bg-slate-50 border-slate-200'
      }`}>
        <div className="text-base mt-0.5">
          {recommendation.type === 'positive' ? '✅' : recommendation.type === 'caution' ? '⚠️' : recommendation.type === 'negative' ? '🔴' : '📊'}
        </div>
        <div className="flex-1 min-w-0">
          <div className={`text-xs font-bold mb-0.5 ${
            recommendation.type === 'positive' ? 'text-emerald-800' :
            recommendation.type === 'caution' ? 'text-amber-800' :
            recommendation.type === 'negative' ? 'text-red-800' :
            'text-slate-600'
          }`}>Strategic Assessment</div>
          <div className={`text-xs ${
            recommendation.type === 'positive' ? 'text-emerald-700' :
            recommendation.type === 'caution' ? 'text-amber-700' :
            recommendation.type === 'negative' ? 'text-red-700' :
            'text-slate-500'
          }`}>{recommendation.text}</div>
        </div>
      </div>

      {/* Charts row — HIDDEN (non-destructive: set display:none, code preserved) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4" style={{ display: 'none' }}>
        {/* Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-4">
          <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-3">Projected Seat Distribution</h3>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.chartData.filter(d => d.seats > 0)} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <Tooltip
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgb(0 0 0 / 0.05)', fontSize: '11px', padding: '8px 12px' }}
                  formatter={(value: number, name: string) => [value, name === 'seats' ? 'Projected' : 'Baseline']}
                />
                <Bar dataKey="baseline" radius={[2, 2, 0, 0]} opacity={0.2} name="baseline">
                  {stats.chartData.filter(d => d.seats > 0).map((entry, i) => (
                    <Cell key={`bl-${i}`} fill={getPartyColor(entry.name)} />
                  ))}
                </Bar>
                <Bar dataKey="seats" radius={[4, 4, 0, 0]} name="seats">
                  {stats.chartData.filter(d => d.seats > 0).map((entry, i) => (
                    <Cell key={`cell-${i}`} fill={getPartyColor(entry.name)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut Chart */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
          <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-3">Seat Share</h3>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {stats.pieData.map((entry, i) => (
                    <Cell key={`pie-${i}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgb(0 0 0 / 0.05)', fontSize: '11px' }}
                  formatter={(value: number, name: string) => [`${value} seats`, name]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Inline legend */}
          <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 justify-center">
            {stats.pieData.slice(0, 6).map(d => (
              <div key={d.name} className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: d.fill }} />
                <span className="text-[9px] text-slate-500">{d.name}</span>
                <span className="text-[9px] text-slate-400 tabular-nums">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Constituency Table — HIDDEN (non-destructive: set display:none, code preserved) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden" style={{ display: 'none' }}>
        <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Constituencies by Margin <span className="text-slate-400 font-normal">({swingConstituencies.length})</span>
          </h3>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Filter..."
                className="pl-7 pr-2 py-1 text-[10px] bg-slate-50 border border-slate-200 rounded-md w-32 focus:outline-none focus:ring-1 focus:ring-blue-300 placeholder:text-slate-400"
                value={searchQuery}
                onChange={() => {}} // Uses the global searchQuery from header
                disabled
              />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto max-h-[360px] overflow-y-auto">
          <table className="w-full text-[11px]">
            <thead className="sticky top-0 bg-slate-50 z-10">
              <tr>
                <th className="text-left py-2 px-3 font-semibold text-slate-400 uppercase tracking-wider text-[10px]">Constituency</th>
                <th className="text-left py-2 px-3 font-semibold text-slate-400 uppercase tracking-wider text-[10px]">Winner</th>
                <th className="text-right py-2 px-3 font-semibold text-slate-400 uppercase tracking-wider text-[10px]">Margin</th>
                <th className="text-center py-2 px-3 font-semibold text-slate-400 uppercase tracking-wider text-[10px]">Intensity</th>
                {isV10 && <th className="text-center py-2 px-3 font-semibold text-slate-400 uppercase tracking-wider text-[10px]">Confidence</th>}
                <th className="text-right py-2 px-3 font-semibold text-slate-400 uppercase tracking-wider text-[10px]">{isV10 ? 'DMK Bloc (A)' : 'INC Share'}</th>
                <th className="text-right py-2 px-3 font-semibold text-slate-400 uppercase tracking-wider text-[10px]">ρ</th>
              </tr>
            </thead>
            <tbody>
              {swingConstituencies.slice(0, 30).map(c => (
                <tr
                  key={c.constituency}
                  className="data-row border-b border-slate-50 cursor-pointer"
                  onClick={() => setSelectedConstituency(c.constituency)}
                  onMouseEnter={() => setHoveredConstituency(c.constituency)}
                  onMouseLeave={() => setHoveredConstituency(null)}
                >
                  <td className="py-2 px-3 font-medium text-slate-700">{c.constituency}</td>
                  <td className="py-2 px-3">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: getPartyColor(c.winner) }} />
                      <span className="font-medium" style={{ color: getPartyColor(c.winner) }}>{c.winner}</span>
                    </span>
                  </td>
                  <td className="py-2 px-3 text-right tabular-nums font-medium">{(Math.abs(c.margin!) * 100).toFixed(1)}%</td>
                  <td className="py-2 px-3 text-center">
                    <span className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-semibold ${
                      Math.abs(c.margin!) < 0.05 ? 'bg-red-50 text-red-600' :
                      Math.abs(c.margin!) < 0.10 ? 'bg-amber-50 text-amber-600' :
                      'bg-green-50 text-green-600'
                    }`}>
                      {getMarginLabel(c.margin!)}
                    </span>
                  </td>
                  {isV10 && (
                    <td className="py-2 px-3 text-center">
                      {c.scenario_A_confidence && (
                        <span className="inline-block px-1.5 py-0.5 rounded text-[9px] font-semibold"
                          style={{ backgroundColor: getConfidenceBg(c.scenario_A_confidence), color: getConfidenceColor(c.scenario_A_confidence) }}>
                          {c.scenario_A_confidence}
                        </span>
                      )}
                    </td>
                  )}
                  <td className="py-2 px-3 text-right tabular-nums text-blue-600">
                    {isV10 && c.scenario_A_dmk_bloc !== undefined
                      ? `${(c.scenario_A_dmk_bloc * 100).toFixed(1)}%`
                      : `${(c.inc_layer.mean_share * 100).toFixed(1)}%`
                    }
                  </td>
                  <td className="py-2 px-3 text-right tabular-nums text-slate-500">{(c.constituency_rho * 100).toFixed(0)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {swingConstituencies.length > 30 && (
          <div className="px-4 py-2 border-t border-slate-100 text-center">
            <span className="text-[10px] text-slate-400">Showing top 30 of {swingConstituencies.length} constituencies</span>
          </div>
        )}
      </div>
    </div>
  );
};

/* Reusable KPI Card */
const KPICard: React.FC<{
  label: string;
  value: string | number;
  color: string;
  sub: React.ReactNode;
  icon?: React.ReactNode;
}> = ({ label, value, color, sub, icon }) => (
  <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-3 card-hover">
    <div className="flex items-center justify-between mb-1">
      <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">{label}</span>
      {icon}
    </div>
    <div className={`text-xl font-bold tabular-nums ${color}`}>{value}</div>
    <div className="text-[11px] mt-0.5">{sub}</div>
  </div>
);


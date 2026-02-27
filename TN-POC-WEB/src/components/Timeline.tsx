import React, { useMemo } from 'react';
import { useDashboard } from '../store/DashboardContext';
import { electionData, ConstituencyData, ALL_PARTIES } from '../data/realData';
import { getPartyColor } from '../utils/colors';
import { Filter, X } from 'lucide-react';

/**
 * PartyFilterBar: Horizontal chip-based party filter 
 * Shows seat counts per party for the current year/scenario.
 * Clicking a party chip filters the map to highlight only that party's seats.
 */
export const PartyFilterBar = () => {
  const { selectedYear, activeScenario, partyFilter, setPartyFilter } = useDashboard();

  const currentData = useMemo(() => electionData[selectedYear.toString()] || [], [selectedYear]);

  const getWinner = (c: ConstituencyData): string | null => {
    if (activeScenario === 'D' && c.scenario_D) return c.scenario_D;
    if (activeScenario === 'E' && c.scenario_E) return c.scenario_E;
    if (activeScenario === 'A') return c.scenario_A;
    if (activeScenario === 'B') return c.scenario_B;
    if (activeScenario === 'C') return c.scenario_C;
    return c.actual_winner || c.scenario_C;
  };

  // Compute seat tally
  const partySeats = useMemo(() => {
    const tally: Record<string, number> = {};
    currentData.forEach(c => {
      const winner = getWinner(c);
      if (winner) {
        tally[winner] = (tally[winner] || 0) + 1;
      }
    });
    return tally;
  }, [currentData, activeScenario]);

  // Sort parties by seat count
  const sortedParties = useMemo(() => {
    return ALL_PARTIES
      .filter(p => (partySeats[p] || 0) > 0)
      .sort((a, b) => (partySeats[b] || 0) - (partySeats[a] || 0));
  }, [partySeats]);

  const toggleParty = (party: string) => {
    if (partyFilter.includes(party)) {
      setPartyFilter(partyFilter.filter(p => p !== party));
    } else {
      setPartyFilter([...partyFilter, party]);
    }
  };

  const clearFilter = () => setPartyFilter([]);

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-0.5 scrollbar-none">
      <div className="flex items-center gap-1.5 text-slate-400 shrink-0">
        <Filter size={13} />
        <span className="text-[11px] font-semibold uppercase tracking-wider">Party</span>
      </div>
      
      <div className="flex items-center gap-1.5">
        {sortedParties.map(party => {
          const isActive = partyFilter.length === 0 || partyFilter.includes(party);
          const seats = partySeats[party] || 0;
          return (
            <button
              key={party}
              onClick={() => toggleParty(party)}
              className={`party-chip flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-all whitespace-nowrap ${
                isActive 
                  ? 'text-white border-transparent shadow-sm' 
                  : 'bg-white text-slate-400 border-slate-200 opacity-40'
              }`}
              style={isActive ? { backgroundColor: getPartyColor(party) } : {}}
            >
              {!isActive && (
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: getPartyColor(party) }} />
              )}
              {party}
              <span className={`tabular-nums text-[11px] ${isActive ? 'text-white/80' : 'text-slate-400'}`}>
                {seats}
              </span>
            </button>
          );
        })}
      </div>

      {partyFilter.length > 0 && (
        <button
          onClick={clearFilter}
          className="flex items-center gap-1 px-2 py-1 text-[11px] font-medium text-slate-400 hover:text-red-500 transition-colors shrink-0"
        >
          <X size={11} />
          Clear
        </button>
      )}
    </div>
  );
};

// Keep default export for backward compat
export const Timeline = PartyFilterBar;


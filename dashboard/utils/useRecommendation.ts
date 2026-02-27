import { useMemo } from 'react';
import { useDashboard } from '../store/DashboardContext';
import { electionData, ConstituencyData, MAJORITY_MARK, isV10Year } from '../data/realData';

export type RecommendationType = 'positive' | 'caution' | 'negative' | 'neutral';

export interface Recommendation {
  text: string;
  type: RecommendationType;
  allianceSeats?: number;
}

/**
 * Shared hook: computes the Strategic Assessment recommendation
 * based on current year, scenario, and data.
 * Used by both Header (compact banner) and AnalyticsPanel.
 */
export function useRecommendation(): Recommendation {
  const { selectedYear, activeScenario } = useDashboard();

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

  return useMemo(() => {
    if (activeScenario === 'NONE') {
      return { text: 'Select an alliance scenario to view strategic projections', type: 'neutral' as const };
    }

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

    const incSeats = simulatedSeats['INC'] || 0;
    const incTvkSeats = simulatedSeats['INC+TVK'] || 0;
    const totalIncSide = incSeats + incTvkSeats;
    const tvkSeats = simulatedSeats['TVK'] || 0;
    const highConfidence = currentData.filter(c => c.scenario_A_confidence === 'high').length;

    // Bloc calculations are scenario-aware: INC's alliance shifts between scenarios
    const dmkAllySeats = (simulatedSeats['VCK'] || 0) + (simulatedSeats['CPM'] || 0) + (simulatedSeats['CPI'] || 0) + (simulatedSeats['MDMK'] || 0);
    const admkAllySeats = (simulatedSeats['BJP'] || 0) + (simulatedSeats['PMK'] || 0);
    const dmkBase = (simulatedSeats['DMK'] || 0) + dmkAllySeats;
    const admkBase = (simulatedSeats['ADMK'] || 0) + admkAllySeats;

    // In A: INC is in DMK bloc. In C: INC is solo. In D: INC+INC+TVK is in TVK bloc. In E: INC is in ADMK bloc.
    const dmkBlocSeats = activeScenario === 'A' || activeScenario === 'E' ? dmkBase + (activeScenario === 'A' ? incSeats : 0) : dmkBase;
    const admkBlocSeats = activeScenario === 'E' ? admkBase + incSeats : admkBase;

    if (isV10) {
      const dmk = dmkBlocSeats;
      const admk = admkBlocSeats;
      const tvk = tvkSeats;

      if (activeScenario === 'A') {
        return {
          text: `INC + DMK Alliance: INC secures ${incSeats} seats within DMK bloc (${dmk} total, ${dmk >= MAJORITY_MARK ? 'majority' : 'short'}). ADMK bloc at ${admk}. ${highConfidence} high-confidence seats. Strongest combined bloc for INC.`,
          type: dmk >= MAJORITY_MARK ? 'positive' as const : 'caution' as const,
          allianceSeats: dmk,
        };
      }
      if (activeScenario === 'C') {
        return {
          text: `INC Independent: Without a major ally, INC wins only ${incSeats} seats. DMK at ${simulatedSeats['DMK'] || 0}, ADMK bloc surges to ${admk}. Going solo is electorally unviable for INC.`,
          type: 'negative' as const,
          allianceSeats: incSeats,
        };
      }
      if (activeScenario === 'D') {
        const tvkIncBloc = totalIncSide + tvk;
        return {
          text: `INC + TVK Alliance: INC wins ${incSeats} seats outright, ${incTvkSeats} as INC+TVK combined (${totalIncSide} total for INC side). TVK adds ${tvk}. Combined bloc: ${tvkIncBloc}. DMK still dominates at ${simulatedSeats['DMK'] || 0}.`,
          type: totalIncSide > 23 ? 'caution' as const : 'negative' as const,
          allianceSeats: tvkIncBloc,
        };
      }
      if (activeScenario === 'E') {
        const admkIncBloc = admk + incSeats;
        return {
          text: `INC + ADMK Alliance: INC holds ${incSeats} seats within ADMK bloc (${admkIncBloc} combined). DMK at ${simulatedSeats['DMK'] || 0}. ADMK consolidation + INC base creates viable opposition, but still ${MAJORITY_MARK - admkIncBloc > 0 ? (MAJORITY_MARK - admkIncBloc) + ' short of majority' : 'near majority'}.`,
          type: admkIncBloc >= MAJORITY_MARK ? 'positive' as const : 'caution' as const,
          allianceSeats: admkIncBloc,
        };
      }
    }

    // V8 year — INC-centric narrative
    const incBaseline = baselineSeats['INC'] || 0;
    const incDiff = incSeats - incBaseline;
    const totalAllianceSeats = activeScenario === 'A'
      ? (simulatedSeats['DMK'] || 0) + incSeats + (simulatedSeats['VCK'] || 0) + (simulatedSeats['CPM'] || 0) + (simulatedSeats['CPI'] || 0)
      : activeScenario === 'B'
      ? (simulatedSeats['ADMK'] || 0) + incSeats + (simulatedSeats['PMK'] || 0) + (simulatedSeats['BJP'] || 0)
      : incSeats;

    const hasMajority = totalAllianceSeats >= MAJORITY_MARK;

    if (activeScenario === 'A') {
      return {
        text: hasMajority
          ? `DMK-INC alliance projects ${totalAllianceSeats} seats — comfortable majority. INC secures ${incSeats} seats (${incDiff >= 0 ? '+' : ''}${incDiff} vs baseline).`
          : `DMK-INC alliance projects ${totalAllianceSeats} seats — short of ${MAJORITY_MARK} majority. Coalition expansion needed.`,
        type: hasMajority ? 'positive' as const : 'caution' as const,
        allianceSeats: totalAllianceSeats,
      };
    }
    if (activeScenario === 'B') {
      return {
        text: hasMajority
          ? `ADMK-INC alliance projects ${totalAllianceSeats} seats — crosses majority. INC gets ${incSeats} seats.`
          : `ADMK-INC front projects ${totalAllianceSeats} seats — below majority. INC wins ${incSeats} seats.`,
        type: hasMajority ? 'positive' as const : 'caution' as const,
        allianceSeats: totalAllianceSeats,
      };
    }
    return {
      text: `Third Front projects ${incSeats} INC seats. Without major ally, reaching ${MAJORITY_MARK} is ${totalAllianceSeats >= MAJORITY_MARK ? 'possible' : 'challenging'}.`,
      type: totalAllianceSeats >= 80 ? 'caution' as const : 'negative' as const,
      allianceSeats: totalAllianceSeats,
    };
  }, [activeScenario, currentData, baselineData, isV10]);
}

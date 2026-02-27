/**
 * Real PFT Election Data Module — V8 + V10 Unified
 * 
 * V8 data: 2011, 2016, 2021 (historical+hindcast) and 2026 (legacy forecast)
 *   Scenarios: A (INC+DMK), B (INC+ADMK), C (INC Third Front)
 * 
 * V10 data: 2026 only (final 4-party forecast — DMK, ADMK, TVK, BJP)
 *   Scenarios: A (INC+DMK), C (INC Independent), D (INC+TVK), E (INC+ADMK)
 *   Extra fields: confidence, bloc shares, tvk/ntk, region, tvk_zone, crystallization_gap, etc.
 */

import v8AllData from '../../actual_data/pft_v8_all_predictions.json';
import v10FinalData from '../../actual_data/pft_v10_2026_final.json';

export interface ConstituencyData {
  constituency: string;
  actual_winner: string | null;
  actual_margin: number | null;
  scenario_A: string;
  scenario_A_margin: number;
  scenario_A_alliance: string;
  scenario_B: string;
  scenario_B_margin: number;
  scenario_B_alliance: string;
  scenario_C: string;
  scenario_C_margin: number;
  scenario_C_alliance: string;
  inc_layer: {
    rho: number;
    mean_share: number;
  };
  constituency_rho: number;

  // ── V10-only fields (optional — only present for 2026) ──
  ls_parent?: string;
  region?: string;
  tvk_zone?: string;
  scenario_A_confidence?: string;
  scenario_A_dmk_bloc?: number;
  scenario_A_admk_bloc?: number;
  scenario_A_tvk?: number;
  scenario_A_ntk?: number;
  scenario_D?: string;
  scenario_D_margin?: number;
  scenario_D_alliance?: string;
  scenario_E?: string;
  scenario_E_margin?: number;
  scenario_E_alliance?: string;
  dmk_rho?: number;
  admk_rho?: number;
  dmk_drho?: number;
  admk_drho?: number;
  crystallization_gap?: number;
  dmk_proj_share?: number;
  admk_proj_share?: number;
  admk_susceptibility?: number;
  tvk_concentration?: string;
}

export type YearData = Record<string, ConstituencyData[]>;

// Build unified electionData: V8 for historical, V10 for 2026
const v8Typed = v8AllData as unknown as YearData;

// Map V10 records → ConstituencyData (fill in required V8 fields with defaults)
const v10As2026: ConstituencyData[] = (v10FinalData as any[]).map((r: any) => ({
  constituency: r.constituency,
  actual_winner: null,
  actual_margin: null,
  scenario_A: r.scenario_A,
  scenario_A_margin: r.scenario_A_margin,
  scenario_A_alliance: r.scenario_A_alliance,
  // V10 has no scenario_B — fill with scenario_C as fallback
  scenario_B: r.scenario_C,
  scenario_B_margin: r.scenario_C_margin,
  scenario_B_alliance: r.scenario_C_alliance,
  scenario_C: r.scenario_C,
  scenario_C_margin: r.scenario_C_margin,
  scenario_C_alliance: r.scenario_C_alliance,
  inc_layer: r.inc_layer || { rho: 0, mean_share: 0 },
  constituency_rho: r.constituency_rho || 0,
  // V10 extra fields
  ls_parent: r.ls_parent,
  region: r.region,
  tvk_zone: r.tvk_zone,
  scenario_A_confidence: r.scenario_A_confidence,
  scenario_A_dmk_bloc: r.scenario_A_dmk_bloc,
  scenario_A_admk_bloc: r.scenario_A_admk_bloc,
  scenario_A_tvk: r.scenario_A_tvk,
  scenario_A_ntk: r.scenario_A_ntk,
  scenario_D: r.scenario_D,
  scenario_D_margin: r.scenario_D_margin,
  scenario_D_alliance: r.scenario_D_alliance,
  scenario_E: r.scenario_E,
  scenario_E_margin: r.scenario_E_margin,
  scenario_E_alliance: r.scenario_E_alliance,
  dmk_rho: r.dmk_rho,
  admk_rho: r.admk_rho,
  dmk_drho: r.dmk_drho,
  admk_drho: r.admk_drho,
  crystallization_gap: r.crystallization_gap,
  dmk_proj_share: r.dmk_proj_share,
  admk_proj_share: r.admk_proj_share,
  admk_susceptibility: r.admk_susceptibility,
  tvk_concentration: r.tvk_concentration,
})).map((c: ConstituencyData) => {
  // ── Scenario D: INC+TVK alliance seats — INC wins ONLY where INC share > all opponents ──
  if (c.scenario_D === 'TVK' && c.inc_layer.mean_share > (c.scenario_A_tvk ?? 0)) {
    const maxOpponent = Math.max(c.dmk_proj_share ?? 0, c.admk_proj_share ?? 0);
    if (c.inc_layer.mean_share > maxOpponent) {
      // INC share beats DMK AND ADMK — genuine INC solo win
      c.scenario_D = 'INC';
    } else {
      // INC+TVK combined beats opponents, but INC alone doesn't — joint win
      c.scenario_D = 'INC+TVK';
    }
    c.scenario_D_alliance = 'INC+TVK';
  } else if (c.scenario_D === 'TVK') {
    c.scenario_D_alliance = 'INC+TVK';
  }
  // ── Scenario E reframe: INC-won seats move from DMK alliance to ADMK alliance ──
  if (c.scenario_E === 'INC' && c.scenario_E_alliance === 'DMK') {
    c.scenario_E_alliance = 'ADMK';
  }
  return c;
});

export const electionData: YearData = {
  "2011": v8Typed["2011"],
  "2016": v8Typed["2016"],
  "2021": v8Typed["2021"],
  "2026": v10As2026,
};

// All unique parties (includes TVK for V10)
export const ALL_PARTIES = [
  "DMK", "ADMK", "INC", "BJP", "TVK", "PMK", "DMDK", "VCK", 
  "CPM", "CPI", "NTK", "MDMK", "MNMK", "IUML", "PT", "AIFB"
];

// Major parties for 2026 V10 (4-party focus)
export const MAJOR_PARTIES_2026 = ["DMK", "ADMK", "TVK", "BJP"];

// Parties available for alliance building with INC (V8 years only)
export const ALLIANCE_PARTIES = ["DMK", "ADMK", "BJP", "PMK", "VCK", "CPM", "CPI", "MDMK", "NTK"];

// Total constituencies in Tamil Nadu
export const TOTAL_CONSTITUENCIES = 234;
export const MAJORITY_MARK = 118;

// Available election years
export const ELECTION_YEARS = [2011, 2016, 2021, 2026];

/**
 * Check if a year uses V10 data (only 2026)
 */
export const isV10Year = (year: number): boolean => year === 2026;

/**
 * Scenario metadata for V10 (2026)
 */
export const SCENARIO_META: Record<string, { label: string; desc: string; color: string }> = {
  A: { label: 'INC + DMK', desc: 'INC stays with DMK — status quo alliance, strongest combined bloc', color: 'border-red-200 bg-red-50 text-red-700 hover:bg-red-100' },
  C: { label: 'INC Independent', desc: 'INC goes solo / third front — no major alliance partner', color: 'border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100' },
  D: { label: 'INC + TVK', desc: 'INC allies with TVK — combined youth + base vote challenge', color: 'border-violet-200 bg-violet-50 text-violet-700 hover:bg-violet-100' },
  E: { label: 'INC + ADMK', desc: 'INC switches to ADMK bloc — opposition consolidation play', color: 'border-green-200 bg-green-50 text-green-700 hover:bg-green-100' },
};

/**
 * Compute seat tally for a given year and scenario
 */
export function computeSeatTally(
  year: string, 
  getWinner: (c: ConstituencyData) => string | null
): Record<string, number> {
  const data = electionData[year] || [];
  const tally: Record<string, number> = {};
  data.forEach(c => {
    const winner = getWinner(c);
    if (winner) {
      tally[winner] = (tally[winner] || 0) + 1;
    }
  });
  return tally;
}

/**
 * Compute swing analysis between two seat tallies
 */
export function computeSwing(
  baseline: Record<string, number>,
  projected: Record<string, number>
): Record<string, number> {
  const allParties = new Set([...Object.keys(baseline), ...Object.keys(projected)]);
  const swing: Record<string, number> = {};
  allParties.forEach(party => {
    swing[party] = (projected[party] || 0) - (baseline[party] || 0);
  });
  return swing;
}

/**
 * Get competitive constituencies (margin < threshold)
 */
export function getSwingConstituencies(
  year: string,
  scenario: 'A' | 'B' | 'C' | 'D' | 'E',
  marginThreshold: number = 0.15
): ConstituencyData[] {
  const data = electionData[year] || [];
  return data.filter(c => {
    let margin: number;
    if (scenario === 'D' && c.scenario_D_margin !== undefined) margin = c.scenario_D_margin;
    else if (scenario === 'E' && c.scenario_E_margin !== undefined) margin = c.scenario_E_margin;
    else if (scenario === 'A') margin = c.scenario_A_margin;
    else if (scenario === 'B') margin = c.scenario_B_margin;
    else margin = c.scenario_C_margin;
    return Math.abs(margin) < marginThreshold;
  });
}

/**
 * Get INC stronghold constituencies based on inc_layer data
 */
export function getINCStrongholds(year: string, rhoThreshold: number = 0.5): ConstituencyData[] {
  const data = electionData[year] || [];
  return data.filter(c => c.inc_layer.rho >= rhoThreshold)
    .sort((a, b) => b.inc_layer.mean_share - a.inc_layer.mean_share);
}

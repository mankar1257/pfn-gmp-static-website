import { createContext, useContext, useState, useMemo, useCallback, ReactNode } from 'react';

/**
 * Alliance scenarios:
 * V8 (2011-2021): A = INC+DMK, B = INC+ADMK, C = INC Third Front
 * V10 (2026): A = INC+DMK, C = INC Independent, D = INC+TVK, E = INC+ADMK
 * NONE = No alliance selected — shows baseline/actual
 */
export type AllianceScenario = 'A' | 'B' | 'C' | 'D' | 'E' | 'NONE';

/**
 * Map coloring modes:
 * party    = Color by winning party (default)
 * heatmap  = Vote share heatmap (INC share for V8, DMK bloc for V10)
 * margin   = Margin intensity (tight vs comfortable wins)
 * tvk      = TVK vote concentration (V10/2026 only)
 * crystal  = Crystallization gap (V10/2026 only)
 */
export type ViewMode = 'party' | 'heatmap' | 'margin' | 'tvk' | 'crystal';

/**
 * Heatmap sub-mode:
 * all = Party-tinted vote share (winner hue, intensity = vote share)
 * inc = INC-specific blue gradient heatmap (inc_layer.mean_share)
 */
export type HeatmapSubMode = 'all' | 'inc';

interface DashboardState {
  // Year & mode
  selectedYear: number;
  setSelectedYear: (year: number) => void;
  isForecastMode: boolean;
  setIsForecastMode: (mode: boolean) => void;

  // Alliance builder
  alliances: string[];
  setAlliances: (alliances: string[]) => void;
  activeScenario: AllianceScenario;
  setActiveScenario: (s: AllianceScenario) => void;

  // Map interaction
  hoveredConstituency: string | null;
  setHoveredConstituency: (c: string | null) => void;
  selectedConstituency: string | null;
  setSelectedConstituency: (c: string | null) => void;

  // View controls
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  heatmapSubMode: HeatmapSubMode;
  setHeatmapSubMode: (mode: HeatmapSubMode) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  partyFilter: string[];
  setPartyFilter: (parties: string[]) => void;

  // Comparison mode
  showComparison: boolean;
  setShowComparison: (show: boolean) => void;

  // 2021 baseline expandable
  show2021Baseline: boolean;
  setShow2021Baseline: (show: boolean) => void;
}

const DashboardContext = createContext<DashboardState | undefined>(undefined);

/**
 * V8 scenario derivation from alliance builder parties (used for 2011-2021 only)
 */
function deriveV8Scenario(alliances: string[]): AllianceScenario {
  if (alliances.length === 0) return 'NONE';
  const hasDMK = alliances.includes('DMK');
  const hasADMK = alliances.includes('ADMK');
  if (hasDMK) return 'A';
  if (hasADMK) return 'B';
  return 'C';
}

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [isForecastMode, setIsForecastMode] = useState<boolean>(true);
  const [alliances, setAlliances] = useState<string[]>([]);
  const [directScenario, setDirectScenario] = useState<AllianceScenario>('A');
  const [hoveredConstituency, setHoveredConstituency] = useState<string | null>(null);
  const [selectedConstituency, setSelectedConstituency] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('party');
  const [heatmapSubMode, setHeatmapSubMode] = useState<HeatmapSubMode>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [partyFilter, setPartyFilter] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState<boolean>(false);
  const [show2021Baseline, setShow2021Baseline] = useState<boolean>(false);

  // For 2026 (V10), scenario is set directly via preset cards.
  // For historical years, it's derived from the alliance builder.
  const activeScenario = useMemo(() => {
    if (selectedYear === 2026) return directScenario;
    return deriveV8Scenario(alliances);
  }, [selectedYear, directScenario, alliances]);

  const setActiveScenario = useCallback((s: AllianceScenario) => {
    if (selectedYear === 2026) {
      setDirectScenario(s);
    } else {
      // For V8, map scenario back to alliances
      if (s === 'A') setAlliances(['DMK']);
      else if (s === 'B') setAlliances(['ADMK']);
      else if (s === 'C') setAlliances([]);
      else setAlliances([]);
    }
  }, [selectedYear]);

  return (
    <DashboardContext.Provider value={{
      selectedYear, setSelectedYear,
      isForecastMode, setIsForecastMode,
      alliances, setAlliances,
      hoveredConstituency, setHoveredConstituency,
      selectedConstituency, setSelectedConstituency,
      activeScenario, setActiveScenario,
      viewMode, setViewMode,
      heatmapSubMode, setHeatmapSubMode,
      searchQuery, setSearchQuery,
      partyFilter, setPartyFilter,
      showComparison, setShowComparison,
      show2021Baseline, setShow2021Baseline,
    }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) throw new Error('useDashboard must be used within DashboardProvider');
  return context;
};

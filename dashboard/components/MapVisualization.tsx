import React, { useRef, useEffect, useMemo, useCallback, useState } from 'react';
import * as d3 from 'd3';
import { useDashboard } from '../store/DashboardContext';
import { electionData, ConstituencyData, isV10Year } from '../data/realData';
import { getPartyColor, getHeatmapColor, getMarginColor, getMarginLabel, getPartyTintedColor, getConfidenceColor, getConfidenceBg, PARTY_FULL_NAMES } from '../utils/colors';
import tnGeoJson from '../data/tn_constituencies.json';
import { ZoomIn, ZoomOut, Maximize2, ChevronLeft, ChevronRight, GripHorizontal } from 'lucide-react';

// Chennai district constituencies (approximate — constituencies within Chennai metro)
const CHENNAI_CONSTITUENCIES = [
  "Villivakkam", "Thiru-Vi-Ka-Nagar", "Egmore", "Royapuram",
  "Harbour", "Chepauk-Thiruvallikeni", "Thousand Lights",
  "Anna Nagar", "Virugambakkam", "Saidapet", "T.Nagar",
  "Mylapore", "Velachery", "Sholinganallur", "Alandur",
  "Sriperumbudur", "Pallavaram", "Tambaram",
  "Perambur", "Kolathur", "Madhavaram",
  "Ambattur", "Avadi", "Maduravoyal", "Dr.Radhakrishnan Nagar"
];

const dataByName = (data: ConstituencyData[]): Record<string, ConstituencyData> => {
  const map: Record<string, ConstituencyData> = {};
  data.forEach(c => { map[c.constituency] = c; });
  return map;
};

// Pre-filter Chennai features from GeoJSON (module-level, computed once)
const CHENNAI_FEATURES = (tnGeoJson as any).features.filter(
  (f: any) => CHENNAI_CONSTITUENCIES.includes(f.properties.name)
);
const CHENNAI_FC: GeoJSON.FeatureCollection = { type: 'FeatureCollection', features: CHENNAI_FEATURES };

// Chennai inset overlay dimensions (standalone HTML overlay, not inside main SVG)
const INSET_W = 190;    // overlay width in px
const INSET_H = 220;    // overlay height in px
const INSET_PAD = 8;    // padding inside

// Chennai inset projection: fitted to a standalone SVG (0,0 origin, header is outside SVG)
const chennaiProjection = (() => {
  const proj = d3.geoMercator();
  proj.fitExtent(
    [[INSET_PAD, INSET_PAD], [INSET_W - INSET_PAD, INSET_H - 24 - INSET_PAD]],
    CHENNAI_FC as any
  );
  return proj;
})();
const chennaiPathGen = d3.geoPath().projection(chennaiProjection);

export const MapVisualization = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const gRef = useRef<SVGGElement | null>(null);
  const zoomRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);
  const chennaiSvgRef = useRef<SVGSVGElement>(null);

  // Chennai inset drag position — null means "not yet positioned, use CSS right:8"
  const [insetPos, setInsetPos] = useState<{ left: number; top: number } | null>(null);
  const dragRef = useRef<{ startX: number; startY: number; origLeft: number; origTop: number } | null>(null);

  const handleInsetDragStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const containerEl = containerRef.current;
    if (!containerEl) return;
    const containerRect = containerEl.getBoundingClientRect();
    // If never dragged, compute left from right:8 default
    const origLeft = insetPos ? insetPos.left : containerRect.width - INSET_W - 8;
    const origTop = insetPos ? insetPos.top : 8;

    dragRef.current = { startX: e.clientX, startY: e.clientY, origLeft, origTop };
    const handleMove = (ev: MouseEvent) => {
      if (!dragRef.current) return;
      const newLeft = dragRef.current.origLeft + (ev.clientX - dragRef.current.startX);
      const newTop = dragRef.current.origTop + (ev.clientY - dragRef.current.startY);
      setInsetPos({ left: Math.max(0, newLeft), top: Math.max(0, newTop) });
    };
    const handleUp = () => {
      dragRef.current = null;
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
    };
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);
  }, [insetPos]);

  const {
    selectedYear, isForecastMode, activeScenario,
    hoveredConstituency, setHoveredConstituency,
    selectedConstituency, setSelectedConstituency,
    viewMode, heatmapSubMode, searchQuery, partyFilter,
    show2021Baseline, setShow2021Baseline,
  } = useDashboard();

  const currentData = useMemo(() => electionData[selectedYear.toString()] || [], [selectedYear]);
  const baselineData = useMemo(() => {
    if (selectedYear === 2026) return electionData["2021"] || [];
    return currentData;
  }, [selectedYear, currentData]);

  const lookup = useMemo(() => dataByName(currentData), [currentData]);
  const baselineLookup = useMemo(() => dataByName(baselineData), [baselineData]);

  const getWinner = useCallback((c: ConstituencyData): string | null => {
    if (activeScenario === 'D' && c.scenario_D) return c.scenario_D;
    if (activeScenario === 'E' && c.scenario_E) return c.scenario_E;
    if (activeScenario === 'A') return c.scenario_A;
    if (activeScenario === 'B') return c.scenario_B;
    if (activeScenario === 'C') return c.scenario_C;
    return c.actual_winner || c.scenario_C;
  }, [activeScenario]);

  const getMargin = useCallback((c: ConstituencyData): number | null => {
    if (activeScenario === 'D' && c.scenario_D_margin !== undefined) return c.scenario_D_margin;
    if (activeScenario === 'E' && c.scenario_E_margin !== undefined) return c.scenario_E_margin;
    if (activeScenario === 'A') return c.scenario_A_margin;
    if (activeScenario === 'B') return c.scenario_B_margin;
    if (activeScenario === 'C') return c.scenario_C_margin;
    return c.actual_margin ?? c.scenario_C_margin;
  }, [activeScenario]);

  const getAlliance = useCallback((c: ConstituencyData): string | null => {
    if (activeScenario === 'D' && c.scenario_D_alliance) return c.scenario_D_alliance;
    if (activeScenario === 'E' && c.scenario_E_alliance) return c.scenario_E_alliance;
    if (activeScenario === 'A') return c.scenario_A_alliance;
    if (activeScenario === 'B') return c.scenario_B_alliance;
    if (activeScenario === 'C') return c.scenario_C_alliance;
    return null;
  }, [activeScenario]);

  // Compute fill color based on view mode
  const getFillColor = useCallback((cData: ConstituencyData | undefined, name: string): string => {
    if (!cData) return '#f1f5f9';

    // Search highlighting
    if (searchQuery && !name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return '#f1f5f9';
    }

    // Party filter dimming
    const winner = getWinner(cData);
    if (partyFilter.length > 0 && winner && !partyFilter.includes(winner)) {
      return '#f1f5f9';
    }

    switch (viewMode) {
      case 'heatmap': {
        if (heatmapSubMode === 'inc') {
          // INC-specific blue gradient: white (0%) → deep blue (40%+)
          return getHeatmapColor(cData.inc_layer.mean_share);
        }
        // All parties: tint by winner, intensity = winner's projected vote share
        // Use the appropriate projected share based on winner party
        const projShare = winner === 'DMK' || winner === 'INC' || winner === 'VCK' || winner === 'CPM' || winner === 'CPI' || winner === 'MDMK'
          ? (cData.dmk_proj_share ?? cData.scenario_A_dmk_bloc ?? 0.3)
          : winner === 'TVK'
            ? (cData.scenario_A_tvk ?? 0.15)
            : (cData.admk_proj_share ?? cData.scenario_A_admk_bloc ?? 0.3);
        const intensity = Math.min(1, projShare / 0.55); // normalize: 0.55 → full color
        return getPartyTintedColor(winner, intensity);
      }
      case 'margin': {
        const margin = getMargin(cData);
        return margin !== null ? getMarginColor(margin) : '#f1f5f9';
      }
      case 'tvk': {
        // TVK vote share tinted by winner
        const tvkShare = cData.scenario_A_tvk ?? 0;
        const intensity = Math.min(1, tvkShare / 0.25); // 25%+ = full intensity
        return getPartyTintedColor(winner, intensity);
      }
      case 'crystal': {
        // Crystallization gap tinted by winner
        const gap = cData.crystallization_gap ?? 0;
        const intensity = Math.min(1, Math.abs(gap) / 0.5); // 50%+ = full intensity
        return getPartyTintedColor(winner, intensity);
      }
      case 'party':
      default:
        return getPartyColor(winner);
    }
  }, [viewMode, heatmapSubMode, getWinner, getMargin, searchQuery, partyFilter]);

  // Projection
  const projection = useMemo(() => {
    const proj = d3.geoMercator();
    proj.fitExtent([[20, 20], [560, 680]], tnGeoJson as any);
    return proj;
  }, []);

  const pathGenerator = useMemo(() => d3.geoPath().projection(projection), [projection]);

  // Initial SVG setup + zoom
  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll('g.map-layer').remove();
    const g = svg.append('g').attr('class', 'map-layer');
    gRef.current = g.node();

    // Draw constituency paths
    g.selectAll('path')
      .data((tnGeoJson as any).features)
      .enter()
      .append('path')
      .attr('d', (d: any) => pathGenerator(d) || '')
      .attr('stroke', '#cbd5e1')
      .attr('stroke-width', 0.4)
      .attr('cursor', 'pointer')
      .attr('class', 'constituency-path')
      .attr('data-name', (d: any) => d.properties.name);

    // Chennai boundary highlight
    g.selectAll('path.chennai-highlight')
      .data((tnGeoJson as any).features.filter((f: any) => CHENNAI_CONSTITUENCIES.includes(f.properties.name)))
      .enter()
      .append('path')
      .attr('class', 'chennai-highlight')
      .attr('d', (d: any) => pathGenerator(d) || '')
      .attr('fill', 'none')
      .attr('stroke', '#1e293b')
      .attr('stroke-width', 0.8)
      .attr('stroke-dasharray', '3,2')
      .attr('pointer-events', 'none')
      .attr('opacity', 0.4);

    // Zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.8, 12])
      .on('zoom', (event) => {
        g.attr('transform', event.transform.toString());
      });
    zoomRef.current = zoom;
    svg.call(zoom);

    return () => { svg.on('.zoom', null); };
  }, [pathGenerator, projection]);

  // Update fills + interactions when data/scenario/viewMode changes
  useEffect(() => {
    if (!gRef.current || !svgRef.current) return;
    const g = d3.select(gRef.current);

    // Main map paths
    g.selectAll<SVGPathElement, any>('path.constituency-path')
      .transition()
      .duration(300)
      .attr('fill', (d: any) => getFillColor(lookup[d.properties.name], d.properties.name));
  }, [lookup, getFillColor, pathGenerator, projection]);

  // Mouse interactions (separate from transitions for responsiveness)
  useEffect(() => {
    if (!gRef.current || !svgRef.current) return;
    const g = d3.select(gRef.current);
    const svg = d3.select(svgRef.current);

    // Helper: reset ALL path strokes to default
    const resetAllStrokes = () => {
      g.selectAll<SVGPathElement, any>('path.constituency-path')
        .attr('stroke', '#cbd5e1')
        .attr('stroke-width', 0.4);
    };

    g.selectAll<SVGPathElement, any>('path.constituency-path')
      .on('mouseenter', function(event: MouseEvent, d: any) {
        const name: string = d.properties.name;
        setHoveredConstituency(name);

        // Reset all first, then highlight only this one (no .raise())
        resetAllStrokes();
        d3.select(this)
          .attr('stroke', '#1e293b')
          .attr('stroke-width', 1.5);

        if (tooltipRef.current && containerRef.current) {
          const cData = lookup[name];
          const baseCData = baselineLookup[name];
          const winner = cData ? getWinner(cData) : null;
          const margin = cData ? getMargin(cData) : null;
          const alliance = cData ? getAlliance(cData) : null;
          const baseWinner = baseCData ? baseCData.actual_winner : null;
          const isChennai = CHENNAI_CONSTITUENCIES.includes(name);
          const isV10 = isV10Year(selectedYear);

          // Use inline styles (not Tailwind classes) so tooltip content is always visible
          const labelStyle = 'color:rgba(255,255,255,0.5);font-size:11px;';
          const valueStyle = 'color:rgba(255,255,255,0.9);font-size:11px;font-weight:600;';
          const gridStyle = 'display:grid;grid-template-columns:90px 1fr;gap:4px 12px;';
          const headerStyle = 'display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px;padding-bottom:8px;border-bottom:1px solid rgba(255,255,255,0.1);';

          let html = `<div style="${headerStyle}">`;
          html += `<div style="font-weight:700;font-size:13px;color:#fff;">${name}</div>`;
          if (isChennai) html += `<span style="font-size:9px;background:rgba(255,255,255,0.15);padding:2px 6px;border-radius:4px;color:rgba(255,255,255,0.7);font-weight:500;">CHENNAI</span>`;
          if (isV10 && cData?.region) html += `<span style="font-size:9px;background:rgba(255,255,255,0.15);padding:2px 6px;border-radius:4px;color:rgba(255,255,255,0.7);font-weight:500;">${cData.region}</span>`;
          html += `</div>`;

          html += `<div style="${gridStyle}">`;

          // INC sub-mode: show INC vote share prominently first
          if (viewMode === 'heatmap' && heatmapSubMode === 'inc' && cData) {
            const incPct = (cData.inc_layer.mean_share * 100).toFixed(1);
            html += `<span style="${labelStyle}font-weight:600;color:rgba(147,197,253,0.9);">INC Share</span>`;
            html += `<span style="font-size:14px;font-weight:700;color:#60a5fa;">${incPct}%</span>`;
          }

          // Winner
          html += `<span style="${labelStyle}">Winner</span>`;
          html += `<span style="${valueStyle}color:${getPartyColor(winner)};">${winner || 'N/A'}</span>`;

          // Bloc (alliance label made descriptive)
          if (alliance) {
            const blocLabel = alliance === 'INC+TVK' ? 'INC+TVK' : alliance === 'INC' ? 'INC (Solo)' : alliance + '+';
            html += `<span style="${labelStyle}">Bloc</span>`;
            html += `<span style="${valueStyle}color:rgba(255,255,255,0.8);">${blocLabel}</span>`;
          }

          // Margin
          if (margin !== null) {
            const marginPct = (Math.abs(margin) * 100).toFixed(1);
            html += `<span style="${labelStyle}">Margin</span>`;
            html += `<span style="${valueStyle}">${marginPct}% <span style="color:rgba(255,255,255,0.4);font-weight:400;">(${getMarginLabel(margin)})</span></span>`;
          }

          // V10 enriched fields
          if (isV10 && cData) {
            if (cData.scenario_A_confidence) {
              html += `<span style="${labelStyle}">Confidence</span>`;
              html += `<span style="${valueStyle}color:${getConfidenceColor(cData.scenario_A_confidence)};">${cData.scenario_A_confidence}</span>`;
            }

            if (viewMode === 'heatmap' && heatmapSubMode === 'inc') {
              // INC-focused: show INC share detail + INC rho
              html += `<span style="${labelStyle}">INC Rho (ρ)</span>`;
              html += `<span style="${valueStyle}color:#93c5fd;">${cData.inc_layer.rho.toFixed(3)}</span>`;
            } else {
              // Default / All Parties: show projected shares for context
              if (cData.dmk_proj_share !== undefined) {
                html += `<span style="${labelStyle}">DMK Proj.</span>`;
                html += `<span style="${valueStyle}color:#fca5a5;">${(cData.dmk_proj_share * 100).toFixed(1)}%</span>`;
              }
              if (cData.admk_proj_share !== undefined) {
                html += `<span style="${labelStyle}">ADMK Proj.</span>`;
                html += `<span style="${valueStyle}color:#86efac;">${(cData.admk_proj_share * 100).toFixed(1)}%</span>`;
              }
              if (cData.scenario_A_tvk !== undefined) {
                html += `<span style="${labelStyle}">TVK Share</span>`;
                html += `<span style="${valueStyle}color:#c4b5fd;">${(cData.scenario_A_tvk * 100).toFixed(1)}%</span>`;
              }
              // INC share as a normal row
              html += `<span style="${labelStyle}">INC Share</span>`;
              html += `<span style="${valueStyle}color:#93c5fd;">${(cData.inc_layer.mean_share * 100).toFixed(1)}%</span>`;
            }
          } else if (cData) {
            // V8: enriched data — INC share, model confidence, scenario comparison
            html += `<span style="${labelStyle}">INC Share</span>`;
            html += `<span style="${valueStyle}color:#93c5fd;">${(cData.inc_layer.mean_share * 100).toFixed(1)}%</span>`;

            // INC Rho
            html += `<span style="${labelStyle}">INC Rho (ρ)</span>`;
            html += `<span style="${valueStyle}color:#93c5fd;">${cData.inc_layer.rho.toFixed(3)}</span>`;

            // Model confidence (always show for V8)
            html += `<span style="${labelStyle}">Model ρ</span>`;
            html += `<span style="${valueStyle}color:rgba(255,255,255,0.8);">${(cData.constituency_rho * 100).toFixed(0)}%</span>`;

            // Scenario comparison mini-table
            const scA = cData.scenario_A;
            const scB = cData.scenario_B;
            const scC = cData.scenario_C;
            if (scA || scB || scC) {
              html += `</div>`; // close grid
              html += `<div style="margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.1);">`;
              html += `<div style="color:rgba(255,255,255,0.4);font-size:10px;font-weight:600;margin-bottom:4px;text-transform:uppercase;letter-spacing:0.5px;">Scenario Comparison</div>`;
              html += `<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:4px;">`;
              [{ label: 'DMK+INC', w: scA, m: cData.scenario_A_margin },
               { label: 'ADMK+INC', w: scB, m: cData.scenario_B_margin },
               { label: 'INC Solo', w: scC, m: cData.scenario_C_margin }].forEach(s => {
                if (s.w) {
                  html += `<div style="text-align:center;padding:3px 4px;background:rgba(255,255,255,0.06);border-radius:4px;">`;
                  html += `<div style="font-size:9px;color:rgba(255,255,255,0.4);margin-bottom:2px;">${s.label}</div>`;
                  html += `<div style="font-size:11px;font-weight:700;color:${getPartyColor(s.w)};">${s.w}</div>`;
                  html += `<div style="font-size:9px;color:rgba(255,255,255,0.5);">${(Math.abs(s.m) * 100).toFixed(1)}%</div>`;
                  html += `</div>`;
                }
              });
              html += `</div></div>`;
              html += `<div style="display:none;">`; // dummy div to balance the closing </div> below
            }
          }

          // Baseline / swing
          if (baseWinner && isForecastMode) {
            html += `<span style="${labelStyle}">2021 Winner</span>`;
            html += `<span style="${valueStyle}color:${getPartyColor(baseWinner)};">${baseWinner}</span>`;
            if (winner && baseWinner !== winner) {
              html += `<span style="${labelStyle}">Swing</span>`;
              html += `<span style="${valueStyle}color:#fcd34d;">${baseWinner} → ${winner}</span>`;
            }
          }

          html += `</div>`;

          tooltipRef.current.innerHTML = html;
          tooltipRef.current.style.display = 'block';
          const rect = containerRef.current.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          // Smart positioning to avoid going off-screen
          const tipW = 260;
          const tipH = 280;
          const left = (x + tipW + 20 > rect.width) ? x - tipW - 12 : x + 14;
          const top = (y + tipH > rect.height) ? Math.max(8, y - tipH + 20) : y - 8;
          tooltipRef.current.style.left = left + 'px';
          tooltipRef.current.style.top = top + 'px';
        }
      })
      .on('mousemove', function(event: MouseEvent) {
        if (tooltipRef.current && containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          const tipW = 260;
          const tipH = 280;
          const left = (x + tipW + 20 > rect.width) ? x - tipW - 12 : x + 14;
          const top = (y + tipH > rect.height) ? Math.max(8, y - tipH + 20) : y - 8;
          tooltipRef.current.style.left = left + 'px';
          tooltipRef.current.style.top = top + 'px';
        }
      })
      .on('mouseleave', function() {
        setHoveredConstituency(null);
        d3.select(this).attr('stroke', '#cbd5e1').attr('stroke-width', 0.4);
        if (tooltipRef.current) tooltipRef.current.style.display = 'none';
      })
      .on('click', function(_event: MouseEvent, d: any) {
        setSelectedConstituency(d.properties.name);
      });

    // Safety net: when cursor leaves SVG entirely, clear highlights + tooltip
    svg.on('mouseleave.main', () => {
      resetAllStrokes();
      setHoveredConstituency(null);
      if (tooltipRef.current) tooltipRef.current.style.display = 'none';
    });

    return () => {
      g.selectAll<SVGPathElement, any>('path.constituency-path')
        .on('mouseenter', null)
        .on('mousemove', null)
        .on('mouseleave', null)
        .on('click', null);
      svg.on('mouseleave.main', null);
    };
  }, [lookup, baselineLookup, getWinner, getMargin, getAlliance, isForecastMode, selectedYear, setHoveredConstituency, setSelectedConstituency, searchQuery, partyFilter, viewMode, heatmapSubMode, pathGenerator, projection]);

  // Sync hover highlight from sidebar
  useEffect(() => {
    if (!gRef.current) return;
    const g = d3.select(gRef.current);
    // Reset all, then highlight the one from sidebar
    g.selectAll<SVGPathElement, any>('path.constituency-path')
      .attr('stroke', '#cbd5e1').attr('stroke-width', 0.4);
    if (hoveredConstituency) {
      g.selectAll<SVGPathElement, any>('path.constituency-path').each(function(d: any) {
        if (d.properties.name === hoveredConstituency) {
          d3.select(this).attr('stroke', '#facc15').attr('stroke-width', 2);
        }
      });
    }
  }, [hoveredConstituency]);

  // Chennai overlay: draw paths + update fills + wire interactions
  useEffect(() => {
    const svgEl = chennaiSvgRef.current;
    if (!svgEl) return;
    const svg = d3.select(svgEl);
    svg.selectAll('*').remove();

    // Draw Chennai constituency paths
    CHENNAI_FC.features.forEach((feat: any) => {
      svg.append('path')
        .datum(feat)
        .attr('class', 'chennai-overlay-path')
        .attr('d', chennaiPathGen(feat) || '')
        .attr('fill', getFillColor(lookup[feat.properties.name], feat.properties.name))
        .attr('stroke', '#94a3b8')
        .attr('stroke-width', 0.4)
        .style('cursor', 'pointer');
    });

    // Hover + click interactions
    svg.selectAll<SVGPathElement, any>('path.chennai-overlay-path')
      .on('mouseenter', function(_event: MouseEvent, d: any) {
        const name: string = d.properties.name;
        setHoveredConstituency(name);
        // Highlight this path
        svg.selectAll<SVGPathElement, any>('path.chennai-overlay-path')
          .attr('stroke', '#94a3b8').attr('stroke-width', 0.4);
        d3.select(this).attr('stroke', '#1e293b').attr('stroke-width', 1.5);
        // Also highlight on main map
        if (gRef.current) {
          const g = d3.select(gRef.current);
          g.selectAll<SVGPathElement, any>('path.constituency-path')
            .attr('stroke', '#cbd5e1').attr('stroke-width', 0.4);
          g.selectAll<SVGPathElement, any>('path.constituency-path').each(function(md: any) {
            if (md.properties.name === name) {
              d3.select(this).attr('stroke', '#facc15').attr('stroke-width', 2);
            }
          });
        }
        // Show tooltip
        if (tooltipRef.current && containerRef.current) {
          const cData = lookup[name];
          const winner = cData ? getWinner(cData) : null;
          const margin = cData ? getMargin(cData) : null;
          const labelStyle = 'color:rgba(255,255,255,0.5);font-size:11px;';
          const valueStyle = 'color:rgba(255,255,255,0.9);font-size:11px;font-weight:600;';
          const gridStyle = 'display:grid;grid-template-columns:90px 1fr;gap:4px 12px;';
          const headerStyle = 'display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px;padding-bottom:8px;border-bottom:1px solid rgba(255,255,255,0.1);';
          let html = `<div style="${headerStyle}"><div style="font-weight:700;font-size:13px;color:#fff;">${name}</div><span style="font-size:9px;background:rgba(255,255,255,0.15);padding:2px 6px;border-radius:4px;color:rgba(255,255,255,0.7);font-weight:500;">CHENNAI</span></div>`;
          html += `<div style="${gridStyle}">`;
          html += `<span style="${labelStyle}">Winner</span><span style="${valueStyle}color:${getPartyColor(winner)};">${winner || 'N/A'}</span>`;
          if (margin !== null) {
            html += `<span style="${labelStyle}">Margin</span><span style="${valueStyle}">${(Math.abs(margin) * 100).toFixed(1)}%</span>`;
          }
          if (cData?.inc_layer) {
            html += `<span style="${labelStyle}">INC Share</span><span style="${valueStyle}color:#93c5fd;">${(cData.inc_layer.mean_share * 100).toFixed(1)}%</span>`;
          }
          html += `</div>`;
          tooltipRef.current.innerHTML = html;
          tooltipRef.current.style.display = 'block';
          // Position near top-right where the inset lives
          const rect = containerRef.current.getBoundingClientRect();
          const svgRect = svgEl.getBoundingClientRect();
          const ox = svgRect.left - rect.left;
          const oy = svgRect.top - rect.top;
          tooltipRef.current.style.left = Math.max(8, ox - 250) + 'px';
          tooltipRef.current.style.top = (oy + 20) + 'px';
        }
      })
      .on('mouseleave', function() {
        setHoveredConstituency(null);
        svg.selectAll<SVGPathElement, any>('path.chennai-overlay-path')
          .attr('stroke', '#94a3b8').attr('stroke-width', 0.4);
        if (gRef.current) {
          d3.select(gRef.current).selectAll<SVGPathElement, any>('path.constituency-path')
            .attr('stroke', '#cbd5e1').attr('stroke-width', 0.4);
        }
        if (tooltipRef.current) tooltipRef.current.style.display = 'none';
      })
      .on('click', function(_event: MouseEvent, d: any) {
        setSelectedConstituency(d.properties.name);
      });

    return () => {
      svg.selectAll('path.chennai-overlay-path')
        .on('mouseenter', null).on('mouseleave', null).on('click', null);
    };
  }, [lookup, getFillColor, getWinner, getMargin, setHoveredConstituency, setSelectedConstituency]);

  // Zoom controls
  const handleZoomIn = () => {
    if (svgRef.current && zoomRef.current) {
      d3.select(svgRef.current).transition().duration(300).call(zoomRef.current.scaleBy, 1.5);
    }
  };
  const handleZoomOut = () => {
    if (svgRef.current && zoomRef.current) {
      d3.select(svgRef.current).transition().duration(300).call(zoomRef.current.scaleBy, 0.67);
    }
  };
  const handleReset = () => {
    if (svgRef.current && zoomRef.current) {
      d3.select(svgRef.current).transition().duration(500).call(zoomRef.current.transform, d3.zoomIdentity);
    }
  };

  // Scenario label
  const scenarioLabel = (() => {
    if (isV10Year(selectedYear)) {
      if (activeScenario === 'A') return 'INC + DMK Alliance';
      if (activeScenario === 'C') return 'INC Independent';
      if (activeScenario === 'D') return 'INC + TVK Alliance';
      if (activeScenario === 'E') return 'INC + ADMK Alliance';
      return null;
    }
    if (activeScenario === 'A') return 'INC + DMK Alliance';
    if (activeScenario === 'B') return 'INC + ADMK Alliance';
    if (activeScenario === 'C') return 'INC-led Third Front';
    return null;
  })();

  // View mode legend
  const renderLegend = () => {
    if (viewMode === 'heatmap') {
      if (heatmapSubMode === 'inc') {
        // INC-specific blue gradient legend
        return (
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400">0%</span>
            <div className="flex h-3 rounded-full overflow-hidden" style={{ width: 120 }}>
              {[0.05, 0.10, 0.15, 0.20, 0.25, 0.30, 0.35, 0.40, 0.45].map((share, i) => (
                <div key={i} className="flex-1" style={{ backgroundColor: getHeatmapColor(share) }} />
              ))}
            </div>
            <span className="text-[11px] text-slate-400">40%+</span>
            <span className="text-[11px] text-blue-600 ml-1 font-semibold">INC Vote Share</span>
          </div>
        );
      }
      // All parties: multi-party legend showing each party's color tint
      return (
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            {[
              { party: 'DMK', label: 'DMK' },
              { party: 'ADMK', label: 'ADMK' },
              { party: 'INC', label: 'INC' },
              { party: 'TVK', label: 'TVK' },
              { party: 'BJP', label: 'BJP' },
            ].map(({ party, label }) => (
              <div key={party} className="flex items-center gap-1">
                <div className="flex h-2.5 rounded overflow-hidden" style={{ width: 32 }}>
                  {[0.3, 0.6, 0.9].map((t, i) => (
                    <div key={i} className="flex-1" style={{ backgroundColor: getPartyTintedColor(party, t) }} />
                  ))}
                </div>
                <span className="text-[10px] font-medium" style={{ color: getPartyColor(party) }}>{label}</span>
              </div>
            ))}
          </div>
          <div className="text-[9px] text-slate-400">Intensity = projected vote share (darker = higher)</div>
        </div>
      );
    }
    if (viewMode === 'margin') {
      return (
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-400">Tight</span>
          <div className="flex h-3 rounded-full overflow-hidden" style={{ width: 120 }}>
            {['#7f1d1d','#991b1b','#b91c1c','#dc2626','#ef4444','#f87171','#fca5a5','#fecaca'].map((c, i) => (
              <div key={i} className="flex-1" style={{ backgroundColor: c }} />
            ))}
          </div>
          <span className="text-[11px] text-slate-400">Safe</span>
          <span className="text-[11px] text-slate-500 ml-1 font-medium">Win Margin</span>
        </div>
      );
    }
    if (viewMode === 'tvk') {
      return (
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-slate-400">Low</span>
          <div className="flex h-2.5 rounded-full overflow-hidden" style={{ width: 100 }}>
            {[0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9].map((t, i) => (
              <div key={i} className="flex-1" style={{ backgroundColor: getPartyTintedColor('TVK', t) }} />
            ))}
          </div>
          <span className="text-[10px] text-slate-400">High</span>
          <span className="text-[10px] text-slate-500 ml-1 font-medium">TVK Concentration (winner-tinted)</span>
        </div>
      );
    }
    if (viewMode === 'crystal') {
      return (
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-slate-400">Low</span>
          <div className="flex h-2.5 rounded-full overflow-hidden" style={{ width: 100 }}>
            {[0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9].map((t, i) => (
              <div key={i} className="flex-1" style={{ backgroundColor: getPartyTintedColor('ADMK', t) }} />
            ))}
          </div>
          <span className="text-[10px] text-slate-400">High</span>
          <span className="text-[10px] text-slate-500 ml-1 font-medium">Crystal Gap (winner-tinted)</span>
        </div>
      );
    }
    // Party legend — REMOVED (redundant with PartyFilterBar at top)
    // Keeping the code commented for non-destructive change
    // const partySeats: Record<string, number> = {};
    // currentData.forEach(c => { ... });
    return null;
  };

  // Stable callbacks for the ComparisonPanel (prevent re-render on every cycle)
  const actualWinnerGetter = useCallback((c: ConstituencyData) => c.actual_winner || c.scenario_A, []);
  const actualMarginGetter = useCallback((c: ConstituencyData) => c.actual_margin ?? c.scenario_A_margin, []);

  return (
    <div className="bg-white border-l border-slate-200 h-full flex flex-col overflow-hidden relative">
      {/* Map header */}
      <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
            Constituency Map{show2021Baseline ? ' — Comparison View' : ''}
          </h2>
          {isForecastMode && (
            <span className="px-2 py-0.5 bg-amber-50 text-amber-700 text-[11px] font-semibold rounded-full border border-amber-200">
              Forecast
            </span>
          )}
          {scenarioLabel && (
            <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[11px] font-semibold rounded-full border border-blue-200">
              {scenarioLabel}
            </span>
          )}
        </div>
        {/* 2021 Baseline toggle */}
        <button
          onClick={() => setShow2021Baseline(!show2021Baseline)}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
            show2021Baseline
              ? 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
              : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
          }`}
          title={show2021Baseline ? 'Hide 2021 baseline' : 'Show 2021 baseline comparison'}
        >
          {show2021Baseline ? <ChevronLeft size={12} /> : <ChevronRight size={12} />}
          <span>2021 Baseline</span>
        </button>
      </div>

      {/* Map area — side-by-side when baseline is shown, full-width otherwise */}
      <div className="flex-1 relative" style={{ minHeight: 0 }}>
        <div className={`grid ${show2021Baseline ? 'grid-cols-2 divide-x divide-slate-200' : 'grid-cols-1'} h-full`}>
          {/* Left panel — Actual / Baseline (hidden by default) */}
          {show2021Baseline && (
            <ComparisonPanel
              data={baselineData}
              title={selectedYear === 2026 ? '2021 Actual Results' : `${selectedYear} Actual Results`}
              getWinner={actualWinnerGetter}
              getMargin={actualMarginGetter}
              pathGenerator={pathGenerator}
            />
          )}

          {/* Right panel — Interactive Forecast / Model map */}
          <div className="flex flex-col h-full">
            <div className="px-3 py-2 text-xs font-semibold text-slate-500 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between">
              <span>{isForecastMode ? '2026 Forecast' : `${selectedYear} Model`}</span>
              {/* Zoom controls */}
              <div className="flex items-center gap-0.5">
                <button onClick={handleZoomIn} className="p-1 hover:bg-slate-200 rounded transition-colors" title="Zoom in">
                  <ZoomIn size={12} className="text-slate-400" />
                </button>
                <button onClick={handleZoomOut} className="p-1 hover:bg-slate-200 rounded transition-colors" title="Zoom out">
                  <ZoomOut size={12} className="text-slate-400" />
                </button>
                <button onClick={handleReset} className="p-1 hover:bg-slate-200 rounded transition-colors" title="Reset view">
                  <Maximize2 size={12} className="text-slate-400" />
                </button>
              </div>
            </div>
            <div ref={containerRef} className="flex-1 relative" style={{ minHeight: 0 }}>
              <svg
                ref={svgRef}
                viewBox="0 0 580 700"
                preserveAspectRatio="xMidYMid meet"
                style={{
                  background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                }}
              />
              {/* Tooltip */}
              <div
                ref={tooltipRef}
                className="absolute pointer-events-none z-50"
                style={{ display: 'none', minWidth: 220, maxWidth: 280, background: 'rgba(15,23,42,0.95)', color: '#fff', fontSize: '12px', borderRadius: '12px', padding: '12px 16px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)' }}
              />

              {/* Legend overlay — top-right corner */}
              {(viewMode === 'heatmap' || viewMode === 'margin') && (
                <div
                  style={{
                    position: 'absolute',
                    top: 6,
                    right: INSET_W + 20,
                    zIndex: 18,
                    background: 'rgba(255,255,255,0.92)',
                    borderRadius: 8,
                    padding: '6px 12px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    border: '1px solid #e2e8f0',
                    pointerEvents: 'none',
                  }}
                >
                  {renderLegend()}
                </div>
              )}

              {/* Draggable Chennai Inset Overlay */}
              <div
                style={{
                  position: 'absolute',
                  top: insetPos ? insetPos.top : 8,
                  ...(insetPos ? { left: insetPos.left } : { right: 8 }),
                  width: INSET_W,
                  zIndex: 20,
                  background: 'rgba(255,255,255,0.95)',
                  borderRadius: 8,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                  border: '1px solid #cbd5e1',
                  overflow: 'hidden',
                  userSelect: 'none',
                }}
              >
                {/* Drag handle header */}
                <div
                  onMouseDown={handleInsetDragStart}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    padding: '4px 8px',
                    background: '#f1f5f9',
                    borderBottom: '1px solid #e2e8f0',
                    cursor: 'grab',
                    fontSize: 10,
                    fontWeight: 700,
                    color: '#475569',
                    letterSpacing: '0.05em',
                  }}
                >
                  <GripHorizontal size={12} style={{ color: '#94a3b8' }} />
                  CHENNAI
                </div>
                <svg
                  ref={chennaiSvgRef}
                  viewBox={`0 0 ${INSET_W} ${INSET_H - 24}`}
                  width={INSET_W}
                  height={INSET_H - 24}
                  style={{ display: 'block' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* Constituency detail panel + click-outside backdrop */}
      {selectedConstituency && lookup[selectedConstituency] && (
        <>
          {/* Invisible backdrop — click anywhere outside the panel to dismiss */}
          <div
            className="absolute inset-0 z-30"
            onClick={() => setSelectedConstituency(null)}
          />
          <ConstituencyDetailPanel
            name={selectedConstituency}
            data={lookup[selectedConstituency]}
            baseline={baselineLookup[selectedConstituency]}
            getWinner={getWinner}
            getMargin={getMargin}
            getAlliance={getAlliance}
            isForecast={isForecastMode}
            onClose={() => setSelectedConstituency(null)}
          />
        </>
      )}
    </div>
  );
};

/* Comparison panel — same architecture as main map (separate effects for draw / fill / events) */
const ComparisonPanel: React.FC<{
  data: ConstituencyData[];
  title: string;
  getWinner: (c: ConstituencyData) => string | null;
  getMargin: (c: ConstituencyData) => number | null;
  pathGenerator: d3.GeoPath;
}> = ({ data, title, getWinner, getMargin, pathGenerator }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const gRef = useRef<SVGGElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cpChennaiSvgRef = useRef<SVGSVGElement>(null);

  const lookup = useMemo(() => {
    const map: Record<string, ConstituencyData> = {};
    data.forEach(c => { map[c.constituency] = c; });
    return map;
  }, [data]);

  // Effect 1: Draw paths + zoom (only on mount or projection change)
  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll('g.cp-layer').remove();
    const g = svg.append('g').attr('class', 'cp-layer');
    gRef.current = g.node();

    g.selectAll('path.cp-path')
      .data((tnGeoJson as any).features)
      .enter()
      .append('path')
      .attr('class', 'cp-path')
      .attr('d', (d: any) => pathGenerator(d) || '')
      .attr('fill', '#f1f5f9')
      .attr('stroke', '#cbd5e1')
      .attr('stroke-width', 0.3)
      .attr('cursor', 'pointer')
      .attr('data-name', (d: any) => d.properties.name);

    // Chennai boundary highlight
    g.selectAll('path.cp-chennai')
      .data((tnGeoJson as any).features.filter((f: any) => CHENNAI_CONSTITUENCIES.includes(f.properties.name)))
      .enter()
      .append('path')
      .attr('class', 'cp-chennai')
      .attr('d', (d: any) => pathGenerator(d) || '')
      .attr('fill', 'none')
      .attr('stroke', '#1e293b')
      .attr('stroke-width', 0.8)
      .attr('stroke-dasharray', '3,2')
      .attr('pointer-events', 'none')
      .attr('opacity', 0.4);

    // Zoom
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.8, 8])
      .on('zoom', (event) => { g.attr('transform', event.transform.toString()); });
    svg.call(zoom);

    return () => { svg.on('.zoom', null); };
  }, [pathGenerator]);

  // Effect 2: Update fills when data changes
  useEffect(() => {
    if (!gRef.current || !svgRef.current) return;
    const g = d3.select(gRef.current);

    g.selectAll<SVGPathElement, any>('path.cp-path')
      .transition()
      .duration(300)
      .attr('fill', (d: any) => {
        const cData = lookup[d.properties.name];
        if (!cData) return '#f1f5f9';
        return getPartyColor(getWinner(cData));
      });
  }, [lookup, getWinner, pathGenerator]);

  // Effect 3: Mouse interactions (separate so they rebind on data change without redrawing)
  useEffect(() => {
    if (!gRef.current || !svgRef.current) return;
    const g = d3.select(gRef.current);
    const svg = d3.select(svgRef.current);
    const tooltip = tooltipRef.current;
    const wrapper = wrapperRef.current;

    // Helper: reset ALL path strokes to default
    const resetAll = () => {
      g.selectAll<SVGPathElement, any>('path.cp-path')
        .attr('stroke', '#cbd5e1')
        .attr('stroke-width', 0.3);
    };

    // Helper: position tooltip near cursor
    const positionTooltip = (event: MouseEvent) => {
      if (!tooltip || !wrapper) return;
      const rect = wrapper.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const tipW = 230, tipH = 160;
      tooltip.style.left = ((x + tipW + 20 > rect.width) ? x - tipW - 12 : x + 14) + 'px';
      tooltip.style.top = ((y + tipH > rect.height) ? Math.max(8, y - tipH + 20) : y - 8) + 'px';
    };

    g.selectAll<SVGPathElement, any>('path.cp-path')
      .on('mouseenter', function(event: MouseEvent, d: any) {
        const name: string = d.properties.name;

        // Reset every path first, then highlight only this one
        resetAll();
        d3.select(this).attr('stroke', '#1e293b').attr('stroke-width', 1.5);

        if (!tooltip || !wrapper) return;

        const cData = lookup[name];
        const winner = cData ? getWinner(cData) : null;
        const margin = cData ? getMargin(cData) : null;
        const isChennai = CHENNAI_CONSTITUENCIES.includes(name);

        const labelSt = 'color:rgba(255,255,255,0.5);font-size:11px;';
        const valSt = 'color:rgba(255,255,255,0.9);font-size:11px;font-weight:600;';

        let html = `<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px;padding-bottom:8px;border-bottom:1px solid rgba(255,255,255,0.1);">`;
        html += `<div style="font-weight:700;font-size:13px;color:#fff;">${name}</div>`;
        if (isChennai) html += `<span style="font-size:9px;background:rgba(255,255,255,0.15);padding:2px 6px;border-radius:4px;color:rgba(255,255,255,0.7);font-weight:500;">CHENNAI</span>`;
        html += `</div>`;

        html += `<div style="display:grid;grid-template-columns:90px 1fr;gap:4px 12px;">`;
        html += `<span style="${labelSt}">Winner</span>`;
        html += `<span style="${valSt}color:${getPartyColor(winner)};">${winner || 'N/A'}</span>`;

        if (margin !== null) {
          const pct = (Math.abs(margin) * 100).toFixed(1);
          html += `<span style="${labelSt}">Margin</span>`;
          html += `<span style="${valSt}">${pct}% <span style="color:rgba(255,255,255,0.4);font-weight:400;">(${getMarginLabel(margin)})</span></span>`;
        }
        if (cData) {
          html += `<span style="${labelSt}">INC Share</span>`;
          html += `<span style="${valSt}color:#93c5fd;">${(cData.inc_layer.mean_share * 100).toFixed(1)}%</span>`;
        }
        html += `</div>`;

        tooltip.innerHTML = html;
        tooltip.style.display = 'block';
        positionTooltip(event);
      })
      .on('mousemove', function(event: MouseEvent) {
        positionTooltip(event);
      })
      .on('mouseleave', function() {
        d3.select(this).attr('stroke', '#cbd5e1').attr('stroke-width', 0.3);
        if (tooltip) tooltip.style.display = 'none';
      });

    // Safety net: when cursor leaves the SVG entirely, clear everything
    svg.on('mouseleave.cp', () => {
      resetAll();
      if (tooltip) tooltip.style.display = 'none';
    });

    return () => {
      g.selectAll<SVGPathElement, any>('path.cp-path')
        .on('mouseenter', null)
        .on('mousemove', null)
        .on('mouseleave', null);
      svg.on('mouseleave.cp', null);
    };
  }, [lookup, getWinner, getMargin, pathGenerator]);

  // Effect 4: Chennai overlay — draw paths + update fills + wire interactions (mirrors main map)
  useEffect(() => {
    const svgEl = cpChennaiSvgRef.current;
    if (!svgEl) return;
    const cpSvg = d3.select(svgEl);
    cpSvg.selectAll('*').remove();

    CHENNAI_FC.features.forEach((feat: any) => {
      cpSvg.append('path')
        .datum(feat)
        .attr('class', 'cp-chennai-overlay-path')
        .attr('d', chennaiPathGen(feat) || '')
        .attr('fill', (() => {
          const cData = lookup[feat.properties.name];
          if (!cData) return '#f1f5f9';
          return getPartyColor(getWinner(cData));
        })())
        .attr('stroke', '#94a3b8')
        .attr('stroke-width', 0.4)
        .style('cursor', 'pointer');
    });

    // Hover + click
    cpSvg.selectAll<SVGPathElement, any>('path.cp-chennai-overlay-path')
      .on('mouseenter', function(_event: MouseEvent, d: any) {
        const name: string = d.properties.name;
        cpSvg.selectAll<SVGPathElement, any>('path.cp-chennai-overlay-path')
          .attr('stroke', '#94a3b8').attr('stroke-width', 0.4);
        d3.select(this).attr('stroke', '#1e293b').attr('stroke-width', 1.5);
        // Highlight on main map too
        if (gRef.current) {
          const g = d3.select(gRef.current);
          g.selectAll<SVGPathElement, any>('path.cp-path')
            .attr('stroke', '#cbd5e1').attr('stroke-width', 0.3);
          g.selectAll<SVGPathElement, any>('path.cp-path').each(function(dd: any) {
            if (dd.properties.name === name) {
              d3.select(this).attr('stroke', '#1e293b').attr('stroke-width', 1.5);
            }
          });
        }
        // Tooltip
        const tooltip = tooltipRef.current;
        const wrapper = wrapperRef.current;
        if (!tooltip || !wrapper) return;
        const cData = lookup[name];
        const winner = cData ? getWinner(cData) : null;
        const margin = cData ? getMargin(cData) : null;
        const labelSt = 'color:rgba(255,255,255,0.5);font-size:11px;';
        const valSt = 'color:rgba(255,255,255,0.9);font-size:11px;font-weight:600;';
        let html = `<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px;padding-bottom:8px;border-bottom:1px solid rgba(255,255,255,0.1);">`;
        html += `<div style="font-weight:700;font-size:13px;color:#fff;">${name}</div>`;
        html += `<span style="font-size:9px;background:rgba(255,255,255,0.15);padding:2px 6px;border-radius:4px;color:rgba(255,255,255,0.7);font-weight:500;">CHENNAI</span></div>`;
        html += `<div style="display:grid;grid-template-columns:90px 1fr;gap:4px 12px;">`;
        html += `<span style="${labelSt}">Winner</span><span style="${valSt}color:${getPartyColor(winner)};">${winner || 'N/A'}</span>`;
        if (margin !== null) {
          html += `<span style="${labelSt}">Margin</span><span style="${valSt}">${(Math.abs(margin) * 100).toFixed(1)}%</span>`;
        }
        if (cData?.inc_layer) {
          html += `<span style="${labelSt}">INC Share</span><span style="${valSt}color:#93c5fd;">${(cData.inc_layer.mean_share * 100).toFixed(1)}%</span>`;
        }
        html += `</div>`;
        tooltip.innerHTML = html;
        tooltip.style.display = 'block';
        const rect = wrapper.getBoundingClientRect();
        const svgRect = svgEl.getBoundingClientRect();
        tooltip.style.left = Math.max(8, (svgRect.left - rect.left) - 250) + 'px';
        tooltip.style.top = (svgRect.top - rect.top + 20) + 'px';
      })
      .on('mouseleave', function() {
        cpSvg.selectAll<SVGPathElement, any>('path.cp-chennai-overlay-path')
          .attr('stroke', '#94a3b8').attr('stroke-width', 0.4);
        if (gRef.current) {
          d3.select(gRef.current).selectAll<SVGPathElement, any>('path.cp-path')
            .attr('stroke', '#cbd5e1').attr('stroke-width', 0.3);
        }
        if (tooltipRef.current) tooltipRef.current.style.display = 'none';
      });

    return () => {
      cpSvg.selectAll('path.cp-chennai-overlay-path')
        .on('mouseenter', null).on('mouseleave', null);
    };
  }, [lookup, getWinner, getMargin]);

  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-2 text-[11px] font-semibold text-slate-500 bg-slate-50/80 border-b border-slate-100">
        {title}
      </div>
      <div ref={wrapperRef} className="flex-1 relative" style={{ minHeight: 0 }}>
        <svg ref={svgRef} viewBox="0 0 580 700" preserveAspectRatio="xMidYMid meet"
          style={{ background: '#f8fafc', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
        {/* Tooltip */}
        <div
          ref={tooltipRef}
          className="absolute pointer-events-none z-50"
          style={{ display: 'none', minWidth: 210, maxWidth: 260, background: 'rgba(15,23,42,0.95)', color: '#fff', fontSize: '12px', borderRadius: '12px', padding: '12px 16px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)' }}
        />
        {/* Chennai Inset Overlay (top-right, static — not draggable in baseline view) */}
        <div
          style={{
            position: 'absolute',
            top: 6,
            right: 6,
            width: INSET_W,
            zIndex: 20,
            background: 'rgba(255,255,255,0.95)',
            borderRadius: 8,
            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
            border: '1px solid #cbd5e1',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              display: 'flex', alignItems: 'center', gap: 4,
              padding: '4px 8px', background: '#f1f5f9',
              borderBottom: '1px solid #e2e8f0',
              fontSize: 10, fontWeight: 700, color: '#475569', letterSpacing: '0.05em',
            }}
          >
            CHENNAI
          </div>
          <svg
            ref={cpChennaiSvgRef}
            viewBox={`0 0 ${INSET_W} ${INSET_H - 24}`}
            width={INSET_W}
            height={INSET_H - 24}
            style={{ display: 'block' }}
          />
        </div>
      </div>
    </div>
  );
};

/* Constituency detail fly-out panel */
const ConstituencyDetailPanel: React.FC<{
  name: string;
  data: ConstituencyData;
  baseline?: ConstituencyData;
  getWinner: (c: ConstituencyData) => string | null;
  getMargin: (c: ConstituencyData) => number | null;
  getAlliance: (c: ConstituencyData) => string | null;
  isForecast: boolean;
  onClose: () => void;
}> = ({ name, data, baseline, getWinner, getMargin, getAlliance, isForecast, onClose }) => {
  const { selectedYear } = useDashboard();
  const winner = getWinner(data);
  const margin = getMargin(data);
  const alliance = getAlliance(data);
  const isChennai = CHENNAI_CONSTITUENCIES.includes(name);
  const isV10 = isV10Year(selectedYear);

  const scenarios = isV10
    ? [
        { label: 'INC + DMK', winner: data.scenario_A, margin: data.scenario_A_margin, alliance: data.scenario_A_alliance },
        { label: 'INC Independent', winner: data.scenario_C, margin: data.scenario_C_margin, alliance: data.scenario_C_alliance },
        { label: 'INC + TVK', winner: data.scenario_D || data.scenario_C, margin: data.scenario_D_margin ?? data.scenario_C_margin, alliance: data.scenario_D_alliance || data.scenario_C_alliance },
        { label: 'INC + ADMK', winner: data.scenario_E || data.scenario_C, margin: data.scenario_E_margin ?? data.scenario_C_margin, alliance: data.scenario_E_alliance || data.scenario_C_alliance },
      ]
    : [
        { label: 'A — INC + DMK', winner: data.scenario_A, margin: data.scenario_A_margin, alliance: data.scenario_A_alliance },
        { label: 'B — INC + ADMK', winner: data.scenario_B, margin: data.scenario_B_margin, alliance: data.scenario_B_alliance },
        { label: 'C — Third Front', winner: data.scenario_C, margin: data.scenario_C_margin, alliance: data.scenario_C_alliance },
      ];

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-xl animate-slide-up z-40">
      <div className="max-w-4xl mx-auto px-5 py-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-800">{name}</h3>
              {isChennai && (
                <span className="text-[9px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-semibold">CHENNAI</span>
              )}
              {isV10 && data.region && (
                <span className="text-[9px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-semibold">{data.region}</span>
              )}
              {isV10 && data.ls_parent && (
                <span className="text-[9px] bg-blue-50 text-blue-500 px-1.5 py-0.5 rounded font-semibold">LS: {data.ls_parent}</span>
              )}
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Assembly Constituency • {isForecast ? '2026 Forecast' : `${data.actual_winner ? 'Historical' : 'Projected'}`}
            </p>
          </div>
          <button onClick={onClose} className="text-slate-300 hover:text-slate-600 transition-colors p-1">
            <span className="text-lg leading-none">&times;</span>
          </button>
        </div>

        {/* Data grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-3">
          <div className="bg-slate-50 rounded-lg p-2.5">
            <div className="text-[10px] text-slate-400 font-medium mb-0.5">Winner</div>
            <div className="text-sm font-bold" style={{ color: getPartyColor(winner) }}>{winner || 'N/A'}</div>
            {winner && PARTY_FULL_NAMES[winner] && (
              <div className="text-[9px] text-slate-400 truncate">{PARTY_FULL_NAMES[winner]}</div>
            )}
          </div>
          <div className="bg-slate-50 rounded-lg p-2.5">
            <div className="text-[10px] text-slate-400 font-medium mb-0.5">Margin</div>
            <div className="text-sm font-bold text-slate-700">{margin !== null ? `${(Math.abs(margin) * 100).toFixed(1)}%` : 'N/A'}</div>
            {margin !== null && <div className="text-[9px] text-slate-400">{getMarginLabel(margin)}</div>}
          </div>
          {isV10 && data.scenario_A_confidence && (
            <div className="rounded-lg p-2.5" style={{ backgroundColor: getConfidenceBg(data.scenario_A_confidence) }}>
              <div className="text-[10px] text-slate-400 font-medium mb-0.5">Confidence</div>
              <div className="text-sm font-bold" style={{ color: getConfidenceColor(data.scenario_A_confidence) }}>
                {data.scenario_A_confidence}
              </div>
              <div className="text-[9px] text-slate-400">Model certainty</div>
            </div>
          )}
          {isV10 && data.scenario_A_dmk_bloc !== undefined && (
            <div className="bg-red-50 rounded-lg p-2.5">
              <div className="text-[10px] text-slate-400 font-medium mb-0.5">DMK+ Vote %</div>
              <div className="text-sm font-bold text-red-700">{(data.scenario_A_dmk_bloc * 100).toFixed(1)}%</div>
              <div className="text-[9px] text-slate-400">Bloc vote share</div>
            </div>
          )}
          {isV10 && data.scenario_A_admk_bloc !== undefined && (
            <div className="bg-green-50 rounded-lg p-2.5">
              <div className="text-[10px] text-slate-400 font-medium mb-0.5">ADMK+ Vote %</div>
              <div className="text-sm font-bold text-green-700">{(data.scenario_A_admk_bloc * 100).toFixed(1)}%</div>
              <div className="text-[9px] text-slate-400">Bloc vote share</div>
            </div>
          )}
          {isV10 && data.scenario_A_tvk !== undefined && (
            <div className="bg-violet-50 rounded-lg p-2.5">
              <div className="text-[10px] text-slate-400 font-medium mb-0.5">TVK Share</div>
              <div className="text-sm font-bold text-violet-700">{(data.scenario_A_tvk * 100).toFixed(1)}%</div>
              <div className="text-[9px] text-slate-400">{data.tvk_zone ? `Zone: ${data.tvk_zone}` : ''}</div>
            </div>
          )}
          {isV10 && (
            <div className="bg-blue-50 rounded-lg p-2.5">
              <div className="text-[10px] text-slate-400 font-medium mb-0.5">INC Share</div>
              <div className="text-sm font-bold text-blue-600">{(data.inc_layer.mean_share * 100).toFixed(1)}%</div>
              <div className="text-[9px] text-slate-400">ρ = {data.inc_layer.rho.toFixed(3)}</div>
            </div>
          )}
          {!isV10 && (
            <>
              <div className="bg-slate-50 rounded-lg p-2.5">
                <div className="text-[10px] text-slate-400 font-medium mb-0.5">INC Share</div>
                <div className="text-sm font-bold text-blue-600">{(data.inc_layer.mean_share * 100).toFixed(1)}%</div>
                <div className="text-[9px] text-slate-400">ρ = {data.inc_layer.rho.toFixed(2)}</div>
              </div>
              <div className="bg-slate-50 rounded-lg p-2.5">
                <div className="text-[10px] text-slate-400 font-medium mb-0.5">Confidence</div>
                <div className="text-sm font-bold text-slate-700">{(data.constituency_rho * 100).toFixed(0)}%</div>
                <div className="text-[9px] text-slate-400">Model ρ</div>
              </div>
            </>
          )}
          {alliance && (
            <div className="bg-slate-50 rounded-lg p-2.5">
              <div className="text-[10px] text-slate-400 font-medium mb-0.5">Bloc</div>
              <div className="text-xs font-semibold text-slate-700">{alliance === 'INC+TVK' ? 'INC+TVK' : alliance === 'INC' ? 'INC (Solo)' : alliance + '+'}</div>
            </div>
          )}
          {baseline && baseline.actual_winner && (
            <div className="bg-slate-50 rounded-lg p-2.5">
              <div className="text-[10px] text-slate-400 font-medium mb-0.5">2021 Winner</div>
              <div className="text-sm font-bold" style={{ color: getPartyColor(baseline.actual_winner) }}>
                {baseline.actual_winner}
              </div>
              {baseline.actual_winner !== winner && (
                <div className="text-[9px] text-amber-600 font-medium">⬆ Swing</div>
              )}
            </div>
          )}
        </div>

        {/* Scenario comparison row */}
        <div className={`grid gap-2 ${isV10 ? 'grid-cols-4' : 'grid-cols-3'}`}>
          {scenarios.map(s => (
            <div key={s.label} className="flex items-center justify-between bg-slate-50 rounded-lg px-3 py-2">
              <span className="text-[10px] text-slate-400 font-medium">{s.label}</span>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-semibold" style={{ color: getPartyColor(s.winner) }}>{s.winner}</span>
                <span className="text-[10px] text-slate-400 tabular-nums">{(Math.abs(s.margin) * 100).toFixed(1)}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


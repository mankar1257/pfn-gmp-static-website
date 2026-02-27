export const PARTY_COLORS: Record<string, string> = {
  "DMK": "#b91c1c",    // Red/Maroon — DMK signature
  "ADMK": "#15803d",   // Green — AIADMK signature
  "INC": "#0284c7",    // Blue — Congress signature
  "INC+TVK": "#6d28d9", // Deep violet — INC+TVK combined
  "BJP": "#ea580c",    // Saffron/Orange — BJP signature
  "TVK": "#7c3aed",    // Violet — Tamilaga Vettri Kazhagam
  "PMK": "#ca8a04",    // Yellow — PMK signature
  "DMDK": "#d97706",   // Amber
  "VCK": "#4f46e5",    // Indigo
  "CPM": "#dc2626",    // Red
  "CPI": "#ef4444",    // Lighter Red
  "NTK": "#65a30d",    // Light Green
  "MNMK": "#059669",   // Emerald
  "AIFB": "#991b1b",   // Dark Red
  "IUML": "#16a34a",   // Green
  "PT": "#9333ea",     // Purple
  "MDMK": "#be123c",   // Rose
  "Others": "#6b7280", // Gray
};

export const PARTY_FULL_NAMES: Record<string, string> = {
  "DMK": "Dravida Munnetra Kazhagam",
  "ADMK": "All India Anna DMK",
  "INC": "Indian National Congress",
  "INC+TVK": "INC + TVK Alliance",
  "BJP": "Bharatiya Janata Party",
  "TVK": "Tamilaga Vettri Kazhagam",
  "PMK": "Pattali Makkal Katchi",
  "DMDK": "Desiya Murpokku DK",
  "VCK": "Viduthalai Chiruthaigal K.",
  "CPM": "Communist Party (Marxist)",
  "CPI": "Communist Party of India",
  "NTK": "Naam Tamilar Katchi",
  "MNMK": "Makkal Needhi Maiam",
  "AIFB": "All India Forward Bloc",
  "IUML": "Indian Union Muslim League",
  "PT": "Paattali Thondar Katchi",
  "MDMK": "Marumalarchi DMK",
};

export const getPartyColor = (party: string | null | undefined): string => {
  if (!party) return "#e2e8f0"; // slate-200
  return PARTY_COLORS[party] || "#94a3b8"; // slate-400
};

/**
 * Get a lighter tint of the party color for backgrounds
 */
export const getPartyColorLight = (party: string | null | undefined): string => {
  if (!party) return "#f8fafc";
  const hex = PARTY_COLORS[party] || "#94a3b8";
  return hex + "18"; // 10% opacity via hex alpha
};

/**
 * INC vote share heatmap: white (0%) → light blue (15%) → deep blue (40%+)
 */
export const getHeatmapColor = (share: number): string => {
  if (share <= 0) return "#f8fafc";
  if (share < 0.05) return "#eff6ff";
  if (share < 0.10) return "#dbeafe";
  if (share < 0.15) return "#bfdbfe";
  if (share < 0.20) return "#93c5fd";
  if (share < 0.25) return "#60a5fa";
  if (share < 0.30) return "#3b82f6";
  if (share < 0.35) return "#2563eb";
  if (share < 0.40) return "#1d4ed8";
  return "#1e40af";
};

/**
 * Margin intensity: dark red (very tight <2%) → medium red → light pink (safe 20%+)
 * Single-hue gradient for clarity — darker = closer race, lighter = safer seat
 */
export const getMarginColor = (margin: number): string => {
  const absMargin = Math.abs(margin);
  if (absMargin < 0.02) return "#7f1d1d"; // red-900 — razor-thin
  if (absMargin < 0.05) return "#991b1b"; // red-800 — tight
  if (absMargin < 0.08) return "#b91c1c"; // red-700 — competitive
  if (absMargin < 0.10) return "#dc2626"; // red-600 — leaning
  if (absMargin < 0.15) return "#ef4444"; // red-500 — moderate
  if (absMargin < 0.20) return "#f87171"; // red-400 — comfortable
  if (absMargin < 0.30) return "#fca5a5"; // red-300 — strong
  return "#fecaca"; // red-200 — safe
};

/**
 * Margin intensity label
 */
export const getMarginLabel = (margin: number): string => {
  const absMargin = Math.abs(margin);
  if (absMargin < 0.02) return "Razor-thin";
  if (absMargin < 0.05) return "Tight";
  if (absMargin < 0.08) return "Competitive";
  if (absMargin < 0.10) return "Leaning";
  if (absMargin < 0.15) return "Comfortable";
  if (absMargin < 0.20) return "Strong";
  return "Safe";
};

/**
 * Party-tinted color: blend white → party color based on intensity (0–1).
 * Used for metric views (heatmap/tvk/crystal) so that the hue reflects the
 * winner under the active scenario while the brightness encodes the metric.
 */
export const getPartyTintedColor = (party: string | null | undefined, intensity: number): string => {
  const hex = party ? (PARTY_COLORS[party] || '#94a3b8') : '#94a3b8';
  // Parse hex → RGB
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  // Clamp intensity 0-1
  const t = Math.max(0, Math.min(1, intensity));
  // Lerp white (255) → party color
  const fr = Math.round(255 + (r - 255) * t);
  const fg = Math.round(255 + (g - 255) * t);
  const fb = Math.round(255 + (b - 255) * t);
  return `rgb(${fr},${fg},${fb})`;
};

/**
 * Confidence badge color (high / medium / low)
 */
export const getConfidenceColor = (confidence: string | undefined): string => {
  if (confidence === 'high') return '#16a34a';
  if (confidence === 'medium') return '#d97706';
  return '#dc2626';
};

export const getConfidenceBg = (confidence: string | undefined): string => {
  if (confidence === 'high') return '#f0fdf4';
  if (confidence === 'medium') return '#fffbeb';
  return '#fef2f2';
};

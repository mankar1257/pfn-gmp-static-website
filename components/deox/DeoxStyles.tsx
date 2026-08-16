import React from 'react';

/**
 * DEOX-scoped styles. Additive: nothing in index.html or any existing
 * stylesheet is modified. All rules are namespaced under .dx-root, and the
 * three fonts used here (Crimson Pro, Inter, JetBrains Mono) are already
 * loaded globally by index.html.
 */
const DeoxStyles: React.FC = () => (
  <style>{`
.dx-root {
  --dx-bg: #08090B;
  --dx-panel: #0B0E12;
  --dx-panel-2: #0E1116;
  --dx-hair: #1E232B;
  --dx-hair-2: #2A313A;
  --dx-paper: #F4F0E6;
  --dx-text: #CFC9BC;
  --dx-dim: #A8A296;
  --dx-faint: #8A8478;
  --dx-gold: #C2A269;
  --dx-gold-bright: #E5C77A;
  --dx-gold-ink: #12100B;
  --dx-red: #D9614E;
  --dx-green: #4FA97A;
  background: var(--dx-bg);
  color: var(--dx-paper);
}
.dx-root ::selection { background: var(--dx-gold); color: var(--dx-bg); }
.dx-root :focus-visible { outline: 2px solid var(--dx-gold); outline-offset: 2px; }

.dx-serif { font-family: 'Crimson Pro', Charter, Georgia, serif; font-weight: 500; letter-spacing: -0.012em; }
.dx-mono  { font-family: 'JetBrains Mono', ui-monospace, monospace; font-feature-settings: 'tnum' 1; }
.dx-kicker { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--dx-faint); }
.dx-kicker-gold { color: var(--dx-gold); }
.dx-label { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 10.5px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--dx-dim); }
.dx-note  { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 10.5px; line-height: 1.8; color: var(--dx-faint); }

.dx-hair    { border-color: var(--dx-hair); }
.dx-hair-t  { border-top: 1px solid var(--dx-hair); }
.dx-hair-b  { border-bottom: 1px solid var(--dx-hair); }
.dx-hair-r  { border-right: 1px solid var(--dx-hair); }
.dx-rule-2  { border-top: 1px solid var(--dx-hair-2); }
.dx-panel   { background: var(--dx-panel); border: 1px solid var(--dx-hair); }
.dx-panel-2 { background: var(--dx-panel-2); }
.dx-gold-cell { background: var(--dx-gold-ink); }
.dx-body { color: var(--dx-dim); line-height: 1.7; }
.dx-body-bright { color: var(--dx-text); line-height: 1.7; }
.dx-gold-text { color: var(--dx-gold-bright); }
.dx-red-text { color: var(--dx-red); }
.dx-green-text { color: var(--dx-green); }

.dx-link { color: var(--dx-gold-bright); text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: 3px; }
.dx-link:hover { color: var(--dx-paper); }

.dx-btn { display: inline-block; padding: 12px 20px; font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; text-decoration: none; background: transparent; cursor: pointer; transition: background-color .18s ease, color .18s ease; }
.dx-btn-gold { border: 1px solid var(--dx-gold); color: var(--dx-gold-bright); }
.dx-btn-gold:hover { background: rgba(194, 162, 105, .10); color: var(--dx-paper); }
.dx-btn-gold:active { background: rgba(194, 162, 105, .18); }
.dx-btn-ghost { border: 1px solid var(--dx-hair-2); color: var(--dx-paper); }
.dx-btn-ghost:hover { background: rgba(244, 240, 230, .06); }

.dx-summary { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 11.5px; letter-spacing: 0.06em; color: var(--dx-gold-bright); cursor: pointer; list-style: none; }
.dx-summary::-webkit-details-marker { display: none; }
.dx-summary:hover { color: var(--dx-paper); }

.dx-grid-bg { background-image: linear-gradient(#0F1318 1px, transparent 1px), linear-gradient(90deg, #0F1318 1px, transparent 1px); background-size: 72px 72px; }

@keyframes dx-pulse { 0%, 100% { opacity: .25 } 50% { opacity: 1 } }
@keyframes dx-flow  { to { stroke-dashoffset: -240 } }
@keyframes dx-sweep { 0% { transform: translateX(-100%) } 100% { transform: translateX(300%) } }
@keyframes dx-blink { 0%, 45% { opacity: 1 } 50%, 95% { opacity: .15 } }
@keyframes dx-rise  { from { opacity: 0; transform: translateY(6px) } to { opacity: 1; transform: none } }
.dx-pulse { animation: dx-pulse 2.2s ease-in-out infinite; }
.dx-flow  { animation: dx-flow 6s linear infinite; }
.dx-sweep { animation: dx-sweep 2.6s linear infinite; }
.dx-blink { animation: dx-blink 3.4s linear infinite; }
.dx-rise  { animation: dx-rise .35s ease-out; }

@media (prefers-reduced-motion: reduce) {
  .dx-root *, .dx-root *::before, .dx-root *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
  }
}
`}</style>
);

export default DeoxStyles;

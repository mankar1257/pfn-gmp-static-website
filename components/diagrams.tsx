import React from 'react';

/**
 * Explanatory diagram suite — hand-authored animated SVG, blueprint style.
 * Every label restates copy already on the page; the diagrams illustrate,
 * they never introduce new claims. Animation is pure CSS (killed globally
 * by the prefers-reduced-motion rule, leaving complete static frames).
 */

const MONO = 'JetBrains Mono, ui-monospace, monospace';

const Frame: React.FC<{ title: string; caption: string; children: React.ReactNode; className?: string }> = ({
  title, caption, children, className,
}) => (
  <figure className={`m-0 border border-white/10 bg-black/40 ${className ?? ''}`}>
    <figcaption className="px-5 py-3 border-b border-white/10 font-mono text-[11px] text-white/60 tracking-[0.15em] uppercase">
      {title}
    </figcaption>
    <div className="px-4 py-6 overflow-x-auto">{children}</div>
    <figcaption className="px-5 py-3 border-t border-white/10 font-mono text-[10px] text-white/40 tracking-wide">
      {caption}
    </figcaption>
  </figure>
);

/* ────────────────────────────────────────────────────────────────────
   PFN — what the library sees. Deliberately shows the INFORMATION a
   conventional library discards versus the information PFN retains and
   acts on. It does not depict any internal representation: see the
   disclosure rule in components/Evidence.tsx.
   ──────────────────────────────────────────────────────────────────── */
export const PfnEncodingDiagram: React.FC = () => (
  <Frame
    title="Fig. 00 · The same operands, two amounts of information"
    caption="A conventional library receives opaque values and can only schedule the multiplications well. PFN retains the structure the stream already carries — repetition, shared factors, the relationships a formula implies — and reorganises the computation accordingly. The call site is unchanged."
  >
    <svg viewBox="0 0 880 250" className="w-full min-w-[660px]" role="img"
      aria-label="Diagram contrasting a conventional library, which sees a sequence of opaque values, with PFN, which retains the repetition and shared structure carried by the same stream">
      <style>{`
        .pf-op { animation: pfOp 8s linear infinite; }
        @keyframes pfOp { 0%, 4% { opacity: 0; } 9%, 84% { opacity: 1; } 92%, 100% { opacity: 0; } }
        .pf-link { animation: pfLink 8s ease-in-out infinite; }
        @keyframes pfLink { 0%, 26% { opacity: 0; } 38%, 84% { opacity: 1; } 92%, 100% { opacity: 0; } }
        .pf-glow { animation: pfGlow 4s ease-in-out infinite alternate; }
        @keyframes pfGlow { from { opacity: 0.2; } to { opacity: 0.5; } }
      `}</style>

      {/* ── left: conventional ── */}
      <text x="26" y="32" fontFamily={MONO} fontSize="11" letterSpacing="2" fill="rgba(148,163,184,0.9)">CONVENTIONAL LIBRARY · OPAQUE VALUES</text>
      <rect x="18" y="50" width="398" height="140" fill="none" stroke="rgba(255,255,255,0.12)" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i} className="pf-op" style={{ animationDelay: `${i * 0.5}s` }}>
          <rect x={44 + i * 60} y={92} width={46} height={40} fill="rgba(148,163,184,0.08)" stroke="rgba(148,163,184,0.5)" />
          <text x={67 + i * 60} y={117} textAnchor="middle" fontFamily={MONO} fontSize="11" fill="rgba(248,250,252,0.55)">?</text>
        </g>
      ))}
      <text x="217" y="162" textAnchor="middle" fontFamily={MONO} fontSize="10" fill="rgba(245,158,11,0.85)">no relationship visible — schedule only</text>
      <text x="26" y="218" fontFamily={MONO} fontSize="10" letterSpacing="1" fill="rgba(148,163,184,0.6)">ACCUMULATING INTO ONE VALUE IS Θ(N²)</text>

      {/* divider */}
      <line x1="440" y1="58" x2="440" y2="190" stroke="rgba(255,255,255,0.12)" strokeDasharray="3 5" />

      {/* ── right: PFN ── */}
      <text x="464" y="32" fontFamily={MONO} fontSize="11" letterSpacing="2" fill="rgba(52,211,153,0.95)">PFN · THE SAME STREAM, WITH ITS STRUCTURE</text>
      <rect x="456" y="50" width="404" height="140" fill="none" stroke="rgba(255,255,255,0.12)" />
      <rect className="pf-glow" x="456" y="50" width="404" height="140" fill="rgba(16,185,129,0.07)" />
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const repeat = i === 1 || i === 3 || i === 5;
        return (
          <g key={i} className="pf-op" style={{ animationDelay: `${i * 0.5}s` }}>
            <rect x={482 + i * 60} y={92} width={46} height={40}
              fill={repeat ? 'rgba(16,185,129,0.16)' : 'rgba(148,163,184,0.08)'}
              stroke={repeat ? '#10B981' : 'rgba(148,163,184,0.5)'} />
            <text x={505 + i * 60} y={117} textAnchor="middle" fontFamily={MONO} fontSize="11"
              fill={repeat ? 'rgba(52,211,153,0.95)' : 'rgba(248,250,252,0.55)'}>{repeat ? 'a' : 'b'}</text>
          </g>
        );
      })}
      {/* links joining the repeated operands */}
      <g className="pf-link" fill="none" stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.75">
        <path d="M565 92 q30 -24 60 0" />
        <path d="M625 92 q60 -34 120 0" />
      </g>
      <text x="658" y="162" textAnchor="middle" fontFamily={MONO} fontSize="10" fill="rgba(52,211,153,0.9)">repetition and shared factors retained</text>
      <text x="464" y="218" fontFamily={MONO} fontSize="10" letterSpacing="1" fill="rgba(52,211,153,0.75)">THE WORK IS REORGANISED — NOT JUST RESCHEDULED</text>
    </svg>
  </Frame>
);

/* ────────────────────────────────────────────────────────────────────
   DEOX — the signal path, drawn: model → FT compiler → answer + certificate.
   ──────────────────────────────────────────────────────────────────── */
export const DeoxFlowDiagram: React.FC = () => (
  <Frame
    title="The signal path, drawn"
    caption="Your model is trained exactly as today; the compiler lowers it and inserts the certificate machinery; every answer leaves with its check. Nothing about the model changes."
    className="mb-14"
  >
    <svg viewBox="0 0 900 210" className="w-full min-w-[700px]" role="img"
      aria-label="Flow diagram: an unchanged model passes through the DEOX fault-tolerant compiler and emerges as answers paired with machine-checkable certificates">
      <style>{`
        .dx-flow { stroke-dasharray: 6 6; animation: dxFlow 1.6s linear infinite; }
        @keyframes dxFlow { to { stroke-dashoffset: -24; } }
        .dx-seal { transform-origin: 762px 96px; animation: dxSeal 4s ease-in-out infinite; }
        @keyframes dxSeal { 0%, 55%, 100% { transform: scale(1); opacity: 0.85; } 70% { transform: scale(1.12); opacity: 1; } }
      `}</style>

      {/* model box */}
      <rect x="30" y="56" width="200" height="86" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.25)" />
      <text x="130" y="88" textAnchor="middle" fontFamily={MONO} fontSize="12" letterSpacing="1.5" fill="#F8FAFC">YOUR MODEL</text>
      <text x="130" y="108" textAnchor="middle" fontFamily={MONO} fontSize="10" fill="rgba(148,163,184,0.9)">PyTorch · TensorFlow</text>
      <text x="130" y="124" textAnchor="middle" fontFamily={MONO} fontSize="10" fill="rgba(148,163,184,0.9)">→ ONNX · unchanged</text>

      {/* connector 1 */}
      <line className="dx-flow" x1="230" y1="99" x2="320" y2="99" stroke="#10B981" strokeWidth="1.5" />

      {/* compiler box */}
      <rect x="320" y="40" width="250" height="118" fill="rgba(16,185,129,0.07)" stroke="#10B981" strokeWidth="1.5" />
      <text x="445" y="70" textAnchor="middle" fontFamily={MONO} fontSize="12" letterSpacing="1.5" fill="#34D399">DEOX FT COMPILER</text>
      <text x="445" y="92" textAnchor="middle" fontFamily={MONO} fontSize="10" fill="rgba(209,250,229,0.8)">fault-tolerant lowering</text>
      <text x="445" y="108" textAnchor="middle" fontFamily={MONO} fontSize="10" fill="rgba(209,250,229,0.8)">automatic certificate insertion</text>
      <text x="445" y="130" textAnchor="middle" fontFamily={MONO} fontSize="9" letterSpacing="1" fill="rgba(148,163,184,0.8)">EMITS COVERAGE MAP OF WHAT IS PROTECTED</text>

      {/* connector 2 */}
      <line className="dx-flow" x1="570" y1="99" x2="660" y2="99" stroke="#10B981" strokeWidth="1.5" style={{ animationDelay: '0.4s' }} />

      {/* answer + certificate */}
      <rect x="660" y="56" width="210" height="86" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.25)" />
      <text x="742" y="92" textAnchor="middle" fontFamily={MONO} fontSize="12" letterSpacing="1" fill="#F8FAFC">ANSWER</text>
      <text x="742" y="112" textAnchor="middle" fontFamily={MONO} fontSize="9" fill="rgba(148,163,184,0.9)">per inference</text>
      <g className="dx-seal">
        <circle cx="762" cy="96" r="0" fill="none" />
        <circle cx="828" cy="96" r="22" fill="rgba(16,185,129,0.12)" stroke="#10B981" strokeWidth="1.5" />
        <path d="M819 96 l6 7 l12 -14" fill="none" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <text x="828" y="136" textAnchor="middle" fontFamily={MONO} fontSize="9" letterSpacing="1" fill="rgba(52,211,153,0.9)">CERTIFICATE</text>

      {/* footnote row */}
      <text x="450" y="192" textAnchor="middle" fontFamily={MONO} fontSize="10" letterSpacing="1" fill="rgba(148,163,184,0.7)">
        MACHINE-CHECKABLE — BESIDE THE ENGINE IN ORBIT, OR ON THE GROUND IN MILLISECONDS
      </text>
    </svg>
  </Frame>
);

/* ────────────────────────────────────────────────────────────────────
   Small glyphs — PFN core-property cards.
   ──────────────────────────────────────────────────────────────────── */
const glyphProps = { width: 26, height: 26, viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': true } as const;
const gStroke = { stroke: '#10B981', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

export const GlyphConstantTime: React.FC = () => (
  <svg {...glyphProps}><path {...gStroke} d="M3 17c3-8 7-12 9-12" opacity="0.35" strokeDasharray="2 3" /><path {...gStroke} d="M3 17h18" /><path {...gStroke} d="M17 14l4 3-4 3" /></svg>
);
export const GlyphFixedMemory: React.FC = () => (
  <svg {...glyphProps}><rect {...gStroke} x="4" y="4" width="16" height="16" /><path {...gStroke} d="M12 4v16M4 12h16" opacity="0.6" /></svg>
);
export const GlyphSymbolic: React.FC = () => (
  <svg {...glyphProps}><circle {...gStroke} cx="12" cy="6" r="2.5" /><circle {...gStroke} cx="6" cy="18" r="2.5" /><circle {...gStroke} cx="18" cy="18" r="2.5" /><path {...gStroke} d="M10.5 8L7 15.5M13.5 8L17 15.5" opacity="0.7" /></svg>
);
export const GlyphValidation: React.FC = () => (
  <svg {...glyphProps}><path {...gStroke} d="M20 12a8 8 0 1 1-3-6.2" /><path {...gStroke} d="M20 5.5V9h-3.5" /><path {...gStroke} d="M8.5 12.5l2.5 2.5 4.5-5" /></svg>
);

/* ────────────────────────────────────────────────────────────────────
   Small glyphs — Home discipline cards.
   ──────────────────────────────────────────────────────────────────── */
const hProps = { width: 30, height: 30, viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': true } as const;
export const GlyphMath: React.FC = () => (
  <svg {...hProps}><path {...gStroke} d="M18 5H7l5 7-5 7h11" /></svg>
);
export const GlyphPhysics: React.FC = () => (
  <svg {...hProps}><ellipse {...gStroke} cx="12" cy="12" rx="9" ry="4" transform="rotate(-25 12 12)" /><circle cx="12" cy="12" r="1.8" fill="#10B981" /><circle cx="19" cy="8.5" r="1.2" fill="#34D399" /></svg>
);
export const GlyphAI: React.FC = () => (
  <svg {...hProps}><circle {...gStroke} cx="5.5" cy="12" r="2" /><circle {...gStroke} cx="18.5" cy="6" r="2" /><circle {...gStroke} cx="18.5" cy="18" r="2" /><path {...gStroke} d="M7.4 11.2L16.6 6.8M7.4 12.8l9.2 4.4" opacity="0.7" /></svg>
);
export const GlyphData: React.FC = () => (
  <svg {...hProps}><path {...gStroke} d="M4 7h16M4 12h16M4 17h10" /><circle cx="19" cy="17" r="1.6" fill="#10B981" /></svg>
);

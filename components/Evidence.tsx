import React from 'react';

/**
 * Evidence primitives for the PFN page.
 *
 * DISCLOSURE RULE — read before editing this page or its components:
 * the published benchmark report (PFN_Benchmark_Report.pdf) is the ceiling
 * for what may appear here. It is the company's own externally-facing
 * document, so anything it states is safe to publish. Anything it does NOT
 * state — how a value is represented internally, internal identifiers, file
 * or build-system names, repository state, test-suite status, defect
 * history — must not appear on this site.
 *
 * What PFN exploits (repetition, shared factors, structure implied by a
 * formula) is a capability claim and is publishable. How it stores or
 * reorganises anything is not.
 */

/**
 * Provenance chip.
 *   measured — obtained on the benchmark machine, not modelled or estimated.
 *   verified — passed the correctness gate: bit-identical against methods
 *              sharing no code, confirmed by independent fingerprints.
 */
export const Mark: React.FC<{ kind: 'measured' | 'verified'; className?: string }> = ({ kind, className = '' }) => (
  <span
    className={`inline-flex items-center gap-1.5 px-2 py-0.5 border font-mono text-[9px] tracking-[0.12em] uppercase whitespace-nowrap ${
      kind === 'measured'
        ? 'border-white/20 text-white/55 bg-white/[0.03]'
        : 'border-brand-500/40 text-brand-400 bg-brand-500/5'
    } ${className}`}
  >
    <span aria-hidden="true" className={`inline-block w-1 h-1 ${kind === 'measured' ? 'bg-white/50' : 'bg-brand-500'}`} />
    {kind === 'measured' ? 'measured' : 'bit-identical result'}
  </span>
);

/** Section frame: numbered eyebrow, title, standfirst, optional chip. */
export const Chapter: React.FC<{
  id: string;
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  standfirst?: React.ReactNode;
  mark?: 'measured' | 'verified';
  children: React.ReactNode;
  className?: string;
}> = ({ id, index, eyebrow, title, standfirst, mark, children, className = '' }) => (
  <section id={id} className={`relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-24 border-b border-white/5 ${className}`}>
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
      <div className="lg:col-span-4">
        <div className="eyebrow text-white/40 mb-5">
          §{index} · {eyebrow}
        </div>
        <h2 className="display text-3xl md:text-4xl text-white leading-tight">{title}</h2>
        {mark && (
          <div className="mt-5">
            <Mark kind={mark} />
          </div>
        )}
      </div>
      <div className="lg:col-span-8">
        {standfirst && <p className="text-lg text-white/70 font-light leading-relaxed max-w-2xl">{standfirst}</p>}
        <div className={standfirst ? 'mt-10' : ''}>{children}</div>
      </div>
    </div>
  </section>
);

/** A measured table. */
export const DataTable: React.FC<{
  head: string[];
  rows: (string | number)[][];
  highlightRow?: number;
  minWidth?: string;
  align?: ('left' | 'right')[];
}> = ({ head, rows, highlightRow, minWidth = '560px', align }) => (
  <div className="tech-border bg-black/40 overflow-x-auto">
    <table className="w-full text-left font-mono text-sm" style={{ minWidth }}>
      <thead>
        <tr className="border-b border-white/10 text-muted">
          {head.map((h, i) => (
            <th
              key={h + i}
              className={`py-3.5 px-5 font-normal text-[11px] tracking-wide uppercase ${
                (align?.[i] ?? (i === 0 ? 'left' : 'right')) === 'right' ? 'text-right' : ''
              }`}
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, ri) => (
          <tr key={ri} className={`border-b border-white/5 last:border-b-0 ${ri === highlightRow ? 'bg-brand-500/[0.07]' : ''}`}>
            {row.map((cell, ci) => (
              <td
                key={ci}
                className={`py-3.5 px-5 ${(align?.[ci] ?? (ci === 0 ? 'left' : 'right')) === 'right' ? 'text-right' : ''} ${
                  ri === highlightRow ? (ci === 0 ? 'text-brand-400 font-medium' : 'text-white') : ci === 0 ? 'text-white' : 'text-muted'
                }`}
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/** The pull-out result line under a table. */
export const Result: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="mt-6 pl-5 border-l-2 border-brand-500 serif text-xl md:text-2xl text-white leading-snug">{children}</p>
);

/** Operating-range note — where a workload stops qualifying. */
export const Boundary: React.FC<{ title?: string; children: React.ReactNode }> = ({
  title = 'The honest shape of this claim',
  children,
}) => (
  <aside className="mt-10 border border-amber-500/20 bg-amber-500/[0.03] p-6">
    <h4 className="font-mono text-[11px] text-amber-400/90 tracking-[0.15em] uppercase mb-4">{title}</h4>
    <div className="space-y-3 text-sm text-white/65 font-light leading-relaxed">{children}</div>
  </aside>
);

/** Small caption line under a figure. */
export const Note: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <p className={`mt-4 font-mono text-[10px] text-white/40 leading-relaxed ${className}`}>{children}</p>
);

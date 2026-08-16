import React from 'react';

const MARKS = 500;          // 500 marks × 400 = the 200,000 injected faults
const RUNS_PER_MARK = 400;

/**
 * The fault-injection campaign, drawn. Every mark is a fault that was injected
 * and caught; the escape colour is defined in the legend and never used,
 * because zero escapes were recorded.
 */
const InjectionGrid: React.FC = () => (
  <figure className="m-0">
    <figcaption className="dx-label mb-3.5">
      Fault-injection campaign · one mark = {RUNS_PER_MARK} injected faults
    </figcaption>
    <div className="dx-panel flex flex-wrap gap-[3px] p-3.5" role="img"
      aria-label={`${MARKS * RUNS_PER_MARK} injected faults, every one caught by the certificate; zero escapes`}>
      {Array.from({ length: MARKS }, (_, i) => (
        <span key={i} className="inline-block h-1.5 w-1.5" style={{ background: '#B08F52' }} />
      ))}
    </div>
    <div className="dx-note mt-3 flex flex-wrap gap-5" style={{ color: 'var(--dx-dim)' }}>
      <span>
        <span className="mr-1.5 inline-block h-1.5 w-1.5" style={{ background: '#B08F52' }} />
        fault injected, caught by the certificate
      </span>
      <span>
        <span className="mr-1.5 inline-block h-1.5 w-1.5" style={{ background: 'var(--dx-red)' }} />
        escapes recorded: 0 — nothing to plot
      </span>
    </div>
  </figure>
);

export default InjectionGrid;

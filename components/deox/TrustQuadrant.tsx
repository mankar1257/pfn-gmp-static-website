import React from 'react';

/**
 * Trust quadrant: what a technology protects (the machine, or each answer)
 * against what threatens it (physical faults, or adversaries).
 * Source: deck slide 15, plus the 2026 commissioned adjacency scan.
 */
const TrustQuadrant: React.FC = () => (
  <figure className="m-0">
    <div className="grid" style={{ gridTemplateColumns: 'minmax(56px, 104px) 1fr 1fr' }}>
      <div />
      <div className="dx-label pb-3 text-center">Protect the machine</div>
      <div className="dx-label dx-gold-text pb-3 text-center">Verify each answer</div>

      <div className="dx-label flex items-center justify-end pr-3 text-right">
        Physical
        <br />
        faults
      </div>
      <div className="dx-hair min-h-[156px] border p-5">
        <div className="text-[15px]">Scrub · TMR · rad-hard</div>
        <p className="mt-2 mb-0 text-[13px] leading-relaxed" style={{ color: 'var(--dx-faint)' }}>
          Protect, silently. The answer is never checked.
        </p>
      </div>
      <div
        className="dx-gold-cell flex min-h-[156px] flex-col justify-between border p-5"
        style={{ borderColor: 'var(--dx-gold)' }}
      >
        <div>
          <div className="dx-serif dx-gold-text text-[30px]">DEOX</div>
          <p className="dx-body mt-2 mb-0 text-[13px]">
            Fault-soundness — per-answer, machine-checkable evidence.
          </p>
        </div>
        <div className="dx-label dx-kicker-gold mt-3">Alone here</div>
      </div>

      <div className="dx-label flex items-center justify-end pr-3 text-right">Adversaries</div>
      <div className="dx-hair min-h-[156px] border border-t-0 p-5">
        <div className="text-[15px]">TEEs</div>
        <p className="mt-2 mb-0 text-[13px] leading-relaxed" style={{ color: 'var(--dx-faint)' }}>
          Prove who computed, not what was computed.
        </p>
      </div>
      <div className="dx-hair min-h-[156px] border border-t-0 p-5">
        <div className="text-[15px]">zkML</div>
        <p className="mt-2 mb-0 text-[13px] leading-relaxed" style={{ color: 'var(--dx-faint)' }}>
          The right proof at an impossible cost for orbit — 10³–10⁶×.
        </p>
      </div>
    </div>
    <figcaption className="dx-note mt-4">
      From our own commissioned 2026 adjacency scan, re-tested continuously and published either way.
    </figcaption>
  </figure>
);

export default TrustQuadrant;

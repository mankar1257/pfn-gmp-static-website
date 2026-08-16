import React, { useState } from 'react';

/**
 * Fault console: the same classifier decision, unchecked and DEOX-compiled,
 * under a single-bit upset. Illustrative — it demonstrates the failure mode
 * and the check, and is not a measurement.
 */
const FaultConsole: React.FC = () => {
  const [struck, setStruck] = useState(false);

  const weights = struck ? (
    <span className="dx-red-text"> 0x1F4A…C6 · 1 bit flipped</span>
  ) : (
    <span> 0x1F4A…C7 intact</span>
  );

  return (
    <div className="dx-panel mt-11">
      <div className="dx-hair-b flex flex-wrap items-center justify-between gap-3.5 px-4 py-3">
        <span className="dx-label">Fault console · single-bit upset in a classifier</span>
        <button
          type="button"
          onClick={() => setStruck((s) => !s)}
          aria-pressed={struck}
          className="dx-btn dx-btn-gold px-3.5 py-2 text-[11px]"
        >
          {struck ? '↺ Reset memory' : '▸ Inject particle strike'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        <section className="dx-hair-r p-5">
          <h4 className="dx-label mb-3.5">Unchecked pipeline · onboard AI today</h4>
          <div className="dx-mono text-[11.5px] leading-[2]" style={{ color: 'var(--dx-faint)' }}>
            <div>tile_04812.raw → conv/relu/fc</div>
            <div>weights{weights}</div>
          </div>
          <div className="dx-hair-t mt-4 pt-4">
            <div className="dx-label">Answer downlinked</div>
            {struck ? (
              <>
                <p className="dx-serif dx-red-text mt-2 mb-0 text-[28px] leading-tight">DISCARD · clear sky</p>
                <p className="dx-red-text mt-1.5 mb-0 text-[13px]">
                  silently wrong · no fault raised, no log entry, no report
                </p>
              </>
            ) : (
              <>
                <p className="dx-serif mt-2 mb-0 text-[28px] leading-tight">KEEP · target confirmed</p>
                <p className="dx-green-text mt-1.5 mb-0 text-[13px]">
                  correct — and indistinguishable from the case beside it
                </p>
              </>
            )}
          </div>
        </section>

        <section className="dx-panel-2 p-5">
          <h4 className="dx-label dx-gold-text mb-3.5">Same silicon, compiled by DEOX</h4>
          <div className="dx-mono text-[11.5px] leading-[2]" style={{ color: 'var(--dx-faint)' }}>
            <div>tile_04812.raw → certified lowering</div>
            <div>weights{weights}</div>
          </div>
          <div className="dx-hair-t mt-4 pt-4">
            <div className="dx-label">Answer + certificate</div>
            {struck ? (
              <>
                <p className="dx-serif mt-2 mb-0 text-[28px] leading-tight">DISCARD · clear sky</p>
                <p className="dx-mono dx-red-text mt-2.5 mb-0 text-[11.5px]">
                  cert 0x9E…41 FAILED — arithmetic inconsistent
                </p>
                <p className="dx-body-bright mt-2.5 mb-0 text-[13px]">
                  The answer is still wrong. The difference is that everyone knows: recompute, quarantine or
                  escalate — and the audit trail records it.
                </p>
              </>
            ) : (
              <>
                <p className="dx-serif mt-2 mb-0 text-[28px] leading-tight">KEEP · target confirmed</p>
                <p className="dx-mono dx-green-text mt-2.5 mb-0 text-[11.5px]">
                  cert 0x9E…41 VERIFIED — checks exact
                </p>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default FaultConsole;

import React, { useEffect, useRef, useState } from 'react';

interface CertRow {
  id: string;
  label: string;
  ok: boolean;
}

const LABELS = ['ship_detect', 'cloud_mask', 'track_assoc', 'change_det', 'thermal_seg'];
const makeRow = (n: number, bad: boolean): CertRow => ({
  id: `inf_${n}`,
  label: LABELS[n % LABELS.length],
  ok: !bad,
});

/**
 * Hero figure: the Earth limb plate, the orbit track with the payload on it,
 * incident particle tracks, and an illustrative certificate stream.
 * Explicitly labelled illustrative — it is not flight telemetry.
 */
const OrbitPanel: React.FC = () => {
  const [rows, setRows] = useState<CertRow[]>(() =>
    Array.from({ length: 5 }, (_, i) => makeRow(4812 + i, i === 2)),
  );
  const seq = useRef(4817);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = window.setInterval(() => {
      const n = seq.current++;
      setRows((prev) => [...prev.slice(1), makeRow(n, n % 7 === 0)]);
    }, 1600);
    return () => window.clearInterval(t);
  }, []);

  return (
    <figure className="m-0">
      <div className="dx-panel">
        <div className="dx-hair-b flex items-center justify-between gap-3 px-3.5 py-2.5">
          <span className="dx-label">Onboard verifier · certificate stream</span>
          <span className="dx-label dx-gold-text">illustrative</span>
        </div>

        <div
          className="relative h-[186px] overflow-hidden bg-[#0B0E12]"
          style={{
            backgroundImage: "url('/deox/earth-limb.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center bottom',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <svg viewBox="0 0 320 186" width="100%" height="186" preserveAspectRatio="none" aria-hidden="true">
            <path id="dx-orbit" d="M -20 96 C 70 40 250 40 340 96" fill="none" stroke="#3A3327" strokeDasharray="3 5" />
            <path
              className="dx-flow"
              d="M -20 96 C 70 40 250 40 340 96"
              fill="none"
              stroke="#C2A269"
              strokeWidth="1"
              strokeDasharray="24 216"
            />
            <g>
              <rect x="-4" y="-3" width="8" height="6" fill="#F4F0E6" />
              <rect x="-11" y="-1" width="6" height="2" fill="#C2A269" />
              <rect x="5" y="-1" width="6" height="2" fill="#C2A269" />
              <animateMotion dur="14s" repeatCount="indefinite" rotate="auto">
                <mpath href="#dx-orbit" />
              </animateMotion>
            </g>
            <g stroke="#D9614E" strokeWidth="1" opacity="0.85">
              <line className="dx-blink" x1="40" y1="0" x2="76" y2="60" style={{ animationDuration: '3.1s' }} />
              <line className="dx-blink" x1="220" y1="0" x2="188" y2="72" style={{ animationDuration: '4.3s' }} />
              <line className="dx-blink" x1="300" y1="10" x2="262" y2="66" style={{ animationDuration: '5.7s' }} />
            </g>
          </svg>
        </div>

        <ul className="dx-hair-t m-0 min-h-[132px] list-none px-3.5 py-3">
          {rows.map((r) => (
            <li key={r.id} className="dx-rise dx-mono flex justify-between gap-2.5 text-[11.5px] leading-[1.9]">
              <span style={{ color: 'var(--dx-faint)' }}>{r.id}</span>
              <span style={{ color: 'var(--dx-dim)' }}>{r.label}</span>
              {r.ok ? (
                <span className="dx-green-text">CERT ✓</span>
              ) : (
                <span className="dx-red-text">CERT ✗ caught</span>
              )}
            </li>
          ))}
        </ul>
      </div>
      <figcaption className="dx-note mt-2.5">
        Illustrative animation of the certificate stream — not flight telemetry.
      </figcaption>
    </figure>
  );
};

export default OrbitPanel;

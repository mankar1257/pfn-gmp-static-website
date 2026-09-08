import React, { useEffect, useRef, useState } from 'react';

/**
 * "Feel the wall": power operations computed live in the visitor's browser
 * with native BigInt — a self-contained demonstration that cost grows with
 * operand magnitude. Deliberately NOT juxtaposed with the measured GMP/PFN
 * figures (different hardware and harness; engines differ). Runs in a worker
 * so the page never freezes; cancellable; digit counts computed analytically.
 */

type Row = {
  key: string;
  label: string;
  base: number;
  exp: number;
};

const ROWS: Row[] = [
  { key: 'a', label: '3^10,000', base: 3, exp: 10_000 },
  { key: 'b', label: '5^100,000', base: 5, exp: 100_000 },
  { key: 'c', label: '7^1,000,000', base: 7, exp: 1_000_000 },
];

const digitsOf = (base: number, exp: number) => Math.floor(exp * Math.log10(base)) + 1;

const WORKER_SRC = `
self.onmessage = (e) => {
  const { base, exp } = e.data;
  const t0 = performance.now();
  let result = 1n, b = BigInt(base), n = exp;
  while (n > 0) {
    if (n & 1) result *= b;
    b *= b;
    n >>= 1;
  }
  // touch the result so the engine cannot dead-code it
  const ms = performance.now() - t0;
  self.postMessage({ ms, sign: result > 0n });
};`;

const fmt = (ms: number) => (ms < 1000 ? `${ms.toFixed(ms < 10 ? 1 : 0)} ms` : `${(ms / 1000).toFixed(2)} s`);

const BigIntRace: React.FC = () => {
  const [times, setTimes] = useState<Record<string, number>>({});
  const [running, setRunning] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const workerRef = useRef<Worker | null>(null);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stop = () => {
    workerRef.current?.terminate();
    workerRef.current = null;
    if (tickRef.current) clearInterval(tickRef.current);
    setRunning(null);
  };

  useEffect(() => stop, []);

  const run = (row: Row) => {
    if (running) return;
    setRunning(row.key);
    setElapsed(0);
    const t0 = performance.now();
    tickRef.current = setInterval(() => setElapsed(performance.now() - t0), 100);
    const blob = new Blob([WORKER_SRC], { type: 'application/javascript' });
    const worker = new Worker(URL.createObjectURL(blob));
    workerRef.current = worker;
    worker.onmessage = (e) => {
      setTimes((t) => ({ ...t, [row.key]: e.data.ms as number }));
      stop();
    };
    worker.onerror = () => {
      setTimes((t) => ({ ...t, [row.key]: -1 }));
      stop();
    };
    worker.postMessage({ base: row.base, exp: row.exp });
  };

  return (
    <div className="mt-16 tech-border bg-black/50 backdrop-blur-xl p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <div className="font-mono text-[10px] text-white/40 tracking-[0.2em] uppercase mb-2">Fig. 03 · Live</div>
          <h3 className="text-lg text-white font-medium">Feel the wall — run it in this tab</h3>
          <p className="text-sm text-muted mt-1 max-w-2xl">
            Power operations computed right now by your browser's native BigInt, in a background
            thread. Nothing simulated. Run all three and watch the cost bend as the exponent grows —
            that curve is the structural property PFN's fixed-width encoding removes.
          </p>
        </div>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[560px] text-left font-mono text-sm">
          <thead>
            <tr className="border-b border-white/10 text-muted">
              <th className="py-3 pr-4 font-normal">Operation</th>
              <th className="py-3 pr-4 font-normal text-right">Result digits</th>
              <th className="py-3 font-normal text-right">Your browser · just now</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.key} className="border-b border-white/5 last:border-b-0">
                <td className="py-3 pr-4 text-white">
                  <button
                    type="button"
                    onClick={() => run(r)}
                    disabled={running !== null}
                    className="px-3 py-1.5 border border-brand-500/50 text-brand-400 text-xs tracking-widest uppercase hover:bg-brand-500/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    ▸ {r.label}
                  </button>
                </td>
                <td className="py-3 pr-4 text-right text-white/60">{digitsOf(r.base, r.exp).toLocaleString()}</td>
                <td className="py-3 text-right text-white">
                  {running === r.key ? (
                    <span className="text-amber-400">{fmt(elapsed)}…</span>
                  ) : times[r.key] === undefined ? (
                    <span className="text-white/30">—</span>
                  ) : times[r.key] < 0 ? (
                    'failed'
                  ) : (
                    fmt(times[r.key])
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {times['b'] !== undefined && times['c'] !== undefined && times['b'] > 0 && times['c'] > 0 && (
        <p className="mt-4 font-mono text-xs text-brand-400">
          Your own run: exponent ×10 → time ×{(times['c'] / times['b']).toFixed(1)}. The measured PFN
          column in the table above stays at microseconds across the same span.
        </p>
      )}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-[10px] text-white/40 tracking-wide max-w-3xl">
          Times depend on your hardware and your browser's BigInt — they demonstrate how cost grows
          with magnitude here, and are not comparable to the measured single-core figures above.
          First run may include warm-up.
        </p>
        {running && (
          <button type="button" onClick={stop} className="font-mono text-[11px] text-white/50 hover:text-white uppercase tracking-widest">
            ✕ cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default BigIntRace;

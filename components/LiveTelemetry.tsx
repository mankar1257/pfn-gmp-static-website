import React, { useEffect, useState } from 'react';

/**
 * Live orbital-environment telemetry (NOAA SWPC space-weather feeds + the
 * public ISS ephemeris) — the threat DEOX certifies against, as it stands
 * right now. Degrades to a "feed unreachable" state without breaking the page.
 */

type Tile = { label: string; value: string; status: string; tone: 'ok' | 'warn' | 'muted'; note: string };

const REFRESH_MS = 5 * 60 * 1000;

const kpStatus = (kp: number): [string, Tile['tone']] =>
  kp >= 5 ? [`G${Math.min(5, kp - 4)} STORM`, 'warn'] : kp >= 4 ? ['ACTIVE', 'warn'] : ['QUIET', 'ok'];

const protonStatus = (pfu: number): [string, Tile['tone']] =>
  pfu >= 10 ? ['RADIATION STORM', 'warn'] : ['NOMINAL', 'ok'];

const LiveTelemetry: React.FC = () => {
  const [tiles, setTiles] = useState<Tile[] | null>(null);
  const [asOf, setAsOf] = useState<string>('');
  const [dead, setDead] = useState(false);

  useEffect(() => {
    const ctrl = new AbortController();
    let timer: ReturnType<typeof setInterval>;

    const grab = async (url: string) => {
      const r = await fetch(url, { signal: ctrl.signal });
      if (!r.ok) throw new Error(String(r.status));
      return r.json();
    };

    const load = async () => {
      const [kpR, prR, swR, issR] = await Promise.allSettled([
        grab('https://services.swpc.noaa.gov/json/planetary_k_index_1m.json'),
        grab('https://services.swpc.noaa.gov/json/goes/primary/integral-protons-1-day.json'),
        grab('https://services.swpc.noaa.gov/products/summary/solar-wind-speed.json'),
        grab('https://api.wheretheiss.at/v1/satellites/25544'),
      ]);

      const next: Tile[] = [];

      if (kpR.status === 'fulfilled' && Array.isArray(kpR.value) && kpR.value.length) {
        const kp = Number(kpR.value[kpR.value.length - 1].kp_index);
        const [status, tone] = kpStatus(kp);
        next.push({ label: 'Geomagnetic field', value: `Kp ${kp}`, status, tone, note: 'planetary K-index' });
      }
      if (prR.status === 'fulfilled' && Array.isArray(prR.value)) {
        const rows = prR.value.filter((r: any) => r.energy === '>=10 MeV');
        if (rows.length) {
          const flux = Number(rows[rows.length - 1].flux);
          const [status, tone] = protonStatus(flux);
          next.push({
            label: 'Proton flux ≥10 MeV', value: `${flux < 1 ? flux.toFixed(2) : flux.toFixed(1)} pfu`,
            status, tone, note: 'the particle flux behind single-event upsets',
          });
        }
      }
      if (swR.status === 'fulfilled') {
        const row = Array.isArray(swR.value) ? swR.value[0] : swR.value;
        const speed = Number(row?.proton_speed ?? row?.WindSpeed);
        if (Number.isFinite(speed)) {
          next.push({ label: 'Solar wind', value: `${Math.round(speed)} km/s`, status: 'GOES / DSCOVR', tone: 'muted', note: 'proton bulk speed' });
        }
      }
      if (issR.status === 'fulfilled' && issR.value?.altitude) {
        const v = issR.value;
        next.push({
          label: 'ISS · now', value: `${Math.round(v.altitude)} km · ${(v.velocity / 3600).toFixed(1)} km/s`,
          status: v.visibility === 'eclipsed' ? 'IN SHADOW' : 'IN SUNLIGHT', tone: 'muted',
          note: `${Number(v.latitude).toFixed(1)}°, ${Number(v.longitude).toFixed(1)}°`,
        });
      }

      if (next.length) {
        setTiles(next);
        setDead(false);
        setAsOf(new Date().toUTCString().replace('GMT', 'UTC'));
      } else {
        setDead(true);
      }
    };

    const safeLoad = () =>
      load().catch((e: unknown) => {
        if ((e as Error)?.name !== 'AbortError') setDead(true);
      });
    safeLoad();
    timer = setInterval(safeLoad, REFRESH_MS);
    return () => {
      ctrl.abort();
      clearInterval(timer);
    };
  }, []);

  const toneClass = (t: Tile['tone']) =>
    t === 'warn' ? 'text-amber-400' : t === 'ok' ? 'text-emerald-400' : 'text-white/50';

  return (
    <div className="mt-14 border border-white/10 bg-black/50">
      <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-4 border-b border-white/10">
        <span className="font-mono text-[11px] text-white/60 tracking-[0.15em] uppercase flex items-center gap-2.5">
          <span className={`inline-block w-1.5 h-1.5 rounded-full ${dead ? 'bg-white/30' : 'bg-emerald-500 animate-pulse'}`} aria-hidden="true" />
          The environment, right now
        </span>

      </div>

      {dead ? (
        <p className="px-5 py-8 font-mono text-xs text-white/50">
          Live feed unreachable — values withheld rather than shown stale.
        </p>
      ) : !tiles ? (
        <p className="px-5 py-8 font-mono text-xs text-white/40" role="status">Acquiring open telemetry…</p>
      ) : (
        <>
          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {tiles.map((t, i) => (
              <div key={t.label} className={`px-5 py-6 ${i > 0 ? 'sm:border-l border-white/10' : ''} border-t sm:border-t-0 border-white/10 first:border-t-0`}>
                <dt className="font-mono text-[10px] text-white/50 tracking-[0.15em] uppercase">{t.label}</dt>
                <dd className="m-0 mt-2.5 font-mono text-2xl text-white">{t.value}</dd>
                <dd className={`m-0 mt-1.5 font-mono text-[10px] tracking-[0.12em] uppercase ${toneClass(t.tone)}`}>{t.status}</dd>
                <dd className="m-0 mt-2 text-xs text-white/40">{t.note}</dd>
              </div>
            ))}
          </dl>
          <p className="px-5 py-3 border-t border-white/10 font-mono text-[10px] text-white/40 tracking-wide">
            NOAA SWPC · wheretheiss.at · refreshed every 5 minutes · {asOf} · Reading QUIET? Upsets happen anyway — galactic background
            and South Atlantic Anomaly passes never sleep. DEOX assumes one unlucky particle.
          </p>
        </>
      )}
    </div>
  );
};

export default LiveTelemetry;

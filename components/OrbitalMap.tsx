import React, { useEffect, useRef, useState } from 'react';

/**
 * Live orbital situation map: NASA's Black Marble (public domain) as the
 * ground, an approximate South Atlantic Anomaly extent, and the ISS ground
 * track drawn from the public ephemeris (±45 min around now). The one place
 * on the site where the threat geography is literal; degrades to map + SAA
 * if the ephemeris is unreachable.
 */

type Pt = { ts: number; lat: number; lon: number };

const project = (lat: number, lon: number, w: number, h: number): [number, number] => [
  ((lon + 180) / 360) * w,
  ((90 - lat) / 180) * h,
];

const OrbitalMap: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [track, setTrack] = useState<Pt[] | null>(null);
  const [live, setLive] = useState(false);

  // Fetch the ground track: 20 samples spanning -45 min … +50 min.
  useEffect(() => {
    const ctrl = new AbortController();
    const load = async () => {
      try {
        const now = Math.floor(Date.now() / 1000);
        const stamps = (offsets: number[]) => offsets.map((m) => now + m * 60).join(',');
        const past = [-45, -40, -35, -30, -25, -20, -15, -10, -5, 0];
        const future = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
        const urls = [past, future].map(
          (o) => `https://api.wheretheiss.at/v1/satellites/25544/positions?timestamps=${stamps(o)}&units=kilometers`,
        );
        const results = await Promise.all(
          urls.map((u) => fetch(u, { signal: ctrl.signal }).then((r) => (r.ok ? r.json() : Promise.reject(r.status)))),
        );
        const pts: Pt[] = results
          .flat()
          .map((p: any) => ({ ts: Number(p.timestamp), lat: Number(p.latitude), lon: Number(p.longitude) }))
          .filter((p: Pt) => Number.isFinite(p.lat) && Number.isFinite(p.lon))
          .sort((a: Pt, b: Pt) => a.ts - b.ts);
        if (pts.length > 4) {
          setTrack(pts);
          setLive(true);
        }
      } catch {
        /* map still renders without the track */
      }
    };
    load();
    const timer = setInterval(load, 5 * 60 * 1000);
    return () => {
      ctrl.abort();
      clearInterval(timer);
    };
  }, []);

  // Draw loop.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const img = new Image();
    img.src = '/assets/earth-night-map.jpg';

    let raf = 0;
    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);

      // Ground: Black Marble, dimmed into the site's palette.
      if (img.complete && img.naturalWidth) {
        ctx.globalAlpha = 0.85;
        ctx.drawImage(img, 0, 0, w, h);
        ctx.globalAlpha = 1;
        ctx.fillStyle = 'rgba(0,0,0,0.25)';
        ctx.fillRect(0, 0, w, h);
      } else {
        ctx.fillStyle = '#04070f';
        ctx.fillRect(0, 0, w, h);
      }

      // Graticule.
      ctx.strokeStyle = 'rgba(255,255,255,0.07)';
      ctx.lineWidth = 1;
      for (let lon = -150; lon <= 150; lon += 30) {
        const [x] = project(0, lon, w, h);
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let lat = -60; lat <= 60; lat += 30) {
        const [, y] = project(lat, 0, w, h);
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }

      // South Atlantic Anomaly — approximate extent (public geophysics).
      const [cx, cy] = project(-25, -50, w, h);
      const rx = (48 / 360) * w;
      const ry = (20 / 180) * h;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-0.18);
      const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, rx);
      grad.addColorStop(0, 'rgba(245,158,11,0.20)');
      grad.addColorStop(0.65, 'rgba(245,158,11,0.10)');
      grad.addColorStop(1, 'rgba(245,158,11,0)');
      ctx.fillStyle = grad;
      ctx.beginPath(); ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2); ctx.fill();
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = 'rgba(245,158,11,0.45)';
      ctx.beginPath(); ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2); ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();
      ctx.font = '600 10px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(245,158,11,0.8)';
      ctx.fillText('SOUTH ATLANTIC ANOMALY · APPROX EXTENT', cx - rx * 0.62, cy + ry + 14);

      // ISS ground track.
      if (track && track.length > 4) {
        const now = Date.now() / 1000;
        const seg = (pts: Pt[], style: () => void) => {
          style();
          ctx.beginPath();
          let started = false;
          for (let i = 0; i < pts.length; i++) {
            const [x, y] = project(pts[i].lat, pts[i].lon, w, h);
            if (!started) { ctx.moveTo(x, y); started = true; continue; }
            if (Math.abs(pts[i].lon - pts[i - 1].lon) > 180) { ctx.stroke(); ctx.beginPath(); ctx.moveTo(x, y); continue; }
            ctx.lineTo(x, y);
          }
          ctx.stroke();
        };
        seg(track.filter((p) => p.ts <= now), () => {
          ctx.setLineDash([]); ctx.lineWidth = 1.5; ctx.strokeStyle = 'rgba(248,250,252,0.55)';
        });
        seg(track.filter((p) => p.ts >= now), () => {
          ctx.setLineDash([5, 5]); ctx.lineWidth = 1.5; ctx.strokeStyle = 'rgba(16,185,129,0.7)';
        });
        ctx.setLineDash([]);

        // Current position: nearest sample to now.
        const cur = track.reduce((a, b) => (Math.abs(b.ts - now) < Math.abs(a.ts - now) ? b : a));
        const [px, py] = project(cur.lat, cur.lon, w, h);
        if (!reduced) {
          const ring = 5 + 4 * (0.5 + 0.5 * Math.sin(t * 0.004));
          ctx.strokeStyle = 'rgba(16,185,129,0.5)';
          ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.arc(px, py, ring, 0, Math.PI * 2); ctx.stroke();
        }
        ctx.fillStyle = '#10B981';
        ctx.beginPath(); ctx.arc(px, py, 3.5, 0, Math.PI * 2); ctx.fill();
        ctx.font = '600 10px "JetBrains Mono", monospace';
        ctx.fillStyle = 'rgba(52,211,153,0.95)';
        ctx.fillText('ISS', px + 9, py + 3);
      }
    };

    const loop = (t: number) => {
      if (!document.hidden) draw(t);
      raf = requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener('resize', resize);
    img.onload = () => draw(0);
    if (reduced) {
      // Static render: once now, and again when data lands.
      draw(0);
      const settle = setTimeout(() => draw(0), 2500);
      return () => {
        clearTimeout(settle);
        window.removeEventListener('resize', resize);
      };
    }
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [track]);

  return (
    <figure className="mt-6 m-0 border border-white/10 bg-black/50">
      <figcaption className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-b border-white/10">
        <span className="font-mono text-[11px] text-white/60 tracking-[0.15em] uppercase">
          Orbital situation · ISS ground track ±45 min
        </span>
        <span className="font-mono text-[10px] text-white/40 tracking-wide">
          NASA Black Marble
        </span>
      </figcaption>
      <div className="relative w-full" style={{ aspectRatio: '2 / 1' }}>
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" role="img"
          aria-label="World map at night showing the approximate South Atlantic Anomaly region and the live ISS ground track" />
      </div>
      <figcaption className="px-5 py-3 border-t border-white/10 font-mono text-[10px] text-white/40 tracking-wide">
        {live ? 'Solid: past 45 min · dashed: next 45 min.' : 'Live track unreachable — map and anomaly region shown.'}{' '}
        Low-Earth orbits thread the anomaly many times a day; that is the neighbourhood every answer comes home through.
      </figcaption>
    </figure>
  );
};

export default OrbitalMap;

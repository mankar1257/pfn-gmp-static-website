import React, { useEffect, useRef, useState } from 'react';

/**
 * Single-event upsets, lived rather than drawn — v2.
 * A field of memory bits under a thin rain of charged-particle streaks with
 * luminous heads; when one clips a cell the bit flips behind an expanding
 * ring, stays amber inside a marked box, and the event log on the right
 * narrates it: timestamp, cell, old→new, "no alarm". Illustrative physics,
 * not a measurement. Native canvas (additive compositing); pauses when
 * off-screen; static field + note under reduced motion.
 */

type Cell = { bit: number; flipped: boolean; heat: number };
type Streak = { x: number; y: number; vx: number; vy: number; life: number; target?: { c: number; r: number } };
type Ring = { x: number; y: number; r: number; alpha: number };
type Ev = { id: number; t: string; cell: string; from: number; to: number };

const ParticleStrikeSim: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [events, setEvents] = useState<Ev[]>([]);
  const [flips, setFlips] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReduced(prefersReduced);

    let w = 0;
    let h = 0;
    let cols = 0;
    let rows = 0;
    let cellW = 0;
    let cellH = 0;
    let cells: Cell[][] = [];
    const streaks: Streak[] = [];
    const rings: Ring[] = [];
    let raf = 0;
    let visible = false;
    let lastSpawn = 0;
    let flipCount = 0;
    let evId = 0;
    const t0 = performance.now();

    const stamp = () => {
      const s = Math.floor((performance.now() - t0) / 1000);
      const mm = String(Math.floor(s / 60)).padStart(2, '0');
      const ss = String(s % 60).padStart(2, '0');
      return `T+${mm}:${ss}`;
    };

    const seed = () => {
      cols = Math.max(10, Math.floor(w / 52));
      rows = Math.max(4, Math.floor(h / 52));
      cellW = w / cols;
      cellH = h / rows;
      cells = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => ({ bit: Math.random() < 0.5 ? 1 : 0, flipped: false, heat: 0 })),
      );
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      if (prefersReduced) drawField(true);
    };

    const drawField = (clear = false) => {
      if (clear) {
        ctx.fillStyle = '#020403';
        ctx.fillRect(0, 0, w, h);
      }
      const fs = Math.min(17, cellH * 0.4);
      ctx.font = `${fs}px "JetBrains Mono", monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cell = cells[r][c];
          const x = c * cellW + cellW / 2;
          const y = r * cellH + cellH / 2;
          if (cell.flipped) {
            // marked box around the corrupted bit — it stays marked
            ctx.strokeStyle = `rgba(245,158,11,${0.28 + 0.3 * cell.heat})`;
            ctx.lineWidth = 1;
            ctx.strokeRect(x - cellW * 0.34, y - cellH * 0.34, cellW * 0.68, cellH * 0.68);
            ctx.fillStyle = cell.heat > 0.8 ? 'rgba(248,250,252,0.95)' : `rgba(245,158,11,${0.6 + 0.35 * cell.heat})`;
          } else {
            ctx.fillStyle = 'rgba(148,163,184,0.3)';
          }
          ctx.fillText(String(cell.bit), x, y);
          if (cell.heat > 0.01) cell.heat *= 0.97;
        }
      }
    };

    const spawn = (t: number) => {
      if (t - lastSpawn < 380 + Math.random() * 620) return;
      lastSpawn = t;
      const speed = 11 + Math.random() * 6;
      const s: Streak = {
        x: Math.random() * w,
        y: -24,
        vx: (Math.random() - 0.5) * speed * 0.7,
        vy: speed,
        life: 1,
      };
      if (Math.random() < 0.16) {
        const c = Math.floor(Math.random() * cols);
        const r = Math.floor(Math.random() * rows);
        s.target = { c, r };
        const tx = c * cellW + cellW / 2;
        const ty = r * cellH + cellH / 2;
        s.x = tx - (s.vx / s.vy) * (ty + 24);
      }
      streaks.push(s);
    };

    const step = (t: number) => {
      // fade previous frame → luminous trails
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(2,4,3,0.5)';
      ctx.fillRect(0, 0, w, h);
      drawField();
      spawn(t);

      ctx.globalCompositeOperation = 'lighter';
      for (let i = streaks.length - 1; i >= 0; i--) {
        const s = streaks[i];
        const px = s.x;
        const py = s.y;
        s.x += s.vx;
        s.y += s.vy;

        // trail
        ctx.strokeStyle = `rgba(190,255,230,${0.55 * s.life})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();
        // luminous head
        const head = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 7);
        head.addColorStop(0, `rgba(220,255,240,${0.9 * s.life})`);
        head.addColorStop(1, 'rgba(220,255,240,0)');
        ctx.fillStyle = head;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 7, 0, Math.PI * 2);
        ctx.fill();

        if (s.target) {
          const tx = s.target.c * cellW + cellW / 2;
          const ty = s.target.r * cellH + cellH / 2;
          if (py <= ty && s.y >= ty) {
            const cell = cells[s.target.r][s.target.c];
            const from = cell.bit;
            cell.bit ^= 1;
            cell.flipped = true;
            cell.heat = 1;
            rings.push({ x: tx, y: ty, r: 4, alpha: 0.9 });
            flipCount += 1;
            setFlips(flipCount);
            const ev: Ev = {
              id: ++evId,
              t: stamp(),
              cell: `R${String(s.target.r).padStart(2, '0')}·C${String(s.target.c).padStart(2, '0')}`,
              from,
              to: cell.bit,
            };
            setEvents((prev) => [ev, ...prev].slice(0, 7));
            s.target = undefined;
          }
        }
        if (s.y > h + 40 || s.x < -40 || s.x > w + 40) streaks.splice(i, 1);
      }

      // expanding strike rings
      for (let i = rings.length - 1; i >= 0; i--) {
        const ring = rings[i];
        ring.r += 1.6;
        ring.alpha *= 0.94;
        ctx.strokeStyle = `rgba(245,158,11,${ring.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, ring.r, 0, Math.PI * 2);
        ctx.stroke();
        if (ring.alpha < 0.03) rings.splice(i, 1);
      }
      ctx.globalCompositeOperation = 'source-over';
    };

    const loop = (t: number) => {
      if (visible && !document.hidden) step(t);
      raf = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0.15 });
    io.observe(wrap);

    resize();
    window.addEventListener('resize', resize);
    if (prefersReduced) {
      drawField(true);
    } else {
      raf = requestAnimationFrame(loop);
    }
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <figure className="mt-14 m-0 border border-white/10 bg-black/40">
      <figcaption className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-b border-white/10">
        <span className="font-mono text-[11px] text-white/60 tracking-[0.15em] uppercase">
          A memory field, under particle rain
        </span>
        <span className="font-mono text-[10px] text-white/40 tracking-wide">[ illustrative · not a measurement ]</span>
      </figcaption>
      <div className="px-5 py-2 border-b border-white/10 font-mono text-[10px] text-white/40 tracking-[0.1em] uppercase">
        1 glyph = 1 bit of model memory · streaks = charged particles · <span className="text-amber-400/90">amber</span> = flipped, unannounced
      </div>

      <div className="flex flex-col lg:flex-row">
        <div ref={wrapRef} className="relative flex-1 bg-[#020403] min-h-[300px] lg:min-h-[360px]">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            role="img"
            aria-label="Simulation of charged particles streaking through a field of memory bits; occasionally one flips a bit, which silently keeps its new value"
          />
        </div>

        {/* Event log — the narration */}
        <div className="lg:w-72 border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col">
          <div className="px-4 py-2.5 border-b border-white/10 font-mono text-[10px] text-white/50 tracking-[0.15em] uppercase">
            Event log · SEU
          </div>
          <div className="flex-1 px-4 py-3 space-y-2 min-h-[180px]">
            {reduced ? (
              <p className="font-mono text-[10px] text-white/40 leading-relaxed">Animation disabled (reduced motion). The field above shows a static frame.</p>
            ) : events.length === 0 ? (
              <p className="font-mono text-[10px] text-white/30">listening for strikes…</p>
            ) : (
              events.map((e) => (
                <p key={e.id} className="font-mono text-[10px] leading-relaxed text-white/60">
                  <span className="text-white/40">{e.t}</span>{' '}
                  <span className="text-amber-400">[{e.cell}]</span> {e.from}→{e.to}
                  <span className="text-white/35"> · no alarm</span>
                </p>
              ))
            )}
          </div>
          <div className="px-4 py-2.5 border-t border-white/10 font-mono text-[10px] tracking-wide flex items-center justify-between">
            <span className="text-white/50">FLIPS: <span className="text-amber-400">{flips}</span></span>
            <span className="text-white/50">ALARMS: <span className="text-emerald-400">0</span></span>
          </div>
        </div>
      </div>

      <figcaption className="px-5 py-3 border-t border-white/10 font-mono text-[10px] text-white/40 tracking-wide">
        Most particles pass through. The ones that don't announce nothing — the value simply changes, and stays changed.
      </figcaption>
    </figure>
  );
};

export default ParticleStrikeSim;

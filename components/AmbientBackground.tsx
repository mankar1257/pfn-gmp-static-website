import React, { useEffect, useRef } from 'react';

/**
 * Site-wide ambient background: slow-drifting aurora glows (CSS), a canvas
 * starfield with per-star depth that parallaxes against scroll, and a film
 * grain wash. Fixed behind all content (-z-10); sections with their own
 * surfaces simply paint over it. Fully static for prefers-reduced-motion.
 */

const Starfield: React.FC = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;
    let running = true;

    type Star = { x: number; y: number; r: number; a: number; tw: number; ph: number; depth: number; tint: boolean };
    let stars: Star[] = [];

    const seed = () => {
      const count = Math.min(300, Math.round((w * h) / 7500));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.6 + Math.random() * 1.3,
        a: 0.25 + Math.random() * 0.65,
        tw: 0.25 + Math.random() * 0.5,       // twinkle speed (rad/s)
        ph: Math.random() * Math.PI * 2,      // twinkle phase
        depth: 0.4 + Math.random() * 1.1,     // scroll-parallax factor
        tint: Math.random() < 0.16,           // a few emerald stars
      }));
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const sy = window.scrollY;
      for (const s of stars) {
        // Stars drift slower than the page — depth-layered parallax.
        let y = (s.y - sy * s.depth * 0.05) % h;
        if (y < 0) y += h;
        const alpha = reduced ? s.a : s.a * (0.72 + 0.28 * Math.sin(t * 0.001 * s.tw + s.ph));
        ctx.beginPath();
        ctx.arc(s.x, y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.tint ? `rgba(52, 211, 153, ${alpha})` : `rgba(248, 250, 252, ${alpha})`;
        ctx.fill();
      }
    };

    const loop = (t: number) => {
      if (running) draw(t);
      raf = requestAnimationFrame(loop);
    };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      if (reduced) draw(0);
    };

    const onVisibility = () => {
      running = !document.hidden;
    };

    resize();
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVisibility);
    if (!reduced) {
      raf = requestAnimationFrame(loop);
    } else {
      // Static sky, but keep it aligned when the reader scrolls.
      const onScroll = () => draw(0);
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => {
        window.removeEventListener('resize', resize);
        window.removeEventListener('scroll', onScroll);
        document.removeEventListener('visibilitychange', onVisibility);
      };
    }
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" />;
};

const AmbientBackground: React.FC = () => (
  <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
    <div className="ambient-glow ambient-glow-a" />
    <div className="ambient-glow ambient-glow-b" />
    <div className="ambient-glow ambient-glow-c" />
    <Starfield />
    <div className="ambient-grain" />
  </div>
);

export default AmbientBackground;

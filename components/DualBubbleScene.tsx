import React, { useEffect, useRef, useState } from 'react';

/* ───────────────────────── Types ───────────────────────── */
export type ParticleType = 'lepton' | 'quark' | 'boson';

export interface SceneParticle {
  name: string;
  type: ParticleType;
  knot: string;
  /** Use the figure-eight parametrisation (the electron, 4₁). */
  figureEight?: boolean;
  /** Otherwise a stylised (p,q) torus knot whose complexity tracks the mass. */
  p?: number;
  q?: number;
}

/* Site palette (hex → 0x ints) */
const INK = 0x171717;
const GOLD = 0xa16207;
const RED = 0x991b1b;
const TYPE_COLOR: Record<ParticleType, number> = {
  lepton: 0x1d4ed8, // accent blue
  quark: 0x15803d, // flag green
  boson: 0xa16207, // flag gold
};

const INTERFACE_R = 1.4;

/* ───────────────────────── Geometry helpers ───────────────────────── */

/** Sample a closed curve for the given particle, scaled to thread the interface. */
function sampleKnot(p: SceneParticle, n = 480): Array<[number, number, number]> {
  const raw: Array<[number, number, number]> = [];
  const TAU = Math.PI * 2;
  if (p.figureEight) {
    // Classic figure-eight (4₁) parametrisation.
    for (let i = 0; i < n; i++) {
      const t = (i / n) * TAU;
      raw.push([
        (2 + Math.cos(2 * t)) * Math.cos(3 * t),
        (2 + Math.cos(2 * t)) * Math.sin(3 * t),
        Math.sin(4 * t),
      ]);
    }
  } else {
    const pp = p.p ?? 2;
    const qq = p.q ?? 3;
    for (let i = 0; i < n; i++) {
      const t = (i / n) * TAU;
      raw.push([
        (2 + Math.cos(qq * t)) * Math.cos(pp * t),
        (2 + Math.cos(qq * t)) * Math.sin(pp * t),
        Math.sin(qq * t),
      ]);
    }
  }
  // Scale so the curve crosses the interface sphere (max radius → ~1.75).
  let maxR = 0;
  for (const [x, y, z] of raw) maxR = Math.max(maxR, Math.hypot(x, y, z));
  const s = 1.68 / (maxR || 1);
  return raw.map(([x, y, z]) => [x * s, y * s, z * s]);
}

/** Points where the curve crosses the |z|=1 interface sphere. */
function crossingPoints(pts: Array<[number, number, number]>): Array<[number, number, number]> {
  const out: Array<[number, number, number]> = [];
  const r = (q: [number, number, number]) => Math.hypot(q[0], q[1], q[2]) - INTERFACE_R;
  for (let i = 0; i < pts.length; i++) {
    const a = pts[i];
    const b = pts[(i + 1) % pts.length];
    const ra = r(a);
    const rb = r(b);
    if (ra === 0 || ra * rb < 0) {
      const f = ra === 0 ? 0 : ra / (ra - rb);
      out.push([a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f]);
    }
    if (out.length >= 10) break;
  }
  return out;
}

function hasWebGL(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl') || c.getContext('experimental-webgl')));
  } catch {
    return false;
  }
}

/* ───────────────────────── Component ───────────────────────── */

interface Props {
  particle: SceneParticle;
  /** Height/aspect utility classes for the canvas stage. */
  className?: string;
}

const DualBubbleScene: React.FC<Props> = ({ particle, className }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const ctx = useRef<any>(null);
  const particleRef = useRef(particle);
  particleRef.current = particle;

  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [spinning, setSpinning] = useState(true);

  /* Build / replace the knot mesh inside the persistent group. */
  function buildKnot(THREE: any, group: any, p: SceneParticle) {
    for (const child of [...group.children]) {
      child.geometry?.dispose?.();
      child.material?.dispose?.();
      group.remove(child);
    }
    const ptsArr = sampleKnot(p);
    const vecs = ptsArr.map(([x, y, z]) => new THREE.Vector3(x, y, z));
    const curve = new THREE.CatmullRomCurve3(vecs, true, 'centripetal');
    const tube = new THREE.TubeGeometry(curve, 600, 0.05, 14, true);
    const mat = new THREE.MeshStandardMaterial({
      color: TYPE_COLOR[p.type],
      roughness: 0.42,
      metalness: 0.05,
    });
    group.add(new THREE.Mesh(tube, mat));

    // Crossing markers on the interface.
    const markerGeo = new THREE.SphereGeometry(0.06, 16, 16);
    const markerMat = new THREE.MeshStandardMaterial({ color: RED, roughness: 0.5 });
    for (const [x, y, z] of crossingPoints(ptsArr)) {
      const m = new THREE.Mesh(markerGeo, markerMat);
      m.position.set(x, y, z);
      group.add(m);
    }
  }

  /* Init (lazy, on scroll into view). */
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    if (!hasWebGL()) { setFailed(true); return; }

    let disposed = false;
    let io: IntersectionObserver | null = null;
    let ro: ResizeObserver | null = null;

    const start = async () => {
      let THREE: any;
      let OrbitControls: any;
      try {
        THREE = await import('three');
        ({ OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js'));
      } catch {
        setFailed(true);
        return;
      }
      if (disposed || !mountRef.current) return;
      const el = mountRef.current;
      const w = el.clientWidth || 640;
      const h = el.clientHeight || 480;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(w, h);
      el.appendChild(renderer.domElement);
      renderer.domElement.style.display = 'block';
      renderer.domElement.style.outline = 'none';

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 100);
      camera.position.set(1.9, 1.3, 5.7);

      scene.add(new THREE.AmbientLight(0xffffff, 0.85));
      const key = new THREE.DirectionalLight(0xffffff, 0.8);
      key.position.set(3, 5, 4);
      scene.add(key);
      const fill = new THREE.DirectionalLight(0xffffff, 0.35);
      fill.position.set(-4, -2, -3);
      scene.add(fill);

      // B³ — spherical interior (faint blue fill + ink globe lines)
      const b3Fill = new THREE.Mesh(
        new THREE.SphereGeometry(INTERFACE_R, 48, 32),
        new THREE.MeshBasicMaterial({ color: 0x1d4ed8, transparent: true, opacity: 0.05, depthWrite: false })
      );
      scene.add(b3Fill);
      const b3Lines = new THREE.LineSegments(
        new THREE.WireframeGeometry(new THREE.SphereGeometry(INTERFACE_R, 18, 12)),
        new THREE.LineBasicMaterial({ color: INK, transparent: true, opacity: 0.16 })
      );
      scene.add(b3Lines);

      // Interface S² (|z|=1) — three crisp orthogonal great circles in ink
      const ringMat = new THREE.MeshBasicMaterial({ color: INK, transparent: true, opacity: 0.55 });
      const ringGeo = new THREE.TorusGeometry(INTERFACE_R, 0.006, 8, 160);
      const r1 = new THREE.Mesh(ringGeo, ringMat);
      const r2 = new THREE.Mesh(ringGeo, ringMat); r2.rotation.x = Math.PI / 2;
      const r3 = new THREE.Mesh(ringGeo, ringMat); r3.rotation.y = Math.PI / 2;
      scene.add(r1, r2, r3);

      // H³ — hyperbolic exterior. H³ is NOT a round shell: it has negative
      // curvature, so its geodesics diverge. We draw it as a web of geodesics
      // that meet the interface S² orthogonally and bulge outward — the visual
      // signature of hyperbolic space (cf. the Poincaré ball model).
      {
        const alpha = (30 * Math.PI) / 180;           // half-span of each geodesic on the interface
        const D = INTERFACE_R / Math.cos(alpha);       // centre distance of the orthogonal circle
        const rho = INTERFACE_R * Math.tan(alpha);     // its radius (D² = R² + ρ² ⇒ orthogonality)
        const sweep = Math.PI / 2 + alpha;             // half the exterior arc that lies outside S²
        const h3Mat = new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: 0.5 });
        const planes = [
          [new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 1, 0)],
          [new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 1)],
          [new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 1)],
        ];
        const K = 6, N = 48;
        for (const [u, v] of planes) {
          for (let k = 0; k < K; k++) {
            const theta = (k / K) * Math.PI * 2;
            const cx = D * Math.cos(theta), cy = D * Math.sin(theta);
            const pts: any[] = [];
            for (let i = 0; i <= N; i++) {
              const t = theta + (-sweep + 2 * sweep * (i / N));
              const a = cx + rho * Math.cos(t);
              const b = cy + rho * Math.sin(t);
              pts.push(u.clone().multiplyScalar(a).add(v.clone().multiplyScalar(b)));
            }
            scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), h3Mat));
          }
        }
      }

      const knotGroup = new THREE.Group();
      scene.add(knotGroup);
      buildKnot(THREE, knotGroup, particleRef.current);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;
      controls.enablePan = false;
      controls.minDistance = 3.2;
      controls.maxDistance = 9;
      controls.autoRotate = spinning;
      controls.autoRotateSpeed = 0.9;
      controls.saveState();

      ctx.current = { THREE, renderer, scene, camera, controls, knotGroup, raf: 0 };

      const animate = () => {
        const c = ctx.current;
        if (!c) return;
        c.controls.update();
        c.renderer.render(c.scene, c.camera);
        c.raf = requestAnimationFrame(animate);
      };
      animate();
      setReady(true);

      ro = new ResizeObserver(() => {
        const c = ctx.current;
        if (!c || !mountRef.current) return;
        const nw = mountRef.current.clientWidth;
        const nh = mountRef.current.clientHeight;
        if (nw && nh) {
          c.camera.aspect = nw / nh;
          c.camera.updateProjectionMatrix();
          c.renderer.setSize(nw, nh);
        }
      });
      ro.observe(el);
    };

    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver((entries) => {
        if (entries.some((e) => e.isIntersecting)) { io?.disconnect(); start(); }
      }, { rootMargin: '300px 0px' });
      io.observe(mount);
    } else {
      start();
    }

    return () => {
      disposed = true;
      io?.disconnect();
      ro?.disconnect();
      const c = ctx.current;
      if (c) {
        cancelAnimationFrame(c.raf);
        c.controls.dispose();
        c.scene.traverse((o: any) => {
          o.geometry?.dispose?.();
          if (Array.isArray(o.material)) o.material.forEach((m: any) => m.dispose?.());
          else o.material?.dispose?.();
        });
        c.renderer.dispose();
        c.renderer.domElement?.remove();
        ctx.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Default to paused when the user prefers reduced motion. */
  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (mq?.matches) setSpinning(false);
  }, []);

  /* Reflect spin toggle onto the controls. */
  useEffect(() => {
    const c = ctx.current;
    if (c?.controls) c.controls.autoRotate = spinning;
  }, [spinning, ready]);

  /* Rebuild the knot when the selected particle changes. */
  useEffect(() => {
    const c = ctx.current;
    if (c && ready) buildKnot(c.THREE, c.knotGroup, particle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [particle, ready]);

  const reset = () => {
    const c = ctx.current;
    c?.controls?.reset?.();
  };

  /* WebGL fallback — the static labelled schematic. */
  if (failed) {
    return (
      <div className={`relative w-full bg-white flex items-center justify-center ${className ?? 'aspect-[16/10]'}`}>
        <svg viewBox="0 0 720 460" className="w-full max-w-2xl" role="img" aria-label="Schematic cross-section of the dual bubble: a spherical ball B³ inside a hyperbolic ball H³, with a knot threading the interface.">
          <circle cx="360" cy="230" r="200" fill="rgba(161,98,7,0.05)" stroke="#A16207" strokeWidth="1.5" strokeDasharray="6 6" />
          <circle cx="360" cy="230" r="128" fill="rgba(29,78,216,0.06)" stroke="#171717" strokeWidth="2" />
          <path d="M250 230 C 285 145, 360 145, 360 230 C 360 315, 435 315, 470 230 C 435 145, 360 145, 360 230 C 360 315, 285 315, 250 230 Z" fill="none" stroke="#1D4ED8" strokeWidth="4" strokeLinecap="round" />
          <circle cx="250" cy="230" r="6" fill="#991B1B" /><circle cx="470" cy="230" r="6" fill="#991B1B" /><circle cx="360" cy="102" r="6" fill="#991B1B" />
          <text x="360" y="205" textAnchor="middle" fontFamily="Crimson Pro, serif" fontStyle="italic" fontSize="22" fill="#171717">B³</text>
          <text x="585" y="120" textAnchor="middle" fontFamily="Crimson Pro, serif" fontStyle="italic" fontSize="22" fill="#A16207">H³</text>
        </svg>
        <span className="absolute bottom-3 mono text-[10px] tracking-[0.1em] uppercase text-muted">Static schematic · WebGL unavailable</span>
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        ref={mountRef}
        className={`relative w-full ${className ?? 'aspect-[16/10] min-h-[420px]'}`}
        role="img"
        aria-label={`Interactive 3D model of the dual bubble: the ${particle.name} as the knot ${particle.knot} threading the B³/H³ interface. Drag to orbit, scroll to zoom.`}
        style={{ cursor: 'grab', background: 'radial-gradient(120% 120% at 50% 35%, #FBF8F0 0%, #F4F0E6 55%, #ECE5D4 100%)' }}
      >
        {!ready && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-muted pointer-events-none">
            <svg viewBox="0 0 120 80" className="w-24" aria-hidden>
              <circle cx="60" cy="40" r="30" fill="none" stroke="#A16207" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.5">
                <animateTransform attributeName="transform" type="rotate" from="0 60 40" to="360 60 40" dur="9s" repeatCount="indefinite" />
              </circle>
              <circle cx="60" cy="40" r="20" fill="none" stroke="#171717" strokeWidth="1.5" opacity="0.5" />
              <path d="M44 40 C 49 31, 56 31, 60 40 C 64 49, 71 49, 76 40 C 71 31, 64 31, 60 40 C 56 49, 49 49, 44 40 Z" fill="none" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="mono text-[10px] tracking-[0.14em] uppercase">Loading model…</span>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-4 px-4 py-2.5 border-t border-hairline bg-white">
        <span className="mono text-[10px] tracking-[0.1em] uppercase text-muted hidden sm:inline">
          Drag to orbit · scroll to zoom
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSpinning((s) => !s)}
            aria-pressed={spinning}
            className="mono text-[10px] tracking-[0.1em] uppercase text-ink border border-hairline px-3 py-1.5 hover:border-ink transition-colors cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
          >
            {spinning ? '❚❚ Pause spin' : '▶ Spin'}
          </button>
          <button
            type="button"
            onClick={reset}
            className="mono text-[10px] tracking-[0.1em] uppercase text-ink border border-hairline px-3 py-1.5 hover:border-ink transition-colors cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
          >
            ↺ Reset view
          </button>
        </div>
      </div>
    </div>
  );
};

export default DualBubbleScene;

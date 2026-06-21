import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ScatterChart, Scatter, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  LabelList, ReferenceLine, ReferenceDot,
} from 'recharts';
import DualBubbleScene, { SceneParticle } from '../../components/DualBubbleScene';

/* ───────────────────────── Chart styling tokens ───────────────────────── */
const INK = '#171717';
const MUTED = '#5C5345';
const HAIRLINE = '#DDD6C6';
const FLAG_RED = '#991B1B';
const FLAG_GREEN = '#15803D';
const FLAG_GREEN_SOFT = '#4A7553';
const FLAG_GOLD = '#A16207';
const ACCENT = '#1D4ED8';

const tooltipStyle = {
  backgroundColor: '#0E1116',
  border: 'none',
  borderRadius: '4px',
  fontFamily: 'JetBrains Mono, ui-monospace, monospace',
  fontSize: '11px',
  color: '#F4F0E6',
  padding: '8px 10px',
};
const tooltipLabelStyle = { color: '#F4F0E6', fontFamily: 'Crimson Pro, serif', fontWeight: 600, fontSize: '13px', marginBottom: 4 };

const axisTick = { fontSize: 10, fontFamily: 'JetBrains Mono, monospace', fill: MUTED };
const axisLabelStyle = { fill: MUTED, fontSize: 10, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.06em' } as const;

/* ───────────────────────── Data ───────────────────────── */

type Kind = 'lepton' | 'quark' | 'boson';

const particles: Array<{
  n: number; name: string; type: Kind; manifold: string;
  V: number; pred: number; actual: number; err: number;
}> = [
  { n: 1,  name: 'Electron', type: 'lepton', manifold: '4₁',         V: 2.030,  pred: 0.511,    actual: 0.511,    err: 0.00 },
  { n: 2,  name: 'Up',       type: 'quark',  manifold: '9₂',         V: 3.487,  pred: 2.19,     actual: 2.16,     err: 1.54 },
  { n: 3,  name: 'Down',     type: 'quark',  manifold: 'v0240',      V: 4.242,  pred: 4.666,    actual: 4.67,     err: 0.09 },
  { n: 4,  name: 'Strange',  type: 'quark',  manifold: 'K14n6034',   V: 7.240,  pred: 93.26,    actual: 93.4,     err: 0.15 },
  { n: 5,  name: 'Muon',     type: 'lepton', manifold: 'K14n12205',  V: 7.366,  pred: 106.1,    actual: 105.66,   err: 0.42 },
  { n: 6,  name: 'Charm',    type: 'quark',  manifold: 'K14a12707',  V: 9.851,  pred: 1274,     actual: 1270,     err: 0.28 },
  { n: 7,  name: 'Tau',      type: 'lepton', manifold: '9₂₁',        V: 10.183, pred: 1776,     actual: 1777,     err: 0.06 },
  { n: 8,  name: 'Bottom',   type: 'quark',  manifold: 'K13n1767',   V: 11.039, pred: 4180,     actual: 4180,     err: 0.00 },
  { n: 9,  name: 'Top',      type: 'quark',  manifold: 'K14n70',     V: 14.763, pred: 173033,   actual: 173000,   err: 0.02 },
  { n: 10, name: 'W',        type: 'boson',  manifold: 'K15a51328',  V: 13.996, pred: 80372,    actual: 80377,    err: 0.01 },
  { n: 11, name: 'Z',        type: 'boson',  manifold: 'K12a147',    V: 14.122, pred: 91163,    actual: 91188,    err: 0.03 },
  { n: 12, name: 'Higgs',    type: 'boson',  manifold: 'K13n227',    V: 14.439, pred: 125240,   actual: 125250,   err: 0.01 },
];

const fermionPoints = particles.filter((p) => p.type !== 'boson').map((p) => ({ x: p.actual, y: p.pred, name: p.name }));
const bosonPoints = particles.filter((p) => p.type === 'boson').map((p) => ({ x: p.actual, y: p.pred, name: p.name }));
const protonPoint = [{ x: 938.272, y: 933.1, name: 'Proton' }];

/* Stylised knot parameters for the 3-D scene. The electron is the true
   figure-eight (4₁); the rest are torus knots whose (p,q) complexity rises with
   mass — schematic visual aids, as in the original companion. */
const sceneParams: Record<string, { figureEight?: boolean; p?: number; q?: number }> = {
  Electron: { figureEight: true },
  Up: { p: 2, q: 3 }, Down: { p: 2, q: 5 }, Strange: { p: 3, q: 4 },
  Muon: { p: 2, q: 7 }, Charm: { p: 3, q: 5 }, Tau: { p: 2, q: 9 },
  Bottom: { p: 3, q: 7 }, Top: { p: 4, q: 5 }, W: { p: 3, q: 8 },
  Z: { p: 4, q: 7 }, Higgs: { p: 5, q: 6 },
};
const sceneParticles: SceneParticle[] = particles.map((p) => ({
  name: p.name, type: p.type, knot: p.manifold, ...sceneParams[p.name],
}));

/* m = m₀·exp(V) curve for the interactive volume explorer. */
const M0 = 0.06712;
const curveData = (() => {
  const a: Array<{ v: number; m: number }> = [];
  for (let v = 1.6; v <= 15.4 + 1e-9; v += 0.2) a.push({ v: +v.toFixed(2), m: M0 * Math.exp(v) });
  return a;
})();

const errorData = particles.map((p) => ({ name: p.name, err: p.err, type: p.type }));

const protonVol = [
  { label: 'V(u₁) · up',     v: 3.49,  kind: 'up' },
  { label: 'V(u₂) · up',     v: 3.49,  kind: 'up' },
  { label: 'V(d) · down',    v: 4.24,  kind: 'down' },
  { label: 'Σ Vᵢ · sum',     v: 11.21, kind: 'sum' },
  { label: 'V(link) · bound', v: 9.54,  kind: 'link' },
];

const protonDoublet = [
  ['Hyperbolic volume', '9.5397804594', '9.5397804594'],
  ['Number of cusps', '3', '3'],
  ['Homology', 'ℤ + ℤ + ℤ', 'ℤ + ℤ + ℤ'],
  ['Ideal tetrahedra', '10', '10'],
  ['Symmetry group', 'ℤ/2 + ℤ/2', 'ℤ/2 + ℤ/2'],
  ['Chern–Simons', '−0.01254', '+0.23746'],
  ['CS interpretation', 'Parity-even (Jᴾ = +)', 'Parity-odd (Jᴾ = −)'],
  ['Isometric?', '—', 'No (confirmed)'],
];

const sources = [
  { authors: 'C. C. Adams.', title: 'The Knot Book: An Elementary Introduction to the Mathematical Theory of Knots.', cite: 'American Mathematical Society, 2004.', note: 'Most prime knots in S³ have hyperbolic complements.' },
  { authors: 'W. P. Thurston.', title: '“Three-dimensional manifolds, Kleinian groups and hyperbolic geometry.”', cite: 'Bull. Amer. Math. Soc. 6, 357 (1982).', note: 'The hyperbolisation theorem.' },
  { authors: 'G. D. Mostow.', title: 'Strong Rigidity of Locally Symmetric Spaces.', cite: 'Annals of Math. Studies 78, Princeton, 1973.', note: 'Hyperbolic volume is a topological invariant.' },
  { authors: 'E. Witten.', title: '“Quantization of Chern–Simons gauge theory with complex gauge group.”', cite: 'Comm. Math. Phys. 137, 29 (1991).', note: 'The complexified SL(2,ℂ) theory.' },
  { authors: 'S. Gukov.', title: '“Three-dimensional quantum gravity, Chern–Simons theory, and the A-polynomial.”', cite: 'Comm. Math. Phys. 255, 577 (2005). arXiv:hep-th/0306165.', note: '' },
  { authors: 'T. Dimofte, S. Gukov, J. Lenells, D. Zagier.', title: '“Exact results for perturbative Chern–Simons theory with complex gauge group.”', cite: 'Comm. Number Theory Phys. 3, 363 (2009). arXiv:0903.2472.', note: 'The asymptotic expansion used for the mass operator.' },
  { authors: 'T. Asselmeyer-Maluga.', title: '“Braids, 3-manifolds, elementary particles: Number theory and symmetry in particle physics.”', cite: 'Symmetry 11, 1298 (2019). arXiv:1910.09966.', note: 'Prior qualitative fermion–knot correspondence.' },
  { authors: 'M. Culler, N. M. Dunfield, M. Goerner, J. R. Weeks.', title: 'SnapPy, a computer program for studying the topology and geometry of 3-manifolds.', cite: 'snappy.computop.org (2024).', note: 'All volumes computed here.' },
  { authors: 'E. Witten.', title: '“Quantum field theory and the Jones polynomial.”', cite: 'Comm. Math. Phys. 121, 351 (1989).', note: 'Integer level quantisation in the compact theory.' },
  { authors: 'E. Witten.', title: '“Analytic continuation of Chern–Simons theory.”', cite: 'AMS/IP Studies in Adv. Math. 50, 347–446 (2010). arXiv:1001.2933.', note: 'Non-integer level via contour prescription.' },
  { authors: 'T. Dimofte.', title: '“Perturbative and nonperturbative aspects of complex Chern–Simons theory.”', cite: 'J. Phys. A 50, 443009 (2017). arXiv:1608.02961.', note: '' },
  { authors: 'C. Cao, G. R. Meyerhoff.', title: '“The orientable cusped hyperbolic 3-manifolds of minimum volume.”', cite: 'Inventiones Mathematicae 146, 451 (2001).', note: 'Figure-eight knot 4₁ as the minimum-volume manifold (the electron).' },
  { authors: 'J. Hoste, M. Thistlethwaite, J. Weeks.', title: '“The first 1,701,936 knots.”', cite: 'The Mathematical Intelligencer 20, 33 (1998).', note: 'The Hoste–Thistlethwaite knot tables.' },
  { authors: 'P. J. Callahan, M. V. Hildebrand, J. R. Weeks.', title: '“A census of cusped hyperbolic 3-manifolds.”', cite: 'Mathematics of Computation 68, 321 (1999).', note: 'The cusped manifold census (down quark, proton link).' },
  { authors: 'Particle Data Group, S. Navas et al.', title: '“Review of particle physics.”', cite: 'Physical Review D 110, 030001 (2024).', note: 'All actual masses (PDG 2024).' },
];

/* ───────────────────────── Math helpers ───────────────────────── */

const Frac: React.FC<{ num: React.ReactNode; den: React.ReactNode }> = ({ num, den }) => (
  <span className="inline-flex flex-col items-center align-middle mx-1 leading-none">
    <span className="px-1.5 pb-0.5">{num}</span>
    <span className="px-1.5 pt-0.5 border-t border-ink/60">{den}</span>
  </span>
);

const fmtMass = (v: number) =>
  v >= 1000 ? `${(v / 1000).toLocaleString(undefined, { maximumFractionDigits: 1 })}k` : `${v}`;

const fmtMassFull = (v: number) =>
  v >= 1000
    ? v.toLocaleString(undefined, { maximumFractionDigits: 0 })
    : v.toFixed(v < 10 ? 3 : 2);

/* ───────────────────────── Component ───────────────────────── */

const TheDualBubble: React.FC = () => {
  // Single source of truth for the interactive system: a hyperbolic volume.
  // The slider, the 3-D knot, and the particle ladder all read/write it.
  const [vol, setVol] = useState(particles[0].V); // electron

  const nearestIdx = useMemo(() => {
    let best = 0, bd = Infinity;
    particles.forEach((p, i) => { const d = Math.abs(p.V - vol); if (d < bd) { bd = d; best = i; } });
    return best;
  }, [vol]);
  const selected = particles[nearestIdx];
  const predMass = M0 * Math.exp(vol);
  const selectedPoint = [{ x: selected.actual, y: selected.pred, name: selected.name }];

  return (
    <article>
      {/* Masthead */}
      <header className="max-w-page mx-auto px-6 lg:px-10 pt-20 md:pt-24 pb-16 border-b border-ink/20">
        <p className="eyebrow mb-6 text-flag-gold">— Paper · Theoretical Physics · April 2026</p>
        <h1 className="display text-5xl md:text-6xl lg:text-7xl font-semibold text-ink tracking-tightish">
          The Dual Bubble Hypothesis.{' '}
          <span className="font-normal italic text-flag-red">
            Particle masses from the volumes of knots.
          </span>
        </h1>
        <p className="serif italic text-xl md:text-2xl text-ink/80 mt-10 max-w-measure leading-snug">
          Suppose the universe is two balls glued along a sphere — one{' '}
          <span className="not-italic font-medium">spherical (B³),</span> one{' '}
          <span className="not-italic font-medium">hyperbolic (H³)</span> — and every particle is a{' '}
          <span className="not-italic font-medium">knot</span> threading the seam. Then one formula,{' '}
          <span className="not-italic font-medium">m = m₀·exp(V),</span> fixes all twelve Standard Model
          masses with no dials to turn.
        </p>

        <dl className="mt-10 grid grid-cols-2 md:flex md:flex-wrap gap-x-10 gap-y-4 text-xs mono text-muted">
          <div><dt className="inline">By </dt><dd className="inline text-ink font-medium">Sarvin Samuel Bastin · Vaibhav Mankar</dd></div>
          <div><dt className="inline">Reading </dt><dd className="inline text-ink font-medium">18 min</dd></div>
          <div><dt className="inline">Sources </dt><dd className="inline text-ink font-medium">15 cited</dd></div>
          <div><dt className="inline">Topic </dt><dd className="inline text-ink font-medium">Knot theory · Particle physics</dd></div>
        </dl>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href="#geometry"
            className="inline-flex items-center gap-2 bg-ink text-paper px-5 py-2.5 text-sm font-medium hover:bg-ink/90 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Orbit the dual bubble ↓
          </a>
          <a
            href="#results"
            className="inline-flex items-center gap-2 border border-ink/30 text-ink px-5 py-2.5 text-sm font-medium hover:border-ink transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Sweep the mass spectrum ↓
          </a>
        </div>
      </header>

      {/* Abstract */}
      <section className="max-w-page mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <aside className="md:col-span-3">
            <div className="eyebrow text-flag-gold">Abstract</div>
          </aside>
          <div className="md:col-span-9 max-w-measure">
            <p className="abstract">
              We present a framework in which the universe consists of two Riemannian 3-manifolds — a
              spherical ball B³ and a hyperbolic ball H³ — sharing an interface at |z| = 1. A single
              sign flip in the conformal factor, (1 + |z|²) → (1 − |z|²), generates the dual structure.
              Particles are knots embedded at this interface, and the mass of each particle is{' '}
              <span className="serif italic">m(K) = m₀·exp(V(K)),</span> where V(K) is the hyperbolic
              volume of the knot complement — a topological invariant fixed by Mostow rigidity — and
              m₀ = 0.06712 MeV is set by identifying the electron with the figure-eight knot 4₁.
            </p>
            <p className="mt-6 text-muted leading-relaxed max-w-prose">
              The formula reproduces the masses of 12 Standard Model particles with zero tunable moduli,
              requiring only a single global scale factor. Mean fermion error: 0.28%. Statistical
              significance p &lt; 0.00002 across 50,000 Monte-Carlo trials. The proton follows as a
              3-component hyperbolic link with a 2 + 1 cusp structure mirroring its uud content. All
              computations use SnapPy 3.3.2 and are reproducible.
            </p>
          </div>
        </div>
      </section>

      {/* §01 — The geometry */}
      <section id="geometry" className="rule">
        <div className="max-w-page mx-auto px-6 lg:px-10 py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <aside className="md:col-span-3">
              <div className="eyebrow text-flag-gold">§ 01 · The geometric framework</div>
              <h2 className="serif text-2xl text-ink mt-2 leading-tight">
                Two balls, one seam, and a single{' '}
                <span className="italic text-flag-red font-normal">change of sign.</span>
              </h2>
            </aside>
            <div className="md:col-span-9 max-w-measure has-dropcap space-y-5 text-ink leading-relaxed">
              <p>
                The Standard Model has 19 free parameters. Twelve of them are particle masses — nine
                fermions and three bosons — spanning five and a half orders of magnitude, from the
                electron at 0.511 MeV to the top quark at 173,000 MeV. They have no known theoretical
                origin. They are measured, then inserted into the theory by hand.
              </p>
              <p>
                We work with two Riemannian 3-manifolds. The first is the spherical ball{' '}
                <span className="mono text-sm">B³</span>, the unit ball with the round metric of constant
                positive curvature — the observable universe, where massive particles live in the
                interior. The second is the hyperbolic ball <span className="mono text-sm">H³</span>, the
                same unit ball carrying the Poincaré metric of constant negative curvature, in which
                volume grows exponentially with depth.
              </p>
              <p>
                At the boundary |z| = 1 the two metrics share an interface. Their conformal factors
                differ by exactly one sign:
              </p>

              {/* Sign-flip formula */}
              <div className="my-4 flex flex-wrap items-center gap-6 justify-center py-6 border-y border-hairline bg-white">
                <span className="serif text-lg text-ink flex items-center">
                  ds²<sub className="text-xs">B</sub> =
                  <Frac num={<span>4R²|dz|²</span>} den={<span>(1 + |z|²)²</span>} />
                </span>
                <span className="mono text-flag-red text-xl">→</span>
                <span className="serif text-lg text-ink flex items-center">
                  ds²<sub className="text-xs">H</sub> =
                  <Frac num={<span>4R²|dz|²</span>} den={<span>(1 − |z|²)²</span>} />
                </span>
              </div>

              <p>
                That sign flip is the entire content of the dual bubble hypothesis, expressed
                metrically. An <span className="italic">interface knot</span> is a closed curve that
                crosses the seam at least once. Crucially, its crossings are not artefacts of drawing a
                3-D curve on paper — they are physical transitions between the two metric regimes. Each
                crossing is a point where the curvature sign changes along the curve.
              </p>
            </div>
          </div>

          {/* Figure 1 — the interactive dual bubble (native Three.js, site palette) */}
          <figure className="mt-16 border border-hairline bg-white">
            <figcaption className="px-6 pt-6 pb-4 border-b border-hairline">
              <p className="eyebrow text-flag-gold">Figure 1 · Interactive · the dual bubble in 3-D</p>
              <h3 className="serif text-xl font-semibold text-ink mt-2">The B³ / H³ interface with an embedded knot</h3>
              <p className="text-sm text-muted mt-1 max-w-prose">
                The ink globe is the spherical ball B³ (κ = +1/R², positive curvature). The gold web is
                the hyperbolic ball H³ (κ = −1/R²): its geodesics meet the seam at right angles and{' '}
                <span className="italic">diverge</span> outward — so it is <span className="italic">not</span>{' '}
                a round shell. They meet at the interface |z| = 1, the three solid rings. The coloured
                tube is the{' '}
                <span className="text-ink font-medium">{selected.name}</span>&rsquo;s knot,{' '}
                <span className="mono text-ink">{selected.manifold}</span> — red dots mark where it
                crosses the seam. Drag to orbit; pick a particle to swap the knot.
              </p>
            </figcaption>

            <DualBubbleScene particle={sceneParticles[nearestIdx]} className="aspect-[16/10] min-h-[420px] md:min-h-[520px]" />

            {/* Particle selector — drives the shared volume */}
            <div className="px-4 py-3 border-t border-hairline flex flex-wrap gap-1.5" role="group" aria-label="Select a particle to render its knot">
              {particles.map((p, i) => (
                <button
                  key={p.n}
                  type="button"
                  onClick={() => setVol(p.V)}
                  aria-pressed={i === nearestIdx}
                  className={`mono text-[10px] tracking-[0.06em] uppercase px-2.5 py-1.5 border transition-colors cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent ${
                    i === nearestIdx
                      ? 'bg-ink text-paper border-ink'
                      : 'border-hairline text-muted hover:border-ink hover:text-ink'
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>

            {/* Legend */}
            <div className="px-6 py-3 border-t border-hairline flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted">
              <span className="flex items-center gap-2"><span className="inline-block w-4 border-t" style={{ borderColor: INK }} /> B³ — spherical interior</span>
              <span className="flex items-center gap-2"><svg width="20" height="10" aria-hidden><path d="M1 9 Q10 -4 19 9" fill="none" stroke={FLAG_GOLD} strokeWidth="1.5" /></svg> H³ — diverging geodesics</span>
              <span className="flex items-center gap-2"><span className="inline-block w-4 h-1.5 rounded-full" style={{ background: selected.type === 'lepton' ? ACCENT : selected.type === 'quark' ? FLAG_GREEN : FLAG_GOLD }} /> knot = the particle</span>
              <span className="flex items-center gap-2"><span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: FLAG_RED }} /> interface crossing</span>
            </div>

            <figcaption className="px-6 py-3 border-t border-hairline mono text-[10px] tracking-[0.08em] uppercase text-muted leading-relaxed">
              Rendered live with Three.js / WebGL in the site palette. Knot curves are schematic visual
              aids — the figure-eight (4₁) for the electron, stylised torus knots of rising complexity
              for the rest — not literal SnapPy renders. For a hyperbolic knot K, the complement S³ ∖ K
              admits a complete hyperbolic structure (Thurston); its volume V(K) is a topological
              invariant by Mostow rigidity.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* §02 — The mass formula */}
      <section id="formula" className="rule">
        <div className="max-w-page mx-auto px-6 lg:px-10 py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <aside className="md:col-span-3">
              <div className="eyebrow text-flag-gold">§ 02 · The mass formula</div>
              <h2 className="serif text-2xl text-ink mt-2 leading-tight">
                Mass is the exponential of a{' '}
                <span className="italic text-flag-red font-normal">volume.</span>
              </h2>
            </aside>
            <div className="md:col-span-9 max-w-measure space-y-5 text-ink leading-relaxed">
              <p>
                A knot at the interface is a topological defect — a localised obstruction to continuing
                the metric smoothly across the seam. The energy of that defect is computed by the
                analytically continued SL(2,ℂ) Chern–Simons partition function. Two independent
                arguments — interface energy, and the Euclidean action principle (mass as the
                exponential of a defect&rsquo;s action) — identify the magnitude |Z| of that partition
                function with the particle&rsquo;s mass.
              </p>
              <p>
                The perturbative expansion of Gukov, Dimofte and Zagier is dominated by the complex
                volume Vol<sub>ℂ</sub>(M) = V(M) + i·CS(M). Taking the magnitude, the leading behaviour
                is |Z| ∼ exp((k / 4π)·V(M)). The interface curvature mismatch fixes the level at k = 4π,
                so the exponent is simply the hyperbolic volume. The result:
              </p>

              {/* The boxed formula */}
              <div className="my-8 border-2 border-ink bg-white px-6 py-8 text-center">
                <p className="serif text-3xl md:text-4xl text-ink">
                  m(M) = m<sub className="text-lg">0</sub> · exp&#8202;( V(M) )
                </p>
                <p className="mt-5 text-sm text-muted max-w-prose mx-auto leading-relaxed">
                  where V(M) is the hyperbolic volume of the manifold (a knot complement, or a link
                  complement for composites), and{' '}
                  <span className="serif italic">m₀ = mₑ / exp(V(4₁)) = 0.511 / exp(2.0299) = 0.06712 MeV.</span>{' '}
                  The electron is the figure-eight knot 4₁ — the unique knot of smallest hyperbolic
                  volume.
                </p>
              </div>

              <p>
                The formula is absolutely rigid. It contains no tuning dials, no mixing angles, no
                continuous moduli. Mass <span className="italic">ratios</span> are entirely
                parameter-free: m(M₁)/m(M₂) = exp( V(M₁) − V(M₂) ). The single global scale factor m₀
                only sets the unit — it calibrates topological volumes to physical energy scales, once,
                using the lightest charged lepton.
              </p>

              {/* Topological spectroscopy callout */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-px bg-hairline border border-hairline">
                {[
                  ['Hyperbolic volume', 'determines mass'],
                  ['Cusp count', 'determines valence-quark number'],
                  ['Cusp symmetry', 'reflects flavour content'],
                  ['Chern–Simons invariant', 'encodes parity'],
                ].map(([k, v]) => (
                  <div key={k} className="bg-white p-5">
                    <div className="mono text-[11px] tracking-[0.1em] uppercase text-flag-gold">{k}</div>
                    <div className="serif text-lg text-ink mt-1">{v}</div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted mt-3">
                A rigid classification scheme: geometric invariants map directly onto physical quantum
                numbers. The authors call it <span className="italic">topological spectroscopy.</span>
              </p>
            </div>
          </div>

          {/* Figure 2 — interactive volume explorer */}
          <figure className="mt-16 border border-hairline bg-white">
            <figcaption className="px-6 pt-6 pb-4 border-b border-hairline">
              <p className="eyebrow text-flag-gold">Figure 2 · Interactive · one exponential, every mass</p>
              <h3 className="serif text-xl font-semibold text-ink mt-2">Sweep a knot&rsquo;s volume across the mass spectrum</h3>
              <p className="text-sm text-muted mt-1 max-w-prose">
                Because mass is the exponential of volume, the relation is a straight line on a log scale.
                Drag the slider — or pick a particle in the table below — and the mass rides the curve.
              </p>
            </figcaption>
            <div className="grid grid-cols-1 lg:grid-cols-3">
              <div className="lg:col-span-2 h-72 md:h-80 p-4 border-b lg:border-b-0 lg:border-r border-hairline">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={curveData} margin={{ top: 16, right: 20, bottom: 32, left: 28 }}>
                    <CartesianGrid stroke="#F3F3F2" />
                    <XAxis
                      type="number" dataKey="v" domain={[1.6, 15.4]} ticks={[2, 4, 6, 8, 10, 12, 14]}
                      tick={axisTick} stroke={HAIRLINE}
                      label={{ value: 'HYPERBOLIC VOLUME  V', position: 'bottom', offset: 12, style: axisLabelStyle }}
                    />
                    <YAxis
                      type="number" dataKey="m" scale="log" domain={[0.3, 300000]}
                      ticks={[1, 10, 100, 1000, 10000, 100000]} tick={axisTick} stroke={HAIRLINE}
                      tickFormatter={fmtMass}
                      label={{ value: 'MASS (MeV)', angle: -90, position: 'insideLeft', offset: -10, style: axisLabelStyle }}
                    />
                    <Tooltip
                      contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle}
                      formatter={(val: any) => [`${fmtMass(val)} MeV`, 'mass']}
                      labelFormatter={(l: any) => `V = ${l}`}
                    />
                    <Line type="monotone" dataKey="m" stroke={MUTED} dot={false} strokeWidth={1.5} isAnimationActive={false} />
                    {particles.map((p) => (
                      <ReferenceDot key={p.n} x={p.V} y={p.pred} r={3}
                        fill={p.type === 'boson' ? FLAG_GOLD : p.type === 'lepton' ? ACCENT : FLAG_GREEN} stroke="none" />
                    ))}
                    <ReferenceDot x={vol} y={predMass} r={7} fill={ACCENT} stroke="#fff" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="p-6">
                <p className="eyebrow text-flag-gold">Volume explorer</p>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="mono text-xs text-muted">V =</span>
                  <span className="serif text-4xl text-ink tabular-nums">{vol.toFixed(3)}</span>
                </div>
                <input
                  type="range" min={1.6} max={15.4} step={0.01} value={vol}
                  onChange={(e) => setVol(parseFloat(e.target.value))}
                  aria-label="Hyperbolic volume"
                  className="w-full mt-4 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  style={{ accentColor: ACCENT }}
                />
                <p className="serif text-sm text-ink mt-6">m = m₀·e<sup>V</sup> =</p>
                <p className="serif text-4xl text-flag-red mt-1 tabular-nums">{fmtMassFull(predMass)}<span className="text-lg text-muted"> MeV</span></p>
                <div className="mt-5 pt-4 border-t border-hairline">
                  <p className="mono text-[10px] tracking-[0.1em] uppercase text-muted">Nearest particle</p>
                  <p className="serif text-lg text-ink mt-1">{selected.name} <span className="mono text-xs text-muted">· {selected.manifold}</span></p>
                  <p className="mono text-[11px] text-muted mt-1">measured {selected.actual.toLocaleString()} MeV · {selected.err.toFixed(2)}% error</p>
                </div>
              </div>
            </div>
            <figcaption className="px-6 py-3 border-t border-hairline mono text-[10px] tracking-[0.08em] uppercase text-muted leading-relaxed">
              m₀ = 0.06712 MeV is the only scale, fixed by identifying the electron with the figure-eight
              knot 4₁ (V = 2.030).
            </figcaption>
          </figure>
        </div>
      </section>

      {/* §03 — The 12-particle table */}
      <section id="results" className="rule">
        <div className="max-w-page mx-auto px-6 lg:px-10 py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <aside className="md:col-span-3">
              <div className="eyebrow text-flag-gold">§ 03 · Twelve particles, one equation</div>
              <h2 className="serif text-2xl text-ink mt-2 leading-tight">
                Every Standard Model mass, from a table of{' '}
                <span className="italic text-flag-green font-normal">knot volumes.</span>
              </h2>
            </aside>
            <div className="md:col-span-9 max-w-measure">
              <p className="text-ink leading-relaxed">
                Hyperbolic volumes were computed with SnapPy 3.3.2 over the Hoste–Thistlethwaite knot
                tables (313,216 knots) and the Callahan–Hildebrand–Weeks cusped census (212,641+
                manifolds). For each particle, the required volume is V = V(4₁) + ln(m / mₑ); the
                simplest manifold nearest that volume is the assignment. <span className="font-medium">12
                of 12 match within 5%.</span>{' '}
                <span className="text-muted">Select any row to render its knot in the model above and
                mark it on the explorer curve.</span>
              </p>
            </div>
          </div>

          {/* Table I */}
          <div className="mt-12 overflow-x-auto border border-hairline bg-white">
            <table className="data-table min-w-[680px]">
              <thead>
                <tr>
                  <th className="!text-right">#</th>
                  <th>Particle</th>
                  <th>Type</th>
                  <th>Manifold</th>
                  <th className="!text-right">Volume</th>
                  <th className="!text-right">Predicted (MeV)</th>
                  <th className="!text-right">Actual (MeV)</th>
                  <th className="!text-right">Error</th>
                </tr>
              </thead>
              <tbody>
                {particles.map((p, i) => {
                  const active = i === nearestIdx;
                  return (
                    <tr
                      key={p.n}
                      onClick={() => setVol(p.V)}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setVol(p.V); } }}
                      tabIndex={0}
                      role="button"
                      aria-pressed={active}
                      aria-label={`Select ${p.name}`}
                      className={`cursor-pointer transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent ${active ? 'bg-accent/[0.06]' : 'hover:bg-ink/[0.03]'}`}
                    >
                      <td className="num !text-right text-muted">
                        <span style={{ color: ACCENT }}>{active ? '▸ ' : ''}</span>{p.n}
                      </td>
                      <td className="serif font-semibold" style={{ color: active ? ACCENT : undefined }}>{p.name}</td>
                      <td className="text-muted text-sm">{p.type}</td>
                      <td className="num text-sm">{p.manifold}</td>
                      <td className="num !text-right">{p.V.toFixed(3)}</td>
                      <td className="num !text-right">{p.pred.toLocaleString()}</td>
                      <td className="num !text-right">{p.actual.toLocaleString()}</td>
                      <td className="num !text-right" style={{ color: p.err <= 0.5 ? FLAG_GREEN : p.err <= 2 ? FLAG_GOLD : FLAG_RED }}>
                        {p.err.toFixed(2)}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mono text-[10px] tracking-[0.08em] uppercase text-muted leading-relaxed mt-3">
            Table I · m = m₀·exp(V) applied uniformly with m₀ = 0.06712 MeV. Actual masses from PDG 2024.
          </p>

          {/* Figure 2 — predicted vs actual (log-log) */}
          <figure className="mt-16 border border-hairline bg-white">
            <figcaption className="px-6 pt-6 pb-4 border-b border-hairline">
              <p className="eyebrow text-flag-gold">Figure 3 · One free parameter, 5.5 orders of magnitude</p>
              <h3 className="serif text-xl font-semibold text-ink mt-2">Predicted mass vs. actual mass</h3>
              <p className="text-sm text-muted mt-1 max-w-prose">
                Every particle — and the proton — lies on the diagonal of perfect agreement, across a
                span from the electron (0.5 MeV) to the top quark (173 GeV). The ring marks your current
                selection.
              </p>
            </figcaption>
            <div className="h-80 md:h-96 p-4">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 16, right: 24, bottom: 36, left: 36 }}>
                  <CartesianGrid stroke="#F3F3F2" />
                  <XAxis
                    type="number" dataKey="x" name="Actual" scale="log" domain={[0.2, 300000]}
                    ticks={[1, 10, 100, 1000, 10000, 100000]} tick={axisTick} stroke={HAIRLINE}
                    tickFormatter={fmtMass}
                    label={{ value: 'ACTUAL MASS (MeV)', position: 'bottom', offset: 14, style: axisLabelStyle }}
                  />
                  <YAxis
                    type="number" dataKey="y" name="Predicted" scale="log" domain={[0.2, 300000]}
                    ticks={[1, 10, 100, 1000, 10000, 100000]} tick={axisTick} stroke={HAIRLINE}
                    tickFormatter={fmtMass}
                    label={{ value: 'PREDICTED MASS (MeV)', angle: -90, position: 'insideLeft', offset: -12, style: axisLabelStyle }}
                  />
                  <ReferenceLine
                    ifOverflow="extendDomain"
                    segment={[{ x: 0.2, y: 0.2 }, { x: 300000, y: 300000 }]}
                    stroke={MUTED} strokeDasharray="5 5"
                  />
                  <Tooltip
                    cursor={{ stroke: HAIRLINE }}
                    contentStyle={tooltipStyle}
                    labelStyle={tooltipLabelStyle}
                    formatter={(_v: any, _n: any, p: any) =>
                      [`pred ${fmtMass(p.payload.y)} · actual ${fmtMass(p.payload.x)} MeV`, p.payload.name]
                    }
                  />
                  <Scatter name="Fermions" data={fermionPoints} fill={ACCENT} shape="circle" />
                  <Scatter name="Bosons" data={bosonPoints} fill={FLAG_RED} shape="square" />
                  <Scatter name="Proton (composite)" data={protonPoint} fill={FLAG_GREEN} shape="diamond" />
                  <Scatter
                    name="Selected" data={selectedPoint} fill="none" isAnimationActive={false}
                    shape={(props: any) => (
                      <circle cx={props.cx} cy={props.cy} r={9} fill="none" stroke={ACCENT} strokeWidth={2} />
                    )}
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
            <div className="px-6 py-3 border-t border-hairline flex flex-wrap items-center gap-6">
              <span className="flex items-center gap-2 text-xs text-muted">
                <span className="inline-block w-3 h-3 rounded-full" style={{ background: ACCENT }} /> Fermions
              </span>
              <span className="flex items-center gap-2 text-xs text-muted">
                <span className="inline-block w-3 h-3" style={{ background: FLAG_RED }} /> Bosons
              </span>
              <span className="flex items-center gap-2 text-xs text-muted">
                <span className="inline-block w-3 h-3 rotate-45" style={{ background: FLAG_GREEN }} /> Proton (composite)
              </span>
              <span className="flex items-center gap-2 text-xs text-muted">
                <span className="inline-block w-6 border-t border-dashed" style={{ borderColor: MUTED }} /> Perfect agreement
              </span>
            </div>
          </figure>

          {/* Figure 3 — per-particle error */}
          <figure className="mt-16 border border-hairline bg-white">
            <figcaption className="px-6 pt-6 pb-4 border-b border-hairline">
              <p className="eyebrow text-flag-gold">Figure 4 · The size of the misses</p>
              <h3 className="serif text-xl font-semibold text-ink mt-2">Mass error by particle (%)</h3>
              <p className="text-sm text-muted mt-1 max-w-prose">
                All three bosons land within 0.05%. The largest miss is the up quark at 1.54% — itself
                inside the experimental uncertainty band for the light quark masses.
              </p>
            </figcaption>
            <div className="h-72 md:h-80 p-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={errorData} margin={{ top: 16, right: 24, bottom: 36, left: 8 }}>
                  <CartesianGrid stroke="#F3F3F2" vertical={false} />
                  <XAxis dataKey="name" tick={{ ...axisTick, fontSize: 9 }} stroke={HAIRLINE} angle={-35} textAnchor="end" height={50} interval={0} />
                  <YAxis
                    tick={axisTick} stroke={HAIRLINE} domain={[0, 1.8]} tickFormatter={(v: number) => `${v}%`}
                    label={{ value: 'MASS ERROR (%)', angle: -90, position: 'insideLeft', offset: 4, style: axisLabelStyle }}
                  />
                  <Tooltip
                    cursor={{ fill: 'rgba(0,0,0,0.04)' }}
                    contentStyle={tooltipStyle}
                    labelStyle={tooltipLabelStyle}
                    formatter={(v: any) => [`${v}% error`, '']}
                  />
                  <Bar dataKey="err">
                    {errorData.map((d, i) => (
                      <Cell key={i} fill={d.type === 'boson' ? FLAG_GREEN : d.type === 'lepton' ? ACCENT : FLAG_GREEN_SOFT} />
                    ))}
                    <LabelList dataKey="err" position="top" formatter={(v: any) => `${Number(v).toFixed(2)}`} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, fill: INK }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <figcaption className="px-6 py-3 border-t border-hairline mono text-[10px] tracking-[0.08em] uppercase text-muted leading-relaxed">
              Leptons (blue), quarks (green), bosons (dark green). Mean fermion error 0.28%.
            </figcaption>
          </figure>

          {/* Significance panel */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 border border-ink">
            <div className="p-8 md:border-r md:border-ink" style={{ background: 'rgba(21,128,61,0.04)' }}>
              <span className="inline-block mono text-[10px] font-semibold tracking-[0.18em] uppercase px-2.5 py-1 bg-flag-green text-paper">The result</span>
              <p className="serif text-5xl font-semibold text-ink mt-5">Σ error = 2.6%</p>
              <p className="text-sm text-ink/80 mt-3 leading-relaxed">
                Total mass error across all twelve particles, with a single free parameter.
              </p>
            </div>
            <div className="p-8 border-t md:border-t-0 border-ink" style={{ background: 'rgba(153,27,27,0.04)' }}>
              <span className="inline-block mono text-[10px] font-semibold tracking-[0.18em] uppercase px-2.5 py-1 bg-flag-red text-paper">Random chance</span>
              <p className="serif text-5xl font-semibold text-ink mt-5">3,557%</p>
              <p className="text-sm text-ink/80 mt-3 leading-relaxed">
                Median total error from 50,000 random knot-volume assignments. Not one of 50,000 trials
                beats the 13.6% threshold — <span className="font-medium">p &lt; 0.00002.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* §04 — The proton (full-bleed dark) */}
      <section id="proton" className="bleed-dark">
        <div className="max-w-page mx-auto px-6 lg:px-10 py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <aside className="md:col-span-3">
              <div className="eyebrow">§ 04 · The proton as a link</div>
              <h2 className="serif text-2xl mt-2 leading-tight">
                Three quarks become three rings, and{' '}
                <span className="italic" style={{ color: '#C2A269', fontWeight: 400 }}>confinement</span>{' '}
                becomes a negative volume.
              </h2>
            </aside>
            <div className="md:col-span-9 max-w-measure">
              <p className="leading-relaxed text-paper/85">
                A single knot models a fundamental particle. A <span className="italic">link</span> —
                several knotted curves embedded together — models a composite. The number of cusps of the
                link complement equals the number of constituent quarks, and the same formula applies
                unchanged: m(hadron) = m₀·exp(V(link complement)).
              </p>
            </div>
          </div>

          {/* Figure 4 — proton volume decomposition */}
          <figure className="mt-14 border border-paper/15 bg-paper">
            <figcaption className="px-6 pt-6 pb-4 border-b border-hairline">
              <p className="eyebrow text-flag-gold">Figure 5 · Linking compresses volume</p>
              <h3 className="serif text-xl font-semibold text-ink mt-2">Volume decomposition of the proton (uud)</h3>
              <p className="text-sm text-muted mt-1 max-w-prose">
                The sum of the three quark volumes (11.21) exceeds the bound link volume (9.54). The
                difference is a negative binding volume, V<sub>binding</sub> = −1.675 — the topological
                signature of quark confinement.
              </p>
            </figcaption>
            <div className="h-72 md:h-80 p-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={protonVol} layout="vertical" margin={{ top: 12, right: 40, bottom: 28, left: 24 }}>
                  <CartesianGrid stroke="#F3F3F2" horizontal={false} />
                  <XAxis
                    type="number" domain={[0, 12]} tick={axisTick} stroke={HAIRLINE}
                    label={{ value: 'HYPERBOLIC VOLUME V', position: 'bottom', offset: 12, style: axisLabelStyle }}
                  />
                  <YAxis
                    type="category" dataKey="label" width={120}
                    tick={{ fontSize: 12, fontFamily: 'Crimson Pro, serif', fill: INK, fontWeight: 600 }}
                    stroke={HAIRLINE}
                  />
                  <Tooltip
                    cursor={{ fill: 'rgba(0,0,0,0.04)' }}
                    contentStyle={tooltipStyle}
                    labelStyle={tooltipLabelStyle}
                    formatter={(v: any) => [`V = ${v}`, '']}
                  />
                  <Bar dataKey="v">
                    {protonVol.map((d, i) => {
                      const fill = d.kind === 'up' ? ACCENT
                        : d.kind === 'down' ? '#C2701C'
                        : d.kind === 'sum' ? MUTED
                        : FLAG_GREEN;
                      return <Cell key={i} fill={fill} />;
                    })}
                    <LabelList dataKey="v" position="right" formatter={(v: any) => Number(v).toFixed(2)} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, fill: INK, fontWeight: 600 }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <figcaption className="px-6 py-3 border-t border-hairline mono text-[10px] tracking-[0.08em] uppercase text-muted leading-relaxed">
              Proton link candidate o10_149348 · V = 9.540 · predicted mass 933.1 MeV vs actual 938.272 MeV (0.55% error).
            </figcaption>
          </figure>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-3" aria-hidden />
            <div className="md:col-span-9 max-w-measure space-y-5 leading-relaxed text-paper/90">
              <p>
                In QCD, 99% of the proton&rsquo;s mass comes from binding energy, not quark masses. Here,
                the proton mass comes entirely from the link-complement volume — the binding is already
                baked into the manifold&rsquo;s geometry. No component can be separated without cutting
                the link, a topologically forbidden operation. That is confinement, stated as topology.
              </p>

              {/* Pull quote */}
              <blockquote className="my-8 py-6 pl-6" style={{ borderLeft: '3px solid #C2A269', background: 'rgba(194,162,105,0.05)' }}>
                <p className="serif italic text-2xl text-paper/95 leading-snug">
                  “The link complement is smaller than the sum of its parts. Linking compresses volume —
                  and that compression is the binding energy of the strong force.”
                </p>
              </blockquote>

              <p>
                The candidate is not chosen by hand. A scan of the cusped census near V = 9.545 returns
                an exact topological doublet — o10_149348 and o10_149349 — sharing identical volume to 15
                decimal places, identical homology, and the ℤ/2 × ℤ/2 symmetry of the two interchangeable
                up quarks. They are distinguished by a single invariant: the Chern–Simons phase.
              </p>
            </div>
          </div>

          {/* Table II — the doublet */}
          <div className="mt-12 overflow-x-auto border border-paper/15 bg-paper">
            <table className="data-table min-w-[560px]">
              <thead>
                <tr>
                  <th>Property</th>
                  <th>o10_149348 (proton)</th>
                  <th>o10_149349 (twin)</th>
                </tr>
              </thead>
              <tbody>
                {protonDoublet.map((row) => (
                  <tr key={row[0]}>
                    <td className="text-muted">{row[0]}</td>
                    <td className="serif font-medium text-ink">{row[1]}</td>
                    <td className="serif text-ink">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-3" aria-hidden />
            <div className="md:col-span-9 max-w-measure space-y-5 leading-relaxed text-paper/90">
              <p>
                The physical proton is parity-even (Jᴾ = ½⁺), which requires CS near 0. That selects
                o10_149348 uniquely. Its twin, o10_149349, sits at CS ≈ ¼ — a parity-odd state that
                topology permits but nature does not realise. The framework thus{' '}
                <span style={{ color: '#C2A269' }} className="font-semibold">retrodicts</span> the
                observed absence of a light negative-parity partner to the proton. Five independent
                structural confirmations agree: the right cusp count (3 = valence quarks), the 2 + 1 cusp
                symmetry (two identical + one distinct = uud), a negative binding volume, the parity-even
                Chern–Simons phase, and the absent-twin retrodiction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* §05 — Selection principle */}
      <section id="selection" className="rule">
        <div className="max-w-page mx-auto px-6 lg:px-10 py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <aside className="md:col-span-3">
              <div className="eyebrow text-flag-gold">§ 05 · The selection principle</div>
              <h2 className="serif text-2xl text-ink mt-2 leading-tight">
                Of all the knots in a volume window, nature picks the{' '}
                <span className="italic text-flag-red font-normal">simplest one.</span>
              </h2>
            </aside>
            <div className="md:col-span-9 max-w-measure space-y-5 text-ink leading-relaxed">
              <p>
                When the knot census expanded from 795 knots (4–11 crossings) to 313,216 knots (4–15
                crossings), three assignments stayed put — electron → 4₁, up → 9₂, tau → 9₂₁ — while six
                migrated to closer-volume knots. The three stable ones share a property: each has the{' '}
                <span className="font-medium">minimum crossing number</span> among all knots within 1% of
                its target volume. The tau&rsquo;s 9₂₁ is the simplest at V ≈ 10.18 despite 62 alternative
                knots in its window.
              </p>

              <blockquote className="my-8 py-8 border-t-2 border-b-2 border-ink">
                <p className="mono text-[10px] tracking-[0.18em] uppercase text-flag-gold mb-3">Conjecture 1 · Selection Principle</p>
                <p className="serif italic text-2xl md:text-3xl text-ink leading-snug">
                  The physically correct manifold for each particle is the one of minimum topological
                  complexity — crossing number, then tetrahedra as tiebreaker — within the 1% volume
                  window. Assignments satisfying this are stable under census expansion; those that do not
                  will converge as the census grows.
                </p>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* §06 — Predictions & falsification (dark) */}
      <section id="predictions" className="bleed-dark">
        <div className="max-w-page mx-auto px-6 lg:px-10 py-24">
          <span className="inline-block mono text-[10px] tracking-[0.18em] uppercase px-2.5 py-1 bg-flag-gold text-ink mb-6">§ 06 · Predictions &amp; falsification</span>
          <h2 className="serif text-3xl md:text-5xl font-semibold leading-tight max-w-4xl">
            A rigid theory is a falsifiable one. This one says exactly{' '}
            <span className="italic" style={{ color: '#C2A269', fontWeight: 400 }}>what would break it.</span>
          </h2>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Confirmed */}
            <div>
              <p className="mono text-[10px] tracking-[0.16em] uppercase mb-4" style={{ color: '#C2A269' }}>Confirmed</p>
              <ul className="space-y-3 text-[15px] leading-relaxed text-paper/90">
                {[
                  'All 9 fermion masses within 1.6% (8 within 0.5%).',
                  'All 3 boson masses within 0.05%.',
                  'Down-quark manifold exists in the cusped census (v0240, 0.09%).',
                  'Minimum crossing number = stable assignment (3 / 3).',
                  'Weinberg angle from the W/Z volume difference (0.15%).',
                  'Proton mass from a 3-cusp link (0.55%), with correct cusp symmetry and unique parity selection.',
                ].map((item, i) => (
                  <li key={i} className="pl-6 relative border-b border-paper/10 pb-3 last:border-b-0">
                    <span className="absolute left-0 top-0 text-flag-green">✓</span>{item}
                  </li>
                ))}
              </ul>
            </div>
            {/* Open / falsification */}
            <div>
              <p className="mono text-[10px] tracking-[0.16em] uppercase mb-4" style={{ color: '#E58C70' }}>Open questions &amp; what would falsify it</p>
              <ul className="space-y-3 text-[15px] leading-relaxed text-paper/90">
                {[
                  'Neutrinos: V < V(4₁) is impossible for knots — they may be vibrational modes of the interface itself, not localised defects.',
                  'Fractional charge: conjectured to follow from Dehn-surgery boundary framing — unproven here.',
                  'A new particle whose mass matches no hyperbolic manifold volume would break it.',
                  'If 16+ crossing census shows minimum-crossing manifolds do not converge to the right volumes.',
                  'If o10_149348’s cusp structure proves incompatible with uud on closer analysis.',
                  'If an alternative formula matches with fewer assumptions.',
                ].map((item, i) => (
                  <li key={i} className="pl-6 relative border-b border-paper/10 pb-3 last:border-b-0">
                    <span className="absolute left-0 top-0" style={{ color: '#E58C70' }}>✕</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="serif italic text-2xl text-paper mt-14 max-w-measure" style={{ textWrap: 'balance' as any }}>
            The Standard Model has 19 free parameters. This paper accounts for twelve of them with one
            equation — and extends the same equation to composite particles without modification.
          </p>
        </div>
      </section>

      {/* §07 — Reproducibility */}
      <section id="reproduce" className="rule">
        <div className="max-w-page mx-auto px-6 lg:px-10 py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <aside className="md:col-span-3">
              <div className="eyebrow text-flag-gold">§ 07 · Reproducibility</div>
              <h2 className="serif text-2xl text-ink mt-2 leading-tight">
                Every number above runs in{' '}
                <span className="italic text-flag-green font-normal">five seconds.</span>
              </h2>
            </aside>
            <div className="md:col-span-9 max-w-measure space-y-5 text-ink leading-relaxed">
              <p>
                The full result set is reproduced by a short Python script using SnapPy. Each
                particle&rsquo;s manifold is looked up by name, its volume computed from the ideal
                triangulation, and the mass read off as m₀·exp(V).
              </p>
              <div className="bg-[#0E1116] text-paper rounded-sm overflow-x-auto">
                <div className="px-4 py-2 border-b border-paper/10 mono text-[10px] tracking-[0.1em] uppercase text-paper/50">
                  verify_results.py · pip install snappy snappy_15_knots
                </div>
                <pre className="p-4 mono text-[12px] leading-relaxed text-paper/90 whitespace-pre">{`import snappy, math

M0 = 0.06712  # MeV, fixed by the electron

particles = [
    ("electron", 0.511,    "4_1"),
    ("up",       2.16,     "9_2"),
    ("down",     4.67,     "v0240"),
    ("muon",     105.66,   "K14n12205"),
    ("tau",      1776.86,  "9_21"),
    ("top",      173000.0, "K14n70"),
    # ... 12 fundamental particles
]

for name, mass, knot in particles:
    V = float(snappy.Manifold(knot).volume())
    pred = M0 * math.exp(V)
    err = abs(pred - mass) / mass * 100
    print(f"{name:>10}: V={V:.4f}  pred={pred:>10.2f}  err={err:.2f}%")

# composite: the proton as a 3-cusp link
P = snappy.Manifold("o10_149348")
print("proton:", M0 * math.exp(float(P.volume())), "MeV", P.num_cusps(), "cusps")`}</pre>
              </div>
              <p className="text-sm text-muted">
                Runtime ≈ 5 s. Sources: SnapPy 3.3.2, the Hoste–Thistlethwaite knot tables, and the
                Callahan–Hildebrand–Weeks cusped manifold census.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* §08 — Sources */}
      <section className="rule">
        <div className="max-w-page mx-auto px-6 lg:px-10 py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <aside className="md:col-span-3">
              <div className="eyebrow text-flag-gold">§ 08 · Fifteen citations</div>
              <h3 className="serif text-2xl text-ink mt-2 leading-tight">References &amp; further reading</h3>
            </aside>
            <ol className="md:col-span-9 max-w-measure list-none">
              {sources.map((s, i) => (
                <li key={i} className="grid grid-cols-[2.5rem_1fr] gap-4 py-4 border-b border-dotted border-hairline last:border-b-0">
                  <span className="mono text-xs text-flag-gold font-medium pt-1">{String(i + 1).padStart(2, '0')}</span>
                  <div className="text-sm leading-relaxed">
                    {s.authors && <span className="text-ink font-medium">{s.authors} </span>}
                    <span className="text-ink">{s.title}</span>{' '}
                    {s.cite && <span className="serif italic text-muted">{s.cite}</span>}
                    {s.note && <span className="text-muted"> {s.note}</span>}
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-14 pt-8 rule flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs mono text-muted">
            <span>© 2026 Null Field Research · Bastin &amp; Mankar · Computations in SnapPy 3.3.2</span>
            <div className="flex items-center gap-5">
              <a
                href={`${import.meta.env.BASE_URL}dual-bubble.html`}
                target="_blank" rel="noopener noreferrer"
                className="link mono"
              >
                Original full-screen companion ↗
              </a>
              <Link to="/writing" className="link mono">← More essays</Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
};

export default TheDualBubble;

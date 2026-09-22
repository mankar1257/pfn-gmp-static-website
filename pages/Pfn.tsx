import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import ParallaxImage from '../components/ParallaxImage';
import { GlyphConstantTime, GlyphFixedMemory, GlyphSymbolic, GlyphValidation } from '../components/diagrams';
import PhotoPlate from '../components/PhotoPlate';
import SectionNav from '../components/SectionNav';
import { Mark, Chapter, DataTable, Result, Boundary, Note } from '../components/Evidence';
import { scrollToEl } from '../lib/smooth-scroll';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ReferenceArea,
  ResponsiveContainer,
} from 'recharts';

/**
 * PFN — the published benchmark report, as a page.
 *
 * DISCLOSURE RULE: the published benchmark report is the ceiling for what
 * appears here. What PFN exploits is publishable; how it is built is not.
 * See the note at the top of components/Evidence.tsx before editing.
 */

const SECTIONS = [
  { id: 'glance', label: 'At a glance' },
  { id: 'dropin', label: 'Change one type' },
  { id: 'expert', label: 'vs expert GMP' },
  { id: 'scale', label: 'Too large to store' },
  { id: 'rational', label: 'Rational' },
  { id: 'method', label: 'How measured' },
];

const FADE_UP: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const PFN_C = '#0AA678';
const GMP_C = '#5B7FC7';
const LOSS_C = '#D9A441';

const axisTick = { fontSize: 11, fontFamily: 'JetBrains Mono, monospace', fill: '#94A3B8' } as const;
const tip = {
  contentStyle: {
    backgroundColor: '#0A0F0D',
    border: '1px solid rgba(255,255,255,0.15)',
    fontSize: 12,
    fontFamily: 'JetBrains Mono, monospace',
    color: '#F8FAFC',
  },
  labelStyle: { color: '#94A3B8', marginBottom: 4 },
};

const Pfn: React.FC = () => {
  /* Fig. 1 — drop-in: same source, one type changed */
  const dropIn = [
    { n: '10k', speedup: 0.31, gmp: 0.015, pfn: 0.048 },
    { n: '30k', speedup: 2.5, gmp: 0.142, pfn: 0.056 },
    { n: '100k', speedup: 15.8, gmp: 1.5, pfn: 0.095 },
    { n: '300k', speedup: 65.2, gmp: 14.618, pfn: 0.224 },
    { n: '1M', speedup: 220.5, gmp: 157.763, pfn: 0.716 },
  ];

  /* Per-operation cost, same finish line (chain + digits) for both.
     Derived arithmetic from the published totals above. */
  const perOp = [
    { n: '10k', pfn: 4.8, gmp: 1.5 },
    { n: '30k', pfn: 1.87, gmp: 4.73 },
    { n: '100k', pfn: 0.95, gmp: 15.0 },
    { n: '300k', pfn: 0.75, gmp: 48.73 },
    { n: '1M', pfn: 0.72, gmp: 157.76 },
    { n: '3M', pfn: 0.71, gmp: null },
    { n: '10M', pfn: 0.88, gmp: null },
  ];

  /* Fig. 3 — operating range against the expert schedule */
  const expertRange = [
    { n: '10k', f: 0.06 }, { n: '30k', f: 0.2 }, { n: '100k', f: 0.56 },
    { n: '300k', f: 0.96 }, { n: '1M', f: 1.41 }, { n: '3M', f: 1.6 }, { n: '10M', f: 1.73 },
  ];

  /* Fig. 5 — memory to hold a structured value */
  const holdMem = [
    { n: '1M', pfn: 4.0, gmp: 4.0 },
    { n: '16M', pfn: 4.0, gmp: 42.2 },
    { n: '64M', pfn: 4.0, gmp: 161 },
  ];

  /* Fig. 6 — exact rational chains */
  const rational = [
    { n: '10k', speedup: 5.1 }, { n: '100k', speedup: 26.9 }, { n: '1M', speedup: 159.8 },
  ];


  return (
    <div className="min-h-screen text-white">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative min-h-[80vh] flex items-center pt-24 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <ParallaxImage src="/assets/circuit-schematic.jpg" mode="hero" className="opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black/40"></div>
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div initial="initial" animate="animate" transition={{ staggerChildren: 0.1 }} className="max-w-6xl">
            <motion.div variants={FADE_UP} className="flex items-center gap-6 mb-12">
              <div className="h-[1px] w-12 bg-white/40"></div>
              <span className="eyebrow text-white/50">Core technology · PFN</span>
            </motion.div>

            <motion.h1 variants={FADE_UP} className="display text-5xl sm:text-6xl md:text-8xl text-white mb-8">
              Exact arithmetic that gets <br className="hidden md:block" />
              <span className="text-white/70">faster the longer you compute.</span>
            </motion.h1>

            <motion.p variants={FADE_UP} className="mt-12 text-xl md:text-2xl text-white/60 max-w-3xl leading-relaxed font-light mb-10">
              PFN is a drop-in replacement for GMP's integer type. On the multiplicative workloads it
              targets, changing one type in your source is worth a factor of{' '}
              <span className="text-brand-400 font-medium">220×</span> — and the advantage compounds with
              the length of the computation.
            </motion.p>

            <motion.div variants={FADE_UP} className="mb-14 flex flex-wrap items-center gap-4">
              <Mark kind="measured" />
              <Mark kind="verified" />
              <span className="font-mono text-[11px] text-white/40">
                against GMP 6.3.0 · Apple M2 · single-threaded
              </span>
            </motion.div>

            <motion.div variants={FADE_UP} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-8">
              <button
                type="button"
                onClick={() => scrollToEl('#dropin')}
                className="px-8 py-5 bg-brand-500 text-black font-semibold uppercase tracking-widest text-xs hover:bg-brand-400 transition-colors"
              >
                The measurements
              </button>
              <button
                type="button"
                onClick={() => scrollToEl('#method')}
                className="px-8 py-5 bg-transparent border border-white/20 text-white font-semibold uppercase tracking-widest text-xs hover:bg-white/5 transition-colors"
              >
                How this was measured
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <SectionNav items={SECTIONS} ariaLabel="PFN sections" />

      {/* ── At a glance ──────────────────────────────────────────── */}
      <Chapter
        id="glance"
        index="0"
        eyebrow="At a glance"
        title="What PFN delivers"
        mark="verified"
        standfirst={
          <>
            Every figure below comes from a harness in which all methods run in the same binary on the same
            operands, and every configuration is verified bit-for-bit against computations that share no
            code with PFN before any timing is reported.
          </>
        }
      >
        <DataTable
          head={['Workload', 'Baseline', 'Result']}
          rows={[
            ['Multiplicative chain (N = 1M)', 'GMP drop-in — the same source code', '220× faster, and the gap widens with N'],
            ['Multiplicative chain (N = 10M)', 'GMP expert hand-written schedule', '1.73× faster, 1.6× less memory'],
            ['Exact rational chain (1M ops)', 'GMP mpq_class', '159.8× faster, byte-identical output'],
            ['Exact series (Σ1/k!, K = 20k)', 'idiomatic mpq loop', '4,367× faster (2.6× vs an expert implementation)'],
            ['Holding a structured value (N = 64M)', 'GMP mpz', '4.0 MB, constant — versus 161 MB and growing'],
            ['Query a 4.77M-digit number', 'GMP mpz_jacobi', '8 bits of state, 0 errors in 3,000 trials, 462×'],
          ]}
          minWidth="720px"
          align={['left', 'left', 'left']}
        />
        <Note>
          Only GMP was benchmarked here. No claim is made about FLINT, PARI/GP, Arb, NTL or any
          computer-algebra system. Hardware is laptop-class and single-threaded; no baseline was
          handicapped.
        </Note>
      </Chapter>

      {/* ── §1 Change one type ───────────────────────────────────── */}
      <Chapter
        id="dropin"
        index="1"
        eyebrow="The drop-in result"
        title="Change one type"
        mark="verified"
        standfirst={
          <>
            The comparison that matters to an engineering team is like-for-like: the same source code, with{' '}
            <span className="mono text-white">mpz_class</span> replaced by{' '}
            <span className="mono text-white">pfn::Integer</span>. No restructuring, no new algorithm, no
            expertise required.
          </>
        }
      >
        <figure className="tech-border bg-black/40 p-6 m-0">
          <figcaption>
            <div className="font-mono text-[10px] text-white/40 tracking-[0.2em] uppercase mb-2">Fig. 01 · Drop-in speed-up</div>
            <h3 className="text-lg text-white font-medium">Speed-up from changing one type</h3>
            <p className="text-sm text-muted mt-1">
              Log scale. The curve bends upward because the two methods are in different complexity
              classes — the advantage compounds with N.
            </p>
          </figcaption>
          <div className="h-64 mt-5">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dropIn} margin={{ top: 20, right: 30, bottom: 26, left: 4 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.07)" vertical={false} />
                <XAxis dataKey="n" tick={axisTick} stroke="rgba(255,255,255,0.15)" tickLine={false}
                  label={{ value: 'CHAIN LENGTH N', position: 'bottom', offset: 8, style: { ...axisTick, fontSize: 10 } }} />
                <YAxis scale="log" domain={[0.2, 500]} ticks={[1, 10, 100]} allowDataOverflow
                  tickFormatter={(v: number) => `${v}×`} tick={axisTick} stroke="rgba(255,255,255,0.15)" tickLine={false} width={48} />
                <Tooltip {...tip} cursor={{ stroke: 'rgba(255,255,255,0.2)' }}
                  formatter={(v: any) => [v < 1 ? `${v}× — GMP is faster here` : `${v}× faster`, 'vs GMP drop-in']} />
                <ReferenceLine y={1} stroke="rgba(248,250,252,0.4)" strokeDasharray="4 4"
                  label={{ value: 'parity', position: 'insideBottomRight', style: { ...axisTick, fontSize: 10, fill: 'rgba(248,250,252,0.55)' } }} />
                <Line dataKey="speedup" stroke={PFN_C} strokeWidth={2} dot={{ r: 3.5, fill: PFN_C, strokeWidth: 0 }}
                  activeDot={{ r: 5, strokeWidth: 0 }}
                  label={(props: any) => props.index === dropIn.length - 1 ? (
                    <text x={props.x - 6} y={props.y - 12} textAnchor="end" fontSize={12} fontFamily="JetBrains Mono, monospace" fill="#34D399" fontWeight="600">220.5×</text>
                  ) : <g />} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </figure>

        <div className="mt-8">
          <DataTable
            head={['N', 'GMP drop-in', 'PFN drop-in', 'Speed-up']}
            rows={[
              ['10k', '0.015 s', '0.048 s', '0.31×'],
              ['30k', '0.142 s', '0.056 s', '2.5×'],
              ['100k', '1.500 s', '0.095 s', '15.8×'],
              ['300k', '14.618 s', '0.224 s', '65.2×'],
              ['1M', '157.763 s', '0.716 s', '220.5×'],
            ]}
            highlightRow={4}
            minWidth="520px"
          />
        </div>

        <Result>
          At N = 1M this is the difference between 0.72 seconds and 2.6 minutes — for identical source code
          and a bit-identical answer.
        </Result>

        <Note>
          Accumulating into one running value — what everybody writes — is Θ(N²): each multiplication
          touches the whole accumulated result. PFN defers and reorganises the work, so it is not. Below
          roughly 30,000 operations the fixed setup dominates and GMP wins.
        </Note>

        {/* Why the advantage compounds: one line climbs, the other does not */}
        <figure className="mt-12 tech-border bg-black/40 p-6 m-0">
          <figcaption>
            <div className="font-mono text-[10px] text-white/40 tracking-[0.2em] uppercase mb-2">Fig. 02 · Cost per operation</div>
            <h3 className="text-lg text-white font-medium">Why the advantage compounds</h3>
            <p className="text-sm text-muted mt-1 max-w-2xl">
              The same totals as above, divided by N — the average cost of one multiplication, measured to
              the same finish line for both. The baseline's cost per operation climbs by a factor of 105
              across this range. PFN's settles and stays there.
            </p>
          </figcaption>
          <div className="h-64 mt-5">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={perOp} margin={{ top: 20, right: 34, bottom: 26, left: 4 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.07)" vertical={false} />
                <XAxis dataKey="n" tick={axisTick} stroke="rgba(255,255,255,0.15)" tickLine={false}
                  label={{ value: 'CHAIN LENGTH N', position: 'bottom', offset: 8, style: { ...axisTick, fontSize: 10 } }} />
                <YAxis scale="log" domain={[0.4, 400]} ticks={[1, 10, 100]} allowDataOverflow
                  tickFormatter={(v: number) => `${v}`} tick={axisTick} stroke="rgba(255,255,255,0.15)" tickLine={false} width={48}
                  label={{ value: 'µs PER OPERATION', angle: -90, position: 'insideLeft', style: { ...axisTick, fontSize: 10 } }} />
                <Tooltip {...tip} cursor={{ stroke: 'rgba(255,255,255,0.2)' }}
                  formatter={(v: any, name: any) => [v === null ? '—' : `${v} µs/op`, name]} />
                <Line name="GMP drop-in" dataKey="gmp" stroke={GMP_C} strokeWidth={2} strokeDasharray="6 4"
                  connectNulls={false} dot={{ r: 3.5, fill: GMP_C, strokeWidth: 0 }}
                  label={(props: any) => props.index === 4 ? (
                    <text x={props.x} y={props.y - 12} textAnchor="middle" fontSize={11} fontFamily="JetBrains Mono, monospace" fill="rgba(248,250,252,0.8)">157.8 — still climbing</text>
                  ) : <g />} />
                <Line name="PFN drop-in" dataKey="pfn" stroke={PFN_C} strokeWidth={2} dot={{ r: 3.5, fill: PFN_C, strokeWidth: 0 }}
                  label={(props: any) => props.index === perOp.length - 1 ? (
                    <text x={props.x - 6} y={props.y + 20} textAnchor="end" fontSize={11} fontFamily="JetBrains Mono, monospace" fill="#34D399">0.88 — flat</text>
                  ) : <g />} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 flex flex-wrap gap-5 font-mono text-[11px] text-white/70">
            <span className="flex items-center gap-2"><span className="inline-block w-4 border-t-2" style={{ borderColor: PFN_C }} /> PFN drop-in</span>
            <span className="flex items-center gap-2"><span className="inline-block w-4 border-t-2 border-dashed" style={{ borderColor: GMP_C }} /> GMP drop-in</span>
            <span className="text-white/40">— the baseline becomes infeasible past 1M, so its line ends there</span>
          </div>
          <Note>
            Read this precisely. It is a cost-per-operation observation, not a constant-time claim: the
            total still grows with N, because at N = 10M roughly 90% of PFN's time is producing the exact
            digits — a cost every method pays. Note also the crossing at the left: below ~30k operations
            the baseline is cheaper per operation — PFN targets the regime where a naive loop has already
            become the bottleneck.
          </Note>
        </figure>

      </Chapter>

      {/* ── §2 vs expert GMP ─────────────────────────────────────── */}
      <Chapter
        id="expert"
        index="2"
        eyebrow="Against hand-written expert GMP"
        title="It also beats what your best engineer would write"
        mark="verified"
        standfirst={
          <>
            A strong objection to any such result is that the baseline was weak. So we also benchmarked
            against hand-written expert GMP — a flat product tree, the textbook-optimal schedule, and a
            segmented tree, the strongest schedule available to a library handed N opaque values.
          </>
        }
      >
        <figure className="tech-border bg-black/40 p-6 m-0">
          <figcaption>
            <div className="font-mono text-[10px] text-white/40 tracking-[0.2em] uppercase mb-2">Fig. 03 · Operating range</div>
            <h3 className="text-lg text-white font-medium">Against the expert schedule</h3>
            <p className="text-sm text-muted mt-1">
              PFN leads from roughly N = 1M and the advantage keeps growing. In the shaded band, use GMP —
              that boundary is a qualification criterion, not a caveat.
            </p>
          </figcaption>
          <div className="h-64 mt-5">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={expertRange} margin={{ top: 20, right: 30, bottom: 26, left: 4 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.07)" vertical={false} />
                <XAxis dataKey="n" tick={axisTick} stroke="rgba(255,255,255,0.15)" tickLine={false}
                  label={{ value: 'CHAIN LENGTH N', position: 'bottom', offset: 8, style: { ...axisTick, fontSize: 10 } }} />
                <YAxis domain={[0, 2]} ticks={[0, 0.5, 1, 1.5, 2]} tickFormatter={(v: number) => `${v.toFixed(1)}×`}
                  tick={axisTick} stroke="rgba(255,255,255,0.15)" tickLine={false} width={48} />
                <Tooltip {...tip} cursor={{ stroke: 'rgba(255,255,255,0.2)' }}
                  formatter={(v: any) => [v < 1 ? `${v}× — use GMP here` : `${v}× faster`, 'vs expert tree']} />
                <ReferenceArea y1={0} y2={1} fill={LOSS_C} fillOpacity={0.07} />
                <ReferenceLine y={1} stroke="rgba(248,250,252,0.45)" strokeDasharray="4 4"
                  label={{ value: 'parity with expert GMP', position: 'insideTopRight', style: { ...axisTick, fontSize: 10, fill: 'rgba(248,250,252,0.6)' } }} />
                <Line dataKey="f" stroke={PFN_C} strokeWidth={2} dot={{ r: 3.5, fill: PFN_C, strokeWidth: 0 }}
                  activeDot={{ r: 5, strokeWidth: 0 }}
                  label={(props: any) => props.index === expertRange.length - 1 ? (
                    <text x={props.x - 6} y={props.y - 12} textAnchor="end" fontSize={12} fontFamily="JetBrains Mono, monospace" fill="#34D399" fontWeight="600">1.73×</text>
                  ) : <g />} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </figure>

        <div className="mt-8">
          <DataTable
            head={['N', 'PFN', 'Expert seg. tree', 'Speed-up', 'PFN mem', 'Expert mem']}
            rows={[
              ['10k', '0.048 s', '0.003 s', '0.06×', '5 MB', '3 MB'],
              ['30k', '0.056 s', '0.011 s', '0.20×', '6 MB', '4 MB'],
              ['100k', '0.095 s', '0.053 s', '0.56×', '8 MB', '10 MB'],
              ['300k', '0.224 s', '0.215 s', '0.96×', '23 MB', '34 MB'],
              ['1M', '0.716 s', '1.006 s', '1.41×', '64 MB', '114 MB'],
              ['3M', '2.142 s', '3.420 s', '1.60×', '177 MB', '356 MB'],
              ['10M', '8.803 s', '15.235 s', '1.73×', '379 MB', '593 MB'],
            ]}
            highlightRow={6}
            minWidth="660px"
          />
        </div>

        <Result>
          1.73× faster than a hand-optimized expert schedule at N = 10M, in 1.6× less memory — while
          requiring none of the expertise, and while remaining a drop-in.
        </Result>


        <div className="mt-12">
          <h3 className="font-mono text-[11px] text-white/50 tracking-[0.15em] uppercase pb-3 border-b border-white/10">
            Where the time goes
          </h3>
          <p className="mt-5 text-white/70 font-light leading-relaxed max-w-2xl">
            Splitting the work into the chain phase and the final digit production shows the effect
            directly: PFN spends less time accumulating, and produces the digits faster too.
          </p>
          <div className="mt-6">
            <DataTable
              head={['N', 'PFN chain', 'Expert chain', 'PFN materialize', 'Expert materialize']}
              rows={[
                ['1M', '0.126 s', '0.144 s', '0.589 s', '0.875 s'],
                ['3M', '0.269 s', '0.397 s', '1.873 s', '3.023 s'],
                ['10M', '0.899 s', '1.367 s', '7.904 s', '13.867 s'],
              ]}
              minWidth="620px"
            />
          </div>
        </div>

        <Boundary>
          <p>
            An expert who is told the stream draws from a small pool could hand-write a counting schedule
            and recover much of this advantage. We state that plainly because it is what makes the rest
            credible — and because it is also the point:{' '}
            <span className="text-white">PFN reaches that schedule automatically, from unmodified code.
            The expertise is in the library, not in the call site.</span>
          </p>
        </Boundary>
      </Chapter>

      {/* ── §3 Values too large to store ─────────────────────────── */}
      <Chapter
        id="scale"
        index="3"
        eyebrow="Beyond what fits in memory"
        title="Computation on values too large to store"
        mark="verified"
        standfirst={
          <>
            The results so far end in digits, so every method pays for the answer itself. The picture
            changes completely when a value is <span className="text-white">held and interrogated</span>{' '}
            rather than printed — and this is the regime where the difference is not a factor but a
            different shape entirely.
          </>
        }
      >
        {/* A — holding */}
        <h3 className="font-mono text-[11px] text-white/50 tracking-[0.15em] uppercase pb-3 border-b border-white/10">
          Holding it — flat where a digit representation grows without bound
        </h3>

        <figure className="mt-6 tech-border bg-black/40 p-6 m-0">
          <figcaption>
            <div className="font-mono text-[10px] text-white/40 tracking-[0.2em] uppercase mb-2">Fig. 04 · Holding a value</div>
            <h4 className="text-lg text-white font-medium">Memory to hold a structured value, not to compute it</h4>
            <p className="text-sm text-muted mt-1">
              Peak resident memory while holding 30^N — a value reaching 314 million bits — without
              producing its digits.
            </p>
          </figcaption>
          <div className="h-60 mt-5">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={holdMem} margin={{ top: 20, right: 30, bottom: 26, left: 4 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.07)" vertical={false} />
                <XAxis dataKey="n" tick={axisTick} stroke="rgba(255,255,255,0.15)" tickLine={false}
                  label={{ value: 'N  (value held = 30^N)', position: 'bottom', offset: 8, style: { ...axisTick, fontSize: 10 } }} />
                <YAxis tick={axisTick} stroke="rgba(255,255,255,0.15)" tickLine={false} width={52}
                  label={{ value: 'PEAK MEMORY, MB', angle: -90, position: 'insideLeft', style: { ...axisTick, fontSize: 10 } }} />
                <Tooltip {...tip} cursor={{ stroke: 'rgba(255,255,255,0.2)' }} formatter={(v: any, name: any) => [`${v} MB`, name]} />
                <Line name="GMP" dataKey="gmp" stroke={GMP_C} strokeWidth={2} strokeDasharray="6 4" dot={{ r: 3.5, fill: GMP_C, strokeWidth: 0 }}
                  label={(props: any) => props.index === holdMem.length - 1 ? (
                    <text x={props.x - 6} y={props.y - 10} textAnchor="end" fontSize={11} fontFamily="JetBrains Mono, monospace" fill="rgba(248,250,252,0.8)">161 MB, growing</text>
                  ) : <g />} />
                <Line name="PFN" dataKey="pfn" stroke={PFN_C} strokeWidth={2} dot={{ r: 3.5, fill: PFN_C, strokeWidth: 0 }}
                  label={(props: any) => props.index === holdMem.length - 1 ? (
                    <text x={props.x - 6} y={props.y + 20} textAnchor="end" fontSize={11} fontFamily="JetBrains Mono, monospace" fill="#34D399">4.0 MB · flat</text>
                  ) : <g />} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 flex flex-wrap gap-5 font-mono text-[11px] text-white/70">
            <span className="flex items-center gap-2"><span className="inline-block w-4 border-t-2" style={{ borderColor: PFN_C }} /> PFN</span>
            <span className="flex items-center gap-2"><span className="inline-block w-4 border-t-2 border-dashed" style={{ borderColor: GMP_C }} /> GMP</span>
          </div>
        </figure>

        <Result>
          Flat at 4.0 MB across a 64× range in N, where a digit representation must store Θ(N) bits — the
          gap here grows without bound.
        </Result>

        {/* B — querying */}
        <h3 className="mt-16 font-mono text-[11px] text-white/50 tracking-[0.15em] uppercase pb-3 border-b border-white/10">
          Interrogating it — answers from a number that is never built
        </h3>
        <p className="mt-5 text-white/70 font-light leading-relaxed max-w-2xl">
          Because a PFN value is carried as structure, whole classes of question are answerable from a few
          bytes of derived state, with the number itself never existing in memory. This capability has no
          counterpart in a digit-based library.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
          <div className="bg-black/60 p-8">
            <div className="font-mono text-[10px] text-brand-400 tracking-[0.15em] uppercase mb-4">PFN</div>
            <p className="font-mono text-5xl text-brand-400">8 bits</p>
            <p className="mt-4 text-sm text-white/60 font-light leading-relaxed">
              of state answer &ldquo;is X a quadratic residue mod q?&rdquo; for every modulus q — on a
              4,769,923-digit integer that is never built.
            </p>
          </div>
          <div className="bg-black/60 p-8">
            <div className="font-mono text-[10px] text-white/40 tracking-[0.15em] uppercase mb-4">GMP · mpz_jacobi</div>
            <p className="font-mono text-5xl text-white/50">4,769,923</p>
            <p className="mt-4 text-sm text-white/60 font-light leading-relaxed">
              digits — the entire number, 74.2 ms merely to build it before the first question can be asked.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <DataTable
            head={['', 'PFN', 'GMP (mpz_jacobi)']}
            rows={[
              ['State required', '8 bits', 'the entire number — 74.2 ms to build'],
              ['Per query', '216 ns', '100.0 µs'],
              ['3,000 moduli', '0.649 ms', '299.9 ms + build cost'],
              ['Mismatches', '0 of 3,000', '— (oracle)'],
            ]}
            minWidth="560px"
          />
        </div>

        <Result>
          Excluding the oracle&rsquo;s mandatory materialization the ratio is 462×; including it, the oracle
          cannot begin without first building a number PFN never builds.
        </Result>

        <div className="mt-10 max-w-2xl">
          <h4 className="font-mono text-[11px] text-white/50 tracking-[0.15em] uppercase pb-3 border-b border-white/10">
            Where the value comes from — the obvious objection, answered
          </h4>
          <p className="mt-5 text-white/70 font-light leading-relaxed">
            Encoding an arbitrary integer from outside would require factoring it. That is not what happens
            here: the value is built multiplicatively, so its structure is known by construction — exactly
            as values arise in combinatorial formulas, symbolic products and long chains.{' '}
            <span className="text-white">You multiplied it together yourself; PFN simply did not throw the
            information away.</span>
          </p>
        </div>

        <Boundary title="What this does and does not mean">
          <p>
            <span className="text-white">Holding is a representation property, not a speed claim.</span> GMP
            constructs this value faster — one specialized call against N chained multiplications. What is
            measured is the cost of holding and carrying it, and there the difference grows without bound:
            4.0 MB versus 161 MB at N = 64M.
          </p>
          <p>
            <span className="text-white">The questions are congruence-type, never magnitude.</span> A bounded
            state carries &ldquo;X mod something&rdquo; forever, but cannot carry &ldquo;how many digits does
            X have&rdquo;. And the 3,000 queries collapse into 256 distinct answer patterns — all correct,
            but not 3,000 independent questions.
          </p>
          <p>
            <span className="text-white">It applies to values you build, not to arbitrary integers.</span>{' '}
            Encoding an arbitrary opaque integer would require factoring it — the architecture's hard
            boundary, which nothing here works around.
          </p>
        </Boundary>
      </Chapter>

      {/* ── §4 Rational & series ─────────────────────────────────── */}
      <Chapter
        id="rational"
        index="4"
        eyebrow="Exact rational arithmetic"
        title="Where the representation pays most — 160×"
        mark="verified"
        standfirst={
          <>
            Exact rational chains are where the representation pays most, because GMP's{' '}
            <span className="mono text-white">mpq_class</span> must compute a GCD on every operation to
            stay canonical. PFN performs exactly one canonicalization, at the end.
          </>
        }
      >
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <DataTable
            head={['N operations', 'pfn::Rational', 'mpq_class', 'Speed-up', 'Identical']}
            rows={[
              ['10,000', '5.0 ms', '25.4 ms', '5.1×', 'yes'],
              ['100,000', '80.7 ms', '2,173.8 ms', '26.9×', 'yes'],
              ['1,000,000', '1,202.8 ms', '192,179.1 ms', '159.8×', 'yes'],
            ]}
            highlightRow={2}
            minWidth="520px"
          />

          <figure className="tech-border bg-black/40 p-6 m-0">
            <figcaption>
              <div className="font-mono text-[10px] text-white/40 tracking-[0.2em] uppercase mb-2">Fig. 05 · Rational</div>
              <h3 className="text-lg text-white font-medium">The advantage widens with chain length</h3>
            </figcaption>
            <div className="h-52 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={rational} margin={{ top: 20, right: 26, bottom: 26, left: 4 }}>
                  <CartesianGrid stroke="rgba(255,255,255,0.07)" vertical={false} />
                  <XAxis dataKey="n" tick={axisTick} stroke="rgba(255,255,255,0.15)" tickLine={false}
                    label={{ value: 'CHAIN LENGTH N', position: 'bottom', offset: 8, style: { ...axisTick, fontSize: 10 } }} />
                  <YAxis tick={axisTick} stroke="rgba(255,255,255,0.15)" tickLine={false} width={48} tickFormatter={(v: number) => `${v}×`} />
                  <Tooltip {...tip} cursor={{ stroke: 'rgba(255,255,255,0.2)' }} formatter={(v: any) => [`${v}× faster`, 'vs mpq_class']} />
                  <Line dataKey="speedup" stroke={PFN_C} strokeWidth={2} dot={{ r: 3.5, fill: PFN_C, strokeWidth: 0 }}
                    label={(props: any) => props.index === rational.length - 1 ? (
                      <text x={props.x - 6} y={props.y + 18} textAnchor="end" fontSize={12} fontFamily="JetBrains Mono, monospace" fill="#34D399" fontWeight="600">159.8×</text>
                    ) : <g />} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </figure>
        </div>
        <Note>Canonical output compared byte-for-byte against mpq_class at every size: 0 mismatches.</Note>

        <div className="mt-12">
          <h3 className="font-mono text-[11px] text-white/50 tracking-[0.15em] uppercase pb-3 border-b border-white/10">
            Exact series summation
          </h3>
          <p className="mt-5 text-white/70 font-light leading-relaxed max-w-2xl">
            The same structure applied to exact series — Σ1/k! to 20,000 terms, fully exact — runs in
            11.7 ms against 51 seconds for an idiomatic mpq loop.
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-white/10 bg-black/30 p-5">
              <div className="font-mono text-[10px] text-white/40 tracking-[0.15em] uppercase mb-3">vs the idiomatic loop</div>
              <p className="font-mono text-3xl text-white/60">4,367×</p>
            </div>
            <div className="border border-brand-500/30 bg-brand-500/[0.05] p-5">
              <div className="font-mono text-[10px] text-brand-400 tracking-[0.15em] uppercase mb-3">vs an expert implementation</div>
              <p className="font-mono text-3xl text-brand-400">2.6×</p>
              <p className="mt-3 text-sm text-white/65 font-light leading-relaxed">
                A win over a baseline that has already done everything right — the number we consider
                meaningful.
              </p>
            </div>
          </div>
        </div>
      </Chapter>

      {/* ── §5 How this was measured ─────────────────────────────── */}
      <Chapter
        id="method"
        index="5"
        eyebrow="Method"
        title="How this was measured"
        mark="verified"
        standfirst={
          <>
            Three decisions usually hide the rigging in a bignum benchmark. All three are fixed here and
            stated.
          </>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
          <div className="border-t border-white/10 pt-5">
            <div className="flex items-center gap-3 mb-3"><GlyphSymbolic /><span className="font-mono text-brand-500 text-sm">Input provenance</span></div>
            <p className="text-sm text-white/65 font-light leading-relaxed">
              Operands are drawn from a pool of 100 distinct random ~63-bit odd values — deliberately not
              smooth numbers, which would flatter PFN. The experiment is also repeated with all-distinct
              operands, where there is no repetition to exploit: PFN then runs at{' '}
              <span className="text-white">0.53×–0.67×</span> against the expert tree — a measured loss,
              and the clearest signal that a workload is outside PFN's range.
            </p>
          </div>
          <div className="border-t border-white/10 pt-5">
            <div className="flex items-center gap-3 mb-3"><GlyphConstantTime /><span className="font-mono text-brand-500 text-sm">The finish line</span></div>
            <p className="text-sm text-white/65 font-light leading-relaxed">
              Timers stop when the exact decimal digits exist — deliberately the finish line least
              favourable to PFN, since every method must then pay the full cost of the answer, compressing
              any advantage down to the schedule.
            </p>
          </div>
          <div className="border-t border-white/10 pt-5">
            <div className="flex items-center gap-3 mb-3"><GlyphFixedMemory /><span className="font-mono text-brand-500 text-sm">What the baseline knows</span></div>
            <p className="text-sm text-white/65 font-light leading-relaxed">
              The expert baselines get the best general schedule, but are not told the stream draws from a
              small pool — a limit stated plainly in §2.
            </p>
          </div>
          <div className="border-t border-white/10 pt-5">
            <div className="flex items-center gap-3 mb-3"><GlyphValidation /><span className="font-mono text-brand-500 text-sm">Correctness gate</span></div>
            <p className="text-sm text-white/65 font-light leading-relaxed">
              Each method computes three independent modular fingerprints of the final value plus its exact
              bit length. A configuration is reported only if{' '}
              <span className="text-white">every method agrees on all four numbers.</span>
            </p>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="font-mono text-[11px] text-white/50 tracking-[0.15em] uppercase pb-3 border-b border-white/10">
            The correctness gate, in full
          </h3>
          <p className="mt-5 text-white/70 font-light leading-relaxed max-w-2xl">
            All methods run inside a single benchmark binary, on identical operand streams, with identical
            timing and memory instrumentation — so no method can benefit from a difference in harness. Nine
            configurations were admitted; every one agreed.
          </p>
          <div className="mt-6">
            <DataTable
              head={['N', 'Pool', 'Methods', 'Result bit-length', 'Verdict']}
              rows={[
                ['10k', '100', '4', '631,791', 'agree'],
                ['30k', '100', '4', '1,895,523', 'agree'],
                ['100k', '100', '4', '6,317,958', 'agree'],
                ['300k', 'all-distinct', '2', '18,954,456', 'agree'],
                ['300k', '100', '4', '18,953,326', 'agree'],
                ['1M', 'all-distinct', '2', '63,179,468', 'agree'],
                ['1M', '100', '4', '63,177,052', 'agree'],
                ['3M', '100', '3', '189,530,963', 'agree'],
                ['10M', '100', '3', '631,765,713', 'agree'],
              ]}
              minWidth="620px"
            />
          </div>
          <Note>
            Medians of 3 trials (2 at N ≥ 3M). Memory is the lowest observed peak per method, the same rule
            applied to every side. Figures are generated directly from the recorded measurements rather
            than transcribed, and the generator rejects the data set if any fingerprint disagrees.
          </Note>
        </div>

        <div className="mt-10 border border-brand-500/25 bg-brand-500/[0.04] p-6">
          <p className="text-white/75 font-light leading-relaxed">
            The benchmark harness, the complete raw measurement data, and the generators that produce these
            figures are maintained as part of the PFN engineering record and{' '}
            <span className="text-white">can be made available for technical due diligence.</span>
          </p>
          <Link to="/contact" className="mt-5 inline-block font-mono text-xs text-brand-400 hover:text-brand-300 transition-colors">
            Request the benchmark package →
          </Link>
        </div>

        <div className="mt-10">
          <PhotoPlate
            src="/assets/plate-super.jpg"
            alt="Rack doors of the Pleiades supercomputer receding down an aisle at NASA Ames"
            label="Measured single-threaded on laptop-class hardware"
            height="h-56"
          />
        </div>
      </Chapter>

      {/* ── Wayfinding ───────────────────────────────────────────── */}
      <nav aria-label="Continue" className="relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 flex flex-wrap items-center justify-between gap-6">
          <span className="font-mono text-[11px] text-white/40 tracking-[0.2em] uppercase">Continue</span>
          <div className="flex flex-wrap gap-8 font-mono text-xs">
            <Link to="/deox" className="text-brand-400 hover:text-brand-500 transition-colors">PFN in flight — Project DEOX →</Link>
            <Link to="/contact" className="text-white/70 hover:text-white transition-colors">Technical enquiry →</Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Pfn;

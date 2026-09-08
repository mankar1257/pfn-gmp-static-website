import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import ParallaxImage from '../components/ParallaxImage';
import BigIntRace from '../components/BigIntRace';
import { PfnEncodingDiagram, GlyphConstantTime, GlyphFixedMemory, GlyphSymbolic, GlyphValidation } from '../components/diagrams';
import PhotoPlate from '../components/PhotoPlate';
import SectionNav from '../components/SectionNav';
import { scrollToEl } from '../lib/smooth-scroll';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';


const SECTIONS = [
  { id: 'abstract', label: 'Abstract' },
  { id: 'benchmarks', label: 'Benchmarks' },
  { id: 'properties', label: 'Core properties' },
];

const FADE_UP: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const Pfn: React.FC = () => {
  const benchmarks = [
    { op: 'Chain multiplication', pfn: '0.07 μs', gmp: '9.88 μs', factor: '141×' },
    { op: 'Division', pfn: '0.89 μs', gmp: '105.02 μs', factor: '118×' },
    { op: 'Addition', pfn: '0.03 μs', gmp: '2.41 μs', factor: '80×' },
    { op: 'Power (7^1,000,000)', pfn: '3 μs', gmp: '2,700,000 μs', factor: '899,000×' },
  ];

  // Benchmark report, Feb 2026 — PFN 0.1.0 vs GMP 6.3.0, single core, Apple Silicon.
  const chainData = [
    { ops: '10K', pfn: 0.07, gmp: 0.07 },
    { ops: '50K', pfn: 0.07, gmp: 0.3 },
    { ops: '100K', pfn: 0.07, gmp: 0.6 },
    { ops: '500K', pfn: 0.07, gmp: 2.55 },
    { ops: '1M', pfn: 0.07, gmp: 5.03 },
    { ops: '2M', pfn: 0.07, gmp: 9.88 },
  ];
  const memoryData = [
    { mag: '10¹⁰⁰', pfn: 415, gmp: 64 },
    { mag: '10¹⁰⁰⁰', pfn: 415, gmp: 432 },
    { mag: '10¹⁰⁰⁰⁰', pfn: 415, gmp: 4160 },
    { mag: '10¹⁰⁰⁰⁰⁰', pfn: 415, gmp: 41552 },
  ];

  // Series palette validated for the dark surface (CVD ΔE 15.7 deutan, 19.5 normal);
  // GMP additionally dashed so identity never rides on colour alone.
  const PFN_C = '#0AA678';
  const GMP_C = '#5B7FC7';
  const axisTick = { fontSize: 11, fontFamily: 'JetBrains Mono, monospace', fill: '#94A3B8' } as const;
  const chartTooltip = {
    contentStyle: {
      backgroundColor: '#0A0F0D',
      border: '1px solid rgba(255,255,255,0.15)',
      fontSize: 12,
      fontFamily: 'JetBrains Mono, monospace',
      color: '#F8FAFC',
    },
    labelStyle: { color: '#94A3B8', marginBottom: 4 },
    cursor: { stroke: 'rgba(255,255,255,0.2)' },
  };

  return (
    <div className="min-h-screen text-white">
      {/* Massive Hero Section */}
      <section className="relative min-h-[80vh] flex items-center pt-24 overflow-hidden border-b border-white/10">
        {/* Austere Background Grid */}
        <div className="absolute inset-0 z-0">
          {/* Abstract Data Network Image */}
          <ParallaxImage src="/assets/circuit-schematic.jpg" mode="hero" className="opacity-35" />
          
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black/40"></div>
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div 
            initial="initial"
            animate="animate"
            transition={{ staggerChildren: 0.1 }}
            className="max-w-6xl"
          >
            <motion.div variants={FADE_UP} className="flex items-center gap-6 mb-12">
              <div className="h-[1px] w-12 bg-white/40"></div>
              <span className="eyebrow text-white/50">Core technology · PFN</span>
            </motion.div>
            
            <motion.h1 variants={FADE_UP} className="display text-5xl sm:text-6xl md:text-8xl text-white mb-8">
              Foundational architecture <br className="hidden md:block"/>for <span className="text-white/70">computational exactness.</span>
            </motion.h1>
            
            <motion.p variants={FADE_UP} className="mt-12 text-2xl md:text-3xl text-white/40 max-w-4xl leading-relaxed font-light mb-16">
              We engineer systems that decouple precision from runtime.
              Our flagship architecture, <span className="text-white font-medium">PFN</span>, performs arbitrary-precision
              arithmetic in constant time and fixed memory.
            </motion.p>

            <motion.div variants={FADE_UP} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-8">
              <button 
                type="button"
                onClick={() => scrollToEl('#properties')}
                className="px-8 py-5 bg-brand-500 text-black font-semibold uppercase tracking-widest text-xs hover:bg-brand-400 transition-colors"
              >
                Core Properties
              </button>
              <button 
                type="button"
                onClick={() => scrollToEl('#benchmarks')}
                className="px-8 py-5 bg-transparent border border-white/20 text-white font-semibold uppercase tracking-widest text-xs hover:bg-white/5 transition-colors"
              >
                Benchmark Data
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <SectionNav items={SECTIONS} ariaLabel="PFN sections" />

      {/* Abstract Panel */}
      <section id="abstract" className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-32 border-b border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          <div className="md:col-span-4">
            <div className="eyebrow text-white/40">§1 · Abstract</div>
          </div>
          <div className="md:col-span-8">
            <p className="text-3xl text-white/90 leading-[1.3] font-light">
              Conventional multi-precision libraries operate structurally as dynamic arrays,
              forcing execution times to scale linearly or quadratically with operand magnitude.
              <br/><br/>
              PFN replaces this paradigm with a symbolic, fixed-width
              encoding. Operations evaluate in <span className="font-mono text-white bg-white/10 px-2 py-1">O(1)</span> time and O(1) memory. The result is exact,
              stable arithmetic at any operand scale.
            </p>
          </div>
        </div>
        <div className="mt-14">
          <PfnEncodingDiagram />
        </div>
      </section>

      {/* Data Table Matrix */}
      <section id="benchmarks" className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-32 border-b border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          <div className="md:col-span-4">
            <div className="eyebrow text-white/40 mb-6">§2 · Evidence</div>
            <h2 className="display text-4xl text-white mb-6">Benchmarks</h2>
            <p className="text-sm text-white/40 max-w-xs leading-relaxed font-mono">
              Measured on isolated single-core environments, averaged over 10⁶ cycles.
            </p>
          </div>
          <div className="md:col-span-8">
            <p className="md:hidden mb-2 font-mono text-[10px] text-white/40 tracking-[0.15em] uppercase" aria-hidden="true">← swipe the table →</p>
            <div className="tech-border p-1 bg-black/50 backdrop-blur-xl overflow-x-auto">
              <table className="w-full min-w-[520px] text-left font-mono text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-muted">
                    <th className="py-4 px-6 font-normal">Operation</th>
                    <th className="py-4 px-6 font-normal text-right">PFN Engine</th>
                    <th className="py-4 px-6 font-normal text-right">GMP Baseline</th>
                    <th className="py-4 px-6 font-normal text-right text-brand-500">Advantage</th>
                  </tr>
                </thead>
                <tbody>
                  {benchmarks.map((b, i) => (
                    <tr key={b.op} className={`border-b border-white/5 hover:bg-white/5 transition-colors ${i === benchmarks.length - 1 ? 'border-b-0' : ''}`}>
                      <td className="py-4 px-6 text-white">{b.op}</td>
                      <td className="py-4 px-6 text-right text-white">{b.pfn}</td>
                      <td className="py-4 px-6 text-right text-muted">{b.gmp}</td>
                      <td className="py-4 px-6 text-right text-brand-400 font-medium">{b.factor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Charts — the scaling story the table cannot show */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Constant-time property */}
          <figure className="tech-border bg-black/50 backdrop-blur-xl p-6 m-0">
            <figcaption>
              <div className="font-mono text-[10px] text-white/40 tracking-[0.2em] uppercase mb-2">Fig. 01 · Time</div>
              <h3 className="text-lg text-white font-medium">Constant time under chain length</h3>
              <p className="text-sm text-muted mt-1">
                μs per multiply as the chain grows from 10⁴ to 2×10⁶ operations.
              </p>
              <div className="mt-3 flex flex-wrap gap-5 font-mono text-[11px] text-white/70">
                <span className="flex items-center gap-2">
                  <span className="inline-block w-4 border-t-2" style={{ borderColor: PFN_C }} /> PFN
                </span>
                <span className="flex items-center gap-2">
                  <span className="inline-block w-4 border-t-2 border-dashed" style={{ borderColor: GMP_C }} /> GMP 6.3.0
                </span>
              </div>
            </figcaption>
            <div className="h-64 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chainData} margin={{ top: 18, right: 14, bottom: 26, left: 4 }}>
                  <CartesianGrid stroke="rgba(255,255,255,0.07)" vertical={false} />
                  <XAxis
                    dataKey="ops" tick={axisTick} stroke="rgba(255,255,255,0.15)" tickLine={false}
                    label={{ value: 'CHAIN LENGTH (OPS)', position: 'bottom', offset: 8, style: { ...axisTick, fontSize: 10 } }}
                  />
                  <YAxis
                    tick={axisTick} stroke="rgba(255,255,255,0.15)" tickLine={false} width={44}
                    label={{ value: 'μs / OP', angle: -90, position: 'insideLeft', style: { ...axisTick, fontSize: 10 } }}
                  />
                  <Tooltip {...chartTooltip} formatter={(v: any, name: any) => [`${v} μs/op`, name]} />
                  <Line
                    name="GMP 6.3.0" dataKey="gmp" stroke={GMP_C} strokeWidth={2} strokeDasharray="6 4"
                    dot={false} activeDot={{ r: 4, strokeWidth: 0 }}
                    label={(props: any) => props.index === chainData.length - 1 ? (
                      <text x={props.x - 4} y={props.y - 10} textAnchor="end" fontSize={11} fontFamily="JetBrains Mono, monospace" fill="rgba(248,250,252,0.75)">9.88 μs · grows with magnitude</text>
                    ) : <g />}
                  />
                  <Line
                    name="PFN" dataKey="pfn" stroke={PFN_C} strokeWidth={2}
                    dot={false} activeDot={{ r: 4, strokeWidth: 0 }}
                    label={(props: any) => props.index === chainData.length - 1 ? (
                      <text x={props.x - 4} y={props.y - 10} textAnchor="end" fontSize={11} fontFamily="JetBrains Mono, monospace" fill="rgba(248,250,252,0.75)">0.07 μs · constant</text>
                    ) : <g />}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <details className="mt-4 border-t border-white/10 pt-3">
              <summary className="font-mono text-[11px] text-white/50 cursor-pointer hover:text-white/80">View as table</summary>
              <table className="w-full mt-3 font-mono text-[11px] text-white/70">
                <thead><tr className="text-left text-white/40"><th className="py-1 pr-4 font-normal">Chain</th><th className="py-1 pr-4 font-normal text-right">PFN μs/op</th><th className="py-1 font-normal text-right">GMP μs/op</th></tr></thead>
                <tbody>{chainData.map((d) => (
                  <tr key={d.ops} className="border-t border-white/5"><td className="py-1 pr-4">{d.ops}</td><td className="py-1 pr-4 text-right">{d.pfn.toFixed(2)}</td><td className="py-1 text-right">{d.gmp.toFixed(2)}</td></tr>
                ))}</tbody>
              </table>
            </details>
          </figure>

          {/* Memory footprint */}
          <figure className="tech-border bg-black/50 backdrop-blur-xl p-6 m-0">
            <figcaption>
              <div className="font-mono text-[10px] text-white/40 tracking-[0.2em] uppercase mb-2">Fig. 02 · Memory</div>
              <h3 className="text-lg text-white font-medium">Fixed memory at any magnitude</h3>
              <p className="text-sm text-muted mt-1">
                Bytes per stored value as operand magnitude grows — log scale.
              </p>
              <div className="mt-3 flex flex-wrap gap-5 font-mono text-[11px] text-white/70">
                <span className="flex items-center gap-2">
                  <span className="inline-block w-4 border-t-2" style={{ borderColor: PFN_C }} /> PFN
                </span>
                <span className="flex items-center gap-2">
                  <span className="inline-block w-4 border-t-2 border-dashed" style={{ borderColor: GMP_C }} /> GMP 6.3.0
                </span>
              </div>
            </figcaption>
            <div className="h-64 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={memoryData} margin={{ top: 18, right: 14, bottom: 26, left: 4 }}>
                  <CartesianGrid stroke="rgba(255,255,255,0.07)" vertical={false} />
                  <XAxis
                    dataKey="mag" tick={axisTick} stroke="rgba(255,255,255,0.15)" tickLine={false}
                    label={{ value: 'OPERAND MAGNITUDE', position: 'bottom', offset: 8, style: { ...axisTick, fontSize: 10 } }}
                  />
                  <YAxis
                    scale="log" domain={[50, 60000]} ticks={[100, 1000, 10000, 50000]} allowDataOverflow
                    tickFormatter={(v: number) => (v >= 1000 ? `${v / 1000}K` : `${v}`)}
                    tick={axisTick} stroke="rgba(255,255,255,0.15)" tickLine={false} width={44}
                    label={{ value: 'BYTES · LOG', angle: -90, position: 'insideLeft', style: { ...axisTick, fontSize: 10 } }}
                  />
                  <Tooltip {...chartTooltip} formatter={(v: any, name: any) => [v >= 1000 ? `${(v / 1024).toFixed(1)} KiB` : `${v} B`, name]} />
                  <Line
                    name="GMP 6.3.0" dataKey="gmp" stroke={GMP_C} strokeWidth={2} strokeDasharray="6 4"
                    dot={false} activeDot={{ r: 4, strokeWidth: 0 }}
                    label={(props: any) => props.index === memoryData.length - 1 ? (
                      <text x={props.x - 4} y={props.y - 10} textAnchor="end" fontSize={11} fontFamily="JetBrains Mono, monospace" fill="rgba(248,250,252,0.75)">41.5 KB and climbing</text>
                    ) : <g />}
                  />
                  <Line
                    name="PFN" dataKey="pfn" stroke={PFN_C} strokeWidth={2}
                    dot={false} activeDot={{ r: 4, strokeWidth: 0 }}
                    label={(props: any) => props.index === memoryData.length - 1 ? (
                      <text x={props.x - 4} y={props.y + 18} textAnchor="end" fontSize={11} fontFamily="JetBrains Mono, monospace" fill="rgba(248,250,252,0.75)">415 B · constant</text>
                    ) : <g />}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <details className="mt-4 border-t border-white/10 pt-3">
              <summary className="font-mono text-[11px] text-white/50 cursor-pointer hover:text-white/80">View as table</summary>
              <table className="w-full mt-3 font-mono text-[11px] text-white/70">
                <thead><tr className="text-left text-white/40"><th className="py-1 pr-4 font-normal">Magnitude</th><th className="py-1 pr-4 font-normal text-right">PFN bytes</th><th className="py-1 font-normal text-right">GMP bytes</th></tr></thead>
                <tbody>{memoryData.map((d) => (
                  <tr key={d.mag} className="border-t border-white/5"><td className="py-1 pr-4">{d.mag}</td><td className="py-1 pr-4 text-right">{d.pfn}</td><td className="py-1 text-right">{d.gmp.toLocaleString()}</td></tr>
                ))}</tbody>
              </table>
            </details>
          </figure>
        </div>

        <BigIntRace />

        <p className="mt-8 font-mono text-[11px] text-white/40 leading-relaxed max-w-3xl">
          Methodology — PFN 0.1.0 vs GMP 6.3.0 · single core, Apple Silicon · February 2026.
          Inputs pre-encoded; only chain operations timed; results validated against GMP for exactness.
        </p>
      </section>

      {/* Architecture Properties */}
      <section id="properties" className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-32 border-t border-white/5">
        <div className="mb-20">
          <div className="eyebrow mb-6">§3 · System architecture</div>
          <h2 className="display text-4xl md:text-5xl text-white">Core Properties</h2>
        </div>

        <div className="mb-16">
          <PhotoPlate src="/assets/plate-super.jpg" alt="Rack doors of the Pleiades supercomputer receding down an aisle at NASA Ames" label="NASA Pleiades · Ames Research Center" height="h-56" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          <div className="relative group">
            <div className="absolute -inset-4 bg-white/0 group-hover:bg-white/5 transition-colors rounded-xl -z-10"></div>
            <div className="flex items-center gap-3 mb-4"><GlyphConstantTime /><span className="font-mono text-brand-500 text-sm">SYS-01</span></div>
            <h3 className="text-xl text-white font-medium mb-3">Constant-Time Operations</h3>
            <p className="text-muted leading-relaxed">
              Addition, multiplication, division and exponentiation complete in time
              independent of operand magnitude. Pipeline efficiency remains stable under extreme loads.
            </p>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-white/0 group-hover:bg-white/5 transition-colors rounded-xl -z-10"></div>
            <div className="flex items-center gap-3 mb-4"><GlyphFixedMemory /><span className="font-mono text-brand-500 text-sm">SYS-02</span></div>
            <h3 className="text-xl text-white font-medium mb-3">Deterministic Memory</h3>
            <p className="text-muted leading-relaxed">
              Each state node occupies exactly <span className="font-mono text-white">415 bytes</span>, regardless of magnitude.
              Allocation logic is predictable, eliminating heap fragmentation and dynamic overhead.
            </p>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-white/0 group-hover:bg-white/5 transition-colors rounded-xl -z-10"></div>
            <div className="flex items-center gap-3 mb-4"><GlyphSymbolic /><span className="font-mono text-brand-500 text-sm">SYS-03</span></div>
            <h3 className="text-xl text-white font-medium mb-3">Symbolic Evaluation</h3>
            <p className="text-muted leading-relaxed">
              Numerical definitions are preserved symbolically across operation chains.
              Precision loss is fundamentally impossible within the closed algebraic system.
            </p>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-white/0 group-hover:bg-white/5 transition-colors rounded-xl -z-10"></div>
            <div className="flex items-center gap-3 mb-4"><GlyphValidation /><span className="font-mono text-brand-500 text-sm">SYS-04</span></div>
            <h3 className="text-xl text-white font-medium mb-3">Empirical Validation</h3>
            <p className="text-muted leading-relaxed">
              Every telemetry point is actively reproducible. Testing infrastructure and the underlying
              methodology are strictly verified against established industry baselines.
            </p>
          </div>
        </div>
      </section>

      {/* Wayfinding */}
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

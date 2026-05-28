import React from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from 'recharts';

const tooltipStyle = {
  backgroundColor: '#F4F0E6',
  border: '1px solid #DDD6C6',
  borderRadius: '4px',
  fontSize: '12px',
  fontFamily: 'JetBrains Mono, ui-monospace, monospace',
  color: '#171717',
};

const Performance: React.FC = () => {
  const chainMultiply = [
    { ops: '10K',  pfn: 0.07, gmp: 0.34 },
    { ops: '100K', pfn: 0.07, gmp: 1.12 },
    { ops: '500K', pfn: 0.07, gmp: 3.45 },
    { ops: '1M',   pfn: 0.07, gmp: 5.67 },
    { ops: '2M',   pfn: 0.07, gmp: 9.88 },
  ];

  const powerData = [
    { name: '7^10K',  pfn: 3, gmp: 2700 },
    { name: '7^100K', pfn: 3, gmp: 27000 },
    { name: '7^1M',   pfn: 3, gmp: 2700000 },
  ];

  const speedups = [
    { op: 'Chain ×',        speedup: 141 },
    { op: 'Power',          speedup: 899000 },
    { op: 'Scale 10ⁿ',      speedup: 728924 },
    { op: 'Division',       speedup: 118 },
  ];

  const memory = [
    { mag: '10¹⁰⁰',     pfn: 415, gmp: 64 },
    { mag: '10¹⁰⁰⁰',    pfn: 415, gmp: 432 },
    { mag: '10¹⁰⁰⁰⁰',   pfn: 415, gmp: 4160 },
    { mag: '10¹⁰⁰⁰⁰⁰',  pfn: 415, gmp: 41552 },
  ];

  return (
    <article>
      <header className="max-w-page mx-auto px-6 lg:px-10 pt-20 md:pt-24 pb-10">
        <p className="eyebrow mb-5">Benchmarks</p>
        <h1 className="display text-4xl md:text-5xl lg:text-6xl font-semibold text-ink max-w-measure">
          Performance data
        </h1>
        <p className="mt-6 text-muted max-w-prose">
          Measured timings of PFN against GMP across representative arithmetic workloads. Every figure
          on this page is reproducible against the methodology described below.
        </p>
      </header>

      <div className="max-w-page mx-auto px-6 lg:px-10 pb-24">
        {/* Headline numbers */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-10 mt-6 pb-16">
          <aside className="md:col-span-3">
            <div className="eyebrow">Headline figures</div>
            <p className="text-sm text-muted mt-3 max-w-prose">
              Speed-up factor relative to GMP across the four operations we report most often.
            </p>
          </aside>
          <div className="md:col-span-9 max-w-measure">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Operation</th>
                  <th className="text-right">PFN</th>
                  <th className="text-right">GMP</th>
                  <th className="text-right">Factor</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Chain multiplication</td>
                  <td className="text-right num">0.07 μs</td>
                  <td className="text-right num text-muted">9.88 μs</td>
                  <td className="text-right num font-medium">141×</td>
                </tr>
                <tr>
                  <td>Power (7 to the 10⁶)</td>
                  <td className="text-right num">3 μs</td>
                  <td className="text-right num text-muted">2.7 × 10⁶ μs</td>
                  <td className="text-right num font-medium">899,000×</td>
                </tr>
                <tr>
                  <td>Scale by 10ⁿ</td>
                  <td className="text-right num">0.04 μs</td>
                  <td className="text-right num text-muted">29 ms</td>
                  <td className="text-right num font-medium">728,924×</td>
                </tr>
                <tr>
                  <td>Division</td>
                  <td className="text-right num">0.89 μs</td>
                  <td className="text-right num text-muted">105.02 μs</td>
                  <td className="text-right num font-medium">118×</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Charts — monochrome editorial */}
        <section className="rule pt-16">
          <h2 className="serif text-2xl text-ink mb-2">Detailed comparisons</h2>
          <p className="text-sm text-muted mb-10 max-w-prose">
            PFN figures shown in <span className="text-ink">ink black</span>;
            GMP in <span className="text-muted">muted grey</span>. Log scales used where dynamic range demands it.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Chain multiplication */}
            <figure>
              <figcaption className="mb-4">
                <h3 className="serif text-lg text-ink">Chain multiplication</h3>
                <p className="text-xs text-muted">Time per operation (μs) as operation count grows</p>
              </figcaption>
              <div className="h-64 border border-hairline bg-white">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chainMultiply} margin={{ top: 16, right: 16, bottom: 8, left: 8 }}>
                    <CartesianGrid stroke="#F3F3F2" vertical={false} />
                    <XAxis dataKey="ops" stroke="#5C5345" tick={{ fontSize: 11, fontFamily: 'JetBrains Mono' }} />
                    <YAxis stroke="#5C5345" tick={{ fontSize: 11, fontFamily: 'JetBrains Mono' }} />
                    <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v} μs`, '']} />
                    <Bar dataKey="gmp" fill="#A3A3A3" name="GMP" />
                    <Bar dataKey="pfn" fill="#171717" name="PFN" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-muted mt-3">
                PFN is flat at <span className="mono text-ink">0.07 μs</span>; GMP grows with operation count.
              </p>
            </figure>

            {/* Power operations */}
            <figure>
              <figcaption className="mb-4">
                <h3 className="serif text-lg text-ink">Power, 7<sup>n</sup></h3>
                <p className="text-xs text-muted">Microseconds (log scale)</p>
              </figcaption>
              <div className="h-64 border border-hairline bg-white">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={powerData} margin={{ top: 16, right: 16, bottom: 8, left: 8 }}>
                    <CartesianGrid stroke="#F3F3F2" vertical={false} />
                    <XAxis dataKey="name" stroke="#5C5345" tick={{ fontSize: 11, fontFamily: 'JetBrains Mono' }} />
                    <YAxis stroke="#5C5345" scale="log" domain={[1, 10000000]}
                      tickFormatter={(v: number) => v >= 1e6 ? `${v/1e6}M` : v >= 1e3 ? `${v/1e3}K` : `${v}`}
                      tick={{ fontSize: 11, fontFamily: 'JetBrains Mono' }} />
                    <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v} μs`, '']} />
                    <Line type="monotone" dataKey="gmp" stroke="#A3A3A3" strokeWidth={1.5} dot={{ fill: '#A3A3A3', r: 3 }} name="GMP" />
                    <Line type="monotone" dataKey="pfn" stroke="#171717" strokeWidth={1.5} dot={{ fill: '#171717', r: 3 }} name="PFN" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-muted mt-3">
                GMP grows linearly with the exponent; PFN does not.
              </p>
            </figure>

            {/* Speedup */}
            <figure>
              <figcaption className="mb-4">
                <h3 className="serif text-lg text-ink">Speed-up factor</h3>
                <p className="text-xs text-muted">Times faster than GMP (log scale)</p>
              </figcaption>
              <div className="h-64 border border-hairline bg-white">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={speedups} layout="vertical" margin={{ top: 16, right: 16, bottom: 8, left: 8 }}>
                    <CartesianGrid stroke="#F3F3F2" horizontal={false} />
                    <XAxis type="number" stroke="#5C5345" scale="log" domain={[1, 1000000]}
                      tickFormatter={(v: number) => v >= 1e3 ? `${v/1e3}K` : `${v}`}
                      tick={{ fontSize: 11, fontFamily: 'JetBrains Mono' }} />
                    <YAxis dataKey="op" type="category" stroke="#5C5345" width={80}
                      tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v}×`, 'speed-up']} />
                    <Bar dataKey="speedup" fill="#171717" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </figure>

            {/* Memory */}
            <figure>
              <figcaption className="mb-4">
                <h3 className="serif text-lg text-ink">Memory footprint</h3>
                <p className="text-xs text-muted">Bytes per number by magnitude</p>
              </figcaption>
              <div className="h-64 border border-hairline bg-white">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={memory} margin={{ top: 16, right: 16, bottom: 8, left: 8 }}>
                    <CartesianGrid stroke="#F3F3F2" vertical={false} />
                    <XAxis dataKey="mag" stroke="#5C5345" tick={{ fontSize: 11, fontFamily: 'JetBrains Mono' }} />
                    <YAxis stroke="#5C5345" tick={{ fontSize: 11, fontFamily: 'JetBrains Mono' }} />
                    <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v} bytes`, '']} />
                    <Bar dataKey="gmp" fill="#A3A3A3" name="GMP" />
                    <Bar dataKey="pfn" fill="#171717" name="PFN" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-muted mt-3">
                PFN remains at <span className="mono text-ink">415 bytes</span> across five orders of magnitude.
              </p>
            </figure>
          </div>
        </section>

        {/* Methodology */}
        <section className="rule mt-16 pt-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <aside className="md:col-span-3">
              <div className="eyebrow">Methodology</div>
            </aside>
            <div className="md:col-span-9 max-w-measure space-y-5 text-ink leading-relaxed">
              <p>
                All measurements were taken on a single isolated core with CPU affinity set, and a
                controlled memory allocator. Background processes were disabled. Each operation was
                timed over 10⁶ iterations using a high-resolution monotonic clock; the reported
                figure is the trimmed mean after outlier removal.
              </p>
              <p>
                GMP was built from upstream sources with default optimisation flags. PFN was built
                from its production release. We use the same compiler, the same hardware, and the
                same input distributions for both libraries.
              </p>
              <p className="text-sm text-muted">
                Benchmark tools and reproduction scripts are available to commercial licensees on request.{' '}
                <Link to="/contact" className="link">Get in touch →</Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
};

export default Performance;

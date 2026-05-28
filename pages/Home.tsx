import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const benchmarks = [
    { op: 'Chain multiplication', pfn: '0.07 μs', gmp: '9.88 μs', factor: '141×' },
    { op: 'Division', pfn: '0.89 μs', gmp: '105.02 μs', factor: '118×' },
    { op: 'Addition', pfn: '0.03 μs', gmp: '2.41 μs', factor: '80×' },
    { op: 'Power (7^1,000,000)', pfn: '3 μs', gmp: '2,700,000 μs', factor: '899,000×' },
  ];

  return (
    <div>
      {/* Masthead — typographic, editorial */}
      <section className="max-w-page mx-auto px-6 lg:px-10 pt-20 md:pt-28 pb-16">
        <div className="max-w-measure">
          <p className="eyebrow mb-6">Null Field Research · Established 2024</p>
          <h1 className="display text-5xl md:text-6xl lg:text-7xl font-semibold text-ink">
            Exact arithmetic,<br />without scaling cost.
          </h1>
          <p className="mt-8 text-lg text-muted max-w-prose leading-relaxed">
            We study computational structures that decouple precision from runtime.
            Our flagship system, <span className="text-ink font-medium">PFN</span>, performs arbitrary-precision
            arithmetic in constant time and fixed memory, replacing the size-dependent overhead of
            classical bignum libraries.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm">
            <Link to="/overview" className="link">Read the research →</Link>
            <Link to="/performance" className="text-muted hover:text-ink">Benchmark data</Link>
            <Link to="/contact" className="text-muted hover:text-ink">Correspondence</Link>
          </div>
        </div>
      </section>

      {/* Abstract */}
      <section className="max-w-page mx-auto px-6 lg:px-10 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-3">
            <div className="eyebrow">Abstract</div>
          </div>
          <div className="md:col-span-9 max-w-measure">
            <p className="abstract">
              Conventional multi-precision libraries such as GMP store a number as a digit array
              and operate on it digit-by-digit. The cost of every arithmetic step grows with the
              size of its operands. PFN replaces this representation with a symbolic, fixed-width
              encoding whose operations are O(1) in both time and memory. The result is exact
              arithmetic that does not slow down as numbers grow.
            </p>
          </div>
        </div>
      </section>

      {/* Headline numbers — clean table, no cards */}
      <section className="max-w-page mx-auto px-6 lg:px-10 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-3">
            <div className="eyebrow">Selected results</div>
            <p className="text-sm text-muted mt-3">
              Measured per operation on a single core, averaged over 10⁶ iterations.
              <Link to="/performance" className="link block mt-2">Full methodology →</Link>
            </p>
          </div>
          <div className="md:col-span-9">
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
                {benchmarks.map((b) => (
                  <tr key={b.op}>
                    <td className="text-ink">{b.op}</td>
                    <td className="text-right num text-ink">{b.pfn}</td>
                    <td className="text-right num text-muted">{b.gmp}</td>
                    <td className="text-right num text-ink font-medium">{b.factor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Properties of the system — numbered list, no bento */}
      <section className="rule">
        <div className="max-w-page mx-auto px-6 lg:px-10 py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-3">
              <div className="eyebrow">The system</div>
              <h2 className="display text-3xl md:text-4xl text-ink mt-3">Properties of PFN</h2>
            </div>
            <div className="md:col-span-9 max-w-measure">
              <ol className="space-y-8">
                <li className="grid grid-cols-12 gap-4">
                  <span className="col-span-1 mono text-sm text-muted pt-1">01</span>
                  <div className="col-span-11">
                    <h3 className="serif text-xl text-ink">Constant-time operations</h3>
                    <p className="mt-2 text-muted leading-relaxed">
                      Addition, multiplication, division and exponentiation complete in time
                      independent of operand magnitude. Performance does not degrade with scale.
                    </p>
                  </div>
                </li>
                <li className="grid grid-cols-12 gap-4">
                  <span className="col-span-1 mono text-sm text-muted pt-1">02</span>
                  <div className="col-span-11">
                    <h3 className="serif text-xl text-ink">Fixed memory footprint</h3>
                    <p className="mt-2 text-muted leading-relaxed">
                      Each number occupies <span className="mono text-ink">415 bytes</span>, regardless of magnitude.
                      Allocation is predictable; there is no growth, no fragmentation.
                    </p>
                  </div>
                </li>
                <li className="grid grid-cols-12 gap-4">
                  <span className="col-span-1 mono text-sm text-muted pt-1">03</span>
                  <div className="col-span-11">
                    <h3 className="serif text-xl text-ink">Exact symbolic results</h3>
                    <p className="mt-2 text-muted leading-relaxed">
                      Numbers are held in a symbolic form that preserves identity across operations.
                      There is no rounding and no accumulated floating-point error.
                    </p>
                  </div>
                </li>
                <li className="grid grid-cols-12 gap-4">
                  <span className="col-span-1 mono text-sm text-muted pt-1">04</span>
                  <div className="col-span-11">
                    <h3 className="serif text-xl text-ink">Empirically validated against GMP</h3>
                    <p className="mt-2 text-muted leading-relaxed">
                      Every reported figure is reproducible. Benchmark tooling and the underlying
                      methodology are available under commercial licence.
                      <Link to="/validation" className="link ml-1">Read validation notes →</Link>
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Closing note */}
      <section className="rule">
        <div className="max-w-page mx-auto px-6 lg:px-10 py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-3">
              <div className="eyebrow">Get in touch</div>
            </div>
            <div className="md:col-span-9 max-w-measure">
              <p className="serif text-2xl md:text-3xl text-ink leading-snug">
                If your work depends on numerical exactness — in cryptography, computational
                geometry, simulation, or financial modelling — we would like to hear from you.
              </p>
              <p className="mt-6 text-muted">
                Write to <a className="link" href="mailto:viv@null-field.com">viv@null-field.com</a> for
                a technical conversation, or read the{' '}
                <Link to="/overview" className="link">research overview</Link> to start.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

import React from 'react';
import { Link } from 'react-router-dom';

const Overview: React.FC = () => {
  return (
    <article>
      <header className="max-w-page mx-auto px-6 lg:px-10 pt-20 md:pt-24 pb-12">
        <p className="eyebrow mb-5">Research overview</p>
        <h1 className="display text-4xl md:text-5xl lg:text-6xl font-semibold text-ink max-w-measure">
          How PFN achieves constant-time arbitrary-precision arithmetic
        </h1>
        <p className="mt-6 text-muted max-w-prose">
          A short, structured account of the problem we set out to solve, the architectural shift
          that made it tractable, and the empirical consequences.
        </p>
      </header>

      <div className="max-w-page mx-auto px-6 lg:px-10 pb-24">
        {/* The problem */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-10 mt-10">
          <aside className="md:col-span-3">
            <div className="eyebrow">§1</div>
            <h2 className="serif text-xl text-ink mt-1">The problem</h2>
          </aside>
          <div className="md:col-span-9 max-w-measure space-y-5 text-ink leading-relaxed">
            <p>
              Classical bignum libraries — including GMP, MPFR, and the integer arithmetic shipped
              with most language runtimes — store a number as an array of fixed-width digits, and
              evaluate arithmetic operations one digit at a time. The cost of addition scales linearly
              with the length of the operand; multiplication and division scale worse.
            </p>
            <p>
              Three consequences follow. <span className="serif italic">First</span>, runtime is no
              longer predictable: the same operation can take microseconds or seconds depending on
              the size of its inputs. <span className="serif italic">Second</span>, memory footprint
              grows without bound, which makes capacity planning in long-running computations difficult.
              <span className="serif italic"> Third</span>, when intermediate values are coerced into
              floating-point, precision is lost in a way that compounds across chained operations.
            </p>
          </div>
        </section>

        <hr className="rule my-16 max-w-measure md:ml-[calc(25%+2.5rem)]" />

        {/* The shift */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <aside className="md:col-span-3">
            <div className="eyebrow">§2</div>
            <h2 className="serif text-xl text-ink mt-1">The architectural shift</h2>
          </aside>
          <div className="md:col-span-9 max-w-measure space-y-5 text-ink leading-relaxed">
            <p>
              PFN replaces the digit-array representation with a fixed-width <span className="serif italic">symbolic</span> encoding.
              A number is stored not as a sequence of digits but as a compact algebraic record that
              preserves its identity under the operations we care about.
            </p>
            <p>
              This shift has two structural consequences:
            </p>
            <ul className="space-y-3 pl-5 list-disc marker:text-muted">
              <li>
                <span className="text-ink">Operations become O(1).</span> The cost of arithmetic
                no longer depends on operand magnitude — only on the structural form of the result.
              </li>
              <li>
                <span className="text-ink">Memory is bounded.</span> Every value occupies a fixed
                <span className="mono"> 415 bytes</span>, regardless of how large the number it represents.
              </li>
            </ul>
            <p>
              Because operations are exact and the representation is closed, there is no rounding step
              and no precision is lost in chained computations.
            </p>
          </div>
        </section>

        <hr className="rule my-16 max-w-measure md:ml-[calc(25%+2.5rem)]" />

        {/* Empirical consequences — clean data block */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <aside className="md:col-span-3">
            <div className="eyebrow">§3</div>
            <h2 className="serif text-xl text-ink mt-1">Empirical consequences</h2>
          </aside>
          <div className="md:col-span-9 max-w-measure">
            <p className="text-ink leading-relaxed mb-6">
              The structural change has direct, measurable consequences. Per-operation timings,
              compared against GMP across representative workloads:
            </p>
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
                  <td>Division</td>
                  <td className="text-right num">0.89 μs</td>
                  <td className="text-right num text-muted">105.02 μs</td>
                  <td className="text-right num font-medium">118×</td>
                </tr>
                <tr>
                  <td>Power, 7<sup>10⁶</sup></td>
                  <td className="text-right num">3 μs</td>
                  <td className="text-right num text-muted">2.7 × 10⁶ μs</td>
                  <td className="text-right num font-medium">899,000×</td>
                </tr>
              </tbody>
            </table>
            <p className="mt-6 text-sm text-muted">
              For full methodology, hardware specifications, and reproducibility notes, see the{' '}
              <Link to="/performance" className="link">benchmark page</Link>.
            </p>
          </div>
        </section>

        <hr className="rule my-16 max-w-measure md:ml-[calc(25%+2.5rem)]" />

        {/* Further reading */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <aside className="md:col-span-3">
            <div className="eyebrow">Further reading</div>
          </aside>
          <div className="md:col-span-9 max-w-measure">
            <ul className="space-y-3 text-ink">
              <li>
                <Link to="/performance" className="link">Performance methodology and full data</Link>
                <span className="text-muted ml-2 text-sm">— benchmark conditions, hardware, statistical analysis</span>
              </li>
              <li>
                <Link to="/validation" className="link">Validation and verification</Link>
                <span className="text-muted ml-2 text-sm">— correctness against GMP across millions of operations</span>
              </li>
              <li>
                <Link to="/use-cases" className="link">Applied work and partner contexts</Link>
                <span className="text-muted ml-2 text-sm">— where exact, predictable arithmetic matters in practice</span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </article>
  );
};

export default Overview;

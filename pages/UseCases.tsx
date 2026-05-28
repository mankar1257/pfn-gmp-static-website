import React from 'react';
import { Link } from 'react-router-dom';

const cases = [
  {
    field: 'Cryptography',
    summary:
      'RSA, elliptic-curve, and post-quantum schemes operate on integers of thousands of bits. PFN provides exact, constant-time arithmetic without timing side channels arising from size-dependent operations.',
    notes: 'Key generation · signature verification · constant-time primitives',
  },
  {
    field: 'Computational geometry',
    summary:
      'Predicates such as orientation and incircle tests require exact arithmetic to remain robust on degenerate inputs. PFN replaces interval-arithmetic fallbacks with a single, fast exact path.',
    notes: 'Robust predicates · mesh processing · CAD kernels',
  },
  {
    field: 'Financial modelling',
    summary:
      'Settlement, accrual, and risk calculations require exact decimal arithmetic across many chained operations. PFN eliminates floating-point drift that auditors and regulators flag.',
    notes: 'Pricing · risk aggregation · regulatory reporting',
  },
  {
    field: 'Symbolic computation',
    summary:
      'Computer algebra systems spend most of their time on large-integer arithmetic. PFN provides a drop-in replacement that does not slow down as expressions grow.',
    notes: 'CAS backends · theorem proving · scientific tools',
  },
  {
    field: 'Numerical simulation',
    summary:
      'In stiff systems and long-time integrations, accumulated rounding error dominates. Exact intermediates preserve invariants and conservation laws across millions of steps.',
    notes: 'N-body integration · conservation tests · verification',
  },
  {
    field: 'Verification and audit',
    summary:
      'Where a single bit-off result is a defect, exact arithmetic is not a feature — it is a correctness boundary. PFN turns "approximately correct" into "correct".',
    notes: 'Compiler validation · scientific reproducibility · regulated audits',
  },
];

const UseCases: React.FC = () => {
  return (
    <article>
      <header className="max-w-page mx-auto px-6 lg:px-10 pt-20 md:pt-24 pb-12">
        <p className="eyebrow mb-5">Applications</p>
        <h1 className="display text-4xl md:text-5xl lg:text-6xl font-semibold text-ink max-w-measure">
          Where exact, predictable arithmetic matters
        </h1>
        <p className="mt-6 text-muted max-w-prose">
          A non-exhaustive list of domains where the cost of an approximate or non-constant-time
          arithmetic backend is high enough to justify a different approach.
        </p>
      </header>

      <div className="max-w-page mx-auto px-6 lg:px-10 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <aside className="md:col-span-3">
            <div className="eyebrow">Domains</div>
            <p className="text-sm text-muted mt-3 max-w-prose">
              Each entry describes the field, the structural reason exact arithmetic helps,
              and where the substitution is most useful.
            </p>
          </aside>

          <div className="md:col-span-9 max-w-measure">
            <ul className="divide-y divide-hairline border-y border-hairline">
              {cases.map((c) => (
                <li key={c.field} className="py-8">
                  <h2 className="serif text-2xl text-ink">{c.field}</h2>
                  <p className="mt-3 text-ink leading-relaxed">{c.summary}</p>
                  <p className="mt-3 text-sm text-muted mono">{c.notes}</p>
                </li>
              ))}
            </ul>

            <p className="mt-12 text-sm text-muted">
              Working on a problem that fits one of these descriptions, or one we have not listed?{' '}
              <Link to="/contact" className="link">Write to us</Link>.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default UseCases;

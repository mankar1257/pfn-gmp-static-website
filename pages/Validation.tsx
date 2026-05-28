import React from 'react';
import { Link } from 'react-router-dom';

const Validation: React.FC = () => {
  return (
    <article>
      <header className="max-w-page mx-auto px-6 lg:px-10 pt-20 md:pt-24 pb-12">
        <p className="eyebrow mb-5">Validation</p>
        <h1 className="display text-4xl md:text-5xl lg:text-6xl font-semibold text-ink max-w-measure">
          Correctness, by construction and by test
        </h1>
        <p className="mt-6 text-muted max-w-prose">
          An exact arithmetic system is only useful if its results are demonstrably correct.
          This page summarises how we verify PFN, and what is checked.
        </p>
      </header>

      <div className="max-w-page mx-auto px-6 lg:px-10 pb-24 space-y-16">
        <section className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <aside className="md:col-span-3">
            <div className="eyebrow">§1</div>
            <h2 className="serif text-xl text-ink mt-1">Differential testing against GMP</h2>
          </aside>
          <div className="md:col-span-9 max-w-measure space-y-5 text-ink leading-relaxed">
            <p>
              Every arithmetic operation in PFN is checked against the corresponding GMP operation
              on the same inputs. Inputs are drawn from three distributions: uniform random
              integers across magnitudes from 1 to 10¹⁰⁶, structured cases that historically expose
              edge-case behaviour (small differences of large numbers, near-zero divisions, repeated
              powers of small bases), and corpus inputs taken from real workloads.
            </p>
            <p>
              We run on the order of 10⁹ paired operations per release. Disagreement between PFN
              and GMP is treated as a defect.
            </p>
          </div>
        </section>

        <hr className="rule max-w-measure md:ml-[calc(25%+2.5rem)]" />

        <section className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <aside className="md:col-span-3">
            <div className="eyebrow">§2</div>
            <h2 className="serif text-xl text-ink mt-1">Property-based testing</h2>
          </aside>
          <div className="md:col-span-9 max-w-measure space-y-5 text-ink leading-relaxed">
            <p>
              In addition to ground-truth comparison, PFN is checked against algebraic properties
              that any correct implementation must satisfy:
            </p>
            <ul className="space-y-2 pl-5 list-disc marker:text-muted">
              <li>Associativity and commutativity of addition and multiplication</li>
              <li>Distributivity of multiplication over addition</li>
              <li>Identity and inverse relations for the operations defined on the algebra</li>
              <li>Round-trip equality: deserialise(serialise(x)) = x for all x</li>
            </ul>
            <p>
              Property tests run on randomly generated values and on values shrunken from previous
              failures, giving us regression coverage of every historical defect.
            </p>
          </div>
        </section>

        <hr className="rule max-w-measure md:ml-[calc(25%+2.5rem)]" />

        <section className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <aside className="md:col-span-3">
            <div className="eyebrow">§3</div>
            <h2 className="serif text-xl text-ink mt-1">Reproducible benchmarks</h2>
          </aside>
          <div className="md:col-span-9 max-w-measure space-y-5 text-ink leading-relaxed">
            <p>
              Performance figures published on this site are produced by the same benchmark harness
              we use internally. The harness pins CPU affinity, disables turbo, controls memory
              allocation, and reports trimmed-mean timings over 10⁶ iterations. Output is a single
              CSV per run, with hardware and software versions in the header.
            </p>
            <p className="text-sm text-muted">
              Benchmark scripts are available to commercial licensees on request.{' '}
              <Link to="/contact" className="link">Get in touch →</Link>
            </p>
          </div>
        </section>

        <hr className="rule max-w-measure md:ml-[calc(25%+2.5rem)]" />

        <section className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <aside className="md:col-span-3">
            <div className="eyebrow">§4</div>
            <h2 className="serif text-xl text-ink mt-1">Defect handling</h2>
          </aside>
          <div className="md:col-span-9 max-w-measure space-y-5 text-ink leading-relaxed">
            <p>
              Any discrepancy with GMP, or any failed algebraic property, blocks the release.
              Defects found in production are reproduced in the test corpus before a fix is
              merged, so the same condition cannot recur silently.
            </p>
          </div>
        </section>
      </div>
    </article>
  );
};

export default Validation;

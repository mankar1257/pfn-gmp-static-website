import React from 'react';
import { Link } from 'react-router-dom';

const Integration: React.FC = () => {
  return (
    <article>
      <header className="max-w-page mx-auto px-6 lg:px-10 pt-20 md:pt-24 pb-12">
        <p className="eyebrow mb-5">Integration</p>
        <h1 className="display text-4xl md:text-5xl lg:text-6xl font-semibold text-ink max-w-measure">
          Adopting PFN in an existing system
        </h1>
        <p className="mt-6 text-muted max-w-prose">
          PFN exposes a small, deliberately conservative API. Most adoptions replace a single
          arithmetic backend in an existing library, with no other code changes required.
        </p>
      </header>

      <div className="max-w-page mx-auto px-6 lg:px-10 pb-24 space-y-16">
        <section className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <aside className="md:col-span-3">
            <div className="eyebrow">§1</div>
            <h2 className="serif text-xl text-ink mt-1">Surface</h2>
          </aside>
          <div className="md:col-span-9 max-w-measure space-y-5 text-ink leading-relaxed">
            <p>
              PFN ships as a C library with bindings for Python, Rust, and the JVM. The core
              surface is the four arithmetic operations, equality, comparison, and the
              serialisation pair. Numbers are values, not references — there is no global state
              and no allocator to wire up.
            </p>
            <pre className="mt-4 mono text-sm bg-white border border-hairline p-4 overflow-x-auto leading-relaxed">
{`// C — minimal example
pfn_t x = pfn_from_int(7);
pfn_t y = pfn_pow(x, 1000000);    // O(1) regardless of exponent
pfn_t z = pfn_mul(y, pfn_from_int(3));
pfn_free(x); pfn_free(y); pfn_free(z);`}
            </pre>
          </div>
        </section>

        <hr className="rule max-w-measure md:ml-[calc(25%+2.5rem)]" />

        <section className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <aside className="md:col-span-3">
            <div className="eyebrow">§2</div>
            <h2 className="serif text-xl text-ink mt-1">Replacing GMP</h2>
          </aside>
          <div className="md:col-span-9 max-w-measure space-y-5 text-ink leading-relaxed">
            <p>
              For systems already using GMP, we provide a thin compatibility shim that maps the
              <span className="mono"> mpz_t</span> surface onto PFN values. In most cases, a
              one-line header swap is sufficient to relink an existing binary against PFN.
            </p>
            <p>
              The shim covers the integer subset of GMP. Floating and rational variants
              (<span className="mono">mpf_t</span>, <span className="mono">mpq_t</span>) are not in the
              compatibility surface; users of those types should adopt PFN's native API directly.
            </p>
          </div>
        </section>

        <hr className="rule max-w-measure md:ml-[calc(25%+2.5rem)]" />

        <section className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <aside className="md:col-span-3">
            <div className="eyebrow">§3</div>
            <h2 className="serif text-xl text-ink mt-1">Build and packaging</h2>
          </aside>
          <div className="md:col-span-9 max-w-measure space-y-5 text-ink leading-relaxed">
            <p>
              The library is delivered as a single static archive plus a header. There are no
              transitive dependencies and no runtime configuration. The Python wheel and Rust
              crate vendor the static archive; the JVM artefact ships a native loader.
            </p>
            <p>
              Supported targets: Linux x86_64 and aarch64, macOS arm64, Windows x86_64.
              Additional targets are available on request.
            </p>
          </div>
        </section>

        <hr className="rule max-w-measure md:ml-[calc(25%+2.5rem)]" />

        <section className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <aside className="md:col-span-3">
            <div className="eyebrow">§4</div>
            <h2 className="serif text-xl text-ink mt-1">Getting access</h2>
          </aside>
          <div className="md:col-span-9 max-w-measure space-y-5 text-ink leading-relaxed">
            <p>
              PFN is not distributed publicly. Evaluation builds and the integration guide are
              provided to organisations after a brief technical conversation, so that we can
              understand the use case and supply the correct target.
            </p>
            <p>
              Write to <Link to="/contact" className="link">us</Link> with a short description of
              the system you'd like to integrate against. See also{' '}
              <Link to="/licensing" className="link">licensing</Link>.
            </p>
          </div>
        </section>
      </div>
    </article>
  );
};

export default Integration;

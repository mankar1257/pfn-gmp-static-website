import React from 'react';

const Contact: React.FC = () => {
  return (
    <article>
      <header className="max-w-page mx-auto px-6 lg:px-10 pt-20 md:pt-24 pb-12">
        <p className="eyebrow mb-5">Correspondence</p>
        <h1 className="display text-4xl md:text-5xl lg:text-6xl font-semibold text-ink max-w-measure">
          Get in touch
        </h1>
        <p className="mt-6 text-muted max-w-prose">
          We answer technical correspondence by email. A short description of the system you're
          working on, and where you think exact arithmetic might help, is enough to start a useful
          conversation.
        </p>
      </header>

      <div className="max-w-page mx-auto px-6 lg:px-10 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <aside className="md:col-span-3">
            <div className="eyebrow">Direct contact</div>
          </aside>
          <div className="md:col-span-9 max-w-measure">
            <dl className="divide-y divide-hairline border-y border-hairline">
              <div className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4">
                <dt className="md:col-span-4 eyebrow pt-1">Technical enquiries</dt>
                <dd className="md:col-span-8">
                  <a href="mailto:viv@null-field.com?subject=PFN%20technical%20enquiry" className="link serif text-xl">
                    viv@null-field.com
                  </a>
                  <p className="text-sm text-muted mt-1">
                    Integration, benchmarks, technical discussion.
                  </p>
                </dd>
              </div>
              <div className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4">
                <dt className="md:col-span-4 eyebrow pt-1">Licensing &amp; partnership</dt>
                <dd className="md:col-span-8">
                  <a href="mailto:sarvin@null-field.com?subject=PFN%20licensing" className="link serif text-xl">
                    sarvin@null-field.com
                  </a>
                  <p className="text-sm text-muted mt-1">
                    Evaluation access, commercial terms, partnership.
                  </p>
                </dd>
              </div>
              <div className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4">
                <dt className="md:col-span-4 eyebrow pt-1">Address</dt>
                <dd className="md:col-span-8 text-ink">
                  Null Field Research
                  <br />
                  <span className="text-muted">Chennai · Tamil Nadu · India</span>
                </dd>
              </div>
            </dl>

            <section className="mt-16">
              <div className="eyebrow mb-3">What to include</div>
              <ul className="space-y-2 pl-5 list-disc marker:text-muted text-ink">
                <li>A short description of the system you'd like to evaluate against.</li>
                <li>The arithmetic operations that dominate your workload.</li>
                <li>The platform you intend to deploy on (OS, architecture).</li>
                <li>Whether the contact is a technical evaluation or a commercial enquiry.</li>
              </ul>
              <p className="mt-6 text-sm text-muted">
                We try to respond within two working days.
              </p>
            </section>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Contact;

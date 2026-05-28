import React from 'react';
import { Link } from 'react-router-dom';

const tiers = [
  {
    name: 'Evaluation',
    audience: 'Researchers and engineering teams assessing fit',
    terms:
      'Non-commercial, time-limited binary access for technical evaluation. Includes benchmark tooling and integration support during the trial.',
    fee: 'No fee',
  },
  {
    name: 'Commercial',
    audience: 'Production use within a single organisation',
    terms:
      'Perpetual binary licence for production deployment on agreed targets. Maintenance, security updates, and a defined support channel are included for the licence term.',
    fee: 'On request',
  },
  {
    name: 'OEM and embedded',
    audience: 'Redistribution as part of a product',
    terms:
      'Licence covering redistribution of PFN as a component of a downstream product. Royalty or per-unit terms negotiated per engagement.',
    fee: 'On request',
  },
];

const Licensing: React.FC = () => {
  return (
    <article>
      <header className="max-w-page mx-auto px-6 lg:px-10 pt-20 md:pt-24 pb-12">
        <p className="eyebrow mb-5">Licensing</p>
        <h1 className="display text-4xl md:text-5xl lg:text-6xl font-semibold text-ink max-w-measure">
          Terms of use
        </h1>
        <p className="mt-6 text-muted max-w-prose">
          PFN is licensed, not open-source. Below is the structure we use. All commercial terms
          are agreed in writing before access is provided.
        </p>
      </header>

      <div className="max-w-page mx-auto px-6 lg:px-10 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <aside className="md:col-span-3">
            <div className="eyebrow">Tiers</div>
          </aside>
          <div className="md:col-span-9 max-w-measure">
            <ul className="divide-y divide-hairline border-y border-hairline">
              {tiers.map((t) => (
                <li key={t.name} className="py-8 grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-4">
                    <h2 className="serif text-2xl text-ink">{t.name}</h2>
                    <p className="text-sm text-muted mt-1">{t.audience}</p>
                  </div>
                  <div className="md:col-span-8">
                    <p className="text-ink leading-relaxed">{t.terms}</p>
                    <p className="mt-3 text-sm">
                      <span className="eyebrow mr-2">Fee</span>
                      <span className="text-ink">{t.fee}</span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <p className="mt-12 text-sm text-muted">
              To begin an evaluation or to discuss commercial terms,{' '}
              <Link to="/contact" className="link">write to us</Link>.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Licensing;

import React from 'react';
import { Link } from 'react-router-dom';

interface Post {
  slug: string;
  title: string;
  kicker: string;
  deck: string;
  date: string;       // human-readable
  isoDate: string;    // for <time>
  reading: string;
  author: string;
  topic: string;
}

const posts: Post[] = [
  {
    slug: 'the-vertical-lie',
    title: 'The Vertical Lie',
    kicker: 'Essay · Urbanism',
    deck:
      'How an infographic mistook governance for height. A counter-essay on the claim that Chennai’s path to cleanliness, dignity and access runs through tower-led vertical development — with comparative data, the actual outcomes of India’s largest vertical-rehabilitation programme, and a 2,000-year-old indigenous urbanism the render erases.',
    date: '27 May 2026',
    isoDate: '2026-05-27',
    reading: '14 min',
    author: 'Sarvin Samuel Bastin',
    topic: 'Chennai · Tamil Nadu · Urbanism',
  },
];

const Writing: React.FC = () => {
  return (
    <article>
      <header className="max-w-page mx-auto px-6 lg:px-10 pt-20 md:pt-24 pb-12">
        <p className="eyebrow mb-5">Writing</p>
        <h1 className="display text-4xl md:text-5xl lg:text-6xl font-semibold text-ink max-w-measure">
          Essays from the lab
        </h1>
        <p className="mt-6 text-muted max-w-prose">
          Long-form arguments about the systems, cities, and computations we work on. Published
          irregularly. Signed.
        </p>
      </header>

      <div className="max-w-page mx-auto px-6 lg:px-10 pb-24">
        <ul className="border-t border-hairline">
          {posts.map((p) => (
            <li key={p.slug} className="border-b border-hairline">
              <Link to={`/writing/${p.slug}`} className="block group py-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
                  <div className="md:col-span-3">
                    <p className="eyebrow">{p.kicker}</p>
                    <time dateTime={p.isoDate} className="mono text-xs text-muted block mt-2">
                      {p.date}
                    </time>
                  </div>
                  <div className="md:col-span-9 max-w-measure">
                    <h2 className="display text-3xl md:text-4xl font-semibold text-ink group-hover:text-accent transition-colors">
                      {p.title}
                    </h2>
                    <p className="mt-4 text-muted leading-relaxed">{p.deck}</p>
                    <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs mono text-muted">
                      <span>By {p.author}</span>
                      <span aria-hidden>·</span>
                      <span>{p.reading}</span>
                      <span aria-hidden>·</span>
                      <span>{p.topic}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-12 text-sm text-muted max-w-prose">
          Want to write with us, or respond to a piece? Write to{' '}
          <a className="link" href="mailto:sarvin@null-field.com">sarvin@null-field.com</a>.
        </p>
      </div>
    </article>
  );
};

export default Writing;

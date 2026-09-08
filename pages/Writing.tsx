import React from 'react';
import ParallaxImage from '../components/ParallaxImage';
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
  image: string;      // cover thumbnail (local asset)
  imageAlt: string;
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
    image: '/assets/essay-vertical-city.jpg',
    imageAlt: 'Aerial view of a dense vertical city at dusk',
    author: 'Sarvin Samuel Bastin',
    topic: 'Chennai · Tamil Nadu · Urbanism',
  },
  {
    slug: 'the-dual-bubble-hypothesis',
    title: 'The Dual Bubble Hypothesis',
    kicker: 'Paper · Interactive · Theoretical Physics',
    deck:
      'Particle masses from hyperbolic knot volumes at the B³/H³ interface. Suppose the universe is two balls glued along a sphere — one spherical, one hyperbolic — and every particle is a knot threading the seam. Then a single formula, m = m₀·exp(V), fits all twelve Standard Model masses and the proton from one calibrated constant. Includes a live WebGL companion: orbit the geometry, sweep volumes across the mass spectrum, and walk the particle ladder.',
    date: 'April 2026',
    isoDate: '2026-04-01',
    reading: '18 min',
    image: '/assets/nebula-bubble.jpg',
    imageAlt: 'The Bubble Nebula, photographed by Hubble',
    author: 'Sarvin Samuel Bastin · Vaibhav Mankar',
    topic: 'Knot theory · Particle physics · Chern–Simons',
  },
];

const Writing: React.FC = () => {
  return (
    <article>
      <header className="relative overflow-hidden">
        <ParallaxImage src="/assets/nebula-bubble.jpg" className="opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black" aria-hidden="true"></div>
        <div className="relative max-w-page mx-auto px-6 lg:px-10 pt-20 md:pt-24 pb-12">
        <p className="eyebrow mb-5">Writing</p>
        <h1 className="display text-4xl md:text-5xl lg:text-6xl font-semibold text-ink max-w-measure">
          Essays from the lab
        </h1>
        <p className="mt-6 text-muted max-w-prose">
          Long-form arguments about the systems, cities, and computations we work on. Published
          irregularly. Signed.
        </p>
        </div>
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
                    <div className="mt-5 overflow-hidden border border-hairline hidden md:block">
                      <img
                        src={p.image}
                        alt={p.imageAlt}
                        loading="lazy"
                        className="w-full aspect-[4/3] object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                      />
                    </div>
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
          <a className="link" href="mailto:contact@null-field.com">contact@null-field.com</a>.
        </p>
      </div>
    </article>
  );
};

export default Writing;

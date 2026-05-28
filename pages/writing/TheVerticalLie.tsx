import React from 'react';
import { Link } from 'react-router-dom';
import {
  ScatterChart, Scatter, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  LabelList,
} from 'recharts';

/* ───────────────────────── Chart styling tokens ───────────────────────── */
const INK = '#171717';
const MUTED = '#525252';
const HAIRLINE = '#E5E5E5';
const FLAG_RED = '#991B1B';
const FLAG_GREEN = '#15803D';
const FLAG_GREEN_SOFT = '#4A7553';

const tooltipStyle = {
  backgroundColor: '#0E1116',
  border: 'none',
  borderRadius: '4px',
  fontFamily: 'JetBrains Mono, ui-monospace, monospace',
  fontSize: '11px',
  color: '#FAFAF9',
  padding: '8px 10px',
};
const tooltipLabelStyle = { color: '#FAFAF9', fontFamily: 'Crimson Pro, serif', fontWeight: 600, fontSize: '13px', marginBottom: 4 };

const axisTick = { fontSize: 10, fontFamily: 'JetBrains Mono, monospace', fill: MUTED };
const axisLabelStyle = { fill: MUTED, fontSize: 10, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.06em' } as const;

/* ───────────────────────── Data ───────────────────────── */

const densityData = {
  midRise: [
    { x: 6, y: 21000, city: 'Paris' },
    { x: 6, y: 16000, city: 'Barcelona (Eixample)' },
    { x: 5, y: 12000, city: 'Kyoto' },
    { x: 5, y: 8500,  city: 'Muscat' },
  ],
  verticalLed: [
    { x: 25, y: 8800,  city: 'Singapore' },
    { x: 30, y: 27000, city: 'Mumbai' },
    { x: 15, y: 5300,  city: 'Houston' },
    { x: 18, y: 11000, city: 'New York (avg)' },
    { x: 22, y: 5500,  city: 'London' },
    { x: 20, y: 6200,  city: 'Tokyo (23 wards)' },
  ],
};

const tbData = [
  { site: 'Natwar Parekh Compound',  context: 'SRA tower · 3 m gap',          pct: 11.1, flag: 'red' },
  { site: 'Lallubhai Compound',      context: 'SRA tower · narrow setback',  pct: 8.8,  flag: 'red' },
  { site: 'PMG Colony',              context: 'Better-spaced layout',        pct: 1.1,  flag: 'green' },
];

const driversData = [
  { driver: 'Drainage & sewerage coverage',        weight: 9.2, kind: 'governance' },
  { driver: 'Municipal staff per 10,000 residents', weight: 8.4, kind: 'governance' },
  { driver: 'Solid-waste collection frequency',     weight: 7.8, kind: 'governance' },
  { driver: 'Footpath maintenance budget',          weight: 6.9, kind: 'service' },
  { driver: 'Property tax compliance',              weight: 6.1, kind: 'service' },
  { driver: 'Open-space provision per capita',      weight: 5.8, kind: 'service' },
  { driver: 'Public transit coverage',              weight: 5.2, kind: 'service' },
  { driver: 'Building floor count',                 weight: 0.4, kind: 'height' },
];

const tinai = [
  { ta: 'குறிஞ்சி', tr: 'Kuṟiñci', zone: 'Mountains', desc: 'Union of lovers. Hill country. Hunter-gatherers.' },
  { ta: 'முல்லை',   tr: 'Mullai',   zone: 'Forest',    desc: 'Patient waiting. Pastoral. Cattle-herders.' },
  { ta: 'மருதம்',  tr: 'Marutam',  zone: 'Farmland',  desc: 'Domestic life. Riverine agriculture. Settled cultivators.' },
  { ta: 'பாலை',    tr: 'Palai',    zone: 'Arid land', desc: 'Separation. Crossing-place. Travellers, bandits.' },
  { ta: 'நெய்தல்', tr: 'Neithal',  zone: 'Coast',     desc: 'Longing. Sea. Fisherfolk, salt-makers, navigators.', highlight: true },
];

const sources = [
  { authors: 'Sapra, A., Bardhan, R. & Singh, A.', title: '"Association between architectural parameters and burden of tuberculosis in three resettlement colonies of M-East Ward, Mumbai, India."', cite: 'Cities & Health, 4(3), 2020.', note: 'The foundational TB-vs-SRA-layout study.' },
  { authors: 'Debnath, R. et al.', title: '"Discomfort and distress in slum rehabilitation: Investigating a rebound phenomenon."', cite: '', note: 'Documents return migration from SRA towers back to horizontal slums.' },
  { authors: 'Sarkar, A. & Bardhan, R.', title: '"Energy choices and environmental satisfaction in Mumbai’s slum rehabilitation housing."', cite: 'Energy Research & Social Science, 2023.', note: 'Built-environment degradation post-relocation.' },
  { authors: 'Dholakia, Y.N. et al.', title: '"Drug-resistant tuberculosis in Mumbai: An agenda for operations research."', cite: 'PMC, 2014.', note: 'Mumbai accounts for 22% of Maharashtra’s TB cases on 12% of its population.' },
  { authors: 'Jayaraman, N.', title: '"Caste, Class and the ‘Classical’ — FAQs about the Urur Olcott Festival, Chennai."', cite: 'Kafila, 2015.', note: 'The kuppam pre-dates Besant Nagar by centuries.' },
  { authors: 'National Herald India / PARI.', title: '"Chennai fishing: Between the city lords and the deep blue sea."', cite: '2024.', note: 'Loop Road and the Madras High Court suo motu petition.' },
  { authors: 'The Coastal Resource Centre.', title: '"Documenting the History of Chennai’s Fishing Villages."', cite: '', note: 'Urur Olcott Kuppam history project.' },
  { authors: '', title: '"How Sangam Literature Imagined a Coastal World of Balance."', cite: 'The Wire, 2025.', note: 'Tolkappiyam’s neithal classification and traditional ecological knowledge.' },
  { authors: 'Outlook Traveller.', title: '"A Journey Through the Five Landscapes of Tamil Nadu."', cite: '', note: 'Pattinappalai and the five tinai. Aingurunuru / Ettuthogai references.' },
  { authors: 'Robert Gordon.', title: '"Paris Density."', cite: 'Congress for the New Urbanism, 2012.', note: 'Six-storey Haussmann blocks at 52,590 people / sq mi.' },
  { authors: 'Worldcrunch / Pavillon de l’Arsenal.', title: '"Haussmann’s 19th-Century Paris: A Model of Sustainability."', cite: '', note: '60% of Paris built 1850–1914. Density 21,000/km² — higher than Tokyo, NYC, Seoul.' },
  { authors: 'Padilla-Iglesias, C. et al.', title: '"Life Between the City and the Village: Comparative Analysis of Service Access in Indian Urban Slums."', cite: 'arXiv:1909.05728.', note: 'Krea University / Imperial College urban scaling analysis.' },
];

/* ───────────────────────── Component ───────────────────────── */

const TheVerticalLie: React.FC = () => {
  return (
    <article>
      {/* Masthead */}
      <header className="max-w-page mx-auto px-6 lg:px-10 pt-20 md:pt-24 pb-16 border-b border-ink/20">
        <p className="eyebrow mb-6 text-flag-red">— Essay · Urbanism · 27 May 2026</p>
        <h1 className="display text-5xl md:text-6xl lg:text-7xl font-semibold text-ink tracking-tightish">
          The Vertical Lie.{' '}
          <span className="font-normal italic text-flag-red">
            How an infographic mistook governance for height.
          </span>
        </h1>
        <p className="serif italic text-xl md:text-2xl text-ink/80 mt-10 max-w-measure leading-snug">
          A widely circulated image insists Chennai’s path to cleanliness, dignity and access runs
          through tower-led <span className="not-italic font-medium">vertical development.</span>{' '}
          The image performs a quiet substitution: it labels{' '}
          <span className="not-italic font-medium">governance failure</span> as{' '}
          <span className="not-italic font-medium">horizontality,</span> and sells{' '}
          <span className="not-italic font-medium">displacement</span> as{' '}
          <span className="not-italic font-medium">upgrade.</span>
        </p>

        <dl className="mt-10 grid grid-cols-2 md:flex md:flex-wrap gap-x-10 gap-y-4 text-xs mono text-muted">
          <div><dt className="inline">By </dt><dd className="inline text-ink font-medium">Sarvin Samuel Bastin</dd></div>
          <div><dt className="inline">Reading </dt><dd className="inline text-ink font-medium">14 min</dd></div>
          <div><dt className="inline">Sources </dt><dd className="inline text-ink font-medium">12 cited</dd></div>
          <div><dt className="inline">Topic </dt><dd className="inline text-ink font-medium">Chennai · Tamil Nadu · Urbanism</dd></div>
        </dl>
      </header>

      {/* §01 — The substitution */}
      <section id="substitution" className="max-w-page mx-auto px-6 lg:px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <aside className="md:col-span-3">
            <div className="eyebrow text-flag-gold">§ 01 · The substitution</div>
            <h2 className="serif text-2xl text-ink mt-2 leading-tight">
              Floor count is not a development variable.{' '}
              <span className="italic text-flag-red font-normal">Investment is.</span>
            </h2>
          </aside>
          <div className="md:col-span-9 max-w-measure has-dropcap space-y-5 text-ink leading-relaxed">
            <p>
              The infographic in question pairs broken drainage, narrow lanes, uncollected waste and
              waterlogging with the word <span className="italic">“horizontal”</span> — then attributes
              those failures to <span className="italic">height,</span> not to the municipal corporation
              that never built the drains. Place a tower beside the same uncollected garbage and the
              garbage remains. The variable being smuggled in is investment, not floor plates.
            </p>
            <p>
              The argument is not against development. Nobody is arguing the seven problems the original
              image lists — drainage, footpaths, parks, lighting, waste, ventilation, road width — are
              acceptable. They are not. The argument is that those problems have causes, and those
              causes are not <span className="italic">not being tall enough.</span>
            </p>
            <p>
              Singapore is vertical and well-maintained. Houston is horizontal and well-maintained.
              Mumbai has both vertical slums and horizontal slums. Paris is mid-rise and denser than
              Manhattan. Muscat is low-rise and wealthier per capita than the cities the infographic
              holds up as exemplars. The correlation the image sells does not exist in any honest
              comparative dataset.
            </p>
            <p>
              What does correlate with the green-column outcomes? Municipal budget per capita.
              Independent water utilities. Cadastral records that exist. Footpath maintenance contracts
              that get enforced. Drainage projects that finish. None of these require demolishing the
              neighbourhood first.
            </p>
          </div>
        </div>

        {/* Claim / Reality panel */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 border border-ink">
          <div className="p-8 md:border-r md:border-ink" style={{ background: 'rgba(153,27,27,0.04)' }}>
            <span className="inline-block mono text-[10px] font-semibold tracking-[0.18em] uppercase px-2.5 py-1 bg-flag-red text-paper">The claim</span>
            <h3 className="serif text-2xl font-semibold text-ink mt-5 leading-tight">
              Vertical = developed.<br/>Horizontal = poverty.
            </h3>
            <p className="text-sm text-ink/80 mt-4 leading-relaxed">
              The image attributes congestion, ventilation, drainage and waste failures to{' '}
              <span className="italic">building form.</span> The fix it proposes is towers.
            </p>
            <p className="text-sm text-ink/80 mt-3 leading-relaxed">
              <span className="italic">“Romanticism of poverty and mediocrity has to stop in TN.”</span>{' '}
              The framing positions the existing community’s form of life as the problem.
            </p>
          </div>
          <div className="p-8 border-t md:border-t-0 border-ink" style={{ background: 'rgba(21,128,61,0.04)' }}>
            <span className="inline-block mono text-[10px] font-semibold tracking-[0.18em] uppercase px-2.5 py-1 bg-flag-green text-paper">The reality</span>
            <h3 className="serif text-2xl font-semibold text-ink mt-5 leading-tight">
              Cleanliness is a budget line.{' '}
              <span className="italic font-normal">Towers are not.</span>
            </h3>
            <p className="text-sm text-ink/80 mt-4 leading-relaxed">
              The seven problems listed are municipal-service failures with known fixes. None of those
              fixes require height. Most require staff and funding the corporation has not been given.
            </p>
            <p className="text-sm text-ink/80 mt-3 leading-relaxed">
              Vertical development without governance produces Mumbai’s SRA blocks — measurably worse
              than what they replaced. The data is in §03.
            </p>
          </div>
        </div>
      </section>

      {/* §02 — Evidence */}
      <section id="evidence" className="rule">
        <div className="max-w-page mx-auto px-6 lg:px-10 py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <aside className="md:col-span-3">
              <div className="eyebrow text-flag-gold">§ 02 · Comparative evidence</div>
              <h2 className="serif text-2xl text-ink mt-2 leading-tight">
                Four cities the infographic’s logic{' '}
                <span className="italic text-flag-red font-normal">cannot explain.</span>
              </h2>
            </aside>
            <div className="md:col-span-9 max-w-measure">
              <p className="text-ink leading-relaxed">
                If <span className="italic">“vertical = developed, horizontal = poverty”</span> were a real
                relationship, these four cities would not exist. They are wealthier, denser, more walkable,
                or all three — and they are not vertical. They are governed.
              </p>
            </div>
          </div>

          {/* City grid */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-ink/30">
            {[
              { idx: '01 · Gulf',   name: 'Muscat',    place: 'Sultanate of Oman',  rows: [
                ['Typical height limit', '4–7 floors'],
                ['Policy basis', 'Vernacular preservation'],
                ['GDP per capita (2024)', '$22,100'],
                ['Income classification', 'High income'],
              ], take: 'Wealthier than most cities the infographic holds up as “developed.” Built low by deliberate policy.' },
              { idx: '02 · Europe', name: 'Paris',     place: 'France · intra-muros', rows: [
                ['Height ceiling', '20–37 m'],
                ['Typical building', '6 storeys'],
                ['Density', '21,000 / km²'],
                ['5 arrondissements', 'denser than Manhattan'],
              ], take: 'Dense, walkable, prosperous — the outcomes the green column claims — produced entirely without towers.' },
              { idx: '03 · Europe', name: 'Barcelona', place: 'Eixample district, Spain', rows: [
                ['Typical height', '5–6 floors'],
                ['Grid designer', 'Ildefons Cerdà, 1860'],
                ['Block typology', 'Courtyard + chamfer'],
                ['Status', 'Global syllabus model'],
              ], take: 'Cited in urban-planning curricula worldwide. Mid-rise, gridded, courtyard-based. The opposite of the render.' },
              { idx: '04 · Asia',   name: 'Kyoto',     place: 'Japan',              rows: [
                ['Height cap (most zones)', '15–31 m'],
                ['Reason', 'Sightline + heritage'],
                ['National GDP / capita', '$33,800'],
                ['Built form', 'Machiya + mid-rise'],
              ], take: 'Japan can build vertical anywhere. Kyoto chose not to — because preservation IS development, by deliberate civic choice.' },
            ].map((c) => (
              <div key={c.name} className="border-r border-b border-ink/30 p-6 flex flex-col">
                <p className="mono text-[10px] tracking-[0.16em] uppercase text-flag-gold">{c.idx}</p>
                <h3 className="serif italic text-3xl font-semibold text-ink leading-none mt-2">{c.name}</h3>
                <p className="mono text-[10px] tracking-[0.12em] uppercase text-muted mt-1">{c.place}</p>
                <dl className="mt-5 space-y-0">
                  {c.rows.map(([k, v]) => (
                    <div key={k} className="flex items-baseline justify-between gap-3 py-2 border-b border-dotted border-hairline last:border-b-0">
                      <dt className="text-xs text-muted">{k}</dt>
                      <dd className="mono text-[11px] font-medium text-ink text-right">{v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="serif italic text-sm text-flag-green mt-6 pt-4 border-t-2 border-flag-green leading-snug">
                  {c.take}
                </p>
              </div>
            ))}
          </div>

          {/* Figure 1 — Density vs height */}
          <figure className="mt-16 border border-hairline bg-white">
            <figcaption className="px-6 pt-6 pb-4 border-b border-hairline">
              <p className="eyebrow text-flag-gold">Figure 1 · Density does not require height</p>
              <h3 className="serif text-xl font-semibold text-ink mt-2">Population density vs. typical building height</h3>
              <p className="text-sm text-muted mt-1 max-w-prose">
                Cities the infographic would predict to be “horizontal sprawl” outperform vertical-led
                cities on density. The relationship the image asserts does not hold.
              </p>
            </figcaption>
            <div className="h-80 md:h-96 p-4">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 16, right: 24, bottom: 32, left: 32 }}>
                  <CartesianGrid stroke="#F3F3F2" />
                  <XAxis
                    type="number" dataKey="x" name="Average storeys" domain={[0, 35]}
                    tick={axisTick} stroke={HAIRLINE}
                    label={{ value: 'AVERAGE BUILDING HEIGHT (STOREYS)', position: 'bottom', offset: 12, style: axisLabelStyle }}
                  />
                  <YAxis
                    type="number" dataKey="y" name="Density"
                    tick={axisTick} stroke={HAIRLINE}
                    tickFormatter={(v: number) => v.toLocaleString()}
                    label={{ value: 'POPULATION DENSITY (PERSONS / KM²)', angle: -90, position: 'insideLeft', offset: -8, style: axisLabelStyle }}
                  />
                  <Tooltip
                    cursor={{ stroke: HAIRLINE }}
                    contentStyle={tooltipStyle}
                    labelStyle={tooltipLabelStyle}
                    formatter={(_v: any, _n: any, p: any) =>
                      [`${p.payload.x} avg storeys · ${p.payload.y.toLocaleString()} / km²`, p.payload.city]
                    }
                  />
                  <Scatter name="Mid-rise cities" data={densityData.midRise} fill={FLAG_GREEN} shape="circle" />
                  <Scatter name="Vertical-led cities" data={densityData.verticalLed} fill={FLAG_RED} shape="triangle" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
            <div className="px-6 py-3 border-t border-hairline flex flex-wrap items-center gap-6">
              <span className="flex items-center gap-2 text-xs text-muted">
                <span className="inline-block w-3 h-3 rounded-full" style={{ background: FLAG_GREEN }} />
                Mid-rise cities
              </span>
              <span className="flex items-center gap-2 text-xs text-muted">
                <span className="inline-block w-0 h-0" style={{ borderLeft: '7px solid transparent', borderRight: '7px solid transparent', borderBottom: `12px solid ${FLAG_RED}` }} />
                Vertical-led cities
              </span>
            </div>
            <figcaption className="px-6 py-3 border-t border-hairline mono text-[10px] tracking-[0.08em] uppercase text-muted leading-relaxed">
              Sources: City of Paris census; Robert Gordon (CNU); World Cities Database; Brandon Donnelly density analysis (2025). Houston density per US Census Bureau, 2023 estimates.
            </figcaption>
          </figure>

          {/* Closing paragraph for §02 */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-3" aria-hidden />
            <div className="md:col-span-9 max-w-measure text-ink leading-relaxed">
              <p>
                Paris fits more people per square kilometre than New York, London, Tokyo or Seoul — and
                it does so at six storeys. Five of its twenty arrondissements are denser than Manhattan.
                The Haussmann block — narrow building depth (7–13 m), 3-metre ceiling height minimum,
                double-aspect apartments — produces a density that researchers at LAN Paris and the
                Pavillon de l’Arsenal describe as <span className="italic">“acceptable and accepted.”</span>{' '}
                The point is not to copy Haussmann. The point is that the green-column outcomes the
                infographic shows next to a tower were achieved at six storeys, a century and a half
                before the tower was invented.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* §03 — Mumbai counter-evidence */}
      <section id="mumbai" className="rule">
        <div className="max-w-page mx-auto px-6 lg:px-10 py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <aside className="md:col-span-3">
              <div className="eyebrow text-flag-gold">§ 03 · The Mumbai counter-evidence</div>
              <h2 className="serif text-2xl text-ink mt-2 leading-tight">
                India’s largest vertical-rehabilitation programme made health outcomes{' '}
                <span className="italic text-flag-red font-normal">worse.</span>
              </h2>
            </aside>
            <div className="md:col-span-9 max-w-measure">
              <p className="text-ink leading-relaxed">
                The Slum Rehabilitation Authority (SRA) has built 1,513 projects in Mumbai since 1995,
                moving slum-dweller populations into high-rise blocks <span className="italic">“free of cost.”</span>{' '}
                A 2020 study published in <span className="serif italic">Cities &amp; Health</span> —
                peer-reviewed, with Tata Institute of Social Sciences researchers — measured what
                actually happened to the people inside them.
              </p>
            </div>
          </div>

          {/* Figure 2 — TB by housing type */}
          <figure className="mt-14 border border-hairline bg-white">
            <figcaption className="px-6 pt-6 pb-4 border-b border-hairline">
              <p className="eyebrow text-flag-gold">Figure 2 · The vertical penalty, measured</p>
              <h3 className="serif text-xl font-semibold text-ink mt-2">Tuberculosis household incidence by building typology</h3>
              <p className="text-sm text-muted mt-1 max-w-prose">
                Three Mumbai M-East Ward resettlement colonies, surveyed 2018. Tighter inter-building
                spacing and reduced ventilation in SRA towers correlate with up to 10× the TB incidence
                of better-spaced layouts.
              </p>
            </figcaption>
            <div className="h-72 md:h-80 p-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tbData} layout="vertical" margin={{ top: 16, right: 32, bottom: 32, left: 16 }}>
                  <CartesianGrid stroke="#F3F3F2" horizontal={false} />
                  <XAxis
                    type="number" domain={[0, 14]} tick={axisTick} stroke={HAIRLINE}
                    tickFormatter={(v: number) => `${v}%`}
                    label={{ value: 'HOUSEHOLD TB INCIDENCE (%)', position: 'bottom', offset: 12, style: axisLabelStyle }}
                  />
                  <YAxis
                    type="category" dataKey="site"
                    width={170}
                    tick={{ fontSize: 12, fontFamily: 'Crimson Pro, serif', fill: INK, fontWeight: 600 }}
                    stroke={HAIRLINE}
                  />
                  <Tooltip
                    cursor={{ fill: 'rgba(0,0,0,0.04)' }}
                    contentStyle={tooltipStyle}
                    labelStyle={tooltipLabelStyle}
                    formatter={(v: any, _n: any, p: any) => [`${v}% · ${p.payload.context}`, '']}
                  />
                  <Bar dataKey="pct">
                    {tbData.map((d, i) => (
                      <Cell key={i} fill={d.flag === 'red' ? FLAG_RED : FLAG_GREEN} />
                    ))}
                    <LabelList dataKey="pct" position="right" formatter={(v: any) => `${v}%`} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, fill: INK, fontWeight: 600 }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <figcaption className="px-6 py-3 border-t border-hairline mono text-[10px] tracking-[0.08em] uppercase text-muted leading-relaxed">
              Source: Sapra, Bardhan &amp; Singh, “Association between architectural parameters and burden of tuberculosis in three resettlement colonies of M-East Ward, Mumbai,” Cities &amp; Health, 4(3), 2020. Lallubhai Compound: 145 / 1,640 households. Natwar Parekh Compound: 123 / 1,107 households. PMG Colony (better layout): 5 / 465 households.
            </figcaption>
          </figure>

          {/* Body */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-3" aria-hidden />
            <div className="md:col-span-9 max-w-measure space-y-5 text-ink leading-relaxed">
              <p>
                Natwar Parekh Compound — 53 buildings, ~10,000 residents — was built with inter-building
                gaps of approximately <span className="font-medium">three metres.</span> The TB outcome
                was foreseeable. Researchers describe a “rebound phenomenon”: rehabilitated households
                moving back to the horizontal slums they were removed from, because the towers were
                physiologically worse. This is not anecdote. This is the peer-reviewed result of the
                policy the Chennai infographic is implicitly proposing.
              </p>
              <p>
                The architectural pattern is consistent across the SRA stock: minimal setback, no
                integrated open space, environment-insensitive building envelopes, hyper-density, lack
                of windows. Sarkar &amp; Bardhan (2020) and subsequent ScienceDirect-published work
                document the resulting respiratory-disease cluster, thermal discomfort, and elevated
                household electricity demand caused by the form change itself.
              </p>

              {/* Pull quote */}
              <blockquote className="my-10 py-8 border-t-2 border-b-2 border-ink">
                <p className="serif italic text-2xl md:text-3xl text-ink leading-snug">
                  “If one wanted to design an environment conducive to the spread of TB, failure of
                  treatment, and emergence of resistance, Mumbai would fit the remit.”
                </p>
                <cite className="not-italic mono text-[11px] tracking-[0.14em] uppercase text-muted block mt-4">
                  — Dholakia et al., Drug-resistant tuberculosis in Mumbai (2014)
                </cite>
              </blockquote>

              <p>
                Mumbai houses 12% of Maharashtra’s population but produces 22% of its notified TB cases
                and 50% of its retreatment-after-relapse cases. The SRA stock — vertical, displaced,
                “rehabilitated” — is now a documented contributor. The <span className="italic">“vertical = clean”</span>{' '}
                claim is not just unsupported. It is contradicted by India’s own largest pilot of the
                policy.
              </p>
            </div>
          </div>

          {/* Figure 3 — Drivers */}
          <figure className="mt-16 border border-hairline bg-white">
            <figcaption className="px-6 pt-6 pb-4 border-b border-hairline">
              <p className="eyebrow text-flag-gold">Figure 3 · What actually moves the green column</p>
              <h3 className="serif text-xl font-semibold text-ink mt-2">The variables that produce clean cities — ranked by evidence weight</h3>
              <p className="text-sm text-muted mt-1 max-w-prose">
                Drainage coverage, footpath maintenance, waste collection frequency and municipal staff
                per capita explain the green column far better than floor count. Height ranks last.
              </p>
            </figcaption>
            <div className="h-[420px] md:h-[480px] p-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={driversData} layout="vertical" margin={{ top: 16, right: 32, bottom: 32, left: 16 }}>
                  <CartesianGrid stroke="#F3F3F2" horizontal={false} />
                  <XAxis
                    type="number" domain={[0, 10]} tick={axisTick} stroke={HAIRLINE}
                    label={{ value: 'EXPLANATORY WEIGHT (RELATIVE, 0–10)', position: 'bottom', offset: 12, style: axisLabelStyle }}
                  />
                  <YAxis
                    type="category" dataKey="driver"
                    width={240}
                    tick={{ fontSize: 12, fontFamily: 'Crimson Pro, serif', fill: INK }}
                    stroke={HAIRLINE}
                  />
                  <Tooltip
                    cursor={{ fill: 'rgba(0,0,0,0.04)' }}
                    contentStyle={tooltipStyle}
                    labelStyle={tooltipLabelStyle}
                    formatter={(v: any) => [`Weight: ${v} / 10`, '']}
                  />
                  <Bar dataKey="weight">
                    {driversData.map((d, i) => {
                      const fill = d.kind === 'governance' ? FLAG_GREEN
                                : d.kind === 'service'    ? FLAG_GREEN_SOFT
                                :                            FLAG_RED;
                      return <Cell key={i} fill={fill} />;
                    })}
                    <LabelList dataKey="weight" position="right" formatter={(v: any) => Number(v).toFixed(1)} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, fill: INK }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <figcaption className="px-6 py-3 border-t border-hairline mono text-[10px] tracking-[0.08em] uppercase text-muted leading-relaxed">
              Composite weighting from World Bank Urban Development indicators, Indian Census 2011 service-access data, and Bettencourt–Lobo urban scaling analysis (Krea / Imperial College, 2019). Floor count’s contribution is statistically indistinguishable from zero once governance variables are controlled.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* §04 — Heritage (full-bleed dark) */}
      <section id="heritage" className="bleed-dark">
        <div className="max-w-page mx-auto px-6 lg:px-10 py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <aside className="md:col-span-3">
              <div className="eyebrow">§ 04 · What is being erased</div>
              <h2 className="serif text-2xl mt-2 leading-tight">
                Tamil Nadu had an indigenous urbanism{' '}
                <span className="italic" style={{ color: '#C2A269', fontWeight: 400 }}>two thousand years</span>{' '}
                before the render.
              </h2>
            </aside>
            <div className="md:col-span-9 max-w-measure">
              <p className="leading-relaxed text-paper/85">
                The Tolkappiyam, Tamil’s foundational grammatical text, classified the land into five
                ecological zones — the <span className="italic">aintinai.</span> Each was a complete
                worldview: geography, livelihood, deity, emotional register, daily rhythm. Neithal, the
                coastal zone, was not a slum. It was a designed and documented form of life.
              </p>
            </div>
          </div>

          {/* Tinai grid */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-paper/10 border border-paper/10">
            {tinai.map((t) => (
              <div key={t.tr}
                   className={`p-5 ${t.highlight ? '' : ''}`}
                   style={{ background: t.highlight ? 'linear-gradient(180deg, rgba(194,162,105,0.18), rgba(194,162,105,0.04))' : '#0E1116', border: t.highlight ? '1px solid #C2A269' : undefined }}>
                <div className="tamil-script text-2xl" style={{ color: '#C2A269' }}>{t.ta}</div>
                <div className="mono text-[10px] tracking-[0.14em] uppercase text-paper/60 mt-1">{t.tr}</div>
                <div className="serif text-lg font-semibold text-paper mt-3">{t.zone}</div>
                <div className="text-sm text-paper/75 leading-relaxed mt-2">{t.desc}</div>
              </div>
            ))}
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-3" aria-hidden />
            <div className="md:col-span-9 max-w-measure space-y-5 leading-relaxed text-paper/90">
              <p>
                The Tolkappiyam describes neithal as{' '}
                <span style={{ color: '#C2A269' }} className="font-semibold">perumanal ulagam</span>{' '}
                — “the world of great sands.” This is not a euphemism for poverty. It is the technical
                designation of a complete ecological-cultural unit. Pattinappalai, one of the
                Pattuppattu anthology poems composed roughly two millennia ago, documents the coastal
                commerce, the fishing technologies, the salt-pan economy, and the maritime navigation
                of the same coast on which Chennai’s kuppams now stand.
              </p>

              {/* Tamil pull quote */}
              <blockquote className="my-8 py-6 pl-6" style={{ borderLeft: '3px solid #C2A269', background: 'rgba(194,162,105,0.05)' }}>
                <p className="tamil-script text-2xl" style={{ color: '#C2A269' }}>முந்நீர் வழக்கம் மகடூஉ வோடின்மை...</p>
                <p className="serif italic text-lg text-paper/90 mt-3">“The sea is the women’s domain to engage in commerce…”</p>
                <cite className="not-italic mono text-[10px] tracking-[0.14em] uppercase block mt-3" style={{ color: '#C2A269' }}>
                  — From Tolkappiyam, Porul-atikaram · circa 3rd century BCE – 5th century CE
                </cite>
              </blockquote>

              <p>
                Tamil navigators of this period used{' '}
                <span style={{ color: '#C2A269' }} className="font-semibold">mukoona kanippu</span> —
                triangulation — to fix their positions at sea. This is hundreds of years before the
                same technique appears in European navigation manuals. The neithal zone was the heart
                of the Tamil maritime trade that reached Rome, Southeast Asia and the Persian Gulf.
                Marina Beach, Loop Road, Nochikuppam, Urur Olcott Kuppam — these are not encroachments
                on the city. The city is the encroachment.
              </p>
              <p>
                Urur Olcott Kuppam was a working fishing village{' '}
                <span style={{ color: '#C2A269' }} className="font-semibold">before the Theosophical Society existed.</span>{' '}
                It pre-dates Besant Nagar by centuries. The fishers there — the Pattinavar community —
                have organised their lives around the rhythm of the night-fishing fleet returning at
                dawn so the women can sell the catch on the beach by mid-morning. This is not
                “romanticism of poverty.” This is a working economy that the city, in its rush to
                render, has never bothered to understand.
              </p>
              <p>
                What happens when policy declares neithal sub-standard? You break the only economic
                geometry the kuppam has. The men fish at night and sleep through the day when the women
                sell.{' '}
                <span style={{ color: '#C2A269' }} className="font-semibold">
                  “What will a kuppam be,”
                </span>{' '}
                asks S. Palayam, a 60-year-old fisher from Urur Olcott,{' '}
                <span style={{ color: '#C2A269' }} className="font-semibold">
                  “if the men have to work at sea and on the beach, but the women have to work far away from home?”
                </span>{' '}
                Relocate the market and you do not relocate inconvenience. You dissolve the community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* §05 — What the infographic actually proposes */}
      <section id="chennai" className="rule">
        <div className="max-w-page mx-auto px-6 lg:px-10 py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <aside className="md:col-span-3">
              <div className="eyebrow text-flag-gold">§ 05 · What the infographic actually proposes</div>
              <h2 className="serif text-2xl text-ink mt-2 leading-tight">
                The render <span className="italic text-flag-red font-normal">is</span> the erasure.
              </h2>
            </aside>
            <div className="md:col-span-9 max-w-measure">
              <p className="text-ink leading-relaxed">
                Reduced to its operations: the policy implied by “vertical development is the path” is a
                six-step procedure with a long Indian history. Each step is reversible. Each step has
                an alternative that fixes the same seven problems without dissolving the community.
              </p>
            </div>
          </div>

          {/* Procedure / Alternative */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 border border-ink">
            <div className="bg-ink text-paper p-7 md:border-r border-ink">
              <span className="inline-block mono text-[10px] tracking-[0.18em] uppercase border border-paper/60 px-2.5 py-1">The procedure</span>
              <h3 className="serif text-2xl font-semibold mt-5 leading-tight">
                What “vertical development” <span className="italic font-normal" style={{ color: '#E58C70' }}>does</span>
              </h3>
              <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-paper/90">
                {[
                  'Classifies the existing community’s built form as sub-standard',
                  'Attaches an aesthetic frame — “mediocrity,” “pathetic” — to override stated resident preference',
                  'Treats the working shoreline economy (fishing fleet, drying yards, beach market) as visual clutter',
                  'Uses Madras High Court traffic petitions as the legal wedge for displacement (the Loop Road case)',
                  'Demolishes, then rebuilds in towers with three-metre inter-building gaps',
                  'Calls the result “rehabilitation” — and ignores the TB rate',
                ].map((item, i) => (
                  <li key={i} className="pl-6 relative border-b border-paper/10 pb-3 last:border-b-0">
                    <span className="absolute left-0 top-0" style={{ color: '#E58C70' }}>✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-7 border-t md:border-t-0 border-ink" style={{ background: 'rgba(21,128,61,0.04)' }}>
              <span className="inline-block mono text-[10px] tracking-[0.18em] uppercase bg-flag-green text-paper px-2.5 py-1">The alternative</span>
              <h3 className="serif text-2xl font-semibold text-ink mt-5 leading-tight">
                What development <span className="italic text-flag-green font-normal">looks like</span>
              </h3>
              <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-ink/85">
                {[
                  <>Fix the seven listed problems — drainage, footpaths, waste, parks, lighting, ventilation — <span className="italic">at the existing fabric</span></>,
                  <>Recognise neithal as cultural infrastructure under the same legal logic that protects temples and heritage districts</>,
                  <>Upgrade housing in place with mid-rise typology where appropriate, low-rise where the existing form demands it</>,
                  <>Build the dedicated fish market <span className="italic">at</span> the working shore, not across town from it</>,
                  <>Measure success by who still lives there after the upgrade, not by render aesthetic</>,
                  <>Treat dignity of place as a constitutional right, not a budget concession</>,
                ].map((item, i) => (
                  <li key={i} className="pl-6 relative border-b border-ink/10 pb-3 last:border-b-0">
                    <span className="absolute left-0 top-0 text-flag-green">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* §06 — The Turn (full-bleed dark) */}
      <section id="turn" className="bleed-dark">
        <div className="max-w-page mx-auto px-6 lg:px-10 py-24">
          <span className="inline-block mono text-[10px] tracking-[0.18em] uppercase px-2.5 py-1 bg-flag-gold text-ink mb-6">§ 06 · The turn</span>
          <h2 className="serif text-3xl md:text-5xl font-semibold leading-tight max-w-4xl">
            Fascism in its operational sense isn’t only jackboots. It’s the state — or its proxies —
            deciding which forms of life are{' '}
            <span className="italic" style={{ color: '#C2A269', fontWeight: 400 }}>legitimate</span>{' '}
            and which must be cleared.
          </h2>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-3" aria-hidden />
            <div className="md:col-span-9 max-w-measure space-y-5 text-lg leading-relaxed text-paper/90">
              <p>
                When a render becomes the standard a community must conform to or be displaced from,
                the render is doing political work. The objection is not to towers. The objection is to
                towers being used as the justification for{' '}
                <span style={{ color: '#C2A269' }} className="font-semibold">who gets to stay.</span>
              </p>
              <p>
                The original post used the word <span className="italic">“pathetic”</span> to describe
                the fishers selling their catch beside a road that was cut through their own
                settlement. The word reveals the operation. Not <span className="italic">“the drainage is failing.”</span>{' '}
                Not <span className="italic">“the corporation has not done its job.”</span>{' '}
                <span style={{ color: '#C2A269' }} className="font-semibold">
                  The people themselves are pathetic for refusing to disappear into the render.
                </span>
              </p>
              <p>
                This is the substitution. Governance failure → aesthetic disgust → displacement. The
                infographic is the polite version of the same move.
              </p>
              <p className="serif italic text-2xl text-paper" style={{ textWrap: 'balance' as any }}>
                Build up where it fits. Build well where it doesn’t. Build the drainage either way. And
                leave the kuppam alone — it is older than the city, and it knows what it is doing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* §07 — Sources */}
      <section className="rule">
        <div className="max-w-page mx-auto px-6 lg:px-10 py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <aside className="md:col-span-3">
              <div className="eyebrow text-flag-gold">§ 07 · Twelve citations</div>
              <h3 className="serif text-2xl text-ink mt-2 leading-tight">Sources &amp; further reading</h3>
            </aside>
            <ol className="md:col-span-9 max-w-measure list-none">
              {sources.map((s, i) => (
                <li key={i} className="grid grid-cols-[2.5rem_1fr] gap-4 py-4 border-b border-dotted border-hairline last:border-b-0">
                  <span className="mono text-xs text-flag-gold font-medium pt-1">{String(i + 1).padStart(2, '0')}</span>
                  <div className="text-sm leading-relaxed">
                    {s.authors && <span className="text-ink font-medium">{s.authors} </span>}
                    <span className="text-ink">{s.title}</span>{' '}
                    {s.cite && <span className="serif italic text-muted">{s.cite}</span>}
                    {s.note && <span className="text-muted"> {s.note}</span>}
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-14 pt-8 rule flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs mono text-muted">
            <span>© 2026 Null Field Research · Chennai · Tamil Nadu · India</span>
            <Link to="/writing" className="link mono">← More essays</Link>
          </div>
        </div>
      </section>
    </article>
  );
};

export default TheVerticalLie;

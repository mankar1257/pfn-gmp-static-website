import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import ParallaxImage from '../components/ParallaxImage';
import SectionNav from '../components/SectionNav';
import { scrollToEl } from '../lib/smooth-scroll';
import LiveTelemetry from '../components/LiveTelemetry';

/**
 * Project DEOX — flagship system page.
 *
 * Every claim is traceable to the DEOX briefing deck; status labels
 * (simulation / pre-silicon) are exact and appear at every
 * occurrence. Market sizing, team detail and named client stacks are
 * deliberately not published here.
 */

const FADE_UP: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

/* ───────────────────────── Data ───────────────────────── */

const HERO_STATS = [
  {
    figure: '1.37×',
    accent: true,
    body: 'arithmetic overhead per certified inference',
    tag: '[ ours · simulation · pre-silicon ]',
  },
  {
    figure: '211,757',
    body: 'adversarial runs against the certificate system',
    tag: '[ pre-registered pass conditions ]',
  },
  {
    figure: '0',
    body: 'escapes, wrong certifications or mismatches',
    tag: '[ losses published, boundaries numbered ]',
  },
];

const HARDENING_LIMITS = [
  {
    title: 'No hardened part runs modern AI',
    body: 'No rad-hard-by-design part runs modern AI; ESA\'s Myriad flights are screened commercial silicon — exactly the class DEOX certifies. Decision-making has moved to silicon that cannot be hardened, and cannot always be imported.',
  },
  {
    title: 'Hardened parts still upset',
    body: 'Lower rates, never zero — and no one checks their answers either. Reduction is not certainty.',
  },
  {
    title: 'Beam tests qualify parts, not answers',
    body: 'Campaigns sample conditions statistically. They cannot certify what any single answer was, in flight, that day.',
  },
];

const FORCING_FUNCTIONS = [
  { when: '2023–24', what: 'ESA now mandates built-in tests on every future flight of its Myriad AI processor — imposed after its very first AI satellite.' },
  { when: 'Nov 2024', what: 'The first ECSS machine-learning handbook (ECSS-E-HB-40-02A) begins formalising how onboard AI gets qualified in Europe.' },
  { when: '2025', what: 'The US opens voluntary commercial mission oversight (Office of Space Commerce).' },
  { when: 'Dec 2025', what: 'SDA Tranche 3: $3.5B in awards mandating onboard processing. The assurance clause is still unwritten.' },
];

const WHY_NOW_FIGURES = [
  { figure: '100,000+', body: 'orbital inferences already run by a single operator' },
  { figure: '99.7%', body: "demonstrated onboard data reduction — onboard AI's saving, not ours" },
  { figure: 'Mar 2026', body: 'a commercial fleet runs GPU inference in orbit' },
];

const MATRIX_COLUMNS = ['Rad-hard board', 'TMR — 3× COTS', 'Do nothing', 'zkML proofs', 'DEOX'];

type MatrixCell = { ok: boolean; note?: string };
const MATRIX_ROWS: { requirement: string; cells: MatrixCell[] }[] = [
  {
    requirement: 'Can run modern AI onboard',
    cells: [
      { ok: false, note: 'cannot run inference' },
      { ok: true },
      { ok: true },
      { ok: false, note: 'unusable on-orbit' },
      { ok: true },
    ],
  },
  {
    requirement: 'Fits a satellite power budget',
    cells: [
      { ok: true },
      { ok: false, note: '3× by construction' },
      { ok: true },
      { ok: false, note: '10³–10⁶× proving cost' },
      { ok: true, note: '1.37× arithmetic — ours, simulation, pre-silicon' },
    ],
  },
  {
    requirement: 'Emits per-answer, machine-checkable evidence',
    cells: [
      { ok: false, note: 'no check on answers' },
      { ok: false, note: 'a voter masks; certifies nothing' },
      { ok: false },
      { ok: true, note: 'proof against adversaries — a different threat model' },
      { ok: true, note: 'fault-soundness — the space threat model' },
    ],
  },
  {
    requirement: 'Ready for the assurance clause — auditable, per decision',
    cells: [
      { ok: false },
      { ok: false },
      { ok: false },
      { ok: false, note: 'fails the two rows above' },
      { ok: true, note: 'the certificate is the audit artifact' },
    ],
  },
];

const SCOREBOARD = [
  { campaign: '200,000 single faults injected', result: 'escapes' },
  { campaign: '10,800 double-fault repairs forced', result: 'wrong certifications' },
  { campaign: '957 hardware conformance tests', result: 'mismatches' },
];

const MOAT = [
  { n: '1', title: 'The mathematics', body: 'Years of number-theory research that converged into certificates — a foundation, not a feature. It cannot be bolted on.' },
  { n: '2', title: 'The evidence', body: '211,757 pre-registered adversarial runs with published losses. Discipline cannot be retrofitted.' },
  { n: '3', title: 'The timing', body: 'The rules are being written now, and the referenced format wins. That does not repeat.' },
  { n: '4', title: 'The proof culture', body: 'A company that certifies answers must itself be checkable. Boundaries numbered, losses published, filings in process.' },
];

const RESEARCH_LINES = [
  { title: 'PFN — the exact arithmetic engine', body: 'Constant memory at any magnitude, results exact to the last digit, measured against GMP 6.3.0.', status: 'MEASURED · FILINGS IN PROCESS', accent: true },
  { title: 'Gradient-free learning', body: 'A learning algorithm that does not depend on gradients.', status: 'MANUSCRIPT COMPLETE · SUBMISSION PENDING' },
  { title: 'Urban predictive infrastructure', body: 'Prediction at state scale, applied.', status: 'POC COMPLETED — STATE-GOVERNMENT IT CELL' },
  { title: 'Integer-native AI · cryptography', body: 'Inference without floating point, and the cryptographic tooling around it.', status: 'RESEARCH LINE' },
];



const SECTIONS = [
  { id: 'threat', label: 'Threat' },
  { id: 'why-now', label: 'Why now' },
  { id: 'necessity', label: 'Necessity' },
  { id: 'integration', label: 'Integration' },
  { id: 'evidence', label: 'Evidence' },
  { id: 'position', label: 'Position' },
  { id: 'research', label: 'Research' },
  { id: 'partner', label: 'Partners' },
];

const INJECTION_MARKS = 500; // 500 marks × 400 = the 200,000 injected faults
const RUNS_PER_MARK = 400;

/* ───────────────────────── Sub-components ───────────────────────── */

/**
 * Fault console: the same classifier decision, unchecked and DEOX-compiled,
 * under a single-bit upset. Illustrative — it demonstrates the failure mode
 * and the check, and is not a measurement.
 */
const FaultConsole: React.FC = () => {
  const [struck, setStruck] = useState(false);

  const weights = struck ? (
    <span className="text-red-400"> 0x1F4A…C6 · 1 bit flipped</span>
  ) : (
    <span> 0x1F4A…C7 intact</span>
  );

  return (
    <div className="mt-14 border border-white/10 bg-black/50">
      <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-4 border-b border-white/10">
        <span className="font-mono text-[11px] text-white/60 tracking-[0.15em] uppercase">
          Fault console · single-bit upset in a classifier
          <span className="ml-3 text-white/40 normal-case tracking-wide">[ illustrative · not a measurement ]</span>
        </span>
        <button
          type="button"
          onClick={() => setStruck((s) => !s)}
          aria-pressed={struck}
          className="px-4 py-2 bg-emerald-500 text-black font-mono text-[11px] font-bold tracking-widest uppercase hover:bg-emerald-400 transition-colors"
        >
          {struck ? '↺ Reset memory' : '▸ Inject particle strike'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        <section className="p-6 md:border-r border-white/10">
          <h4 className="font-mono text-[11px] text-white/50 tracking-[0.15em] uppercase mb-4">
            Unchecked pipeline · onboard AI today
          </h4>
          <div className="font-mono text-xs leading-loose text-white/50">
            <div>tile_04812.raw → conv/relu/fc</div>
            <div>weights{weights}</div>
          </div>
          <div className="mt-5 pt-5 border-t border-white/10">
            <div className="font-mono text-[11px] text-white/50 tracking-[0.15em] uppercase">Answer downlinked</div>
            {struck ? (
              <>
                <p className="mt-2 text-2xl md:text-3xl font-medium text-red-400 leading-tight">DISCARD · clear sky</p>
                <p className="mt-2 text-sm text-red-400/80">
                  silently wrong · no fault raised, no log entry, no report
                </p>
              </>
            ) : (
              <>
                <p className="mt-2 text-2xl md:text-3xl font-medium text-white leading-tight">KEEP · target confirmed</p>
                <p className="mt-2 text-sm text-emerald-400/80">
                  correct — and indistinguishable from the case beside it
                </p>
              </>
            )}
          </div>
        </section>

        <section className="p-6 bg-emerald-950/10 border-t md:border-t-0 border-white/10">
          <h4 className="font-mono text-[11px] text-emerald-500 tracking-[0.15em] uppercase mb-4">
            Same silicon, compiled by DEOX
          </h4>
          <div className="font-mono text-xs leading-loose text-white/50">
            <div>tile_04812.raw → certified lowering</div>
            <div>weights{weights}</div>
          </div>
          <div className="mt-5 pt-5 border-t border-white/10">
            <div className="font-mono text-[11px] text-white/50 tracking-[0.15em] uppercase">Answer + certificate</div>
            {struck ? (
              <>
                <p className="mt-2 text-2xl md:text-3xl font-medium text-white leading-tight">DISCARD · clear sky</p>
                <p className="mt-2 font-mono text-xs text-red-400">
                  cert 0x9E…41 FAILED — arithmetic inconsistent
                </p>
                <p className="mt-2 text-sm text-white/70">
                  The answer is still wrong. The difference is that everyone knows: recompute, quarantine
                  or escalate — and the audit trail records it.
                </p>
              </>
            ) : (
              <>
                <p className="mt-2 text-2xl md:text-3xl font-medium text-white leading-tight">KEEP · target confirmed</p>
                <p className="mt-2 font-mono text-xs text-emerald-400">
                  cert 0x9E…41 VERIFIED — checks exact
                </p>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

/** Requirement × option matrix. Source: deck slide 10, cell for cell. */
const ComparisonMatrix: React.FC = () => (
  <div className="border border-white/10 overflow-x-auto">
    <table className="w-full min-w-[880px] border-collapse text-left">
      <thead>
        <tr>
          <th className="w-[24%] px-4 py-4 font-mono text-[11px] font-normal text-white/50 tracking-[0.12em] uppercase border-b border-white/20 align-bottom">
            Requirement
          </th>
          {MATRIX_COLUMNS.map((c) => {
            const isDeox = c === 'DEOX';
            return (
              <th
                key={c}
                className={`px-4 py-4 font-mono text-[11px] font-normal tracking-[0.12em] uppercase align-bottom ${
                  isDeox
                    ? 'text-emerald-400 bg-emerald-500/10 border-b border-t border-emerald-500'
                    : 'text-white/50 border-b border-white/20'
                }`}
              >
                {c}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {MATRIX_ROWS.map((row, ri) => (
          <tr key={row.requirement}>
            <th
              scope="row"
              className={`px-4 py-5 align-top text-sm font-normal text-white ${ri < MATRIX_ROWS.length - 1 ? 'border-b border-white/10' : ''}`}
            >
              {row.requirement}
            </th>
            {row.cells.map((cell, ci) => {
              const isDeox = ci === row.cells.length - 1;
              return (
                <td
                  key={ci}
                  className={`px-4 py-5 align-top ${ri < MATRIX_ROWS.length - 1 ? 'border-b border-white/10' : ''} ${isDeox ? 'bg-emerald-500/10' : ''}`}
                >
                  <span className={cell.ok ? 'text-emerald-400' : 'text-red-400/80'} aria-label={cell.ok ? 'meets' : 'fails'}>
                    {cell.ok ? '✓' : '✗'}
                  </span>
                  {cell.note && (
                    <div className={`mt-1.5 text-xs leading-relaxed ${isDeox ? 'text-emerald-100/60' : 'text-white/40'}`}>
                      {cell.note}
                    </div>
                  )}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/**
 * The fault-injection campaign, drawn. Every mark is a fault that was injected
 * and caught; the escape colour is defined in the legend and never used,
 * because zero escapes were recorded.
 */
const InjectionGrid: React.FC = () => (
  <figure className="m-0">
    <figcaption className="font-mono text-[11px] text-white/50 tracking-[0.15em] uppercase mb-4">
      Fault-injection campaign · one mark = {RUNS_PER_MARK} injected faults
    </figcaption>
    <div
      className="border border-white/10 bg-black/50 flex flex-wrap gap-[3px] p-4"
      role="img"
      aria-label={`${INJECTION_MARKS * RUNS_PER_MARK} injected faults, every one caught by the certificate; zero escapes`}
    >
      {Array.from({ length: INJECTION_MARKS }, (_, i) => (
        <span key={i} className="inline-block h-1.5 w-1.5 bg-emerald-600" />
      ))}
    </div>
    <div className="mt-3 flex flex-wrap gap-5 font-mono text-[11px] text-white/50">
      <span>
        <span className="mr-2 inline-block h-1.5 w-1.5 bg-emerald-600" />
        fault injected, caught by the certificate
      </span>
      <span>
        <span className="mr-2 inline-block h-1.5 w-1.5 bg-red-500" />
        escapes recorded: 0 — nothing to plot
      </span>
    </div>
  </figure>
);

/**
 * Trust quadrant: what a technology protects (the machine, or each answer)
 * against what threatens it (physical faults, or adversaries).
 * Source: deck slide 15, plus the 2026 commissioned adjacency scan.
 */
const TrustQuadrant: React.FC = () => (
  <figure className="m-0">
    <div className="grid" style={{ gridTemplateColumns: 'minmax(56px, 104px) 1fr 1fr' }}>
      <div />
      <div className="pb-3 text-center font-mono text-[11px] text-white/50 tracking-[0.12em] uppercase">Protect the machine</div>
      <div className="pb-3 text-center font-mono text-[11px] text-emerald-400 tracking-[0.12em] uppercase">Verify each answer</div>

      <div className="flex items-center justify-end pr-3 text-right font-mono text-[11px] text-white/50 tracking-[0.12em] uppercase">
        Physical
        <br />
        faults
      </div>
      <div className="min-h-[156px] border border-white/10 p-5">
        <div className="text-sm text-white">Scrub · TMR · rad-hard</div>
        <p className="mt-2 mb-0 text-xs leading-relaxed text-white/40">
          Protect, silently. The answer is never checked.
        </p>
      </div>
      <div className="flex min-h-[156px] flex-col justify-between border border-emerald-500 bg-emerald-500/10 p-5">
        <div>
          <div className="text-2xl font-medium text-emerald-400">DEOX</div>
          <p className="mt-2 mb-0 text-xs leading-relaxed text-emerald-100/70">
            Fault-soundness — per-answer, machine-checkable evidence.
          </p>
        </div>
        <div className="mt-3 font-mono text-[11px] text-emerald-500 tracking-[0.12em] uppercase">No shipped product found — our 2026 scan</div>
      </div>

      <div className="flex items-center justify-end pr-3 text-right font-mono text-[11px] text-white/50 tracking-[0.12em] uppercase">Adversaries</div>
      <div className="min-h-[156px] border border-t-0 border-white/10 p-5">
        <div className="text-sm text-white">TEEs</div>
        <p className="mt-2 mb-0 text-xs leading-relaxed text-white/40">
          Prove who computed, not what was computed.
        </p>
      </div>
      <div className="min-h-[156px] border border-t-0 border-white/10 p-5">
        <div className="text-sm text-white">zkML</div>
        <p className="mt-2 mb-0 text-xs leading-relaxed text-white/40">
          The right proof at an impossible cost for orbit — 10³–10⁶×.
        </p>
      </div>
    </div>
    <figcaption className="mt-4 font-mono text-[11px] text-white/40 leading-relaxed">
      Our own commissioned 2026 adjacency scan — no shipped product found in this quadrant. Re-tested continuously, published either way.
    </figcaption>
  </figure>
);

/* ───────────────────────── Page ───────────────────────── */

const Deox: React.FC = () => {
  return (
    <div className="min-h-screen text-white selection:bg-emerald-500 selection:text-black">

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-12 overflow-hidden border-b border-emerald-900/30">
        {/* Background Image & Overlays */}
        <div className="absolute inset-0 z-0">
          <ParallaxImage src="/assets/hero-satellite.jpg" mode="hero" className="opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/50 to-black/60"></div>
          <div className="absolute top-1/4 left-3/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial="initial"
            animate="animate"
            transition={{ staggerChildren: 0.15 }}
          >
            <div className="max-w-4xl">
              <motion.div variants={FADE_UP} className="flex items-center gap-4 mb-8">
                <div className="h-[1px] w-12 bg-emerald-500"></div>
                <span className="eyebrow text-emerald-500">Flagship system · Project DEOX</span>
              </motion.div>

              <motion.h1 variants={FADE_UP} className="display text-5xl md:text-7xl lg:text-[5.5rem] text-white">
                Certified compute execution in <span className="text-emerald-400">orbit.</span>
              </motion.h1>

              <motion.p variants={FADE_UP} className="mt-8 text-xl text-emerald-100/60 max-w-2xl leading-relaxed font-light">
                Radiation rarely crashes a spacecraft computer — it changes its answers, quietly.
                DEOX compiles a model so every inference ships with a per-answer,
                machine-checkable certificate of correctness.
              </motion.p>

              <motion.div variants={FADE_UP} className="mt-12 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
                <button
                  type="button"
                  onClick={() => scrollToEl('#integration')}
                  className="group flex items-center justify-center px-8 py-4 bg-emerald-500 text-black text-sm font-bold tracking-wide uppercase hover:bg-emerald-400 transition-all"
                >
                  How It Integrates
                  <svg className="ml-2 w-4 h-4 group-hover:translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => scrollToEl('#partner')}
                  className="px-8 py-4 bg-transparent border border-emerald-500/40 text-emerald-100 text-sm font-bold tracking-wide uppercase hover:bg-emerald-500/10 transition-all"
                >
                  Design Partners
                </button>
              </motion.div>
            </div>

            {/* Hero stat strip — every figure carries its status */}
            <motion.dl variants={FADE_UP} className="mt-16 grid grid-cols-1 sm:grid-cols-3 border-t border-white/10">
              {HERO_STATS.map((s, i) => (
                <div key={s.figure} className={`py-6 pr-6 ${i > 0 ? 'sm:pl-6 sm:border-l border-white/10' : ''}`}>
                  <dt className={`font-mono text-4xl ${s.accent ? 'text-emerald-400' : 'text-white'}`}>{s.figure}</dt>
                  <dd className="m-0 mt-3 text-sm text-emerald-100/60 leading-snug">
                    {s.body}
                    <br />
                    <span className="font-mono text-[10px] text-white/40 tracking-wide">{s.tag}</span>
                  </dd>
                </div>
              ))}
            </motion.dl>
          </motion.div>
        </div>
      </section>

      <SectionNav items={SECTIONS} ariaLabel="DEOX sections" />

      {/* §1 The Threat */}
      <section id="threat" className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-32 border-b border-emerald-900/30">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="eyebrow mb-6 text-emerald-500">§1 · The Threat Vector
            </div>
            <h2 className="display text-4xl md:text-5xl text-white mb-8">
              The most expensive wrong answer is the one that looks right.
            </h2>
            <div className="space-y-6 text-lg text-emerald-100/60 font-light leading-relaxed">
              <p>
                A charged particle passing through commercial silicon does not have to crash anything.
                It can flip a single bit in a model's weights and leave every subsystem reporting
                nominal — <span className="text-white font-medium">while the inference quietly changes.</span>
              </p>
              <p>
                Crashes get investigated. Corrupted answers get downlinked, actioned, and archived
                as if they were correct. That asymmetry is the threat DEOX exists to close.
              </p>
            </div>
          </div>
          <div className="relative aspect-square md:aspect-video lg:aspect-square">
            <div className="absolute inset-0 bg-emerald-900/20 border border-emerald-500/20 p-2">
              <div className="relative w-full h-full overflow-hidden"><ParallaxImage src="/assets/circuit-schematic.jpg" className="opacity-60" /></div>
              {/* Overlay UI elements */}
              <div className="absolute top-6 left-6 font-mono text-emerald-500 text-xs tracking-widest bg-black/80 px-3 py-1 border border-emerald-500/30">FIG. 01 · SINGLE-EVENT UPSET</div>
              <div className="absolute bottom-6 right-6 font-mono text-emerald-500/50 text-xs">ILLUSTRATION · NOT A MEASUREMENT</div>
            </div>
          </div>
        </div>

        {/* The two failure classes */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="border-t border-red-400/40 pt-6">
            <h3 className="font-mono text-[11px] text-red-400 tracking-[0.15em] uppercase">The failure you could see</h3>
            <p className="mt-4 text-white/70 leading-relaxed">
              Phobos-Grunt, 2011. Russia's flagship Mars mission died in orbit before it left Earth. The
              official inquiry concluded that heavy charged particles struck the onboard computer's memory;
              both processing channels restarted; the spacecraft never recovered. The attribution is still
              debated in the radiation-effects community — the loss is not.
            </p>
            <p className="serif mt-4 text-xl md:text-2xl text-white leading-snug">
              One particle interaction, officially — and a decade of work was over.
            </p>
          </div>
          <div className="border-t border-emerald-500/40 pt-6">
            <h3 className="font-mono text-[11px] text-emerald-500 tracking-[0.15em] uppercase">The failures no inquiry ever sees</h3>
            <p className="mt-4 text-white/70 leading-relaxed">
              A bit flips. Nothing crashes. The model simply gives a different answer — <em>keep</em> becomes{' '}
              <em>discard</em>, <em>threat</em> becomes <em>clear sky</em>. No crash. No log. No report. Nobody
              will ever know the answer was wrong.
            </p>
            <p className="serif mt-4 text-xl md:text-2xl text-white leading-snug">
              72 satellites will process tracking data onboard to close kill chains, autonomously (SDA tracking tranche).
            </p>
          </div>
        </div>

        {/* Live orbital environment — open-source telemetry */}
        <LiveTelemetry />

        {/* Interactive fault console */}
        <FaultConsole />

        {/* Why hardening cannot close this */}
        <div className="mt-20">
          <h3 className="font-mono text-[11px] text-white/50 tracking-[0.15em] uppercase pb-4 border-b border-white/10">
            Why radiation hardening alone cannot close this
          </h3>
          <ol className="m-0 list-none p-0">
            {HARDENING_LIMITS.map((l, i) => (
              <li key={l.title} className="grid gap-4 py-6 border-b border-white/10" style={{ gridTemplateColumns: '48px 1fr' }}>
                <span className="font-mono text-emerald-500 text-sm">{`0${i + 1}`}</span>
                <div>
                  <h4 className="m-0 text-xl text-white font-medium">{l.title}</h4>
                  <p className="mt-2 mb-0 text-emerald-100/60 font-light leading-relaxed">{l.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="serif mt-8 text-2xl md:text-3xl text-white leading-snug max-w-3xl">
            A silently wrong answer looks exactly like a right one — until the mission pays for it.
          </p>
          <p className="mt-4 font-mono text-[11px] text-white/40 leading-relaxed">
            Open sources — Phobos-Grunt: official inquiry conclusion, 2012 · CFESat on-orbit upset rates, IEEE
            Aerospace 2009 · SDA Tranche 3 awards, Dec 2025.
          </p>
        </div>
      </section>

      {/* §2 Why now */}
      <section id="why-now" className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-32 border-b border-emerald-900/30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <div className="eyebrow mb-6 text-emerald-500">§2 · Why Now
            </div>
            <h2 className="display text-4xl md:text-5xl text-white">
              Regulation is moving first.
            </h2>
            <p className="mt-6 text-emerald-100/60 font-light leading-relaxed">
              Requirements for onboard AI assurance are forming now. No product exists to satisfy them.
            </p>
          </div>
          <div className="lg:col-span-8">
            <ol className="m-0 list-none p-0 border-t border-white/10">
              {FORCING_FUNCTIONS.map((f) => (
                <li key={f.when} className="grid gap-4 py-5 border-b border-white/10" style={{ gridTemplateColumns: '96px 1fr' }}>
                  <span className="font-mono text-emerald-500 text-xs pt-1">{f.when}</span>
                  <span className="text-white/70 leading-relaxed">{f.what}</span>
                </li>
              ))}
            </ol>
            <dl className="mt-10 mb-0 grid grid-cols-1 sm:grid-cols-3 gap-8">
              {WHY_NOW_FIGURES.map((f) => (
                <div key={f.figure}>
                  <dt className="font-mono text-2xl text-emerald-400">{f.figure}</dt>
                  <dd className="m-0 mt-2 text-sm text-emerald-100/60 leading-snug">{f.body}</dd>
                </div>
              ))}
            </dl>
            <details className="mt-10 pt-4 border-t border-white/10 group">
              <summary className="font-mono text-[11px] text-white/50 tracking-wide cursor-pointer hover:text-white/80 transition-colors">
                + the same problem, already mainstream on the ground
              </summary>
              <p className="mt-4 mb-0 text-emerald-100/60 font-light leading-relaxed max-w-2xl">
                Silent silicon errors are an acknowledged industry problem: roughly one machine in a thousand
                affected (Meta), silent-corruption events every week or two in large AI training runs (Google), and
                an industry workstream co-founded by seven of the largest silicon and cloud companies. Datacentres
                respond by replaying failed work. A satellite cannot replay.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* §3 The necessity — comparison matrix */}
      <section id="necessity" className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-32 border-b border-emerald-900/30">
        <div className="mb-16 max-w-3xl">
          <div className="eyebrow mb-6 text-emerald-500">§3 · The Necessity
          </div>
          <h2 className="display text-4xl md:text-5xl text-white mb-6">
            Four requirements. Every existing option fails at least one.
          </h2>
          <p className="text-emerald-100/60 text-lg font-light leading-relaxed">
            These options differ in kind — a board, an architecture, a posture, a cryptosystem. We do not compare
            their prices; we test them against what the mission requires.
          </p>
        </div>

        <p className="md:hidden mb-3 font-mono text-[10px] text-white/40 tracking-[0.15em] uppercase" aria-hidden="true">← swipe to compare →</p>
        <ComparisonMatrix />

        <div className="mt-12 max-w-3xl">
          <p className="serif text-2xl md:text-3xl text-white leading-snug">
            Rad-hard keeps the computer alive; we keep the answers honest. Missions need both.
          </p>
          <details className="mt-8 pt-4 border-t border-white/10">
            <summary className="font-mono text-[11px] text-white/50 tracking-wide cursor-pointer hover:text-white/80 transition-colors">
              + why haven't NVIDIA or AMD shipped this?
            </summary>
            <p className="mt-4 mb-0 text-emerald-100/60 font-light leading-relaxed max-w-2xl">
              Their own labs published the mathematics — NVIDIA's ABFT-for-CNNs research among it. But their
              datacentre buyers simply replay failed work, and the edge cannot. They sell the silicon; we
              certify its answers. Rails, not rivals.
            </p>
          </details>
          <p className="mt-6 font-mono text-[11px] text-white/40 leading-relaxed">
            Open sources — DoDD 3000.09 · Regulation (EU) 2024/1689 Art. 15 · ESA Φ-sat BIST mandate · ESA FTMR
            report · zkML literature · NVIDIA ABFT-for-CNNs research.
          </p>
        </div>
      </section>

      {/* §4 Integration & Hardware Section */}
      <section id="integration" className="relative z-10 bg-emerald-950/10 border-b border-emerald-900/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-32">
          <div className="mb-16 max-w-3xl">
            <div className="eyebrow mb-6 text-emerald-500">§4 · The Signal Path
            </div>
            <h2 className="display text-4xl md:text-5xl text-white mb-6">Integrates where your models already live.</h2>
            <p className="text-emerald-100/60 text-lg font-light leading-relaxed">
              Trained exactly as today — no retraining, no model surgery. DEOX FT Compiler handles fault-tolerant lowering, automatic certificate insertion, and generates a machine-readable coverage map of what is protected.
            </p>
          </div>

          {/* Compiler flow strip */}
          <div className="mb-16 flex flex-col md:flex-row items-stretch gap-0">
            <div className="flex-1 border border-white/10 bg-black p-6">
              <p className="m-0 font-mono text-[11px] text-white/50 tracking-[0.15em] uppercase">01 · your models, unchanged</p>
              <p className="mt-3 mb-0 text-xl text-white font-medium leading-tight">PyTorch · TensorFlow → ONNX export</p>
              <p className="mt-2 mb-0 text-sm text-emerald-100/50">Trained exactly as today.</p>
            </div>
            <div className="relative flex md:flex-[0_0_44px] items-center justify-center py-2 md:py-0" aria-hidden="true">
              <span className="hidden md:block h-px w-full bg-white/20" />
              <span className="md:hidden w-px h-6 bg-white/20" />
            </div>
            <div className="flex-1 border border-emerald-500 bg-emerald-500/10 p-6">
              <p className="m-0 font-mono text-[11px] text-emerald-400 tracking-[0.15em] uppercase">02 · deox ft compiler</p>
              <p className="mt-3 mb-0 text-xl text-white font-medium leading-tight">Fault-tolerant lowering · automatic certificate insertion</p>
              <p className="mt-2 mb-0 text-sm text-emerald-100/60">Emits a machine-readable coverage map of exactly what is protected.</p>
            </div>
            <div className="relative flex md:flex-[0_0_44px] items-center justify-center py-2 md:py-0" aria-hidden="true">
              <span className="hidden md:block h-px w-full bg-white/20" />
              <span className="md:hidden w-px h-6 bg-white/20" />
            </div>
            <div className="flex-1 border border-white/10 bg-black p-6">
              <p className="m-0 font-mono text-[11px] text-white/50 tracking-[0.15em] uppercase">03 · every answer ships with</p>
              <p className="mt-3 mb-0 text-xl text-white font-medium leading-tight">Inference + certificate</p>
              <p className="mt-2 mb-0 text-sm text-emerald-100/50">Per answer, machine-checkable — beside the engine in orbit, or on the ground in milliseconds. FDIR response policy stays with the host.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* FPGA Target */}
            <div className="group relative border border-emerald-500/20 bg-black p-8 hover:border-emerald-500/50 transition-all duration-300">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-emerald-500"><path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm2 2h8v8H8V8zm2 2v4h4v-4h-4z" fill="currentColor"/></svg>
              </div>
              <div className="mb-8 overflow-hidden border border-emerald-900/50 h-48 relative">
                <div className="absolute inset-0 bg-emerald-500/10 mix-blend-overlay z-10"></div>
                <img src="/assets/chip-macro.jpg" alt="Circuit-board macro photograph (illustrative)" loading="lazy" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="font-mono text-emerald-500 text-xs mb-3">BEACHHEAD // TODAY</div>
              <h3 className="text-2xl text-white font-medium mb-4">FPGA — Zynq-class COTS</h3>
              <p className="text-emerald-100/50 font-light leading-relaxed">
                Reference implementation running at 1.37× arithmetic overhead{' '}
                <span className="font-mono text-[10px] text-white/40">[ ours · simulation · pre-silicon ]</span>.
                Fits the FPGA-first design flows aerospace primes already use for mission-critical edge deployments.
              </p>
            </div>

            {/* GPU Target */}
            <div className="group relative border border-emerald-500/20 bg-black p-8 hover:border-emerald-500/50 transition-all duration-300">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-emerald-500"><path d="M2 4h20v16H2V4zm2 2v12h16V6H4zm2 2h12v8H6V8zm2 2v4h8v-4H8z" fill="currentColor"/></svg>
              </div>
              <div className="mb-8 overflow-hidden border border-emerald-900/50 h-48 relative bg-black">
                <div className="absolute inset-0 bg-emerald-500/10 mix-blend-overlay z-10"></div>
                <img src="/assets/gpu-module.jpg" alt="Edge GPU hardware photograph (illustrative)" loading="lazy" className="w-full h-full object-cover object-[70%_20%] grayscale opacity-60 group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="font-mono text-emerald-600 text-xs mb-3">NEXT // SDK</div>
              <h3 className="text-2xl text-white font-medium mb-4">GPU — Jetson Orin class</h3>
              <p className="text-emerald-100/50 font-light leading-relaxed">
                Verifier runs beside the engine, issuing a certificate per inference. Designed for the TensorRT world and the fleet majority of modern edge-compute orbital platforms. We publish this path's overhead when it is measured; we do not estimate it.
              </p>
            </div>
          </div>

          {/* VPU + certificate format */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-white/10 bg-black/50 p-8">
              <div className="font-mono text-white/40 text-xs mb-3">ONE CERTIFICATE FORMAT</div>
              <h3 className="text-xl text-white font-medium mb-3">Every target, one artifact</h3>
              <p className="text-emerald-100/50 font-light text-sm leading-relaxed">
                The audit artifact does not change when the silicon does. It is designed as review
                evidence for ECSS-E-HB-40-02A qualification arguments and DoDD 3000.09 review packages.
              </p>
            </div>
            <div className="border border-white/10 bg-black/50 p-8">
              <div className="font-mono text-white/40 text-xs mb-3">ONE COMPILER RELATIONSHIP</div>
              <h3 className="text-xl text-white font-medium mb-3">Fleets inherit certification</h3>
              <p className="text-emerald-100/50 font-light text-sm leading-relaxed">
                Every device generation a fleet adopts inherits certified inference.
              </p>
            </div>
          </div>
          <p className="mt-8 font-mono text-[11px] text-white/40">
            Status labels are exact — built · designed. Front-end: PyTorch and TensorFlow via ONNX.
            Verifier sits on the payload data chain (LVDS / SpaceWire); end-to-end latency target
            &lt;15 ms [ design goal ].
          </p>
        </div>
      </section>

      {/* §5 Evidence Matrix */}
      <section id="evidence" className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-32 border-b border-emerald-900/30">
        <div className="text-center mb-20">
          <div className="eyebrow text-emerald-500 mb-6">§5 · The Evidence Ledger</div>
          <h2 className="display text-4xl md:text-5xl text-white">We tried to break it 211,757 times.</h2>
          <p className="mt-6 text-lg text-emerald-100/60 max-w-2xl mx-auto font-light">
            Every campaign pre-registered — pass conditions written before the results existed. Here is the score.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SCOREBOARD.map((s) => (
            <div key={s.campaign} className="border border-emerald-500/20 bg-black/50 p-10 text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-emerald-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              <div className="font-mono text-emerald-500/70 text-xs mb-8 tracking-widest uppercase">{s.campaign}</div>
              <div className="text-7xl font-light text-white mb-6 font-mono">0</div>
              <div className="h-[1px] w-12 bg-emerald-500 mx-auto mb-6"></div>
              <div className="text-emerald-100/50 text-sm">{s.result}</div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center font-mono text-[11px] text-white/40">
          [ all three: ours · simulation · pre-silicon — the first hardware campaign turns these into silicon numbers ]
        </p>

        {/* The campaign, drawn */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <InjectionGrid />
          <div>
            <p className="serif text-2xl md:text-3xl text-white leading-snug">
              We don't promise faults won't happen — that's physics.{' '}
              <span className="text-emerald-400 font-medium">We promise they can't hide.</span>
            </p>
            <p className="mt-6 text-emerald-100/60 font-light leading-relaxed">
              Every boundary has a number. Some limits exist by design; all of them are tested, measured and
              published in the data room. Nothing waits to be discovered.
            </p>
          </div>
        </div>
      </section>

      {/* §6 The position */}
      <section id="position" className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-32 border-b border-emerald-900/30">
        <div className="mb-16 max-w-3xl">
          <div className="eyebrow mb-6 text-emerald-500">§6 · The Position
          </div>
          <h2 className="display text-4xl md:text-5xl text-white mb-6">
            What it would take to stand where we stand.
          </h2>
          <p className="text-emerald-100/60 text-lg font-light leading-relaxed">
            Existing technologies either protect the machine or prove things to an adversary. Verifying each
            answer against physical faults is a different quadrant — and on our own commissioned 2026 adjacency
            scan, it is still empty.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <TrustQuadrant />
          </div>
          <div className="lg:col-span-5">
            <h3 className="font-mono text-[11px] text-white/50 tracking-[0.15em] uppercase pb-4 border-b border-white/10">
              Why this took years to build — four requirements, all at once
            </h3>
            <ol className="m-0 list-none p-0">
              {MOAT.map((m) => (
                <li key={m.n} className="grid gap-3 py-5 border-b border-white/10" style={{ gridTemplateColumns: '30px 1fr' }}>
                  <span className="font-mono text-emerald-500 text-xs pt-0.5">{m.n}</span>
                  <div>
                    <h4 className="m-0 text-base text-white font-medium">{m.title}</h4>
                    <p className="mt-1.5 mb-0 text-sm text-emerald-100/60 font-light leading-relaxed">{m.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* §7 Why Null Field */}
      <section id="research" className="relative z-10 bg-emerald-950/10 border-b border-emerald-900/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <div className="eyebrow mb-6 text-emerald-500">§7 · Why Null Field
              </div>
              <h2 className="display text-4xl md:text-5xl text-white">
                Four research lines converge on one product.
              </h2>
            </div>
            <div className="lg:col-span-8">
              <p className="text-white/70 text-lg font-light leading-relaxed">
                We did not set out to build this. Four independent lines of work kept arriving at the same
                requirement — arithmetic you can prove. DEOX is where they meet.
              </p>
              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-10 border-t border-white/10">
                {RESEARCH_LINES.map((r) => (
                  <div key={r.title} className="py-6 border-b border-white/10">
                    <h3 className="m-0 text-base text-white font-medium">{r.title}</h3>
                    <p className="mt-1.5 mb-0 text-sm text-emerald-100/60 font-light leading-relaxed">{r.body}</p>
                    <p className={`mt-3 mb-0 font-mono text-[10px] tracking-wide ${r.accent ? 'text-emerald-500' : 'text-white/40'}`}>
                      {r.status}
                    </p>
                  </div>
                ))}
              </div>
              <p className="serif mt-10 text-2xl md:text-3xl text-white leading-snug">
                PFN makes exact arithmetic fast. DEOX makes fast arithmetic certified.{' '}
                <span className="text-emerald-400">One mathematics, two products.</span>
              </p>
              <div className="mt-8 flex flex-wrap gap-8 font-mono text-xs">
                <Link to="/pfn" className="text-emerald-400 hover:text-emerald-300 transition-colors">PFN architecture and benchmarks →</Link>
                <Link to="/writing" className="text-emerald-400 hover:text-emerald-300 transition-colors">Research writing →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Close — design partners */}
      <section id="partner" className="relative z-10 overflow-hidden">
        <ParallaxImage src="/assets/blue-marble.jpg" position="center right -8rem" className="opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/30" aria-hidden="true"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" aria-hidden="true"></div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-end">
            <div className="lg:col-span-8">
              <div className="eyebrow text-emerald-500 mb-6">Design Partners · 2026</div>
              <p className="display text-4xl md:text-5xl text-white">
                Everyone else asks you to trust the answer.{' '}
                <span className="text-emerald-400">We hand you the proof.</span>
              </p>
              <p className="mt-8 text-lg text-emerald-100/60 font-light leading-relaxed max-w-2xl">
                We are selecting a small number of design partners — FPGA-first payload builders and GPU-class
                fleet operators — to set the order in which DEOX is built. Partners get the reference
                implementation, the coverage map, and the evidence ledger behind every number on this page.
              </p>
              <p className="mt-4 font-mono text-[11px] text-white/40 leading-relaxed max-w-2xl">
                The full data room — campaign definitions, pass conditions, and published losses — is available
                under NDA via partnership@null-field.com.
              </p>
              <div className="mt-10 flex flex-wrap gap-6">
                <a
                  href="mailto:partnership@null-field.com?subject=DEOX%20design%20partner%20enquiry"
                  className="px-8 py-4 bg-emerald-500 text-black text-sm font-bold tracking-wide uppercase hover:bg-emerald-400 transition-all"
                >
                  Design-partner enquiry →
                </a>
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-transparent border border-emerald-500/40 text-emerald-100 text-sm font-bold tracking-wide uppercase hover:bg-emerald-500/10 transition-all"
                >
                  Technical conversation
                </Link>
              </div>
            </div>
            <div className="lg:col-span-4">
              <p className="m-0 font-mono text-[11px] text-white/40 leading-relaxed">
                Project DEOX · certified compute execution
                <br />
                Per-answer proof at 1.37× arithmetic
                <br />
                [ ours · simulation · pre-silicon ]
                <br />
                Null Field Research · {new Date().getFullYear()}
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Deox;

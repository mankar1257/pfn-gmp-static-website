import React from 'react';
import { Link } from 'react-router-dom';
import DeoxStyles from '../components/deox/DeoxStyles';
import OrbitPanel from '../components/deox/OrbitPanel';
import FaultConsole from '../components/deox/FaultConsole';
import InjectionGrid from '../components/deox/InjectionGrid';
import ComparisonMatrix from '../components/deox/ComparisonMatrix';
import TrustQuadrant from '../components/deox/TrustQuadrant';

/**
 * Project DEOX — flagship project page.
 *
 * Every claim on this page is traceable to the DEOX briefing deck; status
 * labels (simulation / pre-silicon / roadmap) are exact and appear at every
 * occurrence. Market sizing, team detail and named client stacks are
 * deliberately not published here.
 */

const HERO_STATS = [
  {
    figure: '1.37×',
    gold: true,
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
    body: 'There is no rad-hard GPU or NPU. Decision-making has moved to silicon that cannot be hardened — and cannot always be imported.',
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
  { when: '2025', what: 'The US Office of Space Commerce opens voluntary mission certification.' },
  { when: 'Dec 2025', what: '$3.5B in defence autonomy awards mandate onboard processing. The assurance clause is still unwritten.' },
];

const WHY_NOW_FIGURES = [
  { figure: '100,000+', body: 'orbital inferences already run by a single operator' },
  { figure: '99.7%', body: "demonstrated onboard data reduction — onboard AI's saving, not ours" },
  { figure: 'Mar 2026', body: 'a commercial fleet runs GPU inference in orbit' },
];

const TARGETS = [
  {
    tag: 'TODAY · BEACHHEAD',
    gold: true,
    title: 'FPGA — Zynq-class COTS',
    body: 'Reference implementation running at 1.37× arithmetic overhead [ ours · simulation · pre-silicon ]. Fits the FPGA-first design flows defence primes already use.',
  },
  {
    tag: 'NEXT · SDK',
    title: 'GPU — Jetson Orin class',
    body: 'The verifier runs beside the inference engine, one certificate per inference — the fleet majority. We publish this path’s overhead when it is measured; we do not estimate it.',
  },
  {
    tag: 'ROADMAP',
    title: 'VPU — Myriad class',
    body: 'Same front-end, same certificate format — sequenced after the SDK.',
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
  { title: 'PFN — the exact arithmetic engine', body: 'Constant memory at any magnitude, results exact to the last digit, measured against GMP 6.3.0.', status: 'MEASURED · FILINGS IN PROCESS', gold: true },
  { title: 'Gradient-free learning', body: 'A learning algorithm that does not depend on gradients.', status: 'MANUSCRIPT COMPLETE · SUBMISSION PENDING' },
  { title: 'Urban predictive infrastructure', body: 'Prediction at state scale, applied.', status: 'POC COMPLETED — KARNATAKA GOVT IT CELL' },
  { title: 'Integer-native AI · cryptography', body: 'Inference without floating point, and the cryptographic tooling around it.', status: 'RESEARCH LINE' },
];

const ROADMAP = [
  { phase: 'Now · prove', gold: true, title: 'FPGA proof of concept', body: '211,757 adversarial runs in simulation, zero escapes. Next: the same zeros measured on real silicon.' },
  { phase: 'Next · partner-led', title: 'First design partners set the order', body: 'Core IP on FPGAs, or the SDK for GPU-class fleets — whichever lane a paying partner needs first. The certificate stays identical.' },
  { phase: 'Then · fly', title: 'Certificates from orbit', body: 'Shadow-mode flight heritage — certifying alongside a host mission at zero risk to it, downlinking proof from space itself.' },
  { phase: 'The goal · always', title: 'Fault-tolerant compute', body: 'Beyond AI: certified fusion, transforms, control laws — the mathematics that decides anything in orbit.' },
];

const Deox: React.FC = () => (
  <div className="dx-root">
    <DeoxStyles />

    {/* Hero */}
    <section className="dx-hair-b relative overflow-hidden">
      <div className="dx-grid-bg absolute inset-0 opacity-70" aria-hidden="true" />
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{ background: 'radial-gradient(120% 80% at 78% 18%, rgba(194,162,105,.12), transparent 60%)' }}
      />
      <div className="max-w-page relative mx-auto px-6 pt-16 lg:px-10">
        <div className="flex flex-wrap items-start gap-12">
          <div className="min-w-0 flex-[2_1_460px]">
            <p className="dx-kicker dx-kicker-gold m-0 flex items-center gap-2.5">
              <span className="dx-pulse inline-block h-1.5 w-1.5" style={{ background: 'var(--dx-gold)' }} />
              Flagship · Null Field Systems
            </p>
            <h1 className="dx-serif m-0 mt-5 text-[clamp(46px,9vw,104px)] leading-[.94]">DEOX</h1>
            <p className="dx-serif mt-3.5 mb-0 max-w-[24em] text-[clamp(23px,3.2vw,36px)] leading-[1.2]">
              Certified compute execution in orbit — beginning with AI inference.
            </p>
            <p className="dx-body mt-6 mb-0 max-w-[36rem]">
              Radiation rarely crashes a spacecraft computer. It changes its answers, quietly. DEOX compiles a
              model so every inference emits a per-answer, machine-checkable certificate: proof that the answer
              the satellite acted on is the answer the mathematics produced.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#partner" className="dx-btn dx-btn-gold">Design-partner enquiry →</a>
              <a href="#how" className="dx-btn dx-btn-ghost">Signal path</a>
            </div>
          </div>
          <div className="min-w-0 flex-[1_1_340px]">
            <OrbitPanel />
          </div>
        </div>

        <dl className="dx-hair-t mt-14 mb-0 grid gap-0" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          {HERO_STATS.map((s, i) => (
            <div key={s.figure} className={`${i < HERO_STATS.length - 1 ? 'dx-hair-r' : ''} px-6 py-6 first:pl-0 last:pr-0`}>
              <dt className={`dx-mono text-[36px] leading-none ${s.gold ? 'dx-gold-text' : ''}`}>{s.figure}</dt>
              <dd className="dx-body m-0 mt-2.5 text-[13px] leading-snug">
                {s.body}
                <br />
                <span className="dx-note">{s.tag}</span>
              </dd>
            </div>
          ))}
        </dl>
        <div className="h-14" />
      </div>
    </section>

    {/* Abstract */}
    <section className="dx-hair-b">
      <div className="max-w-page mx-auto flex flex-wrap gap-10 px-6 py-16 lg:px-10">
        <div className="min-w-0 flex-[1_1_200px]">
          <h2 className="dx-kicker m-0">Abstract</h2>
        </div>
        <div className="min-w-0 max-w-[46rem] flex-[3_1_440px]">
          <p className="dx-serif m-0 pl-[22px] text-[23px] leading-[1.5]" style={{ borderLeft: '1px solid var(--dx-gold)' }}>
            Onboard AI has moved spacecraft decision-making onto commercial silicon that cannot be
            radiation-hardened. A single particle can alter a computation without crashing it: no fault, no log,
            no report — only a different answer. DEOX is a fault-tolerant compiler and certificate format that
            turns each inference into a self-checking execution, emitting machine-readable proof of correctness
            per answer. It rests on Null Field Systems' exact-arithmetic research, and it is measured, not
            promised.
          </p>
          <p className="dx-note mt-6 mb-0">
            Every figure on this page carries its status. Today's numbers are simulation, pre-silicon.
          </p>
        </div>
      </div>
    </section>

    {/* §1 The problem */}
    <section className="dx-hair-b">
      <div className="max-w-page mx-auto flex flex-wrap gap-10 px-6 py-16 lg:px-10">
        <div className="min-w-0 flex-[1_1_200px]">
          <p className="dx-kicker m-0">§1 · The problem</p>
          <h2 className="dx-serif mt-3 mb-0 text-[clamp(25px,3.4vw,32px)] leading-[1.14]">
            One particle can end a flagship. The silent ones never make the report.
          </h2>
        </div>
        <div className="min-w-0 max-w-[48rem] flex-[3_1_440px]">
          <div className="grid gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            <div>
              <h3 className="dx-label dx-red-text m-0">The failure you could see</h3>
              <p className="dx-body-bright mt-3 mb-0">
                Phobos-Grunt, 2011. Russia's flagship Mars mission died in orbit before it left Earth. The
                official inquiry concluded that heavy charged particles struck the onboard computer's memory;
                both processing channels restarted; the spacecraft never recovered.
              </p>
              <p className="dx-serif mt-3.5 mb-0 text-[20px] leading-snug">
                One particle interaction, officially — and a decade of work was over.
              </p>
            </div>
            <div>
              <h3 className="dx-label dx-kicker-gold m-0">The failures no inquiry ever sees</h3>
              <p className="dx-body-bright mt-3 mb-0">
                A bit flips. Nothing crashes. The model simply gives a different answer — <em>keep</em> becomes{' '}
                <em>discard</em>, <em>threat</em> becomes <em>clear sky</em>. No crash. No log. No report. Nobody
                will ever know the answer was wrong.
              </p>
              <p className="dx-serif mt-3.5 mb-0 text-[20px] leading-snug">
                72 satellites will process tracking data onboard to close kill chains, autonomously.
              </p>
            </div>
          </div>

          <FaultConsole />

          <div className="mt-12">
            <h3 className="dx-hair-b dx-label pb-3.5">Why radiation hardening alone cannot close this</h3>
            <ol className="m-0 list-none p-0">
              {HARDENING_LIMITS.map((l, i) => (
                <li key={l.title} className="dx-hair-b grid gap-2 py-5" style={{ gridTemplateColumns: '48px 1fr' }}>
                  <span className="dx-mono dx-kicker-gold text-[13px]">{`0${i + 1}`}</span>
                  <div>
                    <h4 className="dx-serif m-0 text-[21px]">{l.title}</h4>
                    <p className="dx-body mt-1.5 mb-0">{l.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="dx-serif mt-6 mb-0 text-[24px] leading-[1.35]">
              A silently wrong answer looks exactly like a right one — until the mission pays for it.
            </p>
            <p className="dx-note mt-4 mb-0">
              Sources — Phobos-Grunt: official inquiry conclusion, 2012 · CFESat on-orbit upset rates, IEEE
              Aerospace 2009 · SDA Tranche 3 awards, Dec 2025.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* §2 Why now */}
    <section className="dx-hair-b">
      <div className="max-w-page mx-auto flex flex-wrap gap-10 px-6 py-16 lg:px-10">
        <div className="min-w-0 flex-[1_1_200px]">
          <p className="dx-kicker m-0">§2 · Why now</p>
          <h2 className="dx-serif mt-3 mb-0 text-[clamp(25px,3.4vw,32px)] leading-[1.14]">Regulation is moving first.</h2>
          <p className="dx-body mt-3.5 mb-0 text-[14px]">
            Requirements for onboard AI assurance are forming now. No product exists to satisfy them.
          </p>
        </div>
        <div className="min-w-0 max-w-[48rem] flex-[3_1_440px]">
          <ol className="dx-hair-t m-0 list-none p-0">
            {FORCING_FUNCTIONS.map((f) => (
              <li key={f.when} className="dx-hair-b grid gap-3 py-4" style={{ gridTemplateColumns: '96px 1fr' }}>
                <span className="dx-mono dx-kicker-gold pt-1 text-[11px]">{f.when}</span>
                <span className="dx-body-bright">{f.what}</span>
              </li>
            ))}
          </ol>
          <dl className="mt-8 mb-0 grid gap-7" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))' }}>
            {WHY_NOW_FIGURES.map((f) => (
              <div key={f.figure}>
                <dt className="dx-mono dx-gold-text text-[26px]">{f.figure}</dt>
                <dd className="dx-body m-0 mt-1.5 text-[13px] leading-snug">{f.body}</dd>
              </div>
            ))}
          </dl>
          <details className="dx-hair-t mt-8 pt-4">
            <summary className="dx-summary">+ the same problem, already mainstream on the ground</summary>
            <p className="dx-body mt-3.5 mb-0 max-w-[40rem]">
              Silent silicon errors are an acknowledged industry problem: roughly one machine in a thousand
              affected (Meta), silent-corruption events every week or two in large AI training runs (Google), and
              an industry workstream co-founded by seven of the largest silicon and cloud companies. Datacentres
              respond by replaying failed work. A satellite cannot replay.
            </p>
          </details>
        </div>
      </div>
    </section>

    {/* §3 The necessity */}
    <section className="dx-hair-b">
      <div className="max-w-page mx-auto px-6 py-16 lg:px-10">
        <div className="mb-10 max-w-[48rem]">
          <p className="dx-kicker m-0">§3 · The necessity</p>
          <h2 className="dx-serif mt-3 mb-0 text-[clamp(28px,4.2vw,40px)] leading-[1.12]">
            Four requirements. Every existing option fails at least one.
          </h2>
          <p className="dx-body mt-3.5 mb-0">
            These options differ in kind — a board, an architecture, a posture, a cryptosystem. We do not compare
            their prices; we test them against what the mission requires.
          </p>
        </div>

        <ComparisonMatrix />

        <div className="mt-10 flex flex-wrap gap-10">
          <div className="min-w-0 flex-[1_1_200px]" />
          <div className="min-w-0 max-w-[48rem] flex-[3_1_440px]">
            <p className="dx-serif m-0 text-[24px] leading-[1.35]">
              Rad-hard keeps the computer alive; we keep the answers honest. Missions need both.
            </p>
            <details className="dx-hair-t mt-6 pt-4">
              <summary className="dx-summary">+ why haven't NVIDIA or AMD shipped this?</summary>
              <p className="dx-body mt-3.5 mb-0 max-w-[40rem]">
                Their own labs published the mathematics — NVIDIA's ABFT-for-CNNs research among it. But their
                datacentre buyers simply replay failed work, and the edge cannot. They sell the silicon; we
                certify its answers. Rails, not rivals.
              </p>
            </details>
            <p className="dx-note mt-4 mb-0">
              Sources — DoDD 3000.09 · Regulation (EU) 2024/1689 Art. 15 · ESA Φ-sat BIST mandate · ESA FTMR
              report · zkML literature · NVIDIA ABFT-for-CNNs research.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* §4 The signal path */}
    <section id="how" className="dx-hair-b dx-panel-2">
      <div className="max-w-page mx-auto px-6 py-16 lg:px-10">
        <div className="mb-10 max-w-[48rem]">
          <p className="dx-kicker m-0">§4 · The signal path</p>
          <h2 className="dx-serif mt-3 mb-0 text-[clamp(28px,4.2vw,40px)] leading-[1.12]">
            Integrates where your models already live.
          </h2>
          <p className="dx-body mt-3.5 mb-0">
            No retraining, no model surgery. The compiler lowers an exported model into a fault-tolerant form and
            inserts the certificate machinery automatically.
          </p>
        </div>

        <div className="flex flex-wrap items-stretch">
          <div className="dx-hair min-w-0 flex-[1_1_250px] border p-5">
            <p className="dx-label m-0">01 · your models, unchanged</p>
            <p className="dx-serif mt-3 mb-0 text-[21px] leading-tight">PyTorch · TensorFlow → ONNX export</p>
            <p className="dx-body mt-2.5 mb-0 text-[13.5px]">Trained exactly as today.</p>
          </div>
          <div className="relative flex flex-[0_0_44px] items-center justify-center overflow-hidden" aria-hidden="true">
            <span className="h-px w-full" style={{ background: 'var(--dx-hair-2)' }} />
            <span className="dx-sweep absolute h-[3px] w-3" style={{ background: 'var(--dx-gold-bright)' }} />
          </div>
          <div className="dx-gold-cell min-w-0 flex-[1_1_250px] border p-5" style={{ borderColor: 'var(--dx-gold)' }}>
            <p className="dx-label dx-gold-text m-0">02 · deox ft compiler</p>
            <p className="dx-serif mt-3 mb-0 text-[21px] leading-tight">
              Fault-tolerant lowering · automatic certificate insertion
            </p>
            <p className="dx-body mt-2.5 mb-0 text-[13.5px]">
              Emits a machine-readable coverage map of exactly what is protected.
            </p>
          </div>
          <div className="relative flex flex-[0_0_44px] items-center justify-center overflow-hidden" aria-hidden="true">
            <span className="h-px w-full" style={{ background: 'var(--dx-hair-2)' }} />
            <span className="dx-sweep absolute h-[3px] w-3" style={{ background: 'var(--dx-gold-bright)', animationDelay: '1.3s' }} />
          </div>
          <div className="dx-hair min-w-0 flex-[1_1_250px] border p-5">
            <p className="dx-label m-0">03 · every answer ships with</p>
            <p className="dx-serif mt-3 mb-0 text-[21px] leading-tight">Inference + certificate</p>
            <p className="dx-body mt-2.5 mb-0 text-[13.5px]">
              Per answer, machine-checkable, verifies on the ground in milliseconds.
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap gap-10">
          <div className="min-w-0 flex-[1_1_260px]">
            <p className="dx-label m-0">Deploys to silicon target clients already fly</p>
            <figure className="dx-panel mt-4 mb-0 p-2">
              <img
                src="/deox/earth-limb.png"
                alt="Low Earth orbit: the planet's limb seen from a payload's altitude"
                className="block h-[210px] w-full object-cover"
                loading="lazy"
              />
            </figure>
            <p className="dx-note mt-2.5 mb-0">Fig. 1 — the operating environment</p>
          </div>
          <div className="min-w-0 max-w-[48rem] flex-[2_1_440px]">
            <ol className="dx-hair-t m-0 list-none p-0">
              {TARGETS.map((t) => (
                <li key={t.title} className="dx-hair-b py-5">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span
                      className="dx-mono px-2 py-1 text-[10px]"
                      style={{
                        border: `1px solid ${t.gold ? 'var(--dx-gold)' : 'var(--dx-hair-2)'}`,
                        color: t.gold ? 'var(--dx-gold-bright)' : 'var(--dx-dim)',
                        letterSpacing: '0.12em',
                      }}
                    >
                      {t.tag}
                    </span>
                    <h3 className="dx-serif m-0 text-[23px]">{t.title}</h3>
                  </div>
                  <p className="dx-body mt-2.5 mb-0">{t.body}</p>
                </li>
              ))}
            </ol>
            <div className="mt-6 grid gap-7" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
              <div>
                <h4 className="dx-serif m-0 text-[20px]">One certificate format, every target</h4>
                <p className="dx-body mt-2 mb-0 text-[13.5px]">
                  The audit artifact does not change when the silicon does. It files straight into existing FDIR
                  practice and ECSS / DoDD 3000.09 assurance flows.
                </p>
              </div>
              <div>
                <h4 className="dx-serif m-0 text-[20px]">One compiler relationship</h4>
                <p className="dx-body mt-2 mb-0 text-[13.5px]">
                  Every device generation a fleet adopts inherits certified inference.
                </p>
              </div>
            </div>
            <p className="dx-note mt-6 mb-0">
              Status labels are exact — built · designed · roadmap. Front-end: PyTorch and TensorFlow via ONNX.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* §5 The evidence */}
    <section className="dx-hair-b relative overflow-hidden">
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{ background: 'radial-gradient(90% 70% at 20% 0%, rgba(194,162,105,.10), transparent 60%)' }}
      />
      <div className="max-w-page relative mx-auto px-6 py-16 lg:px-10">
        <div className="max-w-[48rem]">
          <p className="dx-kicker dx-kicker-gold m-0">§5 · The evidence</p>
          <h2 className="dx-serif mt-3 mb-0 text-[clamp(30px,5vw,46px)] leading-[1.08]">
            We tried to break it 211,757 times.
          </h2>
          <p className="dx-body mt-4 mb-0">
            Every campaign pre-registered — pass conditions written before the results existed. Here is the score.
          </p>
        </div>

        <div className="mt-11 flex flex-wrap items-start gap-11">
          <div className="min-w-0 flex-[1_1_320px]">
            <InjectionGrid />
          </div>
          <div className="min-w-0 flex-[1_1_320px]">
            <dl className="dx-rule-2 m-0">
              {SCOREBOARD.map((s) => (
                <div key={s.campaign} className="dx-hair-b py-5">
                  <dt className="dx-label">{s.campaign}</dt>
                  <dd className="m-0 mt-2.5 flex items-baseline gap-3">
                    <span className="dx-mono dx-gold-text text-[52px] leading-none">0</span>
                    <span className="text-[15px]">{s.result}</span>
                  </dd>
                </div>
              ))}
            </dl>
            <p className="dx-note mt-4 mb-0">
              [ all three: ours · simulation · pre-silicon — the first hardware campaign turns these into silicon
              numbers ]
            </p>
          </div>
        </div>

        <div className="dx-hair-t mt-11 max-w-[40rem] pt-8">
          <p className="dx-serif m-0 text-[28px] leading-[1.3]">
            We don't promise faults won't happen — that's physics. We promise they can't hide.
          </p>
          <p className="dx-body mt-4 mb-0">
            Every boundary has a number. Some limits exist by design; all of them are tested, measured and
            published in the data room. Nothing waits to be discovered.
          </p>
        </div>
      </div>
    </section>

    {/* §6 The position */}
    <section className="dx-hair-b">
      <div className="max-w-page mx-auto px-6 py-16 lg:px-10">
        <div className="mb-10 max-w-[48rem]">
          <p className="dx-kicker m-0">§6 · The position</p>
          <h2 className="dx-serif mt-3 mb-0 text-[clamp(28px,4.2vw,40px)] leading-[1.12]">
            What it would take to stand where we stand.
          </h2>
          <p className="dx-body mt-3.5 mb-0">
            Existing technologies either protect the machine or prove things to an adversary. Verifying each
            answer against physical faults is a different quadrant — and on our own commissioned 2026 adjacency
            scan, it is still empty.
          </p>
        </div>
        <div className="flex flex-wrap gap-11">
          <div className="min-w-0 flex-[2_1_420px]">
            <TrustQuadrant />
          </div>
          <div className="min-w-0 flex-[1_1_300px]">
            <h3 className="dx-hair-b dx-label pb-3.5">To stand here, a competitor needs all four — at once</h3>
            <ol className="m-0 list-none p-0">
              {MOAT.map((m) => (
                <li key={m.n} className="dx-hair-b grid gap-2 py-4" style={{ gridTemplateColumns: '30px 1fr' }}>
                  <span className="dx-mono dx-kicker-gold text-[12px]">{m.n}</span>
                  <div>
                    <h4 className="m-0 text-[15px] font-normal">{m.title}</h4>
                    <p className="dx-body mt-1 mb-0 text-[13.5px]">{m.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="dx-serif mt-5 mb-0 text-[21px] leading-snug">
              Mathematics cannot be poached. Evidence cannot be faked. Timing does not repeat.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* §7 Why Null Field */}
    <section className="dx-hair-b dx-panel-2">
      <div className="max-w-page mx-auto flex flex-wrap gap-10 px-6 py-16 lg:px-10">
        <div className="min-w-0 flex-[1_1_200px]">
          <p className="dx-kicker m-0">§7 · Why Null Field</p>
          <h2 className="dx-serif mt-3 mb-0 text-[clamp(25px,3.4vw,32px)] leading-[1.14]">
            Four research lines converge on one product.
          </h2>
        </div>
        <div className="min-w-0 max-w-[48rem] flex-[3_1_440px]">
          <p className="dx-body-bright m-0">
            We did not set out to build this. Four independent lines of work kept arriving at the same requirement
            — arithmetic you can prove. DEOX is where they meet.
          </p>
          <div className="dx-hair-t mt-7 grid gap-0" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))' }}>
            {RESEARCH_LINES.map((r, i) => (
              <div key={r.title} className={`dx-hair-b py-5 ${i % 2 === 0 ? 'dx-hair-r pr-6' : 'pl-6'}`}>
                <h3 className="m-0 text-[15px] font-normal">{r.title}</h3>
                <p className="dx-body mt-1.5 mb-0 text-[13.5px]">{r.body}</p>
                <p className={`dx-note mt-2.5 mb-0 ${r.gold ? 'dx-kicker-gold' : ''}`}>{r.status}</p>
              </div>
            ))}
          </div>
          <p className="dx-serif mt-7 mb-0 text-[24px] leading-[1.35]">
            PFN makes exact arithmetic fast. DEOX makes fast arithmetic certified. One mathematics, two products.
          </p>
          <div className="dx-mono mt-6 flex flex-wrap gap-6 text-[12px]">
            <Link to="/overview" className="dx-link">PFN research overview →</Link>
            <Link to="/performance" className="dx-link">Benchmark data and methodology →</Link>
          </div>
        </div>
      </div>
    </section>

    {/* §8 Roadmap */}
    <section className="dx-hair-b">
      <div className="max-w-page mx-auto px-6 py-16 lg:px-10">
        <div className="mb-10 max-w-[48rem]">
          <p className="dx-kicker m-0">§8 · Roadmap</p>
          <h2 className="dx-serif mt-3 mb-0 text-[clamp(28px,4.2vw,40px)] leading-[1.12]">A sequence, not a schedule.</h2>
          <p className="dx-body mt-3.5 mb-0">
            We advance on evidence, in an order our first partners help choose. The destination does not move.
          </p>
        </div>
        <ol className="dx-rule-2 m-0 grid list-none gap-0 p-0" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))' }}>
          {ROADMAP.map((r, i) => (
            <li
              key={r.phase}
              className={`relative box-border pr-6 pt-6 pb-6 ${i < ROADMAP.length - 1 ? 'dx-hair-r' : ''}`}
            >
              <span
                className="absolute left-0 top-[-4px] block"
                aria-hidden="true"
                style={{
                  width: r.gold ? 7 : 5,
                  height: r.gold ? 7 : 5,
                  background: r.gold ? 'var(--dx-gold-bright)' : '#3A3327',
                }}
              />
              <p className={`dx-label m-0 ${r.gold ? 'dx-gold-text' : ''}`}>{r.phase}</p>
              <h3 className="dx-serif mt-3 mb-0 text-[22px]">{r.title}</h3>
              <p className="dx-body mt-2 mb-0 text-[13.5px]">{r.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-9 flex flex-wrap gap-10">
          <div className="min-w-0 flex-[1_1_200px]" />
          <div className="min-w-0 max-w-[48rem] flex-[3_1_440px]">
            <p className="dx-body m-0">
              We advance when the evidence says advance — measured silicon before scale, a paying partner before
              platform, flight proof before the claim.
            </p>
            <details className="dx-hair-t mt-5 pt-4">
              <summary className="dx-summary">+ the hard parts, named</summary>
              <p className="dx-body mt-3.5 mb-0 max-w-[40rem]">
                Measuring silicon honestly · fitting real toolchains · winning a ride to orbit · taming recursive
                workloads. Each has a plan; none is hidden. They are documented in full in the data room.
              </p>
            </details>
          </div>
        </div>
      </div>
    </section>

    {/* Close */}
    <section id="partner" className="relative overflow-hidden">
      <div className="dx-grid-bg absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="max-w-page relative mx-auto px-6 py-20 lg:px-10">
        <div className="flex flex-wrap items-end gap-11">
          <div className="min-w-0 max-w-[40rem] flex-[2_1_440px]">
            <p className="dx-kicker dx-kicker-gold m-0">Design partners · 2026</p>
            <p className="dx-serif mt-4 mb-0 text-[clamp(30px,5.2vw,54px)] leading-[1.08]">
              Everyone else asks you to trust the answer. We hand you the proof.
            </p>
            <p className="dx-body mt-5 mb-0">
              We are selecting a small number of design partners — FPGA-first payload builders and GPU-class fleet
              operators — to set the order in which DEOX is built. Partners get the reference implementation, the
              coverage map, and the evidence ledger behind every number on this page.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="mailto:viv@null-field.com?subject=DEOX%20design%20partner%20enquiry"
                className="dx-btn dx-btn-gold"
              >
                Design-partner enquiry →
              </a>
              <Link to="/contact" className="dx-btn dx-btn-ghost">Technical conversation</Link>
            </div>
          </div>
          <div className="min-w-0 flex-[1_1_280px]">
            <p className="dx-note m-0">
              Project DEOX · certified compute execution
              <br />
              Per-answer proof at 1.37× arithmetic
              <br />
              [ ours · simulation · pre-silicon ]
              <br />
              Null Field Systems · {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default Deox;

import React from 'react';
import { Coins, Activity, Dna, Shield, Factory, Calculator, ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const industries = [
  {
    icon: Coins,
    title: 'Cryptocurrency & Blockchain',
    tag: 'FinTech',
    description: 'Zero-error financial calculations at scale. 141× faster settlements with 99.9999% precision across 18+ decimal tokens.',
    features: ['DeFi Protocols', 'Settlement Engines', 'Token Math'],
    iconColor: 'text-amber-400',
    iconBg: 'bg-amber-500/10',
    borderHover: 'hover:border-amber-500/20',
  },
  {
    icon: Activity,
    title: 'Quantitative Finance',
    tag: 'Trading',
    description: 'High-frequency trading without precision loss. Sub-microsecond latency, 118× faster valuations.',
    features: ['HFT Systems', 'Risk Models', 'Exact Pricing'],
    iconColor: 'text-teal-400',
    iconBg: 'bg-teal-500/10',
    borderHover: 'hover:border-teal-500/20',
  },
  {
    icon: Dna,
    title: 'Scientific Computing',
    tag: 'Research',
    description: 'Research-grade precision for breakthrough discoveries. 899,000× faster powers, unlimited precision.',
    features: ['Genomics', 'Physics Sim', 'Astrophysics'],
    iconColor: 'text-purple-400',
    iconBg: 'bg-purple-500/10',
    borderHover: 'hover:border-purple-500/20',
  },
  {
    icon: Shield,
    title: 'Cryptography',
    tag: 'Security',
    description: 'Secure key generation with O(1) operations. Fixed 415B memory, predictable performance for large primes.',
    features: ['Prime Gen', 'Key Exchange', 'Modular Arith'],
    iconColor: 'text-sky-400',
    iconBg: 'bg-sky-500/10',
    borderHover: 'hover:border-sky-500/20',
  },
  {
    icon: Factory,
    title: 'Industrial IoT',
    tag: 'Manufacturing',
    description: 'Precision manufacturing and quality control. 728K× faster scaling, no drift accumulation.',
    features: ['Sensor Data', 'Calibration', 'Embedded'],
    iconColor: 'text-emerald-400',
    iconBg: 'bg-emerald-500/10',
    borderHover: 'hover:border-emerald-500/20',
  },
  {
    icon: Calculator,
    title: 'Enterprise Accounting',
    tag: 'Finance',
    description: 'Audit-ready financial reporting with exact decimal math, instant reconciliation, and zero floating-point errors.',
    features: ['Tax Compliance', 'Multi-currency', 'Audit Trail'],
    iconColor: 'text-rose-400',
    iconBg: 'bg-rose-500/10',
    borderHover: 'hover:border-rose-500/20',
  },
];

const UseCases: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Header */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-500/[0.07] rounded-full blur-[100px]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-accent-400 tracking-wider uppercase mb-4">Applications</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Built for Industries<br className="hidden sm:block" /> That Can't Afford Error
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Precision-critical applications powered by PFN
          </p>
        </div>
      </section>

      {/* Industry Cards — unique per-industry styling, not BentoGrid */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {industries.map((item, i) => (
              <div
                key={i}
                className={`group p-6 rounded-2xl bg-slate-900/50 border border-slate-800 transition-all duration-300 ${item.borderHover}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl ${item.iconBg} flex items-center justify-center`}>
                    <item.icon className={`h-5 w-5 ${item.iconColor}`} />
                  </div>
                  <span className="text-xs font-medium tracking-wider uppercase text-slate-500">{item.tag}</span>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-5">{item.description}</p>

                <div className="flex flex-wrap gap-2">
                  {item.features.map((f, j) => (
                    <span
                      key={j}
                      className="text-xs px-2.5 py-1 rounded-full bg-white/[0.05] text-slate-500 border border-white/[0.06]"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent-500/[0.05] rounded-full blur-[100px]" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready for Your Use Case?</h2>
          <p className="text-lg text-slate-400 mb-10">
            Let's discuss how PFN can solve your precision challenges.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-accent-500 text-slate-900 font-semibold hover:bg-accent-400 transition-all accent-glow"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Schedule Demo
            </Link>
            <Link
              to="/performance"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-white/[0.05] text-white font-semibold border border-white/[0.1] hover:bg-white/[0.08] transition-all"
            >
              View Benchmarks <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UseCases;

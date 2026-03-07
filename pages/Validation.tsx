import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Calendar, ArrowRight, Cpu, Database, Zap, Award } from 'lucide-react';

const Validation: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Header */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-500/[0.07] rounded-full blur-[100px]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-accent-400 tracking-wider uppercase mb-4">Quality Assurance</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Validation &amp; Quality
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Every claim is verifiable. Every result is reproducible.
          </p>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-6">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-4 p-6 rounded-2xl bg-accent-500/[0.05] border border-accent-500/10">
            <ShieldCheck className="h-8 w-8 text-accent-400 flex-shrink-0" />
            <div>
              <h2 className="text-lg font-semibold text-white">Production-Ready Quality</h2>
              <p className="text-sm text-slate-400">Rigorous validation for mission-critical applications</p>
            </div>
          </div>
        </div>
      </section>

      {/* Validation Areas — feature cards, not BentoGrid */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">Validation Areas</h2>
            <p className="text-slate-500">Comprehensive testing across every dimension</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: Cpu,
                title: 'Computational Accuracy',
                description: 'Symbolic representation preserves exact values. No floating-point approximation. Deterministic results across platforms.',
                badge: 'Verified',
              },
              {
                icon: Database,
                title: 'Memory Consistency',
                description: 'Fixed 415-byte footprint verified across all operations. No leaks under stress. Predictable allocation.',
                badge: '415 bytes',
              },
              {
                icon: Zap,
                title: 'Performance Verification',
                description: 'O(1) constant time confirmed through extensive benchmarking. Reproducible results with statistical validation.',
                badge: 'O(1)',
              },
              {
                icon: Award,
                title: 'Cross-Platform',
                description: 'Consistent behavior on Linux, macOS, and Windows. x86_64 and ARM64 architectures. Identical results everywhere.',
                badge: '3 OS',
              },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 group hover:border-slate-700 transition-colors duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-accent-500/10 flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-accent-400" />
                  </div>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-accent-500/10 text-accent-400">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verification Process — numbered steps, not BentoGrid */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-white mb-3">Our Verification Approach</h2>
            <p className="text-slate-500">How we ensure PFN delivers on its promises</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { step: '01', title: 'Formal Analysis', description: 'Mathematical proofs verify algorithmic correctness and precision guarantees.' },
              { step: '02', title: 'Empirical Testing', description: 'Extensive benchmark suites validate performance claims across diverse workloads.' },
              { step: '03', title: 'Customer Validation', description: 'We provide tools for you to verify results on your own hardware and workloads.' },
            ].map((item, i) => (
              <div key={i}>
                <div className="text-5xl font-bold text-slate-800 mb-4">{item.step}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Guarantees — stat row */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-800/50">
            {[
              { value: 'O(1)', label: 'Time Complexity' },
              { value: '415B', label: 'Memory Per Number' },
              { value: '100%', label: 'Exact Precision' },
              { value: '0', label: 'Rounding Errors' },
            ].map((item, i) => (
              <div key={i} className="bg-slate-950 p-8 text-center">
                <div className="text-3xl font-bold text-accent-400 mb-1">{item.value}</div>
                <div className="text-sm text-slate-500">{item.label}</div>
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Verify It Yourself</h2>
          <p className="text-lg text-slate-400 mb-10">
            We'll help you run benchmarks on your hardware with your workloads.
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

export default Validation;

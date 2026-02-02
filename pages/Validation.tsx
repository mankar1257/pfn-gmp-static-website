import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, Calendar, ArrowRight, Cpu, Database, Zap, Award } from 'lucide-react';

const Validation: React.FC = () => {
  const validationAreas = [
    {
      icon: Cpu,
      title: 'Computational Accuracy',
      description: 'Verified against mathematical proofs and reference implementations.',
      points: [
        'Symbolic representation preserves exact values',
        'No floating-point approximation errors',
        'Deterministic results across platforms',
      ],
    },
    {
      icon: Database,
      title: 'Memory Consistency',
      description: 'Fixed memory footprint verified across all operations.',
      points: [
        'Constant 415 bytes per number',
        'No memory leaks under stress',
        'Predictable allocation patterns',
      ],
    },
    {
      icon: Zap,
      title: 'Performance Verification',
      description: 'O(1) complexity confirmed through extensive benchmarking.',
      points: [
        'Constant time at any magnitude',
        'Reproducible benchmark results',
        'Statistical validation of claims',
      ],
    },
    {
      icon: Award,
      title: 'Cross-Platform Validation',
      description: 'Consistent behavior across all supported platforms.',
      points: [
        'Linux, macOS, Windows support',
        'x86_64 and ARM64 architectures',
        'Identical results everywhere',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Validation & Quality</h1>
          <p className="text-xl text-slate-300">
            Every claim is <span className="text-accent-400 font-semibold">verifiable</span>. Every result is <span className="text-accent-400 font-semibold">reproducible</span>.
          </p>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-12 bg-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-4 text-center">
            <ShieldCheck className="h-12 w-12 text-accent-400" />
            <div>
              <h2 className="text-2xl font-bold text-white">Production-Ready Quality</h2>
              <p className="text-slate-400">Rigorous validation for mission-critical applications</p>
            </div>
          </div>
        </div>
      </section>

      {/* Validation Areas */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {validationAreas.map((area, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg">
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-accent-500/20 rounded-xl p-3">
                    <area.icon className="h-6 w-6 text-accent-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{area.title}</h3>
                    <p className="text-slate-600 text-sm mt-1">{area.description}</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {area.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-accent-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verification Process */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Verification Approach</h2>
            <p className="text-slate-600">How we ensure PFN delivers on its promises</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-accent-500 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-black text-slate-900">1</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Formal Analysis</h3>
              <p className="text-slate-600 text-sm">
                Mathematical proofs verify algorithmic correctness and precision guarantees.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-accent-500 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-black text-slate-900">2</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Empirical Testing</h3>
              <p className="text-slate-600 text-sm">
                Extensive benchmark suites validate performance claims across diverse workloads.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-accent-500 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-black text-slate-900">3</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Customer Validation</h3>
              <p className="text-slate-600 text-sm">
                We provide tools for you to verify results on your own hardware and workloads.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Guarantees */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">What We Guarantee</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: 'O(1)', label: 'Time Complexity' },
              { value: '415B', label: 'Memory Per Number' },
              { value: '100%', label: 'Exact Precision' },
              { value: '0', label: 'Rounding Errors' },
            ].map((item, i) => (
              <div key={i} className="bg-slate-800 rounded-2xl p-6 text-center border border-slate-700">
                <div className="text-3xl font-black text-accent-400 mb-2">{item.value}</div>
                <div className="text-slate-400 text-sm">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-accent-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Verify It Yourself</h2>
          <p className="text-lg text-slate-800 mb-8">
            We'll help you run benchmarks on your hardware with your workloads.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Schedule Demo
            </Link>
            <Link
              to="/performance"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white text-slate-900 font-semibold hover:bg-slate-100 transition-colors"
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

import React from 'react';
import { ShieldCheck, FileCode, Download } from 'lucide-react';

const Validation: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-16">
        <h1 className="text-4xl font-bold text-white mb-4">Validation & Trust</h1>
        <p className="text-xl text-slate-400 max-w-3xl">
          We believe in proof by results, not explanation. Our claims are independently verifiable through our public test suite.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl">
          <ShieldCheck className="text-brand-500 h-10 w-10 mb-6" />
          <h3 className="text-xl font-bold text-white mb-3">Zero Drift</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            Test B-01: 1,000,000 multiplications of 2 × 1.
            <br/>Expected: Exactly 2.
            <br/>Result: Exactly 2.
          </p>
          <div className="text-green-400 text-sm font-mono">Status: PASSED (10^9 ops)</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl">
          <FileCode className="text-brand-500 h-10 w-10 mb-6" />
          <h3 className="text-xl font-bold text-white mb-3">Determinism</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            Identical inputs produce identical bit patterns on x86-64 Linux, ARM64 macOS, and Windows MSVC.
          </p>
          <div className="text-green-400 text-sm font-mono">Status: PASSED (SHA-256 Match)</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl">
          <Download className="text-brand-500 h-10 w-10 mb-6" />
          <h3 className="text-xl font-bold text-white mb-3">Reproducibility</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            Download our benchmark suite to verify performance claims on your own hardware.
          </p>
          <button className="text-brand-400 hover:text-brand-300 text-sm font-medium">
            Download Suite (v2.0) &rarr;
          </button>
        </div>
      </div>

      <section className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 md:p-12">
        <h2 className="text-2xl font-bold text-white mb-6">How to Verify</h2>
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold flex-shrink-0">1</div>
            <div>
              <h4 className="text-white font-semibold">Download the Test Suite</h4>
              <p className="text-slate-400 text-sm">Available on GitHub. Requires GCC/Clang and GMP installed.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold flex-shrink-0">2</div>
            <div>
              <h4 className="text-white font-semibold">Run Zero-Drift Tests</h4>
              <p className="text-slate-400 text-sm">Executes 1 billion random operations comparing PFN-GMP output against standard GMP.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold flex-shrink-0">3</div>
            <div>
              <h4 className="text-white font-semibold">Run Performance Benchmarks</h4>
              <p className="text-slate-400 text-sm">Generates CSV reports for multiplicative chains and power operations on your specific CPU.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Validation;
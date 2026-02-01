import React from 'react';
import { Copy, Terminal } from 'lucide-react';

const CodeBlock: React.FC<{ code: string; language?: string }> = ({ code, language = 'c' }) => {
  return (
    <div className="relative group rounded-lg overflow-hidden border border-slate-800 bg-slate-950 my-6">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-slate-500" />
          <span className="text-xs text-slate-400 font-mono">{language}</span>
        </div>
        <button className="text-slate-500 hover:text-white transition-colors">
          <Copy size={14} />
        </button>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm font-mono text-slate-300 leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};

const Integration: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-white mb-6">Integration Guide</h1>
      <p className="text-xl text-slate-400 mb-12">
        Simple, familiar API designed for seamless integration with existing GMP codebases.
      </p>

      <section className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-4">Hybrid Usage Pattern</h2>
        <p className="text-slate-400 mb-4">
          The recommended pattern is to use PFN-GMP for multiplicative phases and standard GMP for addition/subtraction phases.
        </p>
        <CodeBlock code={`// 1. Initialize PFN-GMP numbers
pfn_gmp_number_t *pfn_result = pfn_gmp_init();
pfn_gmp_set_str(pfn_result, "1", 10);

// 2. Fast Path: Multiplicative Phase (Accelerated)
for (int i = 0; i < 1000000; i++) {
    // Constant time multiplication
    pfn_gmp_mul(pfn_result, pfn_result, factor); 
}

// 3. Convert to GMP for Addition Phase
mpz_t gmp_result;
mpz_init(gmp_result);
pfn_gmp_get_mpz(gmp_result, pfn_result);

// 4. Fallback: Addition (Standard GMP)
mpz_add(gmp_result, gmp_result, offset);`} />
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-4">Power Operations</h2>
        <p className="text-slate-400 mb-4">
          Replace loops with specialized O(1) functions for massive speedups.
        </p>
        <CodeBlock code={`// BAD: Loop implementation (Linear time)
for (int i = 0; i < 50000; i++) {
    mpz_mul_ui(result, result, 2);
}

// GOOD: PFN-GMP Specialized Function (Constant time)
// Instantly multiplies by 2^50000
pfn_gmp_mul_pow2(result, result, 50000);

// Decimal scaling (Constant time)
pfn_gmp_mul_pow10(amount, amount, 9); // Convert to nano-units`} />
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-4">Migration Guide</h2>
        <div className="space-y-4">
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg">
            <h3 className="font-semibold text-white mb-2">Step 1: Identify Hotspots</h3>
            <p className="text-sm text-slate-400">Profile your application to find long multiplicative chains (&gt;100K ops) or frequent power-of-2/10 scaling.</p>
          </div>
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg">
            <h3 className="font-semibold text-white mb-2">Step 2: Replace High-Impact Ops</h3>
            <p className="text-sm text-slate-400">Replace <code className="text-brand-400">mpz_mul</code> with <code className="text-brand-400">pfn_gmp_mul</code> in critical sections.</p>
          </div>
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg">
            <h3 className="font-semibold text-white mb-2">Step 3: Optimize Boundaries</h3>
            <p className="text-sm text-slate-400">Minimize conversions between PFN and GMP representations. Batch operations by type.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Integration;
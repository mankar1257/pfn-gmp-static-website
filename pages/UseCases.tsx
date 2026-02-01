import React from 'react';
import { Landmark, Key, FlaskConical, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const UseCases: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-16">
        <h1 className="text-4xl font-bold text-white mb-4">Industry Applications</h1>
        <p className="text-xl text-slate-400 max-w-3xl">
          PFN-GMP excels in specific, high-value niches where exact arithmetic and multiplicative performance are critical.
        </p>
      </div>

      <div className="space-y-24">
        {/* Finance */}
        <section id="finance" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4">
            <div className="w-16 h-16 bg-blue-900/20 rounded-2xl flex items-center justify-center mb-6">
              <Landmark className="text-blue-400 h-8 w-8" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Financial & Accounting</h2>
            <p className="text-slate-400 mb-6">
              Banks and trading firms require exact decimal arithmetic with zero drift over years of operations.
            </p>
            <ul className="space-y-3 text-sm text-slate-300 mb-8">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>Core banking ledgers</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>High-frequency trading pricing</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>Risk and valuation engines</li>
            </ul>
            <Link to="/contact" className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center">
              Discuss Financial Use Case <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-xl p-8">
            <h3 className="text-lg font-semibold text-white mb-6">The PFN Advantage: Decimal Scaling</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-slate-400 text-sm uppercase tracking-wider mb-2">Problem</h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Frequent scaling by powers of 10 (currency conversion, unit changes) is computationally expensive in binary systems or requires slow decimal types.
                </p>
              </div>
              <div>
                <h4 className="text-brand-400 text-sm uppercase tracking-wider mb-2">Solution</h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  PFN-GMP handles <code className="bg-slate-800 px-1 rounded">× 10^k</code> and <code className="bg-slate-800 px-1 rounded">÷ 10^k</code> in constant time (O(1)). This allows for 100-500× faster decimal scaling phases in pricing pipelines.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Crypto */}
        <section id="crypto" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4">
            <div className="w-16 h-16 bg-purple-900/20 rounded-2xl flex items-center justify-center mb-6">
              <Key className="text-purple-400 h-8 w-8" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Cryptography & MPC</h2>
            <p className="text-slate-400 mb-6">
              Cryptographic protocols require massive integer operations for key generation and multi-party computation.
            </p>
            <ul className="space-y-3 text-sm text-slate-300 mb-8">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>RSA Key Generation</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>Homomorphic Encryption Setup</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>Zero-Knowledge Proofs</li>
            </ul>
            <Link to="/contact" className="text-purple-400 hover:text-purple-300 font-medium inline-flex items-center">
              Discuss Crypto Use Case <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-xl p-8">
            <h3 className="text-lg font-semibold text-white mb-6">The PFN Advantage: Large Moduli</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-slate-400 text-sm uppercase tracking-wider mb-2">Problem</h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Multiplying 2048+ bit primes and setting up large moduli for FHE schemes creates significant latency during protocol initialization.
                </p>
              </div>
              <div>
                <h4 className="text-brand-400 text-sm uppercase tracking-wider mb-2">Solution</h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Constant-time multiplication for arbitrarily large keys reduces setup latency from seconds to milliseconds. Deterministic computation is guaranteed across distributed nodes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* HPC */}
        <section id="hpc" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4">
            <div className="w-16 h-16 bg-emerald-900/20 rounded-2xl flex items-center justify-center mb-6">
              <FlaskConical className="text-emerald-400 h-8 w-8" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Scientific Computing</h2>
            <p className="text-slate-400 mb-6">
              Scientific simulations need exact arithmetic for reproducibility and long computation chains without drift.
            </p>
            <ul className="space-y-3 text-sm text-slate-300 mb-8">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>Combinatorics (Factorials)</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>Rational Arithmetic</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>Formal Verification</li>
            </ul>
            <Link to="/contact" className="text-emerald-400 hover:text-emerald-300 font-medium inline-flex items-center">
              Discuss HPC Use Case <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-xl p-8">
            <h3 className="text-lg font-semibold text-white mb-6">The PFN Advantage: Exactness</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-slate-400 text-sm uppercase tracking-wider mb-2">Problem</h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Floating point errors accumulate over millions of operations. Traditional BigInts are too slow for massive factorial-like products.
                </p>
              </div>
              <div>
                <h4 className="text-brand-400 text-sm uppercase tracking-wider mb-2">Solution</h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  PFN-GMP provides 10-50× faster computation for large factorials and products while maintaining bit-exact results across all architectures (x86/ARM).
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UseCases;
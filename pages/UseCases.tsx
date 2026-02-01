import React from 'react';
import { Landmark, Key, FlaskConical, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const UseCases: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-16">
        <h1 className="text-4xl font-bold text-white mb-4">Where PFN-GMP Makes a Difference</h1>
        <p className="text-xl text-slate-400 max-w-3xl">
          Some problems need both perfect accuracy and blazing speed. Here's where our technology has the biggest impact.
        </p>
      </div>

      <div className="space-y-24">
        {/* Finance */}
        <section id="finance" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4">
            <div className="w-16 h-16 bg-blue-900/20 rounded-2xl flex items-center justify-center mb-6">
              <Landmark className="text-blue-400 h-8 w-8" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Financial Systems</h2>
            <p className="text-slate-400 mb-6">
              In finance, a single rounding error can compound into millions of dollars in discrepancies. Banks and trading systems need calculations that are both lightning-fast and mathematically perfect.
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
            <h3 className="text-lg font-semibold text-white mb-6">Why Financial Teams Choose PFN-GMP</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-slate-400 text-sm uppercase tracking-wider mb-2">The Challenge</h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Currency conversions and decimal scaling happen constantly in trading systems. Traditional binary arithmetic makes these operations expensive, while decimal libraries are painfully slow.
                </p>
              </div>
              <div>
                <h4 className="text-brand-400 text-sm uppercase tracking-wider mb-2">Our Solution</h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Multiplying or dividing by any power of 10 takes the same time—whether it's 10² or 10⁵⁰⁰⁰⁰. This makes pricing pipelines 100-500× faster while maintaining perfect decimal accuracy.
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
            <h2 className="text-3xl font-bold text-white mb-4">Cryptography & Security</h2>
            <p className="text-slate-400 mb-6">
              Modern cryptography relies on huge prime numbers and complex mathematical operations. When setting up secure systems, every second counts—especially when you're dealing with thousands of operations.
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
            <h3 className="text-lg font-semibold text-white mb-6">Why Security Engineers Choose PFN-GMP</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-slate-400 text-sm uppercase tracking-wider mb-2">The Challenge</h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Generating RSA keys or setting up homomorphic encryption schemes involves multiplying massive prime numbers. With traditional libraries, this creates noticeable delays during system initialization.
                </p>
              </div>
              <div>
                <h4 className="text-brand-400 text-sm uppercase tracking-wider mb-2">Our Solution</h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Our constant-time multiplication handles arbitrarily large numbers with ease. What took seconds now happens in milliseconds—and you get bit-exact determinism across all your distributed nodes.
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
            <h2 className="text-3xl font-bold text-white mb-4">Scientific & Research Computing</h2>
            <p className="text-slate-400 mb-6">
              When you're running simulations or analyzing data, reproducibility matters. You need results that are not just fast, but mathematically exact and consistent across different systems.
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
            <h3 className="text-lg font-semibold text-white mb-6">Why Researchers Choose PFN-GMP</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-slate-400 text-sm uppercase tracking-wider mb-2">The Challenge</h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Floating-point arithmetic accumulates errors over long computation chains, making results unreproducible. Traditional big integer libraries work, but they're too slow for massive calculations like large factorials.
                </p>
              </div>
              <div>
                <h4 className="text-brand-400 text-sm uppercase tracking-wider mb-2">Our Solution</h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  We deliver 10-50× speedup for factorial and product-heavy workloads while guaranteeing bit-exact results on any architecture. Your simulations will produce identical results whether you run them on x86 or ARM.
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
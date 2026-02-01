import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Target, TrendingUp, ArrowRight, CheckCircle2, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-600/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-brand-500/40 text-brand-300 text-xs font-semibold mb-8 shadow-lg shadow-brand-600/10"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
              </span>
              Version 2.0 Now Available for Enterprise
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-8 leading-tight"
            >
              Arbitrary-Precision. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-brand-500 to-accent-500">
                1000× Faster.
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              PFN-GMP accelerates multiplicative chains and power operations with zero drift and deterministic results. The enterprise standard for high-performance numeric computing.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/performance" className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-gradient-to-r from-brand-600 to-brand-700 text-white font-semibold hover:from-brand-500 hover:to-brand-600 transition-all shadow-lg shadow-brand-600/30 hover:shadow-brand-500/40">
                See Performance Evidence
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link to="/use-cases" className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-slate-800/80 text-slate-100 font-semibold hover:bg-slate-700 border border-slate-700 hover:border-brand-500/50 transition-all backdrop-blur-sm">
                Explore Use Cases
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-24 bg-slate-900/50 border-y border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-2xl bg-slate-900/90 border border-slate-800/50 hover:border-brand-500/40 transition-all hover:shadow-xl hover:shadow-brand-600/10 backdrop-blur-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-600/20 to-accent-600/20 rounded-xl flex items-center justify-center mb-6 group-hover:from-brand-600/30 group-hover:to-accent-600/30 transition-colors">
                <Zap className="text-brand-400 h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Constant-Time Power Ops</h3>
              <p className="text-slate-300 leading-relaxed mb-4">
                Multiply by 2<sup>50,000</sup> in 70 nanoseconds vs 3+ minutes with traditional approaches. 2.77 million× speedup for scaling operations.
              </p>
              <Link to="/performance#power-operations" className="inline-flex items-center mt-4 text-brand-400 hover:text-brand-300 text-sm font-semibold transition-colors">
                View Benchmark <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div className="group p-8 rounded-2xl bg-slate-900/90 border border-slate-800/50 hover:border-brand-500/40 transition-all hover:shadow-xl hover:shadow-brand-600/10 backdrop-blur-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-600/20 to-accent-600/20 rounded-xl flex items-center justify-center mb-6 group-hover:from-brand-600/30 group-hover:to-accent-600/30 transition-colors">
                <Target className="text-brand-400 h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Zero Numerical Drift</h3>
              <p className="text-slate-300 leading-relaxed mb-4">
                Exact arbitrary-precision arithmetic with guaranteed bit-exact determinism. Verified across 10<sup>9</sup> operations against GMP.
              </p>
              <Link to="/validation#zero-drift" className="inline-flex items-center mt-4 text-brand-400 hover:text-brand-300 text-sm font-semibold transition-colors">
                See Validation <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div className="group p-8 rounded-2xl bg-slate-900/90 border border-slate-800/50 hover:border-brand-500/40 transition-all hover:shadow-xl hover:shadow-brand-600/10 backdrop-blur-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-600/20 to-accent-600/20 rounded-xl flex items-center justify-center mb-6 group-hover:from-brand-600/30 group-hover:to-accent-600/30 transition-colors">
                <TrendingUp className="text-brand-400 h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Proven at Scale</h3>
              <p className="text-slate-300 leading-relaxed mb-4">
                10-300× faster than GMP for long multiplicative chains (&gt;200K operations). Production-ready with independent validation.
              </p>
              <Link to="/performance#benchmarks" className="inline-flex items-center mt-4 text-brand-400 hover:text-brand-300 text-sm font-semibold transition-colors">
                Check Data <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Limitations */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Trust Through Verification</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <CheckCircle2 className="text-brand-500 h-6 w-6 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-semibold">Independently Verified</h4>
                    <p className="text-slate-400 text-sm mt-1">Reproducible test suite available for all performance claims.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CheckCircle2 className="text-brand-500 h-6 w-6 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-semibold">Zero Discrepancies</h4>
                    <p className="text-slate-400 text-sm mt-1">1 billion comparison tests vs GMP with zero errors.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CheckCircle2 className="text-brand-500 h-6 w-6 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-semibold">Cross-Platform Determinism</h4>
                    <p className="text-slate-400 text-sm mt-1">Identical bit patterns on x86-64, ARM64, Linux, macOS, and Windows.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
              <div className="flex items-start gap-4">
                <AlertTriangle className="text-amber-500 h-6 w-6 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Honest Performance Assessment</h3>
                  <p className="text-slate-300 mb-4">
                    PFN-GMP is <strong>NOT</strong> faster at everything. It is optimized for multiplicative workloads and power operations.
                  </p>
                  <p className="text-slate-400 text-sm">
                    For addition-heavy algorithms or small-number arithmetic, standard GMP remains the better choice. We provide a hybrid architecture to leverage the best of both.
                  </p>
                  <Link to="/performance#when-not-to-use" className="inline-block mt-4 text-amber-500 hover:text-amber-400 text-sm font-medium underline decoration-amber-500/30 underline-offset-4">
                    Read Limitations
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brand-900/10 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to evaluate?</h2>
          <p className="text-slate-400 mb-8 text-lg">
            Download the benchmark suite or request an evaluation license for your enterprise workload.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="px-8 py-3 rounded-md bg-brand-600 text-white font-semibold hover:bg-brand-500 transition-colors">
              Request Evaluation License
            </Link>
            <Link to="/validation" className="px-8 py-3 rounded-md bg-slate-800 text-white font-semibold hover:bg-slate-700 border border-slate-700 transition-colors">
              Download Benchmarks
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
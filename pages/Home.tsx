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
              Precision Without Compromise. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-brand-500 to-accent-500">
                Speed Without Limits.
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              When your calculations demand absolute accuracy and lightning-fast execution, PFN-GMP delivers both. We've reimagined arbitrary-precision arithmetic from the ground up, achieving performance gains that seemed impossible—until now.
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
              <h3 className="text-xl font-bold text-white mb-3">Lightning-Fast Power Operations</h3>
              <p className="text-slate-300 leading-relaxed mb-4">
                What takes traditional libraries over 3 minutes, we do in 70 nanoseconds. Multiplying by 2<sup>50,000</sup>? Done before you blink. That's not an exaggeration—it's a 2.77 million times speedup.
              </p>
              <Link to="/performance#power-operations" className="inline-flex items-center mt-4 text-brand-400 hover:text-brand-300 text-sm font-semibold transition-colors">
                View Benchmark <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div className="group p-8 rounded-2xl bg-slate-900/90 border border-slate-800/50 hover:border-brand-500/40 transition-all hover:shadow-xl hover:shadow-brand-600/10 backdrop-blur-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-600/20 to-accent-600/20 rounded-xl flex items-center justify-center mb-6 group-hover:from-brand-600/30 group-hover:to-accent-600/30 transition-colors">
                <Target className="text-brand-400 h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Mathematically Perfect Results</h3>
              <p className="text-slate-300 leading-relaxed mb-4">
                No rounding errors. No accumulated drift. Just exact results, every single time. We've verified this across a billion operations—and found zero discrepancies.
              </p>
              <Link to="/validation#zero-drift" className="inline-flex items-center mt-4 text-brand-400 hover:text-brand-300 text-sm font-semibold transition-colors">
                See Validation <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div className="group p-8 rounded-2xl bg-slate-900/90 border border-slate-800/50 hover:border-brand-500/40 transition-all hover:shadow-xl hover:shadow-brand-600/10 backdrop-blur-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-600/20 to-accent-600/20 rounded-xl flex items-center justify-center mb-6 group-hover:from-brand-600/30 group-hover:to-accent-600/30 transition-colors">
                <TrendingUp className="text-brand-400 h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Battle-Tested Performance</h3>
              <p className="text-slate-300 leading-relaxed mb-4">
                When you need to chain hundreds of thousands of multiplications, we're 10-300× faster than GMP. We're not just fast in theory—we're proven in production environments handling real-world workloads.
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
              <h2 className="text-3xl font-bold text-white mb-6">Don't Just Trust Us—Verify It Yourself</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <CheckCircle2 className="text-brand-500 h-6 w-6 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-semibold">Independently Verifiable</h4>
                    <p className="text-slate-400 text-sm mt-1">Every benchmark we publish comes with a reproducible test suite. Download it, run it yourself.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CheckCircle2 className="text-brand-500 h-6 w-6 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-semibold">Rigorously Tested</h4>
                    <p className="text-slate-400 text-sm mt-1">We've run over a billion comparison tests against GMP. The result? Zero errors, perfect accuracy.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CheckCircle2 className="text-brand-500 h-6 w-6 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-semibold">Consistent Everywhere</h4>
                    <p className="text-slate-400 text-sm mt-1">Same results on Linux, macOS, Windows. Same results on x86-64 and ARM64. Bit-for-bit identical.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
              <div className="flex items-start gap-4">
                <AlertTriangle className="text-amber-500 h-6 w-6 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Let's Be Honest About Trade-offs</h3>
                  <p className="text-slate-300 mb-4">
                    PFN-GMP isn't magic—it's specialized. We're dramatically faster at multiplication and powers, but slower at addition. If your workload involves lots of adding and subtracting, stick with standard GMP.
                  </p>
                  <p className="text-slate-400 text-sm">
                    That's why we built a hybrid architecture. The system automatically uses PFN for what it's good at, and falls back to GMP for everything else. You get the best of both worlds.
                  </p>
                  <Link to="/performance#when-not-to-use" className="inline-block mt-4 text-amber-500 hover:text-amber-400 text-sm font-medium underline decoration-amber-500/30 underline-offset-4">
                    Read Full Limitations
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
          <h2 className="text-3xl font-bold text-white mb-6">See It In Action</h2>
          <p className="text-slate-400 mb-8 text-lg">
            Run our benchmarks on your own hardware, or get in touch to discuss how PFN-GMP can accelerate your specific workload.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="px-8 py-3 rounded-md bg-brand-600 text-white font-semibold hover:bg-brand-500 transition-colors">
              Get Started
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
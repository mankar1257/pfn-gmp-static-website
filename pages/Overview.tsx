import React from 'react';
import { Layers, Cpu, Lock } from 'lucide-react';

const Overview: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold text-white mb-6">How PFN-GMP Works</h1>
        <p className="text-xl text-slate-400">
          We've built a new kind of arithmetic engine that handles multiplication and power operations differently than any existing library. Here's how we achieve those remarkable performance gains.
        </p>
      </div>

      {/* Architecture Diagram */}
      <section className="mb-20">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 md:p-12">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Hybrid Architecture</h2>
          
          <div className="flex flex-col items-center justify-center space-y-4 max-w-2xl mx-auto">
            {/* App Layer */}
            <div className="w-full p-4 bg-slate-800 rounded-lg border border-slate-700 text-center">
              <span className="text-white font-mono font-semibold">Your Application</span>
            </div>
            
            <div className="h-8 w-0.5 bg-slate-600"></div>
            
            {/* API Layer */}
            <div className="w-full p-4 bg-brand-900/20 rounded-lg border border-brand-500/30 text-center relative">
              <span className="text-brand-300 font-mono font-bold">PFN-GMP SDK API</span>
              <div className="absolute -right-4 top-1/2 -translate-y-1/2 translate-x-full hidden md:block">
                <span className="text-xs text-slate-500 ml-2">← Single Interface</span>
              </div>
            </div>

            <div className="h-8 w-0.5 bg-slate-600"></div>

            {/* Router */}
            <div className="w-48 p-2 bg-slate-700 rounded-full text-center text-xs text-slate-300 border border-slate-600">
              Intelligent Router
            </div>

            <div className="flex w-full justify-between gap-4 relative">
              {/* Lines */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-8 border-t border-x border-slate-600 rounded-t-2xl" style={{ width: '60%' }}></div>
              
              {/* PFN Engine */}
              <div className="w-1/2 mt-8 p-6 bg-brand-950/50 rounded-xl border border-brand-500/20 text-center flex flex-col items-center">
                <Cpu className="text-brand-400 mb-3" />
                <h3 className="text-white font-bold mb-2">PFN Engine</h3>
                <p className="text-xs text-slate-400">
                  Multiplication<br/>
                  Power Operations<br/>
                  (Proprietary)
                </p>
              </div>

              {/* GMP Backend */}
              <div className="w-1/2 mt-8 p-6 bg-slate-800/50 rounded-xl border border-slate-700 text-center flex flex-col items-center">
                <Layers className="text-slate-400 mb-3" />
                <h3 className="text-white font-bold mb-2">GMP Backend</h3>
                <p className="text-xs text-slate-400">
                  Addition<br/>
                  Small Numbers<br/>
                  Fallback
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">A Different Approach to Big Numbers</h2>
          <div className="prose prose-invert text-slate-400">
            <p className="mb-4">
              Most arbitrary-precision libraries slow down dramatically as numbers get larger. That's because they represent numbers by their magnitude—and bigger magnitudes mean slower operations.
            </p>
            <p className="mb-4">
              We took a different path. PFN-GMP uses a proprietary representation that keeps multiplication and power operations fast regardless of how large the numbers get. Yes, there's a trade-off: addition is slower. But if you're doing lots of multiplication? The difference is game-changing.
            </p>
            <div className="bg-slate-900 p-4 rounded-lg border-l-4 border-brand-500 mt-6">
              <p className="text-sm text-slate-300 italic">
                "We optimized for the operations that matter most in high-performance computing: multiplication and powers. For workloads dominated by these operations, the speedup is transformative."
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-6">You Don't Need to Know How—Just That It Works</h2>
          <div className="flex items-start gap-4 mb-6">
            <Lock className="text-slate-500 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-white font-semibold">Black-Box by Design</h3>
              <p className="text-slate-400 text-sm">
                Our internal algorithms are proprietary, but that doesn't mean you have to trust us blindly. We provide comprehensive benchmarks and test suites so you can verify every performance claim independently.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-slate-900 rounded border border-slate-800">
              <span className="text-slate-300">Multiplication (Large Chains)</span>
              <span className="text-brand-400 font-mono font-bold">10-1000× Faster</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-900 rounded border border-slate-800">
              <span className="text-slate-300">× 2^k (Any k)</span>
              <span className="text-brand-400 font-mono font-bold">~2.7M× Faster</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-900 rounded border border-slate-800">
              <span className="text-slate-300">Addition</span>
              <span className="text-red-400 font-mono font-bold">Slower (Use GMP)</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Overview;
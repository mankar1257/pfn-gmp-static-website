import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CheckCircle2, XCircle } from 'lucide-react';

const chainData = [
  { ops: '1K', gmp: 0.06, pfn: 5.07 },
  { ops: '10K', gmp: 0.34, pfn: 5.13 },
  { ops: '100K', gmp: 3.12, pfn: 5.15 },
  { ops: '200K', gmp: 6.23, pfn: 5.10 },
  { ops: '500K', gmp: 15.74, pfn: 5.16 },
  { ops: '1M', gmp: 31.50, pfn: 5.17 },
];

const powerData = [
  { name: '2^1000', gmp: 50, pfn: 0.07 },
  { name: '2^10000', gmp: 500, pfn: 0.07 },
  { name: '2^50000', gmp: 193900, pfn: 0.07 },
];

const Performance: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Performance Evidence</h1>
        <p className="text-xl text-slate-400 max-w-3xl">
          Honest benchmarks showing where PFN-GMP excels and where it doesn't. All data is reproducible via our public test suite.
        </p>
      </div>

      {/* Multiplicative Chains */}
      <section className="mb-20" id="benchmarks">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Multiplicative Chain Performance</h2>
            <p className="text-slate-400">Time per operation (μs) vs Chain Length. Lower is better.</p>
          </div>
          <div className="text-right mt-4 md:mt-0">
            <span className="inline-block px-3 py-1 rounded bg-brand-900/30 text-brand-400 text-sm border border-brand-500/20">
              Crossover Point: ~200K Ops
            </span>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chainData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="ops" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" label={{ value: 'Time (μs)', angle: -90, position: 'insideLeft', fill: '#94a3b8' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f1f5f9' }}
                itemStyle={{ color: '#f1f5f9' }}
              />
              <Legend />
              <Line type="monotone" dataKey="gmp" name="Standard GMP (Linear Growth)" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="pfn" name="PFN-GMP (Constant Time)" stroke="#14b8a6" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-4 text-sm text-slate-500">
          * Hardware: Intel Xeon Platinum 8380 @ 2.30GHz. Compiler: GCC 13.2 -O3.
        </p>
      </section>

      {/* Power Operations */}
      <section className="mb-20" id="power-operations">
        <h2 className="text-2xl font-bold text-white mb-6">Power Operations (Log Scale)</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Time Comparison (μs)</h3>
            <div className="space-y-4">
              {powerData.map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between text-sm text-slate-400">
                    <span>Operation: {item.name}</span>
                    <span className="text-brand-400 font-mono">Speedup: {Math.round(item.gmp / item.pfn).toLocaleString()}x</span>
                  </div>
                  <div className="h-8 bg-slate-800 rounded-full overflow-hidden relative">
                    {/* GMP Bar */}
                    <div 
                      className="absolute top-0 left-0 h-full bg-red-500/50" 
                      style={{ width: '100%' }}
                    ></div>
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-white font-mono">
                      GMP: {item.gmp.toLocaleString()} μs
                    </span>
                    
                    {/* PFN Bar - visually exaggerated for visibility because it's so small */}
                    <div 
                      className="absolute top-0 left-0 h-full bg-brand-500" 
                      style={{ width: '2px' }} 
                    ></div>
                     <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-white font-bold drop-shadow-md">
                      PFN: {item.pfn} μs
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col justify-center space-y-6">
            <div className="p-6 bg-slate-900 rounded-lg border border-slate-800">
              <h4 className="text-brand-400 font-bold mb-2">The PFN Advantage</h4>
              <p className="text-slate-300">
                Traditional libraries scale linearly or worse with the exponent size (O(k)). PFN-GMP performs power-of-2 and power-of-10 operations in constant time (O(1)), regardless of the exponent size.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-900 rounded-lg border border-slate-800 text-center">
                <div className="text-3xl font-bold text-white mb-1">2.77M×</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">Max Speedup</div>
              </div>
              <div className="p-4 bg-slate-900 rounded-lg border border-slate-800 text-center">
                <div className="text-3xl font-bold text-white mb-1">70ns</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">Constant Time</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Decision Matrix */}
      <section id="when-not-to-use" className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-8">Decision Matrix: When to Use</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border border-green-900/50 bg-green-900/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle2 className="text-green-500 h-6 w-6" />
              <h3 className="text-xl font-bold text-white">Ideal Workloads</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-slate-300">
                <span className="text-green-500 mt-1">✓</span>
                Pure multiplicative chains (&gt;200K ops)
              </li>
              <li className="flex items-start gap-2 text-slate-300">
                <span className="text-green-500 mt-1">✓</span>
                Heavy power-of-2 or power-of-10 scaling
              </li>
              <li className="flex items-start gap-2 text-slate-300">
                <span className="text-green-500 mt-1">✓</span>
                Decimal scaling & exact arithmetic
              </li>
              <li className="flex items-start gap-2 text-slate-300">
                <span className="text-green-500 mt-1">✓</span>
                Determinism requirements across platforms
              </li>
            </ul>
          </div>

          <div className="border border-red-900/50 bg-red-900/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <XCircle className="text-red-500 h-6 w-6" />
              <h3 className="text-xl font-bold text-white">Not Recommended</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-slate-300">
                <span className="text-red-500 mt-1">×</span>
                Addition-heavy algorithms (Matrix ops)
              </li>
              <li className="flex items-start gap-2 text-slate-300">
                <span className="text-red-500 mt-1">×</span>
                Small numbers (&lt; 256 bits)
              </li>
              <li className="flex items-start gap-2 text-slate-300">
                <span className="text-red-500 mt-1">×</span>
                Short computation chains (&lt; 100K ops)
              </li>
              <li className="flex items-start gap-2 text-slate-300">
                <span className="text-red-500 mt-1">×</span>
                Transcendental functions (Use MPFR)
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Performance;
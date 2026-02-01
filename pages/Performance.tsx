import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, TrendingUp, Zap, Clock, Database } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';

const Performance: React.FC = () => {
  // Chain multiplication data
  const chainMultiplyData = [
    { ops: '10K', pfn: 0.07, gmp: 0.34 },
    { ops: '100K', pfn: 0.07, gmp: 1.12 },
    { ops: '500K', pfn: 0.07, gmp: 3.45 },
    { ops: '1M', pfn: 0.07, gmp: 5.67 },
    { ops: '2M', pfn: 0.07, gmp: 9.88 },
  ];

  // Power operations
  const powerData = [
    { name: '7^10K', pfn: 3, gmp: 2700, speedup: 900 },
    { name: '7^100K', pfn: 3, gmp: 27000, speedup: 9000 },
    { name: '7^1M', pfn: 3, gmp: 2700000, speedup: 899000 },
  ];

  // Speedup comparison
  const speedupData = [
    { name: 'Chain ×', speedup: 141 },
    { name: 'Power', speedup: 899000 },
    { name: 'Scale ×10^n', speedup: 728924 },
    { name: 'Division', speedup: 118 },
  ];

  // Memory comparison
  const memoryData = [
    { name: '10^100', pfn: 415, gmp: 64 },
    { name: '10^1000', pfn: 415, gmp: 432 },
    { name: '10^10000', pfn: 415, gmp: 4160 },
    { name: '10^100000', pfn: 415, gmp: 41552 },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Performance Benchmarks</h1>
          <p className="text-xl text-slate-300">
            Real data. Reproducible results. <span className="text-neon-400 font-semibold">Verified performance.</span>
          </p>
        </div>
      </section>

      {/* Headline Stats */}
      <section className="py-12 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: '141×', label: 'Chain Multiply', icon: TrendingUp },
              { value: '899K×', label: 'Power Ops', icon: Zap },
              { value: '728K×', label: 'Scaling', icon: Clock },
              { value: '118×', label: 'Division', icon: Database },
            ].map((stat, i) => (
              <div key={i} className="bg-slate-700 rounded-xl p-4 text-center border border-slate-600">
                <stat.icon className="h-6 w-6 text-neon-400 mx-auto mb-2" />
                <div className="text-2xl md:text-3xl font-black text-neon-400">{stat.value}</div>
                <div className="text-slate-400 text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Charts */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Chain Multiplication */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Chain Multiplication</h3>
              <p className="text-sm text-slate-500 mb-4">Time per operation (μs) as operation count scales</p>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chainMultiplyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="ops" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                      labelStyle={{ color: '#f1f5f9' }}
                    />
                    <Area type="monotone" dataKey="gmp" stroke="#ef4444" fill="#fecaca" strokeWidth={2} name="GMP" />
                    <Area type="monotone" dataKey="pfn" stroke="#09e65f" fill="#bbffd2" strokeWidth={2} name="PFN" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#09e65f]"></div>
                  <span className="text-sm text-slate-600">PFN (constant)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ef4444]"></div>
                  <span className="text-sm text-slate-600">GMP (grows)</span>
                </div>
              </div>
            </div>

            {/* Speedup Chart */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Speedup vs GMP</h3>
              <p className="text-sm text-slate-500 mb-4">Times faster than GMP (log scale)</p>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={speedupData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis type="number" stroke="#64748b" scale="log" domain={[1, 1000000]} tickFormatter={(v) => v >= 1000 ? `${v/1000}K` : v} />
                    <YAxis dataKey="name" type="category" stroke="#64748b" width={80} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                      formatter={(value: number) => [`${value >= 1000 ? (value/1000).toFixed(0) + 'K' : value}×`, 'Speedup']}
                    />
                    <Bar dataKey="speedup" radius={[0, 4, 4, 0]}>
                      {speedupData.map((_, index) => (
                        <Cell key={index} fill="#09e65f" />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Power Operations */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Power Operations (7^n)</h3>
              <p className="text-sm text-slate-500 mb-4">Time in microseconds (log scale)</p>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={powerData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" stroke="#64748b" />
                    <YAxis stroke="#64748b" scale="log" domain={[1, 10000000]} tickFormatter={(v) => v >= 1000000 ? `${v/1000000}M` : v >= 1000 ? `${v/1000}K` : v} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                      formatter={(value: number) => [`${value >= 1000000 ? (value/1000000).toFixed(1) + 'M' : value >= 1000 ? (value/1000) + 'K' : value} μs`, '']}
                    />
                    <Line type="monotone" dataKey="gmp" stroke="#ef4444" strokeWidth={3} dot={{ fill: '#ef4444', r: 6 }} name="GMP" />
                    <Line type="monotone" dataKey="pfn" stroke="#09e65f" strokeWidth={3} dot={{ fill: '#09e65f', r: 6 }} name="PFN" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#09e65f]"></div>
                  <span className="text-sm text-slate-600">PFN (O(1))</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ef4444]"></div>
                  <span className="text-sm text-slate-600">GMP (O(n))</span>
                </div>
              </div>
            </div>

            {/* Memory Comparison */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Memory Footprint</h3>
              <p className="text-sm text-slate-500 mb-4">Bytes per number by magnitude</p>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={memoryData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                      formatter={(value: number) => [`${value} bytes`, '']}
                    />
                    <Bar dataKey="gmp" name="GMP" fill="#ef4444" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="pfn" name="PFN" fill="#09e65f" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#09e65f]"></div>
                  <span className="text-sm text-slate-600">PFN (fixed 415B)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ef4444]"></div>
                  <span className="text-sm text-slate-600">GMP (grows)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Benchmark Methodology</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
              <h3 className="text-lg font-bold text-neon-400 mb-2">Environment</h3>
              <p className="text-slate-400 text-sm">
                Isolated test environment with controlled CPU affinity and memory allocation. No background processes.
              </p>
            </div>
            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
              <h3 className="text-lg font-bold text-neon-400 mb-2">Measurements</h3>
              <p className="text-slate-400 text-sm">
                High-resolution timers with multiple iterations. Statistical analysis to eliminate outliers.
              </p>
            </div>
            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
              <h3 className="text-lg font-bold text-neon-400 mb-2">Reproducibility</h3>
              <p className="text-slate-400 text-sm">
                All benchmarks are reproducible. We provide benchmark tools with commercial licenses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-neon-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to See These Results Yourself?</h2>
          <p className="text-lg text-slate-800 mb-8">
            Schedule a demo and run benchmarks on your own hardware.
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
              to="/use-cases"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white text-slate-900 font-semibold hover:bg-slate-100 transition-colors"
            >
              Explore Use Cases <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Performance;

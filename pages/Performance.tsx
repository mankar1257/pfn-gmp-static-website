import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Beaker, BarChart3, RotateCw } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const Performance: React.FC = () => {
  const chainMultiplyData = [
    { ops: '10K', pfn: 0.07, gmp: 0.34 },
    { ops: '100K', pfn: 0.07, gmp: 1.12 },
    { ops: '500K', pfn: 0.07, gmp: 3.45 },
    { ops: '1M', pfn: 0.07, gmp: 5.67 },
    { ops: '2M', pfn: 0.07, gmp: 9.88 },
  ];

  const powerData = [
    { name: '7^10K', pfn: 3, gmp: 2700, speedup: 900 },
    { name: '7^100K', pfn: 3, gmp: 27000, speedup: 9000 },
    { name: '7^1M', pfn: 3, gmp: 2700000, speedup: 899000 },
  ];

  const speedupData = [
    { name: 'Chain ×', speedup: 141 },
    { name: 'Power', speedup: 899000 },
    { name: 'Scale ×10^n', speedup: 728924 },
    { name: 'Division', speedup: 118 },
  ];

  const memoryData = [
    { name: '10^100', pfn: 415, gmp: 64 },
    { name: '10^1000', pfn: 415, gmp: 432 },
    { name: '10^10000', pfn: 415, gmp: 4160 },
    { name: '10^100000', pfn: 415, gmp: 41552 },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Header */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-500/[0.07] rounded-full blur-[100px]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-accent-400 tracking-wider uppercase mb-4">Benchmarks</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Performance Data
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Real data. Reproducible results. Every claim verified.
          </p>
        </div>
      </section>

      {/* Headline Stats — clean row, no BentoGrid */}
      <section className="py-4">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-800/50">
            {[
              { value: '141×', label: 'Chain Multiply', sub: 'vs GMP' },
              { value: '899K×', label: 'Power Ops', sub: 'vs GMP' },
              { value: '728K×', label: 'Scaling', sub: 'vs GMP' },
              { value: '118×', label: 'Division', sub: 'vs GMP' },
            ].map((stat, i) => (
              <div key={i} className="bg-slate-950 p-8 text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent-400 mb-1">{stat.value}</div>
                <div className="text-sm font-medium text-white">{stat.label}</div>
                <div className="text-xs text-slate-500 mt-1">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Charts */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-white mb-3">Detailed Comparisons</h2>
            <p className="text-slate-500">PFN vs GMP across every dimension</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Chain Multiplication */}
            <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-800">
              <h3 className="text-lg font-semibold text-white mb-1">Chain Multiplication</h3>
              <p className="text-sm text-slate-500 mb-6">Time per operation (μs) as operation count scales</p>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chainMultiplyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="ops" stroke="#475569" tick={{ fontSize: 12 }} />
                    <YAxis stroke="#475569" tick={{ fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                      labelStyle={{ color: '#f1f5f9' }}
                    />
                    <Area type="monotone" dataKey="gmp" stroke="#ef4444" fill="rgba(239,68,68,0.1)" strokeWidth={2} name="GMP" />
                    <Area type="monotone" dataKey="pfn" stroke="#14b8a6" fill="rgba(20,184,166,0.1)" strokeWidth={2} name="PFN" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#14b8a6]" />
                  <span className="text-xs text-slate-500">PFN (constant)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
                  <span className="text-xs text-slate-500">GMP (grows)</span>
                </div>
              </div>
            </div>

            {/* Speedup Chart */}
            <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-800">
              <h3 className="text-lg font-semibold text-white mb-1">Speedup vs GMP</h3>
              <p className="text-sm text-slate-500 mb-6">Times faster than GMP (log scale)</p>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={speedupData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis type="number" stroke="#475569" scale="log" domain={[1, 1000000]} tickFormatter={(v: number) => v >= 1000 ? `${v / 1000}K` : `${v}`} tick={{ fontSize: 12 }} />
                    <YAxis dataKey="name" type="category" stroke="#475569" width={80} tick={{ fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                      formatter={(value) => [`${Number(value) >= 1000 ? (Number(value) / 1000).toFixed(0) + 'K' : value}×`, 'Speedup']}
                    />
                    <Bar dataKey="speedup" radius={[0, 6, 6, 0]}>
                      {speedupData.map((_, index) => (
                        <Cell key={index} fill="#14b8a6" />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Power Operations */}
            <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-800">
              <h3 className="text-lg font-semibold text-white mb-1">Power Operations (7^n)</h3>
              <p className="text-sm text-slate-500 mb-6">Time in microseconds (log scale)</p>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={powerData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="name" stroke="#475569" tick={{ fontSize: 12 }} />
                    <YAxis stroke="#475569" scale="log" domain={[1, 10000000]} tickFormatter={(v: number) => v >= 1000000 ? `${v / 1000000}M` : v >= 1000 ? `${v / 1000}K` : `${v}`} tick={{ fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                      formatter={(value) => [`${Number(value) >= 1000000 ? (Number(value) / 1000000).toFixed(1) + 'M' : Number(value) >= 1000 ? (Number(value) / 1000) + 'K' : value} μs`, '']}
                    />
                    <Line type="monotone" dataKey="gmp" stroke="#ef4444" strokeWidth={2.5} dot={{ fill: '#ef4444', r: 5 }} name="GMP" />
                    <Line type="monotone" dataKey="pfn" stroke="#14b8a6" strokeWidth={2.5} dot={{ fill: '#14b8a6', r: 5 }} name="PFN" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#14b8a6]" />
                  <span className="text-xs text-slate-500">PFN (O(1))</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
                  <span className="text-xs text-slate-500">GMP (O(n))</span>
                </div>
              </div>
            </div>

            {/* Memory Comparison */}
            <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-800">
              <h3 className="text-lg font-semibold text-white mb-1">Memory Footprint</h3>
              <p className="text-sm text-slate-500 mb-6">Bytes per number by magnitude</p>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={memoryData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="name" stroke="#475569" tick={{ fontSize: 11 }} />
                    <YAxis stroke="#475569" tick={{ fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                      formatter={(value) => [`${value} bytes`, '']}
                    />
                    <Bar dataKey="gmp" name="GMP" fill="#ef4444" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="pfn" name="PFN" fill="#14b8a6" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#14b8a6]" />
                  <span className="text-xs text-slate-500">PFN (fixed 415B)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
                  <span className="text-xs text-slate-500">GMP (grows)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology — clean cards, no BentoGrid */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">Benchmark Methodology</h2>
            <p className="text-slate-500">How we ensure every number is trustworthy</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Beaker,
                title: 'Controlled Environment',
                description: 'Isolated test environment with CPU affinity and controlled memory allocation. No background processes.',
              },
              {
                icon: BarChart3,
                title: 'Statistical Precision',
                description: 'High-resolution timers with multiple iterations. Statistical analysis eliminates outliers.',
              },
              {
                icon: RotateCw,
                title: 'Reproducible Results',
                description: 'All benchmarks are reproducible. Benchmark tools included with commercial licenses.',
              },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center mb-4">
                  <item.icon className="h-5 w-5 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent-500/[0.05] rounded-full blur-[100px]" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Run These Benchmarks Yourself</h2>
          <p className="text-lg text-slate-400 mb-10">
            Schedule a demo and test on your own hardware.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-accent-500 text-slate-900 font-semibold hover:bg-accent-400 transition-all accent-glow"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Schedule Demo
            </Link>
            <Link
              to="/use-cases"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-white/[0.05] text-white font-semibold border border-white/[0.1] hover:bg-white/[0.08] transition-all"
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

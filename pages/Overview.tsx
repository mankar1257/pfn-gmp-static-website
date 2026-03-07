import React from 'react';
import { Zap, Target, Database, Cpu, ArrowRight, Calendar, AlertTriangle, MemoryStick, Binary } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Overview: React.FC = () => {
  const comparisonData = [
    { name: 'Chain ×', pfn: 0.07, gmp: 9.88 },
    { name: 'Division', pfn: 0.89, gmp: 105.02 },
    { name: 'Power', pfn: 0.003, gmp: 2700 },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Header */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-500/[0.07] rounded-full blur-[100px]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-accent-400 tracking-wider uppercase mb-4">Technical Deep Dive</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            How PFN Achieves<br className="hidden sm:block" /> the Impossible
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            A fundamentally different approach to arbitrary-precision arithmetic
          </p>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-12">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-red-500/20" />
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20">
              <Target className="h-4 w-4 text-red-400" />
              <span className="text-sm font-medium text-red-400">The Problem</span>
            </div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-red-500/20" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: AlertTriangle,
                title: 'O(n) Time Complexity',
                description: 'Traditional libraries like GMP scale linearly with number size. Larger numbers mean slower operations — an unavoidable bottleneck.',
              },
              {
                icon: MemoryStick,
                title: 'Unbounded Memory',
                description: 'Dynamic allocation grows with magnitude. Unpredictable resource usage makes capacity planning impossible.',
              },
              {
                icon: Binary,
                title: 'Precision Loss',
                description: 'Floating-point errors compound over chained operations. Results drift further from truth with each step.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="relative p-6 rounded-2xl bg-slate-900/50 border border-slate-800 group hover:border-red-500/20 transition-colors duration-300"
              >
                <div className="absolute top-0 left-6 w-12 h-1 bg-red-500/60 rounded-b-full" />
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center mb-4 mt-2">
                  <item.icon className="h-5 w-5 text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The PFN Solution */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-12">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-accent-500/20" />
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20">
              <Zap className="h-4 w-4 text-accent-400" />
              <span className="text-sm font-medium text-accent-400">The PFN Solution</span>
            </div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-accent-500/20" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Cpu,
                title: 'O(1) Constant Time',
                description: 'Every operation completes in the same time — whether computing 10² or 10¹⁰⁰⁰⁰⁰⁰.',
                stat: '0.07μs',
                statLabel: 'per operation',
              },
              {
                icon: Database,
                title: 'Fixed 415B Memory',
                description: 'Same memory footprint for any number size. No allocation overhead, perfect predictability.',
                stat: '415B',
                statLabel: 'always',
              },
              {
                icon: Zap,
                title: 'Exact Precision',
                description: 'Symbolic representation preserves infinite precision. Zero rounding, zero approximation.',
                stat: '100%',
                statLabel: 'accuracy',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="relative p-6 rounded-2xl bg-slate-900/50 border border-slate-800 group hover:border-accent-500/20 transition-colors duration-300"
              >
                <div className="absolute top-0 left-6 w-12 h-1 bg-accent-500/60 rounded-b-full" />
                <div className="w-10 h-10 rounded-xl bg-accent-500/10 flex items-center justify-center mb-4 mt-2">
                  <item.icon className="h-5 w-5 text-accent-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-4">{item.description}</p>
                <div className="pt-4 border-t border-slate-800/80">
                  <span className="text-2xl font-bold text-accent-400">{item.stat}</span>
                  <span className="text-xs text-slate-500 ml-2">{item.statLabel}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Chart */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">Operation Time Comparison</h2>
            <p className="text-slate-500">Microseconds per operation · lower is better</p>
          </div>

          <div className="bg-slate-900/50 rounded-2xl p-8 border border-slate-800">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="name" stroke="#475569" tick={{ fontSize: 13 }} />
                  <YAxis stroke="#475569" scale="log" domain={[0.001, 10000]} tickFormatter={(v: number) => v >= 1000 ? `${v / 1000}K` : `${v}`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                    labelStyle={{ color: '#f1f5f9' }}
                    formatter={(value) => [`${value} μs`, '']}
                  />
                  <Bar dataKey="gmp" name="GMP" fill="#ef4444" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="pfn" name="PFN" fill="#14b8a6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-8 mt-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#14b8a6]" />
                <span className="text-sm text-slate-500">PFN</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
                <span className="text-sm text-slate-500">GMP</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent-500/[0.05] rounded-full blur-[100px]" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">See the Full Benchmark Data</h2>
          <p className="text-lg text-slate-400 mb-10">
            Detailed performance analysis across all operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/performance"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-accent-500 text-slate-900 font-semibold hover:bg-accent-400 transition-all accent-glow"
            >
              View Benchmarks <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-white/[0.05] text-white font-semibold border border-white/[0.1] hover:bg-white/[0.08] transition-all"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Schedule Demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Overview;

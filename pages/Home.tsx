import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Clock, Database, Cpu, ArrowRight, Calendar, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { BentoGrid, type BentoItem } from '@/components/ui/bento-grid';
import { DottedSurface } from '@/components/ui/dotted-surface';

const Home: React.FC = () => {
  const speedupData = [
    { name: 'Chain ×', pfn: 0.07, gmp: 9.88, speedup: 141 },
    { name: 'Division', pfn: 0.89, gmp: 105.02, speedup: 118 },
    { name: 'Addition', pfn: 0.03, gmp: 2.41, speedup: 80 },
  ];

  const powerData = [
    { ops: '1K', pfn: 3, gmp: 270 },
    { ops: '10K', pfn: 3, gmp: 27000 },
    { ops: '100K', pfn: 3, gmp: 270000 },
    { ops: '1M', pfn: 3, gmp: 2700000 },
  ];

  const pfnFeatures: BentoItem[] = [
    {
      title: 'O(1) Complexity',
      meta: 'Constant Time',
      description:
        'Every operation completes in constant time, regardless of the magnitude of numbers involved. No scaling overhead, ever.',
      icon: <Cpu className="w-4 h-4 text-teal-500" />,
      status: 'Core',
      tags: ['Performance', 'Scalable', 'O(1)'],
      colSpan: 2,
      hasPersistentHover: true,
    },
    {
      title: 'Fixed Memory',
      meta: '415 bytes',
      description:
        'Each number uses exactly 415 bytes. No memory bloat, no allocation overhead, perfect predictability.',
      icon: <Database className="w-4 h-4 text-emerald-500" />,
      status: 'Optimized',
      tags: ['Memory', 'Predictable'],
    },
    {
      title: 'Exact Results',
      meta: 'Zero error',
      description:
        'Symbolic representation preserves infinite precision. No rounding, no approximation, no floating-point errors.',
      icon: <Zap className="w-4 h-4 text-amber-500" />,
      status: 'Verified',
      tags: ['Precision', 'Symbolic'],
      colSpan: 2,
    },
    {
      title: '141× Faster',
      meta: 'vs GMP',
      description:
        'Outperforms GMP across all core operations — multiply, divide, and exponentiation benchmarks.',
      icon: <TrendingUp className="w-4 h-4 text-sky-500" />,
      status: 'Benchmarked',
      tags: ['Speed', 'GMP'],
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero — DottedSurface only covers this section */}
      <section 
        className="relative flex items-center overflow-hidden bg-slate-950"
        style={{ minHeight: 'clamp(500px, 70vh, 800px)' }}
      >
        <DottedSurface />
        <div className="absolute inset-0 bg-slate-950/50" />
        {/* Bottom fade to blend into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent z-[1]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/20 text-accent-400 text-sm font-medium mb-6 border border-accent-500/30">
                <Zap className="h-4 w-4" />
                Null Field Research
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
                Precision Without<br />
                <span className="text-accent-400">Compromise.</span>
              </h1>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-300 mb-8">
                Speed Without <span className="text-accent-400">Limits.</span>
              </h2>
              
              <p className="text-xl text-slate-400 mb-10 max-w-2xl">
                PFN delivers exact arbitrary-precision arithmetic with O(1) time complexity. 
                No approximations. No floating-point errors. Just results.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-accent-500 text-slate-900 font-bold text-lg hover:bg-accent-400 transition-all accent-glow"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Demo
                </Link>
                <Link
                  to="/performance"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white/[0.05] text-white font-bold text-lg border border-white/[0.1] hover:bg-white/[0.08] transition-all"
                >
                  View Benchmarks <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="relative z-10 py-6 bg-slate-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-800/50">
            {[
              { value: '141×', label: 'Faster Multiply', icon: TrendingUp },
              { value: '899K×', label: 'Faster Powers', icon: Zap },
              { value: '0.07μs', label: 'Constant Time', icon: Clock },
              { value: '415B', label: 'Fixed Memory', icon: Database },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-950 p-8 text-center"
              >
                <stat.icon className="h-6 w-6 text-accent-400 mx-auto mb-3" />
                <div className="text-3xl md:text-4xl font-bold text-accent-400">{stat.value}</div>
                <div className="text-slate-500 text-sm mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Charts Section */}
      <section className="relative z-10 py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-white mb-3">Benchmark Results</h2>
            <p className="text-slate-500">Real performance data from independent testing</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Speedup Chart */}
            <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-800">
              <h3 className="text-lg font-semibold text-white mb-4">Operation Speedup vs GMP</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={speedupData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis type="number" stroke="#64748b" />
                    <YAxis dataKey="name" type="category" stroke="#64748b" width={80} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                      labelStyle={{ color: '#f1f5f9' }}
                      itemStyle={{ color: '#2dd4bf' }}
                      formatter={(value) => [`${value}×`, 'Speedup']}
                    />
                    <Bar dataKey="speedup" radius={[0, 4, 4, 0]}>
                      {speedupData.map((_, index) => (
                        <Cell key={index} fill="#14b8a6" />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Power Operations Chart */}
            <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-800">
              <h3 className="text-lg font-semibold text-white mb-4">Power Operation: 7^1,000,000</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={powerData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="ops" stroke="#64748b" />
                    <YAxis stroke="#64748b" scale="log" domain={[1, 10000000]} tickFormatter={(v) => v >= 1000000 ? `${v/1000000}M` : v >= 1000 ? `${v/1000}K` : v} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                      labelStyle={{ color: '#f1f5f9' }}
                      formatter={(value) => [`${Number(value) >= 1000000 ? (Number(value)/1000000).toFixed(1) + 'M' : Number(value) >= 1000 ? (Number(value)/1000) + 'K' : value} μs`, '']}
                    />
                    <Line type="monotone" dataKey="gmp" stroke="#ef4444" strokeWidth={3} dot={{ fill: '#ef4444', r: 5 }} name="GMP" />
                    <Line type="monotone" dataKey="pfn" stroke="#14b8a6" strokeWidth={3} dot={{ fill: '#14b8a6', r: 5 }} name="PFN" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#14b8a6]"></div>
                  <span className="text-sm text-slate-400">PFN (O(1))</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ef4444]"></div>
                  <span className="text-sm text-slate-400">GMP (O(n))</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PFN Engine */}
      <section className="relative z-10 py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-white mb-3">The PFN Engine</h2>
            <p className="text-slate-500">Revolutionary architecture for precision arithmetic</p>
          </div>

          <BentoGrid items={pfnFeatures} />
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent-500/[0.05] rounded-full blur-[100px]" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Transform Your Precision Computing?</h2>
          <p className="text-lg text-slate-400 mb-10">
            See PFN in action with your specific use case.
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

export default Home;

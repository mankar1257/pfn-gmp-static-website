import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Clock, Database, Cpu, ArrowRight, Calendar, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

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

  return (
    <div className="min-h-screen">
      {/* Hero with Background */}
      <section 
        className="relative min-h-[90vh] flex items-center"
        style={{
          backgroundImage: 'url(/3671320.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-slate-900/85"></div>
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
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-slate-800 text-white font-bold text-lg border border-slate-700 hover:bg-slate-700 transition-all"
                >
                  View Benchmarks <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
                className="bg-slate-800 rounded-2xl p-6 text-center border border-slate-700"
              >
                <stat.icon className="h-8 w-8 text-accent-400 mx-auto mb-3" />
                <div className="text-3xl md:text-4xl font-black text-accent-400">{stat.value}</div>
                <div className="text-slate-400 text-sm mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Charts Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Benchmark Results</h2>
            <p className="text-slate-600">Real performance data from independent testing</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Speedup Chart */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Operation Speedup vs GMP</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={speedupData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
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
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Power Operation: 7^1,000,000</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={powerData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="ops" stroke="#64748b" />
                    <YAxis stroke="#64748b" scale="log" domain={[1, 10000000]} tickFormatter={(v) => v >= 1000000 ? `${v/1000000}M` : v >= 1000 ? `${v/1000}K` : v} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                      labelStyle={{ color: '#f1f5f9' }}
                      formatter={(value: number) => [`${value >= 1000000 ? (value/1000000).toFixed(1) + 'M' : value >= 1000 ? (value/1000) + 'K' : value} μs`, '']}
                    />
                    <Line type="monotone" dataKey="gmp" stroke="#ef4444" strokeWidth={3} dot={{ fill: '#ef4444', r: 5 }} name="GMP" />
                    <Line type="monotone" dataKey="pfn" stroke="#14b8a6" strokeWidth={3} dot={{ fill: '#14b8a6', r: 5 }} name="PFN" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#14b8a6]"></div>
                  <span className="text-sm text-slate-600">PFN (O(1))</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ef4444]"></div>
                  <span className="text-sm text-slate-600">GMP (O(n))</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PFN Engine */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">The PFN Engine</h2>
            <p className="text-slate-400">Revolutionary architecture for precision arithmetic</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Cpu,
                title: 'O(1) Complexity',
                description: 'Every operation completes in constant time, regardless of the magnitude of numbers involved.',
              },
              {
                icon: Database,
                title: 'Fixed Memory',
                description: 'Each number uses exactly 415 bytes. No memory bloat, no allocation overhead, perfect predictability.',
              },
              {
                icon: Zap,
                title: 'Exact Results',
                description: 'Symbolic representation preserves infinite precision. No rounding, no approximation, ever.',
              },
            ].map((feature, i) => (
              <div key={i} className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
                <div className="bg-accent-500/20 rounded-xl p-3 w-fit mb-4">
                  <feature.icon className="h-6 w-6 text-accent-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-accent-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">Ready to Transform Your Precision Computing?</h2>
          <p className="text-xl text-slate-800 mb-8">
            See PFN in action with your specific use case.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-slate-900 text-white font-bold text-lg hover:bg-slate-800 transition-all"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Schedule Demo
            </Link>
            <Link
              to="/use-cases"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white text-slate-900 font-bold text-lg hover:bg-slate-100 transition-all"
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

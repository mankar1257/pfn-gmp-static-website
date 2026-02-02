import React from 'react';
import { Zap, Target, Gauge, Database, Cpu, ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Overview: React.FC = () => {
  const comparisonData = [
    { name: 'Chain ×', pfn: 0.07, gmp: 9.88 },
    { name: 'Division', pfn: 0.89, gmp: 105.02 },
    { name: 'Power', pfn: 0.003, gmp: 2700 },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Technical Overview</h1>
          <p className="text-xl text-slate-300">
            How <span className="text-accent-400 font-semibold">PFN</span> achieves the impossible
          </p>
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Problem */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-red-100 rounded-xl p-3">
                  <Target className="h-6 w-6 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">The Problem</h2>
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-red-50 border border-red-100">
                  <h3 className="font-bold text-red-800 mb-1">Traditional Libraries (GMP)</h3>
                  <p className="text-sm text-red-700">O(n) complexity — time grows with number size</p>
                </div>
                <div className="p-4 rounded-xl bg-red-50 border border-red-100">
                  <h3 className="font-bold text-red-800 mb-1">Memory Overhead</h3>
                  <p className="text-sm text-red-700">Dynamic allocation scales with magnitude</p>
                </div>
                <div className="p-4 rounded-xl bg-red-50 border border-red-100">
                  <h3 className="font-bold text-red-800 mb-1">Floating Point</h3>
                  <p className="text-sm text-red-700">Precision loss compounds over operations</p>
                </div>
              </div>
            </div>

            {/* Solution */}
            <div className="bg-slate-900 rounded-2xl p-8 border border-slate-700">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-accent-500/20 rounded-xl p-3">
                  <Zap className="h-6 w-6 text-accent-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">The PFN Solution</h2>
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-800 border border-slate-700">
                  <h3 className="font-bold text-accent-400 mb-1">O(1) Complexity</h3>
                  <p className="text-sm text-slate-300">Constant time regardless of magnitude</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-800 border border-slate-700">
                  <h3 className="font-bold text-accent-400 mb-1">Fixed 415B Memory</h3>
                  <p className="text-sm text-slate-300">Same footprint for any number size</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-800 border border-slate-700">
                  <h3 className="font-bold text-accent-400 mb-1">Exact Precision</h3>
                  <p className="text-sm text-slate-300">Symbolic representation, zero loss</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Chart */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Operation Time Comparison</h2>
            <p className="text-slate-600">Microseconds per operation (lower is better)</p>
          </div>
          
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" stroke="#64748b" />
                  <YAxis stroke="#64748b" scale="log" domain={[0.001, 10000]} tickFormatter={(v) => v >= 1000 ? `${v/1000}K` : v} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                    labelStyle={{ color: '#f1f5f9' }}
                    formatter={(value) => [`${value} μs`, '']}
                  />
                  <Bar dataKey="gmp" name="GMP" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="pfn" name="PFN" fill="#14b8a6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-8 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-[#14b8a6]"></div>
                <span className="text-sm text-slate-600 font-medium">PFN</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-[#ef4444]"></div>
                <span className="text-sm text-slate-600 font-medium">GMP</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">PFN Engine Architecture</h2>
            <p className="text-slate-400">Core capabilities that power exceptional performance</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Cpu, title: 'Constant Time', desc: 'O(1) for all operations' },
              { icon: Database, title: 'Fixed Memory', desc: '415 bytes per number' },
              { icon: Gauge, title: 'Zero Overhead', desc: 'No allocation costs' },
              { icon: Zap, title: 'Exact Results', desc: 'Infinite precision' },
            ].map((item, i) => (
              <div key={i} className="bg-slate-800 rounded-2xl p-6 text-center border border-slate-700">
                <div className="bg-accent-500/20 rounded-xl p-3 w-fit mx-auto mb-4">
                  <item.icon className="h-6 w-6 text-accent-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-accent-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">See the Full Benchmark Data</h2>
          <p className="text-lg text-slate-800 mb-8">
            Detailed performance analysis across all operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/performance"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors"
            >
              View Benchmarks <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white text-slate-900 font-semibold hover:bg-slate-100 transition-colors"
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

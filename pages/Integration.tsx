import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, ArrowRight, Terminal, Package, Settings } from 'lucide-react';

const Integration: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Header */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-500/[0.07] rounded-full blur-[100px]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-accent-400 tracking-wider uppercase mb-4">Developer Guide</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Integration Guide
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Get PFN running in your project in minutes
          </p>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-10">Quick Start</h2>

          <div className="space-y-10">
            {/* Step 1 */}
            <div className="flex gap-5">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-500/10 border border-accent-500/20 flex items-center justify-center mt-0.5">
                <span className="text-sm font-bold text-accent-400">1</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-white mb-2">Request SDK Access</h3>
                <p className="text-sm text-slate-400 mb-3">Contact us to get your license and SDK download.</p>
                <a href="mailto:sarvin@null-field.com" className="text-sm text-accent-400 hover:text-accent-300 font-medium transition-colors">
                  sarvin@null-field.com →
                </a>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-5">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-500/10 border border-accent-500/20 flex items-center justify-center mt-0.5">
                <span className="text-sm font-bold text-accent-400">2</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-white mb-2">Install the Library</h3>
                <p className="text-sm text-slate-400 mb-3">Link the PFN library to your project.</p>
                <div className="bg-slate-950 rounded-xl border border-slate-800 p-5 font-mono text-sm overflow-x-auto">
                  <div className="text-slate-500"># Add to your project</div>
                  <div className="text-accent-400 mt-1">cmake -DPFN_PATH=/path/to/pfn ..</div>
                  <div className="text-accent-400">make</div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-5">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-500/10 border border-accent-500/20 flex items-center justify-center mt-0.5">
                <span className="text-sm font-bold text-accent-400">3</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-white mb-2">Start Using PFN</h3>
                <p className="text-sm text-slate-400 mb-3">Include the header and start computing.</p>
                <div className="bg-slate-950 rounded-xl border border-slate-800 p-5 font-mono text-sm overflow-x-auto">
                  <div className="text-sky-400">#include</div>
                  <div className="text-slate-500 mt-2">{'// Create and multiply — always O(1)'}</div>
                  <div className="text-slate-300 mt-1"><span className="text-sky-400">pfn_t</span> a = <span className="text-accent-400">pfn_from_string</span>(<span className="text-amber-400">"123456789..."</span>);</div>
                  <div className="text-slate-300"><span className="text-sky-400">pfn_t</span> b = <span className="text-accent-400">pfn_mul</span>(a, a);</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Platforms — clean cards, not BentoGrid */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">Supported Platforms</h2>
            <p className="text-slate-500">Pre-built binaries for all major platforms</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Terminal,
                title: 'Linux',
                arch: 'x86_64 & ARM64',
                description: 'Full support for Ubuntu, Debian, RHEL, and Alpine distributions.',
              },
              {
                icon: Package,
                title: 'macOS',
                arch: 'Intel & Apple Silicon',
                description: 'Native support for macOS 11+ on both Intel and Apple Silicon.',
              },
              {
                icon: Settings,
                title: 'Windows',
                arch: 'x86_64',
                description: 'Windows 10+ with MSVC and MinGW toolchain support.',
              },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center mb-4">
                  <item.icon className="h-5 w-5 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                <p className="text-xs text-accent-400 font-medium mb-3">{item.arch}</p>
                <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API Overview */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">API Overview</h2>
            <p className="text-slate-500">Clean, intuitive API for precision arithmetic</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-800">
              <h3 className="text-base font-semibold text-accent-400 mb-5">Core Operations</h3>
              <ul className="space-y-3 font-mono text-sm">
                <li className="text-slate-300"><span className="text-accent-400">pfn_add</span>(a, b) <span className="text-slate-600">—</span> <span className="text-slate-500">Addition</span></li>
                <li className="text-slate-300"><span className="text-accent-400">pfn_sub</span>(a, b) <span className="text-slate-600">—</span> <span className="text-slate-500">Subtraction</span></li>
                <li className="text-slate-300"><span className="text-accent-400">pfn_mul</span>(a, b) <span className="text-slate-600">—</span> <span className="text-slate-500">Multiplication</span></li>
                <li className="text-slate-300"><span className="text-accent-400">pfn_div</span>(a, b) <span className="text-slate-600">—</span> <span className="text-slate-500">Division</span></li>
                <li className="text-slate-300"><span className="text-accent-400">pfn_pow</span>(a, n) <span className="text-slate-600">—</span> <span className="text-slate-500">Power</span></li>
              </ul>
            </div>
            <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-800">
              <h3 className="text-base font-semibold text-accent-400 mb-5">Utilities</h3>
              <ul className="space-y-3 font-mono text-sm">
                <li className="text-slate-300"><span className="text-accent-400">pfn_from_string</span>(s) <span className="text-slate-600">—</span> <span className="text-slate-500">Parse</span></li>
                <li className="text-slate-300"><span className="text-accent-400">pfn_to_string</span>(a) <span className="text-slate-600">—</span> <span className="text-slate-500">Format</span></li>
                <li className="text-slate-300"><span className="text-accent-400">pfn_cmp</span>(a, b) <span className="text-slate-600">—</span> <span className="text-slate-500">Compare</span></li>
                <li className="text-slate-300"><span className="text-accent-400">pfn_scale</span>(a, n) <span className="text-slate-600">—</span> <span className="text-slate-500">Scale by 10^n</span></li>
                <li className="text-slate-300"><span className="text-accent-400">pfn_free</span>(a) <span className="text-slate-600">—</span> <span className="text-slate-500">Cleanup</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Support */}
      <section className="py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4 p-6 rounded-2xl bg-accent-500/[0.05] border border-accent-500/10">
            <div className="w-10 h-10 rounded-xl bg-accent-500/10 flex items-center justify-center flex-shrink-0">
              <BookOpen className="h-5 w-5 text-accent-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">Need Help Integrating?</h3>
              <p className="text-sm text-slate-400 mb-3">
                Commercial licenses include integration support. We'll help you get PFN running optimally.
              </p>
              <Link to="/contact" className="text-sm text-accent-400 hover:text-accent-300 font-medium transition-colors">
                Contact our team →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent-500/[0.05] rounded-full blur-[100px]" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Integrate PFN?</h2>
          <p className="text-lg text-slate-400 mb-10">
            Get started with a demo or request your SDK access.
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
              to="/licensing"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-white/[0.05] text-white font-semibold border border-white/[0.1] hover:bg-white/[0.08] transition-all"
            >
              View Licensing <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Integration;

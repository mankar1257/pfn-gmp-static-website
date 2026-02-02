import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, ArrowRight, Terminal, Package, Settings } from 'lucide-react';

const Integration: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Integration Guide</h1>
          <p className="text-xl text-slate-300">
            Get <span className="text-accent-400 font-semibold">PFN</span> running in your project in minutes
          </p>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Quick Start</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-accent-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-slate-900">1</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 mb-2">Request SDK Access</h3>
                  <p className="text-slate-600 mb-3">Contact us to get your license and SDK download.</p>
                  <a href="mailto:sarvin@null-field.com" className="text-accent-600 hover:text-accent-500 font-medium">
                    sarvin@null-field.com →
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-accent-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-slate-900">2</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 mb-2">Install the Library</h3>
                  <p className="text-slate-600 mb-3">Link the PFN library to your project.</p>
                  <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm text-accent-400">
                    <code># Add to your project<br/>
                    cmake -DPFN_PATH=/path/to/pfn ..<br/>
                    make</code>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-accent-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-slate-900">3</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 mb-2">Start Using PFN</h3>
                  <p className="text-slate-600 mb-3">Include the header and start computing.</p>
                  <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm text-accent-400">
                    <code>#include &lt;pfn.h&gt;<br/><br/>
                    pfn_t a = pfn_from_string("123456789...");<br/>
                    pfn_t b = pfn_mul(a, a);  // O(1) always</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Platforms */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Supported Platforms</h2>
            <p className="text-slate-600">Pre-built binaries for all major platforms</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-center">
              <Terminal className="h-10 w-10 text-accent-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Linux</h3>
              <p className="text-slate-600 text-sm">x86_64 and ARM64</p>
              <p className="text-slate-500 text-xs mt-2">Ubuntu, Debian, RHEL, Alpine</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-center">
              <Package className="h-10 w-10 text-accent-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">macOS</h3>
              <p className="text-slate-600 text-sm">Intel and Apple Silicon</p>
              <p className="text-slate-500 text-xs mt-2">macOS 11+</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-center">
              <Settings className="h-10 w-10 text-accent-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Windows</h3>
              <p className="text-slate-600 text-sm">x86_64</p>
              <p className="text-slate-500 text-xs mt-2">Windows 10+, MSVC & MinGW</p>
            </div>
          </div>
        </div>
      </section>

      {/* API Overview */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">API Overview</h2>
            <p className="text-slate-400">Clean, intuitive API for precision arithmetic</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
              <h3 className="text-lg font-bold text-accent-400 mb-4">Core Operations</h3>
              <ul className="space-y-2 font-mono text-sm">
                <li className="text-slate-300"><span className="text-accent-400">pfn_add</span>(a, b) — Addition</li>
                <li className="text-slate-300"><span className="text-accent-400">pfn_sub</span>(a, b) — Subtraction</li>
                <li className="text-slate-300"><span className="text-accent-400">pfn_mul</span>(a, b) — Multiplication</li>
                <li className="text-slate-300"><span className="text-accent-400">pfn_div</span>(a, b) — Division</li>
                <li className="text-slate-300"><span className="text-accent-400">pfn_pow</span>(a, n) — Power</li>
              </ul>
            </div>
            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
              <h3 className="text-lg font-bold text-accent-400 mb-4">Utilities</h3>
              <ul className="space-y-2 font-mono text-sm">
                <li className="text-slate-300"><span className="text-accent-400">pfn_from_string</span>(s) — Parse</li>
                <li className="text-slate-300"><span className="text-accent-400">pfn_to_string</span>(a) — Format</li>
                <li className="text-slate-300"><span className="text-accent-400">pfn_cmp</span>(a, b) — Compare</li>
                <li className="text-slate-300"><span className="text-accent-400">pfn_scale</span>(a, n) — Scale by 10^n</li>
                <li className="text-slate-300"><span className="text-accent-400">pfn_free</span>(a) — Cleanup</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Support */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="bg-accent-500/20 rounded-xl p-3">
                <BookOpen className="h-6 w-6 text-accent-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Need Help Integrating?</h2>
                <p className="text-slate-600 mb-4">
                  Commercial licenses include integration support. We'll help you get PFN 
                  running optimally in your environment.
                </p>
                <Link to="/contact" className="text-accent-600 hover:text-accent-500 font-medium">
                  Contact our team →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-accent-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to Integrate PFN?</h2>
          <p className="text-lg text-slate-800 mb-8">
            Get started with a demo or request your SDK access.
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
              to="/licensing"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white text-slate-900 font-semibold hover:bg-slate-100 transition-colors"
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

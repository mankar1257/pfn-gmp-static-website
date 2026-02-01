import React from 'react';
import { Link } from 'react-router-dom';
import { Github, ShieldCheck, Terminal } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950/95 border-t border-slate-800/50 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-gradient-to-br from-brand-500 to-accent-600 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-brand-600/20">
                P
              </div>
              <span className="font-bold text-lg text-white">PFN-GMP</span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              High-performance arbitrary-precision arithmetic SDK for enterprise finance, cryptography, and scientific computing.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-brand-400 transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-brand-400 transition-colors">
                <Terminal size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><Link to="/overview" className="hover:text-brand-400 transition-colors">Overview</Link></li>
              <li><Link to="/performance" className="hover:text-brand-400 transition-colors">Performance Data</Link></li>
              <li><Link to="/validation" className="hover:text-brand-400 transition-colors">Validation</Link></li>
              <li><Link to="/use-cases" className="hover:text-brand-400 transition-colors">Use Cases</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><Link to="/integration" className="hover:text-brand-400 transition-colors">Integration Guide</Link></li>
              <li><Link to="/validation" className="hover:text-brand-400 transition-colors">Test Suite</Link></li>
              <li><Link to="/licensing" className="hover:text-brand-400 transition-colors">Licensing</Link></li>
              <li><Link to="/contact" className="hover:text-brand-400 transition-colors">Support</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><a href="#" className="hover:text-brand-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">Export Compliance</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">SLA</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © 2026 PFN-GMP. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-slate-600 text-xs">
            <ShieldCheck size={14} />
            <span>Proprietary Technology. No Algorithm Disclosure.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
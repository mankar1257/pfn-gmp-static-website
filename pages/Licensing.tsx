import React from 'react';
import { Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Licensing: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold text-white mb-6">Licensing & Pricing</h1>
        <p className="text-xl text-slate-400">
          Commercial SDK with transparent licensing. No open-source version available to protect proprietary IP.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {/* Evaluation */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col">
          <h3 className="text-xl font-bold text-white mb-2">Evaluation</h3>
          <div className="text-3xl font-bold text-white mb-6">Free</div>
          <p className="text-slate-400 text-sm mb-8">For technical evaluation and benchmarking.</p>
          
          <ul className="space-y-4 mb-8 flex-grow">
            <li className="flex items-center gap-3 text-sm text-slate-300">
              <Check size={16} className="text-brand-500" /> 90-day duration
            </li>
            <li className="flex items-center gap-3 text-sm text-slate-300">
              <Check size={16} className="text-brand-500" /> Full API Access
            </li>
            <li className="flex items-center gap-3 text-sm text-slate-300">
              <Check size={16} className="text-brand-500" /> Public Test Suite
            </li>
            <li className="flex items-center gap-3 text-sm text-slate-500">
              <X size={16} /> 256-bit limit
            </li>
            <li className="flex items-center gap-3 text-sm text-slate-500">
              <X size={16} /> No redistribution
            </li>
          </ul>
          
          <Link to="/contact" className="w-full py-3 rounded-lg border border-slate-700 text-white font-medium hover:bg-slate-800 transition-colors text-center">
            Request License
          </Link>
        </div>

        {/* Developer */}
        <div className="bg-slate-900 border border-brand-500/30 rounded-2xl p-8 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-brand-500"></div>
          <h3 className="text-xl font-bold text-white mb-2">Developer</h3>
          <div className="text-3xl font-bold text-white mb-6">$5,000<span className="text-sm font-normal text-slate-500">/yr</span></div>
          <p className="text-slate-400 text-sm mb-8">For internal tools, research, and prototyping.</p>
          
          <ul className="space-y-4 mb-8 flex-grow">
            <li className="flex items-center gap-3 text-sm text-slate-300">
              <Check size={16} className="text-brand-500" /> Unlimited Number Size
            </li>
            <li className="flex items-center gap-3 text-sm text-slate-300">
              <Check size={16} className="text-brand-500" /> Full Performance
            </li>
            <li className="flex items-center gap-3 text-sm text-slate-300">
              <Check size={16} className="text-brand-500" /> All Language Bindings
            </li>
            <li className="flex items-center gap-3 text-sm text-slate-300">
              <Check size={16} className="text-brand-500" /> Email Support (72h)
            </li>
            <li className="flex items-center gap-3 text-sm text-slate-500">
              <X size={16} /> No redistribution
            </li>
          </ul>
          
          <Link to="/contact" className="w-full py-3 rounded-lg bg-brand-600 text-white font-medium hover:bg-brand-500 transition-colors text-center shadow-lg shadow-brand-900/20">
            Purchase License
          </Link>
        </div>

        {/* Production */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col">
          <h3 className="text-xl font-bold text-white mb-2">Production</h3>
          <div className="text-3xl font-bold text-white mb-6">$50k+<span className="text-sm font-normal text-slate-500">/yr</span></div>
          <p className="text-slate-400 text-sm mb-8">For mission-critical enterprise deployments.</p>
          
          <ul className="space-y-4 mb-8 flex-grow">
            <li className="flex items-center gap-3 text-sm text-slate-300">
              <Check size={16} className="text-brand-500" /> Custom SLA (24h)
            </li>
            <li className="flex items-center gap-3 text-sm text-slate-300">
              <Check size={16} className="text-brand-500" /> Performance Tuning
            </li>
            <li className="flex items-center gap-3 text-sm text-slate-300">
              <Check size={16} className="text-brand-500" /> Extended Docs (NDA)
            </li>
            <li className="flex items-center gap-3 text-sm text-slate-300">
              <Check size={16} className="text-brand-500" /> Priority Updates
            </li>
            <li className="flex items-center gap-3 text-sm text-slate-300">
              <Check size={16} className="text-brand-500" /> Custom Integration
            </li>
          </ul>
          
          <Link to="/contact" className="w-full py-3 rounded-lg border border-slate-700 text-white font-medium hover:bg-slate-800 transition-colors text-center">
            Contact Sales
          </Link>
        </div>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 text-center">
        <h3 className="text-xl font-bold text-white mb-4">OEM & Redistribution</h3>
        <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
          Building a database, crypto library, or analytics platform? We offer custom OEM licenses allowing binary redistribution of PFN-GMP within your product.
        </p>
        <Link to="/contact" className="text-brand-400 hover:text-brand-300 font-medium">
          Discuss OEM Partnership &rarr;
        </Link>
      </div>
    </div>
  );
};

export default Licensing;
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10 mt-24 bg-black/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 text-sm">
          <div className="md:col-span-5">
            <div className="serif text-lg font-semibold text-white">Null Field Research</div>
            <p className="mt-4 text-muted leading-relaxed max-w-sm">
              Foundational software for next-generation computation. Exact arbitrary-precision arithmetic
              and applied mathematical architecture.
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="eyebrow mb-4">Platform</div>
            <ul className="space-y-2">
              <li><Link to="/pfn" className="text-muted hover:text-white transition-colors">PFN</Link></li>
              <li><Link to="/deox" className="text-muted hover:text-white transition-colors">Project DEOX</Link></li>
              <li><Link to="/writing" className="text-muted hover:text-white transition-colors">Writing</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="eyebrow mb-4">Company</div>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-muted hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="eyebrow mb-4">Correspondence</div>
            <ul className="space-y-2 text-muted">
              <li><a href="mailto:contact@null-field.com" className="hover:text-white transition-colors">contact@null-field.com</a></li>
              <li><a href="mailto:partnership@null-field.com" className="hover:text-white transition-colors">partnership@null-field.com</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-muted">
          <span>© {year} Null Field Research. All rights reserved.</span>
          <span className="text-muted">Chennai · Tamil Nadu · India</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

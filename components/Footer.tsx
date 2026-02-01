import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Mail, MapPin, Calendar } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="bg-neon-500 rounded-lg p-1.5">
                <Zap className="h-5 w-5 text-slate-900" />
              </div>
              <span className="text-xl font-bold text-white">PFN</span>
            </Link>
            <p className="text-slate-400 text-sm">
              Precision Without Compromise.<br />
              Speed Without Limits.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link to="/overview" className="text-slate-400 hover:text-neon-400 text-sm">Overview</Link></li>
              <li><Link to="/performance" className="text-slate-400 hover:text-neon-400 text-sm">Performance</Link></li>
              <li><Link to="/use-cases" className="text-slate-400 hover:text-neon-400 text-sm">Use Cases</Link></li>
              <li><Link to="/validation" className="text-slate-400 hover:text-neon-400 text-sm">Validation</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/integration" className="text-slate-400 hover:text-neon-400 text-sm">Integration</Link></li>
              <li><Link to="/licensing" className="text-slate-400 hover:text-neon-400 text-sm">Licensing</Link></li>
              <li><Link to="/contact" className="text-slate-400 hover:text-neon-400 text-sm">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-slate-400 text-sm">
                <Mail className="h-4 w-4 text-neon-500" />
                <a href="mailto:sarvin@null-field.com" className="hover:text-neon-400">sarvin@null-field.com</a>
              </li>
              <li className="flex items-center gap-2 text-slate-400 text-sm">
                <Calendar className="h-4 w-4 text-neon-500" />
                <a href="mailto:viv@null-field.com" className="hover:text-neon-400">viv@null-field.com</a>
              </li>
              <li className="flex items-start gap-2 text-slate-400 text-sm">
                <MapPin className="h-4 w-4 text-neon-500 mt-0.5" />
                <span>Channi, Tamil Nadu, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © 2026 Null Field Research. All rights reserved.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-4 py-2 rounded-lg bg-neon-500 text-slate-900 font-semibold text-sm hover:bg-neon-400 transition-colors"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Demo
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap, Calendar, Lock } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/overview', label: 'Overview' },
    { to: '/performance', label: 'Performance' },
    { to: '/use-cases', label: 'Use Cases' },
    { to: '/validation', label: 'Validation' },
    { to: '/integration', label: 'Integration' },
    { to: '/licensing', label: 'Licensing' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`border-b sticky top-0 z-50 ${isDashboard ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800'}`}>
      <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${isDashboard ? '' : 'max-w-7xl'}`}>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-accent-500 rounded-lg p-1.5">
              <Zap className="h-5 w-5 text-slate-900" />
            </div>
            <span className={`text-xl font-bold ${isDashboard ? 'text-slate-900' : 'text-white'}`}>PFN</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.to)
                    ? isDashboard
                      ? 'bg-accent-500/10 text-accent-600'
                      : 'bg-accent-500/20 text-accent-400'
                    : isDashboard
                      ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {/* Dashboard tab */}
            <Link
              to="/dashboard"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                isActive('/dashboard')
                  ? isDashboard
                    ? 'bg-sky-100 text-sky-700'
                    : 'bg-sky-500/20 text-sky-400'
                  : isDashboard
                    ? 'text-slate-600 hover:text-sky-700 hover:bg-sky-50'
                    : 'text-slate-300 hover:text-sky-400 hover:bg-slate-800'
              }`}
            >
              <Lock className="h-3 w-3" />
              Dashboard
            </Link>
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-accent-500 text-slate-900 font-semibold text-sm hover:bg-accent-400 transition-colors"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Demo
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-lg ${isDashboard ? 'text-slate-600 hover:bg-slate-100' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className={`lg:hidden border-t ${isDashboard ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 rounded-lg text-sm font-medium ${
                  isActive(link.to)
                    ? isDashboard
                      ? 'bg-accent-500/10 text-accent-600'
                      : 'bg-accent-500/20 text-accent-400'
                    : isDashboard
                      ? 'text-slate-600 hover:bg-slate-100'
                      : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {/* Dashboard tab (mobile) */}
            <Link
              to="/dashboard"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium ${
                isActive('/dashboard')
                  ? isDashboard
                    ? 'bg-sky-100 text-sky-700'
                    : 'bg-sky-500/20 text-sky-400'
                  : isDashboard
                    ? 'text-slate-600 hover:bg-sky-50'
                    : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Lock className="h-3 w-3" />
              Dashboard
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 mt-4 rounded-lg bg-accent-500 text-slate-900 font-semibold text-center"
            >
              Schedule Demo
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

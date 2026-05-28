import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  const links = [
    { to: '/overview', label: 'Research' },
    { to: '/writing', label: 'Writing' },
    { to: '/performance', label: 'Benchmarks' },
    { to: '/use-cases', label: 'Applications' },
    { to: '/validation', label: 'Validation' },
    { to: '/integration', label: 'Integration' },
    { to: '/licensing', label: 'Licensing' },
    { to: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) =>
    path === '/'
      ? location.pathname === '/'
      : location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <nav className={`${isDashboard ? 'bg-white border-b border-slate-200' : 'bg-paper border-b border-hairline'}`}>
      <div className="max-w-page mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16">
          {/* Wordmark */}
          <Link to="/" className="group flex items-baseline gap-2">
            <span className="serif text-lg font-semibold text-ink tracking-tightish">Null Field</span>
            <span className="text-xs uppercase tracking-[0.18em] text-muted">Research</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-7">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`text-sm transition-colors ${
                  isActive(l.to) ? 'text-ink font-medium' : 'text-muted hover:text-ink'
                }`}
              >
                {l.label}
              </Link>
            ))}
            <span className="h-4 w-px bg-hairline" aria-hidden />
            <Link
              to="/dashboard"
              className={`text-sm transition-colors ${
                isActive('/dashboard') ? 'text-ink font-medium' : 'text-muted hover:text-ink'
              }`}
            >
              Dashboard
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="lg:hidden text-muted hover:text-ink text-sm font-medium"
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-hairline bg-paper">
          <div className="max-w-page mx-auto px-6 py-4 space-y-2">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={`block py-1.5 text-sm ${isActive(l.to) ? 'text-ink font-medium' : 'text-muted hover:text-ink'}`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/dashboard"
              onClick={() => setOpen(false)}
              className={`block py-1.5 text-sm ${isActive('/dashboard') ? 'text-ink font-medium' : 'text-muted hover:text-ink'}`}
            >
              Dashboard
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

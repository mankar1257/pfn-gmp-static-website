import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close the mobile menu on Escape and on route change.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  useEffect(() => { setOpen(false); }, [location.pathname]);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/pfn', label: 'PFN' },
    { to: '/deox', label: 'DEOX' },
    { to: '/writing', label: 'Writing' },
  ];

  const isActive = (path: string) =>
    path === '/'
      ? location.pathname === '/'
      : location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/5 transition-all">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16">
          {/* Wordmark */}
          <Link to="/" className="group flex items-baseline gap-2.5">
            <span className="serif text-xl font-semibold text-white">Null Field</span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-muted group-hover:text-brand-500 transition-colors">Research</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-7">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`text-sm tracking-wide transition-colors ${
                  isActive(l.to) ? 'text-brand-500 font-medium' : 'text-muted hover:text-white'
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className={`text-xs font-medium uppercase tracking-widest px-4 py-2 border transition-colors ${
                isActive('/contact')
                  ? 'border-brand-500 text-brand-500'
                  : 'border-white/20 text-white hover:border-brand-500 hover:text-brand-400'
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="lg:hidden text-muted hover:text-white text-sm font-medium uppercase tracking-widest px-3 py-3 -mr-3"
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-white/5 bg-black/95 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 py-4 space-y-2">
            {[...links, { to: '/contact', label: 'Contact' }].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={`block py-2 text-sm uppercase tracking-wider ${isActive(l.to) ? 'text-brand-500 font-medium' : 'text-muted hover:text-white'}`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

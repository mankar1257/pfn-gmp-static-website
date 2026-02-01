import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const NavLink: React.FC<{ to: string; children: React.ReactNode; mobile?: boolean; onClick?: () => void }> = ({ to, children, mobile, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  const baseClasses = "transition-all duration-200 font-semibold text-sm";
  const activeClasses = "text-brand-400 relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-brand-400";
  const inactiveClasses = "text-slate-300 hover:text-white";
  
  const mobileClasses = "block py-3 px-4 text-base border-l-2";
  const mobileActive = "border-brand-500 bg-slate-900/50 text-brand-400";
  const mobileInactive = "border-transparent text-slate-300 hover:bg-slate-900/50 hover:text-white";

  if (mobile) {
    return (
      <Link 
        to={to} 
        className={twMerge(mobileClasses, isActive ? mobileActive : mobileInactive)}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }

  return (
    <Link to={to} className={twMerge(baseClasses, isActive ? activeClasses : inactiveClasses)}>
      {children}
    </Link>
  );
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-slate-800/50 bg-slate-950/95 backdrop-blur-xl shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-accent-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-brand-600/30 group-hover:shadow-brand-500/50 transition-all">
                P
              </div>
              <span className="font-bold text-xl tracking-tight text-white">PFN-GMP</span>
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-6 items-center">
            <NavLink to="/overview">Overview</NavLink>
            <NavLink to="/performance">Performance</NavLink>
            <NavLink to="/use-cases">Use Cases</NavLink>
            <NavLink to="/validation">Validation</NavLink>
            <NavLink to="/integration">Integration</NavLink>
            <NavLink to="/licensing">Licensing</NavLink>
            <Link 
              to="/contact" 
              className="ml-4 px-5 py-2.5 rounded-lg bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-500 hover:to-brand-600 text-white text-sm font-semibold transition-all shadow-lg shadow-brand-600/30 hover:shadow-brand-500/40"
            >
              Get Started
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-300 hover:text-white p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/50">
          <div className="pt-2 pb-4 space-y-1">
            <NavLink to="/" mobile onClick={() => setIsOpen(false)}>Home</NavLink>
            <NavLink to="/overview" mobile onClick={() => setIsOpen(false)}>Overview</NavLink>
            <NavLink to="/performance" mobile onClick={() => setIsOpen(false)}>Performance</NavLink>
            <NavLink to="/use-cases" mobile onClick={() => setIsOpen(false)}>Use Cases</NavLink>
            <NavLink to="/validation" mobile onClick={() => setIsOpen(false)}>Validation</NavLink>
            <NavLink to="/integration" mobile onClick={() => setIsOpen(false)}>Integration</NavLink>
            <NavLink to="/licensing" mobile onClick={() => setIsOpen(false)}>Licensing</NavLink>
            <div className="p-4">
              <Link 
                to="/contact" 
                onClick={() => setIsOpen(false)}
                className="block w-full text-center px-4 py-3 rounded-lg bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-500 hover:to-brand-600 text-white font-semibold shadow-lg"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
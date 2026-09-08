import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import ParallaxImage from '../components/ParallaxImage';

const FADE_UP: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const Home: React.FC = () => {
  return (
    <div className="min-h-screen text-white font-sans">
      
      {/* Brutalist Hero */}
      <section className="relative min-h-screen flex items-center pt-24 overflow-hidden border-b border-white/10">
        {/* Austere Background Grid */}
        <div className="absolute inset-0 z-0">
          {/* High-end Abstract Topography/Satellite Image */}
          <ParallaxImage src="/assets/hero-earth-lights.jpg" mode="hero" className="opacity-60" />
          
          {/* Gradient masking for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black/50"></div>
          
          {/* Technical Grid Overlay */}
          <div className="absolute inset-0 tech-grid opacity-[0.06]" style={{ backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 1) 1px, transparent 1px)', backgroundSize: '100px 100px' }}></div>
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          
          {/* subtle glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/10 rounded-[100%] blur-[120px] pointer-events-none"></div>
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 flex flex-col justify-center">
          <motion.div 
            initial="initial"
            animate="animate"
            transition={{ staggerChildren: 0.1 }}
            className="max-w-6xl"
          >
            <motion.div variants={FADE_UP} className="flex items-center gap-6 mb-12">
               <div className="h-[1px] w-12 bg-white/40"></div>
               <span className="eyebrow text-white/50">Null Field Research</span>
            </motion.div>
            
            <motion.h1 variants={FADE_UP} className="display text-5xl sm:text-6xl md:text-8xl lg:text-[7rem] text-white mb-10">
              Foundational Software <br className="hidden md:block"/>for the Edge.
            </motion.h1>

            <motion.p variants={FADE_UP} className="text-2xl md:text-3xl text-white/40 font-light tracking-wide max-w-4xl mb-16 leading-relaxed">
              Engineering new mathematical and physical architectures for Intelligence, Defence, and Space.
            </motion.p>
            
            <motion.div variants={FADE_UP} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-8">
              <Link to="/deox" className="px-8 py-5 bg-brand-500 text-black font-semibold uppercase tracking-widest text-xs hover:bg-brand-400 transition-colors">
                Explore Project DEOX
              </Link>
              <Link to="/pfn" className="px-8 py-5 bg-transparent border border-white/20 text-white font-semibold uppercase tracking-widest text-xs hover:bg-white/5 transition-colors">
                View Architecture
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* The Thesis */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-40 border-b border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <div className="eyebrow text-white/40">
              01 · Thesis
            </div>
          </div>
          <div className="lg:col-span-8">
            <h2 className="display text-3xl md:text-5xl text-white leading-[1.15]">
              Modern intelligence and mission systems increasingly depend on how information is represented, processed, and understood.
            </h2>
            <div className="mt-12 space-y-8 text-xl text-white/50 font-light leading-relaxed max-w-3xl">
              <p>
                Null Field Research develops new foundations across mathematics, physics, AI, and data to approach difficult computational and real-world problems differently.
              </p>
              <p>
                We do not build incremental improvements on legacy architectures. We rethink computation from the ground up, engineering systems capable of operating at the extreme edges of scale, reliability, and security.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Foundations */}
      <section className="relative z-10 bg-transparent border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-40">
          <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <div className="eyebrow text-white/40 mb-6">
                02 · Capabilities
              </div>
              <h2 className="display text-4xl md:text-6xl text-white">Core Disciplines</h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-24">
            <div className="group border-t border-white/10 pt-8 hover:border-white/40 transition-colors">
              <div className="font-mono text-sm text-brand-500/80 mb-6">01</div>
              <h3 className="serif text-3xl font-semibold text-white mb-6">Mathematics</h3>
              <p className="text-white/50 font-light leading-relaxed text-lg">
                New approaches to representing and operating on information, eliminating classical computational bottlenecks.
              </p>
              <div className="mt-5 font-mono text-[10px] text-white/40 tracking-[0.15em] uppercase">PFN · measured vs GMP 6.3.0</div>
            </div>
            <div className="group border-t border-white/10 pt-8 hover:border-white/40 transition-colors">
              <div className="font-mono text-sm text-brand-500/80 mb-6">02</div>
              <h3 className="serif text-3xl font-semibold text-white mb-6">Physics</h3>
              <p className="text-white/50 font-light leading-relaxed text-lg">
                Physical principles and systems thinking applied to computation, intelligence, and edge environments.
              </p>
              <div className="mt-5 font-mono text-[10px] text-white/40 tracking-[0.15em] uppercase">Single-event fault physics · Project DEOX threat model</div>
            </div>
            <div className="group border-t border-white/10 pt-8 hover:border-white/40 transition-colors">
              <div className="font-mono text-sm text-brand-500/80 mb-6">03</div>
              <h3 className="serif text-3xl font-semibold text-white mb-6">AI</h3>
              <p className="text-white/50 font-light leading-relaxed text-lg">
                Intelligence built on stronger, deterministic computational foundations for zero-trust mission critical systems.
              </p>
              <div className="mt-5 font-mono text-[10px] text-white/40 tracking-[0.15em] uppercase">Gradient-free learning · manuscript complete</div>
            </div>
            <div className="group border-t border-white/10 pt-8 hover:border-white/40 transition-colors">
              <div className="font-mono text-sm text-brand-500/80 mb-6">04</div>
              <h3 className="serif text-3xl font-semibold text-white mb-6">Data</h3>
              <p className="text-white/50 font-light leading-relaxed text-lg">
                Information represented, verified, and processed exactly at massive orbital and terrestrial scale.
              </p>
              <div className="mt-5 font-mono text-[10px] text-white/40 tracking-[0.15em] uppercase">Per-answer certified inference · Project DEOX</div>
            </div>
          </div>
        </div>
      </section>

      {/* What We're Building */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-40">
        <div className="mb-24">
           <div className="eyebrow text-white/40 mb-6">
              03 · Projects
            </div>
          <h2 className="display text-4xl md:text-6xl text-white">What We're Building</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* PFN */}
          <div className="relative border border-white/10 bg-[#030303] p-12 lg:p-16 group overflow-hidden hover:border-white/30 transition-colors duration-500">
            <div aria-hidden="true" className="absolute top-0 right-0 p-8 opacity-10 font-mono text-6xl font-bold tracking-tighter group-hover:opacity-20 transition-opacity">PFN</div>
            <div className="relative z-10 flex flex-col h-full">
              <div className="font-mono text-white/50 text-xs mb-8 uppercase tracking-widest border-b border-white/10 pb-4">Core Technology</div>
              <h3 className="display text-5xl text-white mb-6">PFN</h3>
              <p className="text-2xl text-white/80 font-light mb-8">A new mathematical representation of information.</p>
              <p className="text-white/50 font-light leading-relaxed mb-8 text-lg flex-grow">
                A new arithmetic representation that decouples magnitude from execution cost: operations on arbitrarily large numbers in constant time, exact to the last digit. Chain operations measure up to 141× faster than GMP 6.3.0.
              </p>
              <div className="font-mono text-[10px] text-white/40 tracking-[0.15em] uppercase mb-6">PFN 0.1.0 · measured vs GMP 6.3.0 · Feb 2026</div>
              <Link to="/pfn" className="inline-flex items-center text-white font-medium hover:text-white/70 transition-colors tracking-widest uppercase text-xs border border-white/20 px-8 py-4 w-fit">
                Explore Architecture <span aria-hidden="true" className="ml-3 group-hover:translate-x-2 transition-transform">→</span>
              </Link>
            </div>
          </div>

          {/* DEOX */}
          <div className="relative border border-white/10 bg-[#030303] p-12 lg:p-16 group overflow-hidden hover:border-white/30 transition-colors duration-500">
            <div aria-hidden="true" className="absolute top-0 right-0 p-8 opacity-10 font-mono text-6xl font-bold tracking-tighter group-hover:opacity-20 transition-opacity">DEOX</div>
            <div className="relative z-10 flex flex-col h-full">
              <div className="font-mono text-white/50 text-xs mb-8 uppercase tracking-widest border-b border-white/10 pb-4">Flagship System</div>
              <h3 className="display text-5xl text-white mb-6">DEOX</h3>
              <p className="text-2xl text-white/80 font-light mb-8">Certified compute execution in orbit.</p>
              <p className="text-white/50 font-light leading-relaxed mb-8 text-lg flex-grow">
                By leveraging PFN's exactness, DEOX gives every inference a per-answer, machine-checkable certificate — fault-soundness for orbital and edge missions against silent radiation-induced corruption on commercial hardware.
              </p>
              <div className="font-mono text-[10px] text-white/40 tracking-[0.15em] uppercase mb-6">Simulation · pre-silicon · seeking design partners</div>
              <Link to="/deox" className="inline-flex items-center text-white font-medium hover:text-white/70 transition-colors tracking-widest uppercase text-xs border border-white/20 px-8 py-4 w-fit">
                Explore Platform <span aria-hidden="true" className="ml-3 group-hover:translate-x-2 transition-transform">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default Home;

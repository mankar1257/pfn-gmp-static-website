import React, { Suspense, lazy, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { MotionConfig, motion, useScroll } from 'framer-motion';
import { initSmoothScroll, scrollToTopImmediate } from './lib/smooth-scroll';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AmbientBackground from './components/AmbientBackground';

// Route-level code splitting: only the home page ships in the main bundle.
// Heavy dependencies (recharts on /pfn and the essays, three.js inside the
// Dual Bubble scene) load with the route that needs them.
const Pfn = lazy(() => import('./pages/Pfn'));
const Deox = lazy(() => import('./pages/Deox'));
const Writing = lazy(() => import('./pages/Writing'));
const TheVerticalLie = lazy(() => import('./pages/writing/TheVerticalLie'));
const TheDualBubble = lazy(() => import('./pages/writing/TheDualBubble'));
const Contact = lazy(() => import('./pages/Contact'));

const TITLES: Record<string, string> = {
  '/': 'Null Field Research — Foundational Software for the Edge',
  '/pfn': 'PFN · Exact Arithmetic Architecture — Null Field Research',
  '/deox': 'Project DEOX · Certified Compute in Orbit — Null Field Research',
  '/writing': 'Writing — Null Field Research',
  '/writing/the-vertical-lie': 'The Vertical Lie — Null Field Research',
  '/writing/the-dual-bubble-hypothesis': 'The Dual Bubble Hypothesis — Null Field Research',
  '/contact': 'Contact — Null Field Research',
};

const RouteEffects = () => {
  const { pathname } = useLocation();
  useEffect(() => initSmoothScroll(), []);
  useEffect(() => {
    scrollToTopImmediate();
    document.title = TITLES[pathname] ?? TITLES['/'];
  }, [pathname]);
  return null;
};

/** Thin reading-progress bar under the fixed navbar. */
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2px] bg-brand-500 origin-left z-[60]"
      style={{ scaleX: scrollYProgress }}
    />
  );
};

const NotFound = () => (
  <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
    <p className="eyebrow text-emerald-500">404 · Signal lost</p>
    <h1 className="display mt-6 text-4xl md:text-5xl text-white">This route does not resolve.</h1>
    <p className="mt-4 text-muted max-w-md">
      The page you requested is not part of the current site. It may have moved during the redesign.
    </p>
    <div className="mt-10 flex flex-wrap justify-center gap-4">
      <Link to="/" className="px-6 py-3 bg-brand-500 text-black text-xs font-bold tracking-widest uppercase hover:bg-brand-400 transition-colors">Home</Link>
      <Link to="/contact" className="px-6 py-3 border border-white/20 text-white text-xs font-bold tracking-widest uppercase hover:border-brand-500 hover:text-brand-400 transition-colors">Contact</Link>
    </div>
  </div>
);

const RouteFallback = () => (
  <div className="min-h-[60vh] flex items-center justify-center" role="status" aria-live="polite">
    <span className="eyebrow text-white/40">Loading</span>
  </div>
);

const AppContent: React.FC = () => (
  <div className="min-h-screen flex flex-col text-white selection:bg-brand-500 selection:text-black">
    <AmbientBackground />
    <a href="#main" className="skip-link">Skip to content</a>
    <ScrollProgress />
    <Navbar />
    <main id="main" className="flex-grow">
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pfn" element={<Pfn />} />
          <Route path="/deox" element={<Deox />} />
          <Route path="/writing" element={<Writing />} />
          <Route path="/writing/the-vertical-lie" element={<TheVerticalLie />} />
          <Route path="/writing/the-dual-bubble-hypothesis" element={<TheDualBubble />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </main>
    <Footer />
  </div>
);

const App: React.FC = () => (
  <HashRouter>
    {/* reducedMotion="user" makes framer-motion honour prefers-reduced-motion */}
    <MotionConfig reducedMotion="user">
      <RouteEffects />
      <AppContent />
    </MotionConfig>
  </HashRouter>
);

export default App;

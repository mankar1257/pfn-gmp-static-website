import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Overview from './pages/Overview';
import Performance from './pages/Performance';
import UseCases from './pages/UseCases';
import Validation from './pages/Validation';
import Integration from './pages/Integration';
import Licensing from './pages/Licensing';
import Contact from './pages/Contact';
import Writing from './pages/Writing';
import TheVerticalLie from './pages/writing/TheVerticalLie';
import TheDualBubble from './pages/writing/TheDualBubble';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const AppContent: React.FC = () => (
  <div className="min-h-screen flex flex-col bg-paper text-ink">
    <Navbar />
    <main className="flex-grow">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/performance" element={<Performance />} />
        <Route path="/use-cases" element={<UseCases />} />
        <Route path="/validation" element={<Validation />} />
        <Route path="/integration" element={<Integration />} />
        <Route path="/licensing" element={<Licensing />} />
        <Route path="/writing" element={<Writing />} />
        <Route path="/writing/the-vertical-lie" element={<TheVerticalLie />} />
        <Route path="/writing/the-dual-bubble-hypothesis" element={<TheDualBubble />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </main>
    <Footer />
  </div>
);

const App: React.FC = () => (
  <HashRouter>
    <ScrollToTop />
    <AppContent />
  </HashRouter>
);

export default App;

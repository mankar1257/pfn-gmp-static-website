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
import Dashboard from './pages/Dashboard';
import Writing from './pages/Writing';
import TheVerticalLie from './pages/writing/TheVerticalLie';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <div className={`min-h-screen flex flex-col ${isDashboard ? 'bg-slate-100 text-slate-900' : 'bg-paper text-ink'}`}>
      <Navbar />
      <main className={isDashboard ? 'flex-grow' : 'flex-grow'}>
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
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
      {!isDashboard && <Footer />}
    </div>
  );
};

const App: React.FC = () => (
  <HashRouter>
    <ScrollToTop />
    <AppContent />
  </HashRouter>
);

export default App;

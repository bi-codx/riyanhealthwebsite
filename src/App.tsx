/* RIYAN HEALTH LANDING 5/src/App.tsx */
import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { Teams } from './components/Teams';
import { AboutUs } from './components/AboutUs';
import { Partners } from './components/Partners';
import { ContactUs } from './components/ContactUs';
import { InvestorsPartners } from './components/InvestorsPartners';
import { Blog } from './components/Blog';
import { Footer } from './components/Footer'; // Import the new footer
import { Toaster } from 'sonner@2.0.3';

export default function App() {
  const [currentPage, setCurrentPage] = useState('/');

  useEffect(() => {
    // Handle custom navigation events
    const handleNavigation = (e: CustomEvent) => {
      setCurrentPage(e.detail);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('navigate', handleNavigation as EventListener);
    return () => window.removeEventListener('navigate', handleNavigation as EventListener);
  }, []);

  // Handle browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update URL without reload
  useEffect(() => {
    if (currentPage !== window.location.pathname) {
      window.history.pushState({}, '', currentPage);
    }
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case '/teams':
        return <Teams />;
      case '/about':
        return <AboutUs />;
      case '/partners':
        return <Partners />;
      case '/investors':
        return <InvestorsPartners />;
      case '/blog':
        return <Blog />;
      case '/contact':
        return <ContactUs />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--riyan-bg-dark)' }}>
      <Header />
      {renderPage()}
      <Footer /> {/* Add the new footer here */}
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'var(--riyan-card-dark)',
            color: 'var(--riyan-text-primary)',
            border: '1px solid rgba(var(--riyan-text-primary-rgb), 0.1)',
            fontFamily: 'Inter, sans-serif'
          }
        }}
      />
    </div>
  );
}
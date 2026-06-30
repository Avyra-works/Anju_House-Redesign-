import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Layout & UI
import Layout from './components/layout/Layout';
import LoadingScreen from './components/ui/LoadingScreen';

// Pages
import Home from './pages/Home';
import Menu from './pages/Menu';
import Reservations from './pages/Reservations';
import BookingConfirmed from './pages/BookingConfirmed';
import Gallery from './pages/Gallery';
import GameNights from './pages/GameNights';
import VisitUs from './pages/VisitUs';
import NotFound from './pages/NotFound';

// Scroll to top helper on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        {isLoading ? (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        ) : (
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="menu" element={<Menu />} />
              <Route path="reservations" element={<Reservations />} />
              <Route path="booking-confirmed" element={<BookingConfirmed />} />
              <Route path="gallery" element={<Gallery />} />
              <Route path="game-nights" element={<GameNights />} />
              <Route path="visit-us" element={<VisitUs />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        )}
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;

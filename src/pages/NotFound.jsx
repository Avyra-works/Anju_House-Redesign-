import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Home, UtensilsCrossed, CalendarRange, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/ui/SEO';

const NotFound = () => {
  const navigate = useNavigate();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 15;
      const y = (e.clientY / window.innerHeight - 0.5) * 15;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <SEO title="404 - Something Went Off-Menu" description="The page you are looking for has been tucked away. Let us guide you back to the warmth of our kitchen." />

      <main className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 cinematic-vignette z-10 bg-gradient-to-b from-background/40 to-background/80"></div>
          <div 
            className="w-full h-full bg-cover bg-center transition-transform duration-100 ease-out" 
            style={{ 
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAkHUBJWp8Io0PWZFmywu_ZXzcf_9aRQ7hynxilqp723GQjuMvZujHkKTPtAuKizvG1RH3bLbCkxq_mKPu5oqiBT9e7DnHAP9qCPMPbLph2niUqqhKSXz1dZgrWZpOnaCsncJZgDsDQ9GRc5QmuE9HUq5H1sawQgCelQ9-FliSEhy5VOt-jGhiCToWjgEXCp2so0tW6O5HRjzZwU5e0QxjTARRa9JvYlSATQqz8_q0yh90ey5tiYqKcTgPrdSlei1pcUs3XKck4GH05')`,
              transform: `scale(1.1) translate(${mousePos.x}px, ${mousePos.y}px)`
            }}
          ></div>
        </div>

        {/* 404 Content Canvas */}
        <section className="relative z-20 flex flex-col items-center text-center px-margin-mobile md:px-0 max-w-3xl">
          <div className="mb-stack-md space-y-4">
            <span className="font-label-caps text-label-caps uppercase tracking-[0.3em] text-secondary opacity-80 block text-xs">
              Error 404
            </span>
            <h1 className="font-display-lg text-4xl md:text-6xl text-on-surface leading-tight">
              Something Went <br className="hidden md:block" /> <span className="italic text-secondary font-headline-lg">Off-Menu.</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant/80 max-w-xl mx-auto mt-6 text-sm md:text-base">
              The page you are looking for has been tucked away. Let us guide you back to the warmth of our kitchen.
            </p>
          </div>

          {/* Helpful Navigation Bento */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-2xl px-4 md:px-0">
            {/* Home Link */}
            <Link 
              to="/" 
              className="glass-card group p-8 rounded-xl flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 hover:bg-surface-container-high"
            >
              <Home className="text-secondary mb-4 group-hover:scale-110 transition-transform duration-500" size={32} />
              <span className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface text-xs">Home</span>
            </Link>

            {/* Menu Link */}
            <Link 
              to="/menu" 
              className="glass-card group p-8 rounded-xl flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 hover:bg-surface-container-high"
            >
              <UtensilsCrossed className="text-secondary mb-4 group-hover:scale-110 transition-transform duration-500" size={32} />
              <span className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface text-xs">Menu</span>
            </Link>

            {/* Reservations Link */}
            <Link 
              to="/reservations" 
              className="glass-card group p-8 rounded-xl flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 hover:bg-surface-container-high"
            >
              <CalendarRange className="text-secondary mb-4 group-hover:scale-110 transition-transform duration-500" size={32} />
              <span className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface text-xs">Book Now</span>
            </Link>
          </div>

          {/* Secondary Action */}
          <div className="mt-stack-md pt-6">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-3 text-on-surface-variant hover:text-secondary transition-colors duration-300 group cursor-pointer"
            >
              <ArrowLeft className="group-hover:-translate-x-1 transition-transform" size={16} />
              <span className="font-label-caps text-label-caps uppercase tracking-widest text-xs">Go Back</span>
            </button>
          </div>
        </section>

        {/* Decorative Corner Accents */}
        <div className="fixed bottom-12 left-12 z-30 hidden md:block">
          <p className="font-label-caps text-label-caps text-on-surface-variant/40 vertical-text origin-bottom-left rotate-[-90deg] uppercase tracking-[0.5em] text-xs">
            REFINED HEAT
          </p>
        </div>
        <div className="fixed bottom-12 right-12 z-30 hidden md:block">
          <p className="font-label-caps text-label-caps text-on-surface-variant/40 uppercase tracking-[0.2em] text-xs">
            © {new Date().getFullYear()} ANJU HOUSE
          </p>
        </div>
      </main>
    </>
  );
};

export default NotFound;

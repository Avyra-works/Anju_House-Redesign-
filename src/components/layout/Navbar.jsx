import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logoLight from '../../assets/logo-light.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Menu', path: '/menu' },
    { name: 'Reservations', path: '/reservations' },
    { name: 'Game Nights', path: '/game-nights' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Visit Us', path: '/visit-us' }
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/10 shadow-sm transition-all duration-500 ease-in-out ${
        isScrolled ? 'py-4 bg-surface/95' : 'py-6'
      }`}
    >
      <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-1 max-w-container-max mx-auto">
        <Link
          to="/"
          className="hover:scale-105 transition-transform duration-200 flex items-center"
        >
          <img src={logoLight} alt="Anju House Logo" className="h-8 md:h-10 w-auto object-contain" />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-12">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `font-label-caps text-label-caps uppercase tracking-widest transition-colors duration-300 pb-1 border-b ${
                  isActive
                    ? 'text-secondary border-secondary'
                    : 'text-on-surface hover:text-secondary border-transparent'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:block">
          <Link
            to="/reservations"
            className="bg-secondary text-on-secondary px-8 py-3 rounded-full font-label-caps text-label-caps uppercase tracking-widest hover:scale-105 transition-transform duration-200 inline-block"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          className="md:hidden text-on-surface focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden w-full bg-surface border-b border-outline-variant/10 overflow-hidden"
          >
            <div className="flex flex-col space-y-6 px-margin-mobile py-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `font-label-caps text-label-caps uppercase tracking-widest transition-colors duration-300 pb-1 border-b max-w-max ${
                      isActive
                        ? 'text-secondary border-secondary'
                        : 'text-on-surface hover:text-secondary border-transparent'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              <Link
                to="/reservations"
                className="bg-secondary text-on-secondary text-center px-8 py-3 rounded-full font-label-caps text-label-caps uppercase tracking-widest hover:scale-105 transition-transform duration-200 w-full"
              >
                Book Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

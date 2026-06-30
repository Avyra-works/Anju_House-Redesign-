import React, { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logoLight from '../../assets/logo-light.png';

const LoadingScreen = ({ onComplete }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Simulate loading for 2.5 seconds
    const timer = setTimeout(() => {
      setVisible(false);
      if (onComplete) {
        setTimeout(onComplete, 500); // Allow exit animation to play
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.main 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-surface overflow-hidden w-screen h-screen select-none"
        >
          {/* Subtle Radial Gradient Glow Overlay */}
          <div className="glow-overlay absolute inset-0 pointer-events-none"></div>

          {/* Background Cinematic Image (Low Opacity) */}
          <motion.div 
            initial={{ opacity: 0.2, scale: 1.05 }}
            animate={{ opacity: 0.35, scale: 1 }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            className="absolute inset-0 z-0"
          >
            <div 
              className="bg-cover bg-center w-full h-full grayscale" 
              style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBxwjIbrZT9FxM-57HXcMIqf8GbeyhUj9KcHFxR9A7aLHalKfSm6CZLRjV9zjfDUXsH6qVyQHwwCQNtHhDXXQ8rue9GU3MeZk1DRG-MuZ2zavs0CH0Kdj-iT0bbiG-b0NayZA4DOr8FsWa65zvqLR254TrZ9rsBPDyjcJrB4TbwelYonubtJHdNDi66-l0gfvJXkPtjy7A96_acoBSIAtd4wk2VDXlUkaSry62QHw1wgcdwqqGmxJdMbMTjrQjWxdVc1GBf9jCary8-')` }}
            ></div>
          </motion.div>

          {/* Center Branding Content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Branding Wordmark */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            >
              <img src={logoLight} alt="Anju House Logo" className="h-28 md:h-36 w-auto object-contain" />
            </motion.div>

            {/* Supporting Tagline */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
              className="mt-4"
            >
              <span className="font-label-caps text-label-caps uppercase tracking-[0.4em] text-secondary/65 text-xs">
                Refined Heat
              </span>
            </motion.div>

            {/* Loading Indicator */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 1, ease: "easeOut" }}
              className="mt-stack-md flex flex-col items-center"
            >
              <div className="w-16 h-[1px] bg-outline-variant/30 relative overflow-hidden">
                <motion.div 
                  initial={{ left: "-100%" }}
                  animate={{ left: "100%" }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  className="absolute inset-y-0 w-1/2 bg-secondary"
                ></motion.div>
              </div>
              <p className="mt-4 font-label-caps text-[10px] text-on-surface-variant/50 tracking-widest uppercase">
                Preparing the Hearth
              </p>
            </motion.div>
          </div>

          {/* Bottom Status/Identity Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.2, ease: "easeOut" }}
            className="absolute bottom-10 left-margin-mobile md:left-margin-desktop right-margin-mobile md:right-margin-desktop flex justify-between items-center z-20 w-[calc(100%-2*theme(spacing.margin-mobile))] md:w-[calc(100%-2*theme(spacing.margin-desktop))]"
          >
            <div className="flex items-center gap-2">
              <MapPin size={12} className="text-secondary" />
              <span className="font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant">Los Angeles, CA</span>
            </div>
            <div>
              <span className="font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant">© {new Date().getFullYear()}</span>
            </div>
          </motion.div>
        </motion.main>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;

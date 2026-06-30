import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight } from 'lucide-react';
import logoLight from '../../assets/logo-light.png';

const Footer = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for subscribing to our newsletter!');
  };

  return (
    <footer className="bg-surface-container-lowest w-full pt-stack-xl pb-stack-md border-t border-outline-variant/10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        {/* Column 1: Branding & Intro */}
        <div className="md:col-span-1">
          <div className="mb-6 flex justify-start">
            <img src={logoLight} alt="Anju House Logo" className="h-16 md:h-20 w-auto object-contain" />
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant pr-8">
            Bringing the heart of Seoul's nightlife to the streets of Los Angeles. Refined heat in every bite.
          </p>
          <div className="flex gap-6 mt-12 text-on-surface-variant">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors" aria-label="Instagram">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors" aria-label="Facebook">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="mailto:info@anjuhouse.com" className="hover:text-secondary transition-colors" aria-label="Email">
              <Mail size={20} />
            </a>
          </div>
        </div>

        {/* Column 2: Visit Us */}
        <div>
          <h4 className="font-label-caps text-label-caps text-on-surface uppercase tracking-[0.2em] mb-8">Visit Us</h4>
          <div className="space-y-4 font-body-md text-on-surface-variant">
            <p>
              888 K-Town Way
              <br />
              Los Angeles, CA 90005
            </p>
            <p>(213) 555-ANJU</p>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:underline inline-block"
            >
              Get Directions
            </a>
          </div>
        </div>

        {/* Column 3: Hours */}
        <div>
          <h4 className="font-label-caps text-label-caps text-on-surface uppercase tracking-[0.2em] mb-8">Hours</h4>
          <div className="space-y-4 font-body-md text-on-surface-variant">
            <p>
              <span className="text-on-surface">Mon–Thu:</span> 4PM – 12AM
            </p>
            <p>
              <span className="text-on-surface">Fri–Sat:</span> 12PM – 2AM
            </p>
            <p>
              <span className="text-on-surface">Sun:</span> 12PM – 11PM
            </p>
            <p className="text-secondary italic">Kitchen closes 1hr before bar</p>
          </div>
        </div>

        {/* Column 4: Newsletter */}
        <div>
          <h4 className="font-label-caps text-label-caps text-on-surface uppercase tracking-[0.2em] mb-8">Newsletter</h4>
          <p className="font-body-md text-on-surface-variant mb-6">
            Join the inner circle for secret menu items and game night alerts.
          </p>
          <form className="relative" onSubmit={handleSubmit}>
            <input
              type="email"
              required
              className="w-full bg-surface-container border border-outline-variant/30 rounded-full px-6 py-4 pr-14 focus:ring-secondary focus:border-secondary focus:outline-none transition-all text-on-surface placeholder:text-on-surface-variant/50"
              placeholder="Email Address"
            />
            <button
              className="absolute right-2 top-2 bg-secondary text-on-secondary p-2.5 rounded-full hover:scale-105 transition-transform flex items-center justify-center cursor-pointer"
              type="submit"
              aria-label="Subscribe"
            >
              <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-stack-md px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto pt-8 border-t border-outline-variant/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="space-y-2 text-center md:text-left">
          <p className="font-body-md text-on-surface-variant text-sm">
            © {new Date().getFullYear()} ANJU HOUSE. REFINED HEAT.
          </p>
          <p className="text-xs text-on-surface-variant/40 font-body-md leading-relaxed max-w-md">
            Concept website redesign by Avyra. This project is an independent UI/UX redesign created for portfolio purposes and is not affiliated with or endorsed by Anju House.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          <Link to="/visit-us" className="font-body-md text-sm text-on-surface-variant hover:text-secondary">
            Business Hours
          </Link>
          <Link to="/visit-us" className="font-body-md text-sm text-on-surface-variant hover:text-secondary">
            Valet &amp; Parking
          </Link>
          <Link to="/" className="font-body-md text-sm text-on-surface-variant hover:text-secondary">
            Privacy Policy
          </Link>
          <Link to="/" className="font-body-md text-sm text-on-surface-variant hover:text-secondary">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

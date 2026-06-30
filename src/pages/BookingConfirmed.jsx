import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Calendar, Layers, MapPin, ParkingCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/ui/SEO';

const BookingConfirmed = () => {
  const location = useLocation();
  const booking = location.state || {
    fullName: "John Doe",
    email: "john@example.com",
    date: "2026-07-04",
    time: "7:15 PM",
    guests: "2",
    seat: "indoor"
  };

  // Helper to format date
  const formatDate = (dateStr) => {
    try {
      const options = { weekday: 'long', month: 'short', day: 'numeric' };
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', options);
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <>
      <SEO title="Booking Confirmed" description="Thank you for booking! Your reservation is confirmed at ANJU HOUSE." />

      <main className="relative min-h-screen pt-24">
        {/* Hero Confirmation Section */}
        <section className="relative h-[600px] md:h-[716px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div 
              className="w-full h-full bg-cover bg-center opacity-40 scale-105" 
              style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBhnt6GqA-bI8wPPd0bM62UdkKYWlkau1tnYQsOdF9be5frj3wf0sxJ3AxrbN6OAOmIMe0NYUlwi5MTm6UfzFAjyS_Mdrh2VnLHeglIr2eECxGD8QCTNIKLe5CbWSizbgpRVoqcr7IRwKrL5hloau-i8FUpeuTzBjZHFyNew9QxBoT2Xtn7EYd_v8872R6siYkdso4OQB_Nugf2iXF1eeTNb_H8yStLbB955kOYTM6n5vYDwqrQY9DtU_b6Vh2FOjalzJP-no_L0qtt')` }}
            ></div>
            <div className="absolute inset-0 hero-gradient"></div>
          </div>
          <div className="relative z-10 text-center max-w-3xl px-margin-mobile md:px-0">
            <motion.span 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-label-caps text-label-caps uppercase tracking-[0.3em] text-secondary mb-6 block"
            >
              Reservation Confirmed
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-display-lg text-4xl md:text-display-lg text-on-surface mb-8"
            >
              Your Table is Ready.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mx-auto italic"
            >
              We look forward to welcoming you, {booking.fullName}. A confirmation email has been sent to {booking.email} with your arrival details.
            </motion.p>
          </div>
        </section>

        {/* Booking Details & Summary */}
        <section className="relative z-20 -mt-32 pb-stack-xl px-margin-mobile md:px-margin-desktop">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Details Card */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="lg:col-span-7 glass-panel rounded-xl p-8 md:p-12 shadow-2xl"
              >
                <div className="flex flex-col space-y-12">
                  <div className="flex items-center justify-between border-b border-outline-variant/20 pb-8">
                    <h2 className="font-headline-md text-headline-md text-secondary">Summary</h2>
                    <span className="bg-secondary/10 text-secondary px-4 py-1 rounded-full text-xs font-label-caps uppercase tracking-widest border border-secondary/20">Ref #AJ-8821</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-2">
                      <span className="font-label-caps text-label-caps uppercase text-on-surface-variant opacity-60">Date</span>
                      <p className="font-headline-md text-[24px] text-on-surface">{formatDate(booking.date)}</p>
                    </div>
                    <div className="space-y-2">
                      <span className="font-label-caps text-label-caps uppercase text-on-surface-variant opacity-60">Time</span>
                      <p className="font-headline-md text-[24px] text-on-surface">{booking.time}</p>
                    </div>
                    <div className="space-y-2">
                      <span className="font-label-caps text-label-caps uppercase text-on-surface-variant opacity-60">Guests</span>
                      <p className="font-headline-md text-[24px] text-on-surface">{booking.guests} Persons</p>
                    </div>
                  </div>
                  
                  <div className="pt-8 border-t border-outline-variant/20 space-y-6">
                    <h3 className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant">Manage Your Visit</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button className="flex items-center justify-center space-x-3 bg-surface-container-high hover:bg-surface-container-highest border border-outline-variant/30 py-4 rounded-lg transition-all duration-300 group cursor-pointer">
                        <Calendar className="text-secondary group-hover:scale-110 transition-transform" size={18} />
                        <span className="font-label-caps text-label-caps uppercase">Add to Google Calendar</span>
                      </button>
                      <button className="flex items-center justify-center space-x-3 bg-surface-container-high hover:bg-surface-container-highest border border-outline-variant/30 py-4 rounded-lg transition-all duration-300 group cursor-pointer">
                        <Layers className="text-secondary group-hover:scale-110 transition-transform" size={18} />
                        <span className="font-label-caps text-label-caps uppercase">Apple Calendar</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Map & Directions Card */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="lg:col-span-5 h-full flex flex-col"
              >
                <div className="glass-panel rounded-xl overflow-hidden h-full flex flex-col justify-between">
                  <div className="h-64 md:h-80 w-full relative bg-black/10">
                    <img 
                      className="w-full h-full object-cover" 
                      alt="Arts District map" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCf8xSxgAtMu9kK8UIgP5W4-t57lIwq1VnYMEGqovDm1MVWhWv_61ppwWrrxyoZvetr-t6nijlOkRv2CpS-D0V_Jvp7JDoap23vcaMk8pLoAywexM_YasCRWyAtSMkW60q-2kaan6HBKFi5RPEck5JE74IRBT58PmdvBitOQqkBg3S80yz7c6dodtqcXC_XVHnlldzzWJbATqWCYFbAp4LYqBjQsQIHw3yLEGTsB09VCzv99FNTMCwoObbPGvnPAE2YZ0ZED4cRj5KQ" 
                      loading="lazy" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="bg-secondary text-on-secondary px-3 py-1 rounded-lg text-[10px] font-label-caps uppercase tracking-widest">Arts District, LA</span>
                    </div>
                  </div>
                  
                  <div className="p-8 flex-grow flex flex-col justify-between">
                    <div className="space-y-4">
                      <h3 className="font-headline-md text-2xl text-on-surface">Find Your Way</h3>
                      <p className="text-on-surface-variant font-body-md leading-relaxed text-sm md:text-base">
                        888 K-Town Way,<br />
                        Los Angeles, CA 90005
                      </p>
                      <div className="flex items-center space-x-2 text-tertiary">
                        <ParkingCircle size={16} />
                        <span className="text-xs font-label-caps uppercase tracking-wider">Valet Parking Available</span>
                      </div>
                    </div>
                    
                    <a 
                      href="https://maps.google.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-8 block text-center border border-secondary text-secondary hover:bg-secondary hover:text-on-secondary transition-all duration-500 py-4 rounded-lg font-label-caps text-label-caps uppercase tracking-widest"
                    >
                      Get Directions
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Final Message / CTA */}
        <section className="py-stack-xl bg-surface-container-lowest text-center px-margin-mobile">
          <div className="max-w-2xl mx-auto space-y-12">
            <div className="relative inline-block">
              <CheckCircle2 className="text-secondary text-6xl opacity-40 mx-auto" size={56} />
              <div className="absolute -inset-4 border border-secondary/20 rounded-full animate-pulse"></div>
            </div>
            <h2 className="font-headline-lg text-3xl md:text-headline-lg text-on-surface">Refined Heat Awaits.</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant text-sm md:text-base">
              Should your plans change, please notify us at least 24 hours in advance. For parties larger than 6, please contact our hospitality team directly.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-4">
              <Link to="/reservations" className="text-on-surface font-label-caps text-label-caps uppercase border-b border-outline-variant hover:border-secondary transition-colors pb-1">Modify Booking</Link>
              <Link to="/menu" className="text-on-surface font-label-caps text-label-caps uppercase border-b border-outline-variant hover:border-secondary transition-colors pb-1">View the Menu</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default BookingConfirmed;

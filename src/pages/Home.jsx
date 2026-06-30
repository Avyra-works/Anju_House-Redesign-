import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Beer, Snowflake } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/ui/SEO';

// Import local assets
import beerGarden1 from '../assets/beer-garden-1.jpg';
import beerGarden2 from '../assets/beer-garden-2.jpg';
import shelvesDecor from '../assets/shelves-decor.jpg';
import steakPlatter from '../assets/steak-platter.jpg';
import sportsViewing from '../assets/sports-viewing.jpg';

const Home = () => {
  // SEO structured restaurant schema
  const restaurantSchema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Anju House",
    "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuD6ZPPkf1L5HPUDsY5SJiVGA90NXWZrJS3s1ZNhPc59r-dkopXPnCsKkaNbaOe7m901AVJEdGnMY78IpdBccC74syvK8XZw0Zm3gDa10yqXMWRTkke3GZ-pkqPzDxLAwapaVkDO7ye3jlp6-IXTDu_mJcmL_HMSszPiPPxRAAc7QL_Awits-lUm_xE1p4fxMRsjDpddOaWUDsYKYEZz7Qv9D0sePksg4kN6SwoArYwXYP79Ukp015rKxkDkATS9tTOT8xXGJWWf7To1",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "888 K-Town Way",
      "addressLocality": "Los Angeles",
      "addressRegion": "CA",
      "postalCode": "90005",
      "addressCountry": "US"
    },
    "telephone": "+12135552658",
    "priceRange": "$$",
    "servesCuisine": "Korean, Fusion, Comfort Food",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday"],
        "opens": "16:00",
        "closes": "00:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Friday", "Saturday"],
        "opens": "12:00",
        "closes": "02:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Sunday"],
        "opens": "12:00",
        "closes": "23:00"
      }
    ]
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <>
      <SEO 
        title="Refined Heat & LA Game Nights" 
        description="Welcome to ANJU HOUSE. Authentic Korean comfort food, live sports, and a craft beer garden in the heart of LA." 
        schema={restaurantSchema}
      />

      {/* Hero Section: Full-screen Cinematic */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center scale-105" 
            style={{ backgroundImage: `url(${beerGarden1})` }}
          ></div>
          <div className="absolute inset-0 cinematic-overlay"></div>
        </div>
        <div className="relative z-10 text-center px-margin-mobile md:px-0 max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-6"
          >
            Where Korean Flavors<br />
            <span className="italic text-secondary">Meet LA Game Nights</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-2xl mx-auto"
          >
            Authentic comfort food, live sports, and a craft beer garden in the heart of LA. Experience the refined heat of Seoul with the soul of the city.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col md:flex-row gap-6 justify-center"
          >
            <Link 
              to="/reservations" 
              className="bg-secondary text-on-secondary px-10 py-5 rounded-full font-label-caps text-label-caps uppercase tracking-widest hover:bg-on-secondary-container transition-colors duration-300 text-center"
            >
              Reserve Table
            </Link>
            <Link 
              to="/menu" 
              className="border border-on-surface/30 text-on-surface px-10 py-5 rounded-full font-label-caps text-label-caps uppercase tracking-widest hover:bg-on-surface/5 transition-colors duration-300 text-center"
            >
              Explore Menu
            </Link>
          </motion.div>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-on-surface-variant">
          <span className="font-label-caps text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-secondary to-transparent"></div>
        </div>
      </section>

      {/* About Section: Elegant Split Layout */}
      <section className="py-stack-xl px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="md:col-span-5 order-2 md:order-1"
        >
          <span className="font-label-caps text-label-caps text-secondary uppercase tracking-[0.3em] mb-4 block">Refined Heat</span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-8">More Than A Restaurant</h2>
          <div className="space-y-6 font-body-lg text-body-lg text-on-surface-variant">
            <p>Anju House was born from the desire to bridge generations. We take the soulful, spicy traditions of a Korean family kitchen and infuse them with the electric energy of Los Angeles nightlife.</p>
            <p>From our walnut-timbered interiors to our copper-toned accents, every detail is designed to make you feel at home—whether you're here for a quiet family dinner or the loudest championship game of the season.</p>
          </div>
          <div className="mt-10">
            <Link to="/visit-us" className="inline-flex items-center gap-4 text-secondary font-label-caps text-label-caps uppercase tracking-widest group">
              Read Our Story
              <ArrowRight className="group-hover:translate-x-2 transition-transform duration-300" size={16} />
            </Link>
          </div>
        </motion.div>
        
        <div className="md:col-span-7 order-1 md:order-2 mb-12 md:mb-0 relative">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="aspect-[4/5] rounded-xl overflow-hidden shadow-2xl"
          >
            <img 
              className="w-full h-full object-cover" 
              alt="Chef plating food" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0VFFlQy28E7HGj-Mb3eefn2zjBJ2e9sj_YoMybk4o4TTlwNECyeUKRWhtbKuvCOIQM2CSvkwmAK8VpWqEMcvmFiODEhTZDLjCdR5fyrn6FM4QnDjpnR8-a5_o6fiV0HaxkYB_GBcTkA9W28FOykr8wYW3HQkvhgL9eznThtvI-e2sB-ASSWZn_DxxZPzCKyiqo6YmeIwKKN_CrGX07-Xr7l9nfbZPElT2nBuw56qMNFDxXDxvdzEpSU0fWjsMZu9OjPqhOdiFyUX1" 
              loading="lazy"
            />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute -bottom-8 -left-8 hidden md:block w-64 h-80 rounded-xl overflow-hidden shadow-2xl border-8 border-surface-container-lowest"
          >
            <img 
              className="w-full h-full object-cover" 
              alt="Beer garden vibe" 
              src={beerGarden2} 
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>

      {/* Signature Dishes: Cinema Cards */}
      <section className="bg-surface-container-lowest py-stack-xl">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <span className="font-label-caps text-label-caps text-secondary uppercase tracking-[0.3em] mb-4 block">The Selection</span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">Signature Flavors</h2>
            </div>
            <Link to="/menu" className="font-label-caps text-label-caps text-on-surface-variant hover:text-secondary transition-colors duration-300 uppercase tracking-widest">
              View Full Menu
            </Link>
          </div>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-gutter"
          >
            {/* Card 1 */}
            <motion.div variants={fadeInUp} className="group relative aspect-[3/4] rounded-xl overflow-hidden shadow-lg">
              <img 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                alt="Kimchi Bacon Pasta" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBg9HGvWrz3AvlexFEBQcsiSOetgnIpHjYYdwpPUmTbbT_vlDr8z7LPGr-X1Roh1bs0I5ZsHaH7PVqQwpLGMevglPeF0abKr9c4OXOqqxVYfeifwHDcaaBa0kqcXKwTRqmSA4JSvcagcl9esWW0QypiE5udEDKcxz4cChFH6VCEhi0RRxcY2EjqFu32HwJqXfb21zOFdFSQttdq5Lt1Ee7O6U46J7r-yHkBO4YFJFdrxCDpJ_eWpsmfb09XlONkF6JI8VQee0MLZL-P" 
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-10 flex flex-col justify-end">
                <span className="bg-tertiary text-on-tertiary text-[10px] font-bold px-3 py-1 rounded-full uppercase w-fit mb-4">Chef Recommendation</span>
                <h3 className="font-headline-md text-headline-md text-white mb-2">Kimchi Bacon Pasta</h3>
                <div className="flex justify-between items-center">
                  <p className="font-body-md text-white/70 italic">Smoky, tangy, and perfectly creamy</p>
                  <span className="font-label-caps text-secondary text-lg">$24</span>
                </div>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div variants={fadeInUp} className="group relative aspect-[3/4] rounded-xl overflow-hidden shadow-lg">
              <img 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                alt="Rose Dukboki" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkYWMsM4SKpBuFRGcp13gi10bbtaob7QQl44FxipgqFU-C-GMyqE-9Sy3gYOGQ1XwQ21SUmKNUihjbv1AAF3bTjMoZ8rvFyqyQhxHXZBus9Rlsx7CZLb1cSp6WBSpoIsA_kqdoUvBusAbkenNBR6nCV9OxMD6-B0hOoGcm6I6Dgz2ELQLmcT2QCVAO6K5TmRPWtYfodd1o6iRdyzU1hcUM7Ub430PR8SYTf0mDmFXf_G79oaFx5OPhXqXfZN0bVjvFtimbEk8vS1Bl" 
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-10 flex flex-col justify-end">
                <h3 className="font-headline-md text-headline-md text-white mb-2">Rose Dukboki</h3>
                <div className="flex justify-between items-center">
                  <p className="font-body-md text-white/70 italic">The ultimate spicy comfort classic</p>
                  <span className="font-label-caps text-secondary text-lg">$22</span>
                </div>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div variants={fadeInUp} className="group relative aspect-[3/4] rounded-xl overflow-hidden shadow-lg">
              <img 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                alt="Korean Fried Chicken" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAzxj9CxhspZvnfuaFQCyMw8qov_X5VsViAGTMYTMddXleZ0uYnz59Ns5JaDTlBnB1ixz55sgASvABaCjlt6FsGA0UPUAaRzesRTBaqQqUsTwRsmZwMgTLiI3FzZ32-cu07VBkqipv__U1t94wrhggyQEJdpqRbqADjljMxlYc0IWB8XP9WIlB23F9OidI27rJJsbbxam8c0ecoRL6O5_Zi_psDy_2i7MwIi643oR5z_S6fgmaBIw383m-G8OgSZzG6qguPFh2BHUi" 
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-10 flex flex-col justify-end">
                <span className="bg-tertiary text-on-tertiary text-[10px] font-bold px-3 py-1 rounded-full uppercase w-fit mb-4">Chef Recommendation</span>
                <h3 className="font-headline-md text-headline-md text-white mb-2">Korean Fried Chicken</h3>
                <div className="flex justify-between items-center">
                  <p className="font-body-md text-white/70 italic">Double-fried for maximum crunch</p>
                  <span className="font-label-caps text-secondary text-lg">$28</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Sports Experience Section: Full-width Immersive */}
      <section className="relative h-[819px] w-full flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center" 
            style={{ backgroundImage: `url(${sportsViewing})` }}
          ></div>
          <div className="absolute inset-0 bg-black/65"></div>
        </div>
        <div className="relative z-10 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full text-center">
          <div className="inline-flex items-center gap-3 bg-secondary/20 border border-secondary/30 px-6 py-2 rounded-full mb-8 backdrop-blur-md">
            <span className="w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
            <span className="font-label-caps text-[10px] text-secondary uppercase tracking-widest">Live Game Nights</span>
          </div>
          <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-8">Every Game<br />Feels Bigger Here.</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-12 max-w-xl mx-auto">From World Cup matches to the Super Bowl, experience sports with crystal-clear displays, immersive sound, and a community that shares your passion.</p>
          <Link 
            to="/game-nights" 
            className="bg-secondary text-on-secondary px-10 py-5 rounded-full font-label-caps text-label-caps uppercase tracking-widest hover:scale-105 transition-transform duration-300 inline-block"
          >
            View Game Schedule
          </Link>
        </div>
      </section>

      {/* Beer Garden Section: Focus on Night Ambience */}
      <section className="py-stack-xl bg-background overflow-hidden">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="rounded-xl overflow-hidden aspect-[4/5] scale-95 origin-bottom-right"
                >
                  <img className="w-full h-full object-cover" alt="Wooden architecture details" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBs5OE1MeY924uKYsLX03vpxzdvQs47JEcy2ubu84rU9EomCBYqJycS6Zw6Rozs-U366uziox0CNWOmrJS8Yk3EdlT7MY7YBMP3Kx1EMjKEKljdBAF4lJwaHzXDIrYKzemYSA6iHAWHrC1r0ngTAlFkALbk4kuvb_fV7cvL__uDgYWvkFMrgsmIXGoIItCSdGuEn2Vyx0ZJX1lZcerhDK63S5Ng0QtDm1iSeFnnx5JHR3s_8kGGzOGelQkiRJBAVhkFGXOMXfx4A9iL" loading="lazy" />
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="rounded-xl overflow-hidden aspect-square"
                >
                  <img className="w-full h-full object-cover" alt="Outdoor lounge firepit" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCniHyppQmHbCJZFQQY6bBuR3xcV_1qKyjPVy-Btm5T6aAC0JQAJ9y0TNHishVx5JvQ2M71sJnCVtU_4ZI1IhLupxMfIXn6YZlf1jOhEuUYEnuJmjDWxTPFhUjvBgZMrC7vft2_rDdEmVXZhunEP9-6GBeVBNwIiis0SvkHA6a3TbemdnsyuB-RTKlOfbe5PYLbB-RRwgydjGorasjKlIN1_VCIl-vyxj1vmTB8_6M2FSaYmt5bHSENWCNUQ0rpm5SM4EoipsPf-6Be" loading="lazy" />
                </motion.div>
              </div>
              <div className="pt-12">
                <motion.div 
                  initial={{ opacity: 0, y: -50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="rounded-xl overflow-hidden aspect-[4/5]"
                >
                  <img className="w-full h-full object-cover" alt="Beer garden at dusk" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8ZIn2oO539tJ89tVneRc8VSFwtXCnO99MMtiCT4xohKQWH5MkT3iqmhraM5LNsyRgTG1Z1wjAioT8yUQghdyrdCoJKAxiQ973uLNnb75H519AXOhRr7-suMyjZTZ7otsksDAyiNge2YHRhRFmcgZzD2ewC_6gTaMFNNMGOSGGtsQTSo3a54PppHqgWMu_9cF4lw7OJNYvXVS_WEED5eLKsUG-Eomvt5DdUO8Gb3qyVsSq2AYzQ4VdNla5qIfbAugCIAf5XmE5HoiP" loading="lazy" />
                </motion.div>
              </div>
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <span className="font-label-caps text-label-caps text-secondary uppercase tracking-[0.3em] mb-4 block">Outdoor Oasis</span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-8">The Beer Garden</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-10">Escaping the city bustle doesn't mean leaving it. Our beer garden is an architectural sanctuary featuring century-old reclaimed walnut and handcrafted copper fixtures, curated for the ultimate night under the LA stars.</p>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <span className="text-secondary mt-1"><Beer size={24} /></span>
                <div>
                  <h4 className="font-label-caps text-label-caps text-on-surface uppercase tracking-widest mb-1">24 Rotating Taps</h4>
                  <p className="font-body-md text-on-surface-variant">Local LA crafts and rare Korean imports.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-secondary mt-1"><Snowflake size={24} /></span>
                <div>
                  <h4 className="font-label-caps text-label-caps text-on-surface uppercase tracking-widest mb-1">Climate Controlled</h4>
                  <p className="font-body-md text-on-surface-variant">Warm fires in winter, cool misters in summer.</p>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Reviews: Minimal Testimonials */}
      <section className="py-stack-xl bg-surface-container-low">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center mb-16">
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Guest Experiences</h2>
        </div>
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {/* Testimonial 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-surface-container p-10 rounded-xl border border-outline-variant/10 shadow-md"
          >
            <div className="flex gap-1 text-secondary mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="currentColor" />
              ))}
            </div>
            <p className="font-body-lg text-on-surface-variant mb-8 italic">"The best fusion I've had in years. That Kimchi Bacon Pasta is life-changing, and the atmosphere during the Dodgers game was unmatched."</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-outline-variant">
                <img className="w-full h-full object-cover" alt="James Rivera" src="https://lh3.googleusercontent.com/aida-public/AB6AXuADf5m01wKRbFCgZj-I6eIBbK1kxrkqO_ElEvBc0yAo6LteuZJ1gEQJIaE1zfPO79Vb3kvSewaZ9R7SroZtc6-gRp0UB-uJolsU1qtf3bRE7B8ev3FvqRjxKhlyEQELtzNZx256OFdcByBbCsVRYp3KLhzoviy76NqRfhb1Usa0FQlw_SWltUYclFyYkEpA2-bbFOblJW0wpN_F72C4ZS6oe353g-gHOZf6DtOvaUKVLVE-NqWIRlcDts4G1orsCDEAyMVf4CUcnkTi" loading="lazy" />
              </div>
              <div>
                <p className="font-label-caps text-label-caps text-on-surface uppercase tracking-widest">James Rivera</p>
                <p className="font-body-md text-[12px] text-on-surface-variant">Local Guide</p>
              </div>
            </div>
          </motion.div>

          {/* Testimonial 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="bg-surface-container p-10 rounded-xl border border-outline-variant/10 shadow-md"
          >
            <div className="flex gap-1 text-secondary mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="currentColor" />
              ))}
            </div>
            <p className="font-body-lg text-on-surface-variant mb-8 italic">"Anju House feels like a secret garden in the middle of LA. The copper accents and walnut wood give it such a premium, cozy feel."</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-outline-variant">
                <img className="w-full h-full object-cover" alt="Elena Choi" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9ybmuz6BZo2VgwaT9d6M-g8HJj-1m6rbwo5dDWP-wEHmBQHutKk8FSEAcmY-ZtHNXgkRSh2tn4nhb_lRU9TJBojnq_Y68MaYILZBNFaZ-CEmN0sHE1DNQmRu4Jgqnsz6cOi2hRgjn6jZsVSVSSHdI5Hxa9WgLDPJspwW-FzQT0YErXmoW6DWwrCjAXWAihoCiKWDvTSc-zBCbQVSL-uDEaqDDVtj7_9LLg0_MLj7XYRnx19BQCVcQKRfYAktPlta4QikPgtsYJT8Y" loading="lazy" />
              </div>
              <div>
                <p className="font-label-caps text-label-caps text-on-surface uppercase tracking-widest">Elena Choi</p>
                <p className="font-body-md text-[12px] text-on-surface-variant">Food Critic</p>
              </div>
            </div>
          </motion.div>

          {/* Testimonial 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-surface-container p-10 rounded-xl border border-outline-variant/10 shadow-md"
          >
            <div className="flex gap-1 text-secondary mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="currentColor" />
              ))}
            </div>
            <p className="font-body-lg text-on-surface-variant mb-8 italic">"Great beer list, incredible wings, and the staff treats you like family. It's our new weekend ritual for watching Lakers games."</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-outline-variant">
                <img className="w-full h-full object-cover" alt="Marcus Thompson" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBR9fQSirvUHEXejvfTjEsx6vI5uAqes0ddPSKgwLtA4y0BKdIPUVNzVCZB877hQKirfh4bkLFtIryV4Y8t4tFLJW8Mrn8jjSqpL2-c_sx04CEjAz7N2zy6cA-PaIbTA5ihZyatIzj-OUWKKHP5fzMFmn0kzKg1g8Y0Lbk58wnjGIRjCVzVTO87maCmIxzkkYw6to6bzQx07uWbLhgndFBq4rfd66RqFqpwRyeEvr1cbqe9PvbaUNDvcpn6jE1cARzvDANcDC3a9E_N" loading="lazy" />
              </div>
              <div>
                <p className="font-label-caps text-label-caps text-on-surface uppercase tracking-widest">Marcus Thompson</p>
                <p className="font-body-md text-[12px] text-on-surface-variant">Sports Fanatic</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Instagram: Masonry Gallery */}
      <section className="py-stack-xl">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center mb-16">
          <span className="font-label-caps text-label-caps text-secondary uppercase tracking-[0.3em] mb-4 block">Follow Our Journey</span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">@ANJUHOUSELA</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
          <div className="space-y-4">
            <img className="w-full rounded-xl" alt="Friends enjoying cocktails" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9ma81DDAa0UktH52DzN1pu5PjT3PNZ8tME10lOJvmi85dOQKLgBAR4cZei6Cc3RGyvbLl0NsjX1qyBtFiNcWt7I1ahKg_xjPB8LEYXvhjl1Rf-rsI5pc_p4VQT60JdmRlNRp7p1Qhknj-pGFVLjkmqshf86vEO3NB1GAhHwSoDM4_OFuRqPwpCsGwHyTJca1cmE4Ug9FiBM9pK3KXkSkmWNSWYSCYNQ0fa1WftsfyvXSR2QYskYoWlJEE5wRjgwt4g1fwABFdOyJC" loading="lazy" />
            <img className="w-full rounded-xl" alt="Fresh appetizers close-up" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-4eqEkNXaMyesMwTBh-eQlWea9wK09mhk7lOYM5FoVndGAPGrrqyyZqza2X9gUapq47_KH69KStANw-9GJksQ9RSS4lwR6ZtHgbcleRKyQo0g3RxYXIza6EqgkW2SdLHns0VMyJsz450fN2QPjQNOClNQ-yWsR9_wzxB1y1eNUpk6thIGiVW0dyCaecRteXs6KF7pJL4vPKusbOpcvBD93e628cnYcdX0SBCXcadLKbPpxrChqzysca2MEJKxwma03PaxwW3mwAl5" loading="lazy" />
          </div>
          <div className="space-y-4">
            <div className="h-64 bg-secondary/5 rounded-xl flex items-center justify-center p-8 text-center border border-secondary/10">
              <p className="font-headline-md text-secondary">Join us for the Playoffs this weekend!</p>
            </div>
            <img className="w-full rounded-xl" alt="Lively beer garden and screens" src={beerGarden2} loading="lazy" />
          </div>
          <div className="space-y-4">
            <img className="w-full rounded-xl" alt="Hot soup steaming" src={steakPlatter} loading="lazy" />
            <img className="w-full rounded-xl" alt="Bartender pouring craft beer" src={shelvesDecor} loading="lazy" />
          </div>
          <div className="space-y-4">
            <img className="w-full rounded-xl" alt="Bespoke food flat-lay" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPgaHi73zudhAAfD01N8lu2cJ8IFOfwhGmUD0TEmQ8BC3PJbXFgvR7qAEE6jdxsmkSBmGqcaGxkS9bYmQx8GXxMNWfh0U-zWm2vjbH_WP2upPMEqFURY2HN4lDSVrELCdxWg_1yUm-ybEuZdrL2PfMmcF01IY5SbB1W0tYlFFOFUuqa7glO5S27YryIkRN-BupacEnds8QDlZa8o3VuodyI-3jq3wjyGCaiUiqObNN8LhzyYLoVh1GspJlI9FTQBMYJA1ujNcbNzbp" loading="lazy" />
            <div className="h-48 rounded-xl overflow-hidden">
              <img className="w-full h-full object-cover animate-pulse" alt="Ambient lighting bokeh" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBV74atblc64omOU-DkNuGm6e-55Vx2IQbYDrzQdlNYJeuDwZ_pA2f5s7ULvFQVi8zzLKPz86PagTBpzoTEE4XuFaFbVZP6gy4T2OlDZJKrWkXNdwX3DLbavDn3jVH6rWph8nCiNpmx7VVvukGTa-exOJPljNKZD3nKhmyRTCnAzneF0OvJgZKnO9TxjubF0HmGCZz7BXxgAGMgYA0kAmfoRy6gTLBsi77fdpWnp68ENxXGDAeJH3kOtXRB7uK3j1OmoTM3oMN7OQ9e" loading="lazy" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;

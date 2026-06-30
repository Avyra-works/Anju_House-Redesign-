import React, { useState } from 'react';
import { MapPin, Phone, Mail, ParkingSquare, Send, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/ui/SEO';

const VisitUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Private Dining Inquiry');
  const [message, setMessage] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (name && email && message) {
      alert(`Thank you, ${name}! Your message has been sent to our team regarding "${subject}".`);
      setName('');
      setEmail('');
      setMessage('');
    } else {
      alert('Please fill out all required fields.');
    }
  };

  const faqs = [
    { q: "Is valet parking available?", a: "Yes, complimentary valet parking is available starting at 5:00 PM daily. Self-parking is also available in the secure lot directly behind the restaurant." },
    { q: "Do you accommodate dietary restrictions?", a: "Absolutely! We offer gluten-free, vegetarian, and vegan options. Please notify your server or indicate your needs when making a reservation." },
    { q: "Can I book a private event?", a: "Yes, our heated beer garden and communal dining tables are perfect for private gatherings. Please use the contact form to reach our events coordinator." },
    { q: "Is there a dress code?", a: "We embrace a casual yet upscale atmosphere. No formal dress code is required, but smart-casual is recommended." }
  ];

  return (
    <>
      <SEO title="Visit Us & Contact" description="Find our location, hours of operation, parking details, FAQs, and get in touch with our team." />

      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative py-20 bg-surface-dim/40 border-b border-outline-variant/10 text-center">
          <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
            <span className="font-label-caps text-label-caps text-secondary uppercase tracking-[0.3em] mb-4 block">Location &amp; Contact</span>
            <h1 className="font-display-lg text-4xl md:text-display-lg leading-none mb-6">Visit Anju House</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">Where traditional warmth meets the modern rhythm of the city. Join us for a refined evening of heat and hospitality.</p>
          </div>
        </section>

        {/* Details Grid */}
        <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-stack-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
            
            {/* Info Left Column */}
            <div className="lg:col-span-5 flex flex-col gap-12">
              {/* Business Hours */}
              <div>
                <h2 className="font-headline-lg text-headline-lg text-secondary mb-8">Business Hours</h2>
                <div className="space-y-4 font-body-md text-body-md text-on-surface">
                  <div className="flex justify-between items-center py-2 border-b border-outline-variant/20">
                    <span>Monday – Thursday</span>
                    <span className="text-on-surface-variant">5:00 PM — 11:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-outline-variant/20">
                    <span>Friday — Saturday</span>
                    <span className="text-on-surface-variant">4:00 PM — 1:00 AM</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-outline-variant/20">
                    <span>Sunday</span>
                    <span className="text-on-surface-variant">4:00 PM — 10:00 PM</span>
                  </div>
                  <p className="text-tertiary mt-4 font-label-caps text-[10px] md:text-label-caps uppercase">* Kitchen closes 45 minutes prior to end of service.</p>
                </div>
              </div>

              {/* Valet & Parking */}
              <div className="glass-panel p-8 rounded-xl border border-outline-variant/10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-secondary"><MapPin size={24} /></span>
                  <h3 className="font-headline-md text-2xl text-on-surface">Valet &amp; Parking</h3>
                </div>
                <p className="font-body-md text-sm md:text-base text-on-surface-variant mb-6">
                  Complimentary valet service is available for all dinner guests starting at 5:00 PM nightly. Self-parking is located in the secure structure directly behind the restaurant on Walnut Ave.
                </p>
                <div className="flex gap-4">
                  <span className="px-3 py-1 bg-surface-container-highest rounded text-[10px] font-label-caps text-secondary uppercase">Valet Available</span>
                  <span className="px-3 py-1 bg-surface-container-highest rounded text-[10px] font-label-caps text-secondary uppercase">Secure Lot</span>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="space-y-6">
                <h3 className="font-headline-md text-2xl text-on-surface flex items-center gap-2">
                  <HelpCircle size={20} className="text-secondary" /> Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="bg-surface-container-low p-5 rounded-lg border border-outline-variant/15">
                      <h4 className="font-bold text-sm text-on-surface mb-2">{faq.q}</h4>
                      <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form Right Column */}
            <div className="lg:col-span-7">
              <div className="bg-surface-container p-8 md:p-10 rounded-xl border border-outline-variant/10 shadow-xl">
                <h2 className="font-headline-md text-2xl md:text-3xl text-on-surface mb-2">Get in Touch</h2>
                <p className="font-body-md text-sm md:text-base text-on-surface-variant mb-8">For large parties, private event inquiries, or feedback, please reach out to our team.</p>
                
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="font-label-caps text-xs uppercase text-outline block">Full Name</label>
                      <input 
                        type="text" 
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3 text-on-surface focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all placeholder:text-on-surface-variant/30" 
                        placeholder="Jin-ho Kim" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-label-caps text-xs uppercase text-outline block">Email Address</label>
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3 text-on-surface focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all placeholder:text-on-surface-variant/30" 
                        placeholder="jinho@example.com" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="font-label-caps text-xs uppercase text-outline block">Subject</label>
                    <select 
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3 text-on-surface focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                    >
                      <option>Private Dining Inquiry</option>
                      <option>General Reservation Question</option>
                      <option>Press &amp; Media</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="font-label-caps text-xs uppercase text-outline block">Your Message</label>
                    <textarea 
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3 text-on-surface focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all placeholder:text-on-surface-variant/30 resize-none" 
                      placeholder="Tell us about your event..." 
                      rows="4"
                    ></textarea>
                  </div>
                  <button 
                    className="w-full bg-on-secondary-container text-on-secondary font-label-caps text-label-caps uppercase tracking-widest py-4 rounded-lg hover:bg-secondary transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer"
                    type="submit"
                  >
                    Send Message <Send size={14} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Map Placeholder Section */}
        <section className="w-full h-[500px] relative bg-surface-container-lowest overflow-hidden">
          <div className="absolute inset-0 z-0">
            {/* Map image placeholder */}
            <img 
              className="w-full h-full object-cover opacity-50 filter grayscale contrast-125 brightness-75"
              alt="Map Location"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCf8xSxgAtMu9kK8UIgP5W4-t57lIwq1VnYMEGqovDm1MVWhWv_61ppwWrrxyoZvetr-t6nijlOkRv2CpS-D0V_Jvp7JDoap23vcaMk8pLoAywexM_YasCRWyAtSMkW60q-2kaan6HBKFi5RPEck5JE74IRBT58PmdvBitOQqkBg3S80yz7c6dodtqcXC_XVHnlldzzWJbATqWCYFbAp4LYqBjQsQIHw3yLEGTsB09VCzv99FNTMCwoObbPGvnPAE2YZ0ZED4cRj5KQ"
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="glass-panel p-6 rounded-xl border border-secondary/20 max-w-sm text-center shadow-2xl bg-surface/90 backdrop-blur-xl">
              <span className="text-secondary inline-block mb-2"><MapPin size={32} /></span>
              <h4 className="font-headline-md text-2xl text-on-surface mb-1">ANJU HOUSE</h4>
              <p className="font-body-md text-on-surface-variant text-sm mb-4">888 K-Town Way, Los Angeles, CA 90005</p>
              <a 
                className="inline-block border border-secondary text-secondary font-label-caps text-label-caps uppercase px-6 py-2 rounded-lg hover:bg-secondary hover:text-on-secondary transition-all" 
                href="https://maps.google.com" 
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Directions
              </a>
            </div>
          </div>
        </section>

        {/* Secondary Atmosphere / Design Section */}
        <section className="grid grid-cols-1 md:grid-cols-2">
          <div className="h-[400px] overflow-hidden">
            <div 
              className="w-full h-full bg-cover bg-center hover:scale-105 transition-transform duration-700" 
              style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBNsjMJ2dsCv47SsdgC75_PYqv2asKbe7lz5JxrLSW_OgE6jZSqMHSG3r5Yst3PztUVGRxstisJZS5XVyRM6gsWhBrfR_igW4s5_AoGbPQNPU-IHVd9usUGWNBr1raKk_DzWujDt25Ooj5ZsrgnuzRid9L_qYwlyaGiSKGHyJfcMRB-ebVdpShrDdJikfLyiAvfMr0cJm7qxOxntB-OhRhC_2FO6zJDicbPV01YtCIArOdP3nP_gUI9sBSAG13DxToBNW9ZY91GYlp_')` }}
            ></div>
          </div>
          <div className="h-[400px] flex flex-col justify-center px-margin-mobile md:px-20 bg-surface-container-low border-l border-outline-variant/10">
            <span className="font-label-caps text-label-caps uppercase text-secondary tracking-widest mb-4">Atmosphere</span>
            <h3 className="font-headline-lg text-3xl md:text-headline-lg text-on-surface mb-6">A Space Designed for Connection</h3>
            <p className="font-body-lg text-body-lg text-on-surface-variant text-sm md:text-base leading-relaxed">
              Our space was inspired by the communal spirit of the Korean 'Anju' culture—where food is meant to be paired with good company and exceptional drinks. Every detail, from the copper finishes to the ambient soundtrack, is curated to enhance your gathering.
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default VisitUs;

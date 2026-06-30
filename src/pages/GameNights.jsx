import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Calendar, Shield, ArrowRight, Bell, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/ui/SEO';

// Import local assets
import sportsViewing from '../assets/sports-viewing.jpg';
import beerGarden1 from '../assets/beer-garden-1.jpg';
import beerGarden2 from '../assets/beer-garden-2.jpg';
import shelvesDecor from '../assets/shelves-decor.jpg';

const FIXTURES = [
  {
    id: 1,
    league: "MLB • LIVE TONIGHT",
    time: "7:10 PM",
    team1: "DODGERS",
    team2: "GIANTS",
    icon1: "⚾",
    icon2: "🛡️",
    special: "Pau Hana Happy Hour",
    specialVal: "UNTIL 8 PM",
    featured: true
  },
  {
    id: 2,
    league: "NBA • FRI MAY 24",
    time: "5:30 PM",
    team1: "LAKERS",
    team2: "NUGGETS",
    icon1: "🏀",
    icon2: "🛡️",
    special: "Group Booth Specials",
    specialVal: "RESERVE NOW",
    featured: false
  },
  {
    id: 3,
    league: "SOCCER • SAT MAY 25",
    time: "12:00 PM",
    team1: "KOREA",
    team2: "GERMANY",
    icon1: "⚽",
    icon2: "🛡️",
    special: "World Cup Breakfast",
    specialVal: "OPENS 11AM",
    featured: false
  }
];

const GameNights = () => {
  const [emailAlert, setEmailAlert] = useState('');

  const handleAlertSubmit = (e) => {
    e.preventDefault();
    if (emailAlert) {
      alert(`Alerts activated for: ${emailAlert}`);
      setEmailAlert('');
    }
  };

  return (
    <>
      <SEO title="Game Nights" description="Experience L.A. sports in the ultimate beer garden. Check out our upcoming live broadcast fixtures and game day specials." />

      <main className="pt-24">
        {/* Cinematic Header Section */}
        <section className="relative h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div 
              className="w-full h-full bg-cover bg-center opacity-40 scale-105" 
              style={{ backgroundImage: `url(${sportsViewing})` }}
            ></div>
            <div className="absolute inset-0 cinematic-overlay"></div>
          </div>
          <div className="relative z-10 text-center px-margin-mobile md:px-margin-desktop max-w-4xl">
            <span className="font-label-caps text-label-caps uppercase tracking-[0.3em] text-secondary mb-6 block">Live at Anju House</span>
            <h1 className="font-display-lg text-4xl md:text-display-lg text-on-surface mb-8 leading-tight">Your Home for Every Goal, Basket, and Home Run.</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-10">Experience the thrill of the game in a space where refined Korean hospitality meets the raw energy of LA’s best sports beer garden.</p>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <a href="#fixtures-list" className="bg-secondary text-on-secondary px-12 py-5 font-label-caps text-label-caps uppercase tracking-widest hover:bg-tertiary transition-colors duration-300 rounded-full text-center">View Schedule</a>
              <Link to="/reservations" className="border border-outline-variant text-on-surface px-12 py-5 font-label-caps text-label-caps uppercase tracking-widest hover:bg-surface-container transition-colors duration-300 rounded-full text-center">Reserve a Booth</Link>
            </div>
          </div>
        </section>

        {/* Live Schedule Grid */}
        <section id="fixtures-list" className="py-stack-xl px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto scroll-mt-24">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">Upcoming Fixtures</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">Catch every major league moment on our 120" laser projectors with state-of-the-art immersive audio.</p>
            </div>
            <div className="flex gap-4">
              <button className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center hover:bg-secondary hover:text-on-secondary transition-all cursor-pointer" aria-label="Previous Games">
                <ChevronLeft size={20} />
              </button>
              <button className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center hover:bg-secondary hover:text-on-secondary transition-all cursor-pointer" aria-label="Next Games">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {FIXTURES.map((game) => (
              <div 
                key={game.id} 
                className={`glass-panel p-8 rounded-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border ${
                  game.featured ? 'border-secondary/40' : 'border-outline-variant/10'
                }`}
              >
                <div className="flex justify-between items-start mb-12">
                  <span className={`px-4 py-1 rounded-full font-label-caps text-[10px] tracking-widest uppercase ${
                    game.featured ? 'bg-secondary/15 text-secondary' : 'bg-outline/10 text-on-surface'
                  }`}>
                    {game.league}
                  </span>
                  <span className="font-label-caps text-label-caps text-on-surface-variant">{game.time}</span>
                </div>
                
                <div className="flex items-center justify-between mb-12">
                  <div className="text-center flex-grow">
                    <div className="w-16 h-16 mx-auto mb-4 bg-surface-container rounded-full flex items-center justify-center border border-outline-variant/20 text-2xl shadow-inner">
                      {game.icon1}
                    </div>
                    <div className="font-headline-md text-xl md:text-2xl text-on-surface">{game.team1}</div>
                  </div>
                  <div className="font-label-caps text-secondary text-xl font-bold italic px-4">VS</div>
                  <div className="text-center flex-grow">
                    <div className="w-16 h-16 mx-auto mb-4 bg-surface-container rounded-full flex items-center justify-center border border-outline-variant/20 text-2xl shadow-inner">
                      {game.icon2}
                    </div>
                    <div className="font-headline-md text-xl md:text-2xl text-on-surface">{game.team2}</div>
                  </div>
                </div>
                
                <div className="border-t border-outline-variant/10 my-6"></div>
                
                <div className="flex justify-between items-center text-on-surface-variant font-label-caps text-xs">
                  <span>{game.special}</span>
                  <span className="text-secondary font-semibold">{game.specialVal}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bento Atmosphere Section */}
        <section className="bg-surface-container-low py-stack-xl">
          <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-2 gap-gutter md:h-[800px]">
              {/* Main Image */}
              <div className="md:col-span-7 md:row-span-2 relative group overflow-hidden rounded-xl h-[400px] md:h-auto">
                <div 
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
                  style={{ backgroundImage: `url(${beerGarden1})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex flex-col justify-end p-8 md:p-12">
                  <h3 className="font-headline-lg text-2xl md:text-4xl text-on-surface mb-2">Unrivaled Atmosphere</h3>
                  <p className="font-body-md text-on-surface-variant max-w-md text-sm md:text-base">
                    Every tackle and touchdown felt like you're on the sidelines. Our beer garden is designed for maximum acoustic immersion.
                  </p>
                </div>
              </div>

              {/* Top Right */}
              <div className="md:col-span-5 md:row-span-1 relative group overflow-hidden rounded-xl h-[250px] md:h-auto">
                <div 
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
                  style={{ backgroundImage: `url(${beerGarden2})` }}
                ></div>
                <div className="absolute inset-0 bg-black/45 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <span className="font-label-caps text-label-caps text-on-surface border border-white/30 px-6 py-2 backdrop-blur-sm">Refined Bites</span>
                </div>
              </div>

              {/* Bottom Right */}
              <div className="md:col-span-5 md:row-span-1 glass-panel p-10 rounded-xl flex flex-col justify-center">
                <div className="mb-6">
                  <span className="text-secondary inline-block mb-2"><Bell size={40} /></span>
                  <h4 className="font-headline-md text-2xl text-on-surface mb-2">Community First</h4>
                </div>
                <p className="font-body-md text-on-surface-variant text-sm md:text-base mb-6">
                  At Anju House, Game Night isn't just about the score. It's about the collective roar of the crowd, the shared plates, and the stories told over a round of cold brews.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    <div className="w-10 h-10 rounded-full border-2 border-background bg-secondary/20 flex items-center justify-center text-xs">👨‍💼</div>
                    <div className="w-10 h-10 rounded-full border-2 border-background bg-secondary/40 flex items-center justify-center text-xs">👩‍⚕️</div>
                    <div className="w-10 h-10 rounded-full border-2 border-background bg-secondary/60 flex items-center justify-center text-xs">🧑‍🎨</div>
                  </div>
                  <span className="font-label-caps text-[10px] text-on-surface-variant font-semibold">JOIN 200+ FANS TONIGHT</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-stack-xl overflow-hidden bg-background">
          <div className="relative z-10 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center">
            <h2 className="font-display-lg text-4xl md:text-display-lg text-on-surface mb-12">Claim Your Front Row Seat.</h2>
            <form onSubmit={handleAlertSubmit} className="inline-flex flex-col md:flex-row items-center gap-6 bg-surface-container-highest p-4 rounded-3xl md:rounded-full border border-outline-variant/30 w-full max-w-lg mx-auto">
              <input 
                type="email"
                required
                value={emailAlert}
                onChange={(e) => setEmailAlert(e.target.value)}
                className="bg-transparent border-none focus:ring-0 text-on-surface px-8 font-body-md w-full focus:outline-none placeholder:text-on-surface-variant/40" 
                placeholder="Get game-day alerts" 
              />
              <button 
                type="submit"
                className="bg-secondary text-on-secondary px-10 py-4 rounded-full font-label-caps text-label-caps uppercase tracking-widest hover:scale-105 transition-transform w-full md:w-auto shrink-0 cursor-pointer"
              >
                Notify Me
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
};

export default GameNights;

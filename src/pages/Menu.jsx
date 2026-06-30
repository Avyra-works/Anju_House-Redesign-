import React, { useState, useMemo } from 'react';
import { Search, Sparkles, Flame, Moon, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/ui/SEO';

// Import local assets
import steakPlatter from '../assets/steak-platter.jpg';
import beerGarden2 from '../assets/beer-garden-2.jpg';

const MENU_ITEMS = [
  {
    id: 1,
    name: "Kimchi Jeon",
    category: "anju",
    price: 18,
    desc: "Aged kimchi, scallions, and shrimp tossed in a crispy savory batter. Served with soy-vinegar dipping sauce.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB3SeyDYk1d8marQ75hSKCyN-M8z_rHUi0KGgcQqDzjtAcSM5k_MJN0ejqOYeG_u56Pk8Hw0DNksDWItZCMK37uDB9dGdpMYLVIrKqbzrPG0x5h-GKIlRlYZyseUcLmXuaqd3uifaa_t34z3B1aHUQp2QNe7D6XUHhuvYG6o4QE7UpqFD_VlFHL9HBfommcX6fj2tIHjXq91tiprE2Lt9F3_S9iKmnfEbwjAhWAZhYhaAN-uZ5oXl-daf6jxdf-n3k4-e1jsNcDcETy",
    badges: ["Chef's Pick"],
    spicy: true,
    tag: "Vegetarian Available"
  },
  {
    id: 2,
    name: "Royal Tteokbokki",
    category: "anju",
    price: 22,
    desc: "Chewy rice cakes, fish cakes, and gochujang reduction. Elevated with brisket shavings and soft egg.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCnfQm1Vdy09b7UHAbIMxTrgU5wjJySj9u5HBbhYfKvUZtDvn8TeYgQaYsOSFw_7S98tYDPU78DVkhCY16zU-KpQJ_TxOT_0og2buB0altShHOcAzvJTJKPXESABpOZrvyKkv_A0PJvM5nkNxcaAKnQxsh4sw3v1KCFquHttM5Ulw50krIzMNZbnOJ1GueZ_mphaOpUKH1q8ePAJdbaz4hmEVSS4TnjXlkCHmLW4PI9GSaG7bJLHy8X-Y1tJahpU2EwO7ZiXyrVoKK-",
    badges: ["Popular"],
    spicy: true,
    tag: "High Heat"
  },
  {
    id: 3,
    name: "Wagyu Yukhoe",
    category: "anju",
    price: 28,
    desc: "Hand-cut Wagyu beef, Asian pear, pine nuts, and sesame dressing. Finished with a cured quail egg.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRJjId2E8iiQhnb1NO21m42Q-K3vhX4WQRTPrfV8Op0Pws2SwkkJdUs-AGO-YIewqLl9DVXzS9bp2fonJoXAoMOSI2V05dv8VBt9axuQ6FU1s5hb9xE0CNmf96CIF0sTDGHDuaDUsiG7jtNx2GAEQSGvW2IV48IeAXX_U2hB1ulydvxQH3FEZhe_68qx0z4tZr4i5FMi5fkKLnaBcztLqWUw1vSd1LMLsDlIZofZWA-qpd-XkcMpbHoSTXOoz8nYhqFtcLGnUEI0yc",
    badges: [],
    spicy: false,
    tag: "Premium Cut"
  },
  {
    id: 4,
    name: "Braised Wagyu Galbi-Jjim",
    category: "main",
    price: 52,
    desc: "Slow-braised for 48 hours in our secret family reduction. Served with root vegetables and stone-pot rice.",
    image: steakPlatter,
    badges: ["Signature"],
    spicy: false,
    tag: "Serves 2"
  },
  {
    id: 5,
    name: "Anju Signature Fried Chicken",
    category: "main",
    price: 36,
    desc: "Double-fried for maximum crunch. Choice of soy-garlic glaze or ghost pepper red sauce.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjm2-apiZ4GeNYxuIXERijwL8vDWMp4_VLy-9WJuT9Zbt185zdrwfOK7RdpBaVk0Rc77uh4DVwFK0LF-NDXmYSuNQ5fVxhfYUvHb9WIJLVtF75UconqUrmAXukpNCd0bbdOAqq8bjYs53PeC8gUTEkw7vZx3hhzWWC4hnyL6WHziTuHVpiotbtFkk0NdL0SrMdpPzRkzvRWnEWohCBVG4gglG2ms4LsM7G3ZGrWAuBuRnELiKkGvoTb_fmD4aLgrffSNB8OeNYrzDN",
    badges: ["Fan Favorite"],
    spicy: true,
    tag: "Spicy Option"
  },
  {
    id: 6,
    name: "Seoul Mule",
    category: "cocktails",
    price: 16,
    desc: "Soju, Ginger beer, Yuzu juice, Fresh lime.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAG5hdDiDPSHjrlMk7D_6kKhvcfJAoxTATCED6-1mg_ghD2J_YkBs7xTrywXXseJtryZtyD8zPXtNPhIcwrkXbrqmOkLWRPI-wbSnC-7TRe2WYlRdl187xvTsijd-Ia71ZKVdpoAuFLBvDr_e6W7SuewcUHSJJKEkzKH6t8tfQx-wZ96i2lS1vdc0p9oCfTckBkl4uq7OG-Jf3Q0yvRM1TgCbnz2VDC60PNuVUcYY6TXvjOwIMzPVryfcstvzsuSQuhNMIZl0iikZww",
    badges: [],
    spicy: false,
    tag: "Yuzu Aroma"
  },
  {
    id: 7,
    name: "Perilla Martini",
    category: "cocktails",
    price: 18,
    desc: "Premium Jinro 24 Soju, Dry Vermouth, Fresh Perilla leaf tincture.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAG5hdDiDPSHjrlMk7D_6kKhvcfJAoxTATCED6-1mg_ghD2J_YkBs7xTrywXXseJtryZtyD8zPXtNPhIcwrkXbrqmOkLWRPI-wbSnC-7TRe2WYlRdl187xvTsijd-Ia71ZKVdpoAuFLBvDr_e6W7SuewcUHSJJKEkzKH6t8tfQx-wZ96i2lS1vdc0p9oCfTckBkl4uq7OG-Jf3Q0yvRM1TgCbnz2VDC60PNuVUcYY6TXvjOwIMzPVryfcstvzsuSQuhNMIZl0iikZww",
    badges: [],
    spicy: false,
    tag: "Herbal & Fresh"
  },
  {
    id: 8,
    name: "Terra Lager",
    category: "beer",
    price: 8,
    desc: "Crisp and refreshing Korean draft lager, perfect for pairing with spicy Anju.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkqhjYBXq_R7SX3f_hIj51MVN8qHdoZ74NhSickEDU6rOeqP99sqYcMlgvRk_QOPp2aaFFRTNtP2QMQkAHYEsZRI0JyHyKIMGM9i6P_DRmxYDi0gfmh33fTOTLSuaz6wwT9vzTUqwWVyyAyJmv2YIFSRq6xUEJEuJGuKFZ9oiLBRXA074FJlI_3crqJiB14mAqu7QGEaR2dyYrJiZ1O7EMx3H_EfEkQ8ZaPq_VuwlH3zwvkxXoH8LfSYlU5zbBtwd4XrD_ErU9VGtR",
    badges: ["On Tap"],
    spicy: false,
    tag: "L.A. Favorite"
  },
  {
    id: 9,
    name: "Local Craft IPA",
    category: "beer",
    price: 10,
    desc: "Hoppy and floral West Coast IPA from our rotating craft selection.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkqhjYBXq_R7SX3f_hIj51MVN8qHdoZ74NhSickEDU6rOeqP99sqYcMlgvRk_QOPp2aaFFRTNtP2QMQkAHYEsZRI0JyHyKIMGM9i6P_DRmxYDi0gfmh33fTOTLSuaz6wwT9vzTUqwWVyyAyJmv2YIFSRq6xUEJEuJGuKFZ9oiLBRXA074FJlI_3crqJiB14mAqu7QGEaR2dyYrJiZ1O7EMx3H_EfEkQ8ZaPq_VuwlH3zwvkxXoH8LfSYlU5zbBtwd4XrD_ErU9VGtR",
    badges: ["Rotating"],
    spicy: false,
    tag: "Craft Draft"
  }
];

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { key: 'all', name: 'All' },
    { key: 'anju', name: 'Anju' },
    { key: 'main', name: 'Main' },
    { key: 'cocktails', name: 'Cocktails' },
    { key: 'beer', name: 'Beer' }
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter(item => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const sortedCategories = [
    { key: 'anju', title: 'Anju (Small Plates)', subtitle: '01 — Small Plates' },
    { key: 'main', title: 'Main Feasts', subtitle: '02 — Signature Dishes' },
    { key: 'cocktails', title: 'The Cocktail Lab', subtitle: '03 — House Mixology' },
    { key: 'beer', title: 'Cold Draft Beers', subtitle: '04 — Taps & Imports' }
  ];

  return (
    <>
      <SEO title="Menu" description="Browse the ANJU HOUSE menu - Korean comfort small plates, main feasts, cocktails, and draft beers." />

      <main className="pt-32">
        {/* Hero Section */}
        <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-stack-md md:mb-stack-xl">
          <div className="grid grid-cols-12 gap-gutter items-end">
            <div className="col-span-12 md:col-span-7">
              <span className="font-label-caps text-label-caps text-secondary uppercase tracking-[0.3em] mb-4 block">Refined Heat</span>
              <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg leading-none mb-8 italic">Our Menu</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
                A curated selection of Korean small plates and hearty mains, designed to be shared. From the sizzle of the grill to the precision of the cocktail shaker.
              </p>
            </div>
            <div className="hidden md:block col-span-5 text-right">
              <div className="flex items-center justify-end space-x-2 text-outline">
                <span className="material-symbols-outlined">restaurant</span>
                <span className="font-label-caps text-label-caps">Est. 2024</span>
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter & Search */}
        <section className="sticky top-[88px] z-40 bg-surface-dim/95 backdrop-blur-md py-6 border-b border-outline-variant/10">
          <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center space-x-4 overflow-x-auto w-full md:w-auto no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-6 py-2 rounded-full border transition-all font-label-caps text-label-caps uppercase whitespace-nowrap cursor-pointer ${
                    activeCategory === cat.key
                      ? 'border-secondary bg-secondary text-on-secondary'
                      : 'border-outline-variant hover:border-secondary text-on-surface'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-80 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-secondary transition-colors" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-full py-3 pl-12 pr-6 text-body-md focus:outline-none focus:border-secondary transition-all text-on-surface placeholder:text-on-surface-variant/50"
                placeholder="Search dish..."
              />
            </div>
          </div>
        </section>

        {/* Menu Grid */}
        <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-stack-md">
          {sortedCategories.map((sec) => {
            const itemsInSec = filteredItems.filter(i => i.category === sec.key);
            if (itemsInSec.length === 0) return null;

            return (
              <div key={sec.key} className="mb-20">
                {/* Category Header */}
                <div className="flex items-center justify-between mb-12 border-b border-outline-variant/15 pb-4">
                  <h2 className="font-headline-lg text-headline-md md:text-headline-lg text-on-surface">
                    {sec.title}
                  </h2>
                  <span className="text-outline-variant font-label-caps text-xs hidden md:inline">{sec.subtitle}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
                  <AnimatePresence mode="popLayout">
                    {itemsInSec.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                        className="group relative overflow-hidden rounded-xl bg-surface-container-low transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between"
                      >
                        <div>
                          <div className="aspect-[3/4] overflow-hidden relative bg-black/10">
                            <img
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              alt={item.name}
                              src={item.image}
                              loading="lazy"
                            />
                            <div className="absolute top-4 left-4 flex gap-2">
                              {item.badges.map((badge, idx) => (
                                <span key={idx} className="bg-tertiary text-on-tertiary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                                  {badge}
                                </span>
                              ))}
                              {item.spicy && (
                                <span className="bg-error-container text-on-error-container px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                                  <Flame size={10} fill="currentColor" /> Spicy
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="p-8">
                            <div className="flex justify-between items-start mb-4">
                              <h3 className="font-headline-md text-xl md:text-2xl text-on-surface">{item.name}</h3>
                              <span className="text-secondary font-headline-md text-xl">${item.price}</span>
                            </div>
                            <p className="text-on-surface-variant font-body-md text-sm md:text-base leading-relaxed mb-6">
                              {item.desc}
                            </p>
                          </div>
                        </div>

                        <div className="p-8 pt-0">
                          <div className="flex items-center gap-4 pt-4 border-t border-outline-variant/20">
                            <span className="flex items-center gap-1 text-outline text-[11px] uppercase tracking-tighter">
                              {item.tag}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}

          {/* Interspersed Atmospheric Banner */}
          <div className="w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-20 relative group">
            <img 
              className="w-full h-full object-cover transition-transform duration-[20s] ease-linear group-hover:scale-110" 
              alt="Beer Garden Vibe" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbPmQPUWKB3vSglDVRAz65mlkW6dmV6W-A1ld-hGL4yMDVZ0_y2NhKVOitudHwd1VELEvFGbyXiEbuuQX7fS4ufYQIM1Ls--7yuv0lXCQsI543dJzVZGrSH7VzkqinFgtYk8X0OMuy_3GaPE_7Zwda_dPUiuyM6z7BwuwWSELP7OtbkUqnnoCW5bUyI5OWBN7WFNLzKb2u1JpWXdQQL5PwmuCNWwN95qAGSxLSzJIJunaa3QIqv734wezi_UJl-O5-2DJv_axy8XAl" 
              loading="lazy" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8 md:p-margin-desktop">
              <div className="max-w-2xl">
                <h3 className="font-headline-lg text-2xl md:text-4xl text-white mb-4">The Atmosphere of Refined Heat</h3>
                <p className="text-white/80 font-body-lg text-sm md:text-lg">Where heritage flavors meet the electric pulse of the city. Every seat is the best seat in the house.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Menu;

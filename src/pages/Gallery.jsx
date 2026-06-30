import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/ui/SEO';

const GALLERY_ITEMS = [
  {
    id: 1,
    title: "The Walnut Lounge",
    category: "atmosphere",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCtENHCPoNrOsZK_Dx1ZYp6CnNHH5TjujhzXWmd0KNc83em2gAC3Ld2W3sW7XJPse-qJUh8v0g2VADKO0HyfZWo34yQV9aIuM-J9PQbPXHMLsgreEbNs7nHTxHyeBSSdyc5XZFiQbpua-fPc2ePL01A2Ea6J3nSL6K1VbVO4AizJ8HxkY-mxHZdiR3967vS5shElla3OKm4Pd3ysxgXRf4Y18TumF-8NWfWC31zF9griFhiOZUscQDuYSx-4v0_f3RMyp8FwlWEcqAe",
    aspect: "aspect-[4/5]"
  },
  {
    id: 2,
    title: "Signature Anju Heat",
    category: "food",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXOfQ70dJYVAurkwydvv6cXJUBmmUHI7bliIhAh_d7yV57XcSGVHaheJPwmkGeW7sjFtkoS4F8QM2CZxpH2KIE3CuGX1IwGX_J3R6MNXHPeguVmBxIcQ2T8wxmzHLnP30JY-o0-Qb2uatjtVTtobWfQxgmFwaJ1bB6NgaYY2t9vxufwyMdlPC5H-CLsg5Yh3WKiAaY_CxgUAQhW3DwjmakWrL2kl3-GfR3jsXExKBegnD88FzVo0DD363HZlcj9FzpqJFV1VUkGm2i",
    aspect: "aspect-square"
  },
  {
    id: 3,
    title: "Golden Hour Pour",
    category: "drinks",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7rLKeS8jfNMCstLIjPVQ6gmEURqUbwxmox1kyG0AQTWGoPiBqs_BMy2gikkoYDOq81D53omXiAZkW_Ckszi5hKh0RdHWr3ujpbHSOF-sLwZMtCINqEq6t3rUNEy_jpcQZRwOkKeXhhicgzFaoR1XqkFgnZdFkB7Qj94qnMdKPG7ELpJt7Q33oThm_-CGD85_yyL8khBFBSHlsElPK_CUwFG3Ti8_Po4WT-1-apxpHde20fXPoz19cIcYE20IrIQzrNw1_9F0OCWNJ",
    aspect: "aspect-[3/4]"
  },
  {
    id: 4,
    title: "The Game Night Pulse",
    category: "sports",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCNHJ_kwMBp2tyK8tokCzAksmhAPODPNzBCE0raMJmYzGoh4mIkAs0Ljq6lXRlJLziXQOx6olkBtLAFIA8PVjEL5LFB0622Hc_VhZjciJX1LH8N1ludbfgT9blqxaZxJoJ7E7XSHY3wVq-UylaW4zzVRr950AMt2c-wMInKWoszK89r-4juWMm13b2hn0Jsv5qHx2u775z2-abix-zBGFGAsaFwQbP1ARHiatCCHm5dzw49kBK1Og8_roZkb5HbO_rl8Fc947EARyFj",
    aspect: "aspect-[16/9]"
  },
  {
    id: 5,
    title: "Communal Soul",
    category: "atmosphere",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCV2X4M3EKylspostly6qCy5GyBkFaVQXHpjhJVzAowVfkMV_94voqHEiWZSTHBIESIcrKZ6r9h_f0328paIUYmjYd9Qe0EfZvvwm-13iJs_mqFJKwl12zd5wW7k3xuIoqbB1F5cc3y5oFBTzPER0VfGivPDchZMaAHtukZPAxu52r15ovqrdCEkCMb_DvCYpd8Pt32w9AStg_IeGJMdfDTPnYfOb3rmavrRrlXFE-9KxnFnhiXAPNsl8kWdDJ2_iG50QMdNWz8z2Y9",
    aspect: "aspect-[4/5]"
  },
  {
    id: 6,
    title: "Heritage Plates",
    category: "food",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgwu_HNvMJPAPB48sVnna4h2u17m-z1gXURrDS_MkGu1fUkm7CkYgu1gF_mG_h7zk7I0bQEU27qiIZe5ai4Sy304MwbCCWduEZKgle2nfQMlolVC32e1HXyVyL7OM2XVJXBZ34i02RVI9DILSKQVgDiz_JLZMuZPFk0TA4K4dUBDaviqOHgF_YG_RUxiWOEN5wd1McY2mejNzo7bqbONDPJbdCop05YppMKND5BXb0QMMuHo2pDx8MQ3yf60xAzyjv4cNeRdrsHag0",
    aspect: "aspect-[3/4]"
  },
  {
    id: 7,
    title: "The Soju Library",
    category: "drinks",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCBGgejmnGNiodbUS0Y3rzpLnq-63Rh3lKCEq_S9jezdDHOPTro4ooZSs9eiK79CfNx6vxTqHLwc9IvwGhhHt4W4XEvAt0fMYF1CJgpY7zwZzMx6xgPiZHQtQzPuLeNaYrbq27CWNfoVmXDsQkE1Zm2UQql3nXdx7J25IePDXBJKkjRDFJh8fDeY7y-g9_HkG9oeQn7rAMpVHlo4EsGGVkNuCkDvvPh1J8KnAIWNMc84XlXfDZeelLlgLR1oqpYVYPirPekdEAzyLn6",
    aspect: "aspect-square"
  },
  {
    id: 8,
    title: "The Threshold",
    category: "atmosphere",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAt1Q6Vh3206k_0EOquuV6UGfUjkaGb0Jsl90uJvtkAeyx-tAQlqDr4CMVEmnhInZXSUFIoUjTAxMW5jCx8zXPIPdbMDbDgTqDlfNXzoLovr5E0D2MLHQekEPpXXRM9bmGPPx5b-Ox-TsZC3NwPWaWj2eMN9vJb1bs7YMTfNTsAODwaA1LmWPtdgm34kDF_VZH_z9_ocxOVAtrVB0Kguk25Rd13OPdkbm6h50WUGwXf_uZrVTyb-rIkmlUoSVgXQgQvSurK48oGZ_z0",
    aspect: "aspect-[9/16]"
  },
  {
    id: 9,
    title: "The Table Story",
    category: "food",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBAe_tk2Ho7zVskEyXL3RFjuUBTl7-eEW51_ljofzII4GjKvlVSoGcsexYNOPVpzifg0INu_Ri3vRYEdOUpOgICcD0wMUz0WFmzEurwabqFkEr198Bcgm7SWtPP9hmaSS5v-WvO7FZCLYkFPmkgVbodVvbFPL9J1xpQik6xqd7Y4sMA91lKEEKNAjg4gdKSa1XAU5dyk0FWlgk-CZuEivF5xf0a4yt8An5HzRmhCHYHnDWHxJn5Lgfe0GLOkjkuYzIahjpGO8VQNr9H",
    aspect: "aspect-[4/3]"
  }
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null); // null means closed

  const categories = [
    { key: 'all', name: 'All Views' },
    { key: 'atmosphere', name: 'Atmosphere' },
    { key: 'food', name: 'Food' },
    { key: 'drinks', name: 'Drinks' },
    { key: 'sports', name: 'Sports' }
  ];

  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter(item => item.category === activeCategory);
  }, [activeCategory]);

  // Handle Keyboard Navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev + 1) % filteredItems.length);
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems]);

  const activeImage = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <>
      <SEO title="Gallery" description="Explore the ANJU HOUSE gallery - a visual showcase of our premium Korean fusion food, craft beer garden, and energetic sports events." />

      <main className="pt-32">
        {/* Hero Section */}
        <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-stack-md">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-gutter border-b border-outline-variant/20 pb-12">
            <div className="max-w-3xl">
              <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest mb-4 block">Visual Narrative</span>
              <h1 className="font-display-lg text-4xl md:text-display-lg mb-6 leading-none">
                The Spirit of <br /><span className="italic font-normal">Refined Heat.</span>
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
                A curated window into our world—where traditional Korean soul meets the vibrant pulse of a modern LA sports garden. Witness the craft, the community, and the glow.
              </p>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => {
                    setActiveCategory(cat.key);
                    setLightboxIndex(null);
                  }}
                  className={`px-6 py-2 rounded-full border text-xs tracking-widest uppercase transition-all whitespace-nowrap cursor-pointer ${
                    activeCategory === cat.key
                      ? 'border-secondary text-secondary bg-secondary/10'
                      : 'border-outline-variant text-on-surface-variant hover:border-secondary text-on-surface'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Masonry/Gallery Grid */}
        <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-stack-xl">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="break-inside-avoid mb-8 group relative overflow-hidden rounded-xl cursor-pointer"
                  onClick={() => setLightboxIndex(idx)}
                >
                  <div className={`w-full relative ${item.aspect} bg-surface-container-low overflow-hidden`}>
                    <img
                      className="w-full h-full object-cover grayscale-[20%] group-hover:scale-110 group-hover:grayscale-0 transition-all duration-700 ease-in-out"
                      alt={item.title}
                      src={item.image}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                      <span className="font-label-caps text-label-caps text-secondary mb-2 uppercase tracking-widest text-[10px]">
                        {item.category}
                      </span>
                      <h3 className="font-headline-md text-xl md:text-2xl text-white flex items-center justify-between">
                        {item.title}
                        <Maximize2 size={16} className="text-secondary/70 group-hover:text-secondary group-hover:scale-110 transition-all" />
                      </h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* Booking CTA Banner */}
        <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-stack-xl">
          <div className="relative rounded-2xl overflow-hidden py-24 px-12 text-center glass-card border border-secondary/20">
            <div className="relative z-10 flex flex-col items-center">
              <h2 className="font-display-lg text-4xl md:text-display-lg mb-8 max-w-3xl leading-tight">
                Join us for a <br /><span className="italic">night of heat.</span>
              </h2>
              <div className="flex flex-col sm:flex-row gap-6">
                <Link
                  to="/reservations"
                  className="bg-secondary text-on-secondary px-12 py-4 rounded-full font-label-caps text-label-caps uppercase tracking-widest hover:scale-105 transition-all duration-300 shadow-xl shadow-secondary/10"
                >
                  Reserve a Table
                </Link>
                <Link
                  to="/menu"
                  className="border border-white text-white px-12 py-4 rounded-full font-label-caps text-label-caps uppercase tracking-widest hover:bg-white hover:text-background transition-all duration-300"
                >
                  View the Menu
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {lightboxIndex !== null && activeImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md"
              onClick={() => setLightboxIndex(null)}
            >
              {/* Close Button */}
              <button
                className="absolute top-6 right-6 text-white/70 hover:text-white cursor-pointer z-50 p-2"
                onClick={() => setLightboxIndex(null)}
                aria-label="Close Lightbox"
              >
                <X size={32} />
              </button>

              {/* Prev Button */}
              <button
                className="absolute left-6 text-white/70 hover:text-white cursor-pointer z-50 p-2 bg-white/5 hover:bg-white/10 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
                }}
                aria-label="Previous Image"
              >
                <ChevronLeft size={36} />
              </button>

              {/* Image Frame */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative max-w-4xl max-h-[80vh] flex flex-col items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  className="max-w-full max-h-[70vh] rounded-lg object-contain shadow-2xl"
                  src={activeImage.image}
                  alt={activeImage.title}
                />
                
                <div className="mt-6 text-center w-full">
                  <span className="font-label-caps text-label-caps text-secondary uppercase tracking-[0.2em] text-xs">
                    {activeImage.category}
                  </span>
                  <h4 className="font-headline-md text-2xl text-white mt-1">
                    {activeImage.title}
                  </h4>
                </div>
              </motion.div>

              {/* Next Button */}
              <button
                className="absolute right-6 text-white/70 hover:text-white cursor-pointer z-50 p-2 bg-white/5 hover:bg-white/10 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) => (prev + 1) % filteredItems.length);
                }}
                aria-label="Next Image"
              >
                <ChevronRight size={36} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
};

export default Gallery;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Leaf, Recycle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const PickupCards = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleScrapBooking = () => {
    navigate('/booking/scrap');
  };

  const handleWasteClick = () => {
    navigate('/booking/waste');
  };

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            {t('pickupCards.title')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('pickupCards.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Waste Pickup Card */}
          <motion.div 
            whileHover={{ y: 0 }}
            className="group relative overflow-hidden rounded-3xl shadow-xl bg-card border border-border/50 opacity-60 cursor-not-allowed"
          >
            <div className="absolute top-4 right-4 z-10 bg-yellow-500/90 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
              {t('pickupCards.waste.badge') || "COMING SOON"}
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-600/5" />
            
            <div className="relative p-8 h-full flex flex-col grayscale-[0.5]">
              <div className="w-16 h-16 rounded-2xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-6">
                <Leaf className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>

              <h3 className="text-2xl font-bold mb-3 text-foreground">
                {t('pickupCards.waste.title') || "Bio-Waste Pickup"}
              </h3>
              <p className="text-muted-foreground mb-8 flex-grow">
                {t('pickupCards.waste.description') || "Scheduled collection for kitchen waste, garden trimmings, and organic matter. Perfect for homes and restaurants."}
              </p>

              <div className="flex items-center text-muted-foreground font-semibold gap-2">
                <span>{t('pickupCards.waste.button') || "Schedule Pickup"}</span>
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </motion.div>

          {/* Scrap Pickup Card */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="group relative overflow-hidden rounded-3xl shadow-xl cursor-pointer bg-card border border-border/50"
            onClick={handleScrapBooking}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative p-8 h-full flex flex-col">
              <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <Recycle className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>

              <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {t('pickupCards.scrap.title') || "Scrap Collection"}
              </h3>
              <p className="text-muted-foreground mb-8 flex-grow">
                {t('pickupCards.scrap.description') || "We collect paper, plastic, metal, and e-waste. Get paid for your recyclables while helping the planet."}
              </p>

              <div className="flex items-center text-blue-600 dark:text-blue-400 font-semibold group-hover:gap-4 gap-2 transition-all">
                <span>{t('pickupCards.scrap.button') || "Book Scrap Pickup"}</span>
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default PickupCards;

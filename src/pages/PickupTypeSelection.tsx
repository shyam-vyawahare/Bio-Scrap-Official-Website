import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Leaf, Recycle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const PickupTypeSelection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            {t('pickupSelection.title', 'Select Pickup Type')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('pickupSelection.subtitle', 'Choose the type of pickup you need')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Waste Pickup Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group relative overflow-hidden rounded-3xl bg-card border border-border opacity-60 cursor-not-allowed"
          >
            <div className="absolute top-4 right-4 z-10 bg-yellow-500/90 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
              {t('pickupCards.waste.badge') || "COMING SOON"}
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5" />
            
            <div className="p-8 md:p-10 flex flex-col h-full grayscale-[0.5]">
              <div className="w-16 h-16 rounded-2xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-6">
                <Leaf className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              
              <h3 className="text-2xl font-bold mb-3 text-foreground">
                {t('pickupCards.waste.title', 'Waste Pickup')}
              </h3>
              
              <p className="text-muted-foreground mb-8 flex-grow">
                {t('pickupCards.waste.description', 'Schedule collection for organic waste, kitchen waste, garden waste, etc.')}
              </p>

              <div className="flex items-center text-muted-foreground font-semibold">
                {t('common.continue', 'Continue')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </div>
            </div>
          </motion.div>

          {/* Scrap Pickup Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="group relative overflow-hidden rounded-3xl bg-card border border-border hover:shadow-2xl transition-all duration-300 cursor-pointer"
            onClick={() => navigate('/booking/scrap')}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="p-8 md:p-10 flex flex-col h-full">
              <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Recycle className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              
              <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-blue-600 transition-colors">
                {t('pickupCards.scrap.title', 'Scrap Pickup')}
              </h3>
              
              <p className="text-muted-foreground mb-8 flex-grow">
                {t('pickupCards.scrap.description', 'Sell your recyclable materials like plastic, paper, metal, electronics, etc.')}
              </p>

              <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
                {t('common.continue', 'Continue')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PickupTypeSelection;

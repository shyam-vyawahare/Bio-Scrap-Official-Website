import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function Shop() {
  const { t } = useTranslation();

  return (
    <div className="pt-20 min-h-screen">
      <section className="py-12 lg:py-16 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-20" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary-foreground mb-4">
              {t("shop.hero.title", "Bioscrap Shop – Sustainable products for a greener lifestyle")}
            </h1>
            <p className="text-primary-foreground/80">
              {t("shop.hero.description", "Explore eco-friendly products that complement your waste management journey.")}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 lg:px-8 py-20">
        <motion.div 
          className="text-center py-20 bg-muted/50 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            {t("shop.comingSoon.title", "Products Coming Soon")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("shop.comingSoon.description", "We are preparing sustainable products for you. Stay tuned.")}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Recycle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import {
  BarChart3,
  Building2,
  Factory,
  Home,
  Leaf,
  Package,
  ShoppingBag,
  Sprout,
  TreeDeciduous,
  Truck,
} from "lucide-react";

export default function Services() {
  const { t } = useTranslation();

  const serviceCards = [
    {
      icon: Leaf,
      title: t('services.cards.greenZone.title'),
      description: t('services.cards.greenZone.description'),
      features: t('services.cards.greenZone.features', { returnObjects: true }) as string[],
      price: t('services.cards.greenZone.price'),
      popular: false,
    },
    {
      icon: Recycle,
      title: t('services.cards.bioComposting.title'),
      description: t('services.cards.bioComposting.description'),
      features: t('services.cards.bioComposting.features', { returnObjects: true }) as string[],
      price: t('services.cards.bioComposting.price'),
      popular: true,
    },
    {
      icon: Truck,
      title: t('services.cards.foodWaste.title'),
      description: t('services.cards.foodWaste.description'),
      features: t('services.cards.foodWaste.features', { returnObjects: true }) as string[],
      price: t('services.cards.foodWaste.price'),
      popular: false,
    },
    {
      icon: BarChart3,
      title: t('services.cards.wasteAnalytics.title'),
      description: t('services.cards.wasteAnalytics.description'),
      features: t('services.cards.wasteAnalytics.features', { returnObjects: true }) as string[],
      price: t('services.cards.wasteAnalytics.price'),
      popular: false,
    },
    {
      icon: Package,
      title: t('services.cards.containerRental.title'),
      description: t('services.cards.containerRental.description'),
      features: t('services.cards.containerRental.features', { returnObjects: true }) as string[],
      price: t('services.cards.containerRental.price'),
      popular: false,
    },
    {
      icon: Sprout,
      title: t('services.cards.organicFertilizers.title'),
      description: t('services.cards.organicFertilizers.description'),
      features: t('services.cards.organicFertilizers.features', { returnObjects: true }) as string[],
      price: t('services.cards.organicFertilizers.price'),
      popular: false,
    },
  ];

  const customerTypes = [
    {
      icon: Home,
      title: t('services.customers.types.residential.title'),
      description: t('services.customers.types.residential.description'),
    },
    {
      icon: Building2,
      title: t('services.customers.types.commercial.title'),
      description: t('services.customers.types.commercial.description'),
    },
    {
      icon: Factory,
      title: t('services.customers.types.industrial.title'),
      description: t('services.customers.types.industrial.description'),
    },
    {
      icon: TreeDeciduous,
      title: t('services.customers.types.agricultural.title'),
      description: t('services.customers.types.agricultural.description'),
    },
    {
      icon: ShoppingBag,
      title: t('services.customers.types.retail.title'),
      description: t('services.customers.types.retail.description'),
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 lg:py-28 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-20" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 text-primary shadow-md font-semibold text-sm mb-6">
              <Recycle className="w-4 h-4" />
              {t('services.hero.badge')}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-foreground mb-6">
              {t('services.hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8">
              {t('services.hero.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 lg:py-32 gradient-cream">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              {t('services.grid.title')}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t('services.grid.description')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceCards.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative p-8 rounded-2xl bg-card border transition-all duration-300 hover:shadow-xl overflow-hidden group flex flex-col ${
                  service.popular
                    ? "border-primary shadow-lg shadow-primary/10"
                    : "border-border/50 hover:border-primary/30"
                }`}
              >
                <div className="absolute -right-6 -bottom-6 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-500 rotate-12">
                  <service.icon className="w-48 h-48 text-primary" />
                </div>

                
                
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                
                <h3 className="text-xl font-serif font-bold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                      <Check className="w-4 h-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="flex items-center justify-between pt-6 border-t border-border mt-auto">
                  <Button asChild variant={service.popular ? "default" : "outline"} size="sm">
                    <Link to="/booking">{t('services.grid.getStarted')}</Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Types */}
      <section className="py-20 lg:py-32 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              {t('services.customers.badge')}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              {t('services.customers.title')}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t('services.customers.description')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {customerTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-xl bg-card border border-border/50 text-center hover:border-primary/30 hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <type.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{type.title}</h3>
                <p className="text-sm text-muted-foreground">{type.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-20" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-foreground mb-6">
              {t('services.cta.title')}
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              {t('services.cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="accent" size="lg">
                <Link to="/contact">
                  {t('services.cta.consultation')}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="hero-outline" size="lg">
                <Link to="/booking">{t('services.cta.schedule')}</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

import { Link } from "react-router-dom";
import { motion, useAnimation, useInView } from "framer-motion";
import { ArrowRight, Leaf, BarChart3, BookOpen, Calendar, Package, Quote, Recycle, Star, Truck, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";
import PickupCards from "@/components/PickupCards";
import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";
import { AnimatedCounter } from "@/components/AnimatedCounter";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function Home() {
  const { t } = useTranslation();

  const stats = [
    { value: 500, label: t('home.stats.waste'), suffix: "+", unit: "kg" },
    { value: 1000, label: t('home.stats.homes'), suffix: "+", unit: "" },
    { value: 50, label: t('home.stats.co2'), suffix: "%", unit: "" },
    { value: 25, label: t('home.stats.partners'), suffix: "", unit: "+" },
  ];

  const features = [
    { icon: Leaf, title: t('home.features.collection.title'), description: t('home.features.collection.description') },
    { icon: Recycle, title: t('home.features.composting.title'), description: t('home.features.composting.description') },
    { icon: BarChart3, title: t('home.features.analytics.title'), description: t('home.features.analytics.description') },
    { icon: Package, title: t('home.features.rental.title'), description: t('home.features.rental.description') },
    { icon: Truck, title: t('home.features.pickup.title'), description: t('home.features.pickup.description') },
    { icon: BookOpen, title: t('home.features.education.title'), description: t('home.features.education.description') },
  ];

  const steps = [
    { number: "01", title: t('home.steps.step1.title'), description: t('home.steps.step1.description'), icon: Calendar },
    { number: "02", title: t('home.steps.step2.title'), description: t('home.steps.step2.description'), icon: Truck },
    { number: "03", title: t('home.steps.step3.title'), description: t('home.steps.step3.description'), icon: Recycle },
  ];

  const testimonials = [
    { 
      name: t('home.testimonials.santosh.name'), 
      role: t('home.testimonials.santosh.role'), 
      content: t('home.testimonials.santosh.content'), 
      rating: 5 
    },
    { 
      name: t('home.testimonials.priya.name'), 
      role: t('home.testimonials.priya.role'), 
      content: t('home.testimonials.priya.content'), 
      rating: 5 
    },
    { 
      name: t('home.testimonials.amit.name'), 
      role: t('home.testimonials.amit.role'), 
      content: t('home.testimonials.amit.content'), 
      rating: 5 
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <motion.div 
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <img
            src={heroBg}
            alt="Sustainable composting"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest/95 via-forest/80 to-forest/60" />
          <div className="absolute inset-0 bg-hero-pattern opacity-30" />
        </motion.div>

        {/* Animated Floating Elements */}
        <motion.div 
          className="absolute top-1/4 left-10 w-20 h-20 rounded-full bg-primary/20 blur-2xl"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-10 w-32 h-32 rounded-full bg-accent/20 blur-3xl"
          animate={{
            y: [0, 20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />

        <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <motion.span 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary border border-primary/30 text-sm font-medium mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Leaf className="w-4 h-4" />
              {t('home.hero.tagline')}
            </motion.span>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-foreground mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {t('home.hero.title')}{" "}
              <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                {t('home.hero.titleHighlight')}
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {t('home.hero.description')}
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <Button 
                asChild 
                variant="hero" 
                size="xl"
                className="group relative overflow-hidden"
              >
                <Link to="/booking" className="relative z-10">
                  <span className="relative z-10 flex items-center gap-2">
                    {t('home.hero.schedulePickup')}
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                  <motion.span 
                    className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '0%' }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </Button>
              
              <Button 
                asChild 
                variant="hero-outline" 
                size="xl"
                className="group relative overflow-hidden border-2 border-primary/30 hover:border-transparent"
              >
                <Link to="/services" className="relative z-10">
                  <span className="relative z-10">{t('home.hero.viewServices')}</span>
                  <motion.span 
                    className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors duration-300"
                  />
                </Link>
              </Button>
            </motion.div>

            {/* Enhanced Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-16 bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <motion.div 
                    key={index} 
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <div className="text-3xl md:text-4xl font-bold text-primary-foreground flex items-center justify-center gap-1">
                      <AnimatedCounter 
                        value={stat.value} 
                        duration={2} 
                        className="inline-block min-w-[2ch]"
                      />
                      {stat.unit && <span className="text-primary">{stat.unit}</span>}
                      {stat.suffix && <span className="text-primary">{stat.suffix}</span>}
                    </div>
                    <div className="text-sm text-primary-foreground/80 mt-1 font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Scroll Indicator - Moved outside hero section */}
      <div className="relative bg-background hidden md:block">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center py-8 -mt-8 relative z-10"
        >
          <span className="text-sm text-muted-foreground mb-2">{t('home.scrollExplore')}</span>
          <motion.div
            className="w-10 h-16 rounded-full border-2 border-border flex items-start justify-center p-2"
            animate={{ 
              borderColor: [
                'hsl(var(--border))', 
                'hsl(var(--primary))', 
                'hsl(var(--border))'
              ]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <motion.div
              animate={{ 
                y: [0, 12, 0],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-1.5 h-4 rounded-full bg-primary"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Pickup Cards Section */}
      <div className="relative z-20">
        <PickupCards />
      </div>

      {/* Features Section */}
      <section className="py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              {t('home.features.title')}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('home.features.subtitle')}
            </p>
          </div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="p-8 rounded-3xl bg-card border border-border/50 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary">
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 lg:py-32 gradient-cream">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              {t('home.steps.title')}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('home.steps.subtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 z-0" />
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative z-10 bg-background p-8 rounded-3xl border border-border/50 shadow-sm text-center"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-6 shadow-lg shadow-primary/20">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              {t('home.testimonials.title')}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-3xl bg-card border border-border/50 relative"
              >
                <Quote className="w-10 h-10 text-primary/20 absolute top-8 right-8" />
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-lg text-foreground mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-bold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-primary">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-emerald-900 via-green-800 to-emerald-900 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=1920&auto=format&fit=crop')] opacity-10 bg-cover bg-center mix-blend-overlay" />
        <div className="absolute inset-0 bg-hero-pattern opacity-10" />
        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 text-white drop-shadow-md">
            {t('home.cta.title')}
          </h2>
          <p className="text-xl opacity-95 mb-10 max-w-2xl mx-auto text-emerald-50 leading-relaxed">
            {t('home.cta.subtitle')}
          </p>
          <Button asChild size="xl" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <Link to="/booking">
              {t('home.cta.button')}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}

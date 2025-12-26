import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Leaf,
  Target,
  Heart,
  Users,
  Award,
  TreeDeciduous,
  Recycle,
  Globe,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function About() {
  const { t } = useTranslation();

  const values = [
    {
      icon: Leaf,
      title: t("about.values.wasteManagement.title", "Waste Management"),
      description: t("about.values.wasteManagement.description", "Complete solutions for homes, shops, offices, and institutions."),
    },
    {
      icon: Heart,
      title: t("about.values.bioProducts.title", "Bio Products"),
      description: t("about.values.bioProducts.description", "Converting organic waste into valuable resources."),
    },
    {
      icon: Target,
      title: t("about.values.organicCompost.title", "Organic Compost"),
      description: t("about.values.organicCompost.description", "High-quality compost for healthier soil and plants."),
    },
    {
      icon: Users,
      title: t("about.values.cleanIndia.title", "Clean India Mission"),
      description: t("about.values.cleanIndia.description", "Contributing to a cleaner, greener India."),
    },
  ];

  const team = [
    {
      name: t("about.team.member.name", "Our Process"),
      role: t("about.team.member.role", { step: 1 }),
      description: t("about.team.member.description1", "Door-to-door collection on a fixed schedule"),
    },
    {
      name: t("about.team.member.name", "Our Process"),
      role: t("about.team.member.role", { step: 2 }),
      description: t("about.team.member.description2", "Proper segregation of wet and dry waste"),
    },
    {
      name: t("about.team.member.name", "Our Process"),
      role: t("about.team.member.role", { step: 3 }),
      description: t("about.team.member.description3", "Bio-processing of wet waste into organic compost"),
    },
    {
      name: t("about.team.member.name", "Our Process"),
      role: t("about.team.member.role", { step: 4 }),
      description: t("about.team.member.description4", "Recycling of plastic, metal, and other materials"),
    },
  ];

  const milestones = (t("about.journey.milestones", { returnObjects: true }) as any[]).map((m: any) => ({
    year: m.year,
    event: m.event,
  }));

  const impact = [
    { value: t("about.impact.clean.value", "Clean"), label: t("about.impact.clean.label", "Surroundings"), icon: Recycle },
    { value: t("about.impact.pickup.value", "Door-to-Door"), label: t("about.impact.pickup.label", "Waste Pickup"), icon: Globe },
    { value: t("about.impact.smell.value", "No Bad"), label: t("about.impact.smell.label", "Smell or Dumping"), icon: TreeDeciduous },
    { value: t("about.impact.compost.value", "Organic"), label: t("about.impact.compost.label", "Bio-Compost"), icon: Leaf },
  ];

  const awards = t("about.awards.items", { returnObjects: true }) as string[];
  const missionList = t("about.mission.list", { returnObjects: true }) as string[];

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
              <Heart className="w-4 h-4" />
              {t("about.hero.badge", "About Us")}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-foreground mb-6">
              {t("about.hero.title", "About BioScrap")}
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80">
              {t("about.hero.subtitle", "Making India clean, green, and sustainable — starting from our own city.")}
            </p>
            <p className="mt-4 text-lg md:text-xl text-primary-foreground/80">
              {t("about.hero.description", "BioScrap is a waste management and bio-products startup based in Ambajogai. We believe waste is not useless. When managed properly, waste becomes a valuable resource.")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 lg:py-32 gradient-cream">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                {t("about.mission.badge", "What We Do")}
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
                {t("about.mission.title", "Complete Waste Management Solutions")}
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                {t("about.mission.description", "We provide complete waste management solutions for homes, shops, offices, and institutions.")}
              </p>
              <ul className="space-y-3 text-muted-foreground text-lg leading-relaxed list-disc pl-5">
                {missionList.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-6"
            >
              {values.map((value, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 lg:py-28 bg-forest relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4">
              {t("about.impact.badge", "Benefits to You")}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-foreground">
              {t("about.impact.title", "Why Choose BioScrap?")}
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {impact.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-primary-foreground/5 border border-primary-foreground/10"
              >
                <div className="w-14 h-14 mx-auto rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <div className="text-4xl font-bold text-primary-foreground mb-2">
                  {item.value}
                </div>
                <div className="text-primary-foreground/70">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 lg:py-32 gradient-cream">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              {t("about.journey.badge", "Our Journey")}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
              {t("about.journey.title", "From Idea to Impact")}
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-6 mb-8 last:mb-0"
              >
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-primary" />
                  {index < milestones.length - 1 && (
                    <div className="w-0.5 h-full bg-primary/20 mt-2" />
                  )}
                </div>
                <div className="pb-8">
                  <span className="text-sm font-semibold text-primary">{milestone.year}</span>
                  <p className="text-foreground mt-1">{milestone.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 lg:py-32 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              {t("about.team.badge", "Our Team")}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              {t("about.team.title", "Meet the Green Team")}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t("about.team.subtitle", "Passionate experts dedicated to making bio-waste management accessible and impactful.")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border/50 text-center hover:shadow-lg transition-all duration-300"
              >
                <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="w-10 h-10 text-primary" />
                </div>
                <h3 className="font-serif font-bold text-foreground text-lg">{member.name}</h3>
                <p className="text-primary text-sm font-medium mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Certifications */}
      <section className="py-20 lg:py-28 gradient-cream">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              {t("about.awards.title", "Recognized Excellence")}
            </h2>
            <p className="text-muted-foreground">
              {t("about.awards.subtitle", "Our commitment to quality and sustainability has earned us industry recognition.")}
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-8">
            {awards.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center gap-3 px-6 py-4 rounded-xl bg-card border border-border/50"
              >
                <Award className="w-6 h-6 text-primary" />
                <span className="font-semibold text-foreground">{cert}</span>
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
              {t("about.cta.title", "Join Our Green Mission")}
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              {t("about.cta.description", "Whether you're a customer, partner, or potential team member, there's a place for you in our sustainable journey.")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="accent" size="lg">
                <Link to="/booking">
                  {t("about.cta.start", "Start Today")}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="hero-outline" size="lg">
                <Link to="/contact">{t("about.cta.partner", "Partner With Us")}</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

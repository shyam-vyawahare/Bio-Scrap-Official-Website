import { motion } from "framer-motion";
import { Link } from "react-router-dom";
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

const values = [
  {
    icon: Leaf,
    title: "Waste Management",
    description: "Complete solutions for homes, shops, offices, and institutions.",
  },
  {
    icon: Heart,
    title: "Bio Products",
    description: "Converting organic waste into valuable resources.",
  },
  {
    icon: Target,
    title: "Organic Compost",
    description: "High-quality compost for healthier soil and plants.",
  },
  {
    icon: Users,
    title: "Clean India Mission",
    description: "Contributing to a cleaner, greener India.",
  },
];

const team = [
  {
    name: "Our Process",
    role: "Step 1",
    description: "Door-to-door collection on a fixed schedule",
  },
  {
    name: "Our Process",
    role: "Step 2",
    description: "Proper segregation of wet and dry waste",
  },
  {
    name: "Our Process",
    role: "Step 3",
    description: "Bio-processing of wet waste into organic compost",
  },
  {
    name: "Our Process",
    role: "Step 4",
    description: "Recycling of plastic, metal, and other materials",
  },
];

const milestones = [
  { year: "Benefit", event: "Reduces soil and plastic pollution" },
  { year: "Benefit", event: "Reduces waste going to landfills" },
  { year: "Benefit", event: "Promotes reuse and recycling" },
  { year: "Benefit", event: "Supports Swachh Bharat Abhiyan" },
  { year: "Benefit", event: "Creates local green employment" },
  { year: "Benefit", event: "Encourages circular economy" },
];

const impact = [
  { value: "Clean", label: "Surroundings", icon: Recycle },
  { value: "Door-to-Door", label: "Waste Pickup", icon: Globe },
  { value: "No Bad", label: "Smell or Dumping", icon: TreeDeciduous },
  { value: "Organic", label: "Bio-Compost", icon: Leaf },
];

export default function About() {
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
              About Us
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-foreground mb-6">
              About BioScrap
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80">
              Making India clean, green, and sustainable — starting from our own city.
            </p>
            <p className="mt-4 text-lg md:text-xl text-primary-foreground/80">
              BioScrap is a waste management and bio-products startup based in Ambajogai. 
              We believe waste is not useless. When managed properly, waste becomes a valuable resource.
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
                What We Do
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
                Complete Waste Management Solutions
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                We provide complete waste management solutions for homes, shops, offices, and institutions.
              </p>
              <ul className="space-y-3 text-muted-foreground text-lg leading-relaxed list-disc pl-5">
                <li>Collect wet waste such as kitchen waste, food waste, and garden waste</li>
                <li>Collect dry waste such as plastic, paper, metal, and glass</li>
                <li>Collect scrap and recyclable materials</li>
                <li>Ensure proper waste segregation</li>
                <li>Process waste responsibly instead of dumping it in landfills</li>
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
              Benefits to You
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-foreground">
              Why Choose BioScrap?
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
              Our Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
              From Idea to Impact
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
              Our Team
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Meet the Green Team
            </h2>
            <p className="text-muted-foreground text-lg">
              Passionate experts dedicated to making bio-waste management accessible and impactful.
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
              Recognized Excellence
            </h2>
            <p className="text-muted-foreground">
              Our commitment to quality and sustainability has earned us industry recognition.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-8">
            {["ISO 14001", "Green Business", "Zero Waste", "Carbon Neutral"].map((cert, index) => (
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
              Join Our Green Mission
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Whether you're a customer, partner, or potential team member, there's a place for you in our sustainable journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="accent" size="lg">
                <Link to="/booking">
                  Start Today
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="hero-outline" size="lg">
                <Link to="/contact">Partner With Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

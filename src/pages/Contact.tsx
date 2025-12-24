import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  service: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000),
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    value: "9607195770",
    description: "Mon-Sat: 8am - 6pm",
  },
  {
    icon: Mail,
    title: "Email",
    value: "Bioscrapp@gmail.com",
    description: "We reply within 24 hours",
  },
  {
    icon: MapPin,
    title: "Office",
    value: "Bioscrap Office, Gandhi Nagar, Ambajogai",
    description: "Tq. Ambajogai, Dist. Beed, Maharashtra – PIN 431517",
  },
  {
    icon: Clock,
    title: "Working Hours",
    value: "Mon - Sat",
    description: "8:00 AM - 6:00 PM",
  },
];

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const formData = new FormData();
      formData.append('access_key', 'e9fc4476-2137-46e0-9e9b-73e57ae94d68');
      formData.append('Name', data.name);
      formData.append('Email', data.email);
      formData.append('Phone', data.phone);
      if (data.service) formData.append('Service', data.service);
      formData.append('Message', data.message);

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        toast({
          title: "Message Sent!",
          description: "We'll get back to you within 24 hours.",
        });
        reset();
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        throw new Error(result.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive"
      });
    }
  };

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
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary border border-primary/30 text-sm font-medium mb-6">
              <MessageSquare className="w-4 h-4" />
              Get In Touch
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-foreground mb-6">
              Let's Start a Conversation
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80">
              Have questions about our services? We're here to help you start your sustainable journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 lg:py-32 gradient-cream">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2"
            >
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-8">
                Contact Information
              </h2>
              
              <div className="space-y-6 mb-12">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{info.title}</h3>
                      <p className="text-foreground">{info.value}</p>
                      <p className="text-sm text-muted-foreground">{info.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Map Placeholder */}
              <div className="rounded-2xl overflow-hidden border border-border/50 h-64 bg-muted flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-primary/30 mx-auto mb-2" />
                  <p className="text-muted-foreground">Interactive map coming soon</p>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-3"
            >
              <div className="p-8 lg:p-10 rounded-2xl bg-card border border-border/50 shadow-lg">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-2">
                  Send Us a Message
                </h2>
                <p className="text-muted-foreground mb-8">
                  Fill out the form below and we'll get back to you shortly.
                </p>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-6">
                      <CheckCircle className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="text-xl font-serif font-bold text-foreground mb-2">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-muted-foreground">
                      We'll get back to you within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <form action="https://api.web3forms.com/submit" method="POST" onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(onSubmit)(e);
                  }} className="space-y-6">
                    <input type="hidden" name="access_key" value="e9fc4476-2137-46e0-9e9b-73e57ae94d68" />
                    <input type="hidden" name="subject" value="📩 New Contact Inquiry – BioScrap Website" />
                    <input type="hidden" name="from_name" value="BioScrap Website" />
                    <input type="hidden" name="replyto" value="{email}" />
                    <input type="hidden" name="Website" value="BioScrap – Contact Page" />
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="Name"
                          placeholder="John Doe"
                          {...register("name", { required: true })}
                          className="mt-2"
                          required
                        />
                        {errors.name && (
                          <p className="text-sm text-destructive mt-1">
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="Email"
                          type="email"
                          placeholder="john@example.com"
                          {...register("email", { required: true })}
                          className="mt-2"
                          required
                        />
                        {errors.email && (
                          <p className="text-sm text-destructive mt-1">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          name="Phone"
                          type="tel"
                          placeholder="9607195770"
                          {...register("phone", { required: true })}
                          className="mt-2"
                          required
                        />
                        {errors.phone && (
                          <p className="text-sm text-destructive mt-1">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="service">Service Interest</Label>
                        <Select 
                          name="Service"
                          onValueChange={(value) => setValue("service", value)}
                        >
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="collection">Waste Collection</SelectItem>
                            <SelectItem value="composting">Bio-Composting</SelectItem>
                            <SelectItem value="analytics">Waste Analytics</SelectItem>
                            <SelectItem value="containers">Container Rental</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message">Your Message *</Label>
                      <Textarea
                        id="message"
                        name="Message"
                        placeholder="Tell us how we can help you..."
                        rows={5}
                        {...register("message", { required: true })}
                        className="mt-2"
                        required
                      />
                      {errors.message && (
                        <p className="text-sm text-destructive mt-1">
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      variant="hero"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>Sending...</>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ CTA */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center">
            <h3 className="text-xl font-serif font-bold text-foreground mb-2">
              Looking for quick answers?
            </h3>
            <p className="text-muted-foreground mb-4">
              Check out our frequently asked questions for instant help.
            </p>
            <Button variant="outline" size="lg">
              View FAQs
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

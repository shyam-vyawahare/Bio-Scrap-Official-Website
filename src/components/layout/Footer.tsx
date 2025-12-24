import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, MessageCircle } from 'lucide-react';

export function Footer() {
  const socials = [
    { icon: Facebook, href: "https://www.facebook.com/share/1GRp9msZ71/", label: "Facebook" },
    { icon: Instagram, href: "https://www.instagram.com/bioscrap.in?igsh=d3JtZHIyM3N1MWlr&utm_source=ig_contact_invite", label: "Instagram" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/bioscrap/about/?viewAsMember=true", label: "LinkedIn" },
    { icon: MessageCircle, href: "https://wa.me/message/J6YOFYRWWVEUI1", label: "WhatsApp" },
  ];

  return (
    <footer className="bg-forest text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* LEFT COLUMN - Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <MapPin className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold">Bio-Scrap</h3>
            </div>
            <p className="mb-4 text-sm text-primary-foreground/80">Sustainable scrap collection and bio-waste solutions across Maharashtra.</p>
            <div className="space-y-2 text-sm">
              <a href="tel:9607195770" className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary transition-colors">
                <Phone size={16} /> 9607195770
              </a>
              <a href="mailto:Bioscrapp@gmail.com" className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary transition-colors">
                <Mail size={16} /> Bioscrapp@gmail.com
              </a>
              <div className="flex items-start gap-2 text-primary-foreground/80">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <p className="text-sm">Bioscrap Office, Gandhi Nagar, Ambajogai, Tq. Ambajogai, Dist. Beed, Maharashtra – PIN 431517</p>
              </div>
              <div className="flex items-center gap-4 mt-4">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground/70 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    <s.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* MIDDLE COLUMN - Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-primary-foreground/80 hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/services" className="text-primary-foreground/80 hover:text-primary transition-colors">Services</Link></li>
              <li><Link to="/about" className="text-primary-foreground/80 hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-primary-foreground/80 hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/shop" className="text-primary-foreground/80 hover:text-primary transition-colors">Shop</Link></li>
              <li><Link to="/booking" className="text-primary-foreground/80 hover:text-primary transition-colors">Book Pickup</Link></li>
              <li><Link to="/faq" className="text-primary-foreground/80 hover:text-primary transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* RIGHT COLUMN - Director Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Director</h3>
            <div className="space-y-3 text-sm">
              <p className="font-semibold text-base text-primary-foreground">Harshad V. Renapure</p>
              <a href="tel:9607195770" className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary transition-colors">
                <Phone size={16} /> 9607195770
              </a>
              <a href="mailto:harshadrenapure@gmail.com" className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary transition-colors">
                <Mail size={16} /> harshadrenapure@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* FOOTER BOTTOM */}
        <div className="border-t border-primary-foreground/10 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p className="text-primary-foreground/70">© 2025 BioScrap – All rights reserved</p>
          <p className="text-primary-foreground/70">
            Powered by{' '}
            <a 
              href="https://yuktitechsolution.co.in/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-foreground font-semibold transition-colors"
            >
              Yukti Tech Solution
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

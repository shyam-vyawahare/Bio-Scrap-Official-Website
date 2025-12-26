import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, MessageCircle, Twitter } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();

  const socials = [
    { icon: Facebook, href: "https://www.facebook.com/share/1GRp9msZ71/", label: "Facebook" },
    { icon: Instagram, href: "https://www.instagram.com/bioscrap.in?igsh=d3JtZHIyM3N1MWlr&utm_source=ig_contact_invite", label: "Instagram" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/bioscrap/about/?viewAsMember=true", label: "LinkedIn" },
    { icon: MessageCircle, href: "https://wa.me/message/J6YOFYRWWVEUI1", label: "WhatsApp" },
    { icon: Twitter, href: "https://x.com/Bio_Scrap", label: "X (Twitter)" },
  ];

  return (
    <footer className="bg-[#1a2e1a] text-primary-foreground pt-16 pb-8 border-t border-white/10 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-5 mix-blend-overlay pointer-events-none" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="relative">
                <img
                  src="/images/Bioscrap.jpeg"
                  alt="Bioscrap Logo"
                  className="w-20 h-20 rounded-full object-cover border-2 border-white/10"
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-accent animate-pulse border-2 border-[#1a2e1a]" />
              </div>
              <span className="text-3xl font-serif font-bold text-white">
                {t('footer.brand')}
              </span>
            </Link>
            <p className="mb-4 text-sm text-primary-foreground/80">{t('footer.description')}</p>
            <div className="space-y-2 text-sm">
              <a href="tel:9607195770" className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary transition-colors">
                <Phone size={16} /> 9607195770
              </a>
              <a href="mailto:Bioscrapp@gmail.com" className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary transition-colors">
                <Mail size={16} /> Bioscrapp@gmail.com
              </a>
              <div className="flex items-start gap-2 text-primary-foreground/80">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <p className="text-sm">{t('footer.address')}</p>
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
            <h3 className="text-xl font-bold mb-4">{t('footer.quickLinks.title')}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-primary-foreground/80 hover:text-primary transition-colors">{t('footer.quickLinks.home')}</Link></li>
              <li><Link to="/services" className="text-primary-foreground/80 hover:text-primary transition-colors">{t('footer.quickLinks.services')}</Link></li>
              <li><Link to="/about" className="text-primary-foreground/80 hover:text-primary transition-colors">{t('footer.quickLinks.about')}</Link></li>
              <li><Link to="/contact" className="text-primary-foreground/80 hover:text-primary transition-colors">{t('footer.quickLinks.contact')}</Link></li>
              <li><Link to="/shop" className="text-primary-foreground/80 hover:text-primary transition-colors">{t('footer.quickLinks.shop')}</Link></li>
              <li><Link to="/booking" className="text-primary-foreground/80 hover:text-primary transition-colors">{t('footer.quickLinks.bookPickup')}</Link></li>
              <li><Link to="/faq" className="text-primary-foreground/80 hover:text-primary transition-colors">{t('footer.quickLinks.faq')}</Link></li>
            </ul>
          </div>

          {/* RIGHT COLUMN - Director Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('footer.director.title')}</h3>
            <div className="space-y-3 text-sm">
              <p className="font-semibold text-base text-primary-foreground">{t('footer.director.name')}</p>
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
          <p className="text-primary-foreground/70">{t('footer.rights')}</p>
          <p className="text-primary-foreground/70">
            {t('footer.poweredBy')}{' '}
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

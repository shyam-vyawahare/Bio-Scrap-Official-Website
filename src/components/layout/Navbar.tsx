import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Leaf, Phone, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import LanguageToggle from "@/components/LanguageToggle";
import { useCart } from "@/context/CartContext";

export function Navbar() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { items } = useCart();
  const itemCount = items.reduce((acc, i) => acc + i.qty, 0);

  const navLinks = [
    { name: t('navbar.home'), path: "/" },
    { name: t('navbar.services'), path: "/services" },
    { name: t('navbar.about'), path: "/about" },
    { name: t('navbar.contact'), path: "/contact" },
    { name: t('nav.shop'), path: "/shop" },
  ];

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-card/95 backdrop-blur-md shadow-md py-3"
      )}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group relative z-50">
            <div className="relative">
              <img
                src="/images/Bioscrap.jpeg"
                alt="Bioscrap Logo"
                className="w-10 h-10 rounded-full object-cover border border-border/10"
              />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-accent animate-pulse border-2 border-background" />
            </div>
            <span className="text-xl font-serif font-bold text-foreground">
              <span className="text-primary">Bio</span>scrap
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "relative text-sm font-medium transition-colors duration-300 hover:text-primary",
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-foreground/80"
                )}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+919607195770"
              className="flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>9607195770</span>
            </a>
            <LanguageToggle />
            <Button asChild variant="outline" className="relative">
              <Link to="/cart">
                <ShoppingCart className="w-4 h-4 mr-2" />
                <span>{t('nav.cart')}</span>
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>
            </Button>
            <Button asChild variant="hero" size="default">
              <Link to="/booking">{t('nav.bookPickup')}</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-md bg-background/80 backdrop-blur-sm border border-border hover:bg-accent transition-colors relative z-50"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-md shadow-xl border-t border-border/50 z-40"
            >
              <div className="container mx-auto px-4 py-8 space-y-6">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      className={cn(
                        "block text-lg font-medium py-2 transition-colors",
                        location.pathname === link.path
                          ? "text-primary font-bold"
                          : "text-foreground/80 hover:text-primary"
                      )}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="pt-4 border-t border-border/50"
                >
                  <Button asChild variant="hero" size="lg" className="w-full">
                    <Link to="/booking">{t('nav.bookPickup')}</Link>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

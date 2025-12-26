import React, { useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/config';
import { Layout } from "@/components/layout/Layout";
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";
import PickupTypeSelection from "./pages/PickupTypeSelection";
import ScrapSelection from "./pages/ScrapSelection";
import ScrapWeight from "./pages/ScrapWeight";
import Receipt from "./pages/Receipt";
import ScrollToTop from "./components/ScrollToTop";
import NotFound from "./pages/NotFound";
import Shop from "./pages/Shop";
import Checkout from "./pages/Checkout";
import Cart from "./pages/Cart";
import FAQ from "./pages/FAQ";
import { CartProvider } from "./context/CartContext";
import { MessageCircle } from 'lucide-react';

const queryClient = new QueryClient();

const App = () => {
  // Set the HTML lang attribute based on the current language
  useEffect(() => {
    const savedLang = localStorage.getItem('language') || 'en';
    document.documentElement.lang = savedLang;
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <CartProvider>
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/booking" element={<PickupTypeSelection />} />
                  <Route path="/booking/waste" element={<Booking mode="waste" />} />
                  <Route path="/booking/scrap" element={<ScrapSelection />} />
                  <Route path="/booking/scrap/weight" element={<ScrapWeight />} />
                  <Route path="/booking/scrap/schedule" element={<Booking mode="scrap" />} />
                  <Route path="/receipt" element={<Receipt />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Layout>
              
              {/* Floating WhatsApp Button - Hidden on booking pages */}
              {!location.pathname.startsWith('/booking') && (
                <a 
                  href="https://wa.me/919607195770?text=Hello%20Bio-Scrap!%20I%20would%20like%20to%20know%20more%20about%20your%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fixed bottom-6 right-6 z-40 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 hover:scale-110 transition-all duration-300 min-w-[56px] min-h-[56px] flex items-center justify-center
                    sm:bottom-6 sm:right-6
                    max-sm:bottom-20 max-sm:right-4"
                  aria-label="Contact us on WhatsApp"
                >
                  <MessageCircle size={28} />
                </a>
              )}
            </CartProvider>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </I18nextProvider>
  );
};

export default App;

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function FAQ() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = t('faqPage.items', { returnObjects: true }) as Array<{ question: string; answer: string }>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-emerald-50">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('faqPage.title')}</h1>
          <p className="text-lg md:text-xl text-emerald-100">{t('faqPage.subtitle')}</p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg shadow-md border border-emerald-100 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-emerald-50 transition-colors min-h-[60px]"
                >
                  <span className="font-semibold text-lg pr-4">{faq.question}</span>
                  <ChevronDown 
                    className={`flex-shrink-0 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    size={24}
                  />
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 py-5 bg-emerald-50 border-t border-emerald-100">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 text-center bg-white rounded-lg shadow-md p-8 border border-emerald-100">
            <h3 className="text-2xl font-bold mb-4">{t('faqPage.ctaTitle')}</h3>
            <p className="text-gray-600 mb-6">{t('faqPage.ctaDesc')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:9607195770"
                className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors min-h-[48px] flex items-center justify-center font-semibold"
              >
                {t('faqPage.callUs')}
              </a>
              <a 
                href="https://wa.me/919607195770"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition-colors min-h-[48px] flex items-center justify-center font-semibold"
              >
                {t('faqPage.whatsappUs')}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

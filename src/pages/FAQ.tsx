import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function FAQ() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What types of waste do you collect?",
      answer: "We collect all types of waste including wet waste (kitchen waste, garden waste), dry waste (paper, plastic, metal, glass), recyclables, e-waste (electronic items), and organic waste. We segregate everything properly for appropriate processing."
    },
    {
      question: "What areas do you serve?",
      answer: "We primarily serve Ambajogai and surrounding areas in Beed district, Maharashtra. We are expanding our services to nearby villages and towns. Contact us to check if we serve your area."
    },
    {
      question: "How do I schedule a pickup?",
      answer: "You can schedule a pickup by clicking the 'Book Pickup' button on our website, calling us at 9607195770, or messaging us on WhatsApp. We offer regular daily/weekly schedules or one-time pickups as per your needs."
    },
    {
      question: "What are your collection timings?",
      answer: "We collect waste daily during morning hours (7 AM - 11 AM) for residential areas and flexible timings for commercial establishments. Regular schedules are maintained for subscribed customers."
    },
    {
      question: "What happens to the collected waste?",
      answer: "Collected waste is segregated at our facility. Wet waste goes to our bio-composting unit where it's converted into organic manure. Dry waste is sent to authorized recycling partners. E-waste is disposed through proper channels ensuring environmental safety."
    },
    {
      question: "Do you provide bio-compost? How can I purchase it?",
      answer: "Yes! We produce high-quality bio-compost from wet waste. You can purchase it through our Shop page or by contacting us directly. Available in 5kg, 10kg, and 25kg bags. Great for gardens, farms, and potted plants."
    },
    {
      question: "What are your service charges?",
      answer: "Service charges vary based on the type of service, frequency, and quantity of waste. Residential services start from affordable monthly plans. Contact us at 9607195770 for a customized quote for your needs."
    },
    {
      question: "How does waste segregation help the environment?",
      answer: "Proper waste segregation reduces landfill burden, enables effective recycling, prevents soil and water pollution, reduces greenhouse gas emissions from decomposing waste, and helps create valuable compost from organic waste. It's crucial for a sustainable future."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-emerald-50">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-lg md:text-xl text-emerald-100">Find answers to common questions about our services</p>
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
            <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
            <p className="text-gray-600 mb-6">Feel free to reach out to us directly</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:9607195770"
                className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors min-h-[48px] flex items-center justify-center font-semibold"
              >
                Call Us: 9607195770
              </a>
              <a 
                href="https://wa.me/919607195770"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition-colors min-h-[48px] flex items-center justify-center font-semibold"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

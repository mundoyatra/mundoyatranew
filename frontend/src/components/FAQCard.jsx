import React, { useEffect, useState } from 'react';
import * as LucideIcons from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Card, CardContent } from './ui/card';
import { api } from '../lib/api';

const FAQCard = () => {
  const [faqs, setFaqs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    api
      .get('/faqs')
      .then((res) => setFaqs(res.data))
      .catch(() => {});
  }, []);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="pt-32 pb-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1 bg-yellow-400 text-blue-900 rounded-full text-sm font-semibold mb-4">
              FAQs
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
              Frequently Asked Questions About Travel & Tour Packages
            </h1>
            <p className="text-gray-600 text-lg">
              Find answers related to travel packages, flight bookings, hotels, and holiday planning
            </p>
          </div>

          <div className="space-y-5">
            {faqs.map((faq, index) => {
              const isOpen = activeIndex === index;

              return (
                <Card
                  key={index}
                  className="border-2 border-gray-200 hover:border-yellow-400 transition-all duration-300 bg-white"
                >
                  <CardContent className="p-0">
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full flex justify-between items-center p-5 text-left"
                    >
                      <span className="font-semibold text-blue-900 text-lg">{faq.question}</span>

                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-400 flex-shrink-0 ml-4">
                        {isOpen ? (
                          <LucideIcons.Minus className="text-blue-900" />
                        ) : (
                          <LucideIcons.Plus className="text-blue-900" />
                        )}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 text-gray-600 leading-relaxed border-t pt-3">
                        {faq.answer}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQCard;

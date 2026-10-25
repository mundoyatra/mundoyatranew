import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Card, CardContent } from './ui/card';

const faqs = [
  {
    question: 'How do I book a travel package with Mundo Yatra?',
    answer:
      'Booking a travel package with Mundo Yatra is simple and hassle-free. You can explore our domestic and international tour packages, fill out the inquiry form, or contact our travel experts directly. We assist you with flight bookings, hotel reservations, itinerary planning, and complete holiday package customization.',
  },
  {
    question: 'Do you offer customized holiday packages for India and international destinations?',
    answer:
      'Yes, Mundo Yatra specializes in customized travel packages for both Indian and international destinations. Whether you are planning a honeymoon, family vacation, group tour, or solo trip, we create personalized itineraries including flights, hotels, sightseeing, and transfers based on your budget and preferences.',
  },
  {
    question: 'Are flights and hotel bookings included in your tour packages?',
    answer:
      'Most of our tour packages include flight bookings, hotel accommodations, airport transfers, and guided sightseeing. We offer flexible options where you can choose complete packages or only specific services like flight tickets or hotel bookings.',
  },
  {
    question: 'Which are the best travel destinations you offer packages for?',
    answer:
      'We offer travel packages for top destinations in India such as Goa, Manali, Kashmir, Kerala, and Rajasthan, as well as international destinations like Dubai, Bali, Maldives, Thailand, and Europe. Our packages are designed to provide the best travel experience at competitive prices.',
  },
  {
    question: 'Do you provide visa assistance and travel insurance for international trips?',
    answer:
      'Yes, Mundo Yatra provides complete travel assistance including visa support, documentation guidance, and travel insurance for international trips. Our team ensures a smooth and stress-free travel experience from booking to return.',
  },
  {
    question: 'What is the cancellation and refund policy for travel bookings?',
    answer:
      'Our cancellation and refund policies depend on the specific travel package, airline, and hotel bookings. We ensure transparent policies and guide you through cancellation charges, refunds, and rescheduling options before confirming your booking.',
  },
  {
    question: 'Why should I choose Mundo Yatra for travel and tour packages?',
    answer:
      'Mundo Yatra is a trusted travel agency offering affordable tour packages, expert travel planning, and 24/7 customer support. We provide the best deals on flights, hotels, and holiday packages with personalized service to ensure a memorable travel experience.',
  },
];

const FAQCard = () => {
  const [activeIndex, setActiveIndex] = useState(null);

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

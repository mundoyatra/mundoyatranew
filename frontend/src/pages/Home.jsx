import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import ServiceCard from '../components/ServiceCard';
import DestinationCard from '../components/DestinationCard';
import DestinationModal from '../components/DestinationModal';
import TestimonialCard from '../components/TestimonialCard';
import LeadForm from '../components/LeadForm';
import { Card, CardContent } from '../components/ui/card';
import * as LucideIcons from 'lucide-react';
import {
  services,
  indianDestinations,
  internationalDestinations,
  testimonials,
  whyChooseUs,
  aboutContent
} from '../data/mock';

const iconMap = {
  'badge-indian-rupee': 'BadgeIndianRupee',
  'headset': 'Headset',
  'sparkles': 'Sparkles',
  'award': 'Award',
  'network': 'Network',
  'shield-check': 'ShieldCheck'
};

const Home = () => {
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDestination = (destination) => {
    setSelectedDestination(destination);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDestination(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Indian Destinations Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1 bg-blue-50 text-blue-900 rounded-full text-sm font-semibold mb-4">
              Explore India
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
              Popular Domestic Destinations
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover the incredible diversity of India with our curated tour packages
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {indianDestinations.map((destination) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                onViewDetails={() => handleViewDestination(destination)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* International Destinations Section */}
      <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1 bg-yellow-400 text-blue-900 rounded-full text-sm font-semibold mb-4">
              Go Global
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
              International Holiday Packages
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Explore the world's most sought-after destinations at unbeatable prices
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {internationalDestinations.map((destination) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                onViewDetails={() => handleViewDestination(destination)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-1 bg-blue-50 text-blue-900 rounded-full text-sm font-semibold mb-4">
                About Us
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
                {aboutContent.title}
              </h2>
              <p className="text-lg text-yellow-600 font-semibold mb-4">
                {aboutContent.subtitle}
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                {aboutContent.description}
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                {aboutContent.mission}
              </p>
              <ul className="space-y-3">
                {aboutContent.values.map((value, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <LucideIcons.CheckCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{value}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <img
                src={aboutContent.image}
                alt="About Mundo Yatra"
                className="rounded-lg shadow-2xl w-full h-[500px] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-yellow-400 text-blue-900 p-6 rounded-lg shadow-xl">
                <div className="text-4xl font-bold">10+</div>
                <div className="text-sm font-semibold">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1 bg-yellow-400 text-blue-900 rounded-full text-sm font-semibold mb-4">
              Our Services
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
              Comprehensive Travel Solutions
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              From flight bookings to complete holiday packages, we handle every aspect of your travel needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1 bg-blue-50 text-blue-900 rounded-full text-sm font-semibold mb-4">
              Why Mundo Yatra
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
              Why Travelers Choose Us
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Experience the difference with our commitment to excellence and customer satisfaction
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item) => {
              const IconComponent = LucideIcons[iconMap[item.icon]] || LucideIcons.Circle;
              return (
                <Card key={item.id} className="border-2 border-gray-200 hover:border-yellow-400 transition-colors bg-white">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-400 mb-4">
                      <IconComponent className="w-8 h-8 text-blue-900" />
                    </div>
                    <h3 className="text-xl font-semibold text-blue-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1 bg-yellow-400 text-blue-900 rounded-full text-sm font-semibold mb-4">
              Testimonials
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
              What Our Travelers Say
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Read real experiences from our satisfied customers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Lead Form Section */}
      <div id="lead-form-section">
        <LeadForm />
      </div>

      <Footer />

      {/* Destination Modal */}
      <DestinationModal
        destination={selectedDestination}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Home;

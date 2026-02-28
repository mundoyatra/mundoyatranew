import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MessageCircle, Plane } from 'lucide-react';
import { Button } from './ui/button';
import { heroImages } from '../data/mock';

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + heroImages.length) % heroImages.length);
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/919354262859', '_blank');
  };

  const scrollToLeadForm = () => {
    const leadFormSection = document.getElementById('lead-form-section');
    if (leadFormSection) {
      leadFormSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Background Images with Carousel */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt={`Travel destination ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
          </div>
        ))}
      </div>

      {/* Carousel Controls */}
      <button
        onClick={prevImage}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center transition-colors"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextImage}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center transition-colors"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Carousel Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentImageIndex ? 'bg-yellow-400 w-8' : 'bg-white/50'
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-yellow-400/90 backdrop-blur-sm text-blue-900 px-4 py-2 rounded-full mb-6">
              <Plane className="w-4 h-4" />
              <span className="text-sm font-semibold">Trusted by 50,000+ Travelers</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Explore the World with{' '}
              <span className="text-yellow-400">Mundo Yatra</span>
            </h1>

            {/* Subheading */}
            <p className="text-xl sm:text-2xl text-gray-100 mb-8 leading-relaxed">
              Your Trusted Travel Partner for Flights, Visa, Holiday Packages, Medical Tourism & More
            </p>

            {/* Service Tags */}
            <div className="flex flex-wrap gap-3 mb-8">
              {['Flights', 'Visa', 'Packages', 'Medical Tourism', 'Hotels', 'Cab Services'].map((service) => (
                <span
                  key={service}
                  className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full border border-white/30"
                >
                  {service}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={scrollToLeadForm}
                className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold h-14 px-8 text-lg shadow-xl"
              >
                Plan My Trip
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleWhatsApp}
                className="border-2 border-white text-white hover:bg-white hover:text-blue-900 h-14 px-8 text-lg font-semibold backdrop-blur-sm"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Chat on WhatsApp
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex flex-wrap gap-8 text-white">
              <div>
                <div className="text-3xl font-bold text-yellow-400">10+</div>
                <div className="text-sm text-gray-200">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-400">50K+</div>
                <div className="text-sm text-gray-200">Happy Travelers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-400">100+</div>
                <div className="text-sm text-gray-200">Destinations</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-400">24/7</div>
                <div className="text-sm text-gray-200">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

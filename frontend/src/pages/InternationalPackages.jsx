import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DestinationCard from '../components/DestinationCard';
import LeadForm from '../components/LeadForm';
import { internationalDestinations } from '../data/mock';

const InternationalPackages = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-blue-900 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">International Tour Packages</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Explore the world's most beautiful destinations with our affordable packages
          </p>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {internationalDestinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-blue-900 text-center mb-12">
            What's Included in Our International Packages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              'Round-trip flight tickets',
              'Quality hotel accommodation',
              'Daily breakfast included',
              'Visa assistance support',
              'Airport transfers',
              'Sightseeing tours',
              'Travel insurance',
              '24/7 support hotline'
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center">
                <p className="text-gray-700 font-medium">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Regions */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-blue-900 text-center mb-12">
            Explore by Region
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                region: 'Southeast Asia',
                countries: 'Thailand, Bali, Singapore, Vietnam, Malaysia',
                image: 'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f'
              },
              {
                region: 'Middle East',
                countries: 'Dubai, Abu Dhabi, Turkey, Jordan',
                image: 'https://images.unsplash.com/flagged/photo-1559717201-fbb671ff56b7'
              },
              {
                region: 'Europe',
                countries: 'France, Italy, Switzerland, Spain, UK',
                image: 'https://images.pexels.com/photos/28940115/pexels-photo-28940115.jpeg'
              }
            ].map((region, index) => (
              <div key={index} className="relative h-64 rounded-lg overflow-hidden shadow-xl group">
                <img
                  src={region.image}
                  alt={region.region}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{region.region}</h3>
                  <p className="text-sm text-gray-200">{region.countries}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Form */}
      <LeadForm />

      <Footer />
    </div>
  );
};

export default InternationalPackages;

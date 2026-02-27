import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CheckCircle, Target, Users, Heart } from 'lucide-react';
import { aboutContent } from '../data/mock';

const About = () => {
  const stats = [
    { value: '10+', label: 'Years of Experience' },
    { value: '50K+', label: 'Happy Travelers' },
    { value: '100+', label: 'Destinations' },
    { value: '24/7', label: 'Customer Support' }
  ];

  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To make travel accessible, affordable, and memorable for everyone. We strive to create experiences that last a lifetime.'
    },
    {
      icon: Users,
      title: 'Our Team',
      description: 'Experienced travel consultants dedicated to understanding your needs and crafting perfect travel solutions.'
    },
    {
      icon: Heart,
      title: 'Our Values',
      description: 'Customer satisfaction, transparent pricing, expert guidance, and quality service form the foundation of everything we do.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-blue-900 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Mundo Yatra</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              {aboutContent.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 -mt-24">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow-xl p-6 text-center border-t-4 border-yellow-400">
                <div className="text-4xl font-bold text-blue-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">
                Who We Are
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                {aboutContent.description}
              </p>
              <p className="text-gray-700 leading-relaxed text-lg">
                {aboutContent.mission}
              </p>
            </div>
            <div className="relative">
              <img
                src={aboutContent.image}
                alt="Mundo Yatra Team"
                className="rounded-lg shadow-2xl w-full h-[400px] object-cover"
              />
            </div>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-400 mb-4">
                  <value.icon className="w-8 h-8 text-blue-900" />
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>

          {/* Core Values List */}
          <div className="bg-white rounded-lg shadow-xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-blue-900 mb-8 text-center">
              Why Choose Mundo Yatra?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {aboutContent.values.map((value, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                  <p className="text-gray-700 text-lg">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;

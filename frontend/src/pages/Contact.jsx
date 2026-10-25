import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import LeadForm from '../components/LeadForm';
import { contactInfo } from '../data/mock';

const Contact = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-blue-900 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Have questions? We're here to help you plan your perfect journey
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-24 mb-16">
            <div className="bg-white rounded-lg shadow-xl p-6 text-center border-t-4 border-yellow-400">
              <Phone className="w-10 h-10 text-blue-900 mx-auto mb-4" />
              <h3 className="font-semibold text-blue-900 mb-2">Call Us</h3>
              <a href={`tel:${contactInfo.phone}`} className="text-gray-600 hover:text-blue-900">
                {contactInfo.phone}
              </a>
            </div>

            <div className="bg-white rounded-lg shadow-xl p-6 text-center border-t-4 border-yellow-400">
              <Mail className="w-10 h-10 text-blue-900 mx-auto mb-4" />
              <h3 className="font-semibold text-blue-900 mb-2">Email Us</h3>
              <a href={`mailto:${contactInfo.email}`} className="text-gray-600 hover:text-blue-900">
                {contactInfo.email}
              </a>
            </div>

            <div className="bg-white rounded-lg shadow-xl p-6 text-center border-t-4 border-yellow-400">
              <MapPin className="w-10 h-10 text-blue-900 mx-auto mb-4" />
              <h3 className="font-semibold text-blue-900 mb-2">Visit Us</h3>
              <p className="text-gray-600 text-sm">{contactInfo.address}</p>
            </div>

            <div className="bg-white rounded-lg shadow-xl p-6 text-center border-t-4 border-yellow-400">
              <Clock className="w-10 h-10 text-blue-900 mx-auto mb-4" />
              <h3 className="font-semibold text-blue-900 mb-2">Business Hours</h3>
              <p className="text-gray-600 text-sm">{contactInfo.hours}</p>
            </div>
          </div>

          {/* Map */}
          <div className="mb-16 rounded-lg overflow-hidden shadow-xl h-96">
            <iframe
              src="https://www.google.com/maps?q=Uttam+Nagar%2C+Nawada%2C+Sainik+Nagar%2C+Delhi%2C+110059&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Mundo Yatra Location"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <LeadForm />

      <Footer />
    </div>
  );
};

export default Contact;

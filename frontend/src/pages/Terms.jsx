import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Terms = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-blue-900 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
          <p className="text-xl text-blue-100">Last updated: December 2025</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <div className="bg-blue-50 rounded-lg p-6 mb-8">
              <p className="text-gray-700 leading-relaxed">
                These Terms of Service govern your use of Mundo Yatra's website and travel services.
                By booking with us or using this website, you agree to the terms below.
              </p>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-blue-900 mb-4">Bookings &amp; Payments</h2>
                <p className="text-gray-700 mb-3">
                  All bookings are subject to availability and confirmation. Prices quoted are valid
                  at the time of inquiry and may change based on availability, season, or supplier
                  pricing until a booking is confirmed with payment.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-blue-900 mb-4">
                  Cancellations &amp; Refunds
                </h2>
                <p className="text-gray-700 mb-3">
                  Cancellation and refund terms vary by service provider (airlines, hotels, tour
                  operators) and will be communicated at the time of booking. Mundo Yatra will
                  assist in processing cancellations but is not liable for supplier cancellation
                  policies.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-blue-900 mb-4">Travel Documentation</h2>
                <p className="text-gray-700">
                  Travelers are responsible for ensuring they hold valid passports, visas, and any
                  other travel documentation required for their journey. Mundo Yatra provides visa
                  assistance as a service but does not guarantee visa approval.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-blue-900 mb-4">Limitation of Liability</h2>
                <p className="text-gray-700">
                  Mundo Yatra acts as an agent for airlines, hotels, and other service providers and
                  is not liable for their acts, omissions, delays, or changes. Travel insurance is
                  recommended for all bookings.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-blue-900 mb-4">Changes to These Terms</h2>
                <p className="text-gray-700">
                  We may update these Terms of Service from time to time. Continued use of our
                  services after changes are posted constitutes acceptance of the updated terms.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-blue-900 mb-4">Contact Us</h2>
                <p className="text-gray-700 mb-3">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="bg-blue-50 rounded-lg p-6">
                  <p className="text-gray-700">Email: info@mundoyatra.com</p>
                  <p className="text-gray-700">Phone: +91-9354262859</p>
                  <p className="text-gray-700">
                    Address: 202 F/F Uttam Nagar, Nawada Back Side, Sainik Nagar, Delhi, 110059
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Terms;

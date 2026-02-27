import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-blue-900 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl text-blue-100">
            Last updated: December 2025
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <div className="bg-blue-50 rounded-lg p-6 mb-8">
              <p className="text-gray-700 leading-relaxed">
                At Mundo Yatra, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data.
              </p>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-blue-900 mb-4">Information We Collect</h2>
                <p className="text-gray-700 mb-3">We collect the following types of information:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Personal identification information (Name, email address, phone number)</li>
                  <li>Travel preferences and requirements</li>
                  <li>Payment and billing information</li>
                  <li>Passport and visa documentation details</li>
                  <li>Communication history with our team</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-blue-900 mb-4">How We Use Your Information</h2>
                <p className="text-gray-700 mb-3">Your information is used to:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Process your travel bookings and reservations</li>
                  <li>Provide customer support and respond to inquiries</li>
                  <li>Send booking confirmations and travel updates</li>
                  <li>Improve our services and personalize your experience</li>
                  <li>Comply with legal and regulatory requirements</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-blue-900 mb-4">Data Security</h2>
                <p className="text-gray-700">
                  We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. All payment transactions are processed through secure payment gateways with SSL encryption.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-blue-900 mb-4">Sharing of Information</h2>
                <p className="text-gray-700 mb-3">We may share your information with:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Airlines, hotels, and other service providers necessary for your travel arrangements</li>
                  <li>Payment processors for transaction completion</li>
                  <li>Government authorities when required by law</li>
                  <li>Trusted partners who assist in operating our business</li>
                </ul>
                <p className="text-gray-700 mt-3">
                  We do not sell or rent your personal information to third parties for marketing purposes.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-blue-900 mb-4">Your Rights</h2>
                <p className="text-gray-700 mb-3">You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Access and update your personal information</li>
                  <li>Request deletion of your data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Request a copy of your data</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-blue-900 mb-4">Cookies</h2>
                <p className="text-gray-700">
                  Our website uses cookies to enhance your browsing experience, analyze website traffic, and personalize content. You can control cookie preferences through your browser settings.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-blue-900 mb-4">Contact Us</h2>
                <p className="text-gray-700 mb-3">
                  If you have any questions about this Privacy Policy or how we handle your data, please contact us:
                </p>
                <div className="bg-blue-50 rounded-lg p-6">
                  <p className="text-gray-700">Email: info@mundoyatra.com</p>
                  <p className="text-gray-700">Phone: +91-98765-43210</p>
                  <p className="text-gray-700">Address: Shop No. 12, Travel Plaza, MG Road, Bangalore - 560001, Karnataka, India</p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-blue-900 mb-4">Changes to This Policy</h2>
                <p className="text-gray-700">
                  We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Privacy;

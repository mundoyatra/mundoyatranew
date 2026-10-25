import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <section className="flex-1 flex items-center justify-center pt-32 pb-16 bg-white">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-6xl font-bold text-blue-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-blue-900 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            Sorry, the page you're looking for doesn't exist or may have been moved.
          </p>
          <Link to="/">
            <Button className="bg-blue-900 hover:bg-blue-800 text-white">Back to Home</Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NotFound;

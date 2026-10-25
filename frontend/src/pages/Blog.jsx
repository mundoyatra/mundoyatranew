import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Card, CardContent } from '../components/ui/card';

const blogs = [
  {
    id: 1,
    title: 'Top 10 Tourist Places in India You Must Visit in 2026',
    content:
      'India offers diverse travel experiences from beaches in Goa to mountains in Manali and backwaters in Kerala. These destinations are perfect for family vacations, honeymoon trips, and solo travel.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
  },
  {
    id: 2,
    title: 'Best International Travel Destinations for Indian Travelers',
    content:
      'International travel is now easier than ever. Popular destinations like Dubai, Bali, Maldives, and Thailand offer visa-friendly options and affordable packages for Indian travelers.',
    image: 'https://images.unsplash.com/photo-1493558103817-58b2924bce98',
  },
  {
    id: 3,
    title: 'How to Book Cheap Flights and Save Money on Travel',
    content:
      'Booking flights early, comparing prices, and using travel deals can help you save significantly. Learn expert tips to find the cheapest flights for domestic and international travel.',
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd',
  },
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-blue-900 mb-10 text-center">
            Travel Blogs & Guides
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogs.map((blog) => (
              <Card key={blog.id} className="border-2 border-gray-200">
                <img src={blog.image} alt={blog.title} className="w-full h-56 object-cover" />

                <CardContent className="p-5">
                  <h2 className="text-2xl font-semibold text-blue-900 mb-3">{blog.title}</h2>
                  <p className="text-gray-600">{blog.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;

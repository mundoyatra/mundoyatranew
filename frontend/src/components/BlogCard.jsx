import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const blogs = [
  {
    id: 1,
    slug: 'top-10-tourist-places-in-india-you-must-visit-2026',
    title: 'Top 10 Tourist Places in India You Must Visit in 2026',
    description: 'Explore Goa, Manali, Kashmir, and Kerala for your next trip.',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=70',
  },
  {
    id: 2,
    slug: 'best-international-destinations-for-indian-travelers',
    title: 'Best International Destinations for Indian Travelers',
    description: 'Visit Dubai, Bali, Maldives & Thailand affordably.',
    image:
      'https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=800&q=70',
  },
  {
    id: 3,
    slug: 'how-to-book-cheap-flights-2026',
    title: 'How to Book Cheap Flights in 2026',
    description: 'Save money with smart booking tricks.',
    image:
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=800&q=70',
  },
  {
    id: 4,
    slug: 'best-honeymoon-destinations-in-india',
    title: 'Best Honeymoon Destinations in India',
    description: 'Romantic places like Manali, Goa & Udaipur.',
    image:
      'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=800&q=70',
  },
  {
    id: 5,
    slug: 'budget-travel-tips-for-students',
    title: 'Top Budget Travel Tips for Students',
    description: 'Travel smart without spending too much.',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=70',
  },
  {
    id: 6,
    slug: 'complete-goa-trip-planning-guide',
    title: 'Complete Guide to Goa Trip Planning',
    description: 'Beaches, nightlife & itinerary for Goa.',
    image:
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=70',
  },
];

const BlogCard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-32 pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-blue-900 mb-10 text-center">Travel Blogs</h1>

          <div className="grid md:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                onClick={() => navigate(`/blogs/${blog.slug}`)}
                className="cursor-pointer rounded-xl overflow-hidden shadow-md bg-white border-2 border-transparent transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-yellow-400"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  loading="lazy"
                  className="w-full h-52 object-cover"
                />

                <div className="p-5">
                  <h3 className="text-xl font-semibold text-blue-900 mb-2">{blog.title}</h3>
                  <p className="text-gray-600 mb-3">{blog.description}</p>
                  <span className="text-yellow-500 font-semibold">Read More →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogCard;

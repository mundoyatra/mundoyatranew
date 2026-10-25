import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const blogs = [
  {
    id: 1,
    slug: 'top-10-tourist-places-in-india-you-must-visit-2026',
    title: 'Top 10 Tourist Places in India You Must Visit in 2026',
    description: 'Explore Goa, Manali, Kashmir, and Kerala for your next trip.',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=75',
  },
  {
    id: 2,
    slug: 'best-international-destinations-for-indian-travelers',
    title: 'Best International Destinations for Indian Travelers',
    description: 'Visit Dubai, Bali, Maldives & Thailand affordably.',
    image:
      'https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=900&q=75',
  },
  {
    id: 3,
    slug: 'how-to-book-cheap-flights-2026',
    title: 'How to Book Cheap Flights in 2026',
    description: 'Save money with smart booking tricks.',
    image:
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=900&q=75',
  },
  {
    id: 4,
    slug: 'best-honeymoon-destinations-in-india',
    title: 'Best Honeymoon Destinations in India',
    description: 'Romantic places like Manali, Goa & Udaipur.',
    image:
      'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=900&q=75',
  },
  {
    id: 5,
    slug: 'budget-travel-tips-for-students',
    title: 'Top Budget Travel Tips for Students',
    description: 'Travel smart without spending too much.',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=75',
  },
  {
    id: 6,
    slug: 'complete-goa-trip-planning-guide',
    title: 'Complete Guide to Goa Trip Planning',
    description: 'Beaches, nightlife & itinerary for Goa.',
    image:
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=75',
  },
];

const BlogDetails = () => {
  const { slug } = useParams();
  const blog = blogs.find((b) => b.slug === slug);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-32 pb-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          {blog ? (
            <>
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-80 object-cover rounded-xl mb-6"
              />
              <h1 className="text-3xl font-bold text-blue-900 mb-4">{blog.title}</h1>
              <p className="text-gray-600 text-lg">{blog.description}</p>
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl font-semibold mb-6">Blog not found</p>
              <Link to="/blogs" className="text-blue-900 font-semibold hover:text-yellow-500">
                ← Back to Blogs
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogDetails;

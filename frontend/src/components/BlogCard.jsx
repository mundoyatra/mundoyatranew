import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { api } from '../lib/api';
import { resizeImageUrl } from '../lib/utils';

const BlogCard = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    api
      .get('/blogs')
      .then((res) => setBlogs(res.data))
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-32 pb-16 bg-gradient-to-b from-blue-900 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Travel Blogs & Guides</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Destination guides, booking tips, and travel inspiration from the Mundo Yatra team
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                onClick={() => navigate(`/blogs/${blog.slug}`)}
                className="cursor-pointer rounded-xl overflow-hidden shadow-md bg-white border-2 border-transparent transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-yellow-400"
              >
                <img
                  src={resizeImageUrl(blog.coverImage, 500)}
                  alt={blog.coverImageAlt}
                  loading="lazy"
                  className="w-full h-52 object-cover"
                />

                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-900 rounded-full font-semibold">
                      {blog.category}
                    </span>
                    <span>{blog.readTime}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-blue-900 mb-2">{blog.title}</h3>
                  <p className="text-gray-600 mb-3">{blog.excerpt}</p>
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

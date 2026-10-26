import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, MessageCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { api } from '../lib/api';
import { resizeImageUrl } from '../lib/utils';

const renderBlock = (block, index) => {
  switch (block.type) {
    case 'heading':
      return (
        <h2 key={index} className="text-2xl font-bold text-blue-900 mt-10 mb-4">
          {block.text}
        </h2>
      );

    case 'paragraph':
      return (
        <p key={index} className="text-gray-700 leading-relaxed mb-5 text-base sm:text-lg">
          {block.text}
        </p>
      );

    case 'list':
      return (
        <ul key={index} className="space-y-2 mb-6 pl-1">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-700">
              <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-yellow-400 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );

    case 'image':
      return (
        <figure key={index} className="my-8">
          <img
            src={block.src}
            alt={block.alt}
            loading="lazy"
            className="w-full h-64 sm:h-96 object-cover rounded-xl shadow-lg"
          />
          {block.caption && (
            <figcaption className="text-sm text-gray-500 text-center mt-3 italic">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    default:
      return null;
  }
};

const BlogDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    setBlog(null);
    setNotFound(false);
    api
      .get(`/blogs/${slug}`)
      .then((res) => setBlog(res.data))
      .catch(() => setNotFound(true));

    api
      .get('/blogs')
      .then((res) => setRelatedBlogs(res.data.filter((b) => b.slug !== slug).slice(0, 3)))
      .catch(() => {});
  }, [slug]);

  if (notFound) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <section className="pt-32 pb-16 text-center">
          <p className="text-xl font-semibold mb-6">Blog not found</p>
          <Link to="/blogs" className="text-blue-900 font-semibold hover:text-yellow-500">
            ← Back to Blogs
          </Link>
        </section>
        <Footer />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <section className="pt-32 pb-16 text-center text-gray-400">Loading...</section>
        <Footer />
      </div>
    );
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.metaDescription,
    image: blog.coverImage,
    datePublished: blog.publishedDate,
    author: {
      '@type': 'Organization',
      name: 'Mundo Yatra',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Mundo Yatra',
    },
  };

  const handleWhatsApp = () => {
    const message = `Hi! I read your blog "${blog.title}" and I'd like to know more about planning a trip.`;
    window.open(`https://wa.me/919354262859?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[360px] pt-16">
        <img
          src={blog.coverImage}
          alt={blog.coverImageAlt}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

        <div className="relative h-full flex flex-col justify-end max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          <span className="inline-block w-fit px-3 py-1 bg-yellow-400 text-blue-900 rounded-full text-xs font-semibold mb-4">
            {blog.category}
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold text-white mb-4 leading-tight">
            {blog.title}
          </h1>
          <div className="flex items-center gap-4 text-gray-200 text-sm">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {new Date(blog.publishedDate).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {blog.readTime}
            </span>
          </div>
        </div>
      </section>

      {/* Article */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/blogs')}
            className="flex items-center gap-2 text-blue-900 font-semibold mb-8 hover:text-yellow-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blogs
          </button>

          <article>{blog.content.map((block, index) => renderBlock(block, index))}</article>

          {/* CTA */}
          <div className="mt-12 bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">Ready to Plan Your Next Trip?</h3>
            <p className="text-blue-100 mb-6">
              Mundo Yatra's travel experts can turn this into a fully customized itinerary.
            </p>
            <button
              onClick={handleWhatsApp}
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Chat with Us on WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* Related Blogs */}
      {relatedBlogs.length > 0 && (
        <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-8 text-center">
              More Travel Guides
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedBlogs.map((related) => (
                <div
                  key={related.id}
                  onClick={() => navigate(`/blogs/${related.slug}`)}
                  className="cursor-pointer rounded-xl overflow-hidden shadow-md bg-white border-2 border-transparent transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-yellow-400"
                >
                  <img
                    src={resizeImageUrl(related.coverImage, 500)}
                    alt={related.coverImageAlt}
                    loading="lazy"
                    className="w-full h-44 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-blue-900 mb-1">{related.title}</h3>
                    <p className="text-sm text-gray-600">{related.excerpt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default BlogDetails;

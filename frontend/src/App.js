import React from 'react';
import '@/App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import DomesticPackages from './pages/DomesticPackages';
import InternationalPackages from './pages/InternationalPackages';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';
import BlogCard from './components/BlogCard';
import BlogDetails from './pages/BlogDetails';
import FAQCard from './components/FAQCard';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLeads from './pages/admin/AdminLeads';
import AdminServices from './pages/admin/AdminServices';
import AdminDestinations from './pages/admin/AdminDestinations';
import AdminBlogs from './pages/admin/AdminBlogs';
import AdminFAQ from './pages/admin/AdminFAQ';
import AdminTestimonials from './pages/admin/AdminTestimonials';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/domestic-packages" element={<DomesticPackages />} />
          <Route path="/international-packages" element={<InternationalPackages />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/blogs" element={<BlogCard />} />
          <Route path="/blogs/:slug" element={<BlogDetails />} />
          <Route path="/faq" element={<FAQCard />} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/leads" replace />} />
            <Route path="leads" element={<AdminLeads />} />
            <Route path="services" element={<AdminServices />} />
            <Route
              path="domestic-packages"
              element={
                <AdminDestinations endpoint="domestic-destinations" title="Domestic Packages" />
              }
            />
            <Route
              path="international-packages"
              element={
                <AdminDestinations
                  endpoint="international-destinations"
                  title="International Packages"
                />
              }
            />
            <Route path="blogs" element={<AdminBlogs />} />
            <Route path="faqs" element={<AdminFAQ />} />
            <Route path="testimonials" element={<AdminTestimonials />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;

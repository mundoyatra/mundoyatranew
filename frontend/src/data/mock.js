// Static content for Mundo Yatra Travel Agency.
// Services, destinations, testimonials, blogs, and FAQs are now managed via
// the admin portal and fetched from the API - see src/lib/api.js.
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const heroImages = [
  'https://images.unsplash.com/photo-1523496922380-91d5afba98a3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzOTB8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjB0cmF2ZWx8ZW58MHx8fHwxNzcxNjk0NTE4fDA&ixlib=rb-4.1.0&fit=crop&w=1600&q=70',
  'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzOTB8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjB0cmF2ZWx8ZW58MHx8fHwxNzcxNjk0NTE4fDA&ixlib=rb-4.1.0&fit=crop&w=1600&q=70',
  'https://images.unsplash.com/photo-1690123081946-6cf006a01cf9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MTN8MHwxfHNlYXJjaHwzfHxzY2VuaWMlMjBkZXN0aW5hdGlvbnxlbnwwfHx8fDE3NzE2OTQ1MjN8MA&ixlib=rb-4.1.0&fit=crop&w=1600&q=70',
];

export const whyChooseUs = [
  {
    id: 1,
    title: 'Best Price Guarantee',
    description: 'Competitive rates on flights, hotels, and packages',
    icon: 'badge-indian-rupee',
  },
  {
    id: 2,
    title: '24/7 Customer Support',
    description: 'Round-the-clock assistance for all your travel needs',
    icon: 'headset',
  },
  {
    id: 3,
    title: 'Customized Packages',
    description: 'Tailor-made itineraries based on your preferences',
    icon: 'sparkles',
  },
  {
    id: 4,
    title: 'Trusted Travel Experts',
    description: '10+ years of experience in travel industry',
    icon: 'award',
  },
  {
    id: 5,
    title: 'Global Network',
    description: 'Strong partnerships with airlines, hotels worldwide',
    icon: 'network',
  },
  {
    id: 6,
    title: 'Secure Booking',
    description: 'Safe and secure payment options',
    icon: 'shield-check',
  },
];

export const aboutContent = {
  title: 'About Mundo Yatra',
  subtitle: 'Your Trusted Travel Partner Since 2013',
  description:
    "Mundo Yatra is India's leading travel company dedicated to creating unforgettable travel experiences. From flight bookings to complete holiday packages, visa assistance to medical tourism, we handle every aspect of your journey with care and expertise.",
  mission:
    'Our mission is to make travel accessible, affordable, and memorable for everyone. We believe in personalized service, attention to detail, and creating lasting memories.',
  values: [
    'Customer satisfaction is our top priority',
    'Transparent pricing with no hidden costs',
    'Expert guidance from experienced travel consultants',
    'Quality service at competitive prices',
  ],
  image:
    'https://images.unsplash.com/photo-1586996387347-6533bac25f14?auto=format&fit=crop&w=900&q=75',
};

export const contactInfo = {
  phone: '+91-9354262859',
  email: 'info@mundoyatra.com',
  whatsapp: '+919354262859',
  address: '202 F/F Uttam Nagar, Nawada Back Side, Sainik Nagar, Delhi, 110059',
  hours: 'Mon - Sat: 9:00 AM - 7:00 PM | Sun: 10:00 AM - 5:00 PM',
};

export const submitLeadForm = async (formData) => {
  const response = await axios.post(`${BACKEND_URL}/api/leads`, formData);
  return response.data;
};

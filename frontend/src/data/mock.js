// Mock data for Mundo Yatra Travel Agency

export const heroImages = [
  'https://images.unsplash.com/photo-1523496922380-91d5afba98a3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzOTB8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjB0cmF2ZWx8ZW58MHx8fHwxNzcxNjk0NTE4fDA&ixlib=rb-4.1.0&q=85',
  'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzOTB8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjB0cmF2ZWx8ZW58MHx8fHwxNzcxNjk0NTE4fDA&ixlib=rb-4.1.0&q=85',
  'https://images.unsplash.com/photo-1690123081946-6cf006a01cf9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MTN8MHwxfHNlYXJjaHwzfHxzY2VuaWMlMjBkZXN0aW5hdGlvbnxlbnwwfHx8fDE3NzE2OTQ1MjN8MA&ixlib=rb-4.1.0&q=85'
];

export const services = [
  {
    id: 1,
    title: 'Flight Ticket Booking',
    description: 'Book domestic and international flights at best prices. Compare airlines and get instant confirmation.',
    icon: 'plane'
  },
  {
    id: 2,
    title: 'Visa Assistance',
    description: 'Expert visa consultation and documentation support for all countries. Hassle-free visa processing.',
    icon: 'file-check'
  },
  {
    id: 3,
    title: 'Domestic Holiday Packages',
    description: 'Explore India with customized tour packages to Kashmir, Goa, Kerala, Rajasthan, Andaman and more.',
    icon: 'map'
  },
  {
    id: 4,
    title: 'International Tour Packages',
    description: 'Dream destinations made affordable. Bali, Dubai, Thailand, Europe, Maldives and worldwide packages.',
    icon: 'globe'
  },
  {
    id: 5,
    title: 'Medical Tourism',
    description: 'World-class medical treatment in India. We arrange hospitals, accommodation, and local support.',
    icon: 'heart-pulse'
  },
  {
    id: 6,
    title: 'Hotel Bookings',
    description: 'Book hotels worldwide at competitive rates. From budget stays to luxury resorts.',
    icon: 'hotel'
  },
  {
    id: 7,
    title: 'Cab & Airport Transfers',
    description: 'Comfortable and safe transportation services. Airport pickups, drops, and local sightseeing.',
    icon: 'car'
  },
  {
    id: 8,
    title: 'Attestation Services',
    description: 'Document attestation and verification services for international travel and work permits.',
    icon: 'stamp'
  },
  {
    id: 9,
    title: 'Foreign Language Guides',
    description: 'Professional tour guides fluent in multiple languages for your India trip.',
    icon: 'languages'
  }
];

export const indianDestinations = [
  {
    id: 1,
    name: 'Taj Mahal, Agra',
    image: 'https://images.unsplash.com/photo-1761662827136-a1b773ac04ae',
    description: 'Iconic monument of love',
    price: 'From ₹12,999',
    duration: '3 Days / 2 Nights',
    highlights: ['Taj Mahal visit at sunrise', 'Agra Fort exploration', 'Fatehpur Sikri tour', 'Local cuisine tasting'],
    itinerary: [
      { day: 1, title: 'Arrival in Agra', activities: 'Pickup from Delhi, transfer to Agra, check-in at hotel, evening visit to Mehtab Bagh for Taj Mahal sunset view' },
      { day: 2, title: 'Taj Mahal & Agra Fort', activities: 'Early morning Taj Mahal visit at sunrise, breakfast, visit Agra Fort, explore local markets, evening at leisure' },
      { day: 3, title: 'Fatehpur Sikri & Departure', activities: 'Visit Fatehpur Sikri, return to Delhi with memorable experiences' }
    ],
    includes: ['2 nights accommodation', 'Daily breakfast', 'All transfers', 'Entry tickets', 'Professional guide']
  },
  {
    id: 2,
    name: 'Kerala Backwaters',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944',
    description: 'Houseboat cruises & serenity',
    price: 'From ₹18,999',
    duration: '4 Days / 3 Nights',
    highlights: ['Luxury houseboat stay', 'Alleppey backwater cruise', 'Kathakali dance show', 'Ayurvedic massage', 'Traditional Kerala cuisine'],
    itinerary: [
      { day: 1, title: 'Arrival in Kochi', activities: 'Airport pickup, transfer to hotel, evening Chinese fishing nets visit, Kathakali dance performance' },
      { day: 2, title: 'Kochi Sightseeing', activities: 'Fort Kochi tour, Mattancherry Palace, Jewish Synagogue, spice market exploration' },
      { day: 3, title: 'Houseboat Experience', activities: 'Transfer to Alleppey, board luxury houseboat, cruise through backwaters, overnight on houseboat' },
      { day: 4, title: 'Departure', activities: 'Disembark from houseboat, optional Ayurvedic spa, transfer to airport' }
    ],
    includes: ['3 nights accommodation (2 hotel + 1 houseboat)', 'All meals on houseboat', 'Daily breakfast', 'All transfers', 'Sightseeing']
  },
  {
    id: 3,
    name: 'Goa Beaches',
    image: 'https://images.pexels.com/photos/35080149/pexels-photo-35080149.jpeg',
    description: 'Sun, sand & nightlife',
    price: 'From ₹9,999',
    duration: '3 Days / 2 Nights',
    highlights: ['Beach hopping', 'Water sports', 'Sunset cruise', 'Beach shacks dining', 'Nightlife experience'],
    itinerary: [
      { day: 1, title: 'Arrival & North Goa', activities: 'Airport/station pickup, hotel check-in, visit Calangute, Baga & Anjuna beaches, evening at leisure' },
      { day: 2, title: 'South Goa & Water Sports', activities: 'Visit Palolem & Colva beaches, water sports activities, sunset cruise on Mandovi river, dinner at beach shack' },
      { day: 3, title: 'Old Goa & Departure', activities: 'Visit Basilica of Bom Jesus, Se Cathedral, last-minute shopping, departure transfer' }
    ],
    includes: ['2 nights beach resort stay', 'Daily breakfast', 'Sunset cruise', '2 water sports activities', 'All transfers']
  },
  {
    id: 4,
    name: 'Rajasthan Heritage',
    image: 'https://images.pexels.com/photos/4134646/pexels-photo-4134646.jpeg',
    description: 'Royal palaces & forts',
    price: 'From ₹15,999',
    duration: '5 Days / 4 Nights',
    highlights: ['Amber Fort visit', 'City Palace tour', 'Camel safari', 'Traditional Rajasthani dinner', 'Desert camping'],
    itinerary: [
      { day: 1, title: 'Arrival in Jaipur', activities: 'Airport pickup, hotel check-in, evening visit to Hawa Mahal, local market exploration' },
      { day: 2, title: 'Jaipur Sightseeing', activities: 'Amber Fort with elephant ride, City Palace, Jantar Mantar, Albert Hall Museum' },
      { day: 3, title: 'Jaipur to Jodhpur', activities: 'Drive to Jodhpur, visit Mehrangarh Fort, Jaswant Thada, clock tower market' },
      { day: 4, title: 'Jodhpur to Jaisalmer', activities: 'Drive to Jaisalmer, evening camel safari, desert camping with cultural program and dinner' },
      { day: 5, title: 'Jaisalmer & Departure', activities: 'Visit Jaisalmer Fort, Patwon Ki Haveli, departure transfer' }
    ],
    includes: ['4 nights accommodation', 'Daily breakfast & dinner', 'All transfers', 'Camel safari', 'Entry tickets', 'Guide']
  },
  {
    id: 5,
    name: 'Kashmir Paradise',
    image: 'https://images.unsplash.com/photo-1764426382609-5ebee9eb0273',
    description: 'Heaven on earth',
    price: 'From ₹22,999',
    duration: '5 Days / 4 Nights',
    highlights: ['Shikara ride on Dal Lake', 'Gulmarg gondola ride', 'Pahalgam valley tour', 'Mughal gardens', 'Houseboat stay'],
    itinerary: [
      { day: 1, title: 'Arrival in Srinagar', activities: 'Airport pickup, check-in to houseboat on Dal Lake, Shikara ride, overnight on houseboat' },
      { day: 2, title: 'Srinagar Sightseeing', activities: 'Visit Mughal Gardens (Nishat, Shalimar, Chashme Shahi), Shankaracharya Temple, local markets' },
      { day: 3, title: 'Gulmarg Excursion', activities: 'Day trip to Gulmarg, Gondola cable car ride (Asia\'s highest), snow activities, return to Srinagar' },
      { day: 4, title: 'Pahalgam Valley', activities: 'Full day excursion to Pahalgam, Betaab Valley, Aru Valley, Lidder River, return to Srinagar' },
      { day: 5, title: 'Departure', activities: 'Last-minute shopping for Kashmiri handicrafts, airport transfer' }
    ],
    includes: ['4 nights accommodation (2 houseboat + 2 hotel)', 'Daily breakfast & dinner', 'All transfers', 'Gondola tickets', 'Shikara ride']
  },
  {
    id: 6,
    name: 'Andaman Islands',
    image: 'https://images.unsplash.com/photo-1704365159747-1f7b8913044f',
    description: 'Crystal clear waters',
    price: 'From ₹28,999',
    duration: '5 Days / 4 Nights',
    highlights: ['Radhanagar Beach (Asia\'s best)', 'Scuba diving', 'Snorkeling at Elephant Beach', 'Cellular Jail light show', 'Island hopping'],
    itinerary: [
      { day: 1, title: 'Arrival in Port Blair', activities: 'Airport pickup, hotel check-in, visit Cellular Jail, attend Light & Sound show' },
      { day: 2, title: 'Port Blair to Havelock', activities: 'Ferry to Havelock Island, check-in at beach resort, relax at Radhanagar Beach sunset' },
      { day: 3, title: 'Havelock Water Activities', activities: 'Morning scuba diving session, afternoon snorkeling at Elephant Beach, beach time' },
      { day: 4, title: 'Havelock to Port Blair', activities: 'Morning at leisure, ferry back to Port Blair, visit Corbyn\'s Cove Beach, shopping' },
      { day: 5, title: 'Departure', activities: 'Visit Ross Island (optional), last-minute shopping, airport transfer' }
    ],
    includes: ['4 nights accommodation', 'Daily breakfast', 'Ferry tickets', 'Scuba diving (1 session)', 'Snorkeling gear', 'All transfers']
  }
];

export const internationalDestinations = [
  {
    id: 1,
    name: 'Bali, Indonesia',
    image: 'https://images.unsplash.com/photo-1616484173745-07f25fd0547f',
    description: 'Tropical paradise',
    price: 'From ₹45,999',
    duration: '5 Days / 4 Nights',
    highlights: ['Ubud rice terraces', 'Temple visits', 'Beach clubs', 'Balinese spa', 'Traditional dance show'],
    itinerary: [
      { day: 1, title: 'Arrival in Bali', activities: 'Airport pickup, hotel check-in in Seminyak, evening at Seminyak Beach, dinner at beach club' },
      { day: 2, title: 'Ubud Cultural Tour', activities: 'Visit Tegalalang Rice Terraces, Monkey Forest, Ubud Palace, traditional Balinese dance show, art market' },
      { day: 3, title: 'Water Temple & Tanah Lot', activities: 'Tirta Empul water temple, Tegenungan Waterfall, sunset at Tanah Lot temple' },
      { day: 4, title: 'Beach Day & Water Sports', activities: 'Nusa Dua beach, water sports (banana boat, parasailing), afternoon spa session, beach club evening' },
      { day: 5, title: 'Shopping & Departure', activities: 'Beachwalk Shopping Mall, last-minute souvenir shopping, airport transfer' }
    ],
    includes: ['4 nights beach resort', 'Daily breakfast', 'Airport transfers', 'Private tours with guide', 'Entry tickets', 'Return flights']
  },
  {
    id: 2,
    name: 'Dubai, UAE',
    image: 'https://images.unsplash.com/flagged/photo-1559717201-fbb671ff56b7',
    description: 'Luxury & modern marvels',
    price: 'From ₹38,999',
    duration: '4 Days / 3 Nights',
    highlights: ['Burj Khalifa visit', 'Desert safari', 'Dubai Mall & Fountain', 'Palm Jumeirah', 'Marina cruise'],
    itinerary: [
      { day: 1, title: 'Arrival & Dubai Mall', activities: 'Airport pickup, hotel check-in, evening visit to Dubai Mall, Burj Khalifa 124th floor, Dubai Fountain show' },
      { day: 2, title: 'Desert Safari Adventure', activities: 'Morning at leisure, afternoon desert safari with dune bashing, camel ride, BBQ dinner, belly dance show' },
      { day: 3, title: 'City Tour & Marina', activities: 'Dubai Frame, Gold Souk, Spice Souk, Jumeirah Mosque, Palm Jumeirah, evening Marina Dhow Cruise with dinner' },
      { day: 4, title: 'Beach & Departure', activities: 'Morning at Jumeirah Beach, last-minute shopping, airport transfer' }
    ],
    includes: ['3 nights 4-star hotel', 'Daily breakfast', 'Desert safari', 'City tour', 'Burj Khalifa tickets', 'Marina cruise', 'Return flights']
  },
  {
    id: 3,
    name: 'Maldives',
    image: 'https://images.unsplash.com/photo-1698726654908-834d3a5330d8',
    description: 'Overwater luxury resorts',
    price: 'From ₹65,999',
    duration: '4 Days / 3 Nights',
    highlights: ['Overwater villa stay', 'Snorkeling & diving', 'Spa treatments', 'Sunset cruise', 'All-inclusive dining'],
    itinerary: [
      { day: 1, title: 'Arrival in Paradise', activities: 'Male airport arrival, speedboat/seaplane transfer to resort, check-in to overwater villa, sunset watching' },
      { day: 2, title: 'Water Activities', activities: 'Morning snorkeling session, afternoon scuba diving, spa treatment, romantic dinner on beach' },
      { day: 3, title: 'Island Hopping & Cruise', activities: 'Visit local island, interact with Maldivian culture, sunset dolphin cruise, dinner at underwater restaurant' },
      { day: 4, title: 'Relaxation & Departure', activities: 'Final swim in crystal waters, spa session, resort transfer, flight back to India' }
    ],
    includes: ['3 nights overwater villa', 'All meals (breakfast, lunch, dinner)', 'Snorkeling & diving', 'Spa session', 'Sunset cruise', 'Return flights & transfers']
  },
  {
    id: 4,
    name: 'Thailand',
    image: 'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f',
    description: 'Beaches & culture',
    price: 'From ₹32,999',
    duration: '5 Days / 4 Nights',
    highlights: ['Bangkok temples', 'Pattaya beaches', 'Coral Island tour', 'Cabaret show', 'Thai massage'],
    itinerary: [
      { day: 1, title: 'Arrival in Bangkok', activities: 'Airport pickup, hotel check-in, evening visit to Asiatique night market, Chao Phraya river cruise' },
      { day: 2, title: 'Bangkok City Tour', activities: 'Grand Palace, Wat Pho (Reclining Buddha), Wat Arun, floating market, evening at Khao San Road' },
      { day: 3, title: 'Bangkok to Pattaya', activities: 'Transfer to Pattaya, Coral Island tour with water sports, lunch on island, evening Alcazar cabaret show' },
      { day: 4, title: 'Pattaya Activities', activities: 'Nong Nooch Tropical Garden, traditional Thai massage, beach time, walking street nightlife' },
      { day: 5, title: 'Return to Bangkok & Departure', activities: 'Drive back to Bangkok, last-minute shopping at MBK or Platinum Mall, airport transfer' }
    ],
    includes: ['4 nights accommodation (2 Bangkok + 2 Pattaya)', 'Daily breakfast', 'Coral Island tour', 'Cabaret show', 'City tours', 'Return flights']
  },
  {
    id: 5,
    name: 'Singapore',
    image: 'https://images.unsplash.com/photo-1602002418679-43121356bf41',
    description: 'Garden city adventure',
    price: 'From ₹42,999',
    duration: '4 Days / 3 Nights',
    highlights: ['Universal Studios', 'Gardens by the Bay', 'Marina Bay Sands', 'Sentosa Island', 'Night Safari'],
    itinerary: [
      { day: 1, title: 'Arrival & City Lights', activities: 'Airport pickup, hotel check-in, Marina Bay Sands SkyPark, Gardens by the Bay light show, Supertree Grove' },
      { day: 2, title: 'Universal Studios', activities: 'Full day at Universal Studios Singapore with all rides and shows, evening at Sentosa Beach' },
      { day: 3, title: 'City Tour & Night Safari', activities: 'Merlion, Chinatown, Little India, Arab Street, Orchard Road shopping, evening Night Safari experience' },
      { day: 4, title: 'Sentosa & Departure', activities: 'S.E.A Aquarium, cable car ride, last-minute shopping at Jewel Changi Airport, departure' }
    ],
    includes: ['3 nights 4-star hotel', 'Daily breakfast', 'Universal Studios tickets', 'Night Safari', 'City tour', 'Return flights']
  },
  {
    id: 6,
    name: 'Europe Tour',
    image: 'https://images.pexels.com/photos/28940115/pexels-photo-28940115.jpeg',
    description: 'Multi-country packages',
    price: 'From ₹1,25,999',
    duration: '10 Days / 9 Nights',
    highlights: ['Eiffel Tower Paris', 'Swiss Alps', 'Venice gondola ride', 'Roman Colosseum', 'Multi-country experience'],
    itinerary: [
      { day: 1, title: 'Arrival in Paris', activities: 'Charles de Gaulle airport arrival, hotel check-in, evening Eiffel Tower visit with light show' },
      { day: 2, title: 'Paris Sightseeing', activities: 'Louvre Museum, Notre-Dame, Seine River cruise, Champs-Élysées, Arc de Triomphe' },
      { day: 3, title: 'Paris to Switzerland', activities: 'Train to Switzerland, check-in at Interlaken, evening at Höheweg street, Swiss chocolate tasting' },
      { day: 4, title: 'Swiss Alps Adventure', activities: 'Jungfraujoch (Top of Europe) excursion, snow activities, scenic train rides' },
      { day: 5, title: 'Lucerne Day Trip', activities: 'Visit Chapel Bridge, Lion Monument, Lake Lucerne cruise, Mount Pilatus cable car' },
      { day: 6, title: 'Switzerland to Venice', activities: 'Scenic train journey to Venice, hotel check-in, evening gondola ride through canals' },
      { day: 7, title: 'Venice & Rome', activities: 'St. Mark\'s Square, Doge\'s Palace, train to Rome, check-in, evening at Trevi Fountain' },
      { day: 8, title: 'Rome Ancient Wonders', activities: 'Colosseum, Roman Forum, Pantheon, Vatican City tour (St. Peter\'s Basilica, Sistine Chapel)' },
      { day: 9, title: 'Rome Exploration', activities: 'Spanish Steps, Villa Borghese, Trastevere neighborhood, farewell dinner with Italian cuisine' },
      { day: 10, title: 'Departure', activities: 'Last-minute shopping, airport transfer from Rome' }
    ],
    includes: ['9 nights accommodation', 'Daily breakfast', 'Inter-city trains', 'Guided tours', 'Entry tickets', 'Return international flights', 'Schengen visa assistance']
  }
];

export const testimonials = [
  {
    id: 1,
    name: 'Rahul Sharma',
    location: 'Mumbai',
    rating: 5,
    text: 'Mundo Yatra planned our honeymoon to Maldives perfectly! From flights to resort booking, everything was seamless. Highly recommended!',
    image: 'https://ui-avatars.com/api/?name=Rahul+Sharma&background=1e3a8a&color=fff'
  },
  {
    id: 2,
    name: 'Priya Patel',
    location: 'Ahmedabad',
    rating: 5,
    text: 'Best travel agency for visa services. They helped us get our Schengen visa without any hassle. Professional and trustworthy team.',
    image: 'https://ui-avatars.com/api/?name=Priya+Patel&background=d4af37&color=000'
  },
  {
    id: 3,
    name: 'Amit Kumar',
    location: 'Delhi',
    rating: 5,
    text: 'Booked Kashmir package for family. The arrangements were excellent, and customer support was available 24/7. Great experience!',
    image: 'https://ui-avatars.com/api/?name=Amit+Kumar&background=1e3a8a&color=fff'
  },
  {
    id: 4,
    name: 'Sarah Johnson',
    location: 'USA',
    rating: 5,
    text: 'Came to India for medical treatment. Mundo Yatra handled everything - hospital, accommodation, local transport. Exceptional service!',
    image: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=d4af37&color=000'
  }
];

export const whyChooseUs = [
  {
    id: 1,
    title: 'Best Price Guarantee',
    description: 'Competitive rates on flights, hotels, and packages',
    icon: 'badge-indian-rupee'
  },
  {
    id: 2,
    title: '24/7 Customer Support',
    description: 'Round-the-clock assistance for all your travel needs',
    icon: 'headset'
  },
  {
    id: 3,
    title: 'Customized Packages',
    description: 'Tailor-made itineraries based on your preferences',
    icon: 'sparkles'
  },
  {
    id: 4,
    title: 'Trusted Travel Experts',
    description: '10+ years of experience in travel industry',
    icon: 'award'
  },
  {
    id: 5,
    title: 'Global Network',
    description: 'Strong partnerships with airlines, hotels worldwide',
    icon: 'network'
  },
  {
    id: 6,
    title: 'Secure Booking',
    description: 'Safe and secure payment options',
    icon: 'shield-check'
  }
];

export const aboutContent = {
  title: 'About Mundo Yatra',
  subtitle: 'Your Trusted Travel Partner Since 2013',
  description: 'Mundo Yatra is India\'s leading travel company dedicated to creating unforgettable travel experiences. From flight bookings to complete holiday packages, visa assistance to medical tourism, we handle every aspect of your journey with care and expertise.',
  mission: 'Our mission is to make travel accessible, affordable, and memorable for everyone. We believe in personalized service, attention to detail, and creating lasting memories.',
  values: [
    'Customer satisfaction is our top priority',
    'Transparent pricing with no hidden costs',
    'Expert guidance from experienced travel consultants',
    'Quality service at competitive prices'
  ],
  image: 'https://images.unsplash.com/photo-1586996387347-6533bac25f14'
};

export const contactInfo = {
  phone: '+91-9354262859',
  email: 'info@mundoyatra.com',
  whatsapp: '+919354262859',
  address: 'Shop No. 12, Travel Plaza, MG Road, Bangalore - 560001, Karnataka, India',
  hours: 'Mon - Sat: 9:00 AM - 7:00 PM | Sun: 10:00 AM - 5:00 PM'
};

// Mock function to simulate form submission
export const submitLeadForm = (formData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Store in localStorage for demo
      const leads = JSON.parse(localStorage.getItem('mundoYatraLeads') || '[]');
      leads.push({
        ...formData,
        id: Date.now(),
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('mundoYatraLeads', JSON.stringify(leads));
      resolve({ success: true, message: 'Thank you! We will contact you soon.' });
    }, 1000);
  });
};

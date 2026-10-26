// One-time migration: populates the database with the content that used to
// live in the frontend's static data files, and creates the admin account.
// Safe to re-run - skips any table that already has rows.
require("dotenv").config();
const bcrypt = require("bcryptjs");
const { randomUUID } = require("crypto");
const { pool, initSchema } = require("./db");

const ADMIN_USERNAME = process.env.SEED_ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD;

const services = [
  { title: "Flight Ticket Booking", description: "Book domestic and international flights at best prices. Compare airlines and get instant confirmation.", icon: "plane" },
  { title: "Visa Assistance", description: "Expert visa consultation and documentation support for all countries. Hassle-free visa processing.", icon: "file-check" },
  { title: "Domestic Holiday Packages", description: "Explore India with customized tour packages to Kashmir, Goa, Kerala, Rajasthan, Andaman and more.", icon: "map" },
  { title: "International Tour Packages", description: "Dream destinations made affordable. Bali, Dubai, Thailand, Europe, Maldives and worldwide packages.", icon: "globe" },
  { title: "Medical Tourism", description: "World-class medical treatment in India. We arrange hospitals, accommodation, and local support.", icon: "heart-pulse" },
  { title: "Hotel Bookings", description: "Book hotels worldwide at competitive rates. From budget stays to luxury resorts.", icon: "hotel" },
  { title: "Cab & Airport Transfers", description: "Comfortable and safe transportation services. Airport pickups, drops, and local sightseeing.", icon: "car" },
  { title: "Attestation Services", description: "Document attestation and verification services for international travel and work permits.", icon: "stamp" },
  { title: "Foreign Language Guides", description: "Professional tour guides fluent in multiple languages for your India trip.", icon: "languages" },
];

const domesticDestinations = [
  { name: "Taj Mahal, Agra", image: "https://images.unsplash.com/photo-1761662827136-a1b773ac04ae?auto=format&fit=crop&w=800&q=70", description: "Iconic monument of love", price: "From ₹12,999", duration: "3 Days / 2 Nights",
    highlights: ["Taj Mahal visit at sunrise", "Agra Fort exploration", "Fatehpur Sikri tour", "Local cuisine tasting"],
    itinerary: [
      { day: 1, title: "Arrival in Agra", activities: "Pickup from Delhi, transfer to Agra, check-in at hotel, evening visit to Mehtab Bagh for Taj Mahal sunset view" },
      { day: 2, title: "Taj Mahal & Agra Fort", activities: "Early morning Taj Mahal visit at sunrise, breakfast, visit Agra Fort, explore local markets, evening at leisure" },
      { day: 3, title: "Fatehpur Sikri & Departure", activities: "Visit Fatehpur Sikri, return to Delhi with memorable experiences" },
    ],
    includes: ["2 nights accommodation", "Daily breakfast", "All transfers", "Entry tickets", "Professional guide"] },
  { name: "Kerala Backwaters", image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=70", description: "Houseboat cruises & serenity", price: "From ₹18,999", duration: "4 Days / 3 Nights",
    highlights: ["Luxury houseboat stay", "Alleppey backwater cruise", "Kathakali dance show", "Ayurvedic massage", "Traditional Kerala cuisine"],
    itinerary: [
      { day: 1, title: "Arrival in Kochi", activities: "Airport pickup, transfer to hotel, evening Chinese fishing nets visit, Kathakali dance performance" },
      { day: 2, title: "Kochi Sightseeing", activities: "Fort Kochi tour, Mattancherry Palace, Jewish Synagogue, spice market exploration" },
      { day: 3, title: "Houseboat Experience", activities: "Transfer to Alleppey, board luxury houseboat, cruise through backwaters, overnight on houseboat" },
      { day: 4, title: "Departure", activities: "Disembark from houseboat, optional Ayurvedic spa, transfer to airport" },
    ],
    includes: ["3 nights accommodation (2 hotel + 1 houseboat)", "All meals on houseboat", "Daily breakfast", "All transfers", "Sightseeing"] },
  { name: "Goa Beaches", image: "https://images.pexels.com/photos/35080149/pexels-photo-35080149.jpeg?auto=compress&cs=tinysrgb&w=800", description: "Sun, sand & nightlife", price: "From ₹9,999", duration: "3 Days / 2 Nights",
    highlights: ["Beach hopping", "Water sports", "Sunset cruise", "Beach shacks dining", "Nightlife experience"],
    itinerary: [
      { day: 1, title: "Arrival & North Goa", activities: "Airport/station pickup, hotel check-in, visit Calangute, Baga & Anjuna beaches, evening at leisure" },
      { day: 2, title: "South Goa & Water Sports", activities: "Visit Palolem & Colva beaches, water sports activities, sunset cruise on Mandovi river, dinner at beach shack" },
      { day: 3, title: "Old Goa & Departure", activities: "Visit Basilica of Bom Jesus, Se Cathedral, last-minute shopping, departure transfer" },
    ],
    includes: ["2 nights beach resort stay", "Daily breakfast", "Sunset cruise", "2 water sports activities", "All transfers"] },
  { name: "Rajasthan Heritage", image: "https://images.pexels.com/photos/4134646/pexels-photo-4134646.jpeg?auto=compress&cs=tinysrgb&w=800", description: "Royal palaces & forts", price: "From ₹15,999", duration: "5 Days / 4 Nights",
    highlights: ["Amber Fort visit", "City Palace tour", "Camel safari", "Traditional Rajasthani dinner", "Desert camping"],
    itinerary: [
      { day: 1, title: "Arrival in Jaipur", activities: "Airport pickup, hotel check-in, evening visit to Hawa Mahal, local market exploration" },
      { day: 2, title: "Jaipur Sightseeing", activities: "Amber Fort with elephant ride, City Palace, Jantar Mantar, Albert Hall Museum" },
      { day: 3, title: "Jaipur to Jodhpur", activities: "Drive to Jodhpur, visit Mehrangarh Fort, Jaswant Thada, clock tower market" },
      { day: 4, title: "Jodhpur to Jaisalmer", activities: "Drive to Jaisalmer, evening camel safari, desert camping with cultural program and dinner" },
      { day: 5, title: "Jaisalmer & Departure", activities: "Visit Jaisalmer Fort, Patwon Ki Haveli, departure transfer" },
    ],
    includes: ["4 nights accommodation", "Daily breakfast & dinner", "All transfers", "Camel safari", "Entry tickets", "Guide"] },
  { name: "Kashmir Paradise", image: "https://images.unsplash.com/photo-1764426382609-5ebee9eb0273?auto=format&fit=crop&w=800&q=70", description: "Heaven on earth", price: "From ₹22,999", duration: "5 Days / 4 Nights",
    highlights: ["Shikara ride on Dal Lake", "Gulmarg gondola ride", "Pahalgam valley tour", "Mughal gardens", "Houseboat stay"],
    itinerary: [
      { day: 1, title: "Arrival in Srinagar", activities: "Airport pickup, check-in to houseboat on Dal Lake, Shikara ride, overnight on houseboat" },
      { day: 2, title: "Srinagar Sightseeing", activities: "Visit Mughal Gardens (Nishat, Shalimar, Chashme Shahi), Shankaracharya Temple, local markets" },
      { day: 3, title: "Gulmarg Excursion", activities: "Day trip to Gulmarg, Gondola cable car ride (Asia's highest), snow activities, return to Srinagar" },
      { day: 4, title: "Pahalgam Valley", activities: "Full day excursion to Pahalgam, Betaab Valley, Aru Valley, Lidder River, return to Srinagar" },
      { day: 5, title: "Departure", activities: "Last-minute shopping for Kashmiri handicrafts, airport transfer" },
    ],
    includes: ["4 nights accommodation (2 houseboat + 2 hotel)", "Daily breakfast & dinner", "All transfers", "Gondola tickets", "Shikara ride"] },
  { name: "Andaman Islands", image: "https://images.unsplash.com/photo-1704365159747-1f7b8913044f?auto=format&fit=crop&w=800&q=70", description: "Crystal clear waters", price: "From ₹28,999", duration: "5 Days / 4 Nights",
    highlights: ["Radhanagar Beach (Asia's best)", "Scuba diving", "Snorkeling at Elephant Beach", "Cellular Jail light show", "Island hopping"],
    itinerary: [
      { day: 1, title: "Arrival in Port Blair", activities: "Airport pickup, hotel check-in, visit Cellular Jail, attend Light & Sound show" },
      { day: 2, title: "Port Blair to Havelock", activities: "Ferry to Havelock Island, check-in at beach resort, relax at Radhanagar Beach sunset" },
      { day: 3, title: "Havelock Water Activities", activities: "Morning scuba diving session, afternoon snorkeling at Elephant Beach, beach time" },
      { day: 4, title: "Havelock to Port Blair", activities: "Morning at leisure, ferry back to Port Blair, visit Corbyn's Cove Beach, shopping" },
      { day: 5, title: "Departure", activities: "Visit Ross Island (optional), last-minute shopping, airport transfer" },
    ],
    includes: ["4 nights accommodation", "Daily breakfast", "Ferry tickets", "Scuba diving (1 session)", "Snorkeling gear", "All transfers"] },
];

const internationalDestinations = [
  { name: "Bali, Indonesia", image: "https://images.unsplash.com/photo-1616484173745-07f25fd0547f?auto=format&fit=crop&w=800&q=70", description: "Tropical paradise", price: "From ₹45,999", duration: "5 Days / 4 Nights",
    highlights: ["Ubud rice terraces", "Temple visits", "Beach clubs", "Balinese spa", "Traditional dance show"],
    itinerary: [
      { day: 1, title: "Arrival in Bali", activities: "Airport pickup, hotel check-in in Seminyak, evening at Seminyak Beach, dinner at beach club" },
      { day: 2, title: "Ubud Cultural Tour", activities: "Visit Tegalalang Rice Terraces, Monkey Forest, Ubud Palace, traditional Balinese dance show, art market" },
      { day: 3, title: "Water Temple & Tanah Lot", activities: "Tirta Empul water temple, Tegenungan Waterfall, sunset at Tanah Lot temple" },
      { day: 4, title: "Beach Day & Water Sports", activities: "Nusa Dua beach, water sports (banana boat, parasailing), afternoon spa session, beach club evening" },
      { day: 5, title: "Shopping & Departure", activities: "Beachwalk Shopping Mall, last-minute souvenir shopping, airport transfer" },
    ],
    includes: ["4 nights beach resort", "Daily breakfast", "Airport transfers", "Private tours with guide", "Entry tickets", "Return flights"] },
  { name: "Dubai, UAE", image: "https://images.unsplash.com/flagged/photo-1559717201-fbb671ff56b7?auto=format&fit=crop&w=800&q=70", description: "Luxury & modern marvels", price: "From ₹38,999", duration: "4 Days / 3 Nights",
    highlights: ["Burj Khalifa visit", "Desert safari", "Dubai Mall & Fountain", "Palm Jumeirah", "Marina cruise"],
    itinerary: [
      { day: 1, title: "Arrival & Dubai Mall", activities: "Airport pickup, hotel check-in, evening visit to Dubai Mall, Burj Khalifa 124th floor, Dubai Fountain show" },
      { day: 2, title: "Desert Safari Adventure", activities: "Morning at leisure, afternoon desert safari with dune bashing, camel ride, BBQ dinner, belly dance show" },
      { day: 3, title: "City Tour & Marina", activities: "Dubai Frame, Gold Souk, Spice Souk, Jumeirah Mosque, Palm Jumeirah, evening Marina Dhow Cruise with dinner" },
      { day: 4, title: "Beach & Departure", activities: "Morning at Jumeirah Beach, last-minute shopping, airport transfer" },
    ],
    includes: ["3 nights 4-star hotel", "Daily breakfast", "Desert safari", "City tour", "Burj Khalifa tickets", "Marina cruise", "Return flights"] },
  { name: "Maldives", image: "https://images.unsplash.com/photo-1698726654908-834d3a5330d8?auto=format&fit=crop&w=800&q=70", description: "Overwater luxury resorts", price: "From ₹65,999", duration: "4 Days / 3 Nights",
    highlights: ["Overwater villa stay", "Snorkeling & diving", "Spa treatments", "Sunset cruise", "All-inclusive dining"],
    itinerary: [
      { day: 1, title: "Arrival in Paradise", activities: "Male airport arrival, speedboat/seaplane transfer to resort, check-in to overwater villa, sunset watching" },
      { day: 2, title: "Water Activities", activities: "Morning snorkeling session, afternoon scuba diving, spa treatment, romantic dinner on beach" },
      { day: 3, title: "Island Hopping & Cruise", activities: "Visit local island, interact with Maldivian culture, sunset dolphin cruise, dinner at underwater restaurant" },
      { day: 4, title: "Relaxation & Departure", activities: "Final swim in crystal waters, spa session, resort transfer, flight back to India" },
    ],
    includes: ["3 nights overwater villa", "All meals (breakfast, lunch, dinner)", "Snorkeling & diving", "Spa session", "Sunset cruise", "Return flights & transfers"] },
  { name: "Thailand", image: "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=800&q=70", description: "Beaches & culture", price: "From ₹32,999", duration: "5 Days / 4 Nights",
    highlights: ["Bangkok temples", "Pattaya beaches", "Coral Island tour", "Cabaret show", "Thai massage"],
    itinerary: [
      { day: 1, title: "Arrival in Bangkok", activities: "Airport pickup, hotel check-in, evening visit to Asiatique night market, Chao Phraya river cruise" },
      { day: 2, title: "Bangkok City Tour", activities: "Grand Palace, Wat Pho (Reclining Buddha), Wat Arun, floating market, evening at Khao San Road" },
      { day: 3, title: "Bangkok to Pattaya", activities: "Transfer to Pattaya, Coral Island tour with water sports, lunch on island, evening Alcazar cabaret show" },
      { day: 4, title: "Pattaya Activities", activities: "Nong Nooch Tropical Garden, traditional Thai massage, beach time, walking street nightlife" },
      { day: 5, title: "Return to Bangkok & Departure", activities: "Drive back to Bangkok, last-minute shopping at MBK or Platinum Mall, airport transfer" },
    ],
    includes: ["4 nights accommodation (2 Bangkok + 2 Pattaya)", "Daily breakfast", "Coral Island tour", "Cabaret show", "City tours", "Return flights"] },
  { name: "Singapore", image: "https://images.unsplash.com/photo-1602002418679-43121356bf41?auto=format&fit=crop&w=800&q=70", description: "Garden city adventure", price: "From ₹42,999", duration: "4 Days / 3 Nights",
    highlights: ["Universal Studios", "Gardens by the Bay", "Marina Bay Sands", "Sentosa Island", "Night Safari"],
    itinerary: [
      { day: 1, title: "Arrival & City Lights", activities: "Airport pickup, hotel check-in, Marina Bay Sands SkyPark, Gardens by the Bay light show, Supertree Grove" },
      { day: 2, title: "Universal Studios", activities: "Full day at Universal Studios Singapore with all rides and shows, evening at Sentosa Beach" },
      { day: 3, title: "City Tour & Night Safari", activities: "Merlion, Chinatown, Little India, Arab Street, Orchard Road shopping, evening Night Safari experience" },
      { day: 4, title: "Sentosa & Departure", activities: "S.E.A Aquarium, cable car ride, last-minute shopping at Jewel Changi Airport, departure" },
    ],
    includes: ["3 nights 4-star hotel", "Daily breakfast", "Universal Studios tickets", "Night Safari", "City tour", "Return flights"] },
  { name: "Europe Tour", image: "https://images.pexels.com/photos/28940115/pexels-photo-28940115.jpeg?auto=compress&cs=tinysrgb&w=800", description: "Multi-country packages", price: "From ₹1,25,999", duration: "10 Days / 9 Nights",
    highlights: ["Eiffel Tower Paris", "Swiss Alps", "Venice gondola ride", "Roman Colosseum", "Multi-country experience"],
    itinerary: [
      { day: 1, title: "Arrival in Paris", activities: "Charles de Gaulle airport arrival, hotel check-in, evening Eiffel Tower visit with light show" },
      { day: 2, title: "Paris Sightseeing", activities: "Louvre Museum, Notre-Dame, Seine River cruise, Champs-Elysees, Arc de Triomphe" },
      { day: 3, title: "Paris to Switzerland", activities: "Train to Switzerland, check-in at Interlaken, evening at Hoheweg street, Swiss chocolate tasting" },
      { day: 4, title: "Swiss Alps Adventure", activities: "Jungfraujoch (Top of Europe) excursion, snow activities, scenic train rides" },
      { day: 5, title: "Lucerne Day Trip", activities: "Visit Chapel Bridge, Lion Monument, Lake Lucerne cruise, Mount Pilatus cable car" },
      { day: 6, title: "Switzerland to Venice", activities: "Scenic train journey to Venice, hotel check-in, evening gondola ride through canals" },
      { day: 7, title: "Venice & Rome", activities: "St. Mark's Square, Doge's Palace, train to Rome, check-in, evening at Trevi Fountain" },
      { day: 8, title: "Rome Ancient Wonders", activities: "Colosseum, Roman Forum, Pantheon, Vatican City tour (St. Peter's Basilica, Sistine Chapel)" },
      { day: 9, title: "Rome Exploration", activities: "Spanish Steps, Villa Borghese, Trastevere neighborhood, farewell dinner with Italian cuisine" },
      { day: 10, title: "Departure", activities: "Last-minute shopping, airport transfer from Rome" },
    ],
    includes: ["9 nights accommodation", "Daily breakfast", "Inter-city trains", "Guided tours", "Entry tickets", "Return international flights", "Schengen visa assistance"] },
];

const testimonials = [
  { name: "Rahul Sharma", location: "Mumbai", rating: 5, text: "Mundo Yatra planned our honeymoon to Maldives perfectly! From flights to resort booking, everything was seamless. Highly recommended!", image: "https://ui-avatars.com/api/?name=Rahul+Sharma&background=1e3a8a&color=fff" },
  { name: "Priya Patel", location: "Ahmedabad", rating: 5, text: "Best travel agency for visa services. They helped us get our Schengen visa without any hassle. Professional and trustworthy team.", image: "https://ui-avatars.com/api/?name=Priya+Patel&background=d4af37&color=000" },
  { name: "Amit Kumar", location: "Delhi", rating: 5, text: "Booked Kashmir package for family. The arrangements were excellent, and customer support was available 24/7. Great experience!", image: "https://ui-avatars.com/api/?name=Amit+Kumar&background=1e3a8a&color=fff" },
  { name: "Sarah Johnson", location: "USA", rating: 5, text: "Came to India for medical treatment. Mundo Yatra handled everything - hospital, accommodation, local transport. Exceptional service!", image: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=d4af37&color=000" },
];

const faqs = [
  { question: "How do I book a travel package with Mundo Yatra?", answer: "Booking a travel package with Mundo Yatra is simple and hassle-free. You can explore our domestic and international tour packages, fill out the inquiry form, or contact our travel experts directly. We assist you with flight bookings, hotel reservations, itinerary planning, and complete holiday package customization." },
  { question: "Do you offer customized holiday packages for India and international destinations?", answer: "Yes, Mundo Yatra specializes in customized travel packages for both Indian and international destinations. Whether you are planning a honeymoon, family vacation, group tour, or solo trip, we create personalized itineraries including flights, hotels, sightseeing, and transfers based on your budget and preferences." },
  { question: "Are flights and hotel bookings included in your tour packages?", answer: "Most of our tour packages include flight bookings, hotel accommodations, airport transfers, and guided sightseeing. We offer flexible options where you can choose complete packages or only specific services like flight tickets or hotel bookings." },
  { question: "Which are the best travel destinations you offer packages for?", answer: "We offer travel packages for top destinations in India such as Goa, Manali, Kashmir, Kerala, and Rajasthan, as well as international destinations like Dubai, Bali, Maldives, Thailand, and Europe. Our packages are designed to provide the best travel experience at competitive prices." },
  { question: "Do you provide visa assistance and travel insurance for international trips?", answer: "Yes, Mundo Yatra provides complete travel assistance including visa support, documentation guidance, and travel insurance for international trips. Our team ensures a smooth and stress-free travel experience from booking to return." },
  { question: "What is the cancellation and refund policy for travel bookings?", answer: "Our cancellation and refund policies depend on the specific travel package, airline, and hotel bookings. We ensure transparent policies and guide you through cancellation charges, refunds, and rescheduling options before confirming your booking." },
  { question: "Why should I choose Mundo Yatra for travel and tour packages?", answer: "Mundo Yatra is a trusted travel agency offering affordable tour packages, expert travel planning, and 24/7 customer support. We provide the best deals on flights, hotels, and holiday packages with personalized service to ensure a memorable travel experience." },
];

const blogs = [
  {
    slug: "top-10-tourist-places-in-india-you-must-visit-2026",
    title: "Top 10 Tourist Places in India You Must Visit in 2026",
    metaDescription: "Discover the top 10 tourist places in India to visit in 2026, from the Taj Mahal to Kerala backwaters and Kashmir. Plan your India tour with Mundo Yatra.",
    keywords: ["tourist places in India 2026", "best places to visit in India", "India tour packages", "Mundo Yatra", "domestic holiday packages India"],
    category: "Domestic Travel",
    coverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=70",
    coverImageAlt: "Scenic tourist destination in India",
    publishedDate: "2026-01-10",
    readTime: "7 min read",
    excerpt: "Explore Goa, Manali, Kashmir, and Kerala for your next trip.",
    content: [
      { type: "paragraph", text: "India's diversity means no two trips ever look the same - one week you could be watching sunrise over the Taj Mahal, and the next you could be drifting through Kerala's backwaters on a houseboat. If you're planning your 2026 travel calendar, here are ten destinations across India that consistently top travelers' wish lists, and that Mundo Yatra's travel experts can help you turn into a fully planned holiday package." },
      { type: "heading", text: "1. Taj Mahal, Agra" },
      { type: "paragraph", text: "No list of tourist places in India is complete without the Taj Mahal. This marble monument to love draws millions of visitors every year, and the best way to experience it is at sunrise, when the crowds are thin and the light is soft. Pair your Agra visit with Agra Fort and the ancient city of Fatehpur Sikri for a complete historical circuit." },
      { type: "image", src: "https://images.unsplash.com/photo-1761662827136-a1b773ac04ae?auto=format&fit=crop&w=900&q=75", alt: "Taj Mahal at sunrise, Agra", caption: "The Taj Mahal is best seen at sunrise, before the crowds arrive." },
      { type: "heading", text: "2. Kerala Backwaters" },
      { type: "paragraph", text: "Kerala's backwaters offer a completely different pace of travel - slow, quiet, and scenic. A night aboard a traditional houseboat through Alleppey's canals, past paddy fields and coconut groves, is one of the most relaxing experiences India has to offer. It's an easy add-on to a Kochi city tour." },
      { type: "heading", text: "3. Kashmir" },
      { type: "paragraph", text: "Often called 'heaven on earth,' Kashmir blends Mughal gardens, the Dal Lake shikara rides, and the snow-capped slopes of Gulmarg into one unforgettable itinerary. Whether you're visiting for the gardens in spring or the snow in winter, Kashmir rewards travelers at every time of year." },
      { type: "list", items: ["Goa - beaches, nightlife, and Portuguese heritage", "Rajasthan - forts, palaces, and desert safaris in Jaisalmer", "Andaman Islands - Radhanagar Beach and world-class scuba diving", "Manali - Himalayan views and adventure sports", "Rishikesh - yoga, rafting, and the banks of the Ganges", "Darjeeling - tea gardens and views of the Kanchenjunga range", "Udaipur - the City of Lakes and royal architecture"] },
      { type: "heading", text: "Plan Your India Trip with Mundo Yatra" },
      { type: "paragraph", text: "Whichever of these destinations makes your list, Mundo Yatra's domestic holiday packages cover flights, hotels, transfers, and guided sightseeing so you can focus on the experience rather than the logistics. Get in touch with our travel experts to build a customized India itinerary for 2026." },
    ],
  },
  {
    slug: "best-international-destinations-for-indian-travelers",
    title: "Best International Destinations for Indian Travelers",
    metaDescription: "Explore the best international destinations for Indian travelers in 2026 - Dubai, Bali, Maldives, and Thailand - with visa-friendly, affordable packages from Mundo Yatra.",
    keywords: ["international destinations for Indian travelers", "visa-friendly countries for Indians", "international tour packages", "Mundo Yatra", "affordable international travel"],
    category: "International Travel",
    coverImage: "https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=1200&q=70",
    coverImageAlt: "Tropical international travel destination",
    publishedDate: "2026-01-18",
    readTime: "6 min read",
    excerpt: "Visit Dubai, Bali, Maldives & Thailand affordably.",
    content: [
      { type: "paragraph", text: "International travel has never been more accessible for Indian passport holders. Visa-on-arrival and e-visa options, direct flight connections, and competitively priced holiday packages mean a first international trip is well within reach for most travelers. Here are four destinations that consistently offer the best value and visa ease for Indian travelers." },
      { type: "heading", text: "Dubai, UAE" },
      { type: "paragraph", text: "Dubai remains the easiest and most popular international getaway for Indian travelers, thanks to short flight times, a visa-on-arrival facility for eligible travelers, and attractions ranging from the Burj Khalifa to desert safaris. A 4-day Dubai package comfortably covers the city's major landmarks and a dune-bashing adventure." },
      { type: "image", src: "https://images.unsplash.com/flagged/photo-1559717201-fbb671ff56b7?auto=format&fit=crop&w=900&q=75", alt: "Dubai skyline with Burj Khalifa", caption: "Dubai combines modern skylines with desert adventures." },
      { type: "heading", text: "Bali, Indonesia" },
      { type: "paragraph", text: "Bali offers visa-free entry for Indian travelers and an unbeatable mix of rice terraces, temples, beach clubs, and affordable luxury resorts. Ubud's cultural sites and Seminyak's beaches give Bali an appeal for both honeymooners and groups of friends." },
      { type: "heading", text: "Maldives" },
      { type: "paragraph", text: "For travelers who want overwater villas and turquoise lagoons without a long flight, the Maldives delivers - and resort packages increasingly include all meals, making budgeting straightforward. It's one of the most popular honeymoon destinations for Indian couples." },
      { type: "image", src: "https://images.unsplash.com/photo-1698726654908-834d3a5330d8?auto=format&fit=crop&w=900&q=75", alt: "Overwater villas in the Maldives", caption: "Overwater villas make the Maldives a favorite honeymoon pick." },
      { type: "heading", text: "Thailand" },
      { type: "paragraph", text: "Thailand pairs Bangkok's temples and street food with Pattaya's beaches and islands, and remains one of the most budget-friendly international destinations for Indian travelers thanks to visa-on-arrival access and inexpensive local transport." },
      { type: "heading", text: "Book with Mundo Yatra" },
      { type: "paragraph", text: "Mundo Yatra's international tour packages include return flights, hotel stays, visa assistance, and guided city tours for all four destinations above. Reach out to our team to compare packages and find the best fit for your travel dates and budget." },
    ],
  },
  {
    slug: "how-to-book-cheap-flights-2026",
    title: "How to Book Cheap Flights in 2026",
    metaDescription: "Learn how to book cheap flights in 2026 with proven tips on timing, booking tools, and flexible travel dates - plus how Mundo Yatra can find you better flight deals.",
    keywords: ["how to book cheap flights", "cheap flight booking tips", "flight ticket booking India", "Mundo Yatra", "best time to book flights"],
    category: "Travel Tips",
    coverImage: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=70",
    coverImageAlt: "Airplane wing above the clouds",
    publishedDate: "2026-02-02",
    readTime: "6 min read",
    excerpt: "Save money with smart booking tricks.",
    content: [
      { type: "paragraph", text: "Flights are usually the single biggest line item in any trip budget, which also makes them the easiest place to save real money if you know what to look for. Here are the booking habits that consistently bring airfares down, whether you are flying domestic or international." },
      { type: "heading", text: "Book 6-8 Weeks in Advance for Domestic, 2-4 Months for International" },
      { type: "paragraph", text: "Airfares typically follow a predictable curve: too early and airlines haven't released their cheapest fare buckets, too late and only the expensive seats remain. For domestic India routes, 6-8 weeks out tends to hit the sweet spot. For international travel, booking 2-4 months ahead usually secures noticeably better fares." },
      { type: "heading", text: "Fly on Tuesdays, Wednesdays, or Saturdays" },
      { type: "paragraph", text: "Weekend departures on Friday and Sunday are priced for business and leisure demand peaks. Shifting a flight by even one day to a Tuesday or Wednesday departure can meaningfully lower the fare on the same route." },
      { type: "image", src: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=900&q=75", alt: "Traveler checking flight information at the airport", caption: "Flexible travel dates are the single biggest lever for cheaper fares." },
      { type: "heading", text: "Use Flexible Date Search and Fare Alerts" },
      { type: "paragraph", text: "Most booking tools let you compare prices across a date range instead of a single day. Combine this with fare-drop alerts on your preferred route so you can book the moment prices dip, rather than guessing." },
      { type: "list", items: ["Clear your browser cookies or use incognito mode before searching", "Compare one-way fares on both legs instead of only round-trip pricing", "Check nearby airports - a short drive can sometimes mean a much cheaper fare", "Book connecting flights if you're flexible on travel time; direct flights carry a premium"] },
      { type: "heading", text: "Let Mundo Yatra Do the Comparison for You" },
      { type: "paragraph", text: "Mundo Yatra's flight booking service compares fares across airlines in real time so you don't have to track multiple sites yourself, and we flag the best windows to book based on your travel dates. Reach out to our team before you book your next flight - it often pays for itself." },
    ],
  },
  {
    slug: "best-honeymoon-destinations-in-india",
    title: "Best Honeymoon Destinations in India",
    metaDescription: "Discover the best honeymoon destinations in India - Kashmir, Goa, Kerala, and Udaipur - with romantic packages and itineraries from Mundo Yatra.",
    keywords: ["best honeymoon destinations in India", "honeymoon packages India", "romantic places in India", "Mundo Yatra", "honeymoon tour packages"],
    category: "Domestic Travel",
    coverImage: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=70",
    coverImageAlt: "Romantic honeymoon destination in India",
    publishedDate: "2026-02-12",
    readTime: "6 min read",
    excerpt: "Romantic places like Manali, Goa & Udaipur.",
    content: [
      { type: "paragraph", text: "India's geography does a lot of the romantic heavy lifting for a honeymoon - snow-capped valleys, palm-lined beaches, lakeside palaces, and houseboats are all within a few hours' flight of each other. Here are the destinations that consistently top honeymoon itineraries, along with what makes each one special for couples." },
      { type: "heading", text: "Kashmir - Houseboats and Mountain Views" },
      { type: "paragraph", text: "A stay on a Dal Lake houseboat, a shikara ride at sunset, and a day trip to Gulmarg's snow-covered slopes make Kashmir one of the most atmospheric honeymoon destinations in India. Spring brings blooming Mughal gardens; winter brings snowfall and cozy evenings." },
      { type: "image", src: "https://images.unsplash.com/photo-1764426382609-5ebee9eb0273?auto=format&fit=crop&w=900&q=75", alt: "Dal Lake houseboat in Kashmir", caption: "A houseboat stay on Dal Lake is a classic Kashmir honeymoon experience." },
      { type: "heading", text: "Goa - Beaches and Nightlife" },
      { type: "paragraph", text: "For couples who want a more relaxed, social honeymoon, Goa delivers beach shacks, sunset cruises, and a lively evening scene alongside quieter stretches of coastline in South Goa for couples who prefer privacy." },
      { type: "heading", text: "Kerala - Backwaters and Ayurveda" },
      { type: "paragraph", text: "Kerala's houseboats double as romantic retreats, and the state's Ayurvedic spa traditions make it easy to build in a couple's massage or wellness day as part of the itinerary." },
      { type: "heading", text: "Udaipur - The City of Lakes" },
      { type: "paragraph", text: "Lake Pichola boat rides, palace-turned-hotel stays, and rooftop dinners overlooking the water give Udaipur a regal, old-world romance that few other Indian cities can match." },
      { type: "list", items: ["Best time for Kashmir: April-June (gardens) or December-February (snow)", "Best time for Goa: November-February for cooler weather", "Best time for Kerala: September-March, outside the monsoon", "Best time for Udaipur: October-March"] },
      { type: "heading", text: "Plan Your Honeymoon with Mundo Yatra" },
      { type: "paragraph", text: "Mundo Yatra's honeymoon packages are customized around the two of you - private transfers, candlelight dinners, and couple-friendly stays can all be built into your itinerary. Talk to our travel experts to design a honeymoon that matches your dates and budget." },
    ],
  },
  {
    slug: "budget-travel-tips-for-students",
    title: "Top Budget Travel Tips for Students",
    metaDescription: "Top budget travel tips for students in India - from cheap stays and student discounts to group travel packages from Mundo Yatra that make traveling affordable.",
    keywords: ["budget travel tips for students", "student travel India", "cheap travel packages", "Mundo Yatra", "affordable group travel"],
    category: "Travel Tips",
    coverImage: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=1200&q=70",
    coverImageAlt: "Student backpacker traveling on a budget",
    publishedDate: "2026-02-20",
    readTime: "5 min read",
    excerpt: "Travel smart without spending too much.",
    content: [
      { type: "paragraph", text: "A tight budget does not have to mean a limited itinerary. With a bit of planning, students can see just as much of India - or the world - as anyone else, often by traveling smarter rather than spending more. Here are the habits that make the biggest difference." },
      { type: "heading", text: "Travel in a Group" },
      { type: "paragraph", text: "Group travel packages split the cost of transport, guides, and accommodation across more people, which can bring the per-person price down significantly compared to solo or couple travel. Many group packages also include student-friendly add-ons like adventure activities." },
      { type: "heading", text: "Travel in the Off-Season" },
      { type: "paragraph", text: "Hotel rates and flight fares both drop outside peak holiday periods. Shifting a trip by even a few weeks to avoid school holiday rushes can cut costs substantially without sacrificing weather or experience in most destinations." },
      { type: "image", src: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=900&q=75", alt: "Backpack and travel essentials for a budget trip", caption: "Packing light and traveling off-season both help stretch a student budget." },
      { type: "heading", text: "Choose Hostels and Homestays" },
      { type: "paragraph", text: "Hostels and homestays are usually a fraction of the cost of hotels, and often come with the added benefit of meeting other travelers and getting more authentic local recommendations." },
      { type: "list", items: ["Book inter-city travel by train instead of flights where the route allows", "Look for student ID discounts at monuments and museums", "Carry a reusable water bottle and avoid paying for bottled water at tourist spots", "Choose destinations with a favorable exchange rate for international trips"] },
      { type: "heading", text: "Let Mundo Yatra Build Your Group Package" },
      { type: "paragraph", text: "Mundo Yatra puts together budget-friendly group packages for students and young travelers, covering transport, stays, and sightseeing at prices built for a student budget. Get in touch with our team to plan your next trip without blowing your savings." },
    ],
  },
  {
    slug: "complete-goa-trip-planning-guide",
    title: "Complete Guide to Goa Trip Planning",
    metaDescription: "A complete Goa trip planning guide covering the best time to visit, North vs South Goa, beaches, nightlife, and budget tips - plus Goa packages from Mundo Yatra.",
    keywords: ["Goa trip planning guide", "Goa tour packages", "best time to visit Goa", "Mundo Yatra", "North Goa South Goa"],
    category: "Domestic Travel",
    coverImage: "https://images.pexels.com/photos/35080149/pexels-photo-35080149.jpeg?auto=compress&cs=tinysrgb&w=1200",
    coverImageAlt: "Goa beach with palm trees",
    publishedDate: "2026-03-01",
    readTime: "8 min read",
    excerpt: "Beaches, nightlife & itinerary for Goa.",
    content: [
      { type: "paragraph", text: "Goa is one of the most-visited destinations in India, and also one of the most mis-planned - most first-time visitors stick to one or two beaches and miss everything else the state has to offer. Here is a complete trip-planning guide to get it right." },
      { type: "heading", text: "Best Time to Visit Goa" },
      { type: "paragraph", text: "November to February is peak season, with pleasant weather and the full range of beach shacks and nightlife open. March and early April are warmer but less crowded and often cheaper. Avoid the monsoon months (June-September) unless you specifically want a quieter, rain-washed Goa." },
      { type: "heading", text: "North Goa vs South Goa" },
      { type: "paragraph", text: "North Goa - Baga, Calangute, and Anjuna - is where most of the nightlife, water sports, and beach shacks are concentrated, making it the better base for groups and first-time visitors. South Goa - Palolem and Colva - is quieter and better suited to couples or anyone looking to relax rather than party." },
      { type: "image", src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=75", alt: "North Goa beach with water sports", caption: "North Goa is the better base for nightlife and water sports." },
      { type: "heading", text: "What to Pack and Plan For" },
      { type: "paragraph", text: "Light, breathable clothing, reef-safe sunscreen, and comfortable sandals cover most of what you need. If you plan to rent a scooter - a popular way to get around Goa - carry a valid driving license, as checks have become stricter in recent years." },
      { type: "list", items: ["Day 1-2: North Goa beaches - Calangute, Baga, Anjuna flea market", "Day 3: Old Goa - Basilica of Bom Jesus and Se Cathedral", "Day 4: South Goa - Palolem and Colva for a quieter pace", "Day 5: Sunset cruise on the Mandovi River and local seafood dinner"] },
      { type: "image", src: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=900&q=75", alt: "Old Goa church architecture", caption: "Old Goa's Portuguese-era churches are a short trip from the beaches." },
      { type: "heading", text: "Book Your Goa Trip with Mundo Yatra" },
      { type: "paragraph", text: "Mundo Yatra's Goa tour packages cover beach resort stays, sunset cruises, water sports, and all transfers, so your trip is sorted from airport pickup to drop-off. Reach out to our team to plan a Goa itinerary around your dates and budget." },
    ],
  },
];

async function seedTable(tableName, rows, insertFn) {
  const [[{ count }]] = await pool.query(`SELECT COUNT(*) as count FROM ${tableName}`);
  if (count > 0) {
    console.log(`Skipping ${tableName} - already has ${count} rows`);
    return;
  }
  for (let i = 0; i < rows.length; i++) {
    await insertFn(rows[i], i);
  }
  console.log(`Seeded ${rows.length} rows into ${tableName}`);
}

async function seedAdmin() {
  const [[{ count }]] = await pool.query("SELECT COUNT(*) as count FROM admin_users");
  if (count > 0) {
    console.log("Skipping admin_users - already has an account");
    return;
  }
  if (!ADMIN_PASSWORD) {
    throw new Error("SEED_ADMIN_PASSWORD env var is required to seed the admin account");
  }
  const id = randomUUID();
  const hash = await bcrypt.hash(ADMIN_PASSWORD, 10);
  await pool.query(
    "INSERT INTO admin_users (id, username, password_hash, created_at) VALUES (?, ?, ?, ?)",
    [id, ADMIN_USERNAME, hash, new Date()]
  );
  console.log(`Created admin user "${ADMIN_USERNAME}"`);
}

async function run() {
  await initSchema();

  await seedAdmin();

  await seedTable("services", services, (s, i) =>
    pool.query(
      "INSERT INTO services (id, title, description, icon, display_order, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [randomUUID(), s.title, s.description, s.icon, i, new Date(), new Date()]
    )
  );

  const insertDestination = (table) => (d, i) =>
    pool.query(
      `INSERT INTO ${table} (id, name, image, description, price, duration, highlights, itinerary, includes, display_order, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        randomUUID(),
        d.name,
        d.image,
        d.description,
        d.price,
        d.duration,
        JSON.stringify(d.highlights),
        JSON.stringify(d.itinerary),
        JSON.stringify(d.includes),
        i,
        new Date(),
        new Date(),
      ]
    );

  await seedTable("domestic_destinations", domesticDestinations, insertDestination("domestic_destinations"));
  await seedTable("international_destinations", internationalDestinations, insertDestination("international_destinations"));

  await seedTable("testimonials", testimonials, (t, i) =>
    pool.query(
      "INSERT INTO testimonials (id, name, location, rating, text, image, display_order, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [randomUUID(), t.name, t.location, t.rating, t.text, t.image, i, new Date(), new Date()]
    )
  );

  await seedTable("faqs", faqs, (f, i) =>
    pool.query(
      "INSERT INTO faqs (id, question, answer, display_order, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)",
      [randomUUID(), f.question, f.answer, i, new Date(), new Date()]
    )
  );

  await seedTable("blogs", blogs, (b) =>
    pool.query(
      `INSERT INTO blogs (id, slug, title, meta_description, keywords, category, cover_image, cover_image_alt, published_date, read_time, excerpt, content, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        randomUUID(),
        b.slug,
        b.title,
        b.metaDescription,
        JSON.stringify(b.keywords),
        b.category,
        b.coverImage,
        b.coverImageAlt,
        b.publishedDate,
        b.readTime,
        b.excerpt,
        JSON.stringify(b.content),
        new Date(),
        new Date(),
      ]
    )
  );

  console.log("Seed complete.");
  await pool.end();
}

run().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});

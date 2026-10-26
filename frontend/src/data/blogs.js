// Blog content data for Mundo Yatra Travel Agency
//
// Each blog uses a block-based `content` array (paragraph / heading / image / list)
// so a future admin CRUD panel can produce and edit this exact shape, and every
// blog detail page renders through the same template regardless of content.

export const blogs = [
  {
    id: 1,
    slug: 'top-10-tourist-places-in-india-you-must-visit-2026',
    title: 'Top 10 Tourist Places in India You Must Visit in 2026',
    metaDescription:
      'Discover the top 10 tourist places in India to visit in 2026, from the Taj Mahal to Kerala backwaters and Kashmir. Plan your India tour with Mundo Yatra.',
    keywords: [
      'tourist places in India 2026',
      'best places to visit in India',
      'India tour packages',
      'Mundo Yatra',
      'domestic holiday packages India',
    ],
    category: 'Domestic Travel',
    coverImage:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=70',
    coverImageAlt: 'Scenic tourist destination in India',
    publishedDate: '2026-01-10',
    readTime: '7 min read',
    excerpt: 'Explore Goa, Manali, Kashmir, and Kerala for your next trip.',
    content: [
      {
        type: 'paragraph',
        text: "India's diversity means no two trips ever look the same — one week you could be watching sunrise over the Taj Mahal, and the next you could be drifting through Kerala's backwaters on a houseboat. If you're planning your 2026 travel calendar, here are ten destinations across India that consistently top travelers' wish lists, and that Mundo Yatra's travel experts can help you turn into a fully planned holiday package.",
      },
      {
        type: 'heading',
        text: '1. Taj Mahal, Agra',
      },
      {
        type: 'paragraph',
        text: 'No list of tourist places in India is complete without the Taj Mahal. This marble monument to love draws millions of visitors every year, and the best way to experience it is at sunrise, when the crowds are thin and the light is soft. Pair your Agra visit with Agra Fort and the ancient city of Fatehpur Sikri for a complete historical circuit.',
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1761662827136-a1b773ac04ae?auto=format&fit=crop&w=900&q=75',
        alt: 'Taj Mahal at sunrise, Agra',
        caption: 'The Taj Mahal is best seen at sunrise, before the crowds arrive.',
      },
      {
        type: 'heading',
        text: '2. Kerala Backwaters',
      },
      {
        type: 'paragraph',
        text: "Kerala's backwaters offer a completely different pace of travel — slow, quiet, and scenic. A night aboard a traditional houseboat through Alleppey's canals, past paddy fields and coconut groves, is one of the most relaxing experiences India has to offer. It's an easy add-on to a Kochi city tour.",
      },
      {
        type: 'heading',
        text: '3. Kashmir',
      },
      {
        type: 'paragraph',
        text: "Often called 'heaven on earth,' Kashmir blends Mughal gardens, the Dal Lake shikara rides, and the snow-capped slopes of Gulmarg into one unforgettable itinerary. Whether you're visiting for the gardens in spring or the snow in winter, Kashmir rewards travelers at every time of year.",
      },
      {
        type: 'list',
        items: [
          'Goa — beaches, nightlife, and Portuguese heritage',
          'Rajasthan — forts, palaces, and desert safaris in Jaisalmer',
          'Andaman Islands — Radhanagar Beach and world-class scuba diving',
          'Manali — Himalayan views and adventure sports',
          'Rishikesh — yoga, rafting, and the banks of the Ganges',
          'Darjeeling — tea gardens and views of the Kanchenjunga range',
          'Udaipur — the City of Lakes and royal architecture',
        ],
      },
      {
        type: 'heading',
        text: 'Plan Your India Trip with Mundo Yatra',
      },
      {
        type: 'paragraph',
        text: "Whichever of these destinations makes your list, Mundo Yatra's domestic holiday packages cover flights, hotels, transfers, and guided sightseeing so you can focus on the experience rather than the logistics. Get in touch with our travel experts to build a customized India itinerary for 2026.",
      },
    ],
  },
  {
    id: 2,
    slug: 'best-international-destinations-for-indian-travelers',
    title: 'Best International Destinations for Indian Travelers',
    metaDescription:
      'Explore the best international destinations for Indian travelers in 2026 — Dubai, Bali, Maldives, and Thailand — with visa-friendly, affordable packages from Mundo Yatra.',
    keywords: [
      'international destinations for Indian travelers',
      'visa-friendly countries for Indians',
      'international tour packages',
      'Mundo Yatra',
      'affordable international travel',
    ],
    category: 'International Travel',
    coverImage:
      'https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=1200&q=70',
    coverImageAlt: 'Tropical international travel destination',
    publishedDate: '2026-01-18',
    readTime: '6 min read',
    excerpt: 'Visit Dubai, Bali, Maldives & Thailand affordably.',
    content: [
      {
        type: 'paragraph',
        text: 'International travel has never been more accessible for Indian passport holders. Visa-on-arrival and e-visa options, direct flight connections, and competitively priced holiday packages mean a first international trip is well within reach for most travelers. Here are four destinations that consistently offer the best value and visa ease for Indian travelers.',
      },
      {
        type: 'heading',
        text: 'Dubai, UAE',
      },
      {
        type: 'paragraph',
        text: "Dubai remains the easiest and most popular international getaway for Indian travelers, thanks to short flight times, a visa-on-arrival facility for eligible travelers, and attractions ranging from the Burj Khalifa to desert safaris. A 4-day Dubai package comfortably covers the city's major landmarks and a dune-bashing adventure.",
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/flagged/photo-1559717201-fbb671ff56b7?auto=format&fit=crop&w=900&q=75',
        alt: 'Dubai skyline with Burj Khalifa',
        caption: 'Dubai combines modern skylines with desert adventures.',
      },
      {
        type: 'heading',
        text: 'Bali, Indonesia',
      },
      {
        type: 'paragraph',
        text: "Bali offers visa-free entry for Indian travelers and an unbeatable mix of rice terraces, temples, beach clubs, and affordable luxury resorts. Ubud's cultural sites and Seminyak's beaches give Bali an appeal for both honeymooners and groups of friends.",
      },
      {
        type: 'heading',
        text: 'Maldives',
      },
      {
        type: 'paragraph',
        text: "For travelers who want overwater villas and turquoise lagoons without a long flight, the Maldives delivers — and resort packages increasingly include all meals, making budgeting straightforward. It's one of the most popular honeymoon destinations for Indian couples.",
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1698726654908-834d3a5330d8?auto=format&fit=crop&w=900&q=75',
        alt: 'Overwater villas in the Maldives',
        caption: 'Overwater villas make the Maldives a favorite honeymoon pick.',
      },
      {
        type: 'heading',
        text: 'Thailand',
      },
      {
        type: 'paragraph',
        text: "Thailand pairs Bangkok's temples and street food with Pattaya's beaches and islands, and remains one of the most budget-friendly international destinations for Indian travelers thanks to visa-on-arrival access and inexpensive local transport.",
      },
      {
        type: 'heading',
        text: 'Book with Mundo Yatra',
      },
      {
        type: 'paragraph',
        text: "Mundo Yatra's international tour packages include return flights, hotel stays, visa assistance, and guided city tours for all four destinations above. Reach out to our team to compare packages and find the best fit for your travel dates and budget.",
      },
    ],
  },
  {
    id: 3,
    slug: 'how-to-book-cheap-flights-2026',
    title: 'How to Book Cheap Flights in 2026',
    metaDescription:
      'Learn how to book cheap flights in 2026 with proven tips on timing, booking tools, and flexible travel dates — plus how Mundo Yatra can find you better flight deals.',
    keywords: [
      'how to book cheap flights',
      'cheap flight booking tips',
      'flight ticket booking India',
      'Mundo Yatra',
      'best time to book flights',
    ],
    category: 'Travel Tips',
    coverImage:
      'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=70',
    coverImageAlt: 'Airplane wing above the clouds',
    publishedDate: '2026-02-02',
    readTime: '6 min read',
    excerpt: 'Save money with smart booking tricks.',
    content: [
      {
        type: 'paragraph',
        text: 'Flights are usually the single biggest line item in any trip budget, which also makes them the easiest place to save real money if you know what to look for. Here are the booking habits that consistently bring airfares down, whether you are flying domestic or international.',
      },
      {
        type: 'heading',
        text: 'Book 6-8 Weeks in Advance for Domestic, 2-4 Months for International',
      },
      {
        type: 'paragraph',
        text: "Airfares typically follow a predictable curve: too early and airlines haven't released their cheapest fare buckets, too late and only the expensive seats remain. For domestic India routes, 6-8 weeks out tends to hit the sweet spot. For international travel, booking 2-4 months ahead usually secures noticeably better fares.",
      },
      {
        type: 'heading',
        text: 'Fly on Tuesdays, Wednesdays, or Saturdays',
      },
      {
        type: 'paragraph',
        text: 'Weekend departures on Friday and Sunday are priced for business and leisure demand peaks. Shifting a flight by even one day to a Tuesday or Wednesday departure can meaningfully lower the fare on the same route.',
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=900&q=75',
        alt: 'Traveler checking flight information at the airport',
        caption: 'Flexible travel dates are the single biggest lever for cheaper fares.',
      },
      {
        type: 'heading',
        text: 'Use Flexible Date Search and Fare Alerts',
      },
      {
        type: 'paragraph',
        text: 'Most booking tools let you compare prices across a date range instead of a single day. Combine this with fare-drop alerts on your preferred route so you can book the moment prices dip, rather than guessing.',
      },
      {
        type: 'list',
        items: [
          'Clear your browser cookies or use incognito mode before searching',
          'Compare one-way fares on both legs instead of only round-trip pricing',
          'Check nearby airports — a short drive can sometimes mean a much cheaper fare',
          "Book connecting flights if you're flexible on travel time; direct flights carry a premium",
        ],
      },
      {
        type: 'heading',
        text: 'Let Mundo Yatra Do the Comparison for You',
      },
      {
        type: 'paragraph',
        text: "Mundo Yatra's flight booking service compares fares across airlines in real time so you don't have to track multiple sites yourself, and we flag the best windows to book based on your travel dates. Reach out to our team before you book your next flight — it often pays for itself.",
      },
    ],
  },
  {
    id: 4,
    slug: 'best-honeymoon-destinations-in-india',
    title: 'Best Honeymoon Destinations in India',
    metaDescription:
      'Discover the best honeymoon destinations in India — Kashmir, Goa, Kerala, and Udaipur — with romantic packages and itineraries from Mundo Yatra.',
    keywords: [
      'best honeymoon destinations in India',
      'honeymoon packages India',
      'romantic places in India',
      'Mundo Yatra',
      'honeymoon tour packages',
    ],
    category: 'Domestic Travel',
    coverImage:
      'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=70',
    coverImageAlt: 'Romantic honeymoon destination in India',
    publishedDate: '2026-02-12',
    readTime: '6 min read',
    excerpt: 'Romantic places like Manali, Goa & Udaipur.',
    content: [
      {
        type: 'paragraph',
        text: "India's geography does a lot of the romantic heavy lifting for a honeymoon — snow-capped valleys, palm-lined beaches, lakeside palaces, and houseboats are all within a few hours' flight of each other. Here are the destinations that consistently top honeymoon itineraries, along with what makes each one special for couples.",
      },
      {
        type: 'heading',
        text: 'Kashmir — Houseboats and Mountain Views',
      },
      {
        type: 'paragraph',
        text: "A stay on a Dal Lake houseboat, a shikara ride at sunset, and a day trip to Gulmarg's snow-covered slopes make Kashmir one of the most atmospheric honeymoon destinations in India. Spring brings blooming Mughal gardens; winter brings snowfall and cozy evenings.",
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1764426382609-5ebee9eb0273?auto=format&fit=crop&w=900&q=75',
        alt: 'Dal Lake houseboat in Kashmir',
        caption: 'A houseboat stay on Dal Lake is a classic Kashmir honeymoon experience.',
      },
      {
        type: 'heading',
        text: 'Goa — Beaches and Nightlife',
      },
      {
        type: 'paragraph',
        text: 'For couples who want a more relaxed, social honeymoon, Goa delivers beach shacks, sunset cruises, and a lively evening scene alongside quieter stretches of coastline in South Goa for couples who prefer privacy.',
      },
      {
        type: 'heading',
        text: 'Kerala — Backwaters and Ayurveda',
      },
      {
        type: 'paragraph',
        text: "Kerala's houseboats double as romantic retreats, and the state's Ayurvedic spa traditions make it easy to build in a couple's massage or wellness day as part of the itinerary.",
      },
      {
        type: 'heading',
        text: 'Udaipur — The City of Lakes',
      },
      {
        type: 'paragraph',
        text: 'Lake Pichola boat rides, palace-turned-hotel stays, and rooftop dinners overlooking the water give Udaipur a regal, old-world romance that few other Indian cities can match.',
      },
      {
        type: 'list',
        items: [
          'Best time for Kashmir: April-June (gardens) or December-February (snow)',
          'Best time for Goa: November-February for cooler weather',
          'Best time for Kerala: September-March, outside the monsoon',
          'Best time for Udaipur: October-March',
        ],
      },
      {
        type: 'heading',
        text: 'Plan Your Honeymoon with Mundo Yatra',
      },
      {
        type: 'paragraph',
        text: "Mundo Yatra's honeymoon packages are customized around the two of you — private transfers, candlelight dinners, and couple-friendly stays can all be built into your itinerary. Talk to our travel experts to design a honeymoon that matches your dates and budget.",
      },
    ],
  },
  {
    id: 5,
    slug: 'budget-travel-tips-for-students',
    title: 'Top Budget Travel Tips for Students',
    metaDescription:
      'Top budget travel tips for students in India — from cheap stays and student discounts to group travel packages from Mundo Yatra that make traveling affordable.',
    keywords: [
      'budget travel tips for students',
      'student travel India',
      'cheap travel packages',
      'Mundo Yatra',
      'affordable group travel',
    ],
    category: 'Travel Tips',
    coverImage:
      'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=1200&q=70',
    coverImageAlt: 'Student backpacker traveling on a budget',
    publishedDate: '2026-02-20',
    readTime: '5 min read',
    excerpt: 'Travel smart without spending too much.',
    content: [
      {
        type: 'paragraph',
        text: 'A tight budget does not have to mean a limited itinerary. With a bit of planning, students can see just as much of India — or the world — as anyone else, often by traveling smarter rather than spending more. Here are the habits that make the biggest difference.',
      },
      {
        type: 'heading',
        text: 'Travel in a Group',
      },
      {
        type: 'paragraph',
        text: 'Group travel packages split the cost of transport, guides, and accommodation across more people, which can bring the per-person price down significantly compared to solo or couple travel. Many group packages also include student-friendly add-ons like adventure activities.',
      },
      {
        type: 'heading',
        text: 'Travel in the Off-Season',
      },
      {
        type: 'paragraph',
        text: 'Hotel rates and flight fares both drop outside peak holiday periods. Shifting a trip by even a few weeks to avoid school holiday rushes can cut costs substantially without sacrificing weather or experience in most destinations.',
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=900&q=75',
        alt: 'Backpack and travel essentials for a budget trip',
        caption: 'Packing light and traveling off-season both help stretch a student budget.',
      },
      {
        type: 'heading',
        text: 'Choose Hostels and Homestays',
      },
      {
        type: 'paragraph',
        text: 'Hostels and homestays are usually a fraction of the cost of hotels, and often come with the added benefit of meeting other travelers and getting more authentic local recommendations.',
      },
      {
        type: 'list',
        items: [
          'Book inter-city travel by train instead of flights where the route allows',
          'Look for student ID discounts at monuments and museums',
          'Carry a reusable water bottle and avoid paying for bottled water at tourist spots',
          'Choose destinations with a favorable exchange rate for international trips',
        ],
      },
      {
        type: 'heading',
        text: 'Let Mundo Yatra Build Your Group Package',
      },
      {
        type: 'paragraph',
        text: 'Mundo Yatra puts together budget-friendly group packages for students and young travelers, covering transport, stays, and sightseeing at prices built for a student budget. Get in touch with our team to plan your next trip without blowing your savings.',
      },
    ],
  },
  {
    id: 6,
    slug: 'complete-goa-trip-planning-guide',
    title: 'Complete Guide to Goa Trip Planning',
    metaDescription:
      'A complete Goa trip planning guide covering the best time to visit, North vs South Goa, beaches, nightlife, and budget tips — plus Goa packages from Mundo Yatra.',
    keywords: [
      'Goa trip planning guide',
      'Goa tour packages',
      'best time to visit Goa',
      'Mundo Yatra',
      'North Goa South Goa',
    ],
    category: 'Domestic Travel',
    coverImage:
      'https://images.pexels.com/photos/35080149/pexels-photo-35080149.jpeg?auto=compress&cs=tinysrgb&w=1200',
    coverImageAlt: 'Goa beach with palm trees',
    publishedDate: '2026-03-01',
    readTime: '8 min read',
    excerpt: 'Beaches, nightlife & itinerary for Goa.',
    content: [
      {
        type: 'paragraph',
        text: 'Goa is one of the most-visited destinations in India, and also one of the most mis-planned — most first-time visitors stick to one or two beaches and miss everything else the state has to offer. Here is a complete trip-planning guide to get it right.',
      },
      {
        type: 'heading',
        text: 'Best Time to Visit Goa',
      },
      {
        type: 'paragraph',
        text: 'November to February is peak season, with pleasant weather and the full range of beach shacks and nightlife open. March and early April are warmer but less crowded and often cheaper. Avoid the monsoon months (June-September) unless you specifically want a quieter, rain-washed Goa.',
      },
      {
        type: 'heading',
        text: 'North Goa vs South Goa',
      },
      {
        type: 'paragraph',
        text: 'North Goa — Baga, Calangute, and Anjuna — is where most of the nightlife, water sports, and beach shacks are concentrated, making it the better base for groups and first-time visitors. South Goa — Palolem and Colva — is quieter and better suited to couples or anyone looking to relax rather than party.',
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=75',
        alt: 'North Goa beach with water sports',
        caption: 'North Goa is the better base for nightlife and water sports.',
      },
      {
        type: 'heading',
        text: 'What to Pack and Plan For',
      },
      {
        type: 'paragraph',
        text: 'Light, breathable clothing, reef-safe sunscreen, and comfortable sandals cover most of what you need. If you plan to rent a scooter — a popular way to get around Goa — carry a valid driving license, as checks have become stricter in recent years.',
      },
      {
        type: 'list',
        items: [
          'Day 1-2: North Goa beaches — Calangute, Baga, Anjuna flea market',
          'Day 3: Old Goa — Basilica of Bom Jesus and Se Cathedral',
          'Day 4: South Goa — Palolem and Colva for a quieter pace',
          'Day 5: Sunset cruise on the Mandovi River and local seafood dinner',
        ],
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=900&q=75',
        alt: 'Old Goa church architecture',
        caption: "Old Goa's Portuguese-era churches are a short trip from the beaches.",
      },
      {
        type: 'heading',
        text: 'Book Your Goa Trip with Mundo Yatra',
      },
      {
        type: 'paragraph',
        text: "Mundo Yatra's Goa tour packages cover beach resort stays, sunset cruises, water sports, and all transfers, so your trip is sorted from airport pickup to drop-off. Reach out to our team to plan a Goa itinerary around your dates and budget.",
      },
    ],
  },
];

export const getBlogBySlug = (slug) => blogs.find((blog) => blog.slug === slug);

# Mundo Yatra Travel Agency Website - Product Requirements Document

## Original Problem Statement
Create a modern, premium, SEO-optimized travel agency website for "Mundo Yatra", an India-based travel company offering comprehensive travel services including flights, visa assistance, holiday packages, medical tourism, hotel bookings, cab services, attestation services, and foreign language guide services.

## Business Overview
- **Company Name**: Mundo Yatra
- **Services**: Flight Tickets, Visa Assistance, Holiday Packages (Domestic & International), Medical Tourism, Hotel Bookings, Cab Services, Attestation Services, Foreign Language Guides, Inbound Tourism
- **Target Audience**: Indian travelers, couples, families, corporate travelers, foreign tourists, medical tourists
- **Primary Goal**: Lead generation via WhatsApp, call button, and inquiry form

## Design Requirements
- Premium, clean, modern design
- Luxury travel vibe
- Color Scheme: White + Deep Blue (#1e3a8a) + Gold (#d4af37)
- Mobile-first responsive
- Fast loading
- SEO optimized
- Conversion-focused layout

## Implementation Status (December 2025)

### ✅ Completed Features

#### Frontend (React)
1. **Homepage** with all sections:
   - Hero section with image carousel
   - About section
   - Services grid (9 services)
   - Indian destinations (6 destinations)
   - International destinations (6 destinations)
   - Why Choose Us section
   - Testimonials (4 reviews)
   - Lead capture form
   - Footer with social links

2. **Additional Pages**:
   - About Us page
   - Services page
   - Domestic Packages page
   - International Packages page
   - Contact page with map
   - Privacy Policy page

3. **Components**:
   - Navbar with responsive menu
   - Footer with contact info
   - ServiceCard component
   - DestinationCard component
   - TestimonialCard component
   - LeadForm component
   - Floating WhatsApp button

4. **Features**:
   - Mock data for all content
   - Form submission with localStorage
   - Toast notifications using Sonner
   - Smooth scrolling navigation
   - Image carousel in hero
   - Responsive design
   - WhatsApp & Call CTAs

#### Data Layer
- Mock data file (`/app/frontend/src/data/mock.js`)
- Form submissions stored in browser localStorage
- Professional images from Unsplash

#### Design Implementation
- Premium color scheme (Deep Blue, Gold, White)
- Professional travel imagery
- Hover effects and transitions
- Clean typography
- Good spacing and alignment
- Mobile responsive layout

## Architecture

### Frontend
- **Framework**: React 19
- **Router**: React Router DOM v7
- **UI Components**: Shadcn/UI
- **Icons**: Lucide React
- **Styling**: Tailwind CSS
- **Notifications**: Sonner

### Backend (Not Yet Implemented)
- FastAPI (ready for implementation)
- MongoDB (configured)

## API Contracts (To Be Implemented)

### Lead Form Submission
```
POST /api/leads
Body: {
  name: string
  phone: string
  email: string
  destination: string
  travelDate: string (optional)
  message: string (optional)
}
Response: {
  success: boolean
  message: string
  leadId: string
}
```

### Get Destinations
```
GET /api/destinations?type=domestic|international
Response: {
  destinations: Array<Destination>
}
```

### Get Packages
```
GET /api/packages?destination=string
Response: {
  packages: Array<Package>
}
```

## Prioritized Backlog

### P0 - Essential Backend Features
1. Lead form API endpoint with email notifications
2. Contact form submission handler
3. Database schema for leads/inquiries
4. Admin dashboard to view leads

### P1 - Important Features
1. Package details pages with itinerary
2. Online booking system
3. Payment gateway integration (Razorpay/Stripe)
4. Email/SMS notifications for confirmations
5. WhatsApp Business API integration

### P2 - Nice to Have
1. User authentication & profiles
2. Booking history for registered users
3. Reviews & ratings system
4. Blog section for travel tips
5. Live chat support
6. Multi-language support
7. Currency converter
8. Travel insurance integration

## SEO Requirements (To Be Implemented)
- Meta tags for all pages
- Schema markup for travel agency
- Sitemap.xml
- robots.txt
- Open Graph tags
- Structured data for destinations
- Target keywords: Travel Agency in India, Best Travel Agency India, Flight Booking, Visa Services, Medical Tourism

## Next Action Items
1. ✅ Frontend with mock data - COMPLETED
2. Build backend API for lead form
3. Integrate email service (SendGrid/similar)
4. Add meta tags for SEO
5. Test end-to-end functionality
6. Deploy to production

## User Personas

### Persona 1: Family Traveler (Domestic)
- Age: 35-50
- Looking for safe, comfortable family packages
- Budget conscious
- Values trust and reliability

### Persona 2: Honeymoon Couple (International)
- Age: 25-35
- Seeking romantic destinations
- Willing to spend on premium experiences
- Values customization and uniqueness

### Persona 3: Medical Tourist (Foreign)
- Age: 40-70
- Needs comprehensive support (hospital, accommodation, travel)
- Requires language assistance
- Values professionalism and care

### Persona 4: Corporate Traveler
- Age: 30-50
- Frequent travel needs
- Values efficiency and quick service
- Needs invoicing and documentation

## Technical Notes
- Frontend URL: https://explore-mundo-yatra.preview.emergentagent.com
- Backend API prefix: /api
- Environment variables properly configured
- Hot reload enabled for development

## Recent Updates (December 2025)

### ✅ Latest Changes
1. **Section Reordering**: Moved destination sections (Domestic & International) before About section on homepage
2. **Destination Details Modal**: 
   - Clicking any destination card now opens a modal popup
   - Modal displays comprehensive trip details including:
     - Hero image with destination name, duration, and price
     - Package highlights
     - Day-wise detailed itinerary
     - Package inclusions
   - Smooth scrollable content with professional design
3. **WhatsApp Integration Enhancement**:
   - "Book Now via WhatsApp" button in modal
   - Pre-fills WhatsApp message with destination name and package details
   - Format: "Hi! I'm interested in booking the *[Destination]* package ([Duration]) starting from [Price]. Please share more details."
4. **Enhanced Mock Data**:
   - Added detailed itineraries for all 6 domestic destinations
   - Added detailed itineraries for all 6 international destinations
   - Each destination includes highlights, day-wise activities, and inclusions

### Technical Implementation
- Created DestinationModal component using Shadcn Dialog
- Updated DestinationCard to trigger modal on click
- Modified Home.jsx with modal state management
- Enhanced mock.js with comprehensive destination data
- WhatsApp deep linking with URL-encoded pre-filled messages


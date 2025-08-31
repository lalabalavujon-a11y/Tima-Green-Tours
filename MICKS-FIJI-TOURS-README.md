# Mick's Fiji Tours - Super Booking App

A comprehensive, modern booking system for Mick's Fiji Tours, a 100% indigenous Fijian-owned tour company. This app provides a beautiful, user-friendly interface for customers to book authentic Fijian adventures while giving administrators powerful tools to manage bookings and track business performance.

## 🌺 Features

### Customer-Facing Features
- **Beautiful Tour Showcase**: Stunning visual presentation of all available tours with high-quality images and detailed descriptions
- **Multi-Step Booking Process**: Intuitive 3-step booking flow (Tour Details → Personal Info → Payment)
- **Real-time Pricing**: Dynamic pricing calculation with promo code support
- **Responsive Design**: Fully responsive design that works perfectly on desktop, tablet, and mobile devices
- **Booking Confirmation**: Instant booking confirmation with unique booking numbers
- **Promo Code System**: Support for promotional discounts and special offers

### Admin Features
- **Admin Dashboard**: Comprehensive dashboard with booking statistics and management tools
- **Booking Management**: View, update, and manage all bookings with real-time status updates
- **Analytics**: Track total bookings, confirmed bookings, and revenue
- **Customer Management**: Access to customer information and booking history
- **Tour Management**: Easy management of tour information and pricing

### Technical Features
- **Modern Tech Stack**: Built with Node.js, React, TypeScript, and Tailwind CSS
- **Database Integration**: PostgreSQL database with Drizzle ORM for reliable data storage
- **API-First Design**: RESTful API endpoints for all booking operations
- **Real-time Updates**: Live updates for booking status and availability
- **Security**: Input validation, data sanitization, and secure payment processing

## 🏝️ Available Tours

### 1. The Authentic Fijian Beach Horse Riding Experience
- **Location**: Natadola Beach & Navo Island
- **Duration**: 4 hours
- **Price**: FJD 191.80 per person
- **Highlights**: World-class beach riding, ancestral caves visit, cultural village experience
- **Includes**: Guided horseback ride, fresh coconut, light lunch, shopping stop

### 2. The Authentic Fijian Waterfall Experience
- **Location**: Biausevu Forest (Biokula Waterfall)
- **Duration**: 3-4 hours
- **Price**: FJD 180.00 per person
- **Highlights**: Natural waterfall pools, thrilling cliff jumps, cultural insights
- **Includes**: Waterfall swimming, cultural demonstrations, indigenous guides

### 3. Lomawai Fijian Traditional Salt Making Tour
- **Location**: Lomawai Village
- **Duration**: 2-3 hours
- **Price**: FJD 75.00 per person
- **Highlights**: Ancient traditional craft, direct village interaction
- **Includes**: Traditional salt making demonstration, hands-on experience

### 4. Navala Village Eco Tour
- **Location**: Navala Village, Fiji Highlands
- **Duration**: 4-5 hours
- **Price**: FJD 85.00 per person
- **Highlights**: Authentic village experience, traditional architecture
- **Includes**: Village exploration, traditional lunch, cultural demonstrations

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd professional-diver-local
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   DATABASE_URL=your_postgresql_connection_string
   PORT=5000
   NODE_ENV=development
   ```

4. **Set up the database**
   ```bash
   npm run db:push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Access the application**
   - Main booking app: http://localhost:5000/micks-fiji-tours
   - Admin dashboard: http://localhost:5000/micks-fiji-tours/admin

## 📱 Usage

### For Customers

1. **Browse Tours**: Visit the main page to explore available tours
2. **Select a Tour**: Click "Book This Adventure" on any tour card
3. **Complete Booking Form**: Fill in tour details, personal information, and payment method
4. **Confirm Booking**: Review details and confirm your booking
5. **Receive Confirmation**: Get instant confirmation with booking number

### For Administrators

1. **Access Admin Dashboard**: Navigate to `/micks-fiji-tours/admin`
2. **View Statistics**: Check booking statistics and revenue data
3. **Manage Bookings**: Update booking statuses and view customer details
4. **Track Performance**: Monitor business metrics and booking trends

## 🛠️ API Endpoints

### Tours
- `GET /api/booking/tours` - Get all available tours
- `GET /api/booking/tours/:id` - Get specific tour details

### Bookings
- `POST /api/booking/bookings` - Create a new booking
- `GET /api/booking/bookings/:id` - Get booking details
- `GET /api/booking/bookings/number/:bookingNumber` - Get booking by number
- `PATCH /api/booking/bookings/:id` - Update booking
- `PATCH /api/booking/bookings/:id/cancel` - Cancel booking

### Promo Codes
- `POST /api/booking/validate-promo` - Validate promo code

### Payments
- `POST /api/booking/payments` - Process payment

### Admin
- `GET /api/booking/admin/stats` - Get booking statistics
- `GET /api/booking/customer/:email/bookings` - Get customer bookings

## 🎨 Design Features

### Visual Design
- **Fijian-Inspired Color Scheme**: Ocean blues, tropical greens, and warm yellows
- **Beautiful Imagery**: High-quality tour photos and scenic backgrounds
- **Smooth Animations**: Framer Motion animations for enhanced user experience
- **Modern UI Components**: Clean, professional interface with intuitive navigation

### User Experience
- **Progressive Disclosure**: Information revealed as needed to avoid overwhelming users
- **Clear Call-to-Actions**: Prominent booking buttons and clear navigation
- **Loading States**: Smooth loading indicators and progress feedback
- **Error Handling**: User-friendly error messages and validation feedback

## 🔧 Customization

### Adding New Tours
1. Update the `tourData` array in `server/booking-service.ts`
2. Add tour images to the public directory
3. Update the tour card component if needed

### Modifying Styling
- Main styles are in `client/src/index.css`
- Component-specific styles use Tailwind CSS classes
- Color scheme can be modified in the Tailwind config

### Database Schema
The app uses the following main tables:
- `tours` - Tour information and pricing
- `customers` - Customer details
- `bookings` - Booking records
- `payments` - Payment transactions
- `promo_codes` - Promotional codes

## 📞 Contact Information

**Mick's Fiji Tours & Transfers**
- **Phone**: +679 784 7905 or +679 720 9449
- **Email**: admin@micksfijitours.com
- **Location**: Nadi, Fiji
- **Ownership**: 100% Indigenous Fijian-owned

## 🌟 Why Choose Mick's Fiji Tours?

- **Authentic Experiences**: Genuine cultural experiences led by local indigenous guides
- **Local Ownership**: 100% Fijian-owned, supporting local communities
- **Customizable Tours**: Personalized itineraries and special requests accommodated
- **Convenient Service**: Hotel pickup and drop-off included
- **Competitive Pricing**: Fair, local rates with transparent pricing
- **Cultural Preservation**: Supporting traditional Fijian customs and crafts

## 🚀 Deployment

### Production Build
```bash
npm run build
npm start
```

### Environment Variables for Production
```env
DATABASE_URL=your_production_database_url
PORT=5000
NODE_ENV=production
```

## 📄 License

This project is proprietary software developed for Mick's Fiji Tours. All rights reserved.

---

**Bula Vinaka!** Welcome to authentic Fijian adventures with Mick's Fiji Tours! 🌺

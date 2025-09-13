# Tima Green Tours - Super Booking App

A comprehensive, modern booking system for Tima Green Tours, showcasing authentic Fijian adventures and cultural experiences. This app provides a beautiful, user-friendly interface for customers to explore and book tours while giving administrators powerful tools to manage content and track business performance.

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
- **Modern Tech Stack**: Built with Next.js 14, React, TypeScript, and Tailwind CSS
- **Static Site Generation**: Fast, SEO-optimized pages with excellent performance
- **Content Management**: Easy-to-update tour content and pricing
- **Responsive Design**: Mobile-first design that works on all devices
- **Security**: Built-in security headers and best practices

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
- Node.js (v22 or higher)
- npm package manager

### Installation

1. **Clone the repository**
   ```zsh
   git clone <repository-url>
   cd tima-green-tours
   ```

2. **Install dependencies**
   ```zsh
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_APP_URL=https://app.timagreentours.com
   NEXT_PUBLIC_WEBSITE_URL=https://timagreentours.com
   NODE_ENV=development
   ```

4. **Start the development server**
   ```zsh
   npm run dev
   ```

5. **Access the application**
   - Main website: http://localhost:3000
   - Tours page: http://localhost:3000/tours

## 📱 Usage

### For Customers

1. **Browse Tours**: Visit the tours page to explore available adventures
2. **View Tour Details**: Click on any tour to see detailed information
3. **Contact for Booking**: Use the contact form to inquire about tours
4. **Get Information**: Access comprehensive tour details and pricing

### For Administrators

1. **Content Management**: Update tour information and pricing
2. **Contact Management**: Handle customer inquiries and bookings
3. **Site Updates**: Manage website content and tour offerings

## 🛠️ Project Structure

### Key Directories
- `/app` - Next.js 14 app directory with pages and components
- `/components` - Reusable React components
- `/content` - Tour content and data
- `/lib` - Utility functions and configurations
- `/public` - Static assets and images

### Main Pages
- `/` - Homepage with tour highlights
- `/tours` - Complete tours listing
- `/tours/[slug]` - Individual tour pages
- `/contact` - Contact and booking form

## 🎨 Design Features

### Visual Design
- **Tima Green Tours Branding**: Green, black, and white color scheme inspired by timagreentours.com
- **Beautiful Imagery**: High-quality tour photos and scenic backgrounds
- **Modern UI Components**: Clean, professional interface with intuitive navigation
- **Responsive Design**: Mobile-first approach with excellent user experience

### User Experience
- **Progressive Disclosure**: Information revealed as needed to avoid overwhelming users
- **Clear Call-to-Actions**: Prominent booking buttons and clear navigation
- **Loading States**: Smooth loading indicators and progress feedback
- **Error Handling**: User-friendly error messages and validation feedback

## 🔧 Customization

### Adding New Tours
1. Update tour content in the `/content` directory
2. Add tour images to the `/public` directory
3. Update tour data in the appropriate content files

### Modifying Styling
- Main styles use Tailwind CSS classes
- Brand colors are defined in `tailwind.config.ts`
- Component-specific styles are co-located with components

### Content Management
- Tour information is stored in content files
- Easy to update pricing, descriptions, and images
- No database required for content updates

## 📞 Contact Information

**Tima Green Tours**
- **Website**: https://timagreentours.com
- **App**: https://app.timagreentours.com
- **Email**: bookings@timagreentours.com
- **Location**: Fiji

## 🌟 Why Choose Tima Green Tours?

- **Authentic Experiences**: Genuine cultural experiences and natural adventures
- **Beautiful Website**: Modern, user-friendly interface for easy browsing
- **Comprehensive Information**: Detailed tour descriptions and pricing
- **Easy Contact**: Simple booking and inquiry process
- **Professional Service**: Well-organized tour information and clear communication

## 🚀 Deployment

### Production Build
```zsh
npm run build
npm start
```

### Environment Variables for Production
```env
NEXT_PUBLIC_APP_URL=https://app.timagreentours.com
NEXT_PUBLIC_WEBSITE_URL=https://timagreentours.com
NODE_ENV=production
```

### Deployment Platforms
- **Vercel**: Automatic deployment from GitHub
- **Cloudflare Pages**: Alternative deployment option
- **Custom Domain**: app.timagreentours.com

## 📄 License

This project is proprietary software developed for Tima Green Tours. All rights reserved.

---

**Bula Vinaka!** Welcome to authentic Fijian adventures with Tima Green Tours! 🌺

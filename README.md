# Tima Green Tours

A modern Next.js application showcasing authentic Fijian tour experiences. Built with Next.js 13, TypeScript, and Tailwind CSS, deployed on Cloudflare Pages.

## 🌴 About

Tima Green Tours offers carefully curated authentic experiences in Fiji, from cultural immersion to thrilling adventures. This application showcases our collection of tours with detailed information, pricing, and booking capabilities.

## 🚀 Features

- **Tour Showcase**: Browse 6 authentic Fijian tours
- **Search & Filter**: Find tours by category, difficulty, and location
- **Responsive Design**: Optimized for all devices
- **Static Export**: Fast loading with Cloudflare CDN
- **Security**: Comprehensive security headers and SSL/TLS
- **Performance**: Optimized with Cloudflare's global network

## 🏗️ Tech Stack

- **Framework**: Next.js 13 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Cloudflare Pages
- **CDN**: Cloudflare Global Network
- **Security**: Cloudflare SSL/TLS, WAF, DDoS Protection

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/tima-green-tours.git
cd tima-green-tours

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🏝️ Available Tours

1. **Biausevu Waterfall Tour** - Nature adventure with traditional kava ceremony
2. **Sigatoka River Safari** - Cultural river journey through Fijian villages
3. **Mamanuca Islands Day Trip** - Island hopping and snorkeling
4. **Nadi Highlands Trek** - Mountain hiking with panoramic views
5. **Suva Cultural Experience** - City tour with traditional performances
6. **Pacific Harbour Adventure** - Water sports and marine activities

## 🚀 Deployment

### Cloudflare Pages Deployment

This application is configured for deployment on Cloudflare Pages with static export.

#### Build Configuration
```bash
# Build the application
npm run build

# The build output is in the 'out' directory
# This directory is configured for Cloudflare Pages deployment
```

#### Cloudflare Pages Settings
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Build Output Directory**: `out`
- **Production Branch**: `main`

#### Custom Domain
- **Website**: https://timagreentours.com
- **App**: https://app.timagreentours.com

## 🔧 Configuration

### Environment Variables
Copy `env.example` to `.env.local` and configure:

```env
# Application URLs
NEXT_PUBLIC_APP_URL=https://app.timagreentours.com
NEXT_PUBLIC_WEBSITE_URL=https://timagreentours.com

# Cloudflare Configuration
CLOUDFLARE_API_TOKEN=your_api_token
CLOUDFLARE_ZONE_ID=your_zone_id
```

### Next.js Configuration
The application uses static export for optimal performance:

```javascript
// next.config.js
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}
```

## 📁 Project Structure

```
tima-green-tours/
├── src/
│   ├── app/
│   │   ├── tours/
│   │   │   ├── page.tsx          # Tours listing page
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # Individual tour pages
│   │   ├── layout.tsx            # Root layout
│   │   └── page.tsx              # Home page
│   └── data/
│       └── tours.ts              # Tour data
├── public/
│   └── images/                   # Tour images
├── next.config.js               # Next.js configuration
├── wrangler.toml                # Cloudflare Pages config
└── package.json
```

## 🛡️ Security Features

### Cloudflare Security
- **SSL/TLS**: Full (strict) encryption
- **WAF**: Web Application Firewall
- **DDoS Protection**: Automatic attack mitigation
- **Security Headers**: HSTS, CSP, X-Frame-Options
- **Rate Limiting**: Protection against abuse

### Application Security
- **Content Security Policy**: XSS protection
- **HSTS**: HTTPS enforcement
- **Frame Options**: Clickjacking protection
- **Content Type Options**: MIME sniffing protection

## 🚀 Performance Optimizations

### Cloudflare Optimizations
- **Global CDN**: 200+ locations worldwide
- **Brotli Compression**: Reduced file sizes
- **Auto Minify**: JavaScript, CSS, and HTML
- **Edge Caching**: Fast content delivery
- **Rocket Loader**: JavaScript optimization

### Application Optimizations
- **Static Export**: Pre-rendered pages
- **Image Optimization**: Responsive images
- **Code Splitting**: Automatic bundle optimization
- **Lazy Loading**: On-demand content loading

## 🧪 Testing

### Local Development
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Test static build locally
npx serve out --port 3001
```

### Production Testing
```bash
# Test website
curl -I https://timagreentours.com

# Test app
curl -I https://app.timagreentours.com

# Test security headers
curl -I -H "User-Agent: Mozilla/5.0" https://app.timagreentours.com
```

## 📚 Documentation

- [Cloudflare Setup Guide](CLOUDFLARE_SETUP.md)
- [Security Implementation](CLOUDFLARE_SECURITY_IMPLEMENTATION.md)
- [Deployment Guide](CLOUDFLARE_PAGES_SETUP.md)
- [DNS Configuration](DNS_SETUP.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary to Tima Green Tours.

## 📞 Contact

For questions about tours or technical support:
- **Website**: https://timagreentours.com
- **App**: https://app.timagreentours.com

---

**Built with ❤️ for authentic Fijian experiences**

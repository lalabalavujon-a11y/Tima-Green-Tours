# CloudFlare + Vercel Hybrid Setup Guide

## 🚀 Optimized Configuration for Tima Green Tours

### **DNS Records to Add in CloudFlare:**

#### 1. **A Record (Main Domain)**
- **Type:** A
- **Name:** `@` (or leave blank)
- **Content:** `76.76.21.21`
- **Proxy Status:** DNS only (gray cloud)
- **TTL:** Auto

#### 2. **CNAME Record (www subdomain)**
- **Type:** CNAME
- **Name:** `www`
- **Content:** `timagreentours.com`
- **Proxy Status:** Proxied (orange cloud)
- **TTL:** Auto

#### 3. **CNAME Record (app subdomain)**
- **Type:** CNAME
- **Name:** `app`
- **Content:** `tima-green-tours-o8vpmgqi8-jon-lalabalavus-projects.vercel.app`
- **Proxy Status:** Proxied (orange cloud)
- **TTL:** Auto

### **CloudFlare Page Rules (Optional but Recommended):**

#### 1. **App Subdirectory Cache Rule**
- **URL:** `timagreentours.com/app/*`
- **Settings:**
  - Cache Level: Cache Everything
  - Edge Cache TTL: 4 hours
  - Browser Cache TTL: 1 hour

#### 2. **Static Assets Cache Rule**
- **URL:** `timagreentours.com/_next/static/*`
- **Settings:**
  - Cache Level: Cache Everything
  - Edge Cache TTL: 1 year
  - Browser Cache TTL: 1 year

### **CloudFlare Speed Settings:**

#### 1. **Auto Minify**
- ✅ JavaScript
- ✅ CSS
- ✅ HTML

#### 2. **Brotli Compression**
- ✅ Enable

#### 3. **Rocket Loader**
- ✅ Enable

#### 4. **Early Hints**
- ✅ Enable

### **CloudFlare Security Settings:**

#### 1. **Security Level**
- Set to: Medium

#### 2. **Browser Integrity Check**
- ✅ Enable

#### 3. **Always Use HTTPS**
- ✅ Enable

#### 4. **SSL/TLS Mode**
- Set to: Full (strict)

### **CloudFlare Caching Settings:**

#### 1. **Caching Level**
- Set to: Standard

#### 2. **Always Online**
- ✅ Enable

#### 3. **Development Mode**
- ❌ Disable (for production)

### **Performance Benefits:**

✅ **Global CDN** - Content served from 200+ locations worldwide
✅ **DDoS Protection** - Enterprise-grade security
✅ **Automatic HTTPS** - SSL certificates included
✅ **Image Optimization** - Automatic image compression
✅ **Mobile Optimization** - Enhanced mobile performance
✅ **SEO Benefits** - Faster loading improves search rankings

### **Expected Performance:**

- **First Contentful Paint:** < 1.5 seconds
- **Largest Contentful Paint:** < 2.5 seconds
- **Cumulative Layout Shift:** < 0.1
- **First Input Delay:** < 100ms

### **Final URLs:**

- **Main App:** `https://timagreentours.com/app`
- **Tours Page:** `https://timagreentours.com/app/tours`
- **Individual Tour:** `https://timagreentours.com/app/tours/biausevu-waterfall-tour`
- **Contact:** `https://timagreentours.com/app/contact`

### **Monitoring:**

1. **CloudFlare Analytics** - Monitor traffic and performance
2. **Vercel Analytics** - Track app performance and errors
3. **Google PageSpeed Insights** - Regular performance checks
4. **Core Web Vitals** - Monitor user experience metrics

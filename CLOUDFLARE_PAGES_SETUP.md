# Cloudflare Pages Setup - No Vercel Needed!

## 🎉 **Perfect Solution: Deploy Directly to Cloudflare Pages**

### **Why This is Better:**
- ✅ **No Vercel dependency**
- ✅ **Direct Cloudflare integration**
- ✅ **Better SSL/TLS handling**
- ✅ **Simpler deployment**
- ✅ **No privacy issues**

---

## 🔧 **Step 1: Install Cloudflare CLI**

### **Install Wrangler (Cloudflare CLI):**
```bash
npm install -g wrangler
```

### **Login to Cloudflare:**
```bash
wrangler login
```

---

## 🔧 **Step 2: Configure for Cloudflare Pages**

### **Create Cloudflare Pages Configuration:**
Create a `wrangler.toml` file in your project root:

```toml
name = "tima-green-tours"
compatibility_date = "2024-01-01"

[pages]
directory = ".next"
```

### **Update Next.js Configuration:**
Update your `next.config.js` to work with Cloudflare Pages:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.timagreentours.com; frame-ancestors 'none';",
          },
        ],
      },
    ]
  }
}

module.exports = nextConfig
```

---

## 🔧 **Step 3: Build for Static Export**

### **Build the App:**
```bash
npm run build
```

### **Verify Build Output:**
The build should create a `out` directory with static files.

---

## 🔧 **Step 4: Deploy to Cloudflare Pages**

### **Option 1: Using Wrangler CLI**
```bash
# Deploy to Cloudflare Pages
wrangler pages deploy out --project-name tima-green-tours
```

### **Option 2: Using Cloudflare Dashboard**
1. Go to https://dash.cloudflare.com
2. Navigate to Pages
3. Create new project
4. Connect your GitHub repository
5. Set build settings:
   - Build command: `npm run build`
   - Build output directory: `out`
   - Root directory: `/`

---

## 🔧 **Step 5: Configure Custom Domain**

### **Add Custom Domain:**
1. In Cloudflare Pages dashboard
2. Go to your project
3. Click "Custom domains"
4. Add: `app.timagreentours.com`

### **Update DNS Records:**
```
Type: CNAME
Name: app
Target: [your-cloudflare-pages-url].pages.dev
Proxy: ON (orange cloud)
```

---

## 🧪 **Testing Commands**

### **Test Local Build:**
```bash
# Test static export locally
npx serve out
# Visit: http://localhost:3000
```

### **Test After Deployment:**
```bash
# Test app subdomain
curl -I https://app.timagreentours.com

# Test tours page
curl -I https://app.timagreentours.com/tours
```

---

## 🎯 **Expected Results**

### **After Deployment:**
- ✅ **No SSL Error 525**
- ✅ **No 404 errors**
- ✅ **App subdomain loads correctly**
- ✅ **Tours page displays**
- ✅ **All 6 tours showing**
- ✅ **Security headers applied**

---

## 📋 **Quick Setup Commands**

### **Complete Setup:**
```bash
# 1. Install Wrangler
npm install -g wrangler

# 2. Login to Cloudflare
wrangler login

# 3. Build for static export
npm run build

# 4. Deploy to Cloudflare Pages
wrangler pages deploy out --project-name tima-green-tours
```

---

## 🚀 **Benefits of Cloudflare Pages**

### **Advantages:**
- **Direct Cloudflare integration**
- **No third-party dependencies**
- **Better SSL/TLS handling**
- **Global CDN**
- **Built-in security features**
- **No privacy issues**
- **Simpler deployment**

### **Security Features:**
- **Automatic SSL/TLS**
- **DDoS protection**
- **WAF (Web Application Firewall)**
- **Security headers**
- **Global edge caching**

---

## 🎉 **Success Indicators**

### **After Setup:**
- ✅ **App loads at app.timagreentours.com**
- ✅ **Tours page displays correctly**
- ✅ **All 6 tours showing**
- ✅ **Search and filtering working**
- ✅ **Security headers applied**
- ✅ **SSL/TLS working perfectly**

**This is the perfect solution - no Vercel needed, direct Cloudflare deployment! 🚀**

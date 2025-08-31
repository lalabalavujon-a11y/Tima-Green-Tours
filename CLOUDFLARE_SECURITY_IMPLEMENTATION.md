# Tima Green Tours - Cloudflare Security Implementation

## 🚀 Complete Security Setup for Hybrid Architecture

### **Current Setup:**
- **Main Website**: https://timagreentours.com (Gamma hosting)
- **Tour App**: https://app.timagreentours.com (Vercel)
- **Direct Vercel**: tima-green-tours-naw8ptz3z-jon-lalabalavus-projects.vercel.app

---

## 🔒 **Step 1: DNS Security Configuration**

### **Current DNS Records (Verify these are correct):**

| Type | Name | Content | Proxy Status | Purpose |
|------|------|---------|--------------|---------|
| A | @ | 3.136.232.26 | ✅ Proxied (orange cloud) | Main website on Gamma |
| A | @ | 3.137.108.170 | ✅ Proxied (orange cloud) | Main website on Gamma (backup) |
| CNAME | app | tima-green-tours-naw8ptz3z-jon-lalabalavus-projects.vercel.app | ✅ Proxied (orange cloud) | Tour app on Vercel |

### **Security DNS Records to Add:**

| Type | Name | Content | Proxy Status | Purpose |
|------|------|---------|--------------|---------|
| TXT | @ | v=spf1 include:_spf.google.com ~all | DNS only | Email security |
| TXT | @ | google-site-verification=YOUR_VERIFICATION_CODE | DNS only | Google Search Console |
| CAA | @ | 0 issue "letsencrypt.org" | DNS only | SSL certificate authority |

---

## 🔐 **Step 2: SSL/TLS Configuration**

### **SSL/TLS Settings (Apply to both domains):**
- **Encryption Mode**: Full (strict) ✅
- **Minimum TLS Version**: TLS 1.2 ✅
- **Opportunistic Encryption**: ON ✅
- **TLS 1.3**: ON ✅
- **Automatic HTTPS Rewrites**: ON ✅

### **Edge Certificates:**
- **Always Use HTTPS**: ON ✅
- **HSTS (HTTP Strict Transport Security)**: ON ✅
- **HSTS Max Age**: 31536000 (1 year) ✅
- **HSTS Include Subdomains**: ON ✅
- **HSTS Preload**: ON ✅

---

## 🛡️ **Step 3: Security Features**

### **Security Level Settings:**
- **Security Level**: Medium (recommended for tour websites)
- **Browser Integrity Check**: ON ✅
- **Challenge Passage**: 30 minutes
- **Security Events**: Monitor and alert

### **WAF (Web Application Firewall) Rules:**

#### **Rate Limiting Rules:**
```
Rule 1: Rate Limit - 100 requests per minute per IP
- Field: IP Address
- Operator: Rate limit
- Value: 100 requests per minute
- Action: Block
```

#### **Bot Management:**
```
Rule 2: Block Bad Bots
- Field: User Agent
- Operator: Contains
- Value: (bot|crawler|spider|scraper)
- Action: Challenge (Captcha)
```

#### **Geographic Restrictions (Optional):**
```
Rule 3: Block High-Risk Countries
- Field: IP.geoip.country
- Operator: In
- Value: [Add countries if needed]
- Action: Block
```

---

## ⚡ **Step 4: Performance Optimization**

### **Speed Settings:**
- **Auto Minify**: JavaScript ✅, CSS ✅, HTML ✅
- **Brotli Compression**: ON ✅
- **Rocket Loader**: ON ✅
- **Early Hints**: ON ✅
- **Always Online**: ON ✅

### **Caching Configuration:**

#### **Page Rules for Main Website:**
```
Rule 1: timagreentours.com/*
- Cache Level: Standard
- Edge Cache TTL: 4 hours
- Browser Cache TTL: 1 hour
- Always Online: ON
```

#### **Page Rules for Tour App:**
```
Rule 2: app.timagreentours.com/*
- Cache Level: Standard
- Edge Cache TTL: 2 hours
- Browser Cache TTL: 30 minutes
- Always Online: ON
```

#### **Static Assets Caching:**
```
Rule 3: *.timagreentours.com/_next/static/*
- Cache Level: Cache Everything
- Edge Cache TTL: 1 year
- Browser Cache TTL: 1 year
```

---

## 📊 **Step 5: Analytics & Monitoring**

### **Cloudflare Analytics:**
- **Web Analytics**: Enable for both domains
- **Security Events**: Monitor threats and attacks
- **Performance Metrics**: Track Core Web Vitals

### **Logpush Configuration:**
```
Logpush Settings:
- Logs: HTTP requests, Security events
- Destination: Your preferred log storage
- Format: JSON
- Frequency: Real-time
```

---

## 🔧 **Step 6: Application Security Headers**

### **Next.js Security Headers (Already Implemented):**
```javascript
// In next.config.js
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
  key: 'Strict-Transport-Security',
  value: 'max-age=31536000; includeSubDomains; preload',
},
{
  key: 'Permissions-Policy',
  value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
},
{
  key: 'Content-Security-Policy',
  value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.timagreentours.com; frame-ancestors 'none';",
}
```

---

## 🚀 **Step 7: Deployment Automation**

### **Use the Automated Deployment Script:**
```bash
# Make sure you have your Cloudflare credentials
export CLOUDFLARE_ZONE_ID="your_zone_id"
export CLOUDFLARE_API_TOKEN="your_api_token"

# Run the deployment script
./deploy-cloudflare.sh
```

### **Manual Deployment Steps:**
1. **Build the application**: `npm run build`
2. **Deploy to Vercel**: `npm run deploy`
3. **Configure Cloudflare settings** (follow steps above)
4. **Test both domains** for functionality and security

---

## ✅ **Step 8: Security Testing**

### **Security Validation Tools:**
- **SSL Labs Test**: https://www.ssllabs.com/ssltest/
- **Security Headers Test**: https://securityheaders.com
- **Mozilla Observatory**: https://observatory.mozilla.org
- **Google PageSpeed Insights**: https://pagespeed.web.dev/

### **Expected Security Scores:**
- **SSL Labs**: A+ (95+ points)
- **Security Headers**: A+ (90+ points)
- **Mozilla Observatory**: A+ (90+ points)

---

## 📞 **Step 9: Monitoring & Maintenance**

### **Weekly Tasks:**
- [ ] Check Cloudflare security dashboard
- [ ] Review security events and threats
- [ ] Monitor performance metrics
- [ ] Check SSL certificate status

### **Monthly Tasks:**
- [ ] Review and update firewall rules
- [ ] Check for new security threats
- [ ] Update dependencies
- [ ] Review access logs

### **Quarterly Tasks:**
- [ ] Security audit and penetration testing
- [ ] Update security policies
- [ ] Review and update backup procedures
- [ ] Performance optimization review

---

## 🎯 **Expected Results:**

### **Security Benefits:**
- ✅ **DDoS Protection**: Enterprise-grade protection
- ✅ **WAF Protection**: Web application firewall
- ✅ **Bot Management**: Advanced bot detection
- ✅ **SSL/TLS Security**: A+ grade security
- ✅ **Rate Limiting**: Protection against abuse

### **Performance Benefits:**
- ✅ **Global CDN**: 200+ locations worldwide
- ✅ **Faster Loading**: 50-70% improvement
- ✅ **Mobile Optimization**: Enhanced mobile performance
- ✅ **SEO Benefits**: Better search rankings

### **Monitoring Benefits:**
- ✅ **Real-time Analytics**: Traffic and security insights
- ✅ **Threat Detection**: Automatic threat blocking
- ✅ **Performance Monitoring**: Core Web Vitals tracking
- ✅ **Uptime Monitoring**: 99.9%+ availability

---

## 🚀 **Ready to Implement!**

Your Tima Green Tours is now ready for comprehensive Cloudflare security implementation. Follow the steps above to secure both your main website and tour app with enterprise-grade protection.

**Next Action**: Run the deployment script or manually configure Cloudflare settings as outlined above.

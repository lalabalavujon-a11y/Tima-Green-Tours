# Quick Reference: Phases 3 & 4 Configuration

## 🔐 **Phase 3: Security Headers (15 minutes)**

### **Step 1: HSTS Configuration**
```
Dashboard → timagreentours.com → SSL/TLS → Edge Certificates → HSTS
✅ Enable HSTS: ON
Max Age: 31536000
✅ Apply to subdomains: ON
✅ Preload: ON
```

### **Step 2: Security Headers Page Rule**
```
Dashboard → timagreentours.com → Rules → Page Rules → Create Page Rule

URL: timagreentours.com/*

Settings:
✅ Always Use HTTPS: ON
✅ Security Level: Medium
✅ Browser Integrity Check: ON

Custom Headers (Add one by one):
1. X-Frame-Options: DENY
2. X-Content-Type-Options: nosniff
3. X-XSS-Protection: 1; mode=block
4. Referrer-Policy: strict-origin-when-cross-origin
5. Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
6. Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.timagreentours.com; frame-ancestors 'none';
```

---

## ⚡ **Phase 4: Performance Optimization (10 minutes)**

### **Step 1: Speed Tab Settings**
```
Dashboard → timagreentours.com → Speed tab

Enable:
✅ Brotli Compression: ON
✅ JavaScript (Auto Minify): ON
✅ CSS (Auto Minify): ON
✅ HTML (Auto Minify): ON
✅ Rocket Loader: ON
✅ Early Hints: ON
✅ Always Online: ON
```

### **Step 2: Caching Tab Settings**
```
Dashboard → timagreentours.com → Caching tab

Configure:
Caching Level: Standard
✅ Always Online: ON
```

### **Step 3: Caching Page Rules**
```
Dashboard → timagreentours.com → Rules → Page Rules

Rule 1: Static Assets
URL: *.timagreentours.com/_next/static/*
Cache Level: Cache Everything
Edge Cache TTL: 1 year
Browser Cache TTL: 1 year

Rule 2: Main Website
URL: timagreentours.com/*
Cache Level: Standard
Edge Cache TTL: 4 hours
Browser Cache TTL: 1 hour

Rule 3: Tour App
URL: app.timagreentours.com/*
Cache Level: Standard
Edge Cache TTL: 2 hours
Browser Cache TTL: 30 minutes
```

---

## 🧪 **Quick Test Commands**

### **Test Security Headers:**
```bash
curl -I https://timagreentours.com/ | grep -E "(Strict-Transport-Security|X-Frame-Options|X-Content-Type-Options|X-XSS-Protection)"
```

### **Test Performance:**
```bash
curl -o /dev/null -s -w "Time: %{time_total}s\nSize: %{size_download} bytes\n" https://timagreentours.com/
```

---

## 📊 **Online Tests**

### **Security Tests:**
- **Security Headers**: https://securityheaders.com → Enter: `timagreentours.com`
- **SSL Labs**: https://www.ssllabs.com/ssltest/ → Enter: `timagreentours.com`

### **Performance Tests:**
- **PageSpeed**: https://pagespeed.web.dev/ → Enter: `timagreentours.com`
- **GTmetrix**: https://gtmetrix.com/ → Enter: `timagreentours.com`

---

## ✅ **Expected Results**

### **After Configuration:**
- **Security Headers Grade**: A+ (90+ points)
- **SSL Labs Grade**: A+ (95+ points)
- **PageSpeed Score**: 90+ (mobile & desktop)
- **Load Time**: < 0.5 seconds
- **Compression**: Brotli enabled
- **Caching**: Optimized

---

## 🚨 **Important Notes**

### **Page Rules Limit:**
- **Free plan**: 3 page rules maximum
- **Pro plan**: 20 page rules
- **Business plan**: 50 page rules

### **HSTS Warning:**
- Once enabled, browsers remember for 1 year
- Test thoroughly before enabling preload
- Cannot be easily disabled

### **Content Security Policy:**
- Test website functionality after enabling
- Monitor for any broken features
- Adjust policy if needed

---

## 🎯 **Success Checklist**

- [ ] HSTS enabled with preload
- [ ] Security headers page rule created
- [ ] All performance optimizations enabled
- [ ] Caching rules configured
- [ ] Security Headers grade A+ (90+ points)
- [ ] SSL Labs grade A+ (95+ points)
- [ ] PageSpeed score 90+ (mobile & desktop)
- [ ] Both domains working correctly

**Complete these steps and your Tima Green Tours will be fully secured and optimized! 🚀**

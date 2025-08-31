# Tima Green Tours - Phases 3 & 4 Dashboard Guide

## 🎯 **Phase 3: Add Security Headers**

### **Step 1: Access Page Rules**
```
Dashboard → timagreentours.com → Rules → Page Rules
```

### **Step 2: Create Security Headers Rule**

#### **Click "Create Page Rule"**

#### **Configure the Rule:**
```
URL: timagreentours.com/*
```

#### **Add These Settings:**
1. **Always Use HTTPS**: ON
2. **Security Level**: Medium
3. **Browser Integrity Check**: ON
4. **Add Custom Header**: Click "Add Custom Header"

#### **Add Custom Security Headers:**
Click "Add Custom Header" and add these one by one:

**Header 1:**
- **Name**: `X-Frame-Options`
- **Value**: `DENY`

**Header 2:**
- **Name**: `X-Content-Type-Options`
- **Value**: `nosniff`

**Header 3:**
- **Name**: `X-XSS-Protection`
- **Value**: `1; mode=block`

**Header 4:**
- **Name**: `Referrer-Policy`
- **Value**: `strict-origin-when-cross-origin`

**Header 5:**
- **Name**: `Permissions-Policy`
- **Value**: `camera=(), microphone=(), geolocation=(), interest-cohort=()`

**Header 6:**
- **Name**: `Content-Security-Policy`
- **Value**: `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.timagreentours.com; frame-ancestors 'none';`

#### **Save the Rule**

---

## 🔐 **Enable HSTS (Strict-Transport-Security)**

### **Step 1: Access HSTS Settings**
```
Dashboard → timagreentours.com → SSL/TLS → Edge Certificates → HSTS
```

### **Step 2: Configure HSTS**
```
✅ Enable HSTS: Toggle ON
Max Age: 31536000
✅ Apply HSTS Policy to subdomains: Toggle ON
✅ Preload: Toggle ON
```

### **Step 3: Save HSTS Settings**

---

## ⚡ **Phase 4: Performance Optimization**

### **Step 1: Enable Brotli Compression**
```
Dashboard → timagreentours.com → Speed tab
```

**Find and Enable:**
- ✅ **Brotli Compression**: Toggle ON

### **Step 2: Enable Auto Minify**
```
Dashboard → timagreentours.com → Speed tab
```

**Find and Enable:**
- ✅ **JavaScript**: Toggle ON
- ✅ **CSS**: Toggle ON
- ✅ **HTML**: Toggle ON

### **Step 3: Enable Additional Performance Features**
```
Dashboard → timagreentours.com → Speed tab
```

**Find and Enable:**
- ✅ **Rocket Loader**: Toggle ON
- ✅ **Early Hints**: Toggle ON
- ✅ **Always Online**: Toggle ON

---

## 📦 **Configure Caching Rules**

### **Step 1: Basic Caching Settings**
```
Dashboard → timagreentours.com → Caching tab
```

**Configure:**
- **Caching Level**: Dropdown → Select "Standard"
- ✅ **Always Online**: Toggle ON

### **Step 2: Create Caching Page Rules**
```
Dashboard → timagreentours.com → Rules → Page Rules
```

#### **Rule 1: Static Assets Caching**
```
URL: *.timagreentours.com/_next/static/*
Settings:
- Cache Level: Cache Everything
- Edge Cache TTL: 1 year
- Browser Cache TTL: 1 year
```

#### **Rule 2: Main Website Caching**
```
URL: timagreentours.com/*
Settings:
- Cache Level: Standard
- Edge Cache TTL: 4 hours
- Browser Cache TTL: 1 hour
```

#### **Rule 3: Tour App Caching**
```
URL: app.timagreentours.com/*
Settings:
- Cache Level: Standard
- Edge Cache TTL: 2 hours
- Browser Cache TTL: 30 minutes
```

---

## 🧪 **Testing Your Configuration**

### **Test Security Headers:**
```bash
# Test main website
curl -I https://timagreentours.com/ | grep -E "(Strict-Transport-Security|X-Frame-Options|X-Content-Type-Options|X-XSS-Protection|Content-Security-Policy)"

# Test tour app
curl -I https://app.timagreentours.com/ | grep -E "(Strict-Transport-Security|X-Frame-Options|X-Content-Type-Options|X-XSS-Protection|Content-Security-Policy)"
```

### **Expected Security Headers:**
```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Content-Security-Policy: [your configured policy]
```

### **Test Performance:**
```bash
# Test compression
curl -H "Accept-Encoding: gzip, deflate, br" -I https://timagreentours.com/

# Test performance
curl -o /dev/null -s -w "Time: %{time_total}s\nSize: %{size_download} bytes\nSpeed: %{speed_download} bytes/sec\n" https://timagreentours.com/
```

---

## 📊 **Online Testing Tools**

### **Security Testing:**
1. **Security Headers Test**: https://securityheaders.com
   - Enter: `timagreentours.com`
   - Expected: A+ grade (90+ points)

2. **SSL Labs Test**: https://www.ssllabs.com/ssltest/
   - Enter: `timagreentours.com`
   - Expected: A+ grade (95+ points)

### **Performance Testing:**
1. **PageSpeed Insights**: https://pagespeed.web.dev/
   - Enter: `timagreentours.com`
   - Expected: 90+ score

2. **GTmetrix**: https://gtmetrix.com/
   - Enter: `timagreentours.com`
   - Expected: A grade performance

---

## 🎯 **Dashboard Navigation Summary**

### **For Security Headers:**
1. **Rules** → **Page Rules** → **Create Page Rule**
2. **SSL/TLS** → **Edge Certificates** → **HSTS**

### **For Performance Optimization:**
1. **Speed** tab → Enable all optimizations
2. **Caching** tab → Configure caching level
3. **Rules** → **Page Rules** → Create caching rules

---

## ✅ **Verification Checklist**

### **Security Headers:**
- [ ] HSTS enabled with preload
- [ ] X-Frame-Options: DENY
- [ ] X-Content-Type-Options: nosniff
- [ ] X-XSS-Protection: 1; mode=block
- [ ] Content Security Policy configured
- [ ] Security Headers grade A+ (90+ points)

### **Performance Optimization:**
- [ ] Brotli compression enabled
- [ ] Auto minify enabled (JS, CSS, HTML)
- [ ] Rocket loader enabled
- [ ] Caching rules configured
- [ ] PageSpeed score 90+ (mobile & desktop)

---

## 🚨 **Important Notes**

### **Page Rules Limits:**
- **Free plan**: 3 page rules
- **Pro plan**: 20 page rules
- **Business plan**: 50 page rules

### **Content Security Policy:**
- Test thoroughly before enabling
- Monitor for any broken functionality
- Adjust policy if needed

### **HSTS Considerations:**
- Once enabled, browsers remember for 1 year
- Test thoroughly before enabling preload
- Cannot be easily disabled

---

## 📞 **Troubleshooting**

### **If Security Headers Not Showing:**
1. Check if DNS is proxied (orange cloud)
2. Verify page rules are active
3. Wait 5-15 minutes for propagation
4. Clear browser cache

### **If Performance Issues:**
1. Check if optimizations are enabled
2. Verify caching rules are active
3. Monitor for conflicts
4. Test with different browsers

---

## 🎉 **Success Criteria**

### **After Completing Phases 3 & 4:**
- ✅ **Security Headers**: A+ grade (90+ points)
- ✅ **SSL Labs**: A+ grade (95+ points)
- ✅ **PageSpeed**: 90+ score
- ✅ **HSTS**: Enabled with preload
- ✅ **Performance**: 50-70% improvement
- ✅ **Caching**: Optimized for all content types

**Your Tima Green Tours will be fully secured and optimized! 🚀**

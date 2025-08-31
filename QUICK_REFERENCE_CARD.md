# Tima Green Tours - Quick Reference Card

## 🚀 **Essential Cloudflare Settings**

### **DNS Records (Must be Proxied - Orange Cloud)**
```
Main Website:
- Type: A | Name: @ | Content: 3.136.232.26 | Proxy: ✅
- Type: A | Name: @ | Content: 3.137.108.170 | Proxy: ✅

Tour App:
- Type: CNAME | Name: app | Content: tima-green-tours-p6sgk2g8b-jon-lalabalavus-projects.vercel.app | Proxy: ✅
```

### **SSL/TLS Settings**
```
Encryption Mode: Full (strict)
Always Use HTTPS: ✅ Enable
HSTS: ✅ Enable (max-age=31536000, includeSubDomains, preload)
TLS 1.3: ✅ Enable
Minimum TLS: 1.2
```

### **Security Settings**
```
Security Level: Medium
Browser Integrity Check: ✅ Enable
WAF: ✅ Enable
Rate Limiting: 100 requests/minute per IP
```

### **Performance Settings**
```
Auto Minify: ✅ JS, CSS, HTML
Brotli Compression: ✅ Enable
Rocket Loader: ✅ Enable
Always Online: ✅ Enable
```

---

## 🧪 **Quick Test Commands**

### **Test Main Website**
```bash
# Basic response
curl -I https://timagreentours.com

# Performance test
curl -o /dev/null -s -w "Time: %{time_total}s\nSize: %{size_download} bytes\nSpeed: %{speed_download} bytes/sec\n" https://timagreentours.com

# Security headers
curl -I https://timagreentours.com | grep -E "(Strict-Transport-Security|X-Frame-Options|X-Content-Type-Options|X-XSS-Protection)"
```

### **Test Tour App**
```bash
# Basic response
curl -I https://app.timagreentours.com

# Tours page
curl -I https://app.timagreentours.com/app/tours

# Performance test
curl -o /dev/null -s -w "Time: %{time_total}s\nSize: %{size_download} bytes\nSpeed: %{speed_download} bytes/sec\n" https://app.timagreentours.com
```

### **Test Local Development**
```bash
# Check if tours are working
curl -s http://localhost:3000/app/tours | grep "Biausevu Waterfall Tour"
```

---

## 📊 **Online Testing Tools**

### **Security Tests**
- **SSL Labs**: https://www.ssllabs.com/ssltest/ → Enter: `timagreentours.com`
- **Security Headers**: https://securityheaders.com → Enter: `timagreentours.com`

### **Performance Tests**
- **PageSpeed**: https://pagespeed.web.dev/ → Enter: `timagreentours.com`
- **GTmetrix**: https://gtmetrix.com/ → Enter: `timagreentours.com`

---

## ✅ **Expected Results**

### **After Cloudflare Setup:**
```
Main Website:
- Load Time: < 0.5 seconds
- SSL Grade: A+ (95+ points)
- Security Headers: A+ (90+ points)
- PageSpeed: 90+ score

Tour App:
- Load Time: < 1 second
- All 6 tours displaying
- Search/filter working
- Responsive design
```

---

## 🚨 **Critical Issues to Fix**

### **1. DNS Configuration**
- [ ] Update CNAME for app subdomain
- [ ] Ensure all records are proxied (orange cloud)
- [ ] Wait for DNS propagation (5-15 minutes)

### **2. Security Headers**
- [ ] Enable HSTS with preload
- [ ] Add X-Frame-Options: DENY
- [ ] Add X-Content-Type-Options: nosniff
- [ ] Add Content Security Policy

### **3. Performance**
- [ ] Enable Auto Minify
- [ ] Enable Brotli compression
- [ ] Configure caching rules
- [ ] Enable Rocket Loader

---

## 📞 **Quick Actions**

### **If DNS Not Working:**
1. Check proxy status (orange cloud)
2. Verify CNAME record is correct
3. Wait 5-15 minutes for propagation

### **If SSL Errors:**
1. Ensure "Full (strict)" mode
2. Check origin server SSL
3. Verify DNS is proxied

### **If Performance Issues:**
1. Enable all speed optimizations
2. Configure caching rules
3. Check for conflicts

---

## 🎯 **Success Checklist**

- [ ] Both domains load in < 1 second
- [ ] SSL Labs grade A+ (95+ points)
- [ ] Security Headers grade A+ (90+ points)
- [ ] PageSpeed score 90+ (mobile & desktop)
- [ ] All tours functionality working
- [ ] Global CDN delivery active
- [ ] Enterprise security protection enabled

**Your Tima Green Tours will be fully optimized! 🚀**

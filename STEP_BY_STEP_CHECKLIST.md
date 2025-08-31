# Tima Green Tours - Step-by-Step Cloudflare Checklist

## ✅ **Follow This Checklist in Order**

### **Step 1: Access Cloudflare Dashboard**
- [ ] Go to https://dash.cloudflare.com
- [ ] Log in to your account
- [ ] Click on `timagreentours.com` domain

---

## 🔧 **Step 2: Configure DNS Records**

### **2.1 Check Main Website A Records**
- [ ] Go to **DNS** tab
- [ ] Find A records for `@` (main domain)
- [ ] Ensure they point to: `3.136.232.26` and `3.137.108.170`
- [ ] Verify both show **orange cloud** (proxied)

### **2.2 Update Tour App CNAME Record**
- [ ] Find CNAME record for `app`
- [ ] Update content to: `tima-green-tours-p6sgk2g8b-jon-lalabalavus-projects.vercel.app`
- [ ] Ensure it shows **orange cloud** (proxied)
- [ ] Save changes

---

## 🔐 **Step 3: Configure SSL/TLS Settings**

### **3.1 Basic SSL Configuration**
- [ ] Go to **SSL/TLS** tab
- [ ] Set **Encryption Mode** to: **Full (strict)**
- [ ] Enable **Always Use HTTPS**
- [ ] Set **Minimum TLS Version** to: **TLS 1.2**

### **3.2 Edge Certificates**
- [ ] Go to **SSL/TLS → Edge Certificates**
- [ ] Enable **Always Use HTTPS**
- [ ] Enable **Automatic HTTPS Rewrites**
- [ ] Enable **Opportunistic Encryption**
- [ ] Enable **TLS 1.3**

### **3.3 HSTS Configuration**
- [ ] Go to **SSL/TLS → Edge Certificates → HSTS**
- [ ] Click **Enable HSTS**
- [ ] Set **Max Age** to: `31536000`
- [ ] Enable **Apply HSTS Policy to subdomains**
- [ ] Enable **Preload**
- [ ] Save settings

---

## 🛡️ **Step 4: Configure Security Settings**

### **4.1 Security Level**
- [ ] Go to **Security** tab
- [ ] Set **Security Level** to: **Medium**
- [ ] Enable **Browser Integrity Check**
- [ ] Set **Challenge Passage** to: **30 minutes**

### **4.2 WAF (Web Application Firewall)**
- [ ] Go to **Security → WAF**
- [ ] Enable **WAF**
- [ ] Click **Create Custom Rule**
- [ ] Set **Rule Name**: "Rate Limit - 100 requests per minute"
- [ ] Set **Field**: IP Address
- [ ] Set **Operator**: Rate limit
- [ ] Set **Value**: 100 requests per minute
- [ ] Set **Action**: Block
- [ ] Save rule

---

## ⚡ **Step 5: Configure Performance Settings**

### **5.1 Auto Minify**
- [ ] Go to **Speed** tab
- [ ] Enable **JavaScript** minification
- [ ] Enable **CSS** minification
- [ ] Enable **HTML** minification

### **5.2 Optimization Features**
- [ ] Enable **Brotli Compression**
- [ ] Enable **Rocket Loader**
- [ ] Enable **Early Hints**
- [ ] Enable **Always Online**

---

## 📦 **Step 6: Configure Caching**

### **6.1 Basic Caching**
- [ ] Go to **Caching** tab
- [ ] Set **Caching Level** to: **Standard**
- [ ] Enable **Always Online**

---

## 📋 **Step 7: Create Page Rules**

### **7.1 Go to Page Rules**
- [ ] Go to **Rules → Page Rules**
- [ ] Click **Create Page Rule**

### **7.2 Rule 1: Main Website Security**
- [ ] Set **URL**: `timagreentours.com/*`
- [ ] Add **Always Use HTTPS**: ON
- [ ] Add **Security Level**: Medium
- [ ] Add **Browser Integrity Check**: ON
- [ ] Save rule

### **7.3 Rule 2: Tour App Security**
- [ ] Click **Create Page Rule**
- [ ] Set **URL**: `app.timagreentours.com/*`
- [ ] Add **Always Use HTTPS**: ON
- [ ] Add **Security Level**: Medium
- [ ] Add **Browser Integrity Check**: ON
- [ ] Save rule

### **7.4 Rule 3: Static Assets Caching**
- [ ] Click **Create Page Rule**
- [ ] Set **URL**: `*.timagreentours.com/_next/static/*`
- [ ] Add **Cache Level**: Cache Everything
- [ ] Add **Edge Cache TTL**: 1 year
- [ ] Add **Browser Cache TTL**: 1 year
- [ ] Save rule

---

## 🧪 **Step 8: Test Configuration**

### **8.1 Wait for Propagation**
- [ ] Wait 5-15 minutes for DNS changes to propagate
- [ ] Wait for SSL/TLS settings to take effect

### **8.2 Test Main Website**
- [ ] Open https://timagreentours.com
- [ ] Verify it loads correctly
- [ ] Check for HTTPS redirect
- [ ] Test performance

### **8.3 Test Tour App**
- [ ] Open https://app.timagreentours.com
- [ ] Verify it loads correctly
- [ ] Check tours page: https://app.timagreentours.com/app/tours
- [ ] Verify all 6 tours display

### **8.4 Command Line Tests**
```bash
# Test main website
curl -I https://timagreentours.com

# Test tour app
curl -I https://app.timagreentours.com

# Test performance
curl -o /dev/null -s -w "Time: %{time_total}s\n" https://timagreentours.com
```

---

## 📊 **Step 9: Online Testing**

### **9.1 SSL/TLS Test**
- [ ] Go to https://www.ssllabs.com/ssltest/
- [ ] Enter: `timagreentours.com`
- [ ] Wait for test to complete
- [ ] Verify A+ grade (95+ points)

### **9.2 Security Headers Test**
- [ ] Go to https://securityheaders.com
- [ ] Enter: `timagreentours.com`
- [ ] Wait for test to complete
- [ ] Verify A+ grade (90+ points)

### **9.3 Performance Test**
- [ ] Go to https://pagespeed.web.dev/
- [ ] Enter: `timagreentours.com`
- [ ] Wait for test to complete
- [ ] Verify 90+ score (mobile & desktop)

---

## 🎯 **Step 10: Verification Checklist**

### **10.1 DNS Configuration**
- [ ] All A records show orange cloud (proxied)
- [ ] CNAME record for app subdomain is correct
- [ ] DNS propagation is complete

### **10.2 SSL/TLS Configuration**
- [ ] Encryption mode is "Full (strict)"
- [ ] HSTS is enabled with preload
- [ ] Always Use HTTPS is enabled
- [ ] TLS 1.3 is enabled

### **10.3 Security Configuration**
- [ ] Security level is set to "Medium"
- [ ] Browser integrity check is enabled
- [ ] WAF is enabled with rate limiting rule
- [ ] Page rules for security are active

### **10.4 Performance Configuration**
- [ ] Auto minify is enabled (JS, CSS, HTML)
- [ ] Brotli compression is enabled
- [ ] Rocket loader is enabled
- [ ] Caching rules are configured

### **10.5 Functionality Testing**
- [ ] Main website loads correctly
- [ ] Tour app loads correctly
- [ ] All 6 tours are displayed
- [ ] Search and filtering work
- [ ] Responsive design works

---

## 🚨 **Troubleshooting**

### **If DNS Not Working:**
- [ ] Check proxy status (orange cloud)
- [ ] Verify CNAME record is correct
- [ ] Wait 5-15 minutes for propagation

### **If SSL Errors:**
- [ ] Ensure "Full (strict)" mode
- [ ] Check origin server SSL certificate
- [ ] Verify DNS is proxied

### **If Performance Issues:**
- [ ] Enable all speed optimizations
- [ ] Configure caching rules
- [ ] Check for conflicting settings

### **If Security Headers Missing:**
- [ ] Verify Cloudflare proxy is enabled
- [ ] Check page rules configuration
- [ ] Ensure WAF is active

---

## 🎉 **Success Criteria**

### **After Completing All Steps:**
- ✅ Both domains load in < 1 second
- ✅ SSL Labs grade A+ (95+ points)
- ✅ Security Headers grade A+ (90+ points)
- ✅ PageSpeed score 90+ (mobile & desktop)
- ✅ All tours functionality working
- ✅ Global CDN delivery active
- ✅ Enterprise security protection enabled

**Your Tima Green Tours will be fully optimized and secured! 🚀**

---

## 📞 **Need Help?**

### **If You Get Stuck:**
1. Check the detailed guide: `CLOUDFLARE_DETAILED_SETUP.md`
2. Review the dashboard locations: `CLOUDFLARE_DASHBOARD_LOCATIONS.md`
3. Use the quick reference: `QUICK_REFERENCE_CARD.md`
4. Contact Cloudflare support: https://support.cloudflare.com/

**Follow this checklist step-by-step for complete success! 🌺**

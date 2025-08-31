# Cloudflare Dashboard - Exact Locations Guide

## 🎯 **Where to Find Each Setting in Cloudflare Dashboard**

### **Step 1: Access Your Domain**
1. Go to https://dash.cloudflare.com
2. Log in to your account
3. Click on `timagreentours.com` domain

---

## 🔐 **SSL/TLS Settings Location**

### **Path: SSL/TLS Tab**

#### **2.1 SSL/TLS Configuration**
```
Dashboard → timagreentours.com → SSL/TLS tab
```
**Settings to configure:**
- **Encryption Mode**: Dropdown → Select "Full (strict)"
- **Always Use HTTPS**: Toggle → Turn ON
- **Minimum TLS Version**: Dropdown → Select "TLS 1.2"

#### **2.2 Edge Certificates**
```
Dashboard → timagreentours.com → SSL/TLS → Edge Certificates
```
**Settings to enable:**
- ✅ **Always Use HTTPS**: Toggle ON
- ✅ **Automatic HTTPS Rewrites**: Toggle ON
- ✅ **Opportunistic Encryption**: Toggle ON
- ✅ **TLS 1.3**: Toggle ON

#### **2.3 HSTS Configuration**
```
Dashboard → timagreentours.com → SSL/TLS → Edge Certificates → HSTS
```
**Settings to configure:**
- ✅ **Enable HSTS**: Toggle ON
- **Max Age**: Enter `31536000`
- ✅ **Apply HSTS Policy to subdomains**: Toggle ON
- ✅ **Preload**: Toggle ON

---

## 🛡️ **Security Settings Location**

### **Path: Security Tab**

#### **3.1 Security Level**
```
Dashboard → timagreentours.com → Security tab
```
**Settings to configure:**
- **Security Level**: Dropdown → Select "Medium"
- ✅ **Browser Integrity Check**: Toggle ON
- **Challenge Passage**: Enter `30` minutes

#### **3.2 WAF (Web Application Firewall)**
```
Dashboard → timagreentours.com → Security → WAF
```
**Settings to enable:**
- ✅ **WAF**: Toggle ON

**Create Custom Rules:**
1. Click **Create Custom Rule**
2. **Rule Name**: "Rate Limit - 100 requests per minute"
3. **Field**: Select "IP Address"
4. **Operator**: Select "Rate limit"
5. **Value**: Enter "100 requests per minute"
6. **Action**: Select "Block"

#### **3.3 Page Rules for Security**
```
Dashboard → timagreentours.com → Rules → Page Rules
```
**Create these rules:**

**Rule 1: Main Website Security**
- **URL**: `timagreentours.com/*`
- **Settings**:
  - ✅ Always Use HTTPS: ON
  - Security Level: Medium
  - ✅ Browser Integrity Check: ON

**Rule 2: Tour App Security**
- **URL**: `app.timagreentours.com/*`
- **Settings**:
  - ✅ Always Use HTTPS: ON
  - Security Level: Medium
  - ✅ Browser Integrity Check: ON

---

## ⚡ **Performance Settings Location**

### **Path: Speed Tab**

#### **4.1 Auto Minify**
```
Dashboard → timagreentours.com → Speed tab
```
**Settings to enable:**
- ✅ **JavaScript**: Toggle ON
- ✅ **CSS**: Toggle ON
- ✅ **HTML**: Toggle ON

#### **4.2 Optimization Features**
```
Dashboard → timagreentours.com → Speed tab
```
**Settings to enable:**
- ✅ **Brotli Compression**: Toggle ON
- ✅ **Rocket Loader**: Toggle ON
- ✅ **Early Hints**: Toggle ON
- ✅ **Always Online**: Toggle ON

---

## 📦 **Caching Settings Location**

### **Path: Caching Tab**

#### **4.3 Caching Configuration**
```
Dashboard → timagreentours.com → Caching tab
```
**Settings to configure:**
- **Caching Level**: Dropdown → Select "Standard"
- ✅ **Always Online**: Toggle ON

#### **4.4 Page Rules for Caching**
```
Dashboard → timagreentours.com → Rules → Page Rules
```
**Create these caching rules:**

**Rule 3: Static Assets Caching**
- **URL**: `*.timagreentours.com/_next/static/*`
- **Settings**:
  - Cache Level: Cache Everything
  - Edge Cache TTL: 1 year
  - Browser Cache TTL: 1 year

**Rule 4: Main Website Caching**
- **URL**: `timagreentours.com/*`
- **Settings**:
  - Cache Level: Standard
  - Edge Cache TTL: 4 hours
  - Browser Cache TTL: 1 hour

**Rule 5: Tour App Caching**
- **URL**: `app.timagreentours.com/*`
- **Settings**:
  - Cache Level: Standard
  - Edge Cache TTL: 2 hours
  - Browser Cache TTL: 30 minutes

---

## 🧪 **Testing Locations**

### **Path: Analytics Tab**

#### **5.1 Performance Monitoring**
```
Dashboard → timagreentours.com → Analytics tab
```
**What to check:**
- **Web Analytics**: View traffic and performance
- **Security Events**: Monitor threats and attacks
- **Performance Metrics**: Track Core Web Vitals

---

## 📊 **Dashboard Navigation Summary**

### **Main Tabs to Visit:**
1. **DNS** → Configure DNS records
2. **SSL/TLS** → Configure SSL settings
3. **Security** → Configure security features
4. **Speed** → Configure performance optimizations
5. **Caching** → Configure caching rules
6. **Rules** → Create page rules
7. **Analytics** → Monitor performance

### **Sub-sections to Configure:**
- **SSL/TLS** → Edge Certificates → HSTS
- **Security** → WAF → Custom Rules
- **Rules** → Page Rules → Create Rules
- **Speed** → Optimization Features

---

## 🎯 **Quick Reference - Tab by Tab**

### **DNS Tab:**
- ✅ Ensure all records show orange cloud (proxied)
- ✅ Update CNAME for app subdomain

### **SSL/TLS Tab:**
- ✅ Set Encryption Mode to "Full (strict)"
- ✅ Enable Always Use HTTPS
- ✅ Configure HSTS with preload

### **Security Tab:**
- ✅ Set Security Level to "Medium"
- ✅ Enable Browser Integrity Check
- ✅ Enable WAF and create rate limiting rules

### **Speed Tab:**
- ✅ Enable Auto Minify (JS, CSS, HTML)
- ✅ Enable Brotli Compression
- ✅ Enable Rocket Loader

### **Caching Tab:**
- ✅ Set Caching Level to "Standard"
- ✅ Enable Always Online

### **Rules Tab:**
- ✅ Create page rules for security
- ✅ Create page rules for caching

---

## 🚨 **Important Notes**

### **Orange Cloud vs Gray Cloud:**
- **Orange Cloud** = Proxied through Cloudflare ✅
- **Gray Cloud** = DNS only (no protection) ❌

### **Settings That Require Proxied DNS:**
- Security headers
- Performance optimizations
- SSL/TLS features
- WAF protection

### **Page Rules Limit:**
- Free plan: 3 page rules
- Pro plan: 20 page rules
- Business plan: 50 page rules

---

## 📞 **If You Can't Find a Setting**

### **Common Issues:**
1. **Setting not visible**: Check your Cloudflare plan level
2. **Option grayed out**: Ensure DNS is proxied (orange cloud)
3. **Changes not taking effect**: Wait 5-15 minutes for propagation

### **Support Resources:**
- Cloudflare Help: https://support.cloudflare.com/
- Community Forum: https://community.cloudflare.com/
- Documentation: https://developers.cloudflare.com/

---

## 🎯 **Success Indicators**

### **After Configuration, You Should See:**
- ✅ All DNS records with orange cloud
- ✅ SSL/TLS showing "Full (strict)"
- ✅ Security features enabled
- ✅ Performance optimizations active
- ✅ Page rules created and active

**Follow this guide step-by-step to configure your Tima Green Tours domains! 🚀**

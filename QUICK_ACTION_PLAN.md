# Tima Green Tours - Quick Action Plan

## 🚀 **Immediate Next Steps for Cloudflare Security**

### **Step 1: Get Your Cloudflare Credentials**

#### **Find Your Zone ID:**
1. Go to https://dash.cloudflare.com
2. Select your `timagreentours.com` domain
3. Look at the URL or right sidebar for Zone ID
4. Copy the Zone ID (it's a 32-character string)

#### **Create API Token:**
1. Go to https://dash.cloudflare.com/profile/api-tokens
2. Click "Create Token"
3. Use "Custom token" template
4. Set permissions:
   - Zone:Zone:Edit
   - Zone:Zone Settings:Edit
   - Zone:Cache Purge:Edit
5. Set Zone Resources to: `timagreentours.com`
6. Copy the generated token

### **Step 2: Update Environment Variables**

```bash
# Add these to your .env.local file
CLOUDFLARE_ZONE_ID=your_zone_id_here
CLOUDFLARE_API_TOKEN=your_api_token_here
```

### **Step 3: Run Automated Security Setup**

```bash
# Make the script executable (if not already)
chmod +x deploy-cloudflare.sh

# Run the deployment script
./deploy-cloudflare.sh
```

### **Step 4: Manual Cloudflare Configuration**

#### **SSL/TLS Settings:**
1. Go to SSL/TLS tab in Cloudflare
2. Set Encryption Mode to "Full (strict)"
3. Enable "Always Use HTTPS"
4. Enable HSTS with preload

#### **Security Settings:**
1. Go to Security tab
2. Set Security Level to "Medium"
3. Enable "Browser Integrity Check"
4. Configure WAF rules for rate limiting

#### **Speed Settings:**
1. Go to Speed tab
2. Enable Auto Minify (JS, CSS, HTML)
3. Enable Brotli compression
4. Enable Rocket Loader

### **Step 5: Test Your Setup**

#### **Test URLs:**
- Main site: https://timagreentours.com
- Tour app: https://app.timagreentours.com
- Direct Vercel: https://tima-green-tours-naw8ptz3z-jon-lalabalavus-projects.vercel.app

#### **Security Tests:**
- SSL Labs: https://www.ssllabs.com/ssltest/
- Security Headers: https://securityheaders.com
- PageSpeed: https://pagespeed.web.dev/

### **Step 6: Monitor and Verify**

#### **Check Cloudflare Dashboard:**
- Security events
- Performance metrics
- Traffic analytics
- SSL certificate status

#### **Expected Results:**
- ✅ Both domains working
- ✅ HTTPS redirects working
- ✅ Security headers present
- ✅ Performance improved
- ✅ SSL grade A+

---

## 🎯 **Priority Actions (Do These First):**

1. **Get Cloudflare credentials** (Zone ID + API Token)
2. **Run deployment script** (`./deploy-cloudflare.sh`)
3. **Test both domains** work correctly
4. **Verify SSL certificates** are active
5. **Check security headers** are present

---

## 📞 **Need Help?**

If you encounter any issues:

1. **Check the logs** from the deployment script
2. **Verify DNS records** are correct
3. **Test individual components** step by step
4. **Review Cloudflare dashboard** for errors

---

## 🚀 **Ready to Start?**

Your Tima Green Tours is ready for enterprise-grade Cloudflare security! 

**Start with Step 1** - getting your Cloudflare credentials, then run the automated deployment script for immediate security implementation.

# DNS Setup for app.timagreentours.com

## 🚀 CloudFlare DNS Configuration (Proper Setup)

### **Step 1: Go to CloudFlare**
- Log into: https://dash.cloudflare.com
- Select your `timagreentours.com` domain
- Go to **DNS** tab

### **Step 2: DNS Records Configuration**

**IMPORTANT: Keep main domain with Gamma, only subdomain with Vercel!**

| Type | Name | Content | Proxy Status | Purpose |
|------|------|---------|--------------|---------|
| A | @ | 3.136.232.26 | Proxied (orange cloud) | Main website on Gamma |
| A | @ | 3.137.108.170 | Proxied (orange cloud) | Main website on Gamma (backup) |
| CNAME | app | tima-green-tours-naw8ptz3z-jon-lalabalavus-projects.vercel.app | Proxied (orange cloud) | Tour app on Vercel |

### **Step 3: Actions Required in CloudFlare**

**ADD these A records (for Gamma):**
1. **A record 1:** Name: `@`, Content: `3.136.232.26`, Proxy: Proxied
2. **A record 2:** Name: `@`, Content: `3.137.108.170`, Proxy: Proxied

**REMOVE these records (Vercel/CloudFlare):**
- **Remove:** Any A record pointing to `172.67.193.79`
- **Remove:** Any A record pointing to `104.21.90.14`
- **Remove:** Any A record pointing to `76.76.21.21`
- **Remove:** Any AAAA records pointing to `2606:4700:3032::ac43:c14f`
- **Remove:** Any AAAA records pointing to `2606:4700:3037::6815:5a0e`

**KEEP this CNAME record (for Vercel app):**
- **CNAME:** Name: `app`, Content: `tima-green-tours-naw8ptz3z-jon-lalabalavus-projects.vercel.app`, Proxy: Proxied

### **Step 4: Vercel Configuration**

**We need to remove the main domain from Vercel:**
- Go to Vercel dashboard
- Remove `timagreentours.com` from the project
- Keep only the subdomain configuration

### **Step 5: Test Your Setup**

**Main Website (should work):**
- https://timagreentours.com

**Tour App (should work):**
- https://app.timagreentours.com

**Direct Vercel URL (backup):**
- https://tima-green-tours-naw8ptz3z-jon-lalabalavus-projects.vercel.app

### **🎯 Expected Result:**

- **Main Site:** https://timagreentours.com → Your Gamma website ✅
- **Tour App:** https://app.timagreentours.com → Your Vercel app ✅

### **⏱️ Timeline:**

- **DNS Update:** Immediate
- **Propagation:** 5-15 minutes
- **Both sites working:** Within 30 minutes

**This setup keeps your main website on Gamma and only uses Vercel for the app subdomain! 🚀**
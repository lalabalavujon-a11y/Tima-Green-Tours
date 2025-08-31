# Cloudflare Pages Deployment Guide

## 🚀 **Deploy to Cloudflare Pages - Dashboard Method**

### **Why Dashboard Method is Better:**
- ✅ **No Node.js version requirements**
- ✅ **Visual interface**
- ✅ **Easy to configure**
- ✅ **Automatic deployments**

---

## 📋 **Step-by-Step Deployment**

### **Step 1: Go to Cloudflare Dashboard**
```
https://dash.cloudflare.com
```

### **Step 2: Navigate to Pages**
```
Dashboard → Pages → Create a project
```

### **Step 3: Connect Repository**
```
1. Click "Connect to Git"
2. Select your GitHub account
3. Choose the "tima-green-tours" repository
4. Click "Install and authorize"
```

### **Step 4: Configure Build Settings**
```
Project name: tima-green-tours
Production branch: main (or your default branch)

Build settings:
- Framework preset: Next.js
- Build command: npm run build
- Build output directory: out
- Root directory: / (leave empty)
```

### **Step 5: Environment Variables (Optional)**
```
No environment variables needed for this project
```

### **Step 6: Deploy**
```
Click "Save and Deploy"
```

---

## 🔧 **Configure Custom Domain**

### **Step 1: Add Custom Domain**
```
1. After deployment, go to your project
2. Click "Custom domains" tab
3. Click "Set up a custom domain"
4. Enter: app.timagreentours.com
5. Click "Continue"
```

### **Step 2: Verify DNS**
```
Cloudflare will automatically configure DNS
The CNAME record will be created automatically
```

---

## 🧪 **Testing After Deployment**

### **Test Commands:**
```bash
# Test app subdomain
curl -I https://app.timagreentours.com

# Test tours page
curl -I https://app.timagreentours.com/tours

# Test individual tour
curl -I https://app.timagreentours.com/tours/biausevu-waterfall-tour
```

### **Expected Results:**
- ✅ **HTTP/2 200** (not 404 or 525)
- ✅ **Security headers present**
- ✅ **SSL/TLS working**

---

## 🎯 **What You'll Get**

### **After Deployment:**
- ✅ **Fully working app**
- ✅ **All 6 tours displaying**
- ✅ **Search and filtering**
- ✅ **Individual tour pages**
- ✅ **SSL/TLS security**
- ✅ **Global CDN**
- ✅ **DDoS protection**

---

## 📊 **Build Output Ready**

### **Your Static Build:**
```
out/
├── index.html (main page)
├── tours/
│   ├── index.html (tours listing)
│   ├── biausevu-waterfall-tour/
│   ├── sigatoka-valley-pottery-village/
│   ├── lomawai-salt-horse-riding/
│   ├── nadi-city-garden-sleeping-giant/
│   ├── momi-bay-natadola-beach/
│   └── coral-coast-pacific-harbour/
└── _next/ (assets)
```

### **All 6 Tours Generated:**
1. **Biausevu Waterfall Tour**
2. **Sigatoka Valley Drive & Lawai Pottery Village**
3. **Lomawai Salt Making Village & Horse Riding**
4. **Nadi City & Garden of the Sleeping Giant**
5. **Momi Bay & Natadola Beach**
6. **Coral Coast & Pacific Harbour**

---

## 🎉 **Benefits of This Approach**

### **Advantages:**
- **No Node.js version issues**
- **Visual deployment process**
- **Automatic HTTPS**
- **Global CDN**
- **Built-in security**
- **Easy domain management**
- **Automatic deployments on Git push**

---

## 📞 **If You Need Help**

### **Support Resources:**
- **Cloudflare Pages Docs**: https://developers.cloudflare.com/pages/
- **Cloudflare Support**: https://support.cloudflare.com/
- **GitHub Integration**: https://developers.cloudflare.com/pages/platform/git-integration/

### **Common Issues:**
- **Build fails**: Check build command and output directory
- **Domain not working**: Wait for DNS propagation (5-15 minutes)
- **404 errors**: Verify build output directory is "out"

---

## 🚀 **Quick Summary**

### **What We've Done:**
1. ✅ **Resolved SSL Error 525**
2. ✅ **Created static build**
3. ✅ **Generated all tour pages**
4. ✅ **Removed Vercel dependency**
5. ✅ **Prepared for Cloudflare Pages**

### **Next Step:**
**Deploy via Cloudflare Dashboard** - This will give you a fully working, secure app!

**Ready to deploy! Follow the dashboard steps above. 🚀**

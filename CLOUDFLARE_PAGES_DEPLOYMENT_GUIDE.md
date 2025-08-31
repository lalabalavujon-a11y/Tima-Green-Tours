# 🚀 Cloudflare Pages Deployment Guide - Next.js 14

## **TACKLE #1: Deploy to Cloudflare Pages**

### **Step 1: Access Cloudflare Dashboard**
```
1. Go to: https://dash.cloudflare.com
2. Sign in to your Cloudflare account
3. Click "Pages" in the left sidebar
```

### **Step 2: Create New Project**
```
1. Click "Create a project"
2. Choose "Connect to Git"
3. Select your GitHub account
4. Choose repository: lalabalavujon-a11y/Tima-Green-Tours
5. Click "Begin setup"
```

### **Step 3: Configure Build Settings**
```
Project name: tima-green-tours
Production branch: main
Framework preset: Next.js
Build command: npm run build
Build output directory: .next
Root directory: / (leave empty)
```

### **Step 4: Environment Variables (Optional)**
```
Add these if you want email functionality:
RESEND_API_KEY=your_resend_key
CONTACT_TO=bookings@timagreentours.com
CONTACT_FROM=web@timagreentours.com
```

### **Step 5: Deploy**
```
1. Click "Save and Deploy"
2. Wait for build to complete (2-3 minutes)
3. Your app will be live at: https://tima-green-tours.pages.dev
```

### **Step 6: Add Custom Domain**
```
1. Go to "Custom domains" tab
2. Click "Set up a custom domain"
3. Enter: app.timagreentours.com
4. Click "Continue"
5. Cloudflare will auto-configure DNS
```

---

## **Expected Results:**
- ✅ **App deployed** at https://tima-green-tours.pages.dev
- ✅ **Custom domain** working at https://app.timagreentours.com
- ✅ **SSL/TLS** automatically configured
- ✅ **Global CDN** active

---

## **Troubleshooting:**
- **Build fails**: Check build logs for errors
- **Domain not working**: Wait 5-10 minutes for DNS propagation
- **404 errors**: Check build output directory setting

**Ready to deploy? Let's get this live! 🚀**

# Cloudflare Pages Build Settings Guide

## 🔧 **Correct Build Settings for Cloudflare Pages**

### **When Production Branch is Not Available:**

---

## 📋 **Step-by-Step Build Configuration**

### **Step 1: Basic Settings**
```
Project name: tima-green-tours
Production branch: (leave empty or select your main branch)
```

### **Step 2: Build Settings**
```
Framework preset: Next.js
Build command: npm run build
Build output directory: out
Root directory: / (leave empty)
```

### **Step 3: Environment Variables**
```
No environment variables needed
(Leave this section empty)
```

---

## 🎯 **Alternative Build Settings**

### **If Next.js Preset Doesn't Work:**
```
Framework preset: None
Build command: npm run build
Build output directory: out
Root directory: / (leave empty)
```

### **If Build Command Fails:**
```
Framework preset: None
Build command: npm install && npm run build
Build output directory: out
Root directory: / (leave empty)
```

---

## 🔍 **What Each Setting Does**

### **Project name:**
- This is your project identifier
- Use: `tima-green-tours`

### **Production branch:**
- The branch to deploy from
- If not available, Cloudflare will use your default branch
- Usually `main` or `master`

### **Framework preset:**
- Tells Cloudflare how to build your project
- Use: `Next.js` (or `None` if Next.js not available)

### **Build command:**
- The command to build your project
- Use: `npm run build`

### **Build output directory:**
- Where the built files are located
- Use: `out`

### **Root directory:**
- Where your project files are located
- Use: `/` (leave empty for root)

---

## 🚨 **Common Issues & Solutions**

### **Issue 1: Production Branch Not Available**
```
Solution: Leave it empty
Cloudflare will use your default branch automatically
```

### **Issue 2: Next.js Preset Not Available**
```
Solution: Use "None" as framework preset
The build command will still work
```

### **Issue 3: Build Command Fails**
```
Solution: Try: npm install && npm run build
This ensures dependencies are installed
```

### **Issue 4: Build Output Directory Not Found**
```
Solution: Verify it's exactly "out"
Check that your build creates an "out" folder
```

---

## 🧪 **Verify Your Settings**

### **Before Deploying:**
1. **Project name**: `tima-green-tours`
2. **Framework preset**: `Next.js` (or `None`)
3. **Build command**: `npm run build`
4. **Build output directory**: `out`
5. **Root directory**: `/` (empty)

### **Your Build Output:**
```
out/
├── index.html
├── tours/
│   ├── index.html
│   ├── biausevu-waterfall-tour/
│   ├── sigatoka-valley-pottery-village/
│   └── ... (other tours)
└── _next/
```

---

## 🎯 **Final Configuration**

### **Recommended Settings:**
```
Project name: tima-green-tours
Production branch: (leave empty)
Framework preset: Next.js
Build command: npm run build
Build output directory: out
Root directory: / (leave empty)
Environment variables: (none needed)
```

### **Alternative Settings (if Next.js not available):**
```
Project name: tima-green-tours
Production branch: (leave empty)
Framework preset: None
Build command: npm run build
Build output directory: out
Root directory: / (leave empty)
Environment variables: (none needed)
```

---

## 🚀 **Next Steps**

### **After Configuring:**
1. **Click "Save and Deploy"**
2. **Wait for build to complete**
3. **Add custom domain: app.timagreentours.com**
4. **Test the deployment**

### **Expected Build Time:**
- **First build**: 2-5 minutes
- **Subsequent builds**: 1-2 minutes

---

## 📞 **If Build Fails**

### **Check These:**
1. **Build command**: Should be `npm run build`
2. **Output directory**: Should be `out`
3. **Repository**: Should be connected to GitHub
4. **Branch**: Should be your main branch

### **Common Error Messages:**
- **"Build output directory not found"**: Check that it's exactly `out`
- **"Build command failed"**: Try `npm install && npm run build`
- **"Framework preset not found"**: Use `None` instead

**The production branch field is optional - Cloudflare will use your default branch automatically! 🚀**

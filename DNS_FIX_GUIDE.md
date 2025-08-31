# DNS Fix Guide for app.timagreentours.com

## 🔧 **Problem Identified**

The CNAME record for `app.timagreentours.com` is currently pointing to:
```
tima-green-tours-p6sgk2g8b-jon-lalabalavus-projects.vercel.app
```

But it should point to your Cloudflare Pages URL:
```
1c3e3325.tima-green-tours.pages.dev
```

---

## 📋 **Step-by-Step Fix**

### **Step 1: Access Cloudflare Dashboard**
1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Sign in to your Cloudflare account
3. Select the domain: `timagreentours.com`

### **Step 2: Navigate to DNS Settings**
1. Click on **"DNS"** in the left sidebar
2. Click on **"Records"** tab
3. Look for the CNAME record for `app`

### **Step 3: Update the CNAME Record**
1. **Find the record**: Look for:
   - **Name**: `app`
   - **Type**: `CNAME`
   - **Target**: `tima-green-tours-p6sgk2g8b-jon-lalabalavus-projects.vercel.app`

2. **Click the edit button** (pencil icon) next to this record

3. **Update the target** to:
   ```
   1c3e3325.tima-green-tours.pages.dev
   ```

4. **Save the changes**

### **Step 4: Verify the Change**
1. **Wait 5-10 minutes** for DNS propagation
2. **Test the domain**: Visit `app.timagreentours.com`
3. **Check Cloudflare Pages**: Verify the custom domain is active

---

## 🔍 **Alternative: Check Cloudflare Pages**

### **If the DNS record looks correct:**

1. **Go to Cloudflare Pages Dashboard**
   - Visit [dash.cloudflare.com](https://dash.cloudflare.com)
   - Click **"Pages"** in the left sidebar
   - Select your project: `tima-green-tours`

2. **Check Custom Domains**
   - Click on **"Custom domains"** tab
   - Look for `app.timagreentours.com`
   - Status should show **"Active"**

3. **If not active:**
   - Click **"Set up a custom domain"**
   - Enter: `app.timagreentours.com`
   - Cloudflare will auto-configure DNS

---

## 🧪 **Testing the Fix**

### **After making changes:**

1. **Wait for propagation** (5-10 minutes)
2. **Test the URL**: `https://app.timagreentours.com`
3. **Check different browsers** and devices
4. **Clear browser cache** if needed

### **Expected Result:**
- ✅ Website loads properly
- ✅ No "Host Error" message
- ✅ All pages work correctly
- ✅ Mobile navigation functions

---

## 🚨 **If Still Not Working**

### **Check these common issues:**

1. **DNS Propagation**
   - Use [whatsmydns.net](https://whatsmydns.net) to check global DNS
   - Enter: `app.timagreentours.com`
   - Look for the CNAME record

2. **Cloudflare Proxy Status**
   - In DNS settings, ensure the orange cloud is **ON** (proxied)
   - If gray, click to enable Cloudflare proxy

3. **SSL/TLS Settings**
   - Go to **"SSL/TLS"** in Cloudflare dashboard
   - Ensure **"Full (strict)"** is selected
   - Check for any SSL errors

4. **Page Rules**
   - Check if any page rules are interfering
   - Go to **"Page Rules"** in Cloudflare dashboard

---

## 📞 **Need Help?**

### **If you're still having issues:**

1. **Screenshot the DNS records** and share
2. **Check Cloudflare Pages logs** for errors
3. **Verify the Cloudflare Pages URL** is correct
4. **Contact Cloudflare support** if needed

### **Quick Verification Commands:**
```bash
# Check DNS resolution
nslookup app.timagreentours.com

# Check HTTP response
curl -I https://app.timagreentours.com
```

---

## ✅ **Success Indicators**

**When the fix is working:**
- ✅ `app.timagreentours.com` loads your website
- ✅ No "Host Error" or "404" messages
- ✅ All tour pages accessible
- ✅ Mobile navigation works
- ✅ Contact form functions
- ✅ Images load properly

**Your website should now be fully accessible at both:**
- 🌐 `https://timagreentours.com` (main website)
- 📱 `https://app.timagreentours.com` (app subdomain)

---

*Let me know once you've made these changes and we can test the fix!* 🚀

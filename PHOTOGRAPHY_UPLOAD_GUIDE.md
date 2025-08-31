# Photography Upload Guide for Tima Green Tours

## 📸 **Real Photography Integration**

This guide will help you replace the placeholder images with authentic photos from your tours.

---

## 🎯 **Photo Requirements**

### **Technical Specifications**
- **Resolution**: Minimum 2400px on the long side
- **Format**: JPEG for photos, WebP/AVIF for web delivery
- **Aspect Ratios**:
  - Hero images: 16:9 (2400×1350px)
  - Gallery images: 4:3 or 16:9
  - Thumbnails: 1:1 (800×800px)

### **Content Requirements**
- **Authentic tour photos** (not stock images)
- **High-quality** and well-lit
- **Cultural sensitivity** and respect
- **Model releases** for recognizable people

---

## 📁 **File Organization**

### **Directory Structure**
```
public/photos/
├── biausevu/
│   ├── waterfall-main.jpg
│   ├── village-welcome.jpg
│   └── kava-ceremony.jpg
├── sigatoka/
│   ├── valley-scenic.jpg
│   └── pottery-making.jpg
├── lomawai/
│   └── salt-making.jpg
├── natadola/
│   └── horse-riding.jpg
├── sabeto/
│   ├── mudpool.jpg
│   └── temple.jpg
└── malolo/
    ├── beach-sunset.jpg
    └── island-view.jpg
```

### **Naming Convention**
- **Pattern**: `{location}-{subject}.jpg`
- **Examples**:
  - `biausevu-waterfall-main.jpg`
  - `sigatoka-valley-scenic.jpg`
  - `natadola-horse-riding.jpg`

---

## 🖼️ **Photo Categories by Tour**

### **1. Biausevu Waterfall Tour**
- **Hero**: Waterfall with people swimming
- **Gallery**: Village welcome, kava ceremony, trail walk
- **Details**: Hands in water, traditional dress

### **2. Sigatoka Valley & Lawai Pottery**
- **Hero**: Scenic valley view
- **Gallery**: Pottery making, kava ceremony, local lunch
- **Details**: Artisan hands, traditional tools

### **3. Lomawai Salt Making & Horse Riding**
- **Hero**: Salt-making process
- **Gallery**: Horse riding on beach, village visit
- **Details**: Traditional salt pans, beach views

### **4. Sabeto Mudpool & Nadi Temple**
- **Hero**: Mudpool experience
- **Gallery**: Temple visit, shopping, cultural activities
- **Details**: Mud application, temple architecture

### **5. Shark Diving Beqa Lagoon**
- **Hero**: Underwater shark encounter
- **Gallery**: Boat ride, safety briefing, marine life
- **Details**: Diving equipment, coral reefs

### **6. Malolo Island Getaway**
- **Hero**: Beach sunset or resort view
- **Gallery**: Water activities, cultural experiences, relaxation
- **Details**: Resort amenities, island landscapes

---

## 📝 **Metadata Requirements**

### **For Each Photo**
- **Alt text**: Descriptive and SEO-friendly
- **Caption**: Cultural context and location
- **Location**: Specific village or area
- **Photographer**: Credit information
- **Date**: When photo was taken
- **Consent**: Model release reference if applicable

### **Example Metadata**
```json
{
  "id": "bw-001",
  "src": "/photos/biausevu/waterfall-main.jpg",
  "alt": "Biausevu Waterfall cascading into natural pool",
  "caption": "The majestic Biausevu Waterfall - a perfect spot for swimming and photography",
  "location": "Biausevu Village, Sigatoka",
  "photographer": "Tima Green Tours",
  "dateTaken": "2024-01-15",
  "consentRef": "CONSENT-2024-001",
  "tags": ["waterfall", "swimming", "nature", "sigatoka"]
}
```

---

## 🔧 **Upload Process**

### **Step 1: Prepare Photos**
1. **Select best photos** from each tour (3-5 per tour)
2. **Resize to specifications** (2400px long side)
3. **Optimize for web** (compress to 80-90% quality)
4. **Add metadata** (location, date, description)

### **Step 2: Upload to Server**
1. **Create directories** in `public/photos/`
2. **Upload photos** with correct naming
3. **Update metadata** in `lib/photography.ts`
4. **Test display** on website

### **Step 3: Update Code**
1. **Replace placeholder paths** in photography system
2. **Add new tour photos** to the data structure
3. **Update alt text** and captions
4. **Test responsive display**

---

## 📋 **Consent & Legal**

### **Model Releases**
- **Required** for recognizable people
- **Store consent references** with photos
- **Respect cultural sensitivities**
- **Follow Fijian customs** and protocols

### **Cultural Considerations**
- **Ask permission** before taking photos
- **Respect village protocols**
- **Avoid intrusive photography**
- **Honor traditional customs**

---

## 🎨 **Photo Enhancement Tips**

### **Composition**
- **Rule of thirds** for balanced shots
- **Leading lines** to guide the eye
- **Natural framing** with trees/rocks
- **Cultural elements** in context

### **Lighting**
- **Golden hour** for warm tones
- **Avoid harsh midday** sun
- **Use natural light** when possible
- **Balance shadows** and highlights

### **Storytelling**
- **Show experiences** not just places
- **Include people** in cultural context
- **Capture emotions** and interactions
- **Document the journey**

---

## 🚀 **Next Steps**

1. **Collect photos** from recent tours
2. **Organize by tour** and location
3. **Prepare metadata** for each photo
4. **Upload and test** on staging site
5. **Update live site** with real photos

---

## 📞 **Support**

For questions about photo uploads or technical issues:
- **Email**: info@timaimagreentours.com
- **WhatsApp**: +679 XXX XXXX

**Remember**: Authentic photos will significantly improve your website's appeal and conversion rates!

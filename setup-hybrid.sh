#!/bin/bash

echo "🚀 Tima Green Tours - Hybrid Setup (Vercel + CloudFlare)"
echo "========================================================"
echo ""

echo "✅ Vercel Deployment Status:"
echo "   - App URL: https://tima-green-tours-o8vpmgqi8-jon-lalabalavus-projects.vercel.app"
echo "   - Domain: timagreentours.com"
echo "   - SSL Certificate: Creating..."
echo ""

echo "📋 Next Steps for CloudFlare Configuration:"
echo ""

echo "1. Log into CloudFlare Dashboard:"
echo "   https://dash.cloudflare.com"
echo ""

echo "2. Go to timagreentours.com → DNS"
echo ""

echo "3. Add these DNS records:"
echo "   ┌─────────────────────────────────────────────────────────────┐"
echo "   │ Type  │ Name │ Content                                    │"
echo "   ├─────────────────────────────────────────────────────────────┤"
echo "   │ A     │ @    │ 76.76.21.21                               │"
echo "   │ CNAME │ www  │ timagreentours.com                        │"
echo "   │ CNAME │ app  │ tima-green-tours-o8vpmgqi8-jon-lalabalavus-│"
echo "   │       │      │ projects.vercel.app                       │"
echo "   └─────────────────────────────────────────────────────────────┘"
echo ""

echo "4. Configure CloudFlare Settings:"
echo "   - Speed → Auto Minify: ✅ JS, CSS, HTML"
echo "   - Speed → Brotli: ✅ Enable"
echo "   - Speed → Rocket Loader: ✅ Enable"
echo "   - Security → SSL/TLS: Full (strict)"
echo "   - Security → Always Use HTTPS: ✅ Enable"
echo ""

echo "5. Test Your App:"
echo "   - Main App: https://timagreentours.com/app"
echo "   - Tours: https://timagreentours.com/app/tours"
echo ""

echo "🎯 Expected Performance:"
echo "   - First Contentful Paint: < 1.5s"
echo "   - Largest Contentful Paint: < 2.5s"
echo "   - Global CDN: 200+ locations"
echo ""

echo "📊 Monitoring:"
echo "   - CloudFlare Analytics: https://dash.cloudflare.com"
echo "   - Vercel Analytics: https://vercel.com/dashboard"
echo "   - PageSpeed Insights: https://pagespeed.web.dev"
echo ""

echo "✅ Setup Complete! Your app will be blazing fast worldwide!"

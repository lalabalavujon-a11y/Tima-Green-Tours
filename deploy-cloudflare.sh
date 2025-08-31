#!/bin/bash

# Tima Green Tours - Cloudflare Deployment Script
# This script handles deployment with Cloudflare security configuration

set -e

echo "🚀 Starting Tima Green Tours deployment with Cloudflare security..."

# Check if required environment variables are set
if [ -z "$CLOUDFLARE_ZONE_ID" ]; then
    echo "❌ Error: CLOUDFLARE_ZONE_ID environment variable is required"
    exit 1
fi

if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
    echo "❌ Error: CLOUDFLARE_API_TOKEN environment variable is required"
    exit 1
fi

# Build the Next.js application
echo "📦 Building Next.js application..."
npm run build

# Deploy to Vercel (or your preferred hosting platform)
echo "🌐 Deploying to hosting platform..."
npm run deploy

# Configure Cloudflare security settings
echo "🔒 Configuring Cloudflare security settings..."

# Update SSL/TLS settings
curl -X PATCH "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE_ID/settings/ssl" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{
    "value": "full_strict"
  }'

# Enable HSTS
curl -X PATCH "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE_ID/settings/security_header" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{
    "value": {
      "strict_transport_security": {
        "enabled": true,
        "max_age": 31536000,
        "include_subdomains": true,
        "preload": true
      }
    }
  }'

# Enable Always Use HTTPS
curl -X PATCH "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE_ID/settings/always_use_https" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{
    "value": "on"
  }'

# Enable Auto Minify
curl -X PATCH "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE_ID/settings/minify" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{
    "value": {
      "css": "on",
      "html": "on",
      "js": "on"
    }
  }'

# Enable Brotli compression
curl -X PATCH "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE_ID/settings/brotli" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{
    "value": "on"
  }'

echo "✅ Deployment completed successfully!"
echo "🔗 Main website: https://timagreentours.com"
echo "🔗 App: https://app.timagreentours.com"
echo "🔒 Security features enabled:"
echo "   - SSL/TLS Full (strict)"
echo "   - HSTS with preload"
echo "   - Always Use HTTPS"
echo "   - Auto Minify"
echo "   - Brotli Compression"
echo "   - Security Headers"

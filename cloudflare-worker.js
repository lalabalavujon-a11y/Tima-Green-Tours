// Cloudflare Worker for Tima Green Tours
// Deploy this to Cloudflare Workers for enhanced security and performance

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  
  // Security headers
  const securityHeaders = {
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.timagreentours.com; frame-ancestors 'none';"
  }

  // Rate limiting (basic implementation)
  const clientIP = request.headers.get('CF-Connecting-IP')
  const rateLimitKey = `rate_limit:${clientIP}`
  
  // Check if this is a static asset
  const isStaticAsset = url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/)
  
  if (!isStaticAsset) {
    // Apply rate limiting for non-static assets
    const rateLimit = await checkRateLimit(rateLimitKey)
    if (!rateLimit.allowed) {
      return new Response('Rate limit exceeded', { status: 429 })
    }
  }

  // Fetch the original response
  let response = await fetch(request)
  
  // Clone the response to modify headers
  response = new Response(response.body, response)
  
  // Add security headers
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })
  
  // Cache static assets
  if (isStaticAsset) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  } else {
    response.headers.set('Cache-Control', 'public, max-age=300, s-maxage=600')
  }
  
  return response
}

async function checkRateLimit(key) {
  // This is a simplified rate limiting implementation
  // In production, you'd want to use Cloudflare's KV store or Durable Objects
  const now = Date.now()
  const window = 60000 // 1 minute
  const maxRequests = 100
  
  // For demo purposes, always allow
  // In production, implement proper rate limiting logic
  return { allowed: true, remaining: maxRequests }
}

// Optional: Add custom error pages
addEventListener('error', event => {
  event.respondWith(
    new Response('Internal Server Error', { status: 500 })
  )
})

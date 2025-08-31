# Tima Green Tours - Security Checklist

## ✅ Cloudflare DNS Configuration

### DNS Records
- [ ] Add A record for `timagreentours.com` pointing to your server
- [ ] Add A record for `app.timagreentours.com` pointing to your server
- [ ] Add CNAME record for `www.timagreentours.com` → `timagreentours.com`
- [ ] Verify DNS propagation (use `dig` or online tools)

### SSL/TLS Settings
- [ ] Set Encryption Mode to "Full (strict)"
- [ ] Enable TLS 1.3
- [ ] Set minimum TLS version to 1.2
- [ ] Enable "Always Use HTTPS"
- [ ] Enable "Automatic HTTPS Rewrites"

### Security Features
- [ ] Enable HSTS (HTTP Strict Transport Security)
- [ ] Set HSTS max age to 31536000 (1 year)
- [ ] Enable "Include Subdomains" for HSTS
- [ ] Enable "Preload" for HSTS
- [ ] Configure Content Security Policy (CSP)

## ✅ Firewall & Security Rules

### WAF (Web Application Firewall)
- [ ] Enable Cloudflare WAF
- [ ] Configure rate limiting (100 requests/minute per IP)
- [ ] Enable "I'm Under Attack" mode if needed
- [ ] Set up custom firewall rules for:
  - [ ] Blocking bad bots
  - [ ] Geographic restrictions (if applicable)
  - [ ] IP reputation filtering

### Page Rules
- [ ] Create page rule: `timagreentours.com/*` → Always Use HTTPS
- [ ] Create page rule: `app.timagreentours.com/*` → Always Use HTTPS
- [ ] Set up caching rules for static assets

## ✅ Performance & Caching

### Optimization
- [ ] Enable Auto Minify for JavaScript, CSS, and HTML
- [ ] Enable Brotli compression
- [ ] Enable Rocket Loader
- [ ] Enable "Always Online"
- [ ] Configure cache levels for different content types

### CDN Settings
- [ ] Enable Cloudflare CDN
- [ ] Configure cache headers for static assets
- [ ] Set up edge caching rules

## ✅ Monitoring & Analytics

### Security Monitoring
- [ ] Enable Security Events monitoring
- [ ] Set up alerts for security threats
- [ ] Configure Logpush for security analysis
- [ ] Monitor for DDoS attacks

### Analytics
- [ ] Enable Cloudflare Web Analytics
- [ ] Set up Google Analytics integration
- [ ] Monitor Core Web Vitals
- [ ] Track security events

## ✅ Application Security

### Next.js Configuration
- [ ] Verify security headers in `next.config.js`
- [ ] Test Content Security Policy
- [ ] Ensure HTTPS redirects work correctly
- [ ] Validate HSTS implementation

### Environment Variables
- [ ] Set `NODE_ENV=production`
- [ ] Configure API keys securely
- [ ] Use environment-specific configurations
- [ ] Never commit sensitive data to version control

## ✅ Testing & Validation

### Security Testing
- [ ] Run SSL Labs test (https://www.ssllabs.com/ssltest/)
- [ ] Test HSTS implementation
- [ ] Verify CSP headers
- [ ] Check for security vulnerabilities

### Performance Testing
- [ ] Test page load speeds
- [ ] Verify CDN caching
- [ ] Check Core Web Vitals
- [ ] Test mobile performance

## ✅ Maintenance

### Regular Tasks
- [ ] Monitor Cloudflare security dashboard weekly
- [ ] Review and update firewall rules monthly
- [ ] Check SSL certificate expiration
- [ ] Update dependencies regularly
- [ ] Review access logs for suspicious activity

### Backup & Recovery
- [ ] Set up automated backups
- [ ] Test disaster recovery procedures
- [ ] Document incident response plan
- [ ] Keep deployment scripts updated

## 🔗 Useful Links

- [Cloudflare Dashboard](https://dash.cloudflare.com)
- [SSL Labs Test](https://www.ssllabs.com/ssltest/)
- [Security Headers Test](https://securityheaders.com)
- [Mozilla Observatory](https://observatory.mozilla.org)

## 📞 Support Contacts

- Cloudflare Support: https://support.cloudflare.com
- Security Issues: security@timagreentours.com
- Technical Support: tech@timagreentours.com

# Cloudflare Security Configuration for Tima Green Tours

## Domains
- **Main Website**: timagreentours.com
- **App**: app.timagreentours.com

## DNS Records Setup

### A Records
```
timagreentours.com → [Your Server IP]
app.timagreentours.com → [Your Server IP]
```

### CNAME Records
```
www.timagreentours.com → timagreentours.com
```

### MX Records (if email is needed)
```
timagreentours.com → [Your Mail Server]
```

## Security Settings

### SSL/TLS Configuration
- **Encryption Mode**: Full (strict) - Recommended for maximum security
- **Minimum TLS Version**: TLS 1.2
- **Opportunistic Encryption**: ON
- **TLS 1.3**: ON
- **Automatic HTTPS Rewrites**: ON

### Security Features
- **Always Use HTTPS**: ON
- **HSTS (HTTP Strict Transport Security)**: ON
- **HSTS Max Age**: 31536000 (1 year)
- **HSTS Include Subdomains**: ON
- **HSTS Preload**: ON

### Firewall Rules
1. **Block Bad Bots**
2. **Rate Limiting**: 100 requests per minute per IP
3. **Geographic Restrictions** (if needed)
4. **IP Reputation Filtering**: ON

### Page Rules
- `timagreentours.com/*` → Always Use HTTPS
- `app.timagreentours.com/*` → Always Use HTTPS

## Performance Settings
- **Auto Minify**: JavaScript, CSS, HTML
- **Brotli Compression**: ON
- **Rocket Loader**: ON
- **Always Online**: ON

## Monitoring
- **Security Events**: Monitor for threats
- **Analytics**: Enable Web Analytics
- **Logs**: Enable Logpush for security analysis

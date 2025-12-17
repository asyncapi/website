# Security Implementation

This document outlines the security measures implemented for the AsyncAPI website to protect against common web vulnerabilities.

## Implemented Security Headers

Since this project uses Next.js with static export (`output: 'export'`), security headers cannot be implemented through Next.js middleware or the `headers()` function in `next.config.mjs`. Instead, all security headers are configured in Netlify's configuration file.

### Netlify Configuration (`netlify.toml`)

All security headers are configured in `netlify.toml` to ensure they're applied at the CDN level:

- `X-DNS-Prefetch-Control`: Controls DNS prefetching
- `Strict-Transport-Security`: Enforces HTTPS connections
- `X-Content-Type-Options`: Prevents MIME-type sniffing
- `X-Frame-Options`: Prevents clickjacking attacks
- `Referrer-Policy`: Controls referrer information
- `Permissions-Policy`: Restricts browser features
- `Content-Security-Policy`: Prevents XSS and other code injection attacks

## Content Security Policy (CSP)

Our CSP is designed to be restrictive while allowing necessary functionality:

```
default-src 'self';
script-src 'self' 'unsafe-inline' https://buttons.github.io https://www.googletagmanager.com https://www.google-analytics.com;
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
img-src 'self' data: https:;
font-src 'self' https://fonts.gstatic.com;
connect-src 'self' https://www.google-analytics.com https://buttons.github.io;
frame-src 'self' https://www.youtube.com;
```

This policy:
- Allows scripts from self and trusted third-party services
- Permits inline styles and Google Fonts
- Restricts image sources
- Limits connections to essential services
- Allows YouTube embeds in frames

## Additional Security Measures

1. **X-Frame-Options**: Set to `SAMEORIGIN` for better security
2. **HSTS**: Implemented with a 2-year max-age and preload directive
3. **DNS Prefetch Control**: Enabled to control DNS prefetching behavior
4. **Referrer Policy**: Set to `origin-when-cross-origin` for privacy protection
5. **Permissions Policy**: Restricted access to sensitive browser features

## Testing Security Headers

To verify that the security headers are properly applied:

1. Build the site: `npm run build`
2. Deploy to Netlify or use Netlify Dev: `netlify dev`
3. Use browser developer tools or tools like curl to inspect response headers
4. Alternatively, use online security header checkers

## Future Improvements

Consider implementing:
- Automated security scanning in CI/CD pipeline
- Regular security audits
- Monitoring for security header violations
- Reporting endpoints for CSP violations
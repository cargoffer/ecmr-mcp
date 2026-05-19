# Security Policy

## Reporting Vulnerabilities

Please report security issues to: security@cargoffer.com

## Environment Variables

| Variable | Required | Description |
|---------|----------|-------------|
| ECMR_API_KEY | Yes | API key for authentication |
| ECMR_API_URL | No | API URL (defaults to production) |

## Security Checklist

- [ ] API keys stored in environment, never in code
- [ ] Keys rotated every 90 days
- [ ] HTTPS only for production
- [ ] Rate limiting configured
- [ ] Input validation on all endpoints

## Rate Limits

- Production: 1000 requests/minute
- Demo: 100 requests/minute

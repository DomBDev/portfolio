# Security Policy

## Reporting Security Issues
Since this is a personal portfolio, if you discover a security vulnerability, please send details.

## Security Measures

### Authentication & Authorization
- JWT-based authentication for admin access
- Role-based access control for CMS
- Secure session management
- Rate limiting on authentication endpoints

### Data Protection
- All sensitive data encrypted at rest
- Environment variables for secrets
- Secure password hashing
- Database connection encryption

### API Security
- CORS configuration
- Rate limiting
- Input validation
- SQL injection prevention
- XSS protection
- CSRF tokens

### Infrastructure Security
- HTTPS enforcement
- Regular security updates
- Docker container security
- Database access restrictions
- Redis password protection
- Secure file uploads

### Monitoring & Logging
- Security event logging
- Failed authentication monitoring
- Rate limit breach alerts
- Regular security audits

## Development Security
- Dependency vulnerability scanning
- Code security analysis in CI/CD
- No sensitive data in version control
- Secure development guidelines

## Compliance
This portfolio follows security best practices but is not intended for processing sensitive user data beyond basic contact form submissions. 
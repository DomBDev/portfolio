# Deployment Guide

## Prerequisites
- DigitalOcean account with App Platform access
- GitHub repository connected to DigitalOcean
- Domain name (for production deployment)

## Environment Setup
1. Create `.env` file based on `.env.example`
2. Configure the following secrets in GitHub:
   - `DIGITALOCEAN_ACCESS_TOKEN`
   - `DIGITALOCEAN_APP_ID`

## Development Deployment
1. Install Docker Desktop
2. Run local environment:
   ```bash
   docker-compose -f docker/docker-compose.yml -f docker/docker-compose.override.yml up --build
   ```

## Production Deployment
The site automatically deploys to DigitalOcean App Platform when:
1. Changes are pushed to the `main` branch
2. All tests pass in the CI pipeline
3. Changes include actual code (not just documentation)

### Manual Deployment
If needed, you can manually deploy using:
```bash
doctl apps create-deployment <your-app-id>
```

## SSL/Security
- SSL is automatically handled by DigitalOcean App Platform
- All traffic is forced to HTTPS
- API endpoints are protected by CORS and rate limiting

## Monitoring
- Use DigitalOcean's built-in monitoring
- Check application logs in App Platform dashboard
- Monitor error rates and response times

## Rollback Procedure
1. Access DigitalOcean App Platform dashboard
2. Navigate to Deployments tab
3. Select the previous working deployment
4. Click "Revert to this Deployment" 
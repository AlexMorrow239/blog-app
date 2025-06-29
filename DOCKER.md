# Docker Setup Guide

This guide explains how to run the blog application using Docker and Docker Compose.

## Prerequisites

- Docker Engine 20.10+
- Docker Compose v2.0+

## Quick Start

### Development

```bash
# Copy environment variables
cp .env.example .env

# Edit .env with your configuration
# Then start development environment
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```

### Production

```bash
# Copy and configure environment variables
cp .env.example .env

# Start production environment
docker-compose up --build -d

# Or with reverse proxy
docker-compose --profile production up --build -d
```

## Services

### MongoDB
- **Image**: mongo:7-jammy
- **Port**: 27017
- **Volume**: `mongodb_data` for data persistence
- **Health check**: MongoDB ping command

### Backend
- **Build**: `./backend/Dockerfile`
- **Port**: 8000
- **Volumes**: 
  - `./backend/uploads` for file storage
  - `./backend/gcp_key.json` for GCP credentials
- **Health check**: HTTP GET to `/api/health`

### Frontend
- **Build**: Multi-stage build with Node.js + Nginx
- **Port**: 80 (3000 in development)
- **Health check**: HTTP GET to `/health`

### Reverse Proxy (Optional)
- **Image**: nginx:alpine
- **Port**: 80
- **Purpose**: Routes API calls to backend, static files to frontend

## Environment Variables

### Required for Backend
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens

### Optional
- `NODE_ENV`: Environment (development/production)
- `MONGO_ROOT_USERNAME`: MongoDB admin username
- `MONGO_ROOT_PASSWORD`: MongoDB admin password
- `MONGO_DB`: Database name
- `REACT_APP_API_URL`: Frontend API URL

## Railway Deployment

The application is configured to use Docker Compose on Railway:

1. **Configure environment variables** in Railway dashboard:
   ```
   MONGO_URI=mongodb://...
   JWT_SECRET=your-secret
   REACT_APP_API_URL=https://your-domain.railway.app/api
   ```

2. **Deploy**: Railway will automatically detect `railway.toml` and use Docker Compose

## Commands

### Development
```bash
# Start with hot reloading
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

# Rebuild services
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build

# View logs
docker-compose logs -f [service-name]
```

### Production
```bash
# Start all services
docker-compose up -d

# Start with reverse proxy
docker-compose --profile production up -d

# Scale services
docker-compose up --scale frontend=2 --scale backend=2

# Update and restart
docker-compose up --build -d
```

### Maintenance
```bash
# Stop all services
docker-compose down

# Remove volumes (WARNING: deletes data)
docker-compose down -v

# View service status
docker-compose ps

# Execute commands in running containers
docker-compose exec backend npm test
docker-compose exec frontend npm run build
```

## File Structure

```
blog-app/
├── backend/
│   ├── Dockerfile              # Production backend image
│   ├── .dockerignore          # Backend build exclusions
│   └── ...
├── frontend/
│   ├── Dockerfile             # Production frontend image
│   ├── Dockerfile.dev         # Development frontend image
│   ├── nginx.conf             # Nginx configuration
│   ├── .dockerignore          # Frontend build exclusions
│   └── ...
├── docker-compose.yml         # Main compose configuration
├── docker-compose.dev.yml     # Development overrides
├── nginx-proxy.conf           # Reverse proxy configuration
├── railway.toml               # Railway deployment config
├── .env.example               # Environment template
└── DOCKER.md                  # This file
```

## Troubleshooting

### Build Issues
```bash
# Clear Docker cache
docker builder prune

# Rebuild without cache
docker-compose build --no-cache

# Check build logs
docker-compose build --progress=plain
```

### Network Issues
```bash
# Inspect networks
docker network ls
docker network inspect blog-app_blog-network

# Check service connectivity
docker-compose exec backend ping mongodb
docker-compose exec frontend wget -qO- http://backend:8000/api/health
```

### Data Issues
```bash
# Check MongoDB logs
docker-compose logs mongodb

# Access MongoDB shell
docker-compose exec mongodb mongosh -u admin -p password

# Backup data
docker-compose exec mongodb mongodump -u admin -p password --authenticationDatabase admin
```

### Performance Monitoring
```bash
# Monitor resource usage
docker stats

# View service health
docker-compose ps
```

## Security Notes

- Non-root users are configured in all containers
- Security headers are set in Nginx configurations
- Environment variables should be properly secured in production
- GCP credentials are mounted read-only
- MongoDB authentication is required
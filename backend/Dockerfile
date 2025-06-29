# Use Node.js 20 Alpine for smaller image size
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Create uploads directory for file storage
RUN mkdir -p uploads

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application source
COPY . .

# Copy GCP key file if it exists (for Google Cloud Storage)
# This will be mounted as a volume or provided via environment in production
COPY gcp_key.json* ./

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Change ownership of app directory and uploads
RUN chown -R nodejs:nodejs /app

# Switch to non-root user
USER nodejs

# Expose port 8000
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8000/api/health || exit 1

# Start the application
CMD ["npm", "start"]
# ==============================================================================
# Production Dockerfile for Web Tier (Nginx + Frontend Assets)
# ==============================================================================

# Stage 1: Build the React Application
FROM node:20-alpine AS builder

WORKDIR /app
COPY frontend/package.json ./
RUN npm install

COPY frontend/ ./
RUN npm run build

# Stage 2: Serve via Nginx Alpine
FROM nginx:1.27-alpine AS runner

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy compiled frontend static assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx reverse proxy configuration
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Expose HTTP
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD wget -q -O /dev/null http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]

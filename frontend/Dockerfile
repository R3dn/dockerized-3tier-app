# ==============================================================================
# Production Multi-Stage Dockerfile for Frontend (Vite + React)
# ==============================================================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests
COPY package.json ./

# Install dependencies cleanly
RUN npm install

# Copy source code and build
COPY . .
RUN npm run build

# Standalone output stage
FROM alpine:latest AS assets
WORKDIR /dist
COPY --from=builder /app/dist /dist
CMD ["sh"]

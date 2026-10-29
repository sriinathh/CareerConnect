# =============================================================================
# Stage 1: Build React SPA with Node & Vite
# =============================================================================
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package descriptors
COPY package*.json ./

# Install dependencies cleanly
RUN npm ci

# Copy source code and build production bundle
COPY . .
RUN npm run build

# =============================================================================
# Stage 2: Serve Bundle with Nginx
# =============================================================================
FROM nginx:alpine

# Remove default nginx welcome page
RUN rm -rf /usr/share/nginx/html/*

# Copy built production assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Custom nginx configuration for React Router HTML5 pushState fallback
RUN echo 'server { \
    listen 5173; \
    server_name localhost; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
    location /api/ { \
        proxy_pass http://careerconnect-api:8080/api/; \
        proxy_set_header Host $host; \
        proxy_set_header X-Real-IP $remote_addr; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 5173

CMD ["nginx", "-g", "daemon off;"]

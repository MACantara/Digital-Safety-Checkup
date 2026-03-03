# ── Stage 1: build ────────────────────────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ── Stage 2: serve ────────────────────────────────────────────────────────────
FROM nginx:stable-alpine AS runner

# Default port; Railway overrides this with its own PORT env var
ENV PORT=80

# Copy built assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config template.
# The official nginx image processes files in /etc/nginx/templates/ using
# envsubst before startup, outputting to /etc/nginx/conf.d/ — so ${PORT}
# is replaced with Railway's injected PORT env var at container boot.
COPY nginx.conf /etc/nginx/templates/default.conf.template

# Railway routes to the PORT env var; expose as documentation
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

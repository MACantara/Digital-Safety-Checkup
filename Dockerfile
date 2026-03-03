# ── Stage 1: build frontend ─────────────────────────────────────────────────────
FROM node:22-alpine AS frontend-builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ── Stage 2: build server ─────────────────────────────────────────────────────
FROM node:22-alpine AS server-builder

WORKDIR /server

COPY server/package.json ./
RUN npm install

COPY server/tsconfig.json ./
COPY server/src ./src
RUN npm run build

# ── Stage 3: run ────────────────────────────────────────────────────────────
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Install production server dependencies only
COPY server/package.json ./
RUN npm install --omit=dev

# Copy compiled API server
COPY --from=server-builder /server/dist ./dist

# Copy Vite-built frontend into public/ (Express will serve this)
COPY --from=frontend-builder /app/dist ./public

EXPOSE 3000

CMD ["node", "dist/index.js"]

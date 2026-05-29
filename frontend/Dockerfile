FROM node:26-alpine AS base
WORKDIR /app/frontend

FROM base AS builder
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# Ensure next.config.js has output: 'standalone'
RUN npm run build

FROM node:26-alpine AS runner
WORKDIR /app/frontend
ENV NODE_ENV=production
COPY --from=builder /app/frontend/.next/standalone ./
COPY --from=builder /app/frontend/.next/static ./.next/static
COPY --from=builder /app/frontend/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
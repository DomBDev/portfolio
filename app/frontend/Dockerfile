# Development stage
FROM node:20-alpine AS development
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json ./
RUN npm install --legacy-peer-deps

COPY . .

# Note that Next.js requires a different command for development
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV development
CMD ["npm", "run", "dev"]

# Production build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json ./
RUN npm install --legacy-peer-deps

COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production
RUN npm run build

# Production stage
FROM node:20-alpine AS production
WORKDIR /app

# Copy the standalone directory which contains the minimal production build
COPY --from=builder /app/.next/standalone ./

# Copy static files to their expected locations
COPY --from=builder /app/public ./app/frontend/public
COPY --from=builder /app/.next/static ./app/frontend/.next/static

# Set working directory to where server.js is located
WORKDIR /app/app/frontend

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
EXPOSE 3000

CMD ["node", "server.js"] 
# Use Node 20 slim for a small footprint
FROM node:20-slim AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev for build)
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Build the project (TypeScript to JavaScript)
RUN npm run build

# --- Production Stage ---
FROM node:20-slim

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ONLY production dependencies
RUN npm install --omit=dev --legacy-peer-deps

# Copy built assets from builder stage
COPY --from=builder /app/dist ./dist

# Environment variables (Defaults, should be overridden by .env)
ENV PORT=4000
ENV NODE_ENV=production

EXPOSE 4000

# Run the app
CMD ["npm", "start"]

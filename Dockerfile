# Use Node 18 slim for a small footprint
FROM node:18-slim as builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev for build)
RUN npm install

# Copy source code
COPY . .

# Build the project (TypeScript to JavaScript)
RUN npm run build

# --- Production Stage ---
FROM node:18-slim

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ONLY production dependencies
RUN npm install --production

# Copy built assets from builder stage
COPY --from=builder /app/dist ./dist

# Environment variables (Defaults, should be overridden by .env)
ENV PORT=4000
ENV NODE_ENV=development

EXPOSE 4000

# Run the app
CMD ["npm", "run", "dev"]   

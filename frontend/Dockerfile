# --- Stage 1: Build ---
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source and build the app
COPY . .
RUN npm run build

# --- Stage 2: Production ---
FROM node:20-alpine AS runner

WORKDIR /app

# Only install the server, keep it lightweight
RUN npm install -g serve

# Only copy the production-ready files from the builder stage
# Adjust "dist" if your build folder is named "build" or "out"
COPY --from=builder /app/dist ./dist

# Railway automatically injects the PORT variable
ENV PORT=3000
EXPOSE ${PORT}

# Use sh -c to ensure $PORT is expanded by the shell
CMD ["sh", "-c", "serve -s dist -l $PORT"]

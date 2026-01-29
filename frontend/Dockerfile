# --- Stage 1: Build Stage ---
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies first (better caching)
COPY package.json package-lock.json* ./
RUN npm ci

# Copy the rest of the code
COPY . .

# Build the Vite app (produces the 'dist' folder)
RUN npm run build

# --- Stage 2: Runtime Stage ---
FROM node:20-alpine AS runner

WORKDIR /app

# Install 'serve' once in the final image
RUN npm install -g serve

# Copy ONLY the static assets from the builder stage
COPY --from=builder /app/dist ./dist

# Railway provides the PORT environment variable automatically
# ... (rest of your multi-stage Dockerfile)

# Railway provides the PORT environment variable automatically. 
# Do NOT hardcode 8080 or 3000 here.
ENV PORT=3000

# This is the critical fix: 
# Using "sh -c" allows the shell to swap $PORT for the actual number (e.g., 5432)
# The -l flag tells 'serve' which port to listen on.
CMD ["sh", "-c", "serve -s dist -l $PORT"]

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
ENV PORT=3000
EXPOSE ${PORT}

# Execute using shell form to expand the $PORT variable
CMD ["sh", "-c", "serve -s dist -l $PORT"]

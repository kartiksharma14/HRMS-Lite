FROM node:20-alpine

WORKDIR /app

# 1. Install dependencies using a cache-efficient method
COPY package.json package-lock.json* ./
RUN npm ci

# 2. Copy source and build
COPY . .
RUN npm run build

# 3. Use a lightweight way to serve the app
# Installing 'serve' globally is fine, but we need to fix the CMD syntax
RUN npm install -g serve

# Railway injects the PORT env var; we don't need to hardcode it to 3000
# but keeping a default is safe for local testing.
ENV PORT=3000
EXPOSE ${PORT}

# 4. FIX: Use 'sh -c' to ensure the $PORT variable is expanded correctly
CMD ["sh", "-c", "serve -s dist -l $PORT"]

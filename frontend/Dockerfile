FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# Install static server
RUN npm install -g serve

# Railway sets PORT automatically
ENV PORT=3000

# Expose is optional but recommended
EXPOSE 3000

# Serve must bind to 0.0.0.0 for Railway
CMD ["serve", "-s", "dist", "-l", "tcp://0.0.0.0:${PORT}"]

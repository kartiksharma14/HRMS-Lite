FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .
RUN npm run build

# Use a proper static file server
RUN npm install -g serve

CMD ["sh", "-c", "serve -s dist -l $PORT"]

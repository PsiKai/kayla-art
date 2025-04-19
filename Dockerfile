# --- Base image for building ---
FROM node:20 AS builder

# Set working directory
WORKDIR /app

# Copy everything
COPY . .

# Install dependencies separately for server and client
WORKDIR /app/server
RUN npm run build

# --- Production image ---
FROM node:20-slim AS production

WORKDIR /app

# Copy only what's needed from the builder
COPY --from=builder /app/server/dist ./dist
COPY --from=builder /app/client/dist ./client-dist
COPY --from=builder /app/server/package*.json ./
COPY --from=builder /app/server/node_modules ./node_modules

# Expose whatever port your server uses
EXPOSE 9000

# Start the server
CMD ["node", "dist/index.js"]

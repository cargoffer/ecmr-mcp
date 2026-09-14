FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies (none needed — uses native Node modules)
RUN npm ci --prefer-offline --no-audit 2>/dev/null || npm install --no-audit --no-fund

# Copy source
COPY src/ ./src/

# Expose port
EXPOSE 3100

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3   CMD wget -qO- http://localhost:3100/ || exit 1

# Start server
CMD ["node", "src/server.js"]

FROM node:22-alpine

WORKDIR /app

# No npm install needed — uses only Node.js native modules

# Copy source
COPY src/ ./src/

# Expose MCP server port
EXPOSE 3100

# Start server (MCP protocol over HTTP)
CMD ["node", "src/server.js"]

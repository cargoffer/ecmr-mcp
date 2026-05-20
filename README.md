# ECMR MCP Server

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![MCP Version](https://img.shields.io/badge/MCP-1.0.0-blue)](https://modelcontextprotocol.io)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)](https://nodejs.org)
[![GitHub Release](https://img.shields.io/github/v/release/cargoffer/ecmr-mcp)](https://github.com/cargoffer/ecmr-mcp/releases)

Model Context Protocol server for **Cargoffer ECMR** (Electronic Consignment Note) API — enables AI agents and LLMs to interact with the Cargoffer ECMR system for digital waybills.

## What is this?

This MCP server exposes the Cargoffer ECMR API as tools for AI agents using the [Model Context Protocol](https://modelcontextprotocol.io). It provides:

- **30+ tools** for eCMR management, signatures, QR codes
- **JSON-RPC 2.0** interface
- **Production-ready** with https://ecmr.api.release.cargoffer.com
- **Standalone** (no dependencies beyond Node.js)

## Use Cases

- AI agents creating electronic CMR waybills
- Managing digital signatures for pickup and delivery
- Generating and validating QR codes
- Downloading PDF waybills
- Tracking shipments

## Features

### Auth (2 tools)
- Login
- Register

### Addresses (5 tools)
- List/Create/Update/Delete addresses

### Drivers (4 tools)
- List/Create/Update/Delete drivers

### Vehicles (4 tools)
- List/Create/Update/Delete vehicles

### eCMR Core (6 tools)
- Create/Get/Update/Delete eCMR
- Lock eCMR (legally close)
- List eCMRs

### Signatures (4 tools)
- Sign as sender
- Sign pickup
- Sign delivery
- List pending signatures

### QR / PDF (3 tools)
- Generate QR code
- Validate QR code
- Get PDF

### Files (2 tools)
- Upload file
- Download file

### Send (1 tool)
- Send eCMR to receiver

## Quick Start

```bash
# Clone
git clone https://github.com/cargoffer/ecmr-mcp.git
cd ecmr-mcp

# Configure with your credentials
export ECMR_API_KEY="your-api-key"

# Run
node src/server.js
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `ECMR_API_KEY` | Cargoffer API key | - |
| `ECMR_API_URL` | API base URL | https://ecmr.api.release.cargoffer.com |
| `PORT` | Server port | 3000 |

### Local Development

```bash
# Use local backend
ECMR_API_URL=http://localhost:8090 ECMR_API_KEY=your-key node src/server.js

# Or copy .env.example
cp .env.example .env
# Edit .env with your values
node src/server.js
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check |
| `/tools` | GET | List available tools |
| `/` | POST | JSON-RPC 2.0 endpoint |

## Example Request

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "ecmr_auth_login",
  "params": {
    "email": "user@example.com",
    "password": "password123"
  }
}
```

## Example Response

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "status": 200,
    "data": "jwt-token-here"
  }
}
```

## Integration Examples

### Claude Desktop

```json
{
  "mcpServers": {
    "ecmr": {
      "command": "node",
      "args": ["/path/to/ecmr-mcp/src/server.js"],
      "env": {
        "ECMR_API_KEY": "your-api-key"
      }
    }
  }
}
```

### Direct HTTP

```bash
curl -X POST http://localhost:3000 \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "ecmr_auth_login",
    "params": {"email": "user@example.com", "password": "pass"}
  }'
```

## Getting Credentials

Contact Cargoffer to get API access:
- Email: cto@cargoffer.com

## License

MIT License - See LICENSE file for details

## GitHub

- Repository: https://github.com/cargoffer/ecmr-mcp
- Issues: https://github.com/cargoffer/ecmr-mcp/issues
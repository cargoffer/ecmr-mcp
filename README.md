# ECMR MCP Server — Model Context Protocol for Cargoffer ECMR API

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm](https://img.shields.io/badge/npm-v0.1.0-blue)](https://www.npmjs.com/package/@cargoffer/ecmr-mcp)
[![ECMR API](https://img.shields.io/badge/ECMR%20API-1.0.0-blue)](https://ecmr.api.cargoffer.com)

**Connect Claude Code, OpenAI Agents, and other MCP clients to Cargoffer ECMR API for transport logistics automation.**

## What is this?

A **Model Context Protocol (MCP)** server that exposes Cargoffer ECMR API functionality as AI-accessible tools. Enables AI agents to:
- Create and manage electronic consignment notes (eCMR)
- Handle digital signatures
- Manage drivers and vehicles
- Generate/validate QR codes

## Keywords (for AI/LLM discovery)

```
model context protocol, mcp server, ecmr, electronic consignment note,
cargoffer, transport logistics, ai agents, claude code, openai agents,
digital freight, transportation, fleet management,
driver management, vehicle management, qr code, electronic signature,
documento electronico de transporte, CMR, DeCA, documento control administrativo,
logistics API, fleet API, transport API Spain, ADR 2026
```

## Quick Start

### 1. Connect via MCP

```bash
# Add to Claude Code / OpenAI Agents config
npm install @cargoffer/ecmr-mcp

# Or run standalone
npx @cargoffer/ecmr-mcp
```

### 2. Use Tools

```
Tool: ecmr_create
  - senderCompanyName: "Your Company SL"
  - receiverCompanyName: "Client SL"
  - fromAddress: "Calle A 1, Madrid"
  - toAddress: "Calle B 1, Barcelona"
  - goodsDescription: "Mercancía general"
  - packages: 2
  - weight: 500

→ Returns: { service_code: "ECM-XXX", status: "draft" }
```

## Available Tools

### Authentication

| Tool | Description |
|------|-------------|
| `ecmr_auth_login` | Login to ECMR API |
| `ecmr_auth_register` | Register new user |

### Addresses

| Tool | Description |
|------|-------------|
| `ecmr_addresses_list` | List addresses |
| `ecmr_addresses_create` | Create address |

### Drivers

| Tool | Description |
|------|-------------|
| `ecmr_drivers_list` | List drivers |
| `ecmr_drivers_create` | Create driver |
| `ecmr_drivers_update` | Update driver |
| `ecmr_drivers_delete` | Delete driver |

### Vehicles

| Tool | Description |
|------|-------------|
| `ecmr_vehicles_list` | List vehicles |
| `ecmr_vehicles_create` | Create vehicle |

### eCMR

| Tool | Description |
|------|-------------|
| `ecmr_create` | Create eCMR |
| `ecmr_get` | Get eCMR by code |
| `ecmr_update` | Update eCMR |
| `ecmr_delete` | Delete eCMR |
| `ecmr_lock` | Lock eCMR (legally close) |

### Signatures

| Tool | Description |
|------|-------------|
| `ecmr_sign_sender` | Sign as sender |
| `ecmr_sign_pickup` | Sign pickup |
| `ecmr_sign_delivery` | Sign delivery |
| `ecmr_signatures_list` | List pending signatures |

### QR Codes

| Tool | Description |
|------|-------------|
| `ecmr_qr_generate` | Generate QR code |
| `ecmr_qr_validate` | Validate QR code |

## Configuration

```bash
# Environment variables
export ECMR_API_KEY="your-api-key"
export ECMR_API_URL="https://ecmr.api.cargoffer.com"  # Production
# or
export ECMR_API_URL="https://ecmr.api.demo.cargoffer.com"  # Demo
export PORT=3000
```

## MCP Client Integration

### Claude Code

```json
{
  "mcpServers": {
    "ecmr": {
      "command": "npx",
      "args": ["@cargoffer/ecmr-mcp"],
      "env": {
        "ECMR_API_KEY": "your-key"
      }
    }
  }
}
```

### OpenAI Agents

```typescript
const ecmrClient = new MCPClient({
  command: "npx",
  args: ["@cargoffer/ecmr-mcp"]
});

const result = await ecmrClient.callTool("ecmr_create", {
  senderCompanyName: "ACME SL",
  receiverCompanyName: "Client SL",
  fromAddress: "Madrid",
  toAddress: "Barcelona"
});
```

## API Reference

Base URL: `https://ecmr.api.cargoffer.com`

### Create eCMR

```typescript
POST /ecmr
{
  sender: { company_name: "Company", cif: "B12345678" },
  receiver: { company_name: "Client", cif: "B87654321" },
  from: { address: "Origin", postal_code: "28001", country: "ES" },
  to: { address: "Destination", postal_code: "08001", country: "ES" },
  goods: { description: "Goods", packages: 2, weight: 500 }
}
```

### Signatures

```typescript
// Sign pickup
PUT /ecmr/sign/pickup/{service_code}
{ signature: "base64-encoded-signature" }

// Sign delivery
PUT /ecmr/sign/delivery/{service_code}
{ signature: "base64-encoded-signature" }
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Submit a Pull Request

## License

MIT License - see [LICENSE](LICENSE) for details.
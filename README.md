# Operational MCP layer for European road logistics documents

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![MCP](https://img.shields.io/badge/MCP-1.0.0-blue)](https://modelcontextprotocol.io)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)](https://nodejs.org)
[![GitHub Release](https://img.shields.io/github/v/release/cargoffer/ecmr-mcp)](https://github.com/cargoffer/ecmr-mcp/releases)
[![GitHub Stars](https://img.shields.io/github/stars/cargoffer/ecmr-mcp?style=social)](https://github.com/cargoffer/ecmr-mcp)

**An eCMR MCP server** that turns the Cargoffer ECMR API into callable tools for AI agents (Claude Desktop, Cursor, Cline, Continue, etc.). It lets LLMs create, sign, manage, and track **electronic consignment notes (eCMR / digital waybills)** — the legally binding document for international road freight — entirely through natural language.

> **What problem does it solve?** European road transport still relies on paper CMR waybills that get lost, delayed, or rejected at borders. This MCP server digitizes the full consignment lifecycle so AI agents can orchestrate document workflows without a human touching a PDF form.
>
> **What makes it different?** Unlike generic document-generation APIs, this exposes the complete eCMR lifecycle as structured MCP tools — authentication, address books, driver/vehicle registries, digital signature collection (sender, pickup, delivery), QR code validation, and PDF generation — all aligned with the UN/CMR convention legal framework.
>
> **What integration does it enable?** Any MCP-compatible AI client can invoke 30+ logistics document tools as if they were native functions. An LLM can register a carrier, create a waybill, collect three-party signatures, lock it legally, generate a QR, and produce the final PDF — all in one conversation.
>
> **What does "easy integration" mean concretely?** Copy-paste one JSON config block into your Claude Desktop config, set one environment variable (`ECMR_API_KEY`), and your AI assistant can immediately start managing real European consignment notes. No SDKs, no OAuth flows, no middleware servers.

---

## Why this MCP exists

Every day, hundreds of thousands of trucks cross European borders with paper CMR waybills. The paper gets wet, lost, or stuck under a seat. When an inspection happens, drivers scramble. When a dispute arises, nobody has the signed original. The eCMR (electronic CMR) convention solved the legal framework, but the tooling has stayed locked inside proprietary logistics suites — invisible to the AI agents that shippers and forwarders are starting to use for operations.

This MCP server exposes the [Cargoffer ECMR API](https://ecmr.api.release.cargoffer.com) as first-class LLM tools so that an AI agent — not a human dispatcher — can handle the entire consignment workflow from creation through legally binding signature collection. It makes **logistics document automation** possible inside the agent's native reasoning loop.

## AI Agent Capabilities

| Capability | What the AI can do |
|---|---|
| **Document digitization** | Create, edit, lock (finalize) eCMR documents from natural language |
| **Logistics operations** | Manage addresses, fleet vehicles, and driver records |
| **Digital signing** | Sign documents as sender, pickup, or delivery — legally binding |
| **Verification** | Generate and validate QR codes for traceability |
| **PDF output** | Generate signed PDF waybills automatically |
| **File attachments** | Attach photos, delivery proof, and supporting docs |

---

## MCP Capabilities

- **30+ MCP tools** covering the full eCMR lifecycle — no tool is hidden behind a submenu
- **Digital signature orchestration** — collect sender, pickup, and delivery signatures in sequence
- **QR code generation and validation** — every signed waybill gets a scannable proof-of-authenticity
- **PDF generation** — produce court-admissible PDFs from signed eCMRs
- **Address, driver, and vehicle management** — reusable registries so agents don't repeat data entry
- **File attachment support** — agents can upload delivery photos, inspection docs, or proof-of-damage
- **JWT-based authentication** — the server handles token lifecycle transparently
- **JSON-RPC 2.0** over HTTP — standard MCP transport, no custom protocol
- **Zero runtime dependencies** beyond Node.js 18+ — no Docker, no database

---

## Tools

| Category | Tool | Description |
|----------|------|-------------|
| 🔐 **Auth** | `ecmr_auth_login` | Authenticate and receive JWT token |
| | `ecmr_auth_register` | Register a new account |
| 📍 **Addresses** | `ecmr_addresses_list` | List all addresses |
| | `ecmr_addresses_create` | Create a new address |
| | `ecmr_addresses_get` | Get address by ID |
| | `ecmr_addresses_update` | Update an existing address |
| | `ecmr_addresses_delete` | Delete an address |
| 👤 **Drivers** | `ecmr_drivers_list` | List all drivers |
| | `ecmr_drivers_create` | Register a new driver |
| | `ecmr_drivers_get` | Get driver details |
| | `ecmr_drivers_delete` | Remove a driver |
| 🚛 **Vehicles** | `ecmr_vehicles_list` | List all vehicles |
| | `ecmr_vehicles_create` | Add a vehicle |
| | `ecmr_vehicles_get` | Get vehicle details |
| | `ecmr_vehicles_delete` | Remove a vehicle |
| 📄 **eCMR Core** | `ecmr_list` | List all consignment notes |
| | `ecmr_create` | Create a new eCMR waybill |
| | `ecmr_get` | Get eCMR by ID |
| | `ecmr_update` | Update an eCMR |
| | `ecmr_delete` | Delete an eCMR |
| | `ecmr_lock` | Lock (legally close) an eCMR |
| ✍️ **Signatures** | `ecmr_sign_sender` | Sign as sender / carrier |
| | `ecmr_sign_pickup` | Sign for goods pickup |
| | `ecmr_sign_delivery` | Sign for goods delivery |
| | `ecmr_pending_signatures` | List signatures awaiting action |
| 📱 **QR / PDF** | `ecmr_qrcode` | Generate QR code for an eCMR |
| | `ecmr_validate_qr` | Validate a QR code payload |
| | `ecmr_get_pdf` | Download PDF of a signed eCMR |
| 📎 **Files** | `ecmr_upload_file` | Attach a file to an eCMR |
| | `ecmr_download_file` | Download an attached file |
| 📬 **Send** | `ecmr_send` | Send eCMR to receiver |

---

## Directory structure

```
ecmr-mcp/
├── package.json          # Node.js 18+, ES module, @cargoffer/ecmr-mcp
├── .env.example          # Environment variable template
├── src/
│   ├── server.js         # MCP server entry point (JSON-RPC 2.0 / HTTP)
│   └── tools.js          # 30+ tool definitions mapped to ECMR API
└── README.md
```

---

---

## Authentication

To use this MCP server, you need an API key from the eCMR platform.

**Register:** https://ecmr.cargoffer.com

Create an account and get your API key from your profile settings. Then configure:

```bash
export ECMR_API_KEY="your-api-key"
```

Or in your MCP client config:

```json
{
  "mcpServers": {
    "ecmr": {
      "command": "...",
      "env": {
        "ECMR_API_KEY": "your-api-key-from-ecmr"
      }
    }
  }
}
```

## Quick Start

```bash
git clone https://github.com/cargoffer/ecmr-mcp.git
cd ecmr-mcp
export ECMR_API_KEY="your-api-key"
node src/server.js
```

Server starts on `http://localhost:3000` with a JSON-RPC 2.0 endpoint.

---

## Installation

### Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "ecmr": {
      "command": "node",
      "args": ["/absolute/path/to/ecmr-mcp/src/server.js"],
      "env": {
        "ECMR_API_KEY": "your-api-key"
      }
    }
  }
}
```

### Cursor

In **Cursor Settings → Features → MCP Servers → Add New**:

```
Name:   ecmr
Type:   command
Command: node /absolute/path/to/ecmr-mcp/src/server.js
Env:    ECMR_API_KEY=your-api-key
```

### Direct HTTP (for custom integrations)

```bash
curl -X POST http://localhost:3000 \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "ecmr_auth_login",
    "params": {"email": "user@example.com", "password": "..."}
  }'
```

---

## MCP protocol in action

**Create a new electronic consignment note:**

```bash
curl -X POST http://localhost:3000 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "jsonrpc": "2.0",
    "id": 2,
    "method": "ecmr_create",
    "params": {
      "senderAddressId": "addr_123",
      "deliveryAddressId": "addr_456",
      "driverId": "driver_789",
      "vehicleId": "veh_012",
      "goods": {
        "description": "Electronic components",
        "weight": 1200,
        "packages": 24
      }
    }
  }'
```

**Collect a signature:**

```bash
curl -X POST http://localhost:3000 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "jsonrpc": "2.0",
    "id": 3,
    "method": "ecmr_sign_sender",
    "params": {
      "ecmrId": "ecmr_abc123",
      "signatureData": "base64-encoded-signature-image"
    }
  }'
```

---

## Example Prompts for AI Agents

> "Create a new eCMR waybill for a shipment of electronics from Madrid to Paris. Register the sender address, driver, and vehicle first."

> "Sign the eCMR with ID abc-123 as the sender, then generate a QR code for the delivery driver."

> "List all eCMRs that are still pending signatures and remind the consignee to sign."

> "Download the PDF of eCMR xyz-789 and attach the delivery photo."

> "Lock eCMR abc-123 now that all three signatures (sender, pickup, delivery) have been collected."

> "What's the status of the waybill for order #44567? Show me the addresses, driver, and signature progress."

---

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `ECMR_API_KEY` | Cargoffer API key (required) | — |
| `ECMR_API_URL` | API base URL | `https://ecmr.api.release.cargoffer.com` |
| `PORT` | Server port | `3000` |

For local development:

```bash
ECMR_API_URL=http://localhost:8090 ECMR_API_KEY=your-key node src/server.js
```

---

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check |
| `/tools` | GET | List all available MCP tools |
| `/` | POST | JSON-RPC 2.0 endpoint |

---

## Semantic tags

`eCMR` `electronic consignment note` `MCP server` `Model Context Protocol` `European road transport` `logistics document automation` `CMR waybill` `digital waybill` `AI agents` `LLM tools` `trucking` `freight` `Cargoffer` `JSON-RPC` `supply chain` `transportation` `digital signature` `QR code` `waybill PDF` `road freight` `easy MCP integration`

---

## Getting Credentials

Contact Cargoffer to get your API key:
- **Email:** cto@cargoffer.com
- **GitHub Issues:** [github.com/cargoffer/ecmr-mcp/issues](https://github.com/cargoffer/ecmr-mcp/issues)

---

## License

MIT — see [LICENSE](LICENSE) file for details.

---

## Links

- **Repository:** [github.com/cargoffer/ecmr-mcp](https://github.com/cargoffer/ecmr-mcp)
- **Issues:** [github.com/cargoffer/ecmr-mcp/issues](https://github.com/cargoffer/ecmr-mcp/issues)
- **API Docs:** [ecmr.api.release.cargoffer.com](https://ecmr.api.release.cargoffer.com)
- **MCP Protocol:** [modelcontextprotocol.io](https://modelcontextprotocol.io)

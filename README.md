# ecmr-mcp: Electronic Consignment Note (eCMR) MCP Server for AI Agents

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![MCP](https://img.shields.io/badge/MCP-1.0.0-blue)](https://modelcontextprotocol.io)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)](https://nodejs.org)
[![GitHub Release](https://img.shields.io/github/v/release/cargoffer/ecmr-mcp)](https://github.com/cargoffer/ecmr-mcp/releases)
[![GitHub Stars](https://img.shields.io/github/stars/cargoffer/ecmr-mcp?style=social)](https://github.com/cargoffer/ecmr-mcp)

**Model Context Protocol (MCP) server** that connects AI agents (Claude Desktop, Cursor, Cline, etc.) to the Cargoffer ECMR API — enabling LLMs to create, manage, sign, and track **electronic consignment notes (eCMR / digital waybills)** programmatically.

---

## Quick Start

```bash
git clone https://github.com/cargoffer/ecmr-mcp.git
cd ecmr-mcp
export ECMR_API_KEY="your-api-key"
node src/server.js
```

Server starts on `http://localhost:3000` with a JSON-RPC 2.0 endpoint.

---

## What is this?

Transport logistics rely on the **CMR waybill** — the standard document for international road freight. This MCP server digitizes that process via the [Cargoffer ECMR API](https://ecmr.api.release.cargoffer.com), exposing:

- **30+ MCP tools** for full eCMR lifecycle management
- **Digital signatures** for sender, pickup, and delivery
- **QR code generation & validation**
- **PDF generation** of signed waybills
- **Address, driver, and vehicle management**
- **File attachments** (photos, documents)
- **Secure authentication** (JWT-based)

AI agents can handle the entire consignment workflow — from creating a waybill to collecting legally binding signatures — without manual intervention.

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
    "params": {"email": "user@example.com", "password": "..."
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

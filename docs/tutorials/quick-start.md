# Quick Start

## Your First eCMR Call

```typescript
import { Client } from "@modelcontextprotocol/sdk/client";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse";

const transport = new SSEClientTransport(
  new URL("https://ecmr.api.cargoffer.com/mcp")
);

const client = new Client(
  { name: "ecmr-client", version: "1.0.0" },
  { capabilities: {} }
);

await client.connect(transport);

// Create an electronic consignment note
const result = await client.callTool("ecmr_create", {
  sender: { company: "Acme Logistics", address: "Madrid, Spain" },
  recipient: { company: "Beta Transport", address: "Lisbon, Portugal" },
  goods: [{ description: "Electronics", packages: 24, weight: 1200 }],
  pickup: { date: "2026-06-01", location: "Madrid" },
  delivery: { date: "2026-06-02", location: "Lisbon" }
});

console.log(result);
```

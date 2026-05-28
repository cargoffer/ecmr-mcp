# Tool Reference

All available tools in the ECMR MCP server.

## Tools

| Tool | Description | Parameters |
|------|-------------|------------|
| ecmr_create | Create new eCMR | sender, recipient, goods, dates |
| ecmr_status | Get eCMR status | ecmr_id |
| ecmr_sign | Sign eCMR | ecmr_id, role |
| ecmr_track | Track shipment | ecmr_id |
| ecmr_deliver | Mark delivered | ecmr_id, signature, photos |
| poc_capture | Capture POD | ecmr_id, signature, photos |
| driver_compliance | Check driver | driver_id, date |
| compliance_alerts | Alert summaries | fleet_id |

## Full Documentation

See [GitHub Repository](https://github.com/cargoffer/ecmr-mcp) for complete API docs.

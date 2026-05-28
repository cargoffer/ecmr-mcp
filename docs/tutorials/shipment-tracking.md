# Shipment Tracking

Track shipments in real-time using the ECMR MCP server.

## Use Cases

- ETA predictions
- Delay alerts
- Route optimization
- Customer notifications

## Track a Shipment

```typescript
const tracking = await client.callTool("ecmr_track", {
  ecmr_id: "ECM-2026-XXXXX"
});

console.log(tracking.current_location);
console.log(tracking.estimated_arrival);
console.log(tracking.status);
```

## Webhook Integration

Set up webhooks for real-time updates:

```typescript
const webhook = await client.callTool("ecmr_webhook", {
  url: "https://your-server.com/webhook",
  events: ["pickup", "delivery", "delay"]
});
```

## Next Steps

👉 [Get Your API Key](https://client.release.transcend.cargoffer.com/)

# Digital Waybill Creation

Create electronic CMR documents programmatically using the MCP server.

## Why Digital Waybills?

| Feature | Paper CMR | eCMR |
|----------|-----------|------|
| Processing time | 15-30 min | 30 sec |
| Cost | €2-5/doc | €0.10/doc |
| Errors | 8-12% | <1% |
| Storage | Physical | Cloud |

## Creating an eCMR

```typescript
const ecmr = await client.callTool("ecmr_create", {
  sender: {
    company: "Acme Logistics",
    address: "Calle Gran Vía 1, Madrid 28013",
    country: "ES"
  },
  recipient: {
    company: "Beta Transports LDA",
    address: "Av. da Liberdade 110, Lisbon 1250-096",
    country: "PT"
  },
  goods: [
    {
      description: "Electronic equipment",
      HarmonizedCode: "8471",
      packages: 24,
      weight: 1200,
      value: 25000
    }
  ],
  pickup: {
    date: "2026-06-01T08:00:00Z",
    location: "Madrid warehouse"
  },
  delivery: {
    date: "2026-06-02T14:00:00Z",
    location: "Lisbon distribution center"
  }
});
```

## Status Tracking

```typescript
const status = await client.callTool("ecmr_status", {
  ecmr_id: ecmr.id
});
```

## Next Steps

👉 [Get Your API Key](https://client.release.transcend.cargoffer.com/)

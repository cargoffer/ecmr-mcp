# Driver Compliance

Monitor driver hours and ensure regulatory compliance.

## Regulatory Framework

EU Regulation 561/2006 governs:
- Maximum driving hours (4.5h continuous)
- Daily rest requirements
- Weekly rest periods

## Check Driver Status

```typescript
const compliance = await client.callTool("driver_compliance", {
  driver_id: "D123456",
  date: "2026-05-28"
});

console.log(compliance.hours_remaining);
console.log(compliance.rest_required);
console.log(compliance.violations);
```

## Violation Alerts

```typescript
// Get upcoming violations
const alerts = await client.callTool("compliance_alerts", {
  fleet_id: "FLEET-001",
  horizon_days: 7
});
```

## Next Steps

👉 [Get Your API Key](https://client.release.transcend.cargoffer.com/)

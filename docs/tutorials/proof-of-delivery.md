# Proof of Delivery

Capture and manage proof of delivery (POD) electronically.

## POD workflow

1. Driver arrives at delivery location
2. Capture recipient signature (digital)
3. Take photos of goods condition
4. Upload to cloud storage
5. Generate PDF receipt

## Capture POD

```typescript
const pod = await client.callTool("poc_capture", {
  ecmr_id: "ECM-2026-XXXXX",
  signature: "base64_encoded_signature",
  photos: ["photo1.jpg", "photo2.jpg"],
  notes: "Goods received in good condition",
  recipient_name: "John Smith"
});
```

## Retrieve POD

```typescript
const pod_pdf = await client.callTool("pod_get", {
  ecmr_id: "ECM-2026-XXXXX",
  format: "pdf"
});
```

## Next Steps

👉 [Get Your API Key](https://client.release.transcend.cargoffer.com/)

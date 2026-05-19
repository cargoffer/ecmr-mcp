/** Tool definitions for ECMR MCP */

const toolDefinitions = [
  // AUTH
  { name: "ecmr_auth_login", description: "Login to ECMR API", inputSchema: { type: "object", properties: { email: { type: "string", description: "User email" }, password: { type: "string", description: "Password" } }, required: ["email", "password"] },
  { name: "ecmr_auth_register", description: "Register new user", inputSchema: { type: "object", properties: { email: { type: "string" }, password: { type: "string" }, companyName: { type: "string" } }, required: ["email", "password", "companyName"] },
  
  // ADDRESSES
  { name: "ecmr_addresses_list", description: "List addresses", inputSchema: { type: "object", properties: { limit: { type: "number" } } },
  { name: "ecmr_addresses_create", description: "Create address", inputSchema: { type: "object", properties: { name: { type: "string" }, street: { type: "string" }, city: { type: "string" }, state: { type: "string" }, postalCode: { type: "string" }, country: { type: "string" } }, required: ["name", "street", "city"] },
  
  // DRIVERS
  { name: "ecmr_drivers_list", description: "List drivers", inputSchema: { type: "object", properties: { limit: { type: "number" } } },
  { name: "ecmr_drivers_create", description: "Create driver", inputSchema: { type: "object", properties: { name: { type: "string" }, email: { type: "string" }, phone: { type: "string" }, license: { type: "string" }, licenseType: { type: "string" } }, required: ["name", "phone"] },
  { name: "ecmr_drivers_update", description: "Update driver", inputSchema: { type: "object", properties: { driverId: { type: "string" }, name: { type: "string" }, phone: { type: "string" } }, required: ["driverId"] },
  { name: "ecmr_drivers_delete", description: "Delete driver", inputSchema: { type: "object", properties: { driverId: { type: "string" } }, required: ["driverId"] },
  
  // VEHICLES
  { name: "ecmr_vehicles_list", description: "List vehicles", inputSchema: { type: "object", properties: { limit: { type: "number" } } },
  { name: "ecmr_vehicles_create", description: "Create vehicle", inputSchema: { type: "object", properties: { plate: { type: "string" }, type: { type: "string" }, brand: { type: "string" }, model: { type: "string" }, capacity: { type: "number" } }, required: ["plate"] },
  
  // ECMR CORE
  { name: "ecmr_create", description: "Create eCMR (electronic consignment note)", inputSchema: { type: "object", properties: { senderCompanyName: { type: "string" }, senderCif: { type: "string" }, receiverCompanyName: { type: "string" }, receiverCif: { type: "string" }, fromAddress: { type: "string" }, fromPostalCode: { type: "string" }, fromCountry: { type: "string" }, toAddress: { type: "string" }, toPostalCode: { type: "string" }, toCountry: { type: "string" }, goodsDescription: { type: "string" }, packages: { type: "number" }, pallets: { type: "number" }, weight: { type: "number" } }, required: ["senderCompanyName", "receiverCompanyName", "fromAddress", "toAddress"] },
  { name: "ecmr_get", description: "Get eCMR by service code", inputSchema: { type: "object", properties: { serviceCode: { type: "string" } }, required: ["serviceCode"] },
  { name: "ecmr_update", description: "Update eCMR", inputSchema: { type: "object", properties: { serviceCode: { type: "string" } }, required: ["serviceCode"] },
  { name: "ecmr_delete", description: "Delete eCMR", inputSchema: { type: "object", properties: { serviceCode: { type: "string" } }, required: ["serviceCode"] },
  { name: "ecmr_lock", description: "Lock eCMR (legally close)", inputSchema: { type: "object", properties: { serviceCode: { type: "string" } }, required: ["serviceCode"] },
  
  // SIGNATURES
  { name: "ecmr_sign_sender", description: "Sign eCMR as sender", inputSchema: { type: "object", properties: { serviceCode: { type: "string" }, signature: { type: "string" } }, required: ["serviceCode", "signature"] },
  { name: "ecmr_sign_pickup", description: "Sign eCMR pickup", inputSchema: { type: "object", properties: { serviceCode: { type: "string" }, signature: { type: "string" } }, required: ["serviceCode", "signature"] },
  { name: "ecmr_sign_delivery", description: "Sign eCMR delivery", inputSchema: { type: "object", properties: { serviceCode: { type: "string" }, signature: { type: "string" } }, required: ["serviceCode", "signature"] },
  { name: "ecmr_signatures_list", description: "List pending signatures", inputSchema: { type: "object" } },
  
  // QR
  { name: "ecmr_qr_generate", description: "Generate QR code for eCMR", inputSchema: { type: "object", properties: { serviceCode: { type: "string" } }, required: ["serviceCode"] },
  { name: "ecmr_qr_validate", description: "Validate QR code", inputSchema: { type: "object", properties: { serviceCode: { type: "string" } }, required: ["serviceCode"] },
];

module.exports = { toolDefinitions };

/**
 * Cargoffer ECMR MCP Server
 * Connect Claude Code, OpenAI Agents to Cargoffer ECMR API
 */

const API_URL = process.env.ECMR_API_URL || "https://ecmr.api.cargoffer.com";
let API_KEY = process.env.ECMR_API_KEY || "";

// Simple API call wrapper
async function apiCall(method, endpoint, body = null) {
  const headers = { "Content-Type": "application/json" };
  if (API_KEY) headers["Authorization"] = `Apikey ${API_KEY}`;
  
  const options = { method, headers };
  if (body) options.body = JSON.stringify(body);
  
  const res = await fetch(`${API_URL}${endpoint}`, options);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

// Tool handler
async function handleTool(name, args) {
  switch(name) {
    // Auth
    case "ecmr_auth_login":
      return await apiCall("POST", "/auth/login", args);
    case "ecmr_auth_register":
      return await apiCall("POST", "/auth/register", args);
    
    // Addresses
    case "ecmr_addresses_list":
      return await apiCall("GET", `/addresses/?limit=${args.limit || 50}`);
    case "ecmr_addresses_create":
      return await apiCall("POST", "/addresses/", args);
    case "ecmr_addresses_update":
      return await apiCall("PUT", `/addresses/${args.id}`, args);
    case "ecmr_addresses_delete":
      return await apiCall("DELETE", `/addresses/${args.id}`);
    
    // Drivers
    case "ecmr_drivers_list":
      return await apiCall("GET", `/drivers/?limit=${args.limit || 50}`);
    case "ecmr_drivers_create":
      return await apiCall("POST", "/drivers/", args);
    case "ecmr_drivers_update":
      return await apiCall("PUT", `/drivers/${args.id}`, args);
    case "ecmr_drivers_delete":
      return await apiCall("DELETE", `/drivers/${args.id}`);
    
    // Vehicles
    case "ecmr_vehicles_list":
      return await apiCall("GET", `/vehicles/?limit=${args.limit || 50}`);
    case "ecmr_vehicles_create":
      return await apiCall("POST", "/vehicles/", args);
    case "ecmr_vehicles_update":
      return await apiCall("PUT", `/vehicles/${args.id}`, args);
    case "ecmr_vehicles_delete":
      return await apiCall("DELETE", `/vehicles/${args.id}`);
    
    // ECMR
    case "ecmr_create":
      return await apiCall("POST", "/ecmr", {
        sender: { company_name: args.senderCompanyName, cif: args.senderCif },
        receiver: { company_name: args.receiverCompanyName, cif: args.receiverCif },
        from: { address: args.fromAddress, postal_code: args.fromPostalCode, country: args.fromCountry || "ES" },
        to: { address: args.toAddress, postal_code: args.toPostalCode, country: args.toCountry || "ES" },
        goods: { description: args.goodsDescription, packages: args.packages, pallets: args.pallets, weight: args.weight }
      });
    case "ecmr_get":
      return await apiCall("GET", `/ecmr/${args.serviceCode}`);
    case "ecmr_update":
      return await apiCall("PUT", `/ecmr/${args.serviceCode}`, args);
    case "ecmr_delete":
      return await apiCall("DELETE", `/ecmr/${args.serviceCode}`);
    case "ecmr_lock":
      return await apiCall("PUT", `/ecmr/lock/${args.serviceCode}`);
    
    // Signatures
    case "ecmr_sign_sender":
      return await apiCall("PUT", `/ecmr/sign/sender/${args.serviceCode}`, { signature: args.signature });
    case "ecmr_sign_pickup":
      return await apiCall("PUT", `/ecmr/sign/pickup/${args.serviceCode}`, { signature: args.signature });
    case "ecmr_sign_delivery":
      return await apiCall("PUT", `/ecmr/sign/delivery/${args.serviceCode}`, { signature: args.signature });
    case "ecmr_signatures_list":
      return await apiCall("GET", "/ecmr/sign");
    
    // QR
    case "ecmr_qr_generate":
      return await apiCall("GET", `/ecmr/qr/${args.serviceCode}`);
    case "ecmr_qr_validate":
      return await apiCall("GET", `/ecmr/qr/check/${args.serviceCode}`);
    
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

// List of available tools
const tools = [
  { name: "ecmr_auth_login", description: "Login to ECMR API", inputSchema: { type: "object", properties: { email: { type: "string" }, password: { type: "string" } } } },
  { name: "ecmr_auth_register", description: "Register new user", inputSchema: { type: "object", properties: { email: { type: "string" }, password: { type: "string" }, companyName: { type: "string" } } } },
  { name: "ecmr_addresses_list", description: "List addresses", inputSchema: { type: "object", properties: { limit: { type: "number" } } } },
  { name: "ecmr_addresses_create", description: "Create address", inputSchema: { type: "object", properties: { name: { type: "string" }, street: { type: "string" }, city: { type: "string" }, country: { type: "string" } } } },
  { name: "ecmr_drivers_list", description: "List drivers", inputSchema: { type: "object", properties: { limit: { type: "number" } } } },
  { name: "ecmr_drivers_create", description: "Create driver", inputSchema: { type: "object", properties: { name: { type: "string" }, phone: { type: "string" }, license: { type: "string" } } } },
  { name: "ecmr_drivers_update", description: "Update driver", inputSchema: { type: "object", properties: { driverId: { type: "string" }, name: { type: "string" } } } },
  { name: "ecmr_vehicles_list", description: "List vehicles", inputSchema: { type: "object", properties: { limit: { type: "number" } } } },
  { name: "ecmr_vehicles_create", description: "Create vehicle", inputSchema: { type: "object", properties: { plate: { type: "string" }, type: { type: "string" } } } },
  { name: "ecmr_create", description: "Create eCMR", inputSchema: { type: "object", properties: { senderCompanyName: { type: "string" }, receiverCompanyName: { type: "string" }, fromAddress: { type: "string" }, toAddress: { type: "string" }, goodsDescription: { type: "string" }, packages: { type: "number" }, weight: { type: "number" } } } },
  { name: "ecmr_get", description: "Get eCMR by code", inputSchema: { type: "object", properties: { serviceCode: { type: "string" } } } },
  { name: "ecmr_update", description: "Update eCMR", inputSchema: { type: "object", properties: { serviceCode: { type: "string" } } } },
  { name: "ecmr_delete", description: "Delete eCMR", inputSchema: { type: "object", properties: { serviceCode: { type: "string" } } } },
  { name: "ecmr_lock", description: "Lock eCMR", inputSchema: { type: "object", properties: { serviceCode: { type: "string" } } } },
  { name: "ecmr_sign_sender", description: "Sign as sender", inputSchema: { type: "object", properties: { serviceCode: { type: "string" }, signature: { type: "string" } } } },
  { name: "ecmr_sign_pickup", description: "Sign pickup", inputSchema: { type: "object", properties: { serviceCode: { type: "string" }, signature: { type: "string" } } } },
  { name: "ecmr_sign_delivery", description: "Sign delivery", inputSchema: { type: "object", properties: { serviceCode: { type: "string" }, signature: { type: "string" } } } },
  { name: "ecmr_signatures_list", description: "List pending signatures", inputSchema: { type: "object" } },
  { name: "ecmr_qr_generate", description: "Generate QR code", inputSchema: { type: "object", properties: { serviceCode: { type: "string" } } } },
  { name: "ecmr_qr_validate", description: "Validate QR code", inputSchema: { type: "object", properties: { serviceCode: { type: "string" } } } },
];

// Export for MCP server
export default { tools, handleTool };
console.log(`ECMR MCP Server: ${tools.length} tools loaded`);

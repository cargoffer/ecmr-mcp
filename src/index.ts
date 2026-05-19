/**
 * Cargoffer ECMR MCP Server
 * Connects Claude Code, OpenAI Agents, and other MCP clients to Cargoffer ECMR API
 */
import { Server } from "@modelcontextprotocol/server";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/types";
import type { Server } from "@modelcontextprotocol/server";

const ECMR_API_URL = process.env.ECMR_API_URL || "https://ecmr.api.cargoffer.com";
const API_KEY = process.env.ECMR_API_KEY || "";

// Simple HTTP client using fetch
async function ecmrCall(
  method: string,
  endpoint: string,
  body?: object
): Promise<object> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  
  if (API_KEY) {
    headers["Authorization"] = `Apikey ${API_KEY}`;
  }
  
  const options: RequestInit = {
    method,
    headers,
  };
  
  if (body) {
    options.body = JSON.stringify(body);
  }
  
  const response = await fetch(`${ECMR_API_URL}${endpoint}`, options);
  
  if (!response.ok) {
    throw new Error(`ECMR API error: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
}

// Tool definitions
const tools = [
  // === AUTH ===
  {
    name: "ecmr_auth_login",
    description: "Login to ECMR API and get session token",
    inputSchema: {
      type: "object",
      properties: {
        email: { type: "string", description: "User email" },
        password: { type: "string", description: "User password" },
      },
      required: ["email", "password"],
    },
  },
  {
    name: "ecmr_auth_register",
    description: "Register new user in ECMR",
    inputSchema: {
      type: "object",
      properties: {
        email: { type: "string", description: "User email" },
        password: { type: "string", description: "User password" },
        companyName: { type: "string", description: "Company name" },
        cif: { type: "string", description: "Company CIF/NIF" },
      },
      required: ["email", "password", "companyName"],
    },
  },
  
  // === ADDRESS ===
  {
    name: "ecmr_addresses_list",
    description: "List all addresses",
    inputSchema: {
      type: "object",
      properties: {
        limit: { type: "number", description: "Max results (default 50)" },
      },
    },
  },
  {
    name: "ecmr_addresses_create",
    description: "Create new address",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string", description: "Address name" },
        street: { type: "string", description: "Street address" },
        city: { type: "string", description: "City" },
        state: { type: "string", description: "State/Province" },
        postalCode: { type: "string", description: "Postal code" },
        country: { type: "string", description: "Country code (e.g., ES)" },
      },
      required: ["name", "street", "city"],
    },
  },
  
  // === DRIVERS ===
  {
    name: "ecmr_drivers_list",
    description: "List all drivers",
    inputSchema: {
      type: "object",
      properties: {
        limit: { type: "number", description: "Max results" },
      },
    },
  },
  {
    name: "ecmr_drivers_create",
    description: "Create new driver",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string", description: "Driver name" },
        email: { type: "string", description: "Driver email" },
        phone: { type: "string", description: "Phone number" },
        license: { type: "string", description: "Driver license number" },
        licenseType: { type: "string", description: "License type (B, C, D)" },
      },
      required: ["name", "phone"],
    },
  },
  {
    name: "ecmr_drivers_update",
    description: "Update driver",
    inputSchema: {
      type: "object",
      properties: {
        driverId: { type: "string", description: "Driver ID" },
        name: { type: "string", description: "Driver name" },
        email: { type: "string", description: "Email" },
        phone: { type: "string", description: "Phone" },
      },
      required: ["driverId"],
    },
  },
  
  // === VEHICLES ===
  {
    name: "ecmr_vehicles_list",
    description: "List all vehicles",
    inputSchema: {
      type: "object",
      properties: {
        limit: { type: "number", description: "Max results" },
      },
    },
  },
  {
    name: "ecmr_vehicles_create",
    description: "Create new vehicle",
    inputSchema: {
      type: "object",
      properties: {
        plate: { type: "string", description: "License plate" },
        type: { type: "string", description: "Vehicle type (truck, van)" },
        brand: { type: "string", description: "Brand" },
        model: { type: "string", description: "Model" },
        capacity: { type: "number", description: "Capacity in kg" },
      },
      required: ["plate"],
    },
  },
  
  // === ECMR CORE ===
  {
    name: "ecmr_create",
    description: "Create new eCMR (electronic consignment note)",
    inputSchema: {
      type: "object",
      properties: {
        senderCompanyName: { type: "string", description: "Sender company name" },
        senderCif: { type: "string", description: "Sender CIF" },
        receiverCompanyName: { type: "string", description: "Receiver company name" },
        receiverCif: { type: "string", description: "Receiver CIF" },
        fromAddress: { type: "string", description: "Origin address" },
        fromPostalCode: { type: "string", description: "Origin postal code" },
        fromCountry: { type: "string", description: "Origin country code" },
        toAddress: { type: "string", description: "Destination address" },
        toPostalCode: { type: "string", description: "Destination postal code" },
        toCountry: { type: "string", description: "Destination country code" },
        goodsDescription: { type: "string", description: "Goods description" },
        packages: { type: "number", description: "Number of packages" },
        pallets: { type: "number", description: "Number of pallets" },
        weight: { type: "number", description: "Weight in kg" },
      },
      required: ["senderCompanyName", "receiverCompanyName", "fromAddress", "toAddress"],
    },
  },
  {
    name: "ecmr_get",
    description: "Get eCMR by service code",
    inputSchema: {
      type: "object",
      properties: {
        serviceCode: { type: "string", description: "eCMR service code" },
      },
      required: ["serviceCode"],
    },
  },
  {
    name: "ecmr_update",
    description: "Update eCMR",
    inputSchema: {
      type: "object",
      properties: {
        serviceCode: { type: "string", description: "eCMR service code" },
        senderCompanyName: { type: "string", description: "Sender company" },
        receiverCompanyName: { type: "string", description: "Receiver company" },
        toAddress: { type: "string", description: "New destination" },
      },
      required: ["serviceCode"],
    },
  },
  {
    name: "ecmr_delete",
    description: "Delete eCMR",
    inputSchema: {
      type: "object",
      properties: {
        serviceCode: { type: "string", description: "eCMR service code" },
      },
      required: ["serviceCode"],
    },
  },
  {
    name: "ecmr_lock",
    description: "Lock eCMR (legally close)",
    inputSchema: {
      type: "object",
      properties: {
        serviceCode: { type: "string", description: "eCMR service code" },
      },
      required: ["serviceCode"],
    },
  },
  
  // === SIGNATURES ===
  {
    name: "ecmr_sign_sender",
    description: "Sign eCMR as sender",
    inputSchema: {
      type: "object",
      properties: {
        serviceCode: { type: "string", description: "eCMR service code" },
        signature: { type: "string", description: "Base64 signature" },
      },
      required: ["serviceCode", "signature"],
    },
  },
  {
    name: "ecmr_sign_pickup",
    description: "Sign eCMR pickup",
    inputSchema: {
      type: "object",
      properties: {
        serviceCode: { type: "string", description: "eCMR service code" },
        signature: { type: "string", description: "Base64 signature" },
      },
      required: ["serviceCode", "signature"],
    },
  },
  {
    name: "ecmr_sign_delivery",
    description: "Sign eCMR delivery",
    inputSchema: {
      type: "object",
      properties: {
        serviceCode: { type: "string", description: "eCMR service code" },
        signature: { type: "string", description: "Base64 signature" },
      },
      required: ["serviceCode", "signature"],
    },
  },
  {
    name: "ecmr_signatures_list",
    description: "List pending signatures",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  
  // === QR ===
  {
    name: "ecmr_qr_generate",
    description: "Generate QR code for eCMR",
    inputSchema: {
      type: "object",
      properties: {
        serviceCode: { type: "string", description: "eCMR service code" },
      },
      required: ["serviceCode"],
    },
  },
  {
    name: "ecmr_qr_validate",
    description: "Validate QR code",
    inputSchema: {
      type: "object",
      properties: {
        serviceCode: { type: "string", description: "eCMR service code" },
      },
      required: ["serviceCode"],
    },
  },
];

console.log("ECMR MCP Server loaded", tools.length, "tools");
export { tools };
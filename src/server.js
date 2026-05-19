/**
 * Cargoffer ECMR MCP Server
 * Standalone implementation for Model Context Protocol
 */

import http from 'http';

const API_URL = process.env.ECMR_API_URL || 'https://ecmr.api.cargoffer.com';
let API_KEY = process.env.ECMR_API_KEY || '';

// HTTP request helper
function apiRequest(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, API_URL);
    const options = {
      hostname: url.hostname,
      port: url.port || 443,
      path: url.pathname + (url.search || ''),
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Apikey ${API_KEY}`
      }
    };
    
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch {
          resolve({ raw: data });
        }
      });
    });
    
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

// MCP Protocol: JSON-RPC 2.0
async function handleRequest(req) {
  const { jsonrpc, id, method, params } = req;
  
  try {
    let result;
    
    switch(method) {
      // Auth
      case 'ecmr_auth_login': result = await apiRequest('POST', '/auth/login', params); break;
      case 'ecmr_auth_register': result = await apiRequest('POST', '/auth/register', params); break;
      
      // Addresses
      case 'ecmr_addresses_list': result = await apiRequest('GET', `/addresses/?limit=${params.limit||50}`); break;
      case 'ecmr_addresses_create': result = await apiRequest('POST', '/addresses/', params); break;
      
      // Drivers
      case 'ecmr_drivers_list': result = await apiRequest('GET', `/drivers/?limit=${params.limit||50}`); break;
      case 'ecmr_drivers_create': result = await apiRequest('POST', '/drivers/', params); break;
      case 'ecmr_drivers_update': result = await apiRequest('PUT', `/drivers/${params.id}`, params); break;
      case 'ecmr_drivers_delete': result = await apiRequest('DELETE', `/drivers/${params.id}`); break;
      
      // Vehicles
      case 'ecmr_vehicles_list': result = await apiRequest('GET', `/vehicles/?limit=${params.limit||50}`); break;
      case 'ecmr_vehicles_create': result = await apiRequest('POST', '/vehicles/', params); break;
      
      // ECMR Core
      case 'ecmr_create':
        result = await apiRequest('POST', '/ecmr', {
          sender: { company_name: params.senderCompanyName, cif: params.senderCif },
          receiver: { company_name: params.receiverCompanyName, cif: params.receiverCif },
          from: { address: params.fromAddress, postal_code: params.fromPostalCode, country: params.fromCountry || 'ES' },
          to: { address: params.toAddress, postal_code: params.toPostalCode, country: params.toCountry || 'ES' },
          goods: { description: params.goodsDescription, packages: params.packages, weight: params.weight }
        });
        break;
      case 'ecmr_get': result = await apiRequest('GET', `/ecmr/${params.serviceCode}`); break;
      case 'ecmr_update': result = await apiRequest('PUT', `/ecmr/${params.serviceCode}`, params); break;
      case 'ecmr_delete': result = await apiRequest('DELETE', `/ecmr/${params.serviceCode}`); break;
      case 'ecmr_lock': result = await apiRequest('PUT', `/ecmr/lock/${params.serviceCode}`); break;
      
      // Signatures
      case 'ecmr_sign_sender': result = await apiRequest('PUT', `/ecmr/sign/sender/${params.serviceCode}`, { signature: params.signature }); break;
      case 'ecmr_sign_pickup': result = await apiRequest('PUT', `/ecmr/sign/pickup/${params.serviceCode}`, { signature: params.signature }); break;
      case 'ecmr_sign_delivery': result = await apiRequest('PUT', `/ecmr/sign/delivery/${params.serviceCode}`, { signature: params.signature }); break;
      case 'ecmr_signatures_list': result = await apiRequest('GET', '/ecmr/sign'); break;
      
      // QR
      case 'ecmr_qr_generate': result = await apiRequest('GET', `/ecmr/qr/${params.serviceCode}`); break;
      case 'ecmr_qr_validate': result = await apiRequest('GET', `/ecmr/qr/check/${params.serviceCode}`); break;
      
      default:
        throw new Error(`Unknown method: ${method}`);
    }
    
    return { jsonrpc: '2.0', id, result };
  } catch (error) {
    return { jsonrpc: '2.0', id, error: { code: -32601, message: error.message } };
  }
}

// Tool definitions (imported from tools.js)
import { toolDefinitions } from './tools.js';

// Server startup
const PORT = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  
  if (req.url === '/health') {
    res.end(JSON.stringify({ status: 'ok' }));
    return;
  }
  
  if (req.url === '/tools') {
    res.end(JSON.stringify({ tools: toolDefinitions }));
    return;
  }
  
  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const request = JSON.parse(body);
        const response = await handleRequest(request);
        res.end(JSON.stringify(response));
      } catch {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: { code: -32600, message: 'Invalid Request' } }));
      }
    });
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: { code: -32600, message: 'Not Found' } }));
  }
});

server.listen(PORT, () => {
  console.log(`ECMR MCP Server running on port ${PORT}`);
  console.log(`API: ${API_URL}`);
});

export default { handleRequest };
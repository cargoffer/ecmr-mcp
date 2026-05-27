/**
 * Cargoffer ECMR MCP Server
 * Standalone implementation for Model Context Protocol
 * Connects to: https://ecmr.api.release.cargoffer.com
 */

import http from 'http';
import https from 'https';

const API_URL = process.env.ECMR_API_URL || 'https://ecmr.api.release.cargoffer.com';
const API_KEY = process.env.ECMR_API_KEY || '';
let JWT_TOKEN = '';

// Use correct HTTP module based on URL
const isHttps = API_URL.startsWith('https://');
const httpModule = isHttps ? https : http;

// Store token after login
function setAuth(token) { 
  JWT_TOKEN = token; 
}

// HTTP request helper
function apiRequest(method, path, body = null, authToken = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, API_URL);
    const headers = { 'Content-Type': 'application/json' };
    
    // Use API key for /api/* routes, otherwise use passed token or stored JWT
    const isApiRoute = path.startsWith('/api/');
    if (isApiRoute && API_KEY) {
      headers['x-api-key'] = API_KEY;
    } else if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    } else if (JWT_TOKEN) {
      headers['Authorization'] = `Bearer ${JWT_TOKEN}`;
    }
    
    const options = {
      hostname: url.hostname,
      port: url.port || 443,
      path: url.pathname + (url.search || ''),
      method,
      headers
    };
    
    const req = httpModule.request(options, (res) => {
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
      // AUTH
      case 'ecmr_auth_login':
        result = await apiRequest('POST', '/auth/login', params);
        if (result?.data) {
          setAuth(result.data);
        }
        break;
      case 'ecmr_auth_register':
        result = await apiRequest('POST', '/auth/register', params);
        break;
      
      // ADDRESSES
      case 'ecmr_addresses_list':
        result = await apiRequest('GET', `/addresses/?limit=${params?.limit || 50}`, null, params?._auth);
        break;
      case 'ecmr_addresses_create':
        result = await apiRequest('POST', '/addresses/', {
          name: params.name,
          street: params.street,
          city: params.city,
          state: params.state,
          postal_code: params.postal_code,
          country: params.country,
          company_name: params.company_name
        });
        break;
      case 'ecmr_addresses_update':
        result = await apiRequest('PUT', `/addresses/${params.id}`, params);
        break;
      case 'ecmr_addresses_delete':
        result = await apiRequest('DELETE', `/addresses/${params.id}`);
        break;
      
      // DRIVERS
      case 'ecmr_drivers_list':
        result = await apiRequest('GET', `/drivers/?limit=${params?.limit || 50}`);
        break;
      case 'ecmr_drivers_create':
        result = await apiRequest('POST', '/drivers/', params);
        break;
      case 'ecmr_drivers_update':
        result = await apiRequest('PUT', `/drivers/${params.id}`, params);
        break;
      case 'ecmr_drivers_delete':
        result = await apiRequest('DELETE', `/drivers/${params.id}`);
        break;
      
      // VEHICLES
      case 'ecmr_vehicles_list':
        result = await apiRequest('GET', `/vehicles/?limit=${params?.limit || 50}`);
        break;
      case 'ecmr_vehicles_create':
        result = await apiRequest('POST', '/vehicles/', params);
        break;
      case 'ecmr_vehicles_update':
        result = await apiRequest('PUT', `/vehicles/${params.id}`, params);
        break;
      case 'ecmr_vehicles_delete':
        result = await apiRequest('DELETE', `/vehicles/${params.id}`);
        break;
      
      // ECMR CORE
      case 'ecmr_create':
        result = await apiRequest('POST', '/ecmr', {
          sender: { company_name: params.senderCompanyName, cif: params.senderCif },
          receiver: { company_name: params.receiverCompanyName, cif: params.receiverCif },
          from: { address: params.fromAddress, postal_code: params.fromPostalCode, country: params.fromCountry || 'ES' },
          to: { address: params.toAddress, postal_code: params.toPostalCode, country: params.toCountry || 'ES' },
          goods: { description: params.goodsDescription, packages: params.packages, weight: params.weight, pallets: params.pallets }
        });
        break;
      case 'ecmr_get':
        result = await apiRequest('GET', `/ecmr/${params.serviceCode}`);
        break;
      case 'ecmr_list':
        result = await apiRequest('GET', `/ecmr/?limit=${params?.limit || 50}`);
        break;
      case 'ecmr_update':
        result = await apiRequest('PUT', `/ecmr/${params.serviceCode}`, params);
        break;
      case 'ecmr_delete':
        result = await apiRequest('DELETE', `/ecmr/${params.serviceCode}`);
        break;
      case 'ecmr_lock':
        result = await apiRequest('PUT', `/ecmr/lock/${params.serviceCode}`);
        break;
      
      // SIGNATURES
      case 'ecmr_sign_sender':
        result = await apiRequest('PUT', `/ecmr/sign/sender/${params.serviceCode}`, { signature: params.signature });
        break;
      case 'ecmr_sign_pickup':
        result = await apiRequest('PUT', `/ecmr/sign/pickup/${params.serviceCode}`, { signature: params.signature });
        break;
      case 'ecmr_sign_delivery':
        result = await apiRequest('PUT', `/ecmr/sign/delivery/${params.serviceCode}`, { signature: params.signature });
        break;
      case 'ecmr_signatures_list':
        result = await apiRequest('GET', '/ecmr/sign');
        break;
      
      // QR / PDF
      case 'ecmr_qr_generate':
        result = await apiRequest('GET', `/ecmr/qr/${params.serviceCode}`);
        break;
      case 'ecmr_qr_validate':
        result = await apiRequest('GET', `/ecmr/qr/check/${params.serviceCode}`);
        break;
      case 'ecmr_pdf':
        result = await apiRequest('GET', `/ecmr/pdf/${params.serviceCode}`);
        break;
      
      // FILE / ATTACHMENTS
      case 'ecmr_file_upload':
        result = await apiRequest('POST', `/ecmr/file/${params.serviceCode}`, params);
        break;
      case 'ecmr_file_download':
        result = await apiRequest('GET', `/ecmr/file/${params.serviceCode}`);
        break;
      
// SEND
      case 'ecmr_send':
        result = await apiRequest('POST', `/ecmr/send/${params.serviceCode}`, params);
        break;

      // ============================================================
      // BILLING - Invoice management
      // ============================================================
      case 'ecmr_invoices_list':
        result = await apiRequest('GET', `/invoices/?limit=${params?.limit || 50}`);
        break;
      case 'ecmr_invoices_get':
        result = await apiRequest('GET', `/invoices/${params.id}`);
        break;
      case 'ecmr_invoices_create':
        result = await apiRequest('POST', '/invoices/', params);
        break;
      case 'ecmr_invoices_pdf':
        result = await apiRequest('GET', `/invoices/pdf/${params.id}`);
        break;

      // ============================================================
      // ISSUES - Problem reporting
      // ============================================================
      case 'ecmr_issues_list':
        result = await apiRequest('GET', `/issues/?limit=${params?.limit || 50}`);
        break;
      case 'ecmr_issues_create':
        result = await apiRequest('POST', '/issues/', params);
        break;
      case 'ecmr_issues_get':
        result = await apiRequest('GET', `/issues/${params.id}`);
        break;
      case 'ecmr_issues_update':
        result = await apiRequest('PUT', `/issues/${params.id}`, params);
        break;
      case 'ecmr_issues_delete':
        result = await apiRequest('DELETE', `/issues/${params.id}`);
        break;

      // ============================================================
      // NOTIFICATIONS
      // ============================================================
      case 'ecmr_notifications_list':
        result = await apiRequest('GET', `/notifications/?limit=${params?.limit || 50}`);
        break;
      case 'ecmr_notifications_mark_read':
        result = await apiRequest('PUT', `/notifications/${params.id}/read`);
        break;
      case 'ecmr_notifications_delete':
        result = await apiRequest('DELETE', `/notifications/${params.id}`);
        break;

      // ============================================================
      // USERS / PROFILE
      // ============================================================
      case 'ecmr_users_list':
        result = await apiRequest('GET', `/users/?limit=${params?.limit || 50}`);
        break;
      case 'ecmr_users_get':
        result = await apiRequest('GET', `/users/${params.id}`);
        break;
      case 'ecmr_profile_get':
        result = await apiRequest('GET', '/profile');
        break;
      case 'ecmr_profile_update':
        result = await apiRequest('PUT', '/profile', params);
        break;
      case 'ecmr_logout':
        JWT_TOKEN = '';
        result = { success: true };
        break;

      // ============================================================
      // COMPANY DATA
      // ============================================================
      case 'ecmr_company_get':
        result = await apiRequest('GET', '/company/');
        break;
      case 'ecmr_company_update':
        result = await apiRequest('PUT', '/company/', params);
        break;
      case 'ecmr_company_logo':
        result = await apiRequest('POST', '/company/logo', params);
        break;

      // ============================================================
      // CATEGORIES
      // ============================================================
      case 'ecmr_categories_list':
        result = await apiRequest('GET', '/categories/find');
        break;
      case 'ecmr_categories_find':
        result = await apiRequest('GET', `/categories/findfind?name=${encodeURIComponent(params.name)}`);
        break;

      // ============================================================
      // COUNTRY
      // ============================================================
      case 'ecmr_country_list':
        result = await apiRequest('GET', '/country/');
        break;

      // ============================================================
      // BILLING / PRICING
      // ============================================================
      case 'ecmr_pricing_tiers':
        result = await apiRequest('GET', '/billing/pricing-tiers');
        break;
      case 'ecmr_billing_checkout':
        result = await apiRequest('POST', '/billing/create-checkout-session', { priceId: params.priceId });
        break;
      case 'ecmr_billing_portal':
        result = await apiRequest('POST', '/billing/create-portal-session', params);
        break;
      case 'ecmr_billing_check_stripe':
        result = await apiRequest('GET', '/billing/check-stripe');
        break;

      // ============================================================
      // APIKEYS
      // ============================================================
      case 'ecmr_apikey_list':
        result = await apiRequest('GET', '/apikeys/');
        break;
      case 'ecmr_apikey_create':
        result = await apiRequest('POST', '/apikeys/', { name: params.name });
        break;
      case 'ecmr_apikey_revoke':
        result = await apiRequest('DELETE', `/apikeys/${params.tempCode}`);
        break;

      // ============================================================
      // ACCOUNT TYPE
      // ============================================================
      case 'ecmr_account_type':
        result = await apiRequest('GET', '/auth/account_type');
        break;

      // ============================================================
      // PASSWORD RECOVERY
      // ============================================================
      case 'ecmr_recovery_request':
        result = await apiRequest('POST', '/auth/recovery', { email: params.email });
        break;
      case 'ecmr_recovery_reset':
        result = await apiRequest('POST', '/auth/recovery_password', { token: params.token, password: params.password });
        break;

      // ============================================================
      // ECMR ASSIGNMENTS
      // ============================================================
      case 'ecmr_trucker_info':
        result = await apiRequest('GET', `/ecmr/trucker-info/${params.serviceCode}`);
        break;
      case 'ecmr_trucker_assign':
        result = await apiRequest('PUT', `/ecmr/trucker-assign/${params.serviceCode}`, { truckerId: params.truckerId });
        break;
      case 'ecmr_company_info':
        result = await apiRequest('GET', `/ecmr/company-info/${params.serviceCode}`);
        break;
      case 'ecmr_customcode':
        result = await apiRequest('GET', `/ecmr/customcode/${params.serviceCode}`);
        break;

      default:
        throw new Error(`Unknown method: ${method}`);
    }

    // Enhance auth error messages with guidance
    if (result?.status === 401 || result?.status === 403) {
      const msg = result.message || '';
      if (msg.includes('NO_TOKEN') || msg.includes('token')) {
        result.guidance = 'Usa ecmr_auth_login para obtener token o crea una cuenta con ecmr_auth_register';
      }
    }

    return { jsonrpc: '2.0', id, result };
  } catch (error) {
    return { jsonrpc: '2.0', id, error: { code: -32601, message: error.message } };
  }
}

// Tool definitions
import { toolDefinitions } from './tools.js';

// Server startup
const PORT = process.env.PORT || 3100;

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
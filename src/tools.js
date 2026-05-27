/** Tool definitions for ECMR MCP */

export const toolDefinitions = [
  // AUTH
  { name: "ecmr_auth_login", description: "Login to ECMR API", inputSchema: { type: "object", properties: { email: { type: "string", description: "User email" }, password: { type: "string", description: "Password" } }, required: ["email", "password"] } },
  { name: "ecmr_auth_register", description: "Register new user", inputSchema: { type: "object", properties: { email: { type: "string" }, password: { type: "string" }, companyName: { type: "string" } }, required: ["email", "password", "companyName"] } },
  
  // ADDRESSES
  { name: "ecmr_addresses_list", description: "List addresses", inputSchema: { type: "object", properties: { limit: { type: "number" } } } },
  { name: "ecmr_addresses_create", description: "Create address", inputSchema: { type: "object", properties: { name: { type: "string" }, street: { type: "string" }, city: { type: "string" }, state: { type: "string" }, postal_code: { type: "string" }, country: { type: "string" }, company_name: { type: "string" } }, required: ["name", "street", "city", "company_name"] } },
  { name: "ecmr_addresses_update", description: "Update address", inputSchema: { type: "object", properties: { id: { type: "string" }, name: { type: "string" }, street: { type: "string" }, city: { type: "string" }, postalCode: { type: "string" } }, required: ["id"] } },
  { name: "ecmr_addresses_delete", description: "Delete address", inputSchema: { type: "object", properties: { id: { type: "string" } }, required: ["id"] } },
  
  // DRIVERS
  { name: "ecmr_drivers_list", description: "List drivers", inputSchema: { type: "object", properties: { limit: { type: "number" } } } },
  { name: "ecmr_drivers_create", description: "Create driver", inputSchema: { type: "object", properties: { name: { type: "string" }, email: { type: "string" }, phone: { type: "string" }, license: { type: "string" }, licenseType: { type: "string" } }, required: ["name", "phone"] } },
  { name: "ecmr_drivers_update", description: "Update driver", inputSchema: { type: "object", properties: { id: { type: "string" }, name: { type: "string" }, phone: { type: "string" } }, required: ["id"] } },
  { name: "ecmr_drivers_delete", description: "Delete driver", inputSchema: { type: "object", properties: { id: { type: "string" } }, required: ["id"] } },
  
  // VEHICLES
  { name: "ecmr_vehicles_list", description: "List vehicles", inputSchema: { type: "object", properties: { limit: { type: "number" } } } },
  { name: "ecmr_vehicles_create", description: "Create vehicle", inputSchema: { type: "object", properties: { plate: { type: "string" }, type: { type: "string" }, brand: { type: "string" }, model: { type: "string" }, capacity: { type: "number" } }, required: ["plate"] } },
  { name: "ecmr_vehicles_update", description: "Update vehicle", inputSchema: { type: "object", properties: { id: { type: "string" }, plate: { type: "string" }, type: { type: "string" } }, required: ["id"] } },
  { name: "ecmr_vehicles_delete", description: "Delete vehicle", inputSchema: { type: "object", properties: { id: { type: "string" } }, required: ["id"] } },
  
  // ECMR CORE
  { name: "ecmr_create", description: "Create eCMR (electronic consignment note)", inputSchema: { type: "object", properties: { senderCompanyName: { type: "string" }, senderCif: { type: "string" }, receiverCompanyName: { type: "string" }, receiverCif: { type: "string" }, fromAddress: { type: "string" }, fromPostalCode: { type: "string" }, fromCountry: { type: "string" }, toAddress: { type: "string" }, toPostalCode: { type: "string" }, toCountry: { type: "string" }, goodsDescription: { type: "string" }, packages: { type: "number" }, pallets: { type: "number" }, weight: { type: "number" } }, required: ["senderCompanyName", "receiverCompanyName", "fromAddress", "toAddress"] } },
  { name: "ecmr_get", description: "Get eCMR by service code", inputSchema: { type: "object", properties: { serviceCode: { type: "string" } }, required: ["serviceCode"] } },
  { name: "ecmr_list", description: "List eCMR documents", inputSchema: { type: "object", properties: { limit: { type: "number" } } } },
  { name: "ecmr_update", description: "Update eCMR", inputSchema: { type: "object", properties: { serviceCode: { type: "string" } }, required: ["serviceCode"] } },
  { name: "ecmr_delete", description: "Delete eCMR", inputSchema: { type: "object", properties: { serviceCode: { type: "string" } }, required: ["serviceCode"] } },
  { name: "ecmr_lock", description: "Lock eCMR (legally close)", inputSchema: { type: "object", properties: { serviceCode: { type: "string" } }, required: ["serviceCode"] } },
  
  // SIGNATURES
  { name: "ecmr_sign_sender", description: "Sign eCMR as sender", inputSchema: { type: "object", properties: { serviceCode: { type: "string" }, signature: { type: "string" } }, required: ["serviceCode", "signature"] } },
  { name: "ecmr_sign_pickup", description: "Sign eCMR pickup", inputSchema: { type: "object", properties: { serviceCode: { type: "string" }, signature: { type: "string" } }, required: ["serviceCode", "signature"] } },
  { name: "ecmr_sign_delivery", description: "Sign eCMR delivery", inputSchema: { type: "object", properties: { serviceCode: { type: "string" }, signature: { type: "string" } }, required: ["serviceCode", "signature"] } },
  { name: "ecmr_signatures_list", description: "List pending signatures", inputSchema: { type: "object" } },
  
  // QR / PDF
  { name: "ecmr_qr_generate", description: "Generate QR code for eCMR", inputSchema: { type: "object", properties: { serviceCode: { type: "string" } }, required: ["serviceCode"] } },
  { name: "ecmr_qr_validate", description: "Validate QR code", inputSchema: { type: "object", properties: { serviceCode: { type: "string" } }, required: ["serviceCode"] } },
  { name: "ecmr_pdf", description: "Get eCMR PDF", inputSchema: { type: "object", properties: { serviceCode: { type: "string" } }, required: ["serviceCode"] } },
  
  // FILE / ATTACHMENTS
  { name: "ecmr_file_upload", description: "Upload file to eCMR", inputSchema: { type: "object", properties: { serviceCode: { type: "string" }, fileData: { type: "string" }, fileName: { type: "string" } }, required: ["serviceCode", "fileData"] } },
  { name: "ecmr_file_download", description: "Download eCMR file", inputSchema: { type: "object", properties: { serviceCode: { type: "string" } }, required: ["serviceCode"] } },
  
  // SEND
  { name: "ecmr_send", description: "Send eCMR to receiver", inputSchema: { type: "object", properties: { serviceCode: { type: "string" } }, required: ["serviceCode"] } },

  // ============================================================
  // DECA - Documento Electrónico de Control de Aduanas
  // ============================================================
  
  // DECA List/Create/Get
  { name: "deca_list", description: "List DECA documents", inputSchema: { type: "object", properties: { limit: { type: "number" }, estado: { type: "string", enum: ["generado", "enviado_ministerio", "comprobado_recibido", "cerrado"] }, company: { type: "string" } } } },
  { name: "deca_create", description: "Create DECA manually", inputSchema: { type: "object", properties: { company: { type: "string" }, service_code: { type: "string" }, sistema: { type: "string", enum: ["qr", "codigo_numerico", "ambos"] } }, required: ["company"] } },
  { name: "deca_get", description: "Get DECA by service code", inputSchema: { type: "object", properties: { serviceCode: { type: "string" } }, required: ["serviceCode"] } },
  
  // DECA Documents
  { name: "deca_documento_attach", description: "Attach document to DECA", inputSchema: { type: "object", properties: { serviceCode: { type: "string" }, tipo: { type: "string", enum: ["cmr", "licencia", "seguro", "tacografo", "adr", "otros"] } }, required: ["serviceCode", "tipo"] } },
  
  // DECA QR (Sistema 2)
  { name: "deca_qr_generate", description: "Generate QR code for DECA", inputSchema: { type: "object", properties: { serviceCode: { type: "string" } }, required: ["serviceCode"] } },
  
  // DECA PDF
  { name: "deca_pdf_download", description: "Generate and download PDF/A for DECA", inputSchema: { type: "object", properties: { serviceCode: { type: "string" } }, required: ["serviceCode"] } },
  
  // DECA Signature
  { name: "deca_signature_register", description: "Register electronic signature for DECA", inputSchema: { type: "object", properties: { serviceCode: { type: "string" }, signature: { type: "string" } }, required: ["serviceCode", "signature"] } },
  
  // DECA Integrity
  { name: "deca_integrity_verify", description: "Verify DECA integrity via hash", inputSchema: { type: "object", properties: { serviceCode: { type: "string" } }, required: ["serviceCode"] } },
  
  // DECA Ministry
  { name: "deca_send_ministerio", description: "Send DECA to Ministry of Transport", inputSchema: { type: "object", properties: { serviceCode: { type: "string" } }, required: ["serviceCode"] } },
  
  // DECA Audit
  { name: "deca_audit_log", description: "Get audit log for DECA", inputSchema: { type: "object", properties: { serviceCode: { type: "string" } }, required: ["serviceCode"] } },
  
  // DECA Stats
  { name: "deca_estadisticas", description: "Get DECA statistics", inputSchema: { type: "object" } },
  
  // DECA Public (no auth required)
  { name: "deca_public_validate", description: "Validate DECA by numeric code (Sistema 1)", inputSchema: { type: "object", properties: { codigo: { type: "string" } }, required: ["codigo"] } },
  { name: "deca_public_view", description: "View DECA publicly via QR token (Sistema 2)", inputSchema: { type: "object", properties: { serviceCode: { type: "string" }, token: { type: "string" } }, required: ["serviceCode"] } },

  // ============================================================
  // BILLING - Invoice management
  // ============================================================
  { name: "ecmr_invoices_list", description: "List invoices", inputSchema: { type: "object", properties: { limit: { type: "number" } } } },
  { name: "ecmr_invoices_get", description: "Get invoice by ID", inputSchema: { type: "object", properties: { id: { type: "string" } }, required: ["id"] } },
  { name: "ecmr_invoices_create", description: "Create invoice", inputSchema: { type: "object", properties: { amount: { type: "number" }, description: { type: "string" } } } },
  { name: "ecmr_invoices_pdf", description: "Get invoice PDF", inputSchema: { type: "object", properties: { id: { type: "string" } }, required: ["id"] } },

  // ============================================================
  // ISSUES - Problem reporting
  // ============================================================
  { name: "ecmr_issues_list", description: "List issues", inputSchema: { type: "object", properties: { limit: { type: "number" } } } },
  { name: "ecmr_issues_create", description: "Create issue", inputSchema: { type: "object", properties: { title: { type: "string" }, description: { type: "string" }, ecmr: { type: "string" } }, required: ["title"] } },
  { name: "ecmr_issues_get", description: "Get issue by ID", inputSchema: { type: "object", properties: { id: { type: "string" } }, required: ["id"] } },
  { name: "ecmr_issues_update", description: "Update issue", inputSchema: { type: "object", properties: { id: { type: "string" }, status: { type: "string" } }, required: ["id"] } },
  { name: "ecmr_issues_delete", description: "Delete issue", inputSchema: { type: "object", properties: { id: { type: "string" } }, required: ["id"] } },

  // ============================================================
  // NOTIFICATIONS
  // ============================================================
  { name: "ecmr_notifications_list", description: "List notifications", inputSchema: { type: "object", properties: { limit: { type: "number" } } } },
  { name: "ecmr_notifications_mark_read", description: "Mark notification as read", inputSchema: { type: "object", properties: { id: { type: "string" } }, required: ["id"] } },
  { name: "ecmr_notifications_delete", description: "Delete notification", inputSchema: { type: "object", properties: { id: { type: "string" } }, required: ["id"] } },

  // ============================================================
  // USERS / PROFILE
  // ============================================================
  { name: "ecmr_users_list", description: "List company users", inputSchema: { type: "object", properties: { limit: { type: "number" } } } },
  { name: "ecmr_users_get", description: "Get user by ID", inputSchema: { type: "object", properties: { id: { type: "string" } }, required: ["id"] } },
  { name: "ecmr_profile_get", description: "Get current user profile", inputSchema: { type: "object" } },
  { name: "ecmr_profile_update", description: "Update current user profile", inputSchema: { type: "object", properties: { name: { type: "string" }, phone: { type: "string" } } } },
  { name: "ecmr_logout", description: "Logout and clear token", inputSchema: { type: "object" } },

  // ============================================================
  // COMPANY DATA
  // ============================================================
  { name: "ecmr_company_get", description: "Get company data", inputSchema: { type: "object" } },
  { name: "ecmr_company_update", description: "Update company data", inputSchema: { type: "object", properties: { name: { type: "string" }, cif: { type: "string" }, address: { type: "string" } } } },
  { name: "ecmr_company_logo", description: "Upload company logo", inputSchema: { type: "object", properties: { logo: { type: "string" } }, required: ["logo"] } },
];
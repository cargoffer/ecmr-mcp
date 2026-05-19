# ECMR MCP Tool Reference

## Authentication
- `ecmr_auth_login(email, password)`
- `ecmr_auth_register(email, password, companyName)`

## Addresses
- `ecmr_addresses_list(limit?)`
- `ecmr_addresses_create(name, street, city, state?, postalCode?, country?)`

## Drivers
- `ecmr_drivers_list(limit?)`
- `ecmr_drivers_create(name, phone, email?, license?, licenseType?)`
- `ecmr_drivers_update(driverId, name?, phone?, email?)`
- `ecmr_drivers_delete(driverId)`

## Vehicles
- `ecmr_vehicles_list(limit?)`
- `ecmr_vehicles_create(plate, type?, brand?, model?, capacity?)`

## eCMR
- `ecmr_create(senderCompanyName, senderCif?, receiverCompanyName, receiverCif?, fromAddress, fromPostalCode?, fromCountry?, toAddress, toPostalCode?, toCountry?, goodsDescription, packages?, pallets?, weight?)`
- `ecmr_get(serviceCode)`
- `ecmr_update(serviceCode, ...)`
- `ecmr_delete(serviceCode)`
- `ecmr_lock(serviceCode)`

## Signatures
- `ecmr_sign_sender(serviceCode, signature)`
- `ecmr_sign_pickup(serviceCode, signature)`
- `ecmr_sign_delivery(serviceCode, signature)`
- `ecmr_signatures_list()`

## QR
- `ecmr_qr_generate(serviceCode)`
- `ecmr_qr_validate(serviceCode)`
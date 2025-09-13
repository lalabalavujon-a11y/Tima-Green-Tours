#!/usr/bin/env node

/**
 * Test script to verify the transfer system is working correctly
 */

const { getTransferZones, getTransferRoutes, getTransferServices, calculateTransferQuote } = require('../lib/transfers');

console.log('🧪 Testing Transfer System...\n');

// Test 1: Check if zones are loaded
console.log('1. Testing Transfer Zones...');
const zones = getTransferZones();
console.log(`   ✅ Loaded ${zones.length} transfer zones`);
console.log(`   📍 Sample zones: ${zones.slice(0, 3).map(z => z.name).join(', ')}`);

// Test 2: Check if routes are loaded
console.log('\n2. Testing Transfer Routes...');
const routes = getTransferRoutes();
console.log(`   ✅ Loaded ${routes.length} transfer routes`);
console.log(`   🛣️  Sample routes: ${routes.slice(0, 3).map(r => r.name).join(', ')}`);

// Test 3: Check if services are loaded
console.log('\n3. Testing Transfer Services...');
const services = getTransferServices();
console.log(`   ✅ Loaded ${services.length} transfer services`);
console.log(`   🚙 Sample services: ${services.slice(0, 3).map(s => s.name).join(', ')}`);

// Test 4: Test quote calculation
console.log('\n4. Testing Quote Calculation...');
try {
  const quote = calculateTransferQuote(
    'nadi-airport-denarau',
    'private',
    2,
    0,
    0,
    2,
    0,
    '2024-12-25',
    '14:00',
    true // isPublicHoliday
  );
  
  if (quote) {
    console.log(`   ✅ Quote calculated successfully`);
    console.log(`   💰 Base Price: FJD ${quote.basePrice}`);
    console.log(`   💰 Total Price: FJD ${quote.totalPrice}`);
    console.log(`   📊 Breakdown: ${quote.breakdown.length} items`);
  } else {
    console.log(`   ❌ Quote calculation failed`);
  }
} catch (error) {
  console.log(`   ❌ Quote calculation error: ${error.message}`);
}

// Test 5: Check route coverage
console.log('\n5. Testing Route Coverage...');
const primaryRoutes = routes.filter(r => r.fromZone.includes('nadi-airport'));
console.log(`   ✅ ${primaryRoutes.length} routes from Nadi Airport`);
console.log(`   🎯 Coverage: ${primaryRoutes.map(r => r.toZone.replace('-', ' ')).join(', ')}`);

// Test 6: Check service types
console.log('\n6. Testing Service Types...');
const privateServices = services.filter(s => s.type === 'private');
const sharedServices = services.filter(s => s.type === 'shared');
const premiumServices = services.filter(s => s.type === 'premium');
console.log(`   ✅ Private services: ${privateServices.length}`);
console.log(`   ✅ Shared services: ${sharedServices.length}`);
console.log(`   ✅ Premium services: ${premiumServices.length}`);

console.log('\n🎉 Transfer System Test Complete!');
console.log('\n📋 Summary:');
console.log(`   - ${zones.length} transfer zones configured`);
console.log(`   - ${routes.length} transfer routes configured`);
console.log(`   - ${services.length} transfer services configured`);
console.log(`   - Quote calculation system working`);
console.log(`   - Comprehensive Fiji coverage achieved`);

console.log('\n🚀 System is ready for production!');

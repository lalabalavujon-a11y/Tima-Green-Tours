#!/usr/bin/env node

/**
 * Script to create all Stripe products for transfer services
 * Based on the comprehensive transfer system from the recce report
 */

const Stripe = require('stripe');
const { generateBulkStripeProducts } = require('../lib/stripe/transferProducts');

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-12-18.acacia',
});

async function createStripeProducts() {
  try {
    console.log('🚀 Starting Stripe product creation for transfer services...');
    
    const bulkProducts = generateBulkStripeProducts();
    
    // Create main transfer products
    console.log(`📦 Creating ${bulkProducts.products.length} transfer products...`);
    
    const createdProducts = [];
    
    for (const productData of bulkProducts.products) {
      try {
        // Create product
        const product = await stripe.products.create(productData.product);
        console.log(`✅ Created product: ${product.name} (${product.id})`);
        
        // Create price
        const price = await stripe.prices.create({
          ...productData.price,
          product: product.id
        });
        console.log(`💰 Created price: FJD ${productData.price.unit_amount / 100} (${price.id})`);
        
        createdProducts.push({
          productId: product.id,
          priceId: price.id,
          name: product.name,
          price: productData.price.unit_amount / 100
        });
        
        // Small delay to avoid rate limits
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error) {
        console.error(`❌ Error creating product ${productData.product.name}:`, error.message);
      }
    }
    
    // Create surcharge products
    console.log(`📦 Creating ${bulkProducts.surcharges.length} surcharge products...`);
    
    const createdSurcharges = [];
    
    for (const surchargeData of bulkProducts.surcharges) {
      try {
        // Create product
        const product = await stripe.products.create(surchargeData.product);
        console.log(`✅ Created surcharge product: ${product.name} (${product.id})`);
        
        // Create price
        const price = await stripe.prices.create({
          ...surchargeData.price,
          product: product.id
        });
        console.log(`💰 Created surcharge price: FJD ${surchargeData.price.unit_amount / 100} (${price.id})`);
        
        createdSurcharges.push({
          productId: product.id,
          priceId: price.id,
          name: product.name,
          price: surchargeData.price.unit_amount / 100
        });
        
        // Small delay to avoid rate limits
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error) {
        console.error(`❌ Error creating surcharge product ${surchargeData.product.name}:`, error.message);
      }
    }
    
    // Generate summary
    console.log('\n🎉 Stripe product creation completed!');
    console.log(`📊 Summary:`);
    console.log(`   - Transfer products created: ${createdProducts.length}`);
    console.log(`   - Surcharge products created: ${createdSurcharges.length}`);
    console.log(`   - Total products created: ${createdProducts.length + createdSurcharges.length}`);
    
    // Generate payment links configuration
    console.log('\n📝 Payment Links Configuration:');
    console.log('Copy the following to your paymentLinks.ts file:');
    
    const paymentLinksConfig = generatePaymentLinksConfig(createdProducts, createdSurcharges);
    console.log(paymentLinksConfig);
    
    // Save to file
    const fs = require('fs');
    const path = require('path');
    
    const outputPath = path.join(__dirname, '../stripe-products-created.json');
    fs.writeFileSync(outputPath, JSON.stringify({
      createdProducts,
      createdSurcharges,
      paymentLinksConfig,
      createdAt: new Date().toISOString()
    }, null, 2));
    
    console.log(`\n💾 Configuration saved to: ${outputPath}`);
    
  } catch (error) {
    console.error('❌ Error creating Stripe products:', error);
    process.exit(1);
  }
}

function generatePaymentLinksConfig(products, surcharges) {
  const transferLinks = {};
  const surchargeLinks = {};
  
  // Group products by route
  products.forEach(product => {
    const routeId = product.name.split(' - ')[1]?.toLowerCase().replace(/\s+/g, '-');
    const serviceType = product.name.split(' - ')[0]?.toLowerCase().split(' ')[0];
    
    if (routeId && serviceType) {
      if (!transferLinks[routeId]) {
        transferLinks[routeId] = {};
      }
      transferLinks[routeId][serviceType] = `https://buy.stripe.com/test_${product.priceId}`;
    }
  });
  
  // Group surcharges
  surcharges.forEach(surcharge => {
    const surchargeType = surcharge.name.toLowerCase().replace(/\s+/g, '-').replace('surcharge', 'surcharge');
    surchargeLinks[surchargeType] = `https://buy.stripe.com/test_${surcharge.priceId}`;
  });
  
  return {
    transferPaymentLinks: transferLinks,
    surchargePaymentLinks: surchargeLinks
  };
}

// Run the script
if (require.main === module) {
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('❌ STRIPE_SECRET_KEY environment variable is required');
    process.exit(1);
  }
  
  createStripeProducts();
}

module.exports = { createStripeProducts };

import type { 
  TransferZone, 
  TransferRoute, 
  TransferPricing, 
  TransferService, 
  TransferBooking,
  TransferQuote,
  TransferSearchFilters,
  PublicHoliday,
  IslandTransfer,
  ResortTransfer
} from '@/lib/types/transfer';
import { 
  transferZones, 
  transferRoutes, 
  transferPricing, 
  transferServices, 
  publicHolidays,
  islandTransfers,
  resortTransfers
} from '@/lib/data/transfers';

// Utility functions for transfer operations
export function getTransferZones(): TransferZone[] {
  return transferZones;
}

export function getTransferZoneById(id: string): TransferZone | null {
  return transferZones.find(zone => zone.id === id) || null;
}

export function getTransferRoutes(): TransferRoute[] {
  return transferRoutes;
}

export function getTransferRouteById(id: string): TransferRoute | null {
  return transferRoutes.find(route => route.id === id) || null;
}

export function getTransferRoutesByZone(zoneId: string): TransferRoute[] {
  return transferRoutes.filter(route => 
    route.fromZone === zoneId || route.toZone === zoneId
  );
}

export function getTransferServices(): TransferService[] {
  return transferServices;
}

export function getTransferServiceById(id: string): TransferService | null {
  return transferServices.find(service => service.id === id) || null;
}

export function getTransferPricing(): TransferPricing[] {
  return transferPricing;
}

export function getTransferPricingByRoute(routeId: string): TransferPricing[] {
  return transferPricing.filter(pricing => pricing.routeId === routeId);
}

export function getTransferPricingByRouteAndService(routeId: string, serviceType: 'private' | 'shared' | 'premium'): TransferPricing | null {
  return transferPricing.find(pricing => 
    pricing.routeId === routeId && pricing.serviceType === serviceType
  ) || null;
}

// Pricing calculation functions
export function calculateTransferQuote(
  routeId: string,
  serviceType: 'private' | 'shared' | 'premium',
  passengers: number,
  children: number,
  infants: number,
  luggage: number,
  childSeats: number,
  date: string,
  time: string,
  isPublicHoliday: boolean = false
): TransferQuote | null {
  const pricing = getTransferPricingByRouteAndService(routeId, serviceType);
  if (!pricing) return null;

  const basePrice = pricing.basePrice;
  let totalPrice = basePrice;
  const surcharges: any = {};
  const discounts: any = {};
  const breakdown: Array<{ item: string; amount: number; description: string }> = [];

  // Base price
  breakdown.push({
    item: 'Base Transfer',
    amount: basePrice,
    description: `${serviceType.charAt(0).toUpperCase() + serviceType.slice(1)} transfer`
  });

  // After hours surcharge (22:00-05:29)
  const hour = parseInt(time.split(':')[0]);
  const isAfterHours = hour >= 22 || hour < 5;
  if (isAfterHours) {
    surcharges.afterHours = pricing.pricingRules.afterHoursSurcharge;
    totalPrice += surcharges.afterHours;
    breakdown.push({
      item: 'After Hours Surcharge',
      amount: surcharges.afterHours,
      description: 'Transfer between 22:00-05:29'
    });
  }

  // Public holiday surcharge
  if (isPublicHoliday) {
    surcharges.publicHoliday = pricing.pricingRules.publicHolidaySurcharge;
    totalPrice += surcharges.publicHoliday;
    breakdown.push({
      item: 'Public Holiday Surcharge',
      amount: surcharges.publicHoliday,
      description: 'Public holiday surcharge'
    });
  }

  // Child seat surcharge
  if (childSeats > 0) {
    surcharges.childSeats = childSeats * pricing.pricingRules.childSeatSurcharge;
    totalPrice += surcharges.childSeats;
    breakdown.push({
      item: 'Child Seats',
      amount: surcharges.childSeats,
      description: `${childSeats} child seat(s) @ FJD ${pricing.pricingRules.childSeatSurcharge} each`
    });
  }

  // Extra luggage surcharge
  const includedLuggage = pricing.capacity.maxLuggage;
  const extraLuggage = Math.max(0, luggage - includedLuggage);
  if (extraLuggage > 0) {
    surcharges.luggage = extraLuggage * pricing.pricingRules.luggageSurcharge;
    totalPrice += surcharges.luggage;
    breakdown.push({
      item: 'Extra Luggage',
      amount: surcharges.luggage,
      description: `${extraLuggage} extra bag(s) @ FJD ${pricing.pricingRules.luggageSurcharge} each`
    });
  }

  // Group discount
  if (pricing.pricingRules.groupDiscount && passengers >= pricing.pricingRules.groupDiscount.minPassengers) {
    const discountAmount = (totalPrice * pricing.pricingRules.groupDiscount.discountPercent) / 100;
    discounts.group = discountAmount;
    totalPrice -= discountAmount;
    breakdown.push({
      item: 'Group Discount',
      amount: -discountAmount,
      description: `${pricing.pricingRules.groupDiscount.discountPercent}% discount for ${passengers}+ passengers`
    });
  }

  // Valid for 30 minutes
  const validUntil = new Date(Date.now() + 30 * 60 * 1000).toISOString();

  return {
    routeId,
    serviceId: `${routeId}-${serviceType}`,
    basePrice,
    surcharges,
    discounts,
    totalPrice: Math.round(totalPrice * 100) / 100, // Round to 2 decimal places
    currency: pricing.currency,
    breakdown,
    validUntil
  };
}

// Date and time utilities
export function isPublicHoliday(date: string): boolean {
  const checkDate = new Date(date);
  return publicHolidays.some(holiday => {
    const holidayDate = new Date(holiday.date);
    return checkDate.getDate() === holidayDate.getDate() &&
           checkDate.getMonth() === holidayDate.getMonth() &&
           checkDate.getFullYear() === holidayDate.getFullYear();
  });
}

export function isAfterHours(time: string): boolean {
  const hour = parseInt(time.split(':')[0]);
  return hour >= 22 || hour < 5;
}

export function getAvailableTimeSlots(
  routeId: string,
  serviceId: string,
  date: string
): Array<{ time: string; available: boolean; price: number; capacity: number; remainingSeats: number }> {
  const route = getTransferRouteById(routeId);
  const service = getTransferServiceById(serviceId);
  
  if (!route || !service) return [];
  
  const pricing = getTransferPricingByRouteAndService(routeId, service.type);
  
  if (!pricing) return [];

  const timeSlots = [];
  const startHour = parseInt(route.operatingHours.start.split(':')[0]);
  const endHour = parseInt(route.operatingHours.end.split(':')[0]);

  for (let hour = startHour; hour < endHour; hour++) {
    const time = `${hour.toString().padStart(2, '0')}:00`;
    const isAfterHoursSlot = isAfterHours(time);
    const isHoliday = isPublicHoliday(date);
    
    let price = pricing.basePrice;
    if (isAfterHoursSlot) price += pricing.pricingRules.afterHoursSurcharge;
    if (isHoliday) price += pricing.pricingRules.publicHolidaySurcharge;

    timeSlots.push({
      time,
      available: true, // In real implementation, check against bookings
      price: Math.round(price * 100) / 100,
      capacity: pricing.capacity.maxPassengers,
      remainingSeats: pricing.capacity.maxPassengers // In real implementation, calculate from bookings
    });
  }

  return timeSlots;
}

// Search and filter functions
export function searchTransfers(filters: TransferSearchFilters): TransferRoute[] {
  let results = transferRoutes.filter(route => route.isActive);

  if (filters.fromZone) {
    results = results.filter(route => route.fromZone === filters.fromZone);
  }

  if (filters.toZone) {
    results = results.filter(route => route.toZone === filters.toZone);
  }

  if (filters.serviceType) {
    const pricing = transferPricing.filter(p => p.serviceType === filters.serviceType);
    const routeIds = pricing.map(p => p.routeId);
    results = results.filter(route => routeIds.includes(route.id));
  }

  if (filters.passengers) {
    results = results.filter(route => {
      const pricing = getTransferPricingByRoute(route.id);
      return pricing.some(p => p.capacity.maxPassengers >= filters.passengers!);
    });
  }

  return results;
}

// Booking management functions
export function generateBookingReference(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `TGT-${timestamp}-${random}`.toUpperCase();
}

export function validateBookingData(bookingData: Partial<TransferBooking>): string[] {
  const errors: string[] = [];

  if (!bookingData.customer?.name) errors.push('Customer name is required');
  if (!bookingData.customer?.email) errors.push('Customer email is required');
  if (!bookingData.customer?.phone) errors.push('Customer phone is required');
  if (!bookingData.transfer?.routeId) errors.push('Transfer route is required');
  if (!bookingData.transfer?.serviceId) errors.push('Transfer service is required');
  if (!bookingData.transfer?.date) errors.push('Transfer date is required');
  if (!bookingData.transfer?.time) errors.push('Transfer time is required');
  if (!bookingData.transfer?.passengers || bookingData.transfer.passengers < 1) {
    errors.push('At least 1 passenger is required');
  }

  // Validate route exists
  const route = getTransferRouteById(bookingData.transfer?.routeId || '');
  if (!route) errors.push('Invalid transfer route');

  // Validate service exists
  const service = getTransferServiceById(bookingData.transfer?.serviceId || '');
  if (!service) errors.push('Invalid transfer service');

  // Validate capacity
  if (route && service) {
    const pricing = getTransferPricingByRouteAndService(route.id, service.type);
    if (pricing && bookingData.transfer?.passengers && bookingData.transfer.passengers > pricing.capacity.maxPassengers) {
      errors.push(`Maximum ${pricing.capacity.maxPassengers} passengers allowed for this service`);
    }
  }

  return errors;
}

// Island and resort specific functions
export function getIslandTransfers(): IslandTransfer[] {
  return islandTransfers;
}

export function getIslandTransferById(islandId: string): IslandTransfer | null {
  return islandTransfers.find(island => island.islandId === islandId) || null;
}

export function getResortTransfers(): ResortTransfer[] {
  return resortTransfers;
}

export function getResortTransferById(resortId: string): ResortTransfer | null {
  return resortTransfers.find(resort => resort.resortId === resortId) || null;
}

export function getPreferredResortTransfers(): ResortTransfer[] {
  return resortTransfers.filter(resort => resort.isPreferredPartner);
}

// Zone detection and mapping
export function findNearestZone(lat: number, lng: number): TransferZone | null {
  let nearestZone: TransferZone | null = null;
  let minDistance = Infinity;

  for (const zone of transferZones) {
    const distance = calculateDistance(lat, lng, zone.coordinates.lat, zone.coordinates.lng);
    if (distance < minDistance && distance <= zone.radius) {
      minDistance = distance;
      nearestZone = zone;
    }
  }

  return nearestZone;
}

function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Service availability checking
export function isServiceAvailable(
  routeId: string,
  serviceId: string,
  date: string,
  time: string
): boolean {
  const route = getTransferRouteById(routeId);
  const service = getTransferServiceById(serviceId);

  if (!route || !service) return false;

  // Check if route is active
  if (!route.isActive) return false;

  // Check operating hours
  const hour = parseInt(time.split(':')[0]);
  const startHour = parseInt(route.operatingHours.start.split(':')[0]);
  const endHour = parseInt(route.operatingHours.end.split(':')[0]);

  if (hour < startHour || hour >= endHour) return false;

  // Check if service type is available for route
  const pricing = getTransferPricingByRouteAndService(routeId, service.type);
  if (!pricing) return false;

  // Check seasonal availability
  if (route.seasonalAvailability) {
    const checkDate = new Date(date);
    const startDate = new Date(`${checkDate.getFullYear()}-${route.seasonalAvailability.start}`);
    const endDate = new Date(`${checkDate.getFullYear()}-${route.seasonalAvailability.end}`);
    
    if (checkDate < startDate || checkDate > endDate) return false;
  }

  return true;
}

// Dynamic pricing for shared services
export function getDynamicSharedPricing(
  routeId: string,
  date: string,
  time: string
): number {
  const pricing = getTransferPricingByRouteAndService(routeId, 'shared');
  if (!pricing) return 0;

  let basePrice = pricing.basePrice;

  // Apply after hours surcharge
  if (isAfterHours(time)) {
    basePrice += pricing.pricingRules.afterHoursSurcharge;
  }

  // Apply public holiday surcharge
  if (isPublicHoliday(date)) {
    basePrice += pricing.pricingRules.publicHolidaySurcharge;
  }

  // In a real implementation, you might apply demand-based pricing here
  // For now, return the base price with surcharges
  return Math.round(basePrice * 100) / 100;
}

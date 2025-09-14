import { getProvider } from '../providers/provider.factory';
import { FlightSearchRequest } from '../providers/provider.types';
import { cacheGet, cacheSet, key } from '../utils/cache';

export async function searchFlightsSvc(payload: FlightSearchRequest) {
  const k = key('flights', payload.origin, payload.destination, payload.departDate, payload.returnDate, payload.cabin, payload.adults, payload.children, payload.infants);
  const hit = await cacheGet<any[]>(k);
  if (hit) return hit;
  const data = await getProvider().searchFlights(payload);
  await cacheSet(k, data);
  return data;
}
import { getProvider } from '../providers/provider.factory';
import { cacheGet, cacheSet, key } from '../utils/cache';

export async function searchAirportsSvc(query: string) {
  const k = key('airports', query);
  const hit = await cacheGet<any[]>(k);
  if (hit) return hit;
  const data = await getProvider().searchAirports(query);
  await cacheSet(k, data);
  return data;
}
import Redis from 'ioredis';
import { config } from '../config';
import { logger } from '../logger';

export interface CacheClient {
  get(key: string): Promise<string | null>;
  set(key: string, value: string, ttl?: number): Promise<void>;
  del(key: string): Promise<void>;
  exists(key: string): Promise<boolean>;
  expire(key: string, ttl: number): Promise<void>;
}

class RedisCacheClient implements CacheClient {
  private client: Redis;

  constructor() {
    if (!config.REDIS_URL) {
      throw new Error('REDIS_URL is required for Redis cache client');
    }

    this.client = new Redis(config.REDIS_URL, {
      retryDelayOnFailover: 100,
      maxRetriesPerRequest: 3,
      lazyConnect: true,
    });

    this.client.on('error', (error) => {
      logger.error({ error }, 'Redis connection error');
    });

    this.client.on('connect', () => {
      logger.info('Redis connected successfully');
    });
  }

  async get(key: string): Promise<string | null> {
    try {
      const fullKey = `${config.REDIS_NAMESPACE}:${key}`;
      return await this.client.get(fullKey);
    } catch (error) {
      logger.error({ error, key }, 'Redis get error');
      return null;
    }
  }

  async set(key: string, value: string, ttl: number = config.REDIS_TTL_SECONDS): Promise<void> {
    try {
      const fullKey = `${config.REDIS_NAMESPACE}:${key}`;
      await this.client.setex(fullKey, ttl, value);
    } catch (error) {
      logger.error({ error, key }, 'Redis set error');
    }
  }

  async del(key: string): Promise<void> {
    try {
      const fullKey = `${config.REDIS_NAMESPACE}:${key}`;
      await this.client.del(fullKey);
    } catch (error) {
      logger.error({ error, key }, 'Redis delete error');
    }
  }

  async exists(key: string): Promise<boolean> {
    try {
      const fullKey = `${config.REDIS_NAMESPACE}:${key}`;
      const result = await this.client.exists(fullKey);
      return result === 1;
    } catch (error) {
      logger.error({ error, key }, 'Redis exists error');
      return false;
    }
  }

  async expire(key: string, ttl: number): Promise<void> {
    try {
      const fullKey = `${config.REDIS_NAMESPACE}:${key}`;
      await this.client.expire(fullKey, ttl);
    } catch (error) {
      logger.error({ error, key }, 'Redis expire error');
    }
  }

  async disconnect(): Promise<void> {
    await this.client.quit();
  }
}

class MemoryCacheClient implements CacheClient {
  private cache = new Map<string, { value: string; expires: number }>();

  async get(key: string): Promise<string | null> {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() > item.expires) {
      this.cache.delete(key);
      return null;
    }

    return item.value;
  }

  async set(key: string, value: string, ttl: number = config.REDIS_TTL_SECONDS): Promise<void> {
    const expires = Date.now() + ttl * 1000;
    this.cache.set(key, { value, expires });
  }

  async del(key: string): Promise<void> {
    this.cache.delete(key);
  }

  async exists(key: string): Promise<boolean> {
    const item = this.cache.get(key);
    if (!item) return false;

    if (Date.now() > item.expires) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  async expire(key: string, ttl: number): Promise<void> {
    const item = this.cache.get(key);
    if (item) {
      item.expires = Date.now() + ttl * 1000;
    }
  }
}

let cacheClient: CacheClient | null = null;

export function getCacheClient(): CacheClient {
  if (!cacheClient) {
    if (config.TGT_ENABLE_CACHE && config.REDIS_URL) {
      try {
        cacheClient = new RedisCacheClient();
        logger.info('Using Redis cache client');
      } catch (error) {
        logger.warn({ error }, 'Failed to initialize Redis cache, falling back to memory cache');
        cacheClient = new MemoryCacheClient();
      }
    } else {
      cacheClient = new MemoryCacheClient();
      if (config.NODE_ENV === 'development') {
        logger.info('Using memory cache client (development mode)');
      }
    }
  }

  return cacheClient;
}

export async function withCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl?: number
): Promise<T> {
  const cache = getCacheClient();
  
  try {
    const cached = await cache.get(key);
    if (cached) {
      logger.debug({ key }, 'Cache hit');
      return JSON.parse(cached);
    }
  } catch (error) {
    logger.warn({ error, key }, 'Cache get error, proceeding without cache');
  }

  logger.debug({ key }, 'Cache miss, fetching data');
  const data = await fetcher();

  try {
    await cache.set(key, JSON.stringify(data), ttl);
  } catch (error) {
    logger.warn({ error, key }, 'Cache set error, data not cached');
  }

  return data;
}

export function generateCacheKey(prefix: string, ...parts: (string | number)[]): string {
  return `${prefix}:${parts.join(':')}`;
}

export async function invalidateCache(pattern: string): Promise<void> {
  const cache = getCacheClient();
  
  if (cache instanceof RedisCacheClient) {
    // Redis supports pattern-based deletion
    const keys = await cache.client.keys(`${config.REDIS_NAMESPACE}:${pattern}`);
    if (keys.length > 0) {
      await cache.client.del(...keys);
    }
  } else {
    // Memory cache - simple implementation
    const memoryCache = cache as MemoryCacheClient;
    for (const [key] of memoryCache.cache) {
      if (key.includes(pattern)) {
        await memoryCache.del(key);
      }
    }
  }
}

export async function cacheDel(key: string) {
  if (!cacheClient) return;
  await cacheClient.del(`${config.REDIS_NAMESPACE}:${key}`);
}

export function key(...parts: (string|number|undefined|null)[]) {
  return parts.filter(Boolean).join(':').toLowerCase();
}

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { config } from './config';
import { logger, createRequestLogger } from './logger';
import { errorHandler, notFoundHandler } from './middleware/error.middleware';
import { defaultRateLimit } from './middleware/rateLimit.middleware';

// Import routes
import healthRoutes from './routes/health.route';
import airportsRoutes from './routes/airports.route';
import flightsRoutes from './routes/flights.route';
import bookingsRoutes from './routes/bookings.route';
import ordersRoutes from './routes/orders.route';
import webhooksRoutes from './routes/webhooks.route';
import duffelWebhooksRoutes from './routes/duffel.webhooks.route';
import metaRoutes from './routes/meta.route';
import adminRoute from './routes/admin.route';

// Import OpenAPI spec
import swaggerUi from 'swagger-ui-express';
import fs from 'node:fs';
import path from 'node:path';
const openapiPath = path.join(process.cwd(), 'src', 'docs', 'openapi-simple.yaml');
const openapiDoc = fs.readFileSync(openapiPath, 'utf8');

export function createApp(): express.Application {
  const app = express();

  // Trust proxy for accurate IP addresses
  app.set('trust proxy', 1);

  // Security middleware
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
    crossOriginEmbedderPolicy: false,
  }));

  // CORS configuration
  const corsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
      if (!origin) {
        // Allow requests with no origin (mobile apps, etc.)
        return callback(null, true);
      }

      const allowedOrigins = config.CORS_ORIGIN === '*' 
        ? ['*'] 
        : config.CORS_ORIGIN.split(',').map(o => o.trim());

      if (allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-ID'],
    exposedHeaders: ['X-Request-ID'],
  };

  app.use(cors(corsOptions));

  // Body parsing middleware
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Request logging middleware
  app.use(createRequestLogger);

  // Global rate limiting
  app.use(defaultRateLimit);

  // API Documentation
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(undefined, { swaggerOptions: { url: '/openapi.json' } }));
  app.get('/openapi.json', (_req, res) => {
    // naive YAML→JSON parse via YAML pkg to avoid bundling here; or prebuild step.
    const yaml = require('yaml');
    res.json(yaml.parse(openapiDoc));
  });

  // Health check routes (no rate limiting)
  app.use('/', healthRoutes);

  // API routes
  app.use('/', airportsRoutes);
  app.use('/', flightsRoutes);
  app.use('/', bookingsRoutes);
  app.use('/', webhooksRoutes);
  app.use('/', metaRoutes);
  app.use('/', ordersRoutes);
  app.use('/', duffelWebhooksRoutes);
  app.use(adminRoute);

  // Root endpoint
  app.get('/', (req, res) => {
    res.json({
      success: true,
      message: 'TGT Flight Search API',
      version: '1.0.0',
      documentation: '/docs',
      endpoints: {
        health: '/health',
        airports: '/v1/airports',
        flights: '/v1/flights',
        bookings: '/v1/bookings',
        webhooks: '/v1/webhooks',
        meta: '/v1/meta',
        payments: '/v1/payments',
        orders: '/v1/orders',
        offers: '/v1/offers',
      },
      timestamp: new Date().toISOString(),
      requestId: req.headers['x-request-id'],
    });
  });

  // 404 handler
  app.use(notFoundHandler);

  // Error handling middleware (must be last)
  app.use(errorHandler);

  return app;
}

export function startServer(): void {
  const app = createApp();
  
  const server = app.listen(config.PORT, () => {
    logger.info({
      port: config.PORT,
      environment: config.NODE_ENV,
      provider: config.TGT_ACTIVE_PROVIDER,
      cache: config.TGT_ENABLE_CACHE,
    }, '🚀 TGT Flight Search API started successfully');

    // Log startup banner
    console.log(`
╔══════════════════════════════════════════════════════════════╗
║                    TGT Flight Search API                    ║
║                                                              ║
║  🚀 Server running on port ${config.PORT}                          ║
║  📚 Documentation: http://localhost:${config.PORT}/docs              ║
║  ❤️  Health check: http://localhost:${config.PORT}/health            ║
║  🔧 Provider: ${config.TGT_ACTIVE_PROVIDER.padEnd(20)} ║
║  🌍 Environment: ${config.NODE_ENV.padEnd(20)} ║
║  💾 Cache: ${config.TGT_ENABLE_CACHE ? 'Enabled' : 'Disabled'.padEnd(20)} ║
╚══════════════════════════════════════════════════════════════╝
    `);
  });

  // Graceful shutdown
  const gracefulShutdown = (signal: string) => {
    logger.info({ signal }, 'Received shutdown signal');
    
    server.close(() => {
      logger.info('Server closed successfully');
      process.exit(0);
    });

    // Force close after 10 seconds
    setTimeout(() => {
      logger.error('Forced shutdown after timeout');
      process.exit(1);
    }, 10000);
  };

  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));

  return server;
}

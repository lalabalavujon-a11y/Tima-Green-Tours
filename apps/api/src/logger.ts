interface LogEntry {
  level: string;
  message: string;
  [key: string]: any;
}

export const logger = {
  info: (meta: any, message: string) => {
    console.log(JSON.stringify({ level: 'info', message, ...meta }));
  },
  error: (meta: any, message: string) => {
    console.error(JSON.stringify({ level: 'error', message, ...meta }));
  },
  warn: (meta: any, message: string) => {
    console.warn(JSON.stringify({ level: 'warn', message, ...meta }));
  }
};

export function createRequestLogger(req: any, res: any, next: any) {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info({
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      requestId: req.headers['x-request-id']
    }, 'Request completed');
  });
  
  next();
}
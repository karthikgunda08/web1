// src/middleware/monitoringMiddleware.js
import { serverLogger } from '../utils/logger.js';
import { rateLimiter } from '../services/cache.js';

// Track response times
export const responseTime = (req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        serverLogger.info('Request completed', {
            method: req.method,
            path: req.path,
            statusCode: res.statusCode,
            duration,
        });
    });
    next();
};

// Track memory usage
export const memoryUsage = (req, res, next) => {
    const used = process.memoryUsage();
    serverLogger.debug('Memory usage', {
        rss: `${Math.round(used.rss / 1024 / 1024)}MB`,
        heapTotal: `${Math.round(used.heapTotal / 1024 / 1024)}MB`,
        heapUsed: `${Math.round(used.heapUsed / 1024 / 1024)}MB`,
    });
    next();
};

// Rate limiting middleware using Redis
export const redisRateLimiter = (limit, window) => {
    return async (req, res, next) => {
        const key = `rate-limit:${req.ip}`;
        const allowed = await rateLimiter.checkLimit(key, limit, window);
        
        if (!allowed) {
            return res.status(429).json({
                status: 'error',
                message: 'Too many requests, please try again later.'
            });
        }
        next();
    };
};

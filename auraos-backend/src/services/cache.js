// src/services/cache.js
import Redis from 'ioredis';
import { serverLogger } from '../utils/logger.js';

const redis = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD,
    retryStrategy: (times) => {
        const delay = Math.min(times * 50, 2000);
        return delay;
    }
});

redis.on('error', (error) => {
    serverLogger.error('Redis connection error', { error: error.message });
});

redis.on('connect', () => {
    serverLogger.info('Redis connected successfully');
});

export const getCache = async (key) => {
    try {
        const data = await redis.get(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        serverLogger.error('Redis get error', { error: error.message, key });
        return null;
    }
};

export const setCache = async (key, value, expireTime = 3600) => {
    try {
        await redis.setex(key, expireTime, JSON.stringify(value));
        return true;
    } catch (error) {
        serverLogger.error('Redis set error', { error: error.message, key });
        return false;
    }
};

export const deleteCache = async (key) => {
    try {
        await redis.del(key);
        return true;
    } catch (error) {
        serverLogger.error('Redis delete error', { error: error.message, key });
        return false;
    }
};

export const clearCache = async () => {
    try {
        await redis.flushall();
        return true;
    } catch (error) {
        serverLogger.error('Redis clear error', { error: error.message });
        return false;
    }
};

// Rate limiting with Redis
export const rateLimiter = {
    checkLimit: async (key, limit, window) => {
        const current = await redis.incr(key);
        if (current === 1) {
            await redis.expire(key, window);
        }
        return current <= limit;
    },
    resetLimit: async (key) => {
        await redis.del(key);
    }
};

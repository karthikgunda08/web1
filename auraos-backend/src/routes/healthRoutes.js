// src/routes/healthRoutes.js
import express from 'express';
import mongoose from 'mongoose';
import { getCache } from '../services/cache.js';
import { serverLogger } from '../utils/logger.js';

const router = express.Router();

// Basic health check
router.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

// Detailed health check
router.get('/health/details', async (req, res) => {
    const health = {
        uptime: process.uptime(),
        timestamp: Date.now(),
        status: 'ok',
        services: {
            database: 'unknown',
            redis: 'unknown',
        },
        memory: process.memoryUsage(),
    };

    // Check MongoDB
    try {
        if (mongoose.connection.readyState === 1) {
            health.services.database = 'ok';
        } else {
            health.services.database = 'error';
            health.status = 'error';
        }
    } catch (error) {
        health.services.database = 'error';
        health.status = 'error';
        serverLogger.error('Database health check failed', { error: error.message });
    }

    // Check Redis
    try {
        await getCache('health-check');
        health.services.redis = 'ok';
    } catch (error) {
        health.services.redis = 'error';
        health.status = 'error';
        serverLogger.error('Redis health check failed', { error: error.message });
    }

    const statusCode = health.status === 'ok' ? 200 : 500;
    res.status(statusCode).json(health);
});

// Metrics endpoint
router.get('/metrics', (req, res) => {
    const metrics = {
        process: {
            memory: process.memoryUsage(),
            cpu: process.cpuUsage(),
            uptime: process.uptime(),
        },
        mongodb: {
            connections: mongoose.connection.base.connections.length,
            readyState: mongoose.connection.readyState,
        },
        nodejs: {
            version: process.version,
            platform: process.platform,
            arch: process.arch,
        }
    };
    
    res.status(200).json(metrics);
});

export default router;

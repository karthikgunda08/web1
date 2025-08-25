
// src/server.js
import 'dotenv/config'; // Load environment variables from .env file
import { createSer// --- Security Middleware ---
app.use(helmetConfig);

// Apply CORS
app.use(cors(corsConfig));

// Apply monitoring middleware
app.use(responseTime);
app.use(memoryUsage);

// Apply rate limiting
app.use('/api/auth', authLimiter);
app.use('/api', apiLimiter);
app.use('/api', redisRateLimiter(100, 60)); // 100 requests per minute

// Request sanitization
app.use(sanitizeRequest);

// Error handling for JWT
app.use(handleJWTError);http';
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

import { serverLogger } from './utils/logger.js';

// --- Improved Environment Variable Check ---
const criticalEnvVars = [ 'MONGODB_URI', 'GEMINI_API_KEY', 'JWT_SECRET', 'CLIENT_URL' ];
const paymentEnvVars = [ 'RAZORPAY_KEY_ID', 'RAZORPAY_KEY_SECRET', 'RAZORPAY_WEBHOOK_SECRET' ];
const emailServiceVars = [ 'EMAIL_HOST', 'EMAIL_PORT', 'EMAIL_USER', 'EMAIL_PASS', 'EMAIL_FROM' ];

const missingCriticalVars = criticalEnvVars.filter(varName => !process.env[varName]);
const missingPaymentVars = paymentEnvVars.filter(varName => !process.env[varName]);
const missingEmailVars = emailServiceVars.filter(varName => !process.env[varName]);

if (missingCriticalVars.length > 0) {
    serverLogger.error('Critical environment variables missing', {
        missing: missingCriticalVars,
        action: 'Please create or complete the .env file in the auraos-backend/ directory.'
    });
    process.exit(1);
}

if (missingPaymentVars.length > 0) {
    serverLogger.warn('Payment gateway environment variables missing', {
        missing: missingPaymentVars,
        impact: 'Payment features (buying credits) will be disabled'
    });
}

if (missingEmailVars.length > 0) {
    serverLogger.warn('Email service not configured', {
        missing: missingEmailVars,
        impact: 'Email features will only log to console'
    });
}
// --- End Check ---

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import helmet from 'helmet';
import { swaggerSpec } from './config/swagger.js';
import {
    helmetConfig,
    corsConfig,
    authLimiter,
    apiLimiter,
    sanitizeRequest,
    handleJWTError
} from './middleware/securityMiddleware.js';
import { responseTime, memoryUsage, redisRateLimiter } from './middleware/monitoringMiddleware.js';
import healthRoutes from './routes/healthRoutes.js';

import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import geminiProxyRoutes from './routes/geminiProxyRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import communityRoutes from './routes/communityRoutes.js';
import foundationRoutes from './routes/foundationRoutes.js'; 
import walletRoutes from './routes/walletRoutes.js';
import astraRoutes from './routes/astraRoutes.js';
import AppError from './utils/AppError.js';
import initializeSocketHandlers from './socket/socketHandlers.js';

const app = express();
const httpServer = createServer(app); // Create HTTP server for Socket.IO
const isProduction = process.env.NODE_ENV === 'production';
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true, // Allow cookies
  optionsSuccessStatus: 200
};

// --- Socket.IO Integration ---
const io = new Server(httpServer, {
  cors: corsOptions
});

// Socket.IO authentication middleware
io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
        return next(new Error('Authentication error: No token'));
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return next(new Error('Authentication error: Invalid token'));
        }
        socket.user = decoded; // Attach user data to the socket
        next();
    });
});

initializeSocketHandlers(io);
// --- End Socket.IO Integration ---

// --- Security Middleware ---
// Apply enhanced security middleware
app.use(helmetConfig);

// Apply CORS
app.use(cors(corsConfig));

// Apply rate limiting
app.use('/api/auth', authLimiter);
app.use('/api', apiLimiter);

// Request sanitization
app.use(sanitizeRequest);

// Swagger Documentation UI
if (process.env.NODE_ENV !== 'production') {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
        explorer: true,
        customCss: '.swagger-ui .topbar { display: none }',
        customSiteTitle: 'AuraOS API Documentation',
    }));
}

// --- General Middleware & DB Connection ---
// MongoDB Connection with retry logic
const connectWithRetry = (retryCount = 1, maxRetries = 5) => {
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        // Set to 10 by default in Mongoose 5.x
        poolSize: process.env.MONGO_POOL_SIZE ? parseInt(process.env.MONGO_POOL_SIZE) : 10,
    })
    .then(() => {
        serverLogger.info('MongoDB connected successfully');
        
        // Log when the connection is lost
        mongoose.connection.on('disconnected', () => {
            serverLogger.error('MongoDB connection lost');
            if (retryCount <= maxRetries) {
                serverLogger.info(`Attempting to reconnect to MongoDB (Attempt ${retryCount})`);
                setTimeout(() => connectWithRetry(retryCount + 1), 5000);
            }
        });
        
        // Log when the connection is reconnected
        mongoose.connection.on('reconnected', () => {
            serverLogger.info('MongoDB connection reestablished');
        });
    })
    .catch(err => {
        serverLogger.error('MongoDB connection error', { error: err.message, attempt: retryCount });
        if (retryCount <= maxRetries) {
            serverLogger.info(`Retrying connection in 5 seconds (Attempt ${retryCount})`);
            setTimeout(() => connectWithRetry(retryCount + 1), 5000);
        } else {
            serverLogger.error('Failed to connect to MongoDB after multiple attempts');
            process.exit(1);
        }
    });
};

connectWithRetry();
app.use(cors(corsOptions));
app.use(cookieParser());
app.use('/api/payments/verify-credit-payment', express.raw({ type: 'application/json' }));
app.use(express.json({ limit: '10mb' }));

// --- API Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/gemini', geminiProxyRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/foundation', foundationRoutes); 
app.use('/api/wallet', walletRoutes);
app.use('/api/astra', astraRoutes);
app.use('/api', healthRoutes);
app.get('/', (req, res) => res.send('AuraOS Backend is running!'));

// Health Check Endpoints
app.get('/api/healthz', (req, res) => res.status(200).json({ status: 'ok' }));
app.get('/api/readyz', (req, res) => {
    if (mongoose.connection.readyState === 1) { // 1 for connected
        res.status(200).json({ status: 'ready' });
    } else {
        res.status(503).json({ status: 'not_ready', reason: 'Database not connected' });
    }
});

// --- Global Error Handler ---
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    
    if (isProduction && !err.isOperational) {
        serverLogger.error('Programming Error Detected', {
            error: err.message,
            stack: err.stack,
            path: req.path,
            method: req.method
        });
        return res.status(500).json({ 
            status: 'error', 
            message: 'Something went wrong! Our team has been notified.' 
        });
    }
    
    if (!isProduction) {
        serverLogger.debug('Development Error Details', {
            error: err.message,
            stack: err.stack,
            path: req.path,
            method: req.method
        });
    }
    
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
});

// --- Server Startup ---
const PORT = process.env.PORT || 3001;
const server = httpServer.listen(PORT, () => {
    serverLogger.info('Server started successfully', {
        port: PORT,
        environment: process.env.NODE_ENV,
        clientUrl: process.env.CLIENT_URL
    });
});

// --- Graceful Shutdown ---
const gracefulShutdown = async (signal) => {
    serverLogger.info('Initiating graceful shutdown', { signal });
    
    io.close(() => {
        serverLogger.info('WebSocket server closed');
    });
    
    server.close(async () => {
        serverLogger.info('HTTP server closed');
        
        try {
            await mongoose.connection.close(false);
            serverLogger.info('MongoDB connection closed');
            process.exit(0);
        } catch (err) {
            serverLogger.error('Error during MongoDB shutdown', { error: err.message });
            process.exit(1);
        }
    });
    
    // Force shutdown after 30 seconds
    setTimeout(() => {
        serverLogger.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
    }, 30000);
};

// --- Process Event Handlers ---
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

process.on('unhandledRejection', (reason) => {
    serverLogger.error('Unhandled Promise Rejection', {
        reason: reason instanceof Error ? reason.message : reason,
        stack: reason instanceof Error ? reason.stack : undefined
    });
});

process.on('uncaughtException', (error) => {
    serverLogger.error('Uncaught Exception', {
        error: error.message,
        stack: error.stack
    });
    gracefulShutdown('uncaughtException')
        .catch(err => {
            serverLogger.error('Error during shutdown after uncaught exception', {
                error: err.message
            });
            process.exit(1);
        });
});

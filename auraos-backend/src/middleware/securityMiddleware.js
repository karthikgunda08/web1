// src/middleware/securityMiddleware.js
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

// Rate limiting configuration
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per windowMs for auth routes
    message: 'Too many requests from this IP, please try again after 15 minutes'
});

export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100, // Limit each IP to 100 requests per windowMs for API routes
    message: 'Too many API requests from this IP, please try again after 15 minutes'
});

// Helmet security configuration
export const helmetConfig = helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://checkout.razorpay.com"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            imgSrc: ["'self'", "data:", "https:", "blob:"],
            connectSrc: ["'self'", "https://api.razorpay.com", "wss:", "https:"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            objectSrc: ["'none'"],
            mediaSrc: ["'self'"],
            frameSrc: ["'self'", "https://api.razorpay.com"],
        },
    },
    crossOriginEmbedderPolicy: false, // Required for Razorpay
    crossOriginResourcePolicy: false, // Required for external resources
});

// CORS configuration
export const corsConfig = {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 600 // 10 minutes
};

// Request sanitizer
export const sanitizeRequest = (req, res, next) => {
    // Function to recursively sanitize an object
    const sanitizeObject = (obj) => {
        Object.keys(obj).forEach(key => {
            if (typeof obj[key] === 'string') {
                // Basic XSS prevention
                obj[key] = obj[key]
                    .replace(/[<>]/g, '')
                    .trim();
            } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                sanitizeObject(obj[key]);
            }
        });
    };

    if (req.body) sanitizeObject(req.body);
    if (req.query) sanitizeObject(req.query);
    if (req.params) sanitizeObject(req.params);

    next();
};

// Request validation for required fields
export const validateRequiredFields = (requiredFields) => {
    return (req, res, next) => {
        const missingFields = requiredFields.filter(field => !req.body[field]);
        if (missingFields.length > 0) {
            return res.status(400).json({
                status: 'error',
                message: `Missing required fields: ${missingFields.join(', ')}`
            });
        }
        next();
    };
};

// JWT verification error handler
export const handleJWTError = (err, req, res, next) => {
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            status: 'error',
            message: 'Invalid token. Please log in again.'
        });
    }
    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
            status: 'error',
            message: 'Your token has expired. Please log in again.'
        });
    }
    next(err);
};

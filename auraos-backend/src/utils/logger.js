// src/utils/logger.js
import winston from 'winston';
import 'winston-daily-rotate-file';
import path from 'path';

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'blue',
};

winston.addColors(colors);

const format = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.json()
);

const transports = [
    // Console transport with colorization
    new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize({ all: true }),
            winston.format.printf(
                (info) => `${info.timestamp} ${info.level}: ${info.message}`
            )
        ),
    }),
];

// Add file transports in production
if (process.env.NODE_ENV === 'production') {
    transports.push(
        // Error logs
        new winston.transports.DailyRotateFile({
            filename: path.join('logs', 'error-%DATE%.log'),
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
            level: 'error',
        }),
        // Combined logs
        new winston.transports.DailyRotateFile({
            filename: path.join('logs', 'combined-%DATE%.log'),
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
        })
    );
}

const Logger = winston.createLogger({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    levels,
    format,
    transports,
});

// Create specialized loggers for different modules
export const serverLogger = {
    info: (message, meta = {}) => Logger.info(message, { module: 'Server', ...meta }),
    error: (message, meta = {}) => Logger.error(message, { module: 'Server', ...meta }),
    warn: (message, meta = {}) => Logger.warn(message, { module: 'Server', ...meta }),
    debug: (message, meta = {}) => Logger.debug(message, { module: 'Server', ...meta }),
    http: (message, meta = {}) => Logger.http(message, { module: 'Server', ...meta }),
};

export const authLogger = {
    info: (message, meta = {}) => Logger.info(message, { module: 'Auth', ...meta }),
    error: (message, meta = {}) => Logger.error(message, { module: 'Auth', ...meta }),
    warn: (message, meta = {}) => Logger.warn(message, { module: 'Auth', ...meta }),
    debug: (message, meta = {}) => Logger.debug(message, { module: 'Auth', ...meta }),
};

export const projectLogger = {
    info: (message, meta = {}) => Logger.info(message, { module: 'Project', ...meta }),
    error: (message, meta = {}) => Logger.error(message, { module: 'Project', ...meta }),
    warn: (message, meta = {}) => Logger.warn(message, { module: 'Project', ...meta }),
    debug: (message, meta = {}) => Logger.debug(message, { module: 'Project', ...meta }),
};

export const dbLogger = {
    info: (message, meta = {}) => Logger.info(message, { module: 'Database', ...meta }),
    error: (message, meta = {}) => Logger.error(message, { module: 'Database', ...meta }),
    warn: (message, meta = {}) => Logger.warn(message, { module: 'Database', ...meta }),
    debug: (message, meta = {}) => Logger.debug(message, { module: 'Database', ...meta }),
};

export const emailLogger = {
    info: (message, meta = {}) => Logger.info(message, { module: 'Email', ...meta }),
    error: (message, meta = {}) => Logger.error(message, { module: 'Email', ...meta }),
    warn: (message, meta = {}) => Logger.warn(message, { module: 'Email', ...meta }),
    debug: (message, meta = {}) => Logger.debug(message, { module: 'Email', ...meta }),
};

export const paymentLogger = {
    info: (message, meta = {}) => Logger.info(message, { module: 'Payment', ...meta }),
    error: (message, meta = {}) => Logger.error(message, { module: 'Payment', ...meta }),
    warn: (message, meta = {}) => Logger.warn(message, { module: 'Payment', ...meta }),
    debug: (message, meta = {}) => Logger.debug(message, { module: 'Payment', ...meta }),
};

export const geminiLogger = {
    info: (message, meta = {}) => Logger.info(message, { module: 'Gemini', ...meta }),
    error: (message, meta = {}) => Logger.error(message, { module: 'Gemini', ...meta }),
    warn: (message, meta = {}) => Logger.warn(message, { module: 'Gemini', ...meta }),
    debug: (message, meta = {}) => Logger.debug(message, { module: 'Gemini', ...meta }),
};

// src/config/environment.ts
// Environment configuration for Next of Dakshin Vaarahi AI Platform

export interface EnvironmentConfig {
  // Application Configuration
  appName: string;
  appVersion: string;
  appEnv: 'development' | 'staging' | 'production';
  appUrl: string;
  
  // API Configuration
  apiBaseUrl: string;
  apiTimeout: number;
  apiRetryAttempts: number;
  
  // AI Service Configuration
  geminiApiKey: string;
  aiServiceUrl: string;
  aiModelVersion: string;
  
  // Feature Flags
  enablePhase1: boolean;
  enablePhase2: boolean;
  enablePhase3: boolean;
  enableVR: boolean;
  enableIoT: boolean;
  enableQuantum: boolean;
  
  // Analytics & Monitoring
  analyticsId: string;
  sentryDsn: string;
  loggingLevel: 'debug' | 'info' | 'warn' | 'error';
  
  // Performance Optimization
  enableServiceWorker: boolean;
  enablePWA: boolean;
  enableCompression: boolean;
  enableCaching: boolean;
  
  // Security
  enableHttps: boolean;
  enableCSP: boolean;
  enableHSTS: boolean;
  
  // Build Optimization
  enableMinification: boolean;
  enableTreeShaking: boolean;
  enableCodeSplitting: boolean;
  enableLazyLoading: boolean;
}

const getEnvironmentConfig = (): EnvironmentConfig => {
  const env = import.meta.env.MODE;
  
  const baseConfig: EnvironmentConfig = {
    // Application Configuration
    appName: import.meta.env.VITE_APP_NAME || 'Next of Dakshin Vaarahi',
    appVersion: import.meta.env.VITE_APP_VERSION || '1.0.0',
    appEnv: (import.meta.env.VITE_APP_ENV as any) || env,
    appUrl: import.meta.env.VITE_APP_URL || 'http://localhost:3000',
    
    // API Configuration
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
    apiTimeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '30000'),
    apiRetryAttempts: parseInt(import.meta.env.VITE_API_RETRY_ATTEMPTS || '3'),
    
    // AI Service Configuration
    geminiApiKey: import.meta.env.VITE_GEMINI_API_KEY || '',
    aiServiceUrl: import.meta.env.VITE_AI_SERVICE_URL || 'http://localhost:8000/ai',
    aiModelVersion: import.meta.env.VITE_AI_MODEL_VERSION || 'gemini-1.5-pro',
    
    // Feature Flags
    enablePhase1: import.meta.env.VITE_ENABLE_PHASE_1 === 'true',
    enablePhase2: import.meta.env.VITE_ENABLE_PHASE_2 === 'true',
    enablePhase3: import.meta.env.VITE_ENABLE_PHASE_3 === 'true',
    enableVR: import.meta.env.VITE_ENABLE_VR === 'true',
    enableIoT: import.meta.env.VITE_ENABLE_IOT === 'true',
    enableQuantum: import.meta.env.VITE_ENABLE_QUANTUM === 'true',
    
    // Analytics & Monitoring
    analyticsId: import.meta.env.VITE_ANALYTICS_ID || '',
    sentryDsn: import.meta.env.VITE_SENTRY_DSN || '',
    loggingLevel: (import.meta.env.VITE_LOGGING_LEVEL as any) || 'info',
    
    // Performance Optimization
    enableServiceWorker: import.meta.env.VITE_ENABLE_SERVICE_WORKER === 'true',
    enablePWA: import.meta.env.VITE_ENABLE_PWA === 'true',
    enableCompression: import.meta.env.VITE_ENABLE_COMPRESSION === 'true',
    enableCaching: import.meta.env.VITE_ENABLE_CACHING === 'true',
    
    // Security
    enableHttps: import.meta.env.VITE_ENABLE_HTTPS === 'true',
    enableCSP: import.meta.env.VITE_ENABLE_CSP === 'true',
    enableHSTS: import.meta.env.VITE_ENABLE_HSTS === 'true',
    
    // Build Optimization
    enableMinification: import.meta.env.VITE_ENABLE_MINIFICATION === 'true',
    enableTreeShaking: import.meta.env.VITE_ENABLE_TREE_SHAKING === 'true',
    enableCodeSplitting: import.meta.env.VITE_ENABLE_CODE_SPLITTING === 'true',
    enableLazyLoading: import.meta.env.VITE_ENABLE_LAZY_LOADING === 'true',
  };

  // Environment-specific overrides
  switch (env) {
    case 'production':
      return {
        ...baseConfig,
        appEnv: 'production',
        appUrl: 'https://dakshin-vaarahi.ai',
        apiBaseUrl: 'https://api.dakshin-vaarahi.ai',
        aiServiceUrl: 'https://ai.dakshin-vaarahi.ai',
        enableServiceWorker: true,
        enablePWA: true,
        enableCompression: true,
        enableCaching: true,
        enableHttps: true,
        enableCSP: true,
        enableHSTS: true,
        enableMinification: true,
        enableTreeShaking: true,
        enableCodeSplitting: true,
        enableLazyLoading: true,
        loggingLevel: 'warn',
      };
      
    case 'staging':
      return {
        ...baseConfig,
        appEnv: 'staging',
        appUrl: 'https://staging.dakshin-vaarahi.ai',
        apiBaseUrl: 'https://staging-api.dakshin-vaarahi.ai',
        aiServiceUrl: 'https://staging-ai.dakshin-vaarahi.ai',
        enableServiceWorker: true,
        enablePWA: false,
        enableCompression: true,
        enableCaching: true,
        loggingLevel: 'info',
      };
      
    case 'development':
    default:
      return {
        ...baseConfig,
        appEnv: 'development',
        appUrl: 'http://localhost:3000',
        apiBaseUrl: 'http://localhost:8000',
        aiServiceUrl: 'http://localhost:8000/ai',
        enableServiceWorker: false,
        enablePWA: false,
        enableCompression: false,
        enableCaching: false,
        enableHttps: false,
        enableCSP: false,
        enableHSTS: false,
        enableMinification: false,
        enableTreeShaking: false,
        enableCodeSplitting: false,
        enableLazyLoading: false,
        loggingLevel: 'debug',
      };
  }
};

export const environment = getEnvironmentConfig();

// Helper functions
export const isProduction = () => environment.appEnv === 'production';
export const isStaging = () => environment.appEnv === 'staging';
export const isDevelopment = () => environment.appEnv === 'development';

export const getApiUrl = (endpoint: string) => `${environment.apiBaseUrl}${endpoint}`;
export const getAiServiceUrl = (endpoint: string) => `${environment.aiServiceUrl}${endpoint}`;

export const log = (level: 'debug' | 'info' | 'warn' | 'error', message: string, ...args: any[]) => {
  const levels = { debug: 0, info: 1, warn: 2, error: 3 };
  const currentLevel = levels[environment.loggingLevel];
  const messageLevel = levels[level];
  
  if (messageLevel >= currentLevel) {
    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${level.toUpperCase()}] [${environment.appName}]`;
    
    switch (level) {
      case 'debug':
        console.debug(prefix, message, ...args);
        break;
      case 'info':
        console.info(prefix, message, ...args);
        break;
      case 'warn':
        console.warn(prefix, message, ...args);
        break;
      case 'error':
        console.error(prefix, message, ...args);
        break;
    }
  }
};

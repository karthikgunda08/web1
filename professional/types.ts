// src/components/professional/types.ts
// Professional CAD Tools - Type Definitions

// ============================================================================
// CAD Tools Types
// ============================================================================

export interface CADTool {
  id: string;
  name: string;
  type: '2d' | '3d' | 'bim' | 'rendering' | 'analysis' | 'simulation';
  icon: string;
  description: string;
  status: 'available' | 'processing' | 'error' | 'maintenance' | 'offline';
  lastUsed: string;
  fileTypes: string[];
  version: string;
  license: 'trial' | 'standard' | 'professional' | 'enterprise';
  features: string[];
  systemRequirements: {
    os: string[];
    ram: string;
    storage: string;
    graphics: string;
    processor: string;
  };
  pricing: {
    monthly: number;
    yearly: number;
    perpetual: number;
    currency: string;
  };
  integrations: string[];
  support: 'basic' | 'standard' | 'premium' | 'enterprise';
}

// ============================================================================
// Material Library Types
// ============================================================================

export interface Material {
  id: string;
  name: string;
  category: 'wall' | 'floor' | 'ceiling' | 'furniture' | 'texture';
  type: 'solid' | 'pattern' | 'metallic' | 'glass' | 'wood' | 'stone';
  color: string;
  roughness: number;
  metallic: number;
  normalMap?: string;
  albedoMap?: string;
  roughnessMap?: string;
  metallicMap?: string;
  preview: string;
}

export interface AdvancedMaterial {
  id: string;
  name: string;
  category: 'wall' | 'floor' | 'ceiling' | 'furniture' | 'texture' | 'landscape';
  type: 'solid' | 'pattern' | 'metallic' | 'glass' | 'wood' | 'stone' | 'fabric' | 'ceramic';
  subcategory: string;
  brand?: string;
  manufacturer?: string;
  color: string;
  roughness: number;
  metallic: number;
  normalMap?: string;
  albedoMap?: string;
  roughnessMap?: string;
  metallicMap?: string;
  aoMap?: string;
  displacementMap?: string;
  preview: string;
  tags: string[];
  cost: number;
  sustainability: 'A' | 'B' | 'C' | 'D';
  fireRating: 'A1' | 'A2' | 'B' | 'C' | 'D' | 'E' | 'F';
  uvScale: { x: number; y: number };
  tiling: boolean;
  createdAt: string;
  lastModified: string;
  isPublic: boolean;
  isFavorite: boolean;
  properties: {
    density?: number;
    thermalConductivity?: number;
    acousticAbsorption?: number;
    compressiveStrength?: number;
    tensileStrength?: number;
    flexuralStrength?: number;
    waterAbsorption?: number;
    frostResistance?: boolean;
    chemicalResistance?: string[];
    uvResistance?: boolean;
    abrasionResistance?: number;
    impactResistance?: number;
  };
  certifications: {
    leed?: boolean;
    breeam?: boolean;
    cradleToCradle?: boolean;
    fsc?: boolean;
    greenguard?: boolean;
    oekoTex?: boolean;
  };
  availability: {
    inStock: boolean;
    leadTime: number; // days
    minimumOrder: number;
    maximumOrder: number;
    locations: string[];
  };
}

export interface MaterialCategory {
  id: string;
  name: string;
  icon: string;
  count: number;
  subcategories: string[];
  description: string;
  parentCategory?: string;
  sortOrder: number;
  isActive: boolean;
}

export interface MaterialFilter {
  categories: string[];
  types: string[];
  priceRange: [number, number];
  sustainability: string[];
  fireRating: string[];
  brands: string[];
  tags: string[];
  properties: Record<string, any>;
  availability: boolean;
}

// ============================================================================
// Project File Types
// ============================================================================

export interface ProjectFile {
  id: string;
  name: string;
  type: 'dwg' | 'skp' | 'max' | 'rvt' | 'obj' | 'fbx' | 'ifc';
  size: number;
  lastModified: string;
  version: string;
  status: 'active' | 'archived' | 'review' | 'draft';
  path: string;
  checksum: string;
  metadata: {
    author: string;
    createdBy: string;
    lastModifiedBy: string;
    project: string;
    description: string;
    keywords: string[];
    customProperties: Record<string, any>;
  };
  permissions: {
    owner: string;
    readAccess: string[];
    writeAccess: string[];
    adminAccess: string[];
  };
  versionHistory: {
    version: string;
    timestamp: string;
    author: string;
    changes: string[];
    size: number;
  }[];
  dependencies: string[];
  references: string[];
}

// ============================================================================
// Workflow Management Types
// ============================================================================

export interface WorkflowStep {
  id: string;
  name: string;
  description: string;
  tool: string;
  toolIcon: string;
  status: 'pending' | 'in-progress' | 'completed' | 'error' | 'skipped' | 'on-hold';
  priority: 'low' | 'medium' | 'high' | 'critical';
  estimatedDuration: number; // in hours
  actualDuration?: number;
  dependencies: string[];
  assignee?: string;
  assigneeAvatar?: string;
  startDate?: string;
  endDate?: string;
  progress: number; // 0-100
  notes: string[];
  attachments: string[];
  qualityScore?: number; // 0-100
  cost: number;
  credits: number;
  tags: string[];
  customFields: Record<string, any>;
  timeTracking: {
    totalTime: number;
    billableTime: number;
    timeEntries: {
      startTime: string;
      endTime: string;
      duration: number;
      description: string;
      billable: boolean;
    }[];
  };
  approvals: {
    required: boolean;
    approvers: string[];
    approvedBy?: string;
    approvedAt?: string;
    comments: string[];
  };
}

export interface WorkflowPhase {
  id: string;
  name: string;
  description: string;
  steps: WorkflowStep[];
  status: 'planning' | 'active' | 'review' | 'completed' | 'on-hold' | 'cancelled';
  startDate?: string;
  endDate?: string;
  budget: number;
  actualCost: number;
  progress: number;
  dependencies: string[];
  deliverables: string[];
  qualityGates: {
    id: string;
    name: string;
    criteria: string[];
    status: 'pending' | 'passed' | 'failed';
    reviewedBy?: string;
    reviewedAt?: string;
    comments: string[];
  }[];
}

export interface ProjectWorkflow {
  id: string;
  name: string;
  description: string;
  phases: WorkflowPhase[];
  status: 'draft' | 'active' | 'paused' | 'completed' | 'archived' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  client: string;
  projectManager: string;
  team: string[];
  startDate: string;
  targetEndDate: string;
  actualEndDate?: string;
  budget: number;
  actualCost: number;
  progress: number;
  tags: string[];
  createdAt: string;
  lastModified: string;
  settings: {
    autoAssign: boolean;
    notifications: boolean;
    timeTracking: boolean;
    approvals: boolean;
    qualityGates: boolean;
    reporting: boolean;
  };
  risks: {
    id: string;
    description: string;
    probability: 'low' | 'medium' | 'high';
    impact: 'low' | 'medium' | 'high';
    mitigation: string;
    owner: string;
    status: 'open' | 'mitigated' | 'closed';
  }[];
  issues: {
    id: string;
    title: string;
    description: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    status: 'open' | 'in-progress' | 'resolved' | 'closed';
    assignee: string;
    reportedBy: string;
    reportedAt: string;
    resolvedAt?: string;
    resolution: string;
  }[];
}

export interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  role: 'project_manager' | 'architect' | 'engineer' | 'designer' | 'reviewer' | 'consultant' | 'client';
  status: 'online' | 'offline' | 'busy' | 'away' | 'vacation';
  currentTask?: string;
  workload: number; // 0-100
  skills: string[];
  contact: {
    email: string;
    phone?: string;
    location?: string;
    timezone: string;
  };
  availability: {
    workingHours: {
      start: string;
      end: string;
      days: number[];
    };
    exceptions: {
      date: string;
      reason: string;
      available: boolean;
    }[];
  };
  performance: {
    completedTasks: number;
    averageQuality: number;
    onTimeDelivery: number;
    clientSatisfaction: number;
  };
}

// ============================================================================
// Integration Hub Types
// ============================================================================

export interface IntegrationStatus {
  id: string;
  name: string;
  type: 'cad_tool' | 'material_library' | 'workflow' | 'cloud_service' | 'database' | 'api' | 'plugin';
  status: 'connected' | 'connecting' | 'disconnected' | 'error' | 'maintenance' | 'updating';
  lastSync: string;
  syncInterval: number; // in minutes
  health: number; // 0-100
  version: string;
  apiEndpoint: string;
  credentials: 'valid' | 'expired' | 'invalid' | 'none' | 'revoked';
  permissions: string[];
  dataSize: number; // in MB
  lastError?: string;
  retryCount: number;
  maxRetries: number;
  configuration: {
    enabled: boolean;
    autoSync: boolean;
    syncOnChange: boolean;
    conflictResolution: 'overwrite' | 'merge' | 'prompt' | 'skip';
    dataRetention: number; // days
    compression: boolean;
    encryption: boolean;
  };
  performance: {
    averageResponseTime: number;
    successRate: number;
    errorRate: number;
    lastPerformanceCheck: string;
  };
  security: {
    sslEnabled: boolean;
    authenticationMethod: string;
    lastSecurityAudit: string;
    securityScore: number;
    vulnerabilities: string[];
  };
}

export interface SyncJob {
  id: string;
  name: string;
  source: string;
  target: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled' | 'retrying';
  progress: number; // 0-100
  startTime: string;
  endTime?: string;
  dataSize: number;
  priority: 'low' | 'medium' | 'high' | 'critical';
  retryCount: number;
  maxRetries: number;
  errorMessage?: string;
  type: 'full' | 'incremental' | 'differential' | 'backup' | 'restore';
  schedule?: string; // cron expression
  dependencies: string[];
  metadata: {
    checksum: string;
    compressionRatio: number;
    encryptionType: string;
    transferRate: number;
  };
  logs: {
    timestamp: string;
    level: 'info' | 'warning' | 'error' | 'debug';
    message: string;
    details?: any;
  }[];
}

export interface IntegrationRule {
  id: string;
  name: string;
  description: string;
  source: string;
  target: string;
  trigger: 'manual' | 'scheduled' | 'event_based' | 'real_time' | 'conditional';
  schedule?: string; // cron expression
  conditions: string[];
  actions: string[];
  isActive: boolean;
  lastExecuted?: string;
  executionCount: number;
  successRate: number; // 0-100
  priority: 'low' | 'medium' | 'high' | 'critical';
  errorHandling: {
    onError: 'retry' | 'skip' | 'stop' | 'notify';
    maxRetries: number;
    retryDelay: number; // seconds
    notifyUsers: string[];
  };
  validation: {
    preExecution: string[];
    postExecution: string[];
    rollbackOnFailure: boolean;
  };
}

export interface PerformanceMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable' | 'fluctuating';
  change: number; // percentage change
  timestamp: string;
  category: 'performance' | 'reliability' | 'security' | 'efficiency' | 'availability';
  threshold: {
    warning: number;
    critical: number;
    unit: string;
  };
  history: {
    timestamp: string;
    value: number;
  }[];
  alerts: {
    id: string;
    type: 'warning' | 'critical';
    message: string;
    timestamp: string;
    acknowledged: boolean;
    acknowledgedBy?: string;
    acknowledgedAt?: string;
  }[];
}

// ============================================================================
// Notification and Communication Types
// ============================================================================

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: 'workflow' | 'integration' | 'security' | 'performance' | 'system';
  actions: {
    label: string;
    action: string;
    url?: string;
  }[];
  metadata: Record<string, any>;
}

export interface CommunicationChannel {
  id: string;
  name: string;
  type: 'email' | 'slack' | 'teams' | 'webhook' | 'sms' | 'push';
  configuration: Record<string, any>;
  isActive: boolean;
  lastUsed: string;
  successRate: number;
}

// ============================================================================
// Audit and Logging Types
// ============================================================================

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  resource: string;
  resourceType: string;
  details: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  sessionId: string;
  outcome: 'success' | 'failure' | 'partial';
  errorMessage?: string;
}

export interface SystemLog {
  id: string;
  timestamp: string;
  level: 'debug' | 'info' | 'warning' | 'error' | 'fatal';
  component: string;
  message: string;
  details?: any;
  stackTrace?: string;
  context: Record<string, any>;
}

// ============================================================================
// Configuration and Settings Types
// ============================================================================

export interface SystemConfiguration {
  general: {
    timezone: string;
    language: string;
    dateFormat: string;
    timeFormat: string;
    currency: string;
    units: 'metric' | 'imperial';
  };
  security: {
    passwordPolicy: {
      minLength: number;
      requireUppercase: boolean;
      requireLowercase: boolean;
      requireNumbers: boolean;
      requireSpecialChars: boolean;
      expirationDays: number;
    };
    sessionTimeout: number; // minutes
    maxLoginAttempts: number;
    twoFactorAuth: boolean;
    ipWhitelist: string[];
  };
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
    slack: boolean;
    frequency: 'immediate' | 'hourly' | 'daily' | 'weekly';
    quietHours: {
      enabled: boolean;
      start: string;
      end: string;
      timezone: string;
    };
  };
  backup: {
    enabled: boolean;
    frequency: 'hourly' | 'daily' | 'weekly' | 'monthly';
    retention: number; // days
    compression: boolean;
    encryption: boolean;
    locations: string[];
  };
  performance: {
    cacheEnabled: boolean;
    cacheSize: number; // MB
    maxConcurrentJobs: number;
    jobTimeout: number; // seconds
    autoOptimization: boolean;
  };
}

// ============================================================================
// Report and Analytics Types
// ============================================================================

export interface Report {
  id: string;
  name: string;
  type: 'workflow' | 'performance' | 'usage' | 'cost' | 'quality' | 'custom';
  description: string;
  parameters: Record<string, any>;
  schedule?: string; // cron expression
  recipients: string[];
  format: 'pdf' | 'excel' | 'csv' | 'json' | 'html';
  lastGenerated?: string;
  nextGeneration?: string;
  isActive: boolean;
  template: string;
  data: Record<string, any>;
}

export interface AnalyticsDashboard {
  id: string;
  name: string;
  description: string;
  widgets: {
    id: string;
    type: 'chart' | 'metric' | 'table' | 'gauge' | 'list';
    title: string;
    configuration: Record<string, any>;
    position: { x: number; y: number; width: number; height: number };
    refreshInterval: number; // seconds
  }[];
  layout: 'grid' | 'flexible' | 'custom';
  isPublic: boolean;
  sharedWith: string[];
  lastModified: string;
}

// ============================================================================
// API and External Integration Types
// ============================================================================

export interface APIEndpoint {
  id: string;
  name: string;
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  authentication: 'none' | 'basic' | 'bearer' | 'api_key' | 'oauth2';
  headers: Record<string, string>;
  parameters: {
    name: string;
    type: 'string' | 'number' | 'boolean' | 'array' | 'object';
    required: boolean;
    defaultValue?: any;
    description: string;
  }[];
  response: {
    statusCodes: Record<string, string>;
    schema: any;
    examples: any[];
  };
  rateLimit: {
    requests: number;
    period: number; // seconds
  };
  timeout: number; // seconds
  retryPolicy: {
    maxRetries: number;
    backoffMultiplier: number;
    initialDelay: number; // seconds
  };
}

export interface ExternalService {
  id: string;
  name: string;
  type: 'cloud_storage' | 'project_management' | 'communication' | 'analytics' | 'ai_service';
  provider: string;
  configuration: Record<string, any>;
  status: 'active' | 'inactive' | 'error';
  lastHealthCheck: string;
  healthScore: number;
  usage: {
    current: number;
    limit: number;
    unit: string;
    resetDate: string;
  };
  costs: {
    monthly: number;
    currency: string;
    billingCycle: 'monthly' | 'quarterly' | 'yearly';
  };
}

// ============================================================================
// Utility Types
// ============================================================================

export type Status = 'active' | 'inactive' | 'pending' | 'completed' | 'failed' | 'cancelled';
export type Priority = 'low' | 'medium' | 'high' | 'critical';
export type UserRole = 'admin' | 'user' | 'viewer' | 'guest';
export type FileFormat = 'dwg' | 'dxf' | 'skp' | 'max' | 'rvt' | 'obj' | 'fbx' | 'ifc';

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  filters?: Record<string, any>;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
  requestId: string;
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
  value?: any;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// ============================================================================
// Event Types
// ============================================================================

export interface SystemEvent {
  id: string;
  type: string;
  timestamp: string;
  source: string;
  data: Record<string, any>;
  severity: 'low' | 'medium' | 'high' | 'critical';
  processed: boolean;
  handlers: string[];
}

export interface EventHandler {
  id: string;
  name: string;
  eventType: string;
  handler: string;
  isActive: boolean;
  priority: number;
  conditions: Record<string, any>;
  actions: string[];
  lastExecuted?: string;
  executionCount: number;
  successRate: number;
}

// ============================================================================
// Export all types
// ============================================================================

// All types are already exported above, no need to re-export

// src/components/professional/index.ts
// Professional CAD Tools - Main Export Index

export { default as ProfessionalCADTools } from './ProfessionalCADTools';
export { default as ProfessionalMaterialLibrary } from './ProfessionalMaterialLibrary';
export { default as ProfessionalWorkflowManager } from './ProfessionalWorkflowManager';
export { default as ProfessionalCADIntegrationHub } from './ProfessionalCADIntegrationHub';
export { default as AdvancedCADDashboard } from './AdvancedCADDashboard';
export { default as LaunchReadinessReport } from './LaunchReadinessReport';
export { default as VastuPlanGenerator } from './VastuPlanGenerator';
export { default as VastuPlanDemo } from './VastuPlanDemo';

// Re-export types for external use
export type {
  CADTool,
  Material,
  ProjectFile,
  AdvancedMaterial,
  MaterialCategory,
  WorkflowStep,
  WorkflowPhase,
  ProjectWorkflow,
  TeamMember,
  IntegrationStatus,
  SyncJob,
  IntegrationRule,
  PerformanceMetric
} from './types';

// Professional Tools Configuration
export const PROFESSIONAL_TOOLS_CONFIG = {
  version: '2.0.0',
  lastUpdated: '2024-10-26',
  supportedCADTools: [
    'AutoCAD Professional',
    'SketchUp Pro',
    '3ds Max',
    'Autodesk Revit',
    'V-Ray',
    'Rhino',
    'Grasshopper',
    'Blender',
    'Cinema 4D',
    'Maya'
  ],
  supportedFileFormats: [
    '.dwg', '.dxf', '.skp', '.max', '.rvt', '.rfa', '.obj', '.fbx', '.ifc',
    '.3ds', '.dae', '.stl', '.ply', '.wrl', '.x3d', '.blend', '.c4d', '.ma'
  ],
  materialCategories: [
    'wall', 'floor', 'ceiling', 'furniture', 'texture', 'landscape',
    'exterior', 'interior', 'structural', 'decorative'
  ],
  workflowPhases: [
    'concept', 'schematic', 'design_development', 'construction_documents',
    'bidding', 'construction', 'post_construction'
  ]
};

// Integration Status Constants
export const INTEGRATION_STATUS = {
  CONNECTED: 'connected',
  CONNECTING: 'connecting',
  DISCONNECTED: 'disconnected',
  ERROR: 'error',
  MAINTENANCE: 'maintenance'
} as const;

// Sync Job Status Constants
export const SYNC_STATUS = {
  PENDING: 'pending',
  RUNNING: 'running',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled'
} as const;

// Priority Levels
export const PRIORITY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical'
} as const;

// Material Types
export const MATERIAL_TYPES = {
  SOLID: 'solid',
  PATTERN: 'pattern',
  METALLIC: 'metallic',
  GLASS: 'glass',
  WOOD: 'wood',
  STONE: 'stone',
  FABRIC: 'fabric',
  CERAMIC: 'ceramic'
} as const;

// Sustainability Ratings
export const SUSTAINABILITY_RATINGS = {
  A: 'A',
  B: 'B',
  C: 'C',
  D: 'D'
} as const;

// Fire Ratings
export const FIRE_RATINGS = {
  A1: 'A1',
  A2: 'A2',
  B: 'B',
  C: 'C',
  D: 'D',
  E: 'E',
  F: 'F'
} as const;

// Default Configuration
export const DEFAULT_CONFIG = {
  syncInterval: 15, // minutes
  maxRetries: 3,
  healthThreshold: 70, // percentage
  dataRetentionDays: 90,
  backupFrequency: 'daily',
  notificationEnabled: true,
  autoSync: true,
  qualityThreshold: 80 // percentage
};

// Professional Tools Feature Flags
export const FEATURE_FLAGS = {
  ADVANCED_MATERIAL_LIBRARY: true,
  WORKFLOW_MANAGEMENT: true,
  REAL_TIME_COLLABORATION: true,
  CLOUD_SYNC: true,
  AI_ASSISTED_DESIGN: true,
  PERFORMANCE_ANALYTICS: true,
  SECURITY_AUDIT: true,
  BACKUP_RESTORE: true,
  VERSION_CONTROL: true,
  API_INTEGRATION: true
};

// Export utility functions
export const ProfessionalToolsUtils = {
  // Calculate material cost based on area and unit price
  calculateMaterialCost: (area: number, unitPrice: number, wasteFactor: number = 0.1) => {
    return area * unitPrice * (1 + wasteFactor);
  },

  // Calculate project progress based on completed phases
  calculateProjectProgress: (phases: any[]) => {
    if (phases.length === 0) return 0;
    const completedPhases = phases.filter(phase => phase.status === 'completed').length;
    return Math.round((completedPhases / phases.length) * 100);
  },

  // Format file size for display
  formatFileSize: (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },

  // Get status color for UI components
  getStatusColor: (status: string): string => {
    const statusColors: Record<string, string> = {
      'connected': 'bg-green-100 text-green-800',
      'connecting': 'bg-blue-100 text-blue-800',
      'disconnected': 'bg-gray-100 text-gray-800',
      'error': 'bg-red-100 text-red-800',
      'maintenance': 'bg-yellow-100 text-yellow-800',
      'completed': 'bg-green-100 text-green-800',
      'in-progress': 'bg-blue-100 text-blue-800',
      'pending': 'bg-gray-100 text-gray-800',
      'failed': 'bg-red-100 text-red-800'
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  },

  // Validate CAD file format
  isValidCADFormat: (filename: string): boolean => {
    const validExtensions = [
      '.dwg', '.dxf', '.skp', '.max', '.rvt', '.rfa', '.obj', '.fbx', '.ifc',
      '.3ds', '.dae', '.stl', '.ply', '.wrl', '.x3d', '.blend', '.c4d', '.ma'
    ];
    const extension = filename.toLowerCase().substring(filename.lastIndexOf('.'));
    return validExtensions.includes(extension);
  },

  // Calculate material sustainability score
  calculateSustainabilityScore: (material: any): number => {
    let score = 0;
    
    // Base score from sustainability rating
    const ratingScores = { 'A': 25, 'B': 20, 'C': 15, 'D': 10 };
    score += ratingScores[material.sustainability] || 0;
    
    // Additional points for eco-friendly properties
    if (material.tags?.includes('recycled')) score += 15;
    if (material.tags?.includes('renewable')) score += 10;
    if (material.tags?.includes('local')) score += 5;
    if (material.tags?.includes('low-voc')) score += 5;
    
    return Math.min(score, 100);
  },

  // Generate unique ID for new items
  generateUniqueId: (): string => {
    return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  },

  // Format date for display
  formatDate: (date: string | Date): string => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  },

  // Calculate time difference
  getTimeDifference: (startTime: string, endTime?: string): string => {
    const start = new Date(startTime);
    const end = endTime ? new Date(endTime) : new Date();
    const diffMs = end.getTime() - start.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffHours > 0) {
      return `${diffHours}h ${diffMinutes}m`;
    }
    return `${diffMinutes}m`;
  }
};

// Export default configuration
export default {
  PROFESSIONAL_TOOLS_CONFIG,
  ProfessionalToolsUtils,
  DEFAULT_CONFIG,
  FEATURE_FLAGS
};



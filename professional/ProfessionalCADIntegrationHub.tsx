// src/components/professional/ProfessionalCADIntegrationHub.tsx
// Professional CAD Integration Hub - Central Control Center

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap, Settings, RefreshCw, Activity, TrendingUp, AlertTriangle, 
  CheckCircle, Clock, Users, Database, Cloud, Shield, Lock,
  Play, Pause, Square, RotateCcw, Power, Wifi, WifiOff, 
  FileText, Box, Palette, Workflow, BarChart3, GitBranch,
  MessageSquare, Bell, Star, Heart, Share2, Download, Upload
} from 'lucide-react';

interface IntegrationStatus {
  id: string;
  name: string;
  type: 'cad_tool' | 'material_library' | 'workflow' | 'cloud_service' | 'database';
  status: 'connected' | 'connecting' | 'disconnected' | 'error' | 'maintenance';
  lastSync: string;
  syncInterval: number; // in minutes
  health: number; // 0-100
  version: string;
  apiEndpoint: string;
  credentials: 'valid' | 'expired' | 'invalid' | 'none';
  permissions: string[];
  dataSize: number; // in MB
  lastError?: string;
  retryCount: number;
  maxRetries: number;
}

interface SyncJob {
  id: string;
  name: string;
  source: string;
  target: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
  progress: number; // 0-100
  startTime: string;
  endTime?: string;
  dataSize: number;
  priority: 'low' | 'medium' | 'high' | 'critical';
  retryCount: number;
  maxRetries: number;
  errorMessage?: string;
}

interface IntegrationRule {
  id: string;
  name: string;
  description: string;
  source: string;
  target: string;
  trigger: 'manual' | 'scheduled' | 'event_based' | 'real_time';
  schedule?: string; // cron expression
  conditions: string[];
  actions: string[];
  isActive: boolean;
  lastExecuted?: string;
  executionCount: number;
  successRate: number; // 0-100
}

interface PerformanceMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  change: number; // percentage change
  timestamp: string;
  category: 'performance' | 'reliability' | 'security' | 'efficiency';
}

const ProfessionalCADIntegrationHub: React.FC = () => {
  const [integrations, setIntegrations] = useState<IntegrationStatus[]>([]);
  const [syncJobs, setSyncJobs] = useState<SyncJob[]>([]);
  const [integrationRules, setIntegrationRules] = useState<IntegrationRule[]>([]);
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetric[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'integrations' | 'sync' | 'rules' | 'performance' | 'logs'>('overview');
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [autoSync, setAutoSync] = useState(true);
  const [syncInterval, setSyncInterval] = useState(15); // minutes

  // Mock data initialization
  useEffect(() => {
    const mockIntegrations: IntegrationStatus[] = [
      {
        id: 'autocad',
        name: 'AutoCAD Professional',
        type: 'cad_tool',
        status: 'connected',
        lastSync: '2024-10-26T10:30:00Z',
        syncInterval: 15,
        health: 95,
        version: '2024.2.1',
        apiEndpoint: 'https://api.autocad.com/v2',
        credentials: 'valid',
        permissions: ['read', 'write', 'sync'],
        dataSize: 2450,
        retryCount: 0,
        maxRetries: 3
      },
      {
        id: 'sketchup',
        name: 'SketchUp Pro',
        type: 'cad_tool',
        status: 'connected',
        lastSync: '2024-10-26T10:25:00Z',
        syncInterval: 15,
        health: 92,
        version: '2024.0.2',
        apiEndpoint: 'https://api.sketchup.com/v3',
        credentials: 'valid',
        permissions: ['read', 'write', 'sync'],
        dataSize: 1870,
        retryCount: 0,
        maxRetries: 3
      },
      {
        id: 'revit',
        name: 'Autodesk Revit',
        type: 'cad_tool',
        status: 'connecting',
        lastSync: '2024-10-26T10:15:00Z',
        syncInterval: 15,
        health: 78,
        version: '2024.1.0',
        apiEndpoint: 'https://api.revit.com/v2',
        credentials: 'expired',
        permissions: ['read', 'sync'],
        dataSize: 3200,
        lastError: 'Authentication token expired',
        retryCount: 2,
        maxRetries: 3
      },
      {
        id: 'material_library',
        name: 'Professional Material Library',
        type: 'material_library',
        status: 'connected',
        lastSync: '2024-10-26T10:28:00Z',
        syncInterval: 30,
        health: 98,
        version: '2.1.0',
        apiEndpoint: 'https://api.materials.com/v1',
        credentials: 'valid',
        permissions: ['read', 'write', 'sync', 'admin'],
        dataSize: 890,
        retryCount: 0,
        maxRetries: 3
      },
      {
        id: 'workflow_manager',
        name: 'Workflow Management System',
        type: 'workflow',
        status: 'connected',
        lastSync: '2024-10-26T10:32:00Z',
        syncInterval: 5,
        health: 96,
        version: '3.0.1',
        apiEndpoint: 'https://api.workflow.com/v3',
        credentials: 'valid',
        permissions: ['read', 'write', 'sync', 'admin'],
        dataSize: 1560,
        retryCount: 0,
        maxRetries: 3
      },
      {
        id: 'cloud_storage',
        name: 'Cloud Storage Service',
        type: 'cloud_service',
        status: 'connected',
        lastSync: '2024-10-26T10:35:00Z',
        syncInterval: 10,
        health: 99,
        version: '1.5.2',
        apiEndpoint: 'https://api.cloud.com/v2',
        credentials: 'valid',
        permissions: ['read', 'write', 'sync'],
        dataSize: 15400,
        retryCount: 0,
        maxRetries: 3
      }
    ];

    const mockSyncJobs: SyncJob[] = [
      {
        id: 'sync_001',
        name: 'AutoCAD Project Sync',
        source: 'AutoCAD Professional',
        target: 'Cloud Storage',
        status: 'running',
        progress: 65,
        startTime: '2024-10-26T10:30:00Z',
        dataSize: 450,
        priority: 'high',
        retryCount: 0,
        maxRetries: 3
      },
      {
        id: 'sync_002',
        name: 'Material Library Update',
        source: 'Professional Material Library',
        target: 'Local Cache',
        status: 'completed',
        progress: 100,
        startTime: '2024-10-26T10:25:00Z',
        endTime: '2024-10-26T10:27:00Z',
        dataSize: 120,
        priority: 'medium',
        retryCount: 0,
        maxRetries: 3
      },
      {
        id: 'sync_003',
        name: 'Workflow Data Export',
        source: 'Workflow Management System',
        target: 'External API',
        status: 'failed',
        progress: 0,
        startTime: '2024-10-26T10:20:00Z',
        dataSize: 85,
        priority: 'critical',
        retryCount: 2,
        maxRetries: 3,
        errorMessage: 'API rate limit exceeded'
      }
    ];

    const mockIntegrationRules: IntegrationRule[] = [
      {
        id: 'rule_001',
        name: 'AutoCAD to Cloud Sync',
        description: 'Automatically sync AutoCAD projects to cloud storage every 15 minutes',
        source: 'AutoCAD Professional',
        target: 'Cloud Storage',
        trigger: 'scheduled',
        schedule: '*/15 * * * *',
        conditions: ['Project modified', 'File size > 1MB'],
        actions: ['Upload to cloud', 'Update metadata', 'Send notification'],
        isActive: true,
        lastExecuted: '2024-10-26T10:30:00Z',
        executionCount: 156,
        successRate: 98.7
      },
      {
        id: 'rule_002',
        name: 'Material Library Backup',
        description: 'Backup material library to external storage daily at 2 AM',
        source: 'Professional Material Library',
        target: 'External Storage',
        trigger: 'scheduled',
        schedule: '0 2 * * *',
        conditions: ['Daily backup time', 'New materials added'],
        actions: ['Create backup', 'Verify integrity', 'Log backup'],
        isActive: true,
        lastExecuted: '2024-10-26T02:00:00Z',
        executionCount: 45,
        successRate: 100.0
      },
      {
        id: 'rule_003',
        name: 'Workflow Status Update',
        description: 'Update workflow status in real-time when tasks are modified',
        source: 'Workflow Management System',
        target: 'All CAD Tools',
        trigger: 'real_time',
        conditions: ['Task status changed', 'Progress updated'],
        actions: ['Update status', 'Notify team', 'Sync data'],
        isActive: true,
        lastExecuted: '2024-10-26T10:32:00Z',
        executionCount: 1247,
        successRate: 99.2
      }
    ];

    const mockPerformanceMetrics: PerformanceMetric[] = [
      {
        id: 'metric_001',
        name: 'Sync Success Rate',
        value: 98.5,
        unit: '%',
        trend: 'up',
        change: 2.1,
        timestamp: '2024-10-26T10:35:00Z',
        category: 'reliability'
      },
      {
        id: 'metric_002',
        name: 'Average Sync Time',
        value: 2.3,
        unit: 'seconds',
        trend: 'down',
        change: -15.2,
        timestamp: '2024-10-26T10:35:00Z',
        category: 'performance'
      },
      {
        id: 'metric_003',
        name: 'Data Transfer Rate',
        value: 45.2,
        unit: 'MB/s',
        trend: 'up',
        change: 8.7,
        timestamp: '2024-10-26T10:35:00Z',
        category: 'performance'
      },
      {
        id: 'metric_004',
        name: 'API Response Time',
        value: 180,
        unit: 'ms',
        trend: 'stable',
        change: 0.5,
        timestamp: '2024-10-26T10:35:00Z',
        category: 'performance'
      },
      {
        id: 'metric_005',
        name: 'System Uptime',
        value: 99.9,
        unit: '%',
        trend: 'stable',
        change: 0.0,
        timestamp: '2024-10-26T10:35:00Z',
        category: 'reliability'
      },
      {
        id: 'metric_006',
        name: 'Security Score',
        value: 95.8,
        unit: '/100',
        trend: 'up',
        change: 1.2,
        timestamp: '2024-10-26T10:35:00Z',
        category: 'security'
      }
    ];

    setIntegrations(mockIntegrations);
    setSyncJobs(mockSyncJobs);
    setIntegrationRules(mockIntegrationRules);
    setPerformanceMetrics(mockPerformanceMetrics);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-800';
      case 'connecting': return 'bg-blue-100 text-blue-800';
      case 'disconnected': return 'bg-gray-100 text-gray-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'connecting': return <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />;
      case 'disconnected': return <WifiOff className="w-5 h-5 text-gray-600" />;
      case 'error': return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'maintenance': return <Settings className="w-5 h-5 text-yellow-600" />;
      default: return <WifiOff className="w-5 h-5 text-gray-600" />;
    }
  };

  const getHealthColor = (health: number) => {
    if (health >= 90) return 'text-green-600';
    if (health >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSyncStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Connected Services</h3>
            <Zap className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-3xl font-bold text-blue-600">
            {integrations.filter(i => i.status === 'connected').length}
          </div>
          <div className="text-sm text-gray-600">of {integrations.length} total</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Active Sync Jobs</h3>
            <Activity className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-green-600">
            {syncJobs.filter(j => j.status === 'running').length}
          </div>
          <div className="text-sm text-gray-600">currently running</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">System Health</h3>
            <TrendingUp className="w-6 h-6 text-purple-600" />
          </div>
          <div className="text-3xl font-bold text-purple-600">
            {Math.round(integrations.reduce((acc, i) => acc + i.health, 0) / integrations.length)}%
          </div>
          <div className="text-sm text-gray-600">average health</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Data Synced</h3>
            <Database className="w-6 h-6 text-orange-600" />
          </div>
          <div className="text-3xl font-bold text-orange-600">
            {Math.round(integrations.reduce((acc, i) => acc + i.dataSize, 0) / 1024)} GB
          </div>
          <div className="text-sm text-gray-600">total data</div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {syncJobs.slice(0, 5).map((job) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  job.status === 'running' ? 'bg-blue-500' :
                  job.status === 'completed' ? 'bg-green-500' :
                  job.status === 'failed' ? 'bg-red-500' :
                  'bg-gray-500'
                }`}></div>
                <div>
                  <p className="font-medium text-gray-900">{job.name}</p>
                  <p className="text-sm text-gray-600">{job.source} → {job.target}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSyncStatusColor(job.status)}`}>
                  {job.status}
                </span>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(job.startTime).toLocaleTimeString()}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {performanceMetrics.slice(0, 3).map((metric) => (
            <div key={metric.id} className="text-center">
              <div className={`text-2xl font-bold ${
                metric.trend === 'up' ? 'text-green-600' :
                metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
              }`}>
                {metric.value} {metric.unit}
              </div>
              <div className="text-sm text-gray-600">{metric.name}</div>
              <div className={`text-xs ${
                metric.trend === 'up' ? 'text-green-600' :
                metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
              }`}>
                {metric.trend === 'up' ? '↗' : metric.trend === 'down' ? '↘' : '→'} {metric.change}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderIntegrations = () => (
    <div className="space-y-6">
      {/* Integration Controls */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Integration Controls</h3>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={autoSync}
                onChange={(e) => setAutoSync(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Auto-sync</span>
            </label>
            <select
              value={syncInterval}
              onChange={(e) => setSyncInterval(Number(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={5}>5 min</option>
              <option value={15}>15 min</option>
              <option value={30}>30 min</option>
              <option value={60}>1 hour</option>
            </select>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <RefreshCw className="w-4 h-4 mr-2" />
              Sync All
            </button>
          </div>
        </div>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((integration) => (
          <motion.div
            key={integration.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all cursor-pointer"
            onClick={() => setSelectedIntegration(integration.id)}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{integration.name}</h3>
                  <p className="text-sm text-gray-600 capitalize">{integration.type.replace('_', ' ')}</p>
                </div>
                {getStatusIcon(integration.status)}
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Status</span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(integration.status)}`}>
                    {integration.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Health</span>
                  <span className={`font-medium ${getHealthColor(integration.health)}`}>
                    {integration.health}%
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Version</span>
                  <span className="font-medium">{integration.version}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Last Sync</span>
                  <span className="font-medium">
                    {new Date(integration.lastSync).toLocaleTimeString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Data Size</span>
                  <span className="font-medium">{integration.dataSize} MB</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    {integration.permissions.length} permissions
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">
                      Configure
                    </button>
                    <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300 transition-colors">
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderSyncJobs = () => (
    <div className="space-y-6">
      {/* Sync Jobs Controls */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Sync Jobs</h3>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Play className="w-4 h-4 mr-2" />
              Start All
            </button>
            <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
              <Pause className="w-4 h-4 mr-2" />
              Pause All
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              <Square className="w-4 h-4 mr-2" />
              Stop All
            </button>
          </div>
        </div>
      </div>

      {/* Sync Jobs List */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {syncJobs.map((job) => (
                <motion.tr
                  key={job.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{job.name}</div>
                      <div className="text-sm text-gray-500">{job.source} → {job.target}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSyncStatusColor(job.status)}`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${job.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-900">{job.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(job.priority)}`}>
                      {job.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(job.startTime).toLocaleTimeString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {job.status === 'running' && (
                        <button className="text-yellow-600 hover:text-yellow-900">Pause</button>
                      )}
                      {job.status === 'pending' && (
                        <button className="text-green-600 hover:text-green-900">Start</button>
                      )}
                      <button className="text-blue-600 hover:text-blue-900">View</button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-gray-900">Professional CAD Integration Hub</h1>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">{integrations.length} integrations</span>
                <span className="text-sm text-gray-400">•</span>
                <span className="text-sm text-gray-600">
                  {integrations.filter(i => i.status === 'connected').length} connected
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh All
              </button>
              <button 
                onClick={() => setShowSettings(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: Activity },
              { id: 'integrations', label: 'Integrations', icon: Zap },
              { id: 'sync', label: 'Sync Jobs', icon: RefreshCw },
              { id: 'rules', label: 'Rules', icon: GitBranch },
              { id: 'performance', label: 'Performance', icon: BarChart3 },
              { id: 'logs', label: 'Logs', icon: FileText }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-3 py-4 border-b-2 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-700'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'integrations' && renderIntegrations()}
          {activeTab === 'sync' && renderSyncJobs()}
          {activeTab === 'rules' && <div>Rules Management (Coming Soon)</div>}
          {activeTab === 'performance' && <div>Performance Analytics (Coming Soon)</div>}
          {activeTab === 'logs' && <div>System Logs (Coming Soon)</div>}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProfessionalCADIntegrationHub;

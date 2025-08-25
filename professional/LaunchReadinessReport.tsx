// src/components/professional/LaunchReadinessReport.tsx
// Professional CAD Tools Platform - Launch Readiness Report

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, AlertCircle, Clock, Rocket, Shield, Zap, 
  Database, Settings, Users, BarChart3, FileText, Target,
  TrendingUp, Award, Star, Flame, Crown, Brain, Sparkles,
  ArrowRight, ExternalLink, Download, Upload, RefreshCw
} from 'lucide-react';
import { LAUNCH_CONFIG } from './LaunchConfig';

interface ChecklistItem {
  id: string;
  category: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'pending' | 'blocked';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignee?: string;
  dueDate?: string;
  notes?: string;
}

const LaunchReadinessReport: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'checklist' | 'timeline' | 'metrics' | 'actions'>('overview');
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([
    // Technical Requirements
    {
      id: 'tech-001',
      category: 'Technical',
      title: 'TypeScript Compilation',
      description: 'Resolve all TypeScript compilation errors',
      status: 'in-progress',
      priority: 'critical',
      assignee: 'Development Team',
      dueDate: '2024-10-27',
      notes: 'Several icon import issues resolved, need final verification'
    },
    {
      id: 'tech-002',
      category: 'Technical',
      title: 'Performance Optimization',
      description: 'Implement lazy loading and code splitting',
      status: 'pending',
      priority: 'high',
      assignee: 'Frontend Team',
      dueDate: '2024-10-28'
    },
    {
      id: 'tech-003',
      category: 'Technical',
      title: 'Security Implementation',
      description: 'Implement authentication and authorization',
      status: 'pending',
      priority: 'critical',
      assignee: 'Security Team',
      dueDate: '2024-10-29'
    },
    
    // Quality Assurance
    {
      id: 'qa-001',
      category: 'QA',
      title: 'Unit Testing',
      description: 'Achieve >90% test coverage',
      status: 'pending',
      priority: 'high',
      assignee: 'QA Team',
      dueDate: '2024-10-30'
    },
    {
      id: 'qa-002',
      category: 'QA',
      title: 'Integration Testing',
      description: 'Complete end-to-end testing',
      status: 'pending',
      priority: 'high',
      assignee: 'QA Team',
      dueDate: '2024-10-31'
    },
    
    // Documentation
    {
      id: 'doc-001',
      category: 'Documentation',
      title: 'API Documentation',
      description: 'Complete REST and GraphQL API docs',
      status: 'pending',
      priority: 'medium',
      assignee: 'Technical Writer',
      dueDate: '2024-11-01'
    },
    {
      id: 'doc-002',
      category: 'Documentation',
      title: 'User Manual',
      description: 'Create comprehensive user guide',
      status: 'pending',
      priority: 'medium',
      assignee: 'Technical Writer',
      dueDate: '2024-11-02'
    },
    
    // Business Requirements
    {
      id: 'business-001',
      category: 'Business',
      title: 'Legal Review',
      description: 'Complete terms of service and privacy policy',
      status: 'pending',
      priority: 'critical',
      assignee: 'Legal Team',
      dueDate: '2024-10-30'
    },
    {
      id: 'business-002',
      category: 'Business',
      title: 'Pricing Strategy',
      description: 'Define pricing tiers and subscription plans',
      status: 'pending',
      priority: 'high',
      assignee: 'Product Manager',
      dueDate: '2024-10-29'
    }
  ]);

  const [currentPhase, setCurrentPhase] = useState(LAUNCH_CONFIG.timeline.currentPhase);
  const [overallProgress, setOverallProgress] = useState(0);

  useEffect(() => {
    // Calculate overall progress
    const total = checklistItems.length;
    const completed = checklistItems.filter(item => item.status === 'completed').length;
    const inProgress = checklistItems.filter(item => item.status === 'in-progress').length;
    
    const progress = ((completed + (inProgress * 0.5)) / total) * 100;
    setOverallProgress(Math.round(progress));
  }, [checklistItems]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'blocked': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-100 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-100 border-green-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'in-progress': return <Clock className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'blocked': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Launch Status */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">Launch Readiness Status</h2>
            <p className="text-blue-100">Professional CAD Tools Platform</p>
          </div>
          <Rocket className="w-16 h-16 text-blue-200" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold">{overallProgress}%</div>
            <div className="text-blue-100 text-sm">Overall Progress</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">
              {checklistItems.filter(item => item.status === 'completed').length}
            </div>
            <div className="text-blue-100 text-sm">Completed Tasks</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">
              {checklistItems.filter(item => item.priority === 'critical').length}
            </div>
            <div className="text-blue-100 text-sm">Critical Items</div>
          </div>
        </div>
      </div>

      {/* Progress Bars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Progress by Category</h3>
          {['Technical', 'QA', 'Documentation', 'Business'].map(category => {
            const categoryItems = checklistItems.filter(item => item.category === category);
            const completed = categoryItems.filter(item => item.status === 'completed').length;
            const total = categoryItems.length;
            const progress = total > 0 ? (completed / total) * 100 : 0;
            
            return (
              <div key={category} className="mb-4">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>{category}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Priority Distribution</h3>
          {['critical', 'high', 'medium', 'low'].map(priority => {
            const count = checklistItems.filter(item => item.priority === priority).length;
            const total = checklistItems.length;
            const percentage = total > 0 ? (count / total) * 100 : 0;
            
            return (
              <div key={priority} className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(priority)}`}>
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </span>
                  <span className="text-sm text-gray-600">{count} items</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{Math.round(percentage)}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Current Phase */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Launch Phase</h3>
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <div className="text-2xl font-bold text-blue-600 mb-2">
              {currentPhase.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </div>
            <p className="text-gray-600">
              {LAUNCH_CONFIG.timeline.phases.find(p => p.name === currentPhase)?.startDate} - 
              {LAUNCH_CONFIG.timeline.phases.find(p => p.name === currentPhase)?.endDate}
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Next Phase</div>
            <div className="text-lg font-semibold text-gray-900">
              {LAUNCH_CONFIG.timeline.phases.find(p => p.name === currentPhase)?.status === 'completed' ? 
                'Production Deployment' : 'Staging Deployment'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderChecklist = () => (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="flex flex-wrap gap-4">
          <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option value="all">All Categories</option>
            <option value="Technical">Technical</option>
            <option value="QA">QA</option>
            <option value="Documentation">Documentation</option>
            <option value="Business">Business</option>
          </select>
          
          <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="in-progress">In Progress</option>
            <option value="pending">Pending</option>
            <option value="blocked">Blocked</option>
          </select>
          
          <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option value="all">All Priorities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Checklist Items */}
      <div className="space-y-4">
        {checklistItems.map(item => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                    {item.status.replace('-', ' ')}
                  </span>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getPriorityColor(item.priority)}`}>
                    {item.priority}
                  </span>
                  <span className="text-sm text-gray-500">{item.category}</span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-3">{item.description}</p>
                
                {item.assignee && (
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                    <span>Assignee: {item.assignee}</span>
                    {item.dueDate && <span>Due: {item.dueDate}</span>}
                  </div>
                )}
                
                {item.notes && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm text-gray-600">{item.notes}</div>
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                {getStatusIcon(item.status)}
                <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderTimeline = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Launch Timeline</h3>
        
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
          
          {LAUNCH_CONFIG.timeline.phases.map((phase, index) => (
            <div key={phase.name} className="relative flex items-start mb-8">
              {/* Timeline Dot */}
              <div className={`absolute left-6 w-4 h-4 rounded-full border-2 border-white ${
                phase.status === 'completed' ? 'bg-green-500' :
                phase.status === 'in-progress' ? 'bg-blue-500' :
                'bg-gray-300'
              }`}></div>
              
              <div className="ml-16 flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-semibold text-gray-900">
                    {phase.name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </h4>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    phase.status === 'completed' ? 'bg-green-100 text-green-800' :
                    phase.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {phase.status}
                  </span>
                </div>
                
                <div className="text-sm text-gray-600 mb-2">
                  {phase.startDate} - {phase.endDate}
                </div>
                
                {phase.status === 'in-progress' && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="text-sm text-blue-800">
                      <strong>Current Phase:</strong> Final testing and bug fixes in progress
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMetrics = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{overallProgress}%</div>
          <div className="text-sm text-gray-600">Launch Readiness</div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Target className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {checklistItems.filter(item => item.priority === 'critical').length}
          </div>
          <div className="text-sm text-gray-600">Critical Items</div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 text-center">
          <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Clock className="w-6 h-6 text-yellow-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {checklistItems.filter(item => item.status === 'pending').length}
          </div>
          <div className="text-sm text-gray-600">Pending Tasks</div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-6 h-6 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {checklistItems.filter(item => item.status === 'completed').length}
          </div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>
      </div>

      {/* Progress Chart */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Progress Over Time</h3>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center text-gray-500">
            <BarChart3 className="w-16 h-16 mx-auto mb-4" />
            <p>Progress chart visualization</p>
            <p className="text-sm">(Would show actual progress over time)</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderActions = () => (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="flex items-center justify-center space-x-2 p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <RefreshCw className="w-5 h-5" />
            <span>Refresh Status</span>
          </button>
          
          <button className="flex items-center justify-center space-x-2 p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <Download className="w-5 h-5" />
            <span>Export Report</span>
          </button>
          
          <button className="flex items-center justify-center space-x-2 p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            <Users className="w-5 h-5" />
            <span>Assign Tasks</span>
          </button>
          
          <button className="flex items-center justify-center space-x-2 p-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
            <Settings className="w-5 h-5" />
            <span>Update Status</span>
          </button>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Next Steps</h3>
        <div className="space-y-4">
          {checklistItems
            .filter(item => item.status === 'pending' && item.priority === 'critical')
            .slice(0, 5)
            .map(item => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                <div>
                  <div className="font-medium text-red-900">{item.title}</div>
                  <div className="text-sm text-red-700">{item.description}</div>
                </div>
                <button className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors">
                  Start
                </button>
              </div>
            ))}
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
              <h1 className="text-2xl font-bold text-gray-900">Launch Readiness Report</h1>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Platform: {LAUNCH_CONFIG.platform.name}</span>
                <span className="text-sm text-gray-400">•</span>
                <span className="text-sm text-gray-600">Version: {LAUNCH_CONFIG.platform.version}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                overallProgress >= 90 ? 'bg-green-100 text-green-800' :
                overallProgress >= 70 ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {overallProgress >= 90 ? 'Ready for Launch' :
                 overallProgress >= 70 ? 'Almost Ready' :
                 'Needs Work'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'checklist', label: 'Checklist', icon: CheckCircle },
              { id: 'timeline', label: 'Timeline', icon: Clock },
              { id: 'metrics', label: 'Metrics', icon: TrendingUp },
              { id: 'actions', label: 'Actions', icon: Settings }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === item.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderOverview()}
            </motion.div>
          )}
          
          {activeTab === 'checklist' && (
            <motion.div
              key="checklist"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderChecklist()}
            </motion.div>
          )}
          
          {activeTab === 'timeline' && (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderTimeline()}
            </motion.div>
          )}
          
          {activeTab === 'metrics' && (
            <motion.div
              key="metrics"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderMetrics()}
            </motion.div>
          )}
          
          {activeTab === 'actions' && (
            <motion.div
              key="actions"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderActions()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LaunchReadinessReport;

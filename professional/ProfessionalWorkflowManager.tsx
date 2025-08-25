// src/components/professional/ProfessionalWorkflowManager.tsx
// Professional CAD Workflow Management and Collaboration System

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Workflow, Users, Clock, CheckCircle, AlertCircle, Play, Pause, 
  Square, RotateCcw, Settings, Share2, Download, Upload, Plus,
  MessageSquare, FileText, Calendar, Target, TrendingUp, BarChart3,
  GitBranch, GitCommit, GitPullRequest, Activity, Zap, Shield
} from 'lucide-react';

interface WorkflowStep {
  id: string;
  name: string;
  description: string;
  tool: string;
  toolIcon: string;
  status: 'pending' | 'in-progress' | 'completed' | 'error' | 'skipped';
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
}

interface WorkflowPhase {
  id: string;
  name: string;
  description: string;
  steps: WorkflowStep[];
  status: 'planning' | 'active' | 'review' | 'completed';
  startDate?: string;
  endDate?: string;
  budget: number;
  actualCost: number;
}

interface ProjectWorkflow {
  id: string;
  name: string;
  description: string;
  phases: WorkflowPhase[];
  status: 'draft' | 'active' | 'paused' | 'completed' | 'archived';
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
}

interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  role: 'project_manager' | 'architect' | 'engineer' | 'designer' | 'reviewer';
  status: 'online' | 'offline' | 'busy' | 'away';
  currentTask?: string;
  workload: number; // 0-100
  skills: string[];
}

const ProfessionalWorkflowManager: React.FC = () => {
  const [workflows, setWorkflows] = useState<ProjectWorkflow[]>([]);
  const [activeWorkflow, setActiveWorkflow] = useState<ProjectWorkflow | null>(null);
  const [selectedPhase, setSelectedPhase] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'kanban' | 'timeline' | 'gantt' | 'list'>('kanban');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  // Mock data initialization
  useEffect(() => {
    const mockTeamMembers: TeamMember[] = [
      {
        id: 'pm_001',
        name: 'Sarah Chen',
        avatar: '/avatars/sarah.jpg',
        role: 'project_manager',
        status: 'online',
        currentTask: 'Review Phase 2 deliverables',
        workload: 75,
        skills: ['Project Management', 'AutoCAD', 'Revit', 'Agile']
      },
      {
        id: 'arch_001',
        name: 'Michael Rodriguez',
        avatar: '/avatars/michael.jpg',
        role: 'architect',
        status: 'busy',
        currentTask: '3D modeling in SketchUp',
        workload: 90,
        skills: ['SketchUp', '3ds Max', 'V-Ray', 'Architecture']
      },
      {
        id: 'eng_001',
        name: 'Emily Watson',
        avatar: '/avatars/emily.jpg',
        role: 'engineer',
        status: 'online',
        currentTask: 'Structural analysis',
        workload: 60,
        skills: ['Structural Analysis', 'AutoCAD', 'Revit', 'Engineering']
      },
      {
        id: 'des_001',
        name: 'David Kim',
        avatar: '/avatars/david.jpg',
        role: 'designer',
        status: 'away',
        currentTask: 'Material selection',
        workload: 45,
        skills: ['Interior Design', 'Material Selection', 'SketchUp', 'Rendering']
      }
    ];

    const mockWorkflows: ProjectWorkflow[] = [
      {
        id: 'wf_001',
        name: 'Luxury Villa Project',
        description: 'Modern luxury villa with sustainable design elements',
        phases: [
          {
            id: 'phase_1',
            name: 'Concept Design',
            description: 'Initial concept development and client approval',
            steps: [
              {
                id: 'step_1_1',
                name: 'Site Analysis',
                description: 'Analyze site conditions and constraints',
                tool: 'Site Analysis Tool',
                toolIcon: '🌍',
                status: 'completed',
                priority: 'high',
                estimatedDuration: 8,
                actualDuration: 7,
                dependencies: [],
                assignee: 'Sarah Chen',
                assigneeAvatar: '/avatars/sarah.jpg',
                startDate: '2024-10-20',
                endDate: '2024-10-22',
                progress: 100,
                notes: ['Site survey completed', 'Zoning requirements reviewed'],
                attachments: ['site_survey.pdf', 'zoning_report.pdf'],
                qualityScore: 95,
                cost: 1200,
                credits: 15
              },
              {
                id: 'step_1_2',
                name: 'Concept Sketches',
                description: 'Develop initial design concepts',
                tool: 'SketchUp Pro',
                toolIcon: '✏️',
                status: 'completed',
                priority: 'high',
                estimatedDuration: 16,
                actualDuration: 14,
                dependencies: ['step_1_1'],
                assignee: 'Michael Rodriguez',
                assigneeAvatar: '/avatars/michael.jpg',
                startDate: '2024-10-23',
                endDate: '2024-10-25',
                progress: 100,
                notes: ['3 concepts developed', 'Client feedback incorporated'],
                attachments: ['concept_sketches.skp', 'client_presentation.pdf'],
                qualityScore: 92,
                cost: 2400,
                credits: 30
              }
            ],
            status: 'completed',
            startDate: '2024-10-20',
            endDate: '2024-10-25',
            budget: 5000,
            actualCost: 3600
          },
          {
            id: 'phase_2',
            name: 'Detailed Design',
            description: 'Detailed architectural and engineering design',
            steps: [
              {
                id: 'step_2_1',
                name: 'Floor Plans',
                description: 'Develop detailed floor plans',
                tool: 'AutoCAD Professional',
                toolIcon: '📐',
                status: 'in-progress',
                priority: 'critical',
                estimatedDuration: 24,
                actualDuration: 18,
                dependencies: ['step_1_2'],
                assignee: 'Michael Rodriguez',
                assigneeAvatar: '/avatars/michael.jpg',
                startDate: '2024-10-26',
                endDate: '2024-10-30',
                progress: 75,
                notes: ['Ground floor completed', 'Upper floors in progress'],
                attachments: ['ground_floor.dwg', 'upper_floors.dwg'],
                cost: 3600,
                credits: 45
              },
              {
                id: 'step_2_2',
                name: 'Structural Design',
                description: 'Structural analysis and design',
                tool: 'Structural Analysis Tool',
                toolIcon: '🏗️',
                status: 'pending',
                priority: 'high',
                estimatedDuration: 20,
                dependencies: ['step_2_1'],
                assignee: 'Emily Watson',
                assigneeAvatar: '/avatars/emily.jpg',
                startDate: '2024-10-31',
                endDate: '2024-11-02',
                progress: 0,
                notes: ['Waiting for floor plans completion'],
                attachments: [],
                cost: 3000,
                credits: 40
              }
            ],
            status: 'active',
            startDate: '2024-10-26',
            endDate: '2024-11-02',
            budget: 8000,
            actualCost: 3600
          }
        ],
        status: 'active',
        priority: 'high',
        client: 'Luxury Homes Inc.',
        projectManager: 'Sarah Chen',
        team: ['Sarah Chen', 'Michael Rodriguez', 'Emily Watson', 'David Kim'],
        startDate: '2024-10-20',
        targetEndDate: '2024-12-15',
        budget: 25000,
        actualCost: 7200,
        progress: 35,
        tags: ['luxury', 'villa', 'sustainable', 'modern'],
        createdAt: '2024-10-15',
        lastModified: '2024-10-26'
      }
    ];

    setWorkflows(mockWorkflows);
    setTeamMembers(mockTeamMembers);
    if (mockWorkflows.length > 0) {
      setActiveWorkflow(mockWorkflows[0]);
    }
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'skipped': return 'bg-yellow-100 text-yellow-800';
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

  const getPhaseStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'active': return 'bg-blue-500';
      case 'review': return 'bg-yellow-500';
      case 'planning': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const renderKanbanView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {['pending', 'in-progress', 'review', 'completed'].map((status) => (
        <div key={status} className="bg-white rounded-xl shadow-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 capitalize">{status.replace('-', ' ')}</h3>
            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
              {activeWorkflow?.phases.flatMap(p => p.steps).filter(s => s.status === status).length || 0}
            </span>
          </div>
          
          <div className="space-y-3">
            {activeWorkflow?.phases.flatMap(p => p.steps)
              .filter(step => step.status === status)
              .map(step => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-50 rounded-lg p-3 border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900 text-sm">{step.name}</h4>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(step.priority)}`}>
                      {step.priority}
                    </span>
                  </div>
                  
                  <p className="text-xs text-gray-600 mb-3">{step.description}</p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs">
                        {step.toolIcon}
                      </div>
                      <span className="text-xs text-gray-600">{step.tool}</span>
                    </div>
                    <span className="text-xs text-gray-500">{step.estimatedDuration}h</span>
                  </div>
                  
                  {step.assignee && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-xs text-blue-600 font-medium">
                          {step.assignee.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-xs text-gray-600">{step.assignee}</span>
                      </div>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${step.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderTimelineView = () => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
        
        <div className="space-y-8">
          {activeWorkflow?.phases.map((phase, phaseIndex) => (
            <div key={phase.id} className="relative">
              {/* Phase Marker */}
              <div className="absolute left-6 w-4 h-4 rounded-full border-4 border-white shadow-lg"
                   style={{ backgroundColor: getPhaseStatusColor(phase.status), marginLeft: '-8px' }}></div>
              
              <div className="ml-16">
                <div className="flex items-center space-x-4 mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{phase.name}</h3>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(phase.status)}`}>
                    {phase.status}
                  </span>
                  <span className="text-sm text-gray-500">
                    {phase.startDate && new Date(phase.startDate).toLocaleDateString()} - 
                    {phase.endDate && new Date(phase.endDate).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="space-y-4">
                  {phase.steps.map((step, stepIndex) => (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: stepIndex * 0.1 }}
                      className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-gray-900">{step.name}</h4>
                          <p className="text-sm text-gray-600">{step.description}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(step.status)}`}>
                            {step.status}
                          </span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(step.priority)}`}>
                            {step.priority}
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Tool:</span>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-lg">{step.toolIcon}</span>
                            <span className="font-medium">{step.tool}</span>
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-600">Duration:</span>
                          <p className="font-medium">{step.estimatedDuration}h</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Assignee:</span>
                          <p className="font-medium">{step.assignee || 'Unassigned'}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Progress:</span>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${step.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-xs font-medium">{step.progress}%</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderGanttView = () => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 overflow-x-auto">
      <div className="min-w-[800px]">
        {/* Header */}
        <div className="grid grid-cols-12 gap-4 mb-4 pb-4 border-b border-gray-200">
          <div className="col-span-3 font-medium text-gray-900">Task</div>
          <div className="col-span-2 font-medium text-gray-900">Assignee</div>
          <div className="col-span-2 font-medium text-gray-900">Start</div>
          <div className="col-span-2 font-medium text-gray-900">End</div>
          <div className="col-span-2 font-medium text-gray-900">Duration</div>
          <div className="col-span-1 font-medium text-gray-900">Progress</div>
        </div>
        
        {/* Gantt Bars */}
        <div className="space-y-3">
          {activeWorkflow?.phases.flatMap(phase => 
            phase.steps.map(step => {
              const startDate = new Date(step.startDate || '');
              const endDate = new Date(step.endDate || '');
              const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
              
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-12 gap-4 items-center py-3 border-b border-gray-100"
                >
                  <div className="col-span-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{step.toolIcon}</span>
                      <div>
                        <p className="font-medium text-gray-900">{step.name}</p>
                        <p className="text-sm text-gray-600">{step.tool}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-xs text-blue-600 font-medium">
                        {step.assignee ? step.assignee.split(' ').map(n => n[0]).join('') : '?'}
                      </div>
                      <span className="text-sm text-gray-600">{step.assignee || 'Unassigned'}</span>
                    </div>
                  </div>
                  <div className="col-span-2 text-sm text-gray-600">
                    {step.startDate && new Date(step.startDate).toLocaleDateString()}
                  </div>
                  <div className="col-span-2 text-sm text-gray-600">
                    {step.endDate && new Date(step.endDate).toLocaleDateString()}
                  </div>
                  <div className="col-span-2 text-sm text-gray-600">
                    {duration} days
                  </div>
                  <div className="col-span-1">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${step.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );

  const renderListView = () => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phase</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignee</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {activeWorkflow?.phases.flatMap(phase => 
              phase.steps.map(step => (
                <motion.tr
                  key={step.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{step.toolIcon}</span>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{step.name}</div>
                        <div className="text-sm text-gray-500">{step.tool}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{phase.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(step.status)}`}>
                      {step.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-xs text-blue-600 font-medium">
                        {step.assignee ? step.assignee.split(' ').map(n => n[0]).join('') : '?'}
                      </div>
                      <span className="text-sm text-gray-900">{step.assignee || 'Unassigned'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${step.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-900">{step.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{step.estimatedDuration}h</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">Edit</button>
                      <button className="text-green-600 hover:text-green-900">Start</button>
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
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
              <h1 className="text-2xl font-bold text-gray-900">Professional Workflow Manager</h1>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">{workflows.length} workflows</span>
                <span className="text-sm text-gray-400">•</span>
                <span className="text-sm text-gray-600">{activeWorkflow?.name || 'No workflow selected'}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <Upload className="w-4 h-4 mr-2" />
                Import
              </button>
              <button 
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Workflow
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Workflow Selection */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Select Workflow</h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Active:</span>
              <span className="text-sm font-medium text-blue-600">{activeWorkflow?.status || 'None'}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {workflows.map((workflow) => (
              <button
                key={workflow.id}
                onClick={() => setActiveWorkflow(workflow)}
                className={`p-4 border-2 rounded-lg text-left transition-all ${
                  activeWorkflow?.id === workflow.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{workflow.name}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(workflow.status)}`}>
                    {workflow.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{workflow.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Progress: {workflow.progress}%</span>
                  <span className="text-gray-500">{workflow.client}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {activeWorkflow && (
          <>
            {/* Workflow Overview */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{activeWorkflow.progress}%</div>
                  <div className="text-sm text-gray-600">Overall Progress</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{activeWorkflow.phases.filter(p => p.status === 'completed').length}</div>
                  <div className="text-sm text-gray-600">Completed Phases</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">${activeWorkflow.actualCost.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Actual Cost</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">{activeWorkflow.team.length}</div>
                  <div className="text-sm text-gray-600">Team Members</div>
                </div>
              </div>
            </div>

            {/* View Controls */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setViewMode('kanban')}
                      className={`p-2 rounded-lg transition-colors ${
                        viewMode === 'kanban' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      <Workflow className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('timeline')}
                      className={`p-2 rounded-lg transition-colors ${
                        viewMode === 'timeline' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      <Clock className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('gantt')}
                      className={`p-2 rounded-lg transition-colors ${
                        viewMode === 'gantt' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      <BarChart3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg transition-colors ${
                        viewMode === 'list' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      <FileText className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <span className="text-sm text-gray-600">
                    {activeWorkflow.phases.flatMap(p => p.steps).length} total tasks
                  </span>
                </div>

                <div className="flex items-center space-x-4">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="review">Review</option>
                    <option value="completed">Completed</option>
                  </select>
                  
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Workflow Display */}
            <AnimatePresence mode="wait">
              {viewMode === 'kanban' && renderKanbanView()}
              {viewMode === 'timeline' && renderTimelineView()}
              {viewMode === 'gantt' && renderGanttView()}
              {viewMode === 'list' && renderListView()}
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfessionalWorkflowManager;
